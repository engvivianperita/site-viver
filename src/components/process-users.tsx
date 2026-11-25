"use client";
import { useState, type FormEvent } from "react";
export function ProcessUsers() {
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    if (data.get("password") !== data.get("confirm")) { setMessage("As senhas não conferem."); return; }
    setBusy(true); setMessage("");
    try {
      const response = await fetch("/api/processos/users", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: data.get("name"), email: data.get("email"), password: data.get("password") }) });
      const body = await response.json();
      if (!response.ok) throw new Error(body.error || "Não foi possível cadastrar.");
      setMessage(body.message); form.reset();
    } catch (error) { setMessage(error instanceof Error ? error.message : "Não foi possível cadastrar."); }
    finally { setBusy(false); }
  }
  return <section className="container" style={{paddingBottom:40}}>
    <details className="client-login-card" style={{maxWidth:640}}><summary style={{cursor:"pointer",fontWeight:700}}>Cadastro de usuários — administrador</summary>
      <p>Cadastre pessoas autorizadas a consultar e atualizar o processo. O acesso será vinculado à empresa selecionada em Dados da empresa no painel. O novo usuário não será administrador.</p>
      <form onSubmit={submit}>
        <label>Nome<input name="name" autoComplete="name" maxLength={120} required /></label>
        <label>E-mail de acesso<input name="email" type="email" autoComplete="off" maxLength={254} required /></label>
        <label>Senha inicial<input name="password" type="password" autoComplete="new-password" minLength={12} maxLength={128} required /></label>
        <label>Confirmar senha<input name="confirm" type="password" autoComplete="new-password" minLength={12} maxLength={128} required /></label>
        <p>Use pelo menos 12 caracteres. Compartilhe a senha com o usuário por um canal privado.</p>
        <button className="button" disabled={busy}>{busy ? "Cadastrando..." : "Cadastrar usuário"}</button>
        {message && <p role="status">{message}</p>}
      </form>
    </details>
  </section>;
}
