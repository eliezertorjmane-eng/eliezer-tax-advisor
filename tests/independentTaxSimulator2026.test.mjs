import test from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { readFileSync } from "node:fs";
import path from "node:path";

const require = createRequire(import.meta.url);
const tax = require(path.join(process.env.TAX_TEST_BUILD_DIR, "independentTaxSimulator2026.js"));
const ni = require(path.join(process.env.TAX_TEST_BUILD_DIR, "bituahLeumi.js"));
const { TAX_CONSTANTS_2026 } = require(path.join(process.env.TAX_TEST_BUILD_DIR, "constants2026.js"));
const simulate = (overrides = {}) => tax.calculateIndependentTaxSimulator2026({
  businessRegime: "classic", annualTurnover: 0, annualProfit: 100000,
  confirmedEsekZairRestriction: false, weeklyHours: 20,
  isSalaried: false, monthlySalary: 0, salariedMonths: 0, salaryPatternRequiresReview: false,
  parentProfile: "father", childrenBirthYears: [], specialFamilySituation: false,
  fullYearIsraeliResident: true, hasAlyah: false, aliyahDate: "",
  dateOfBirth: "1990-01-01", businessCreationDate: "2020-01-01",
  independentPensionDeposits: 0, salariedPensionDeposits: 0, oleRelatedIncome: 0, oleRelatedSource: "none",
  actualCashExpenses: null, ...overrides
});
const near = (actual, expected, tolerance = 1e-6) => assert.ok(Math.abs(actual - expected) <= tolerance, `${actual} != ${expected}`);

for (const activityMonths of [1, 3, 6, 12]) test(`Activity period ${activityMonths}: shared monthly base, salary, classification and Esek Zair`, () => {
  for (const businessRegime of ["classic", "esekZair"]) for (const monthlySalary of [0, 9000]) {
    const base = { annualBusinessProfit: 120000, weeklyHours: 20, isSalaried: monthlySalary > 0, monthlySalary, businessRegime };
    const result = ni.calculateBituahLeumiSimulation({ ...base, activityMonths });
    near(result.monthlyProfit, 120000 / activityMonths);
    assert.equal(result.status, "atzmai");
    near(result.annual, result.monthly * activityMonths, 0.011);
    assert.ok(result.contributionBase <= result.remainingCap);
    if (activityMonths === 12) assert.deepEqual(result, ni.calculateBituahLeumiSimulation(base));
    const annualTurnover = 100000;
    const integrated = simulate({ annualProfit: 120000, annualTurnover, businessRegime, activityMonths, isSalaried: monthlySalary > 0, monthlySalary, salariedMonths: 12 });
    const shared = ni.calculateBituahLeumiSimulation({ ...base, annualBusinessProfit: businessRegime === "esekZair" ? annualTurnover * 0.7 : 120000, activityMonths });
    near(integrated.nationalInsuranceAnnual, shared.annual);
  }
  const classified = ni.calculateBituahLeumiSimulation({ annualBusinessProfit: 24000, weeklyHours: 0, monthlySalary: 0, isSalaried: false, activityMonths });
  assert.equal(classified.status, 24000 / activityMonths >= 6884.5 ? "atzmai" : "notDefinition");
  if (classified.status === "notDefinition" && activityMonths < 12) assert.equal(classified.shouldCalculate, false);
});

test("Pension 2026 reference remains unchanged; 2027 is explicitly provisional", () => {
  const pension = require(path.join(process.env.TAX_TEST_BUILD_DIR, "pensiaHova.js"));
  assert.equal(pension.getPensiaHovaYear(2026).year, 2026);
  assert.equal(pension.getPensiaHovaReferenceYear(2026), 2026);
  assert.equal(pension.getPensiaHovaYear(2027).year, 2027);
  assert.equal(pension.getPensiaHovaReferenceYear(2027), 2026);
  for (const fiscalYear of [2028, 2030]) {
    assert.equal(pension.getPensiaHovaYear(fiscalYear), undefined);
    assert.equal(pension.calculatePensiaHova({ fiscalYear, annualProfit: 120000, dateOfBirth: "1990-01-01", firstRegistrationDate: "2020-01-01", isSalaried: false, independentDeposits: 0, salariedPensionDeposits: 0 }).annualObligation, null);
  }
});

test("2027 standard pension estimate uses 2026 reference rates and thresholds", () => {
  const pension = require(path.join(process.env.TAX_TEST_BUILD_DIR, "pensiaHova.js"));
  const input = { annualProfit: 120000, dateOfBirth: "1990-01-01", firstRegistrationDate: "2020-01-01", isSalaried: false, independentDeposits: 0, salariedPensionDeposits: 0 };
  const result2026 = pension.calculatePensiaHova({ ...input, fiscalYear: 2026 });
  const result2027 = pension.calculatePensiaHova({ ...input, fiscalYear: 2027 });
  assert.equal(result2026.annualObligation, 8368.266);
  assert.equal(result2026.provisional, false);
  assert.equal(result2027.annualObligation, result2026.annualObligation);
  assert.equal(result2027.remaining, result2026.remaining);
  assert.equal(result2027.provisional, true);
  assert.ok(result2027.warnings.includes("Estimation provisoire 2027 calculée avec les taux et plafonds de référence 2026, en attendant leur actualisation."));
  assert.ok(result2027.warnings.some((warning) => warning.includes("règles d’éligibilité propres à 2027 n’ont pas été vérifiées séparément")));
  const component = readFileSync(path.join(process.cwd(), "components/calculators/PensiaHovaCalculator.tsx"), "utf8");
  assert.ok(component.includes("Estimation provisoire 2027 calculée avec les taux et plafonds de référence 2026, en attendant leur actualisation."));
  assert.ok(component.includes("règles d’éligibilité propres à 2027 n’ont pas été vérifiées séparément"));
  assert.ok(component.includes("Estimation indicative Pensia Hova ${year}"));
});

test("2027 pension eligibility dates use 2027 while financial thresholds use 2026 references", () => {
  const pension = require(path.join(process.env.TAX_TEST_BUILD_DIR, "pensiaHova.js"));
  const base = { fiscalYear: 2027, annualProfit: 120000, firstRegistrationDate: "2020-01-01", isSalaried: false, independentDeposits: 0, salariedPensionDeposits: 0 };
  const turns21In2027 = pension.calculatePensiaHova({ ...base, dateOfBirth: "2006-12-31" });
  assert.equal(turns21In2027.ageAtYearEnd, 21);
  assert.equal(turns21In2027.ageExemption, false);
  assert.ok(turns21In2027.annualObligation > 0);
  const turns60In2027 = pension.calculatePensiaHova({ ...base, dateOfBirth: "1967-01-01" });
  assert.equal(turns60In2027.ageAtYearEnd, 60);
  assert.equal(turns60In2027.ageExemption, true);
  assert.equal(turns60In2027.annualObligation, 0);
  const newRegistration = pension.calculatePensiaHova({ ...base, firstRegistrationDate: "2027-07-01", dateOfBirth: "1990-01-01" });
  assert.equal(newRegistration.recentRegistration, true);
  assert.equal(newRegistration.annualObligation, 0);
  assert.ok(newRegistration.reasons.some((reason) => reason.includes("1er juillet 2027")));
});

test("2027 keeps salary coordination and deposits behavior with provisional parameters", () => {
  const pension = require(path.join(process.env.TAX_TEST_BUILD_DIR, "pensiaHova.js"));
  const result = pension.calculatePensiaHova({ fiscalYear: 2027, annualProfit: 120000, firstRegistrationDate: "2020-01-01", dateOfBirth: "1990-01-01", isSalaried: true, independentDeposits: 1000, salariedPensionDeposits: 3000 });
  assert.equal(result.provisional, true);
  assert.equal(result.salaryOffset, 3000);
  assert.equal(result.independentCovered, 1000);
  assert.equal(result.remaining, result.annualObligation - 4000);
});

test("Activity months change BL and only its admissible national-insurance income-tax deduction", () => {
  const twelveMonths = simulate({ annualProfit: 100000, activityMonths: 12 });
  const sixMonths = simulate({ annualProfit: 100000, activityMonths: 6 });
  assert.equal(twelveMonths.businessIncomeForIncomeTax, 100000);
  assert.equal(sixMonths.businessIncomeForIncomeTax, 100000);
  assert.notEqual(twelveMonths.nationalInsuranceAnnual, sixMonths.nationalInsuranceAnnual);
  for (const result of [twelveMonths, sixMonths]) {
    near(result.nationalInsuranceDeduction, result.nationalInsurance.deduction * result.nationalInsurance.activityMonths);
    near(result.nationalInsuranceDeduction, 0.52 * result.nationalInsurance.nationalInsurance * result.nationalInsurance.activityMonths, 0.02);
    assert.ok(result.nationalInsuranceDeduction < 0.52 * (result.nationalInsurance.nationalInsurance + result.nationalInsurance.healthInsurance) * result.nationalInsurance.activityMonths);
    assert.equal(result.taxableIncome, 100000 - result.nationalInsuranceDeduction);
    const incomeTax = require(path.join(process.env.TAX_TEST_BUILD_DIR, "incomeTax.js"));
    const expectedTax = incomeTax.calculateIncomeTax({ monthlyTaxableIncome: result.taxableIncome / 12, creditPoints: 2.25, incomeType: "work", age60OrOlder: false });
    near(result.annualIncomeTax, expectedTax.annualTaxAfterCredits);
  }
  assert.notEqual(twelveMonths.annualIncomeTax, sixMonths.annualIncomeTax);
  assert.deepEqual(twelveMonths.pension, sixMonths.pension);
});

test("Activity months do not add an unapproved BL deduction for Esek Zair", () => {
  const twelveMonths = simulate({ businessRegime: "esekZair", annualTurnover: 100000, activityMonths: 12 });
  const sixMonths = simulate({ businessRegime: "esekZair", annualTurnover: 100000, activityMonths: 6 });
  assert.equal(twelveMonths.businessIncomeForIncomeTax, 70000);
  assert.equal(sixMonths.businessIncomeForIncomeTax, 70000);
  assert.notEqual(twelveMonths.nationalInsuranceAnnual, sixMonths.nationalInsuranceAnnual);
  assert.equal(twelveMonths.nationalInsuranceDeduction, 0);
  assert.equal(sixMonths.nationalInsuranceDeduction, 0);
  assert.equal(twelveMonths.taxableIncome, 70000);
  assert.equal(sixMonths.taxableIncome, 70000);
  assert.equal(twelveMonths.annualIncomeTax, sixMonths.annualIncomeTax);
  assert.equal(twelveMonths.pension, null);
  assert.equal(sixMonths.pension, null);
});

test("Classic independent, 100000 ILS: three bases are distinct outputs and all principal results compute", () => {
  const r = simulate();
  assert.equal(r.status, "estimate");
  assert.equal(r.businessIncomeForIncomeTax, 100000);
  assert.equal(r.businessIncomeForNationalInsurance, 100000);
  assert.equal(r.businessIncomeForPension, 100000);
  assert.ok(r.annualIncomeTax > 0);
  assert.ok(r.nationalInsuranceAnnual > 0);
  assert.ok(r.pension.annualObligation > 0);
});

test("V9.5 exact 2026 standard scenario exposes unrounded component values for reconciliation", () => {
  const r = simulate({ dateOfBirth: "1993-01-01", businessCreationDate: "2025-01-01", independentPensionDeposits: 0 });
  const raw = [r.annualIncomeTax, r.nationalInsuranceAnnual, r.pension.remaining, r.businessCashRemainder];
  assert.deepEqual(raw, [3752.9806903430726, 8031.36, 5858.266, 82357.39330965692]);
  near(raw.reduce((total, value) => total + value, 0), 100000, 1e-8);
  assert.deepEqual(raw.map(Math.round), [3753, 8031, 5858, 82357]);
  assert.equal(100000 - 3753 - 8031 - 5858, 82358);
});

test("Classic independent, 200000 ILS: progressive tax rises", () => {
  const low = simulate({ annualProfit: 100000 });
  const high = simulate({ annualProfit: 200000 });
  assert.ok(high.incomeTaxBeforeCredits > low.incomeTaxBeforeCredits);
  assert.ok(high.nationalInsuranceAnnual > low.nationalInsuranceAnnual);
});

test("Esek Zair 100000 turnover: one 30% deduction gives 70000 ILS reference income", () => {
  const r = simulate({ businessRegime: "esekZair", annualTurnover: 100000 });
  assert.equal(r.status, "review");
  assert.equal(r.standardExpenseDeduction, 30000);
  assert.equal(r.businessIncomeForIncomeTax, 70000);
  assert.equal(r.businessIncomeForNationalInsurance, 70000);
  assert.equal(r.businessIncomeForPension, null);
});

test("Esek Zair exact 2026 turnover ceiling is accepted", () => {
  const r = simulate({ businessRegime: "esekZair", annualTurnover: 122833 });
  assert.equal(r.isApplicable, true);
  assert.equal(r.businessIncomeForIncomeTax, 122833 * 0.7);
  assert.equal(r.standardExpenseDeduction, 122833 * 0.3);
});

test("Esek Zair above 122833 is rejected without silently switching to classic profit", () => {
  const r = simulate({ businessRegime: "esekZair", annualTurnover: 122834, annualProfit: 90000 });
  assert.equal(r.isApplicable, false);
  assert.equal(r.businessIncomeForIncomeTax, null);
  assert.equal(r.standardExpenseDeduction, null);
  assert.match(r.warnings.join(" "), /calculateur classique/);
});

test("Esek Zair: section 345 ordinary 52% deduction is not applied", () => {
  const r = simulate({ businessRegime: "esekZair", annualTurnover: 100000 });
  assert.equal(r.nationalInsuranceDeduction, 0);
  assert.equal(r.nationalInsurance?.deduction, 0);
  assert.equal(r.taxableIncome, 70000);
});

test("Esek Zair: NI and income-tax bases retain the same single 70% starting reference", () => {
  const r = simulate({ businessRegime: "esekZair", annualTurnover: 100000 });
  assert.equal(r.businessIncomeForIncomeTax, r.businessIncomeForNationalInsurance);
  assert.equal(r.businessIncomeForNationalInsurance, 100000 * 0.7);
  assert.equal(r._baseRulesVerified.esekZairNationalInsuranceDeduction, 0);
});

test("Known Esek Zair restriction suspends calculation", () => {
  const r = simulate({ businessRegime: "esekZair", annualTurnover: 100000, confirmedEsekZairRestriction: true });
  assert.equal(r.isApplicable, false);
  assert.equal(r.annualIncomeTax, null);
  assert.match(r.warnings.join(" "), /restriction d’éligibilité/);
});

test("Resident standard credit profile uses 2.25 male points", () => {
  assert.equal(simulate({ parentProfile: "father" }).standardCreditPoints, 2.25);
});

test("Resident standard credit profile uses 2.75 female points", () => {
  assert.equal(simulate({ parentProfile: "mother" }).standardCreditPoints, 2.75);
});

test("Child schedule includes ages 0, 3, 6, 17 and 18 without replacing basic points", () => {
  const r = simulate({ parentProfile: "mother", childrenBirthYears: [2026, 2023, 2020, 2009, 2008] });
  assert.equal(r.standardCreditPoints, 13.25);
});

test("Special family situation does not guess child-credit allocation", () => {
  const r = simulate({ childrenBirthYears: [2020], specialFamilySituation: true });
  assert.equal(r.standardCreditPoints, 0);
  assert.match(r.warnings.join(" "), /points enfants ne sont pas appliqués/);
});

test("Part-year residence omits unsupported full-year resident and child points", () => {
  const r = simulate({ fullYearIsraeliResident: false, childrenBirthYears: [2020] });
  assert.equal(r.standardCreditPoints, 0);
  assert.match(r.warnings.join(" "), /partie de l’année/);
});

test("Oleh Hadash credit schedule is reused for 2026", () => {
  const r = simulate({ hasAlyah: true, aliyahDate: "2026-01-01" });
  assert.equal(r.olehCreditPoints, 1);
  assert.equal(r.eligibleExemption, 100000);
});

test("2026 exemption and Oleh credit points coexist without being added as cash savings", () => {
  const r = simulate({ hasAlyah: true, aliyahDate: "2026-01-01", annualProfit: 100000 });
  assert.ok(r.eligibleExemption > 0);
  assert.ok(r.olehCreditPoints > 0);
  assert.equal(r.taxableIncome, 0);
  assert.equal(r.annualIncomeTax, 0);
  assert.equal(r.creditValue, (2.25 + 1) * 2904);
});

test("Alyah date alone does not assert or apply unsupported exemption dates", () => {
  const r = simulate({ hasAlyah: true, aliyahDate: "2027-01-01" });
  assert.equal(r.eligibleExemption, 0);
  assert.match(r.warnings.join(" "), /exonération Olé Hadash relève d’une vérification/);
});

test("Related family income reuses the existing limitation and company income remains review-only", () => {
  const family = simulate({ hasAlyah: true, aliyahDate: "2026-01-01", oleRelatedIncome: 20000, oleRelatedSource: "family" });
  const company = simulate({ hasAlyah: true, aliyahDate: "2026-01-01", oleRelatedIncome: 20000, oleRelatedSource: "company" });
  assert.equal(family.oleExemption.status, "estimate");
  assert.equal(company.oleExemption.status, "review");
  assert.equal(company.eligibleExemption, 0);
});

test("Employee and independent income are combined for progressive income tax", () => {
  const r = simulate({ isSalaried: true, monthlySalary: 10000, salariedMonths: 12 });
  assert.equal(r.salaryAnnual, 120000);
  assert.equal(r.taxableIncome, 100000 + 120000 - r.nationalInsuranceDeduction);
  assert.ok(r.businessOnlyTax > 0);
});

test("Non-definition independent activity with salary reuses the 25% non-work exemption", () => {
  const r = simulate({ annualProfit: 20000, weeklyHours: 2, isSalaried: true, monthlySalary: 6000, salariedMonths: 12 });
  assert.equal(r.nationalInsurance.status, "notDefinition");
  assert.equal(r.nationalInsurance.exemption, 20000 / 12);
  assert.equal(r.nationalInsuranceAnnual, 0);
  assert.equal(r.nationalInsurance.nonWorkingMinimumApplied, false);
});

test("Salary above reduced-rate threshold allocates only the regular bracket", () => {
  const r = simulate({ annualProfit: 100000, isSalaried: true, monthlySalary: 9000, salariedMonths: 12 });
  assert.equal(r.nationalInsurance.rows[0].base, 0);
  assert.ok(r.nationalInsurance.rows[1].base > 0);
});

test("Salary at the insured-income maximum leaves no additional insured base", () => {
  const r = simulate({ annualProfit: 100000, isSalaried: true, monthlySalary: 51910, salariedMonths: 12 });
  assert.equal(r.nationalInsurance.contributionBase, 0);
  assert.equal(r.nationalInsuranceAnnual, 0);
});

test("Qualifying independent activity continues to use the regular self-employed classification", () => {
  const r = simulate({ weeklyHours: 20 });
  assert.equal(r.nationalInsurance.status, "atzmai");
  assert.equal(r.nationalInsurance.exemption, 0);
});

test("Recent business creation exemption uses the existing pension engine", () => {
  const r = simulate({ businessCreationDate: "2026-07-01" });
  assert.equal(r.pension.recentRegistration, true);
  assert.equal(r.pension.annualObligation, 0);
});

test("Age-based pension exemption uses the existing engine", () => {
  const r = simulate({ dateOfBirth: "2006-06-01" });
  assert.equal(r.pension.ageExemption, true);
  assert.equal(r.pension.annualObligation, 0);
});

test("Salary pension deposits coordinate with self-employed pension obligation", () => {
  const r = simulate({ isSalaried: true, monthlySalary: 6000, salariedMonths: 12, salariedPensionDeposits: 3000 });
  assert.equal(r.pension.salaryOffset, 3000);
  assert.equal(r.pension.remaining, Math.max(0, r.pension.annualObligation - 3000));
});

test("Missing pension dates do not produce a definitive pension obligation", () => {
  const r = simulate({ dateOfBirth: "", businessCreationDate: "" });
  assert.equal(r.pension, null);
  assert.equal(r.pensionStatus, "missing");
});

test("Deposits beyond mandatory pension obligation remain savings, not extra tax", () => {
  const r = simulate({ independentPensionDeposits: 20000 });
  assert.equal(r.pension.remaining, 0);
  assert.ok(r.pension.excessDeposits > 0);
  assert.equal(r.nationalInsuranceAnnual, null);
  assert.match(r.warnings.join(" "), /part déductible au titre de la section 345/);
});

test("No income tax remains after zero base and credits; zero floor is respected", () => {
  const r = simulate({ annualProfit: 0 });
  assert.equal(r.annualIncomeTax, 0);
  assert.equal(r.incomeTaxBeforeCredits, 0);
});

test("Annual income-tax calculation crosses the enacted 2026 progressive brackets", () => {
  const r = simulate({ annualProfit: 900000, fullYearIsraeliResident: false });
  assert.ok(r.taxableIncome > 721560);
  assert.ok(r.incomeTaxBeforeCredits > 0);
  assert.equal(r.annualIncomeTax, null);
  assert.equal(r.additionalTaxReview, true);
});

test("Esek Zair actual expenses never replace the 30% fiscal deduction", () => {
  const noExpenses = simulate({ businessRegime: "esekZair", annualTurnover: 100000 });
  const actual = simulate({ businessRegime: "esekZair", annualTurnover: 100000, actualCashExpenses: 50000 });
  assert.equal(actual.businessIncomeForIncomeTax, noExpenses.businessIncomeForIncomeTax);
  assert.equal(actual.standardExpenseDeduction, 30000);
  assert.notEqual(actual.cashBeforePensionAndOtherCosts, null);
});

test("Esek Zair cash remainder is explicitly before unverified pension and other costs", () => {
  const r = simulate({ businessRegime: "esekZair", annualTurnover: 100000, actualCashExpenses: 50000 });
  const expected = Math.max(0, 100000 - 50000 - r.businessOnlyTax - r.nationalInsuranceAnnual);
  near(r.cashBeforePensionAndOtherCosts, expected);
});

test("Combined salary cash remainder uses the incremental business tax, not total salary tax", () => {
  const r = simulate({ isSalaried: true, monthlySalary: 8000, salariedMonths: 12 });
  assert.ok(r.businessOnlyTax !== null);
  assert.equal(r.businessCashRemainder, Math.max(0, 100000 - r.businessOnlyTax - r.nationalInsuranceAnnual - r.pension.remaining));
});

test("A classic independent cash remainder is only shown when pension eligibility is known", () => {
  const r = simulate();
  assert.notEqual(r.businessCashRemainder, null);
  assert.equal(r.businessCashRemainder, Math.max(0, 100000 - r.businessOnlyTax - r.nationalInsuranceAnnual - r.pension.remaining));
});

test("Negative, blank-equivalent, malformed and extreme amounts fail closed", () => {
  for (const annualProfit of [-1, NaN, Infinity, Number.MAX_SAFE_INTEGER]) {
    const r = simulate({ annualProfit });
    assert.equal(r.isApplicable, false);
    assert.equal(r.annualIncomeTax, null);
  }
});

test("No salaried-month income is counted when salary mode is off", () => {
  const r = simulate({ monthlySalary: 12000, salariedMonths: 12, isSalaried: false });
  assert.equal(r.salaryAnnual, 0);
});

test("No employee-side salary contributions are mislabeled as independent contributions", () => {
  const ui = readFileSync(path.join(process.cwd(), "components/calculators/IndependentTaxSimulatorCalculator.tsx"), "utf8");
  assert.match(ui, /Les cotisations salariales déjà prélevées ne sont pas incluses/);
});

test("Variable salary or multiple employers suspend social coordination", () => {
  const r = simulate({ isSalaried: true, monthlySalary: 6000, salariedMonths: 12, salaryPatternRequiresReview: true });
  assert.equal(r.nationalInsuranceAnnual, null);
  assert.match(r.warnings.join(" "), /ventilation par mois et par employeur/);
});

test("An unknown classic pension deposit is not silently treated as zero for section 345", () => {
  const r = simulate({ independentPensionDeposits: null });
  assert.equal(r.nationalInsuranceAnnual, null);
  assert.equal(r.pension, null);
  assert.match(r.warnings.join(" "), /versements pension indépendants ne sont pas renseignés/);
});

test("Existing standalone Bitouah Leumi default behavior equals explicit classic behavior", () => {
  const input = { annualBusinessProfit: 100000, weeklyHours: 20, isSalaried: true, monthlySalary: 9000 };
  assert.deepEqual(ni.calculateBituahLeumiSimulation(input), ni.calculateBituahLeumiSimulation({ ...input, businessRegime: "classic" }));
});

test("2026 rate constants match the verified annual progressive bracket endpoints", () => {
  const brackets = TAX_CONSTANTS_2026.incomeTax.workMonthlyBrackets;
  assert.deepEqual(brackets.slice(0, 6).map((item) => item.upTo * 12), [84120, 120720, 228000, 301200, 560280, 721560]);
  assert.deepEqual(brackets.map((item) => item.rate), [0.1, 0.14, 0.2, 0.31, 0.35, 0.47, 0.5]);
});

test("Integrated route metadata, catalog, print action and original calculator routes coexist", () => {
  const root = process.cwd();
  const registry = readFileSync(path.join(root, "lib/calculators.ts"), "utf8");
  const page = readFileSync(path.join(root, "app/[locale]/calculateurs/[calculatorSlug]/page.tsx"), "utf8");
  const ui = readFileSync(path.join(root, "components/calculators/IndependentTaxSimulatorCalculator.tsx"), "utf8");
  assert.equal((registry.match(/simulateur-fiscal-independant-israel/g) ?? []).length, 2);
  assert.match(page, /"simulateur-fiscal-independant-israel":/);
  assert.match(registry, /"bituah-leumi-independant"/);
  assert.match(registry, /"pensia-hova-independant"/);
  assert.match(ui, /window\.print\(\)/);
  assert.match(ui, /\/fr\/calculateurs\/nekoudot-zikouy-enfants/);
  assert.match(ui, /\/fr\/calculateurs\/ole-hadash-nekoudot-zikouy/);
});
