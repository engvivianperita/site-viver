"use client";
import { useEffect, useState, type ReactNode, type FormEvent } from "react";
import { LockKeyhole } from "lucide-react";
import { getPortalSession, portalSignIn, portalProfile, savePortalSession, clearPortalSession, portalConfigured } from "@/lib/portal-auth";

export function ProcessAccess({ children }: { children: ReactNode }) {
  const [allowed, setAllowed] = useState(false);
  const [checking, setChecking] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    let mounted = true;
    const session = getPortalSession();
    if (!session) { setChecking(false); return; }
    portalProfile(session.access_token).then(profile => {
      if (mounted) { setAllowed(Boolean(profile?.active)); setChecking(false); }
    }).catch(() => { if (mounted) { clearPortalSession(); setChecking(false); } });
    return () => { mounted = false; };
  }, []);
  async function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setBusy(true); setError("");
    const form = new FormData(event.currentTarget);
    try {
      const session = await portalSignIn(String(form.get("email")), String(form.get("password")));
      const profile = await portalProfile(session.access_token);
      if (!profile?.active) throw new Error("Seu acesso precisa ser autorizado pela Viver.");
      savePortalSession(session); setAllowed(true);
    } catch { setError("Não foi possível entrar. Confira seus dados e a autorização de acesso."); }
    finally { setBusy(false); }
  }
  if (checking) return <section className="container" style={{padding: "48px 24px"}} role="status">Verificando seu acesso...</section>;
  if (allowed) return <><div className="container" style={{paddingTop:24, display:"flex",justifyContent:"space-between",gap:16}}><span><LockKeyhole size={16} aria-hidden="true" /> Acesso autenticado</span><button type="button" className="button" onClick={() => { clearPortalSession(); setAllowed(false); }}>Sair de Processos</button></div>{children}</>;
  return <section className="container" style={{padding:"48px 24px"}}>
    <div className="client-login-card" style={{maxWidth:480,margin:"auto"}}>
      <LockKeyhole aria-hidden="true" /><h2>Acesso a Processos</h2>
      <p>Entre com o e-mail e a senha do seu acesso Viver. Apenas usuários ativos e autorizados podem continuar.</p>
      {!portalConfigured && <p role="alert">O acesso por senha aguarda a configuração do Supabase na hospedagem. Solicite a configuração à Viver.</p>}
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
