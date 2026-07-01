import { ArrowRight, BadgeCheck, BriefcaseBusiness, Building2, CheckCircle2, FileCheck2, Landmark, ShieldCheck, UserRound } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageCTA } from "@/components/PageCTA";
import { ArticleCard } from "@/components/articles/ArticleCard";
import { Reveal } from "@/components/Reveal";
import { ResourceCard } from "@/components/ResourceCard";
import { VideoCard } from "@/components/VideoCard";
import { getFeaturedArticles } from "@/lib/content/articleHelpers";
import {
  buildWhatsAppUrl,
  getCalculatorsPath,
  getDictionary,
  getLocalizedPath,
  getWhatsAppHref,
  isLocale,
  locales,
  pageMetadata,
  type Locale
} from "@/lib/i18n";
import { frenchVideoResources, resourceIndexCards } from "@/lib/resources";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const locale = isLocale(resolvedParams.locale) ? resolvedParams.locale : "fr";
  return pageMetadata(locale, "home");
}

const icons = [BadgeCheck, UserRound, BriefcaseBusiness, Building2];
const processIcons = [ShieldCheck, Landmark, FileCheck2, BadgeCheck];

export default async function HomePage({ params }: PageProps) {
  const resolvedParams = await params;
  const locale = (isLocale(resolvedParams.locale) ? resolvedParams.locale : "fr") as Locale;
  const dictionary = getDictionary(locale);
  const home = dictionary.home;
  const countryLabel = locale === "fr" ? "Israël" : locale === "he" ? "ישראל" : "Israel";
  const featuredArticles = locale === "fr" ? getFeaturedArticles("fr", 3) : [];

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-paper to-soft">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky/60 to-transparent" />
        <div className="mx-auto grid min-h-[calc(100svh-80px)] max-w-7xl items-center gap-12 px-5 py-16 sm:px-6 lg:grid-cols-[1.03fr_0.97fr] lg:px-8 lg:py-20">
          <Reveal>
            <div>
              <p className="mb-5 inline-flex rounded-full border border-line bg-white px-4 py-2 text-sm font-semibold text-teal shadow-soft">
                {dictionary.common.eyebrow}
              </p>
              <h1 className="max-w-4xl text-balance text-5xl font-semibold leading-tight text-ink sm:text-6xl lg:text-7xl">
                {home.heroTitle}
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl">{home.heroLead}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href={getWhatsAppHref()}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full blue-gradient px-6 text-sm font-semibold text-white shadow-glow transition hover:-translate-y-0.5"
                >
                  {home.primary} <ArrowRight size={18} aria-hidden />
                </a>
                <Link
                  href={getLocalizedPath(locale, "services")}
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-line bg-white px-6 text-sm font-semibold text-teal shadow-soft transition hover:border-sky hover:bg-mint"
                >
                  {home.secondary}
                </Link>
              </div>
              <div className="mt-9 grid gap-3 sm:grid-cols-2">
                {home.trustSignals.map((item, index) => {
                  const Icon = icons[index];
                  return (
                    <div key={item} className="flex items-center gap-3 rounded-md border border-line bg-white px-4 py-3 shadow-soft">
                      <Icon className="text-teal" size={19} aria-hidden />
                      <span className="text-sm font-medium text-slate-700">{item}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.12} className="relative">
            <div className="mesh-panel edge-line rounded-md border border-line p-6 shadow-glow">
              <div className="flex items-center justify-between gap-4">
                <Image
                  src="/logo.png"
                  alt="Eliezer Torjmane"
                  width={112}
                  height={112}
                  className="rounded-full border border-line bg-white p-1 shadow-soft"
                  priority
                />
                <div className="text-end">
                  <p className="text-sm text-slate-500">{countryLabel}</p>
                  <p className="mt-1 text-2xl font-semibold text-ink">{home.heroCardTitle}</p>
                  <p className="mt-2 text-sm font-medium text-teal">{dictionary.common.response}</p>
                </div>
              </div>
              <p className="mt-8 text-base leading-7 text-slate-600">{home.heroCardText}</p>
              <div className="mt-7 grid gap-3">
                {home.heroCardRows.map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-md border border-line bg-white/80 p-4">
                    <CheckCircle2 className="mt-0.5 shrink-0 text-teal" size={19} aria-hidden />
                    <span className="text-sm leading-6 text-slate-700">{item}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8 rounded-md border border-sky/25 bg-mint p-5">
                <p className="text-sm leading-7 text-slate-700">{home.introText}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {locale === "fr" ? (
        <section className="bg-white py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
            <Reveal>
              <div className="rounded-md border border-sky/25 bg-gradient-to-br from-white via-mint to-soft p-6 shadow-glow sm:p-8">
                <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-center">
                  <div>
                    <p className="text-sm font-semibold uppercase text-teal">Service très demandé</p>
                    <h2 className="mt-3 text-3xl font-semibold text-ink sm:text-4xl">
                      Vous avez peut-être droit à un Ehzer Mass
                    </h2>
                    <p className="mt-5 text-base leading-8 text-slate-600">
                      Un changement d’employeur, une année travaillée partiellement, plusieurs revenus, une alyah récente
                      ou des crédits non utilisés peuvent parfois justifier une vérification. L’objectif : comprendre si
                      une demande de remboursement d’impôt / החזר מס est pertinente dans votre situation.
                    </p>
                    <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                      <a
                        href={buildWhatsAppUrl(
                          "Bonjour Eliezer, je souhaite vérifier si j’ai droit à un Ehzer Mass / החזר מס en Israël."
                        )}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex min-h-12 items-center justify-center rounded-full blue-gradient px-6 text-sm font-semibold text-white shadow-glow transition hover:-translate-y-0.5"
                      >
                        Vérifier mon Ehzer Mass sur WhatsApp
                      </a>
                      <Link
                        href="/fr/hahzar-mas-remboursement-impot-israel"
                        className="inline-flex min-h-12 items-center justify-center rounded-full border border-line bg-white px-6 text-sm font-semibold text-teal shadow-soft transition hover:border-sky hover:bg-mint"
                      >
                        Lire la page Ehzer Mass
                      </Link>
                    </div>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {[
                      "Changement d’employeur",
                      "Année travaillée partiellement",
                      "Plusieurs revenus ou employeurs",
                      "Crédit d’impôt / נקודות זיכוי non utilisé"
                    ].map((item) => (
                      <div key={item} className="rounded-md border border-line bg-white p-4 text-sm font-semibold text-slate-700 shadow-soft">
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      ) : null}

      {locale === "fr" ? (
        <section className="section-band border-y border-line py-20">
          <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
            <Reveal>
              <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
                <div className="max-w-3xl">
                  <p className="text-sm font-semibold uppercase text-teal">Guides fiscaux</p>
                  <h2 className="mt-3 text-3xl font-semibold text-ink sm:text-4xl">Guides pratiques et cas réels</h2>
                  <p className="mt-5 text-base leading-8 text-slate-600">
                    Des explications claires sur les démarches fiscales en Israël, avec des exemples concrets, des termes
                    hébreux expliqués et des points d’attention à vérifier avant d’agir.
                  </p>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/fr/guides"
                    className="inline-flex min-h-12 items-center justify-center rounded-full blue-gradient px-6 text-sm font-semibold text-white shadow-glow transition hover:-translate-y-0.5"
                  >
                    Voir tous les guides
                  </Link>
                  <Link
                    href="/fr/cas-reels"
                    className="inline-flex min-h-12 items-center justify-center rounded-full border border-line bg-white px-6 text-sm font-semibold text-teal shadow-soft transition hover:border-sky hover:bg-mint"
                  >
                    Cas pratiques fiscaux en Israël
                  </Link>
                  <a
                    href={getWhatsAppHref()}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex min-h-12 items-center justify-center rounded-full border border-line bg-white px-6 text-sm font-semibold text-teal shadow-soft transition hover:border-sky hover:bg-mint"
                  >
                    Parler avec Eliezer
                  </a>
                </div>
              </div>
            </Reveal>
            <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {featuredArticles.map((article, index) => (
                <Reveal key={article.slug} delay={index * 0.04}>
                  <ArticleCard article={article} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="section-band border-y border-line py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <Reveal className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <p className="text-sm font-semibold uppercase text-teal">{home.audienceTitle}</p>
              <h2 className="mt-3 text-3xl font-semibold text-ink sm:text-4xl">{home.introTitle}</h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {home.audiences.map((item) => (
                <div key={item} className="rounded-md border border-line bg-white p-5 text-slate-700 shadow-soft">
                  {item}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="text-3xl font-semibold text-ink sm:text-4xl">{home.processTitle}</h2>
          </Reveal>
          <div className="mt-8 grid gap-4 md:grid-cols-4">
            {home.process.map((item, index) => {
              const Icon = processIcons[index];
              return (
                <Reveal key={item.title} delay={index * 0.04}>
                  <div className="h-full rounded-md border border-line bg-paper p-5 shadow-soft">
                    <div className="mb-6 inline-flex h-11 w-11 items-center justify-center rounded-full bg-mint text-teal">
                      <Icon size={20} aria-hidden />
                    </div>
                    <h3 className="text-xl font-semibold text-ink">{item.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-600">{item.text}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>
      {locale === "fr" ? (
        <>
          <section className="section-band border-y border-line py-20">
            <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
              <Reveal>
                <h2 className="max-w-3xl text-3xl font-semibold text-ink sm:text-4xl">
                  Vos démarches fiscales en Israël, expliquées simplement
                </h2>
              </Reveal>
              <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {resourceIndexCards.map((card, index) => (
                  <Reveal key={card.href} delay={index * 0.04}>
                    <ResourceCard {...card} />
                  </Reveal>
                ))}
                <Reveal delay={resourceIndexCards.length * 0.04}>
                  <ResourceCard
                    href={getCalculatorsPath(locale)}
                    title="Utiliser un calculateur fiscal"
                    description="Pré-diagnostic Ehzer Mass, Bitouah Leumi, נקודות זיכוי, salaire brut/net et impôt sur le revenu."
                    cta="Voir les calculateurs"
                  />
                </Reveal>
              </div>
            </div>
          </section>
          <section className="bg-white py-20">
            <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
              <Reveal>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="text-sm font-semibold uppercase text-teal">Ressources</p>
                    <h2 className="mt-3 text-3xl font-semibold text-ink sm:text-4xl">Vidéos & conseils pratiques</h2>
                  </div>
                  <Link
                    href="/fr/videos"
                    className="inline-flex min-h-11 items-center justify-center rounded-full border border-line bg-paper px-5 text-sm font-semibold text-teal transition hover:border-sky hover:bg-mint"
                  >
                    Voir toutes les vidéos
                  </Link>
                </div>
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
        </>
      ) : null}
      <PageCTA locale={locale} />
    </>
  );
}
