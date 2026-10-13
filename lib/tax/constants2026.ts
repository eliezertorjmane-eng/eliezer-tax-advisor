export const TAX_YEAR = 2026;
const averageSalary2026 = 13769;

// Constants must be reviewed annually before launch and after every official update.
// Source labels shown in the UI: National Insurance Institute (Bitouah Leumi) and Israel Tax Authority.
export const TAX_CONSTANTS_2026 = {
  sourceLabel: "Constantes 2026 — à vérifier chaque année.",
  officialSources: [
    {
      label: "Bitouah Leumi / National Insurance Institute",
      url: "https://www.btl.gov.il/English%20Homepage/Insurance/Pages/default.aspx"
    },
    {
      label: "רשות המסים — simulateur נקודות זיכוי",
      url: "https://secapp.taxes.gov.il/srsimulatorNZ/#/simulatorMasHachnasah"
    },
    {
      label: "רשות המסים — simulateur salaire",
      url: "https://secapp.taxes.gov.il/shsimulatormas/main.aspx"
    }
  ],
  bituahLeumi: {
    averageSalary: averageSalary2026,
    reducedBracket: 7703,
    maximumMonthlyInsuredIncome: 51910,
    minimumSelfEmployedBase: 3442,
    // Public tables round to 3442; the official simulator uses 25% of 13769 in combined minimum calculations.
    minimumSelfEmployedCalculationBase: averageSalary2026 * 0.25,
    nonWorkIncomeExemption: 3442,
    nationalInsuranceDeduction: 0.52,
    minimumNonWorking: { national: 143, health: 123, total: 266 },
    independentDefinition: {
      incomeThreshold50Percent: averageSalary2026 * 0.5,
      comboIncomeThreshold15Percent: averageSalary2026 * 0.15,
      hoursThreshold: 20,
      comboHoursThreshold: 12
    },
    selfEmployedRates: {
      reduced: 0.077,
      regular: 0.18,
      breakdown: {
        bituahLeumiReduced: 0.0447,
        bituahLeumiRegular: 0.1283,
        healthReduced: 0.0323,
        healthRegular: 0.0517
      }
    },
    employeeRates: {
      bituahLeumiReduced: 0.0104,
      bituahLeumiRegular: 0.07,
      healthReduced: 0.0323,
      healthRegular: 0.0517,
      totalReduced: 0.0427,
      totalRegular: 0.1217
    },
    nonWorkIncomeRates: {
      reduced: 0.1209,
      regular: 0.1217,
      breakdown: { nationalReduced: 0.0692, nationalRegular: 0.07, health: 0.0517 }
    }
  },
  incomeTax: {
    workMonthlyBrackets: [
      { upTo: 7010, rate: 0.1 },
      { upTo: 10060, rate: 0.14 },
      { upTo: 19000, rate: 0.2 },
      { upTo: 25100, rate: 0.31 },
      { upTo: 46690, rate: 0.35 },
      { upTo: 60130, rate: 0.47 },
      { upTo: Infinity, rate: 0.5 }
    ],
    nonWorkUnder60MonthlyBrackets: [
      { upTo: 25100, rate: 0.31 },
      { upTo: 46690, rate: 0.35 },
      { upTo: 60130, rate: 0.47 },
      { upTo: Infinity, rate: 0.52 }
    ]
  },
  creditPoint: {
    monthlyValue: 242,
    annualValue: 2904
  }
} as const;

export type TaxBracket = {
  readonly upTo: number;
  readonly rate: number;
};
