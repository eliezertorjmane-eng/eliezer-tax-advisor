import test from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";
import path from "node:path";

const require = createRequire(import.meta.url);
const { calculateChildCreditPoints: child } = require(path.join(process.env.TAX_TEST_BUILD_DIR, "childCreditPoints.js"));
const { calculateBituahLeumiSimulation: calc, classifyBituahActivity, parseBituahAmount, calculateEmployeeBituahLeumi, calculateBituahLeumiIndependent } = require(path.join(process.env.TAX_TEST_BUILD_DIR, "bituahLeumi.js"));
const births = [2009, 2011, 2013, 2015, 2019, 2023, 2026];
const simulate = (profit, hours = 15, salary = 0, extra = {}) => calc({ annualBusinessProfit: profit * 12, weeklyHours: hours, isSalaried: salary > 0, monthlySalary: salary, ...extra });
const near = (actual, expected, tolerance = 0.000001) => assert.ok(Math.abs(actual - expected) <= tolerance, `${actual} != ${expected}`);

for (const [parentProfile, childPoints, base, total, monthly, annual] of [
  ["father", 11, 2.25, 13.25, 3206.5, 38478],
  ["mother", 16, 2.75, 18.75, 4537.5, 54450]
]) {
  test(`2026 seven children: ${parentProfile}`, () => {
    const r = child({ taxYear: 2026, parentProfile, childrenBirthYears: births });
    assert.equal(r.childRelatedPoints, childPoints);
    assert.equal(r.totalPoints, childPoints); // Legacy field stays child-only.
    assert.equal(r.basicResidentPoints, base);
    assert.equal(r.totalStandardPoints, total);
    assert.equal(r.monthlyMaxValue, monthly);
    assert.equal(r.annualMaxValue, annual);
    assert.equal(r.details.reduce((sum, item) => sum + item.points, 0), childPoints);
  });
}
for (const year of [2024, 2025, 2026]) {
  for (const [profile, base] of [["father", 2.25], ["mother", 2.75]]) {
    test(`${year} ${profile}: zero children and no double counting`, () => {
      const r = child({ taxYear: year, parentProfile: profile, childrenBirthYears: [] });
      assert.equal(r.totalStandardPoints, base);
      assert.equal(r.childRelatedPoints, 0);
      assert.equal(r.monthlyMaxValue, base * 242);
      assert.equal(r.annualMaxValue, base * 2904);
    });
    test(`${year} ${profile}: all fiscal age bands`, () => {
      const ages = [0, 1, 2, 3, 4, 5, 6, 17, 18, 19];
      const expected = profile === "father" ? [2.5, 4.5, 4.5, 3.5, 2.5, 2.5, 1, 1, 0, 0] : [2.5, 4.5, 4.5, 3.5, 2.5, 2.5, 2, 2, 0.5, 0];
      const r = child({ taxYear: year, parentProfile: profile, childrenBirthYears: ages.map((age) => year - age) });
      assert.deepEqual(r.details.map((d) => d.points), expected);
      assert.deepEqual(r.details.map((d) => d.fiscalAge), ages);
      assert.equal(r.totalStandardPoints, base + expected.reduce((a, b) => a + b, 0));
      assert.equal(r.annualMaxValue, r.monthlyMaxValue * 12);
    });
  }
  test(`${year}: special family profile suspends standard total`, () => {
    const r = child({ taxYear: year, parentProfile: "special", childrenBirthYears: births });
    assert.equal(r.shouldCalculate, false);
    assert.equal(r.totalStandardPoints, 0);
    assert.equal(r.basicResidentPoints, 0);
    assert.equal(r.monthlyMaxValue, 0);
  });
}
test("Fiscal age follows the selected year", () => {
  assert.equal(child({ taxYear: 2024, parentProfile: "mother", childrenBirthYears: [2023] }).details[0].points, 4.5);
  assert.equal(child({ taxYear: 2026, parentProfile: "mother", childrenBirthYears: [2023] }).details[0].points, 3.5);
});

for (const [income, hours, status] of [
  [0, 20, "atzmai"], [6885, 0, "atzmai"], [2065.35, 12, "atzmai"],
  [2065.35, 11.99, "notDefinition"], [2065.34, 12, "notDefinition"], [2065.36, 12, "atzmai"],
  [6884.49, 0, "notDefinition"], [6884.51, 0, "atzmai"], [6884.5, 0, "atzmai"],
  [2065, 12, "notDefinition"]
]) test(`Official classification boundary ${income} / ${hours}`, () => assert.equal(classifyBituahActivity(income, hours).status, status));

test("Claude sample 190000/year: official two-bracket Section 345 equation", () => {
  const r = calc({ annualBusinessProfit: 190000, weeklyHours: 15, isSalaried: false, monthlySalary: 0 });
  // Official monthly equivalent of the published quarterly equation, independently of the solver.
  const expectedBase = (190000 / 12 + 7703 * 0.52 * (0.1283 - 0.0447)) / (1 + 0.52 * 0.1283);
  near(r.contributionBase, expectedBase);
  near(r.deduction, 0.52 * (7703 * 0.0447 + (expectedBase - 7703) * 0.1283));
  assert.equal(r.status, "atzmai");
  assert.equal(r.shouldCalculate, true);
  // 344.32 + 956.35 national, 248.81 + 385.37 health = 1934.85 at displayed cents.
  assert.equal(r.monthly, 1934.85);
  assert.equal(r.annual, 23218.2);
  assert.equal(r.quarterly, 5804.55);
});
test("Official 12000/month self-employed example: published quarterly result within official whole-shekel rounding", () => {
  const r = simulate(12000);
  near(r.quarterly, 3864, 1);
  near(r.contributionBase + r.deduction, 12000);
});
test("Reduced-only self-employed deduction excludes health insurance", () => {
  const r = simulate(5000, 20);
  near(r.contributionBase, 5000 / (1 + 0.52 * 0.0447));
  near(r.deduction, r.contributionBase * 0.0447 * 0.52);
  near(r.rows[0].health, r.contributionBase * 0.0323, 0.005);
});
test("20 hours, low profit: independent minimum and NI/health split", () => {
  const r = simulate(100, 20);
  assert.equal(r.contributionBase, 3442.25);
  assert.equal(r.minimumApplied, true);
  assert.equal(r.nationalInsurance, 153.87);
  assert.equal(r.healthInsurance, 111.18);
  assert.equal(r.monthly, 265.05);
});
test("Salary consumes reduced bracket: only independent contribution displayed", () => {
  const r = simulate(10000, 20, 9000);
  assert.equal(r.rows[0].base, 0);
  near(r.contributionBase, 10000 / (1 + 0.52 * 0.1283));
  assert.equal(r.minimumApplied, false);
  assert.equal(r.shouldCalculate, true);
});
test("Official simulator: salary 3000 + independent profit 2000 uses remaining reduced bracket", () => {
  const r = simulate(2000, 20, 3000);
  assert.equal(r.reducedRoom, 4703);
  assert.equal(r.remainingCap, 48910);
  assert.equal(r.shouldCalculate, true);
  // Official simulator truncates the adjusted base to whole ILS here (1954); our equation retains decimals.
  near(r.nationalInsurance, 87.34, 0.05);
  near(r.healthInsurance, 63.11, 0.05);
  assert.equal(r.monthly, 150.5);
  near(r.adjustedMonthlyBase, 2000 / (1 + 0.52 * 0.0447));
});
test("Official simulator: salary 1000 + independent profit 100 uses combined minimum", () => {
  const r = simulate(100, 20, 1000);
  assert.equal(r.contributionBase, 2442.25);
  assert.equal(r.nationalInsurance, 109.17);
  assert.equal(r.healthInsurance, 78.88);
  assert.equal(r.monthly, 188.05);
});
test("Missing salaried salary is not silently treated as no employment", () => {
  assert.equal(simulate(10000, 20, 0, { isSalaried: true }).shouldCalculate, false);
});
for (const salary of [51910, 60000]) test(`Salary ${salary} consumes all insured cap`, () => {
  const r = simulate(10000, 20, salary);
  assert.equal(r.remainingCap, 0);
  assert.equal(r.contributionBase, 0);
  assert.equal(r.monthly, 0);
  assert.equal(r.deduction, 0);
});
test("Cap is inside the 52% equation, not applied after an uncapped deduction", () => {
  const maximumNI = 7703 * 0.0447 + (51910 - 7703) * 0.1283;
  const r = simulate(100000, 20);
  assert.equal(r.contributionBase, 51910);
  near(r.deduction, maximumNI * 0.52);
  near(r.adjustedMonthlyBase, 100000 - maximumNI * 0.52);
});
test("Mixed salary/independent cap", () => {
  const r = simulate(100000, 20, 50000);
  assert.equal(r.contributionBase, 1910);
  near(r.deduction, 1910 * 0.1283 * 0.52);
});
test("Non-working zero-income minimum is conditional on standard category", () => {
  const r = simulate(0, 0);
  assert.equal(r.monthly, 266);
  assert.equal(r.nationalInsurance, 143);
  assert.equal(r.healthInsurance, 123);
  assert.equal(r.effectiveRate, null);
  assert.equal(r.minimumTopUp, 266);
  assert.equal(simulate(0, 0, 0, { standardCategory: false }).shouldCalculate, false);
});
test("Non-work-classified income retains exemption with salary (Claude correction)", () => {
  const r = simulate(5000, 0, 9000);
  assert.equal(r.status, "notDefinition");
  assert.equal(r.exemption, 3442);
  assert.equal(r.contributionBase, 1558);
  near(r.nationalInsurance, 109.06);
  near(r.healthInsurance, 80.5486);
  near(r.monthly, 189.6086);
  assert.equal(r.nonWorkingMinimumApplied, false);
  assert.equal(r.deduction, 0);
  assert.equal(r.nonWorkAdjustmentRequiresReview, false);
  assert.equal(r.shouldCalculate, true);
});
test("Exempt non-work activity with employment: no non-employed minimum", () => assert.equal(simulate(3000, 0, 9000).monthly, 0));
test("Non-work exemption applied before remaining salary cap", () => {
  const r = simulate(6000, 0, 50000);
  assert.equal(r.shouldCalculate, true);
  assert.equal(r.contributionBase, 1910);
  near(r.nationalInsurance, 133.7);
  near(r.healthInsurance, 98.747);
  near(r.monthly, 232.447);
});
test("Non-work income without salary: statutory rates rather than self-employed 52% formula", () => {
  const r = simulate(6000, 0);
  assert.equal(r.contributionBase, 2558);
  assert.equal(r.deduction, 0);
  near(r.monthly, 309.2622);
  assert.equal(r.shouldCalculate, false); // No-salary Section 345 review remains separate from the employee FAQ.
});
test("Minimum top-up makes detail rows reconcile with displayed minimum", () => {
  const r = simulate(4500, 0);
  near(r.rows.reduce((sum, row) => sum + row.contribution, 0) + r.minimumTopUp, r.monthly);
});
for (const [raw, expected] of [["190000", 190000], ["190 000", 190000], ["190,000", 190000], ["190 000,50", 190000.5], ["190,000.50", 190000.5], ["190.000,50", 190000.5], ["12,5", 12.5], ["0", 0]]) test(`Numerical format ${raw}`, () => assert.equal(parseBituahAmount(raw), expected));
for (const raw of ["-100", "garbage", "", "1,2,3", "1.2.3", "12foo", "Infinity", "1e6", "190,00,000"]) test(`Reject invalid format ${raw}`, () => assert.equal(parseBituahAmount(raw), null));
for (const extra of [{ annualBusinessProfit: -1 }, { annualBusinessProfit: NaN }, { weeklyHours: 169 }, { monthlySalary: Infinity }, { monthlySalary: -1 }]) test(`Invalid input ${JSON.stringify(extra)} suspends output`, () => assert.equal(calc({ annualBusinessProfit: 190000, weeklyHours: 15, isSalaried: false, monthlySalary: 0, ...extra }).shouldCalculate, false));
test("Calculated components reconcile before whole-shekel estimate rounding", () => {
  for (const [profit, hours, salary] of [[0, 0, 0], [100, 20, 0], [4500, 0, 0], [6000, 0, 0], [10000, 20, 9000], [6000, 0, 50000], [100000, 20, 0]]) {
    const r = simulate(profit, hours, salary);
    near(r.monthly, r.nationalInsurance + r.healthInsurance);
    near(r.monthly, r.rows.reduce((sum, row) => sum + row.contribution, 0) + r.minimumTopUp);
    near(r.annual, r.monthly * 12);
    near(r.quarterly, r.monthly * 3);
    assert.equal(r.monthlyEstimate, Math.round(r.monthly));
    assert.equal(r.annualEstimate, Math.round(r.annual));
    assert.equal(r.quarterlyEstimate, Math.round(r.quarterly));
  }
});
test("Employee-only calculator remains unchanged; legacy independent export uses new model", () => {
  near(calculateEmployeeBituahLeumi(9000).contribution, 7703 * 0.0427 + 1297 * 0.1217);
  const r = calculateBituahLeumiIndependent({ monthlyEmployeeSalary: 9000, monthlyIndependentIncome: 10000, weeklyIndependentHours: 20 });
  assert.equal(r.contribution, simulate(10000, 20, 9000).monthly);
});

test("A: salary 6000, annual activity profit 20000, 2 hours: zero additional contribution", () => {
  const r = calc({ annualBusinessProfit: 20000, weeklyHours: 2, isSalaried: true, monthlySalary: 6000 });
  assert.equal(r.status, "notDefinition");
  assert.equal(r.shouldCalculate, true);
  near(r.monthlyProfit, 20000 / 12);
  near(r.exemption, 20000 / 12);
  assert.equal(r.contributionBase, 0);
  assert.equal(r.monthly, 0);
  assert.equal(r.nationalInsurance, 0);
  assert.equal(r.healthInsurance, 0);
  assert.equal(r.nonWorkingMinimumApplied, false);
  // Salary insurance remains payable separately; this zero concerns the additional activity only.
  near(calculateEmployeeBituahLeumi(6000).contribution, 256.2);
});
test("B: salary 6000 and non-work income 1 ILS above the published exemption", () => {
  const r = simulate(3443, 2, 6000);
  assert.equal(r.shouldCalculate, true);
  assert.equal(r.exemption, 3442);
  assert.equal(r.contributionBase, 1);
  assert.equal(r.rows[0].base, 1);
  assert.equal(r.rows[1].base, 0);
  near(r.nationalInsurance, 0.0692);
  near(r.healthInsurance, 0.0517);
  near(r.monthly, 0.1209);
  assert.equal(r.nonWorkingMinimumApplied, false);
});
test("B: salary 6000, activity income 4000/month: only the excess is charged", () => {
  const r = simulate(4000, 2, 6000);
  assert.equal(r.shouldCalculate, true);
  assert.equal(r.contributionBase, 558);
  near(r.nationalInsurance, 38.6136);
  near(r.healthInsurance, 28.8486);
  near(r.monthly, 67.4622);
  assert.equal(r.monthlyEstimate, 67);
  near(r.monthly, r.nationalInsurance + r.healthInsurance);
});
test("C: salary above reduced threshold: non-work excess uses regular rates", () => {
  const r = simulate(5000, 2, 9000);
  assert.equal(r.shouldCalculate, true);
  assert.equal(r.rows[0].base, 0);
  assert.equal(r.rows[1].base, 1558);
  assert.equal(r.rows[1].rate, 0.1217);
  near(r.nationalInsurance, 109.06);
  near(r.healthInsurance, 80.5486);
  near(r.monthly, 189.6086);
  assert.equal(r.monthlyEstimate, 190);
  near(r.monthly, r.nationalInsurance + r.healthInsurance);
});
test("D: salary at insured ceiling: additional non-work contribution is zero", () => {
  const r = simulate(5000, 2, 51910);
  assert.equal(r.shouldCalculate, true);
  assert.equal(r.remainingCap, 0);
  assert.equal(r.contributionBase, 0);
  assert.equal(r.monthly, 0);
  assert.equal(r.nonWorkingMinimumApplied, false);
});
test("E: qualifying activity keeps self-employed deduction and rates, without non-work exemption", () => {
  const r = calc({ annualBusinessProfit: 20000, weeklyHours: 20, isSalaried: true, monthlySalary: 6000 });
  assert.equal(r.status, "atzmai");
  assert.equal(r.shouldCalculate, true);
  assert.equal(r.exemption, 0);
  assert.equal(r.deduction > 0, true);
  near(r.contributionBase, (20000 / 12) / (1 + 0.52 * 0.0447));
  assert.equal(r.nationalInsurance, 72.81);
  assert.equal(r.healthInsurance, 52.61);
  assert.equal(r.monthly, 125.42);
  near(r.monthly, r.nationalInsurance + r.healthInsurance);
});
for (const income of [3441.99, 3442]) test(`Employee non-work income ${income} is fully exempt`, () => {
  const r = simulate(income, 2, 6000);
  assert.equal(r.shouldCalculate, true);
  assert.equal(r.contributionBase, 0);
  assert.equal(r.monthly, 0);
  assert.equal(r.nonWorkingMinimumApplied, false);
});
test("Non-work excess spans the remaining reduced and regular brackets after salary", () => {
  const r = simulate(6000, 2, 6000);
  assert.equal(r.shouldCalculate, true);
  assert.equal(r.rows[0].base, 1703);
  assert.equal(r.rows[1].base, 855);
  near(r.nationalInsurance, 177.6976);
  near(r.healthInsurance, 132.2486);
  near(r.monthly, 309.9462);
  near(r.rows.reduce((sum, row) => sum + row.contribution, 0), r.monthly);
});
test("Employee with low salary and exempt activity never receives the non-employed minimum", () => {
  const r = simulate(100, 2, 500);
  assert.equal(r.shouldCalculate, true);
  assert.equal(r.monthly, 0);
  assert.equal(r.nonWorkingMinimumApplied, false);
  assert.equal(r.minimumTopUp, 0);
});
test("Employee/non-work legacy export and UI use the same corrected model", () => {
  for (const [income, expected] of [[20000 / 12, 0], [4000, 67.4622]]) {
    const r = calculateBituahLeumiIndependent({ monthlyEmployeeSalary: 6000, monthlyIndependentIncome: income, weeklyIndependentHours: 2 });
    near(r.contribution, expected);
  }
});
test("Salaried flag without a salary never enables a precise result or a non-employed minimum", () => {
  const r = simulate(4000, 2, 0, { isSalaried: true });
  assert.equal(r.shouldCalculate, false);
  assert.equal(r.nonWorkingMinimumApplied, false);
});
test("Unsupported employee category remains excluded", () => assert.equal(simulate(4000, 2, 6000, { standardCategory: false }).shouldCalculate, false));

test("Fractional non-work excess is retained rather than rounded before applying rates", () => {
  const r = simulate(3442.25, 2, 6000);
  assert.equal(r.contributionBase, 0.25);
  near(r.monthly, 0.030225);
  assert.equal(r.monthlyEstimate, 0);
});
test("Whole-shekel estimate rounds half a shekel up only after component aggregation", () => {
  for (const [total, estimate] of [[67.499, 67], [67.5, 68]]) {
    const r = simulate(3442 + total / 0.1209, 2, 6000);
    near(r.monthly, total);
    assert.equal(r.monthlyEstimate, estimate);
  }
});
