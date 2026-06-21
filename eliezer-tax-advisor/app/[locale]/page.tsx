import { ArrowRight, BadgeCheck, Building2, FileCheck2, Landmark, Languages, ShieldCheck, UserRound } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
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

const icons = [Languages, UserRound, Building2];
const processIcons = [ShieldCheck, Landmark, FileCheck2, BadgeCheck];

export default async function HomePage({ params }: PageProps) {
  const resolvedParams = await params;
  const locale = (isLocale(resolvedParams.locale) ? resolvedParams.locale : "fr") as Locale;
  const dictionary = getDictionary(locale);
  const home = dictionary.home;

  return (
    <>
      <section className="relative overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan/60 to-transparent" />
        <div className="mx-auto grid min-h-[calc(100svh-80px)] max-w-7xl items-center gap-12 px-5 py-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-20">
          <Reveal>
            <div>
              <p className="mb-5 inline-flex rounded-full border border-cyan/25 bg-cyan/10 px-4 py-2 text-sm font-semibold text-cyan">
                {dictionary.common.eyebrow}
              </p>
              <h1 className="max-w-4xl text-balance text-5xl font-semibold leading-tight text-white sm:text-6xl lg:text-7xl">
                {home.heroTitle}
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">{home.heroLead}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href={getWhatsAppHref(locale)}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-cyan px-6 text-sm font-semibold text-ink shadow-glow transition hover:bg-mint"
                >
                  {home.primary} <ArrowRight size={18} aria-hidden />
                </a>
                <Link
                  href={getLocalizedPath(locale, "services")}
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/10 px-6 text-sm font-semibold text-white transition hover:border-cyan/50 hover:bg-white/10"
                >
                  {home.secondary}
                </Link>
              </div>
              <div className="mt-9 grid gap-3 sm:grid-cols-3">
                {home.proof.map((item, index) => {
                  const Icon = icons[index];
                  return (
                    <div key={item} className="flex items-center gap-3 rounded-md border border-white/10 bg-white/[0.04] px-4 py-3">
                      <Icon className="text-cyan" size={19} aria-hidden />
                      <span className="text-sm text-slate-200">{item}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.12} className="relative">
            <div className="mesh-panel edge-line rounded-md border border-white/10 p-6 shadow-glow">
              <div className="flex items-center justify-between gap-4">
                <Image
                  src="/logo.png"
                  alt="Eliezer Torjmane Tax Advisor"
                  width={112}
                  height={112}
                  className="rounded-full border border-cyan/25 bg-white/5 p-1"
                  priority
                />
                <div className="text-end">
                  <p className="text-sm text-slate-400">Israel</p>
                  <p className="mt-1 text-2xl font-semibold text-white">Tax guidance</p>
                  <p className="mt-2 text-sm text-cyan">{dictionary.common.response}</p>
                </div>
              </div>
              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {home.statCards.map((item) => (
                  <div key={item.label} className="rounded-md border border-white/10 bg-ink/55 p-4">
                    <p className="text-3xl font-semibold text-cyan">{item.value}</p>
                    <p className="mt-2 text-sm leading-6 text-slate-300">{item.label}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8 rounded-md border border-cyan/20 bg-cyan/10 p-5">
                <p className="text-sm leading-7 text-slate-200">{home.introText}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-y border-white/10 bg-navy/70 py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <Reveal className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <p className="text-sm font-semibold uppercase text-cyan">{home.audienceTitle}</p>
              <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">{home.introTitle}</h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {home.audiences.map((item) => (
                <div key={item} className="rounded-md border border-white/10 bg-white/[0.04] p-5 text-slate-200">
                  {item}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="text-3xl font-semibold text-white sm:text-4xl">{home.processTitle}</h2>
          </Reveal>
          <div className="mt-8 grid gap-4 md:grid-cols-4">
            {home.process.map((item, index) => {
              const Icon = processIcons[index];
              return (
                <Reveal key={item.title} delay={index * 0.04}>
                  <div className="h-full rounded-md border border-white/10 bg-white/[0.04] p-5">
                    <div className="mb-6 inline-flex h-11 w-11 items-center justify-center rounded-full bg-cyan/10 text-cyan">
                      <Icon size={20} aria-hidden />
                    </div>
                    <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-300">{item.text}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
