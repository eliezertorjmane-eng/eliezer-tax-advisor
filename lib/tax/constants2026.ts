export const TAX_YEAR = 2026;

// Constants must be reviewed annually before launch and after every official update.
// Source labels shown in the UI: National Insurance Institute (Bituah Leumi) and Israel Tax Authority.
export const TAX_CONSTANTS_2026 = {
  sourceLabel: "Constantes 2026 — à vérifier chaque année.",
  officialSources: [
    {
      label: "Bituah Leumi / National Insurance Institute",
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
    averageSalary: 13769,
    reducedBracket: 7703,
    maximumMonthlyInsuredIncome: 51910,
    independentDefinition: {
      incomeThreshold50Percent: 6885,
      comboIncomeThreshold15Percent: 2065,
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
      regular: 0.1217
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
