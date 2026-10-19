import { describe, expect, it } from "vitest";
import { readAdviserStream } from "@/lib/adviser-stream";
import { challengeSchema } from "@/lib/adviser-schema";

function stream(chunks: string[]) {
  return new ReadableStream<Uint8Array>({ start(controller) { for (const chunk of chunks) controller.enqueue(new TextEncoder().encode(chunk)); controller.close(); } });
}
describe("Engineering adviser streaming", () => {
  it("handles split frames, metadata, hidden reasoning and multiple deltas", async () => {
    let text = "";
    await readAdviserStream(stream(['data: {"type":"start"}\n\n', 'data: {"type":"reasoning-delta","delta":"hidden"}\n\n', 'data: {"type":"text-delta","delta":"Thought', 'ful Architecture"}\n\ndata: {"type":"text-delta","delta":" helps."}\n\ndata: {"type":"finish"}\n\ndata: [DONE]\n\n']), (delta) => { text += delta; });
    expect(text).toBe("Thoughtful Architecture helps.");
  });
  it("surfaces a safe denial and does not consume subsequent content", async () => {
    let text = "";
    await expect(readAdviserStream(stream(['data: {"type":"error","errorText":"Access denied"}\n\ndata: {"type":"text-delta","delta":"ignored"}\n\n']), (delta) => { text += delta; })).rejects.toThrow("Access denied");
    expect(text).toBe("");
  });
  it("terminates a refusal even without visible output", async () => {
    await expect(readAdviserStream(stream(['data: {"type":"finish","finishReason":"content-filter"}\n\n']), () => {})).rejects.toThrow("declined");
  });
  it("detects an incomplete connection", async () => {
    await expect(readAdviserStream(stream(['data: {"type":"text-delta","delta":"partial"}\n\n']), () => {})).rejects.toThrow("before the recommendation was complete");
  });
  it("cleans up on stop", async () => {
    let cancelled = false;
    const body = new ReadableStream<Uint8Array>({ start(controller) { controller.enqueue(new TextEncoder().encode('data: {"type":"abort"}\n\n')); }, cancel() { cancelled = true; } });
    await expect(readAdviserStream(body, () => {})).rejects.toThrow("stopped");
    expect(cancelled).toBe(true);
  });
  it("rejects whitespace-only challenge descriptions", () => {
    expect(challengeSchema.safeParse({ challenge: "                       " }).success).toBe(false);
  });
});