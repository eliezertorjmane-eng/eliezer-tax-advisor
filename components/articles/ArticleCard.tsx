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
  const caseHook = article.caseStudy?.problem ?? article.excerpt;
  const caseChips = article.caseStudy
    ? [
        { label: "Situation", text: article.caseStudy.situation },
        { label: "Risque", text: article.caseStudy.problem },
        { label: "Leçon", text: article.caseStudy.lesson }
      ]
    : [];

  return (
    <article
      className={`flex h-full flex-col rounded-md border border-line bg-white p-5 shadow-soft transition hover:-translate-y-0.5 hover:border-sky hover:shadow-glow ${
        isCaseStudy ? "overflow-hidden" : ""
      }`}
    >
      {!isCaseStudy ? (
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
      ) : null}

      <div className="mt-6">
        <div className="flex flex-wrap items-center gap-2">
          <p className="text-xs font-semibold uppercase text-teal">{article.heroLabel}</p>
          {isCaseStudy ? <ArticleTag>{article.category}</ArticleTag> : null}
        </div>
        <h2 className="mt-3 text-xl font-semibold leading-7 text-ink">{article.title}</h2>
        <p className={`mt-4 text-sm text-slate-600 ${isCaseStudy ? "line-clamp-3 leading-6" : "leading-7"}`}>
          {isCaseStudy ? caseHook : article.excerpt}
        </p>
      </div>

      {isCaseStudy && article.caseStudy ? (
        <div className="mt-5 grid gap-2 border-t border-line pt-5">
          {caseChips.map((chip) => (
            <div key={chip.label} className="rounded-md border border-line bg-paper px-3 py-2">
              <p className="text-[11px] font-semibold uppercase text-teal">{chip.label}</p>
              <p className="mt-1 line-clamp-2 text-xs leading-5 text-slate-600">{chip.text}</p>
            </div>
          ))}
        </div>
      ) : null}

      {!isCaseStudy ? (
        <div className="mt-5 flex flex-wrap gap-2">
          {article.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="rounded-full bg-soft px-3 py-1 text-xs font-medium text-slate-600">
              {tag}
            </span>
          ))}
        </div>
      ) : null}

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
