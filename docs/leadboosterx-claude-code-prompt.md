# Claude Code Prompt — Build the LeadBoosterX Website

You are building a production website from scratch in this folder. The complete spec is below (sections 0–16). Follow it exactly. Where the spec and this header disagree, the spec wins.

## How to work

1. **Plan first.** Read the whole spec, then post a short plan: the file tree, the build order, and anything unclear. Wait for my OK before writing code.
2. **Scaffold.**
   - Create `package.json` with the exact versions in section 0 and run `npm install`.
   - Create `vite.config.ts`, `tsconfig.json`, `.gitignore`, `src/router.tsx`, `src/styles.css` and `src/lib/config.ts`.
   - Run `npm run dev` once to confirm `src/routeTree.gen.ts` gets generated. Never edit that file.
3. **Build in this order, and check that `npx tsc --noEmit` passes after each step:**
   1. Design tokens and the theme provider/toggle (no-flash script)
   2. BrandLogo
   3. SiteLayout: sidebar, mobile drawer, footer
   4. Routes: `/`, `/projects`, `/services`, `/about`, `/contact`, `/book-a-call`, plus 404 and error pages
   5. Contact server function (`createServerFn` + Resend + zod + honeypot)
   6. Cal.com embed (client-only)
   7. SEO: per-route `head()`, `robots.txt`, `sitemap.xml`, `og.jpg`
4. **Assets.** I'll put these in `public/` (if one is missing, use a neutral placeholder and tell me):
   - `public/images/ericson.jpg`: headshot
   - `public/projects/payment-recovery-live.png` and `public/projects/payment-recovery-flow.png`
   - Generate `public/favicon.svg` (the LB growth mark) and `public/images/og.jpg` (1200×630) yourself.
5. **Secrets.**
   - Never hard-code the Resend key.
   - Create `.env.example` with `RESEND_API_KEY=`, `CONTACT_TO_EMAIL=ericsonlargo92@gmail.com` and `CONTACT_FROM_EMAIL=LeadBoosterX <onboarding@resend.dev>`.
   - Add `.env` to `.gitignore`.
   - Ask me for my real Cal.com link before finishing. Until then, keep the placeholder `ericsonlargo/strategy-call` in `src/lib/config.ts`.
6. **Verify before you say it's done:**
   - `npm run build` and `npx tsc --noEmit` both pass.
   - Start the production server and check that all 6 routes return 200 and an unknown route returns 404.
   - Use Playwright to take full-page screenshots at 1440×900 and 390×844, and look at them yourself.
   - Fix any overflow, contrast or layout issues.
   - Test:
     - the mobile drawer (open, navigate, close)
     - the theme toggle (persists across reloads, no flash)
     - the Projects filter counts
     - the contact form's validation, success and error states (with `RESEND_API_KEY` unset you should see the error state)
   - Run the "no GHL" search from the section 16 checklist and get zero results.
7. **Git.** Run `git init`, make a first commit ("Initial LeadBoosterX site"), and tell me the commands to push to a new GitHub repo. Then walk me through importing it into Vercel and adding the 3 environment variables.
8. **Finish** with a short summary: what was built, any placeholders still left, and the remaining manual steps (Cal.com account linked to ericsonlargo92@gmail.com, Resend API key, Vercel environment variables).

## Rules

- Don't invent clients, testimonials, results, or metrics. Keep the project labels (Concept / Demo / Sample / Live Build).
- Don't add GoHighLevel connections of any kind. GoHighLevel appears only as a service I offer and as a tool named in the project descriptions.
- Use only semantic color tokens in components (no raw hex), TanStack `Link` for internal links, and `lucide-react` for icons.
- Keep the copy exactly as written in the spec unless I approve a change.

---

# Website Build Prompt — LeadBoosterX (Ericson Largo) · Improved Spec

Build this site with **TanStack Start v1 (React 19 + Vite 7)** and **Tailwind CSS v4**, deployed to **Vercel** from GitHub. It's a separate site from the Ericson Largo bookkeeping site: different brand (blue/cyan), different audience (businesses that need leads, booked calls and follow-up).

Do not invent clients, testimonials, results, revenue numbers or certifications. Every project is labeled **Concept Project**, **Demo Build**, **Sample System** or **Live Build (redacted)**.

---

## What changed from the previous spec

| Area | Before | Now | Why |
| --- | --- | --- | --- |
| Navigation | One URL (`/`) switching views with state | Real routes: `/`, `/projects`, `/services`, `/about`, `/contact`, `/book-a-call` | Google can index each page, links are shareable, the back button works, and per-page meta actually works |
| GHL sub-account | Calendar, form, tracking and photo all tied to an outside GHL location | **Removed entirely.** No GHL IDs, domains or scripts anywhere | The site runs only on accounts Ericson owns |
| Booking | Custom calendar calling GHL `/vibe-ai/booking/submit` | **Cal.com** inline embed (free plan) connected to the Google Calendar of **ericsonlargo92@gmail.com** | Owned account; handles time zones, slots, confirmations and email reminders |
| Contact form | GHL form iframe | Own React form, submitted to a TanStack Start server function that emails Ericson through **Resend** | Owned; no third-party form branding; works on Vercel |
| Tracking | GHL `external-tracking/events` + `__vibe_sid` cookie | Removed (optional: Vercel Analytics) | Was tied to the GHL account |
| Config | IDs hard-coded across files | One config file (`src/lib/config.ts`) + environment variables | Easy to change later |
| Profile photo | Hotlinked from the GHL media CDN | Saved in `public/images/` | No outside dependency |
| Error color | `--destructive` = primary blue | Real red | Errors shouldn't look like links |
| SMS | SMS reminders with no consent | No SMS. Phone is optional; reminders go by email | Avoids A2P 10DLC/TCPA consent requirements entirely |
| Keyboard shortcuts | 1–5 and ? | Removed | Low value on a marketing site |
| Placeholders | `[contact@…]`, `[LinkedIn]`, `[Facebook]` | Real email + Facebook | Placeholders would ship as visible text |
| Missing copy | FAQ, bio, timeline, services referenced but not written | All written in this spec | A rebuild must be self-contained |
| Sidebar width | "72rem (`w-72`)" | `w-72` = **18rem** | Typo |
| Projects | 4 concept cards | 4 concept cards + 1 **live build** (real GHL screenshot, redacted) | Real proof beats concepts |
| Copy | "Closing Mastery", "Trace Flow", "Engineered With", "Book Here! Grow, Save and Reduce Busy Hours!" | Plain language (see sections) | Clearer, more credible |

---

## 0. Setup

Same stack and versions as the bookkeeping site (TanStack Start 1.168.61 is the newest that supports Vite 7):

- dependencies: `@tanstack/react-start@1.168.61`, `@tanstack/react-router@1.170.42`, `@tanstack/react-query@^5.90`, `react@^19.1`, `react-dom@^19.1`, `lucide-react@^0.540`, `@calcom/embed-react` (booking), `resend` (contact email), `zod` (form validation)
- devDependencies: `vite@^7.3`, `@vitejs/plugin-react@^5`, `@tailwindcss/vite@^4.1`, `tailwindcss@^4.1`, `tw-animate-css@^1.3`, `nitro@3.0.261103-rc`, `typescript@^5.9`, `@types/react`, `@types/react-dom`
- `vite.config.ts` plugins: `tailwindcss(), tanstackStart(), nitro(), viteReact()`. `nitro()` makes Vercel deploys work with no extra config.
- `src/router.tsx` exports `getRouter()` with a `QueryClient` passed as context, `scrollRestoration: true` and `defaultPreload: "intent"`.
- Never edit `src/routeTree.gen.ts`.

## 1. Config — `src/lib/config.ts` (single source of truth, no GHL)

```ts
export const CONTACT = {
  email: "ericsonlargo92@gmail.com",
  facebook: "https://www.facebook.com/ericsonlargo.metamediabuyer/",
};

// Cal.com booking page: https://cal.com/<username>/<event-slug>
export const BOOKING = {
  calLink: "ericsonlargo/strategy-call", // placeholder: replace with the real Cal.com link
  durationMinutes: 30,
};
export const bookingUrl = `https://cal.com/${BOOKING.calLink}`;
```

**Environment variables** (set in Vercel → Project → Settings → Environment Variables; never commit them):

| Name | Value |
| --- | --- |
| `RESEND_API_KEY` | API key from resend.com (free tier) |
| `CONTACT_TO_EMAIL` | `ericsonlargo92@gmail.com` |
| `CONTACT_FROM_EMAIL` | `LeadBoosterX <onboarding@resend.dev>` until a domain is verified in Resend, then e.g. `hello@yourdomain.com` |

**One-time account setup (no code):**

- **Cal.com:**
  - Sign up with **ericsonlargo92@gmail.com** ("Continue with Google").
  - Under Settings → Calendars, connect the Google Calendar for **ericsonlargo92@gmail.com**. Set it as the calendar that's checked for conflicts and the destination calendar where bookings are added. Set Google Meet as the default conferencing app.
  - Set the time zone to Asia/Manila; visitors still see times in their own zone.
  - Create the event "Growth Strategy Call" (30 min, Google Meet).
  - Add booking questions: Phone (optional) and "What do you need help with?"
  - Turn on email reminders.
- **Resend:** create a free account and an API key. Add a custom domain later for better deliverability.

## 2. Brand & design tokens

- Brand: **LeadBoosterX** (wordmark `Lead` + gradient `Booster` + cyan `X`, mono tagline `REVENUE SYSTEMS`), owned by **Ericson Largo**.
- Fonts (Google Fonts `<link>` in the root head, never CSS `@import`):
  - **Space Grotesk** 400–700 (display)
  - **Inter** 400–700 (body)
  - **JetBrains Mono** 400–500 (labels)
- Color balance: about 70% light neutral, 20% white surfaces, 8% dark type, 2% blue/cyan accents.

Tokens in `src/styles.css` (oklch, exposed through `@theme inline` as `--color-*`; components never use raw hex):

| Token | Light | Dark |
| --- | --- | --- |
| `--background` | #F8FAFC `oklch(0.98 0.003 247)` | `oklch(0.19 0.02 256)` |
| `--surface` / `--card` | #FFFFFF | `oklch(0.25 0.03 256)` |
| `--foreground` | #111827 `oklch(0.21 0.03 264)` | `oklch(0.98 0.003 247)` |
| `--body` | #475569 `oklch(0.45 0.02 257)` | `oklch(0.83 0.015 247)` |
| `--muted-foreground` | #64748B `oklch(0.55 0.02 257)` | `oklch(0.7 0.018 251)` |
| `--border` | #E2E8F0 `oklch(0.92 0.01 247)` | `oklch(1 0 0 / 10%)` |
| `--border-strong` | #CBD5E1 `oklch(0.85 0.015 247)` | `oklch(0.4 0.02 257)` |
| `--primary` | #2563EB `oklch(0.54 0.21 256)` | `oklch(0.62 0.19 256)` |
| `--primary-hover` | #1D4ED8 `oklch(0.48 0.21 257)` | `oklch(0.54 0.21 256)` |
| `--primary-foreground` | #FFFFFF | #FFFFFF |
| `--accent` | #06B6D4 `oklch(0.72 0.13 197)` | `oklch(0.78 0.13 200)` |
| `--accent-foreground` | #0E7490 `oklch(0.5 0.11 200)` | `oklch(0.82 0.12 200)` |
| `--soft` | #EFF6FF `oklch(0.96 0.02 250)` | `oklch(0.62 0.19 256 / 0.14)` |
| `--soft-border` | #DBEAFE `oklch(0.9 0.04 250)` | `oklch(0.62 0.19 256 / 0.3)` |
| `--soft-cyan` | #ECFEFF `oklch(0.97 0.03 200)` | `oklch(0.78 0.13 200 / 0.14)` |
| `--hover` | #F1F5F9 `oklch(0.96 0.008 247)` | `oklch(1 0 0 / 0.06)` |
| **`--destructive`** | **#DC2626 `oklch(0.58 0.22 27)`** | **`oklch(0.65 0.2 25)`** |
| `--success` | #059669 `oklch(0.6 0.13 163)` | `oklch(0.7 0.14 163)` |

Also include:

- `--ring: var(--primary)`, `--input: var(--border)`, `--radius: 0.625rem` with sm/md/lg/xl/2xl/3xl scales.
- `.animate-brand-gradient` keyframes (background-position 0%, then 100%, then 0% over 6s ease-in-out, `background-size: 200% auto`). Wrap it in `@media (prefers-reduced-motion: reduce) { animation: none }`.
- Buttons:
  - Primary: `bg-primary text-primary-foreground hover:bg-primary-hover rounded-xl`.
  - Secondary: `bg-surface border border-border hover:bg-hover`.
- Cards: 1px border, `rounded-2xl`, very soft shadow.

## 3. Root — `src/routes/__root.tsx`

- `createRootRouteWithContext<{ queryClient }>()`. The component renders `QueryClientProvider`, then `ThemeProvider`, then `SiteLayout` (sidebar + footer), then `<Outlet />`.
- Inline blocking theme script in `<head>` so there's no flash on load:
  `(function(){try{var t=localStorage.getItem('theme');var d=t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches);if(d)document.documentElement.classList.add('dark');}catch(e){}})();`
- Root meta:
  - Title "LeadBoosterX — Lead Generation, CRM & Automation by Ericson Largo".
  - Description "Lead generation, Meta Ads, GoHighLevel CRM and follow-up automation that turn inquiries into booked appointments and customers."
  - og:type website, twitter:card summary_large_image, og:image `/images/og.jpg` (1200×630, logo + headshot).
- 404 and error components styled with tokens (type the error component with `ErrorComponentProps`).

## 4. Theme — `src/components/theme-provider.tsx`

- Context `{ theme, toggle, setTheme }`.
- The initial value comes from `document.documentElement.classList` (SSR fallback `light`).
- An effect syncs the `.dark` class and `localStorage`.
- `ThemeToggle` shows Sun in dark mode and Moon in light mode, with an `aria-label`. It appears in the sidebar, the mobile bar and the `/book-a-call` header.

## 5. Brand logo — `src/components/BrandLogo.tsx`

Inline SVG growth mark: L-stem and base, 3 ascending bars, a trend line with an arrowhead, and a B-spine curve.

- Gradients: `#1D4ED8 → #2563EB → #06B6D4` for the mark, `#38BDF8 → #2563EB` for the light tones, and `#06B6D4 → #38BDF8` for the arrow.
- Wordmark plus the mono `REVENUE SYSTEMS` tagline.
- Hover: a soft `bg-primary/15` halo (opacity 0 to 1, scale 0.9 to 1.1), a drop-shadow that shifts from blue to cyan, and the mark scales to 1.04.
- Sizes sm, md and lg. Transparent background.

## 6. Layout — `src/components/SiteLayout.tsx` + `Sidebar.tsx` + `Footer.tsx`

- Desktop (lg+): fixed **18rem (`w-72`)** sidebar. Main content uses `lg:pl-72` and normal page scroll (not an inner scroll container).
- Mobile: sticky top bar with BrandLogo, ThemeToggle and a menu button. The drawer slides in from the left over a `bg-black/40` backdrop and closes on route change, on backdrop tap and on Escape. Body scroll is locked while it's open.
- Sidebar, top to bottom (compact enough to fit on a 1920×1080 screen without scrolling):
  1. BrandLogo (links to `/`) + ThemeToggle.
  2. Profile card:
     - Portrait `/images/ericson.jpg`, `aspect-[4/5]`, rounded-xl.
     - Pulsing emerald dot with "Available for projects", a `Remote` chip, and "Philippines ⇄ Global clients".
     - Quarter badge, computed: e.g. `Q4 2026 — Booking new projects`.
  3. Nav, each item a TanStack `Link`:
     - Home `/` (Home)
     - Projects `/projects` (FolderGit2)
     - Services `/services` (SlidersHorizontal)
     - About `/about` (UserRound)
     - FAQs & Contact `/contact` (HelpCircle)
     - Active: `bg-soft text-primary` with a 3px primary bar on the left and `aria-current="page"`. Home is active only on exactly `/`.
  4. CTA: full-width **Book a Strategy Call** (primary, ArrowUpRight, links to `/book-a-call`), with the subtext "Free 30-minute call. No obligation."
- Footer:
  - BrandLogo, "Ericson Largo · Lead Generation & Automation", and the line "Meta Ads · GoHighLevel · CRM · Follow-Up Automation".
  - **Book a Strategy Call** button and the nav links.
  - Bottom row: "© {current year} LeadBoosterX · Ericson Largo", an email link, and a Facebook icon link.

Every "book" CTA anywhere on the site links to `/book-a-call`.

## 7. Home — `/`

**Hero** (ambient soft blue/cyan blurred radial glows + faint dot grid):

- Pill with a cyan pulse dot: "Remote Specialist · Meta Ads · Websites · Automation".
- H1: **"Helping You Save Time, Reduce Busywork, <gradient>and Grow Your Business.</gradient>"** (Space Grotesk, up to 6xl). The gradient span uses `from-primary via-accent to-primary` with `animate-brand-gradient`.
- Sub: "Sales, marketing, and automation systems that help businesses generate qualified leads, book more appointments, and convert more customers."
- Mono chips: Lead Generation · Meta Ads · GoHighLevel CRM · AI Automation (the last one soft-cyan).
- CTAs: **Book a Strategy Call** (primary, `/book-a-call`) and **View My Work** (secondary, `/projects`).
- Credibility line with a ShieldCheck icon: "10+ years across sales, customer support, operations, and revenue-focused roles."
- **Customer Acquisition Process** diagram: 6 steps in a 2/3/6-column grid, with an animated `from-primary to-accent` beam under each card on hover and `→` connectors on desktop.
  - 01 Traffic: Meta Ads & search
  - 02 Leads: Opt-ins & forms
  - 03 Qualification: Questions & lead scoring
  - 04 Appointment: Synced calendar
  - 05 Follow-Up: SMS & email sequences
  - 06 Customer: Closed revenue

**Positioning** (pill `POSITIONING`):

- H2: "More Than Lead Generation."
- Body: "Getting leads is only one part of the problem. The real opportunity is what happens after someone raises their hand."
- Blockquote: "I combine marketing, sales, CRM, and automation to help businesses move prospects from first interaction to booked appointment — and ultimately to paying customer."
- Four pillars (numbered tag, icon, hover lift with a primary border):
  - 01 Attract (Target): Generate attention and qualified traffic.
  - 02 Capture (Magnet): Turn interest into leads and conversations.
  - 03 Convert (CheckCircle2): Qualify prospects and book appointments.
  - 04 Follow Up (RotateCcw): Automate follow-up so opportunities don't disappear.
- CTA block: "Ready to Move Beyond Just Leads?" / "Let's map out your full customer acquisition system." with a **Book a Strategy Call** button.

## 8. Projects — `/projects`

- H1 "Selected Projects." with the pill `SYSTEMS & BUILDS`.
- Intro: "A mix of live work and sample systems that show how I approach lead generation, booking, and follow-up. Live builds have client details redacted."
- Filter chips with live counts: All · Automation · Meta Ads · Funnels. The active chip is `bg-primary text-primary-foreground`. Changing the filter collapses any open workflow.

Each card has:

- a label badge
- a category (mono; blue, or cyan for automation)
- an icon tile, title and description
- a **Workflow** box: wrapping nodes with `→`, plus a "Show full workflow / Hide workflow" toggle
- **Tools** chips
- footer link "Ask about this build" to `/contact`

The cards:

1. **Payment Recovery Pipeline** · `Live Build (redacted)` · CRM / Automation · `automation`
   - Description: "A GoHighLevel system for a membership business: a failed Stripe payment opens a pipeline opportunity, alerts the team, and moves through stages — contacted, no answer, voicemail, callback, payment link sent, recovered or cancelled — as call outcomes are logged."
   - Workflow: Payment Failed → Opportunity Created → Team Alert → Outreach (Call · SMS · Email) → Call Outcome → Stage Update → Recovered / Cancelled
   - Tools: GoHighLevel, Stripe, Workflows, Pipelines, SMS/Email
   - Images (click to open in a lightbox):
     - `/projects/payment-recovery-live.png`: the real GHL screenshot collage, client and product names blacked out.
     - `/projects/payment-recovery-flow.png`: the flow diagram, labeled "sample figures".
2. **AI Receptionist + Lead Booking System** · `Concept Project` · AI Automation · `automation`
   - Workflow: Lead → AI Conversation → Qualification → Calendar → Appointment → CRM → Follow-Up
   - Tools: GoHighLevel, AI Automation, CRM, Calendar, SMS/Email
3. **Home Service Lead Generation Funnel** · `Demo Build` · Funnels / Conversion · `funnels`
   - Workflow: Ad / Traffic → Landing Page → Lead Capture → Qualification → Booking → Follow-Up
   - Tools: GoHighLevel, Landing Pages, Copywriting, CRM, Automation
4. **Meta Ads Customer Acquisition System** · `Sample System` · Paid Media · `meta-ads`
   - Workflow: Audience → Creative → Offer → Landing Page → Lead → Qualification → Appointment → Sale
   - Tools: Meta Ads, Meta Pixel, GA4, GTM, GoHighLevel
5. **Sales Pipeline & Follow-Up Automation** · `Sample System` · CRM / Sales Automation · `automation`
   - Workflow: New Lead → Contacted → Qualified → Appointment Booked → Proposal → Won
   - Tools: GoHighLevel, CRM, SMS, Email, AI Automation

Section CTA: "Want a system like this for your business?" with a **Book a Strategy Call** button.

## 9. Services — `/services`

H1 "What I Can Help You Build." Six cards, each with a number tag, icon, short badge, description and a "What's included" list of 3 items (green checks):

1. **Lead Generation** (Target) · badge *Inbound & outbound*
   - Description: "Campaigns and offers that bring in people who actually fit your business — not just clicks."
   - Includes: offer and audience planning · lead magnets and opt-ins · lead source tracking.
2. **Meta Ads** (Megaphone) · badge *Targeting & creative*
   - Description: "Facebook and Instagram campaigns built around a clear offer, tested creative, and proper tracking."
   - Includes: campaign setup and structure · Pixel / Conversions API and events · creative testing and weekly optimization.
3. **AI Automation** (Bot) · badge *24/7 response*
   - Description: "AI chat and voice receptionists that answer inquiries, ask qualifying questions, and book calls — even after hours."
   - Includes: AI chat for website and social DMs · AI voice receptionist · handoff to your team with notes.
4. **GoHighLevel CRM** (Workflow) · badge *Pipeline engine*
   - Description: "A CRM set up the way your sales process actually works, so every lead has a stage, an owner, and a next step."
   - Includes: pipelines, stages, and custom fields · calendars and booking · workflows, tags, and internal alerts.
5. **Funnels & Landing Pages** (LayoutTemplate) · badge *Built to convert*
   - Description: "Focused pages that explain your offer clearly and make the next step obvious."
   - Includes: landing pages and opt-in funnels · booking and thank-you pages · forms connected to the CRM.
6. **Sales Process & Follow-Up** (Handshake) · badge *From inquiry to close*
   - Description: "Follow-up that happens on time, every time — so warm leads don't go cold while you're busy."
   - Includes: SMS and email follow-up sequences · no-show and reminder automations · failed-payment and win-back follow-up.

**Built Around Business Outcomes:** four outcome cards in one row with `+` between them: More Qualified Leads + More Booked Appointments + Faster Follow-Up + Less Manual Work. Then `=` and a gradient result card: **"More Sales Opportunities & Closed Revenue."** On mobile they stack, with the `+` signs rotated into a vertical flow.

Section CTA with a **Book a Strategy Call** button.

## 10. About — `/about`

**Left column:**

- Portrait (`aspect-[4/5]`, bottom gradient scrim, name card "Ericson Largo · Founder, LeadBoosterX").
- Core Philosophy callout: "I don't believe businesses need more complicated marketing. **They need better systems.**"

**Right column:**

- Pill `BACKGROUND & APPROACH`.
- H2 **"Get Seen. <gradient animated>Get Leads.</gradient> Get Customers."**
- Bio paragraphs:
  1. "I'm Ericson Largo, founder of LeadBoosterX. I've spent more than ten years in sales, customer support, operations, and revenue roles — including five years supporting and selling QuickBooks for Intuit, where I went from customer support to appointment setting to closing deals with business owners and accountants."
  2. "That's where I learned that most businesses don't lose customers because of bad marketing. They lose them in the gaps — the inquiry nobody answered, the follow-up that never happened, the payment that failed and was never chased."
  3. "Today I build the systems that close those gaps: ads that bring in the right people, a CRM that keeps every lead moving, and automation that follows up while you focus on the work. I also handle revenue recovery and financial operations, so I understand what happens after the sale too."
- "The goal is simple" mono callout: "Get more of the right people in, respond faster, follow up every time, and turn more conversations into customers."
- **What I Bring** (11 items, 2-column grid, check icons):
  1. 10+ years in sales, support & revenue roles
  2. Sales and high-ticket closing
  3. Lead generation strategy
  4. Appointment setting
  5. Meta Ads (Facebook & Instagram)
  6. GoHighLevel CRM, funnels & calendars
  7. Pipeline design & CRM setup
  8. AI chat & voice automation
  9. Sales process & follow-up optimization
  10. Revenue recovery (failed payments & chargebacks)
  11. Remote collaboration across time zones

**Career Path** (6 cards, horizontal on desktop, stacked on mobile; no invented dates):

1. **Customer Support** — QuickBooks technical support and customer care for US businesses.
2. **Appointment Setting** — Discovery calls, qualification, and booked consultations.
3. **Sales** — Closing QuickBooks deals with business owners and accountants. Recognized as QBOA King (2023–2024).
4. **Revenue Operations** — Failed-payment recovery, chargebacks, and cancellation alerts for a membership business.
5. **Marketing & Automation** — Founded LeadBoosterX: GoHighLevel CRMs, funnels, Meta Ads, and AI receptionists.
6. **Remote, Global** — Based in the Philippines, working with clients worldwide.

Section CTA: "Ready to Upgrade Your Revenue Systems?" / "Let's build a practical pipeline that converts." with a **Book a Strategy Call** button.

## 11. FAQs & Contact — `/contact`

**FAQ** (accessible accordion using `<details>`/`<summary>` or a button with `aria-expanded`; the first item is open):

1. **What kinds of businesses do you work with?**
   "Mostly appointment-based and service businesses — coaches, consultants, clinics, med spas, home services, real estate, and online programs. If you sell through calls, consultations, or bookings, the systems I build fit well."
2. **What services do you offer?**
   "Lead generation, Meta Ads, GoHighLevel CRM setup, funnels and landing pages, AI chat and voice receptionists, and follow-up automation. Most clients use a few of these together as one system."
3. **Do you only generate leads?**
   "No. Leads are only the start. I focus just as much on what happens next — fast response, qualification, booking, reminders, and follow-up — because that's where most revenue is won or lost."
4. **Can you set up an AI receptionist for my business?**
   "Yes. I set up AI chat and voice assistants that answer common questions, ask qualifying questions, and book calls into your calendar, with a handoff to your team when a person needs to step in."
5. **Do you work with clients outside the Philippines?**
   "Yes. I'm based in the Philippines and work remotely with clients in the US and elsewhere. I adjust my hours to overlap with your business day."
6. **Do you take one-off projects?**
   "Yes. I take one-time builds — like a funnel, a CRM setup, or a follow-up automation — as well as ongoing monthly support for ads and system management."
7. **How do we get started?**
   "Book a free strategy call. We'll look at how leads come in today, where they're slipping through, and what to build first. You'll leave with a clear next step, whether or not we work together."

**Contact block** (`rounded-3xl`, ambient blue/cyan blurs, 2 columns on lg):

- **Left:**
  - H2 "Have Leads But Not Enough Customers?"
  - Text: "Tell me about your business and where things are getting stuck. I'll reply with ideas and a suggested next step."
  - Card "Prefer to talk it through?" with a **Book a Strategy Call** button (`/book-a-call`).
  - Email row: Mail icon, `mailto:ericsonlargo92@gmail.com`.
  - Facebook row: Facebook icon linking to the Facebook URL (opens in a new tab, `rel="noopener noreferrer"`).
- **Right:** a **Discovery form** built into the site (`rounded-2xl border bg-surface p-6 md:p-8`).
  - Fields:
    - First name and Last name (required, 2 columns)
    - Email (required)
    - Phone (optional)
    - Business name (optional)
    - Website or Facebook page (optional)
    - "What do you need help with?" toggle chips (Lead Generation · Meta Ads · AI Automation · GoHighLevel CRM · Funnels / Landing Pages · Appointment Setting · Sales Process & Follow-Up · Not sure yet)
    - "Monthly ad budget" select (Not running ads yet · Under $1,000 · $1,000–$5,000 · $5,000+)
    - "Tell me about your business and where leads get stuck" textarea (required)
  - Spam protection: a hidden honeypot field (`company_website`, off-screen, `tabIndex={-1}`, `autoComplete="off"`). If it's filled, the server silently returns success without sending.
  - Submit **Send Message** (primary, Send icon) → TanStack Start server function `submitContact` (`createServerFn({ method: "POST" })`, in `src/lib/contact.server.ts`):
    - Validates the input with `zod`.
    - Sends an email with `resend.emails.send({ from: CONTACT_FROM_EMAIL, to: CONTACT_TO_EMAIL, replyTo: <visitor email>, subject: "New inquiry — <name> (<business>)", text + simple HTML listing every field })`.
    - Returns `{ ok: true }`, or `{ ok: false, error }`. The API key is only ever read on the server.
  - UI states:
    - While sending: the button shows a spinner and is disabled.
    - Success: a check icon, "Message sent", "Thanks — I'll reply within one business day.", and a "Send another message" link.
    - Error: a red (`--destructive`) message, "Something went wrong. Email me directly at ericsonlargo92@gmail.com." The entered values stay in the form.

**Final CTA band:** "Better Marketing Gets Attention. / Better Sales Creates Revenue. / **Better Systems Connect the Two.**" with a **Book a Strategy Call** button.

## 12. Book a call — `/book-a-call`

- Its own page: a sticky header with BrandLogo, a "← Back to site" link and ThemeToggle.
- H1 **"Book a Growth Strategy Call"**.
- Sub: "A free 30-minute call to look at how leads come in today, where they're slipping through, and what to fix first. Pick a time that works for you below."
- Two columns on lg (5 / 7):
  - **Left:**
    - "What we'll cover" list: your current lead sources · how inquiries are handled today · where follow-up breaks down · the first system worth building.
    - "Good to know" list: free, no obligation · times shown in your time zone · Google Meet link and email reminders after booking.
    - A small headshot card.
  - **Right:** the **Cal.com inline embed** (`@calcom/embed-react`):
    - `<Cal calLink={BOOKING.calLink} style={{ width: "100%", height: "100%", overflow: "scroll" }} config={{ layout: "month_view", theme }} />`, where `theme` follows the site's light/dark theme.
    - On mount, call `getCalApi()` and set `ui({ styles: { branding: { brandColor: "#2563EB" } }, hideEventTypeDetails: false, layout: "month_view" })`.
    - Render it client-side only: wrap it in a component that mounts after hydration, since the embed touches `window`.
    - Cal.com handles the time zone, available slots, the booking form, the confirmation, the Google Meet link and email reminders.
    - Loading skeleton, plus a fallback link "Calendar not loading? Open it in a new tab" pointing at `bookingUrl`.
- Meta title: "Book a Strategy Call — LeadBoosterX".

## 13. SEO

- Each route has its own `head()`: unique title and description, og:title, og:description, og:type website, twitter:card summary_large_image, og:image `/images/og.jpg`.
- Add `public/robots.txt` and a static `sitemap.xml` listing the 6 routes.

## 14. Assets — `public/`

- `images/ericson.jpg`: headshot, the same suit photo used on the bookkeeping site. Saved locally, never hotlinked.
- `images/og.jpg`: 1200×630 social preview (logo + headshot + "Lead Generation · CRM · Automation").
- `projects/payment-recovery-live.png` and `projects/payment-recovery-flow.png`: from the Upwork portfolio (images 09 and 01).
- `favicon.svg`: the LB growth mark.

## 15. Accessibility & quality rules

- Every interactive element is a real `button` or `Link`, has a visible focus ring (`ring-primary`), and icon-only buttons have an `aria-label`.
- Color contrast is at least 4.5:1 for text. Cyan (#06B6D4) is never used for small text on white; use `--accent-foreground` (#0E7490) for that.
- `prefers-reduced-motion` disables the gradient animation, pulse dots and beam animations.
- No horizontal scroll at 360px width. Iframes are full-width and auto-height.
- No invented clients, results, testimonials or metrics.

## 16. Done checklist

- [ ] `npm run build` and `npx tsc --noEmit` pass. All 6 routes return 200; unknown routes show the 404 page; no console errors.
- [ ] Nav links change the URL; back/forward work; each page has its own title.
- [ ] The theme toggle persists across reloads with no flash.
- [ ] Every "Book a Strategy Call" button goes to `/book-a-call`. The Cal.com embed loads, follows the light/dark theme, and a test booking shows up on the **ericsonlargo92@gmail.com** Google Calendar with a Meet link; confirmation emails reach both the visitor and ericsonlargo92@gmail.com.
- [ ] The discovery form validates required fields; a test submission arrives at ericsonlargo92@gmail.com with reply-to set to the visitor; the honeypot blocks bots; the error state shows if `RESEND_API_KEY` is missing.
- [ ] No GHL IDs, domains, scripts or iframes anywhere (search the codebase for `leadconnector`, `aiforbusiness`, `nk9Ipun` and `filesafe` and get zero results).
- [ ] The mobile drawer works and nothing overflows at 360px.
- [ ] Pushed to GitHub, imported into Vercel, and the 3 environment variables set.
