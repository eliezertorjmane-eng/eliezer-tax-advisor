import {
  BadgeCheck,
  BriefcaseBusiness,
  Compass,
  HeartHandshake,
  Languages,
  MessageSquareText,
  ScanLine,
  ShieldCheck
} from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import { PageCTA } from "@/components/PageCTA";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { getDictionary, isLocale, locales, pageMetadata, type Locale } from "@/lib/i18n";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const locale = isLocale(resolvedParams.locale) ? resolvedParams.locale : "fr";
  return pageMetadata(locale, "about");
}

const icons = [Compass, ScanLine, MessageSquareText, ShieldCheck];
const whyIcons = [BriefcaseBusiness, BadgeCheck, Languages, HeartHandshake];

export default async function AboutPage({ params }: PageProps) {
  const resolvedParams = await params;
  const locale = (isLocale(resolvedParams.locale) ? resolvedParams.locale : "fr") as Locale;
  const dictionary = getDictionary(locale);
  const about = dictionary.about;

  return (
    <>
      <section className="section-band py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.58fr)_minmax(320px,0.42fr)] lg:items-center">
            <div>
              <Reveal>
                <SectionHeader eyebrow={dictionary.common.eyebrow} title={about.title} lead={about.lead} />
              </Reveal>
              <Reveal delay={0.05}>
                <div className="mt-8 space-y-5 text-base leading-8 text-slate-600">
                  <p>{about.body}</p>
                  <p>{about.bodySecondary}</p>
                </div>
              </Reveal>
              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                {about.values.map((item, index) => {
                  const Icon = icons[index];
                  return (
                    <Reveal key={item.title} delay={index * 0.05}>
                      <div className="h-full rounded-md border border-line bg-white p-5 shadow-soft">
                        <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-full bg-mint text-teal">
                          <Icon size={20} aria-hidden />
                        </div>
                        <h2 className="text-xl font-semibold text-ink">{item.title}</h2>
                        <p className="mt-3 text-sm leading-7 text-slate-600">{item.text}</p>
                      </div>
                    </Reveal>
                  );
                })}
              </div>
            </div>

            <Reveal delay={0.08}>
              <figure className="mx-auto w-full max-w-[740px]">
                <div className="overflow-hidden rounded-2xl border border-sky/25 bg-white p-2 shadow-glow">
                  <Image
                    src="/eliezer-profile.jpg"
                    alt={about.profileAlt}
                    width={1200}
                    height={675}
                    className="h-auto w-full rounded-xl"
                    priority
                  />
                </div>
                <figcaption className="mt-4 text-center text-sm font-semibold leading-6 text-teal">
                  {about.profileCaption}
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </div>
      </section>
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeader eyebrow={dictionary.common.eyebrow} title={about.whyTitle} lead={about.whyLead} />
          </Reveal>
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {about.whyItems.map((item, index) => {
              const Icon = whyIcons[index];
              return (
                <Reveal key={item.title} delay={index * 0.05}>
                  <article className="h-full rounded-md border border-line bg-paper p-5 shadow-soft">
                    <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-full bg-mint text-teal">
                      <Icon size={20} aria-hidden />
                    </div>
                    <h2 className="text-xl font-semibold text-ink">{item.title}</h2>
                    <p className="mt-3 text-sm leading-7 text-slate-600">{item.text}</p>
                  </article>
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
