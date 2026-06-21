import { ArrowRight, CheckCircle2 } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { getDictionary, getLocalizedPath, isLocale, locales, pageMetadata, type Locale } from "@/lib/i18n";

type PageProps = {
  params: Promise<{ locale: string }>;
};

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
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeader eyebrow={dictionary.common.eyebrow} title={services.title} lead={services.lead} />
        </Reveal>

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {services.items.map((service, index) => (
            <Reveal key={service.title} delay={index * 0.035}>
              <article className="h-full rounded-md border border-white/10 bg-white/[0.04] p-6 transition hover:border-cyan/40 hover:bg-white/[0.07]">
                <div className="mb-7 inline-flex h-11 w-11 items-center justify-center rounded-full bg-cyan/10 text-cyan">
                  <CheckCircle2 size={20} aria-hidden />
                </div>
                <h2 className="text-xl font-semibold text-white">{service.title}</h2>
                <p className="mt-4 text-sm leading-7 text-slate-300">{service.text}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12 rounded-md border border-cyan/20 bg-cyan/10 p-6 sm:p-8">
          <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <h2 className="text-2xl font-semibold text-white">{services.promiseTitle}</h2>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-200">{services.promise}</p>
            </div>
            <Link
              href={getLocalizedPath(locale, "contact")}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-cyan px-6 text-sm font-semibold text-ink shadow-glow transition hover:bg-mint"
            >
              {dictionary.common.contactCta} <ArrowRight size={18} aria-hidden />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
