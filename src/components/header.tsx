"use client";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Logo } from "./logo";

const links = [
  ["/", "Início"], ["/sobre", "Sobre"], ["/servicos", "Serviços"],
  ["/setores-atendidos", "Setores atendidos"], ["/noticias", "Notícias"],
  ["/canal-de-confianca", "Canal de confiança"], ["/contato", "Contato"],
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => { const update = () => setScrolled(scrollY > 12); update(); addEventListener("scroll", update, { passive: true }); return () => removeEventListener("scroll", update); }, []);
  return <header className={`site-header ${scrolled ? "scrolled" : ""}`}>
    <div className="container nav"><Link href="/" aria-label="Página inicial"><Logo /></Link>
      <nav className="desktop-nav" aria-label="Principal">{links.map(([href, label]) => <Link key={href} href={href}>{label}</Link>)}<Link className="button small" href="/contato">Solicitar proposta</Link></nav>
      <button className="menu-button" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? "Fechar menu" : "Abrir menu"}>{open ? <X /> : <Menu />}</button>
    </div>
    {open && <nav id="mobile-menu" className="mobile-nav" aria-label="Principal mobile">{links.map(([href, label]) => <Link key={href} href={href} onClick={() => setOpen(false)}>{label}</Link>)}<Link className="button" href="/contato" onClick={() => setOpen(false)}>Solicitar proposta</Link></nav>}
  </header>;
}
