export const OLE_EXEMPTION_CAPS = {
  2026: 600000,
  2027: 1000000,
  2028: 1000000,
  2029: 350000,
  2030: 150000
} as const;

export type OleExemptionYear = keyof typeof OLE_EXEMPTION_CAPS;
export type OleExemptionInput = {
  status: "ole" | "returning" | "other";
  residencyDate: string;
  fiscalYear: number;
  annualIncome: number;
  relatedIncome: number;
  relatedSource: "none" | "family" | "company" | "unsure";
  incomeKind: "personal" | "company" | "attributed" | "passive" | "uncertain";
  incomePeriod: "resident" | "before" | "mixed" | "departure" | "uncertain";
};

function validDate(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T00:00:00Z`);
  return Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === value;
}

export function calculateOleHadashExemption(input: OleExemptionInput) {
  const reasons: string[] = [];
  const yearValid = Number.isInteger(input.fiscalYear) && Object.prototype.hasOwnProperty.call(OLE_EXEMPTION_CAPS, input.fiscalYear);
  const amountsValid = [input.annualIncome, input.relatedIncome].every((value) =>
    Number.isFinite(value) && value >= 0 && value <= Number.MAX_SAFE_INTEGER / 12
  ) && input.relatedIncome <= input.annualIncome;
  const choicesValid = ["ole", "returning", "other"].includes(input.status) &&
    ["none", "family", "company", "unsure"].includes(input.relatedSource) &&
    ["personal", "company", "attributed", "passive", "uncertain"].includes(input.incomeKind) &&
    ["resident", "before", "mixed", "departure", "uncertain"].includes(input.incomePeriod);
  const dateMissing = input.residencyDate === "";
  const dateValid = validDate(input.residencyDate);
  const valid = yearValid && amountsValid && choicesValid && (dateMissing || dateValid) &&
    !(input.relatedSource === "none" && input.relatedIncome > 0);
  const fiscalYear = yearValid ? input.fiscalYear as OleExemptionYear : null;
  const statutoryAnnualCap = fiscalYear === null ? null : OLE_EXEMPTION_CAPS[fiscalYear];
  const window = !dateValid ? "missing" : input.residencyDate >= "2025-11-05" && input.residencyDate <= "2026-12-31"
    ? "statutory" : input.residencyDate >= "2027-01-01" && input.residencyDate <= "2027-02-10" ? "extension" : "outside";

  if (!valid) reasons.push("Vérifiez l’année, la date réelle et les montants positifs ou nuls. Le revenu de proches doit être inclus dans le total, sans le dépasser.");
  if (dateMissing) reasons.push("La date effective de début de résidence fiscale est nécessaire ; la Teoudat Olé seule ne suffit pas toujours à l’établir.");
  if (window === "extension") reasons.push("Du 1er janvier au 10 février 2027 : le service de l’Autorité fiscale accepte les demandes. L’extension est rattachée à l’article 38 de la Loi fondamentale : la Knesset. Le texte initial vise fin 2026 ; les modalités pour une résidence débutant en 2027 doivent être confirmées. Aucun prorata 2027 n’est inventé ici.");
  if (window === "outside") reasons.push("La date est hors de la fenêtre statutaire du 5 novembre 2025 au 31 décembre 2026 et de l’extension administrative annoncée jusqu’au 10 février 2027. Cet outil ne confirme pas l’application du régime à cette date.");
  if (input.status === "returning") reasons.push("Toshav Hozer Vatik : vérifier au moins dix années consécutives de résidence fiscale à l’étranger, le transfert du centre de vie et le certificat du ministère de l’Alyah. Une sélection de statut ne prouve pas ces conditions.");
  if (input.status === "other") reasons.push("Le statut d’Olé Hadash ou de Toshav Hozer Vatik et ses justificatifs doivent être déterminés avant d’appliquer le régime.");
  if (input.incomeKind !== "personal") reasons.push("Les dividendes, revenus passifs, profits de société et attributions selon l’article 62א ne sont pas assimilés automatiquement à un salaire ou bénéfice personnel éligible. Une qualification professionnelle est nécessaire.");
  if (input.incomePeriod !== "resident") reasons.push("Les revenus antérieurs à la résidence, l’activité partagée avec l’étranger ou une rupture de résidence exigent une ventilation et une vérification. Aucun revenu total n’est automatiquement déclaré exonéré ou taxable.");
  if (input.relatedSource === "company" || input.relatedSource === "unsure") reasons.push("Le lien avec le payeur doit être qualifié selon קרוב à l’article 88. Une simple connaissance ne suffit pas ; une société entièrement détenue par l’Olé bénéficie d’une exception spécifique, sans exonérer ses propres profits.");

  // The enacted prorata concerns 2026 only. Never extrapolate it to 2027 arrivals.
  const canIllustrate = valid && window === "statutory";
  const days2026 = canIllustrate ? Math.floor((Date.UTC(2026, 11, 31) - Math.max(Date.parse(`${input.residencyDate}T00:00:00Z`), Date.UTC(2026, 0, 1))) / 86400000) + 1 : null;
  const factor = canIllustrate ? (fiscalYear === 2026 ? days2026! / 365 : 1) : null;
  const generalCap = factor === null ? null : statutoryAnnualCap! * factor;
  const relatedCap = factor === null ? null : (fiscalYear === 2030 ? statutoryAnnualCap! : 140000) * factor;
  const ordinaryIncome = amountsValid ? input.annualIncome - input.relatedIncome : null;
  // A combined mathematical upper bound, not an election allocating relief to a payer.
  const conditionalMaximum = generalCap === null ? null : Math.min(generalCap, ordinaryIncome! + Math.min(input.relatedIncome, relatedCap!));
  const mixedAllocation = generalCap !== null && ordinaryIncome! > 0 && input.relatedIncome > 0 &&
    ordinaryIncome! + Math.min(input.relatedIncome, relatedCap!) > generalCap;
  if (mixedAllocation) reasons.push("Revenus mixtes et plafond global atteint : la borne mathématique ne décide pas de la répartition de l’exonération entre payeurs. Cette ventilation doit être vérifiée avant déclaration.");
  const review = window !== "statutory" || input.status !== "ole" || input.incomeKind !== "personal" || input.incomePeriod !== "resident" ||
    input.relatedSource === "company" || input.relatedSource === "unsure" || mixedAllocation;
  const status = !valid ? "invalid" : review ? "review" : "estimate";
  if (status === "estimate") {
    reasons.push(fiscalYear === 2026 ? `2026 : ${days2026} jours de résidence, du début de résidence au 31 décembre inclus, sur 365 jours.` : "Plafond annuel fixe ; aucun report des plafonds non utilisés ni nouveau cycle de cinq années à partir de l’arrivée.");
    if (input.relatedIncome > 0) reasons.push(fiscalYear === 2030 ? "2030 : le plafond spécial de 140 000 ₪ ne remplace plus le plafond général ; le total reste limité à 150 000 ₪." : "Revenus de proches : plafond spécifique de 140 000 ₪, proratisé en 2026, à l’intérieur du plafond général et non en supplément.");
    reasons.push("Estimation conditionnelle : seuls les revenus personnels éligibles produits en Israël pendant la résidence sont retenus. Le statut, le maintien du régime et les justificatifs restent à examiner.");
  }
  const exemptIncome = status === "estimate" ? conditionalMaximum : null;
  return {
    status, reasons, fiscalYear, window, statutoryAnnualCap, generalCap, relatedCap, days2026, factor,
    annualIncome: amountsValid ? input.annualIncome : null, ordinaryIncome,
    relatedIncome: amountsValid ? input.relatedIncome : null, mixedAllocation, conditionalMaximum,
    exemptIncome, remainingIncome: exemptIncome === null ? null : input.annualIncome - exemptIncome
  };
}
