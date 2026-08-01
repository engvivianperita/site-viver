import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Canal de confiança", description: "Canal confidencial da Viver Segurança no Trabalho para registro e acompanhamento de denúncias.", alternates: { canonical: "/canal-de-confianca" } };

export default function CanalDeConfiancaPage() { return <>
  <section className="page-hero trust-page-hero"><div className="container"><span className="eyebrow light">ESCUTA CONFIDENCIAL</span><h1>Canal de confiança</h1><p>Registre uma situação ou acompanhe o tratamento pelo protocolo e código secreto, sem precisar informar seu nome.</p></div></section>
  <div className="container breadcrumbs"><Link href="/">Início</Link><span>›</span><span>Canal de confiança</span></div>
  <section className="trust-channel"><div className="container"><div className="trust-intro"><div><span className="eyebrow">AMBIENTE SEGURO</span><h2>Sua voz importa. Seu anonimato também.</h2></div><p>O formulário funciona em ambiente independente e protegido. Guarde o protocolo e o código secreto apresentados ao concluir o registro.</p></div>
    <iframe className="trust-frame" src="https://canal-confianca-viver.vdeolisantos.chatgpt.site" title="Canal de confiança Viver" loading="lazy" allow="clipboard-write" />
    <p className="trust-fallback">Se o formulário não carregar, <a href="https://canal-confianca-viver.vdeolisantos.chatgpt.site" target="_blank" rel="noreferrer">acesse o Canal de confiança em uma nova janela</a>.</p>
  </div></section>
</>; }
