"use client";

import { useState } from "react";
import { Printer, RotateCcw } from "lucide-react";
import Link from "next/link";
import { parseBituahAmount } from "@/lib/tax/bituahLeumi";
import { calculateOleHadashExemption, OLE_EXEMPTION_CAPS, type OleExemptionInput } from "@/lib/tax/oleHadashExemption";
import { getOleExemptionArrivalContext, oleExemptionIntroduction, oleExemptionAssumptions } from "@/lib/tax/oleHadashExemptionUi";
import { oleExemptionAdministration, oleExemptionScope, oleExemptionSources } from "@/lib/tax/oleHadashExemptionSources";
import { CalculatorShell, WhatsAppResultButton } from "./CalculatorUi";

const money = (value: number | null) => value === null ? "À vérifier" : `${new Intl.NumberFormat("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value)} ₪`;
const inputClass = "min-h-12 min-w-0 w-full rounded-md border border-line bg-white px-3 text-base text-ink outline-none focus-visible:ring-2 focus-visible:ring-sky";
const actionClass = "inline-flex min-h-11 items-center gap-2 rounded-md border border-line px-3 text-sm font-semibold text-teal";

function AmountField({ label, value, onChange, help }: { label: string; value: string; onChange: (value: string) => void; help: string }) {
  const invalid = parseBituahAmount(value) === null;
  return <label className="grid min-w-0 gap-2 text-sm text-slate-700">
    <span className="font-semibold">{label}</span>
    <input type="text" inputMode="decimal" value={value} onChange={(event) => onChange(event.target.value)} aria-invalid={invalid} className={inputClass} />
    <span className="text-xs leading-6 text-slate-500">{help}</span>
    {invalid ? <span className="text-xs text-red-700">Saisissez un montant positif ou nul en ILS.</span> : null}
  </label>;
}

export function OleHadashExemptionCalculator() {
  const [aliyahDate, setAliyahDate] = useState("");
  const [year, setYear] = useState(2026);
  const [income, setIncome] = useState("");
  const [relatedEnabled, setRelatedEnabled] = useState(false);
  const [related, setRelated] = useState("0");
  const [relatedSource, setRelatedSource] = useState<OleExemptionInput["relatedSource"]>("unsure");
  const arrivalContext = getOleExemptionArrivalContext(aliyahDate);
  // Standard scenario assumptions, not verified legal facts; disclosed under Limites du calculateur.
  const result = calculateOleHadashExemption({
    status: "ole", residencyDate: aliyahDate, fiscalYear: year, annualIncome: parseBituahAmount(income) ?? NaN,
    relatedIncome: relatedEnabled ? parseBituahAmount(related) ?? NaN : 0,
    relatedSource: relatedEnabled ? relatedSource : "none", incomeKind: "personal", incomePeriod: "resident"
  });
  const reset = (example: boolean) => {
    setAliyahDate(example ? "2026-06-15" : ""); setYear(2026);
    setIncome(example ? "400000" : ""); setRelatedEnabled(false); setRelated("0");
    setRelatedSource("unsure");
  };
  const resultTitle = result.status === "estimate" ? "Estimation sous conditions" : result.status === "review" ? "Situation à vérifier" : "Informations à compléter";
  const outsideArrivalWindow = arrivalContext === "before" || arrivalContext === "after";
  const details = [
    ["Revenu annuel total saisi", result.annualIncome],
    ["Dont revenu hors proches", result.ordinaryIncome],
    ...(relatedEnabled ? [["Dont revenu de proches saisi", result.relatedIncome]] : []),
    ["Plafond général applicable sous conditions", result.generalCap],
    ...(relatedEnabled ? [["Plafond des revenus de proches sous conditions", result.relatedCap]] : []),
    ["Revenu potentiellement exonéré", result.exemptIncome],
    ["Revenu restant hors de cette exonération", result.remainingIncome]
  ] as Array<[string, number | null]>;

  return <CalculatorShell title="Calculateur d’exonération fiscale — Alyah 2026" subtitle={<span className="whitespace-pre-line">{oleExemptionIntroduction}</span>} eyebrow="Réforme 2026–2030">
    <div className="grid min-w-0 gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-start">
      <div className="grid min-w-0 gap-5 rounded-md border border-line bg-white p-5 sm:p-6">
        <label className="grid min-w-0 gap-2 text-sm text-slate-700">
          <span className="font-semibold">Date de votre Alyah en Israël</span>
          <input type="date" value={aliyahDate} onChange={(event) => setAliyahDate(event.target.value)} className={inputClass} />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-slate-700">Année fiscale
          <select className={inputClass} value={year} onChange={(event) => setYear(Number(event.target.value))}>{Object.keys(OLE_EXEMPTION_CAPS).map((value) => <option key={value} value={value}>{value}</option>)}</select>
        </label>
        <AmountField label="Revenus professionnels annuels en Israël (₪)" value={income} onChange={setIncome} help="Salaires ou bénéfice après dépenses déductibles, pendant votre résidence. Pas le chiffre d’affaires ni les dividendes. Incluez l’éventuelle part payée par un proche." />
        <details className="border-t border-line pt-4 text-sm text-slate-700">
          <summary className="cursor-pointer font-semibold leading-6">Une partie de mes revenus provient d’un proche (<span lang="he" dir="rtl">קרוב</span>)</summary>
          <p className="mt-3 text-xs leading-6 text-slate-500">Un revenu de קרוב peut avoir un plafond plus bas. Le lien familial ou avec la société doit être vérifié.</p>
          <label className="mt-3 flex min-h-11 items-center gap-3"><input type="checkbox" checked={relatedEnabled} onChange={(event) => setRelatedEnabled(event.target.checked)} className="h-5 w-5 shrink-0 accent-[#1E6B87]" />Inclure une part payée par un proche</label>
          {relatedEnabled ? <div className="mt-4 grid gap-4">
            <AmountField label="Part de ce total payée par un proche (₪)" value={related} onChange={setRelated} help="Cette somme est déjà incluse dans le revenu annuel saisi ; elle ne s’ajoute pas une seconde fois." />
            <label className="grid gap-2 font-semibold">Quel est le lien avec le payeur ?<select className={inputClass} value={relatedSource} onChange={(event) => setRelatedSource(event.target.value as OleExemptionInput["relatedSource"])}><option value="unsure">Autre lien / je ne sais pas</option><option value="family">Conjoint, parent, enfant, frère ou sœur</option><option value="company">Société que je détiens ou liée à ma famille</option></select></label>
            <p className="text-xs leading-6 text-slate-500">Connaître le client ne suffit pas à en faire un קרוב. Votre propre société nécessite une vérification spécifique.</p>
          </div> : null}
        </details>
        <div className="flex flex-wrap gap-3 print:hidden"><button type="button" onClick={() => reset(false)} className={actionClass}><RotateCcw size={16} aria-hidden />Réinitialiser</button><button type="button" onClick={() => reset(true)} className={actionClass}>Exemple du 15 juin 2026</button></div>
      </div>
      <div className="grid min-w-0 gap-6">
        <div className="min-w-0 rounded-md border border-sky/40 bg-mint p-5 print:break-inside-avoid sm:p-6" aria-live="polite" aria-atomic="true">
          <h2 className="text-lg font-semibold text-ink">Votre estimation</h2><p className="mt-2 text-sm font-semibold text-teal">{resultTitle}</p>
          <dl className="mt-5 grid gap-5 sm:grid-cols-2"><div><dt className="text-sm text-slate-600">Revenu potentiellement exonéré</dt><dd className="mt-2 break-words text-2xl font-semibold text-ink">{money(result.exemptIncome)}</dd></div><div><dt className="text-sm text-slate-600">Revenu restant hors de cette exonération</dt><dd className="mt-2 break-words text-2xl font-semibold text-ink">{money(result.remainingIncome)}</dd></div></dl>
          <p className="mt-4 text-sm leading-7 text-slate-600">Ces montants ne représentent ni l’impôt à payer ni une économie de Mass Hachnassa. Aucun droit définitif n’est affirmé.</p>
        </div>
        {outsideArrivalWindow ? <p className="text-sm leading-7 text-slate-600">Cette exonération temporaire ne couvre pas la date d’Alyah saisie dans le scénario standard. Cela ne supprime pas vos droits éventuels aux points de crédit. Si votre résidence fiscale a commencé à une autre date, faites vérifier votre situation. <Link href="/fr/calculateurs/ole-hadash-nekoudot-zikouy" className="font-semibold text-teal underline underline-offset-4">Calculer mes Nekoudot Zikouy Olé Hadash</Link></p> : null}
        {arrivalContext === "review" || result.window === "extension" ? <p className="text-sm leading-7 text-slate-600">Du 1er janvier au 10 février 2027, la page de demande de l’Autorité fiscale indique une extension, contrairement à la date de fin 2026 du texte initial. Les modalités restent à confirmer par un professionnel. <Link href="/fr/calculateurs/ole-hadash-nekoudot-zikouy" className="font-semibold text-teal underline underline-offset-4">Voir mes Nekoudot Zikouy</Link> ou <Link href="/fr/contact" className="font-semibold text-teal underline underline-offset-4">demander une vérification personnalisée</Link>.</p> : null}
        {result.status === "review" && result.window === "statutory" ? <p className="text-sm leading-7 text-slate-600">Votre situation nécessite une vérification personnalisée. Les précisions figurent ci-dessous.</p> : null}
        {result.status !== "invalid" ? <section className="min-w-0 border-y border-line py-5 print:break-inside-avoid"><h2 className="text-lg font-semibold text-ink">Détail du calcul</h2>
          <div className="mt-4 overflow-x-auto"><table className="w-full text-left text-sm"><caption className="sr-only">Revenu et plafonds conditionnels pour {year}</caption><tbody>{details.map(([label, value]) => <tr key={label} className="border-b border-line"><th scope="row" className="py-3 pr-3 font-medium leading-6 text-slate-600">{label}</th><td className="min-w-28 py-3 text-right font-semibold text-ink">{money(value)}</td></tr>)}</tbody></table></div>
          {result.status === "review" && result.conditionalMaximum !== null ? <p className="mt-3 text-xs leading-6 text-slate-500">Illustration mathématique uniquement, si toutes les qualifications sont confirmées : borne combinée de {money(result.conditionalMaximum)}. Ce n’est pas un droit validé ni une répartition fiscale entre payeurs.</p> : null}
          <p className="mt-3 text-xs leading-6 text-slate-500">Calculs internes sans arrondi intermédiaire ; affichage au centime. Le plafond de proches reste à l’intérieur du plafond général. Aucun report de plafond non utilisé.</p>
        </section> : null}
        {result.status === "estimate" && year === 2026 ? <p className="text-xs leading-6 text-slate-500">Plafond 2026 : {result.days2026} jours de résidence sur 365.</p> : null}
      </div>
    </div>
    <div className="mt-12 grid gap-8 border-t border-line pt-8">
      <section className="print:break-inside-avoid"><h2 className="text-xl font-semibold text-ink">Limites du calculateur</h2><p className="mt-3 text-sm leading-7 text-slate-600">{oleExemptionAssumptions}</p></section>
      <p className="text-sm leading-7 text-slate-600">Le scénario standard suppose la catégorie Olé Hadash ; cette hypothèse ne prouve pas votre éligibilité légale.</p>
      <p className="text-sm leading-7 text-slate-600">Vous êtes Toshav Hozer Vatik (<span lang="he" dir="rtl">תושב חוזר ותיק</span>) ? Cette réforme peut également vous concerner, sous certaines conditions. <Link href="/fr/contact" className="font-semibold text-teal underline underline-offset-4">Contactez-moi pour vérifier votre éligibilité.</Link></p>
      <section className="border-b border-line pb-6 print:break-inside-avoid"><h2 className="text-xl font-semibold text-ink">{"Cette exonération s'ajoute aux Nekoudot Zikouy des Olim Hadashim"}</h2><p className="mt-3 text-sm leading-7 text-slate-600">{"En plus de cette exonération, vous pouvez bénéficier des points de crédit d'impôt accordés aux Olim Hadashim. Ces points peuvent réduire l'impôt restant à payer, selon votre situation."}</p><Link href="/fr/calculateurs/ole-hadash-nekoudot-zikouy" className="mt-3 inline-block text-sm font-semibold text-teal underline underline-offset-4">Calculer mes Nekoudot Zikouy Olé Hadash</Link></section>
      <section><h2 className="text-xl font-semibold text-ink">Quels revenus sont concernés ?</h2><ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-7 text-slate-600">{oleExemptionScope.map((text) => <li key={text}>{text}</li>)}</ul></section>
      <details className="border-t border-line pt-5 print:break-inside-avoid"><summary className="cursor-pointer text-base font-semibold text-ink">Plafonds, démarches et précisions</summary><div className="mt-4 space-y-4 text-sm leading-7 text-slate-600"><p>Plafonds annuels : {Object.entries(OLE_EXEMPTION_CAPS).map(([capYear, cap]) => `${capYear} : ${money(cap)}`).join(" ; ")}. En 2026, le plafond est proratisé aux jours de résidence sur 365. Pour קרוב : 140 000 ₪ en 2026–2029, proratisés en 2026 ; plafond général en 2030.</p>{oleExemptionAdministration.map((text) => <p key={text}>{text}</p>)}<ul className="list-disc space-y-2 pl-5">{result.reasons.filter((reason) => !reason.includes("Teoudat") && !reason.includes("article 38")).map((reason) => <li key={reason}>{reason}</li>)}</ul><p>La perte de résidence en 2028 ou 2029 peut remettre en cause l’avantage selon les conditions de l’article 4. L’exonération ne dispense pas automatiquement de Bitouah Leumi, d’assurance santé, de TVA ou de Pensia Hova.</p></div></details>
      {arrivalContext !== "review" && result.window !== "extension" ? <p className="text-xs leading-6 text-slate-500">Une extension potentielle du 1er janvier au 10 février 2027 est indiquée par le service de l’Autorité fiscale ; ses modalités restent soumises à confirmation juridique.</p> : null}
      <section><h2 className="text-xl font-semibold text-ink">Sources et guide</h2><p className="mt-3 text-sm text-slate-500">Vérification documentaire : 26 octobre 2026.</p><ul className="mt-4 space-y-3 text-sm leading-7 text-teal">{oleExemptionSources.map((source) => <li key={source.url}><a href={source.url} target="_blank" rel="noreferrer" className="underline underline-offset-4">{source.label}</a></li>)}</ul><Link href="/fr/guides/reforme-fiscale-olim-hadashim-2026" className="mt-5 inline-block text-sm font-semibold text-teal underline underline-offset-4">Lire le guide de la réforme fiscale Olim Hadashim 2026</Link></section>
      <div className="flex flex-wrap items-center gap-4 print:hidden [&_a]:max-w-full [&_a]:whitespace-normal [&_a]:text-center"><button type="button" onClick={() => window.print()} className={actionClass}><Printer size={16} aria-hidden />Imprimer</button><WhatsAppResultButton message={`Bonjour Eliezer, je souhaite faire vérifier ma situation concernant l’exonération Olé Hadash pour l’année ${year}.`} label="Faire vérifier ma situation" /></div>
    </div>
  </CalculatorShell>;
}
