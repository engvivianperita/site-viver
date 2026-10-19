import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpenCheck } from "lucide-react";
import { Breadcrumbs, PageHero } from "@/components/ui";

export const metadata: Metadata = {
  title: "Capacitação em segurança - Academia",
  description: "Academia VIVER: escolha sua capacitação em segurança do trabalho.",
  alternates: { canonical: "/treinamentos" },
};

const courses = [
  {
    title: "Câmara fria",
    description: "Trabalho seguro em câmaras frias: acesso autorizado, EPI, entrada e saída, movimentação de produtos, pausas e emergências.",
    detail: "20 assuntos • Exercícios por aula • Prova final",
    participantUrl: "/treinamentos/camara-fria/participante/",
    adminUrl: "/treinamentos/camara-fria/admin/",
  },
];

export default function AcademiaPage() {
  return <>
    <PageHero eyebrow="VIVER" title="Capacitação em segurança - Academia" text="Escolha sua capacitação. Estude um assunto por vez, pratique com exercícios e realize a avaliação no seu acesso individual." />
    <Breadcrumbs current="Academia" />
    <section className="client-hub">
      <div className="container">
        <div className="client-hub-intro">
          <div><span className="eyebrow">APRENDIZAGEM APLICADA</span><h2>Capacitações disponíveis</h2></div>
          <p>Acesse pelo celular ou computador com os dados fornecidos pela sua empresa.</p>
        </div>
        <div className="client-system-cards">
          {courses.map(course => <article className="client-system-card" key={course.participantUrl}>
            <span className="client-system-icon"><BookOpenCheck aria-hidden="true" /></span>
            <span className="client-system-label">SEGURANÇA DO TRABALHO</span>
            <h3>{course.title}</h3>
            <p>{course.description}</p>
            <p>{course.detail}</p>
            <a className="button" href={course.participantUrl}>Acessar treinamento de câmara fria <ArrowRight size={17} /></a>
            <a href={course.adminUrl}>Administração do treinamento</a>
          </article>)}
        </div>
        <p className="client-hub-help">Novas capacitações serão disponibilizadas nesta Academia.</p>
        <p className="client-hub-help"><Link href="/clientes">Voltar à Área do cliente</Link></p>
      </div>
    </section>
  </>;
}
