import { TAX_CONSTANTS_2026 } from "@/lib/tax/constants2026";

export function calculateKnownCreditPointValue(points: number, annualTaxBeforeCredits?: number) {
  const safePoints = Math.max(0, points);
  const annualValue = safePoints * TAX_CONSTANTS_2026.creditPoint.annualValue;
  const monthlyAverageValue = safePoints * TAX_CONSTANTS_2026.creditPoint.monthlyValue;
  const usableAmount =
    typeof annualTaxBeforeCredits === "number" ? Math.min(Math.max(0, annualTaxBeforeCredits), annualValue) : annualValue;

  return {
    points: safePoints,
    annualValue,
    monthlyAverageValue,
    usableAmount,
    unusedAmount: Math.max(0, annualValue - usableAmount)
  };
}
