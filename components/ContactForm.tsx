"use client";

import { Send } from "lucide-react";
import { FormEvent, useState } from "react";
import { contact, getDictionary, type Locale } from "@/lib/i18n";

type ContactFormProps = {
  locale: Locale;
};

export function ContactForm({ locale }: ContactFormProps) {
  const dictionary = getDictionary(locale);
  const labels = dictionary.contactPage.form;
  const [profile, setProfile] = useState<string>(labels.profiles[0]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") ?? "");
    const email = String(form.get("email") ?? "");
    const phone = String(form.get("phone") ?? "");
    const message = String(form.get("message") ?? "");
    const subject = encodeURIComponent(`Demande site - ${name || "Nouveau contact"}`);
    const body = encodeURIComponent(
      [`Nom: ${name}`, `Email: ${email}`, `Telephone: ${phone}`, `Profil: ${profile}`, "", message].join("\n")
    );

    window.location.href = `${contact.emailHref}?subject=${subject}&body=${body}`;
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 rounded-md border border-white/10 bg-white/[0.04] p-5 shadow-glow sm:p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-medium text-slate-200">
          {labels.name}
          <input
            name="name"
            required
            className="min-h-12 rounded-md border border-white/10 bg-ink/70 px-4 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan"
            autoComplete="name"
          />
        </label>
        <label className="grid gap-2 text-sm font-medium text-slate-200">
          {labels.email}
          <input
            name="email"
            type="email"
            required
            className="min-h-12 rounded-md border border-white/10 bg-ink/70 px-4 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan"
            autoComplete="email"
          />
        </label>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-medium text-slate-200">
          {labels.phone}
          <input
            name="phone"
            className="min-h-12 rounded-md border border-white/10 bg-ink/70 px-4 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan"
            autoComplete="tel"
          />
        </label>
        <label className="grid gap-2 text-sm font-medium text-slate-200">
          {labels.profile}
          <select
            value={profile}
            onChange={(event) => setProfile(event.target.value)}
            className="min-h-12 rounded-md border border-white/10 bg-ink/70 px-4 text-white outline-none transition focus:border-cyan"
          >
            {labels.profiles.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>
      </div>
      <label className="grid gap-2 text-sm font-medium text-slate-200">
        {labels.message}
        <textarea
          name="message"
          required
          rows={6}
          placeholder={labels.placeholder}
          className="rounded-md border border-white/10 bg-ink/70 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan"
        />
      </label>
      <button
        type="submit"
        className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-cyan px-6 text-sm font-semibold text-ink shadow-glow transition hover:bg-mint"
      >
        <Send size={18} aria-hidden /> {labels.submit}
      </button>
    </form>
  );
}
