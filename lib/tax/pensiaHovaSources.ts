export const pensiaHovaSources = [
  { label: "Knesset — loi de 2016, chapitre II, articles 2 à 4", url: "https://fs.knesset.gov.il/20/law/20_lsr_366872.pdf" },
  { label: "Ministère des Finances — pension obligatoire des indépendants", url: "https://haotzarsheli.mof.gov.il/Subject/Pages/Mandatory-Pension-for-Self-Employed.aspx" },
  { label: "Autorité fiscale — coordination des versements salariés et indépendants, guide 2025", url: "https://www.gov.il/BlobFolder/generalpage/income-tax-guide-knowyourright/he/Guides_IncomeTax_da-2025.pdf" },
  { label: "Bitouah Leumi — salaire moyen 2026", url: "https://www.btl.gov.il/Insurance/HozrimBituah/Hozrim/_מקדמות_ודמי_ביטוח_לעצמאים_2026__.pdf" },
  { label: "Kol Zchut — synthèse pratique : première immatriculation et année incomplète", url: "https://www.kolzchut.org.il/he/ביטוח_פנסיוני_לעובד_עצמאי" }
] as const;

export const pensiaHovaFaq = [
  { question: "Sept ou dix mois de revenus réduisent-ils automatiquement la Pensia Hova ?", answer: "Non. Si l’obligation s’applique, le barème annuel est calculé sur le bénéfice éligible réellement gagné pendant l’année. Ni les revenus ni les seuils ne sont automatiquement multipliés par 12/7, 7/12 ou 10/12. Une interruption ou une fermeture exceptionnelle nécessite une vérification." },
  { question: "J’ai créé mon entreprise en 2026 : dois-je cotiser ?", answer: "Le test porte sur la première immatriculation à la TVA. Une immatriculation jusqu’au 30 juin ne bénéficie pas de l’exception des six mois au 31 décembre ; à partir du 1er juillet, l’exemption pour cette année peut s’appliquer. Il ne s’agit pas du nombre de mois avec revenus." },
  { question: "Je suis aussi salarié : quel montant saisir ?", answer: "Les versements pension admissibles annuels, parts salarié et employeur, attestés par vos documents, et non le salaire. N’incluez pas automatiquement les פיצויים ou les autres composantes : une attestation non ventilée doit être vérifiée. Le complément indépendant est limité à ce qui reste de l’obligation." },
  { question: "Quel bénéfice faut-il saisir ?", answer: "Le revenu professionnel annuel éligible après les dépenses admises, mais avant les déductions pension, Keren Hishtalmut et autres déductions exclues par la loi, et avant compensation des pertes et exonérations. Ce n’est pas le chiffre d’affaires. Si votre bénéfice fiscal inclut déjà ces ajustements, faites vérifier la base." },
  { question: "À quel âge l’obligation s’applique-t-elle ?", answer: "Le test légal s’effectue au 31 décembre : au moins 21 ans et moins de 60 ans. Une personne âgée d’au moins 55 ans au 1er janvier 2017 relève de l’exemption transitoire. Le calcul ne crée pas de prorata mensuel selon l’anniversaire." },
  { question: "Le montant mensuel est-il un prélèvement obligatoire ?", answer: "Non. C’est l’obligation annuelle divisée par douze pour planifier l’épargne, pas une échéance personnalisée. Le montant à compléter est annuel et tient compte des versements déjà effectués. Les cotisations doivent normalement être complétées avant la fin de l’année fiscale." }
] as const;
