export async function readAdviserStream(body: ReadableStream<Uint8Array>, onText: (delta: string) => void) {
  const reader = body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  let complete = false;
  let hasText = false;
  try {
    while (true) {
      const { value, done } = await reader.read();
      buffer += decoder.decode(value, { stream: !done });
      buffer = buffer.replace(/\r\n/g, "\n");
      let boundary = buffer.indexOf("\n\n");
      while (boundary >= 0) {
        const frame = buffer.slice(0, boundary);
        buffer = buffer.slice(boundary + 2);
        const data = frame.split("\n").filter((line) => line.startsWith("data:")).map((line) => line.slice(5).trim()).join("\n");
        if (data && data !== "[DONE]") {
          const event = JSON.parse(data);
          if (event.type === "error") throw new Error(event.errorText ?? "The AI request failed.");
          if (event.type === "text-delta") { hasText = true; onText(event.delta); }
          if (event.type === "finish") {
            if (event.finishReason === "content-filter") throw new Error("The AI service declined this request.");
            complete = true;
          }
          if (event.type === "abort") throw new Error("Request stopped.");
        }
        boundary = buffer.indexOf("\n\n");
      }
      if (done) break;
    }
    if (!complete) throw new Error("The connection ended before the recommendation was complete.");
    if (!hasText) throw new Error("The AI service returned no recommendation.");
  } finally { await reader.cancel().catch(() => {}); reader.releaseLock(); }
}