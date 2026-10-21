import test from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";
import path from "node:path";

const require = createRequire(import.meta.url);
const { calculatePensiaHova: calculate, PENSIA_HOVA_2026: constants } = require(path.join(process.env.TAX_TEST_BUILD_DIR, "pensiaHova.js"));
const base = { fiscalYear: 2026, annualProfit: 120000, firstRegistrationDate: "2020-01-01", dateOfBirth: "1990-06-15", isSalaried: false, independentDeposits: 0, salariedPensionDeposits: 0 };
const simulate = (extra = {}) => calculate({ ...base, ...extra });
const near = (actual, expected) => assert.ok(Math.abs(actual - expected) < 1e-8, `${actual} != ${expected}`);

test("A: full-year business, 120000 profit, precise annual brackets", () => {
  const r = simulate();
  assert.equal(r.status, "mandatory");
  assert.equal(r.firstBase, 82614);
  assert.equal(r.secondBase, 37386);
  near(r.firstContribution, 3676.323);
  near(r.secondContribution, 4691.943);
  near(r.annualObligation, 8368.266);
  near(r.monthlyPlanning, 8368.266 / 12);
  near(r.remaining, 8368.266);
});
for (const [scenario, date] of [["B", "2026-03-01"], ["C", "2026-06-01"], ["C boundary", "2026-06-30"]]) {
  test(`${scenario}: registered ${date}, six months elapsed at year-end; actual annual profit, no prorating`, () => {
    const r = simulate({ firstRegistrationDate: date });
    assert.equal(r.recentRegistration, false);
    near(r.annualObligation, 8368.266);
    assert.ok(r.reasons.some((reason) => reason.includes("sans annualisation ni prorata")));
  });
}
for (const [scenario, date] of [["D", "2026-07-01"], ["E", "2026-09-01"], ["year end", "2026-12-31"]]) {
  test(`${scenario}: registered ${date}, fewer than six months at year-end, registration exemption`, () => {
    const r = simulate({ firstRegistrationDate: date });
    assert.equal(r.status, "exempt");
    assert.equal(r.recentRegistration, true);
    assert.equal(r.annualObligation, 0);
    assert.equal(r.remaining, 0);
    near(r.bracketTotal, 8368.266);
  });
}
for (const [scenario, months] of [["F", 7], ["G", 10], ["A", 12], ["earlier registration", 4]]) {
  test(`${scenario}: ${months} months of actual earnings does not prorate annual brackets for an existing registration`, () => {
    // Same actual annual profit: months with income is deliberately not a calculation input.
    const r = simulate();
    near(r.annualObligation, 8368.266);
    assert.equal(r.recentRegistration, false);
  });
}
test("H: qualifying employee and employer pension deposits offset obligation, not profit", () => {
  const r = simulate({ isSalaried: true, salariedPensionDeposits: 3000 + 3250 });
  near(r.annualObligation, 8368.266);
  assert.equal(r.firstBase, 82614);
  assert.equal(r.salaryOffset, 6250);
  near(r.independentRequirement, 2118.266);
  near(r.remaining, 2118.266);
});
test("I: salaried pension fully covers obligation, independent requirement zero", () => {
  const r = simulate({ isSalaried: true, salariedPensionDeposits: 10000 });
  assert.equal(r.independentRequirement, 0);
  assert.equal(r.remaining, 0);
  near(r.excessDeposits, 1631.734);
});
test("J: independent deposits are counted once, after salary offset", () => {
  const r = simulate({ isSalaried: true, salariedPensionDeposits: 6250, independentDeposits: 1000 });
  near(r.remaining, 1118.266);
  assert.equal(r.totalCovered, 7250);
  near(simulate({ independentDeposits: 1000 }).remaining, 7368.266);
  near(simulate({ independentDeposits: 10000 }).excessDeposits, 1631.734);
});
test("Unchecked salaried option never counts hidden deposits", () => {
  const r = simulate({ salariedPensionDeposits: 10000 });
  assert.equal(r.salariedDeposits, 0);
  near(r.remaining, 8368.266);
});
test("Exceptional partial year explicitly suspends precise liability, even if age or registration otherwise exempts", () => {
  for (const extra of [{}, { firstRegistrationDate: "2026-09-01" }, { dateOfBirth: "1960-01-01" }]) {
    const r = simulate({ ...extra, exceptionalYear: true });
    assert.equal(r.status, "review");
    assert.equal(r.annualObligation, null);
    assert.equal(r.remaining, null);
    assert.equal(r.monthlyPlanning, null);
  }
});
for (const [birth, status] of [["2006-01-01", "exempt"], ["2005-12-31", "mandatory"], ["2005-01-01", "mandatory"], ["1967-01-01", "mandatory"], ["1966-12-31", "exempt"], ["1966-01-01", "exempt"]]) {
  test(`K: age is assessed at year-end, DOB ${birth}`, () => assert.equal(simulate({ dateOfBirth: birth }).status, status));
}
test("K: 55 on January 1 2017 inclusive, distinct from ordinary age exemption", () => {
  assert.equal(simulate({ dateOfBirth: "1962-01-01" }).transitionalExemption, true);
  assert.equal(simulate({ dateOfBirth: "1962-01-02" }).transitionalExemption, false);
});
for (const annualProfit of [0, -10000]) test(`L: profit ${annualProfit} has no mandatory contribution`, () => {
  const r = simulate({ annualProfit });
  assert.equal(r.annualObligation, 0);
  assert.equal(r.remaining, 0);
});
test("M: above cap, maximum obligation 14044.38", () => {
  near(simulate({ annualProfit: 1000000 }).annualObligation, constants.maximumAnnualContribution);
  near(simulate({ annualProfit: 165228 }).annualObligation, 14044.38);
});
for (const annualProfit of [82613.99, 82614, 82614.01, 165227.99, 165228, 165228.01, 120000.01]) test(`Precise threshold arithmetic and reconciliation for ${annualProfit}`, () => {
  const r = simulate({ annualProfit, isSalaried: true, salariedPensionDeposits: 2500.01, independentDeposits: 250.02 });
  near(r.bracketTotal, r.firstContribution + r.secondContribution);
  near(r.annualObligation, r.totalCovered + r.remaining);
  near(r.totalDeposits, r.totalCovered + r.excessDeposits);
});
for (const extra of [{ fiscalYear: 2025 }, { annualProfit: NaN }, { independentDeposits: -1 }, { salariedPensionDeposits: Infinity }, { dateOfBirth: "" }, { dateOfBirth: "2001-02-29" }, { dateOfBirth: "2027-01-01" }, { firstRegistrationDate: "2026-02-30" }, { firstRegistrationDate: "2027-01-01" }, { firstRegistrationDate: "1980-01-01" }]) test(`Invalid input suspends result: ${JSON.stringify(extra)}`, () => {
  const r = simulate(extra);
  assert.equal(r.status, "invalid");
  assert.equal(r.annualObligation, null);
  assert.equal(r.remaining, null);
});
