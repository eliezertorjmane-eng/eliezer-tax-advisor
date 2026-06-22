import { ExternalLink, ShieldCheck } from "lucide-react";
import type { ArticleSource } from "@/lib/content/articleTypes";

type ArticleSourceBoxProps = {
  sources: ArticleSource[];
};

export function ArticleSourceBox({ sources }: ArticleSourceBoxProps) {
  return (
    <section className="rounded-md border border-line bg-white p-5 shadow-soft">
      <div className="flex items-center gap-2">
        <ShieldCheck size={18} className="text-teal" aria-hidden />
        <h2 className="text-lg font-semibold text-ink">Sources et points à vérifier</h2>
      </div>
      <div className="mt-4 grid gap-3">
        {sources.map((source) => (
          <div key={source.label} className="rounded-md border border-line bg-paper p-4">
            {source.href ? (
              <a
                href={source.href}
                target={source.href.startsWith("http") ? "_blank" : undefined}
                rel={source.href.startsWith("http") ? "noreferrer" : undefined}
                className="inline-flex items-center gap-2 text-sm font-semibold leading-6 text-teal transition hover:text-ink"
              >
                {source.label}
                {source.href.startsWith("http") ? <ExternalLink size={14} aria-hidden /> : null}
              </a>
            ) : (
              <p className="text-sm font-semibold leading-6 text-ink">{source.label}</p>
            )}
            {source.note ? <p className="mt-2 text-sm leading-6 text-slate-600">{source.note}</p> : null}
          </div>
        ))}
      </div>
      <p className="mt-4 text-xs leading-6 text-slate-500">
        Les seuils, formulaires et règles fiscales peuvent changer. Les informations doivent être vérifiées selon l’année fiscale et le dossier.
      </p>
    </section>
  );
}
