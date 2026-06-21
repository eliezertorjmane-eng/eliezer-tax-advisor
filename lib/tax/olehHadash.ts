import { TAX_CONSTANTS_2026 } from "@/lib/tax/constants2026";

function monthDifferenceInclusive(start: Date, year: number, monthIndex: number) {
  return (year - start.getFullYear()) * 12 + (monthIndex - start.getMonth()) + 1;
}

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
  const aliyah = new Date(`${params.aliyahDate}T00:00:00`);
  if (Number.isNaN(aliyah.getTime())) {
    return null;
  }

  const regime = aliyah.getFullYear() < 2022 ? "before2022" : "from2022";
  const totalEligibilityMonths = regime === "before2022" ? 42 : 54;
  let annualCreditPoints = 0;

  for (let monthIndex = 0; monthIndex < 12; monthIndex += 1) {
    const monthNumber = monthDifferenceInclusive(aliyah, params.targetTaxYear, monthIndex);
    annualCreditPoints += creditFractionForMonth(monthNumber, regime);
  }

  const excludedMonths = Math.max(0, params.excludedMonths ?? 0);
  const adjustedAnnualCreditPoints = Math.max(0, annualCreditPoints - excludedMonths / 12);
  const estimatedValue = adjustedAnnualCreditPoints * TAX_CONSTANTS_2026.creditPoint.annualValue;
  const monthsElapsedAtYearEnd = monthDifferenceInclusive(aliyah, params.targetTaxYear, 11);
  const remainingEligibilityMonths = Math.max(0, totalEligibilityMonths - Math.max(0, monthsElapsedAtYearEnd));
  const annualTaxBeforeCredits = Math.max(0, params.annualTaxBeforeCredits ?? estimatedValue);
  const usableValue = Math.min(annualTaxBeforeCredits, estimatedValue);

  return {
    regime,
    totalEligibilityMonths,
    annualCreditPoints: adjustedAnnualCreditPoints,
    estimatedValue,
    remainingEligibilityMonths,
    usableValue,
    unusedValue: Math.max(0, estimatedValue - usableValue)
  };
}
