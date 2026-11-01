# V9 — Audit fiscal du simulateur intégré (2026)

Audit de cadrage au 1 novembre 2026. Il ne constitue pas une opinion juridique ni une validation de chaque situation individuelle.

## Dépendances des moteurs

- Impôt progressif : `lib/tax/incomeTax.ts` et les constantes partagées 2026 dans `lib/tax/constants2026.ts`.
- Points enfants et base résident : `lib/tax/childCreditPoints.ts` (barème père/mère standard; le calcul inclut déjà 2,25 ou 2,75 points de base).
- Points Olé Hadash : `lib/tax/olehHadash.ts`.
- Exonération de revenus professionnels Olé 2026 : `lib/tax/oleHadashExemption.ts`.
- Cotisations nationales et santé : `lib/tax/bituahLeumi.ts`, avec une voie Esek Zair optionnelle qui n’altère pas le résultat classique par défaut.
- Pension obligatoire : `lib/tax/pensiaHova.ts`.

## Bases indépendantes

| Régime | Mass Hachnassa | Bitouah Leumi | Pensia Hova |
|---|---|---|---|
| Classique | Bénéfice annuel après dépenses, moins l’ajustement NI de 52 % calculé par le moteur; exonération Olé seulement si le moteur existant l’accepte | Bénéfice après dépenses; le moteur applique la règle standard de la section 345, la priorité salariale, les tranches et plafonds | Bénéfice professionnel classique transmis au moteur existant; les dates et versements requis sont nécessaires |
| Esek Zair | Chiffre d’affaires × 70 %, sans appliquer deux fois les 30 % et sans déduction 47a de cotisations sociales | Revenu transmis après les 30 %, sans les réductions personnelles 52 % et retraite de la section 345 visées par le חוזר 1509; taux sociaux du moteur existant réutilisés | **À vérifier** : aucune obligation chiffrée n’est produite, faute de confirmation primaire suffisamment précise de la base légale Esek Zair pour la définition pension |

Le bénéfice après les 30 % est une base fiscale, pas une mesure des dépenses réelles ni du cash disponible. Un champ facultatif de frais réels est distinct et n’altère aucune base fiscale.

## Confirmé et limites

- Esek Zair : plafond de chiffre d’affaires 2026 de 122 833 ₪ et déduction de 30 % annoncés par l’Autorité fiscale. Au-dessus du plafond, le moteur ne bascule pas automatiquement vers un bénéfice classique.
- Cotisations Esek Zair : le texte intégral consulté du חוזר ביטוח national 1509 du 18 mars 2025 décrit la détermination automatique de l’assiette sociale après les 30 % et exclut les réductions de l’article 345 correspondant aux déductions 47a(א), 47a(ב)(1). Le PDF consulté est une copie hébergée par un tiers, le service officiel public du Bituah Leumi n’a pas été trouvé; cette limite de provenance demeure à confirmer avec le document institutionnel.
- Cotisations classiques : le Bituah Leumi décrit la section 345, le retrait de 52 % de la cotisation nationale (hors santé) et la déduction de la partie de prévoyance déterminée par l’Autorité fiscale. L’interface marque la coordination sociale comme à vérifier si un salaire ne couvre pas les douze mois. Le moteur classique partagé ne chiffre pas l’effet de cotisations pension admissibles sur l’assiette 345; son estimation est donc à relire si de tels versements existent.
- Tranches d’impôt 2026 : le bulletin officiel de l’Autorité fiscale du 30 mars 2026 confirme la modification de l’article 121, dont les limites annuelles 84 120, 120 720, 228 000, 301 200 et 560 280 ₪; les taux sont 10, 14, 20, 31, 35, 47 et 50 %.
- Points : le moteur partagé fournit le point annuel 2 904 ₪ et les crédits de base/enfants standard; les points olé viennent du barème partagé. La simulation ne proratise pas les crédits résident/enfants lors d’une résidence fiscale sur une partie de l’année: ceux-ci sont alors omis et signalés.
- Exonération Olé : le simulateur réutilise le moteur V8.4 existant, uniquement sur le bénéfice classique et les revenus personnels saisis. La date d’Alyah n’est qu’un repère; statuts, résidence et qualifications doivent être contrôlés. L’exonération n’est pas automatiquement déduite dans la voie Esek Zair.
- Pension : le moteur V8.2 est appelé seulement sur la base classique. Définition générale de l’« הכנסה חייבת בהפקדה » dans le guide 2025 : revenu imposable d’activité avant compensations/exemptions, avec offset des paiements pension salariés admissibles. La règle spéciale de la section 87 relative à Esek Zair ne permet pas de conclure ici à la base pension exacte : aucune estimation Esek Zair de cette obligation n’est affichée.
- Déductions fiscales liées aux versements pension, crédits personnels non saisis, retenues, acomptes, crédits de situations non-standard, revenus étrangers et coordination sociale mensuelle irrégulière ne sont pas optimisés. L’impôt affiché est une responsabilité annuelle estimative, pas un solde dû après paiements.
- Au-dessus de 721 560 ₪, le résultat net Mass Hachnassa est suspendu pour vérifier le Mass Yessef et les autres revenus pertinents.

## Sources principales

- רשות המסים, changement de dossier vers Esek Zair, plafond 2026 : https://www.gov.il/he/service/request-transfer-to-micro-business-owner
- רשות המסים, déclaration annuelle simplifiée, déduction de 30 % et crédit pension sur le parcours simplifié : https://www.gov.il/he/service/report-and-payment-for-micro-business-owner
- חוזר ביטוח 1509 (18 mars 2025), copie intégrale consultée : https://greenbook.co.il/content/booking/file57193.pdf
- Bituah Leumi, calcul des cotisations et section 345 : https://www.btl.gov.il/English%20Homepage/Insurance/National%20Insurance/Detailsoftypes/SelfEmployedPerson/Pages/Methodofcalculation.aspx
- Autorité fiscale, barèmes 2026 et article 121 (30 mars 2026) : https://www.gov.il/BlobFolder/dynamiccollectorresultitem/employers-info-300326-1/he/IncomeTax_IncomeTaxEmployersInfo_employers-info-300326-1.pdf
- Autorité fiscale, guide 2025, définition de l’assiette pension et cotisations : https://www.gov.il/BlobFolder/generalpage/income-tax-guide-knowyourright/he/Guides_IncomeTax_da-2025.pdf
- Autorité fiscale, demande d’allègement fiscal Olim/Toshav Hozer Vatik : https://www.gov.il/he/service/tax-relief-new-immigrants
- Autorité fiscale, seuil du Mass Yessef et loi de gel 2025–2027 : https://www.gov.il/BlobFolder/policy/inst-05-2025/he/IncomeTax_inst-05-2025.pdf

## Recommandation

**NO-GO pour une mise en production comme calculateur fiscal complet définitif.** La route est techniquement intégrée, mais le résultat Esek Zair pension est volontairement suspendu, la copie de source du חוזר 1509 doit être recoupée à une publication officielle, et plusieurs déductions/coordination sont explicitement non optimisées. L’outil doit rester une simulation indicative et conditionnelle jusqu’à revue professionnelle et confirmation des règles restantes.
