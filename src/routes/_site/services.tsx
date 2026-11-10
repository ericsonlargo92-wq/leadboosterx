import { Fragment } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Bot,
  CalendarCheck,
  Check,
  Handshake,
  LayoutTemplate,
  Megaphone,
  Target,
  Timer,
  Users,
  Workflow,
  Zap,
} from "lucide-react";
import { Container, CtaBlock, Pill } from "~/components/ui";
import { seo } from "~/lib/seo";
import { card, cx } from "~/lib/ui";

export const Route = createFileRoute("/_site/services")({
  head: () =>
    seo({
      title: "Services — Meta Ads, GoHighLevel CRM & AI Automation | LeadBoosterX",
      description:
        "Lead generation, Meta Ads, AI chat and voice receptionists, GoHighLevel CRM setup, funnels and follow-up automation built as one system.",
      path: "/services",
    }),
  component: ServicesPage,
});

const SERVICES = [
  {
    title: "Lead Generation",
    icon: Target,
    badge: "Inbound & outbound",
    text: "Campaigns and offers that bring in people who actually fit your business — not just clicks.",
    includes: ["Offer and audience planning", "Lead magnets and opt-ins", "Lead source tracking"],
  },
  {
    title: "Meta Ads",
    icon: Megaphone,
    badge: "Targeting & creative",
    text: "Facebook and Instagram campaigns built around a clear offer, tested creative, and proper tracking.",
    includes: ["Campaign setup and structure", "Pixel / Conversions API and events", "Creative testing and weekly optimization"],
  },
  {
    title: "AI Automation",
    icon: Bot,
    badge: "24/7 response",
    text: "AI chat and voice receptionists that answer inquiries, ask qualifying questions, and book calls — even after hours.",
    includes: ["AI chat for website and social DMs", "AI voice receptionist", "Handoff to your team with notes"],
  },
  {
    title: "GoHighLevel CRM",
    icon: Workflow,
    badge: "Pipeline engine",
    text: "A CRM set up the way your sales process actually works, so every lead has a stage, an owner, and a next step.",
    includes: ["Pipelines, stages, and custom fields", "Calendars and booking", "Workflows, tags, and internal alerts"],
  },
  {
    title: "Funnels & Landing Pages",
    icon: LayoutTemplate,
    badge: "Built to convert",
    text: "Focused pages that explain your offer clearly and make the next step obvious.",
    includes: ["Landing pages and opt-in funnels", "Booking and thank-you pages", "Forms connected to the CRM"],
  },
  {
    title: "Sales Process & Follow-Up",
    icon: Handshake,
    badge: "From inquiry to close",
    text: "Follow-up that happens on time, every time — so warm leads don't go cold while you're busy.",
    includes: ["SMS and email follow-up sequences", "No-show and reminder automations", "Failed-payment and win-back follow-up"],
  },
];

const OUTCOMES = [
  { label: "More Qualified Leads", icon: Users },
  { label: "More Booked Appointments", icon: CalendarCheck },
  { label: "Faster Follow-Up", icon: Timer },
  { label: "Less Manual Work", icon: Zap },
];

function ServicesPage() {
  return (
    <Container className="py-12 sm:py-16">
      <Pill>Services</Pill>
      <h1 className="mt-5 text-4xl font-bold sm:text-5xl">What I Can Help You Build.</h1>

      <ul className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {SERVICES.map((s, i) => (
          <li key={s.title} className={cx(card, "flex flex-col p-6")}>
            <div className="flex items-center justify-between">
              <span className="inline-flex size-11 items-center justify-center rounded-xl bg-soft text-primary">
                <s.icon className="size-5" aria-hidden="true" />
              </span>
              <span className="font-mono text-xs text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
            </div>
            <h2 className="mt-5 text-xl font-semibold">{s.title}</h2>
            <span className="mt-2 w-fit rounded-full border border-soft-border bg-soft px-2.5 py-0.5 text-xs font-medium text-primary">
              {s.badge}
            </span>
            <p className="mt-4 text-sm leading-relaxed">{s.text}</p>
            <div className="mt-auto pt-5">
              <p className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-muted-foreground">What's included</p>
              <ul className="mt-3 space-y-2">
                {s.includes.map((inc) => (
                  <li key={inc} className="flex items-start gap-2 text-sm text-foreground">
                    <Check className="mt-0.5 size-4 shrink-0 text-success" aria-hidden="true" />
                    {inc}
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ul>

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
          <span aria-hidden="true" className="self-center font-display text-2xl font-bold text-muted-foreground xl:rotate-0">
            =
          </span>
          <div className="flex-[1.4] rounded-2xl bg-gradient-to-br from-primary to-primary-hover p-5 text-primary-foreground shadow-lg shadow-primary/25">
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.14em] opacity-80">Result</p>
            <p className="mt-1 font-display text-lg font-bold">More Sales Opportunities &amp; Closed Revenue.</p>
          </div>
        </div>
      </section>

      <div className="mt-20">
        <CtaBlock title="Not sure which of these you need?" text="We'll look at your current setup and pick the first system worth building." />
      </div>
    </Container>
  );
}
