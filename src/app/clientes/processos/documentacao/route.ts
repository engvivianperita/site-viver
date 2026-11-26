import { createHash } from "node:crypto";
import { DOCUMENTACAO_HTML } from "@/lib/processos/documentacao-html";
import { authenticate, pageError } from "@/lib/processos/server";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const { profile } = await authenticate(request);
    const accountKey = createHash("sha256").update(profile.id).digest("hex");
    return new Response(DOCUMENTACAO_HTML.replace("__VIVER_STORAGE_KEY__", `viver-sst-documental-v1-${accountKey}`), {
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "private, no-store",
        "X-Content-Type-Options": "nosniff",
        "Content-Security-Policy": "frame-ancestors 'none'",
      },
    });
  } catch (error) {
    return pageError(error, request);
  }
}
