import { ExternalLink, PlayCircle } from "lucide-react";

type VideoCardProps = {
  url: string;
  title: string;
  description: string;
};

export function VideoCard({ url, title, description }: VideoCardProps) {
  return (
    <article className="h-full rounded-md border border-line bg-white p-5 shadow-soft transition hover:-translate-y-0.5 hover:border-sky hover:shadow-glow">
      <div className="flex items-center justify-between gap-4">
        <div className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-mint text-teal">
          <PlayCircle size={20} aria-hidden />
        </div>
        <span className="rounded-full border border-sky/30 bg-soft px-3 py-1 text-xs font-semibold text-teal">
          Instagram
        </span>
      </div>
      <h3 className="mt-5 text-xl font-semibold text-ink">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-slate-600">{description}</p>
      <a
        href={url}
        target="_blank"
        rel="noreferrer"
        className="mt-5 inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-line bg-paper px-5 text-sm font-semibold text-teal transition hover:border-sky hover:bg-mint"
      >
        Voir la vidéo
        <ExternalLink size={16} aria-hidden />
      </a>
    </article>
  );
}
