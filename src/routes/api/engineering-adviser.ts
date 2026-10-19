import { createFileRoute } from "@tanstack/react-router";
import { handleAdviser } from "@/lib/server/adviser.server";

export const Route = createFileRoute("/api/engineering-adviser")({
  server: { handlers: { POST: ({ request }) => handleAdviser(request) } },
});