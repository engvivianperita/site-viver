import type { Metadata } from "next";
import Link from "next/link";
import { ClipboardCheck, ChevronRight, LockKeyhole } from "lucide-react";
import { ProcessAccess } from "@/components/process-access";
import { PageHero } from "@/components/ui";

export const metadata: Metadata = {
  title: "Processos | Área do cliente",
  description: "Acompanhamento de processos de abertura e regularização de empresas pela Viver SST.",
  alternates: { canonical: "/clientes/processos" },
};

export default function ProcessosPage() {
  return <>
    <PageHero eyebrow="ÁREA DO CLIENTE" title="Processos" text="Organize documentos, acompanhe pendências e consulte as etapas dos seus processos de regularização." />
    <nav className="breadcrumbs container" aria-label="Navegação estrutural">
      <Link href="/">Início</Link><ChevronRight size={14} aria-hidden="true" />
      <Link href="/clientes">Área do cliente</Link><ChevronRight size={14} aria-hidden="true" />
      <span aria-current="page">Processos</span>
    </nav>
    <ProcessAccess><section className="client-hub">
      <div className="container">
        <div className="client-hub-intro">
          <div><span className="eyebrow">PROCESSOS DISPONÍVEIS</span><h2>Escolha o processo que deseja acompanhar</h2></div>
          <p><LockKeyhole size={20} aria-hidden="true" /> Os painéis possuem acesso protegido. É necessário entrar com uma conta autorizada.</p>
        </div>
        <div className="client-system-cards">
          <article className="client-system-card">
            <span className="client-system-icon"><ClipboardCheck aria-hidden="true" /></span>
            <span className="client-system-label">ALIMENTOS · MINAS GERAIS</span>
            <h3>Indústria de processamento de carnes</h3>
            <p>Acompanhe as etapas após o registro da empresa: enquadramento, inspeção de produtos de origem animal, licenças, boas práticas, rotulagem e transporte.</p>
            <p>Checklist editável, responsáveis, documentos, prazos, fontes oficiais, dúvidas e histórico. Requisitos sujeitos à validação local e técnica.</p>
            <Link className="button" href="/clientes/processos/carnes/painel" prefetch={false}>Acessar painel de regularização</Link>
            <p><LockKeyhole size={16} aria-hidden="true" /> Acesso pelo portal Viver, conforme autorização para a empresa.</p>
          </article>
          <article className="client-system-card">
            <span className="client-system-icon"><ClipboardCheck aria-hidden="true" /></span>
            <span className="client-system-label">SEGURANÇA E SAÚDE NO TRABALHO</span>
            <h3>Gestão Documental de SST</h3>
            <p>Cadastre estabelecimentos, confira a matriz de aplicabilidade e elabore minutas de PGR, AEP, AET e outros documentos de SST.</p>
            <Link className="button" href="/clientes/processos/documentacao" prefetch={false}>Acessar Gestão Documental</Link>
          </article>
        </div>
        <p className="client-hub-help"><Link href="/clientes">Voltar à Área do cliente</Link></p>
        <p className="client-hub-help">Precisa de acesso ao processo? <Link href="/contato">Fale com a equipe da Viver</Link>.</p>
      </div>
    </section></ProcessAccess>
  </>;
}
