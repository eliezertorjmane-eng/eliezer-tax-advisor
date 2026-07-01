import type { Article } from "@/lib/content/articleTypes";

const defaultAuthor = {
  authorName: "Eliezer Torjmane",
  authorTitle: "Conseiller fiscal agréé en Israël"
};

const publication = {
  publishedAt: "2026-06-22",
  updatedAt: "2026-06-22",
  fiscalYear: "2026"
};

export const articles: Article[] = [
  {
    slug: "certificat-residence-fiscale-israel",
    locale: "fr",
    type: "guide",
    category: "France-Israël",
    title: "Comment demander un אישור תושבות מס en Israël ?",
    seoTitle: "Certificat de résidence fiscale en Israël : comment demander un אישור תושבות מס",
    shortTitle: "אישור תושבות מס",
    description:
      "Un guide pratique pour comprendre à quoi sert le certificat de résidence fiscale israélien, dans quels cas il peut être demandé et comment préparer la demande.",
    metaDescription:
      "Besoin d’un certificat de résidence fiscale israélien en anglais ? Découvrez à quoi sert l’אישור תושבות מס, dans quels cas il est demandé et comment préparer la demande.",
    excerpt:
      "Comprendre l’אישור תושבות מס, les situations où il est demandé et les documents à préparer avant de solliciter l’administration fiscale israélienne.",
    ...publication,
    readingTime: "7 min",
    ...defaultAuthor,
    tags: [
      "אישור תושבות מס",
      "résidence fiscale",
      "France Israël",
      "impôts France",
      "retraite",
      "App Store",
      "Google Store",
      "convention fiscale"
    ],
    keywords: [
      "certificat résidence fiscale Israël",
      "אישור תושבות מס",
      "résidence fiscale Israël France",
      "tax residence certificate Israel",
      "convention fiscale France Israël"
    ],
    featured: true,
    priority: 1,
    heroLabel: "Guide pratique",
    relatedArticleSlugs: ["certificat-residence-fiscale-retraite-france-israel", "revenus-locatifs-israel-masloulei-mas"],
    relatedCalculatorSlugs: [],
    sources: [],
    cta: {
      title: "Besoin d’un אישור תושבות מס ?",
      text: "Contactez Eliezer pour vérifier quel document demander et comment présenter votre situation.",
      label: "Vérifier la démarche sur WhatsApp",
      whatsappMessage:
        "Bonjour Eliezer, j’ai besoin d’un אישור תושבות מס / certificat de résidence fiscale israélien et je souhaite vérifier la démarche."
    },
    sections: [
      {
        title: "À quoi sert un certificat de résidence fiscale israélien ?",
        paragraphs: [
          "Un אישור תושבות מס est un document fiscal qui peut servir à prouver qu’une personne ou une entreprise est résidente fiscale en Israël. Il peut être demandé par une administration étrangère, une plateforme internationale ou un partenaire commercial.",
          "Dans certains cas, selon la nature du revenu et la convention fiscale applicable, ce document peut aider à faire reconnaître la résidence fiscale israélienne et à éviter une imposition non justifiée à l’étranger."
        ],
        bullets: [
          "Prouver une résidence fiscale israélienne auprès d’un organisme étranger.",
          "Répondre à une demande de l’administration française.",
          "Justifier une situation fiscale dans un contexte France-Israël ou international.",
          "Répondre à des vérifications de plateformes comme Apple, Google, App Store ou Google Play.",
          "Présenter un document officiel en anglais lorsque l’organisme étranger le demande."
        ]
      },
      {
        title: "Dans quels cas ce document est-il demandé ?",
        numbered: [
          "Retraité vivant en Israël mais encore interrogé ou imposé en France.",
          "Personne ayant des revenus français et devant justifier sa résidence fiscale.",
          "Entrepreneur ou société israélienne travaillant avec Apple, Google, App Store, Google Play ou d’autres plateformes internationales.",
          "Personne qui doit fournir un document fiscal officiel en anglais à une banque, une administration ou un partenaire."
        ],
        callout: {
          title: "Point de prudence",
          text: "Le certificat ne règle pas automatiquement toute question de double imposition. Il faut vérifier la nature du revenu, les années concernées et la convention fiscale applicable.",
          tone: "warning"
        }
      },
      {
        title: "Attention à ne pas confondre avec d’autres attestations",
        paragraphs: [
          "L’אישור תושבות מס concerne la résidence fiscale dans un contexte international. Il ne faut pas le confondre avec les attestations de résidence utilisées pour certains avantages locaux en Israël.",
          "Par exemple, אישור תושבות ou טופס 1312 peuvent servir à vérifier une résidence locale dans certaines villes éligibles. Ce n’est pas le même besoin, ni le même raisonnement fiscal."
        ]
      },
      {
        title: "Quels documents préparer ?",
        bullets: [
          "Teoudat zehout.",
          "Adresse en Israël.",
          "Années fiscales concernées.",
          "Nature des revenus concernés.",
          "Justificatifs de résidence en Israël.",
          "Documents demandés par l’organisme étranger.",
          "Courrier ou formulaire de demande si l’organisme étranger en a fourni un."
        ]
      },
      {
        title: "Comment Eliezer peut aider ?",
        bullets: [
          "Clarifier le besoin réel : certificat fiscal international ou attestation locale.",
          "Vérifier quel document demander avant de lancer une démarche.",
          "Préparer les éléments utiles pour présenter le dossier.",
          "Expliquer le contexte en français, avec les termes hébreux importants.",
          "Limiter les erreurs fréquentes entre certificat fiscal international et document municipal ou local."
        ],
        links: [
          {
            href: "/fr/cas-reels/certificat-residence-fiscale-retraite-france-israel",
            label: "Lire le cas pratique lié",
            description: "Un exemple anonymisé de demande de preuve de résidence fiscale auprès de la France."
          }
        ]
      }
    ],
    faq: [
      {
        question: "Le certificat est-il disponible en anglais ?",
        answer:
          "Dans certains cas, un document fiscal peut être demandé en anglais. Il faut vérifier le format attendu par l’organisme étranger et la démarche adaptée auprès des autorités israéliennes."
      },
      {
        question: "Est-ce suffisant pour ne plus payer d’impôt en France ?",
        answer:
          "Non, pas automatiquement. Le certificat peut aider à prouver une résidence fiscale, mais l’imposition dépend de la nature du revenu, de la convention fiscale et du dossier."
      },
      {
        question: "Est-ce réservé aux particuliers ?",
        answer:
          "Non. Des entreprises ou entrepreneurs israéliens peuvent aussi devoir prouver une résidence fiscale israélienne dans un contexte international."
      },
      {
        question: "Une société israélienne peut-elle aussi en avoir besoin ?",
        answer:
          "Oui, notamment lorsqu’une plateforme internationale, un partenaire commercial ou une administration étrangère demande une preuve fiscale."
      },
      {
        question: "Combien de temps cela prend ?",
        answer:
          "Le délai dépend du dossier, de l’année concernée, des documents disponibles et des délais administratifs. Il vaut mieux préparer les éléments avant de déposer la demande."
      }
    ]
  },
  {
    slug: "prisat-mas-shevach-israel",
    locale: "fr",
    type: "guide",
    category: "Immobilier",
    title: "Prissat Mass Shevach (פריסת מס שבח) : comment étaler la plus-value immobilière en Israël",
    seoTitle: "Prissat Mass Shevach en Israël : réduire l’impôt sur une vente immobilière",
    shortTitle: "Mass Shevach",
    description:
      "Comprendre le mécanisme de Prissat Mass Shevach (פריסת מס שבח), les dossiers où il peut être pertinent et les documents à rassembler après une vente immobilière.",
    metaDescription:
      "Lors d’une vente immobilière en Israël, la Prissat Mass Shevach (פריסת מס שבח) peut parfois réduire fortement l’impôt sur la plus-value. Découvrez le principe, les cas concernés et les points à vérifier.",
    excerpt:
      "La Prissat Mass Shevach (פריסת מס שבח) peut parfois répartir une plus-value immobilière sur plusieurs années et réduire l’impôt selon le profil du vendeur.",
    ...publication,
    readingTime: "8 min",
    ...defaultAuthor,
    tags: ["Mass Shevach", "פריסת מס שבח", "immobilier Israël", "plus-value immobilière", "vente appartement Israël", "formulaire 7003"],
    keywords: [
      "Prissat Mass Shevach",
      "Mass Shevach Israël",
      "plus-value immobilière Israël",
      "vente appartement Israël fiscalité",
      "formulaire 7003"
    ],
    featured: true,
    priority: 3,
    heroLabel: "Guide pratique",
    relatedArticleSlugs: ["mas-shevach-vente-appartement-israel", "revenus-locatifs-israel-masloulei-mas"],
    relatedCalculatorSlugs: ["impot-revenu-israel"],
    sources: [],
    cta: {
      title: "Vous avez vendu un bien en Israël ?",
      text: "Faites vérifier votre Mass Shevach (מס שבח) avant de laisser passer une possibilité d’économie.",
      label: "Faire vérifier mon Mass Shevach",
      whatsappMessage:
        "Bonjour Eliezer, j’ai vendu un bien en Israël et je souhaite vérifier si une Prissat Mass Shevach (פריסת מס שבח) peut être pertinente."
    },
    sections: [
      {
        title: "Qu’est-ce que le Mass Shevach (מס שבח) ?",
        paragraphs: [
          "Le Mass Shevach (מס שבח) est l’impôt israélien lié à la plus-value immobilière lors de la vente d’un bien. En pratique, il compare la valeur d’acquisition et la valeur de vente, avec des règles et ajustements à vérifier selon le dossier.",
          "Lors d’une vente immobilière en Israël, le Mass Shevach peut représenter un montant important. Dans certains cas, la Prissat Mass Shevach (פריסת מס שבח) permet de répartir la plus-value sur plusieurs années, ce qui peut réduire l’impôt selon la situation personnelle du vendeur."
        ]
      },
      {
        title: "Pourquoi l’impôt peut être élevé ?",
        bullets: [
          "Différence importante entre le prix d’achat et le prix de vente.",
          "Dates d’acquisition et de vente anciennes ou complexes.",
          "Exonérations partielles ou non utilisées.",
          "Tranches d’impôt personnelles du vendeur.",
          "נקודות זיכוי non utilisées certaines années.",
          "Âge, retraite, revenus faibles ou variables sur les années concernées.",
          "Autres revenus perçus pendant les années pertinentes."
        ]
      },
      {
        title: "Qu’est-ce que la Prissat Mass Shevach (פריסת מס שבח) ?",
        paragraphs: [
          "La Prissat Mass Shevach est un mécanisme qui peut permettre d’étaler la plus-value taxable sur plusieurs années, jusqu’à 4 ans lorsque les conditions sont réunies.",
          "L’idée est de ne pas concentrer toute la plus-value sur une seule année fiscale, mais de vérifier si une répartition sur des années précédentes améliore le résultat fiscal."
        ],
        callout: {
          title: "À vérifier au cas par cas",
          text: "Dans certains dossiers, l’économie peut être significative. Dans d’autres, l’impact peut être limité. Le calcul doit être vérifié.",
          tone: "warning"
        }
      },
      {
        title: "Pourquoi l’étalement peut réduire l’impôt ?",
        paragraphs: [
          "L’étalement peut changer l’interaction entre la plus-value, les tranches d’impôt personnelles et les crédits non utilisés. Le résultat dépend des revenus de chaque année.",
          "C’est particulièrement important lorsque le vendeur avait des revenus faibles, des crédits disponibles ou une situation personnelle qui modifie le calcul."
        ]
      },
      {
        title: "Qui devrait vérifier cette option ?",
        bullets: [
          "Vendeurs avec revenus faibles les années précédentes.",
          "Retraités.",
          "Personnes avec נקודות זיכוי non utilisées.",
          "Personnes ayant payé un Mass Shevach élevé.",
          "Vendeurs qui n’ont pas demandé la פריסה au moment de la vente.",
          "Personnes ayant vendu un appartement avec une plus-value importante."
        ]
      },
      {
        title: "Quels documents préparer ?",
        bullets: [
          "Contrat d’achat.",
          "Contrat de vente.",
          "Calcul fiscal reçu.",
          "שומת מס שבח.",
          "Dates d’acquisition et de vente.",
          "Données de revenus pour les années pertinentes.",
          "Avis d’imposition ou documents fiscaux disponibles.",
          "Détails d’identité du vendeur."
        ]
      },
      {
        title: "Cas pratique anonymisé",
        paragraphs: [
          "Exemple inspiré de situations rencontrées : un vendeur a payé un Mass Shevach élevé après la vente d’un appartement. Une vérification a montré que l’étalement de la plus-value sur des années précédentes pouvait potentiellement réduire la charge fiscale.",
          "Le résultat final dépend toujours des revenus, crédits et données fiscales de chaque année. Aucun montant ne doit être supposé sans calcul."
        ],
        links: [
          {
            href: "/fr/cas-reels/mas-shevach-vente-appartement-israel",
            label: "Lire le cas pratique anonymisé",
            description: "Comprendre les points à vérifier après une vente immobilière."
          }
        ]
      }
    ],
    faq: [
      {
        question: "Est-ce automatique ?",
        answer: "Non. La Prissat Mass Shevach (פריסת מס שבח) doit être vérifiée et demandée selon les règles applicables au dossier."
      },
      {
        question: "Peut-on demander la פריסה après la vente ?",
        answer:
          "Dans certains cas, une vérification après la vente peut être pertinente. Les délais, documents et possibilités doivent être confirmés selon le dossier."
      },
      {
        question: "Est-ce valable pour tout vendeur ?",
        answer: "Non. L’intérêt dépend des revenus, crédits, années concernées et règles applicables."
      },
      {
        question: "Est-ce que cela annule toujours le Mass Shevach ?",
        answer: "Non. L’étalement peut parfois réduire l’impôt, mais il ne l’annule pas automatiquement."
      },
      {
        question: "Combien d’années peut-on étaler ?",
        answer: "Le mécanisme peut aller jusqu’à 4 années lorsque les conditions sont remplies, à vérifier selon le dossier."
      }
    ]
  },
  {
    slug: "revenus-locatifs-israel-masloulei-mas",
    locale: "fr",
    type: "guide",
    category: "Immobilier",
    title: "Revenus locatifs en Israël : quel Massloul Mass (מסלול מס) choisir ?",
    seoTitle: "Revenus locatifs en Israël : Massloul Ptor, 10 % ou Massloul Mass Shouli ?",
    shortTitle: "Revenus locatifs",
    description:
      "Un guide simple pour comparer les principaux Massloulim Mass (מסלולי מס) applicables aux loyers résidentiels en Israël : exemption, 10 % ou imposition marginale.",
    metaDescription:
      "Vous louez un appartement en Israël ? Découvrez les 3 principaux Massloulim Mass (מסלולי מס) : exemption, 10 % ou imposition marginale, et les points à vérifier avant de choisir.",
    excerpt:
      "Les loyers résidentiels peuvent relever de plusieurs régimes. Le bon choix dépend du loyer, des dépenses, des autres revenus et de la situation personnelle.",
    ...publication,
    readingTime: "9 min",
    ...defaultAuthor,
    tags: ["revenus locatifs Israël", "Massloul Mass", "location appartement Israël", "פטור", "10 %", "מס שולי", "impôt loyers Israël"],
    keywords: [
      "revenus locatifs Israël",
      "Massloul Mass location",
      "impôt loyers Israël",
      "מסלול 10 %",
      "מס שולי loyers"
    ],
    imageTheme: "revenus locatifs / appartement / calculatrice / Massloul Mass",
    featured: true,
    priority: 2,
    heroLabel: "Guide pratique",
    relatedArticleSlugs: ["revenus-locatifs-choix-massloul-mass", "prisat-mas-shevach-israel"],
    relatedCalculatorSlugs: ["impot-revenus-locatifs-israel"],
    sources: [],
    cta: {
      title: "Vous louez un appartement en Israël ?",
      text: "Faites vérifier le Massloul Mass (מסלול מס) le plus adapté à votre situation avant de choisir par habitude.",
      label: "Tester le calculateur revenus locatifs",
      href: "/fr/calculateurs/impot-revenus-locatifs-israel",
      whatsappMessage:
        "Bonjour Eliezer, je loue un appartement en Israël et je souhaite vérifier quel Massloul Mass (מסלול מס) est le plus adapté."
    },
    sections: [
      {
        title: "Les 3 principaux Massloulim Mass (מסלולי מס)",
        paragraphs: [
          "Les revenus de location d’un appartement résidentiel en Israël peuvent être imposés selon plusieurs régimes. Le bon choix dépend du montant du loyer, de vos autres revenus, de vos dépenses et de votre situation personnelle.",
          "On parle souvent de trois grandes options : Massloul Ptor, Massloul 10 % ou Massloul Mass Shouli avec déclaration complète."
        ],
        numbered: ["Massloul Ptor (מסלול פטור).", "Massloul 10 %.", "Massloul Mass Shouli (מסלול מס שולי)."]
      },
      {
        title: "Massloul Ptor (מסלול פטור) : exemption totale ou partielle",
        bullets: [
          "Une exemption totale peut exister sous un plafond mensuel à vérifier chaque année.",
          "Une exemption partielle peut s’appliquer lorsque le loyer dépasse le plafond mais reste sous certaines limites.",
          "Le plafond doit être vérifié pour chaque année fiscale.",
          "Ce régime peut être utile pour des revenus locatifs plus faibles."
        ],
        callout: {
          title: "Seuils à vérifier",
          text: "À titre indicatif, le plafond 2025 était de 5,654 ₪ par mois. Ce montant doit être vérifié chaque année.",
          tone: "warning"
        }
      },
      {
        title: "Massloul 10 % : simple mais pas toujours optimal",
        paragraphs: [
          "Le Massloul 10 % consiste généralement à payer 10 % sur le loyer brut. Il peut paraître simple, mais il ne permet généralement pas de déduire les dépenses courantes.",
          "Les délais et modalités de paiement doivent être vérifiés. Ce régime peut être pertinent pour des contribuables avec un taux marginal élevé et peu de dépenses déductibles."
        ]
      },
      {
        title: "Massloul Mass Shouli (מסלול מס שולי) : déclaration complète",
        paragraphs: [
          "Dans le régime marginal, le loyer est ajouté aux autres revenus et imposé selon le taux personnel applicable. Selon le dossier, certaines dépenses éligibles peuvent être prises en compte.",
          "Ce régime peut devenir pertinent lorsque les dépenses sont élevées, lorsque le taux marginal personnel est faible ou lorsque la situation globale justifie une déclaration complète."
        ]
      },
      {
        title: "Comment choisir ?",
        bullets: [
          "Montant mensuel du loyer.",
          "Autres revenus du contribuable.",
          "Intérêts d’emprunt.",
          "Réparations et dépenses admissibles.",
          "Amortissement éventuel.",
          "Tranche personnelle d’impôt.",
          "Nature résidentielle ou non du bien.",
          "Nombre de biens loués.",
          "Âge et situation personnelle."
        ]
      },
      {
        title: "Tester le calculateur revenus locatifs",
        paragraphs: [
          "Le calculateur revenus locatifs permet de comparer le Massloul Ptor, le Massloul 10 % et le Massloul Mass Shouli selon les informations principales. Le résultat reste indicatif et doit être vérifié selon le dossier."
        ],
        callout: {
          title: "Quel Massloul Mass choisir pour mes loyers ?",
          text: "Testez une première simulation, puis faites vérifier le choix avant toute décision fiscale.",
          href: "/fr/calculateurs/impot-revenus-locatifs-israel",
          label: "Tester le calculateur revenus locatifs"
        }
      },
      {
        title: "Cas pratique anonymisé",
        paragraphs: [
          "Exemple inspiré de situations rencontrées : un propriétaire a choisi le Massloul 10 % parce qu’il semblait simple. Après revue des dépenses et des revenus personnels, une autre route pouvait être plus pertinente.",
          "La bonne réponse dépend du dossier : niveau de loyer, dépenses, autres revenus, année fiscale et situation personnelle."
        ],
        links: [
          {
            href: "/fr/cas-reels/revenus-locatifs-choix-massloul-mass",
            label: "Lire le cas pratique anonymisé",
            description: "Pourquoi le régime le plus simple n’est pas toujours le plus adapté."
          }
        ]
      }
    ],
    faq: [
      {
        question: "Dois-je déclarer mes loyers en Israël ?",
        answer:
          "Les revenus locatifs doivent être examinés selon le type de bien, le montant du loyer, le régime choisi et votre situation personnelle."
      },
      {
        question: "Le Massloul 10 % est-il toujours le plus simple ?",
        answer:
          "Il est simple dans certains cas, mais il n’est pas toujours le plus avantageux. Il faut comparer avec les autres Massloulim Mass."
      },
      {
        question: "Peut-on changer de Massloul Mass ?",
        answer: "Cela dépend des années concernées, des déclarations et des règles applicables. Le point doit être vérifié avant d’agir."
      },
      {
        question: "Les dépenses sont-elles déductibles ?",
        answer:
          "Dans certains Massloulim, des dépenses éligibles peuvent être prises en compte. Dans le Massloul 10 %, elles ne sont généralement pas déduites."
      },
      {
        question: "Que faire si je possède plusieurs appartements ?",
        answer: "Plusieurs biens peuvent modifier l’analyse. Il faut vérifier les montants, régimes et obligations pour l’ensemble de la situation."
      },
      {
        question: "Les loyers à l’étranger sont-ils concernés ?",
        answer:
          "Les revenus étrangers doivent être analysés séparément, notamment selon la résidence fiscale, la convention applicable et les obligations déclaratives."
      }
    ]
  },
  {
    slug: "esek-zair-israel-reforme",
    locale: "fr",
    type: "guide",
    category: "Indépendants",
    title: "עסק זעיר en Israël : la réforme expliquée simplement",
    seoTitle: "עסק זעיר en Israël : conditions, avantages et limites de la réforme",
    shortTitle: "עסק זעיר",
    description:
      "Comprendre la réforme עסק זעיר, ses avantages possibles, ses exclusions et les points à vérifier avant de choisir ce régime.",
    metaDescription:
      "La réforme עסק זעיר simplifie certaines démarches pour les petits indépendants en Israël. Découvrez les conditions, les avantages, les exclusions et les points à vérifier.",
    excerpt:
      "La réforme עסק זעיר peut simplifier certaines déclarations pour de petits indépendants, mais elle ne remplace pas l’analyse du dossier.",
    ...publication,
    readingTime: "8 min",
    ...defaultAuthor,
    tags: ["עסק זעיר", "עוסק פטור", "indépendant Israël", "déclaration fiscale", "רשות המסים", "עסק קטן"],
    keywords: [
      "עסק זעיר Israël",
      "réforme עסק זעיר",
      "petit indépendant Israël",
      "עוסק פטור עסק זעיר",
      "déclaration fiscale indépendant Israël"
    ],
    featured: false,
    priority: 4,
    heroLabel: "Guide pratique",
    relatedArticleSlugs: ["revenus-locatifs-israel-masloulei-mas"],
    relatedCalculatorSlugs: ["bituah-leumi-independant", "impot-revenu-israel"],
    sources: [
      {
        label: "gov.il : annonce רשות המסים sur עסק זעיר",
        href: "https://www.gov.il/he/pages/pa310526-1",
        status: "verified"
      },
      {
        label: "gov.il : income tax small business owner 2024",
        href: "https://www.gov.il/he/departments/topics/income-tax-small-business-owner-24",
        status: "verified"
      }
    ],
    cta: {
      title: "Vous pensez être concerné par עסק זעיר ?",
      text: "Faites vérifier si ce régime est adapté à votre activité indépendante, à vos dépenses et à vos obligations.",
      label: "Vérifier le régime עסק זעיר",
      whatsappMessage:
        "Bonjour Eliezer, je souhaite vérifier si le régime עסק זעיר est adapté à mon activité indépendante."
    },
    sections: [
      {
        title: "Qu’est-ce qu’un עסק זעיר ?",
        paragraphs: [
          "La réforme עסק זעיר vise à simplifier la gestion fiscale de certains petits indépendants en Israël. Elle peut permettre une déclaration plus simple et une reconnaissance automatique de dépenses, mais elle n’est pas adaptée à tous les dossiers.",
          "Il faut surtout ne pas confondre עסק זעיר avec les statuts TVA עוסק פטור et עוסק מורשה. Le statut TVA est une chose ; le régime simplifié d’impôt sur le revenu en est une autre."
        ]
      },
      {
        title: "Quels sont les avantages ?",
        bullets: [
          "Déclaration en ligne plus simple.",
          "Possibilité de déduction automatique de dépenses.",
          "Moins d’étapes administratives dans certains cas.",
          "Pas besoin de collecter chaque reçu pour la route de dépenses automatiques.",
          "Peut supprimer certains acomptes courants d’impôt sur le revenu dans certains cas."
        ]
      },
      {
        title: "La règle des 30% de dépenses automatiques",
        paragraphs: [
          "Le régime peut permettre une reconnaissance simplifiée d’un taux de dépenses. Mais si vos dépenses réelles dépassent ce niveau, le régime simplifié peut ne pas être optimal.",
          "Le calcul doit donc comparer la simplicité administrative avec l’impact fiscal réel."
        ],
        callout: {
          title: "Seuils et conditions",
          text: "Les seuils, exclusions et conditions doivent être vérifiés chaque année avant de prendre une décision.",
          tone: "warning"
        }
      },
      {
        title: "Qui peut être concerné ?",
        bullets: [
          "Petite activité indépendante.",
          "Chiffre d’affaires sous le seuil annuel applicable.",
          "Activité simple, sans structure complexe.",
          "Personne qui veut simplifier la conformité fiscale."
        ]
      },
      {
        title: "Qui doit faire attention ?",
        bullets: [
          "Professions ou situations exclues.",
          "Prestations à un ancien employeur.",
          "Services à des proches.",
          "Associés ou actionnaires contrôlants dans certaines situations.",
          "Personnes avec dépenses réelles supérieures à 30%.",
          "Personnes qui ont besoin d’une comptabilité plus détaillée pour leur activité."
        ]
      },
      {
        title: "עסק זעיר, עוסק פטור, עוסק מורשה : ne pas confondre",
        paragraphs: [
          "עוסק פטור et עוסק מורשה relèvent notamment de la TVA. עסק זעיר est un régime simplifié lié à l’impôt sur le revenu.",
          "Bitouah Leumi est encore un autre sujet : même si une démarche fiscale est simplifiée, il faut vérifier les obligations de ביטוח לאומי selon l’activité, les revenus et les heures."
        ],
        links: [
          {
            href: "/fr/calculateurs/bituah-leumi-independant",
            label: "Utiliser le calculateur Bitouah Leumi indépendant",
            description: "Estimer le statut et les cotisations à vérifier pour une activité indépendante."
          }
        ]
      },
      {
        title: "Cas pratique anonymisé",
        paragraphs: [
          "Exemple inspiré de situations rencontrées : un freelancer avec un chiffre d’affaires faible voulait simplifier sa déclaration. Le régime עסק זעיר semblait attractif, mais une revue était nécessaire pour vérifier les exclusions et comparer avec les dépenses réelles.",
          "La simplicité n’est utile que si elle reste adaptée au dossier."
        ]
      }
    ],
    faq: [
      {
        question: "Est-ce la même chose qu’un עוסק פטור ?",
        answer:
          "Non. עוסק פטור est lié au cadre TVA, tandis que עסק זעיר concerne une simplification d’impôt sur le revenu sous conditions."
      },
      {
        question: "Est-ce obligatoire ?",
        answer: "Non, il faut vérifier si le régime est possible et pertinent selon l’activité et les dépenses."
      },
      {
        question: "Que se passe-t-il si mes dépenses dépassent 30% ?",
        answer:
          "Le régime simplifié peut être moins intéressant si les dépenses réelles sont plus élevées. Une comparaison est nécessaire."
      },
      {
        question: "Est-ce adapté aux prestataires de services ?",
        answer:
          "Pas toujours. Certaines prestations ou relations commerciales peuvent nécessiter une vérification particulière."
      },
      {
        question: "Est-ce que je dois quand même gérer ביטוח לאומי ?",
        answer:
          "Oui, Bitouah Leumi est un sujet séparé. Les obligations doivent être vérifiées selon votre activité, vos revenus et vos heures."
      },
      {
        question: "Est-ce que cela remplace un conseil fiscal ?",
        answer:
          "Non. Le régime peut simplifier certains points, mais il ne remplace pas une vérification adaptée à votre activité."
      }
    ]
  },
  {
    slug: "certificat-residence-fiscale-retraite-france-israel",
    locale: "fr",
    type: "case-study",
    category: "France-Israël",
    title: "Cas pratique : prouver sa résidence fiscale israélienne auprès de la France",
    seoTitle: "Cas pratique : prouver sa résidence fiscale israélienne auprès de la France",
    shortTitle: "Résidence fiscale",
    description:
      "Cas pratique anonymisé autour d’une demande de preuve de résidence fiscale israélienne dans un contexte France-Israël.",
    metaDescription:
      "Cas pratique anonymisé : comprendre quel document demander pour prouver une résidence fiscale israélienne auprès d’un organisme français.",
    excerpt:
      "Une personne vivant en Israël devait comprendre quel document fiscal présenter à un organisme français et comment éviter la confusion avec d’autres attestations.",
    ...publication,
    readingTime: "4 min",
    ...defaultAuthor,
    tags: ["cas pratique anonymisé", "אישור תושבות מס", "résidence fiscale", "France-Israël"],
    keywords: ["cas résidence fiscale Israël France", "אישור תושבות מס France", "preuve résidence fiscale Israël"],
    featured: false,
    priority: 11,
    heroLabel: "Cas anonymisé",
    relatedArticleSlugs: ["certificat-residence-fiscale-israel"],
    relatedCalculatorSlugs: [],
    sources: [],
    cta: {
      title: "Vérifier mon besoin d’אישור תושבות מס",
      text: "Un échange permet de clarifier le document demandé et les pièces utiles avant d’agir.",
      label: "Vérifier mon document",
      whatsappMessage:
        "Bonjour Eliezer, je souhaite vérifier si j’ai besoin d’un אישור תושבות מס pour prouver ma résidence fiscale israélienne."
    },
    caseStudy: {
      situation:
        "Une personne vivant en Israël a reçu une demande de preuve de résidence fiscale de la part d’un organisme français.",
      problem:
        "Le risque était de demander la mauvaise attestation ou de confondre résidence fiscale internationale et document local israélien.",
      analysis:
        "Le travail consistait à comprendre l’objectif de la demande, l’année concernée et le type exact de document attendu.",
      lesson:
        "Dans un contexte France-Israël, le bon document dépend du besoin réel. Un אישור תושבות מס peut être utile, mais il ne remplace pas l’analyse du dossier."
    },
    sections: [
      {
        title: "Situation",
        paragraphs: [
          "Cas pratique anonymisé : une personne installée en Israël a été invitée à justifier sa résidence fiscale auprès d’un organisme français.",
          "L’enjeu principal n’était pas de promettre une exemption fiscale, mais de comprendre quel document officiel était attendu."
        ]
      },
      {
        title: "Problème",
        paragraphs: [
          "Plusieurs attestations peuvent porter des noms proches. Une confusion entre אישור תושבות מס, אישור תושבות local ou formulaire municipal peut retarder le dossier."
        ]
      },
      {
        title: "Analyse",
        paragraphs: [
          "Il fallait vérifier l’année concernée, le type de revenu ou de demande, l’organisme demandeur et la formulation exacte attendue.",
          "La démarche devait rester prudente : le document peut aider à prouver une situation, mais il ne garantit pas à lui seul un traitement fiscal déterminé en France."
        ]
      },
      {
        title: "Enseignement",
        paragraphs: [
          "Avant de demander un certificat, il faut clarifier le besoin. Dans certains cas, l’אישור תושבות מס est le bon document ; dans d’autres, une autre preuve peut être nécessaire."
        ],
        links: [
          {
            href: "/fr/guides/certificat-residence-fiscale-israel",
            label: "Lire le guide complet sur l’אישור תושבות מס"
          }
        ]
      }
    ]
  },
  {
    slug: "mas-shevach-vente-appartement-israel",
    locale: "fr",
    type: "case-study",
    category: "Immobilier",
    title: "Cas pratique : vérifier un Mass Shevach après une vente immobilière",
    seoTitle: "Cas pratique : vérifier un Mass Shevach après une vente immobilière",
    shortTitle: "Vente immobilière",
    description:
      "Cas pratique anonymisé sur les points à vérifier après un Mass Shevach élevé lors d’une vente immobilière en Israël.",
    metaDescription:
      "Cas pratique anonymisé : après une vente immobilière en Israël, vérifier si une Prissat Mass Shevach ou d’autres points peuvent réduire la charge fiscale.",
    excerpt:
      "Après une vente d’appartement, un Mass Shevach élevé peut justifier une revue du calcul, des années concernées et de la possibilité de Prissat Mass Shevach.",
    ...publication,
    readingTime: "4 min",
    ...defaultAuthor,
    tags: ["cas pratique anonymisé", "Mass Shevach", "פריסת מס שבח", "vente immobilière Israël"],
    keywords: ["cas Mass Shevach Israël", "vérifier Mass Shevach", "Prissat Mass Shevach cas pratique"],
    featured: false,
    priority: 12,
    heroLabel: "Cas anonymisé",
    relatedArticleSlugs: ["prisat-mas-shevach-israel", "revenus-locatifs-israel-masloulei-mas"],
    relatedCalculatorSlugs: ["impot-revenu-israel"],
    sources: [],
    cta: {
      title: "Faire vérifier mon Mass Shevach",
      text: "Une revue peut identifier les points à vérifier après la vente, sans garantie de résultat.",
      label: "Faire vérifier mon Mass Shevach",
      whatsappMessage: "Bonjour Eliezer, j’ai vendu un bien en Israël et je souhaite faire vérifier mon Mass Shevach (מס שבח)."
    },
    caseStudy: {
      situation:
        "Un vendeur a reçu un calcul de Mass Shevach important après la vente d’un appartement en Israël.",
      problem:
        "La question était de savoir si une Prissat Mass Shevach ou une autre vérification pouvait réduire la charge fiscale.",
      analysis:
        "Les années de revenus, les crédits disponibles et les documents de vente devaient être revus avant toute conclusion.",
      lesson:
        "Un Mass Shevach élevé ne signifie pas automatiquement qu’une économie est possible, mais il mérite souvent une vérification structurée."
    },
    sections: [
      {
        title: "Situation",
        paragraphs: [
          "Cas pratique anonymisé : après la vente d’un appartement, le vendeur a reçu un montant de Mass Shevach qu’il trouvait élevé.",
          "Le sujet n’était pas de promettre une réduction, mais de vérifier si le calcul et les options disponibles avaient été correctement examinés."
        ]
      },
      {
        title: "Problème",
        paragraphs: [
          "Lorsqu’un Mass Shevach est payé rapidement après une vente, certaines personnes ne vérifient pas la possibilité d’une Prissat Mass Shevach ou l’impact de leurs revenus des années précédentes."
        ]
      },
      {
        title: "Analyse",
        paragraphs: [
          "La revue devait porter sur les dates, les contrats, le calcul reçu, les revenus des années pertinentes et les crédits personnels non utilisés.",
          "La פריסה peut parfois réduire l’impôt, mais son effet dépend de chaque année fiscale."
        ]
      },
      {
        title: "Enseignement",
        paragraphs: [
          "Après une vente immobilière, il est utile de garder tous les documents et de vérifier rapidement si une option d’étalement ou de correction peut être pertinente."
        ],
        links: [
          {
            href: "/fr/guides/prisat-mas-shevach-israel",
            label: "Lire le guide sur la Prissat Mass Shevach"
          }
        ]
      }
    ]
  },
  {
    slug: "revenus-locatifs-choix-massloul-mass",
    locale: "fr",
    type: "case-study",
    category: "Immobilier",
    title: "Cas pratique : choisir le bon Massloul Mass pour des loyers en Israël",
    seoTitle: "Cas pratique : choisir le bon Massloul Mass pour des loyers en Israël",
    shortTitle: "Choix Massloul Mass",
    description:
      "Cas pratique anonymisé sur le choix entre Massloul Ptor, Massloul 10 % et Massloul Mass Shouli pour des revenus locatifs en Israël.",
    metaDescription:
      "Cas pratique anonymisé : pourquoi le Massloul 10 % n’est pas toujours le plus adapté pour des revenus locatifs en Israël.",
    excerpt:
      "Un propriétaire devait choisir entre Massloul Ptor, Massloul 10 % et Massloul Mass Shouli. La leçon : le plus simple n’est pas toujours le plus adapté.",
    ...publication,
    readingTime: "4 min",
    ...defaultAuthor,
    tags: ["cas pratique anonymisé", "revenus locatifs", "Massloul Mass", "10 %", "פטור", "מס שולי"],
    keywords: ["cas revenus locatifs Israël", "choisir Massloul Mass", "location appartement Israël fiscalité"],
    imageTheme: "revenus locatifs / appartement / calculatrice / Massloul Mass",
    featured: false,
    priority: 13,
    heroLabel: "Cas anonymisé",
    relatedArticleSlugs: ["revenus-locatifs-israel-masloulei-mas", "prisat-mas-shevach-israel"],
    relatedCalculatorSlugs: ["impot-revenus-locatifs-israel"],
    sources: [],
    cta: {
      title: "Vérifier mes revenus locatifs",
      text: "Le bon Massloul Mass dépend de vos loyers, dépenses et autres revenus.",
      label: "Faire vérifier mes revenus locatifs",
      whatsappMessage:
        "Bonjour Eliezer, je loue un appartement en Israël et je souhaite vérifier quel Massloul Mass est le plus avantageux pour mes revenus locatifs."
    },
    caseStudy: {
      situation:
        "Un propriétaire louait un appartement résidentiel et avait choisi le Massloul 10 % parce qu’il semblait simple.",
      problem:
        "Après ajout des dépenses et des autres revenus, une autre route pouvait parfois mériter une vérification.",
      analysis:
        "Le choix devait comparer le loyer, les dépenses, les autres revenus et la tranche marginale, puis être confronté au calculateur.",
      lesson:
        "Le Massloul le plus simple n’est pas toujours le plus adapté. Les chiffres doivent être posés avant de choisir."
    },
    sections: [
      {
        title: "Situation",
        paragraphs: [
          "Cas pratique anonymisé : un propriétaire percevait un loyer résidentiel en Israël et avait choisi mentalement le Massloul 10 % parce qu’il semblait simple.",
          "Dans un exemple illustratif, le loyer mensuel pouvait être autour de 7,500 ₪, avec des dépenses annuelles importantes liées aux intérêts, réparations et frais de gestion."
        ]
      },
      {
        title: "La crainte du client",
        paragraphs: [
          "Sa crainte était de compliquer inutilement le dossier. Il pensait que le Massloul 10 % évitait toute discussion, mais il ne savait pas si les dépenses et les autres revenus changeaient l’analyse."
        ]
      },
      {
        title: "Le point fiscal à vérifier",
        paragraphs: [
          "Le choix d’un Massloul Mass ne dépend pas seulement du loyer. Il peut aussi dépendre des dépenses, des autres revenus, de la tranche marginale, du nombre de biens et de la nature résidentielle de la location."
        ]
      },
      {
        title: "L’analyse",
        paragraphs: [
          "Il fallait comparer Massloul Ptor, Massloul 10 % et Massloul Mass Shouli. Le Massloul 10 % peut être pratique, mais il n’est pas forcément optimal si les dépenses déclarables ou la situation personnelle modifient le calcul.",
          "Une première simulation permettait de voir quelle route semblait la plus avantageuse, puis de décider quels documents devaient être revus avant de déclarer."
        ]
      },
      {
        title: "Ce que ce cas montre",
        paragraphs: [
          "Avant de choisir, il faut poser les chiffres principaux et vérifier l’année fiscale concernée. Le choix doit rester documenté et adapté au dossier.",
          "Le calculateur aide à comparer les routes, mais une vérification personnalisée reste recommandée lorsque les dépenses sont élevées, que plusieurs biens sont loués ou que les revenus personnels changent la tranche marginale."
        ],
        links: [
          {
            href: "/fr/calculateurs/impot-revenus-locatifs-israel",
            label: "Tester le calculateur revenus locatifs"
          },
          {
            href: "/fr/guides/revenus-locatifs-israel-masloulei-mas",
            label: "Lire le guide sur les revenus locatifs"
          }
        ]
      }
    ]
  },
  {
    slug: "mass-rehisha-meshaper-diyur",
    locale: "fr",
    type: "guide",
    category: "Immobilier",
    title: "Acheter un 2e appartement sur plan tout en payant le Mass Rehisha comme une דירה יחידה",
    seoTitle: "Mass Rehisha et משפר דיור : acheter un 2e appartement sur plan comme דירה יחידה",
    shortTitle: "Mass Rehisha משפר דיור",
    description:
      "Comprendre comment le statut de משפר דיור peut parfois permettre de payer le Mass Rehisha comme une דירה יחידה lors d’un achat sur plan.",
    metaDescription:
      "Vous achetez un nouvel appartement sur plan en Israël alors que vous possédez déjà un bien ? Découvrez comment le statut de משפר דיור peut parfois permettre de payer le Mass Rehisha comme une דירה יחידה, sous conditions.",
    excerpt:
      "Une personne qui possède déjà un appartement et achète sur plan peut parfois être traitée comme משפר דיור, mais les délais doivent être vérifiés avant de signer.",
    ...publication,
    readingTime: "8 min",
    ...defaultAuthor,
    tags: ["Mass Rehisha", "מס רכישה", "משפר דיור", "דירה יחידה", "דירה שנייה", "achat sur plan", "קבלן", "טופס 4", "immobilier Israël"],
    keywords: [
      "Mass Rehisha משפר דיור",
      "מס רכישה דירה יחידה",
      "acheter deuxième appartement Israël",
      "achat sur plan קבלן",
      "טופס 4 Mass Rehisha"
    ],
    featured: true,
    priority: 4,
    heroLabel: "Guide pratique immobilier",
    relatedArticleSlugs: [
      "acheter-2e-appartement-sur-plan-mass-rehisha-dira-yehida",
      "prisat-mas-shevach-israel",
      "mas-shevach-vente-appartement-israel"
    ],
    relatedCalculatorSlugs: [],
    sources: [],
    cta: {
      title: "Vous achetez un appartement sur plan en Israël ?",
      text: "Avant de signer, vérifiez si votre achat peut être traité comme une דירה יחידה et quelles conditions doivent être respectées.",
      label: "Vérifier mon Mass Rehisha",
      whatsappMessage:
        "Bonjour Eliezer, je possède déjà un appartement et je souhaite acheter un nouveau bien sur plan en Israël. Je veux vérifier si je peux être traité comme משפר דיור et payer le Mass Rehisha comme une דירה יחידה."
    },
    sections: [
      {
        title: "Pourquoi ce sujet est important ?",
        paragraphs: [
          "En Israël, une personne qui possède déjà un appartement et achète un nouveau bien peut parfois être considérée comme משפר דיור. Dans certains cas, cela permet de bénéficier du traitement fiscal d’une דירה יחידה pour le Mass Rehisha, même si elle détient temporairement deux appartements.",
          "Mass Rehisha (מס רכישה) est la taxe d’acquisition payée lors de l’achat d’un bien immobilier en Israël. La différence entre le traitement דירה יחידה et le traitement דירה שנייה peut être très importante, surtout lorsque le prix du bien est élevé.",
          "Beaucoup d’acheteurs signent avec un קבלן sans avoir clarifié la chronologie fiscale. Or, dans certains dossiers, l’enjeu peut représenter des dizaines, voire des centaines de milliers de shekels. L’enjeu ne se limite pas au Mass Rehisha : il peut aussi concerner la stratégie de conservation et de revente des deux biens."
        ],
        bullets: [
          "Le traitement דירה יחידה peut être beaucoup plus favorable qu’un traitement דירה שנייה.",
          "Un retard ou une erreur de calendrier peut créer une exposition fiscale importante.",
          "Le sujet est fréquent pour des francophones qui achètent un appartement neuf tout en gardant temporairement leur premier logement.",
          "Les délais et règles doivent être vérifiés avant de signer."
        ]
      },
      {
        title: "דירה יחידה, דירה שנייה, משפר דיור : comprendre les bases",
        paragraphs: [
          "דירה יחידה signifie généralement appartement résidentiel unique. דירה שנייה renvoie au traitement d’un second appartement, souvent plus lourd fiscalement.",
          "משפר דיור désigne un acheteur qui remplace son appartement existant par un nouveau logement. La loi peut permettre une détention temporaire de deux appartements si l’ancien appartement est vendu dans le délai requis."
        ]
      },
      {
        title: "Le cas typique : acheter sur plan chez un קבלן",
        paragraphs: [
          "La situation classique est simple : vous possédez l’appartement A, vous achetez l’appartement B auprès d’un קבלן, et vous ne recevez pas les clés immédiatement.",
          "Vous pouvez vouloir garder l’appartement A jusqu’à la livraison du nouveau bien. La question centrale devient alors : à quelle date l’appartement A doit-il être vendu pour conserver le traitement דירה יחידה ?"
        ]
      },
      {
        title: "Le vrai avantage : 2 appartements temporairement, mais un traitement דירה יחידה",
        paragraphs: [
          "En pratique, le sujet peut se résumer ainsi : vous avez temporairement 2 appartements, mais vous voulez être traité fiscalement comme quelqu’un qui remplace sa דירה יחידה.",
          "Un acheteur peut déjà posséder l’appartement A et acheter l’appartement B sur plan auprès d’un קבלן. Si les conditions et délais sont respectés, il peut parfois payer le Mass Rehisha sur l’appartement B selon le traitement דירה יחידה, même si l’appartement A est encore détenu temporairement.",
          "La logique économique peut être forte : pendant la construction, l’acheteur conserve l’appartement A, tandis que l’appartement B peut aussi prendre de la valeur pendant la période du projet. Si les conditions sont remplies, le Mass Rehisha peut être calculé comme דירה יחידה au lieu de דירה שנייה. Cette combinaison peut être puissante, mais elle doit être vérifiée avant signature."
        ],
        callout: {
          title: "Exemple illustratif",
          text: "Appartement A déjà détenu. Appartement B acheté sur plan en 01/2025, livraison attendue autour de 08/2030. Si les règles applicables, le טופס 4, la remise des clés et la situation personnelle le permettent, l’appartement A pourrait potentiellement être vendu dans la période autorisée après livraison, par exemple autour de 07/2031. Le délai exact doit être vérifié selon le droit en vigueur et le dossier.",
          tone: "warning"
        }
      },
      {
        title: "Quel est le lien avec le Mass Rehisha ?",
        paragraphs: [
          "Le Mass Rehisha (מס רכישה) est la taxe d’acquisition payée lors de l’achat d’un bien immobilier en Israël. Les tranches applicables à une דירה יחידה peuvent être significativement plus favorables que les tranches applicables à une דירה שנייה.",
          "Une mauvaise déclaration ou un délai manqué peut entraîner un complément d’impôt, des intérêts, une indexation ou des pénalités selon le cas. Le calcul doit être vérifié avant le dépôt."
        ]
      },
      {
        title: "Quel est le délai pour vendre l’ancien appartement ?",
        paragraphs: [
          "Le délai dépend notamment du type d’achat : bien déjà construit, achat sur plan, date de remise des clés, טופס 4 et règles en vigueur au moment de l’opération.",
          "Dans un achat sur plan, le point de départ peut être différent d’un achat de seconde main. C’est précisément ce qu’il faut vérifier avant de signer."
        ],
        callout: {
          title: "Point de prudence",
          text: "Ne vous fiez pas à une règle entendue oralement. Les délais doivent être confirmés selon votre contrat, la livraison prévue et les règles en vigueur.",
          tone: "warning"
        }
      },
      {
        title: "Les erreurs fréquentes",
        bullets: [
          "Penser que le bénéfice est automatique.",
          "Ne pas déclarer correctement l’intention de vendre l’ancien appartement.",
          "Manquer le délai de vente.",
          "Confondre Mass Rehisha et Mass Shevach.",
          "Ignorer l’impact d’un retard de construction.",
          "Ne pas vérifier si l’ancien appartement peut bénéficier d’une exonération de Mass Shevach.",
          "Attendre après la signature pour poser les questions fiscales."
        ]
      },
      {
        title: "Documents à préparer",
        bullets: [
          "Détails d’achat de l’appartement actuel.",
          "Contrat ou projet de contrat du nouvel appartement.",
          "Date de livraison prévue.",
          "Informations טופס 4 si elles sont disponibles.",
          "Financement et prêt immobilier si pertinent.",
          "Tout calcul fiscal reçu de l’avocat ou de l’administration.",
          "Situation familiale et propriété des biens.",
          "Ventes immobilières précédentes si elles peuvent être pertinentes."
        ]
      },
      {
        title: "Comment Eliezer peut vous aider",
        bullets: [
          "Revoir la situation avant la signature.",
          "Clarifier si le traitement משפר דיור peut s’appliquer.",
          "Vérifier l’exposition au Mass Rehisha.",
          "Identifier le lien éventuel avec le Mass Shevach lors de la vente.",
          "Préparer les questions à poser à l’avocat ou à l’administration.",
          "Expliquer la chronologie fiscale en français."
        ],
        links: [
          {
            href: "/fr/cas-reels/acheter-2e-appartement-sur-plan-mass-rehisha-dira-yehida",
            label: "Lire le cas pratique Mass Rehisha"
          },
          {
            href: "/fr/services",
            label: "Voir l’accompagnement fiscal immobilier"
          },
          {
            href: "/fr/contact",
            label: "Contacter Eliezer"
          }
        ]
      }
    ],
    faq: [
      {
        question: "Puis-je acheter un nouvel appartement avant de vendre l’ancien ?",
        answer:
          "Dans certains cas, oui. Mais le traitement fiscal dépend des conditions, des déclarations et du délai de vente de l’ancien appartement."
      },
      {
        question: "Est-ce que je paie automatiquement le Mass Rehisha comme דירה יחידה ?",
        answer:
          "Non. Le traitement משפר דיור doit être vérifié selon le dossier et les conditions applicables."
      },
      {
        question: "Que se passe-t-il si le קבלן livre en retard ?",
        answer:
          "Un retard peut modifier la chronologie à vérifier. Il faut examiner le contrat, la livraison prévue, le טופס 4 et les règles en vigueur."
      },
      {
        question: "Quelle différence entre Mass Rehisha et Mass Shevach ?",
        answer:
          "Le Mass Rehisha concerne l’achat. Le Mass Shevach concerne la plus-value lors de la vente. Les deux sujets peuvent se croiser dans un remplacement d’appartement."
      },
      {
        question: "Est-ce que je dois vendre avant de recevoir les clés ?",
        answer:
          "Cela dépend du type d’achat et des règles applicables. Le point doit être vérifié avant de signer."
      },
      {
        question: "Dois-je vérifier cela avant de signer ?",
        answer:
          "Oui. La fiscalité doit être comprise avant la signature, car le contrat, la déclaration et les délais peuvent avoir un impact important."
      }
    ]
  },
  {
    slug: "nekoudot-zikouy-milouim-2026",
    locale: "fr",
    type: "guide",
    category: "Actualités fiscales",
    title: "Nekoudot Zikouy מילואים 2026 : comment utiliser l’attestation de Tsahal",
    seoTitle: "Nekoudot Zikouy מילואים 2026 : obtenir l’attestation depuis l’אזור אישי de Tsahal",
    shortTitle: "Nekoudot Zikouy מילואים",
    description:
      "Comprendre comment obtenir et utiliser l’attestation Tsahal liée aux Nekoudot Zikouy après des jours de מילואים.",
    metaDescription:
      "Les soldats de réserve peuvent avoir droit à des Nekoudot Zikouy en 2026 selon leurs jours de מילואים. Découvrez comment obtenir l’attestation officielle depuis l’אזור אישי de Tsahal et l’utiliser pour Mass Hachnassa.",
    excerpt:
      "Les jours de מילואים peuvent ouvrir droit à des Nekoudot Zikouy, mais l’attestation officielle de Tsahal doit être générée et transmise correctement.",
    ...publication,
    readingTime: "6 min",
    ...defaultAuthor,
    tags: ["Nekoudot Zikouy", "נקודות זיכוי", "מילואים", "Tsahal", "Mass Hachnassa", "impôt Israël", "2026", "אזור אישי"],
    keywords: [
      "Nekoudot Zikouy מילואים 2026",
      "נקודות זיכוי מילואים",
      "attestation Tsahal אזור אישי",
      "Mass Hachnassa מילואים",
      "réserviste impôt Israël"
    ],
    featured: false,
    priority: 5,
    heroLabel: "Mise à jour fiscale 2026",
    relatedArticleSlugs: ["nekoudot-zikouy-milouim-attestation-tsahal", "certificat-residence-fiscale-israel"],
    relatedCalculatorSlugs: ["nekoudot-zikouy", "ehzer-mass"],
    sources: [],
    cta: {
      title: "Vous avez fait des מילואים ?",
      text: "Vérifiez si vos Nekoudot Zikouy ont bien été prises en compte par Mass Hachnassa ou votre employeur.",
      label: "Vérifier mes Nekoudot Zikouy",
      whatsappMessage:
        "Bonjour Eliezer, j’ai effectué des מילואים et je souhaite vérifier mes Nekoudot Zikouy pour Mass Hachnassa."
    },
    sections: [
      {
        title: "De quoi parle cette mise à jour ?",
        paragraphs: [
          "À partir de 2026, les personnes ayant effectué des jours de מילואים admissibles en 2025 peuvent, dans certains cas, bénéficier de Nekoudot Zikouy auprès de Mass Hachnassa.",
          "Le droit dépend de l’éligibilité, du nombre de jours pris en compte, du service dans un מערך מזכה et de la confirmation officielle. Les niveaux d’activité concernés incluent notamment א'+, א' et ב', selon les règles applicables.",
          "Les Nekoudot Zikouy ne sont pas une prime ponctuelle : ce sont des points de crédit d’impôt qui réduisent l’impôt sur le revenu. Pour les salariés, l’avantage se reflète généralement dans la paie lorsque l’employeur met à jour les données fiscales."
        ]
      },
      {
        title: "Quel document faut-il générer ?",
        paragraphs: [
          "Pour obtenir l’attestation, il faut se connecter à l’אזור אישי sur le site des מילואים de Tsahal et générer le document officiel : נקודות זיכוי לשנת 2025.",
          "Ce document indique les jours admissibles dans le cadre éligible. Il sert de support officiel pour l’avantage fiscal et peut être nécessaire pour la paie ou la déclaration fiscale.",
          "Si le nombre de jours indiqué dans l’attestation ne correspond pas aux jours réellement effectués, il vaut mieux attendre la mise à jour des données avant de transmettre le document à l’employeur."
        ]
      },
      {
        title: "Pourquoi l’attestation parle de 2025 alors que l’avantage est utilisé en 2026 ?",
        paragraphs: [
          "Les jours effectués pendant l’année pertinente peuvent influencer le traitement des Nekoudot Zikouy de l’année fiscale suivante, selon les règles officielles et la mise en œuvre par la paie ou la déclaration.",
          "Il faut vérifier l’année exacte indiquée sur l’attestation et l’année fiscale concernée avant de l’utiliser."
        ]
      },
      {
        title: "Comment un salarié utilise cette attestation ?",
        bullets: [
          "Télécharger l’attestation depuis l’אזור אישי.",
          "L’envoyer à l’employeur ou au service paie.",
          "Marquer ou mettre à jour le טופס 101 si nécessaire.",
          "Contrôler les fiches de paie après la mise à jour.",
          "Garder une copie pour une revue annuelle.",
          "En cas de plusieurs employeurs, effectuer un תיאום מס."
        ],
        callout: {
          title: "Attention aux données incorrectes",
          text: "Transmettre des données erronées peut créer un excès de crédit d’impôt et une dette future envers Mass Hachnassa. Si l’attestation est absente ou incorrecte, il faut contacter les ressources humaines de l’unité ou la hotline מילואים : 1111 extension 4.",
          tone: "warning"
        }
      },
      {
        title: "Comment un indépendant utilise cette attestation ?",
        bullets: [
          "Conserver l’attestation officielle.",
          "L’utiliser dans la déclaration annuelle.",
          "La transmettre lors de la préparation ou de la revue annuelle avec un conseiller fiscal.",
          "Vérifier son impact éventuel sur le calcul de Mass Hachnassa.",
          "Ne pas supposer que le droit est appliqué automatiquement."
        ]
      },
      {
        title: "Combien de Nekoudot Zikouy peut-on recevoir ?",
        paragraphs: [
          "L’éligibilité commence à partir de 30 jours admissibles. Le barème ci-dessous reprend l’échelle fournie pour les jours de מילואים admissibles en מערך מזכה, à vérifier avec l’attestation officielle avant toute utilisation."
        ],
        bullets: [
          "0-29 jours : 0 point.",
          "30-39 jours admissibles : 0,50 point.",
          "40-49 jours admissibles : 0,75 point.",
          "50-54 jours admissibles : 1,00 point.",
          "55-59 jours admissibles : 1,25 point.",
          "60-64 jours admissibles : 1,50 point.",
          "65-69 jours admissibles : 1,75 point.",
          "70-74 jours admissibles : 2 points.",
          "75-79 jours admissibles : 2,25 points.",
          "80-84 jours admissibles : 2,50 points.",
          "85-89 jours admissibles : 2,75 points.",
          "90-94 jours admissibles : 3 points.",
          "95-99 jours admissibles : 3,25 points.",
          "100-104 jours admissibles : 3,50 points.",
          "105-109 jours admissibles : 3,75 points.",
          "110 jours et plus : 4 points."
        ],
        callout: {
          title: "Valeur annuelle à vérifier",
          text: "La valeur annuelle d’une Nekoudat Zikouy doit être vérifiée chaque année avant de publier ou d’utiliser un montant en shekels.",
          tone: "warning"
        }
      },
      {
        title: "Erreurs fréquentes",
        bullets: [
          "Ne pas télécharger l’attestation.",
          "Envoyer un document מילואים générique au lieu de l’attestation spécifique Nekoudot Zikouy.",
          "Ne pas mettre à jour le טופס 101 si nécessaire.",
          "Ne pas vérifier la paie après la mise à jour.",
          "Confondre jours admissibles et total des jours de réserve.",
          "Oublier d’inclure l’attestation dans la revue annuelle.",
          "Transmettre l’attestation alors que le nombre de jours n’est pas encore à jour.",
          "Oublier le תיאום מס lorsqu’il existe plusieurs employeurs."
        ]
      },
      {
        title: "Comment Eliezer peut vous aider",
        bullets: [
          "Vérifier si l’attestation est le bon document.",
          "Expliquer quoi transmettre à l’employeur.",
          "Relire une fiche de paie ou le résultat fiscal.",
          "Intégrer l’attestation dans une revue annuelle si nécessaire.",
          "Vérifier si un תיאום מס est nécessaire en présence de plusieurs employeurs."
        ],
        links: [
          {
            href: "/fr/cas-reels/nekoudot-zikouy-milouim-attestation-tsahal",
            label: "Lire le cas pratique מילואים"
          },
          {
            href: "/fr/hahzar-mas-remboursement-impot-israel",
            label: "Lire la page Ehzer Mass"
          },
          {
            href: "/fr/contact",
            label: "Contacter Eliezer"
          }
        ]
      }
    ],
    faq: [
      {
        question: "Où télécharger l’attestation Nekoudot Zikouy מילואים ?",
        answer:
          "Elle doit généralement être générée depuis l’אזור אישי sur le site des מילואים de Tsahal."
      },
      {
        question: "Pourquoi l’attestation s’appelle נקודות זיכוי לשנת 2025 ?",
        answer:
          "L’année indiquée sur le document doit être rapprochée de l’année fiscale concernée. Il faut vérifier le document exact avant de l’utiliser."
      },
      {
        question: "Que doit faire un salarié ?",
        answer:
          "Télécharger l’attestation, la transmettre à l’employeur ou à la paie, mettre à jour le טופס 101 si nécessaire, puis vérifier que le calcul a bien été mis à jour si le droit s’applique."
      },
      {
        question: "Que doit faire un indépendant ?",
        answer:
          "Conserver l’attestation et la transmettre lors de la préparation ou de la revue annuelle de Mass Hachnassa."
      },
      {
        question: "Est-ce automatique ?",
        answer:
          "Pas toujours. L’attestation, le nombre de jours admissibles, le טופס 101 et la paie doivent être vérifiés selon la situation."
      },
      {
        question: "Dois-je garder l’attestation ?",
        answer:
          "Oui. Il faut garder une copie pour la paie, la déclaration annuelle ou une vérification future."
      }
    ]
  },
  {
    slug: "acheter-2e-appartement-sur-plan-mass-rehisha-dira-yehida",
    locale: "fr",
    type: "case-study",
    category: "Immobilier",
    title: "Cas pratique : acheter un 2e appartement sur plan tout en payant le Mass Rehisha comme une דירה יחידה",
    seoTitle: "Cas pratique Mass Rehisha : acheter un 2e appartement sur plan comme דירה יחידה",
    shortTitle: "Achat sur plan דירה יחידה",
    description:
      "Cas pratique anonymisé sur un achat sur plan où le statut משפר דיור devait être vérifié avant de signer.",
    metaDescription:
      "Un cas pratique anonymisé pour comprendre comment un achat sur plan peut parfois être traité comme משפר דיור, avec un Mass Rehisha de דירה יחידה sous conditions.",
    excerpt:
      "Une famille possédait déjà un appartement et voulait acheter sur plan sans vendre immédiatement. Le calendrier fiscal devait être compris avant la signature.",
    ...publication,
    readingTime: "4 min",
    ...defaultAuthor,
    tags: ["cas pratique anonymisé", "Mass Rehisha", "משפר דיור", "דירה יחידה", "קבלן", "achat sur plan"],
    keywords: ["cas Mass Rehisha", "acheter deuxième appartement Israël", "משפר דיור דירה יחידה"],
    featured: false,
    priority: 14,
    heroLabel: "Cas pratique anonymisé",
    relatedArticleSlugs: ["mass-rehisha-meshaper-diyur", "prisat-mas-shevach-israel"],
    relatedCalculatorSlugs: [],
    sources: [],
    cta: {
      title: "Vérifier mon achat sur plan",
      text: "Avant de signer, vérifiez le traitement Mass Rehisha et le calendrier de vente de l’ancien bien.",
      label: "Vérifier mon achat sur plan",
      whatsappMessage:
        "Bonjour Eliezer, je possède déjà un appartement et j’envisage d’acheter un 2e bien sur plan. Je souhaite vérifier si je peux payer le Mass Rehisha comme une דירה יחידה et comment organiser le calendrier de vente."
    },
    caseStudy: {
      situation:
        "Une famille possédait l’appartement A et voulait signer l’achat d’un appartement B sur plan auprès d’un קבלן en 01/2025.",
      problem:
        "Elle craignait de payer le Mass Rehisha comme דירה שנייה ou de devoir vendre trop tôt l’appartement A.",
      analysis:
        "Le point fiscal était le calendrier : signature, livraison prévue autour de 08/2030, טופס 4, remise des clés et fenêtre de vente possible.",
      lesson:
        "Le traitement משפר דיור peut être très utile dans certains dossiers, mais seulement si les conditions et délais sont respectés."
    },
    sections: [
      {
        title: "Situation",
        paragraphs: [
          "Cas pratique anonymisé, avec dates illustratives : une famille francophone en Israël possédait déjà l’appartement A et souhaitait acheter l’appartement B sur plan auprès d’un קבלן.",
          "La signature du nouveau bien était envisagée en 01/2025, avec une livraison annoncée autour de 08/2030. La famille ne voulait pas vendre l’appartement A trop tôt, car elle devait continuer à y vivre jusqu’à la remise des clés."
        ]
      },
      {
        title: "La crainte du client",
        paragraphs: [
          "La première crainte était de payer immédiatement le Mass Rehisha comme acheteur d’une דירה שנייה. La seconde était de vendre l’appartement A trop tôt et de perdre plusieurs années de conservation potentielle pendant la construction.",
          "La famille craignait aussi de manquer le délai légal, ou de créer une exposition inattendue au Mass Shevach ou au Mass Rehisha."
        ]
      },
      {
        title: "Le point fiscal à vérifier",
        paragraphs: [
          "Dans ce type de dossier, la question n’est pas seulement : acheter ou vendre ? La vraie question est le calendrier fiscal.",
          "Il faut poser la date d’achat, la date de livraison prévue, le טופס 4, la remise des clés, la déclaration à l’administration fiscale et la date de vente envisagée pour l’appartement A."
        ]
      },
      {
        title: "L’analyse",
        paragraphs: [
          "À titre d’exemple simplifié, si l’appartement B est acheté en 01/2025 et livré autour de 08/2030, l’appartement A pourrait potentiellement être vendu dans la période autorisée après livraison, par exemple autour de 07/2031, si les règles applicables et les conditions du dossier le permettent.",
          "L’intérêt d’une revue fiscale est de vérifier si le traitement משפר דיור peut s’appliquer, d’éviter un traitement דירה שנייה lorsque le traitement דירה יחידה peut être disponible, et de planifier la vente sans précipitation inutile."
        ]
      },
      {
        title: "Ce que ce cas montre",
        paragraphs: [
          "Dans certains cas, la différence entre les deux traitements peut atteindre des dizaines, voire des centaines de milliers de shekels, selon les prix et les délais.",
          "Conserver les deux biens pendant une longue construction peut aussi créer une opportunité de valorisation, mais cela doit être mis en balance avec le financement, le risque de marché et les délais fiscaux. Le calendrier doit être cadré avant la signature."
        ],
        links: [
          {
            href: "/fr/guides/mass-rehisha-meshaper-diyur",
            label: "Lire le guide Mass Rehisha / משפר דיור"
          }
        ]
      }
    ]
  },
  {
    slug: "nekoudot-zikouy-milouim-attestation-tsahal",
    locale: "fr",
    type: "case-study",
    category: "Actualités fiscales",
    title: "Cas pratique : utiliser l’attestation Tsahal pour ses Nekoudot Zikouy après מילואים",
    seoTitle: "Cas pratique Nekoudot Zikouy מילואים : attestation Tsahal et Mass Hachnassa",
    shortTitle: "Attestation מילואים",
    description:
      "Cas pratique anonymisé sur l’utilisation de l’attestation Tsahal pour faire valoir des Nekoudot Zikouy liées aux מילואים.",
    metaDescription:
      "Un cas pratique anonymisé pour comprendre pourquoi l’attestation officielle de Tsahal est importante pour faire valoir des Nekoudot Zikouy liées aux מילואים.",
    excerpt:
      "Un salarié pensait que l’avantage מילואים était automatique. La paie avait besoin de l’attestation officielle générée depuis l’אזור אישי.",
    ...publication,
    readingTime: "4 min",
    ...defaultAuthor,
    tags: ["cas pratique anonymisé", "Nekoudot Zikouy", "מילואים", "Tsahal", "Mass Hachnassa", "אזור אישי"],
    keywords: ["cas Nekoudot Zikouy מילואים", "attestation Tsahal impôt", "Mass Hachnassa réserviste"],
    featured: false,
    priority: 15,
    heroLabel: "Cas pratique anonymisé",
    relatedArticleSlugs: ["nekoudot-zikouy-milouim-2026"],
    relatedCalculatorSlugs: ["nekoudot-zikouy", "ehzer-mass"],
    sources: [],
    cta: {
      title: "Vérifier mes Nekoudot Zikouy",
      text: "Ne supposez pas que l’avantage a été appliqué automatiquement. Vérifiez l’attestation et la paie.",
      label: "Vérifier mes Nekoudot Zikouy",
      whatsappMessage:
        "Bonjour Eliezer, j’ai fait des מילואים et je veux vérifier si mes Nekoudot Zikouy ont bien été prises en compte."
    },
    caseStudy: {
      situation:
        "Un salarié avait effectué des jours de מילואים admissibles en 2025 et pensait que l’avantage 2026 serait automatique.",
      problem:
        "La paie n’avait rien mis à jour, car le certificat נקודות זיכוי לשנת 2025 n’avait pas été transmis.",
      analysis:
        "Le document devait être généré depuis l’אזור אישי, vérifié, transmis à l’employeur et accompagné de la mise à jour du טופס 101 si nécessaire.",
      lesson:
        "Le droit peut réduire Mass Hachnassa via la paie, mais il faut le bon certificat et un contrôle de la fiche de paie."
    },
    sections: [
      {
        title: "Situation",
        paragraphs: [
          "Cas pratique anonymisé : un salarié francophone en Israël avait effectué des jours de מילואים admissibles en 2025. En 2026, il pensait que les Nekoudot Zikouy seraient appliquées automatiquement par son employeur.",
          "Il disposait d’un document général de réserve, mais pas du certificat spécifique נקודות זיכוי לשנת 2025."
        ]
      },
      {
        title: "La crainte du client",
        paragraphs: [
          "Sa crainte était simple : perdre l’avantage fiscal alors qu’il avait bien effectué les jours de réserve. Il ne savait pas non plus si l’employeur devait recevoir un document particulier ou si la mise à jour se faisait seule."
        ]
      },
      {
        title: "Le point fiscal à vérifier",
        paragraphs: [
          "Le point fiscal n’était pas de demander une faveur. Il s’agissait de faire appliquer un droit fiscal déjà prévu, avec le bon document.",
          "Le certificat officiel devait être généré depuis l’אזור אישי sur le site des מילואים de Tsahal, puis transmis à l’employeur. Le salarié devait aussi vérifier si le טופס 101 devait être marqué ou mis à jour."
        ]
      },
      {
        title: "L’analyse",
        paragraphs: [
          "Avant de transmettre l’attestation, il fallait vérifier que le nombre de jours indiqué correspondait bien aux jours admissibles. Si les jours n’étaient pas encore à jour, il valait mieux attendre la correction plutôt que de créer un crédit d’impôt excessif.",
          "Une donnée incorrecte peut créer une réduction d’impôt trop élevée et une dette future envers Mass Hachnassa. Après transmission, la fiche de paie devait être contrôlée pour vérifier que le bénéfice était bien reflété."
        ]
      },
      {
        title: "Ce que ce cas montre",
        paragraphs: [
          "Les droits liés aux מילואים doivent être documentés. Télécharger le bon certificat tôt permet d’éviter une correction tardive ou une vérification incomplète en fin d’année.",
          "Pour un salarié, l’avantage peut réduire l’impôt via la paie. Pour un indépendant, il doit être intégré dans la déclaration annuelle. Dans les deux cas, le document et les jours admissibles doivent être vérifiés."
        ],
        links: [
          {
            href: "/fr/guides/nekoudot-zikouy-milouim-2026",
            label: "Lire le guide Nekoudot Zikouy מילואים"
          }
        ]
      }
    ]
  }
];
