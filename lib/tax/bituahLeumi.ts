import { TAX_CONSTANTS_2026 } from "@/lib/tax/constants2026";

export type BituahLeumiStatus = "atzmai" | "notDefinition";

export function detectBituahLeumiIndependentStatus(params: {
  monthlyIndependentIncome: number;
  weeklyIndependentHours: number;
}): BituahLeumiStatus {
  const { monthlyIndependentIncome, weeklyIndependentHours } = params;
  const definition = TAX_CONSTANTS_2026.bituahLeumi.independentDefinition;

  if (weeklyIndependentHours >= definition.hoursThreshold) {
    return "atzmai";
  }

  if (monthlyIndependentIncome >= definition.incomeThreshold50Percent) {
    return "atzmai";
  }

  if (
    weeklyIndependentHours >= definition.comboHoursThreshold &&
    monthlyIndependentIncome >= definition.comboIncomeThreshold15Percent
  ) {
    return "atzmai";
  }

  return "notDefinition";
}

function cappedRemainingBase(employeeSalary: number, independentIncome: number) {
  const cap = TAX_CONSTANTS_2026.bituahLeumi.maximumMonthlyInsuredIncome;
  return Math.max(0, Math.min(independentIncome, cap - Math.min(employeeSalary, cap)));
}

function reducedRemaining(employeeSalary: number) {
  const reducedBracket = TAX_CONSTANTS_2026.bituahLeumi.reducedBracket;
  return Math.max(0, reducedBracket - Math.min(employeeSalary, reducedBracket));
}

export function calculateEmployeeBituahLeumi(monthlyGrossSalary: number) {
  const constants = TAX_CONSTANTS_2026.bituahLeumi;
  const cappedSalary = Math.max(0, Math.min(monthlyGrossSalary, constants.maximumMonthlyInsuredIncome));
  const reducedPart = Math.min(cappedSalary, constants.reducedBracket);
  const regularPart = Math.max(0, cappedSalary - constants.reducedBracket);

  return {
    cappedSalary,
    reducedPart,
    regularPart,
    contribution:
      reducedPart * constants.employeeRates.totalReduced + regularPart * constants.employeeRates.totalRegular
  };
}

export function calculateBituahLeumiIndependent(params: {
  monthlyEmployeeSalary: number;
  monthlyIndependentIncome: number;
  weeklyIndependentHours: number;
}) {
  const constants = TAX_CONSTANTS_2026.bituahLeumi;
  const employeeSalary = Math.max(0, params.monthlyEmployeeSalary);
  const independentIncome = Math.max(0, params.monthlyIndependentIncome);
  const status = detectBituahLeumiIndependentStatus({
    monthlyIndependentIncome: independentIncome,
    weeklyIndependentHours: Math.max(0, params.weeklyIndependentHours)
  });
  const contributionBase = cappedRemainingBase(employeeSalary, independentIncome);
  const reducedBase = Math.min(contributionBase, reducedRemaining(employeeSalary));
  const regularBase = Math.max(0, contributionBase - reducedBase);
  const rates =
    status === "atzmai" ? constants.selfEmployedRates : constants.nonWorkIncomeRates;
  const contribution = reducedBase * rates.reduced + regularBase * rates.regular;
  const netAfterContribution = Math.max(0, independentIncome - contribution);

  const at20HoursStatus = detectBituahLeumiIndependentStatus({
    monthlyIndependentIncome: independentIncome,
    weeklyIndependentHours: 20
  });
  const at20HoursContribution =
    at20HoursStatus === "atzmai"
      ? reducedBase * constants.selfEmployedRates.reduced + regularBase * constants.selfEmployedRates.regular
      : contribution;

  return {
    status,
    contributionBase,
    reducedBase,
    regularBase,
    contribution,
    netAfterContribution,
    assumptions: [
      "Estimation mensuelle simplifiée selon les constantes 2026.",
      "Interaction salaire salarié / revenu indépendant traitée de façon indicative avec le salaire utilisant d’abord la tranche réduite.",
      "Les plafonds, minima et situations particulières doivent être vérifiés individuellement."
    ],
    comparison:
      status !== "atzmai" && at20HoursStatus === "atzmai"
        ? {
            note: "Point à vérifier : avec 20 heures déclarées par semaine, le statut estimé deviendrait עצמאי.",
            estimatedDifference: at20HoursContribution - contribution
          }
        : null
  };
}
