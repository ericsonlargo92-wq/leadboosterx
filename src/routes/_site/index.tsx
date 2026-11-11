import { Link, createFileRoute } from "@tanstack/react-router";
import {
  ArrowDown,
  ArrowRight,
  BellRing,
  Check,
  Clock,
  PlayCircle,
  GraduationCap,
  Hammer,
  MessageSquareOff,
  Rocket,
  ShieldCheck,
  Target,
  TrendingUp,
  UserX,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { Explainer } from "~/components/Explainer";
import { Reveal, STAGGER } from "~/components/motion";
import { AmbientGlow, BookCallButton, Container, Pill } from "~/components/ui";
import { CTA_MICROCOPY, GUARANTEE, LAUNCH_DAYS, RESULTS, TRUST } from "~/lib/offer";
import { seo } from "~/lib/seo";
import { btnSecondary, card, cx, focusRing, gradientText } from "~/lib/ui";

export const Route = createFileRoute("/_site/")({
  head: () =>
    seo({
      title: "LeadBoosterX — Practical Lead Generation & AI Automation for Growing Businesses",
      description:
        "Done-for-you Meta Ads, funnels and follow-up for coaches, online programs and home service businesses. Every lead gets a fast reply, a reason to book, and reminders. Live in 14 days.",
      path: "/",
    }),
  component: HomePage,
});

const LEAKS: { title: string; text: string; icon: LucideIcon }[] = [
  {
    title: "Slow replies",
    text: "A lead fills out your form at 9 pm. Nobody answers until tomorrow. By then they've booked someone else.",
    icon: Clock,
  },
  {
    title: "One try, then silence",
    text: "Most leads don't book on the first message. Without follow-up, they're gone.",
    icon: MessageSquareOff,
  },
  {
    title: "No-shows",
    text: "They booked, then forgot. No reminder, no reschedule, no second chance.",
    icon: UserX,
  },
];

const PATHS = [
  {
    id: "coaches",
    audience: "Coaches & Online Programs",
    icon: GraduationCap,
    headline: "Fill your calendar with discovery calls from people who are ready to buy.",
    points: [
      "Opt-in or application funnel that screens out tire-kickers",
      "Instant reply and booking link the moment someone opts in",
      "Call reminders and no-show follow-up",
      "Failed-payment recovery for members",
    ],
  },
  {
    id: "home-services",
    audience: "Home Service Businesses",
    icon: Hammer,
    headline: "Turn ad clicks into booked estimates before your competitor calls back.",
    points: [
      "Quote-request page built for phones",
      "Instant text-back and booking for every new lead",
      "Estimate reminders and follow-up on unsold quotes",
      "Review requests after the job is done",
    ],
  },
];

const STEPS: { days: string; title: string; text: string; icon: LucideIcon }[] = [
  {
    days: "Days 1–3",
    title: "Strategy & offer",
    text: "We agree on who you're targeting, the offer, and what a qualified lead looks like.",
    icon: Target,
  },
  {
    days: "Days 4–10",
    title: "Build",
    text: "Funnel, CRM, booking calendar, and follow-up sequences — all set up in your own account.",
    icon: Wrench,
  },
  {
    days: "Days 11–14",
    title: "Test & launch",
    text: "Every path is tested end to end, then the ads go live.",
    icon: Rocket,
  },
  {
    days: "After launch",
    title: "Optimize",
    text: "Weekly optimization and a plain-English monthly report.",
    icon: TrendingUp,
  },
];

function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden">
        <AmbientGlow grid />
        <Container className="pb-14 pt-12 sm:pt-20 lg:pb-20">
          <Reveal>
          <Pill dot>Digital Marketing &amp; AI Automation</Pill>
          <h1 className="mt-6 max-w-4xl text-4xl font-bold leading-[1.05] sm:text-5xl lg:text-6xl">
            Practical Lead Generation &amp; AI Automation <span className={gradientText}>for Growing Businesses.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg">
            Meta Ads, funnels, and AI-powered follow-up that turn your leads into booked calls — built for coaches, online
            programs, and home service businesses.{" "}
            <strong className="font-semibold text-foreground">
              Live in {LAUNCH_DAYS} days. No long-term contract.
            </strong>
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
          </Reveal>

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
        <Container className="pb-16 lg:pb-20">
          <Reveal>
            <Pill>In one minute</Pill>
            <h2 id="explainer-title" className="mt-5 text-3xl font-bold sm:text-4xl">
              How It Works, Start to Finish
            </h2>
            <p className="mt-3 max-w-2xl">Where leads slip through, the system that catches them, and what you can expect in the first 14 days.</p>
          </Reveal>
          <Reveal delay={0.1} className="mt-8">
            <Explainer />
          </Reveal>
        </Container>
      </section>

      {/* Problem */}
      <section className="border-t border-border bg-surface/60" aria-labelledby="leaks-title">
        <Container className="py-16 lg:py-20">
          <Pill>The real problem</Pill>
          <h2 id="leaks-title" className="mt-5 text-3xl font-bold sm:text-4xl">
            Get More Booked Calls{" "}— <span className={gradientText}>Not Just More Leads.</span>
          </h2>
          <p className="mt-4 max-w-2xl text-lg">Most leads aren't lost to bad ads. Here's where they leak:</p>
          <ol className="mt-8 grid gap-4 md:grid-cols-3">
            {LEAKS.map((l, i) => (
              <Reveal as="li" delay={i * STAGGER} key={l.title} className={cx(card, "p-6")}>
                <div className="flex items-center justify-between">
                  <span className="inline-flex size-10 items-center justify-center rounded-xl bg-destructive/10 text-destructive">
                    <l.icon className="size-5" aria-hidden="true" />
                  </span>
                  <span className="font-mono text-xs text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <h3 className="mt-4 text-lg font-semibold">{l.title}</h3>
                <p className="mt-2 text-sm leading-relaxed">{l.text}</p>
              </Reveal>
            ))}
          </ol>
          <blockquote className="mt-10 max-w-3xl border-l-[3px] border-primary pl-5 font-display text-xl font-semibold text-foreground sm:text-2xl">
            Ads get attention. The system behind them decides whether you get paid.
          </blockquote>
        </Container>
      </section>

      {/* Two paths */}
      <section aria-labelledby="paths-title">
        <Container className="py-16 lg:py-20">
          <Pill>Who it's for</Pill>
          <h2 id="paths-title" className="mt-5 text-3xl font-bold sm:text-4xl">
            Built for How Your Business Actually Sells
          </h2>
          <div className="mt-8 grid gap-5 lg:grid-cols-2">
            {PATHS.map((p, i) => (
              <Reveal key={p.id} delay={i * STAGGER} className="flex">
              <article id={p.id} className={cx(card, "flex flex-1 flex-col p-6 sm:p-8")}>
                <div className="flex items-center gap-3">
                  <span className="inline-flex size-11 items-center justify-center rounded-xl bg-soft text-primary">
                    <p.icon className="size-5" aria-hidden="true" />
                  </span>
                  <p className="font-mono text-xs uppercase tracking-[0.14em] text-primary">{p.audience}</p>
                </div>
                <h3 className="mt-5 text-2xl font-bold leading-snug">{p.headline}</h3>
                <ul className="mt-5 space-y-2.5">
                  {p.points.map((pt) => (
                    <li key={pt} className="flex items-start gap-2.5 text-sm text-foreground">
                      <Check className="mt-0.5 size-4 shrink-0 text-success" aria-hidden="true" />
                      {pt}
                    </li>
                  ))}
                </ul>
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
            Live in {LAUNCH_DAYS} Days
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

      {/* Final CTA */}
      <section aria-labelledby="final-cta-title">
        <Container className="py-16 lg:py-20">
          <div className="relative isolate overflow-hidden rounded-3xl border border-soft-border bg-surface p-8 sm:p-12">
            <AmbientGlow />
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="max-w-2xl">
                <h2 id="final-cta-title" className="text-2xl font-bold sm:text-3xl">
                  Find Out Where Your Leads Are Leaking.
                </h2>
                <p className="mt-2">
                  On a free 30-minute call we'll look at how leads come in today, where they slip through, and what to
                  fix first. {" "}
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
