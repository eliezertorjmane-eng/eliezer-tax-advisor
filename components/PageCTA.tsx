import { ArrowRight, MessageCircle } from "lucide-react";
import { getDictionary, getWhatsAppHref, type Locale } from "@/lib/i18n";

type PageCTAProps = {
  locale: Locale;
};

export function PageCTA({ locale }: PageCTAProps) {
  const dictionary = getDictionary(locale);

  return (
    <section className="px-5 pb-16 sm:px-6 sm:pb-20 lg:px-8">
      <div className="mx-auto max-w-7xl rounded-md border border-line bg-white p-6 shadow-glow sm:p-8">
        <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-mint text-teal">
              <MessageCircle size={20} aria-hidden />
            </div>
            <h2 className="text-2xl font-semibold text-ink">{dictionary.common.ctaTitle}</h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">{dictionary.common.ctaText}</p>
          </div>
          <a
            href={getWhatsAppHref()}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full blue-gradient px-6 text-sm font-semibold text-white shadow-glow transition hover:-translate-y-0.5"
          >
            {dictionary.common.contactCta} <ArrowRight size={18} aria-hidden />
          </a>
        </div>
      </div>
    </section>
  );
}
