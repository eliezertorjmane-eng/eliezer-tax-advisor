export const supportedChildCreditTaxYears = [2024, 2025, 2026] as const;

export type ChildCreditTaxYear = (typeof supportedChildCreditTaxYears)[number];
export type ChildCreditParentProfile = "father" | "mother" | "special";

type AgeBand = {
  minAge: number;
  maxAge: number;
  points: number;
};

type ChildCreditRuleSet = {
  taxYear: ChildCreditTaxYear;
  monthlyPointValue: number;
  annualPointValue: number;
  fatherAgeBands: AgeBand[];
  motherAgeBands: AgeBand[];
};

export type ChildCreditDetail = {
  childIndex: number;
  birthYear: number;
  fiscalAge: number;
  points: number;
  eligible: boolean;
};

export type ChildCreditCalculation = {
  taxYear: ChildCreditTaxYear;
  parentProfile: ChildCreditParentProfile;
  shouldCalculate: boolean;
  monthlyPointValue: number;
  annualPointValue: number;
  totalPoints: number;
  basicResidentPoints: number;
  childRelatedPoints: number;
  totalStandardPoints: number;
  monthlyMaxValue: number;
  annualMaxValue: number;
  details: ChildCreditDetail[];
  warnings: string[];
  assumptions: string[];
};

export const defaultChildCreditTaxYear: ChildCreditTaxYear = 2026;

const childCreditRuleSets: Record<ChildCreditTaxYear, ChildCreditRuleSet> = {
  2024: {
    taxYear: 2024,
    monthlyPointValue: 242,
    annualPointValue: 2904,
    fatherAgeBands: [
      { minAge: 0, maxAge: 0, points: 2.5 },
      { minAge: 1, maxAge: 2, points: 4.5 },
      { minAge: 3, maxAge: 3, points: 3.5 },
      { minAge: 4, maxAge: 5, points: 2.5 },
      { minAge: 6, maxAge: 17, points: 1 }
    ],
    motherAgeBands: [
      { minAge: 0, maxAge: 0, points: 2.5 },
      { minAge: 1, maxAge: 2, points: 4.5 },
      { minAge: 3, maxAge: 3, points: 3.5 },
      { minAge: 4, maxAge: 5, points: 2.5 },
      { minAge: 6, maxAge: 17, points: 2 },
      { minAge: 18, maxAge: 18, points: 0.5 }
    ]
  },
  2025: {
    taxYear: 2025,
    monthlyPointValue: 242,
    annualPointValue: 2904,
    fatherAgeBands: [
      { minAge: 0, maxAge: 0, points: 2.5 },
      { minAge: 1, maxAge: 2, points: 4.5 },
      { minAge: 3, maxAge: 3, points: 3.5 },
      { minAge: 4, maxAge: 5, points: 2.5 },
      { minAge: 6, maxAge: 17, points: 1 }
    ],
    motherAgeBands: [
      { minAge: 0, maxAge: 0, points: 2.5 },
      { minAge: 1, maxAge: 2, points: 4.5 },
      { minAge: 3, maxAge: 3, points: 3.5 },
      { minAge: 4, maxAge: 5, points: 2.5 },
      { minAge: 6, maxAge: 17, points: 2 },
      { minAge: 18, maxAge: 18, points: 0.5 }
    ]
  },
  2026: {
    taxYear: 2026,
    monthlyPointValue: 242,
    annualPointValue: 2904,
    fatherAgeBands: [
      { minAge: 0, maxAge: 0, points: 2.5 },
      { minAge: 1, maxAge: 2, points: 4.5 },
      { minAge: 3, maxAge: 3, points: 3.5 },
      { minAge: 4, maxAge: 5, points: 2.5 },
      { minAge: 6, maxAge: 17, points: 1 }
    ],
    motherAgeBands: [
      { minAge: 0, maxAge: 0, points: 2.5 },
      { minAge: 1, maxAge: 2, points: 4.5 },
      { minAge: 3, maxAge: 3, points: 3.5 },
      { minAge: 4, maxAge: 5, points: 2.5 },
      { minAge: 6, maxAge: 17, points: 2 },
      { minAge: 18, maxAge: 18, points: 0.5 }
    ]
  }
};

const specialSituationWarning =
  "Les situations de parent isolé, garde partagée, enfant en situation de handicap ou autres cas particuliers nécessitent une vérification personnalisée.";

function normalizeTaxYear(value: number): ChildCreditTaxYear {
  return supportedChildCreditTaxYears.includes(value as ChildCreditTaxYear)
    ? (value as ChildCreditTaxYear)
    : defaultChildCreditTaxYear;
}

function normalizeBirthYear(taxYear: ChildCreditTaxYear, birthYear: number) {
  const rounded = Math.round(Number.isFinite(birthYear) ? birthYear : taxYear);
  return Math.min(taxYear, Math.max(taxYear - 25, rounded));
}

function pointsForAge(ageBands: AgeBand[], fiscalAge: number) {
  return ageBands.find((band) => fiscalAge >= band.minAge && fiscalAge <= band.maxAge)?.points ?? 0;
}

export function calculateChildCreditPoints({
  taxYear,
  parentProfile,
  childrenBirthYears
}: {
  taxYear: number;
  parentProfile: ChildCreditParentProfile;
  childrenBirthYears: number[];
}): ChildCreditCalculation {
  const normalizedTaxYear = normalizeTaxYear(taxYear);
  const rules = childCreditRuleSets[normalizedTaxYear];
  const warnings: string[] = [
    "La valeur annuelle d’une Nekoudat Zikouy dépend de l’année fiscale et doit être vérifiée avant utilisation."
  ];

  if (parentProfile === "special") {
    warnings.unshift(specialSituationWarning);
    return {
      taxYear: normalizedTaxYear,
      parentProfile,
      shouldCalculate: false,
      monthlyPointValue: rules.monthlyPointValue,
      annualPointValue: rules.annualPointValue,
      totalPoints: 0,
      basicResidentPoints: 0,
      childRelatedPoints: 0,
      totalStandardPoints: 0,
      monthlyMaxValue: 0,
      annualMaxValue: 0,
      details: [],
      warnings,
      assumptions: []
    };
  }

  const ageBands = parentProfile === "mother" ? rules.motherAgeBands : rules.fatherAgeBands;
  const details = childrenBirthYears.map((birthYear, index) => {
    const normalizedBirthYear = normalizeBirthYear(normalizedTaxYear, birthYear);
    const fiscalAge = normalizedTaxYear - normalizedBirthYear;
    const points = pointsForAge(ageBands, fiscalAge);

    return {
      childIndex: index + 1,
      birthYear: normalizedBirthYear,
      fiscalAge,
      points,
      eligible: points > 0
    };
  });
  const totalPoints = details.reduce((sum, child) => sum + child.points, 0);
  const basicResidentPoints = parentProfile === "mother" ? 2.75 : 2.25;
  const totalStandardPoints = basicResidentPoints + totalPoints;

  if (childrenBirthYears.length === 0) {
    warnings.push("Aucun enfant n’est saisi : seuls les points de base du résident éligible sont inclus.");
  }

  if (details.some((child) => !child.eligible)) {
    warnings.push("Un ou plusieurs enfants sont au-delà de l’âge éligible dans cette estimation standard.");
  }

  return {
    taxYear: normalizedTaxYear,
    parentProfile,
    shouldCalculate: true,
    monthlyPointValue: rules.monthlyPointValue,
    annualPointValue: rules.annualPointValue,
    totalPoints,
    basicResidentPoints,
    childRelatedPoints: totalPoints,
    totalStandardPoints,
    monthlyMaxValue: totalStandardPoints * rules.monthlyPointValue,
    annualMaxValue: totalStandardPoints * rules.annualPointValue,
    details,
    warnings,
    assumptions: [
      "Résident israélien éligible sur l’année entière : Père (homme), 2,25 points de base ; Mère (femme), 2,75, demi-point féminin déjà inclus.",
      "Total standard estimé — hors avantages fiscaux particuliers : Oleh Hadash, Milouim, localités éligibles, handicap, garde particulière, parent isolé et autres crédits personnels.",
      "Ce total inclut déjà les points de base : ne les ajoutez pas une seconde fois dans un autre calculateur.",
      "L’âge fiscal utilisé correspond à année fiscale moins année de naissance.",
      "La valeur estimée réduit uniquement l’impôt dû ; elle ne crée pas un remboursement automatique si l’impôt est insuffisant.",
      "Les autres droits, crédits, טופס 101, déclaration annuelle et situations personnelles doivent être vérifiés séparément."
    ]
  };
}

export function getChildCreditSpecialSituationWarning() {
  return specialSituationWarning;
}
