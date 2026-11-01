import test from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { readFileSync } from "node:fs";
import path from "node:path";

const require = createRequire(import.meta.url);
const { resolveOleExemptionResidencyDate: resolveDate, getOleExemptionArrivalContext: arrivalContext, oleExemptionIntroduction } = require(path.join(process.env.TAX_TEST_BUILD_DIR, "oleHadashExemptionUi.js"));
const { calculateOleHadashExemption: calculate, OLE_EXEMPTION_CAPS: caps } = require(path.join(process.env.TAX_TEST_BUILD_DIR, "oleHadashExemption.js"));
const base = { status: "ole", residencyDate: "2026-06-15", fiscalYear: 2027, annualIncome: 1250000, relatedIncome: 0, relatedSource: "none", incomeKind: "personal", incomePeriod: "resident" };
const simulate = (patch = {}) => calculate({ ...base, ...patch });
const near = (actual, expected) => assert.ok(typeof actual === "number" && Math.abs(actual - expected) < 1e-7, `${actual} != ${expected}`);
const suspended = (r, status = "review") => {
  assert.equal(r.status, status);
  assert.equal(r.exemptIncome, null);
  assert.equal(r.remainingIncome, null);
  assert.ok(r.reasons.length > 0);
};

for (const [fiscalYear, cap] of Object.entries(caps)) {
  test(`${fiscalYear}: statutory cap, no unused ceiling carried from a previous year`, () => {
    const r = simulate({ fiscalYear: Number(fiscalYear), residencyDate: "2025-11-05", annualIncome: 2000000 });
    assert.equal(r.status, "estimate");
    assert.equal(r.generalCap, cap);
    assert.equal(r.exemptIncome, cap);
    assert.equal(r.remainingIncome, 2000000 - cap);
  });
}
test("June 15 2026: inclusive 200 days, precise base and remainder", () => {
  const r = simulate({ fiscalYear: 2026, annualIncome: 400000 });
  assert.equal(r.days2026, 200);
  near(r.factor, 200 / 365);
  near(r.generalCap, 328767.12328767125);
  near(r.exemptIncome, 600000 * 200 / 365);
  near(r.remainingIncome, 71232.87671232875);
  near(r.exemptIncome + r.remainingIncome, 400000);
});
test("November 5 2025 is eligible with full 2026 cap, never more than 365 days", () => {
  const r = simulate({ residencyDate: "2025-11-05", fiscalYear: 2026 });
  assert.equal(r.window, "statutory");
  assert.equal(r.status, "estimate");
  assert.equal(r.days2026, 365);
  assert.equal(r.generalCap, 600000);
});
test("December 31 2026: one day, also prorates the related ceiling", () => {
  const r = simulate({ residencyDate: "2026-12-31", fiscalYear: 2026, annualIncome: 500000, relatedIncome: 500000, relatedSource: "family" });
  assert.equal(r.status, "estimate");
  assert.equal(r.days2026, 1);
  near(r.generalCap, 600000 / 365);
  near(r.relatedCap, 140000 / 365);
  near(r.exemptIncome, 140000 / 365);
});
for (const residencyDate of ["2027-01-01", "2027-01-15", "2027-02-10"]) {
  test(`${residencyDate}: distinct administrative extension review, not zero entitlement`, () => {
    const r = simulate({ residencyDate });
    suspended(r);
    assert.equal(r.window, "extension");
    assert.equal(r.generalCap, null);
    assert.equal(r.factor, null);
    assert.equal(r.conditionalMaximum, null);
    assert.ok(r.reasons.some((reason) => reason.includes("article 38")));
  });
}
test("2027 arrival in 2026 calculation: no invented exemption or 2027 prorating", () => {
  const r = simulate({ residencyDate: "2027-01-01", fiscalYear: 2026 });
  suspended(r);
  assert.equal(r.generalCap, null);
});
for (const residencyDate of ["2025-11-04", "2024-01-01", "2027-02-11", "2028-01-01"]) test(`${residencyDate}: outside supported window is explained, not silently zero`, () => {
  const r = simulate({ residencyDate });
  suspended(r);
  assert.equal(r.window, "outside");
  assert.equal(r.generalCap, null);
});
for (const residencyDate of ["2026-02-30", "2026-02-29", "2026-13-01", "not-a-date", "2026-6-15"]) test(`Invalid date ${residencyDate}`, () => suspended(simulate({ residencyDate }), "invalid"));
test("Missing residency date is review, without a false zero entitlement", () => suspended(simulate({ residencyDate: "" })));
for (const annualIncome of [0, 10000, 1000000, 1250000]) test(`Default non-related income ${annualIncome} stays within income and cap`, () => {
  const r = simulate({ annualIncome });
  assert.equal(r.status, "estimate");
  assert.equal(r.relatedIncome, 0);
  assert.equal(r.exemptIncome, Math.min(annualIncome, 1000000));
  assert.equal(r.remainingIncome, annualIncome - r.exemptIncome);
});
for (const fiscalYear of [2026, 2027, 2028, 2029]) test(`${fiscalYear}: related-party-only income uses 140000 ceiling, prorated only in 2026`, () => {
  const r = simulate({ fiscalYear, annualIncome: 500000, relatedIncome: 500000, relatedSource: "family" });
  assert.equal(r.status, "estimate");
  near(r.exemptIncome, 140000 * (fiscalYear === 2026 ? 200 / 365 : 1));
});
test("Mixed income within global cap: no category allocation invented", () => {
  const r = simulate({ annualIncome: 550000, relatedIncome: 350000, relatedSource: "family" });
  assert.equal(r.status, "estimate");
  assert.equal(r.ordinaryIncome, 200000);
  assert.equal(r.exemptIncome, 340000);
  assert.equal(r.remainingIncome, 210000);
  assert.equal(r.ordinaryExempt, undefined);
  assert.equal(r.relatedExempt, undefined);
});
test("Mixed income reaches global cap: review with conditional bound, never additive double ceiling", () => {
  const r = simulate({ annualIncome: 1300000, relatedIncome: 350000, relatedSource: "family" });
  suspended(r);
  assert.equal(r.mixedAllocation, true);
  assert.equal(r.conditionalMaximum, 1000000);
  assert.equal(r.ordinaryExempt, undefined);
  assert.equal(r.relatedExempt, undefined);
});
test("2030 related-only income uses 150000 general cap, not obsolete 140000", () => {
  const r = simulate({ fiscalYear: 2030, annualIncome: 190000, relatedIncome: 190000, relatedSource: "family" });
  assert.equal(r.status, "estimate");
  assert.equal(r.relatedCap, 150000);
  assert.equal(r.exemptIncome, 150000);
  assert.equal(r.remainingIncome, 40000);
});
test("2030 mixed income: combined bound remains 150000", () => {
  const r = simulate({ fiscalYear: 2030, annualIncome: 300000, relatedIncome: 190000, relatedSource: "family" });
  suspended(r);
  assert.equal(r.conditionalMaximum, 150000);
});
test("Toshav Hozer Vatik requires documented status and ten-year residence verification", () => {
  const r = simulate({ status: "returning" });
  suspended(r);
  assert.ok(r.reasons.some((reason) => reason.includes("dix années")));
});
test("Other/unsure status suspends entitlement", () => suspended(simulate({ status: "other" })));
for (const relatedSource of ["company", "unsure"]) test(`Unresolved related classification: ${relatedSource}`, () => suspended(simulate({ annualIncome: 500000, relatedIncome: 100000, relatedSource })));
for (const incomeKind of ["company", "attributed", "passive", "uncertain"]) test(`${incomeKind}: no automatic personal-income exemption for dividends, company profits or 62a`, () => suspended(simulate({ incomeKind })));
for (const incomePeriod of ["before", "mixed", "departure", "uncertain"]) test(`${incomePeriod}: source/period/residence facts require review`, () => suspended(simulate({ incomePeriod })));
for (const patch of [{ annualIncome: -1 }, { annualIncome: NaN }, { annualIncome: Infinity }, { annualIncome: Number.MAX_SAFE_INTEGER }, { relatedIncome: -1 }, { relatedIncome: 1500000, relatedSource: "family" }, { relatedIncome: 10 }, { fiscalYear: 2025 }, { fiscalYear: 2031 }, { fiscalYear: 2026.5 }, { fiscalYear: "2026" }, { status: "invalid" }]) test(`Reject malformed input ${JSON.stringify(patch)}`, () => suspended(simulate(patch), "invalid"));
test("Never return actual tax payable or promised tax savings", () => {
  const r = simulate();
  assert.equal(r.taxSaved, undefined);
  assert.equal(r.taxable, undefined);
  assert.equal(r.actualTax, undefined);
});
test("UI uses existing shell, factual inputs, live engine, reset and native print without legal attestations", () => {
  const ui = readFileSync("components/calculators/OleHadashExemptionCalculator.tsx", "utf8");
  for (const token of ["CalculatorShell", "calculateOleHadashExemption", "window.print()", "reset(false)", "setRelatedEnabled(false)", "print:hidden", "WhatsAppResultButton"]) assert.ok(ui.includes(token));
  assert.ok(!ui.includes("Je remplis les conditions"));
  assert.ok(!ui.includes("localStorage"));
  assert.ok(!ui.includes("fetch("));
});

for (const [date, expected] of [["2025-11-04", "before"], ["2025-11-05", "standard"], ["2026-12-31", "standard"], ["2027-01-01", "review"], ["2027-02-10", "review"], ["2027-02-11", "after"]]) test(`V8.4.2 arrival guidance ${date}`, () => {
  assert.equal(arrivalContext(date), expected);
  const r = simulate({ residencyDate: resolveDate(date, "same", "") });
  assert.equal(r.status, expected === "standard" ? "estimate" : "review");
});
test("V8.4.2 Alyah date is never silently used as effective residency", () => {
  for (const timing of ["", "unsure"]) {
    const residencyDate = resolveDate("2026-06-15", timing, "2025-01-01");
    assert.equal(residencyDate, "");
    suspended(simulate({ residencyDate }));
  }
  assert.equal(resolveDate("2026-06-15", "different", "2025-01-01"), "2025-01-01");
  assert.equal(simulate({ residencyDate: resolveDate("2026-06-15", "different", "2025-01-01") }).window, "outside");
  near(simulate({ fiscalYear: 2026, residencyDate: resolveDate("2026-06-15", "different", "2026-07-01") }).generalCap, 600000 * 184 / 365);
});
test("V8.4.3 introduction and reciprocal calculator links, no automatic navigation", () => {
  assert.ok(oleExemptionIntroduction.startsWith("Pour les Olim Hadashim ayant fait leur Alyah entre le 5 novembre 2025 et le 31 décembre 2026."));
  const ui = readFileSync("components/calculators/OleHadashExemptionCalculator.tsx", "utf8");
  assert.ok(ui.includes("Date de votre Alyah en Israël"));
  assert.ok(ui.includes('href="/fr/calculateurs/ole-hadash-nekoudot-zikouy"'));
  assert.ok(readFileSync("components/calculators/FrenchCalculators.tsx", "utf8").includes('href="/fr/calculateurs/exoneration-ole-hadash-2026"'));
  for (const unwanted of ["récemment", "La date sur la Teoudat", "router.push", "window.location", "DisclaimerBox"]) assert.ok(!ui.includes(unwanted));
  assert.ok(ui.indexOf("Cette exonération s'ajoute") < ui.indexOf("Quels revenus sont concernés"));
});
test("V8.4.4 three primary inputs and explicit assumptions, no hidden eligibility certification", () => {
  const ui = readFileSync("components/calculators/OleHadashExemptionCalculator.tsx", "utf8");
  for (const removed of ["Vous avez commencé à vivre", "Nature des montants saisis", "Période et lieu", "Revenus avant l’arrivée", "residencyTiming", "setIncomeKind", "setIncomePeriod"]) assert.ok(!ui.includes(removed));
  assert.ok(ui.includes("Limites du calculateur"));
  assert.ok(ui.includes("Estimation sous conditions"));
  assert.ok(ui.includes("residencyDate: aliyahDate"));
  const text = require(path.join(process.env.TAX_TEST_BUILD_DIR, "oleHadashExemptionUi.js")).oleExemptionAssumptions;
  assert.equal(text, "Cette simulation suppose que votre date d'Alyah correspond au début de votre résidence fiscale en Israël et que les revenus saisis sont éligibles à la réforme. Les situations particulières nécessitent une vérification.");
  assert.ok(readFileSync("components/calculators/PensiaHovaCalculator.tsx", "utf8").includes("Date de création de votre activité"));
});
test("V8.4.4 status is an assumption, returning residents are directed to contact", () => {
  const ui = readFileSync("components/calculators/OleHadashExemptionCalculator.tsx", "utf8");
  assert.ok(!ui.includes("Votre statut"));
  assert.ok(!ui.includes("setStatus"));
  assert.ok(ui.includes('status: "ole"'));
  assert.ok(ui.includes("cette hypothèse ne prouve pas votre éligibilité légale"));
  assert.ok(ui.includes("Vous êtes Toshav Hozer Vatik"));
  assert.ok(ui.includes('href="/fr/contact"'));
  assert.ok(ui.includes("Contactez-moi pour vérifier votre éligibilité."));
});
