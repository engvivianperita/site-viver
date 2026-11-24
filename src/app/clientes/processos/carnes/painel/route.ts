import { PANEL_HTML } from "@/lib/processos/carnes-assets";
import { authorize, pageError } from "@/lib/processos/server";
export const dynamic = "force-dynamic";
export async function GET(request: Request) {
  try {
    await authorize(request);
    return new Response(PANEL_HTML, { headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff", "X-Frame-Options": "SAMEORIGIN", "Content-Security-Policy": "frame-ancestors 'self'" } });
  } catch (error) {
    return pageError(error, request);
  }
}
