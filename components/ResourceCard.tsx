import { ArrowRight, FileText } from "lucide-react";
import Link from "next/link";

type ResourceCardProps = {
  href: string;
  title: string;
  description: string;
  cta?: string;
};

export function ResourceCard({ href, title, description, cta = "Lire la page" }: ResourceCardProps) {
  return (
    <Link
      href={href}
      className="group flex h-full flex-col rounded-md border border-line bg-white p-5 shadow-soft transition hover:-translate-y-0.5 hover:border-sky hover:shadow-glow"
    >
      <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-full bg-mint text-teal">
        <FileText size={20} aria-hidden />
      </div>
      <h3 className="text-xl font-semibold text-ink">{title}</h3>
      <p className="mt-3 grow text-sm leading-7 text-slate-600">{description}</p>
      <span className="mt-6 inline-flex min-h-10 w-fit items-center gap-2 whitespace-nowrap rounded-full border border-line bg-paper px-4 text-sm font-semibold text-teal transition group-hover:border-sky group-hover:bg-mint">
        {cta}
        <ArrowRight size={16} className="transition group-hover:translate-x-1" aria-hidden />
      </span>
    </Link>
  );
}
