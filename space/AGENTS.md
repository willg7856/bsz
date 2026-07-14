# Beyond Stage Zero

Marketing site (Next.js App Router + TypeScript + Tailwind). See `README.md` for stack and content-editing entry points (`src/content.ts`, `src/tokens.ts`).

## Cursor Cloud specific instructions

- Package manager is npm (`package-lock.json`). Standard scripts live in `package.json`: `npm run dev`, `npm run build`, `npm run lint`. There is no test suite.
- The site is fully static except the `POST /api/contact` route. That route needs no external service to run; with no `FORMSPREE_FORM_ID` or `RESEND_API_KEY` set it intentionally returns HTTP 503 ("Contact delivery is not configured."). This is expected in a fresh environment — it is not a bug. To exercise the success path, set one of those env vars in `.env.local` (see `.env.example`).
- Dev server runs on `http://localhost:3000`.
