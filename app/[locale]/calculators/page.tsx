import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CalculatorCard } from "@/components/calculators/CalculatorUi";
import { PageCTA } from "@/components/PageCTA";
import { Reveal } from "@/components/Reveal";
import { localizedCalculatorCards } from "@/lib/calculators";
import { isLocale, siteUrl, type Locale } from "@/lib/i18n";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (locale === "he") {
    return {
      title: "מחשבוני מס בישראל | Eliezer Torjmane",
      description: "מחשבוני מס בישראל: החזר מס, ביטוח לאומי לעצמאים, נקודות זיכוי, ברוטו נטו ומס הכנסה.",
      alternates: { canonical: `${siteUrl}/he/calculators` }
    };
  }

  if (locale === "en") {
    return {
      title: "Tax calculators in Israel | Eliezer Torjmane",
      description: "Tax calculators in Israel: refund pre-check, Bituah Leumi, credit points, gross to net and income tax.",
      alternates: { canonical: `${siteUrl}/en/calculators` }
    };
  }

  return {};
}

export default async function LocalizedCalculatorsPage({ params }: PageProps) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale) || rawLocale === "fr") {
    notFound();
  }

  const locale = rawLocale as Exclude<Locale, "fr">;
  const cards = localizedCalculatorCards[locale];
  const title = locale === "he" ? "מחשבוני מס בישראל" : "Tax calculators in Israel";
  const lead =
    locale === "he"
      ? "כלים פשוטים להערכה כללית של מצבים נפוצים בתחום המס בישראל. התוצאה אינה מחליפה בדיקה מקצועית פרטנית."
      : "Simple tools for general estimates around common tax situations in Israel. Results do not replace a personalized professional review.";
  const cta = locale === "he" ? "לפרטים נוספים" : "Read more";

  return (
    <>
      <section className="section-band py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <Reveal>
            <div className="max-w-3xl">
              <p className="mb-3 text-sm font-semibold uppercase text-teal">2026</p>
              <h1 className="text-balance text-4xl font-semibold text-ink sm:text-5xl">{title}</h1>
              <p className="mt-5 text-lg leading-8 text-slate-600">{lead}</p>
            </div>
          </Reveal>
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {cards.map((card, index) => (
              <Reveal key={card.title} delay={index * 0.04}>
                <CalculatorCard href={`/${locale}/contact`} {...card} cta={cta} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <PageCTA locale={locale} />
    </>
  );
}
