import type { Article } from "@/lib/content/articleTypes";
import { ArticleMeta } from "@/components/articles/ArticleMeta";
import { ArticleTag } from "@/components/articles/ArticleTag";

type ArticleHeroProps = {
  article: Article;
};

export function ArticleHero({ article }: ArticleHeroProps) {
  return (
    <section className="section-band border-b border-line py-14 sm:py-18">
      <div className="mx-auto max-w-5xl px-5 sm:px-6 lg:px-8">
        <div className="flex flex-wrap gap-2">
          <ArticleTag>{article.heroLabel}</ArticleTag>
          <ArticleTag>{article.category}</ArticleTag>
          <ArticleTag>Mis à jour {article.fiscalYear}</ArticleTag>
        </div>
        <h1 className="mt-6 text-balance text-4xl font-semibold leading-tight text-ink sm:text-5xl lg:text-6xl">
          {article.title}
        </h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">{article.description}</p>
        <div className="mt-7">
          <ArticleMeta article={article} />
        </div>
        <div className="mt-7 flex flex-wrap gap-2">
          {article.tags.slice(0, 6).map((tag) => (
            <span key={tag} className="rounded-full border border-line bg-white px-3 py-1 text-xs font-medium text-slate-600 shadow-soft">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
