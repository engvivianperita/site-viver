import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Breadcrumbs, CTASection } from "@/components/ui";
import { formatNewsDate, news } from "@/data/news";

export function generateStaticParams() { return news.map(article => ({ slug: article.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const { slug }=await params; const article=news.find(item=>item.slug===slug); return article ? { title: article.title, description: article.summary, alternates:{canonical:`/noticias/${slug}`}, openGraph:{title:article.title,description:article.summary,type:"article",publishedTime:article.publishedAt} } : {}; }

export default async function NewsArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug }=await params; const article=news.find(item=>item.slug===slug); if(!article) notFound();
  return <><div className="article-hero"><div className="container"><span className="eyebrow light">{article.category}</span><h1>{article.title}</h1><p>{article.summary}</p><time dateTime={article.publishedAt}>Publicado em {formatNewsDate(article.publishedAt)}</time></div></div><Breadcrumbs current={article.title}/><article className="prose container">{article.content.map(paragraph=><p key={paragraph}>{paragraph}</p>)}<p className="article-disclaimer">Este conteúdo tem caráter informativo. O escopo técnico deve ser avaliado conforme a atividade e a legislação aplicável.</p><Link className="back-link" href="/noticias"><ArrowLeft size={17}/> Voltar para notícias</Link></article><CTASection/></>;
}
