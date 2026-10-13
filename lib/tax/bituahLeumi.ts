import { TAX_CONSTANTS_2026 } from "./constants2026";

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

// Accept French decimals and grouped amounts; reject malformed input instead of silently turning it into zero.
export function parseBituahAmount(raw: string): number | null {
  let value = raw.trim().replace(/[\s\u00a0\u202f₪]/g, "");
  if (!value || !/^[\d.,]+$/.test(value)) return null;
  if (value.includes(",") && value.includes(".")) {
    const decimal = value.lastIndexOf(",") > value.lastIndexOf(".") ? "," : ".";
    const grouping = decimal === "," ? "." : ",";
    const [whole, fraction, extra] = value.split(decimal);
    if (extra !== undefined || !/^\d{1,2}$/.test(fraction)) return null;
    const groups = whole.split(grouping);
    if (!/^\d{1,3}$/.test(groups[0]) || groups.slice(1).some((group) => !/^\d{3}$/.test(group))) return null;
    value = groups.join("") + "." + fraction;
  } else if (value.includes(",") || value.includes(".")) {
    const groups = value.split(value.includes(",") ? "," : ".");
    if (groups.length > 1 && /^\d{1,3}$/.test(groups[0]) && groups.slice(1).every((group) => /^\d{3}$/.test(group))) {
      value = groups.join("");
    } else if (groups.length === 2 && /^\d+$/.test(groups[0]) && /^\d{1,2}$/.test(groups[1])) {
      value = groups.join(".");
    } else return null;
  }
  const amount = Number(value);
  return Number.isFinite(amount) && amount >= 0 && amount <= Number.MAX_SAFE_INTEGER / 12 ? amount : null;
}

export function classifyBituahActivity(monthlyIncome: number, weeklyHours: number) {
  const d = TAX_CONSTANTS_2026.bituahLeumi.independentDefinition;
  const reasons: string[] = [];
  if (weeklyHours >= d.hoursThreshold) reasons.push("Au moins 20 heures d’activité par semaine.");
  if (monthlyIncome >= d.incomeThreshold50Percent) reasons.push("Revenu mensuel moyen d’au moins 6 884,50 ₪ (50 % du salaire moyen, publié arrondi à 6 885 ₪).");
  if (weeklyHours >= d.comboHoursThreshold && monthlyIncome >= d.comboIncomeThreshold15Percent) reasons.push("Au moins 12 heures par semaine et 2 065,35 ₪ par mois (15 % du salaire moyen, publié arrondi à 2 065 ₪).");
  return { status: reasons.length ? "atzmai" as const : "notDefinition" as const, reasons };
}

export type BituahSimulationInput = {
  annualBusinessProfit: number;
  weeklyHours: number;
  isSalaried: boolean;
  monthlySalary: number;
  standardCategory?: boolean;
};

const roundMoney = (value: number) => Math.round((value + Number.EPSILON) * 100) / 100;

// Section 345: solve X + 52% * NI(X) = profit, with the actual remaining cap inside NI.
// A monotone solve also handles the minimum and maximum without an uncapped deduction at high incomes.
function adjustedSelfEmployedBase(profit: number, reducedRoom: number, cap: number, floor: number) {
  const c = TAX_CONSTANTS_2026.bituahLeumi;
  const rates = c.selfEmployedRates.breakdown;
  const nationalOn = (base: number) => {
    const insured = Math.min(cap, Math.max(floor, base));
    const reduced = Math.min(insured, reducedRoom);
    return reduced * rates.bituahLeumiReduced + (insured - reduced) * rates.bituahLeumiRegular;
  };
  let low = 0;
  let high = profit;
  for (let i = 0; i < 80; i++) {
    const mid = (low + high) / 2;
    if (mid + c.nationalInsuranceDeduction * nationalOn(mid) < profit) low = mid;
    else high = mid;
  }
  const adjusted = (low + high) / 2;
  return { adjusted, deduction: Math.min(profit, c.nationalInsuranceDeduction * nationalOn(adjusted)) };
}

export function calculateBituahLeumiSimulation(input: BituahSimulationInput) {
  const c = TAX_CONSTANTS_2026.bituahLeumi;
  const valid = [input.annualBusinessProfit, input.weeklyHours, input.monthlySalary].every((v) => Number.isFinite(v) && v >= 0 && v <= Number.MAX_SAFE_INTEGER / 12) && input.weeklyHours <= 168;
  const profit = valid ? input.annualBusinessProfit / 12 : 0;
  const salary = valid && input.isSalaried ? input.monthlySalary : 0;
  const { status, reasons } = classifyBituahActivity(profit, valid ? input.weeklyHours : 0);
  const independent = status === "atzmai";
  const cap = Math.max(0, c.maximumMonthlyInsuredIncome - salary);
  const reducedRoom = Math.max(0, c.reducedBracket - salary);
  const warnings: string[] = [];
  let shouldCalculate = valid && input.standardCategory !== false;
  if (!valid) warnings.push("Saisissez des montants positifs ou nuls et des heures entre 0 et 168.");
  if (input.standardCategory === false) warnings.push("Cette catégorie d’assuré nécessite une vérification personnalisée ; aucun montant standard n’est calculé.");
  if (input.isSalaried && salary <= 0) {
    shouldCalculate = false;
    warnings.push("Indiquez votre salaire brut mensuel pour coordonner les tranches et le plafond.");
  }
  const floor = Math.max(0, c.minimumSelfEmployedCalculationBase - salary);
  const adjustment = independent ? adjustedSelfEmployedBase(profit, reducedRoom, cap, floor) : { adjusted: profit, deduction: 0 };
  // The employee/non-work FAQ retains the 25% exemption even with salary. Apply it to the
  // activity alone, before the remaining salary-prioritized cap; qualifying self-employment has no such exemption.
  const exemption = independent ? 0 : Math.min(profit, c.nonWorkIncomeExemption);
  const beforeLimits = Math.max(0, adjustment.adjusted - exemption);
  const minimumApplied = independent && beforeLimits < floor;
  const contributionBase = Math.min(cap, Math.max(independent ? floor : 0, beforeLimits));
  const reducedBase = Math.min(contributionBase, reducedRoom);
  const regularBase = contributionBase - reducedBase;
  const niReduced = independent ? c.selfEmployedRates.breakdown.bituahLeumiReduced : c.nonWorkIncomeRates.breakdown.nationalReduced;
  const niRegular = independent ? c.selfEmployedRates.breakdown.bituahLeumiRegular : c.nonWorkIncomeRates.breakdown.nationalRegular;
  const healthReduced = independent ? c.selfEmployedRates.breakdown.healthReduced : c.nonWorkIncomeRates.breakdown.health;
  const healthRegular = independent ? c.selfEmployedRates.breakdown.healthRegular : c.nonWorkIncomeRates.breakdown.health;
  // Preserve non-work bases and components until final estimate rounding.
  // Keep the existing qualifying self-employed calculation unchanged.
  const calculationPrecision = independent ? roundMoney : (value: number) => value;
  const reducedNational = calculationPrecision(reducedBase * niReduced);
  const regularNational = calculationPrecision(regularBase * niRegular);
  const reducedHealth = calculationPrecision(reducedBase * healthReduced);
  const regularHealth = calculationPrecision(regularBase * healthRegular);
  let nationalInsurance = calculationPrecision(reducedNational + regularNational);
  let healthInsurance = calculationPrecision(reducedHealth + regularHealth);
  const nonWorkingMinimumApplied = !independent && !input.isSalaried && nationalInsurance + healthInsurance < c.minimumNonWorking.total;
  const minimumNationalTopUp = nonWorkingMinimumApplied ? calculationPrecision(c.minimumNonWorking.national - nationalInsurance) : 0;
  const minimumHealthTopUp = nonWorkingMinimumApplied ? calculationPrecision(c.minimumNonWorking.health - healthInsurance) : 0;
  if (nonWorkingMinimumApplied) { nationalInsurance = c.minimumNonWorking.national; healthInsurance = c.minimumNonWorking.health; }
  if (minimumApplied) warnings.push("Minimum combiné : 25 % du salaire moyen (3 442,25 ₪, publié arrondi à 3 442 ₪), diminué du salaire déjà assuré.");
  if (nonWorkingMinimumApplied) warnings.push("Minimum de 266 ₪ pour la catégorie standard sans emploi. Une femme mariée sans emploi, un étudiant ou une catégorie exonérée peut suivre d’autres règles.");
  const capApplied = beforeLimits > cap || salary >= c.maximumMonthlyInsuredIncome;
  if (capApplied) warnings.push("Le plafond global de 51 910 ₪ est atteint ; le salaire est pris en compte en priorité.");
  if (!independent) warnings.push("Activité traitée comme revenu hors travail : la couverture et certains droits sociaux peuvent différer, notamment pour les risques liés à l’activité.");
  const nonWorkAdjustmentRequiresReview = !independent && !input.isSalaried && beforeLimits > 0 && cap > 0;
  if (nonWorkAdjustmentRequiresReview) {
    shouldCalculate = false;
    warnings.push("Le barème hors travail et l’exemption de 25 % sont identifiés. L’articulation de la déduction de 52 % (section 345) avec cette activité et l’exemption nécessite une validation personnalisée. Le détail avant cet ajustement est disponible pour vérification ; aucun montant définitif n’est estimé.");
  }
  if (input.isSalaried) warnings.push("Seule la cotisation liée à l’activité est affichée, hors cotisations déjà prélevées sur le salaire. Salaire constant et déclaré à Bitouah Leumi sur l’année entière.");
  if (!independent && input.isSalaried && salary > 0) warnings.push("L’exemption hors travail de 25 % du salaire moyen, publiée à 3 442 ₪ par mois en 2026, reste applicable même avec un salaire. Seul l’excédent utilise les tranches et le plafond encore disponibles après le salaire. Le minimum sans emploi de 266 ₪ n’est pas ajouté à un salarié déjà assuré.");
  const monthly = calculationPrecision(nationalInsurance + healthInsurance);
  const annual = calculationPrecision(monthly * 12);
  const quarterly = calculationPrecision(monthly * 3);
  return {
    shouldCalculate, nonWorkAdjustmentRequiresReview, status, reasons: reasons.length ? reasons : ["Aucune des trois conditions n’est remplie : moins de 20 heures, revenu inférieur à 6 884,50 ₪ et condition 12 heures / 2 065,35 ₪ non remplie."],
    monthlyProfit: profit, monthlySalary: salary, adjustedMonthlyBase: adjustment.adjusted,
    deduction: adjustment.deduction, exemption, contributionBase, reducedRoom, remainingCap: cap,
    minimumApplied, nonWorkingMinimumApplied, capApplied, nationalInsurance, healthInsurance,
    monthly, annual, quarterly,
    // Round each payment period only after aggregating its precise contributions.
    monthlyEstimate: Math.round(monthly), annualEstimate: Math.round(annual), quarterlyEstimate: Math.round(quarterly),
    effectiveRate: profit > 0 ? monthly / profit : null,
    rows: [
      { label: "Réduite", base: reducedBase, rate: niReduced + healthReduced, national: reducedNational, health: reducedHealth, contribution: calculationPrecision(reducedNational + reducedHealth) },
      { label: "Normale", base: regularBase, rate: niRegular + healthRegular, national: regularNational, health: regularHealth, contribution: calculationPrecision(regularNational + regularHealth) }
    ],
    minimumTopUp: calculationPrecision(minimumNationalTopUp + minimumHealthTopUp), warnings,
    assumptions: ["Résident israélien de 18 ans à l’âge de la retraite, sans exonération particulière.", "Activité et salaire stables sur douze mois ; le montant définitif dépend de la שומה סופית.", "Les versements à une קופת גמל, les autres revenus et le régime Esek Zair ne sont pas modélisés."]
  };
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
  const result = calculateBituahLeumiSimulation({ annualBusinessProfit: params.monthlyIndependentIncome * 12, weeklyHours: params.weeklyIndependentHours, isSalaried: params.monthlyEmployeeSalary > 0, monthlySalary: params.monthlyEmployeeSalary });
  return {
    ...result, contribution: result.shouldCalculate ? result.monthly : null,
    reducedBase: result.rows[0].base, regularBase: result.rows[1].base,
    netAfterContribution: result.shouldCalculate ? Math.max(0, params.monthlyIndependentIncome - result.monthly) : null,
    comparison: null
  };
}
