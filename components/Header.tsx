"use client";

import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import { directions, getDictionary, getLocalizedPath, getWhatsAppHref, localeLabels, locales, type Locale, type PageKey } from "@/lib/i18n";

type HeaderProps = {
  locale: Locale;
};

const navItems: PageKey[] = ["home", "services", "about", "faq", "contact"];

function switchLocalePath(pathname: string, nextLocale: Locale) {
  const parts = pathname.split("/").filter(Boolean);
  if (parts.length === 0) {
    return `/${nextLocale}`;
  }

  if (locales.includes(parts[0] as Locale)) {
    parts[0] = nextLocale;
    return `/${parts.join("/")}`;
  }

  return `/${nextLocale}/${parts.join("/")}`;
}

export function Header({ locale }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const dictionary = getDictionary(locale);
  const isRtl = directions[locale] === "rtl";

  const localeLinks = useMemo(
    () =>
      locales.map((item) => ({
        locale: item,
        href: switchLocalePath(pathname, item),
        label: localeLabels[item]
      })),
    [pathname]
  );

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white/90 shadow-[0_8px_30px_rgba(10,49,72,0.06)] backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8">
        <Link href={getLocalizedPath(locale)} className="flex min-w-0 items-center gap-3">
          <Image
            src="/logo.png"
            alt="Eliezer Torjmane Tax Advisor"
            width={48}
            height={48}
            className="h-12 w-12 rounded-full border border-line bg-white shadow-soft"
            priority
          />
          <span className="min-w-0">
            <span className="block truncate text-sm font-semibold text-ink sm:text-base">
              {dictionary.common.brand}
            </span>
            <span className="hidden truncate text-xs text-teal sm:block">{dictionary.common.eyebrow}</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
          {navItems.map((item) => (
            <Link
              key={item}
              href={getLocalizedPath(locale, item)}
              className="rounded-full px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-mint hover:text-teal"
            >
              {dictionary.nav[item]}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <div className="flex rounded-full border border-line bg-soft p-1">
            {localeLinks.map((item) => (
              <Link
                key={item.locale}
                href={item.href}
                className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                  item.locale === locale ? "bg-white text-teal shadow-soft" : "text-slate-600 hover:text-ink"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
          <Link
            href={getWhatsAppHref()}
            target="_blank"
            rel="noreferrer"
            className="rounded-full blue-gradient px-5 py-2.5 text-sm font-semibold text-white shadow-glow transition hover:-translate-y-0.5"
          >
            {dictionary.nav.cta}
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white text-ink shadow-soft lg:hidden"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          onClick={() => setIsOpen((value) => !value)}
        >
          {isOpen ? <X aria-hidden size={20} /> : <Menu aria-hidden size={20} />}
        </button>
      </div>

      {isOpen ? (
        <div className="border-t border-line bg-white px-5 py-5 shadow-soft lg:hidden" dir={isRtl ? "rtl" : "ltr"}>
          <nav className="grid gap-2" aria-label="Mobile navigation">
            {navItems.map((item) => (
              <Link
                key={item}
                href={getLocalizedPath(locale, item)}
                onClick={() => setIsOpen(false)}
                className="rounded-md border border-line bg-soft px-4 py-3 text-sm font-medium text-slate-800"
              >
                {dictionary.nav[item]}
              </Link>
            ))}
          </nav>
          <div className="mt-4 flex flex-wrap gap-2">
            {localeLinks.map((item) => (
              <Link
                key={item.locale}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`rounded-full px-3 py-2 text-xs font-semibold ${
                  item.locale === locale ? "bg-teal text-white" : "border border-line text-slate-700"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  );
}
