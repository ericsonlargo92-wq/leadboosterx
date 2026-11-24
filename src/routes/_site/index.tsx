import { Link, createFileRoute } from "@tanstack/react-router";
import {
  ArrowDown,
  ArrowRight,
  ArrowRightLeft,
  BellRing,
  ChevronDown,
  Building2,
  Check,
  ClipboardList,
  Inbox,
  MessageSquareOff,
  PlayCircle,
  Rocket,
  ShieldCheck,
  TrendingUp,
  UserX,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { LazyExplainer } from "~/components/LazyExplainer";
import { Reveal, STAGGER } from "~/components/motion";
import { AmbientGlow, BookCallButton, Container, Pill } from "~/components/ui";
import { CREDENTIAL, CTA_MICROCOPY, GUARANTEE, RESULTS, STAGES, TRUST } from "~/lib/offer";
import { FAQS, HOME_FAQ_QUESTIONS } from "~/lib/faqs";
import { seo } from "~/lib/seo";
import { STAGE_ICONS } from "~/lib/stage-icons";
import { btnSecondary, card, cx, focusRing, gradientText } from "~/lib/ui";

export const Route = createFileRoute("/_site/")({
  head: () =>
    seo({
      title: "LeadBoosterX — GoHighLevel Systems That Capture, Nurture and Close",
      description:
        "HighLevel Certified Admin who sets up, fixes and runs GoHighLevel: funnels, follow-up automation, calendars and payments. No long-term contract.",
      path: "/",
    }),
  component: HomePage,
});


const HOME_FAQS = HOME_FAQ_QUESTIONS.map((q) => FAQS.find((f) => f.q === q)!);

const LEAKS: { stage: string; title: string; text: string; icon: LucideIcon }[] = [
  {
    stage: "Capture",
    title: "Leads scattered everywhere",
    text: "Leads come in from forms, calls, messages and ads — and land in different inboxes. Some are never seen.",
    icon: Inbox,
  },
  {
    stage: "Nurture",
    title: "Follow-up that never happens",
    text: "Most leads don't book on the first message. Without automatic follow-up, warm leads go cold.",
    icon: MessageSquareOff,
  },
  {
    stage: "Close",
    title: "Booked, then forgotten",
    text: "They booked, then forgot. No reminder, no follow-up, no payment link — no sale.",
    icon: UserX,
  },
];

const PATHS: { id: string; audience: string; icon: LucideIcon; text: string }[] = [
  {
    id: "switching",
    audience: "Switching to GoHighLevel",
    icon: ArrowRightLeft,
    text: "Move your contacts, pipelines and calendars over, and start from a clean, documented build.",
  },
  {
    id: "on-ghl",
    audience: "Already on GoHighLevel",
    icon: Wrench,
    text: "Audit and fix it: tidy pipelines, repair workflows, and connect your forms, calendars and phone.",
  },
  {
    id: "agencies",
    audience: "Agencies & consultants",
    icon: Building2,
    text: "A certified builder for your client accounts: workflows, funnels, pipelines and snapshots.",
  },
];

const STEPS: { days: string; title: string; text: string; icon: LucideIcon }[] = [
  {
    days: "Step 1",
    title: "Audit & plan",
    text: "We map how leads come in, how they're followed up and how deals close today — and what to build first.",
    icon: ClipboardList,
  },
  {
    days: "Step 2",
    title: "Build",
    text: "Capture, Nurture and Close set up in your own GoHighLevel account.",
    icon: Wrench,
  },
  {
    days: "Step 3",
    title: "Test & go live",
    text: "Every form, workflow, calendar and reminder is tested end to end, then switched on.",
    icon: Rocket,
  },
  {
    days: "After launch",
    title: "Manage (optional)",
    text: "Monthly management keeps it running, with a plain-English report.",
    icon: TrendingUp,
  },
];

function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="theme-dark relative isolate overflow-hidden bg-background">
        <AmbientGlow grid horizon />
        <Container className="pb-14 pt-12 sm:pt-20 lg:pb-20">
          <div>
          <Pill dot>GoHighLevel Specialist · {CREDENTIAL}</Pill>
          <h1 className="mt-6 max-w-4xl text-4xl font-bold leading-[1.05] sm:text-5xl lg:text-6xl">
            GoHighLevel Systems That <span className={gradientText}>Capture, Nurture and Close.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg">
            I set up, fix and run GoHighLevel so every lead is captured, followed up automatically, and moved to a booked
            call or a closed sale.{" "}
            <strong className="font-semibold text-foreground">No long-term contract.</strong>
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <BookCallButton />
            <Link to="/" hash="how-it-works" className={btnSecondary}>
              See How It Works
              <ArrowDown className="size-4" aria-hidden="true" />
            </Link>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">{CTA_MICROCOPY}</p>
          <Link
            to="/"
            hash="explainer"
            className={cx("mt-5 inline-flex items-center gap-2 rounded-full text-sm font-semibold text-accent-foreground hover:text-foreground", focusRing)}
          >
            <PlayCircle className="size-5" aria-hidden="true" />
            Watch the 1-minute explainer
          </Link>
          </div>

          <ul className="mt-10 grid gap-3 border-t border-border pt-6 sm:grid-cols-3" aria-label="Background">
            {TRUST.map((t, i) => (
              <Reveal as="li" delay={0.2 + i * STAGGER} key={t} className="flex items-start gap-2 text-sm text-foreground">
                <ShieldCheck className="mt-0.5 size-4 shrink-0 text-success" aria-hidden="true" />
                {t}
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      {/* Explainer */}
      <section id="explainer" className="scroll-mt-20" aria-labelledby="explainer-title">
        <Container className="py-16 lg:py-20">
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
        </Container>
      </section>

      {/* The system */}
      <section id="system" className="scroll-mt-20 border-t border-border" aria-labelledby="system-title">
        <Container className="py-16 lg:py-20">
          <Pill>The system</Pill>
          <h2 id="system-title" className="mt-5 text-3xl font-bold sm:text-4xl">
            One System: <span className={gradientText}>Capture → Nurture → Close</span>
          </h2>
          <p className="mt-4 max-w-2xl text-lg">Three stages, built and connected inside GoHighLevel. Each one hands the lead to the next.</p>
          <ol className="mt-8 grid gap-4 lg:grid-cols-3">
            {STAGES.map((st, i) => {
              const Icon = STAGE_ICONS[st.id];
              return (
                <Reveal as="li" delay={i * STAGGER} key={st.id} className="relative flex">
                  <article id={st.id} className={cx(card, "flex flex-1 flex-col p-6 sm:p-7")}>
                    <div className="flex items-center justify-between">
                      <span className="inline-flex size-11 items-center justify-center rounded-xl bg-soft text-primary">
                        <Icon className="size-5" aria-hidden="true" />
                      </span>
                      <span className="font-mono text-xs text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
                    </div>
                    <h3 className="mt-5 text-2xl font-bold">{st.name}</h3>
                    <p className="mt-1 font-medium text-foreground">{st.promise}</p>
                    <p className="mt-5 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-muted-foreground">What I build in GoHighLevel</p>
                    <ul className="mt-3 space-y-2">
                      {st.builds.map((b) => (
                        <li key={b} className="flex items-start gap-2 text-sm text-foreground">
                          <Check className="mt-0.5 size-4 shrink-0 text-success" aria-hidden="true" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </article>
                  {i < STAGES.length - 1 && (
                    <span
                      aria-hidden="true"
                      className="absolute -right-[0.95rem] top-1/2 z-10 hidden size-7 -translate-y-1/2 items-center justify-center rounded-full border border-soft-border bg-background text-primary lg:inline-flex"
                    >
                      <ArrowRight className="size-3.5" />
                    </span>
                  )}
                </Reveal>
              );
            })}
          </ol>
        </Container>
      </section>

      {/* Problem */}
      <section className="border-t border-border bg-surface/60" aria-labelledby="leaks-title">
        <Container className="py-16 lg:py-20">
          <Pill>The real problem</Pill>
          <h2 id="leaks-title" className="mt-5 text-3xl font-bold sm:text-4xl">
            Get More Booked Calls{" "}— <span className={gradientText}>Not Just More Leads.</span>
          </h2>
          <p className="mt-4 max-w-2xl text-lg">Most leads aren't lost to bad marketing. They leak at one of three stages:</p>
          <ol className="mt-8 grid gap-4 md:grid-cols-3">
            {LEAKS.map((l, i) => (
              <Reveal as="li" delay={i * STAGGER} key={l.title} className={cx(card, "p-6")}>
                <div className="flex items-center justify-between">
                  <span className="inline-flex size-10 items-center justify-center rounded-xl bg-destructive/10 text-destructive">
                    <l.icon className="size-5" aria-hidden="true" />
                  </span>
                  <span className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">{l.stage}</span>
                </div>
                <h3 className="mt-4 text-lg font-semibold">{l.title}</h3>
                <p className="mt-2 text-sm leading-relaxed">{l.text}</p>
              </Reveal>
            ))}
          </ol>
          <blockquote className="mt-10 max-w-3xl border-l-[3px] border-primary pl-5 font-display text-xl font-semibold text-foreground sm:text-2xl">
            Getting leads is only half the job. The system behind them decides whether you get paid.
          </blockquote>
        </Container>
      </section>

      {/* Who it is for */}
      <section aria-labelledby="paths-title">
        <Container className="py-16 lg:py-20">
          <Pill>Who it's for</Pill>
          <h2 id="paths-title" className="mt-5 text-3xl font-bold sm:text-4xl">
            Wherever You Are With GoHighLevel
          </h2>
          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {PATHS.map((p, i) => (
              <Reveal key={p.id} delay={i * STAGGER} className="flex">
              <article id={p.id} className={cx(card, "flex flex-1 flex-col p-6 sm:p-8")}>
                <div className="flex items-center gap-3">
                  <span className="inline-flex size-11 items-center justify-center rounded-xl bg-soft text-primary">
                    <p.icon className="size-5" aria-hidden="true" />
                  </span>
                  <h3 className="font-display text-lg font-bold text-foreground">{p.audience}</h3>
                </div>
                <p className="mt-5 text-base leading-relaxed text-foreground">{p.text}</p>
                <div className="mt-auto pt-6">
                  <Link
                    to="/book-a-call"
                    className={cx("inline-flex items-center gap-1.5 rounded text-sm font-semibold text-primary hover:underline", focusRing)}
                  >
                    Map out my system
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </Link>
                </div>
              </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Results: hidden until a client approves sharing numbers */}
      {RESULTS.length > 0 && (
        <section className="border-t border-border bg-surface/60" aria-labelledby="results-title">
          <Container className="py-16 lg:py-20">
            <Pill>Results</Pill>
            <h2 id="results-title" className="mt-5 text-3xl font-bold sm:text-4xl">
              Real Numbers From Real Builds
            </h2>
            <ul className="mt-8 grid gap-4 sm:grid-cols-3">
              {RESULTS.map((r) => (
                <li key={r.label} className={cx(card, "p-6")}>
                  <p className="font-display text-4xl font-bold text-primary">{r.value}</p>
                  <p className="mt-2 font-semibold text-foreground">{r.label}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{r.context}</p>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}

      {/* How it works */}
      <section id="how-it-works" className="scroll-mt-20 border-t border-border bg-surface/60" aria-labelledby="how-title">
        <Container className="py-16 lg:py-20">
          <Pill>How it works</Pill>
          <h2 id="how-title" className="mt-5 text-3xl font-bold sm:text-4xl">
            From Audit to Launch
          </h2>
          <ol className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {STEPS.map((s, i) => (
              <Reveal as="li" delay={i * STAGGER} key={s.title} className={cx(card, "group relative overflow-hidden p-6")}>
                <span className="inline-flex size-10 items-center justify-center rounded-xl bg-soft text-primary">
                  <s.icon className="size-5" aria-hidden="true" />
                </span>
                <p className="mt-4 font-mono text-xs uppercase tracking-[0.14em] text-accent-foreground">{s.days}</p>
                <h3 className="mt-1 text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed">{s.text}</p>
                <span
                  aria-hidden="true"
                  className="motion-beam absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-primary to-accent transition-transform duration-500 group-hover:scale-x-100"
                />
              </Reveal>
            ))}
          </ol>

          <div className="mt-8 flex flex-col gap-4 rounded-2xl border border-success/30 bg-success/8 p-6 sm:flex-row sm:items-start">
            <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl bg-success/15 text-success">
              <BellRing className="size-6" aria-hidden="true" />
            </span>
            <div>
              <p className="font-display text-xl font-bold text-foreground">{GUARANTEE.headline}</p>
              <p className="mt-1">{GUARANTEE.contract}</p>
              <p className="mt-2 text-xs text-muted-foreground">{GUARANTEE.fineprint}</p>
            </div>
          </div>
        </Container>
      </section>

      {/* Quick answers (a few of the FAQs, so the main questions are answered on the homepage too) */}
      <section id="faq" className="scroll-mt-20" aria-labelledby="faq-title">
        <Container className="py-16 lg:py-20">
          <div className="mx-auto max-w-3xl">
            <Pill>Quick answers</Pill>
            <h2 id="faq-title" className="mt-5 text-3xl font-bold sm:text-4xl">
              GoHighLevel Questions, Answered
            </h2>
            <div className="mt-8 divide-y divide-border overflow-hidden rounded-2xl border border-border bg-surface">
              {HOME_FAQS.map((f, i) => (
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
            <Link
              to="/contact"
              className={cx("mt-5 inline-flex items-center gap-1.5 rounded text-sm font-semibold text-primary hover:underline", focusRing)}
            >
              See all {FAQS.length} questions
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </Container>
      </section>

      {/* Final CTA */}
      <section aria-labelledby="final-cta-title">
        <Container className="py-16 lg:py-20">
          <div className="theme-dark relative isolate overflow-hidden rounded-3xl bg-background p-8 sm:p-12">
            <AmbientGlow />
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="max-w-2xl">
                <h2 id="final-cta-title" className="text-2xl font-bold sm:text-3xl">
                  Find Out Where Your Leads Are Leaking.
                </h2>
                <p className="mt-2">
                  On a free 30-minute call we'll look at your GoHighLevel setup — or the one you need — find where leads
                  slip through, and decide what to fix first.{" "}
                  <Link to="/packages" className={cx("rounded font-semibold text-primary hover:underline", focusRing)}>
                    See the packages
                  </Link>
                  .
                </p>
              </div>
              <BookCallButton className="shrink-0" />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
