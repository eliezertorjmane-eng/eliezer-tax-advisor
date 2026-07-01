import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FrenchCalculator } from "@/components/calculators/FrenchCalculators";
import { PageCTA } from "@/components/PageCTA";
import { frenchCalculators, frenchCalculatorSlugs, type FrenchCalculatorSlug } from "@/lib/calculators";
import { buildWhatsAppUrl, siteUrl } from "@/lib/i18n";

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
  },
  "impot-revenus-locatifs-israel": {
    title: "Calculateur revenus locatifs Israël : choisir le bon Massloul Mass",
    description:
      "Comparez les 3 régimes d’imposition des loyers résidentiels en Israël : Massloul Ptor, 10 % ou Massloul Mass Shouli. Simulation indicative et explication claire.",
    keywords: [
      "calculateur revenus locatifs Israël",
      "Massloul Mass loyers",
      "impôt loyers Israël",
      "Massloul Ptor",
      "Massloul 10 %",
      "Massloul Mass Shouli"
    ]
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
  ],
  "impot-revenus-locatifs-israel": [
    {
      href: "/fr/guides/revenus-locatifs-israel-masloulei-mas",
      label: "Lire le guide revenus locatifs",
      text: "Comprendre les trois Massloulim Mass avant de choisir une route fiscale pour vos loyers."
    },
    {
      href: "/fr/cas-reels/revenus-locatifs-choix-massloul-mass",
      label: "Voir le cas pratique",
      text: "Un exemple anonymisé où la route la plus simple devait être comparée aux autres options."
    }
  ]
};

const rentalIncomeFaq = [
  {
    question: "Dois-je déclarer mes loyers en Israël ?",
    answer:
      "Les loyers résidentiels doivent être examinés selon le montant, le type de location, le Massloul Mass choisi et votre situation personnelle."
  },
  {
    question: "Le Massloul 10 % est-il toujours le plus simple ?",
    answer:
      "Il peut être simple dans certains dossiers, mais il n’est pas toujours le plus avantageux. Les dépenses, les autres revenus et l’âge peuvent changer l’analyse."
  },
  {
    question: "Les dépenses sont-elles déductibles ?",
    answer:
      "Elles peuvent être pertinentes dans le Massloul Mass Shouli, mais leur traitement fiscal doit être vérifié selon les documents et la nature des dépenses."
  },
  {
    question: "Peut-on changer de Massloul Mass ?",
    answer:
      "Cela dépend des années concernées, des déclarations déjà faites et des règles applicables. Une vérification personnalisée est recommandée avant d’agir."
  },
  {
    question: "Que faire si je loue sur Airbnb ou Booking ?",
    answer:
      "La location courte durée peut être traitée différemment d’une location résidentielle classique. Ce calculateur n’est pas conçu pour ces situations."
  },
  {
    question: "Que faire si je possède plusieurs appartements ?",
    answer:
      "Plusieurs biens peuvent nécessiter une analyse plus détaillée, notamment pour vérifier les seuils, les obligations et la route fiscale adaptée."
  }
];

function getRentalIncomeFaqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: rentalIncomeFaq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer
      }
    }))
  };
}

function RentalIncomeSeoContent() {
  return (
    <section className="bg-white px-5 py-12 sm:px-6 sm:py-16 lg:px-8">
      <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
        <div className="grid gap-5">
          <article className="rounded-md border border-line bg-white p-6 shadow-soft">
            <p className="text-base leading-8 text-slate-600">
              Si vous louez un appartement résidentiel en Israël, vous pouvez être concerné par plusieurs Massloulim Mass :
              le Massloul Ptor, le Massloul 10 % ou le Massloul Mass Shouli. Le bon choix dépend du montant du loyer, de
              vos revenus, de vos dépenses et de votre situation personnelle.
            </p>
          </article>

          <article className="rounded-md border border-line bg-white p-6 shadow-soft">
            <h2 className="text-2xl font-semibold text-ink">
              Quels sont les 3 Massloulim Mass pour les revenus locatifs en Israël ?
            </h2>
            <div className="mt-5 grid gap-4">
              <div>
                <h3 className="text-lg font-semibold text-ink">1. Massloul Ptor (מסלול פטור)</h3>
                <p className="mt-2 text-sm leading-7 text-slate-600">
                  Cette route peut permettre une exemption totale ou partielle lorsque les loyers résidentiels restent dans
                  les plafonds applicables. Le plafond change et doit être vérifié chaque année.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-ink">2. Massloul 10 %</h3>
                <p className="mt-2 text-sm leading-7 text-slate-600">
                  Cette route consiste généralement à payer 10 % du loyer brut. Elle peut être simple, mais les dépenses ne
                  sont généralement pas déduites dans ce Massloul.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-ink">3. Massloul Mass Shouli (מסלול מס שולי)</h3>
                <p className="mt-2 text-sm leading-7 text-slate-600">
                  Les loyers ou le profit locatif peuvent être imposés selon la tranche marginale de Mass Hachnassa. Cette
                  route peut être pertinente avec des dépenses élevées, des revenus faibles ou une situation personnelle
                  particulière.
                </p>
              </div>
            </div>
          </article>

          <article className="rounded-md border border-line bg-white p-6 shadow-soft">
            <h2 className="text-2xl font-semibold text-ink">Comment choisir le bon Massloul Mass ?</h2>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              Il faut comparer le loyer mensuel, les autres revenus, les intérêts d’emprunt, les dépenses de réparation,
              l’âge du propriétaire, le nombre de biens et la nature de la location. Une location courte durée sur Airbnb ou
              Booking peut sortir du cadre de ce calculateur.
            </p>
          </article>

          <article className="rounded-md border border-line bg-white p-6 shadow-soft">
            <h2 className="text-2xl font-semibold text-ink">Pourquoi une simulation ne suffit pas toujours ?</h2>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              Les seuils changent, les documents comptent, certaines dépenses nécessitent une revue et la structure de
              propriété peut modifier l’analyse. Le résultat doit donc être compris comme une simulation indicative, à
              vérifier selon votre dossier.
            </p>
          </article>

          <article className="rounded-md border border-line bg-white p-6 shadow-soft">
            <h2 className="text-2xl font-semibold text-ink">Questions fréquentes</h2>
            <div className="mt-5 grid gap-3">
              {rentalIncomeFaq.map((item) => (
                <details key={item.question} className="group rounded-md border border-line bg-paper p-4">
                  <summary className="cursor-pointer text-sm font-semibold leading-6 text-ink">{item.question}</summary>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{item.answer}</p>
                </details>
              ))}
            </div>
          </article>
        </div>

        <aside className="rounded-md border border-sky/25 bg-mint p-5 shadow-glow lg:sticky lg:top-28">
          <h2 className="text-xl font-semibold text-ink">Besoin de vérifier vos revenus locatifs ?</h2>
          <p className="mt-3 text-sm leading-7 text-slate-700">
            Contactez Eliezer pour vérifier le Massloul Mass adapté à votre situation.
          </p>
          <a
            href={buildWhatsAppUrl(
              "Bonjour Eliezer, je loue un bien en Israël et je souhaite vérifier quel Massloul Mass est le plus avantageux pour mes revenus locatifs."
            )}
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-flex min-h-11 items-center justify-center rounded-full blue-gradient px-5 text-sm font-semibold text-white shadow-glow"
          >
            Faire vérifier mes revenus locatifs
          </a>
        </aside>
      </div>
    </section>
  );
}

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
  const rentalIncomeFaqJsonLd = slug === "impot-revenus-locatifs-israel" ? getRentalIncomeFaqJsonLd() : null;

  return (
    <>
      {rentalIncomeFaqJsonLd ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(rentalIncomeFaqJsonLd) }} />
      ) : null}
      <FrenchCalculator slug={slug} />
      {slug === "impot-revenus-locatifs-israel" ? <RentalIncomeSeoContent /> : null}
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
