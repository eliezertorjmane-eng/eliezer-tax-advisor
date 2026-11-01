import { TAX_CONSTANTS_2026 } from "./constants2026";

function parseAliyahDate(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
  const date = new Date(`${value}T00:00:00Z`);
  return Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === value ? date : null;
}

// An arrival-date signal only: effective tax residence and legal status still require review.
export function getOlehHadashReformContext(aliyahDate: string) {
  if (!parseAliyahDate(aliyahDate)) return null;
  if (aliyahDate >= "2025-11-05" && aliyahDate <= "2026-12-31") return "standard";
  if (aliyahDate >= "2027-01-01" && aliyahDate <= "2027-02-10") return "review";
  return null;
}

function monthDifferenceInclusive(start: Date, year: number, monthIndex: number) {
  return (year - start.getUTCFullYear()) * 12 + (monthIndex - start.getUTCMonth()) + 1;
}

// Section 35 / ITA notice of 21 July 2022 (amendment 262): fractions of an annual point per month.
function creditFractionForMonth(monthNumber: number, regime: "before2022" | "from2022") {
  if (monthNumber <= 0) {
    return 0;
  }

  if (regime === "before2022") {
    if (monthNumber <= 18) return 1 / 4;
    if (monthNumber <= 30) return 1 / 6;
    if (monthNumber <= 42) return 1 / 12;
    return 0;
  }

  if (monthNumber <= 12) return 1 / 12;
  if (monthNumber <= 30) return 1 / 4;
  if (monthNumber <= 42) return 1 / 6;
  if (monthNumber <= 54) return 1 / 12;
  return 0;
}

export function calculateOlehHadashCreditPoints(params: {
  aliyahDate: string;
  targetTaxYear: number;
  excludedMonths?: number;
  annualTaxBeforeCredits?: number;
}) {
  const aliyah = parseAliyahDate(params.aliyahDate);
  const excludedMonths = params.excludedMonths ?? 0;
  if (!aliyah || !Number.isInteger(params.targetTaxYear) || params.targetTaxYear < 1 || params.targetTaxYear > 9999 ||
    !Number.isSafeInteger(excludedMonths) || excludedMonths < 0 ||
    (params.annualTaxBeforeCredits !== undefined && (!Number.isFinite(params.annualTaxBeforeCredits) || params.annualTaxBeforeCredits < 0))) {
    return null;
  }

  const regime = aliyah.getUTCFullYear() < 2022 ? "before2022" : "from2022";
  const totalEligibilityMonths = regime === "before2022" ? 42 : 54;
  // Excluded periods suspend the timeline; their count alone cannot locate them in its bands.
  if (excludedMonths > 0) return {
    requiresReview: true as const, regime, totalEligibilityMonths,
    annualCreditPoints: null, estimatedValue: null, remainingEligibilityMonths: null,
    usableValue: null, unusedValue: null
  };
  let annualCreditPoints = 0;

  for (let monthIndex = 0; monthIndex < 12; monthIndex += 1) {
    const monthNumber = monthDifferenceInclusive(aliyah, params.targetTaxYear, monthIndex);
    annualCreditPoints += creditFractionForMonth(monthNumber, regime);
  }

  const estimatedValue = annualCreditPoints * TAX_CONSTANTS_2026.creditPoint.annualValue;
  const monthsElapsedAtYearEnd = monthDifferenceInclusive(aliyah, params.targetTaxYear, 11);
  const remainingEligibilityMonths = Math.max(0, totalEligibilityMonths - Math.max(0, monthsElapsedAtYearEnd));
  const usableValue = params.annualTaxBeforeCredits === undefined ? null : Math.min(params.annualTaxBeforeCredits, estimatedValue);

  return {
    requiresReview: false as const,
    regime,
    totalEligibilityMonths,
    annualCreditPoints,
    estimatedValue,
    remainingEligibilityMonths,
    usableValue,
    unusedValue: usableValue === null ? null : Math.max(0, estimatedValue - usableValue)
  };
}
