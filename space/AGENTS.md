# Beyond Stage Zero (.space)

Next.js companion site. See `README.md` for stack and deploy notes.

## Cursor Cloud specific instructions

- Work inside `space/` for this app. Package manager is npm.
- Scripts: `npm run dev`, `npm run build`, `npm run lint`. No test suite.
- `POST /api/contact` returns 503 without `FORMSPREE_FORM_ID` or `RESEND_API_KEY` — expected.
- Dev server: `http://localhost:3000`.
- Production domain: beyondstagezero.space via a Vercel project with Root Directory = `space` on repo `willg7856/bsz`.
