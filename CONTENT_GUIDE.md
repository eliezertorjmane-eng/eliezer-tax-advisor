# Content Guide

This site keeps editorial content in `lib/content/articles.ts`.

## Add a New Guide

1. Add a new object to the `articles` array.
2. Use `type: "guide"` and `locale: "fr"` unless the full article is professionally translated.
3. Set a stable `slug`; the public URL will be `/fr/guides/{slug}`.
4. Fill `publishedAt` and `updatedAt` in `YYYY-MM-DD` format.
5. Add `sources`, even if one source is a temporary TODO before final publication.
6. Add `relatedArticleSlugs` and `relatedCalculatorSlugs` to strengthen internal links.
7. Set `featured: true` only for homepage-level articles, then control order with `priority`.

## Add a New Case Study

1. Add a new object to `articles` with `type: "case-study"`.
2. Use anonymized wording: `cas pratique anonymisé` or `exemple inspiré de situations rencontrées`.
3. Do not include names, exact client facts, addresses, amounts or identifying details.
4. Fill the `caseStudy` block with `situation`, `problem`, `analysis` and `lesson`.
5. Link the related guide with `relatedArticleSlugs`.

## Dates and Updates

- `publishedAt` is the first publication date.
- `updatedAt` must change when rules, thresholds, sources, examples or legal wording are updated.
- Tax articles should always show `Mis à jour` clearly because rules and thresholds change.

## Sources

- Prefer official Israeli Tax Authority, gov.il, legislation or official treaty links.
- Use `status: "verified"` when the source is ready.
- Use `status: "todo"` with a short note when a source must be completed before final publication.

## Related Content

- Use `relatedArticleSlugs` for guides and case studies.
- Use `relatedCalculatorSlugs` only for active calculators listed in `lib/calculators.ts`.
- Do not add a non-functional calculator to `frenchCalculatorSlugs`; use an article callout instead.

## Sitemap and Build

- Article pages are added to the sitemap automatically from `lib/content/articles.ts`.
- Check the generated sitemap after adding content.
- Run:

```bash
npm run lint
npm run typecheck
npm run build
```

## Example

```ts
{
  slug: "example-guide-slug",
  locale: "fr",
  type: "guide",
  category: "France-Israël",
  title: "Titre du guide",
  seoTitle: "Titre SEO du guide",
  shortTitle: "Titre court",
  description: "Résumé visible en haut de page.",
  metaDescription: "Meta description SEO.",
  excerpt: "Texte court pour les cartes.",
  publishedAt: "2026-06-22",
  updatedAt: "2026-06-22",
  fiscalYear: "2026",
  readingTime: "6 min",
  authorName: "Eliezer Torjmane",
  authorTitle: "Conseiller fiscal agréé en Israël",
  tags: ["tag 1", "tag 2"],
  keywords: ["mot clé 1", "mot clé 2"],
  featured: false,
  priority: 20,
  heroLabel: "Guide pratique",
  relatedArticleSlugs: [],
  relatedCalculatorSlugs: [],
  sources: [{ label: "Source officielle", href: "https://www.gov.il/", status: "verified" }],
  cta: {
    title: "Question à vérifier ?",
    text: "Contactez Eliezer pour clarifier le dossier.",
    label: "Parler avec Eliezer",
    whatsappMessage: "Bonjour Eliezer, je souhaite vérifier ma situation."
  },
  sections: [
    {
      title: "Premier point à comprendre",
      paragraphs: ["Texte simple, pratique et prudent."]
    }
  ]
}
```
