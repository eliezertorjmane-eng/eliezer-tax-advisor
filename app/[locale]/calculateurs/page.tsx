import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CalculatorCard } from "@/components/calculators/CalculatorUi";
import { OfficialSimulatorsSection } from "@/components/calculators/FrenchCalculators";
import { PageCTA } from "@/components/PageCTA";
import { Reveal } from "@/components/Reveal";
import { frenchCalculators, getFrenchCalculatorPath } from "@/lib/calculators";
import { siteUrl } from "@/lib/i18n";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export const metadata: Metadata = {
  title: "Calculateurs fiscaux en Israël | Eliezer Torjmane",
  description:
    "Calculateurs fiscaux en Israël : salaire net, נקודות זיכוי, Ehzer Mass, Bituah Leumi, impôt sur le revenu et statut d’indépendant.",
  keywords: [
    "calculateur impôt Israël",
    "calculateur salaire brut net Israël",
    "calculateur Ehzer Mass",
    "Bituah Leumi indépendant",
    "נקודות זיכוי עולה חדש"
  ],
  alternates: {
    canonical: `${siteUrl}/fr/calculateurs`
  },
  openGraph: {
    title: "Calculateurs fiscaux en Israël | Eliezer Torjmane",
    description: "Des outils simples pour estimer votre situation fiscale en Israël.",
    url: `${siteUrl}/fr/calculateurs`,
    siteName: "Eliezer Torjmane",
    locale: "fr_FR",
    type: "website"
  }
};

export default async function FrenchCalculatorsPage({ params }: PageProps) {
  const { locale } = await params;
  if (locale !== "fr") {
    notFound();
  }

  return (
    <>
      <section className="section-band py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <Reveal>
            <div className="max-w-3xl">
              <p className="mb-3 text-sm font-semibold uppercase text-teal">Constantes 2026 — à vérifier chaque année</p>
              <h1 className="text-balance text-4xl font-semibold text-ink sm:text-5xl">Calculateurs fiscaux en Israël</h1>
              <p className="mt-5 text-lg leading-8 text-slate-600">
                Des outils simples pour estimer votre situation fiscale en Israël : salaire net, נקודות זיכוי, Ehzer Mass,
                Bituah Leumi et statut d’indépendant.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.04}>
            <div className="mt-8 rounded-md border border-sky/25 bg-mint p-5 text-sm leading-7 text-slate-700">
              Ces calculateurs donnent une estimation indicative. Les taux, seuils et règles peuvent évoluer. Pour une analyse
              fiable, chaque situation doit être vérifiée individuellement.
            </div>
          </Reveal>
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {frenchCalculators.map((calculator, index) => (
              <Reveal key={calculator.slug} delay={index * 0.04}>
                <CalculatorCard
                  href={getFrenchCalculatorPath(calculator.slug)}
                  title={calculator.title}
                  description={calculator.description}
                  badge={calculator.badge}
                  featured={"featured" in calculator ? calculator.featured : false}
                />
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.18}>
            <div className="mt-10 rounded-md border border-sky/25 bg-white p-6 shadow-glow">
              <h2 className="text-2xl font-semibold text-ink">Vous voulez vérifier votre simulation ?</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">Contactez Eliezer sur WhatsApp pour replacer l’estimation dans votre situation réelle.</p>
            </div>
          </Reveal>
        </div>
      </section>
      <OfficialSimulatorsSection />
      <PageCTA locale="fr" />
    </>
  );
}
