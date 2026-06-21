import type { MetadataRoute } from "next";
import { getPageUrl, locales, siteUrl, type PageKey } from "@/lib/i18n";
import { resourceSlugs } from "@/lib/resources";

const pages = ["home", "services", "about", "faq", "contact"] as const satisfies readonly PageKey[];

export default function sitemap(): MetadataRoute.Sitemap {
  const localizedPages = locales.flatMap((locale) =>
    pages.map((page) => ({
      url: getPageUrl(locale, page),
      lastModified: new Date(),
      changeFrequency: page === "home" ? ("weekly" as const) : ("monthly" as const),
      priority: page === "home" ? 1 : 0.7
    }))
  );

  const frenchResources = resourceSlugs.map((slug) => ({
    url: `${siteUrl}/fr/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: slug === "ressources" ? 0.8 : 0.7
  }));

  return [...localizedPages, ...frenchResources];
}
