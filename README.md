# Beyond Stage Zero

Monorepo for both public sites:

| Domain | App | Folder | Stack |
|--------|-----|--------|-------|
| [beyondstagezero.com](https://beyondstagezero.com) | Main site | repo root | Vite + React |
| [beyondstagezero.space](https://beyondstagezero.space) | Minimal brand page | [`space/`](./space) | Next.js |

## beyondstagezero.com (root)

```bash
npm install
npm run dev
```

Vercel project settings:
- **Root Directory:** `.` (repository root)
- **Framework:** Vite
- Uses root `vercel.json` (SPA rewrites)

## beyondstagezero.space

Served from this same Vercel project (`beyondstagezero/bsz`) via host-based rewrites to `public/space-landing.html`.

In Vercel → Project **bsz** → Settings → Domains, add:

- `beyondstagezero.space`
- `www.beyondstagezero.space` (optional)

If the domain is still on an old/deleted project, remove it there first, then add it here. After that, every production deploy of this repo updates `.space` automatically.

The Next.js app under [`space/`](./space) remains available if you later want a separate Vercel project with Root Directory = `space`.

