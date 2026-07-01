import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FrenchCalculator } from "@/components/calculators/FrenchCalculators";
import { PageCTA } from "@/components/PageCTA";
import { frenchCalculators, frenchCalculatorSlugs, type FrenchCalculatorSlug } from "@/lib/calculators";
import { siteUrl } from "@/lib/i18n";

type PageProps = {
  params: Promise<{ locale: string; calculatorSlug: string }>;
};

const metaBySlug: Record<FrenchCalculatorSlug, { title: string; description: string; keywords: string[] }> = {
  "ehzer-mass": {
    title: "Calculateur Ehzer Mass / החזר מס | Pré-diagnostic remboursement impôt Israël",
    description:
      "Pré-diagnostic Ehzer Mass / החזר מס : identifiez les situations qui peuvent justifier une vérification de remboursement d’impôt en Israël.",
    keywords: ["calculateur Ehzer Mass", "remboursement impôt Israël", "החזר מס Israël"]
  },
  "bituah-leumi-independant": {
    title: "Calculateur Bitouah Leumi indépendant | Statut עצמאי",
    description:
      "Estimez votre statut Bitouah Leumi, vos cotisations et votre revenu indépendant restant selon les constantes 2026.",
    keywords: ["Bitouah Leumi indépendant", "עצמאי שאינו עונה להגדרה", "calculateur ביטוח לאומי"]
  },
  "ole-hadash-nekoudot-zikouy": {
    title: "Calculateur נקודות זיכוי olé hadash | Israël 2026",
    description: "Estimez les נקודות זיכוי liées au statut d’olé hadash selon la date d’alyah et l’année fiscale.",
    keywords: ["נקודות זיכוי עולה חדש", "olé hadash fiscalité Israël", "points de crédit Israël"]
  },
  "nekoudot-zikouy": {
    title: "Calculateur valeur נקודות זיכוי | Israël 2026",
    description: "Calculez la valeur annuelle et mensuelle estimée de vos נקודות זיכוי.",
    keywords: ["נקודות זיכוי", "valeur point crédit Israël", "calculateur impôt Israël"]
  },
  "salaire-brut-net-israel": {
    title: "Calculateur salaire brut net Israël | Estimation 2026",
    description: "Estimez votre salaire net mensuel en Israël à partir du brut, des נקודות זיכוי et des retenues principales.",
    keywords: ["calculateur salaire brut net Israël", "salaire net Israël", "מס הכנסה salaire"]
  },
  "impot-revenu-israel": {
    title: "Calculateur impôt sur le revenu Israël | Tranches 2026",
    description: "Estimez votre impôt sur le revenu en Israël selon les tranches 2026 et vos נקודות זיכוי.",
    keywords: ["calculateur impôt Israël", "tranches impôt Israël 2026", "מס הכנסה"]
  }
};

const relatedContentByCalculator: Partial<Record<FrenchCalculatorSlug, Array<{ href: string; label: string; text: string }>>> = {
  "ehzer-mass": [
    {
      href: "/fr/cas-reels",
      label: "Voir les cas pratiques",
      text: "Situations anonymisées pour comprendre les points à vérifier avant une démarche fiscale."
    },
    {
      href: "/fr/hahzar-mas-remboursement-impot-israel",
      label: "Lire la page Ehzer Mass",
      text: "Comprendre les situations qui peuvent justifier une vérification, sans garantie de remboursement."
    }
  ],
  "bituah-leumi-independant": [
    {
      href: "/fr/guides/esek-zair-israel-reforme",
      label: "Lire le guide עסק זעיר",
      text: "Clarifier la différence entre activité indépendante, régime simplifié et obligations de ביטוח לאומי."
    }
  ],
  "salaire-brut-net-israel": [
    {
      href: "/fr/hahzar-mas-remboursement-impot-israel",
      label: "Lire la page Ehzer Mass",
      text: "Un changement de salaire, d’employeur ou de נקודות זיכוי peut parfois justifier une vérification."
    }
  ]
};

export function generateStaticParams() {
  return frenchCalculatorSlugs.map((calculatorSlug) => ({ locale: "fr", calculatorSlug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, calculatorSlug } = await params;
  if (locale !== "fr" || !frenchCalculatorSlugs.includes(calculatorSlug as FrenchCalculatorSlug)) {
    return {};
  }

  const slug = calculatorSlug as FrenchCalculatorSlug;
  const meta = metaBySlug[slug];

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: `${siteUrl}/fr/calculateurs/${slug}`
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `${siteUrl}/fr/calculateurs/${slug}`,
      siteName: "Eliezer Torjmane",
      locale: "fr_FR",
      type: "website"
    }
  };
}

export default async function FrenchCalculatorPage({ params }: PageProps) {
  const { locale, calculatorSlug } = await params;
  if (locale !== "fr" || !frenchCalculatorSlugs.includes(calculatorSlug as FrenchCalculatorSlug)) {
    notFound();
  }

  const slug = calculatorSlug as FrenchCalculatorSlug;
  const calculator = frenchCalculators.find((item) => item.slug === slug);
  const relatedContent = relatedContentByCalculator[slug] ?? [];

  return (
    <>
      <FrenchCalculator slug={slug} />
      {relatedContent.length > 0 ? (
        <section className="px-5 pb-6 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl rounded-md border border-sky/25 bg-white p-5 shadow-glow">
            <h2 className="text-xl font-semibold text-ink">À lire aussi</h2>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {relatedContent.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-md border border-line bg-paper p-4 transition hover:border-sky hover:bg-mint"
                >
                  <span className="text-sm font-semibold text-teal">{link.label}</span>
                  <span className="mt-2 block text-sm leading-6 text-slate-600">{link.text}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}
      <section className="px-5 pb-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl rounded-md border border-line bg-white p-5 text-sm leading-7 text-slate-600 shadow-soft">
          <strong className="text-ink">Ce calculateur fait :</strong> une estimation indicative selon les constantes 2026.
          <br />
          <strong className="text-ink">Ce calculateur ne fait pas :</strong> une décision fiscale définitive, une garantie de résultat ou une analyse complète de votre dossier.
          {calculator ? <span className="sr-only">{calculator.title}</span> : null}
        </div>
      </section>
      <PageCTA locale="fr" />
    </>
  );
}
