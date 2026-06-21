"use client";

import { ArrowRight, ExternalLink, Info, RotateCcw } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";
import { buildWhatsAppUrl, type Locale } from "@/lib/i18n";

export function CalculatorShell({
  title,
  subtitle,
  children
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
}) {
  return (
    <section className="section-band py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="mb-3 text-sm font-semibold uppercase text-teal">Constantes 2026 — à vérifier chaque année</p>
          <h1 className="text-balance text-4xl font-semibold text-ink sm:text-5xl">{title}</h1>
          <p className="mt-5 text-lg leading-8 text-slate-600">{subtitle}</p>
        </div>
        <div className="mt-10">{children}</div>
      </div>
    </section>
  );
}

export function DisclaimerBox({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-md border border-sky/25 bg-mint p-5 text-sm leading-7 text-slate-700">
      <div className="flex gap-3">
        <Info className="mt-1 shrink-0 text-teal" size={18} aria-hidden />
        <div>{children}</div>
      </div>
    </div>
  );
}

export function CalculatorInput({
  label,
  help,
  value,
  onChange,
  type = "number",
  step = "1",
  min = "0"
}: {
  label: string;
  help?: string;
  value: string | number;
  onChange: (value: string) => void;
  type?: "number" | "date";
  step?: string;
  min?: string;
}) {
  return (
    <label className="grid gap-3 rounded-md border border-line bg-paper p-4 text-sm text-slate-700">
      <span className="font-semibold leading-6">{label}</span>
      <input
        type={type}
        value={value}
        min={type === "number" ? min : undefined}
        step={type === "number" ? step : undefined}
        onChange={(event) => onChange(event.target.value)}
        className="min-h-12 rounded-md border border-line bg-white px-4 text-ink outline-none transition placeholder:text-slate-400 focus:border-sky"
      />
      {help ? <span className="text-xs leading-5 text-slate-500">{help}</span> : null}
    </label>
  );
}

export function ToggleRow({
  label,
  checked,
  onChange
}: {
  label: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <label className="grid gap-3 rounded-md border border-line bg-paper p-4 text-sm text-slate-700">
      <span className="font-semibold leading-6">{label}</span>
      <span className="flex min-h-11 items-center justify-between gap-4 rounded-md border border-line bg-white px-3 py-2">
        <span className="text-xs font-semibold uppercase text-slate-500">Oui / Non</span>
        <input
          type="checkbox"
          checked={checked}
          onChange={(event) => onChange(event.target.checked)}
          className="h-5 w-5 accent-[#1E6B87]"
        />
      </span>
    </label>
  );
}

export function ResultCard({
  title,
  value,
  children,
  tone = "default"
}: {
  title: string;
  value?: string;
  children?: ReactNode;
  tone?: "default" | "strong";
}) {
  return (
    <div
      className={`rounded-md border p-5 shadow-soft ${
        tone === "strong" ? "border-sky/40 bg-mint" : "border-line bg-white"
      }`}
    >
      <p className="text-sm font-semibold uppercase text-teal">{title}</p>
      {value ? <p className="mt-2 text-3xl font-semibold text-ink">{value}</p> : null}
      {children ? <div className="mt-4 text-sm leading-7 text-slate-600">{children}</div> : null}
    </div>
  );
}

export function WhatsAppResultButton({ message, label }: { message: string; label: string }) {
  return (
    <a
      href={buildWhatsAppUrl(message)}
      target="_blank"
      rel="noreferrer"
      className="inline-flex min-h-12 items-center justify-center gap-2 whitespace-nowrap rounded-full blue-gradient px-6 text-sm font-semibold text-white shadow-glow transition hover:-translate-y-0.5"
    >
      {label}
      <ArrowRight size={18} aria-hidden />
    </a>
  );
}

export function ResetButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-line bg-white px-5 text-sm font-semibold text-teal shadow-soft transition hover:border-sky hover:bg-mint"
    >
      <RotateCcw size={16} aria-hidden />
      Réinitialiser
    </button>
  );
}

export function CalculatorCard({
  href,
  title,
  description,
  badge,
  featured = false,
  cta = "Utiliser le calculateur"
}: {
  href: string;
  title: string;
  description: string;
  badge: string;
  featured?: boolean;
  cta?: string;
}) {
  return (
    <Link
      href={href}
      className={`group flex h-full flex-col rounded-md border bg-white p-5 shadow-soft transition hover:-translate-y-0.5 hover:border-sky hover:shadow-glow ${
        featured ? "border-sky/40 md:col-span-2" : "border-line"
      }`}
    >
      <div className="mb-5 flex items-center justify-between gap-3">
        <span className="rounded-full border border-sky/30 bg-mint px-3 py-1 text-xs font-semibold text-teal">
          {badge}
        </span>
      </div>
      <h2 className="text-2xl font-semibold text-ink">{title}</h2>
      <p className="mt-3 grow text-sm leading-7 text-slate-600">{description}</p>
      <span className="mt-6 inline-flex min-h-10 w-fit items-center gap-2 whitespace-nowrap rounded-full border border-line bg-paper px-4 text-sm font-semibold text-teal transition group-hover:border-sky group-hover:bg-mint">
        {cta}
        <ArrowRight size={16} aria-hidden />
      </span>
    </Link>
  );
}

export function OfficialSimulatorCard({
  title,
  description,
  url,
  fallbackLabel,
  locale
}: {
  title: string;
  description: string;
  url: string;
  fallbackLabel: string;
  locale: Locale;
}) {
  const cta =
    locale === "fr"
      ? "Vous avez utilisé ce simulateur et souhaitez interpréter le résultat ? Envoyez-moi un message WhatsApp."
      : locale === "he"
        ? "השתמשתם בסימולטור ורוצים להבין את התוצאה? שלחו הודעת WhatsApp."
        : "Used this simulator and want help interpreting the result? Send a WhatsApp message.";

  return (
    <article className="rounded-md border border-sky/25 bg-white p-5 shadow-soft transition hover:border-sky hover:shadow-glow sm:p-6">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <span className="rounded-full border border-sky/30 bg-mint px-3 py-1 text-xs font-semibold text-teal">
            Outil officiel externe
          </span>
          <h3 className="mt-4 text-xl font-semibold text-ink">{title}</h3>
          <p className="mt-3 text-sm leading-7 text-slate-600">{description}</p>
          <p className="mt-4 rounded-md border border-sky/25 bg-mint p-4 text-sm leading-7 text-slate-700">
            Ce simulateur officiel de רשות המסים s’ouvrira dans un nouvel onglet.
          </p>
        </div>
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          className="inline-flex min-h-10 shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full border border-line bg-paper px-4 text-sm font-semibold text-teal transition hover:border-sky hover:bg-mint"
        >
          {fallbackLabel}
          <ExternalLink size={16} aria-hidden />
        </a>
      </div>
      <div className="mt-5 rounded-md border border-sky/25 bg-mint p-4">
        <p className="text-sm leading-7 text-slate-700">{cta}</p>
        <div className="mt-4">
          <WhatsAppResultButton
            label="WhatsApp"
            message={`Bonjour Eliezer, j’ai utilisé un simulateur officiel depuis votre site et je souhaite interpréter le résultat.`}
          />
        </div>
      </div>
    </article>
  );
}
