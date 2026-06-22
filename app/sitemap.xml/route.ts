import { frenchCalculatorSlugs } from "@/lib/calculators";
import { articles } from "@/lib/content/articles";
import { getArticleUrl } from "@/lib/content/articleHelpers";
import { getPageUrl, locales, siteUrl, type PageKey } from "@/lib/i18n";
import { resourceSlugs } from "@/lib/resources";

const pages = ["home", "services", "about", "faq", "contact"] as const satisfies readonly PageKey[];

type SitemapEntry = {
  url: string;
  changeFrequency: "weekly" | "monthly";
  priority: number;
  lastModified?: string;
};

function entryToXml(entry: SitemapEntry, fallbackLastModified: string) {
  const lastModified = entry.lastModified ?? fallbackLastModified;

  return [
    "<url>",
    `<loc>${entry.url}</loc>`,
    `<lastmod>${lastModified}</lastmod>`,
    `<changefreq>${entry.changeFrequency}</changefreq>`,
    `<priority>${entry.priority}</priority>`,
    "</url>"
  ].join("\n");
}

export function GET() {
  const localizedPages: SitemapEntry[] = locales.flatMap((locale) =>
    pages.map((page) => ({
      url: getPageUrl(locale, page),
      changeFrequency: page === "home" ? "weekly" : "monthly",
      priority: page === "home" ? 1 : 0.7
    }))
  );

  const frenchResources: SitemapEntry[] = resourceSlugs.map((slug) => ({
    url: `${siteUrl}/fr/${slug}`,
    changeFrequency: "monthly",
    priority: slug === "ressources" ? 0.8 : 0.7
  }));

  const calculatorPages: SitemapEntry[] = [
    `${siteUrl}/fr/calculateurs`,
    `${siteUrl}/en/calculators`,
    `${siteUrl}/he/calculators`,
    ...frenchCalculatorSlugs.map((slug) => `${siteUrl}/fr/calculateurs/${slug}`)
  ].map((url) => ({
    url,
    changeFrequency: "monthly",
    priority: url.endsWith("/calculateurs") || url.endsWith("/calculators") ? 0.85 : 0.75
  }));

  const articleIndexes: SitemapEntry[] = [
    `${siteUrl}/fr/guides`,
    `${siteUrl}/en/guides`,
    `${siteUrl}/he/guides`,
    `${siteUrl}/fr/cas-reels`,
    `${siteUrl}/en/cas-reels`,
    `${siteUrl}/he/cas-reels`
  ].map((url) => ({
    url,
    changeFrequency: "weekly",
    priority: url.includes("/fr/") ? 0.9 : 0.65
  }));

  const articlePages: SitemapEntry[] = articles
    .filter((article) => article.locale === "fr" && (article.type === "guide" || article.type === "case-study"))
    .map((article) => ({
      url: getArticleUrl(article),
      changeFrequency: "monthly",
      priority: article.featured ? 0.85 : 0.78,
      lastModified: new Date(`${article.updatedAt}T00:00:00Z`).toISOString()
    }));

  const lastModified = new Date().toISOString();
  const body = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...[...localizedPages, ...frenchResources, ...calculatorPages, ...articleIndexes, ...articlePages].map((entry) =>
      entryToXml(entry, lastModified)
    ),
    "</urlset>"
  ].join("\n");

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8"
    }
  });
}
