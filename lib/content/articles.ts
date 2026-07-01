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
    seoTitle: "Revenus locatifs en Israël : פטור, 10% ou Massloul Mass ?",
    shortTitle: "Revenus locatifs",
    description:
      "Un guide simple pour comparer les principaux Massloulei Mass (מסלולי מס) applicables aux loyers résidentiels en Israël : exemption, 10% ou imposition marginale.",
    metaDescription:
      "Vous louez un appartement en Israël ? Découvrez les 3 principaux Massloulei Mass (מסלולי מס) : exemption, 10% ou imposition marginale, et les points à vérifier avant de choisir.",
    excerpt:
      "Les loyers résidentiels peuvent relever de plusieurs régimes. Le bon choix dépend du loyer, des dépenses, des autres revenus et de la situation personnelle.",
    ...publication,
    readingTime: "9 min",
    ...defaultAuthor,
    tags: ["revenus locatifs Israël", "Massloul Mass", "location appartement Israël", "פטור", "10%", "מס שולי", "impôt loyers Israël"],
    keywords: [
      "revenus locatifs Israël",
      "Massloul Mass location",
      "impôt loyers Israël",
      "מסלול 10%",
      "מס שולי loyers"
    ],
    featured: true,
    priority: 2,
    heroLabel: "Guide pratique",
    relatedArticleSlugs: ["revenus-locatifs-choix-masloul-mas", "prisat-mas-shevach-israel"],
    relatedCalculatorSlugs: [],
    sources: [],
    cta: {
      title: "Vous louez un appartement en Israël ?",
      text: "Faites vérifier le Massloul Mass (מסלול מס) le plus adapté à votre situation avant de choisir par habitude.",
      label: "Vérifier mes revenus locatifs",
      whatsappMessage:
        "Bonjour Eliezer, je loue un appartement en Israël et je souhaite vérifier quel Massloul Mass (מסלול מס) est le plus adapté."
    },
    sections: [
      {
        title: "Les 3 principaux Massloulei Mass (מסלולי מס)",
        paragraphs: [
          "Les revenus de location d’un appartement résidentiel en Israël peuvent être imposés selon plusieurs régimes. Le bon choix dépend du montant du loyer, de vos autres revenus, de vos dépenses et de votre situation personnelle.",
          "On parle souvent de trois grandes options : exemption totale ou partielle, régime 10%, ou régime marginal avec déclaration complète."
        ],
        numbered: ["Exemption totale ou partielle.", "Régime 10%.", "Régime marginal / déclaration complète."]
      },
      {
        title: "Massloul Ptour (מסלול פטור) : exemption totale ou partielle",
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
        title: "Massloul 10% (מסלול 10%) : simple mais pas toujours optimal",
        paragraphs: [
          "Le régime 10% consiste généralement à payer 10% sur le loyer brut. Il peut paraître simple, mais il ne permet généralement pas de déduire les dépenses courantes.",
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
        title: "Bientôt : calculateur pour comparer les Massloulei Mass",
        paragraphs: [
          "Un futur outil pourra aider à comparer פטור, 10% et מס שולי selon les informations principales. En attendant, le choix du Massloul Mass doit rester une vérification personnalisée."
        ],
        callout: {
          title: "Quel Massloul Mass choisir pour mes loyers ?",
          text: "Un futur outil pourra comparer פטור, 10% et מס שולי selon votre situation. Pour l’instant, demandez une vérification personnalisée.",
          href: "/fr/contact",
          label: "Me demander une vérification"
        }
      },
      {
        title: "Cas pratique anonymisé",
        paragraphs: [
          "Exemple inspiré de situations rencontrées : un propriétaire a choisi le régime 10% parce qu’il semblait simple. Après revue des dépenses et des revenus personnels, une autre route pouvait être plus pertinente.",
          "La bonne réponse dépend du dossier : niveau de loyer, dépenses, autres revenus, année fiscale et situation personnelle."
        ],
        links: [
          {
            href: "/fr/cas-reels/revenus-locatifs-choix-masloul-mas",
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
        question: "Le régime 10% est-il toujours le plus simple ?",
        answer:
          "Il est simple dans certains cas, mais il n’est pas toujours le plus avantageux. Il faut comparer avec les autres Massloulei Mass."
      },
      {
        question: "Peut-on changer de Massloul Mass ?",
        answer: "Cela dépend des années concernées, des déclarations et des règles applicables. Le point doit être vérifié avant d’agir."
      },
      {
        question: "Les dépenses sont-elles déductibles ?",
        answer:
          "Dans certains régimes, des dépenses éligibles peuvent être prises en compte. Dans le régime 10%, elles ne sont généralement pas déduites."
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
    slug: "revenus-locatifs-choix-masloul-mas",
    locale: "fr",
    type: "case-study",
    category: "Immobilier",
    title: "Cas pratique : choisir le bon Massloul Mass pour des loyers en Israël",
    seoTitle: "Cas pratique : choisir le bon Massloul Mass pour des loyers en Israël",
    shortTitle: "Choix Massloul Mass",
    description:
      "Cas pratique anonymisé sur le choix entre exemption, 10% et régime marginal pour des revenus locatifs en Israël.",
    metaDescription:
      "Cas pratique anonymisé : pourquoi le régime 10% n’est pas toujours le plus adapté pour des revenus locatifs en Israël.",
    excerpt:
      "Un propriétaire devait choisir entre פטור, 10% et מס שולי. La leçon : le plus simple n’est pas toujours le plus adapté.",
    ...publication,
    readingTime: "4 min",
    ...defaultAuthor,
    tags: ["cas pratique anonymisé", "revenus locatifs", "Massloul Mass", "10%", "פטור", "מס שולי"],
    keywords: ["cas revenus locatifs Israël", "choisir Massloul Mass", "location appartement Israël fiscalité"],
    featured: false,
    priority: 13,
    heroLabel: "Cas anonymisé",
    relatedArticleSlugs: ["revenus-locatifs-israel-masloulei-mas", "prisat-mas-shevach-israel"],
    relatedCalculatorSlugs: [],
    sources: [],
    cta: {
      title: "Vérifier mes revenus locatifs",
      text: "Le bon Massloul Mass dépend de vos loyers, dépenses et autres revenus.",
      label: "Vérifier mes loyers",
      whatsappMessage:
        "Bonjour Eliezer, je loue un appartement en Israël et je souhaite vérifier le Massloul Mass adapté."
    },
    caseStudy: {
      situation:
        "Un propriétaire louait un appartement résidentiel en Israël et hésitait entre exemption, 10% et régime marginal.",
      problem:
        "Le régime 10% semblait simple, mais les dépenses et les autres revenus pouvaient changer l’analyse.",
      analysis:
        "Le choix devait tenir compte du loyer mensuel, des frais, de la situation personnelle et des seuils de l’année fiscale.",
      lesson:
        "Le régime le plus simple n’est pas toujours le plus adapté. Les Massloulei Mass doivent être comparés avant de choisir."
    },
    sections: [
      {
        title: "Situation",
        paragraphs: [
          "Cas pratique anonymisé : un propriétaire percevait des loyers en Israël et voulait choisir rapidement le régime 10% parce qu’il semblait le plus simple.",
          "Une vérification était nécessaire avant de décider."
        ]
      },
      {
        title: "Problème",
        paragraphs: [
          "Le choix d’un Massloul Mass ne dépend pas seulement du loyer. Il peut aussi dépendre des dépenses, des autres revenus, de la tranche marginale et du nombre de biens."
        ]
      },
      {
        title: "Analyse",
        paragraphs: [
          "Il fallait comparer les trois routes principales : פטור, 10% et מס שולי. Le régime 10% peut être pratique, mais il n’est pas forcément optimal si les dépenses ou la situation personnelle changent le calcul."
        ]
      },
      {
        title: "Enseignement",
        paragraphs: [
          "Avant de choisir, il faut poser les chiffres principaux et vérifier l’année fiscale concernée. Le choix doit rester documenté et adapté au dossier."
        ],
        links: [
          {
            href: "/fr/guides/revenus-locatifs-israel-masloulei-mas",
            label: "Lire le guide sur les revenus locatifs"
          }
        ]
      }
    ]
  }
];
