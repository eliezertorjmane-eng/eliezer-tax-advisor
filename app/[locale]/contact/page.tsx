import { AtSign, Mail, MessageCircle, Phone } from "lucide-react";
import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { PageCTA } from "@/components/PageCTA";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { contact, getDictionary, getWhatsAppHref, isLocale, locales, pageMetadata, type Locale } from "@/lib/i18n";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const locale = isLocale(resolvedParams.locale) ? resolvedParams.locale : "fr";
  return pageMetadata(locale, "contact");
}

export default async function ContactPage({ params }: PageProps) {
  const resolvedParams = await params;
  const locale = (isLocale(resolvedParams.locale) ? resolvedParams.locale : "fr") as Locale;
  const dictionary = getDictionary(locale);
  const page = dictionary.contactPage;

  const contactLinks = [
    { label: contact.phoneDisplay, href: contact.phoneHref, icon: Phone, name: dictionary.common.phone },
    { label: dictionary.common.whatsapp, href: getWhatsAppHref(), icon: MessageCircle, name: dictionary.common.whatsapp },
    { label: contact.email, href: contact.emailHref, icon: Mail, name: dictionary.common.email },
    { label: "@eliezer.tax.advisor", href: contact.instagramHref, icon: AtSign, name: dictionary.common.instagram }
  ];

  return (
    <>
      <section className="section-band py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
          <Reveal>
            <div>
              <SectionHeader eyebrow={dictionary.common.eyebrow} title={page.title} lead={page.lead} />
              <div className="mt-10 rounded-md border border-line bg-white p-6 shadow-soft">
                <h2 className="text-xl font-semibold text-ink">{page.directTitle}</h2>
                <div className="mt-5 grid gap-3">
                  {contactLinks.map((item) => {
                    const Icon = item.icon;
                    return (
                      <a
                        key={item.name}
                        href={item.href}
                        target={item.href.startsWith("http") ? "_blank" : undefined}
                        rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                        className="flex items-center gap-3 rounded-md border border-line bg-paper px-4 py-3 text-sm text-slate-700 transition hover:border-sky hover:bg-white"
                      >
                        <Icon className="text-teal" size={18} aria-hidden />
                        <span className="font-medium text-ink">{item.name}</span>
                        <span className="text-slate-500">{item.label}</span>
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <ContactForm locale={locale} />
          </Reveal>
        </div>
      </section>
      <PageCTA locale={locale} />
    </>
  );
}
