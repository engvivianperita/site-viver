import { authenticate, authorize, assertOrigin, json, parseBody, ProcessError, responseError } from "@/lib/processos/server";
export const dynamic = "force-dynamic";
export async function POST(request: Request) {
  try {
    assertOrigin(request);
    const session = await authenticate(request);
    if (session.profile.role !== "Administrador") throw new ProcessError(403, "Somente administradores podem cadastrar usuários.");
    const { row } = await authorize(request);
    if (!row?.company_id) throw new ProcessError(409, "Primeiro selecione a empresa autorizada em Dados da empresa, no painel.");
    const body = await parseBody(request);
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
    const password = typeof body.password === "string" ? body.password : "";
    if (!name || name.length > 120 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254 || password.length < 12 || password.length > 128) throw new ProcessError(400, "Informe nome, e-mail válido e senha de 12 a 128 caracteres.");
    const base = process.env.NEXT_PUBLIC_SUPABASE_URL!.replace(/\/$/, "");
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY!;
    const headers = { apikey: key, Authorization: `Bearer ${key}`, "Content-Type": "application/json" };
    const created = await fetch(`${base}/auth/v1/admin/users`, { method: "POST", headers, body: JSON.stringify({ email, password, email_confirm: true, user_metadata: { name } }) });
    if (!created.ok) throw new ProcessError(400, "Não foi possível cadastrar. Confira se este e-mail já possui uma conta.");
    const user = await created.json();
    const profile = await fetch(`${base}/rest/v1/profiles?on_conflict=id`, { method: "POST", headers: { ...headers, Prefer: "resolution=merge-duplicates" }, body: JSON.stringify({ id: user.id, name, email, role: "Gestor SSMA", active: true }) });
    const membership = profile.ok && await fetch(`${base}/rest/v1/company_users`, { method: "POST", headers, body: JSON.stringify({ user_id: user.id, company_id: row.company_id }) });
    if (!profile.ok || !membership || !membership.ok) {
      // A partially provisioned account must not be able to sign in.
      await fetch(`${base}/auth/v1/admin/users/${user.id}`, { method: "PUT", headers, body: JSON.stringify({ ban_duration: "876000h" }) });
      throw new ProcessError(503, "O vínculo com a empresa não foi concluído. A conta foi bloqueada; contate a Viver.");
    }
    return json({ ok: true, message: "Usuário cadastrado para a empresa vinculada ao processo." });
  } catch (error) { return responseError(error); }
}
