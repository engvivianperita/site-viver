import type { Metadata } from "next";
import { Breadcrumbs, PageHero } from "@/components/ui";
import { NewsCard } from "@/components/news-card";
import { sortedNews } from "@/data/news";

export const metadata: Metadata = { title: "Notícias", description: "Conteúdos sobre Saúde e Segurança do Trabalho, Gestão Ambiental, contratos e conformidade.", alternates: { canonical: "/noticias" } };

export default function NoticiasPage() {
  return <><PageHero eyebrow="Notícias" title="Informação técnica para decisões mais seguras" text="Conteúdos semanais sobre SST, meio ambiente, contratos, auditorias e organização documental."/><Breadcrumbs current="Notícias"/><section><div className="container"><div className="news-grid">{sortedNews.map(article => <NewsCard article={article} key={article.slug}/>)}</div></div></section></>;
}
