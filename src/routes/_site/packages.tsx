import { Fragment } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { CalendarCheck, Check, Clock, ShieldCheck, Sparkles, Timer, Users, Zap } from "lucide-react";
import { BookCallButton, Container, CtaBlock, Pill } from "~/components/ui";
import { GUARANTEE, PACKAGES, PRICING_NOTE } from "~/lib/offer";
import { seo } from "~/lib/seo";
import { card, cx } from "~/lib/ui";

export const Route = createFileRoute("/_site/packages")({
  head: () =>
    seo({
      title: "Packages — Ads, Funnels & Follow-Up Systems | LeadBoosterX",
      description:
        "Three ways to work together: a Follow-Up System, a Full Growth System (Meta Ads + funnel + follow-up), and monthly Growth Management. Live in 14 days, no long-term contract.",
      path: "/packages",
    }),
  component: PackagesPage,
});

const OUTCOMES = [
  { label: "More Qualified Leads", icon: Users },
  { label: "More Booked Appointments", icon: CalendarCheck },
  { label: "Faster Follow-Up", icon: Timer },
  { label: "Less Manual Work", icon: Zap },
];

function PackagesPage() {
  return (
    <Container className="py-12 sm:py-16">
      <Pill>Packages</Pill>
      <h1 className="mt-5 max-w-3xl text-4xl font-bold sm:text-5xl">Pick Where You Want to Start.</h1>
      <p className="mt-4 max-w-2xl text-lg">
        Every package is built in your own accounts, tested end to end before launch, and comes with the same promise:
        live in 14 days, no long-term contract.
      </p>

      <ul className="mt-10 grid gap-5 lg:grid-cols-3">
        {PACKAGES.map((p, i) => (
          <li
            key={p.name}
            className={cx(
              card,
              "relative flex flex-col p-6",
              p.recommended && "border-primary ring-1 ring-primary lg:-my-2 lg:py-8",
            )}
          >
            {p.recommended && (
              <span className="absolute -top-3 left-6 inline-flex items-center gap-1 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                <Sparkles className="size-3.5" aria-hidden="true" />
                Recommended
              </span>
            )}
            <span className="font-mono text-xs text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
            <h2 className="mt-2 text-2xl font-bold">{p.name}</h2>
            <p className="mt-2 font-medium text-foreground">{p.tagline}</p>
            <p className="mt-2 text-sm">{p.who}</p>
            <p className="mt-4 inline-flex w-fit items-center gap-1.5 rounded-full border border-soft-border bg-soft px-2.5 py-1 text-xs font-semibold text-primary">
              <Clock className="size-3.5" aria-hidden="true" />
              {p.timing}
            </p>
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
          </li>
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

      <section className="mt-20" aria-labelledby="outcomes-title">
        <h2 id="outcomes-title" className="text-3xl font-bold">
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

      <div className="mt-20">
        <CtaBlock
          title="Not sure which package fits?"
          text="Tell me how leads come in today. I'll recommend the smallest system that fixes the biggest leak."
        />
      </div>
    </Container>
  );
}
