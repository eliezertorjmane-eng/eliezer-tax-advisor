import { TAX_CONSTANTS_2026, type TaxBracket } from "@/lib/tax/constants2026";

export function calculateProgressiveTax(monthlyIncome: number, brackets: readonly TaxBracket[]) {
  const income = Math.max(0, monthlyIncome);
  let previousLimit = 0;
  let tax = 0;

  for (const bracket of brackets) {
    const upper = bracket.upTo;
    const taxableInBracket = Math.max(0, Math.min(income, upper) - previousLimit);
    tax += taxableInBracket * bracket.rate;

    if (income <= upper) {
      break;
    }

    previousLimit = upper;
  }

  return tax;
}

export function calculateCreditPointValue(points: number) {
  const safePoints = Math.max(0, points);
  return {
    monthlyValue: safePoints * TAX_CONSTANTS_2026.creditPoint.monthlyValue,
    annualValue: safePoints * TAX_CONSTANTS_2026.creditPoint.annualValue
  };
}

export function calculateIncomeTax(params: {
  monthlyTaxableIncome: number;
  creditPoints: number;
  incomeType: "work" | "nonWork";
  age60OrOlder: boolean;
}) {
  const brackets =
    params.incomeType === "work" || params.age60OrOlder
      ? TAX_CONSTANTS_2026.incomeTax.workMonthlyBrackets
      : TAX_CONSTANTS_2026.incomeTax.nonWorkUnder60MonthlyBrackets;
  const monthlyTaxBeforeCredits = calculateProgressiveTax(params.monthlyTaxableIncome, brackets);
  const annualTaxBeforeCredits = monthlyTaxBeforeCredits * 12;
  const creditValue = calculateCreditPointValue(params.creditPoints);
  const usableCreditValue = Math.min(annualTaxBeforeCredits, creditValue.annualValue);
  const annualTaxAfterCredits = Math.max(0, annualTaxBeforeCredits - usableCreditValue);

  return {
    annualGrossTaxableIncome: Math.max(0, params.monthlyTaxableIncome) * 12,
    annualTaxBeforeCredits,
    monthlyTaxBeforeCredits,
    creditAnnualValue: creditValue.annualValue,
    usableCreditValue,
    unusedCreditValue: Math.max(0, creditValue.annualValue - usableCreditValue),
    annualTaxAfterCredits,
    monthlyTaxAfterCredits: annualTaxAfterCredits / 12
  };
}
