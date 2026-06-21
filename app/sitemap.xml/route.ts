import { frenchCalculatorSlugs } from "@/lib/calculators";
import { getPageUrl, locales, siteUrl, type PageKey } from "@/lib/i18n";
import { resourceSlugs } from "@/lib/resources";

const pages = ["home", "services", "about", "faq", "contact"] as const satisfies readonly PageKey[];

type SitemapEntry = {
  url: string;
  changeFrequency: "weekly" | "monthly";
  priority: number;
};

function entryToXml(entry: SitemapEntry, lastModified: string) {
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

  const lastModified = new Date().toISOString();
  const body = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...[...localizedPages, ...frenchResources, ...calculatorPages].map((entry) => entryToXml(entry, lastModified)),
    "</urlset>"
  ].join("\n");

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8"
    }
  });
}
