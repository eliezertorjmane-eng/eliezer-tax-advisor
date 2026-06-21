export type EhzerMassInputs = {
  yearsToCheck: "current" | "previous" | "last6";
  employeeInIsrael: boolean;
  changedEmployer: boolean;
  partialYear: boolean;
  multipleEmployers: boolean;
  periodsWithoutSalary: boolean;
  olehHadash: boolean;
  creditPointChanges: boolean;
  personalChanges: boolean;
  paidIncomeTaxOnForm106: boolean;
  hasForm106: boolean;
  annualTaxWithheld?: number;
  employerCount?: number;
};

const reasonLabels: Record<keyof Omit<EhzerMassInputs, "yearsToCheck" | "annualTaxWithheld" | "employerCount">, string> = {
  employeeInIsrael: "Salarié en Israël",
  changedEmployer: "Changement d’employeur",
  partialYear: "Année travaillée partiellement",
  multipleEmployers: "Plusieurs revenus ou employeurs",
  periodsWithoutSalary: "Périodes sans salaire",
  olehHadash: "Statut olé hadash",
  creditPointChanges: "Crédits / נקודות זיכוי potentiellement non utilisés",
  personalChanges: "Changement personnel ou familial",
  paidIncomeTaxOnForm106: "Impôt prélevé selon le formulaire 106",
  hasForm106: "Formulaire 106 disponible"
};

export function calculateEhzerMassPrecheck(inputs: EhzerMassInputs) {
  const weightedReasons: Array<[boolean, string, number]> = [
    [inputs.changedEmployer, reasonLabels.changedEmployer, 3],
    [inputs.partialYear, reasonLabels.partialYear, 3],
    [inputs.multipleEmployers, reasonLabels.multipleEmployers, 3],
    [inputs.periodsWithoutSalary, reasonLabels.periodsWithoutSalary, 2],
    [inputs.olehHadash, reasonLabels.olehHadash, 2],
    [inputs.creditPointChanges, reasonLabels.creditPointChanges, 2],
    [inputs.personalChanges, reasonLabels.personalChanges, 2],
    [inputs.paidIncomeTaxOnForm106, reasonLabels.paidIncomeTaxOnForm106, 2],
    [inputs.hasForm106, reasonLabels.hasForm106, 1],
    [inputs.employeeInIsrael, reasonLabels.employeeInIsrael, 1]
  ];

  const reasons = weightedReasons.filter(([active]) => active).map(([, label]) => label);
  const score = weightedReasons.reduce((total, [active, , weight]) => total + (active ? weight : 0), 0);
  const scoreWithWithheld = score + (Number(inputs.annualTaxWithheld ?? 0) > 0 ? 2 : 0);

  let category = "Peu d’indices, mais à confirmer";
  if (scoreWithWithheld >= 9) {
    category = "Vérification fortement recommandée";
  } else if (scoreWithWithheld >= 6) {
    category = "Vérification utile";
  } else if (scoreWithWithheld >= 3) {
    category = "Vérification possible";
  }

  return {
    category,
    reasons,
    score: scoreWithWithheld,
    warning:
      "Ce pré-diagnostic ne garantit pas un remboursement. Il sert à identifier les situations qui méritent une vérification."
  };
}
