import { calculateBituahLeumiSimulation } from "./bituahLeumi";
import { calculateChildCreditPoints } from "./childCreditPoints";
import { TAX_CONSTANTS_2026 } from "./constants2026";
import { calculateIncomeTax } from "./incomeTax";
import { calculateOleHadashExemption } from "./oleHadashExemption";
import { calculateOlehHadashCreditPoints } from "./olehHadash";
import { calculatePensiaHova } from "./pensiaHova";

export type IndependentTaxSimulatorInput = {
  businessRegime: "classic" | "esekZair";
  annualTurnover: number;
  annualProfit: number;
  confirmedEsekZairRestriction: boolean;
  weeklyHours: number;
  isSalaried: boolean;
  monthlySalary: number;
  salariedMonths: number;
  salaryPatternRequiresReview: boolean;
  parentProfile: "father" | "mother";
  childrenBirthYears: number[];
  specialFamilySituation: boolean;
  fullYearIsraeliResident: boolean;
  hasAlyah: boolean;
  aliyahDate: string;
  dateOfBirth: string;
  businessCreationDate: string;
  independentPensionDeposits: number | null;
  salariedPensionDeposits: number | null;
  oleRelatedIncome: number;
  oleRelatedSource: "none" | "family" | "company" | "unsure";
  actualCashExpenses: number | null;
};

const ESEK_ZAIR_2026_TURNOVER_CAP = 122_833;
const ADDITIONAL_TAX_THRESHOLD_2026 = 721_560;
const MAX_INPUT_AMOUNT = Number.MAX_SAFE_INTEGER / 12;

function validDate(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T00:00:00Z`);
  return Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === value;
}

function validAmount(value: number) {
  return Number.isFinite(value) && value >= 0 && value <= MAX_INPUT_AMOUNT;
}

function taxWithCredits(annualIncome: number, creditPoints: number) {
  return calculateIncomeTax({
    monthlyTaxableIncome: annualIncome / 12,
    creditPoints,
    incomeType: "work",
    age60OrOlder: false
  });
}

export function calculateIndependentTaxSimulator2026(input: IndependentTaxSimulatorInput) {
  const warnings: string[] = [];
  const invalid: string[] = [];
  const businessIncomeForIncomeTax = input.businessRegime === "esekZair"
    ? input.annualTurnover * 0.7
    : input.annualProfit;
  const businessIncomeForNationalInsurance = businessIncomeForIncomeTax;
  const businessIncomeForPension = input.businessRegime === "classic" ? input.annualProfit : null;
  const salaryAmountsValid = validAmount(input.monthlySalary) && Number.isInteger(input.salariedMonths) && input.salariedMonths >= 0 && input.salariedMonths <= 12;
  const childBirthYearsValid = input.childrenBirthYears.length <= 12 && input.childrenBirthYears.every((year) => Number.isInteger(year) && year >= 2001 && year <= 2026);
  const activityAmountsValid = input.businessRegime === "esekZair"
    ? validAmount(input.annualTurnover)
    : validAmount(input.annualProfit);
  const valid = activityAmountsValid && salaryAmountsValid && validAmount(input.weeklyHours) && input.weeklyHours <= 168 &&
    (input.independentPensionDeposits === null || validAmount(input.independentPensionDeposits)) &&
    (!input.isSalaried || input.salariedPensionDeposits === null || validAmount(input.salariedPensionDeposits)) &&
    validAmount(input.oleRelatedIncome) && ["none", "family", "company", "unsure"].includes(input.oleRelatedSource) &&
    (input.actualCashExpenses === null || validAmount(input.actualCashExpenses)) &&
    (input.businessRegime !== "esekZair" || input.actualCashExpenses === null || input.actualCashExpenses <= input.annualTurnover) &&
    (!input.hasAlyah || validDate(input.aliyahDate));

  if (!valid) invalid.push("Vérifiez les montants, les heures, les années de naissance et les dates saisis.");
  if (input.businessRegime === "esekZair" && input.annualTurnover > ESEK_ZAIR_2026_TURNOVER_CAP) {
    invalid.push("Le chiffre d’affaires dépasse le plafond Esek Zair 2026 de 122 833 ₪. Le forfait de 30 % n’est pas appliqué; indiquez votre bénéfice après dépenses dans le calculateur classique.");
  }
  if (input.businessRegime === "esekZair" && input.confirmedEsekZairRestriction) {
    invalid.push("Une restriction d’éligibilité Esek Zair est signalée. Aucun calcul utilisant le forfait de 30 % n’est produit.");
  }
  if (input.businessRegime === "esekZair") {
    warnings.push("Esek Zair est un régime de déclaration d’impôt sur le revenu, distinct du statut de TVA Esek Patur. L’éligibilité juridique complète n’est pas vérifiée par ce simulateur.");
    warnings.push("Le plafond de chiffre d’affaires 2026 est 122 833 ₪. Des restrictions existent notamment pour certains salariés du payeur, les employeurs de personnel, les liens avec des proches et le contrôle d’une société.");
  }
  const classicPensionAdjustmentNeedsReview = input.businessRegime === "classic" &&
    (input.independentPensionDeposits === null || input.independentPensionDeposits > 0);
  if (classicPensionAdjustmentNeedsReview) {
    warnings.push(input.independentPensionDeposits === null
      ? "Les versements pension indépendants ne sont pas renseignés. Leur part déductible au titre de la section 345 dépend de la détermination de l’Autorité fiscale; les montants Bitouah Leumi et leur déduction dans l’impôt sont suspendus pour vérification."
      : "Des versements pension indépendants sont indiqués. Leur part déductible au titre de la section 345 dépend de la détermination de l’Autorité fiscale; les montants Bitouah Leumi et leur déduction dans l’impôt sont suspendus pour vérification.");
  }
  if (input.isSalaried && input.salariedMonths < 12) {
    warnings.push("Le salaire couvre moins de douze mois. L’impôt annuel utilise le total saisi; la coordination mensuelle des cotisations Bitouah Leumi n’est pas estimée.");
  }
  if (input.isSalaried && input.salaryPatternRequiresReview) {
    warnings.push("Salaire variable, plusieurs employeurs ou coordination inhabituelle : le calcul Bitouah Leumi est suspendu pour une ventilation par mois et par employeur.");
  }
  if (input.isSalaried && input.salariedMonths === 0 && input.monthlySalary > 0) {
    invalid.push("Indiquez au moins un mois salarié ou ramenez le salaire mensuel à zéro.");
  }
  if (input.specialFamilySituation && input.childrenBirthYears.length > 0) {
    warnings.push("Les points enfants ne sont pas appliqués à une situation familiale particulière. La répartition doit être vérifiée.");
  } else if (input.childrenBirthYears.length > 0) {
    warnings.push("Les points enfants suivent le profil standard père/mère. Garde partagée, parent isolé ou autre situation particulière peut modifier leur attribution.");
  }
  if (input.childrenBirthYears.length > 0 && !childBirthYearsValid) warnings.push("Complétez les années de naissance des enfants. Aucun point enfant n’est appliqué tant que ces données sont incomplètes.");
  if (!input.fullYearIsraeliResident) {
    warnings.push("Les points de base du résident et les points enfants ne sont pas appliqués : une résidence fiscale sur une partie de l’année exige un calcul adapté.");
  }
  if (input.hasAlyah) {
    warnings.push("La date d’Alyah sert de repère pour les points olé; elle ne prouve pas à elle seule la résidence fiscale ni les conditions d’éligibilité.");
  }
  if (input.businessRegime === "esekZair") {
    warnings.push("Pour Esek Zair, le module du Bitouah Leumi utilise le revenu transmis après les 30 %, sans déductions personnelles de la section 345. Le forfait n’est appliqué qu’une fois.");
    warnings.push("La base de Pensia Hova et son interaction exacte avec le forfait Esek Zair ne sont pas assez établies ici : le montant de pension reste à vérifier.");
  }
  if (input.independentPensionDeposits === null) warnings.push("Les versements pension indépendants ne sont pas renseignés; le reste à déposer ne peut pas être estimé.");
  if (input.isSalaried && input.salariedPensionDeposits === null) warnings.push("Les cotisations pension via le salaire ne sont pas renseignées : le montant restant de Pensia Hova ne peut pas être coordonné.");

  const applicable = valid && invalid.length === 0;
  const annualSalary = input.isSalaried ? input.monthlySalary * input.salariedMonths : 0;
  const independentBusinessIncome = applicable ? businessIncomeForIncomeTax : null;
  const socialIncome = applicable ? businessIncomeForNationalInsurance : null;
  const nationalInsurance = applicable && !(input.isSalaried && input.salariedMonths < 12) &&
    !(input.isSalaried && input.salaryPatternRequiresReview) && !classicPensionAdjustmentNeedsReview
    ? calculateBituahLeumiSimulation({
      annualBusinessProfit: businessIncomeForNationalInsurance,
      weeklyHours: input.weeklyHours,
      isSalaried: input.isSalaried,
      monthlySalary: input.isSalaried ? input.monthlySalary : 0,
      standardCategory: true,
      businessRegime: input.businessRegime
    })
    : null;

  if (nationalInsurance && !nationalInsurance.shouldCalculate) {
    warnings.push(...nationalInsurance.warnings);
  }

  const childCalculation = input.fullYearIsraeliResident && !input.specialFamilySituation && childBirthYearsValid
    ? calculateChildCreditPoints({ taxYear: 2026, parentProfile: input.parentProfile, childrenBirthYears: input.childrenBirthYears })
    : null;
  const standardCreditPoints = childCalculation?.totalStandardPoints ?? 0;
  const olehCalculation = input.hasAlyah && validDate(input.aliyahDate)
    ? calculateOlehHadashCreditPoints({ aliyahDate: input.aliyahDate, targetTaxYear: 2026 })
    : null;
  const olehCreditPoints = olehCalculation && !olehCalculation.requiresReview
    ? olehCalculation.annualCreditPoints ?? 0
    : 0;
  if (olehCalculation?.requiresReview) warnings.push("La période d’éligibilité aux points olé comprend des mois exclus ou nécessite une vérification; aucun montant de points olé n’est appliqué.");

  const nationalInsuranceDeduction = applicable && input.businessRegime === "classic" && nationalInsurance?.shouldCalculate
    ? nationalInsurance.deduction * 12
    : 0;
  let oleExemption = null;
  let eligibleExemption = 0;
  if (applicable && input.hasAlyah && validDate(input.aliyahDate)) {
    oleExemption = calculateOleHadashExemption({
      status: "ole",
      residencyDate: input.aliyahDate,
      fiscalYear: 2026,
      annualIncome: businessIncomeForIncomeTax + annualSalary,
      relatedIncome: input.oleRelatedIncome,
      relatedSource: input.oleRelatedSource,
      incomeKind: "personal",
      incomePeriod: "resident"
    });
    if (input.businessRegime === "classic" && oleExemption.status === "estimate") {
      eligibleExemption = oleExemption.exemptIncome ?? 0;
    } else if (input.businessRegime === "esekZair" && oleExemption.status === "estimate") {
      warnings.push("L’exonération Olé Hadash n’est pas intégrée au résultat Esek Zair : la base d’éligibilité et l’articulation avec le forfait nécessitent une vérification.");
      oleExemption = { ...oleExemption, status: "review" as const, exemptIncome: null, remainingIncome: null };
    } else {
      warnings.push("L’exonération Olé Hadash relève d’une vérification conditionnelle; elle n’est pas soustraite automatiquement de l’impôt estimé.");
    }
  }

  const incomeTaxBase = applicable
    ? Math.max(0, businessIncomeForIncomeTax + annualSalary - nationalInsuranceDeduction - eligibleExemption)
    : null;
  const grossIncomeTax = incomeTaxBase === null ? null : taxWithCredits(incomeTaxBase, 0);
  const creditPoints = standardCreditPoints + olehCreditPoints;
  const incomeTax = incomeTaxBase === null
    ? null
    : taxWithCredits(incomeTaxBase, input.specialFamilySituation ? 0 : creditPoints);
  const additionalTaxReview = incomeTaxBase !== null && incomeTaxBase > ADDITIONAL_TAX_THRESHOLD_2026;
  if (additionalTaxReview) warnings.push("Le revenu dépasse le seuil 2026 du Mass Yessef. Les impôts additionnels ne sont pas intégrés au montant affiché; une vérification est nécessaire.");
  if (input.businessRegime === "classic") {
    warnings.push("L’impôt estimé n’inclut pas d’optimisation des déductions fiscales sur les versements pension; seuls les versements déclarés sont repris dans le calcul de l’obligation pension.");
  } else {
    warnings.push("L’estimation Esek Zair n’applique pas automatiquement les crédits fiscaux particuliers sur les versements pension.");
  }

  const pension = applicable && businessIncomeForPension !== null && input.independentPensionDeposits !== null &&
    validDate(input.dateOfBirth) && validDate(input.businessCreationDate) &&
    (!input.isSalaried || input.salariedPensionDeposits !== null)
    ? calculatePensiaHova({
      fiscalYear: 2026,
      annualProfit: businessIncomeForPension,
      firstRegistrationDate: input.businessCreationDate,
      dateOfBirth: input.dateOfBirth,
      isSalaried: input.isSalaried,
      independentDeposits: input.independentPensionDeposits,
      salariedPensionDeposits: input.isSalaried ? input.salariedPensionDeposits ?? 0 : 0
    })
    : null;
  if (pension && !pension.valid) warnings.push(...pension.reasons);
  if (pension?.requiresReview) warnings.push(...pension.reasons);

  const oleExemptionNeedsReview = oleExemption?.status === "review" || oleExemption?.status === "invalid";
  const review = invalid.length > 0 || additionalTaxReview || input.businessRegime === "esekZair" ||
    (input.isSalaried && (input.salariedMonths < 12 || input.salaryPatternRequiresReview)) || Boolean(nationalInsurance && !nationalInsurance.shouldCalculate) ||
    classicPensionAdjustmentNeedsReview || Boolean(pension?.requiresReview) || (input.businessRegime === "classic" && !pension?.valid) || oleExemptionNeedsReview;
  let salaryOnlyExemption = 0;
  if (applicable && input.isSalaried && input.hasAlyah && validDate(input.aliyahDate) && input.businessRegime === "classic") {
    const salaryExemption = calculateOleHadashExemption({
      status: "ole", residencyDate: input.aliyahDate, fiscalYear: 2026, annualIncome: annualSalary,
      relatedIncome: 0, relatedSource: "none", incomeKind: "personal", incomePeriod: "resident"
    });
    if (salaryExemption.status === "estimate") salaryOnlyExemption = salaryExemption.exemptIncome ?? 0;
  }
  const salaryOnlyTax = input.isSalaried
    ? taxWithCredits(Math.max(0, annualSalary - salaryOnlyExemption), input.specialFamilySituation ? 0 : creditPoints).annualTaxAfterCredits
    : 0;
  const businessOnlyTax = applicable && incomeTax && !(input.isSalaried && input.oleRelatedIncome > 0)
    ? Math.max(0, incomeTax.annualTaxAfterCredits - salaryOnlyTax)
    : null;
  const businessCashRemainder = input.businessRegime === "classic" && applicable &&
    incomeTax && !additionalTaxReview && businessOnlyTax !== null && nationalInsurance?.shouldCalculate && pension?.remaining !== null && pension?.remaining !== undefined
    ? Math.max(0, businessIncomeForIncomeTax - businessOnlyTax! - nationalInsurance.annual - pension.remaining)
    : null;
  const esekFiscalRemainder = input.businessRegime === "esekZair" && applicable && incomeTax && !additionalTaxReview && nationalInsurance?.shouldCalculate
    ? Math.max(0, businessIncomeForIncomeTax - (input.isSalaried ? businessOnlyTax ?? 0 : incomeTax.annualTaxAfterCredits) - nationalInsurance.annual)
    : null;
  const cashBeforePensionAndOtherCosts = input.businessRegime === "esekZair" && input.actualCashExpenses !== null &&
    esekFiscalRemainder !== null && input.actualCashExpenses <= input.annualTurnover
    ? Math.max(0, input.annualTurnover - input.actualCashExpenses - (input.isSalaried ? businessOnlyTax ?? 0 : incomeTax!.annualTaxAfterCredits) - nationalInsurance!.annual)
    : null;

  return {
    status: review ? "review" as const : applicable ? "estimate" as const : "invalid" as const,
    year: 2026,
    warnings: [...invalid, ...warnings],
    businessRegime: input.businessRegime,
    turnover: input.businessRegime === "esekZair" ? validAmount(input.annualTurnover) ? input.annualTurnover : null : null,
    standardExpenseDeduction: applicable && input.businessRegime === "esekZair" ? input.annualTurnover * 0.3 : null,
    businessIncomeForIncomeTax: independentBusinessIncome,
    businessIncomeForNationalInsurance: socialIncome,
    businessIncomeForPension,
    salaryAnnual: applicable ? annualSalary : null,
    nationalInsurance: nationalInsurance?.shouldCalculate ? nationalInsurance : null,
    nationalInsuranceMonthly: nationalInsurance?.shouldCalculate ? nationalInsurance.monthly : null,
    nationalInsuranceAnnual: nationalInsurance?.shouldCalculate ? nationalInsurance.annual : null,
    nationalInsuranceBreakdown: nationalInsurance?.shouldCalculate ? {
      national: nationalInsurance.nationalInsurance * 12,
      health: nationalInsurance.healthInsurance * 12,
      status: nationalInsurance.status
    } : null,
    nationalInsuranceDeduction,
    standardCreditPoints,
    olehCreditPoints,
    creditValue: creditPoints * TAX_CONSTANTS_2026.creditPoint.annualValue,
    eligibleExemption,
    oleExemption,
    taxableIncome: incomeTaxBase,
    grossIncomeTax: grossIncomeTax?.annualTaxBeforeCredits ?? null,
    annualIncomeTax: additionalTaxReview ? null : incomeTax?.annualTaxAfterCredits ?? null,
    incomeTaxBeforeCredits: incomeTax?.annualTaxBeforeCredits ?? null,
    appliedCreditValue: incomeTax ? incomeTax.usableCreditValue : null,
    businessOnlyTax,
    pension,
    pensionStatus: input.businessRegime === "esekZair" ? "review" as const : pension ? pension.requiresReview ? "review" as const : pension.valid ? "estimate" as const : "missing" as const : "missing" as const,
    businessCashRemainder,
    esekFiscalRemainder,
    cashBeforePensionAndOtherCosts,
    actualCashExpenses: input.actualCashExpenses,
    additionalTaxReview,
    inputValid: valid,
    isApplicable: applicable,
    _baseRulesVerified: Object.freeze({
      esekZairTurnoverCap: ESEK_ZAIR_2026_TURNOVER_CAP,
      esekZairTaxIncomeFactor: 0.7,
      standardNonWorkNationalInsuranceDeduction: TAX_CONSTANTS_2026.bituahLeumi.nationalInsuranceDeduction,
      esekZairNationalInsuranceDeduction: 0
    })
  };
}
