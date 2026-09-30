# TODO

- Confirm the preferred production domain and update SEO canonical URLs if needed.
- Keep the About page profile image at `public/eliezer-profile.jpg` and maintain a landscape-friendly layout.
- Optional private reference file `private-reference/bituah-leumi-calculator-2025.html` was not found.
- Review and confirm the 2026 calculator constants against official Israeli sources before launch and repeat this review every year.
- The contact form currently prepares a `mailto:` email draft and is not connected to a backend.
- If backend handling is required, connect the form to a Next.js server action with Resend, or to a managed form endpoint such as Formspree. Add spam protection and a success/error state before launch.
- Add analytics only after choosing a privacy-friendly provider and consent approach.
- Review final French, Hebrew and English wording with the business owner before launch.
- Add professional photography or additional brand assets if they become available.
- Manual calculator QA to repeat before launch: Bitouah Leumi status detection at 20h/week, 12h + 2,065 NIS income, 6,885 NIS income; ole hadash schedules before/after 2022; income tax bracket edges; credit-point value; gross-to-net with and without Bitouah Leumi.

## Future V7 Content Backlog

- Fiscalité France-Israel.
- Résidence fiscale.
- Retraites françaises en Israël.
- Crédit d’impôt / נקודות זיכוי.
- Achat immobilier en Israël.
- Guides restants à compléter et prioriser.
- Cas pratiques restants à compléter et prioriser.
- Visuels spécifiques pour les articles et cartes éditoriales.
- Visuels pour Google Business posts.
- Calculateurs full Hebrew and English.
- Google Business posts.
- Monthly SEO content calendar.
- Google Search Console query signal: declaration fiscale israel — 15 impressions.
- Google Search Console query signal: impot loyers israel — 4 impressions.
- Google Search Console query signal: déclaration impôts israël — 3 impressions.
- Google Search Console query signal: autoentrepreneur israël — 3 impressions.
- Google Search Console query signal: sde eliezer — 2 impressions.
- Google Search Console query signal: ouvrir une entreprise israël — 2 impressions.
- Google Search Console query signal: tax management israel — 2 impressions.
- Google Search Console query signal: torjmane — 1 impression.
- Google Search Console query signal: tax israel — 1 impression.
- Google Search Console V8 note, 2026-07-29: declaration fiscale israel, déclaration impôts israël, autoentrepreneur israël, ouvrir une entreprise israël, tax management israel, tax israel and torjmane were used to prioritize the new French editorial cluster.
- Monitor the new declaration fiscale, opening-business and Olim Hadashim 2026 clusters after indexing.

## Official Source Follow-Ups

- Add verified official source for אישור תושבות מס / Israeli tax-residence certificate.
- Add verified official France-Israel tax convention source.
- Add verified official source for פריסת מס שבח / form 7003.
- Verify official 2026 Israeli Tax Authority rental income thresholds and rules before final publication.
- Verify official current Israeli Tax Authority deadlines for משפר דיור / Mass Rehisha, including purchase from kablan and טופס 4.
- Verify official current Mass Rehisha purchase tax brackets for דירה יחידה and דירה שנייה.
- Milouim verification completed on 2026-09-30: the Tax Authority confirms the full 2026–2027 scale (0 below 30 days, 0.5 at 30–39, 0.75 at 40–49, 1 at 50–54, then +0.25 per complete 5 days, capped at 4 from 110 days), 2,904 NIS per point annually (242 monthly), and Form 101 part ח׳, item 16. Sources: https://www.gov.il/he/pages/pa181225-1 and https://www.gov.il/he/pages/warrior-credit-points . Recheck the point value for each subsequent tax year; this does not close the general calculator-constants review above.
- Tsahal verification completed on 2026-09-30: the official article linked in the guide confirms service in 2025 for tax year 2026, levels א'+ / א' / ב', the certificate named נקודות זיכוי לשנת 2025 in אזור אישי, employer submission, annual returns for independents, waiting for accurate days, tax coordination for multiple employers, and hotline 1111 extension 4.
- Confirmed public entry URL: https://www.miluim.idf.il/auth (MY IDF or one-time code). Still unconfirmed: exact authenticated sub-menu labels/click sequence and certificate generation/download after login. Do not publish an invented internal route; the public Tsahal article establishes availability in אזור אישי.
- Verification access limitation: direct gov.il pages/PDF retrieval returned HTTP 403 and the Tsahal pages expose no readable body to the fetcher. The conclusions above were checked against indexed text from the official URLs, including the full Tax Authority scale and Tsahal instructions; no secondary source was used as confirmation. A live authenticated walkthrough remains outstanding.
- Add direct official Tax Authority PDF URLs for Income Tax Circular 7/2026 and Form 116ע if exposed outside the current Tax Authority service attachment flow.

## Added in V7.2

- Mass Rehisha / משפר דיור guide and case study added.
- Milouim 2026 / Nekoudot Zikouy guide and case study added.

## Added in V7.3

- Compact story-style case-study cards added for /fr/cas-reels.
- Mass Rehisha / משפר דיור guide and case strengthened.
- Milouim 2026 / Nekoudot Zikouy guide and case strengthened with owner-provided Tsahal/miluim details.
- Rental income case study strengthened with a clearer Massloul Mass comparison story.

## Added in V8 - 2026-07-29

- French pillar guide added for declaration fiscale israel / déclaration impôts israël.
- French pillar guide added for opening-business / autoentrepreneur israël intent, including Esek Patur, Esek Mourche, Esek Zair and company comparison.
- French pillar guide added for the Olim Hadashim 2026 reform, with official source links and no public source placeholders.
- Three French case studies added for declaration France-Israel, pre-opening status choice and Oleh Hadash 2026 revenue separation.
- Services, resources, calculator related links and the Oleh Hadash calculator callout were connected to the new V8 content.
