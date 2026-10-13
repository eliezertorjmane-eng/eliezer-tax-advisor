"use client";

import { useState } from "react";
import { RotateCcw } from "lucide-react";
import { calculateBituahLeumiSimulation, parseBituahAmount } from "@/lib/tax/bituahLeumi";
import { TAX_CONSTANTS_2026 } from "@/lib/tax/constants2026";
import { bituahLeumiSources } from "@/lib/tax/bituahLeumiSources";
import { CalculatorShell, DisclaimerBox, WhatsAppResultButton } from "./CalculatorUi";

const money = (n: number) => `${new Intl.NumberFormat("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n)} ₪`;
const estimateMoney = (n: number) => `${new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 0 }).format(n)} ₪`;
const number = (n: number) => new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 2 }).format(n);
const percentage = (n: number) => `${number(n * 100)} %`;
const limits = [
  "Moins de 18 ans, âge de la retraite et pensions.",
  "Non-résidents, invalidité, exonérations et accords particuliers d’assurance.",
  "Femmes mariées sans emploi relevant de la catégorie עקרת בית, étudiants et autres catégories particulières.",
  "Autres revenus, activité indépendante définie avec un revenu hors travail distinct, revenus étrangers et plusieurs emplois variables.",
  "Régime Esek Zair, versements à une קופת גמל, activité sur une partie de l’année et régularisation définitive."
];

function AmountField({ label, value, onChange, help, invalid = false }: { label: string; value: string; onChange: (v: string) => void; help?: string; invalid?: boolean }) {
  return <label className="grid gap-2 text-sm text-slate-700">
    <span className="font-semibold">{label}</span>
    <input type="text" inputMode="decimal" value={value} onChange={(e) => onChange(e.target.value)} aria-invalid={invalid} className="min-h-12 min-w-0 w-full rounded-md border border-line bg-white px-3 text-base text-ink outline-none focus-visible:ring-2 focus-visible:ring-sky" />
    {help ? <span className="text-xs leading-5">{help}</span> : null}
    {invalid ? <span className="text-xs text-red-700">Saisissez un nombre positif ou nul valide.</span> : null}
  </label>;
}

export function BituahLeumiCalculator() {
  const [income, setIncome] = useState("190000");
  const [hours, setHours] = useState("15");
  const [isSalaried, setIsSalaried] = useState(false);
  const [salary, setSalary] = useState("");
  const [standardCategory, setStandardCategory] = useState(true);
  const [example, setExample] = useState(true);
  const annual = parseBituahAmount(income);
  const weeklyHours = parseBituahAmount(hours);
  const monthlySalary = isSalaried ? parseBituahAmount(salary) : 0;
  const result = calculateBituahLeumiSimulation({ annualBusinessProfit: annual ?? NaN, weeklyHours: weeklyHours ?? NaN, isSalaried, monthlySalary: monthlySalary ?? NaN, standardCategory });
  const inputsValid = annual !== null && weeklyHours !== null && weeklyHours <= 168 && monthlySalary !== null;
  const showDiagnostic = inputsValid && standardCategory && result.nonWorkAdjustmentRequiresReview && (!isSalaried || (monthlySalary ?? 0) > 0);
  const statusHebrew = result.status === "atzmai" ? "עצמאי עונה להגדרה" : "עצמאי שאינו עונה להגדרה";
  const statusFrench = result.status === "atzmai" ? "Indépendant répondant à la définition" : "Activité traitée comme revenu hors travail";
  const c = TAX_CONSTANTS_2026.bituahLeumi;
  const message = `Bonjour Eliezer, je souhaite faire vérifier mes cotisations Bitouah Leumi. Bénéfice annuel estimé : ${annual === null ? "à préciser" : money(annual)} ; heures : ${hours}/semaine ; salarié : ${isSalaried ? "oui" : "non"}${isSalaried ? ` ; salaire brut mensuel : ${monthlySalary === null ? "à préciser" : money(monthlySalary)}` : ""}. Statut estimé : ${inputsValid ? statusHebrew : "à vérifier"} ; cotisation mensuelle liée à l’activité : ${result.shouldCalculate ? money(result.monthly) : "vérification personnalisée nécessaire"}.`;
  function update(set: (v: string) => void, value: string) { set(value); setExample(false); }
  function reset(sample: boolean) { setIncome(sample ? "190000" : "0"); setHours(sample ? "15" : "0"); setIsSalaried(false); setSalary(""); setStandardCategory(true); setExample(sample); }

  return <CalculatorShell title="Calculateur Bitouah Leumi indépendant 2026" subtitle="Estimez votre statut et la cotisation liée à votre activité, avec le détail assurance nationale et santé.">
    <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
      <div className="grid min-w-0 gap-5 rounded-md border border-line bg-white p-5 sm:p-6">
        <p className="text-sm text-teal">{example ? "Exemple illustratif : 190 000 ₪ par an, 15 heures par semaine, sans salaire." : "Vos données de simulation"}</p>
        <AmountField label="Bénéfice professionnel net annuel (₪)" value={income} onChange={(v) => update(setIncome, v)} invalid={annual === null} help="Revenu annuel de votre activité après dépenses professionnelles, avant impôt sur le revenu et ajustements spécifiques du Bitouah Leumi. Ce n’est pas votre chiffre d’affaires." />
        <p className="-mt-3 text-xs leading-5 text-slate-500">Formats acceptés : 190000, 190 000 ou 190,000.</p>
        <AmountField label="Heures d’activité par semaine" value={hours} onChange={(v) => update(setHours, v)} invalid={weeklyHours === null || weeklyHours > 168} help="Moyenne sur l’année, entre 0 et 168 heures." />
        <label className="flex items-start gap-3 text-sm font-semibold text-ink"><input type="checkbox" checked={isSalaried} onChange={(e) => { setIsSalaried(e.target.checked); setExample(false); }} className="mt-1 h-5 w-5 shrink-0 accent-[#1E6B87]" /><span>Je suis aussi salarié <bdi lang="he" dir="rtl">(שכיר)</bdi></span></label>
        {isSalaried ? <AmountField label="Salaire brut mensuel (₪)" value={salary} onChange={(v) => update(setSalary, v)} invalid={monthlySalary === null} help="Le salaire est prioritaire pour les tranches et le plafond. Son montant est nécessaire au calcul." /> : null}
        <details className="border-t border-line pt-4"><summary className="cursor-pointer text-sm font-semibold text-teal">Catégorie d’assuré</summary>
          <label className="mt-3 flex items-start gap-3 text-sm leading-6 text-slate-700"><input type="checkbox" checked={standardCategory} onChange={(e) => setStandardCategory(e.target.checked)} className="mt-1 h-5 w-5 shrink-0 accent-[#1E6B87]" /><span>Résident israélien, de 18 ans à l’âge de la retraite, sans catégorie particulière ni exonération.</span></label>
          <p className="mt-2 text-xs leading-5 text-slate-600">Si ces conditions ne sont pas remplies, le montant est suspendu. Les catégories particulières sont détaillées ci-dessous.</p>
        </details>
        <div className="flex flex-wrap gap-3">
          <button type="button" onClick={() => reset(false)} className="inline-flex min-h-11 items-center gap-2 rounded-md border border-line px-3 text-sm font-semibold text-teal"><RotateCcw size={16} aria-hidden />Réinitialiser</button>
          <button type="button" onClick={() => reset(true)} className="min-h-11 rounded-md border border-line px-3 text-sm font-semibold text-teal">Exemple illustratif</button>
        </div>
      </div>
      <section aria-label="Résultat Bitouah Leumi" aria-live="polite" className="grid min-w-0 gap-5">
        <div className="min-w-0 rounded-md border border-sky/40 bg-mint p-5 sm:p-6">
          <h2 className="text-sm font-semibold text-teal">Statut Bitouah Leumi estimé</h2>
          {inputsValid ? <><p className="mt-2 font-semibold text-ink"><bdi lang="he" dir="rtl">{statusHebrew}</bdi></p><p className="mt-1 text-sm text-slate-600">{statusFrench}</p></> : <p className="mt-2 text-sm text-slate-600">Complétez les données valides pour déterminer le statut.</p>}
          <p className="mt-5 text-sm font-semibold text-teal">Cotisation mensuelle estimée</p>
          <p className="mt-2 break-words text-3xl font-semibold text-ink">{result.shouldCalculate ? estimateMoney(result.monthlyEstimate) : "À vérifier"}</p>
          {result.shouldCalculate ? <dl className="mt-5 grid grid-cols-1 gap-3 border-t border-sky/25 pt-4 sm:grid-cols-3">
            <div><dt className="text-xs text-slate-600">Par an</dt><dd className="mt-1 font-semibold text-ink">{estimateMoney(result.annualEstimate)}</dd></div>
            <div><dt className="text-xs text-slate-600">Par trimestre</dt><dd className="mt-1 font-semibold text-ink">{estimateMoney(result.quarterlyEstimate)}</dd></div>
            <div><dt className="text-xs text-slate-600">Part du bénéfice</dt><dd className="mt-1 font-semibold text-ink">{result.effectiveRate === null ? "Sans revenu" : percentage(result.effectiveRate)}</dd></div>
          </dl> : null}
        </div>
        {inputsValid ? <div><h2 className="text-lg font-semibold text-ink">Pourquoi ce statut ?</h2><ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-7 text-slate-600">{result.reasons.map((reason) => <li key={reason}>{reason}</li>)}</ul></div> : null}
        {result.shouldCalculate || showDiagnostic ? <>
          <details open={result.shouldCalculate} className="min-w-0 border-y border-line py-4"><summary className="cursor-pointer font-semibold text-ink">{showDiagnostic ? "Détail du barème avant ajustement — à faire vérifier" : "Comment la cotisation est calculée ?"}</summary>
            {showDiagnostic ? <p className="mt-3 text-sm leading-7 text-slate-600">Ces montants illustrent les taux et l’exemption avant validation de la section 345. Ils ne constituent pas votre cotisation estimée finale.</p> : null}
            <dl className="mt-4 grid grid-cols-[minmax(0,1fr)_auto] gap-x-3 gap-y-2 text-sm leading-6 text-slate-600">
              <dt>Bénéfice net annuel saisi</dt><dd>{money(annual!)}</dd>
              <dt>Bénéfice mensuel moyen</dt><dd>{money(result.monthlyProfit)}</dd>
              <dt>{result.status === "notDefinition" && isSalaried ? "Ajustement indépendant de 52 %" : "Ajustement de 52 % (assurance nationale seule)"}</dt><dd>{showDiagnostic ? "À valider" : result.status === "notDefinition" && isSalaried ? "Non appliqué" : `− ${money(result.deduction)}`}</dd>
              <dt>{showDiagnostic ? "Base avant ajustement à valider" : "Base après cet ajustement"}</dt><dd>{money(result.adjustedMonthlyBase)}</dd>
              <dt>Exemption hors travail applicable</dt><dd>− {money(result.exemption)}</dd>
              <dt>Tranche réduite restante</dt><dd>{money(result.reducedRoom)}</dd>
              <dt>Plafond restant après salaire</dt><dd>{money(result.remainingCap)}</dd>
              <dt className="font-semibold text-ink">Base cotisable après minimum / plafond</dt><dd className="font-semibold text-ink">{money(result.contributionBase)}</dd>
            </dl>
            <div className="mt-4 max-w-full overflow-x-auto"><table className="w-full text-left text-xs sm:text-sm">
              <caption className="sr-only">Calcul mensuel des cotisations liées à l’activité</caption>
              <thead><tr className="border-b border-line"><th scope="col" className="py-2 pr-3">Tranche</th><th scope="col" className="px-2">Base mensuelle</th><th scope="col" className="px-2">Taux</th><th scope="col" className="pl-2 text-right">Cotisation</th></tr></thead>
              <tbody>{result.rows.map((row) => <tr key={row.label} className="border-b border-line"><th scope="row" className="py-3 pr-3 font-normal">{row.label}</th><td className="whitespace-nowrap px-2">{money(row.base)}</td><td className="whitespace-nowrap px-2">{percentage(row.rate)}</td><td className="whitespace-nowrap pl-2 text-right">{money(row.contribution)}</td></tr>)}
                {result.nonWorkingMinimumApplied ? <tr><th scope="row" colSpan={3} className="py-2 font-normal">Complément au minimum sans emploi</th><td className="text-right">{money(result.minimumTopUp)}</td></tr> : null}
              </tbody><tfoot><tr><th scope="row" colSpan={3} className="pt-3">{showDiagnostic ? "Total du barème avant ajustement" : "Total mensuel"}</th><td className="pt-3 text-right font-semibold">{money(result.monthly)}</td></tr></tfoot>
            </table></div>
            <h3 className="mt-5 font-semibold text-ink">Répartition</h3><p className="mt-2 text-sm leading-7 text-slate-600">Assurance nationale / <bdi lang="he" dir="rtl">ביטוח לאומי</bdi> : {money(result.nationalInsurance)}<br />Assurance santé / <bdi lang="he" dir="rtl">ביטוח בריאות</bdi> : {money(result.healthInsurance)}</p>
          </details>
        </> : null}
        {result.warnings.length ? <div><h2 className="mb-3 text-lg font-semibold text-ink">Alertes et hypothèses</h2><div className="grid gap-3">{result.warnings.map((warning) => <DisclaimerBox key={warning}>{warning}</DisclaimerBox>)}</div></div> : null}
        <ul className="list-disc pl-5 text-xs leading-6 text-slate-600">{result.assumptions.map((assumption) => <li key={assumption}>{assumption}</li>)}</ul>
        <div className="[&_a]:whitespace-normal [&_a]:text-center"><WhatsAppResultButton label="Faire vérifier mes cotisations Bitouah Leumi" message={message} /></div>
      </section>
    </div>
    <div className="mt-10 grid gap-8 border-t border-line pt-8 lg:grid-cols-2">
      <section><h2 className="text-xl font-semibold text-ink">Barèmes officiels 2026</h2><dl className="mt-4 grid grid-cols-[minmax(0,1fr)_auto] gap-3 text-sm text-slate-600">
        <dt>Salaire moyen</dt><dd>{number(c.averageSalary)} ₪</dd><dt>Tranche réduite</dt><dd>{number(c.reducedBracket)} ₪</dd><dt>Plafond mensuel</dt><dd>{number(c.maximumMonthlyInsuredIncome)} ₪</dd><dt>Base minimale indépendant</dt><dd>{number(c.minimumSelfEmployedBase)} ₪</dd><dt>Exemption hors travail (25 %)</dt><dd>{number(c.nonWorkIncomeExemption)} ₪</dd><dt>Minimum standard sans emploi</dt><dd>{c.minimumNonWorking.total} ₪</dd>
        <dt>Indépendant : assurance nationale</dt><dd>{percentage(c.selfEmployedRates.breakdown.bituahLeumiReduced)} / {percentage(c.selfEmployedRates.breakdown.bituahLeumiRegular)}</dd><dt>Indépendant : santé</dt><dd>{percentage(c.selfEmployedRates.breakdown.healthReduced)} / {percentage(c.selfEmployedRates.breakdown.healthRegular)}</dd><dt>Indépendant : total</dt><dd>{percentage(c.selfEmployedRates.reduced)} / {percentage(c.selfEmployedRates.regular)}</dd>
        <dt>Hors travail : assurance nationale</dt><dd>{percentage(c.nonWorkIncomeRates.breakdown.nationalReduced)} / {percentage(c.nonWorkIncomeRates.breakdown.nationalRegular)}</dd><dt>Hors travail : santé</dt><dd>{percentage(c.nonWorkIncomeRates.breakdown.health)}</dd><dt>Hors travail : total</dt><dd>{percentage(c.nonWorkIncomeRates.reduced)} / {percentage(c.nonWorkIncomeRates.regular)}</dd>
      </dl></section>
      <section><h2 className="text-xl font-semibold text-ink">Ce que cette simulation ne couvre pas</h2><ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-7 text-slate-600">{limits.map((limit) => <li key={limit}>{limit}</li>)}</ul>
        <details className="mt-5"><summary className="cursor-pointer text-sm font-semibold text-teal">Sources officielles</summary><ul className="mt-3 space-y-2 text-sm leading-6">{bituahLeumiSources.map((source) => <li key={source.url}><a href={source.url} target="_blank" rel="noreferrer" className="text-teal underline underline-offset-4">{source.label}</a></li>)}</ul></details>
      </section>
    </div>
  </CalculatorShell>;
}
