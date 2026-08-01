import type { Metadata } from "next";
import Link from "next/link";

const channelUrl = "https://canal-confianca-viver.vdeolisantos.chatgpt.site";

export const metadata: Metadata = {
  title: "Canal de denúncias",
  description: "Canal confidencial da Viver Segurança no Trabalho para registro e acompanhamento de denúncias.",
  alternates: { canonical: "/canal-de-denuncias" },
};

export default function CanalDeDenunciasPage() { return <>
  <section className="page-hero trust-page-hero"><div className="container"><span className="eyebrow light">ESCUTA CONFIDENCIAL</span><h1>Canal de denúncias</h1><p>Registre uma denúncia ou acompanhe o tratamento pelo protocolo e código secreto, sem precisar informar seu nome.</p></div></section>
  <div className="container breadcrumbs"><Link href="/">Início</Link><span>›</span><span>Canal de denúncias</span></div>
  <section className="trust-channel"><div className="container"><div className="trust-intro"><div><span className="eyebrow">AMBIENTE SEGURO</span><h2>Sua voz importa. Seu anonimato também.</h2></div><p>O formulário funciona em ambiente independente e protegido. Guarde o protocolo e o código secreto apresentados ao concluir o registro.</p></div>
    <iframe className="trust-frame" src={channelUrl} title="Canal de denúncias Viver" loading="lazy" allow="clipboard-write" />
    <p className="trust-fallback">Se o formulário não carregar, <a href={channelUrl} target="_blank" rel="noreferrer">acesse o Canal de denúncias em uma nova janela</a>.</p>
  </div></section>
</>; }
