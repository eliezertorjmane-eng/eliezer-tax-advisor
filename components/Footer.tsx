import { AtSign, Mail, MessageCircle, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { contact, getDictionary, getLocalizedPath, getWhatsAppHref, type Locale } from "@/lib/i18n";

type FooterProps = {
  locale: Locale;
};

export function Footer({ locale }: FooterProps) {
  const dictionary = getDictionary(locale);

  return (
    <footer className="border-t border-navy bg-ink">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:px-6 lg:grid-cols-[1.2fr_0.8fr_0.8fr] lg:px-8">
        <div>
          <div className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="Eliezer Torjmane Tax Advisor"
              width={52}
              height={52}
              className="rounded-full border border-cyan/30 bg-white"
            />
            <div>
              <p className="font-semibold text-white">{dictionary.common.brand}</p>
              <p className="mt-1 text-sm text-cyan">{dictionary.common.eyebrow}</p>
            </div>
          </div>
          <p className="mt-6 max-w-xl text-sm leading-7 text-slate-400">{dictionary.common.disclaimer}</p>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase text-slate-300">Navigation</h2>
          <div className="mt-4 grid gap-3 text-sm">
            <Link href={getLocalizedPath(locale)} className="text-slate-400 transition hover:text-white">
              {dictionary.nav.home}
            </Link>
            <Link href={getLocalizedPath(locale, "services")} className="text-slate-400 transition hover:text-white">
              {dictionary.nav.services}
            </Link>
            <Link href={getLocalizedPath(locale, "about")} className="text-slate-400 transition hover:text-white">
              {dictionary.nav.about}
            </Link>
            <Link href={getLocalizedPath(locale, "faq")} className="text-slate-400 transition hover:text-white">
              {dictionary.nav.faq}
            </Link>
            <Link href={getLocalizedPath(locale, "contact")} className="text-slate-400 transition hover:text-white">
              {dictionary.nav.contact}
            </Link>
          </div>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase text-slate-300">Contact</h2>
          <div className="mt-4 grid gap-3 text-sm">
            <a className="inline-flex items-center gap-2 text-slate-400 transition hover:text-white" href={contact.phoneHref}>
              <Phone size={16} aria-hidden /> {contact.phoneDisplay}
            </a>
            <a className="inline-flex items-center gap-2 text-slate-400 transition hover:text-white" href={getWhatsAppHref()}>
              <MessageCircle size={16} aria-hidden /> {dictionary.common.whatsapp}
            </a>
            <a className="inline-flex items-center gap-2 text-slate-400 transition hover:text-white" href={contact.emailHref}>
              <Mail size={16} aria-hidden /> {contact.email}
            </a>
            <a
              className="inline-flex items-center gap-2 text-slate-400 transition hover:text-white"
              href={contact.instagramHref}
              target="_blank"
              rel="noreferrer"
            >
              <AtSign size={16} aria-hidden /> {dictionary.common.instagram}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
