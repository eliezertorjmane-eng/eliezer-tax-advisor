import type { Article } from "@/lib/content/articleTypes";

const v8Author = {
  authorName: "Eliezer Torjmane",
  authorTitle: "Conseiller fiscal agréé en Israël"
};

const v8Publication = {
  publishedAt: "2026-07-29",
  updatedAt: "2026-07-29",
  fiscalYear: "2026"
};

export const v8Articles: Article[] = [
  {
    slug: "declaration-fiscale-israel",
    locale: "fr",
    type: "guide",
    category: "Déclarations fiscales",
    title: "Déclaration fiscale en Israël : qui doit déclarer et comment procéder en 2026 ?",
    seoTitle: "Déclaration fiscale en Israël 2026 : obligations, documents et délais",
    shortTitle: "Déclaration fiscale Israël",
    description:
      "Comprendre qui peut devoir déposer une déclaration fiscale en Israël, quels revenus examiner et quels documents préparer avant de transmettre un dossier à Mass Hachnassa.",
    metaDescription:
      "Découvrez qui doit déposer une déclaration fiscale en Israël, quels revenus déclarer, quels documents préparer et comment éviter les erreurs avec Mass Hachnassa.",
    excerpt:
      "Salarié, indépendant, revenus de France, loyers ou demande de remboursement : les situations qui justifient une déclaration ou une vérification fiscale en Israël.",
    ...v8Publication,
    readingTime: "10 min",
    ...v8Author,
    tags: [
      "déclaration fiscale Israël",
      "déclaration impôts Israël",
      "Mass Hachnassa",
      "Formulaire 1301",
      "Formulaire 135",
      "Ehzer Mass",
      "France-Israël",
      "revenus étrangers"
    ],
    keywords: [
      "declaration fiscale israel",
      "déclaration impôts israël",
      "déclaration fiscale en Israël",
      "déclaration annuelle Israël",
      "Mass Hachnassa déclaration",
      "Formulaire 1301 Israël",
      "revenus France Israël impôts",
      "tax israel",
      "tax management israel",
      "torjmane"
    ],
    featured: true,
    priority: 0.1,
    heroLabel: "Guide complet 2026",
    relatedArticleSlugs: [
      "salarie-revenus-france-declaration-fiscale-israel",
      "ouvrir-entreprise-israel",
      "reforme-fiscale-olim-hadashim-2026",
      "revenus-locatifs-israel-masloulei-mas",
      "nekoudot-zikouy-milouim-2026",
      "certificat-residence-fiscale-israel"
    ],
    relatedCalculatorSlugs: [
      "ehzer-mass",
      "impot-revenus-locatifs-israel",
      "nekoudot-zikouy-enfants",
      "impot-revenu-israel"
    ],
    sources: [
      {
        label: "Israel Tax Authority - annual tax report for individuals and unincorporated business owners, Form 1301",
        href: "https://www.gov.il/he/service/reporting-and-payment-2025-annual-tax-report-for-individuals",
        status: "verified",
        note: "Service officiel pour le dépôt du rapport annuel 2025 en 2026, avec les délais et annexes indiqués par l’administration fiscale."
      },
      {
        label: "Israel Tax Authority - income tax rebate request, Form 135",
        href: "https://www.gov.il/en/service/itc135",
        status: "verified",
        note: "Service officiel pour les demandes de remboursement d’impôt des particuliers non tenus au rapport annuel complet."
      }
    ],
    cta: {
      title: "Vous devez déposer une déclaration fiscale en Israël ?",
      text: "Avant d’envoyer une déclaration incomplète ou de laisser une situation non traitée, faites vérifier vos revenus, vos documents et vos droits fiscaux.",
      label: "Vérifier ma déclaration fiscale",
      whatsappMessage:
        "Bonjour Eliezer, je souhaite vérifier si je dois déposer une déclaration fiscale en Israël et quels revenus ou documents doivent être pris en compte."
    },
    sections: [
      {
        title: "Qu’est-ce qu’une déclaration fiscale annuelle en Israël ?",
        paragraphs: [
          "La déclaration fiscale annuelle israélienne est le rapport transmis à Mass Hachnassa (מס הכנסה) pour présenter les revenus, les déductions, les crédits et les annexes d’une année fiscale donnée. Elle est généralement structurée autour du formulaire 1301 pour les particuliers et les indépendants non constitués en société.",
          "En pratique, elle sert à établir l’impôt final après les retenues déjà prélevées, les acomptes versés, les Nekoudot Zikouy (נקודות זיכוי), les revenus supplémentaires et les éventuels justificatifs. Elle peut conduire à un solde à payer ou à un remboursement, mais aucun résultat ne doit être supposé avant analyse."
        ],
        callout: {
          title: "Important",
          text: "Une déclaration annuelle n’est pas la même chose qu’un Ehzer Mass. Le Ehzer Mass est souvent une demande de remboursement pour un particulier non obligé de déposer un rapport annuel complet, alors qu’une déclaration annuelle peut être une obligation fiscale."
        },
        links: [
          {
            href: "/fr/hahzar-mas-remboursement-impot-israel",
            label: "Comprendre le Ehzer Mass",
            description: "Comparer la logique d’une demande de remboursement avec celle d’un rapport annuel."
          },
          {
            href: "/fr/calculateurs/ehzer-mass",
            label: "Pré-diagnostic Ehzer Mass",
            description: "Identifier les situations qui méritent une vérification."
          }
        ]
      },
      {
        title: "Qui peut devoir déposer une déclaration fiscale ?",
        paragraphs: [
          "Il n’existe pas une seule réponse valable pour tout le monde. En Israël, l’obligation peut dépendre du type de revenu, du montant, de l’existence d’un dossier actif à Mass Hachnassa, d’une activité indépendante, de revenus à l’étranger, de participations dans une société, de loyers ou de situations personnelles particulières.",
          "Les indépendants, les propriétaires d’activité, certains salariés à revenus élevés, les personnes ayant des revenus professionnels ou commerciaux, les contribuables avec revenus étrangers ou annexes spécifiques et certains demandeurs de remboursement déjà liés à un dossier fiscal doivent faire vérifier leur situation."
        ],
        bullets: [
          "Vous avez une activité indépendante, même partielle.",
          "Vous avez ouvert un dossier à Mass Hachnassa ou un dossier TVA.",
          "Vous avez des revenus locatifs en Israël ou à l’étranger.",
          "Vous avez des revenus de France : loyers, pension, plus-value, intérêts, dividendes ou autre revenu à examiner.",
          "Vous avez eu plusieurs employeurs, des revenus inhabituels ou une situation de remboursement qui ne relève pas simplement du formulaire 135.",
          "Vous êtes Oleh Hadash, Toshav Hozer ou dans une situation France-Israël qui nécessite de distinguer revenu israélien, revenu étranger, déclaration et exonération."
        ]
      },
      {
        title: "Les salariés : quand une vérification devient utile",
        paragraphs: [
          "Un salarié israélien n’a pas automatiquement une déclaration annuelle à déposer. Beaucoup de salariés sont imposés par retenue à la source via la fiche de paie. Mais cela ne veut pas dire que rien ne doit jamais être vérifié.",
          "Un changement d’employeur, une année partielle, plusieurs employeurs, une erreur de טופס 101, des Nekoudot Zikouy non appliquées, un revenu de France ou une demande de remboursement sur plusieurs années peuvent transformer une situation simple en dossier à analyser."
        ],
        links: [
          {
            href: "/fr/calculateurs/nekoudot-zikouy-enfants",
            label: "Calculateur Nekoudot Zikouy enfants",
            description: "Vérifier l’impact indicatif des points enfants sur l’impôt."
          },
          {
            href: "/fr/guides/nekoudot-zikouy-milouim-2026",
            label: "Guide Milouim 2026",
            description: "Distinguer les droits liés aux enfants des droits liés au service de réserve."
          }
        ]
      },
      {
        title: "Quels revenus faut-il examiner ?",
        paragraphs: [
          "Le bon réflexe consiste à partir d’une liste complète, puis à qualifier chaque élément. Un revenu non imposable ou exonéré peut parfois rester à documenter. Un revenu déjà taxé en France ne disparaît pas automatiquement de l’analyse israélienne si vous êtes résident fiscal israélien.",
          "Les mots-clés que les utilisateurs tapent dans Google, comme declaration fiscale israel, déclaration impôts israël, tax Israel ou tax management Israel, renvoient souvent à cette même question : quels revenus doivent être signalés, dans quel formulaire et avec quels justificatifs ?"
        ],
        bullets: [
          "Salaires israéliens et formulaires annuels de l’employeur.",
          "Revenus d’activité indépendante, honoraires, commissions ou activité en ligne.",
          "Revenus locatifs israéliens, y compris le choix du Massloul Mass applicable.",
          "Revenus locatifs de France ou d’un autre pays.",
          "Pensions, retraites, dividendes, intérêts, ventes de titres ou plus-values.",
          "Revenus liés à une société, une participation importante ou une activité professionnelle exercée pour des clients étrangers."
        ],
        links: [
          {
            href: "/fr/guides/revenus-locatifs-israel-masloulei-mas",
            label: "Guide revenus locatifs",
            description: "Comprendre les Massloulim Mass pour les loyers résidentiels en Israël."
          },
          {
            href: "/fr/calculateurs/impot-revenus-locatifs-israel",
            label: "Calculateur revenus locatifs",
            description: "Comparer une simulation indicative des principaux Massloulim Mass."
          }
        ]
      },
      {
        title: "Documents à préparer avant de déposer",
        paragraphs: [
          "Une déclaration fiscale se prépare mieux lorsque les documents sont organisés par année, par source de revenu et par pays. Le dépôt ne doit pas commencer par une saisie précipitée : il doit commencer par une lecture du dossier.",
          "Les documents exacts dépendent de votre situation, mais certains éléments reviennent fréquemment."
        ],
        bullets: [
          "Teoudat zehout, coordonnées et informations bancaires si un remboursement est possible.",
          "Formulaires 106, fiches de paie, attestations d’employeurs et טופס 101 si la situation familiale compte.",
          "Rapport de résultat, factures, reçus, dépenses et documents de TVA pour une activité indépendante.",
          "Contrats de location, loyers reçus, intérêts d’emprunt et dépenses liées à un bien immobilier.",
          "Documents français : avis d’imposition, attestations de pension, relevés locatifs, banques, courtiers, notaires ou administrations.",
          "Documents liés aux crédits, dons, invalidité, résidence, aliyah, Milouim, assurance, enfants ou autres points de situation."
        ]
      },
      {
        title: "Délais : pourquoi il faut vérifier l’année exacte",
        paragraphs: [
          "En 2026, l’administration fiscale israélienne indique pour les rapports annuels 2025 des échéances distinctes selon le mode de dépôt : 29 mai 2026 pour certains dépôts non en ligne et 30 juin 2026 pour les dépôts en ligne. Ces dates concernent la campagne ouverte en 2026 pour l’année fiscale 2025.",
          "Pour une autre année fiscale, pour un dossier représenté ou pour une situation particulière, il ne faut pas recopier une date sans vérification. Les délais peuvent dépendre de la catégorie du contribuable, du mode de dépôt, d’une prolongation accordée ou des instructions de Mass Hachnassa."
        ],
        callout: {
          tone: "warning",
          text: "Avant de déposer en retard ou de supposer qu’un délai général s’applique, vérifiez l’année fiscale visée, le type de dossier et le mode de dépôt."
        }
      },
      {
        title: "Erreurs fréquentes",
        bullets: [
          "Confondre Ehzer Mass et obligation de déclaration annuelle.",
          "Oublier un revenu de France parce qu’il a déjà été déclaré en France.",
          "Déposer sans annexes ou avec des documents d’années mélangées.",
          "Choisir un Massloul Mass pour les loyers sans comparer les autres options.",
          "Ne pas actualiser les Nekoudot Zikouy, notamment après une naissance, une alyah ou une situation de Milouim.",
          "Penser qu’un revenu faible ne doit jamais être signalé.",
          "Attendre une lettre de l’administration avant d’organiser le dossier."
        ]
      },
      {
        title: "Olim Hadashim, revenus français et réforme 2026",
        paragraphs: [
          "Les Olim Hadashim peuvent avoir plusieurs régimes à distinguer : les Nekoudot Zikouy liées à l’alyah, les règles sur certains revenus étrangers, et la réforme 2026 sur certains revenus professionnels générés en Israël pour les personnes éligibles.",
          "Ces sujets ne se remplacent pas. Un revenu professionnel israélien, un revenu locatif français et un avantage de Nekoudot Zikouy ne se traitent pas dans la même case ni avec le même raisonnement."
        ],
        links: [
          {
            href: "/fr/guides/reforme-fiscale-olim-hadashim-2026",
            label: "Réforme fiscale Olim Hadashim 2026",
            description: "Voir la nouvelle exonération et les démarches associées."
          },
          {
            href: "/fr/guides/certificat-residence-fiscale-israel",
            label: "Résidence fiscale France-Israël",
            description: "Comprendre l’utilité d’un certificat de résidence fiscale israélien."
          }
        ]
      },
      {
        title: "Comment Eliezer Torjmane vous accompagne",
        paragraphs: [
          "L’accompagnement consiste à identifier l’obligation ou l’opportunité, organiser les documents, distinguer les revenus israéliens et étrangers, préparer les points à déclarer et éviter les oublis visibles dès la première lecture.",
          "Le rôle d’un conseiller fiscal agréé en Israël est d’aider à présenter un dossier cohérent, à poser les bonnes questions et à avancer avec prudence lorsque la situation touche plusieurs pays, plusieurs revenus ou plusieurs années."
        ],
        links: [
          {
            href: "/fr/services",
            label: "Voir les services fiscaux",
            description: "Déclaration, remboursement, activité indépendante, revenus France-Israël."
          },
          {
            href: "/fr/contact",
            label: "Contacter Eliezer",
            description: "Envoyer une première description du dossier."
          }
        ]
      }
    ],
    faq: [
      {
        question: "Tous les salariés en Israël doivent-ils déposer une déclaration fiscale ?",
        answer:
          "Non. Beaucoup de salariés sont imposés par retenue à la source. Mais une vérification est utile en cas de revenus supplémentaires, revenus étrangers, plusieurs employeurs, année partielle, changement familial ou obligation spécifique."
      },
      {
        question: "Quelle est la différence entre déclaration fiscale et Ehzer Mass ?",
        answer:
          "Le Ehzer Mass vise souvent une demande de remboursement pour un particulier non obligé de déposer une déclaration complète. La déclaration annuelle est un rapport fiscal plus large, parfois obligatoire."
      },
      {
        question: "Dois-je déclarer des revenus français en Israël ?",
        answer:
          "Cela dépend de votre résidence fiscale, de la nature du revenu et des règles applicables. Un revenu français ne doit pas être ignoré simplement parce qu’il a déjà été traité en France."
      },
      {
        question: "Quels documents dois-je préparer ?",
        answer:
          "Préparez les documents de revenus israéliens, les justificatifs étrangers, les formulaires 106, documents d’activité, contrats de location, attestations bancaires et pièces liées aux crédits ou situations personnelles."
      },
      {
        question: "Les délais sont-ils les mêmes chaque année ?",
        answer:
          "Non. Les délais doivent être vérifiés selon l’année fiscale, le type de dossier et le mode de dépôt. En 2026, les délais officiels publiés concernent notamment les rapports 2025."
      },
      {
        question: "Un Oleh Hadash est-il dispensé de toute déclaration ?",
        answer:
          "Pas forcément. Les avantages liés à l’alyah, les revenus étrangers, la réforme 2026 et les obligations de dépôt doivent être examinés séparément."
      }
    ]
  },
  {
    slug: "reforme-fiscale-olim-hadashim-2026",
    locale: "fr",
    type: "guide",
    category: "Olim Hadashim",
    title: "Réforme fiscale 2026 pour les Olim Hadashim : qui peut bénéficier de la nouvelle exonération ?",
    seoTitle: "Réforme fiscale Olim Hadashim 2026 : exonération et conditions",
    shortTitle: "Réforme Olim 2026",
    description:
      "La réforme 2026 crée une exonération progressive pour certains Olim Hadashim et Toshavim Hozrim sur des revenus professionnels générés en Israël.",
    metaDescription:
      "La réforme fiscale 2026 accorde une nouvelle exonération progressive à certains Olim Hadashim et Toshavim Hozrim. Découvrez les conditions, plafonds et démarches.",
    excerpt:
      "Arrivée entre novembre 2025 et décembre 2026, revenu professionnel en Israël, Form 116ע, coordination fiscale : les points à vérifier avant de compter sur l’exonération.",
    ...v8Publication,
    readingTime: "11 min",
    ...v8Author,
    tags: [
      "Olim Hadashim",
      "réforme fiscale 2026",
      "Toshav Hozer",
      "Formulaire 116ע",
      "Mass Hachnassa",
      "Nekoudot Zikouy",
      "Alyah",
      "revenus Israël"
    ],
    keywords: [
      "réforme fiscale olim hadashim 2026",
      "Oleh Hadash impôt Israël",
      "exonération impôt nouveaux immigrants Israël",
      "Toshav Hozer fiscalité",
      "Formulaire 116ע",
      "déclaration fiscale Israël olé hadash",
      "tax Israel olim",
      "torjmane"
    ],
    featured: true,
    priority: 0.2,
    heroLabel: "Nouvelle réforme 2026",
    relatedArticleSlugs: [
      "oleh-hadash-reforme-fiscale-2026-revenus-israel",
      "declaration-fiscale-israel",
      "ouvrir-entreprise-israel",
      "certificat-residence-fiscale-israel",
      "salarie-revenus-france-declaration-fiscale-israel"
    ],
    relatedCalculatorSlugs: ["ole-hadash-nekoudot-zikouy", "nekoudot-zikouy", "nekoudot-zikouy-enfants", "impot-revenu-israel"],
    sources: [
      {
        label: "Israel Tax Authority - tax reliefs for New Immigrants and Veteran Returning Residents, 2026-2030",
        href: "https://www.gov.il/en/service/tax-relief-new-immigrants",
        status: "verified",
        note: "Service officiel décrivant les personnes éligibles, les documents, le Form 116ע et les voies de demande."
      },
      {
        label: "Knesset - National Legislation Database, enacted law record",
        href: "https://main.knesset.gov.il/APPS/legislation/main/laws/2242330",
        status: "verified",
        note: "Référence officielle de la loi publiée en 2026. Les dispositions légales priment en cas d’écart avec une page d’information."
      },
      {
        label: "Knesset Finance Committee - official exemption ceiling publication",
        href: "https://main.knesset.gov.il/News/PressReleases/pages/press17032026p.aspx",
        status: "verified",
        note: "Publication officielle de la Knesset indiquant les plafonds annuels du dispositif, à lire avec la fiche de loi adoptée et le service courant de l’administration fiscale."
      },
      {
        label: "Ministry of Aliyah and Integration - tax benefits guide for new immigrants",
        href: "https://www.gov.il/he/pages/health-system-in-israel?chapterIndex=5",
        status: "verified",
        note: "Guide officiel mis à jour en 2026 sur les droits fiscaux des nouveaux immigrants."
      }
    ],
    cta: {
      title: "Vous avez fait votre Alya fin 2025 ou en 2026 ?",
      text: "La nouvelle réforme peut offrir un avantage important, mais son application dépend de votre date d’arrivée, de votre statut, de la nature de vos revenus et des démarches effectuées.",
      label: "Vérifier mon éligibilité à la réforme 2026",
      whatsappMessage:
        "Bonjour Eliezer, j’ai fait ou je prépare mon Alya et je souhaite vérifier mon éligibilité à la réforme fiscale 2026 pour les Olim Hadashim."
    },
    sections: [
      {
        title: "Ce que change la réforme 2026",
        paragraphs: [
          "La réforme fiscale 2026 ajoute un avantage distinct pour certains Olim Hadashim et Toshavim Hozrim arrivés en Israël pendant la période prévue. Elle vise une exonération progressive de Mass Hachnassa sur certains revenus professionnels générés en Israël.",
          "Elle ne remplace pas les Nekoudot Zikouy accordées aux Olim Hadashim, et elle ne se confond pas avec le régime existant sur certains revenus de source étrangère. Ce sont trois sujets différents : points de crédit, exonération sur revenus étrangers et nouvelle exonération sur revenus professionnels israéliens."
        ],
        callout: {
          title: "Période officielle",
          text: "La page de service de l’administration fiscale vise les Olim Hadashim et Toshavim Hozrim vétérans arrivés entre le 5 novembre 2025 et le 31 décembre 2026."
        },
        links: [
          {
            href: "/fr/calculateurs/ole-hadash-nekoudot-zikouy",
            label: "Calculateur Nekoudot Zikouy olé hadash",
            description: "Estimer les points de crédit liés à l’alyah, séparément de la réforme."
          },
          {
            href: "/fr/guides/declaration-fiscale-israel",
            label: "Déclaration fiscale en Israël",
            description: "Comprendre si une déclaration annuelle reste nécessaire."
          }
        ]
      },
      {
        title: "Qui peut être concerné ?",
        paragraphs: [
          "Le service officiel vise les nouveaux immigrants et les résidents de retour vétérans arrivés pendant la période prévue. L’éligibilité doit être vérifiée avec les documents d’arrivée, le statut personnel et la résidence fiscale effective.",
          "Une personne qui a fait son alyah avant cette période, une personne qui ne remplit pas les conditions de statut ou une personne qui compte seulement sur des revenus passifs étrangers ne doit pas supposer que la réforme s’applique."
        ],
        bullets: [
          "Oleh Hadash arrivé entre le 5 novembre 2025 et le 31 décembre 2026.",
          "Toshav Hozer vétéran, selon la définition applicable, revenu en Israël pendant la période de la réforme.",
          "Revenu professionnel issu d’un travail salarié, d’une activité indépendante ou d’une activité professionnelle générée en Israël.",
          "Dossier documenté avec Teoudat Oleh ou certificat de résident de retour, historique d’entrées/sorties et justificatifs de revenus."
        ]
      },
      {
        title: "Quels revenus sont visés ?",
        paragraphs: [
          "La réforme vise les revenus d’un effort personnel générés en Israël : salaire israélien, revenu d’activité indépendante, honoraires ou revenu professionnel. Ce point est central : un revenu passif ou un revenu de source étrangère ne doit pas être mélangé automatiquement avec cette nouvelle exonération.",
          "Un salaire en Israël, une activité de consultant ouverte en Israël ou une activité professionnelle exercée depuis Israël peuvent entrer dans le périmètre à analyser. Des loyers en France, des dividendes étrangers ou une pension française relèvent d’un raisonnement fiscal différent."
        ],
        links: [
          {
            href: "/fr/guides/ouvrir-entreprise-israel",
            label: "Ouvrir une activité en Israël",
            description: "Comparer Esek Patur, Esek Mourche, Esek Zair et société avant de facturer."
          },
          {
            href: "/fr/guides/certificat-residence-fiscale-israel",
            label: "Résidence fiscale",
            description: "Situer les revenus France-Israël dans une analyse cohérente."
          }
        ]
      },
      {
        title: "Plafonds annuels indiqués par les sources officielles",
        paragraphs: [
          "Les plafonds doivent toujours être vérifiés selon la loi, la date d’arrivée, la nature du revenu et la situation personnelle. Les sources officielles publiées indiquent un mécanisme progressif sur les années 2026 à 2030.",
          "Pour les revenus qui ne proviennent pas d’un proche, les plafonds communiqués sont : 600 000 NIS pour 2026, 1 000 000 NIS pour 2027, 1 000 000 NIS pour 2028, 350 000 NIS pour 2029 et 150 000 NIS pour 2030. Les revenus provenant d’un proche suivent un plafond particulier qui doit être vérifié séparément, notamment autour de 140 000 NIS selon les instructions publiées."
        ],
        callout: {
          tone: "warning",
          text: "Ces montants ne sont pas une simulation personnelle. Ils ne disent pas à eux seuls si votre revenu, votre date d’arrivée ou votre situation familiale permettent d’utiliser l’exonération."
        }
      },
      {
        title: "Comment demander l’avantage",
        paragraphs: [
          "La démarche officielle repose notamment sur le Form 116ע, les documents d’aliyah ou de retour, les entrées et sorties, les fiches de paie ou attestations de revenu et un fichier simulateur demandé par l’administration.",
          "La voie pratique dépend de l’obligation de déposer une déclaration annuelle. Une personne non tenue au rapport annuel peut, selon les instructions officielles, utiliser une coordination fiscale en ligne jusqu’à un plafond de revenu professionnel annuel de 300 000 NIS. Si le revenu dépasse ce montant, la déclaration annuelle peut être nécessaire pour le reste.",
          "Une personne tenue au rapport annuel peut utiliser la coordination fiscale en ligne jusqu’à 500 000 NIS de revenu professionnel annuel, et une demande de réduction d’acomptes peut être pertinente pour un indépendant représenté. Au-dessus des plafonds de procédure, le Formulaire 1301 doit être examiné."
        ],
        links: [
          {
            href: "/fr/guides/declaration-fiscale-israel",
            label: "Préparer une déclaration annuelle",
            description: "Organiser les revenus et documents avant le dépôt."
          },
          {
            href: "/fr/services",
            label: "Accompagnement fiscal",
            description: "Faire vérifier la route pratique selon votre situation."
          }
        ]
      },
      {
        title: "Salarié ou indépendant : la démarche n’est pas la même",
        paragraphs: [
          "Un salarié cherchera surtout à obtenir une autorisation de retenue à la source cohérente avec son salaire et son employeur. Il faudra vérifier les fiches de paie, la coordination fiscale et les documents transmis.",
          "Un indépendant devra aussi traiter l’ouverture d’activité, les acomptes, Bitouah Leumi (ביטוח לאומי), les factures et la déclaration annuelle. La réforme peut réduire Mass Hachnassa dans certaines limites, mais elle n’efface pas les obligations administratives liées à l’activité."
        ],
        links: [
          {
            href: "/fr/calculateurs/bituah-leumi-independant",
            label: "Calculateur Bitouah Leumi indépendant",
            description: "Estimer le statut et les cotisations à vérifier séparément de l’exonération."
          },
          {
            href: "/fr/cas-reels/oleh-hadash-reforme-fiscale-2026-revenus-israel",
            label: "Cas pratique Oleh Hadash 2026",
            description: "Voir un exemple de séparation entre revenus israéliens et français."
          }
        ]
      },
      {
        title: "Revenus français, régime de 10 ans et obligation de déclaration",
        paragraphs: [
          "Le guide du ministère de l’Alyah rappelle l’existence d’avantages fiscaux pour les Olim Hadashim, notamment autour de certains revenus de source étrangère. Mais la réforme 2026 discutée ici porte sur certains revenus professionnels générés en Israël.",
          "Un point important pour les personnes arrivées à partir du 1er janvier 2026 est que les revenus étrangers peuvent rester dans un régime fiscal favorable tout en nécessitant une attention particulière sur les obligations de déclaration. C’est précisément le genre de situation où il faut distinguer exonération, déclaration et justificatifs."
        ],
        callout: {
          title: "À ne pas confondre",
          text: "Un revenu locatif français, une pension française ou un portefeuille étranger ne deviennent pas un revenu professionnel israélien parce que vous avez fait votre alyah en 2026."
        }
      },
      {
        title: "Exemple simplifié",
        paragraphs: [
          "Une personne arrive en Israël en juin 2026, commence un emploi israélien et conserve un appartement loué en France. Le salaire israélien peut entrer dans l’analyse de la réforme 2026 si les conditions sont remplies. Les loyers français doivent être examinés séparément au regard de la résidence fiscale, des règles applicables aux revenus étrangers et des obligations de déclaration.",
          "Dans le même dossier, les Nekoudot Zikouy olé hadash peuvent réduire l’impôt, mais elles ne prouvent pas l’éligibilité à la réforme. Le bon dossier sépare donc trois colonnes : salaire israélien, revenus français, points de crédit."
        ]
      },
      {
        title: "Erreurs fréquentes",
        bullets: [
          "Penser que la réforme signifie cinq ans sans impôt sur tous les revenus.",
          "Confondre revenus professionnels israéliens et revenus étrangers passifs.",
          "Oublier le Form 116ע ou les justificatifs d’entrée et sortie.",
          "Ne pas vérifier si une déclaration annuelle reste obligatoire malgré l’autorisation obtenue.",
          "Oublier Bitouah Leumi pour une activité indépendante.",
          "Confondre la réforme 2026 avec les Nekoudot Zikouy olé hadash."
        ]
      }
    ],
    faq: [
      {
        question: "La réforme 2026 concerne-t-elle tous les Olim Hadashim ?",
        answer:
          "Non. Elle vise les Olim Hadashim et Toshavim Hozrim vétérans arrivés pendant la période officielle et sous réserve des conditions prévues. La date d’arrivée, le statut et les revenus doivent être vérifiés."
      },
      {
        question: "La réforme exonère-t-elle tous les revenus ?",
        answer:
          "Non. Elle vise certains revenus professionnels générés en Israël. Les revenus étrangers, passifs ou français doivent être analysés séparément."
      },
      {
        question: "Est-ce la même chose que les Nekoudot Zikouy olé hadash ?",
        answer:
          "Non. Les Nekoudot Zikouy sont des points de crédit. La réforme 2026 est une exonération spécifique sur certains revenus professionnels israéliens."
      },
      {
        question: "Quel formulaire faut-il préparer ?",
        answer:
          "La demande officielle mentionne notamment le Form 116ע, Teoudat Oleh ou certificat de résident de retour, historique d’entrées/sorties, fiches de paie ou attestations de revenus et fichier simulateur."
      },
      {
        question: "Un indépendant doit-il quand même s’occuper de Bitouah Leumi ?",
        answer:
          "Oui. La réforme porte sur Mass Hachnassa dans certaines limites. Bitouah Leumi et les obligations d’activité indépendante doivent être vérifiés séparément."
      },
      {
        question: "Dois-je déposer une déclaration annuelle si j’obtiens une autorisation ?",
        answer:
          "L’autorisation ne supprime pas une obligation de déclaration annuelle qui existe pour une autre raison, par exemple activité indépendante, revenu étranger, revenu au-dessus d’un plafond ou autre obligation."
      }
    ]
  },
  {
    slug: "ouvrir-entreprise-israel",
    locale: "fr",
    type: "guide",
    category: "Entrepreneurs",
    title: "Ouvrir une entreprise en Israël : Esek Patur, Esek Mourche, Esek Zair ou société ?",
    seoTitle: "Ouvrir une entreprise en Israël en 2026 : statuts, TVA et démarches",
    shortTitle: "Ouvrir une entreprise",
    description:
      "Comparer les cadres israéliens avant de facturer : Esek Patur, Esek Mourche, Esek Zair, société, TVA, Mass Hachnassa et Bitouah Leumi.",
    metaDescription:
      "Guide pratique pour ouvrir une activité en Israël : Esek Patur, Esek Mourche, Esek Zair, société, TVA, Mass Hachnassa et Bitouah Leumi.",
    excerpt:
      "Autoentrepreneur Israël, Esek Patur, Esek Mourche, Esek Zair, société : comprendre les mots avant de choisir un statut et d’émettre une facture.",
    ...v8Publication,
    readingTime: "10 min",
    ...v8Author,
    tags: [
      "ouvrir une entreprise Israël",
      "autoentrepreneur Israël",
      "Esek Patur",
      "Esek Mourche",
      "Esek Zair",
      "Bitouah Leumi",
      "Mass Hachnassa",
      "TVA Israël"
    ],
    keywords: [
      "autoentrepreneur israël",
      "ouvrir une entreprise israël",
      "Esek Patur Israël",
      "Esek Mourche Israël",
      "Esek Zair Israël",
      "création entreprise Israël",
      "Bitouah Leumi indépendant",
      "Mass Hachnassa indépendant",
      "tax management israel",
      "torjmane"
    ],
    featured: true,
    priority: 0.3,
    heroLabel: "Guide entrepreneurs 2026",
    relatedArticleSlugs: [
      "choisir-esek-patur-esek-mourche-avant-ouvrir",
      "esek-zair-israel-reforme",
      "declaration-fiscale-israel",
      "reforme-fiscale-olim-hadashim-2026",
      "revenus-locatifs-israel-masloulei-mas"
    ],
    relatedCalculatorSlugs: ["bituah-leumi-independant", "impot-revenu-israel"],
    sources: [
      {
        label: "Israel Tax Authority - online opening of an Esek Patur file",
        href: "https://www.gov.il/he/service/request-open-exempt-dealer-via-internet",
        status: "verified",
        note: "Service officiel indiquant les conditions d’ouverture et le plafond 2026 de 122 833 NIS."
      },
      {
        label: "Israel Tax Authority - request to transfer to Esek Zair",
        href: "https://www.gov.il/he/service/request-transfer-to-micro-business-owner",
        status: "verified",
        note: "Service officiel décrivant le cadre Esek Zair et le plafond 2026 de 122 833 NIS."
      },
      {
        label: "Bitouah Leumi - self-employed registration",
        href: "https://www.btl.gov.il/English%20Homepage/Insurance/National%20Insurance/Detailsoftypes/SelfEmployedPerson/Pages/HowtoRegister.aspx",
        status: "verified",
        note: "Page officielle sur l’obligation d’informer Bitouah Leumi au début de l’activité indépendante."
      },
      {
        label: "Bitouah Leumi - independent worker status criteria",
        href: "https://www.btl.gov.il/French%20homepage/Cotisations/CotisationsSociales/Statuts_ObligPaiement/Independant/Pages/default.aspx",
        status: "verified",
        note: "Page officielle en français sur les critères de statut indépendant."
      }
    ],
    cta: {
      title: "Vous voulez ouvrir une activité en Israël ?",
      text: "Le bon statut dépend de votre activité, de vos clients, de votre chiffre d’affaires, de vos dépenses et de votre situation personnelle.",
      label: "Choisir mon statut en Israël",
      whatsappMessage:
        "Bonjour Eliezer, je souhaite ouvrir une activité en Israël et comparer Esek Patur, Esek Mourche, Esek Zair ou société selon ma situation."
    },
    sections: [
      {
        title: "Autoentrepreneur Israël : le terme utile, mais pas officiel",
        paragraphs: [
          "Beaucoup de francophones cherchent autoentrepreneur Israël parce qu’ils veulent l’équivalent simple du statut français. En Israël, ce mot n’est pas le nom officiel d’un statut fiscal.",
          "Les cadres à comparer sont plutôt Esek Patur, Esek Mourche, Esek Zair et, dans certains cas, la société. Le bon choix dépend de l’activité, du chiffre d’affaires prévu, de la TVA, des clients, des dépenses, de Mass Hachnassa et de Bitouah Leumi."
        ],
        callout: {
          title: "Avant la première facture",
          text: "Ne choisissez pas un statut uniquement parce qu’il semble plus léger. Vérifiez d’abord l’activité, les clients, les obligations TVA et les conséquences annuelles."
        }
      },
      {
        title: "Esek Patur : une activité exonérée de TVA, pas d’impôt sur le revenu",
        paragraphs: [
          "Esek Patur est souvent le cadre envisagé pour une petite activité. Le mot patur peut induire en erreur : il signifie généralement exemption de TVA dans le cadre applicable, pas exemption de Mass Hachnassa ni de Bitouah Leumi.",
          "Pour 2026, la page officielle d’ouverture d’un Esek Patur indique un plafond de chiffre d’affaires annuel prévu de 122 833 NIS. Certaines professions ne peuvent pas ouvrir comme Esek Patur même si le chiffre d’affaires est faible, notamment certaines professions réglementées mentionnées par les règles de TVA."
        ],
        bullets: [
          "Adapté seulement si l’activité et le chiffre d’affaires respectent les conditions.",
          "Pas de facturation de TVA au client dans le cadre patur.",
          "Obligations de suivi, reçus, revenus et déclaration à Mass Hachnassa.",
          "Bitouah Leumi doit être examiné séparément."
        ]
      },
      {
        title: "Esek Mourche : activité assujettie à la TVA",
        paragraphs: [
          "Esek Mourche est un cadre fréquent pour les activités qui doivent gérer la TVA ou qui dépassent les limites applicables à Esek Patur. Certaines activités y sont obligatoirement dirigées dès le départ.",
          "Ce statut peut être plus adapté pour travailler avec des clients professionnels, récupérer une partie de la TVA sur certaines dépenses ou exercer une activité incompatible avec Esek Patur. Il implique en contrepartie un suivi TVA plus structuré."
        ],
        bullets: [
          "Facturation de TVA lorsque les règles l’exigent.",
          "Déclarations TVA périodiques selon le dossier.",
          "Suivi plus rigoureux des factures et dépenses.",
          "Analyse nécessaire si les clients sont en Israël, en France ou à l’étranger."
        ]
      },
      {
        title: "Esek Zair : simplification Mass Hachnassa, pas un statut TVA autonome",
        paragraphs: [
          "Esek Zair est une qualification liée à Mass Hachnassa pour certains petits entrepreneurs, avec des conditions spécifiques. Elle ne remplace pas automatiquement le statut TVA : une personne peut être Esek Patur ou Esek Mourche selon la TVA, et Esek Zair selon les règles de Mass Hachnassa si les conditions sont remplies.",
          "La page officielle de l’administration fiscale indique pour 2026 un plafond d’environ 122 833 NIS et précise que les nouveaux propriétaires d’activité doivent d’abord passer par la demande d’ouverture d’Esek Patur si ce cadre correspond à leur situation."
        ],
        links: [
          {
            href: "/fr/guides/esek-zair-israel-reforme",
            label: "Guide Esek Zair",
            description: "Comprendre la réforme et les conditions de ce cadre simplifié."
          }
        ]
      },
      {
        title: "Société : utile dans certains dossiers, lourde dans d’autres",
        paragraphs: [
          "Créer une société israélienne peut être pertinent pour une activité structurée, des associés, une responsabilité commerciale, des investissements ou une stratégie de rémunération plus complexe.",
          "Ce n’est pas un raccourci automatique pour payer moins. Une société implique généralement des coûts, des déclarations, une comptabilité plus lourde et une séparation claire entre la personne et l’entreprise. Elle doit être choisie après analyse, pas par réflexe."
        ]
      },
      {
        title: "Les trois organismes à ne pas confondre",
        paragraphs: [
          "L’ouverture d’activité touche souvent trois univers administratifs. La TVA détermine notamment Esek Patur ou Esek Mourche. Mass Hachnassa traite l’impôt sur le revenu, les acomptes, les déclarations et éventuellement Esek Zair. Bitouah Leumi traite les cotisations sociales et la couverture liée au statut indépendant.",
          "L’ouverture en ligne peut transmettre des informations à Bitouah Leumi dans certains cas, mais il faut quand même vérifier que le dossier social est bien cohérent avec vos heures, revenus et activité réelle."
        ],
        links: [
          {
            href: "/fr/calculateurs/bituah-leumi-independant",
            label: "Calculateur Bitouah Leumi indépendant",
            description: "Estimer le statut social à vérifier."
          },
          {
            href: "/fr/calculateurs/impot-revenu-israel",
            label: "Calculateur Mass Hachnassa",
            description: "Estimer l’impôt indicatif sur le revenu."
          }
        ]
      },
      {
        title: "Documents et décisions à préparer",
        bullets: [
          "Description claire de l’activité et des services vendus.",
          "Prévision prudente du chiffre d’affaires annuel.",
          "Type de clients : particuliers, entreprises israéliennes, clients français, plateformes ou clients étrangers.",
          "Dépenses principales prévues : logiciel, matériel, sous-traitance, bureau, déplacement, marketing.",
          "Compte bancaire, adresse d’activité et documents d’identité.",
          "Situation personnelle : salarié en parallèle, Oleh Hadash, conjoint, autre activité ou revenu."
        ]
      },
      {
        title: "Puis-je facturer avant l’ouverture ?",
        paragraphs: [
          "La bonne réponse pratique est de ne pas commencer par émettre des documents commerciaux au hasard. Avant de facturer, il faut vérifier que le cadre d’activité, le type de document, la TVA, les obligations de reçu/facture et les dossiers administratifs sont en place.",
          "Pour une activité nouvelle, mieux vaut organiser la chronologie : choix du cadre, ouverture des dossiers pertinents, compréhension des documents à émettre, puis facturation."
        ],
        callout: {
          tone: "warning",
          text: "Une erreur au lancement peut créer des corrections administratives, une mauvaise application de la TVA ou une mauvaise estimation des acomptes."
        }
      },
      {
        title: "Erreurs fréquentes au lancement",
        bullets: [
          "Traduire automatiquement autoentrepreneur par Esek Patur sans vérifier l’activité.",
          "Penser qu’Esek Patur signifie aucune taxe.",
          "Oublier Bitouah Leumi au début de l’activité.",
          "Choisir Esek Mourche ou société pour l’image sans calculer les coûts et obligations.",
          "Ne pas distinguer clients israéliens, français et étrangers.",
          "Ignorer l’obligation de déclaration annuelle après ouverture.",
          "Ne pas garder les factures, reçus et justificatifs dès le premier jour."
        ]
      },
      {
        title: "Cas particulier des Olim Hadashim en 2026",
        paragraphs: [
          "Un Oleh Hadash qui ouvre une activité en 2026 doit vérifier à la fois les règles de création d’activité et les avantages propres à son statut. Les Nekoudot Zikouy, la réforme fiscale 2026 et les revenus étrangers doivent être traités séparément.",
          "La réforme 2026 peut concerner certains revenus professionnels générés en Israël, mais elle ne dispense pas de choisir le bon cadre d’activité, d’organiser Bitouah Leumi et de vérifier la déclaration annuelle."
        ],
        links: [
          {
            href: "/fr/guides/reforme-fiscale-olim-hadashim-2026",
            label: "Réforme Olim Hadashim 2026",
            description: "Vérifier l’exonération spécifique sur certains revenus professionnels israéliens."
          },
          {
            href: "/fr/cas-reels/choisir-esek-patur-esek-mourche-avant-ouvrir",
            label: "Cas pratique avant ouverture",
            description: "Voir comment comparer les cadres avant de facturer."
          }
        ]
      }
    ],
    faq: [
      {
        question: "Existe-t-il un statut autoentrepreneur en Israël ?",
        answer:
          "Non, pas sous ce nom officiel. Les cadres à comparer sont notamment Esek Patur, Esek Mourche, Esek Zair et parfois société."
      },
      {
        question: "Esek Patur veut-il dire sans impôt ?",
        answer:
          "Non. Esek Patur concerne généralement la TVA dans les limites applicables. Mass Hachnassa et Bitouah Leumi doivent être vérifiés séparément."
      },
      {
        question: "Quel est le plafond Esek Patur en 2026 ?",
        answer:
          "La page officielle d’ouverture d’Esek Patur indique un plafond annuel prévu de 122 833 NIS pour 2026, sous réserve des autres conditions et professions exclues."
      },
      {
        question: "Esek Zair est-il la même chose qu’Esek Patur ?",
        answer:
          "Non. Esek Zair est une qualification simplifiée côté Mass Hachnassa, alors qu’Esek Patur est un cadre TVA. Les deux sujets doivent être distingués."
      },
      {
        question: "Dois-je m’inscrire à Bitouah Leumi ?",
        answer:
          "Un indépendant doit vérifier son statut Bitouah Leumi dès le début de l’activité. L’ouverture fiscale ne suffit pas toujours à confirmer que le dossier social est correct."
      },
      {
        question: "Faut-il ouvrir une société pour être plus sérieux ?",
        answer:
          "Pas forcément. Une société peut être utile dans certains dossiers, mais elle ajoute des obligations et coûts. Le choix dépend de l’activité, des risques, des clients et des revenus."
      }
    ]
  },
  {
    slug: "salarie-revenus-france-declaration-fiscale-israel",
    locale: "fr",
    type: "case-study",
    category: "Déclarations fiscales",
    title: "Cas pratique : salarié en Israël, il pensait ne rien devoir déclarer",
    seoTitle: "Cas pratique déclaration fiscale Israël : salarié avec revenus français",
    shortTitle: "Salarié et revenus français",
    description:
      "Un salarié israélien pensait que la retenue à la source suffisait, jusqu’à ce qu’un revenu locatif français soulève une vraie question de déclaration.",
    metaDescription:
      "Cas pratique anonymisé : salarié en Israël avec revenus français, déclaration fiscale, documents à préparer et erreurs à éviter.",
    excerpt:
      "Quand un salaire israélien semble simple mais qu’un revenu français oblige à vérifier résidence fiscale, déclaration annuelle et justificatifs.",
    ...v8Publication,
    readingTime: "6 min",
    ...v8Author,
    tags: ["cas pratique", "déclaration fiscale Israël", "salarié", "revenus France", "Mass Hachnassa"],
    keywords: [
      "declaration fiscale israel salarié",
      "déclaration impôts israël revenus français",
      "revenus France Israël",
      "Mass Hachnassa salarié",
      "torjmane"
    ],
    featured: false,
    priority: 16,
    heroLabel: "Cas pratique anonymisé",
    relatedArticleSlugs: ["declaration-fiscale-israel", "revenus-locatifs-israel-masloulei-mas", "certificat-residence-fiscale-israel"],
    relatedCalculatorSlugs: ["ehzer-mass", "impot-revenus-locatifs-israel"],
    sources: [
      {
        label: "Israel Tax Authority - annual tax report, Form 1301",
        href: "https://www.gov.il/he/service/reporting-and-payment-2025-annual-tax-report-for-individuals",
        status: "verified"
      }
    ],
    cta: {
      title: "Vous avez un salaire israélien et des revenus en France ?",
      text: "Avant de conclure qu’aucune démarche n’est nécessaire, faites vérifier la nature des revenus, l’année concernée et les documents à conserver.",
      label: "Vérifier ma situation France–Israël",
      whatsappMessage:
        "Bonjour Eliezer, je suis salarié en Israël et j’ai aussi des revenus ou documents en France. Je souhaite vérifier si une déclaration fiscale israélienne est nécessaire."
    },
    caseStudy: {
      situation:
        "Un salarié en Israël reçoit un formulaire 106 de son employeur et pense que la fiscalité est entièrement réglée par la paie.",
      problem:
        "Il possède aussi un petit revenu locatif en France. Comme le revenu a déjà été traité en France, il suppose qu’il n’a rien à voir avec Mass Hachnassa.",
      analysis:
        "Le dossier doit distinguer salaire israélien, résidence fiscale, revenu français, convention éventuelle, documents français et obligation israélienne de dépôt. Le sujet n’est pas de garantir un impôt supplémentaire ou un remboursement, mais d’éviter un angle mort.",
      lesson:
        "Un salarié peut avoir une situation simple côté paie et un dossier fiscal plus large dès qu’un revenu étranger existe."
    },
    sections: [
      {
        title: "Le point de départ",
        paragraphs: [
          "Le salaire israélien était retenu à la source, les fiches de paie semblaient régulières et le salarié n’avait jamais ouvert d’activité indépendante. De son point de vue, aucune déclaration fiscale en Israël n’était nécessaire.",
          "La difficulté est apparue avec un appartement conservé en France. Les loyers étaient modestes, déclarés en France, et donc considérés à tort comme extérieurs au système israélien."
        ]
      },
      {
        title: "Les questions posées",
        bullets: [
          "Le contribuable est-il résident fiscal israélien pour l’année concernée ?",
          "Les loyers français doivent-ils apparaître dans une déclaration israélienne ?",
          "Quels documents français et israéliens doivent être conservés ?",
          "Existe-t-il un risque de double imposition ou un mécanisme de crédit à examiner ?",
          "Le dossier relève-t-il d’une demande de remboursement ou d’une déclaration annuelle ?"
        ]
      },
      {
        title: "L’analyse",
        paragraphs: [
          "Le salaire israélien n’était qu’une partie du dossier. La revue a commencé par les dates de résidence, les documents de France, le montant des loyers, les impôts éventuellement payés en France et les formulaires israéliens disponibles.",
          "Plusieurs issues étaient possibles : aucune action immédiate, une déclaration à préparer, une demande de correction ou une simple conservation de pièces pour une vérification ultérieure. La conclusion dépendait des faits, pas d’un réflexe automatique."
        ]
      },
      {
        title: "Ce qu’il fallait éviter",
        bullets: [
          "Ignorer les revenus français parce qu’ils sont faibles.",
          "Confondre impôt payé en France et absence totale d’obligation en Israël.",
          "Déposer un Ehzer Mass sans vérifier les autres revenus.",
          "Répondre à une demande administrative sans organiser les pièces par année."
        ]
      },
      {
        title: "À lire avant d’agir",
        links: [
          {
            href: "/fr/guides/declaration-fiscale-israel",
            label: "Guide déclaration fiscale en Israël",
            description: "Comprendre qui doit déposer et quels revenus examiner."
          },
          {
            href: "/fr/guides/revenus-locatifs-israel-masloulei-mas",
            label: "Guide revenus locatifs",
            description: "Comparer les logiques fiscales autour des loyers résidentiels."
          }
        ]
      }
    ]
  },
  {
    slug: "choisir-esek-patur-esek-mourche-avant-ouvrir",
    locale: "fr",
    type: "case-study",
    category: "Entrepreneurs",
    title: "Cas pratique : choisir entre Esek Patur et Esek Mourche avant de facturer",
    seoTitle: "Cas pratique Esek Patur ou Esek Mourche : choisir avant de facturer",
    shortTitle: "Esek Patur ou Mourche",
    description:
      "Un consultant voulait démarrer vite avec un équivalent d’autoentrepreneur Israël. La vraie question était TVA, clients, Bitouah Leumi et déclaration annuelle.",
    metaDescription:
      "Cas pratique anonymisé : choisir Esek Patur, Esek Mourche, Esek Zair ou société avant de facturer en Israël.",
    excerpt:
      "Avant la première facture, un consultant doit comparer clients israéliens et français, TVA, plafond 2026 et obligations sociales.",
    ...v8Publication,
    readingTime: "6 min",
    ...v8Author,
    tags: ["cas pratique", "Esek Patur", "Esek Mourche", "autoentrepreneur Israël", "Bitouah Leumi"],
    keywords: [
      "autoentrepreneur israël",
      "Esek Patur ou Esek Mourche",
      "ouvrir une entreprise israël",
      "Bitouah Leumi indépendant",
      "torjmane"
    ],
    featured: false,
    priority: 17,
    heroLabel: "Cas pratique anonymisé",
    relatedArticleSlugs: ["ouvrir-entreprise-israel", "esek-zair-israel-reforme", "declaration-fiscale-israel"],
    relatedCalculatorSlugs: ["bituah-leumi-independant", "impot-revenu-israel"],
    sources: [
      {
        label: "Israel Tax Authority - online opening of an Esek Patur file",
        href: "https://www.gov.il/he/service/request-open-exempt-dealer-via-internet",
        status: "verified"
      },
      {
        label: "Israel Tax Authority - Esek Zair request",
        href: "https://www.gov.il/he/service/request-transfer-to-micro-business-owner",
        status: "verified"
      }
    ],
    cta: {
      title: "Vous voulez facturer bientôt ?",
      text: "Avant de choisir un cadre par comparaison avec la France, faites vérifier vos clients, votre chiffre d’affaires prévu, vos dépenses et vos obligations israéliennes.",
      label: "Choisir mon statut avant de facturer",
      whatsappMessage:
        "Bonjour Eliezer, je veux commencer à facturer en Israël et je souhaite choisir entre Esek Patur, Esek Mourche, Esek Zair ou société avant d’ouvrir mon dossier."
    },
    caseStudy: {
      situation:
        "Un consultant francophone installé en Israël veut lancer une activité avec quelques clients israéliens et deux clients français.",
      problem:
        "Il cherche autoentrepreneur Israël et pense que le statut le plus simple sera forcément Esek Patur, sans vérifier la TVA, le plafond 2026, les clients et Bitouah Leumi.",
      analysis:
        "La comparaison porte sur la nature de l’activité, les clients, la TVA, le chiffre d’affaires prévisionnel, les dépenses et la déclaration annuelle. Esek Zair peut aussi être pertinent côté Mass Hachnassa, mais ce n’est pas un statut TVA autonome.",
      lesson:
        "Le bon cadre se choisit avant la première facture, avec une lecture israélienne du dossier plutôt qu’une traduction automatique du modèle français."
    },
    sections: [
      {
        title: "La demande initiale",
        paragraphs: [
          "Le consultant voulait démarrer rapidement. Son idée était simple : trouver l’équivalent d’un autoentrepreneur français, ouvrir en ligne et envoyer sa première facture.",
          "Mais son activité visait des entreprises israéliennes et françaises, avec des prestations de conseil, des dépenses professionnelles et une prévision de chiffre d’affaires incertaine."
        ]
      },
      {
        title: "Les points qui changent le choix",
        bullets: [
          "Le chiffre d’affaires prévu pouvait rester sous le plafond Esek Patur 2026 de 122 833 NIS ou le dépasser rapidement.",
          "Certains clients israéliens préféraient travailler avec un prestataire qui facture la TVA.",
          "Les clients français posaient des questions de lieu de prestation et de documents à émettre.",
          "Le consultant avait aussi un salaire partiel, ce qui changeait l’analyse Bitouah Leumi.",
          "Une qualification Esek Zair pouvait être envisagée côté Mass Hachnassa si les conditions étaient réunies."
        ]
      },
      {
        title: "Un exemple de comparaison",
        paragraphs: [
          "Avec un chiffre d’affaires faible et peu de dépenses, Esek Patur pouvait sembler efficace si l’activité était compatible avec ce cadre. Avec des dépenses plus importantes, des clients professionnels ou une progression rapide du chiffre d’affaires, Esek Mourche pouvait devenir plus cohérent.",
          "La société n’était pas exclue, mais elle n’était pas le premier réflexe : les coûts, les obligations et la structure commerciale devaient justifier ce choix."
        ]
      },
      {
        title: "La décision pratique",
        paragraphs: [
          "Avant d’ouvrir le dossier, il fallait choisir une route claire : statut TVA, suivi Mass Hachnassa, statut Bitouah Leumi, documents à émettre et calendrier de déclaration.",
          "Le résultat n’était pas une formule universelle. Il dépendait de l’activité réelle et de la trajectoire attendue sur l’année."
        ]
      },
      {
        title: "Guides liés",
        links: [
          {
            href: "/fr/guides/ouvrir-entreprise-israel",
            label: "Ouvrir une entreprise en Israël",
            description: "Comparer les cadres avant de facturer."
          },
          {
            href: "/fr/guides/esek-zair-israel-reforme",
            label: "Guide Esek Zair",
            description: "Comprendre la simplification côté Mass Hachnassa."
          }
        ]
      }
    ]
  },
  {
    slug: "oleh-hadash-reforme-fiscale-2026-revenus-israel",
    locale: "fr",
    type: "case-study",
    category: "Olim Hadashim",
    title: "Cas pratique : un Oleh Hadash arrive en 2026 et commence à travailler en Israël",
    seoTitle: "Cas pratique réforme fiscale Olim Hadashim 2026 : revenus en Israël",
    shortTitle: "Oleh Hadash 2026",
    description:
      "Un nouvel immigrant arrive en 2026, entend parler de cinq ans sans impôt et doit distinguer salaire israélien, revenus français, Nekoudot Zikouy et réforme fiscale.",
    metaDescription:
      "Cas pratique anonymisé : Oleh Hadash arrivé en 2026, réforme fiscale, revenus israéliens, revenus français, Form 116ע et déclaration.",
    excerpt:
      "La réforme fiscale 2026 peut aider certains Olim Hadashim, mais elle ne couvre pas tous les revenus et ne remplace pas les démarches.",
    ...v8Publication,
    readingTime: "7 min",
    ...v8Author,
    tags: ["cas pratique", "Olim Hadashim", "réforme fiscale 2026", "Formulaire 116ע", "revenus Israël"],
    keywords: [
      "Oleh Hadash réforme fiscale 2026",
      "olim hadashim revenus Israël",
      "Formulaire 116ע",
      "déclaration fiscale Israël olé hadash",
      "torjmane"
    ],
    featured: false,
    priority: 18,
    heroLabel: "Cas pratique anonymisé",
    relatedArticleSlugs: ["reforme-fiscale-olim-hadashim-2026", "declaration-fiscale-israel", "ouvrir-entreprise-israel"],
    relatedCalculatorSlugs: ["ole-hadash-nekoudot-zikouy", "nekoudot-zikouy"],
    sources: [
      {
        label: "Israel Tax Authority - tax reliefs for Olim Hadashim and veteran returning residents, 2026-2030",
        href: "https://www.gov.il/en/service/tax-relief-new-immigrants",
        status: "verified"
      }
    ],
    cta: {
      title: "Vous arrivez en Israël en 2026 ?",
      text: "Avant de commencer un emploi ou une activité, vérifiez ce qui relève de la réforme, des Nekoudot Zikouy et des revenus étrangers.",
      label: "Vérifier mon éligibilité avant de commencer",
      whatsappMessage:
        "Bonjour Eliezer, je suis Oleh Hadash ou je prépare mon Alya en 2026 et je souhaite vérifier la réforme fiscale, mes revenus en Israël et mes revenus français."
    },
    caseStudy: {
      situation:
        "Un Oleh Hadash arrive en 2026, commence un emploi en Israël et envisage une petite activité indépendante en parallèle.",
      problem:
        "Il a entendu qu’il pourrait bénéficier de cinq ans sans impôt, mais il garde aussi des revenus français et ne sait pas quoi faire avec la réforme, les Nekoudot Zikouy et le Form 116ע.",
      analysis:
        "Le dossier doit séparer revenu professionnel israélien, revenu français, avantages de points de crédit, nouvelle exonération 2026, déclaration annuelle et Bitouah Leumi si une activité indépendante démarre.",
      lesson:
        "La réforme peut être puissante, mais seulement si elle est appliquée au bon revenu, avec les bons documents et sans confondre les autres régimes."
    },
    sections: [
      {
        title: "La phrase qui a créé la confusion",
        paragraphs: [
          "Le nouvel immigrant avait entendu une formule simple : cinq ans sans impôt. Cette phrase était trop large. Elle mélangeait la réforme 2026, le régime des revenus étrangers, les Nekoudot Zikouy et la situation professionnelle en Israël.",
          "Le premier travail a donc été de remplacer la phrase générale par un tableau de lecture : quelles dates, quel statut, quels revenus, quels documents et quelle démarche."
        ]
      },
      {
        title: "Les revenus à séparer",
        bullets: [
          "Salaire israélien commencé après l’alyah.",
          "Projet d’activité indépendante en Israël.",
          "Revenus locatifs ou financiers en France.",
          "Nekoudot Zikouy olé hadash.",
          "Éventuelle demande de réforme 2026 avec Form 116ע.",
          "Obligation de déclaration annuelle selon les revenus et le statut."
        ]
      },
      {
        title: "L’analyse fiscale",
        paragraphs: [
          "Le salaire israélien pouvait être le revenu principal à analyser pour la réforme 2026. L’activité indépendante, si elle ouvrait, nécessitait aussi une vérification de statut, d’acomptes et de Bitouah Leumi.",
          "Les revenus français, eux, ne devaient pas être placés dans la même case. Selon leur nature, ils pouvaient relever du régime des revenus étrangers, d’une déclaration, de justificatifs français et d’une lecture France-Israël."
        ]
      },
      {
        title: "Démarches à prévoir",
        bullets: [
          "Vérifier la date d’alyah et les documents de statut.",
          "Préparer le Form 116ע et les justificatifs demandés par la page officielle.",
          "Contrôler si une coordination fiscale suffit ou si un Formulaire 1301 est nécessaire.",
          "Mettre à jour les Nekoudot Zikouy séparément.",
          "Vérifier Bitouah Leumi avant de démarrer une activité indépendante.",
          "Conserver les documents français par année fiscale."
        ]
      },
      {
        title: "Guides liés",
        links: [
          {
            href: "/fr/guides/reforme-fiscale-olim-hadashim-2026",
            label: "Réforme fiscale Olim Hadashim 2026",
            description: "Lire les règles principales et les démarches officielles."
          },
          {
            href: "/fr/guides/declaration-fiscale-israel",
            label: "Déclaration fiscale en Israël",
            description: "Comprendre ce qui peut obliger à déposer malgré un avantage fiscal."
          },
          {
            href: "/fr/guides/ouvrir-entreprise-israel",
            label: "Ouvrir une activité",
            description: "Comparer les cadres avant de facturer en Israël."
          }
        ]
      }
    ]
  }
];
