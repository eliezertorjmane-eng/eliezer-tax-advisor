import { Compass, MessageSquareText, ScanLine, ShieldCheck } from "lucide-react";
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

export default async function AboutPage({ params }: PageProps) {
  const resolvedParams = await params;
  const locale = (isLocale(resolvedParams.locale) ? resolvedParams.locale : "fr") as Locale;
  const dictionary = getDictionary(locale);
  const about = dictionary.about;

  return (
    <>
      <section className="section-band py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <Reveal>
              <div className="mesh-panel edge-line rounded-md border border-line p-6 shadow-glow">
                <Image
                  src="/logo.png"
                  alt="Eliezer Torjmane Tax Advisor"
                  width={136}
                  height={136}
                  className="rounded-full border border-line bg-white p-1 shadow-soft"
                  priority
                />
                <p className="mt-8 text-sm font-semibold text-teal">{dictionary.common.eyebrow}</p>
                <h2 className="mt-3 text-3xl font-semibold text-ink">{dictionary.common.brand}</h2>
                <p className="mt-5 text-base leading-8 text-slate-600">{about.body}</p>
              </div>
            </Reveal>

            <div>
              <Reveal>
                <SectionHeader eyebrow={dictionary.common.eyebrow} title={about.title} lead={about.lead} />
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
          </div>
        </div>
      </section>
      <PageCTA locale={locale} />
    </>
  );
}
