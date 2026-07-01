import type { Metadata } from "next";

export const locales = ["fr", "he", "en"] as const;

export type Locale = (typeof locales)[number];
export type PageKey = "home" | "services" | "about" | "faq" | "contact";

export const defaultLocale: Locale = "fr";
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://eliezertax.com").replace(/\/$/, "");

export const localeLabels: Record<Locale, string> = {
  fr: "FR",
  he: "HE",
  en: "EN"
};

export const localeNames: Record<Locale, string> = {
  fr: "Français",
  he: "עברית",
  en: "English"
};

export const directions: Record<Locale, "ltr" | "rtl"> = {
  fr: "ltr",
  he: "rtl",
  en: "ltr"
};

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export const contact = {
  phoneHref: "tel:+972584962143",
  email: "Torjmane.TA@gmail.com",
  emailHref: "mailto:Torjmane.TA@gmail.com",
  instagramHref: "https://www.instagram.com/eliezer.tax.advisor/",
  phoneDisplay: "058-4962143",
  phoneInternational: "+972584962143"
};

const whatsappMessage =
  "Bonjour Eliezer, je vous contacte depuis votre site concernant une question fiscale en Israël.";

export function getWhatsAppHref() {
  return `https://wa.me/972584962143?text=${encodeURIComponent(whatsappMessage)}`;
}

export function buildWhatsAppUrl(message: string) {
  return `https://wa.me/972584962143?text=${encodeURIComponent(message)}`;
}

export const dictionaries = {
  fr: {
    meta: {
      siteName: "Eliezer Torjmane",
      title: "Conseiller fiscal agréé en Israël pour francophones | Eliezer Torjmane",
      description:
        "Conseiller fiscal agréé en Israël pour entrepreneurs, indépendants, salariés et olim francophones : ouverture d’un עסק, déclarations fiscales, Ehzer Mass / החזר מס et suivi administratif.",
      keywords: [
        "conseiller fiscal Israël",
        "conseiller fiscal agréé Israël",
        "conseiller fiscal francophone Israël",
        "fiscalité Israël francophones",
        "ouverture עסק Israël",
        "ouverture activité indépendante Israël",
        "החזר מס",
        "Ehzer Mass",
        "remboursement impôt Israël"
      ]
    },
    nav: {
      home: "Accueil",
      services: "Services",
      guides: "Guides",
      about: "À propos",
      faq: "FAQ",
      contact: "Contact",
      resources: "Ressources",
      caseStudies: "Cas pratiques",
      calculators: "Calculateurs",
      cta: "WhatsApp"
    },
    common: {
      brand: "Eliezer Torjmane",
      eyebrow: "Conseiller fiscal agréé en Israël",
      whatsapp: "WhatsApp",
      email: "Email",
      instagram: "Instagram",
      phone: "Téléphone",
      navigation: "Navigation",
      contactHeading: "Contact",
      mainNavigation: "Navigation principale",
      mobileNavigation: "Navigation mobile",
      openMenu: "Ouvrir le menu",
      closeMenu: "Fermer le menu",
      learnMore: "Voir les services",
      contactCta: "Me contacter sur WhatsApp",
      response: "Un suivi humain, clair et structuré",
      disclaimer:
        "Les informations et calculateurs présents sur ce site sont fournis à titre indicatif et ne remplacent pas une analyse personnalisée par un professionnel. Chaque situation fiscale doit être examinée individuellement.",
      ctaTitle: "Vous avez une question fiscale en Israël ?",
      ctaText: "Envoyez-moi un message WhatsApp et je vous répondrai rapidement."
    },
    home: {
      heroTitle: "Conseiller fiscal agréé en Israël pour francophones",
      heroLead:
        "J’accompagne entrepreneurs, indépendants, salariés et olim francophones dans leurs démarches fiscales en Israël : ouverture d’un עסק, déclarations, remboursement d’impôt / Ehzer Mass (החזר מס) et suivi administratif.",
      primary: "Me contacter sur WhatsApp",
      secondary: "Voir les services",
      trustSignals: [
        "10 ans d’accompagnement",
        "Spécial francophones en Israël",
        "Expérience corporate & high-tech",
        "Suivi humain et structuré"
      ],
      heroCardTitle: "Accompagnement fiscal en français",
      heroCardText:
        "Une lecture claire de votre situation, des documents à préparer et des prochaines démarches à organiser.",
      heroCardRows: [
        "Ouverture d’un עסק et suivi administratif",
        "Déclarations fiscales et organisation de dossier",
        "Étude d’une demande de remboursement d’impôt / Ehzer Mass (החזר מס), sans garantie de résultat"
      ],
      introTitle: "Une approche premium, claire et rassurante.",
      introText:
        "L’objectif est de rendre les démarches fiscales israéliennes plus lisibles pour les francophones : comprendre les obligations, préparer les bons éléments et avancer avec méthode.",
      audienceTitle: "Pour qui ?",
      audiences: [
        "Olim hadashim qui découvrent le système fiscal israélien",
        "Entrepreneurs et freelances qui veulent ouvrir ou structurer leur activité",
        "Salariés ayant besoin d’un suivi, d’une vérification ou d’une orientation",
        "Dirigeants et indépendants qui veulent une lecture claire de leurs obligations"
      ],
      processTitle: "Une méthode simple",
      process: [
        { title: "Écoute", text: "Comprendre votre situation, vos documents et vos objectifs." },
        { title: "Orientation", text: "Identifier les démarches possibles et les points à clarifier." },
        { title: "Préparation", text: "Organiser les informations utiles avant dépôt ou suivi." },
        { title: "Suivi", text: "Rester disponible pour les prochaines étapes du dossier." }
      ]
    },
    services: {
      title: "Services",
      lead:
        "Un accompagnement fiscal francophone pour les étapes importantes de la vie personnelle et professionnelle en Israël.",
      items: [
        {
          title: "Ouverture d’un עסק en Israël",
          text: "Orientation et préparation pour l’ouverture d’une activité indépendante ou d’un dossier d’activité en Israël, avec explication des premières démarches.",
          audience: "Entrepreneurs, freelances, consultants et olim qui veulent lancer ou structurer une activité.",
          clarifies: "Le type d’activité, les documents utiles, les premières obligations administratives et les points à vérifier avant ouverture.",
          documents: "Pièce d’identité, coordonnées, description de l’activité, estimation d’activité, documents déjà reçus et éléments bancaires si nécessaires.",
          resourcePath: "/fr/creation-esek-israel"
        },
        {
          title: "Déclarations fiscales",
          text: "Aide à la préparation, à l’organisation et au suivi des déclarations selon la situation individuelle.",
          audience: "Indépendants, entrepreneurs, salariés avec situations particulières et personnes ayant reçu une demande administrative.",
          clarifies: "Les obligations possibles, les éléments à rassembler, les délais à suivre et la logique des échanges avec l’administration.",
          documents: "Documents fiscaux, revenus, dépenses utiles, correspondances officielles, fiches annuelles et informations d’activité.",
          resourcePath: "/fr/declarations-fiscales-israel"
        },
        {
          title: "Remboursement d’impôt / Ehzer Mass (החזר מס)",
          badge: "Service très demandé",
          text: "Le remboursement d’impôt / Ehzer Mass (החזר מס) est souvent une démarche mal comprise. Beaucoup de salariés ne savent pas qu’une vérification peut être utile après un changement d’emploi, une année incomplète, plusieurs sources de revenus ou une situation personnelle particulière.",
          audience: "Salariés, olim, personnes ayant changé d’employeur, travaillé une partie de l’année ou connu une situation personnelle particulière.",
          clarifies: "Les situations qui peuvent ouvrir droit à une vérification, les années pertinentes, les documents à préparer et les limites avant toute demande.",
          documents: "Fiches de salaire, formulaires annuels, documents personnels, périodes d’emploi, revenus complémentaires et justificatifs utiles.",
          resourcePath: "/fr/hahzar-mas-remboursement-impot-israel"
        },
        {
          title: "Accompagnement entrepreneurs",
          text: "Suivi des besoins fiscaux courants pour entrepreneurs, freelances et dirigeants de petites structures.",
          audience: "Entrepreneurs qui veulent avancer avec plus de clarté dans leurs obligations fiscales et administratives.",
          clarifies: "Les prochaines étapes, les documents à tenir à jour, les échanges à anticiper et les points de vigilance.",
          documents: "Informations d’activité, factures, revenus, dépenses, correspondances et documents administratifs reçus.",
          resourcePath: "/fr/creation-esek-israel"
        },
        {
          title: "Accompagnement salariés",
          text: "Orientation pour comprendre les fiches, situations personnelles, changements et questions de régularisation.",
          audience: "Salariés en Israël, personnes avec plusieurs employeurs, changements de poste ou questions de remboursement d’impôt.",
          clarifies: "La situation salariale, les documents annuels, les changements importants et les possibilités de vérification.",
          documents: "Fiches de paie, formulaires annuels, contrats, dates de changement d’emploi et documents fiscaux reçus.",
          resourcePath: "/fr/fiscalite-salaries-israel"
        },
        {
          title: "Suivi fiscal personnalisé",
          text: "Un cadre de suivi adapté aux documents, délais et spécificités de votre dossier.",
          audience: "Personnes qui veulent un accompagnement régulier et structuré dans leurs démarches fiscales en Israël.",
          clarifies: "Les priorités, les échéances, les documents manquants et la méthode de suivi la plus adaptée.",
          documents: "Tout document fiscal ou administratif déjà reçu, historique de la situation et prochaines échéances connues.",
          resourcePath: "/fr/ressources"
        }
      ],
      promiseTitle: "Ce que l’accompagnement apporte",
      promise:
        "Une lecture claire des prochaines étapes, une préparation plus ordonnée et une communication en français pour réduire le stress administratif.",
      labels: {
        audience: "Pour qui",
        clarifies: "À clarifier",
        documents: "Documents typiques",
        featuredCta: "Faire vérifier ma situation"
      }
    },
    about: {
      title: "À propos",
      lead:
        "Eliezer Torjmane accompagne les francophones en Israël dans la compréhension, la préparation et le suivi de leurs démarches fiscales.",
      body:
        "Eliezer Torjmane dispose d’une solide expérience dans le monde de l’entreprise, notamment dans l’écosystème high-tech israélien. En parallèle, depuis environ 10 ans, il accompagne des entrepreneurs, indépendants et salariés francophones dans leurs démarches fiscales en Israël.",
      bodySecondary:
        "Son approche est pragmatique : clarifier la situation, organiser les documents, expliquer les étapes et accompagner chaque personne avec méthode et disponibilité.",
      profileAlt: "Eliezer Torjmane, conseiller fiscal agréé en Israël",
      profileCaption: "Un accompagnement humain, clair et structuré.",
      values: [
        { title: "Clarté", text: "Des explications simples pour comprendre les options, les documents et les délais." },
        { title: "Rigueur", text: "Une organisation méthodique des informations avant chaque démarche." },
        { title: "Disponibilité", text: "Un contact humain, en français, pour suivre les étapes importantes." },
        { title: "Prudence", text: "Une approche responsable, sans promesse automatique ni garantie de résultat." }
      ],
      whyTitle: "Pourquoi travailler avec moi ?",
      whyLead:
        "Un accompagnement pensé pour avancer avec clarté dans les démarches fiscales israéliennes, sans promesse automatique et avec une vraie attention portée à chaque situation.",
      whyItems: [
        {
          title: "Expérience corporate & high-tech",
          text: "Une compréhension concrète des environnements professionnels israéliens et de leurs exigences administratives."
        },
        {
          title: "10 ans d’accompagnement",
          text: "Une expérience terrain auprès d’entrepreneurs, indépendants et salariés francophones en Israël."
        },
        {
          title: "Français, hébreu, anglais",
          text: "Un échange plus fluide pour comprendre les documents, les termes et les démarches dans plusieurs langues."
        },
        {
          title: "Approche claire, humaine et structurée",
          text: "Une méthode posée : cadrer la situation, préparer les éléments utiles et suivre les prochaines étapes."
        }
      ]
    },
    faq: {
      title: "Questions fréquentes",
      lead: "Des réponses concrètes aux questions que se posent souvent les francophones en Israël.",
      items: [
        {
          question: "Quels documents préparer avant un premier échange ?",
          answer:
            "Préparez une pièce d’identité, vos coordonnées, les documents fiscaux déjà reçus, fiches de salaire si vous êtes salarié, informations d’activité si vous êtes indépendant, et toute correspondance avec les autorités.",
          resourcePath: "/fr/ressources",
          resourceLabel: "Voir les ressources"
        },
        {
          question: "Puis-je ouvrir une activité / עסק tout en étant salarié ?",
          answer:
            "C’est parfois possible, selon votre situation personnelle, votre contrat, vos revenus et vos obligations déclaratives. Le premier échange permet d’identifier les points à vérifier avant d’ouvrir un dossier d’activité.",
          resourcePath: "/fr/creation-esek-israel",
          resourceLabel: "Lire la page sur l’ouverture d’une activité / עסק"
        },
        {
          question: "Quelle est la différence entre עוסק פטור et עוסק מורשה ?",
          answer:
            "Ces statuts correspondent à des cadres différents pour l’activité indépendante, notamment sur la TVA, les plafonds et les obligations. Le choix dépend de l’activité, du volume attendu et de la situation personnelle."
        },
        {
          question: "Comment savoir si j’ai droit à un remboursement d’impôt / החזר מס ?",
          answer:
            "Cela dépend de votre situation fiscale, de vos revenus, crédits, changements familiaux, périodes de travail et documents disponibles. Aucun remboursement ne peut être garanti avant analyse.",
          resourcePath: "/fr/calculateurs/ehzer-mass",
          resourceLabel: "Faire le pré-diagnostic Ehzer Mass"
        },
        {
          question: "Combien de temps prend une démarche ?",
          answer:
            "Le délai dépend du type de démarche, de la qualité des documents et des délais administratifs. L’objectif est de préparer un dossier clair pour éviter les allers-retours inutiles."
        },
        {
          question: "Est-ce possible de travailler à distance ?",
          answer:
            "Oui. La plupart des échanges peuvent se faire par WhatsApp, téléphone ou email, avec envoi sécurisé des documents nécessaires."
        },
        {
          question: "Est-ce adapté aux olim hadashim ?",
          answer:
            "Oui. L’accompagnement est particulièrement utile pour les olim francophones qui découvrent les termes, les démarches et les habitudes administratives en Israël.",
          resourcePath: "/fr/olim-hadashim-fiscalite-israel",
          resourceLabel: "Lire la page pour olim hadashim"
        },
        {
          question: "Peut-on échanger en français, hébreu ou anglais ?",
          answer:
            "Oui. L’accompagnement peut se faire en français, hébreu ou anglais selon la situation et les documents à comprendre."
        },
        {
          question: "Le service remplace-t-il un comptable ou un avocat ?",
          answer:
            "Eliezer Torjmane est conseiller fiscal agréé en Israël. L’accompagnement ne remplace pas un avocat ou un רואה חשבון lorsque votre dossier nécessite spécifiquement ces compétences."
        },
        {
          question: "Comment se déroule le premier contact ?",
          answer:
            "Vous envoyez un message avec votre situation et votre besoin. Un premier cadrage permet ensuite de comprendre l’urgence, les documents utiles et la démarche la plus adaptée."
        }
      ]
    },
    contactPage: {
      title: "Contact",
      lead:
        "Expliquez votre situation en quelques lignes. Eliezer vous recontacte pour cadrer la demande et les prochaines étapes.",
      directTitle: "Contact direct",
      form: {
        name: "Nom complet",
        email: "Email",
        phone: "Téléphone",
        profile: "Votre profil",
        message: "Message",
        submit: "Préparer l’email",
        emailSubject: "Demande site",
        fallbackName: "Nouveau contact",
        bodyLabels: {
          name: "Nom",
          email: "Email",
          phone: "Téléphone",
          profile: "Profil"
        },
        profiles: ["Oleh hadash", "Entrepreneur", "Freelance", "Salarié", "Dirigeant", "Autre"],
        placeholder:
          "Décrivez brièvement votre situation, vos documents et le type d’accompagnement souhaité."
      }
    }
  },
  he: {
    meta: {
      siteName: "Eliezer Torjmane",
      title: "יועץ מס מורשה בישראל | Eliezer Torjmane",
      description:
        "יועץ מס מורשה בישראל לליווי ברור ומסודר לעצמאים, יזמים, שכירים ועולים חדשים: פתיחת עסק, דוחות מס, החזרי מס ומעקב מנהלי.",
      keywords: [
        "יועץ מס מורשה בישראל",
        "ליווי מס בישראל",
        "פתיחת עסק בישראל",
        "החזר מס",
        "עצמאים בישראל",
        "עולים חדשים מסים",
        "tax advisor Israel"
      ]
    },
    nav: {
      home: "בית",
      services: "שירותים",
      guides: "מדריכים",
      about: "אודות",
      faq: "שאלות",
      contact: "יצירת קשר",
      resources: "משאבים",
      caseStudies: "מקרים לדוגמה",
      calculators: "מחשבונים",
      cta: "WhatsApp"
    },
    common: {
      brand: "Eliezer Torjmane",
      eyebrow: "יועץ מס מורשה בישראל",
      whatsapp: "WhatsApp",
      email: "Email",
      instagram: "Instagram",
      phone: "טלפון",
      navigation: "ניווט",
      contactHeading: "יצירת קשר",
      mainNavigation: "ניווט ראשי",
      mobileNavigation: "ניווט מובייל",
      openMenu: "פתיחת תפריט",
      closeMenu: "סגירת תפריט",
      learnMore: "לשירותים",
      contactCta: "יצירת קשר ב-WhatsApp",
      response: "ליווי אנושי, ברור ומסודר",
      disclaimer:
        "המידע והמחשבונים באתר נועדו להערכה כללית בלבד ואינם מחליפים בדיקה מקצועית פרטנית. כל מצב מס צריך להיבחן באופן אישי.",
      ctaTitle: "יש לכם שאלה בתחום המס בישראל?",
      ctaText: "שלחו לי הודעה ב-WhatsApp ואחזור אליכם בהקדם."
    },
    home: {
      heroTitle: "יועץ מס מורשה בישראל",
      heroLead:
        "ליווי ברור ומסודר לעצמאים, יזמים ושכירים בתהליכי מס בישראל: פתיחת עסק, דוחות מס, החזרי מס ומעקב מנהלי.",
      primary: "יצירת קשר ב-WhatsApp",
      secondary: "צפייה בשירותים",
      trustSignals: [
        "כ-10 שנות ליווי",
        "ניסיון עסקי והייטק",
        "עברית, צרפתית ואנגלית",
        "גישה אנושית ומסודרת"
      ],
      heroCardTitle: "ליווי מס ברור ומסודר",
      heroCardText: "הבנה ברורה של המצב, המסמכים שצריך להכין והשלבים הבאים.",
      heroCardRows: [
        "פתיחת עסק ומעקב מנהלי",
        "הצהרות מס וארגון תיק",
        "בדיקת אפשרות להחזר מס, ללא התחייבות לקבלת החזר"
      ],
      introTitle: "גישה נקייה, מקצועית ומרגיעה.",
      introText:
        "המטרה היא להפוך את התהליכים מול מערכת המס בישראל לברורים יותר: להבין חובות, להכין מסמכים ולהתקדם בצורה מסודרת.",
      audienceTitle: "למי זה מתאים?",
      audiences: [
        "עולים חדשים שמכירים את מערכת המס בישראל",
        "יזמים ופרילנסרים שרוצים לפתוח או להסדיר פעילות",
        "שכירים שזקוקים לבדיקה, מעקב או הכוונה",
        "בעלי עסקים ועצמאים שרוצים להבין טוב יותר את החובות שלהם"
      ],
      processTitle: "שיטה פשוטה",
      process: [
        { title: "הקשבה", text: "הבנת המצב, המסמכים והמטרות שלכם." },
        { title: "הכוונה", text: "זיהוי צעדים אפשריים ונקודות שדורשות בירור." },
        { title: "הכנה", text: "ארגון המידע לפני הגשה או המשך טיפול." },
        { title: "מעקב", text: "זמינות לשלבים הבאים של התיק." }
      ]
    },
    services: {
      title: "שירותים",
      lead: "ליווי בתהליכי מס בשלבים חשובים בחיים האישיים והעסקיים בישראל.",
      items: [
        {
          title: "פתיחת עסק",
          text: "הכוונה והכנה לפתיחת פעילות עצמאית, כולל הסבר על חובות ראשוניות.",
          audience: "עצמאים חדשים, יזמים, פרילנסרים ועולים שרוצים להתחיל פעילות מסודרת.",
          clarifies: "סוג הפעילות, המסמכים הדרושים, השלבים הראשונים ונקודות שחשוב לבדוק לפני פתיחה.",
          documents: "תעודה מזהה, פרטי קשר, תיאור פעילות, מסמכים קיימים ופרטים מנהליים רלוונטיים.",
          resourcePath: null
        },
        {
          title: "דוחות מס",
          text: "סיוע בהכנה, ארגון ומעקב אחר הצהרות בהתאם למצב האישי.",
          audience: "עצמאים, יזמים ושכירים עם מצב מס שדורש בדיקה או ארגון.",
          clarifies: "אילו פרטים צריך לאסוף, מה דורש בירור ואיך להתקדם בצורה מסודרת.",
          documents: "מסמכי הכנסה, דוחות, תלושים, התכתבויות ומידע על פעילות עסקית.",
          resourcePath: null
        },
        {
          title: "החזר מס",
          text: "ליווי בבדיקת אפשרות ובהכנת בקשה, ללא התחייבות לקבלת החזר.",
          audience: "שכירים, עולים ואנשים שעברו שינוי תעסוקתי או אישי במהלך השנה.",
          clarifies: "האם יש סיבה לבדיקה, אילו מסמכים חסרים ומה אפשר להכין לפני הגשה.",
          documents: "תלושי שכר, טפסים שנתיים, פרטי עבודה, הכנסות נוספות ומסמכים אישיים.",
          resourcePath: null
        },
        {
          title: "ליווי לעצמאים ויזמים",
          text: "מעקב אחר צרכים שוטפים של יזמים, פרילנסרים ובעלי עסקים קטנים.",
          audience: "יזמים ועצמאים שרוצים להבין את הצעדים המנהליים והפיסקליים הבאים.",
          clarifies: "חובות שוטפות, מסמכים שצריך לשמור, שאלות תפעוליות ונקודות לבירור.",
          documents: "מידע על פעילות, הכנסות, הוצאות, חשבוניות והתכתבויות רלוונטיות.",
          resourcePath: null
        },
        {
          title: "ליווי לשכירים",
          text: "הכוונה להבנת תלושים, שינויים אישיים ושאלות הסדרה.",
          audience: "שכירים עם שינוי עבודה, כמה מקורות הכנסה או שאלות לגבי מצב המס.",
          clarifies: "מסמכים שנתיים, שינויים תעסוקתיים, נקודות לבדיקה ואפשרויות המשך.",
          documents: "תלושי שכר, טפסים שנתיים, חוזים, תאריכי שינוי עבודה ומסמכים שקיבלתם.",
          resourcePath: null
        },
        {
          title: "ליווי אישי ומעקב מסודר",
          text: "מסגרת מעקב המותאמת למסמכים, מועדים ומאפייני התיק.",
          audience: "אנשים שרוצים סדר, המשכיות וזמינות לאורך תהליך מנהלי או פיסקלי.",
          clarifies: "סדר עדיפויות, מסמכים חסרים, מועדים והשלבים הבאים.",
          documents: "כל מסמך מס או מסמך מנהלי שכבר התקבל, יחד עם היסטוריית המצב.",
          resourcePath: null
        }
      ],
      promiseTitle: "מה הליווי נותן",
      promise:
        "הבנה ברורה של הצעדים הבאים, הכנה מסודרת יותר ותקשורת זמינה בעברית, צרפתית או אנגלית לפי הצורך.",
      labels: {
        audience: "למי זה מתאים",
        clarifies: "מה מבהירים",
        documents: "מסמכים נפוצים",
        featuredCta: "בדיקת המצב שלי"
      }
    },
    about: {
      title: "אודות",
      lead:
        "אליעזר טורג׳מן מלווה עצמאים, יזמים, שכירים ועולים חדשים בהבנה, הכנה ומעקב אחר תהליכים בתחום המס בישראל.",
      body:
        "לאליעזר טורג׳מן ניסיון משמעותי בעולם העסקי, ובפרט באקוסיסטם ההייטק הישראלי. במקביל, מזה כ-10 שנים, הוא מלווה יזמים, עצמאים ושכירים בתהליכים בתחום המס בישראל.",
      bodySecondary:
        "הגישה שלו פרקטית: להבין את המצב, לארגן את המסמכים, להסביר את השלבים וללוות כל אדם בצורה מסודרת וזמינה.",
      profileAlt: "אליעזר טורג׳מן, יועץ מס מורשה בישראל",
      profileCaption: "ליווי אנושי, ברור ומסודר.",
      values: [
        { title: "בהירות", text: "הסברים פשוטים להבנת האפשרויות, המסמכים והמועדים." },
        { title: "סדר", text: "ארגון שיטתי של המידע לפני כל פעולה." },
        { title: "זמינות", text: "קשר אנושי ונגיש סביב השלבים החשובים." },
        { title: "זהירות", text: "גישה אחראית, ללא הבטחה אוטומטית או התחייבות לתוצאה." }
      ],
      whyTitle: "למה לעבוד איתי?",
      whyLead:
        "ליווי שמיועד לעשות סדר בתהליכים מול מערכת המס בישראל, עם הסבר ברור, הכנה מסודרת ותשומת לב אישית.",
      whyItems: [
        {
          title: "ניסיון עסקי והייטק",
          text: "היכרות מעשית עם סביבות עבודה ישראליות, יזמות ותהליכים מנהליים."
        },
        {
          title: "כ-10 שנות ליווי",
          text: "ניסיון שטח עם עצמאים, יזמים ושכירים בתהליכים שונים בתחום המס בישראל."
        },
        {
          title: "עברית, צרפתית ואנגלית",
          text: "אפשרות לתקשורת ברורה בכמה שפות, לפי המסמכים והצורך של הלקוח."
        },
        {
          title: "גישה ברורה, אנושית ומסודרת",
          text: "מסגרת עבודה רגועה: הגדרת מצב, הכנת מסמכים ומעקב אחרי הצעדים הבאים."
        }
      ]
    },
    faq: {
      title: "שאלות נפוצות",
      lead: "תשובות מעשיות לשאלות נפוצות על תהליכי מס בישראל.",
      items: [
        {
          question: "אילו מסמכים להכין לפני שיחה ראשונה?",
          answer:
            "כדאי להכין תעודה מזהה, פרטים אישיים, מסמכים שקיבלתם מרשויות, תלושי שכר אם יש, מידע על פעילות עצמאית וכל התכתבות רלוונטית."
        },
        {
          question: "האם אפשר לפתוח עוסק אם אני שכיר?",
          answer:
            "במקרים מסוימים כן. זה תלוי במצב האישי, בהסכם העבודה, בהכנסות ובחובות הדיווח. השיחה הראשונה עוזרת להבין מה צריך לבדוק."
        },
        {
          question: "מה ההבדל בין עוסק פטור לעוסק מורשה?",
          answer:
            "אלה מסגרות שונות לפעילות עצמאית, בין היתר מבחינת מע״מ, תקרות וחובות. הבחירה תלויה בסוג הפעילות, בהיקף הצפוי ובמצב האישי."
        },
        {
          question: "האם מגיע לי החזר מס?",
          answer:
            "זה תלוי במצב המס האישי, הכנסות, זיכויים, שינויים משפחתיים, תקופות עבודה ומסמכים קיימים. אין התחייבות לקבלת החזר לפני בדיקה."
        },
        {
          question: "כמה זמן לוקח תהליך?",
          answer:
            "הזמן תלוי בסוג התהליך, באיכות המסמכים ובזמני הרשויות. המטרה היא להכין תיק ברור כדי לצמצם עיכובים."
        },
        {
          question: "האם אפשר לעבוד מרחוק?",
          answer:
            "כן. רוב התהליך יכול להתבצע דרך WhatsApp, טלפון או אימייל, כולל שליחת המסמכים הדרושים."
        },
        {
          question: "האם זה מתאים לעולים חדשים?",
          answer:
            "כן. הליווי מתאים לעולים חדשים שמכירים לראשונה את המונחים, התהליכים וההתנהלות מול הרשויות בישראל."
        },
        {
          question: "באילו שפות אפשר לקבל ליווי?",
          answer:
            "ניתן לקבל ליווי בעברית, צרפתית או אנגלית, בהתאם לצורך ולמסמכים הרלוונטיים."
        },
        {
          question: "האם השירות מחליף רואה חשבון או עורך דין?",
          answer:
            "אליעזר טורג׳מן הוא יועץ מס מורשה בישראל. השירות אינו מחליף עורך דין או רואה חשבון כאשר התיק דורש במפורש מומחיות כזו."
        },
        {
          question: "איך מתבצע הקשר הראשון?",
          answer:
            "שולחים הודעה עם תיאור קצר של המצב והצורך. לאחר מכן מגדירים את הדחיפות, המסמכים והשלב המתאים."
        }
      ]
    },
    contactPage: {
      title: "יצירת קשר",
      lead: "ספרו בכמה מילים על המצב שלכם. אליעזר יחזור אליכם כדי להגדיר את הבקשה והצעדים הבאים.",
      directTitle: "יצירת קשר ישירה",
      form: {
        name: "שם מלא",
        email: "אימייל",
        phone: "טלפון",
        profile: "הפרופיל שלכם",
        message: "הודעה",
        submit: "הכנת אימייל",
        emailSubject: "פנייה מהאתר",
        fallbackName: "פנייה חדשה",
        bodyLabels: {
          name: "שם",
          email: "אימייל",
          phone: "טלפון",
          profile: "פרופיל"
        },
        profiles: ["עולה חדש", "יזם", "פרילנסר", "שכיר", "בעל עסק", "אחר"],
        placeholder: "תארו בקצרה את המצב, המסמכים וסוג הליווי המבוקש."
      }
    }
  },
  en: {
    meta: {
      siteName: "Eliezer Torjmane",
      title: "Licensed tax advisor in Israel | Eliezer Torjmane",
      description:
        "Licensed tax advisor in Israel providing clear support for entrepreneurs, freelancers, employees and olim: business file opening, tax declarations, tax refund review and administrative follow-up.",
      keywords: [
        "licensed tax advisor Israel",
        "tax advisory Israel",
        "tax advisor Israel",
        "business file opening Israel",
        "tax refund Israel",
        "Israeli tax declarations",
        "olim tax Israel"
      ]
    },
    nav: {
      home: "Home",
      services: "Services",
      guides: "Guides",
      about: "About",
      faq: "FAQ",
      contact: "Contact",
      resources: "Resources",
      caseStudies: "Case studies",
      calculators: "Calculators",
      cta: "WhatsApp"
    },
    common: {
      brand: "Eliezer Torjmane",
      eyebrow: "Licensed tax advisor in Israel",
      whatsapp: "WhatsApp",
      email: "Email",
      instagram: "Instagram",
      phone: "Phone",
      navigation: "Navigation",
      contactHeading: "Contact",
      mainNavigation: "Main navigation",
      mobileNavigation: "Mobile navigation",
      openMenu: "Open menu",
      closeMenu: "Close menu",
      learnMore: "View services",
      contactCta: "Contact me on WhatsApp",
      response: "Clear, human and structured support",
      disclaimer:
        "Information and calculators on this site are provided for general estimation only and do not replace a personalized professional review. Each tax situation should be reviewed individually.",
      ctaTitle: "Have a tax question in Israel?",
      ctaText: "Send me a WhatsApp message and I’ll get back to you."
    },
    home: {
      heroTitle: "Licensed tax advisor in Israel",
      heroLead:
        "Clear, structured support for entrepreneurs, freelancers, employees and olim navigating Israeli tax processes: business file opening, declarations, tax refund review and administrative follow-up.",
      primary: "Contact me on WhatsApp",
      secondary: "View services",
      trustSignals: [
        "10 years of support",
        "Corporate & high-tech experience",
        "French, Hebrew and English",
        "Human and structured follow-up"
      ],
      heroCardTitle: "Structured tax guidance",
      heroCardText:
        "A clear reading of your situation, the documents to prepare and the next administrative steps.",
      heroCardRows: [
        "Business file opening and administrative follow-up",
        "Tax declarations and file organization",
        "Tax refund review, without refund guarantee"
      ],
      introTitle: "A premium, clear and reassuring approach.",
      introText:
        "The goal is to make Israeli tax processes easier to understand: clarify obligations, prepare the right documents and move forward methodically.",
      audienceTitle: "Who it helps",
      audiences: [
        "Olim hadashim discovering the Israeli tax system",
        "Entrepreneurs and freelancers opening or structuring activity",
        "Employees who need review, follow-up or orientation",
        "Business owners who want a clearer view of their obligations"
      ],
      processTitle: "A simple method",
      process: [
        { title: "Listen", text: "Understand your situation, documents and goals." },
        { title: "Guide", text: "Identify possible steps and points to clarify." },
        { title: "Prepare", text: "Organize useful information before filing or follow-up." },
        { title: "Follow", text: "Stay available for the next steps of the file." }
      ]
    },
    services: {
      title: "Services",
      lead: "Tax guidance for key personal and professional moments in Israel.",
      items: [
        {
          title: "Business file opening",
          text: "Guidance and preparation for opening independent activity in Israel, with explanation of initial administrative steps.",
          audience: "Entrepreneurs, freelancers, consultants and olim preparing to start or structure an activity.",
          clarifies: "The activity type, useful documents, first administrative steps and points to verify before opening.",
          documents: "Identification, contact details, activity description, existing documents and relevant administrative information.",
          resourcePath: null
        },
        {
          title: "Tax declarations",
          text: "Support with preparation, organization and follow-up according to each individual situation.",
          audience: "Freelancers, entrepreneurs, employees with specific situations and people who received administrative requests.",
          clarifies: "Possible obligations, documents to gather, deadlines to follow and the logic of administrative exchanges.",
          documents: "Tax documents, income information, useful expenses, official correspondence and activity details.",
          resourcePath: null
        },
        {
          title: "Tax refund review",
          text: "Support with reviewing and preparing a possible tax refund request, without guaranteeing a refund.",
          audience: "Employees, olim and people with job changes, partial-year work or personal changes.",
          clarifies: "Possible reasons to review the situation, documents to check and limits before filing.",
          documents: "Payslips, annual forms, employment periods, personal documents and relevant supporting material.",
          resourcePath: null
        },
        {
          title: "Entrepreneur and freelancer support",
          text: "Ongoing guidance for entrepreneurs, freelancers and small business owners.",
          audience: "Business owners who want a clearer view of their administrative and tax-related next steps.",
          clarifies: "Ongoing obligations, documents to keep, operational questions and points requiring review.",
          documents: "Activity information, income, expenses, invoices, correspondence and business records.",
          resourcePath: null
        },
        {
          title: "Employee tax support",
          text: "Guidance to understand payslips, personal changes, regularization questions and follow-up.",
          audience: "Employees with job changes, multiple income sources or questions about their tax situation.",
          clarifies: "Annual forms, employment changes, review points and possible next steps.",
          documents: "Payslips, annual forms, contracts, job-change dates and tax documents received.",
          resourcePath: null
        },
        {
          title: "Personalized tax follow-up",
          text: "A tracking framework adapted to your documents, deadlines and file specifics.",
          audience: "People who want structure, continuity and availability during an administrative or tax-related process.",
          clarifies: "Priorities, missing documents, deadlines and the next steps to organize.",
          documents: "Any tax or administrative document already received, plus the background of the situation.",
          resourcePath: null
        }
      ],
      promiseTitle: "What the support provides",
      promise:
        "A clearer view of next steps, more organized preparation and communication available in English, French or Hebrew when useful.",
      labels: {
        audience: "Who it is for",
        clarifies: "What we clarify",
        documents: "Typical documents",
        featuredCta: "Check my situation"
      }
    },
    about: {
      title: "About",
      lead:
        "Eliezer Torjmane supports entrepreneurs, freelancers, employees and olim with understanding, preparing and following tax-related processes in Israel.",
      body:
        "Eliezer Torjmane has solid experience in the business world, including the Israeli high-tech ecosystem. In parallel, for around 10 years, he has supported entrepreneurs, freelancers and employees through tax-related processes in Israel.",
      bodySecondary:
        "His approach is pragmatic: clarify the situation, organize documents, explain the steps and support each person with method and availability.",
      profileAlt: "Eliezer Torjmane, licensed tax advisor in Israel",
      profileCaption: "Human, clear and structured support.",
      values: [
        { title: "Clarity", text: "Simple explanations to understand options, documents and deadlines." },
        { title: "Method", text: "Organized information before every process." },
        { title: "Availability", text: "Human, accessible contact around important steps." },
        { title: "Care", text: "A responsible approach, without automatic promises or guaranteed outcomes." }
      ],
      whyTitle: "Why work with me?",
      whyLead:
        "Support designed to bring order and clarity to Israeli tax processes, with careful preparation and personal attention.",
      whyItems: [
        {
          title: "Corporate & high-tech experience",
          text: "A practical understanding of Israeli professional environments, entrepreneurship and administrative expectations."
        },
        {
          title: "10 years of support",
          text: "Hands-on experience supporting entrepreneurs, freelancers and employees through tax-related processes in Israel."
        },
        {
          title: "French, Hebrew, English",
          text: "Clear communication across languages, including French-speaking support when needed."
        },
        {
          title: "Clear, human and structured approach",
          text: "A calm method: frame the situation, prepare useful documents and follow the next steps."
        }
      ]
    },
    faq: {
      title: "Frequently asked questions",
      lead: "Practical answers to common tax questions in Israel.",
      items: [
        {
          question: "Which documents should I prepare before a first exchange?",
          answer:
            "Prepare identification, contact details, tax documents already received, payslips if relevant, activity details if independent, and any correspondence with authorities."
        },
        {
          question: "Can I open a business file if I am also an employee?",
          answer:
            "Sometimes yes, depending on your personal situation, employment agreement, income and reporting obligations. The first exchange helps identify what to check."
        },
        {
          question: "What is the difference between עוסק פטור and עוסק מורשה?",
          answer:
            "They are different frameworks for independent activity, especially around VAT, thresholds and obligations. The right path depends on the activity, expected volume and personal situation."
        },
        {
          question: "Am I entitled to a tax refund / החזר מס?",
          answer:
            "It depends on income, credits, family changes, work periods and available documents. No refund can be guaranteed before review."
        },
        {
          question: "How long does a process take?",
          answer:
            "Timing depends on the process, document quality and administrative delays. The goal is to prepare a clear file to reduce back-and-forth."
        },
        {
          question: "Can we work remotely?",
          answer:
            "Yes. Most exchanges can happen by WhatsApp, phone or email, with the necessary documents sent digitally."
        },
        {
          question: "Is this adapted to olim hadashim?",
          answer:
            "Yes. The support is useful for olim learning Israeli terms, processes and administrative habits."
        },
        {
          question: "Which languages are available?",
          answer:
            "Support is available in English, French and Hebrew, depending on the situation and the documents involved."
        },
        {
          question: "Does this replace an accountant or lawyer?",
          answer:
            "Eliezer Torjmane is a licensed tax advisor in Israel. This does not replace a lawyer or רואה חשבון when a file specifically requires that expertise."
        },
        {
          question: "How does the first contact work?",
          answer:
            "You send a message with your situation and need. The first step is to frame urgency, useful documents and the most appropriate next action."
        }
      ]
    },
    contactPage: {
      title: "Contact",
      lead:
        "Explain your situation in a few lines. Eliezer will follow up to frame the request and next steps.",
      directTitle: "Direct contact",
      form: {
        name: "Full name",
        email: "Email",
        phone: "Phone",
        profile: "Your profile",
        message: "Message",
        submit: "Prepare email",
        emailSubject: "Website request",
        fallbackName: "New contact",
        bodyLabels: {
          name: "Name",
          email: "Email",
          phone: "Phone",
          profile: "Profile"
        },
        profiles: ["Oleh hadash", "Entrepreneur", "Freelancer", "Employee", "Business owner", "Other"],
        placeholder: "Briefly describe your situation, documents and the type of support you are looking for."
      }
    }
  }
} as const;

export function getDictionary(locale: Locale) {
  return dictionaries[locale];
}

export function getLocalizedPath(locale: Locale, page: PageKey = "home") {
  const suffix = page === "home" ? "" : `/${page}`;
  return `/${locale}${suffix}`;
}

export function getCalculatorsPath(locale: Locale) {
  return locale === "fr" ? "/fr/calculateurs" : `/${locale}/calculators`;
}

export function getGuidesPath(locale: Locale) {
  return `/${locale}/guides`;
}

export function getCaseStudiesPath(locale: Locale) {
  return `/${locale}/cas-reels`;
}

export function getPageUrl(locale: Locale, page: PageKey = "home") {
  return `${siteUrl}${getLocalizedPath(locale, page)}`;
}

const ogLocales: Record<Locale, string> = {
  fr: "fr_FR",
  he: "he_IL",
  en: "en_US"
};

export function pageMetadata(locale: Locale, page: PageKey): Metadata {
  const dictionary = getDictionary(locale);
  const labels = dictionary.nav;
  const pageTitle = page === "home" ? dictionary.meta.title : `${labels[page]} | ${dictionary.common.brand}`;
  const url = getPageUrl(locale, page);
  const languages = {
    fr: getPageUrl("fr", page),
    he: getPageUrl("he", page),
    en: getPageUrl("en", page)
  };

  return {
    title: pageTitle,
    description: dictionary.meta.description,
    keywords: [...dictionary.meta.keywords],
    alternates: {
      canonical: url,
      languages
    },
    openGraph: {
      title: pageTitle,
      description: dictionary.meta.description,
      siteName: dictionary.meta.siteName,
      locale: ogLocales[locale],
      type: "website",
      url,
      images: [
        {
          url: `${siteUrl}/logo.png`,
          width: 512,
          height: 512,
          alt: dictionary.common.brand
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: dictionary.meta.description,
      images: [`${siteUrl}/logo.png`]
    }
  };
}

export function getProfessionalServiceJsonLd(locale: Locale) {
  const languages = ["French", "Hebrew", "English"];

  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "ProfessionalService"],
    name: "Eliezer Torjmane",
    alternateName: "Eliezer Torjmane Tax Advisor",
    url: getPageUrl(locale),
    logo: `${siteUrl}/logo.png`,
    image: `${siteUrl}/eliezer-profile.jpg`,
    description: "Licensed tax advisor in Israel providing tax advisory support in French, Hebrew and English.",
    telephone: contact.phoneInternational,
    email: contact.email,
    sameAs: [contact.instagramHref],
    areaServed: {
      "@type": "Country",
      name: "Israel"
    },
    availableLanguage: languages,
    knowsLanguage: languages,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: contact.phoneInternational,
      email: contact.email,
      contactType: "customer support",
      availableLanguage: languages
    }
  };
}

export function getFaqJsonLd(items: readonly { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer
      }
    }))
  };
}
