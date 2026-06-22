import Link from "next/link";
import type { Article } from "@/lib/content/articleTypes";
import { ArticleCard } from "@/components/articles/ArticleCard";
import { Reveal } from "@/components/Reveal";

type ArticleIndexProps = {
  title: string;
  description: string;
  articles: Article[];
  basePath: string;
  tabs?: readonly string[];
  selectedCategory?: string;
  disclaimer?: string;
  ctaLabel?: string;
};

export function ArticleIndex({
  title,
  description,
  articles,
  basePath,
  tabs,
  selectedCategory = "Tous",
  disclaimer,
  ctaLabel
}: ArticleIndexProps) {
  return (
    <section className="section-band py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <Reveal>
          <div className="max-w-3xl">
            <p className="mb-3 text-sm font-semibold uppercase text-teal">Ressources fiscales</p>
            <h1 className="text-balance text-4xl font-semibold text-ink sm:text-5xl">{title}</h1>
            <p className="mt-5 text-lg leading-8 text-slate-600">{description}</p>
          </div>
        </Reveal>

        {disclaimer ? (
          <Reveal delay={0.03}>
            <div className="mt-8 rounded-md border border-sky/25 bg-white p-5 text-sm leading-7 text-slate-700 shadow-soft">
              {disclaimer}
            </div>
          </Reveal>
        ) : null}

        {tabs ? (
          <Reveal delay={0.05}>
            <div className="mt-8 flex gap-2 overflow-x-auto pb-2">
              {tabs.map((tab) => {
                const href = tab === "Tous" ? basePath : `${basePath}?category=${encodeURIComponent(tab)}`;
                const active = tab === selectedCategory;
                return (
                  <Link
                    key={tab}
                    href={href}
                    className={`shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition ${
                      active
                        ? "border-teal bg-teal text-white shadow-soft"
                        : "border-line bg-white text-slate-700 hover:border-sky hover:bg-mint"
                    }`}
                  >
                    {tab}
                  </Link>
                );
              })}
            </div>
          </Reveal>
        ) : null}

        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {articles.length > 0 ? (
            articles.map((article, index) => (
              <Reveal key={article.slug} delay={index * 0.04}>
                <ArticleCard article={article} ctaLabel={ctaLabel} />
              </Reveal>
            ))
          ) : (
            <div className="rounded-md border border-line bg-white p-6 text-sm leading-7 text-slate-600 shadow-soft md:col-span-2 lg:col-span-3">
              Aucun guide publié dans cette catégorie pour le moment.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
