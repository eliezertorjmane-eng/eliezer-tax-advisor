import type { Metadata } from "next";

export const locales = ["fr", "he", "en"] as const;

export type Locale = (typeof locales)[number];
export type PageKey = "home" | "services" | "about" | "faq" | "contact";

export const defaultLocale: Locale = "fr";

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

export const dictionaries = {
  fr: {
    meta: {
      siteName: "Eliezer Torjmane Tax Advisor",
      title: "Conseiller fiscal en Israël pour francophones | Eliezer Torjmane",
      description:
        "Conseiller fiscal francophone en Israël pour entrepreneurs, indépendants, salariés et olim : ouverture de esek, déclarations fiscales, החזר מס et suivi administratif.",
      keywords: [
        "conseiller fiscal Israël",
        "conseiller fiscal francophone Israël",
        "fiscalité Israël francophones",
        "ouverture esek Israël",
        "החזר מס",
        "tax advisor Israel French speakers"
      ]
    },
    nav: {
      home: "Accueil",
      services: "Services",
      about: "À propos",
      faq: "FAQ",
      contact: "Contact",
      cta: "WhatsApp"
    },
    common: {
      brand: "Eliezer Torjmane Tax Advisor",
      eyebrow: "Conseiller fiscal francophone en Israël",
      whatsapp: "WhatsApp",
      email: "Email",
      instagram: "Instagram",
      phone: "Téléphone",
      learnMore: "Voir les services",
      contactCta: "Me contacter sur WhatsApp",
      response: "Un suivi humain, clair et structuré",
      disclaimer:
        "Les informations présentes sur ce site sont fournies à titre général et ne remplacent pas un conseil personnalisé. Chaque situation fiscale doit être analysée individuellement.",
      ctaTitle: "Une question fiscale en Israël ?",
      ctaText:
        "Envoyez un message avec votre situation, vos documents disponibles et l’étape qui vous bloque. La première réponse permet de cadrer la démarche."
    },
    home: {
      heroTitle: "Conseiller fiscal en Israël pour francophones",
      heroLead:
        "J’accompagne entrepreneurs, indépendants, salariés et olim francophones dans leurs démarches fiscales en Israël : ouverture de esek, déclarations, החזר מס et suivi administratif.",
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
        "Ouverture de esek et suivi administratif",
        "Déclarations fiscales et organisation de dossier",
        "Étude d’une demande de החזר מס, sans garantie de remboursement"
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
          title: "Ouverture de esek",
          text: "Orientation et préparation pour l’ouverture d’une activité indépendante, avec explication des obligations initiales."
        },
        {
          title: "Déclarations fiscales",
          text: "Aide à la préparation, à l’organisation et au suivi des déclarations selon la situation individuelle."
        },
        {
          title: "החזר מס",
          text: "Accompagnement dans l’étude et la préparation d’une demande éventuelle, sans garantie de remboursement."
        },
        {
          title: "Accompagnement entrepreneurs",
          text: "Suivi des besoins fiscaux courants pour entrepreneurs, freelances et dirigeants de petites structures."
        },
        {
          title: "Accompagnement salariés",
          text: "Orientation pour comprendre les fiches, situations personnelles, changements et questions de régularisation."
        },
        {
          title: "Suivi fiscal personnalisé",
          text: "Un cadre de suivi adapté aux documents, délais et spécificités de votre dossier."
        }
      ],
      promiseTitle: "Ce que l’accompagnement apporte",
      promise:
        "Une lecture claire des prochaines étapes, une préparation plus ordonnée et une communication en français pour réduire le stress administratif."
    },
    about: {
      title: "À propos",
      lead:
        "Eliezer Torjmane accompagne les francophones en Israël dans la compréhension, la préparation et le suivi de leurs démarches fiscales.",
      body:
        "Eliezer Torjmane dispose d’une solide expérience dans le monde de l’entreprise, notamment dans l’écosystème high-tech israélien. En parallèle, depuis environ 10 ans, il accompagne des entrepreneurs, indépendants et salariés francophones dans leurs démarches fiscales en Israël.",
      values: [
        { title: "Clarté", text: "Des explications simples pour comprendre les options, les documents et les délais." },
        { title: "Rigueur", text: "Une organisation méthodique des informations avant chaque démarche." },
        { title: "Disponibilité", text: "Un contact humain, en français, pour suivre les étapes importantes." },
        { title: "Prudence", text: "Une approche responsable, sans promesse automatique ni garantie de résultat." }
      ]
    },
    faq: {
      title: "Questions fréquentes",
      lead: "Des réponses concrètes aux questions que se posent souvent les francophones en Israël.",
      items: [
        {
          question: "Quels documents préparer avant un premier échange ?",
          answer:
            "Préparez une pièce d’identité, vos coordonnées, les documents fiscaux déjà reçus, fiches de salaire si vous êtes salarié, informations d’activité si vous êtes indépendant, et toute correspondance avec les autorités."
        },
        {
          question: "Puis-je ouvrir un esek si je suis salarié ?",
          answer:
            "C’est parfois possible, selon votre situation personnelle, votre contrat, vos revenus et vos obligations déclaratives. Le premier échange permet d’identifier les points à vérifier."
        },
        {
          question: "Quelle est la différence entre עוסק פטור et עוסק מורשה ?",
          answer:
            "Ces statuts correspondent à des cadres différents pour l’activité indépendante, notamment sur la TVA, les plafonds et les obligations. Le choix dépend de l’activité, du volume attendu et de la situation personnelle."
        },
        {
          question: "Ai-je droit à un החזר מס ?",
          answer:
            "Cela dépend de votre situation fiscale, de vos revenus, crédits, changements familiaux, périodes de travail et documents disponibles. Aucun remboursement ne peut être garanti avant analyse."
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
            "Oui. L’accompagnement est particulièrement utile pour les olim francophones qui découvrent les termes, les démarches et les habitudes administratives en Israël."
        },
        {
          question: "Pouvez-vous m’aider si je ne maîtrise pas l’hébreu ?",
          answer:
            "Oui. L’accompagnement permet de clarifier les documents et démarches en français, avec prise en compte des éléments en hébreu lorsque nécessaire."
        },
        {
          question: "Le service remplace-t-il un comptable ou un avocat ?",
          answer:
            "Non. Il s’agit d’orientation, de préparation et d’accompagnement fiscal. Le service ne se présente pas comme CPA, avocat, רואה חשבון ou conseiller fiscal agréé."
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
        profiles: ["Oleh hadash", "Entrepreneur", "Freelance", "Salarié", "Dirigeant", "Autre"],
        placeholder:
          "Décrivez brièvement votre situation, vos documents et le type d’accompagnement souhaité."
      }
    }
  },
  he: {
    meta: {
      siteName: "Eliezer Torjmane Tax Advisor",
      title: "Eliezer Torjmane Tax Advisor | ליווי מס לדוברי צרפתית בישראל",
      description:
        "ליווי והכוונה בתחום המס לדוברי צרפתית בישראל: פתיחת עוסק, דוחות, החזר מס ומעקב מנהלי לעולים, עצמאים, יזמים ושכירים.",
      keywords: [
        "יועץ מס לדוברי צרפתית בישראל",
        "ליווי מס בישראל",
        "פתיחת עוסק בישראל",
        "החזר מס",
        "tax advisor Israel French speakers"
      ]
    },
    nav: {
      home: "בית",
      services: "שירותים",
      about: "אודות",
      faq: "שאלות",
      contact: "יצירת קשר",
      cta: "WhatsApp"
    },
    common: {
      brand: "Eliezer Torjmane Tax Advisor",
      eyebrow: "ליווי מס לדוברי צרפתית בישראל",
      whatsapp: "WhatsApp",
      email: "Email",
      instagram: "Instagram",
      phone: "טלפון",
      learnMore: "לשירותים",
      contactCta: "יצירת קשר ב-WhatsApp",
      response: "ליווי אנושי, ברור ומסודר",
      disclaimer:
        "המידע באתר זה ניתן כהכוונה כללית בלבד ואינו מחליף ייעוץ אישי. כל מצב מס צריך להיבחן באופן פרטני.",
      ctaTitle: "יש לכם שאלה בתחום המס בישראל?",
      ctaText:
        "שלחו הודעה עם תיאור קצר של המצב, המסמכים הקיימים והשלב שבו אתם צריכים הכוונה."
    },
    home: {
      heroTitle: "ליווי מס בישראל לדוברי צרפתית",
      heroLead:
        "ליווי ליזמים, עצמאים, שכירים ועולים דוברי צרפתית בתהליכי מס בישראל: פתיחת עוסק, הצהרות, החזר מס ומעקב מנהלי.",
      primary: "יצירת קשר ב-WhatsApp",
      secondary: "צפייה בשירותים",
      trustSignals: [
        "כ-10 שנות ליווי",
        "התמחות בדוברי צרפתית בישראל",
        "ניסיון בעולמות corporate והייטק",
        "מעקב אנושי ומסודר"
      ],
      heroCardTitle: "ליווי מס בצרפתית",
      heroCardText: "הבנה ברורה של המצב, המסמכים שצריך להכין והשלבים הבאים.",
      heroCardRows: [
        "פתיחת עוסק ומעקב מנהלי",
        "הצהרות מס וארגון תיק",
        "בדיקת אפשרות להחזר מס, ללא התחייבות לקבלת החזר"
      ],
      introTitle: "גישה נקייה, מקצועית ומרגיעה.",
      introText:
        "המטרה היא להפוך את התהליכים מול מערכת המס בישראל לברורים יותר עבור דוברי צרפתית: להבין חובות, להכין מסמכים ולהתקדם בצורה מסודרת.",
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
      lead: "ליווי מס לדוברי צרפתית בשלבים חשובים בחיים האישיים והעסקיים בישראל.",
      items: [
        {
          title: "פתיחת esek",
          text: "הכוונה והכנה לפתיחת פעילות עצמאית, כולל הסבר על חובות ראשוניות."
        },
        {
          title: "דוחות והצהרות מס",
          text: "סיוע בהכנה, ארגון ומעקב אחר הצהרות בהתאם למצב האישי."
        },
        {
          title: "החזר מס",
          text: "ליווי בבדיקת אפשרות ובהכנת בקשה, ללא התחייבות לקבלת החזר."
        },
        {
          title: "ליווי יזמים",
          text: "מעקב אחר צרכים שוטפים של יזמים, פרילנסרים ובעלי עסקים קטנים."
        },
        {
          title: "ליווי שכירים",
          text: "הכוונה להבנת תלושים, שינויים אישיים ושאלות הסדרה."
        },
        {
          title: "מעקב מס אישי",
          text: "מסגרת מעקב המותאמת למסמכים, מועדים ומאפייני התיק."
        }
      ],
      promiseTitle: "מה הליווי נותן",
      promise:
        "הבנה ברורה של הצעדים הבאים, הכנה מסודרת יותר ותקשורת בצרפתית שמפחיתה לחץ בירוקרטי."
    },
    about: {
      title: "אודות",
      lead:
        "אליעזר טורג׳מן מלווה דוברי צרפתית בישראל בהבנה, הכנה ומעקב אחר תהליכים בתחום המס.",
      body:
        "לאליעזר טורג׳מן ניסיון משמעותי בעולם העסקי, ובפרט באקוסיסטם ההייטק הישראלי. במקביל, מזה כ-10 שנים, הוא מלווה יזמים, עצמאים ושכירים דוברי צרפתית בתהליכים בתחום המס בישראל.",
      values: [
        { title: "בהירות", text: "הסברים פשוטים להבנת האפשרויות, המסמכים והמועדים." },
        { title: "סדר", text: "ארגון שיטתי של המידע לפני כל פעולה." },
        { title: "זמינות", text: "קשר אנושי בצרפתית סביב השלבים החשובים." },
        { title: "זהירות", text: "גישה אחראית, ללא הבטחה אוטומטית או התחייבות לתוצאה." }
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
            "כן. הליווי מתאים במיוחד לעולים דוברי צרפתית שמכירים לראשונה את המונחים, התהליכים וההתנהלות בישראל."
        },
        {
          question: "אפשר לקבל עזרה אם אני לא שולט בעברית?",
          answer:
            "כן. הליווי מסביר בצרפתית את המסמכים והשלבים, ומתייחס גם למסמכים בעברית כשצריך."
        },
        {
          question: "האם השירות מחליף רואה חשבון או עורך דין?",
          answer:
            "לא. מדובר בהכוונה, הכנה וליווי בתחום המס. השירות אינו מוצג כ-CPA, עורך דין, רואה חשבון או יועץ מס מורשה."
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
        profiles: ["עולה חדש", "יזם", "פרילנסר", "שכיר", "בעל עסק", "אחר"],
        placeholder: "תארו בקצרה את המצב, המסמכים וסוג הליווי המבוקש."
      }
    }
  },
  en: {
    meta: {
      siteName: "Eliezer Torjmane Tax Advisor",
      title: "Tax advisor in Israel for French speakers | Eliezer Torjmane",
      description:
        "French-speaking tax guidance in Israel for entrepreneurs, freelancers, employees and olim: esek opening, tax declarations, החזר מס and administrative follow-up.",
      keywords: [
        "tax advisor Israel French speakers",
        "French speaking tax advisor Israel",
        "Israeli tax guidance French speakers",
        "open esek Israel",
        "החזר מס",
        "conseiller fiscal Israël"
      ]
    },
    nav: {
      home: "Home",
      services: "Services",
      about: "About",
      faq: "FAQ",
      contact: "Contact",
      cta: "WhatsApp"
    },
    common: {
      brand: "Eliezer Torjmane Tax Advisor",
      eyebrow: "French-speaking tax advisor in Israel",
      whatsapp: "WhatsApp",
      email: "Email",
      instagram: "Instagram",
      phone: "Phone",
      learnMore: "View services",
      contactCta: "Contact me on WhatsApp",
      response: "Clear, human and structured support",
      disclaimer:
        "Information on this site is provided for general guidance only and does not replace personalized advice. Each tax situation should be reviewed individually.",
      ctaTitle: "Have a tax question in Israel?",
      ctaText:
        "Send a short message with your situation, available documents and the step where you need guidance."
    },
    home: {
      heroTitle: "Tax advisor in Israel for French speakers",
      heroLead:
        "Support for French-speaking entrepreneurs, freelancers, employees and olim through Israeli tax processes: esek opening, declarations, החזר מס and administrative follow-up.",
      primary: "Contact me on WhatsApp",
      secondary: "View services",
      trustSignals: [
        "10 years of support",
        "Specialized in French speakers in Israel",
        "Corporate & high-tech experience",
        "Human and structured follow-up"
      ],
      heroCardTitle: "Tax guidance in French",
      heroCardText:
        "A clear reading of your situation, the documents to prepare and the next administrative steps.",
      heroCardRows: [
        "Esek opening and administrative follow-up",
        "Tax declarations and file organization",
        "Review of a possible החזר מס request, without refund guarantee"
      ],
      introTitle: "A premium, clear and reassuring approach.",
      introText:
        "The goal is to make Israeli tax processes easier to understand for French speakers: clarify obligations, prepare the right documents and move forward methodically.",
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
      lead: "French-speaking tax guidance for key personal and professional moments in Israel.",
      items: [
        {
          title: "Ouverture de esek",
          text: "Guidance and preparation for opening independent activity, with explanation of initial obligations."
        },
        {
          title: "Tax declarations",
          text: "Support with preparation, organization and follow-up according to each individual situation."
        },
        {
          title: "החזר מס",
          text: "Support with reviewing and preparing a possible request, without guaranteeing a refund."
        },
        {
          title: "Entrepreneur support",
          text: "Ongoing guidance for entrepreneurs, freelancers and small business owners."
        },
        {
          title: "Employee support",
          text: "Guidance to understand payslips, personal changes, regularization questions and follow-up."
        },
        {
          title: "Personalized tax follow-up",
          text: "A tracking framework adapted to your documents, deadlines and file specifics."
        }
      ],
      promiseTitle: "What the support provides",
      promise:
        "A clearer view of next steps, more organized preparation and French communication that reduces administrative stress."
    },
    about: {
      title: "About",
      lead:
        "Eliezer Torjmane supports French speakers in Israel with understanding, preparing and following tax-related processes.",
      body:
        "Eliezer Torjmane has solid experience in the business world, including the Israeli high-tech ecosystem. In parallel, for around 10 years, he has supported French-speaking entrepreneurs, freelancers and employees through tax-related processes in Israel.",
      values: [
        { title: "Clarity", text: "Simple explanations to understand options, documents and deadlines." },
        { title: "Method", text: "Organized information before every process." },
        { title: "Availability", text: "Human contact in French around important steps." },
        { title: "Care", text: "A responsible approach, without automatic promises or guaranteed outcomes." }
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
          question: "Can I open an esek if I am also an employee?",
          answer:
            "Sometimes yes, depending on your personal situation, employment agreement, income and reporting obligations. The first exchange helps identify what to check."
        },
        {
          question: "What is the difference between עוסק פטור and עוסק מורשה?",
          answer:
            "They are different frameworks for independent activity, especially around VAT, thresholds and obligations. The right path depends on the activity, expected volume and personal situation."
        },
        {
          question: "Am I entitled to a החזר מס?",
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
            "Yes. The support is especially useful for French-speaking olim learning Israeli terms, processes and administrative habits."
        },
        {
          question: "Can you help if I do not master Hebrew?",
          answer:
            "Yes. The support explains documents and steps in French, while taking Hebrew materials into account when needed."
        },
        {
          question: "Does this replace an accountant or lawyer?",
          answer:
            "No. This is tax guidance, preparation and support. The service is not presented as CPA, lawyer, רואה חשבון or licensed tax consultant activity."
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

export function pageMetadata(locale: Locale, page: PageKey): Metadata {
  const dictionary = getDictionary(locale);
  const labels = dictionary.nav;
  const pageTitle = page === "home" ? dictionary.meta.title : `${labels[page]} | ${dictionary.common.brand}`;

  return {
    title: pageTitle,
    description: dictionary.meta.description,
    keywords: [...dictionary.meta.keywords],
    alternates: {
      canonical: getLocalizedPath(locale, page),
      languages: {
        fr: getLocalizedPath("fr", page),
        he: getLocalizedPath("he", page),
        en: getLocalizedPath("en", page)
      }
    },
    openGraph: {
      title: pageTitle,
      description: dictionary.meta.description,
      siteName: dictionary.meta.siteName,
      locale,
      type: "website"
    }
  };
}
