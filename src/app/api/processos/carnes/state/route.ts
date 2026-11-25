import { authorize, json, responseError, saveState } from "@/lib/processos/server";
export const dynamic = "force-dynamic";
export async function GET(request: Request) {
  try { const { row } = await authorize(request); return json(row?.state || null, row?.version || 0); } catch (error) { return responseError(error); }
}
export async function PUT(request: Request) {
  try { return await saveState(request); } catch (error) { return responseError(error); }
}
