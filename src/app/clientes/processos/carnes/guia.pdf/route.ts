import { GUIDE_PDF_BASE64 } from "@/lib/processos/carnes-assets";
import { authorize, pageError } from "@/lib/processos/server";
export const dynamic = "force-dynamic";
export async function GET(request: Request) {
  try {
    await authorize(request);
    return new Response(Buffer.from(GUIDE_PDF_BASE64, "base64"), { headers: { "Content-Type": "application/pdf", "Content-Disposition": 'inline; filename="Guia_Etapas_Licencas_Industria_Processamento_Carnes.pdf"', "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff" } });
  } catch (error) {
    return pageError(error, request);
  }
}
