import { Link, createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  CalendarCheck,
  CheckCircle2,
  Filter,
  Magnet,
  MousePointerClick,
  RotateCcw,
  Send,
  ShieldCheck,
  Target,
  Trophy,
  UserPlus,
} from "lucide-react";
import { AmbientGlow, BookCallButton, Container, Pill } from "~/components/ui";
import { seo } from "~/lib/seo";
import { btnSecondary, card, cx, gradientText } from "~/lib/ui";

export const Route = createFileRoute("/_site/")({
  head: () =>
    seo({
      title: "LeadBoosterX — Lead Generation, CRM & Automation by Ericson Largo",
      description:
        "Lead generation, Meta Ads, GoHighLevel CRM and follow-up automation that turn inquiries into booked appointments and customers.",
      path: "/",
    }),
  component: HomePage,
});

const STEPS = [
  { n: "01", title: "Traffic", text: "Meta Ads & search", icon: MousePointerClick },
  { n: "02", title: "Leads", text: "Opt-ins & forms", icon: UserPlus },
  { n: "03", title: "Qualification", text: "Questions & lead scoring", icon: Filter },
  { n: "04", title: "Appointment", text: "Synced calendar", icon: CalendarCheck },
  { n: "05", title: "Follow-Up", text: "SMS & email sequences", icon: Send },
  { n: "06", title: "Customer", text: "Closed revenue", icon: Trophy },
];

const PILLARS = [
  { n: "01", title: "Attract", text: "Generate attention and qualified traffic.", icon: Target },
  { n: "02", title: "Capture", text: "Turn interest into leads and conversations.", icon: Magnet },
  { n: "03", title: "Convert", text: "Qualify prospects and book appointments.", icon: CheckCircle2 },
  { n: "04", title: "Follow Up", text: "Automate follow-up so opportunities don't disappear.", icon: RotateCcw },
];

const CHIPS = ["Lead Generation", "Meta Ads", "GoHighLevel CRM"];

function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden">
        <AmbientGlow grid />
        <Container className="pb-16 pt-12 sm:pt-20 lg:pb-24">
          <Pill dot>Remote Specialist · Meta Ads · Funnels · Automation</Pill>
          <h1 className="mt-6 max-w-4xl text-4xl font-bold leading-[1.05] sm:text-5xl lg:text-6xl">
            Helping You Save Time, Reduce Busywork, <span className={gradientText}>and Grow Your Business.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg">
            Sales, marketing, and automation systems that help businesses generate qualified leads, book more
            appointments, and convert more customers.
          </p>
          <ul className="mt-6 flex flex-wrap gap-2" aria-label="Specialties">
            {CHIPS.map((c) => (
              <li key={c} className="rounded-lg border border-border bg-surface px-2.5 py-1 font-mono text-xs text-body">
                {c}
              </li>
            ))}
            <li className="rounded-lg border border-accent/30 bg-soft-cyan px-2.5 py-1 font-mono text-xs text-accent-foreground">
              AI Automation
            </li>
          </ul>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <BookCallButton />
            <Link to="/projects" className={btnSecondary}>
              View My Work
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
          <p className="mt-6 flex items-start gap-2 text-sm text-muted-foreground">
            <ShieldCheck className="mt-0.5 size-4 shrink-0 text-success" aria-hidden="true" />
            10+ years across sales, customer support, operations, and revenue-focused roles.
          </p>

          {/* Customer Acquisition Process */}
          <div className="mt-14">
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">Customer Acquisition Process</p>
            <ol className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
              {STEPS.map((s, i) => (
                <li key={s.n} className="relative">
                  <div className={cx(card, "group relative h-full overflow-hidden p-4 transition-colors hover:border-soft-border")}>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs text-muted-foreground">{s.n}</span>
                      <s.icon className="size-4 text-primary" aria-hidden="true" />
                    </div>
                    <p className="mt-3 font-display font-semibold text-foreground">{s.title}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{s.text}</p>
                    <span
                      aria-hidden="true"
                      className="motion-beam absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-primary to-accent transition-transform duration-500 group-hover:scale-x-100"
                    />
                  </div>
                  {i < STEPS.length - 1 && (
                    <span
                      aria-hidden="true"
                      className="absolute -right-2.5 top-1/2 z-10 hidden -translate-y-1/2 text-sm text-border-strong xl:block"
                    >
                      →
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      {/* Positioning */}
      <section className="border-t border-border bg-surface/60">
        <Container className="py-16 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-start">
            <div>
              <Pill>Positioning</Pill>
              <h2 className="mt-5 text-3xl font-bold sm:text-4xl">More Than Lead Generation.</h2>
              <p className="mt-4 text-lg">
                Getting leads is only one part of the problem. The real opportunity is what happens after someone
                raises their hand.
              </p>
              <blockquote className="mt-6 border-l-[3px] border-primary pl-5 text-foreground">
                “I combine marketing, sales, CRM, and automation to help businesses move prospects from first
                interaction to booked appointment — and ultimately to paying customer.”
              </blockquote>
            </div>
            <ul className="grid gap-4 sm:grid-cols-2">
              {PILLARS.map((p) => (
                <li
                  key={p.n}
                  className={cx(card, "p-5 transition-all duration-200 hover:-translate-y-1 hover:border-primary motion-reduce:hover:translate-y-0")}
                >
                  <div className="flex items-center justify-between">
                    <span className="inline-flex size-10 items-center justify-center rounded-xl bg-soft text-primary">
                      <p.icon className="size-5" aria-hidden="true" />
                    </span>
                    <span className="font-mono text-xs text-muted-foreground">{p.n}</span>
                  </div>
                  <h3 className="mt-4 text-lg font-semibold">{p.title}</h3>
                  <p className="mt-1 text-sm">{p.text}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative isolate mt-14 overflow-hidden rounded-3xl border border-soft-border bg-surface p-8 sm:p-10">
            <AmbientGlow />
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-2xl font-bold sm:text-3xl">Ready to Move Beyond Just Leads?</h2>
                <p className="mt-2">Let's map out your full customer acquisition system.</p>
              </div>
              <BookCallButton className="shrink-0" />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
