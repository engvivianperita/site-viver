import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpenCheck, BrainCircuit, Building2, Leaf, LockKeyhole, MessageSquareWarning, Scale, ShieldCheck } from "lucide-react";
import { Breadcrumbs, PageHero } from "@/components/ui";
import { safePublicUrl } from "@/lib/public-links";

export const metadata: Metadata = {
  title: "Área do cliente",
  description: "Acesso aos sistemas online da Viver Segurança no Trabalho.",
  alternates: { canonical: "/clientes" },
};

export default function ClientesPage() {
  const pulsarUrl = safePublicUrl(process.env.NEXT_PUBLIC_PULSAR_APP_URL || "https://pulsar.viversst.com.br");
  const channelUrl = safePublicUrl(process.env.NEXT_PUBLIC_REPORTING_CHANNEL_URL || "https://canal.viversst.com.br");
  const complianceUrl = safePublicUrl(process.env.NEXT_PUBLIC_COMPLIANCE_APP_URL || "https://compliance.viversst.com.br");
  const esgUrl = safePublicUrl(process.env.NEXT_PUBLIC_ESG_APP_URL || "https://verdeon-esg.vdeolisantos.chatgpt.site");
  const ddsUrl = safePublicUrl(process.env.NEXT_PUBLIC_DDS_APP_URL || "https://dds.viversst.com.br");

  return <>
    <PageHero eyebrow="Área exclusiva" title="Área do cliente" text="Escolha o sistema que deseja acessar. O uso é restrito a clientes e usuários autorizados pela Viver." />
    <Breadcrumbs current="Área do cliente" />
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
            <span className="client-system-icon"><Leaf aria-hidden="true" /></span>
            <span className="client-system-label">GESTÃO ESG</span>
            <h3>Verdeon ESG</h3>
            <p>Gestão multiempresa de indicadores ambientais, sociais e de governança, evidências, acessos e relatórios.</p>
            {esgUrl
              ? <a className="button" href={esgUrl} target="_blank" rel="noreferrer">Acessar Verdeon ESG <ArrowRight size={17} /></a>
              : <span className="client-system-pending"><LockKeyhole size={17} aria-hidden="true" /> Publicação pendente</span>}
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
          <article className="client-system-card">
            <span className="client-system-icon"><Scale aria-hidden="true" /></span>
            <span className="client-system-label">PROGRAMA DE INTEGRIDADE</span>
            <h3>Viver Integridade</h3>
            <p>Gestão de compliance, riscos e controles, políticas, terceiros, treinamentos, apurações, planos de melhoria e evidências.</p>
            {complianceUrl
              ? <a className="button" href={complianceUrl} target="_blank" rel="noreferrer">Acessar Viver Integridade <ArrowRight size={17} /></a>
              : <span className="client-system-pending"><LockKeyhole size={17} aria-hidden="true" /> Publicação pendente</span>}
          </article>
          <article className="client-system-card">
            <span className="client-system-icon"><BookOpenCheck aria-hidden="true" /></span>
            <span className="client-system-label">SEGURANÇA DO TRABALHO</span>
            <h3>VIVER DDS</h3>
            <p>Diálogos Diários de Segurança, conteúdos preventivos, vídeos, registros de leitura e gestão de envios.</p>
            {ddsUrl
              ? <a className="button" href={ddsUrl} target="_blank" rel="noreferrer">Acessar VIVER DDS <ArrowRight size={17} /></a>
              : <span className="client-system-pending"><LockKeyhole size={17} aria-hidden="true" /> Publicação pendente</span>}
          </article>
          <article className="client-system-card">
            <span className="client-system-icon"><BookOpenCheck aria-hidden="true" /></span>
            <span className="client-system-label">CAPACITAÇÃO EM SEGURANÇA</span>
            <h3>Câmara fria — VIVER</h3>
            <p>Aulas por assunto, procedimentos de entrada e saída, EPI, emergências, exercícios e acompanhamento individual.</p>
            <a className="button" href="/treinamentos/camara-fria/participante/">Acessar treinamento de câmara fria <ArrowRight size={17} /></a><a href="/treinamentos/camara-fria/admin/">Administração do treinamento</a>
          </article>
        </div>
        <p className="client-hub-help">Ainda não possui acesso ou está com dificuldades? <Link href="/contato">Fale com a equipe da Viver</Link>.</p>
      </div>
    </section>
  </>;
}

