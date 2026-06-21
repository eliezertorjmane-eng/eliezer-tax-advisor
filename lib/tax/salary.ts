import { calculateEmployeeBituahLeumi } from "@/lib/tax/bituahLeumi";
import { calculateIncomeTax } from "@/lib/tax/incomeTax";

export function calculateGrossToNetSalary(params: {
  monthlyGrossSalary: number;
  creditPoints: number;
  pensionPercent: number;
  kerenHishtalmutPercent: number;
  includeBituahLeumi: boolean;
}) {
  const gross = Math.max(0, params.monthlyGrossSalary);
  const incomeTax = calculateIncomeTax({
    monthlyTaxableIncome: gross,
    creditPoints: Math.max(0, params.creditPoints),
    incomeType: "work",
    age60OrOlder: false
  });
  const bituahLeumi = params.includeBituahLeumi ? calculateEmployeeBituahLeumi(gross).contribution : 0;
  const pension = gross * Math.max(0, params.pensionPercent) / 100;
  const kerenHishtalmut = gross * Math.max(0, params.kerenHishtalmutPercent) / 100;
  const net = Math.max(0, gross - incomeTax.monthlyTaxAfterCredits - bituahLeumi - pension - kerenHishtalmut);

  return {
    monthlyGrossSalary: gross,
    annualGrossSalary: gross * 12,
    monthlyIncomeTax: incomeTax.monthlyTaxAfterCredits,
    annualIncomeTax: incomeTax.annualTaxAfterCredits,
    monthlyBituahLeumiAndHealth: bituahLeumi,
    pension,
    kerenHishtalmut,
    estimatedMonthlyNet: net,
    assumptions: [
      "Pas d’avantage employeur, voiture de fonction ou avantage imposable spécifique.",
      "Aucun crédit fiscal supplémentaire sauf les נקודות זיכוי saisies.",
      "Pas de coordination fiscale ni d’exemption particulière.",
      "Estimation mensuelle simplifiée sans calcul détaillé des avantages fiscaux de pension."
    ]
  };
}
