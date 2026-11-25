import { accessDetails, responseError, updateAccess } from "@/lib/processos/server";
export const dynamic = "force-dynamic";
export async function GET(request: Request) {
  try { return await accessDetails(request); } catch (error) { return responseError(error); }
}
export async function PUT(request: Request) {
  try { return await updateAccess(request); } catch (error) { return responseError(error); }
}
