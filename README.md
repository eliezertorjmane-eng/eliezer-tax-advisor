# Eliezer Torjmane

Premium multilingual website for **Eliezer Torjmane**, with French as the primary version for francophones in Israël and localized Hebrew/English positioning for Israeli and international visitors.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide icons

## Languages

- French: main complete version at `/fr`
- Hebrew: RTL support at `/he`
- English: `/en`

The root route redirects to `/fr`.

## French Resource Pages

- `/fr/ressources`
- `/fr/videos`
- `/fr/creation-esek-israel`
- `/fr/hahzar-mas-remboursement-impot-israel`
- `/fr/declarations-fiscales-israel`
- `/fr/fiscalite-salaries-israel`
- `/fr/olim-hadashim-fiscalite-israel`

## Calculators

French calculator routes:

- `/fr/calculateurs`
- `/fr/calculateurs/ehzer-mass`
- `/fr/calculateurs/bituah-leumi-independant`
- `/fr/calculateurs/ole-hadash-nekoudot-zikouy`
- `/fr/calculateurs/nekoudot-zikouy`
- `/fr/calculateurs/salaire-brut-net-israel`
- `/fr/calculateurs/impot-revenu-israel`

English and Hebrew calculator landing pages:

- `/en/calculators`
- `/he/calculators`

Calculator constants are centralized in `lib/tax/constants2026.ts`. They are labeled as 2026 constants and must be reviewed annually before production use.

## Contact

- Phone / WhatsApp: `+972584962143`
- Displayed phone: `058-4962143`
- Email: `Torjmane.TA@gmail.com`
- Instagram: `https://www.instagram.com/eliezer.tax.advisor/`

## Visual Direction

The V5 design keeps the light premium advisory style inspired by the logo:

- white and very light blue backgrounds
- deep navy text
- brand blues `#1E6B87`, `#4FAFD1`, `#7DDCFF`
- white cards, soft blue borders and subtle shadows
- deep navy footer only for contrast
- modest profile photo integration in the About page through `public/eliezer-profile.jpg`

If `public/eliezer-profile.jpg` is missing locally, add the real professional profile photo before launch.

## Local Development

```bash
npm install
npm run dev
```

## Validation

```bash
npm run lint
npm run typecheck
npm run build
```

## SEO

Set `NEXT_PUBLIC_SITE_URL` to the production domain before launch. The site uses this value for canonical URLs, Open Graph metadata, `robots.txt`, `sitemap.xml`, and JSON-LD structured data.

## Form Handling

The contact form currently prepares a `mailto:` email draft. It is not connected to a backend.

For production form capture, connect a Next.js server action with Resend or use a managed form endpoint such as Formspree.

## Legal Wording

The website identifies Eliezer as:

- French: `Conseiller fiscal agréé en Israël`
- Hebrew: `יועץ מס מורשה בישראל`
- English: `Licensed tax advisor in Israel`

Do not claim that the service is a CPA, lawyer, or רואה חשבון unless explicitly added later. Do not guarantee tax refunds.

Footer disclaimer:

> Les informations et calculateurs présents sur ce site sont fournis à titre indicatif et ne remplacent pas une analyse personnalisée par un professionnel. Chaque situation fiscale doit être examinée individuellement.
