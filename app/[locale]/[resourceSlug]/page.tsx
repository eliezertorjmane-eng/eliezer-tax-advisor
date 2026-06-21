import { ArrowRight, CheckCircle2 } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { PageCTA } from "@/components/PageCTA";
import { ResourceCard } from "@/components/ResourceCard";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { VideoCard } from "@/components/VideoCard";
import { getFaqJsonLd, getWhatsAppHref, siteUrl } from "@/lib/i18n";
import {
  frenchResourcePages,
  frenchVideoResources,
  getFrenchResourcePage,
  resourceIndexCards,
  resourceSlugs
} from "@/lib/resources";

type PageProps = {
  params: Promise<{ locale: string; resourceSlug: string }>;
};

function resourceUrl(slug: string) {
  return `${siteUrl}/fr/${slug}`;
}

function relatedCalculatorLinks(slug: string) {
  if (slug === "creation-esek-israel") {
    return [{ href: "/fr/calculateurs/bituah-leumi-independant", label: "Calculateur Bituah Leumi indépendant" }];
  }

  if (slug === "fiscalite-salaries-israel") {
    return [
      { href: "/fr/calculateurs/salaire-brut-net-israel", label: "Calculateur salaire brut / net" },
      { href: "/fr/calculateurs/ehzer-mass", label: "Pré-diagnostic Ehzer Mass" }
    ];
  }

  if (slug === "olim-hadashim-fiscalite-israel") {
    return [{ href: "/fr/calculateurs/ole-hadash-nekoudot-zikouy", label: "Calculateur נקודות זיכוי olé hadash" }];
  }

  if (slug === "hahzar-mas-remboursement-impot-israel") {
    return [{ href: "/fr/calculateurs/ehzer-mass", label: "Pré-diagnostic Ehzer Mass / החזר מס" }];
  }

  return [];
}

function metadataForResource(slug: string): Metadata {
  if (slug === "ressources") {
    return {
      title: "Ressources fiscalité Israël | Eliezer Torjmane",
      description:
        "Guides pratiques pour francophones en Israël : ouverture d’un עסק, remboursement d’impôt / Ehzer Mass (החזר מס), déclarations fiscales, salariés et olim hadashim.",
      alternates: { canonical: resourceUrl(slug) },
      openGraph: {
        title: "Ressources fiscalité Israël | Eliezer Torjmane",
        description:
          "Guides pratiques pour comprendre les démarches fiscales en Israël avec un accompagnement francophone.",
        url: resourceUrl(slug),
        siteName: "Eliezer Torjmane",
        locale: "fr_FR",
        type: "website",
        images: [{ url: `${siteUrl}/logo.png`, width: 512, height: 512, alt: "Eliezer Torjmane" }]
      }
    };
  }

  if (slug === "videos") {
    return {
      title: "Vidéos fiscalité Israël | Eliezer Torjmane",
      description:
        "Retrouvez les vidéos et interventions d’Eliezer Torjmane sur les démarches fiscales en Israël, l’ouverture d’un עסק, Ehzer Mass (החזר מס) et les questions des francophones.",
      alternates: { canonical: resourceUrl(slug) },
      openGraph: {
        title: "Vidéos fiscalité Israël | Eliezer Torjmane",
        description: "Vidéos et conseils pratiques sur les démarches fiscales en Israël.",
        url: resourceUrl(slug),
        siteName: "Eliezer Torjmane",
        locale: "fr_FR",
        type: "website",
        images: [{ url: `${siteUrl}/logo.png`, width: 512, height: 512, alt: "Eliezer Torjmane" }]
      }
    };
  }

  const page = getFrenchResourcePage(slug);
  if (!page) {
    return {};
  }

  return {
    title: page.seoTitle,
    description: page.metaDescription,
    alternates: { canonical: resourceUrl(slug) },
    openGraph: {
      title: page.seoTitle,
      description: page.metaDescription,
      url: resourceUrl(slug),
      siteName: "Eliezer Torjmane",
      locale: "fr_FR",
      type: "article",
      images: [{ url: `${siteUrl}/logo.png`, width: 512, height: 512, alt: "Eliezer Torjmane" }]
    },
    twitter: {
      card: "summary_large_image",
      title: page.seoTitle,
      description: page.metaDescription,
      images: [`${siteUrl}/logo.png`]
    }
  };
}

export function generateStaticParams() {
  return [
    ...resourceSlugs.map((resourceSlug) => ({ locale: "fr", resourceSlug })),
    { locale: "fr", resourceSlug: "remboursement-impot-ehzer-mass-israel" }
  ];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, resourceSlug } = await params;
  if (locale !== "fr") {
    return {};
  }

  return metadataForResource(resourceSlug);
}

function ResourcesIndexPage() {
  return (
    <>
      <section className="section-band py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeader
              eyebrow="Ressources"
              title="Vos démarches fiscales en Israël, expliquées simplement"
              lead="Des guides pratiques pour comprendre les démarches les plus fréquentes : ouverture d’un עסק, remboursement d’impôt / Ehzer Mass (החזר מס), déclarations fiscales, salariés et olim hadashim."
            />
          </Reveal>
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {resourceIndexCards.map((card, index) => (
              <Reveal key={card.href} delay={index * 0.04}>
                <ResourceCard {...card} />
              </Reveal>
            ))}
            <Reveal delay={resourceIndexCards.length * 0.04}>
              <ResourceCard
                href="/fr/videos"
                title="Vidéos & conseils pratiques"
                description="Retrouvez les interventions et vidéos courtes pour mieux comprendre les questions fiscales en Israël."
                cta="Voir les vidéos"
              />
            </Reveal>
          </div>
        </div>
      </section>
      <PageCTA locale="fr" />
    </>
  );
}

function VideosPage() {
  return (
    <>
      <section className="section-band py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeader
              eyebrow="Ressources"
              title="Vidéos & conseils fiscaux"
              lead="Retrouvez les vidéos et interventions d’Eliezer Torjmane sur les démarches fiscales en Israël, l’ouverture d’un עסק, Ehzer Mass (החזר מס) et les questions des francophones."
            />
          </Reveal>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {frenchVideoResources.map((video, index) => (
              <Reveal key={video.url} delay={index * 0.05}>
                <VideoCard {...video} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <PageCTA locale="fr" />
    </>
  );
}

function DetailPage({ slug }: { slug: string }) {
  const page = getFrenchResourcePage(slug);

  if (!page) {
    notFound();
  }
  const relatedLinks = relatedCalculatorLinks(slug);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(getFaqJsonLd(page.faq)) }} />
      <section className="section-band py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeader eyebrow="Guide fiscal Israël" title={page.title} lead={page.lead} />
          </Reveal>
          <div className="mt-10 grid gap-5 lg:grid-cols-[1fr_320px] lg:items-start">
            <div className="grid gap-5">
              {page.sections.map((section, index) => (
                <Reveal key={section.title} delay={index * 0.035}>
                  <article className="rounded-md border border-line bg-white p-6 shadow-soft">
                    <h2 className="text-2xl font-semibold text-ink">{section.title}</h2>
                    {section.paragraphs ? (
                      <div className="mt-4 space-y-4">
                        {section.paragraphs.map((paragraph) => (
                          <p key={paragraph} className="text-sm leading-7 text-slate-600">
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    ) : null}
                    {section.bullets ? (
                      <ul className="mt-4 grid gap-3">
                        {section.bullets.map((bullet) => (
                          <li key={bullet} className="flex gap-3 text-sm leading-7 text-slate-600">
                            <CheckCircle2 className="mt-1 shrink-0 text-teal" size={18} aria-hidden />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </article>
                </Reveal>
              ))}
              <Reveal>
                <article className="rounded-md border border-line bg-white p-6 shadow-soft">
                  <h2 className="text-2xl font-semibold text-ink">FAQ spécifique</h2>
                  <div className="mt-5 grid gap-4">
                    {page.faq.map((item) => (
                      <div key={item.question} className="rounded-md border border-line bg-paper p-4">
                        <h3 className="font-semibold text-ink">{item.question}</h3>
                        <p className="mt-2 text-sm leading-7 text-slate-600">{item.answer}</p>
                      </div>
                    ))}
                  </div>
                </article>
              </Reveal>
            </div>

            <aside className="sticky top-28 rounded-md border border-sky/25 bg-white p-5 shadow-glow">
              <h2 className="text-xl font-semibold text-ink">Besoin de clarifier votre situation ?</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                Envoyez un message avec votre situation, les documents disponibles et la démarche qui vous bloque.
              </p>
              <a
                href={getWhatsAppHref()}
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex min-h-11 items-center justify-center gap-2 rounded-full blue-gradient px-5 text-sm font-semibold text-white shadow-glow"
              >
                Me contacter sur WhatsApp
                <ArrowRight size={16} aria-hidden />
              </a>
              <div className="mt-6 border-t border-line pt-5">
                <Link href="/fr/ressources" className="text-sm font-semibold text-teal transition hover:text-ink">
                  Voir toutes les ressources
                </Link>
                {relatedLinks.length > 0 ? (
                  <div className="mt-5 grid gap-2">
                    <p className="text-xs font-semibold uppercase text-slate-500">Calculateurs liés</p>
                    {relatedLinks.map((link) => (
                      <Link key={link.href} href={link.href} className="text-sm font-semibold text-teal transition hover:text-ink">
                        {link.label}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>
            </aside>
          </div>
        </div>
      </section>
      <PageCTA locale="fr" />
    </>
  );
}

export default async function FrenchResourceRoute({ params }: PageProps) {
  const { locale, resourceSlug } = await params;

  if (locale !== "fr") {
    notFound();
  }

  if (resourceSlug === "remboursement-impot-ehzer-mass-israel") {
    redirect("/fr/hahzar-mas-remboursement-impot-israel");
  }

  if (resourceSlug === "ressources") {
    return <ResourcesIndexPage />;
  }

  if (resourceSlug === "videos") {
    return <VideosPage />;
  }

  if (!frenchResourcePages.some((page) => page.slug === resourceSlug)) {
    notFound();
  }

  return <DetailPage slug={resourceSlug} />;
}
