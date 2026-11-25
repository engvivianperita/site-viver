import "server-only";

export const PROCESS_COOKIE = "viver-process-session";
const WORKSPACE_ID = "carnes-main";
export class ProcessError extends Error {
  constructor(public status: number, message: string) { super(message); }
}
type Profile = { id: string; name?: string; email?: string; role: string; active: boolean };
export type Session = { token: string; profile: Profile };
type Workspace = { id: string; company_id: string | null; state: ProcessState; version: number };
export type ProcessState = { items: Record<string, unknown>[]; questions: Record<string, unknown>[]; history: Record<string, unknown>[]; profile: Record<string, unknown> };

function config() {
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, "");
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const service = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!base || !anon || !service) throw new ProcessError(503, "O armazenamento de Processos aguarda configuração na hospedagem. Os dados não foram alterados.");
  return { base, anon, service };
}
async function rest(path: string, init: RequestInit = {}) {
  const { base, service } = config();
  return fetch(`${base}/rest/v1/${path}`, { ...init, cache: "no-store", headers: { apikey: service, Authorization: `Bearer ${service}`, "Content-Type": "application/json", ...init.headers } });
}
async function readRows<T>(path: string): Promise<T[]> {
  const r = await rest(path);
  if (!r.ok) throw new ProcessError(503, "O banco de Processos ainda não está disponível. Tente novamente ou contate a Viver.");
  return r.json();
}
function getToken(request: Request) {
  const bearer = request.headers.get("authorization")?.match(/^Bearer\s+(.+)$/i)?.[1];
  if (bearer) return bearer;
  const cookie = request.headers.get("cookie")?.split(";").map(c => c.trim()).find(c => c.startsWith(`${PROCESS_COOKIE}=`));
  if (!cookie) return "";
  try { return decodeURIComponent(cookie.slice(PROCESS_COOKIE.length + 1)); } catch { return ""; }
}
export async function authenticate(request: Request): Promise<Session> {
  const token = getToken(request);
  if (!token) throw new ProcessError(401, "Entre com o e-mail e a senha do portal Viver.");
  const { base, anon } = config();
  const userResponse = await fetch(`${base}/auth/v1/user`, { cache: "no-store", headers: { apikey: anon, Authorization: `Bearer ${token}` } });
  if (!userResponse.ok) throw new ProcessError(401, "Sua sessão expirou. Entre novamente no portal Viver.");
  const user = await userResponse.json();
  if (!user?.id || typeof user.id !== "string") throw new ProcessError(401, "Sessão inválida.");
  const params = new URLSearchParams({ id: `eq.${user.id}`, select: "id,name,email,role,active" });
  const profiles = await readRows<Profile>(`profiles?${params}`);
  const profile = profiles.find(p => p.id === user.id);
  if (!profile?.active) throw new ProcessError(403, "Seu usuário precisa estar ativo e autorizado pela Viver.");
  return { token, profile };
}
async function workspace(): Promise<Workspace | null> {
  const rows = await readRows<Workspace>(`regularization_workspaces?id=eq.${WORKSPACE_ID}&select=id,company_id,state,version`);
  return rows[0] || null;
}
export async function authorize(request: Request) {
  const session = await authenticate(request);
  const row = await workspace();
  const admin = session.profile.role === "Administrador";
  if (!admin) {
    if (!row?.company_id) throw new ProcessError(403, "Solicite à Viver a liberação deste processo para sua empresa.");
    const params = new URLSearchParams({ company_id: `eq.${row.company_id}`, user_id: `eq.${session.profile.id}`, select: "company_id" });
    const memberships = await readRows<{ company_id: string }>(`company_users?${params}`);
    if (!memberships.some(m => m.company_id === row.company_id)) throw new ProcessError(403, "Você não tem acesso a este processo.");
  }
  return { session, row, admin };
}
export function assertOrigin(request: Request) {
  const expected = new URL(request.url).origin;
  if (request.headers.get("origin") !== expected) throw new ProcessError(403, "Origem da solicitação inválida.");
}
export function responseError(error: unknown) {
  const e = error instanceof ProcessError ? error : new ProcessError(500, "Não foi possível concluir a operação. Seus dados não foram alterados.");
  return Response.json({ error: e.message }, { status: e.status, headers: { "Cache-Control": "no-store" } });
}
export function json(data: unknown, version?: number) {
  return Response.json(data, { headers: { "Cache-Control": "no-store", ...(version === undefined ? {} : { "X-Process-Version": String(version), ETag: `"${version}"` }) } });
}
export async function parseBody(request: Request) {
  const raw = await request.text();
  if (raw.length > 3_000_000) throw new ProcessError(413, "O arquivo excede o tamanho permitido.");
  try { return JSON.parse(raw); } catch { throw new ProcessError(400, "Dados inválidos."); }
}
function record(value: unknown): value is Record<string, unknown> { return !!value && typeof value === "object" && !Array.isArray(value); }
export function validateState(value: unknown): asserts value is ProcessState {
  if (!record(value) || !record(value.profile) || !Array.isArray(value.items) || !Array.isArray(value.questions) || !Array.isArray(value.history)) throw new ProcessError(400, "Estrutura de dados inválida.");
  if (value.items.length > 2000 || value.questions.length > 2000 || value.history.length > 10000) throw new ProcessError(400, "Há registros demais para uma única operação.");
  const ids = new Set<string>();
  for (const item of value.items) {
    if (!record(item) || typeof item.id !== "string" || !item.id || typeof item.title !== "string" || !item.title.trim() || ids.has(item.id)) throw new ProcessError(400, "Etapas inválidas ou duplicadas no arquivo.");
    ids.add(item.id);
  }
  if (!value.questions.every(record) || !value.history.every(record)) throw new ProcessError(400, "Histórico ou dúvidas inválidos.");
}
export function expectedVersion(request: Request) {
  const value = request.headers.get("if-match");
  if (value === null || !/^\d+$/.test(value)) throw new ProcessError(428, "Recarregue o processo antes de salvar.");
  return Number(value);
}
export async function saveState(request: Request) {
  assertOrigin(request);
  const { session, row } = await authorize(request);
  const expected = expectedVersion(request);
  if (expected !== (row?.version || 0)) throw new ProcessError(409, "O processo foi atualizado em outra sessão. Exporte sua cópia e recarregue.");
  const state = await parseBody(request); validateState(state);
  state.history.unshift({ date: new Date().toISOString(), action: "Registro salvo no portal Viver", responsible: session.profile.name || session.profile.email || session.profile.id });
  const version = expected + 1;
  const payload = { state, version, updated_by: session.profile.id, updated_at: new Date().toISOString() };
  const r = row
    ? await rest(`regularization_workspaces?id=eq.${WORKSPACE_ID}&version=eq.${expected}`, { method: "PATCH", headers: { Prefer: "return=representation" }, body: JSON.stringify(payload) })
    : await rest("regularization_workspaces", { method: "POST", headers: { Prefer: "return=representation" }, body: JSON.stringify({ id: WORKSPACE_ID, company_id: null, ...payload }) });
  if (r.status === 409) throw new ProcessError(409, "O processo foi atualizado em outra sessão.");
  if (!r.ok) throw new ProcessError(503, "Não foi possível salvar no banco. Os dados na tela foram preservados.");
  const updated = await r.json();
  if (!updated.length) throw new ProcessError(409, "O processo foi atualizado em outra sessão.");
  return json(state, version);
}
export async function accessDetails(request: Request) {
  const { row, admin } = await authorize(request);
  const companies = admin ? await readRows<{ id: string; name: string }>("companies?select=id,name&order=name.asc") : [];
  return json({ admin, companyId: row?.company_id || null, companies });
}
export async function updateAccess(request: Request) {
  assertOrigin(request);
  const { session, row, admin } = await authorize(request);
  if (!admin) throw new ProcessError(403, "Somente administradores da Viver podem alterar a empresa autorizada.");
  if (!row) throw new ProcessError(409, "Inicialize o processo antes de configurar o acesso.");
  const body = await parseBody(request);
  const companyId = body?.companyId;
  if (companyId !== null && typeof companyId !== "string") throw new ProcessError(400, "Empresa inválida.");
  if (companyId) {
    const params = new URLSearchParams({ id: `eq.${companyId}`, select: "id" });
    if (!(await readRows(`companies?${params}`)).length) throw new ProcessError(400, "Empresa não encontrada.");
  }
  const state = structuredClone(row.state);
  state.history.unshift({ date: new Date().toISOString(), action: companyId ? "Empresa autorizada para este processo: " + companyId : "Acesso restrito aos administradores da Viver", responsible: session.profile.name || session.profile.id });
  const version = row.version + 1;
  const r = await rest(`regularization_workspaces?id=eq.${WORKSPACE_ID}&version=eq.${row.version}`, { method: "PATCH", headers: { Prefer: "return=representation" }, body: JSON.stringify({ company_id: companyId || null, state, version, updated_by: session.profile.id, updated_at: new Date().toISOString() }) });
  if (!r.ok) throw new ProcessError(503, "Não foi possível alterar o acesso.");
  if (!(await r.json()).length) throw new ProcessError(409, "O processo foi atualizado em outra sessão. Recarregue.");
  return json({ ok: true, companyId }, version);
}

export function pageError(error: unknown, request: Request) {
  if (error instanceof ProcessError && error.status === 401) return Response.redirect(new URL("/clientes/processos", request.url), 303);
  const e = error instanceof ProcessError ? error : new ProcessError(500, "Não foi possível abrir o painel. Tente novamente.");
  const message = e.message.replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!));
  return new Response(`<!doctype html><html lang="pt-BR"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Acesso ao processo | Viver SST</title><style>body{font:18px/1.6 system-ui;color:#233e36;max-width:760px;margin:80px auto;padding:24px}a{color:#174e3c}h1{font-size:30px}</style><main><h1>Acesso ao processo</h1><p>${message}</p><a href="/clientes/processos">Voltar a Processos</a></main></html>`, { status: e.status, headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff" } });
}
