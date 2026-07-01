import type { Metadata } from "next";
import { articles } from "@/lib/content/articles";
import type { Article, ArticleType } from "@/lib/content/articleTypes";
import { siteUrl, type Locale } from "@/lib/i18n";

export const guideCategoryTabs = [
  "Tous",
  "Ehzer Mass",
  "Immobilier",
  "Indépendants",
  "Olim hadashim",
  "France-Israël",
  "Salariés",
  "Actualités fiscales"
] as const;

const articleTypePath: Record<ArticleType, string> = {
  guide: "guides",
  "case-study": "cas-reels",
  news: "actualites",
  "calculator-guide": "guides"
};

const localeToLanguage: Record<Locale, string> = {
  fr: "fr-FR",
  he: "he-IL",
  en: "en-US"
};

const localeToOgLocale: Record<Locale, string> = {
  fr: "fr_FR",
  he: "he_IL",
  en: "en_US"
};

export function getArticles(locale: Locale = "fr") {
  return articles
    .filter((article) => article.locale === locale)
    .sort((a, b) => a.priority - b.priority || b.updatedAt.localeCompare(a.updatedAt));
}

export function getArticlesByType(type: ArticleType, locale: Locale = "fr") {
  return getArticles(locale).filter((article) => article.type === type);
}

export function getGuideArticles(locale: Locale = "fr") {
  return getArticles(locale).filter((article) => article.type === "guide" || article.type === "calculator-guide");
}

export function getCaseStudyArticles(locale: Locale = "fr") {
  return getArticlesByType("case-study", locale);
}

export function getFeaturedArticles(locale: Locale = "fr", limit = 3) {
  return getGuideArticles(locale)
    .filter((article) => article.featured)
    .sort((a, b) => a.priority - b.priority)
    .slice(0, limit);
}

export function getArticleBySlug(slug: string, locale: Locale = "fr") {
  return getArticles(locale).find((article) => article.slug === slug);
}

export function getArticlePath(article: Article) {
  return `/${article.locale}/${articleTypePath[article.type]}/${article.slug}`;
}

export function getArticleUrl(article: Article) {
  return `${siteUrl}${getArticlePath(article)}`;
}

export function getArticleImageUrl(article?: Article) {
  if (article?.image) {
    return article.image.startsWith("http") ? article.image : `${siteUrl}${article.image}`;
  }

  return `${siteUrl}/logo.png`;
}

export function getRelatedArticles(article: Article) {
  const related = article.relatedArticleSlugs
    .map((slug) => getArticleBySlug(slug, article.locale))
    .filter((item): item is Article => Boolean(item));

  return related.length > 0
    ? related
    : getArticles(article.locale)
        .filter((item) => item.slug !== article.slug && item.category === article.category)
        .slice(0, 3);
}

export function normalizeGuideCategoryFilter(value?: string) {
  if (!value || value === "Tous") {
    return "Tous";
  }

  return guideCategoryTabs.includes(value as (typeof guideCategoryTabs)[number]) ? value : "Tous";
}

export function filterGuidesByCategory(items: Article[], category: string) {
  if (category === "Tous") {
    return items;
  }

  return items.filter((article) => article.category === category || article.tags.includes(category));
}

export function formatArticleDate(value: string, locale: Locale = "fr") {
  return new Intl.DateTimeFormat(locale === "fr" ? "fr-FR" : locale === "he" ? "he-IL" : "en-US", {
    day: "numeric",
    month: "long",
    year: "numeric"
  }).format(new Date(`${value}T00:00:00Z`));
}

export function getRelatedCalculatorLinks(article: Article) {
  const calculatorLinks: Record<string, { href: string; label: string }> = {
    "ehzer-mass": { href: "/fr/calculateurs/ehzer-mass", label: "Pré-diagnostic Ehzer Mass / החזר מס" },
    "bituah-leumi-independant": {
      href: "/fr/calculateurs/bituah-leumi-independant",
      label: "Calculateur Bitouah Leumi indépendant"
    },
    "ole-hadash-nekoudot-zikouy": {
      href: "/fr/calculateurs/ole-hadash-nekoudot-zikouy",
      label: "Calculateur נקודות זיכוי olé hadash"
    },
    "nekoudot-zikouy": { href: "/fr/calculateurs/nekoudot-zikouy", label: "Calculateur נקודות זיכוי" },
    "salaire-brut-net-israel": {
      href: "/fr/calculateurs/salaire-brut-net-israel",
      label: "Calculateur salaire brut / net"
    },
    "impot-revenu-israel": { href: "/fr/calculateurs/impot-revenu-israel", label: "Calculateur impôt sur le revenu" },
    "impot-revenus-locatifs-israel": {
      href: "/fr/calculateurs/impot-revenus-locatifs-israel",
      label: "Calculateur revenus locatifs"
    }
  };

  return article.relatedCalculatorSlugs.map((slug) => calculatorLinks[slug]).filter((item): item is { href: string; label: string } => Boolean(item));
}

export function articleMetadata(article: Article): Metadata {
  const url = getArticleUrl(article);
  const image = getArticleImageUrl(article);

  return {
    title: article.seoTitle,
    description: article.metaDescription,
    keywords: article.keywords,
    alternates: {
      canonical: url,
      languages: {
        [article.locale]: url
      }
    },
    openGraph: {
      title: article.seoTitle,
      description: article.metaDescription,
      url,
      siteName: "Eliezer Torjmane",
      locale: localeToOgLocale[article.locale],
      type: article.type === "case-study" ? "article" : "article",
      images: [{ url: image, width: 512, height: 512, alt: "Eliezer Torjmane" }]
    },
    twitter: {
      card: "summary_large_image",
      title: article.seoTitle,
      description: article.metaDescription,
      images: [image]
    }
  };
}

export function getArticleJsonLd(article: Article) {
  const url = getArticleUrl(article);

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.description,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    author: {
      "@type": "Person",
      name: article.authorName,
      jobTitle: article.authorTitle
    },
    publisher: {
      "@type": "Organization",
      name: "Eliezer Torjmane",
      logo: {
        "@type": "ImageObject",
        url: getArticleImageUrl()
      }
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url
    },
    image: getArticleImageUrl(article),
    inLanguage: localeToLanguage[article.locale],
    keywords: article.keywords.join(", ")
  };
}

export function getBreadcrumbJsonLd(article: Article) {
  const collectionName = article.type === "case-study" ? "Cas réels" : "Guides";
  const collectionPath = article.type === "case-study" ? `/${article.locale}/cas-reels` : `/${article.locale}/guides`;

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Accueil",
        item: `${siteUrl}/${article.locale}`
      },
      {
        "@type": "ListItem",
        position: 2,
        name: collectionName,
        item: `${siteUrl}${collectionPath}`
      },
      {
        "@type": "ListItem",
        position: 3,
        name: article.title,
        item: getArticleUrl(article)
      }
    ]
  };
}

export function getArticleFaqJsonLd(article: Article) {
  if (!article.faq || article.faq.length === 0) {
    return null;
  }

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: article.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer
      }
    }))
  };
}
