import { TAX_CONSTANTS_2026 } from "@/lib/tax/constants2026";
import { calculateProgressiveTax } from "@/lib/tax/incomeTax";

export const RENTAL_EXEMPTION_THRESHOLD_MONTHLY_ILS_INDICATIVE = 5654;
export const RENTAL_EXEMPTION_THRESHOLD_LABEL = "Plafond indicatif à vérifier chaque année.";
// TODO: Verify official 2026 Israeli Tax Authority rental income thresholds and rules before final publication.

export type RentalOwnerSituation = "employee" | "independent" | "retired" | "none";

export type RentalIncomeInputs = {
  monthlyRent: number;
  rentedMonths?: number;
  deductibleExpensesAnnual: number;
  annualOtherIncome: number;
  ownerAge: number;
  isResidentialLongTerm: boolean;
  numberOfProperties: number;
  ownerSituation?: RentalOwnerSituation;
};

export type RentalTaxRouteId = "ptor" | "tenPercent" | "marginal";
export type RentalRouteStatus = "possible" | "check" | "notRecommended";

export type RentalTaxRouteResult = {
  id: RentalTaxRouteId;
  label: string;
  status: RentalRouteStatus;
  annualTax: number;
  monthlyTax: number;
  annualNetRent: number;
  taxableAnnualIncome: number;
  explanation: string;
};

export type RentalIncomeComparison = {
  grossRentAnnual: number;
  deductibleExpensesAnnual: number;
  thresholdMonthly: number;
  recommendedRoute: RentalTaxRouteResult;
  routes: RentalTaxRouteResult[];
  explanation: string;
  warnings: string[];
  assumptions: string[];
};

function safeNumber(value: number, fallback = 0) {
  return Number.isFinite(value) ? Math.max(0, value) : fallback;
}

function clampMonths(value?: number) {
  if (!Number.isFinite(value)) {
    return 12;
  }

  return Math.min(12, Math.max(1, Math.round(value ?? 12)));
}

function estimateMarginalTax(params: { annualOtherIncome: number; taxableAnnualRentalIncome: number; ownerAge: number }) {
  const annualOtherIncome = safeNumber(params.annualOtherIncome);
  const taxableAnnualRentalIncome = safeNumber(params.taxableAnnualRentalIncome);
  const monthlyOtherIncome = annualOtherIncome / 12;
  const monthlyRentalIncome = taxableAnnualRentalIncome / 12;
  const brackets =
    safeNumber(params.ownerAge) >= 60
      ? TAX_CONSTANTS_2026.incomeTax.workMonthlyBrackets
      : TAX_CONSTANTS_2026.incomeTax.nonWorkUnder60MonthlyBrackets;

  const monthlyTaxWithoutRent = calculateProgressiveTax(monthlyOtherIncome, brackets);
  const monthlyTaxWithRent = calculateProgressiveTax(monthlyOtherIncome + monthlyRentalIncome, brackets);

  return Math.max(0, (monthlyTaxWithRent - monthlyTaxWithoutRent) * 12);
}

function annualNetRent(grossRentAnnual: number, annualTax: number, deductibleExpensesAnnual: number) {
  return Math.max(0, grossRentAnnual - annualTax - deductibleExpensesAnnual);
}

function buildPtorRoute(params: {
  monthlyRent: number;
  rentedMonths: number;
  grossRentAnnual: number;
  deductibleExpensesAnnual: number;
  annualOtherIncome: number;
  ownerAge: number;
}): RentalTaxRouteResult {
  const threshold = RENTAL_EXEMPTION_THRESHOLD_MONTHLY_ILS_INDICATIVE;
  const doubleThreshold = threshold * 2;
  let taxableAnnualIncome = 0;
  let status: RentalRouteStatus = "possible";
  let explanation = "Le Massloul Ptor semble pertinent car le loyer reste sous le plafond indicatif d’exemption.";

  if (params.monthlyRent > threshold && params.monthlyRent <= doubleThreshold) {
    const exemptMonthly = Math.max(0, threshold - (params.monthlyRent - threshold));
    taxableAnnualIncome = Math.max(0, params.monthlyRent - exemptMonthly) * params.rentedMonths;
    status = "check";
    explanation =
      "Le Massloul Ptor devient partiel : une partie du loyer peut rester imposable selon la formule d’exemption partielle.";
  }

  if (params.monthlyRent > doubleThreshold) {
    taxableAnnualIncome = params.grossRentAnnual;
    status = "notRecommended";
    explanation =
      "Le loyer dépasse deux fois le plafond indicatif : le Massloul Ptor peut ne pas être disponible ou ne pas être recommandé.";
  }

  const annualTax = estimateMarginalTax({
    annualOtherIncome: params.annualOtherIncome,
    taxableAnnualRentalIncome: taxableAnnualIncome,
    ownerAge: params.ownerAge
  });

  return {
    id: "ptor",
    label: "Massloul Ptor (מסלול פטור)",
    status,
    annualTax,
    monthlyTax: annualTax / 12,
    annualNetRent: annualNetRent(params.grossRentAnnual, annualTax, params.deductibleExpensesAnnual),
    taxableAnnualIncome,
    explanation
  };
}

function buildTenPercentRoute(params: {
  grossRentAnnual: number;
  deductibleExpensesAnnual: number;
  isResidentialLongTerm: boolean;
}): RentalTaxRouteResult {
  const annualTax = params.grossRentAnnual * 0.1;

  return {
    id: "tenPercent",
    label: "Massloul 10 %",
    status: params.isResidentialLongTerm ? "possible" : "check",
    annualTax,
    monthlyTax: annualTax / 12,
    annualNetRent: annualNetRent(params.grossRentAnnual, annualTax, params.deductibleExpensesAnnual),
    taxableAnnualIncome: params.grossRentAnnual,
    explanation:
      "Le Massloul 10 % calcule un impôt estimé sur le loyer brut annuel, sans déduction des dépenses courantes."
  };
}

function buildMarginalRoute(params: {
  grossRentAnnual: number;
  deductibleExpensesAnnual: number;
  annualOtherIncome: number;
  ownerAge: number;
  hasHighExpenses: boolean;
}): RentalTaxRouteResult {
  const taxableAnnualIncome = Math.max(0, params.grossRentAnnual - params.deductibleExpensesAnnual);
  const annualTax = estimateMarginalTax({
    annualOtherIncome: params.annualOtherIncome,
    taxableAnnualRentalIncome: taxableAnnualIncome,
    ownerAge: params.ownerAge
  });

  return {
    id: "marginal",
    label: "Massloul Mass Shouli (מסלול מס שולי)",
    status: params.hasHighExpenses || params.ownerAge >= 60 ? "check" : "possible",
    annualTax,
    monthlyTax: annualTax / 12,
    annualNetRent: annualNetRent(params.grossRentAnnual, annualTax, params.deductibleExpensesAnnual),
    taxableAnnualIncome,
    explanation:
      params.hasHighExpenses || params.ownerAge >= 60
        ? "Le Massloul Mass Shouli mérite une vérification car les dépenses ou l’âge peuvent changer l’analyse."
        : "Le Massloul Mass Shouli estime l’impôt sur le profit locatif ajouté aux autres revenus."
  };
}

function routeRank(route: RentalTaxRouteResult) {
  return route.status === "notRecommended" ? Number.POSITIVE_INFINITY : route.annualTax;
}

function recommendationExplanation(route: RentalTaxRouteResult, flags: { hasHighExpenses: boolean; rentUnderThreshold: boolean }) {
  if (route.id === "ptor" && flags.rentUnderThreshold) {
    return "Le Massloul Ptor semble pertinent car vos loyers restent sous le plafond d’exemption indiqué.";
  }

  if (route.id === "tenPercent") {
    return "Le Massloul 10 % semble le plus avantageux dans cette simulation car l’impôt estimé reste inférieur aux autres routes.";
  }

  if (route.id === "marginal" && flags.hasHighExpenses) {
    return "Le Massloul Mass Shouli mérite une vérification car vos dépenses déductibles semblent importantes.";
  }

  if (route.id === "marginal") {
    return "Le Massloul Mass Shouli semble le plus avantageux dans cette simulation selon vos revenus et dépenses saisis.";
  }

  return `${route.label} semble le plus avantageux dans cette simulation indicative.`;
}

export function calculateRentalIncomeTaxComparison(inputs: RentalIncomeInputs): RentalIncomeComparison {
  const monthlyRent = safeNumber(inputs.monthlyRent);
  const rentedMonths = clampMonths(inputs.rentedMonths);
  const grossRentAnnual = monthlyRent * rentedMonths;
  const deductibleExpensesAnnual = Math.min(safeNumber(inputs.deductibleExpensesAnnual), grossRentAnnual);
  const annualOtherIncome = safeNumber(inputs.annualOtherIncome);
  const ownerAge = safeNumber(inputs.ownerAge);
  const numberOfProperties = Math.max(1, Math.round(safeNumber(inputs.numberOfProperties, 1)));
  const thresholdMonthly = RENTAL_EXEMPTION_THRESHOLD_MONTHLY_ILS_INDICATIVE;
  const hasHighExpenses = grossRentAnnual > 0 && deductibleExpensesAnnual >= Math.max(12000, grossRentAnnual * 0.2);
  const rentCloseToThreshold = monthlyRent > thresholdMonthly * 0.9 && monthlyRent < thresholdMonthly * 1.1;
  const rentUnderThreshold = monthlyRent <= thresholdMonthly;

  const routes = [
    buildPtorRoute({
      monthlyRent,
      rentedMonths,
      grossRentAnnual,
      deductibleExpensesAnnual,
      annualOtherIncome,
      ownerAge
    }),
    buildTenPercentRoute({
      grossRentAnnual,
      deductibleExpensesAnnual,
      isResidentialLongTerm: inputs.isResidentialLongTerm
    }),
    buildMarginalRoute({
      grossRentAnnual,
      deductibleExpensesAnnual,
      annualOtherIncome,
      ownerAge,
      hasHighExpenses
    })
  ];

  const recommendedRoute = routes.reduce((best, route) => (routeRank(route) < routeRank(best) ? route : best), routes[0]);
  const warnings = [
    RENTAL_EXEMPTION_THRESHOLD_LABEL,
    !inputs.isResidentialLongTerm
      ? "Attention : ce calculateur concerne la location résidentielle classique. Les revenus Airbnb / Booking ou location courte durée peuvent être traités différemment."
      : "",
    numberOfProperties > 1 ? "Plusieurs biens peuvent nécessiter une analyse plus détaillée." : "",
    hasHighExpenses ? "Vos dépenses semblent importantes : le Massloul Mass Shouli mérite probablement une vérification." : "",
    rentCloseToThreshold ? "Votre loyer est proche du plafond : une petite variation peut modifier le résultat." : "",
    ownerAge >= 60
      ? "À partir de 60 ans, certaines règles peuvent rendre le Massloul Mass Shouli plus intéressant selon la situation."
      : ""
  ].filter((warning): warning is string => Boolean(warning));

  return {
    grossRentAnnual,
    deductibleExpensesAnnual,
    thresholdMonthly,
    recommendedRoute,
    routes,
    explanation: recommendationExplanation(recommendedRoute, { hasHighExpenses, rentUnderThreshold }),
    warnings,
    assumptions: [
      "Simulation indicative pour revenus de location résidentielle longue durée en Israël.",
      "Le Massloul 10 % est estimé sur le loyer brut annuel, sans déduction fiscale des dépenses courantes.",
      "Le Massloul Mass Shouli est estimé avec un calcul marginal simplifié à partir des revenus annuels hors loyers.",
      "Les dépenses saisies sont retirées du revenu net estimé, mais leur traitement fiscal doit être vérifié.",
      "Une vérification personnalisée est recommandée avant toute décision ou déclaration."
    ]
  };
}
