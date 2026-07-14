# Beyond Stage Zero (.space)

Marketing site for [beyondstagezero.space](https://beyondstagezero.space) — companion to [beyondstagezero.com](https://beyondstagezero.com).

## Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS
- Static pages + contact API route (Formspree or Resend)

## Content & design

- **`src/content.ts`** — every string on the site (copy, specs, test log). Edit this to change wording.
- **`src/tokens.ts`** — colours, fonts, spacing. Wired into Tailwind.

## Develop

```bash
npm install
npm run dev
```

## Contact form

Set one of:

- `FORMSPREE_FORM_ID`
- `RESEND_API_KEY` (+ optional `RESEND_FROM_EMAIL`)

See `.env.example`.

## Deploy

Deploy to Vercel (aliased to beyondstagezero.space). Add the contact env var in the project settings.

## Deploying beyondstagezero.space

This folder contains the Next.js site for **beyondstagezero.space** (source of truth historically: `willg7856/bsz-cursor`).

To ship it:
1. Copy these files into the `bsz-cursor` repo (or point the Vercel project for `.space` at this `space/` directory with Root Directory = `space`).
2. Deploy on Vercel with domain `beyondstagezero.space`.

From this folder: `npm install && npm run build`.
