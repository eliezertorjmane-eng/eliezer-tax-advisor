import { HelpCircle } from "lucide-react";
import type { Metadata } from "next";
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
  return pageMetadata(locale, "faq");
}

export default async function FaqPage({ params }: PageProps) {
  const resolvedParams = await params;
  const locale = (isLocale(resolvedParams.locale) ? resolvedParams.locale : "fr") as Locale;
  const dictionary = getDictionary(locale);
  const faq = dictionary.faq;

  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-4xl px-5 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeader eyebrow={dictionary.common.eyebrow} title={faq.title} lead={faq.lead} align="center" />
        </Reveal>
        <div className="mt-12 grid gap-4">
          {faq.items.map((item, index) => (
            <Reveal key={item.question} delay={index * 0.035}>
              <details className="group rounded-md border border-white/10 bg-white/[0.04] p-5 open:border-cyan/40 open:bg-white/[0.07]">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-5 text-lg font-semibold text-white">
                  <span className="flex items-center gap-3">
                    <HelpCircle className="shrink-0 text-cyan" size={20} aria-hidden />
                    {item.question}
                  </span>
                  <span className="text-cyan transition group-open:rotate-45">+</span>
                </summary>
                <p className="mt-4 text-sm leading-7 text-slate-300">{item.answer}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
