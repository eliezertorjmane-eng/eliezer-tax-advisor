import { ArrowRight, CheckCircle2, MessageCircle } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { PageCTA } from "@/components/PageCTA";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import {
  getCalculatorsPath,
  getDictionary,
  getLocalizedPath,
  getWhatsAppHref,
  isLocale,
  locales,
  pageMetadata,
  type Locale
} from "@/lib/i18n";

type PageProps = {
  params: Promise<{ locale: string }>;
};

const frenchServiceActions = [
  { type: "link", label: "Lire la page", href: "/fr/creation-esek-israel" },
  { type: "link", label: "Lire la page", href: "/fr/declarations-fiscales-israel" },
  { type: "link", label: "Lire la page Ehzer Mass", href: "/fr/hahzar-mas-remboursement-impot-israel" },
  { type: "link", label: "Lire le guide עסק זעיר", href: "/fr/guides/esek-zair-israel-reforme" },
  { type: "link", label: "Utiliser un calculateur", href: "/fr/calculateurs/salaire-brut-net-israel" },
  { type: "whatsapp", label: "Me contacter" }
] as const;

const frenchServiceLinks = [
  [
    { label: "Guide עסק זעיר", href: "/fr/guides/esek-zair-israel-reforme" },
    { label: "Calculateur Bitouah Leumi", href: "/fr/calculateurs/bituah-leumi-independant" }
  ],
  [{ label: "Guides fiscaux", href: "/fr/guides" }],
  [
    { label: "Pré-diagnostic Ehzer Mass", href: "/fr/calculateurs/ehzer-mass" },
    { label: "Cas pratiques", href: "/fr/cas-reels" }
  ],
  [
    { label: "Guide עסק זעיר", href: "/fr/guides/esek-zair-israel-reforme" },
    { label: "Guides indépendants", href: "/fr/guides?category=Ind%C3%A9pendants" }
  ],
  [
    { label: "Ehzer Mass", href: "/fr/hahzar-mas-remboursement-impot-israel" },
    { label: "Calculateur salaire", href: "/fr/calculateurs/salaire-brut-net-israel" }
  ],
  [
    { label: "אישור תושבות מס", href: "/fr/guides/certificat-residence-fiscale-israel" },
    { label: "Revenus locatifs", href: "/fr/guides/revenus-locatifs-israel-masloulei-mas" },
    { label: "מס שבח", href: "/fr/guides/prisat-mas-shevach-israel" }
  ]
] as const;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const locale = isLocale(resolvedParams.locale) ? resolvedParams.locale : "fr";
  return pageMetadata(locale, "services");
}

export default async function ServicesPage({ params }: PageProps) {
  const resolvedParams = await params;
  const locale = (isLocale(resolvedParams.locale) ? resolvedParams.locale : "fr") as Locale;
  const dictionary = getDictionary(locale);
  const services = dictionary.services;

  return (
    <>
      <section className="section-band py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeader eyebrow={dictionary.common.eyebrow} title={services.title} lead={services.lead} />
          </Reveal>

          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {services.items.map((service, index) => {
              const frenchAction = locale === "fr" ? frenchServiceActions[index] : null;
              const secondaryLinks = locale === "fr" ? frenchServiceLinks[index] : [];

              return (
                <Reveal key={service.title} delay={index * 0.035}>
                  <article
                    className={`flex h-full flex-col rounded-md border bg-white p-6 shadow-soft transition hover:-translate-y-0.5 hover:border-sky hover:shadow-glow ${
                      "badge" in service ? "border-sky/40 lg:col-span-2" : "border-line"
                    }`}
                  >
                    <div className="mb-7 inline-flex h-11 w-11 items-center justify-center rounded-full bg-mint text-teal">
                      <CheckCircle2 size={20} aria-hidden />
                    </div>
                    {"badge" in service ? (
                      <span className="mb-4 w-fit rounded-full border border-sky/30 bg-mint px-3 py-1 text-xs font-semibold text-teal">
                        {service.badge}
                      </span>
                    ) : null}
                    <h2 className="text-xl font-semibold text-ink">{service.title}</h2>
                    <p className="mt-4 text-sm leading-7 text-slate-600">{service.text}</p>
                    <div className="mt-5 grid gap-4 border-t border-line pt-5">
                      <div>
                        <p className="text-xs font-semibold uppercase text-teal">{services.labels.audience}</p>
                        <p className="mt-2 text-sm leading-7 text-slate-600">{service.audience}</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase text-teal">{services.labels.clarifies}</p>
                        <p className="mt-2 text-sm leading-7 text-slate-600">{service.clarifies}</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase text-teal">{services.labels.documents}</p>
                        <p className="mt-2 text-sm leading-7 text-slate-600">{service.documents}</p>
                      </div>
                    </div>
                    <div className="mt-auto flex flex-wrap gap-3 pt-6">
                      {frenchAction?.type === "link" ? (
                        <Link
                          href={frenchAction.href}
                          className="inline-flex min-h-10 items-center justify-center gap-2 rounded-full border border-line bg-paper px-4 text-xs font-semibold text-teal transition hover:border-sky hover:bg-mint"
                        >
                          {frenchAction.label}
                          <ArrowRight size={15} aria-hidden />
                        </Link>
                      ) : (
                        <a
                          href={getWhatsAppHref()}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex min-h-10 items-center justify-center gap-2 rounded-full blue-gradient px-4 text-xs font-semibold text-white shadow-glow"
                        >
                          <MessageCircle size={15} aria-hidden />
                          {frenchAction?.label ?? ("badge" in service ? services.labels.featuredCta : dictionary.common.whatsapp)}
                        </a>
                      )}
                      {!frenchAction && service.resourcePath ? (
                        <Link
                          href={service.resourcePath}
                          className="inline-flex min-h-10 items-center justify-center gap-2 rounded-full border border-line bg-paper px-4 text-xs font-semibold text-teal transition hover:border-sky hover:bg-mint"
                        >
                          {dictionary.common.learnMore}
                          <ArrowRight size={15} aria-hidden />
                        </Link>
                      ) : null}
                    </div>
                    {secondaryLinks.length > 0 ? (
                      <div className="mt-5 border-t border-line pt-5">
                        <p className="text-xs font-semibold uppercase text-teal">Guides liés</p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {secondaryLinks.map((link) => (
                            <Link
                              key={link.href}
                              href={link.href}
                              className="rounded-full border border-line bg-paper px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:border-sky hover:bg-mint hover:text-teal"
                            >
                              {link.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ) : null}
                  </article>
                </Reveal>
              );
            })}
          </div>

          <Reveal className="mt-12 rounded-md border border-sky/25 bg-white p-6 shadow-glow sm:p-8">
            <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
              <div>
                <h2 className="text-2xl font-semibold text-ink">{services.promiseTitle}</h2>
                <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">{services.promise}</p>
              </div>
              <Link
                href={getLocalizedPath(locale, "contact")}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full blue-gradient px-6 text-sm font-semibold text-white shadow-glow transition hover:-translate-y-0.5"
              >
                {dictionary.common.contactCta} <ArrowRight size={18} aria-hidden />
              </Link>
              <Link
                href={getCalculatorsPath(locale)}
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-line bg-paper px-6 text-sm font-semibold text-teal transition hover:border-sky hover:bg-mint"
              >
                {dictionary.nav.calculators}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
      <PageCTA locale={locale} />
    </>
  );
}
