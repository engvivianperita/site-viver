"use client";
import { useEffect, useState, type ReactNode, type FormEvent } from "react";
import { LockKeyhole } from "lucide-react";
import { ProcessUsers } from "@/components/process-users";
import { getPortalSession, portalSignIn, savePortalSession, clearPortalSession, portalConfigured } from "@/lib/portal-auth";

async function openSession(token?: string) {
  const response = await fetch("/api/processos/session", token ? { method: "POST", headers: { Authorization: `Bearer ${token}` } } : { cache: "no-store" });
  const body = await response.json();
  if (!response.ok) throw new Error(body.error || "Não foi possível verificar seu acesso.");
  return body;
}
export function ProcessAccess({ children }: { children: ReactNode }) {
  const [allowed, setAllowed] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [checking, setChecking] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    let mounted = true;
    const session = getPortalSession();
    openSession(session?.access_token).then(body => { if (mounted) { setAllowed(true); setAdmin(body.profile?.role === "Administrador"); } })
      .catch(() => { if (mounted) setAllowed(false); })
      .finally(() => { if (mounted) setChecking(false); });
    return () => { mounted = false; };
  }, []);
  async function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setBusy(true); setError("");
    const form = new FormData(event.currentTarget);
    try {
      const session = await portalSignIn(String(form.get("email")), String(form.get("password")));
      const body = await openSession(session.access_token);
      setAdmin(body.profile?.role === "Administrador");
      savePortalSession(session); setAllowed(true);
    } catch (e) { setError(e instanceof Error ? e.message : "Não foi possível entrar. Confira seu acesso com a Viver."); }
    finally { setBusy(false); }
  }
  async function logout() {
    const response = await fetch("/api/processos/session", { method: "DELETE" });
    if (!response.ok) { setError("Não foi possível encerrar a sessão. Tente novamente."); return; }
    clearPortalSession(); setAllowed(false);
  }
  if (checking) return <section className="container" style={{padding: "48px 24px"}} role="status">Verificando seu acesso...</section>;
  if (allowed) return <><div className="container" style={{paddingTop:24, display:"flex",justifyContent:"space-between",gap:16}}><span><LockKeyhole size={16} aria-hidden="true" /> Acesso autenticado pelo portal Viver</span><button type="button" className="button" onClick={logout}>Sair de Processos</button></div>{error && <p className="container" role="alert">{error}</p>}{children}{admin && <ProcessUsers />}</>;
  return <section className="container" style={{padding:"48px 24px"}}>
    <div className="client-login-card" style={{maxWidth:480,margin:"auto"}}>
      <LockKeyhole aria-hidden="true" /><h2>Acesso a Processos</h2>
      <p>Entre com o e-mail e a senha do seu acesso Viver. Os processos disponíveis dependem da autorização da sua empresa.</p>
      {!portalConfigured && <p role="alert">O acesso por senha aguarda configuração na hospedagem. Solicite a configuração à Viver.</p>}
      <form onSubmit={login}>
        <label>E-mail<input name="email" type="email" autoComplete="username" required /></label>
        <label>Senha<input name="password" type="password" autoComplete="current-password" required /></label>
        {error && <p role="alert">{error}</p>}
        <button className="button" disabled={busy || !portalConfigured}>{busy ? "Verificando..." : "Entrar em Processos"}</button>
      </form>
      <p>Para obter ou recuperar seu acesso, fale com a equipe da Viver.</p>
    </div>
  </section>;
}
