# LeadBoosterX

Marketing site for LeadBoosterX (Ericson Largo). TanStack Start v1 · React 19 · Vite 7 · Tailwind CSS v4 · deployed on Vercel.

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build into .output/
npm start          # serve the production build on http://localhost:3000
npm run typecheck
```

Copy `.env.example` to `.env` and add a Resend key to test the contact form locally.

## Where things live

| What | File |
| --- | --- |
| Email, Facebook, Cal.com link, site URL | `src/lib/config.ts` |
| Offer: CTA label, 14-day promise, packages, trust lines, approved results | `src/lib/offer.ts` |
| Projects (cards, workflows, tools) | `src/lib/projects.ts` |
| Pages | `src/routes/_site/*.tsx` (with sidebar) and `src/routes/book-a-call.tsx` |
| Contact email sending (server only) | `src/lib/contact.server.ts` |
| Colors / design tokens | `src/styles.css` |
| Original build spec | `docs/leadboosterx-claude-code-prompt.md` |

`src/routeTree.gen.ts` is generated: never edit it.

## Environment variables (Vercel → Project → Settings → Environment Variables)

| Name | Value |
| --- | --- |
| `RESEND_API_KEY` | API key from resend.com |
| `CONTACT_TO_EMAIL` | `ericsonlargo92@gmail.com` |
| `CONTACT_FROM_EMAIL` | `LeadBoosterX <onboarding@resend.dev>` until a domain is verified in Resend |

## When you connect a custom domain

Update `SITE_URL` in `src/lib/config.ts`, plus the URLs in `public/robots.txt` and `public/sitemap.xml`.
