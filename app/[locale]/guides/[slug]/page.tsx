import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleLayout } from "@/components/articles/ArticleLayout";
import { articleMetadata, getArticleBySlug, getGuideArticles } from "@/lib/content/articleHelpers";
import { isLocale } from "@/lib/i18n";

type PageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return getGuideArticles("fr").map((article) => ({ locale: "fr", slug: article.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params;
  if (!isLocale(rawLocale) || rawLocale !== "fr") {
    return {};
  }

  const article = getArticleBySlug(slug, rawLocale);
  if (!article || (article.type !== "guide" && article.type !== "calculator-guide")) {
    return {};
  }

  return articleMetadata(article);
}

export default async function GuideArticlePage({ params }: PageProps) {
  const { locale: rawLocale, slug } = await params;

  if (!isLocale(rawLocale) || rawLocale !== "fr") {
    notFound();
  }

  const article = getArticleBySlug(slug, rawLocale);
  if (!article || (article.type !== "guide" && article.type !== "calculator-guide")) {
    notFound();
  }

  return <ArticleLayout article={article} />;
}
