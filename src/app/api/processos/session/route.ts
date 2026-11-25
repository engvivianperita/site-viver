import { NextResponse } from "next/server";
import { authenticate, assertOrigin, json, PROCESS_COOKIE, responseError } from "@/lib/processos/server";
export const dynamic = "force-dynamic";
export async function POST(request: Request) {
  try {
    assertOrigin(request);
    const session = await authenticate(request);
    const response = NextResponse.json({ profile: session.profile }, { headers: { "Cache-Control": "no-store" } });
    response.cookies.set(PROCESS_COOKIE, session.token, { httpOnly: true, secure: new URL(request.url).protocol === "https:", sameSite: "strict", path: "/", maxAge: 3600 });
    return response;
  } catch (error) { return responseError(error); }
}
export async function GET(request: Request) {
  try { return json({ profile: (await authenticate(request)).profile }); } catch (error) { return responseError(error); }
}
export async function DELETE(request: Request) {
  try {
    assertOrigin(request);
    const response = NextResponse.json({ ok: true }, { headers: { "Cache-Control": "no-store" } });
    response.cookies.set(PROCESS_COOKIE, "", { httpOnly: true, secure: new URL(request.url).protocol === "https:", sameSite: "strict", path: "/", maxAge: 0 });
    return response;
  } catch (error) { return responseError(error); }
}
