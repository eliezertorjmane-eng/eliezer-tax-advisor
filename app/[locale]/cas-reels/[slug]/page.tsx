import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { ArticleLayout } from "@/components/articles/ArticleLayout";
import { articleMetadata, getArticleBySlug, getCaseStudyArticles } from "@/lib/content/articleHelpers";
import { isLocale } from "@/lib/i18n";

type PageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return getCaseStudyArticles("fr").map((article) => ({ locale: "fr", slug: article.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params;
  if (!isLocale(rawLocale) || rawLocale !== "fr") {
    return {};
  }

  const article = getArticleBySlug(slug, rawLocale);
  if (!article || article.type !== "case-study") {
    return {};
  }

  return articleMetadata(article);
}

export default async function CaseStudyArticlePage({ params }: PageProps) {
  const { locale: rawLocale, slug } = await params;

  if (!isLocale(rawLocale) || rawLocale !== "fr") {
    notFound();
  }

  if (slug === "revenus-locatifs-choix-masloul-mas") {
    redirect("/fr/cas-reels/revenus-locatifs-choix-massloul-mass");
  }

  const article = getArticleBySlug(slug, rawLocale);
  if (!article || article.type !== "case-study") {
    notFound();
  }

  return <ArticleLayout article={article} />;
}
