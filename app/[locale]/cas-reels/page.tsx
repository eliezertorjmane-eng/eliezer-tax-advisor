import type { Metadata } from "next";
import { PageCTA } from "@/components/PageCTA";
import { Reveal } from "@/components/Reveal";
import { ArticleIndex } from "@/components/articles/ArticleIndex";
import { getCaseStudyArticles } from "@/lib/content/articleHelpers";
import { isLocale, locales, siteUrl, type Locale } from "@/lib/i18n";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : "fr";

  if (locale === "fr") {
    return {
      title: "Cas pratiques fiscaux en Israël | Eliezer Torjmane",
      description:
        "Des situations anonymisées pour comprendre les erreurs fréquentes, les démarches possibles et les points à vérifier avant de prendre une décision fiscale.",
      alternates: {
        canonical: `${siteUrl}/fr/cas-reels`,
        languages: {
          fr: `${siteUrl}/fr/cas-reels`,
          en: `${siteUrl}/en/cas-reels`,
          he: `${siteUrl}/he/cas-reels`
        }
      },
      openGraph: {
        title: "Cas pratiques fiscaux en Israël | Eliezer Torjmane",
        description: "Situations anonymisées et simplifiées à des fins pédagogiques.",
        url: `${siteUrl}/fr/cas-reels`,
        siteName: "Eliezer Torjmane",
        locale: "fr_FR",
        type: "website"
      }
    };
  }

  const title = locale === "he" ? "מקרים לדוגמה | Eliezer Torjmane" : "Case studies | Eliezer Torjmane";
  const description =
    locale === "he"
      ? "מקרים אנונימיים לדוגמה יתורגמו בהמשך. התוכן המלא מתפרסם תחילה בצרפתית."
      : "Anonymized case studies will be translated progressively. Full content is published first in French.";

  return {
    title,
    description,
    alternates: { canonical: `${siteUrl}/${locale}/cas-reels` }
  };
}

function ComingSoonCases({ locale }: { locale: Exclude<Locale, "fr"> }) {
  const isHebrew = locale === "he";

  return (
    <>
      <section className="section-band py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <Reveal>
            <div className="max-w-3xl">
              <p className="mb-3 text-sm font-semibold uppercase text-teal">{isHebrew ? "בקרוב" : "Coming soon"}</p>
              <h1 className="text-balance text-4xl font-semibold text-ink sm:text-5xl">
                {isHebrew ? "מקרים לדוגמה" : "Case studies"}
              </h1>
              <p className="mt-5 text-lg leading-8 text-slate-600">
                {isHebrew
                  ? "המקרים האנונימיים המלאים מתפרסמים תחילה בצרפתית. תרגומים לעברית יתווספו בהמשך."
                  : "Full anonymized case studies are published first in French. English versions will be added later."}
              </p>
            </div>
          </Reveal>
        </div>
      </section>
      <PageCTA locale={locale} />
    </>
  );
}

export default async function CaseStudiesPage({ params }: PageProps) {
  const { locale: rawLocale } = await params;

  if (!isLocale(rawLocale)) {
    return <ComingSoonCases locale="en" />;
  }

  if (rawLocale !== "fr") {
    return <ComingSoonCases locale={rawLocale} />;
  }

  return (
    <>
      <ArticleIndex
        title="Cas pratiques fiscaux en Israël"
        description="Des situations anonymisées pour comprendre les erreurs fréquentes, les démarches possibles et les points à vérifier avant de prendre une décision fiscale."
        articles={getCaseStudyArticles("fr")}
        basePath="/fr/cas-reels"
        disclaimer="Les cas présentés sont anonymisés et simplifiés à des fins pédagogiques. Chaque dossier fiscal doit être analysé individuellement."
        ctaLabel="Lire le cas"
      />
      <PageCTA locale="fr" />
    </>
  );
}
