import { createOpenAI } from "@ai-sdk/openai";
import { streamText, type ModelMessage } from "ai";

import {
  createLovableAiGatewayRunIdFetch,
  getLovableAiGatewayRunId,
  withLovableAiGatewayRunIdHeader,
} from "./run-id.ts";

export function createResponsesCall(
  request: Request,
  config: { baseURL: string; apiKey: string; model: string },
  messages: ModelMessage[],
  instructions?: string,
  onBlocked?: (status: number, message: string) => Promise<void>,
) {
  const runIdFetch = createLovableAiGatewayRunIdFetch(getLovableAiGatewayRunId(request));
  let resolveUpstream: (response: Response | undefined) => void = () => {};
  const upstreamReady = new Promise<Response | undefined>((resolve) => { resolveUpstream = resolve; });
  const provider = createOpenAI({
    baseURL: `${config.baseURL.replace(/\/+$/, "").replace(/\/v1$/, "")}/v1`,
    apiKey: config.apiKey,
    headers: { "Lovable-API-Key": config.apiKey, "X-Lovable-AIG-SDK": "vercel-ai-sdk" },
    fetch: async (input, init) => {
      try {
        const response = await runIdFetch.fetch(input, init);
        resolveUpstream(response.clone());
        return response;
      } catch (error) { resolveUpstream(undefined); throw error; }
    },
  });
  const reasoning = config.model !== "openai/chat-latest";
  const result = streamText({
    model: provider.responses(config.model),
    // AI SDK 6 lacks `instructions`: rename this key to `system` there.
    ...(instructions ? { instructions } : {}),
    messages,
    abortSignal: request.signal,
    maxRetries: 0,
    providerOptions: {
      openai: {
        store: false,
        ...(reasoning
          ? {
              forceReasoning: true,
              reasoningEffort: "low",
              reasoningSummary: "auto",
              include: ["reasoning.encrypted_content"],
            }
          : {}),
      },
    },
  });
  return {
    result,
    response: async () => {
      const stream = result.toUIMessageStreamResponse({ sendReasoning: true, onError: () => "The recommendation could not be completed. Please try again later." });
      const upstream = await upstreamReady;
      if (!upstream) return Response.json({ message: request.signal.aborted ? "Request stopped." : "The AI service could not be reached." }, { status: request.signal.aborted ? 499 : 503 });
      if (!upstream.ok) {
        const body = await upstream.json().catch(() => null);
        const message = body?.message ?? body?.error?.message ?? "The AI service is unavailable. Please try again later.";
        if (upstream.status === 403 || upstream.status === 402) await onBlocked?.(upstream.status, message);
        return Response.json({ message }, { status: upstream.status });
      }
      void upstream.body?.cancel();
      const response = await withLovableAiGatewayRunIdHeader(stream, runIdFetch);
      response.headers.set("Cache-Control", "no-store");
      return response;
    },
  };
}
