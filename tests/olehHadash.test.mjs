import test from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { readFileSync } from "node:fs";
import path from "node:path";

const require = createRequire(import.meta.url);
const { calculateOlehHadashCreditPoints: calculate, getOlehHadashReformContext: context } = require(path.join(process.env.TAX_TEST_BUILD_DIR, "olehHadash.js"));
const { calculateOleHadashExemption: exemption } = require(path.join(process.env.TAX_TEST_BUILD_DIR, "oleHadashExemption.js"));
const simulate = (patch = {}) => calculate({ aliyahDate: "2024-01-01", targetTaxYear: 2026, ...patch });
const near = (a, b) => assert.ok(Math.abs(a - b) < 1e-8, `${a} != ${b}`);

for (const [date, expected] of [
  ["2024-01-01", null], ["2025-11-04", null], ["2025-11-05", "standard"],
  ["2026-01-01", "standard"], ["2026-06-15", "standard"], ["2026-12-31", "standard"],
  ["2027-01-01", "review"], ["2027-01-15", "review"], ["2027-02-10", "review"],
  ["2027-02-11", null], ["2028-01-01", null]
]) test(`Reform context ${date}: ${expected}`, () => {
  assert.equal(context(date), expected);
  const r = exemption({ status: "ole", residencyDate: date, fiscalYear: 2027, annualIncome: 100000, relatedIncome: 0, relatedSource: "none", incomeKind: "personal", incomePeriod: "resident" });
  assert.equal(r.window, expected === "standard" ? "statutory" : expected === "review" ? "extension" : "outside");
});
for (const date of ["", "not-a-date", "2026-02-30", "2026-02-29", "2026-13-01", "2026-2-01"]) test(`Invalid date ${date}: no misleading points or reform panel`, () => {
  assert.equal(context(date), null);
  assert.equal(simulate({ aliyahDate: date }), null);
});
test("Historical 2024 arrival: existing 2026 standard result unchanged", () => {
  const r = simulate();
  assert.equal(r.requiresReview, false);
  near(r.annualCreditPoints, 2.5);
  near(r.estimatedValue, 7260);
  assert.equal(r.remainingEligibilityMonths, 18);
  assert.equal(context("2024-01-01"), null);
});
for (const [targetTaxYear, points] of [[2021, 0], [2022, 1], [2023, 3], [2024, 2.5], [2025, 1.5], [2026, 0.5], [2027, 0]]) test(`Post-2022 section 35 schedule, year ${targetTaxYear}: ${points} annual points`, () => {
  const r = simulate({ aliyahDate: "2022-01-01", targetTaxYear });
  assert.equal(r.regime, "from2022");
  assert.equal(r.totalEligibilityMonths, 54);
  near(r.annualCreditPoints, points);
});
for (const [targetTaxYear, points] of [[2020, 0], [2021, 3], [2022, 2.5], [2023, 1.5], [2024, 0.5], [2025, 0]]) test(`Pre-2022 section 35 schedule, year ${targetTaxYear}: ${points} annual points`, () => {
  const r = simulate({ aliyahDate: "2021-01-01", targetTaxYear });
  assert.equal(r.regime, "before2022");
  assert.equal(r.totalEligibilityMonths, 42);
  near(r.annualCreditPoints, points);
});
test("All arrival months retain the official 42/54-month fractional schedules", () => {
  for (const arrivalYear of [2021, 2022, 2025, 2026, 2027]) {
    const schedule = arrivalYear < 2022 ? [...Array(18).fill(1 / 4), ...Array(12).fill(1 / 6), ...Array(12).fill(1 / 12)] : [...Array(12).fill(1 / 12), ...Array(18).fill(1 / 4), ...Array(12).fill(1 / 6), ...Array(12).fill(1 / 12)];
    for (let month = 1; month <= 12; month++) for (let targetTaxYear = arrivalYear - 1; targetTaxYear <= arrivalYear + 6; targetTaxYear++) {
      const expected = Array.from({ length: 12 }, (_, i) => schedule[(targetTaxYear - arrivalYear) * 12 + i - (month - 1)] ?? 0).reduce((a, b) => a + b, 0);
      near(simulate({ aliyahDate: `${arrivalYear}-${String(month).padStart(2, "0")}-15`, targetTaxYear }).annualCreditPoints, expected);
    }
  }
});
test("January 1 2022 boundary changes regime, not because of the 2026 reform", () => {
  assert.equal(simulate({ aliyahDate: "2021-12-31" }).regime, "before2022");
  assert.equal(simulate({ aliyahDate: "2022-01-01" }).regime, "from2022");
});
test("Arrival month included even on the last day; no extra points for earlier day", () => {
  near(simulate({ aliyahDate: "2026-12-31" }).annualCreditPoints, 1 / 12);
  near(simulate({ aliyahDate: "2026-12-01" }).annualCreditPoints, 1 / 12);
});
test("New exemption does not erase credit points; zero tax permits zero use", () => {
  const r = simulate({ aliyahDate: "2026-01-01", annualTaxBeforeCredits: 0 });
  near(r.annualCreditPoints, 1);
  near(r.estimatedValue, 2904);
  assert.equal(r.usableValue, 0);
  near(r.unusedValue, 2904);
});
test("Missing tax does not imply full usable credit or guaranteed savings", () => {
  assert.equal(simulate().usableValue, null);
  assert.equal(simulate().unusedValue, null);
});
for (const tax of [0, 1000, 10000]) test(`Tax input ${tax}: usage bound cannot exceed tax or theoretical value`, () => {
  const r = simulate({ annualTaxBeforeCredits: tax });
  near(r.usableValue, Math.min(tax, 7260));
  near(r.unusedValue + r.usableValue, r.estimatedValue);
  assert.equal(r.taxSavings, undefined);
  assert.equal(r.refund, undefined);
});
test("Excluded months suspend precise results instead of arbitrary point subtraction", () => {
  for (const aliyahDate of ["2021-01-01", "2024-01-01", "2026-01-01"]) {
    const r = simulate({ aliyahDate, excludedMonths: 6 });
    assert.equal(r.requiresReview, true);
    assert.equal(r.annualCreditPoints, null);
    assert.equal(r.estimatedValue, null);
    assert.equal(r.remainingEligibilityMonths, null);
    assert.equal(r.usableValue, null);
  }
});
for (const patch of [{ targetTaxYear: NaN }, { targetTaxYear: 2026.5 }, { excludedMonths: -1 }, { excludedMonths: 1.5 }, { annualTaxBeforeCredits: -1 }, { annualTaxBeforeCredits: Infinity }]) test(`Reject invalid numeric input ${JSON.stringify(patch)}`, () => assert.equal(simulate(patch), null));
test("UI context is conditional, links are exact, and values are not guaranteed savings", () => {
  const source = readFileSync("components/calculators/FrenchCalculators.tsx", "utf8");
  const ui = source.slice(source.indexOf("function OlehHadashCalculator()"), source.indexOf("function CreditPointValueCalculator()"));
  for (const token of ["{reformContext ?", "reformContext === \"review\"", "Valeur maximale théorique des crédits", "après les exonérations", "pas automatiquement un remboursement", "en dessous de zéro", "aucun droit n’est garanti", 'href="/fr/calculateurs/exoneration-ole-hadash-2026"', 'href="/fr/guides/reforme-fiscale-olim-hadashim-2026"']) assert.ok(ui.includes(token), token);
  assert.ok(!ui.includes("Valeur utilisable estimée"));
  assert.ok(!ui.includes("|| undefined"));
  assert.ok(!ui.includes("Je remplis les conditions"));
});
test("No new pages or duplicate registry URLs; existing metadata and V8.3 rules remain", () => {
  const registry = readFileSync("lib/calculators.ts", "utf8");
  for (const slug of ["ole-hadash-nekoudot-zikouy", "exoneration-ole-hadash-2026"]) {
    assert.equal((registry.match(new RegExp(`slug: "${slug}"`, "g")) ?? []).length, 1);
  }
  const sitemap = readFileSync("app/sitemap.xml/route.ts", "utf8");
  for (const url of ["/en/guides", "/he/guides", "/en/cas-reels", "/he/cas-reels"]) assert.ok(!sitemap.includes(url));
  const metadata = readFileSync("app/[locale]/calculateurs/[calculatorSlug]/page.tsx", "utf8");
  assert.ok(metadata.includes('title: "Calculateur נקודות זיכוי olé hadash | Israël 2026"'));
  assert.ok(!sitemap.includes("exoneration-impot-ole-hadash-2026"));
});
