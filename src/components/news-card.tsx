import Link from "next/link";
import { ArrowRight, CalendarDays } from "lucide-react";
import { formatNewsDate, type NewsArticle } from "@/data/news";

export function NewsCard({ article }: { article: NewsArticle }) {
  return <article className="news-card">
    <div className="news-meta"><span>{article.category}</span><time dateTime={article.publishedAt}><CalendarDays size={15}/>{formatNewsDate(article.publishedAt)}</time></div>
    <h3><Link href={`/noticias/${article.slug}`}>{article.title}</Link></h3>
    <p>{article.summary}</p>
    <Link className="news-link" href={`/noticias/${article.slug}`}>Ler notícia <ArrowRight size={16}/></Link>
  </article>;
}
