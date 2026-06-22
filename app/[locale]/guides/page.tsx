import type { Metadata } from "next";
import { PageCTA } from "@/components/PageCTA";
import { Reveal } from "@/components/Reveal";
import { ArticleIndex } from "@/components/articles/ArticleIndex";
import {
  filterGuidesByCategory,
  getGuideArticles,
  guideCategoryTabs,
  normalizeGuideCategoryFilter
} from "@/lib/content/articleHelpers";
import { isLocale, locales, siteUrl, type Locale } from "@/lib/i18n";

type PageProps = {
  params: Promise<{ locale: string }>;
  searchParams?: Promise<{ category?: string }>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : "fr";

  if (locale === "fr") {
    return {
      title: "Guides fiscaux en Israël pour francophones | Eliezer Torjmane",
      description:
        "Des guides pratiques pour comprendre les démarches fiscales israéliennes : Ehzer Mass, ouverture d’un עסק, אישור תושבות מס, revenus locatifs, מס שבח, עסק זעיר et fiscalité France-Israël.",
      alternates: {
        canonical: `${siteUrl}/fr/guides`,
        languages: {
          fr: `${siteUrl}/fr/guides`,
          en: `${siteUrl}/en/guides`,
          he: `${siteUrl}/he/guides`
        }
      },
      openGraph: {
        title: "Guides fiscaux en Israël pour francophones | Eliezer Torjmane",
        description: "Guides pratiques de fiscalité israélienne pour francophones en Israël.",
        url: `${siteUrl}/fr/guides`,
        siteName: "Eliezer Torjmane",
        locale: "fr_FR",
        type: "website"
      }
    };
  }

  const title = locale === "he" ? "מדריכי מס בישראל | Eliezer Torjmane" : "Tax guides in Israel | Eliezer Torjmane";
  const description =
    locale === "he"
      ? "מדריכי המס המפורטים מתפרסמים תחילה בצרפתית. תרגומים לעברית יתווספו בהמשך."
      : "Detailed tax guides are published first in French. English versions will be added progressively.";

  return {
    title,
    description,
    alternates: { canonical: `${siteUrl}/${locale}/guides` }
  };
}

function ComingSoonGuides({ locale }: { locale: Exclude<Locale, "fr"> }) {
  const isHebrew = locale === "he";

  return (
    <>
      <section className="section-band py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <Reveal>
            <div className="max-w-3xl">
              <p className="mb-3 text-sm font-semibold uppercase text-teal">{isHebrew ? "בקרוב" : "Coming soon"}</p>
              <h1 className="text-balance text-4xl font-semibold text-ink sm:text-5xl">
                {isHebrew ? "מדריכי מס בישראל" : "Tax guides in Israel"}
              </h1>
              <p className="mt-5 text-lg leading-8 text-slate-600">
                {isHebrew
                  ? "המדריכים המקצועיים המלאים מתפרסמים תחילה בצרפתית כדי לשמור על איכות ודיוק. גרסאות בעברית יתווספו בהמשך."
                  : "The full practical guides are published first in French to keep the content precise and useful. English versions will be added progressively."}
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <div className="mt-8 rounded-md border border-sky/25 bg-white p-6 shadow-glow">
              <p className="text-sm leading-7 text-slate-600">
                {isHebrew
                  ? "בינתיים ניתן ליצור קשר כדי לקבל הכוונה אישית בצרפתית, עברית או אנגלית לפי הצורך."
                  : "In the meantime, you can contact Eliezer for guidance in French, Hebrew or English depending on your situation."}
              </p>
            </div>
          </Reveal>
        </div>
      </section>
      <PageCTA locale={locale} />
    </>
  );
}

export default async function GuidesPage({ params, searchParams }: PageProps) {
  const { locale: rawLocale } = await params;
  const resolvedSearchParams = searchParams ? await searchParams : {};

  if (!isLocale(rawLocale)) {
    return <ComingSoonGuides locale="en" />;
  }

  if (rawLocale !== "fr") {
    return <ComingSoonGuides locale={rawLocale} />;
  }

  const selectedCategory = normalizeGuideCategoryFilter(resolvedSearchParams.category);
  const guides = filterGuidesByCategory(getGuideArticles("fr"), selectedCategory);

  return (
    <>
      <ArticleIndex
        title="Guides fiscaux en Israël pour francophones"
        description="Des guides pratiques pour comprendre les démarches fiscales israéliennes : Ehzer Mass, ouverture d’un עסק, אישור תושבות מס, revenus locatifs, מס שבח, עסק זעיר et fiscalité France-Israël."
        articles={guides}
        basePath="/fr/guides"
        tabs={guideCategoryTabs}
        selectedCategory={selectedCategory}
      />
      <PageCTA locale="fr" />
    </>
  );
}
