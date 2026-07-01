import type { Locale } from "@/lib/i18n";

export const frenchCalculatorSlugs = [
  "ehzer-mass",
  "bituah-leumi-independant",
  "ole-hadash-nekoudot-zikouy",
  "nekoudot-zikouy",
  "salaire-brut-net-israel",
  "impot-revenu-israel"
] as const;

export type FrenchCalculatorSlug = (typeof frenchCalculatorSlugs)[number];

export const frenchCalculators = [
  {
    slug: "ehzer-mass",
    title: "Pré-diagnostic Ehzer Mass / החזר מס",
    description: "Découvrez si votre situation mérite une vérification pour un remboursement d’impôt en Israël.",
    badge: "Très demandé",
    featured: true
  },
  {
    slug: "bituah-leumi-independant",
    title: "Bitouah Leumi indépendant",
    description: "Estimez votre statut Bitouah Leumi et vos cotisations selon vos revenus et heures d’activité.",
    badge: "Estimation"
  },
  {
    slug: "ole-hadash-nekoudot-zikouy",
    title: "נקודות זיכוי olé hadash",
    description: "Estimez les points de crédit liés à votre date d’alyah.",
    badge: "À vérifier"
  },
  {
    slug: "nekoudot-zikouy",
    title: "Valeur des נקודות זיכוי",
    description: "Calculez la valeur annuelle et mensuelle de vos points de crédit.",
    badge: "Simple"
  },
  {
    slug: "salaire-brut-net-israel",
    title: "Salaire brut / net",
    description: "Estimez votre salaire net à partir du brut et de vos crédits.",
    badge: "Estimation"
  },
  {
    slug: "impot-revenu-israel",
    title: "Impôt sur le revenu",
    description: "Estimez l’impôt sur le revenu selon les tranches 2026.",
    badge: "Estimation"
  }
] as const;

export const localizedCalculatorCards: Record<Exclude<Locale, "fr">, Array<{ title: string; description: string; badge: string }>> = {
  en: [
    { title: "Tax refund pre-check", description: "See whether your situation may justify a tax refund review.", badge: "Popular" },
    { title: "Bitouah Leumi for freelancers", description: "Estimate status and contributions for independent activity.", badge: "Estimate" },
    { title: "Oleh Hadash credit points", description: "Estimate credit points based on aliyah date.", badge: "Check" },
    { title: "Credit point value", description: "Calculate yearly and monthly value of known credit points.", badge: "Simple" },
    { title: "Gross to net salary", description: "Estimate net salary from gross salary and credit points.", badge: "Estimate" },
    { title: "Income tax estimator", description: "Estimate income tax using 2026 brackets.", badge: "Estimate" }
  ],
  he: [
    { title: "בדיקת זכאות להחזר מס", description: "בדקו אם המצב שלכם מצדיק בדיקה מקצועית להחזר מס.", badge: "מבוקש" },
    { title: "ביטוח לאומי לעצמאים", description: "הערכה של סטטוס ותשלומי ביטוח לאומי לפי הכנסה ושעות פעילות.", badge: "הערכה" },
    { title: "נקודות זיכוי לעולה חדש", description: "הערכת נקודות זיכוי לפי תאריך העלייה.", badge: "לבדיקה" },
    { title: "ערך נקודת זיכוי", description: "חישוב ערך שנתי וחודשי של נקודות זיכוי ידועות.", badge: "פשוט" },
    { title: "חישוב ברוטו / נטו", description: "הערכת שכר נטו לפי שכר ברוטו ונקודות זיכוי.", badge: "הערכה" },
    { title: "חישוב מס הכנסה", description: "הערכת מס הכנסה לפי מדרגות 2026.", badge: "הערכה" }
  ]
};

export const officialSimulators = [
  {
    title: "Simulateur officiel נקודות זיכוי / מס הכנסה",
    description: "Simulateur de רשות המסים pour vérifier des points de crédit et éléments liés à l’impôt sur le revenu.",
    url: "https://secapp.taxes.gov.il/srsimulatorNZ/#/simulatorMasHachnasah"
  },
  {
    title: "Simulateur officiel général",
    description: "Simulateur officiel de רשות המסים pour effectuer une vérification générale selon les informations saisies.",
    url: "https://secapp.taxes.gov.il/srsimulatorNZ/#/simulator"
  },
  {
    title: "Simulateur officiel salaire et impôt",
    description: "Simulateur officiel de רשות המסים pour estimer l’impôt sur salaire.",
    url: "https://secapp.taxes.gov.il/shsimulatormas/main.aspx"
  }
] as const;

export function getFrenchCalculatorPath(slug: FrenchCalculatorSlug) {
  return `/fr/calculateurs/${slug}`;
}
