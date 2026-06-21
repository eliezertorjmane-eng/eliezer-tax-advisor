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
  fr: "Francais",
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

const whatsappMessages: Record<Locale, string> = {
  fr: "Bonjour Eliezer, je souhaite un accompagnement fiscal.",
  he: "שלום אליעזר, אשמח לקבל ליווי בתחום המס.",
  en: "Hello Eliezer, I would like tax guidance in Israel."
};

export function getWhatsAppHref(locale: Locale) {
  return `https://wa.me/972584962143?text=${encodeURIComponent(whatsappMessages[locale])}`;
}

export const dictionaries = {
  fr: {
    meta: {
      siteName: "Eliezer Torjmane Tax Advisor",
      title: "Eliezer Torjmane Tax Advisor | Accompagnement fiscal francophone en Israel",
      description:
        "Conseiller fiscal francophone en Israel pour olim hadashim, entrepreneurs, independants, salaries et dirigeants ayant besoin d'orientation fiscale."
    },
    nav: {
      home: "Accueil",
      services: "Services",
      about: "A propos",
      faq: "FAQ",
      contact: "Contact",
      cta: "Parler a Eliezer"
    },
    common: {
      brand: "Eliezer Torjmane Tax Advisor",
      eyebrow: "Conseiller fiscal francophone en Israel",
      whatsapp: "WhatsApp",
      email: "Email",
      instagram: "Instagram",
      phone: "Telephone",
      learnMore: "Voir les services",
      contactCta: "Demander un accompagnement",
      response: "Reponse claire, humaine et structuree",
      disclaimer:
        "Les informations presentes sur ce site sont fournies a titre general et ne remplacent pas un conseil personnalise. Chaque situation fiscale doit etre analysee individuellement."
    },
    home: {
      heroTitle: "Avancer dans les demarches fiscales israeliennes avec clarte.",
      heroLead:
        "Un accompagnement fiscal en francais pour comprendre, preparer et suivre vos obligations en Israel, sans promesse automatique ni jargon inutile.",
      primary: "Commencer sur WhatsApp",
      secondary: "Explorer les services",
      proof: ["Francais, hebreu, anglais", "Independants et salaries", "Dossiers personnels et professionnels"],
      statCards: [
        { value: "3", label: "langues de suivi" },
        { value: "6", label: "services principaux" },
        { value: "100%", label: "approche personnalisee" }
      ],
      introTitle: "Un cadre premium pour des decisions fiscales plus sereines.",
      introText:
        "Le site presente une approche d'orientation, de preparation et d'accompagnement dans les demarches fiscales. Il s'adresse aux francophones vivant en Israel qui veulent savoir quoi faire, quand le faire et comment organiser leurs documents.",
      audienceTitle: "Pour qui ?",
      audiences: [
        "Olim hadashim qui decouvrent le systeme fiscal israelien",
        "Entrepreneurs et freelances qui veulent ouvrir ou structurer leur activite",
        "Salaries ayant besoin d'un suivi ou d'une verification de situation",
        "Dirigeants et independants qui veulent une lecture claire de leurs obligations"
      ],
      processTitle: "Une methode simple",
      process: [
        { title: "Ecoute", text: "Comprendre votre situation, vos documents et vos objectifs." },
        { title: "Orientation", text: "Identifier les demarches possibles et les points a clarifier." },
        { title: "Preparation", text: "Organiser les informations utiles avant depot ou suivi." },
        { title: "Suivi", text: "Rester disponible pour les prochaines etapes du dossier." }
      ]
    },
    services: {
      title: "Services",
      lead:
        "Un accompagnement fiscal francophone pour les etapes importantes de la vie personnelle et professionnelle en Israel.",
      items: [
        {
          title: "Ouverture de esek",
          text: "Orientation et preparation pour l'ouverture d'une activite independante, avec explication des obligations initiales."
        },
        {
          title: "Declarations fiscales",
          text: "Aide a la preparation, a l'organisation et au suivi des declarations selon la situation individuelle."
        },
        {
          title: "החזר מס",
          text: "Accompagnement dans l'etude et la preparation d'une demande eventuelle, sans garantie de remboursement."
        },
        {
          title: "Accompagnement entrepreneurs",
          text: "Suivi des besoins fiscaux courants pour entrepreneurs, freelances et dirigeants de petites structures."
        },
        {
          title: "Accompagnement salaries",
          text: "Orientation pour comprendre les fiches, situations personnelles, changements et questions de regularisation."
        },
        {
          title: "Suivi fiscal personnalise",
          text: "Un cadre de suivi adapte aux documents, delais et specificites de votre dossier."
        }
      ],
      promiseTitle: "Ce que l'accompagnement apporte",
      promise:
        "Une lecture claire des prochaines etapes, une preparation plus ordonnee, et une communication en francais pour reduire le stress administratif."
    },
    about: {
      title: "A propos",
      lead:
        "Eliezer Torjmane accompagne les francophones en Israel dans la comprehension, la preparation et le suivi de leurs demarches fiscales.",
      body:
        "L'approche est directe, pedagogique et prudente : traduire les enjeux, structurer les informations, orienter les prochaines actions et aider a avancer avec methode. Le service ne se presente pas comme une activite de CPA, d'avocat, de רואה חשבון ou de conseiller fiscal agree.",
      values: [
        { title: "Clarte", text: "Des explications simples pour comprendre les options et les documents." },
        { title: "Rigueur", text: "Une organisation methodique des informations avant chaque demarche." },
        { title: "Disponibilite", text: "Un contact humain, en francais, pour suivre les etapes importantes." },
        { title: "Prudence", text: "Des formulations responsables, sans promesse de resultat automatique." }
      ]
    },
    faq: {
      title: "Questions frequentes",
      lead: "Des reponses rapides aux questions que se posent souvent les francophones en Israel.",
      items: [
        {
          question: "Pouvez-vous ouvrir un esek pour moi ?",
          answer:
            "L'accompagnement porte sur l'orientation, la preparation et le suivi des demarches. La situation exacte determine les etapes utiles."
        },
        {
          question: "Est-ce que vous garantissez un remboursement d'impot ?",
          answer:
            "Non. Une demande de החזר מס depend de la situation fiscale individuelle et des documents disponibles. Aucun remboursement n'est garanti."
        },
        {
          question: "Travaillez-vous avec les olim hadashim ?",
          answer:
            "Oui, le site s'adresse notamment aux olim hadashim francophones qui ont besoin de comprendre le systeme fiscal israelien."
        },
        {
          question: "Dans quelles langues peut se faire le suivi ?",
          answer:
            "Le suivi peut se faire en francais, avec support en hebreu et en anglais selon les besoins du dossier."
        },
        {
          question: "Ce service remplace-t-il un conseil juridique ou comptable ?",
          answer:
            "Non. Les informations sont generales et l'accompagnement ne remplace pas une analyse personnalisee par le professionnel competent lorsque la situation l'exige."
        }
      ]
    },
    contactPage: {
      title: "Contact",
      lead:
        "Expliquez votre situation en quelques lignes. Eliezer vous recontacte pour cadrer la demande et les prochaines etapes.",
      directTitle: "Contact direct",
      form: {
        name: "Nom complet",
        email: "Email",
        phone: "Telephone",
        profile: "Votre profil",
        message: "Message",
        submit: "Envoyer la demande",
        profiles: ["Oleh hadash", "Entrepreneur", "Freelance", "Salarie", "Dirigeant", "Autre"],
        placeholder: "Decrivez brievement votre situation, vos documents et le type d'accompagnement souhaite."
      }
    }
  },
  he: {
    meta: {
      siteName: "Eliezer Torjmane Tax Advisor",
      title: "Eliezer Torjmane Tax Advisor | ליווי מס לדוברי צרפתית בישראל",
      description:
        "ליווי והכוונה בתחום המס לדוברי צרפתית בישראל, לעולים חדשים, עצמאים, יזמים, שכירים ובעלי עסקים."
    },
    nav: {
      home: "בית",
      services: "שירותים",
      about: "אודות",
      faq: "שאלות",
      contact: "יצירת קשר",
      cta: "דברו עם אליעזר"
    },
    common: {
      brand: "Eliezer Torjmane Tax Advisor",
      eyebrow: "ליווי מס לדוברי צרפתית בישראל",
      whatsapp: "WhatsApp",
      email: "Email",
      instagram: "Instagram",
      phone: "טלפון",
      learnMore: "לשירותים",
      contactCta: "בקשת ליווי",
      response: "מענה ברור, אנושי ומסודר",
      disclaimer:
        "Les informations presentes sur ce site sont fournies a titre general et ne remplacent pas un conseil personnalise. Chaque situation fiscale doit etre analysee individuellement."
    },
    home: {
      heroTitle: "מתקדמים מול מערכת המס בישראל בצורה ברורה ומסודרת.",
      heroLead:
        "ליווי בצרפתית להבנה, הכנה ומעקב אחר תהליכים בתחום המס בישראל, בלי הבטחות אוטומטיות ובלי שפה מסובכת.",
      primary: "להתחיל ב-WhatsApp",
      secondary: "צפייה בשירותים",
      proof: ["צרפתית, עברית ואנגלית", "עצמאים ושכירים", "תיקים אישיים ועסקיים"],
      statCards: [
        { value: "3", label: "שפות ליווי" },
        { value: "6", label: "שירותים מרכזיים" },
        { value: "100%", label: "גישה אישית" }
      ],
      introTitle: "מסגרת מקצועית ורגועה לקבלת החלטות מסודרות.",
      introText:
        "האתר מציג שירותי הכוונה, הכנה וליווי בתהליכים בתחום המס. הוא מיועד לדוברי צרפתית בישראל שרוצים להבין מה לעשות, מתי לפעול ואיך לארגן את המסמכים.",
      audienceTitle: "למי זה מתאים?",
      audiences: [
        "עולים חדשים שמכירים את מערכת המס בישראל",
        "יזמים ופרילנסרים שרוצים לפתוח או להסדיר פעילות",
        "שכירים שזקוקים לבדיקה או מעקב אחר מצב אישי",
        "בעלי עסקים ועצמאים שרוצים להבין את החובות שלהם"
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
        "אליעזר טורג'מן מלווה דוברי צרפתית בישראל בהבנה, הכנה ומעקב אחר תהליכים בתחום המס.",
      body:
        "הגישה ישירה, לימודית וזהירה: להסביר את הנושאים, לסדר את המידע, לכוון לפעולות הבאות ולעזור להתקדם בצורה שיטתית. השירות אינו מוצג כפעילות של CPA, עורך דין, רואה חשבון או יועץ מס מורשה.",
      values: [
        { title: "בהירות", text: "הסברים פשוטים להבנת אפשרויות ומסמכים." },
        { title: "סדר", text: "ארגון שיטתי של מידע לפני כל פעולה." },
        { title: "זמינות", text: "קשר אנושי בצרפתית סביב השלבים החשובים." },
        { title: "זהירות", text: "ניסוח אחראי, ללא הבטחה לתוצאה אוטומטית." }
      ]
    },
    faq: {
      title: "שאלות נפוצות",
      lead: "תשובות קצרות לשאלות נפוצות של דוברי צרפתית בישראל.",
      items: [
        {
          question: "האם אפשר לקבל ליווי לפתיחת esek?",
          answer:
            "כן. הליווי מתמקד בהכוונה, הכנה ומעקב אחר השלבים. המצב הספציפי קובע אילו צעדים נדרשים."
        },
        {
          question: "האם מובטח החזר מס?",
          answer:
            "לא. בקשת החזר מס תלויה במצב האישי ובמסמכים הקיימים. אין התחייבות לקבלת החזר."
        },
        {
          question: "האם השירות מתאים לעולים חדשים?",
          answer:
            "כן. השירות מיועד בין היתר לעולים חדשים דוברי צרפתית שרוצים להבין את מערכת המס בישראל."
        },
        {
          question: "באילו שפות ניתן לקבל ליווי?",
          answer:
            "הליווי יכול להתבצע בצרפתית, עם תמיכה בעברית ובאנגלית בהתאם לצורך."
        },
        {
          question: "האם זה מחליף ייעוץ משפטי או חשבונאי?",
          answer:
            "לא. המידע כללי והליווי אינו מחליף בדיקה אישית של בעל מקצוע מתאים כאשר המצב דורש זאת."
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
        submit: "שליחת בקשה",
        profiles: ["עולה חדש", "יזם", "פרילנסר", "שכיר", "בעל עסק", "אחר"],
        placeholder: "תארו בקצרה את המצב, המסמכים וסוג הליווי המבוקש."
      }
    }
  },
  en: {
    meta: {
      siteName: "Eliezer Torjmane Tax Advisor",
      title: "Eliezer Torjmane Tax Advisor | French-speaking tax guidance in Israel",
      description:
        "French-speaking tax guidance in Israel for new immigrants, entrepreneurs, freelancers, employees and business owners."
    },
    nav: {
      home: "Home",
      services: "Services",
      about: "About",
      faq: "FAQ",
      contact: "Contact",
      cta: "Speak with Eliezer"
    },
    common: {
      brand: "Eliezer Torjmane Tax Advisor",
      eyebrow: "French-speaking tax advisor in Israel",
      whatsapp: "WhatsApp",
      email: "Email",
      instagram: "Instagram",
      phone: "Phone",
      learnMore: "View services",
      contactCta: "Request guidance",
      response: "Clear, human and structured support",
      disclaimer:
        "Les informations presentes sur ce site sont fournies a titre general et ne remplacent pas un conseil personnalise. Chaque situation fiscale doit etre analysee individuellement."
    },
    home: {
      heroTitle: "Move through Israeli tax processes with clarity.",
      heroLead:
        "French-speaking tax guidance to understand, prepare and follow your obligations in Israel, without automatic promises or unnecessary jargon.",
      primary: "Start on WhatsApp",
      secondary: "Explore services",
      proof: ["French, Hebrew, English", "Freelancers and employees", "Personal and business files"],
      statCards: [
        { value: "3", label: "support languages" },
        { value: "6", label: "core services" },
        { value: "100%", label: "personal approach" }
      ],
      introTitle: "A premium structure for calmer tax decisions.",
      introText:
        "The site presents guidance, preparation and support for tax-related processes. It is designed for French speakers in Israel who want to know what to do, when to act and how to organize documents.",
      audienceTitle: "Who it helps",
      audiences: [
        "Olim hadashim discovering the Israeli tax system",
        "Entrepreneurs and freelancers opening or structuring activity",
        "Employees who need personal situation review or follow-up",
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
        "The approach is direct, educational and careful: clarify the issues, structure the information, orient the next actions and help move forward methodically. The service is not presented as CPA, lawyer, רואה חשבון or licensed tax consultant activity.",
      values: [
        { title: "Clarity", text: "Simple explanations to understand options and documents." },
        { title: "Method", text: "Organized information before every process." },
        { title: "Availability", text: "Human contact in French around important steps." },
        { title: "Care", text: "Responsible wording, without automatic result promises." }
      ]
    },
    faq: {
      title: "Frequently asked questions",
      lead: "Quick answers for French speakers in Israel.",
      items: [
        {
          question: "Can you help with opening an esek?",
          answer:
            "Yes. The support focuses on guidance, preparation and follow-up. The exact situation determines the useful steps."
        },
        {
          question: "Do you guarantee a tax refund?",
          answer:
            "No. A החזר מס request depends on the individual tax situation and available documents. No refund is guaranteed."
        },
        {
          question: "Do you work with olim hadashim?",
          answer:
            "Yes, the service is especially relevant for French-speaking olim hadashim who need to understand Israel's tax system."
        },
        {
          question: "Which languages are supported?",
          answer:
            "Support can be provided in French, with Hebrew and English support depending on the file."
        },
        {
          question: "Does this replace legal or accounting advice?",
          answer:
            "No. The information is general and the support does not replace personalized analysis by the appropriate professional when required."
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
        submit: "Send request",
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
