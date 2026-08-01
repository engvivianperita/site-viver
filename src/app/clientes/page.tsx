import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BrainCircuit, Building2, LockKeyhole, MessageSquareWarning, ShieldCheck } from "lucide-react";
import { Breadcrumbs, PageHero } from "@/components/ui";

export const metadata: Metadata = {
  title: "Clientes",
  description: "Acesso aos sistemas online da Viver Segurança no Trabalho.",
  alternates: { canonical: "/clientes" },
};

export default function ClientesPage() {
  const pulsarUrl = process.env.NEXT_PUBLIC_PULSAR_APP_URL?.trim();
  const channelUrl = process.env.NEXT_PUBLIC_REPORTING_CHANNEL_URL?.trim();

  return <>
    <PageHero eyebrow="Área exclusiva" title="Clientes" text="Escolha o sistema que deseja acessar. O uso é restrito a clientes e usuários autorizados pela Viver." />
    <Breadcrumbs current="Clientes" />
    <section className="client-hub">
      <div className="container">
        <div className="client-hub-intro">
          <div><span className="eyebrow">SISTEMAS ONLINE</span><h2>Qual plataforma você deseja acessar?</h2></div>
          <p><ShieldCheck size={20} aria-hidden="true" /> Cada sistema possui acesso protegido e permissões próprias para preservar os dados da sua empresa.</p>
        </div>
        <div className="client-system-cards">
          <article className="client-system-card">
            <span className="client-system-icon"><Building2 aria-hidden="true" /></span>
            <span className="client-system-label">GESTÃO INTEGRADA</span>
            <h3>Integra SSMA</h3>
            <p>Gestão de empresas, obras, documentos, RDOs, auditorias, riscos, indicadores e planos de ação.</p>
            <Link className="button" href="/area-do-cliente">Acessar Integra SSMA <ArrowRight size={17} /></Link>
          </article>
          <article className="client-system-card">
            <span className="client-system-icon"><BrainCircuit aria-hidden="true" /></span>
            <span className="client-system-label">RISCOS PSICOSSOCIAIS</span>
            <h3>Viver Pulsar</h3>
            <p>Avaliações psicossociais, ciclos de escuta, inventário de riscos, planos de cuidado e relatórios.</p>
            {pulsarUrl
              ? <a className="button" href={pulsarUrl} target="_blank" rel="noreferrer">Acessar Viver Pulsar <ArrowRight size={17} /></a>
              : <span className="client-system-pending"><LockKeyhole size={17} aria-hidden="true" /> Publicação pendente</span>}
          </article>
          <article className="client-system-card">
            <span className="client-system-icon"><MessageSquareWarning aria-hidden="true" /></span>
            <span className="client-system-label">ESCUTA CONFIDENCIAL</span>
            <h3>Canal de Denúncias</h3>
            <p>Registro anônimo, protocolo, consulta de andamento, comunicação segura e tratamento independente das manifestações.</p>
            {channelUrl
              ? <a className="button" href={channelUrl} target="_blank" rel="noreferrer">Acessar Canal de Denúncias <ArrowRight size={17} /></a>
              : <Link className="button" href="/canal-de-denuncias">Acessar Canal de Denúncias <ArrowRight size={17} /></Link>}
          </article>
        </div>
        <p className="client-hub-help">Ainda não possui acesso ou está com dificuldades? <Link href="/contato">Fale com a equipe da Viver</Link>.</p>
      </div>
    </section>
  </>;
}
