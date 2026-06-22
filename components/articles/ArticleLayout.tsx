import { CheckCircle2 } from "lucide-react";
import Link from "next/link";
import type { Article } from "@/lib/content/articleTypes";
import {
  getArticleFaqJsonLd,
  getArticleJsonLd,
  getBreadcrumbJsonLd,
  getRelatedArticles,
  getRelatedCalculatorLinks
} from "@/lib/content/articleHelpers";
import { ArticleCta } from "@/components/articles/ArticleCta";
import { ArticleHero } from "@/components/articles/ArticleHero";
import { ArticleSourceBox } from "@/components/articles/ArticleSourceBox";
import { RelatedArticles } from "@/components/articles/RelatedArticles";
import { Reveal } from "@/components/Reveal";

type ArticleLayoutProps = {
  article: Article;
};

export function ArticleLayout({ article }: ArticleLayoutProps) {
  const faqJsonLd = getArticleFaqJsonLd(article);
  const relatedArticles = getRelatedArticles(article);
  const calculatorLinks = getRelatedCalculatorLinks(article);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(getArticleJsonLd(article)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(getBreadcrumbJsonLd(article)) }} />
      {faqJsonLd ? <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} /> : null}

      <ArticleHero article={article} />

      <section className="bg-white py-12 sm:py-16">
        <div className="mx-auto grid max-w-7xl gap-6 px-5 sm:px-6 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-start lg:px-8">
          <main className="grid gap-5">
            <Reveal>
              <div className="rounded-md border border-sky/25 bg-mint p-5 text-sm leading-7 text-slate-700">
                {article.type === "case-study"
                  ? "Les cas présentés sont anonymisés et simplifiés à des fins pédagogiques. Chaque dossier fiscal doit être analysé individuellement."
                  : "Les informations de cet article sont générales et ne remplacent pas une analyse personnalisée par un professionnel. Chaque situation fiscale doit être examinée individuellement."}
              </div>
            </Reveal>

            {article.caseStudy ? (
              <Reveal>
                <section className="rounded-md border border-line bg-white p-6 shadow-soft">
                  <p className="text-sm font-semibold uppercase text-teal">Cas pratique anonymisé</p>
                  <div className="mt-5 grid gap-4 md:grid-cols-2">
                    <div className="rounded-md border border-line bg-paper p-4">
                      <h2 className="text-base font-semibold text-ink">Situation</h2>
                      <p className="mt-2 text-sm leading-7 text-slate-600">{article.caseStudy.situation}</p>
                    </div>
                    <div className="rounded-md border border-line bg-paper p-4">
                      <h2 className="text-base font-semibold text-ink">Problème</h2>
                      <p className="mt-2 text-sm leading-7 text-slate-600">{article.caseStudy.problem}</p>
                    </div>
                    <div className="rounded-md border border-line bg-paper p-4">
                      <h2 className="text-base font-semibold text-ink">Analyse</h2>
                      <p className="mt-2 text-sm leading-7 text-slate-600">{article.caseStudy.analysis}</p>
                    </div>
                    <div className="rounded-md border border-line bg-paper p-4">
                      <h2 className="text-base font-semibold text-ink">Enseignement</h2>
                      <p className="mt-2 text-sm leading-7 text-slate-600">{article.caseStudy.lesson}</p>
                    </div>
                  </div>
                </section>
              </Reveal>
            ) : null}

            {article.sections.map((section, index) => (
              <Reveal key={section.title} delay={index * 0.03}>
                <section id={section.id} className="rounded-md border border-line bg-white p-6 shadow-soft">
                  {section.eyebrow ? <p className="text-sm font-semibold uppercase text-teal">{section.eyebrow}</p> : null}
                  <h2 className="text-2xl font-semibold leading-8 text-ink">{section.title}</h2>
                  {section.paragraphs ? (
                    <div className="mt-4 space-y-4">
                      {section.paragraphs.map((paragraph) => (
                        <p key={paragraph} className="text-base leading-8 text-slate-600">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  ) : null}
                  {section.bullets ? (
                    <ul className="mt-5 grid gap-3">
                      {section.bullets.map((bullet) => (
                        <li key={bullet} className="flex gap-3 text-sm leading-7 text-slate-600">
                          <CheckCircle2 className="mt-1 shrink-0 text-teal" size={18} aria-hidden />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                  {section.numbered ? (
                    <ol className="mt-5 grid gap-3">
                      {section.numbered.map((item, itemIndex) => (
                        <li key={item} className="grid grid-cols-[2rem_1fr] gap-3 text-sm leading-7 text-slate-600">
                          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-mint text-sm font-semibold text-teal">
                            {itemIndex + 1}
                          </span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ol>
                  ) : null}
                  {section.callout ? (
                    <div
                      className={`mt-5 rounded-md border p-5 text-sm leading-7 ${
                        section.callout.tone === "warning"
                          ? "border-sky/30 bg-mint text-slate-700"
                          : "border-line bg-paper text-slate-700"
                      }`}
                    >
                      {section.callout.title ? <h3 className="font-semibold text-ink">{section.callout.title}</h3> : null}
                      <p className={section.callout.title ? "mt-2" : ""}>{section.callout.text}</p>
                      {section.callout.href && section.callout.label ? (
                        <Link
                          href={section.callout.href}
                          className="mt-4 inline-flex min-h-10 items-center justify-center rounded-full border border-line bg-white px-4 text-xs font-semibold text-teal transition hover:border-sky hover:bg-mint"
                        >
                          {section.callout.label}
                        </Link>
                      ) : null}
                    </div>
                  ) : null}
                  {section.links ? (
                    <div className="mt-5 grid gap-3">
                      {section.links.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          className="rounded-md border border-line bg-paper p-4 transition hover:border-sky hover:bg-mint"
                        >
                          <span className="text-sm font-semibold text-teal">{link.label}</span>
                          {link.description ? <span className="mt-1 block text-sm leading-6 text-slate-600">{link.description}</span> : null}
                        </Link>
                      ))}
                    </div>
                  ) : null}
                </section>
              </Reveal>
            ))}

            {article.faq && article.faq.length > 0 ? (
              <Reveal>
                <section className="rounded-md border border-line bg-white p-6 shadow-soft">
                  <h2 className="text-2xl font-semibold text-ink">Questions fréquentes</h2>
                  <div className="mt-5 grid gap-3">
                    {article.faq.map((item) => (
                      <details key={item.question} className="group rounded-md border border-line bg-paper p-4">
                        <summary className="cursor-pointer text-sm font-semibold leading-6 text-ink">{item.question}</summary>
                        <p className="mt-3 text-sm leading-7 text-slate-600">{item.answer}</p>
                      </details>
                    ))}
                  </div>
                </section>
              </Reveal>
            ) : null}

            {article.sources.length > 0 ? (
              <Reveal>
                <ArticleSourceBox sources={article.sources} />
              </Reveal>
            ) : null}
          </main>

          <aside className="grid gap-5 lg:sticky lg:top-28">
            <ArticleCta cta={article.cta} />
            {calculatorLinks.length > 0 ? (
              <section className="rounded-md border border-line bg-white p-5 shadow-soft">
                <h2 className="text-lg font-semibold text-ink">Calculateurs liés</h2>
                <div className="mt-4 grid gap-2">
                  {calculatorLinks.map((link) => (
                    <Link key={link.href} href={link.href} className="text-sm font-semibold leading-6 text-teal transition hover:text-ink">
                      {link.label}
                    </Link>
                  ))}
                </div>
              </section>
            ) : null}
            <RelatedArticles articles={relatedArticles} />
          </aside>
        </div>
      </section>
    </>
  );
}
