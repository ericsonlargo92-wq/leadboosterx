import { Fragment } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import {
  ArrowDown,
  ArrowRight,
  BadgeCheck,
  CalendarCheck,
  Check,
  ChevronDown,
  Clock,
  ExternalLink,
  ShieldCheck,
  Sparkles,
  Timer,
  Users,
  Zap,
} from "lucide-react";
import { LazyExplainer } from "~/components/LazyExplainer";
import { Reveal, STAGGER } from "~/components/motion";
import { BookCallButton, Container, CtaBlock, Pill } from "~/components/ui";
import { PROFILES } from "~/lib/config";
import { HIRE_FAQS, REASONS, SERVICES_PATH, SKILLS, WORK_TYPES } from "~/lib/hire";
import { CREDENTIAL, GUARANTEE, PACKAGES, PRICING_NOTE } from "~/lib/offer";
import { faqJsonLd, webPageJsonLd } from "~/lib/schema";
import { hireServicesJsonLd, packagesJsonLd } from "~/lib/schema-pages";
import { seo } from "~/lib/seo";
import { btnSecondary, card, cx, focusRing } from "~/lib/ui";

const TITLE = "GoHighLevel Services: Packages, Freelancer & VA | LeadBoosterX";
const DESCRIPTION =
  "GoHighLevel build packages or hire Ericson Largo, a HighLevel Certified Admin, as your GoHighLevel freelancer or VA: part-time, dedicated or project-based.";

/** Packages and the Hire Me page in one place. /packages and /hire-gohighlevel-freelancer redirect here. */
export const Route = createFileRoute("/_site/services")({
  head: () =>
    seo({
      title: TITLE,
      description: DESCRIPTION,
      path: SERVICES_PATH,
      crumb: "Services",
      jsonLd: [
        webPageJsonLd("WebPage", SERVICES_PATH, "GoHighLevel Services: Packages, Freelancer & Virtual Assistant", DESCRIPTION),
        packagesJsonLd(),
        hireServicesJsonLd(),
        faqJsonLd(HIRE_FAQS),
      ],
    }),
  component: ServicesPage,
});

const OUTCOMES = [
  { label: "More Qualified Leads", icon: Users },
  { label: "More Booked Appointments", icon: CalendarCheck },
  { label: "Faster Follow-Up", icon: Timer },
  { label: "Less Manual Work", icon: Zap },
];

const jump = cx(
  "inline-flex items-center gap-2 rounded-xl border border-border bg-surface px-4 py-2.5 text-sm font-semibold text-foreground shadow-sm hover:bg-hover",
  focusRing,
);

function ServicesPage() {
  const profiles = PROFILES.filter((p) => p.url);
  return (
    <Container className="py-12 sm:py-16">
      <Pill>Services</Pill>
      <h1 className="mt-5 max-w-4xl text-4xl font-bold sm:text-5xl">GoHighLevel Services: Build Packages or Hire Me as Your VA.</h1>
      <p className="mt-4 max-w-2xl text-lg">
        I'm Ericson Largo, a {CREDENTIAL} based in the Philippines. Pick a done-for-you build package, or hire me as your GoHighLevel
        freelancer or virtual assistant (VA) to build, fix and run your account — remotely, with hours that overlap your business day.
        No long-term contract either way.
      </p>
      <nav aria-label="On this page" className="mt-6 flex flex-wrap gap-3">
        <a href="#packages" className={jump}>
          Build packages
          <ArrowDown className="size-4 text-muted-foreground" aria-hidden="true" />
        </a>
        <a href="#hire" className={jump}>
          Hire me (VA or freelancer)
          <ArrowDown className="size-4 text-muted-foreground" aria-hidden="true" />
        </a>
      </nav>
      <p className="mt-5 inline-flex items-center gap-1.5 rounded-md border border-success/30 bg-success/10 px-2 py-0.5 text-xs font-semibold text-success">
        <BadgeCheck className="size-4" aria-hidden="true" />
        {CREDENTIAL} ·{" "}
        <Link to="/certification" className={cx("rounded underline hover:no-underline", focusRing)}>
          verify the credential
        </Link>
      </p>

      {/* Packages */}
      <section id="packages" className="mt-14 scroll-mt-20" aria-labelledby="packages-title">
        <h2 id="packages-title" className="text-3xl font-bold sm:text-4xl">
          Build Packages: Pick Where You Want to Start
        </h2>
        <p className="mt-3 max-w-2xl">Every package is built in your own GoHighLevel account and tested end to end before launch.</p>
        <ul className="mt-8 grid gap-5 lg:grid-cols-3">
          {PACKAGES.map((p, i) => (
            <Reveal
              as="li"
              delay={i * STAGGER}
              key={p.name}
              className={cx(
                card,
                "relative flex flex-col p-6",
                p.recommended && "!border-primary outline-2 outline-solid -outline-offset-1 outline-primary lg:-my-2 lg:py-8",
              )}
            >
              {p.recommended && (
                <span className="absolute -top-3 left-6 inline-flex items-center gap-1 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                  <Sparkles className="size-3.5" aria-hidden="true" />
                  Recommended
                </span>
              )}
              <span className="font-mono text-xs text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-2 text-2xl font-bold">{p.name}</h3>
              <p className="mt-2 font-medium text-foreground">{p.tagline}</p>
              <p className="mt-2 text-sm">{p.who}</p>
              {p.timing && (
                <p className="mt-4 inline-flex w-fit items-center gap-1.5 rounded-full border border-soft-border bg-soft px-2.5 py-1 text-xs font-semibold text-primary">
                  <Clock className="size-3.5" aria-hidden="true" />
                  {p.timing}
                </p>
              )}
              <p className="mt-6 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-muted-foreground">What's included</p>
              <ul className="mt-3 space-y-2">
                {p.includes.map((inc) => (
                  <li key={inc} className="flex items-start gap-2 text-sm text-foreground">
                    <Check className="mt-0.5 size-4 shrink-0 text-success" aria-hidden="true" />
                    {inc}
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-6">
                <p className="mb-3 text-xs text-muted-foreground">{PRICING_NOTE}</p>
                <BookCallButton className="w-full" />
              </div>
            </Reveal>
          ))}
        </ul>

        <div className="mt-10 flex flex-col gap-4 rounded-2xl border border-success/30 bg-success/8 p-6 sm:flex-row sm:items-start">
          <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl bg-success/15 text-success">
            <ShieldCheck className="size-6" aria-hidden="true" />
          </span>
          <div>
            <p className="font-display text-lg font-bold text-foreground">{GUARANTEE.headline}</p>
            <p className="mt-1">{GUARANTEE.contract}</p>
            <p className="mt-2 text-xs text-muted-foreground">{GUARANTEE.fineprint}</p>
          </div>
        </div>
      </section>

      {/* Hire me */}
      <section id="hire" className="mt-20 scroll-mt-20" aria-labelledby="hire-title">
        <h2 id="hire-title" className="text-3xl font-bold sm:text-4xl">
          Hire a GoHighLevel Freelancer &amp; Virtual Assistant
        </h2>
        <p className="mt-3 max-w-2xl">
          Prefer ongoing help or a one-off project? Businesses and agencies hire me as their GoHighLevel VA or freelancer.
        </p>
        <ul className="mt-8 grid gap-5 lg:grid-cols-3">
          {WORK_TYPES.map((w, i) => (
            <Reveal as="li" delay={i * STAGGER} key={w.name} className={cx(card, "flex flex-col p-6")}>
              <span className="font-mono text-xs text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-2 text-xl font-bold">{w.name}</h3>
              <p className="mt-2 font-medium text-foreground">{w.tagline}</p>
              <p className="mt-2 text-sm">{w.who}</p>
              <ul className="mt-5 space-y-2">
                {w.items.map((it) => (
                  <li key={it} className="flex items-start gap-2 text-sm text-foreground">
                    <Check className="mt-0.5 size-4 shrink-0 text-success" aria-hidden="true" />
                    {it}
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-6">
                <p className="mb-3 text-xs text-muted-foreground">{PRICING_NOTE}</p>
                <BookCallButton className="w-full" />
              </div>
            </Reveal>
          ))}
        </ul>
        <div className="mt-6">
          <Link to="/projects" className={cx(btnSecondary, focusRing)}>
            See my GoHighLevel projects
          </Link>
        </div>
      </section>

      {/* Explainer */}
      <section id="explainer" className="mt-20 scroll-mt-20" aria-labelledby="explainer-title">
        <Reveal>
          <Pill>In one minute</Pill>
          <h2 id="explainer-title" className="mt-5 text-3xl font-bold sm:text-4xl">
            How It Works, Start to Finish
          </h2>
          <p className="mt-3 max-w-2xl">Where GoHighLevel setups leak, the system that fixes it, and how it gets built.</p>
        </Reveal>
        <Reveal delay={0.1} className="mt-8">
          <LazyExplainer />
        </Reveal>
      </section>

      {/* Outcomes */}
      <section className="mt-20" aria-labelledby="outcomes-title">
        <h2 id="outcomes-title" className="text-3xl font-bold sm:text-4xl">
          Built Around Business Outcomes
        </h2>
        <div className="mt-8 flex flex-col items-stretch gap-3 xl:flex-row">
          {OUTCOMES.map((o, i) => (
            <Fragment key={o.label}>
              <div className={cx(card, "flex flex-1 items-center gap-3 p-4 xl:flex-col xl:items-start")}>
                <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-lg bg-soft-cyan text-accent-foreground">
                  <o.icon className="size-4" aria-hidden="true" />
                </span>
                <span className="font-display font-semibold text-foreground">{o.label}</span>
              </div>
              {i < OUTCOMES.length - 1 && (
                <span aria-hidden="true" className="self-center font-display text-2xl font-bold text-muted-foreground">
                  +
                </span>
              )}
            </Fragment>
          ))}
          <span aria-hidden="true" className="self-center font-display text-2xl font-bold text-muted-foreground">
            =
          </span>
          <div className="flex-[1.4] rounded-2xl bg-gradient-to-br from-primary to-primary-hover p-5 text-primary-foreground shadow-lg shadow-primary/25">
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.14em] opacity-80">Result</p>
            <p className="mt-1 font-display text-lg font-bold">More Sales Opportunities &amp; Closed Revenue.</p>
          </div>
        </div>
      </section>

      {/* Skills */}
      <h2 className="mt-20 text-3xl font-bold sm:text-4xl">What I Do in GoHighLevel</h2>
      <ul className="mt-6 flex flex-wrap gap-2">
        {SKILLS.map((s) => (
          <li key={s} className="rounded-lg border border-soft-border bg-soft px-3 py-1.5 text-sm font-medium text-primary">
            {s}
          </li>
        ))}
      </ul>

      {/* Why hire me */}
      <h2 className="mt-16 text-3xl font-bold sm:text-4xl">Why Work With Me</h2>
      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {REASONS.map((r, i) => (
          <Reveal as="li" delay={i * STAGGER} key={r.title} className={cx(card, "p-5")}>
            <h3 className="flex items-start gap-2 text-base font-semibold">
              <Check className="mt-0.5 size-5 shrink-0 text-success" aria-hidden="true" />
              {r.link ? (
                <Link to={r.link} className={cx("rounded hover:text-primary hover:underline", focusRing)}>
                  {r.title}
                </Link>
              ) : (
                r.title
              )}
            </h3>
            <p className="mt-1.5 pl-7 text-sm">{r.text}</p>
          </Reveal>
        ))}
      </ul>

      {/* Profiles */}
      {profiles.length > 0 && (
        <>
          <h2 className="mt-16 text-3xl font-bold sm:text-4xl">Also Find Me On</h2>
          <p className="mt-3 max-w-2xl">Prefer to hire through a freelance platform? I'm on these too.</p>
          <ul className="mt-6 flex flex-wrap gap-3">
            {profiles.map((p) => (
              <li key={p.name}>
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer me"
                  className={cx("inline-flex items-center gap-2 rounded-xl border border-border bg-surface px-4 py-2.5 text-sm font-semibold text-foreground shadow-sm hover:bg-hover", focusRing)}
                >
                  {p.name}
                  <ExternalLink className="size-4 text-muted-foreground" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </>
      )}

      {/* FAQ */}
      <div className="mx-auto mt-16 max-w-3xl">
        <h2 className="text-3xl font-bold sm:text-4xl">Services Questions, Answered</h2>
        <div className="mt-8 divide-y divide-border overflow-hidden rounded-2xl border border-border bg-surface">
          {HIRE_FAQS.map((f, i) => (
            <details key={f.q} open={i === 0} className="group">
              <summary
                className={cx(
                  "flex cursor-pointer items-center justify-between gap-4 px-5 py-4 font-display font-semibold text-foreground hover:bg-hover sm:px-6",
                  focusRing,
                  "focus-visible:ring-inset focus-visible:ring-offset-0",
                )}
              >
                <h3 className="text-base font-semibold">{f.q}</h3>
                <ChevronDown className="size-5 shrink-0 text-muted-foreground transition-transform group-open:rotate-180" aria-hidden="true" />
              </summary>
              <p className="px-5 pb-5 text-sm leading-relaxed sm:px-6">{f.a}</p>
            </details>
          ))}
        </div>
        <Link to="/contact" className={cx("mt-5 inline-flex items-center gap-1.5 rounded text-sm font-semibold text-primary hover:underline", focusRing)}>
          More questions and answers
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </div>

      <div className="mt-16">
        <CtaBlock
          title="Not sure which option fits?"
          text="Book a free 30-minute call. We'll look at your GoHighLevel setup and agree on the smallest build, or the right way to work together, to fix the biggest leak."
        />
      </div>
    </Container>
  );
}
