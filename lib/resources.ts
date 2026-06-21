export type ResourceFaq = {
  question: string;
  answer: string;
};

export type ResourceSection = {
  title: string;
  paragraphs?: string[];
  bullets?: string[];
};

export type FrenchResourcePage = {
  slug: string;
  title: string;
  seoTitle: string;
  metaDescription: string;
  lead: string;
  sections: ResourceSection[];
  faq: ResourceFaq[];
};

export const frenchVideoResources = [
  {
    url: "https://www.instagram.com/qualita_officiel/reel/DF9noEbCGIK/",
    title: "Intervention avec Qualita : fiscalité et démarches en Israël",
    description: "Une intervention autour des questions fiscales que rencontrent les francophones en Israël."
  },
  {
    url: "https://www.instagram.com/eliezer.tax.advisor/reel/DR-RXJwjSKR/",
    title: "Conseil fiscal en Israël : point pratique",
    description: "Une vidéo courte pour mieux comprendre une situation fiscale courante en Israël."
  },
  {
    url: "https://www.instagram.com/eliezer.tax.advisor/reel/DS7aCpzDSyY/",
    title: "Démarches fiscales en Israël : repères utiles",
    description: "Un contenu pratique pour les entrepreneurs, salariés ou francophones ayant des questions fiscales en Israël."
  }
] as const;

export const frenchResourcePages: FrenchResourcePage[] = [
  {
    slug: "creation-esek-israel",
    title: "Ouverture d’un עסק en Israël",
    seoTitle: "Ouverture d’un עסק en Israël | Accompagnement fiscal francophone",
    metaDescription:
      "Accompagnement pour l’ouverture d’un עסק en Israël : compréhension du statut, documents à préparer, démarches administratives et suivi pour entrepreneurs francophones.",
    lead:
      "Ouvrir un עסק en Israël signifie organiser le cadre administratif de votre activité indépendante. L’objectif est de clarifier les options, préparer les documents utiles et avancer avec méthode.",
    sections: [
      {
        title: "Qu’est-ce qu’ouvrir un עסק en Israël ?",
        paragraphs: [
          "L’ouverture d’un עסק correspond à la mise en place d’un dossier d’activité pour exercer comme indépendant ou développer une activité professionnelle en Israël.",
          "Pour un francophone, la difficulté vient souvent du vocabulaire, des formulaires, des organismes à comprendre et de la chronologie des démarches."
        ]
      },
      {
        title: "Les principaux statuts à connaître",
        bullets: [
          "עוסק פטור : cadre généralement utilisé pour certaines petites activités, avec des plafonds à vérifier selon l’année fiscale en vigueur.",
          "עוסק מורשה : cadre adapté à d’autres activités indépendantes, avec des obligations différentes, notamment autour de la TVA.",
          "חברה בע״מ : société à responsabilité limitée, à envisager dans des situations plus structurées avec analyse individuelle."
        ]
      },
      {
        title: "Quel statut semble adapté à votre situation ?",
        paragraphs: [
          "Le choix dépend de l’activité, du volume prévu, du type de clients, de votre situation personnelle et des obligations qui peuvent s’appliquer.",
          "L’accompagnement permet de poser les bonnes questions avant d’agir, sans donner de conclusion automatique."
        ]
      },
      {
        title: "Documents généralement utiles",
        bullets: [
          "Pièce d’identité et coordonnées complètes.",
          "Description précise de l’activité prévue.",
          "Informations sur les revenus attendus, à vérifier selon l’année fiscale en vigueur.",
          "Documents déjà reçus des administrations israéliennes.",
          "Coordonnées bancaires ou éléments administratifs si nécessaires."
        ]
      },
      {
        title: "Les étapes de l’accompagnement",
        bullets: [
          "Comprendre votre situation personnelle et professionnelle.",
          "Identifier les options et les points à clarifier.",
          "Préparer les documents utiles avant la démarche.",
          "Organiser le suivi administratif après l’ouverture."
        ]
      },
      {
        title: "Erreurs fréquentes à éviter",
        bullets: [
          "Ouvrir trop vite sans comprendre les obligations qui suivent.",
          "Confondre les statuts ou les organismes administratifs.",
          "Ne pas conserver les documents reçus.",
          "Attendre une urgence pour organiser le dossier."
        ]
      }
    ],
    faq: [
      {
        question: "Puis-je ouvrir un עסק tout en étant salarié ?",
        answer:
          "C’est parfois possible, selon votre contrat, vos revenus et votre situation personnelle. Il faut vérifier les obligations applicables avant d’avancer."
      },
      {
        question: "Faut-il choisir entre עוסק פטור et עוסק מורשה dès le départ ?",
        answer:
          "Le cadre dépend de l’activité et de la situation. Les plafonds et règles doivent être vérifiés selon l’année fiscale en vigueur."
      },
      {
        question: "L’accompagnement remplace-t-il un comptable ?",
        answer:
          "Non. Il s’agit d’orientation, de préparation et de suivi administratif. Chaque situation doit être analysée individuellement."
      }
    ]
  },
  {
    slug: "hahzar-mas-remboursement-impot-israel",
    title: "Remboursement d’impôt / החזר מס en Israël",
    seoTitle: "החזר מס en Israël | Remboursement d’impôt pour salariés et francophones",
    metaDescription:
      "Vous pensez avoir droit à un remboursement d’impôt / החזר מס en Israël ? Accompagnement pour comprendre votre situation, organiser les documents et préparer la demande.",
    lead:
      "Une demande de remboursement d’impôt / החזר מס doit être préparée avec prudence. L’objectif est de comprendre votre situation, vérifier les documents et éviter toute promesse automatique.",
    sections: [
      {
        title: "Que signifie החזר מס ?",
        paragraphs: [
          "Le terme החזר מס désigne un remboursement d’impôt potentiel lorsque la situation fiscale montre qu’un montant a pu être payé en trop.",
          "Cela ne signifie pas qu’un remboursement est garanti : chaque cas dépend des revenus, documents, crédits et changements personnels."
        ]
      },
      {
        title: "Qui peut être concerné ?",
        bullets: [
          "Salariés ayant connu des changements au cours de l’année.",
          "Changement d’employeur ou périodes sans emploi.",
          "Travail partiel sur l’année.",
          "Plusieurs revenus ou plusieurs employeurs.",
          "Olim hadashim avec points à clarifier.",
          "Situations personnelles particulières."
        ]
      },
      {
        title: "Documents à préparer",
        bullets: [
          "Fiches de salaire et formulaires annuels.",
          "Dates de début et fin d’emploi.",
          "Documents personnels pouvant influencer la situation.",
          "Informations sur revenus complémentaires.",
          "Correspondances reçues des autorités."
        ]
      },
      {
        title: "Comment se déroule l’accompagnement",
        paragraphs: [
          "Le premier échange sert à cadrer la situation et à identifier les documents manquants.",
          "Ensuite, les éléments sont organisés pour comprendre si une démarche peut être préparée, sans garantir le résultat."
        ]
      },
      {
        title: "Ce que l’on peut vérifier ensemble",
        bullets: [
          "Les périodes de travail déclarées.",
          "Les changements d’employeur ou de situation familiale.",
          "Les documents annuels et justificatifs disponibles.",
          "Les points qui nécessitent une analyse individuelle."
        ]
      }
    ],
    faq: [
      {
        question: "Peut-on garantir un remboursement ?",
        answer: "Non. Aucun remboursement ne peut être garanti avant analyse et chaque situation doit être vérifiée individuellement."
      },
      {
        question: "Est-ce utile si j’ai changé d’employeur ?",
        answer: "Oui, un changement d’employeur peut justifier une vérification, selon les documents et périodes concernées."
      },
      {
        question: "Puis-je travailler à distance pour préparer le dossier ?",
        answer: "Oui. Les premiers échanges et l’organisation des documents peuvent généralement se faire par WhatsApp, téléphone ou email."
      }
    ]
  },
  {
    slug: "declarations-fiscales-israel",
    title: "Déclarations fiscales en Israël",
    seoTitle: "Déclarations fiscales en Israël | Accompagnement pour francophones",
    metaDescription:
      "Accompagnement dans l’organisation, la préparation et le suivi de vos déclarations fiscales en Israël.",
    lead:
      "Les déclarations fiscales peuvent devenir complexes lorsqu’on découvre les termes, les délais et les administrations israéliennes. Un accompagnement clair permet d’organiser les informations avant d’avancer.",
    sections: [
      {
        title: "Pourquoi les déclarations fiscales peuvent être complexes pour les francophones",
        paragraphs: [
          "La complexité vient souvent de la langue, des documents à rassembler, des différences avec le système français et du manque de visibilité sur les étapes.",
          "L’objectif est de transformer une démarche confuse en liste d’actions compréhensible."
        ]
      },
      {
        title: "Mas Hachnasa et Bituah Leumi, expliqués simplement",
        paragraphs: [
          "Mas Hachnasa concerne l’impôt sur le revenu. Bituah Leumi concerne la sécurité sociale israélienne. Selon votre situation, les deux peuvent apparaître dans vos démarches.",
          "L’accompagnement aide à distinguer les documents et demandes liés à chaque organisme."
        ]
      },
      {
        title: "Salariés, indépendants, entrepreneurs : quelles différences ?",
        bullets: [
          "Un salarié reçoit généralement des documents de son employeur.",
          "Un indépendant doit suivre son activité, ses revenus et ses documents administratifs.",
          "Un entrepreneur peut avoir des besoins plus réguliers de suivi et d’organisation."
        ]
      },
      {
        title: "Documents et échéances",
        bullets: [
          "Documents de revenus.",
          "Fiches annuelles ou documents d’activité.",
          "Correspondances administratives.",
          "Justificatifs utiles selon la situation.",
          "Échéances à confirmer selon le dossier et l’année fiscale en vigueur."
        ]
      },
      {
        title: "Suivi administratif",
        paragraphs: [
          "Le suivi consiste à garder une vision claire des documents transmis, des éléments manquants et des prochaines étapes."
        ]
      },
      {
        title: "Quand demander de l’aide ?",
        paragraphs: [
          "Il est préférable de demander de l’aide dès qu’un document est incompris, qu’une échéance approche ou qu’une situation change."
        ]
      }
    ],
    faq: [
      {
        question: "Dois-je préparer tous mes documents avant le premier contact ?",
        answer: "Non. Le premier échange peut justement servir à identifier les documents utiles et ceux qui manquent."
      },
      {
        question: "Les déclarations concernent-elles seulement les indépendants ?",
        answer: "Non. Certaines situations de salariés peuvent aussi nécessiter une vérification ou un suivi."
      },
      {
        question: "Les délais sont-ils toujours les mêmes ?",
        answer: "Non. Les délais doivent être vérifiés selon le dossier, la démarche et l’année fiscale en vigueur."
      }
    ]
  },
  {
    slug: "fiscalite-salaries-israel",
    title: "Fiscalité des salariés en Israël",
    seoTitle: "Fiscalité des salariés en Israël | Questions fiscales et החזר מס",
    metaDescription:
      "Accompagnement pour salariés en Israël : compréhension des documents, changements d’emploi, demandes de החזר מס et questions fiscales.",
    lead:
      "Même en étant salarié, certaines situations fiscales méritent d’être vérifiées : changement d’emploi, plusieurs revenus, documents incompris ou demande potentielle de remboursement d’impôt / החזר מס.",
    sections: [
      {
        title: "Questions fréquentes des salariés",
        bullets: [
          "Ai-je des documents annuels à conserver ?",
          "Que faire après un changement d’emploi ?",
          "Comment comprendre une demande administrative ?",
          "Puis-je vérifier une demande de remboursement d’impôt / החזר מס ?"
        ]
      },
      {
        title: "Fiches de paie, formulaires annuels et changements d’emploi",
        paragraphs: [
          "Les fiches de paie et documents annuels permettent souvent de comprendre la situation fiscale d’un salarié.",
          "Un changement d’employeur ou une interruption d’activité peut justifier une vérification."
        ]
      },
      {
        title: "Plusieurs employeurs ou revenus",
        paragraphs: [
          "Lorsque plusieurs sources de revenus existent, il est important d’organiser les documents avant toute démarche."
        ]
      },
      {
        title: "Quand vérifier sa situation ?",
        bullets: [
          "Après un changement d’emploi.",
          "Après une année partiellement travaillée.",
          "En cas de plusieurs employeurs.",
          "Lorsqu’un document administratif est incompris.",
          "Avant de préparer une demande de remboursement d’impôt / החזר מס."
        ]
      },
      {
        title: "Documents utiles",
        bullets: [
          "Fiches de salaire.",
          "Documents annuels.",
          "Contrats ou dates de changement d’emploi.",
          "Documents personnels pertinents.",
          "Correspondances reçues."
        ]
      }
    ],
    faq: [
      {
        question: "Un salarié peut-il avoir besoin d’un accompagnement fiscal ?",
        answer: "Oui, surtout en cas de changement d’emploi, documents incompris, plusieurs revenus ou vérification d’un remboursement potentiel."
      },
      {
        question: "Dois-je avoir tous mes documents ?",
        answer: "Non. Vous pouvez commencer par envoyer ce que vous avez afin d’identifier les éléments manquants."
      },
      {
        question: "Est-ce lié uniquement au remboursement d’impôt ?",
        answer: "Non. L’accompagnement peut aussi porter sur la compréhension des documents et le suivi administratif."
      }
    ]
  },
  {
    slug: "olim-hadashim-fiscalite-israel",
    title: "Fiscalité des olim hadashim en Israël",
    seoTitle: "Fiscalité des olim hadashim en Israël | Accompagnement francophone",
    metaDescription:
      "Accompagnement fiscal pour olim hadashim : comprendre les démarches israéliennes, organiser les documents et poser les bonnes questions.",
    lead:
      "Après l’alyah, les démarches fiscales israéliennes peuvent être difficiles à comprendre. Un accompagnement francophone permet de poser les bonnes questions et d’organiser les documents avec méthode.",
    sections: [
      {
        title: "Les premières questions fiscales après l’alyah",
        paragraphs: [
          "Les olim hadashim se posent souvent des questions sur les revenus, les documents israéliens, les démarches administratives et les différences avec leur ancien pays.",
          "Chaque situation doit être analysée individuellement, surtout lorsqu’il existe des revenus ou obligations à l’étranger."
        ]
      },
      {
        title: "Barrière de la langue et documents israéliens",
        paragraphs: [
          "Le vocabulaire administratif en hébreu peut créer beaucoup d’incertitude. L’accompagnement aide à clarifier les termes et à comprendre quelles étapes sont prioritaires."
        ]
      },
      {
        title: "Revenus en Israël et à l’étranger : points à clarifier",
        bullets: [
          "Nature des revenus.",
          "Pays d’origine des revenus.",
          "Documents disponibles.",
          "Changements de résidence ou de situation personnelle.",
          "Points nécessitant une analyse spécialisée selon le dossier."
        ]
      },
      {
        title: "Salarié, indépendant ou entrepreneur",
        paragraphs: [
          "Les démarches ne sont pas les mêmes selon que vous êtes salarié, indépendant ou entrepreneur. Le premier échange permet de comprendre le cadre général."
        ]
      },
      {
        title: "Préparer un premier échange",
        bullets: [
          "Décrire votre situation actuelle en Israël.",
          "Lister vos revenus et documents disponibles.",
          "Noter les questions qui bloquent.",
          "Envoyer les documents reçus des administrations lorsque c’est pertinent."
        ]
      }
    ],
    faq: [
      {
        question: "L’accompagnement est-il adapté aux nouveaux olim ?",
        answer: "Oui. Il est pensé pour clarifier les démarches, les documents et les termes administratifs israéliens."
      },
      {
        question: "Peut-on échanger en français ?",
        answer: "Oui. Le français est la langue principale de l’accompagnement pour les francophones, avec prise en compte des documents en hébreu."
      },
      {
        question: "Faut-il traiter les revenus étrangers ?",
        answer: "Cela dépend de la situation. Les revenus en Israël et à l’étranger doivent être clarifiés individuellement."
      }
    ]
  }
];

export const resourceIndexCards = [
  {
    href: "/fr/creation-esek-israel",
    title: "Ouvrir un עסק",
    description: "Comprendre les statuts, préparer les documents et organiser l’ouverture d’une activité en Israël."
  },
  {
    href: "/fr/hahzar-mas-remboursement-impot-israel",
    title: "Demander un remboursement d’impôt / החזר מס",
    description: "Vérifier les situations possibles, sans promesse de remboursement, et préparer les documents utiles."
  },
  {
    href: "/fr/declarations-fiscales-israel",
    title: "Préparer une déclaration fiscale",
    description: "Organiser les revenus, documents et échanges administratifs liés aux déclarations fiscales."
  },
  {
    href: "/fr/fiscalite-salaries-israel",
    title: "Comprendre sa situation de salarié",
    description: "Faire le point sur les fiches de paie, changements d’emploi et questions de remboursement d’impôt."
  },
  {
    href: "/fr/olim-hadashim-fiscalite-israel",
    title: "S’installer comme olé hadash",
    description: "Clarifier les premières questions fiscales après l’alyah et préparer un échange structuré."
  }
] as const;

export const resourceSlugs = [
  "ressources",
  "videos",
  ...frenchResourcePages.map((page) => page.slug)
] as const;

export function getFrenchResourcePage(slug: string) {
  return frenchResourcePages.find((page) => page.slug === slug);
}
