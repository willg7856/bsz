# Beyond Stage Zero (.space)

Next.js companion site for [beyondstagezero.space](https://beyondstagezero.space).

Sister site: [beyondstagezero.com](https://beyondstagezero.com) (Vite app at the repo root).

## Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS
- Contact API route (Formspree or Resend)

## Content

- `src/content.ts` — site copy, specs, missions, tests
- `src/tokens.ts` — colours / design tokens

## Develop

```bash
npm install
npm run dev
```

## Contact form

Set one of in Vercel / `.env.local`:

- `FORMSPREE_FORM_ID`
- `RESEND_API_KEY` (+ optional `RESEND_FROM_EMAIL`)

## Deploy (Vercel)

This folder is the **Root Directory** for the `.space` Vercel project on repo `willg7856/bsz`:

1. Vercel → Add New Project → import `willg7856/bsz`
2. Set **Root Directory** to `space`
3. Framework preset: Next.js
4. Assign domain `beyondstagezero.space`
5. Deploy

Do **not** use the repository root for this project — that root is the Vite `.com` site.
