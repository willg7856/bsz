# Beyond Stage Zero

Monorepo for both public sites:

| Domain | App | Folder | Stack |
|--------|-----|--------|-------|
| [beyondstagezero.com](https://beyondstagezero.com) | Main site | repo root | Vite + React |
| [beyondstagezero.space](https://beyondstagezero.space) | Companion site | [`space/`](./space) | Next.js |

## beyondstagezero.com (root)

```bash
npm install
npm run dev
```

Vercel project settings:
- **Root Directory:** `.` (repository root)
- **Framework:** Vite
- Uses root `vercel.json` (SPA rewrites)

## beyondstagezero.space (`space/`)

```bash
cd space
npm install
npm run dev
```

Vercel project settings (separate project from `.com`):
- **Git repository:** `willg7856/bsz` (this repo)
- **Root Directory:** `space`
- **Framework:** Next.js
- **Domain:** `beyondstagezero.space` (+ `www` if you use it)

After deleting the old `bsz-cursor` repo, create or reconnect a Vercel project with those settings so `.space` keeps deploying from this monorepo.
