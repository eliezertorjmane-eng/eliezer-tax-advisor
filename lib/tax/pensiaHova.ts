export const PENSIA_HOVA_2026 = {
  year: 2026,
  averageMonthlySalary: 13769,
  firstThreshold: 82614,
  secondThreshold: 165228,
  firstRate: 0.0445,
  secondRate: 0.1255,
  maximumAnnualContribution: 14044.38
} as const;

// The 2027 entry is a provisional estimate using 2026 financial parameters.
type PensionYearConstants = { readonly [K in keyof typeof PENSIA_HOVA_2026]: number };
export const PENSIA_HOVA_BY_YEAR: Readonly<Record<number, PensionYearConstants | undefined>> = {
  2026: PENSIA_HOVA_2026,
  2027: { ...PENSIA_HOVA_2026, year: 2027 }
};
export const PENSIA_HOVA_REFERENCE_YEAR: Readonly<Record<number, number | undefined>> = { 2026: 2026, 2027: 2026 };
export const PENSIA_HOVA_YEAR_SOURCES: Readonly<Record<number, string | undefined>> = {
  2026: "https://www.btl.gov.il/Insurance/HozrimBituah/Hozrim/_מקדמות_ודמי_ביטוח_לעצמאים_2026__.pdf"
};
export function getPensiaHovaYear(year: number) { return PENSIA_HOVA_BY_YEAR[year]; }
export function getPensiaHovaReferenceYear(year: number) { return PENSIA_HOVA_REFERENCE_YEAR[year]; }

export type PensiaHovaInput = {
  fiscalYear: number;
  annualProfit: number;
  firstRegistrationDate: string;
  dateOfBirth: string;
  isSalaried: boolean;
  independentDeposits: number;
  salariedPensionDeposits: number;
  exceptionalYear?: boolean;
};

function validDate(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T00:00:00Z`);
  return Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === value;
}

export function calculatePensiaHova(input: PensiaHovaInput) {
  const supportedYear = getPensiaHovaYear(input.fiscalYear);
  const referenceYear = getPensiaHovaReferenceYear(input.fiscalYear);
  const c = supportedYear ?? PENSIA_HOVA_2026;
  const provisional = referenceYear !== undefined && referenceYear !== input.fiscalYear;
  const reasons: string[] = [];
  const warnings: string[] = [];
  const requiresReview = input.exceptionalYear === true;
  const yearEnd = `${c.year}-12-31`;
  const valid = supportedYear !== undefined && input.fiscalYear === c.year &&
    [input.annualProfit, input.independentDeposits, input.salariedPensionDeposits].every((value) => Number.isFinite(value) && Math.abs(value) <= Number.MAX_SAFE_INTEGER / 24) &&
    input.independentDeposits >= 0 && input.salariedPensionDeposits >= 0 &&
    validDate(input.dateOfBirth) && validDate(input.firstRegistrationDate) &&
    input.dateOfBirth <= yearEnd && input.firstRegistrationDate <= yearEnd && input.firstRegistrationDate >= input.dateOfBirth;
  const ageAtYearEnd = valid ? c.year - Number(input.dateOfBirth.slice(0, 4)) : null;
  const transitionalExemption = valid && input.dateOfBirth <= "1962-01-01";
  // Section 4 tests all exceptions at the end of the tax year. July 1 reaches six
  // calendar months only on January 1 of the following year, unlike June 30.
  const recentRegistration = valid && input.firstRegistrationDate >= `${c.year}-07-01`;
  const ageExemption = valid && (ageAtYearEnd! < 21 || ageAtYearEnd! >= 60);
  const exempt = transitionalExemption || ageExemption || recentRegistration;
  if (!valid) reasons.push(`Renseignez des montants valides et des dates cohérentes au plus tard le 31 décembre ${input.fiscalYear}.`);
  if (valid) {
    if (provisional) {
      warnings.push("Estimation provisoire 2027 calculée avec les taux et plafonds de référence 2026, en attendant leur actualisation.");
      warnings.push("Les règles d’éligibilité propres à 2027 n’ont pas été vérifiées séparément; les contrôles de dates et d’âge appliquent le cadre modélisé au 31 décembre 2027.");
    }
    if (requiresReview) reasons.push("Fermeture, réouverture ou changement de résidence signalé : situation particulière, vérification nécessaire. Aucun montant définitif n’est estimé.");
    reasons.push(transitionalExemption
      ? "Vous aviez au moins 55 ans le 1er janvier 2017 : exemption transitoire."
      : ageExemption
        ? `Au 31 décembre ${c.year}, vous avez ${ageAtYearEnd} ans : l’obligation standard ne s’applique pas avant 21 ans ou à partir de 60 ans.`
        : `Au 31 décembre ${c.year}, vous avez ${ageAtYearEnd} ans : condition d’âge de 21 à moins de 60 ans remplie.`);
    reasons.push(recentRegistration
      ? `Première immatriculation à partir du 1er juillet ${c.year} : moins de six mois écoulés au 31 décembre, exemption pour cette année.`
      : "Au moins six mois depuis la première immatriculation à la TVA au 31 décembre : pas d’exemption pour immatriculation récente.");
    reasons.push(`Le barème annuel porte sur le bénéfice éligible réellement gagné en ${c.year}, sans annualisation ni prorata des seuils selon les mois de revenus.`);
    if (input.isSalaried) reasons.push("Les versements pension admissibles du salarié et de l’employeur couvrent d’abord l’obligation ; vos versements indépendants ne sont comptés qu’une fois, ensuite.");
    if (input.annualProfit <= 0) reasons.push("Bénéfice nul ou déficitaire : aucune obligation calculée sur ce revenu.");
    warnings.push("Estimation pour une première immatriculation continue et un revenu professionnel éligible. Fermeture, réouverture, changement de résidence ou autre situation exceptionnelle : faites vérifier le dossier ; ne traitez pas cette estimation comme un montant définitif.");
    if (input.isSalaried) warnings.push("Utilisez uniquement les cotisations pension admissibles attestées, parts salarié et employeur. Ne saisissez pas un salaire, une Keren Hishtalmut, un transfert d’épargne ou des primes d’assurance séparées. N’ajoutez pas automatiquement les פיצויים : une attestation mêlant ces composantes nécessite une vérification avant de retenir le résultat.");
  }
  const profit = valid ? Math.max(0, input.annualProfit) : 0;
  const firstBase = Math.min(profit, c.firstThreshold);
  const secondBase = Math.min(Math.max(0, profit - c.firstThreshold), c.secondThreshold - c.firstThreshold);
  const firstContribution = firstBase * c.firstRate;
  const secondContribution = secondBase * c.secondRate;
  const bracketTotal = firstContribution + secondContribution;
  const annualObligation = valid && !requiresReview ? (exempt ? 0 : bracketTotal) : null;
  const salariedDeposits = valid && input.isSalaried ? input.salariedPensionDeposits : 0;
  const independentDeposits = valid ? input.independentDeposits : 0;
  const totalDeposits = salariedDeposits + independentDeposits;
  const salaryOffset = Math.min(annualObligation ?? 0, salariedDeposits);
  const independentRequirement = annualObligation === null ? null : annualObligation - salaryOffset;
  const independentCovered = Math.min(independentRequirement ?? 0, independentDeposits);
  const totalCovered = salaryOffset + independentCovered;
  const remaining = annualObligation === null ? null : Math.max(0, annualObligation - totalCovered);
  const excessDeposits = annualObligation === null ? null : Math.max(0, totalDeposits - annualObligation);
  return {
    valid, requiresReview, status: !valid ? "invalid" as const : requiresReview ? "review" as const : exempt ? "exempt" as const : "mandatory" as const,
    referenceYear, provisional,
    ageAtYearEnd, ageExemption, transitionalExemption, recentRegistration,
    reasons, warnings, firstBase, secondBase, firstContribution, secondContribution,
    bracketTotal, annualObligation, monthlyPlanning: annualObligation === null ? null : annualObligation / 12,
    salariedDeposits, independentDeposits, totalDeposits, salaryOffset, independentRequirement,
    independentCovered, totalCovered, remaining, excessDeposits
  };
}
