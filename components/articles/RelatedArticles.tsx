import Link from "next/link";
import type { Article } from "@/lib/content/articleTypes";
import { getArticlePath } from "@/lib/content/articleHelpers";

type RelatedArticlesProps = {
  articles: Article[];
};

export function RelatedArticles({ articles }: RelatedArticlesProps) {
  if (articles.length === 0) {
    return null;
  }

  return (
    <section className="rounded-md border border-line bg-white p-5 shadow-soft">
      <h2 className="text-lg font-semibold text-ink">Articles liés</h2>
      <div className="mt-4 grid gap-3">
        {articles.map((article) => (
          <Link
            key={article.slug}
            href={getArticlePath(article)}
            className="rounded-md border border-line bg-paper p-4 transition hover:border-sky hover:bg-mint"
          >
            <p className="text-xs font-semibold uppercase text-teal">{article.category}</p>
            <p className="mt-2 text-sm font-semibold leading-6 text-ink">{article.shortTitle}</p>
            <p className="mt-1 text-xs leading-5 text-slate-600">{article.excerpt}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
