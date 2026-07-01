"use client";

import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import {
  CalculatorInput,
  CalculatorShell,
  DisclaimerBox,
  OfficialSimulatorCard,
  ResetButton,
  ResultCard,
  ToggleRow,
  WhatsAppResultButton
} from "@/components/calculators/CalculatorUi";
import { officialSimulators, type FrenchCalculatorSlug } from "@/lib/calculators";
import { TAX_YEAR } from "@/lib/tax/constants2026";
import { calculateBituahLeumiIndependent } from "@/lib/tax/bituahLeumi";
import { calculateKnownCreditPointValue } from "@/lib/tax/creditPoints";
import { calculateEhzerMassPrecheck, type EhzerMassInputs } from "@/lib/tax/ehzerMass";
import { formatILS, formatNumber } from "@/lib/tax/format";
import { calculateIncomeTax } from "@/lib/tax/incomeTax";
import { calculateOlehHadashCreditPoints } from "@/lib/tax/olehHadash";
import { calculateGrossToNetSalary } from "@/lib/tax/salary";

function toNumber(value: string | number) {
  return Number.isFinite(Number(value)) ? Number(value) : 0;
}

function CalculatorFrame({ children }: { children: ReactNode }) {
  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_0.95fr] lg:items-start">
      {children}
    </div>
  );
}

function FieldPanel({ children }: { children: ReactNode }) {
  return <div className="grid gap-5 rounded-md border border-line bg-white p-5 shadow-glow sm:p-6">{children}</div>;
}

function SelectField({
  label,
  value,
  onChange,
  children
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  children: ReactNode;
}) {
  return (
    <label className="grid gap-3 rounded-md border border-line bg-paper p-4 text-sm text-slate-700">
      <span className="font-semibold leading-6">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="min-h-12 rounded-md border border-line bg-white px-4 text-ink outline-none transition focus:border-sky"
      >
        {children}
      </select>
    </label>
  );
}

function hasMeaningfulEhzerMassInputs(inputs: EhzerMassInputs) {
  return (
    inputs.yearsToCheck !== "previous" ||
    !inputs.employeeInIsrael ||
    inputs.changedEmployer ||
    inputs.partialYear ||
    inputs.multipleEmployers ||
    inputs.periodsWithoutSalary ||
    inputs.olehHadash ||
    inputs.creditPointChanges ||
    inputs.personalChanges ||
    inputs.paidIncomeTaxOnForm106 ||
    inputs.hasForm106 ||
    (inputs.annualTaxWithheld ?? 0) > 0 ||
    (inputs.employerCount ?? 1) > 1
  );
}

function Assumptions({ items }: { items: string[] }) {
  return (
    <div className="rounded-md border border-line bg-white p-5 shadow-soft">
      <h2 className="text-xl font-semibold text-ink">Hypothèses utilisées</h2>
      <ul className="mt-4 grid gap-2">
        {items.map((item) => (
          <li key={item} className="text-sm leading-7 text-slate-600">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function EhzerMassCalculator() {
  const [inputs, setInputs] = useState<EhzerMassInputs>({
    yearsToCheck: "previous",
    employeeInIsrael: true,
    changedEmployer: false,
    partialYear: false,
    multipleEmployers: false,
    periodsWithoutSalary: false,
    olehHadash: false,
    creditPointChanges: false,
    personalChanges: false,
    paidIncomeTaxOnForm106: false,
    hasForm106: false,
    annualTaxWithheld: 0,
    employerCount: 1
  });
  const hasEnoughInputs = hasMeaningfulEhzerMassInputs(inputs);
  const result = useMemo(() => (hasEnoughInputs ? calculateEhzerMassPrecheck(inputs) : null), [hasEnoughInputs, inputs]);
  const summary = result
    ? `Bonjour Eliezer, j’ai utilisé le calculateur Ehzer Mass sur votre site. Résultat : ${result.category}. Raisons : ${result.reasons.join(", ") || "à vérifier"}. Pouvez-vous vérifier si une demande de Ehzer Mass / החזר מס est pertinente ?`
    : "";

  function update(key: keyof EhzerMassInputs, value: boolean | string | number) {
    setInputs((current) => ({ ...current, [key]: value }));
  }

  return (
    <CalculatorShell
      title="Pré-diagnostic Ehzer Mass / החזר מס"
      subtitle="Répondez à quelques questions pour savoir si une vérification de remboursement d’impôt peut être pertinente."
    >
      <CalculatorFrame>
        <FieldPanel>
          <SelectField label="Années à vérifier" value={inputs.yearsToCheck} onChange={(value) => update("yearsToCheck", value)}>
            <option value="current">Année en cours</option>
            <option value="previous">Année précédente</option>
            <option value="last6">Jusqu’aux 6 dernières années</option>
          </SelectField>
          <ToggleRow label="Avez-vous été salarié en Israël ?" checked={inputs.employeeInIsrael} onChange={(value) => update("employeeInIsrael", value)} />
          <ToggleRow label="Avez-vous changé d’employeur ?" checked={inputs.changedEmployer} onChange={(value) => update("changedEmployer", value)} />
          <ToggleRow label="Avez-vous travaillé seulement une partie de l’année ?" checked={inputs.partialYear} onChange={(value) => update("partialYear", value)} />
          <ToggleRow label="Avez-vous eu plusieurs employeurs ou revenus ?" checked={inputs.multipleEmployers} onChange={(value) => update("multipleEmployers", value)} />
          <ToggleRow label="Avez-vous eu des périodes sans salaire ?" checked={inputs.periodsWithoutSalary} onChange={(value) => update("periodsWithoutSalary", value)} />
          <ToggleRow label="Êtes-vous olé hadash ?" checked={inputs.olehHadash} onChange={(value) => update("olehHadash", value)} />
          <ToggleRow label="Changement de נקודות זיכוי ou crédits ?" checked={inputs.creditPointChanges} onChange={(value) => update("creditPointChanges", value)} />
          <ToggleRow label="Changement personnel ou familial ?" checked={inputs.personalChanges} onChange={(value) => update("personalChanges", value)} />
          <ToggleRow label="Impôt prélevé selon formulaire 106 ?" checked={inputs.paidIncomeTaxOnForm106} onChange={(value) => update("paidIncomeTaxOnForm106", value)} />
          <ToggleRow label="Formulaire 106 disponible ?" checked={inputs.hasForm106} onChange={(value) => update("hasForm106", value)} />
          <CalculatorInput label="Impôt annuel prélevé, optionnel" value={inputs.annualTaxWithheld ?? 0} onChange={(value) => update("annualTaxWithheld", toNumber(value))} />
          <CalculatorInput label="Nombre d’employeurs, optionnel" value={inputs.employerCount ?? 1} onChange={(value) => update("employerCount", toNumber(value))} />
        </FieldPanel>
        <div className="grid gap-5">
          {result ? (
            <ResultCard title="Résultat du pré-diagnostic" value={result.category} tone="strong">
              <p>{result.warning}</p>
              <div className="mt-4">
                <p className="font-semibold text-ink">Raisons détectées</p>
                <p>{result.reasons.join(", ") || "Peu d’indices détectés dans les réponses saisies."}</p>
              </div>
            </ResultCard>
          ) : (
            <ResultCard title="Pré-diagnostic" tone="strong">
              Remplissez le formulaire pour obtenir un pré-diagnostic.
            </ResultCard>
          )}
          <DisclaimerBox>
            Ce pré-diagnostic ne calcule pas un montant de remboursement. Il sert uniquement à identifier les situations qui méritent une vérification professionnelle.
          </DisclaimerBox>
          {result ? (
            <>
              <WhatsAppResultButton label="Envoyer mon pré-diagnostic à Eliezer" message={summary} />
              <Assumptions
                items={[
                  "Aucun remboursement n’est garanti.",
                  "Les années réellement vérifiables et documents requis doivent être confirmés.",
                  "Le formulaire 106, les changements d’emploi et les crédits non utilisés sont des indices de vérification, pas une conclusion."
                ]}
              />
            </>
          ) : null}
        </div>
      </CalculatorFrame>
    </CalculatorShell>
  );
}

function BituahLeumiCalculator() {
  const [salary, setSalary] = useState("0");
  const [income, setIncome] = useState("8000");
  const [hours, setHours] = useState("15");
  const result = calculateBituahLeumiIndependent({
    monthlyEmployeeSalary: toNumber(salary),
    monthlyIndependentIncome: toNumber(income),
    weeklyIndependentHours: toNumber(hours)
  });
  const statusLabel = result.status === "atzmai" ? "עצמאי" : "עצמאי שאינו עונה להגדרה";
  const message = `Bonjour Eliezer, j’ai utilisé le calculateur Bitouah Leumi indépendant. Salaire salarié: ${salary} ₪, revenu indépendant: ${income} ₪, heures: ${hours}/semaine. Statut estimé: ${statusLabel}, cotisation estimée: ${formatILS(result.contribution)}. Pouvez-vous vérifier ma situation ?`;

  return (
    <CalculatorShell
      title="Calculateur Bitouah Leumi pour indépendant"
      subtitle="Estimez votre statut et vos cotisations Bitouah Leumi selon vos revenus, heures d’activité et éventuel salaire salarié."
    >
      <CalculatorFrame>
        <FieldPanel>
          <CalculatorInput label="Salaire brut salarié mensuel" help="Indiquez 0 si vous n’êtes pas salarié." value={salary} onChange={setSalary} />
          <CalculatorInput label="Revenu mensuel indépendant estimé" help="Chiffre d’affaires moins dépenses professionnelles estimées." value={income} onChange={setIncome} />
          <CalculatorInput label="Heures d’activité indépendante par semaine" value={hours} onChange={setHours} />
          <ResetButton onClick={() => { setSalary("0"); setIncome("8000"); setHours("15"); }} />
        </FieldPanel>
        <div className="grid gap-5">
          <ResultCard title="Statut estimé" value={statusLabel} tone="strong" />
          <ResultCard title="Cotisation mensuelle estimée" value={formatILS(result.contribution)}>
            Revenu indépendant restant après estimation Bitouah Leumi : <strong>{formatILS(result.netAfterContribution)}</strong>
          </ResultCard>
          {result.status === "notDefinition" ? (
            <DisclaimerBox>
              Attention : ce statut peut ne pas offrir la même couverture qu’un statut עצמאי pour certains droits liés à l’activité professionnelle.
            </DisclaimerBox>
          ) : null}
          {result.comparison ? (
            <ResultCard title="Point à vérifier">
              {result.comparison.note} Différence estimée : {formatILS(result.comparison.estimatedDifference)}.
            </ResultCard>
          ) : null}
          <Assumptions items={result.assumptions} />
          <WhatsAppResultButton label="Faire vérifier ma situation sur WhatsApp" message={message} />
        </div>
      </CalculatorFrame>
    </CalculatorShell>
  );
}

function OlehHadashCalculator() {
  const [aliyahDate, setAliyahDate] = useState("2024-01-01");
  const [taxYear, setTaxYear] = useState(String(TAX_YEAR));
  const [excludedMonths, setExcludedMonths] = useState("0");
  const [taxBeforeCredits, setTaxBeforeCredits] = useState("0");
  const result = calculateOlehHadashCreditPoints({
    aliyahDate,
    targetTaxYear: toNumber(taxYear),
    excludedMonths: toNumber(excludedMonths),
    annualTaxBeforeCredits: toNumber(taxBeforeCredits) || undefined
  });
  const message = `Bonjour Eliezer, j’ai utilisé le calculateur נקודות זיכוי olé hadash. Date d’alyah: ${aliyahDate}, année: ${taxYear}. Points estimés: ${result ? formatNumber(result.annualCreditPoints) : "à vérifier"}. Pouvez-vous vérifier mes droits ?`;

  return (
    <CalculatorShell title="Calculateur נקודות זיכוי pour olé hadash" subtitle="Estimez les points de crédit liés au statut d’olé hadash selon votre date d’alyah et l’année fiscale.">
      <CalculatorFrame>
        <FieldPanel>
          <CalculatorInput type="date" label="Date d’alyah" value={aliyahDate} onChange={setAliyahDate} />
          <CalculatorInput label="Année fiscale" value={taxYear} onChange={setTaxYear} />
          <CalculatorInput label="Mois à exclure pour service militaire ou études" help="Optionnel — à vérifier selon votre situation." value={excludedMonths} onChange={setExcludedMonths} />
          <CalculatorInput label="Impôt annuel avant crédits" help="Optionnel — permet d’estimer la part réellement utilisable." value={taxBeforeCredits} onChange={setTaxBeforeCredits} />
        </FieldPanel>
        <div className="grid gap-5">
          {result ? (
            <>
              <ResultCard title="Régime estimé" value={result.regime === "before2022" ? "Avant 2022" : "2022 et après"} tone="strong" />
              <ResultCard title="Points annuels estimés" value={formatNumber(result.annualCreditPoints)}>
                Valeur estimée : {formatILS(result.estimatedValue)}. Valeur utilisable estimée : {formatILS(result.usableValue)}.
              </ResultCard>
              <ResultCard title="Mois restants estimés" value={String(result.remainingEligibilityMonths)} />
              {result.unusedValue > 0 ? <DisclaimerBox>Une partie des crédits peut rester inutilisée si l’impôt réellement payé est inférieur à la valeur des crédits.</DisclaimerBox> : null}
            </>
          ) : (
            <DisclaimerBox>Date d’alyah à vérifier.</DisclaimerBox>
          )}
          <DisclaimerBox>Les périodes de service militaire ou d’études peuvent modifier le calcul. À vérifier individuellement.</DisclaimerBox>
          <WhatsAppResultButton label="Faire vérifier mes droits d’olé hadash sur WhatsApp" message={message} />
        </div>
      </CalculatorFrame>
    </CalculatorShell>
  );
}

function CreditPointValueCalculator() {
  const [points, setPoints] = useState("2.25");
  const [taxBeforeCredits, setTaxBeforeCredits] = useState("0");
  const result = calculateKnownCreditPointValue(toNumber(points), toNumber(taxBeforeCredits) || undefined);
  const message = `Bonjour Eliezer, j’ai utilisé le calculateur de valeur des נקודות זיכוי. Points: ${points}, valeur annuelle estimée: ${formatILS(result.annualValue)}. Pouvez-vous vérifier ma situation ?`;

  return (
    <CalculatorShell title="Calculateur de valeur des נקודות זיכוי" subtitle="Calculez la valeur annuelle et mensuelle estimée de vos נקודות זיכוי.">
      <CalculatorFrame>
        <FieldPanel>
          <CalculatorInput label="Nombre de נקודות זיכוי" step="0.25" value={points} onChange={setPoints} />
          <CalculatorInput label="Impôt annuel avant crédits, optionnel" value={taxBeforeCredits} onChange={setTaxBeforeCredits} />
        </FieldPanel>
        <div className="grid gap-5">
          <ResultCard title="Valeur annuelle" value={formatILS(result.annualValue)} tone="strong" />
          <ResultCard title="Valeur mensuelle moyenne" value={formatILS(result.monthlyAverageValue)} />
          <ResultCard title="Montant utilisable estimé" value={formatILS(result.usableAmount)}>
            Montant potentiellement inutilisé : {formatILS(result.unusedAmount)}
          </ResultCard>
          <DisclaimerBox>Ce calculateur estime uniquement la valeur de points déjà connus. Il ne détermine pas à lui seul vos droits.</DisclaimerBox>
          <a href="https://secapp.taxes.gov.il/srsimulatorNZ/#/simulatorMasHachnasah" target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center justify-center rounded-full border border-line bg-white px-5 text-sm font-semibold text-teal shadow-soft transition hover:border-sky hover:bg-mint">
            Vérifier avec le simulateur officiel de רשות המסים
          </a>
          <WhatsAppResultButton label="Faire vérifier ma situation sur WhatsApp" message={message} />
        </div>
      </CalculatorFrame>
    </CalculatorShell>
  );
}

function SalaryCalculator() {
  const [gross, setGross] = useState("18000");
  const [points, setPoints] = useState("2.25");
  const [pension, setPension] = useState("6");
  const [hishtalmut, setHishtalmut] = useState("0");
  const [includeBl, setIncludeBl] = useState(true);
  const result = calculateGrossToNetSalary({
    monthlyGrossSalary: toNumber(gross),
    creditPoints: toNumber(points),
    pensionPercent: toNumber(pension),
    kerenHishtalmutPercent: toNumber(hishtalmut),
    includeBituahLeumi: includeBl
  });
  const message = `Bonjour Eliezer, j’ai utilisé le calculateur salaire brut/net. Brut: ${gross} ₪, points: ${points}, net estimé: ${formatILS(result.estimatedMonthlyNet)}. Pouvez-vous vérifier ma simulation ?`;

  return (
    <CalculatorShell title="Calculateur salaire brut / net en Israël" subtitle="Estimez votre salaire net mensuel en Israël à partir du brut, des נקודות זיכוי et des principales retenues.">
      <CalculatorFrame>
        <FieldPanel>
          <CalculatorInput label="Salaire brut mensuel" value={gross} onChange={setGross} />
          <CalculatorInput label="Nombre de נקודות זיכוי" step="0.25" value={points} onChange={setPoints} />
          <CalculatorInput label="Cotisation pension salarié %" step="0.1" value={pension} onChange={setPension} />
          <CalculatorInput label="Cotisation keren hishtalmut salarié %" step="0.1" value={hishtalmut} onChange={setHishtalmut} />
          <ToggleRow label="Inclure Bitouah Leumi et assurance santé" checked={includeBl} onChange={setIncludeBl} />
        </FieldPanel>
        <div className="grid gap-5">
          <ResultCard title="Salaire net mensuel estimé" value={formatILS(result.estimatedMonthlyNet)} tone="strong" />
          <ResultCard title="Retenues estimées">
            Impôt mensuel : {formatILS(result.monthlyIncomeTax)}<br />
            Bitouah Leumi / santé : {formatILS(result.monthlyBituahLeumiAndHealth)}<br />
            Pension : {formatILS(result.pension)}<br />
            Keren hishtalmut : {formatILS(result.kerenHishtalmut)}
          </ResultCard>
          <Assumptions items={result.assumptions} />
          <a href="https://secapp.taxes.gov.il/shsimulatormas/main.aspx" target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center justify-center rounded-full border border-line bg-white px-5 text-sm font-semibold text-teal shadow-soft transition hover:border-sky hover:bg-mint">
            Comparer avec le simulateur officiel de רשות המסים
          </a>
          <WhatsAppResultButton label="Faire vérifier ma situation sur WhatsApp" message={message} />
        </div>
      </CalculatorFrame>
    </CalculatorShell>
  );
}

function IncomeTaxCalculator() {
  const [income, setIncome] = useState("20000");
  const [points, setPoints] = useState("2.25");
  const [incomeType, setIncomeType] = useState<"work" | "nonWork">("work");
  const [age60, setAge60] = useState(false);
  const result = calculateIncomeTax({
    monthlyTaxableIncome: toNumber(income),
    creditPoints: toNumber(points),
    incomeType,
    age60OrOlder: age60
  });
  const message = `Bonjour Eliezer, j’ai utilisé le calculateur d’impôt sur le revenu. Revenu mensuel: ${income} ₪, points: ${points}, impôt mensuel estimé: ${formatILS(result.monthlyTaxAfterCredits)}. Pouvez-vous vérifier ma situation ?`;

  return (
    <CalculatorShell title="Calculateur d’impôt sur le revenu en Israël" subtitle="Estimez votre impôt sur le revenu selon les tranches 2026 et vos נקודות זיכוי.">
      <CalculatorFrame>
        <FieldPanel>
          <CalculatorInput label="Revenu imposable mensuel" value={income} onChange={setIncome} />
          <CalculatorInput label="Nombre de נקודות זיכוי" step="0.25" value={points} onChange={setPoints} />
          <SelectField label="Type de revenu" value={incomeType} onChange={(value) => setIncomeType(value as "work" | "nonWork")}>
            <option value="work">Revenu du travail / activité</option>
            <option value="nonWork">Revenu hors travail</option>
          </SelectField>
          <ToggleRow label="60 ans ou plus" checked={age60} onChange={setAge60} />
        </FieldPanel>
        <div className="grid gap-5">
          <ResultCard title="Impôt annuel estimé après crédits" value={formatILS(result.annualTaxAfterCredits)} tone="strong" />
          <ResultCard title="Résumé">
            Revenu annuel imposable : {formatILS(result.annualGrossTaxableIncome)}<br />
            Impôt annuel avant crédits : {formatILS(result.annualTaxBeforeCredits)}<br />
            Valeur des crédits : {formatILS(result.creditAnnualValue)}<br />
            Impôt mensuel moyen après crédits : {formatILS(result.monthlyTaxAfterCredits)}
          </ResultCard>
          <DisclaimerBox>Ce calculateur donne une estimation simplifiée et ne remplace pas une analyse personnalisée.</DisclaimerBox>
          <WhatsAppResultButton label="Faire vérifier ma situation sur WhatsApp" message={message} />
        </div>
      </CalculatorFrame>
    </CalculatorShell>
  );
}

export function OfficialSimulatorsSection() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase text-teal">Outils officiels</p>
          <h2 className="mt-3 text-3xl font-semibold text-ink sm:text-4xl">Simulateurs officiels de רשות המסים</h2>
          <p className="mt-4 text-sm leading-7 text-slate-600">
            Ces outils externes sont fournis par les autorités. Ils s’ouvrent dans un nouvel onglet afin que vous puissiez les utiliser directement sur le site officiel, puis revenir ici si vous souhaitez interpréter le résultat.
          </p>
        </div>
        <div className="mt-8 grid gap-5">
          {officialSimulators.map((simulator) => (
            <OfficialSimulatorCard key={simulator.url} {...simulator} fallbackLabel="Ouvrir le simulateur officiel" locale="fr" />
          ))}
        </div>
      </div>
    </section>
  );
}

export function FrenchCalculator({ slug }: { slug: FrenchCalculatorSlug }) {
  if (slug === "ehzer-mass") return <EhzerMassCalculator />;
  if (slug === "bituah-leumi-independant") return <BituahLeumiCalculator />;
  if (slug === "ole-hadash-nekoudot-zikouy") return <OlehHadashCalculator />;
  if (slug === "nekoudot-zikouy") return <CreditPointValueCalculator />;
  if (slug === "salaire-brut-net-israel") return <SalaryCalculator />;
  return <IncomeTaxCalculator />;
}
