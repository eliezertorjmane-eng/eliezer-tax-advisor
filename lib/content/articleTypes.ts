import type { Locale } from "@/lib/i18n";

export type ArticleType = "guide" | "case-study" | "news" | "calculator-guide";

export type ArticleSource = {
  label: string;
  href?: string;
  note?: string;
  status?: "verified" | "todo";
};

export type ArticleCta = {
  title: string;
  text: string;
  label: string;
  href?: string;
  whatsappMessage?: string;
};

export type ArticleInlineLink = {
  href: string;
  label: string;
  description?: string;
};

export type ArticleCallout = {
  title?: string;
  text: string;
  tone?: "info" | "warning";
  href?: string;
  label?: string;
};

export type ArticleSection = {
  id?: string;
  title: string;
  eyebrow?: string;
  paragraphs?: string[];
  bullets?: string[];
  numbered?: string[];
  callout?: ArticleCallout;
  links?: ArticleInlineLink[];
};

export type ArticleFaq = {
  question: string;
  answer: string;
};

export type CaseStudyDetails = {
  situation: string;
  problem: string;
  analysis: string;
  lesson: string;
};

export type Article = {
  slug: string;
  locale: Locale;
  type: ArticleType;
  category: string;
  title: string;
  seoTitle: string;
  shortTitle: string;
  description: string;
  metaDescription: string;
  excerpt: string;
  publishedAt: string;
  updatedAt: string;
  fiscalYear: string;
  readingTime: string;
  authorName: string;
  authorTitle: string;
  tags: string[];
  keywords: string[];
  image?: string;
  imageAlt?: string;
  imagePosition?: string;
  imageTheme?: string;
  featured: boolean;
  priority: number;
  heroLabel: string;
  relatedArticleSlugs: string[];
  relatedCalculatorSlugs: string[];
  sources: ArticleSource[];
  cta: ArticleCta;
  sections: ArticleSection[];
  faq?: ArticleFaq[];
  caseStudy?: CaseStudyDetails;
};
