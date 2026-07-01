import { ArrowRight, BookOpenText, FileText } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { Article } from "@/lib/content/articleTypes";
import { getArticlePath } from "@/lib/content/articleHelpers";
import { ArticleMeta } from "@/components/articles/ArticleMeta";
import { ArticleTag } from "@/components/articles/ArticleTag";

type ArticleCardProps = {
  article: Article;
  ctaLabel?: string;
};

export function ArticleCard({ article, ctaLabel }: ArticleCardProps) {
  const isCaseStudy = article.type === "case-study";
  const Icon = isCaseStudy ? FileText : BookOpenText;

  return (
    <article className="flex h-full flex-col rounded-md border border-line bg-white p-5 shadow-soft transition hover:-translate-y-0.5 hover:border-sky hover:shadow-glow">
      <div className="relative overflow-hidden rounded-md border border-sky/25 bg-gradient-to-br from-white via-mint to-soft">
        {article.image ? (
          <Image
            src={article.image}
            alt={article.imageAlt ?? article.title}
            width={900}
            height={506}
            className="aspect-[16/9] w-full object-cover"
            style={{ objectPosition: article.imagePosition ?? "center" }}
          />
        ) : (
          <div className="flex aspect-[16/9] items-center justify-center p-5">
            <div className="grid justify-items-center gap-3 text-center">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white text-teal shadow-soft">
                <Icon size={22} aria-hidden />
              </span>
              <span className="text-xs font-semibold uppercase tracking-wide text-teal">{article.category}</span>
            </div>
          </div>
        )}
        <div className="absolute right-3 top-3">
          <ArticleTag>{article.category}</ArticleTag>
        </div>
      </div>

      <div className="mt-6">
        <p className="text-xs font-semibold uppercase text-teal">{article.heroLabel}</p>
        <h2 className="mt-3 text-xl font-semibold leading-7 text-ink">{article.title}</h2>
        <p className="mt-4 text-sm leading-7 text-slate-600">{article.excerpt}</p>
      </div>

      {isCaseStudy && article.caseStudy ? (
        <div className="mt-5 grid gap-3 border-t border-line pt-5">
          <div>
            <p className="text-xs font-semibold uppercase text-teal">Situation</p>
            <p className="mt-1 text-sm leading-6 text-slate-600">{article.caseStudy.situation}</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase text-teal">Problème</p>
            <p className="mt-1 text-sm leading-6 text-slate-600">{article.caseStudy.problem}</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase text-teal">Enseignement</p>
            <p className="mt-1 text-sm leading-6 text-slate-600">{article.caseStudy.lesson}</p>
          </div>
        </div>
      ) : null}

      <div className="mt-5 flex flex-wrap gap-2">
        {article.tags.slice(0, 3).map((tag) => (
          <span key={tag} className="rounded-full bg-soft px-3 py-1 text-xs font-medium text-slate-600">
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-5 border-t border-line pt-5">
        <ArticleMeta article={article} compact />
      </div>

      <div className="mt-auto pt-6">
        <Link
          href={getArticlePath(article)}
          className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full blue-gradient px-5 text-sm font-semibold text-white shadow-glow transition hover:-translate-y-0.5 sm:w-auto"
        >
          {ctaLabel ?? (isCaseStudy ? "Lire le cas" : "Lire le guide")}
          <ArrowRight size={16} aria-hidden />
        </Link>
      </div>
    </article>
  );
}
