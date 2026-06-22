import { ArrowRight, MessageCircle } from "lucide-react";
import Link from "next/link";
import type { ArticleCta as ArticleCtaType } from "@/lib/content/articleTypes";
import { buildWhatsAppUrl } from "@/lib/i18n";

type ArticleCtaProps = {
  cta: ArticleCtaType;
};

export function ArticleCta({ cta }: ArticleCtaProps) {
  const href = cta.href ?? buildWhatsAppUrl(cta.whatsappMessage ?? cta.text);
  const external = href.startsWith("http");
  const className =
    "inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full blue-gradient px-5 text-sm font-semibold text-white shadow-glow transition hover:-translate-y-0.5";

  return (
    <section className="rounded-md border border-sky/25 bg-white p-5 shadow-glow">
      <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-mint text-teal">
        <MessageCircle size={20} aria-hidden />
      </div>
      <h2 className="text-xl font-semibold text-ink">{cta.title}</h2>
      <p className="mt-3 text-sm leading-7 text-slate-600">{cta.text}</p>
      {external ? (
        <a href={href} target="_blank" rel="noreferrer" className={`${className} mt-5`}>
          {cta.label}
          <ArrowRight size={16} aria-hidden />
        </a>
      ) : (
        <Link href={href} className={`${className} mt-5`}>
          {cta.label}
          <ArrowRight size={16} aria-hidden />
        </Link>
      )}
    </section>
  );
}
