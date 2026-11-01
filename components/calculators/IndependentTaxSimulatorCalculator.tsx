"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { calculateIndependentTaxSimulator2026 } from "@/lib/tax/independentTaxSimulator2026";
import { parseBituahAmount } from "@/lib/tax/bituahLeumi";
import { CalculatorShell, DisclaimerBox, ResultCard, WhatsAppResultButton } from "./CalculatorUi";

const money = (value: number | null | undefined) => value == null
  ? "À vérifier"
  : `${new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 0 }).format(value)} ₪`;
const preciseMoney = (value: number | null | undefined) => value == null
  ? "À vérifier"
  : `${new Intl.NumberFormat("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value)} ₪`;
const fieldClass = "min-h-12 min-w-0 w-full rounded-md border border-line bg-white px-3 text-base text-ink outline-none focus-visible:ring-2 focus-visible:ring-sky";

function parse(raw: string) {
  return raw.trim() ? parseBituahAmount(raw) : null;
}

function AmountField({ label, value, onChange, help, allowBlank = false }: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  help?: string;
  allowBlank?: boolean;
}) {
  const parsed = parse(value);
  return <label className="grid min-w-0 gap-2 text-sm text-slate-700">
    <span className="font-semibold leading-6">{label}</span>
    <input type="text" inputMode="decimal" value={value} onChange={(event) => onChange(event.target.value)} aria-invalid={!allowBlank && parsed === null} className={fieldClass} />
    {help ? <span className="text-xs leading-5 text-slate-500">{help}</span> : null}
    {!allowBlank && parsed === null ? <span className="text-xs text-red-700">Saisissez un montant positif ou nul.</span> : null}
  </label>;
}

function CheckField({ label, checked, onChange, help }: { label: string; checked: boolean; onChange: (checked: boolean) => void; help?: string }) {
  return <label className="flex min-w-0 items-start gap-3 text-sm leading-6 text-slate-700">
    <input type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)} className="mt-1 h-5 w-5 shrink-0 accent-[#1E6B87]" />
    <span>{label}{help ? <span className="mt-1 block text-xs leading-5 text-slate-500">{help}</span> : null}</span>
  </label>;
}

export function IndependentTaxSimulatorCalculator() {
  const [businessRegime, setBusinessRegime] = useState<"classic" | "esekZair">("classic");
  const [turnover, setTurnover] = useState("100000");
  const [profit, setProfit] = useState("100000");
  const [weeklyHours, setWeeklyHours] = useState("20");
  const [isSalaried, setIsSalaried] = useState(false);
  const [monthlySalary, setMonthlySalary] = useState("");
  const [salariedMonths, setSalariedMonths] = useState("12");
  const [salaryPatternRequiresReview, setSalaryPatternRequiresReview] = useState(false);
  const [parentProfile, setParentProfile] = useState<"father" | "mother">("father");
  const [hasChildren, setHasChildren] = useState(false);
  const [childrenCount, setChildrenCount] = useState("1");
  const [childrenBirthYears, setChildrenBirthYears] = useState(["2023"]);
  const [specialFamilySituation, setSpecialFamilySituation] = useState(false);
  const [fullYearIsraeliResident, setFullYearIsraeliResident] = useState(true);
  const [hasAlyah, setHasAlyah] = useState(false);
  const [aliyahDate, setAliyahDate] = useState("");
  const [oleRelatedIncome, setOleRelatedIncome] = useState("");
  const [oleRelatedSource, setOleRelatedSource] = useState<"none" | "family" | "company" | "unsure">("none");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [businessCreationDate, setBusinessCreationDate] = useState("");
  const [independentDeposits, setIndependentDeposits] = useState("");
  const [depositStatus, setDepositStatus] = useState<"unknown" | "none" | "some">("unknown");
  const [salariedDeposits, setSalariedDeposits] = useState("");
  const [confirmedRestriction, setConfirmedRestriction] = useState(false);
  const [trackActualExpenses, setTrackActualExpenses] = useState(false);
  const [actualExpenses, setActualExpenses] = useState("");

  const parsedChildren = useMemo(() => hasChildren
    ? childrenBirthYears.slice(0, Math.min(12, Math.max(0, Number(childrenCount)))).map((year) => year.trim() ? Number(year) : NaN)
    : [], [childrenBirthYears, childrenCount, hasChildren]);
  const result = calculateIndependentTaxSimulator2026({
    businessRegime,
    annualTurnover: parse(turnover) ?? NaN,
    annualProfit: parse(profit) ?? NaN,
    confirmedEsekZairRestriction: confirmedRestriction,
    weeklyHours: parse(weeklyHours) ?? NaN,
    isSalaried,
    monthlySalary: isSalaried ? parse(monthlySalary) ?? NaN : 0,
    salariedMonths: isSalaried ? Number(salariedMonths) : 0,
    salaryPatternRequiresReview,
    parentProfile,
    childrenBirthYears: parsedChildren,
    specialFamilySituation,
    fullYearIsraeliResident,
    hasAlyah,
    aliyahDate,
    dateOfBirth,
    businessCreationDate,
    independentPensionDeposits: depositStatus === "unknown" ? null : depositStatus === "none" ? 0 : parse(independentDeposits),
    salariedPensionDeposits: isSalaried ? parse(salariedDeposits) : 0,
    oleRelatedIncome: parse(oleRelatedIncome) ?? 0,
    oleRelatedSource,
    actualCashExpenses: trackActualExpenses ? parse(actualExpenses) : null
  });
  const regimeIncome = result.businessIncomeForIncomeTax;
  const pension = result.pension;
  const eligiblePension = result.pensionStatus === "estimate" && pension?.valid && !pension.requiresReview;
  const routeClassic = "/fr/calculateurs/bituah-leumi-independant";
  const message = "Bonjour, je souhaite faire vérifier ma simulation fiscale intégrée 2026 pour activité indépendante. Je transmettrai les éléments nécessaires après échange.";

  return <CalculatorShell
    title="Simulateur fiscal complet pour indépendants en Israël — 2026"
    eyebrow="Année fiscale 2026"
    subtitle="Estimez votre Mass Hachnassa, votre Bitouah Leumi, votre Pensia Hova et votre revenu disponible."
  >
    <div className="grid min-w-0 items-start gap-6 lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)]">
      <form className="grid min-w-0 gap-5 rounded-md border border-line bg-white p-5 sm:p-6" onSubmit={(event) => event.preventDefault()}>
        <section className="grid gap-4">
          <h2 className="text-lg font-semibold text-ink">A. Mon activité</h2>
          <label className="grid min-w-0 gap-2 text-sm text-slate-700">
            <span className="font-semibold">Êtes-vous au régime Esek Zair (<bdi lang="he" dir="rtl">עסק זעיר</bdi>) ?</span>
            <select className={fieldClass} value={businessRegime} onChange={(event) => setBusinessRegime(event.target.value as "classic" | "esekZair")}>
              <option value="classic">Non — régime classique</option><option value="esekZair">Oui — régime Esek Zair</option>
            </select>
            <span className="text-xs leading-5 text-slate-500">Esek Zair est un régime d’impôt sur le revenu, distinct du statut de TVA Esek Patur (<bdi lang="he" dir="rtl">עוסק פטור</bdi>).</span>
          </label>
          {businessRegime === "esekZair" ? <>
            <AmountField label="Votre chiffre d’affaires annuel hors TVA (₪)" value={turnover} onChange={setTurnover} help="Plafond publié 2026 : 122 833 ₪. Le forfait de 30 % s’applique au calcul fiscal, pas nécessairement à vos sorties d’argent réelles." />
            {parse(turnover) !== null && parse(turnover)! > 122833 ? <div className="rounded-md border border-red-300 bg-red-50 p-4 text-sm leading-6 text-red-900" role="alert">
              Le chiffre d’affaires dépasse le plafond 2026. Le forfait Esek Zair n’est pas appliqué. Saisissez votre bénéfice après dépenses dans le <Link className="font-semibold underline" href={routeClassic}>calculateur classique indépendant</Link>.
            </div> : null}
            <details className="border-t border-line pt-3 text-sm text-slate-700"><summary className="cursor-pointer font-semibold text-teal">Restrictions Esek Zair à vérifier</summary>
              <p className="mt-3 leading-6">Certaines situations, notamment l’emploi de salariés, des revenus versés par un employeur ou un proche, ou le contrôle d’une société, peuvent exclure le régime.</p>
              <CheckField label="Une restriction connue peut s’appliquer à ma situation" checked={confirmedRestriction} onChange={setConfirmedRestriction} />
            </details>
          </> : <AmountField label="Votre bénéfice professionnel annuel après dépenses (₪)" value={profit} onChange={setProfit} help="Votre chiffre d’affaires moins vos dépenses professionnelles déductibles." />}
          <AmountField label="Heures de travail par semaine dans votre activité indépendante" value={weeklyHours} onChange={setWeeklyHours} help="La définition Bitouah Leumi dépend à la fois du temps de travail et du revenu." />
        </section>

        <section className="grid gap-4 border-t border-line pt-5">
          <h2 className="text-lg font-semibold text-ink">B. Ma situation personnelle</h2>
          <label className="grid min-w-0 gap-2 text-sm text-slate-700"><span className="font-semibold">Votre situation</span><select className={fieldClass} value={parentProfile} onChange={(event) => setParentProfile(event.target.value as "father" | "mother")}><option value="father">Homme</option><option value="mother">Femme</option></select></label>
          <CheckField label="Je suis résident fiscal israélien pendant toute l’année 2026" checked={fullYearIsraeliResident} onChange={setFullYearIsraeliResident} help="Décochez si vous êtes devenu résident en cours d’année; les points de base et enfants seront alors laissés à vérifier." />
          <CheckField label="J’ai des enfants" checked={hasChildren} onChange={setHasChildren} />
          {hasChildren ? <div className="grid gap-3 rounded-md bg-paper p-4">
            <label className="grid gap-2 text-sm text-slate-700"><span className="font-semibold">Nombre d’enfants</span><input className={fieldClass} type="number" min="1" max="12" step="1" value={childrenCount} onChange={(event) => {
              setChildrenCount(event.target.value);
              const count = Math.min(12, Math.max(0, Number(event.target.value) || 0));
              setChildrenBirthYears((current) => Array.from({ length: count }, (_, index) => current[index] ?? ""));
            }} /></label>
            {parsedChildren.map((_, index) => <label key={index} className="grid gap-2 text-sm text-slate-700"><span className="font-semibold">Année de naissance · enfant {index + 1}</span><input className={fieldClass} type="number" min="2001" max="2026" step="1" value={childrenBirthYears[index] ?? ""} onChange={(event) => setChildrenBirthYears((current) => current.map((year, i) => i === index ? event.target.value : year))} /></label>)}
            <CheckField label="Garde partagée, parent isolé ou situation familiale particulière" checked={specialFamilySituation} onChange={setSpecialFamilySituation} help="Les points enfants standard ne seront pas appliqués automatiquement." />
          </div> : null}
          <CheckField label="J’ai fait mon Alyah" checked={hasAlyah} onChange={setHasAlyah} />
          {hasAlyah ? <label className="grid min-w-0 gap-2 text-sm text-slate-700"><span className="font-semibold">Date d’Alyah</span><input className={fieldClass} type="date" max="2026-12-31" value={aliyahDate} onChange={(event) => setAliyahDate(event.target.value)} /><span className="text-xs leading-5 text-slate-500">Utilisée comme repère pour les points olé et l’examen indicatif de l’exonération 2026.</span></label> : null}
          {hasAlyah ? <details className="border-t border-line pt-3 text-sm text-slate-700"><summary className="cursor-pointer font-semibold text-teal">Revenus professionnels provenant d’un proche ou d’une société (facultatif)</summary>
            <div className="mt-3 grid gap-3"><AmountField label="Part des revenus professionnels incluse ci-dessus (₪)" value={oleRelatedIncome} onChange={setOleRelatedIncome} allowBlank help="Il s’agit d’une partie du revenu déjà saisi, pas d’un montant à ajouter." />
              <label className="grid gap-2"><span className="font-semibold">Origine du revenu lié</span><select className={fieldClass} value={oleRelatedSource} onChange={(event) => setOleRelatedSource(event.target.value as typeof oleRelatedSource)}><option value="none">Aucun revenu lié</option><option value="family">Proche / membre de la famille</option><option value="company">Société ou qualification à vérifier</option><option value="unsure">Je ne sais pas</option></select></label>
            </div>
          </details> : null}
        </section>

        <section className="grid gap-4 border-t border-line pt-5">
          <h2 className="text-lg font-semibold text-ink">C. Mes autres revenus / salarié</h2>
          <CheckField label="Je suis également salarié" checked={isSalaried} onChange={setIsSalaried} />
          {isSalaried ? <div className="grid gap-4 rounded-md bg-paper p-4">
            <AmountField label="Salaire brut mensuel (₪)" value={monthlySalary} onChange={setMonthlySalary} />
            <label className="grid gap-2 text-sm text-slate-700"><span className="font-semibold">Nombre de mois salariés en 2026</span><input className={fieldClass} type="number" min="1" max="12" step="1" value={salariedMonths} onChange={(event) => setSalariedMonths(event.target.value)} /><span className="text-xs leading-5 text-slate-500">Pour les cotisations sociales, une coordination précise exige la répartition mensuelle du salaire; moins de 12 mois suspend l’estimation Bitouah Leumi.</span></label>
            <CheckField label="Salaire variable, plusieurs employeurs ou coordination atypique" checked={salaryPatternRequiresReview} onChange={setSalaryPatternRequiresReview} help="L’impôt annuel reste estimé sur le total saisi; les cotisations sociales sont laissées à vérifier." />
          </div> : null}
        </section>

        <section className="grid gap-3 border-t border-line pt-5"><h2 className="text-lg font-semibold text-ink">Ma retraite</h2>
          <label className="grid gap-2 text-sm text-slate-700"><span className="font-semibold">Date de naissance</span><input className={fieldClass} type="date" max="2026-12-31" value={dateOfBirth} onChange={(event) => setDateOfBirth(event.target.value)} /></label>
          <label className="grid gap-2 text-sm text-slate-700"><span className="font-semibold">Date de création de votre activité</span><input className={fieldClass} type="date" max="2026-12-31" value={businessCreationDate} onChange={(event) => setBusinessCreationDate(event.target.value)} /></label>
          <label className="grid gap-2 text-sm text-slate-700"><span className="font-semibold">Versements pension indépendants déjà effectués</span><select className={fieldClass} value={depositStatus} onChange={(event) => setDepositStatus(event.target.value as typeof depositStatus)}><option value="unknown">Je ne sais pas</option><option value="none">Aucun versement</option><option value="some">J’ai déjà versé</option></select></label>
          {depositStatus === "some" ? <AmountField label="Montant annuel versé (₪)" value={independentDeposits} onChange={setIndependentDeposits} /> : null}
          {isSalaried ? <AmountField label="Versements pension admissibles via l’emploi salarié (₪/an)" value={salariedDeposits} onChange={setSalariedDeposits} help="Parts salarié et employeur justifiées; n’y ajoutez pas automatiquement les indemnités." /> : null}
        </section>
        <details className="border-t border-line pt-5">
          <summary className="cursor-pointer text-lg font-semibold text-ink">D. Paramètres complémentaires</summary>
          <div className="mt-4 grid gap-4">
            <p className="text-xs leading-5 text-slate-500">Les paramètres techniques de calcul sont présentés dans le détail des résultats.</p>
          </div>
        </details>
      </form>

      <section aria-label="Résultats du simulateur fiscal" aria-live="polite" aria-atomic="true" className="simulator-results grid min-w-0 gap-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-3"><h2 className="text-xl font-semibold text-ink">E. Résultats 2026</h2><span className="rounded-md bg-mint px-3 py-2 text-sm font-semibold text-teal">{result.status === "estimate" ? "Estimation indicative" : "À vérifier"}</span></div>
        {result.warnings.length ? <div className="grid gap-2">{result.warnings.slice(0, 3).map((warning) => <DisclaimerBox key={warning}>{warning}</DisclaimerBox>)}{result.warnings.length > 3 ? <details className="text-sm text-slate-600"><summary className="cursor-pointer font-semibold text-teal">Voir les autres hypothèses ({result.warnings.length - 3})</summary><ul className="mt-2 list-disc space-y-2 pl-5">{result.warnings.slice(3).map((warning) => <li key={warning}>{warning}</li>)}</ul></details> : null}</div> : null}
        <ResultCard title="A. Revenu professionnel retenu" value={money(regimeIncome)} tone="strong">
          {businessRegime === "esekZair" && result.turnover !== null ? <p>Chiffre d’affaires : {money(result.turnover)} · forfait fiscal 30 % : {money(result.standardExpenseDeduction)} · revenu de référence 70 % : {money(regimeIncome)}.</p> : <p>Bénéfice professionnel après dépenses déclaré. Il est distinct du chiffre d’affaires.</p>}
        </ResultCard>
        <ResultCard title={businessRegime === "esekZair" ? "B. Estimation annuelle du Mass Hachnassa" : "B. Mass Hachnassa annuel estimé"} value={money(result.annualIncomeTax)}>
          <p>{businessRegime === "esekZair" ? "Estimation indicative selon le revenu taxable après forfait de 30 % et les crédits saisis. Le calcul officiel dépend du taux fixé lors du Teoum Mass et des données validées par l’Autorité fiscale; ce montant n’est pas l’évaluation de la déclaration simplifiée." : "Responsabilité annuelle estimée, pas le solde à payer après retenues ou acomptes."}</p>
          {result.taxableIncome !== null ? <p className="mt-2">Base taxable modélisée : {money(result.taxableIncome)} · crédits effectivement utilisés dans la simulation : {money(result.appliedCreditValue)}.</p> : null}
        </ResultCard>
        <ResultCard title="C. Bitouah Leumi + assurance santé liée à l’activité" value={money(result.nationalInsuranceAnnual)}>
          {result.nationalInsuranceBreakdown ? <p>Assurance nationale : {money(result.nationalInsuranceBreakdown.national)} · santé : {money(result.nationalInsuranceBreakdown.health)}. Les cotisations salariales déjà prélevées ne sont pas incluses.</p> : <p>Une donnée ou une coordination mensuelle requise reste à vérifier.</p>}
        </ResultCard>
        <ResultCard title="D. Pensia Hova annuelle estimée" value={eligiblePension ? money(pension?.remaining) : "À vérifier"}>
          {eligiblePension && pension ? <p>Obligation avant versements : {money(pension.annualObligation)} · reste à déposer : {money(pension.remaining)}. Il s’agit d’une épargne retraite, pas d’un impôt.</p> : <p>{businessRegime === "esekZair" ? "La base de pension applicable au régime Esek Zair nécessite une vérification." : "Renseignez la date de naissance et la date de création dans les paramètres complémentaires."}</p>}
        </ResultCard>
        {businessRegime === "classic" ? <ResultCard title="E. Reste professionnel après prélèvements modélisés" value={money(result.businessCashRemainder)}>
          <p>{isSalaried ? "L’impôt retenu est l’impact incrémental de l’activité sur l’impôt combiné, pas la totalité de l’impôt salarial." : "Après impôt estimé, cotisations liées à l’activité et reste de pension obligatoire. Les versements pension demeurent une épargne."}</p>
        </ResultCard> : <ResultCard title="Reste de planification fiscale · pas un cash disponible" value={money(result.esekFiscalRemainder)}>
          <p>Ce repère part du revenu fiscal après le forfait; 30 % n’est pas une mesure de vos dépenses réelles. Renseignez vos frais réels ci-dessous pour une perspective de trésorerie, si les autres bases sont vérifiées.</p>
        </ResultCard>}

        {businessRegime === "esekZair" ? <details className="rounded-md border border-line bg-white p-4"><summary className="cursor-pointer text-sm font-semibold text-teal">Frais réels de trésorerie (facultatif)</summary>
          <div className="mt-4 grid gap-3"><CheckField label="Je souhaite distinguer mes dépenses de trésorerie du forfait fiscal" checked={trackActualExpenses} onChange={setTrackActualExpenses} />{trackActualExpenses ? <AmountField label="Dépenses professionnelles réelles payées en 2026 (₪)" value={actualExpenses} onChange={setActualExpenses} allowBlank help="Ce montant ne remplace pas le forfait fiscal de 30 %. Un éventuel solde reste avant Pensia Hova et autres flux." /> : null}</div>
          {trackActualExpenses && result.cashBeforePensionAndOtherCosts !== null ? <p className="mt-3 text-sm leading-6 text-slate-700">Trésorerie après dépenses réelles, impôt incrémental et Bitouah Leumi, avant Pensia Hova et autres flux : <strong>{money(result.cashBeforePensionAndOtherCosts)}</strong>. Ce n’est pas un revenu disponible définitif.</p> : null}
        </details> : null}

        <details className="border-y border-line py-4"><summary className="cursor-pointer font-semibold text-ink">Détail des bases, barèmes et crédits</summary>
          <dl className="mt-4 grid grid-cols-[minmax(0,1fr)_auto] gap-x-3 gap-y-2 text-sm leading-6 text-slate-600">
            <dt>Base impôt · activité</dt><dd>{money(result.businessIncomeForIncomeTax)}</dd>
            <dt>Base Bitouah Leumi · activité</dt><dd>{money(result.businessIncomeForNationalInsurance)}</dd>
            <dt>Base Pensia Hova · activité</dt><dd>{money(result.businessIncomeForPension)}</dd>
            <dt>Salaire brut annuel saisi</dt><dd>{money(result.salaryAnnual)}</dd>
            <dt>Déduction Bitouah Leumi incluse pour l’impôt</dt><dd>{money(result.nationalInsuranceDeduction)}</dd>
            <dt>Points standard utilisés</dt><dd>{new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 2 }).format(result.standardCreditPoints)}</dd>
            <dt>Points olé hadash utilisés</dt><dd>{new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 3 }).format(result.olehCreditPoints)}</dd>
            <dt>Valeur maximale théorique des crédits saisis</dt><dd>{money(result.creditValue)}</dd>
            <dt>Exonération Olé Hadash intégrée</dt><dd>{money(result.eligibleExemption)}</dd>
            <dt>Impôt avant crédits</dt><dd>{money(result.incomeTaxBeforeCredits)}</dd>
            {isSalaried ? <><dt>Impôt incrémental attribué à l’activité</dt><dd>{money(result.businessOnlyTax)}</dd></> : null}
            {result.nationalInsurance ? <><dt>Statut Bitouah Leumi</dt><dd>{result.nationalInsurance.status === "atzmai" ? "עונה להגדרה" : "non-définition"}</dd><dt>Base mensuelle après ajustements</dt><dd>{preciseMoney(result.nationalInsurance.contributionBase)}</dd><dt>Tranche réduite / normale</dt><dd>{preciseMoney(result.nationalInsurance.rows[0].base)} / {preciseMoney(result.nationalInsurance.rows[1].base)}</dd></> : null}
            {eligiblePension && pension ? <><dt>Base pension éligible</dt><dd>{money(result.businessIncomeForPension)}</dd><dt>Première / deuxième tranche</dt><dd>{preciseMoney(pension.firstBase)} / {preciseMoney(pension.secondBase)}</dd><dt>Versements déjà saisis</dt><dd>{money(pension.totalDeposits)}</dd></> : null}
          </dl>
          <p className="mt-3 text-xs leading-5 text-slate-500">Les calculs conservent les valeurs internes précises; les montants de synthèse sont arrondis uniquement à l’affichage. Aucun acompte ou retenue n’est soustrait de la responsabilité fiscale annuelle.</p>
        </details>

        <div className="flex flex-wrap gap-3 print:hidden"><button type="button" onClick={() => window.print()} className="min-h-11 rounded-md border border-line bg-white px-4 text-sm font-semibold text-teal">Imprimer le récapitulatif</button><WhatsAppResultButton label="Faire vérifier ma simulation fiscale" message={message} /></div>
      </section>
    </div>

    <div className="mt-10 grid gap-6 border-t border-line pt-8 lg:grid-cols-2">
      <section className="grid content-start gap-3"><h2 className="text-xl font-semibold text-ink">Outils complémentaires</h2>
        <Link className="text-sm font-semibold text-teal underline underline-offset-4" href="/fr/calculateurs/bituah-leumi-independant">Calculateur Bitouah Leumi indépendant</Link>
        <Link className="text-sm font-semibold text-teal underline underline-offset-4" href="/fr/calculateurs/pensia-hova-independant">Calculateur Pensia Hova indépendant</Link>
        <Link className="text-sm font-semibold text-teal underline underline-offset-4" href="/fr/calculateurs/nekoudot-zikouy-enfants">Calculateur Nekoudot Zikouy enfants</Link>
        <Link className="text-sm font-semibold text-teal underline underline-offset-4" href="/fr/calculateurs/ole-hadash-nekoudot-zikouy">Crédits Nekoudot Zikouy Olé Hadash</Link>
        <Link className="text-sm font-semibold text-teal underline underline-offset-4" href="/fr/calculateurs/exoneration-ole-hadash-2026">Exonération fiscale Olé Hadash</Link>
      </section>
      <section className="grid content-start gap-3"><h2 className="text-xl font-semibold text-ink">Limites du calcul</h2><p className="text-sm leading-7 text-slate-600">Cette simulation couvre uniquement les revenus professionnels et les paramètres saisis. Elle n’intègre pas les retenues, acomptes, crédits personnels non modélisés, revenus étrangers ou autres sources. Le résultat n’est pas une déclaration ni un solde fiscal officiel.</p>
        <details className="text-sm text-slate-700"><summary className="cursor-pointer font-semibold text-teal">Sources officielles 2026</summary><ul className="mt-3 list-disc space-y-2 pl-5 leading-6">
          <li><a className="text-teal underline" href="https://www.gov.il/he/service/report-and-payment-for-micro-business-owner" target="_blank" rel="noreferrer">רשות המסים · déclaration Esek Zair et déduction de 30 %</a></li>
          <li><a className="text-teal underline" href="https://www.btl.gov.il/English%20Homepage/Insurance/National%20Insurance/Detailsoftypes/SelfEmployedPerson/Pages/Methodofcalculation.aspx" target="_blank" rel="noreferrer">Bitouah Leumi · méthode de calcul et section 345</a></li>
          <li><a className="text-teal underline" href="https://www.gov.il/BlobFolder/dynamiccollectorresultitem/employers-info-300326-1/he/IncomeTax_IncomeTaxEmployersInfo_employers-info-300326-1.pdf" target="_blank" rel="noreferrer">רשות המסים · barèmes de l’impôt sur le revenu 2026</a></li>
          <li><a className="text-teal underline" href="https://www.gov.il/BlobFolder/generalpage/income-tax-guide-knowyourright/he/Guides_IncomeTax_da-2025.pdf" target="_blank" rel="noreferrer">רשות המסים · guide fiscal et pension obligatoire</a></li>
          <li><a className="text-teal underline" href="https://www.gov.il/he/service/tax-relief-new-immigrants" target="_blank" rel="noreferrer">רשות המסים · exonération des Olim et points de crédit</a></li>
        </ul></details>
      </section>
    </div>
  </CalculatorShell>;
}
