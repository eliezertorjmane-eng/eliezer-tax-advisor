import { ArrowRight, BadgeCheck, BriefcaseBusiness, Building2, CheckCircle2, FileCheck2, Landmark, ShieldCheck, UserRound } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageCTA } from "@/components/PageCTA";
import { Reveal } from "@/components/Reveal";
import { getDictionary, getLocalizedPath, getWhatsAppHref, isLocale, locales, pageMetadata, type Locale } from "@/lib/i18n";

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
                  alt="Eliezer Torjmane Tax Advisor"
                  width={112}
                  height={112}
                  className="rounded-full border border-line bg-white p-1 shadow-soft"
                  priority
                />
                <div className="text-end">
                  <p className="text-sm text-slate-500">Israël</p>
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
      <PageCTA locale={locale} />
    </>
  );
}
