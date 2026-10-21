"use client";

import { useState } from "react";
import { RotateCcw } from "lucide-react";
import { calculatePensiaHova, PENSIA_HOVA_2026 } from "@/lib/tax/pensiaHova";
import { parseBituahAmount } from "@/lib/tax/bituahLeumi";
import { pensiaHovaSources } from "@/lib/tax/pensiaHovaSources";
import { CalculatorShell, DisclaimerBox, WhatsAppResultButton } from "./CalculatorUi";

const money = (value: number, digits = 2) => `${new Intl.NumberFormat("fr-FR", { minimumFractionDigits: digits, maximumFractionDigits: digits }).format(value)} ₪`;
const inputClass = "min-h-12 min-w-0 w-full rounded-md border border-line bg-white px-3 text-base text-ink outline-none focus-visible:ring-2 focus-visible:ring-sky";

function AmountField({ label, value, onChange, help, allowLoss = false }: { label: string; value: string; onChange: (value: string) => void; help?: string; allowLoss?: boolean }) {
  const parsed = parseAmount(value, allowLoss);
  return <label className="grid min-w-0 gap-2 text-sm text-slate-700">
    <span className="font-semibold">{label}</span>
    <input type="text" inputMode="decimal" value={value} onChange={(event) => onChange(event.target.value)} aria-invalid={parsed === null} className={inputClass} />
    {help ? <span className="text-xs leading-6 text-slate-500">{help}</span> : null}
    {parsed === null ? <span className="text-xs text-red-700">Saisissez un montant valide en ILS.</span> : null}
  </label>;
}

function parseAmount(raw: string, allowLoss = false) {
  const trimmed = raw.trim();
  const negative = allowLoss && trimmed.startsWith("-");
  const value = parseBituahAmount(negative ? trimmed.slice(1) : trimmed);
  return value === null ? null : negative ? -value : value;
}

export function PensiaHovaCalculator() {
  const [profit, setProfit] = useState("120000");
  const [registration, setRegistration] = useState("");
  const [birth, setBirth] = useState("");
  const [salaried, setSalaried] = useState(false);
  const [independentDeposits, setIndependentDeposits] = useState("0");
  const [salaryDeposits, setSalaryDeposits] = useState("0");
  const [exceptionalYear, setExceptionalYear] = useState(false);
  const result = calculatePensiaHova({ fiscalYear: 2026, annualProfit: parseAmount(profit, true) ?? NaN, firstRegistrationDate: registration, dateOfBirth: birth, isSalaried: salaried, independentDeposits: parseAmount(independentDeposits) ?? NaN, salariedPensionDeposits: salaried ? parseAmount(salaryDeposits) ?? NaN : 0, exceptionalYear });
  const c = PENSIA_HOVA_2026;
  const status = !result.valid ? "Renseignez des montants et des dates valides" : result.requiresReview ? "Situation particulière — vérification nécessaire" : result.ageExemption || result.transitionalExemption ? "Exemption liée à l’âge" : result.recentRegistration ? "Exemption possible : entreprise récemment enregistrée" : "Pensia Hova obligatoire — estimation standard";
  const reset = (example: boolean) => {
    setProfit(example ? "120000" : ""); setRegistration(example ? "2020-01-01" : ""); setBirth(example ? "1990-06-15" : "");
    setSalaried(false); setIndependentDeposits("0"); setSalaryDeposits("0"); setExceptionalYear(false);
  };
  const message = `Bonjour Eliezer, je souhaite faire vérifier ma Pensia Hova 2026. Bénéfice annuel estimé : ${parseAmount(profit, true) === null ? "à préciser" : money(parseAmount(profit, true)!)}. Salarié : ${salaried ? "oui" : "non"}. Obligation annuelle : ${result.annualObligation === null ? "à vérifier" : money(result.annualObligation)}. Reste à déposer : ${result.remaining === null ? "à vérifier" : money(result.remaining)}.`;
  return <CalculatorShell title="Calculateur Pensia Hova indépendant" subtitle="Estimez votre pension obligatoire 2026 à partir de votre bénéfice annuel et des versements déjà effectués.">
    <div className="grid min-w-0 gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-start">
      <div className="grid min-w-0 gap-5 rounded-md border border-line bg-white p-5 sm:p-6">
        <label className="grid gap-2 text-sm font-semibold text-slate-700">Année fiscale<select className={inputClass} value="2026" onChange={() => {}}><option value="2026">2026</option></select></label>
        <AmountField label="Bénéfice net annuel estimé (₪)" value={profit} onChange={setProfit} allowLoss help="Bénéfice professionnel éligible, pas le chiffre d’affaires. Après dépenses admises, avant déductions pension, Keren Hishtalmut et autres déductions exclues, compensations de pertes et exonérations." />
        <label className="grid min-w-0 gap-2 text-sm text-slate-700"><span className="font-semibold">Date de première immatriculation de l’entreprise</span><input type="date" max="2026-12-31" value={registration} onChange={(event) => setRegistration(event.target.value)} className={inputClass} /><span className="text-xs leading-6 text-slate-500">Première immatriculation officielle à la TVA, même si vous aviez peu de mois avec revenus. Pas la date d’une reprise d’activité.</span></label>
        <label className="grid min-w-0 gap-2 text-sm text-slate-700"><span className="font-semibold">Date de naissance</span><input type="date" max="2026-12-31" value={birth} onChange={(event) => setBirth(event.target.value)} className={inputClass} /><span className="text-xs leading-6 text-slate-500">L’âge est apprécié au 31 décembre 2026.</span></label>
        <label className="flex min-h-12 items-center gap-3 text-sm font-semibold text-slate-700"><input type="checkbox" checked={salaried} onChange={(event) => setSalaried(event.target.checked)} className="h-5 w-5 shrink-0 accent-[#1E6B87]" />Je suis également salarié</label>
        {salaried ? <AmountField label="Total annuel des cotisations pension versées via votre emploi salarié" value={salaryDeposits} onChange={setSalaryDeposits} help="Indiquez les cotisations retraite éligibles versées par vous et votre employeur pendant l’année fiscale, hors composantes non admissibles. Consultez vos fiches de paie ou attestations de pension. Saisissez les תגמולים salarié et employeur, sans ajouter automatiquement les פיצויים, une Keren Hishtalmut ou des primes d’assurance séparées. Faites vérifier une attestation non ventilée." /> : null}
        <AmountField label="Cotisations pension déjà versées comme indépendant (₪/an)" value={independentDeposits} onChange={setIndependentDeposits} help="Uniquement vos versements pension indépendants admissibles de 2026. N’y ajoutez pas les versements salariés déjà saisis." />
        <details className="border-t border-line pt-4 text-sm text-slate-700"><summary className="cursor-pointer font-semibold">Fermeture, reprise ou changement de résidence</summary><label className="mt-3 flex items-start gap-3 leading-6"><input type="checkbox" checked={exceptionalYear} onChange={(event) => setExceptionalYear(event.target.checked)} className="mt-1 h-5 w-5 shrink-0 accent-[#1E6B87]" />Mon entreprise a été fermée ou réouverte, ou ma résidence fiscale a changé en 2026.</label></details>
        <div className="flex flex-wrap gap-3"><button type="button" onClick={() => reset(false)} className="inline-flex min-h-11 items-center gap-2 rounded-md border border-line px-3 text-sm font-semibold text-teal"><RotateCcw size={16} aria-hidden />Réinitialiser</button><button type="button" onClick={() => reset(true)} className="min-h-11 rounded-md border border-line px-3 text-sm font-semibold text-teal">Exemple illustratif</button></div>
      </div>
      <div className="grid min-w-0 gap-6">
        <div className="min-w-0 rounded-md border border-sky/40 bg-mint p-5 sm:p-6" aria-live="polite" aria-atomic="true">
          <h2 className="text-lg font-semibold text-ink">Votre Pensia Hova estimée</h2><p className="mt-2 text-sm font-semibold text-teal">{status}</p>
          <dl className="mt-5 grid gap-5 sm:grid-cols-2"><div><dt className="text-sm text-slate-600">Obligation annuelle avant versements</dt><dd className="mt-2 break-words text-2xl font-semibold text-ink">{result.annualObligation === null ? "À vérifier" : money(result.annualObligation)}</dd></div><div><dt className="text-sm text-slate-600">Reste à déposer</dt><dd className="mt-2 break-words text-2xl font-semibold text-ink">{result.remaining === null ? "À vérifier" : money(result.remaining)}</dd></div></dl>
          {result.monthlyPlanning !== null ? <p className="mt-4 text-sm leading-7 text-slate-600">Équivalent mensuel de planification : {money(result.monthlyPlanning)}. Ce n’est pas une échéance mensuelle personnalisée.</p> : null}
        </div>
        <section><h2 className="text-lg font-semibold text-ink">Pourquoi ce résultat ?</h2><ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-slate-600">{result.reasons.map((reason) => <li key={reason}>{reason}</li>)}</ul></section>
        {result.valid && !result.requiresReview ? <>
          <section className="min-w-0 border-y border-line py-5"><h2 className="text-lg font-semibold text-ink">Détail du calcul</h2>
            <div className="mt-4 overflow-x-auto"><table className="w-full text-left text-xs sm:text-sm"><caption className="sr-only">Barème annuel sur le bénéfice professionnel éligible, avant exemptions</caption><thead><tr className="border-b border-line"><th scope="col" className="py-3 pr-3">Tranche</th><th scope="col" className="px-2">Bénéfice éligible</th><th scope="col" className="px-2">Taux</th><th scope="col" className="pl-2 text-right">Cotisation annuelle</th></tr></thead><tbody>{[["Première", result.firstBase, "4,45 %", result.firstContribution], ["Deuxième", result.secondBase, "12,55 %", result.secondContribution]].map(([label, base, rate, contribution]) => <tr key={label} className="border-b border-line"><th scope="row" className="py-3 pr-3 font-medium">{label}</th><td className="px-2">{money(base as number)}</td><td className="whitespace-nowrap px-2">{rate}</td><td className="pl-2 text-right">{money(contribution as number, 5)}</td></tr>)}</tbody><tfoot><tr><th scope="row" colSpan={3} className="pt-3">Total du barème avant exemption</th><td className="pt-3 text-right font-semibold">{money(result.bracketTotal, 5)}</td></tr><tr><th scope="row" colSpan={3} className="pt-3">Obligation annuelle après exemption</th><td className="pt-3 text-right font-semibold">{money(result.annualObligation!)}</td></tr></tfoot></table></div>
            <p className="mt-3 text-xs leading-6 text-slate-500">Détail des cotisations à cinq décimales ; synthèse arrondie au centime uniquement à l’affichage. Aucun arrondi intermédiaire.</p>
          </section>
          <section><h2 className="text-lg font-semibold text-ink">Versements déjà effectués</h2><dl className="mt-4 grid grid-cols-[minmax(0,1fr)_auto] gap-x-3 gap-y-3 text-sm leading-6 text-slate-600">
            <dt>Pension indépendante versée</dt><dd>{money(result.independentDeposits)}</dd><dt>Pension salariée admissible versée</dt><dd>{money(result.salariedDeposits)}</dd><dt>Total des versements saisis</dt><dd>{money(result.totalDeposits)}</dd><dt>Couverture par les versements salariés</dt><dd>{money(result.salaryOffset)}</dd><dt>Obligation indépendante après coordination</dt><dd>{money(result.independentRequirement!)}</dd><dt>Total couvert, limité à l’obligation</dt><dd>{money(result.totalCovered)}</dd><dt className="font-semibold text-ink">Reste à déposer</dt><dd className="font-semibold text-ink">{money(result.remaining!)}</dd><dt>Versements au-delà du minimum</dt><dd>{money(result.excessDeposits!)}</dd></dl><p className="mt-3 text-xs leading-6 text-slate-500">Un excédent n’est pas un remboursement ni une autorisation de retrait.</p></section>
        </> : null}
        <section><h2 className="text-lg font-semibold text-ink">Barèmes 2026 utilisés</h2><dl className="mt-4 grid grid-cols-[minmax(0,1fr)_auto] gap-x-3 gap-y-2 text-sm leading-6 text-slate-600"><dt>Salaire moyen mensuel</dt><dd>{money(c.averageMonthlySalary)}</dd><dt>Première tranche annuelle · 4,45 %</dt><dd>{money(c.firstThreshold)}</dd><dt>Plafond annuel · deuxième tranche à 12,55 %</dt><dd>{money(c.secondThreshold)}</dd><dt>Maximum annuel obligatoire standard</dt><dd>{money(c.maximumAnnualContribution)}</dd></dl></section>
        {result.warnings.length ? <DisclaimerBox><ul className="list-disc space-y-2 pl-4">{result.warnings.map((warning) => <li key={warning}>{warning}</li>)}</ul></DisclaimerBox> : null}
        <section><h2 className="text-lg font-semibold text-ink">Ce que le calcul ne couvre pas</h2><ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-slate-600"><li>Fermeture, réouverture, changement de résidence et exceptions d’année partielle non vérifiées.</li><li>Optimisation fiscale personnelle, Keren Hishtalmut, déductions et crédits au-delà du minimum obligatoire.</li><li>Qualité de la couverture retraite, décès ou invalidité et adéquation du produit pension.</li><li>Composantes de versements non identifiées et régularisations d’autres années.</li></ul></section>
        <section><h2 className="text-lg font-semibold text-ink">Sources et règles</h2><ul className="mt-3 space-y-2 text-sm leading-7 text-teal">{pensiaHovaSources.map((source) => <li key={source.url}><a href={source.url} target="_blank" rel="noreferrer" className="underline underline-offset-4">{source.label}</a></li>)}</ul></section>
        <div className="min-w-0 [&_a]:max-w-full [&_a]:whitespace-normal [&_a]:text-center"><WhatsAppResultButton message={message} label="Faire vérifier ma Pensia Hova" /></div>
      </div>
    </div>
  </CalculatorShell>;
}
