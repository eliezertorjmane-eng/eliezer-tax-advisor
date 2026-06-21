# Eliezer Torjmane Tax Advisor

Premium multilingual website for **Eliezer Torjmane Tax Advisor**, a French-speaking tax advisor in Israël.

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

## Contact

- Phone / WhatsApp: `+972584962143`
- Displayed phone: `058-4962143`
- Email: `Torjmane.TA@gmail.com`
- Instagram: `https://www.instagram.com/eliezer.tax.advisor/`

## Visual Direction

The V2 design uses a light premium advisory style inspired by the logo:

- white and very light blue backgrounds
- deep navy text
- brand blues `#1E6B87`, `#4FAFD1`, `#7DDCFF`
- white cards, soft blue borders and subtle shadows
- deep navy footer only for contrast

## Local Development

```bash
npm install
npm run dev
```

## Validation

```bash
npm run lint
npm run build
```

## Form Handling

The contact form currently prepares a `mailto:` email draft. It is not connected to a backend.

For production form capture, connect a Next.js server action with Resend or use a managed form endpoint such as Formspree.

## Legal Wording

The website intentionally uses careful wording: conseiller fiscal, accompagnement fiscal, orientation, préparation and accompaniment in administrative/tax processes.

Do not claim that the service is a CPA, lawyer, רואה חשבון, or licensed tax consultant service. Do not guarantee tax refunds.

Footer disclaimer:

> Les informations présentes sur ce site sont fournies à titre général et ne remplacent pas un conseil personnalisé. Chaque situation fiscale doit être analysée individuellement.
