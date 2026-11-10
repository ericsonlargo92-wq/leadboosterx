import { createFileRoute } from "@tanstack/react-router";
import { BarChart3, Check, Globe2, Headphones, PhoneCall, Sparkles, Trophy, type LucideIcon } from "lucide-react";
import { Container, CtaBlock, Pill } from "~/components/ui";
import { seo } from "~/lib/seo";
import { card, cx, gradientText } from "~/lib/ui";

export const Route = createFileRoute("/_site/about")({
  head: () =>
    seo({
      title: "About Ericson Largo — Founder of LeadBoosterX",
      description:
        "10+ years in sales, customer support, operations and revenue roles. Ericson Largo builds lead generation, CRM and follow-up systems for service businesses.",
      path: "/about",
    }),
  component: AboutPage,
});

const BRING = [
  "10+ years in sales, support & revenue roles",
  "Sales and high-ticket closing",
  "Lead generation strategy",
  "Appointment setting",
  "Meta Ads (Facebook & Instagram)",
  "GoHighLevel CRM, funnels & calendars",
  "Pipeline design & CRM setup",
  "AI chat & voice automation",
  "Sales process & follow-up optimization",
  "Revenue recovery (failed payments & chargebacks)",
  "Remote collaboration across time zones",
];

const CAREER: { title: string; text: string; icon: LucideIcon }[] = [
  { title: "Customer Support", text: "QuickBooks technical support and customer care for US businesses.", icon: Headphones },
  { title: "Appointment Setting", text: "Discovery calls, qualification, and booked consultations.", icon: PhoneCall },
  {
    title: "Sales",
    text: "Closing QuickBooks deals with business owners and accountants. Recognized as QBOA King (2023–2024).",
    icon: Trophy,
  },
  {
    title: "Revenue Operations",
    text: "Failed-payment recovery, chargebacks, and cancellation alerts for a membership business.",
    icon: BarChart3,
  },
  {
    title: "Marketing & Automation",
    text: "Founded LeadBoosterX: GoHighLevel CRMs, funnels, Meta Ads, and AI receptionists.",
    icon: Sparkles,
  },
  { title: "Remote, Global", text: "Based in the Philippines, working with clients worldwide.", icon: Globe2 },
];

function AboutPage() {
  return (
    <Container className="py-12 sm:py-16">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-14">
        {/* Left column */}
        <div className="space-y-6 lg:sticky lg:top-8 lg:self-start">
          <figure className="relative overflow-hidden rounded-3xl border border-border">
            <img
              src="/images/ericson.jpg"
              alt="Portrait of Ericson Largo"
              width={800}
              height={1000}
              className="aspect-[4/5] w-full object-cover"
            />
            <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/70 to-transparent" />
            <figcaption className="absolute inset-x-4 bottom-4 rounded-xl border border-white/15 bg-black/35 px-4 py-3 text-white backdrop-blur-md">
              <span className="block font-display text-lg font-semibold">Ericson Largo</span>
              <span className="block text-sm text-white/80">Founder, LeadBoosterX</span>
            </figcaption>
          </figure>
          <div className="rounded-2xl border border-soft-border bg-soft p-5">
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-primary">Core Philosophy</p>
            <p className="mt-2 text-lg text-foreground">
              I don't believe businesses need more complicated marketing. <strong className="font-semibold">They need better systems.</strong>
            </p>
          </div>
        </div>

        {/* Right column */}
        <div>
          <Pill>Background &amp; Approach</Pill>
          <h1 className="mt-5 text-4xl font-bold sm:text-5xl">
            Get Seen. <span className={gradientText}>Get Leads.</span> Get Customers.
          </h1>
          <div className="mt-6 space-y-4 text-base leading-relaxed">
            <p>
              I'm Ericson Largo, founder of LeadBoosterX. I've spent more than ten years in sales, customer support,
              operations, and revenue roles — including five years supporting and selling QuickBooks for Intuit, where I
              went from customer support to appointment setting to closing deals with business owners and accountants.
            </p>
            <p>
              That's where I learned that most businesses don't lose customers because of bad marketing. They lose them
              in the gaps — the inquiry nobody answered, the follow-up that never happened, the payment that failed and
              was never chased.
            </p>
            <p>
              Today I build the systems that close those gaps: ads that bring in the right people, a CRM that keeps every
              lead moving, and automation that follows up while you focus on the work. I also handle revenue recovery and
              financial operations, so I understand what happens after the sale too.
            </p>
          </div>

          <div className="mt-6 rounded-xl border border-border bg-surface p-5">
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-accent-foreground">The goal is simple</p>
            <p className="mt-2 font-mono text-sm text-foreground">
              Get more of the right people in, respond faster, follow up every time, and turn more conversations into
              customers.
            </p>
          </div>

          <h2 className="mt-10 text-2xl font-bold">What I Bring</h2>
          <ul className="mt-5 grid gap-x-6 gap-y-3 sm:grid-cols-2">
            {BRING.map((b) => (
              <li key={b} className="flex items-start gap-2.5 text-sm text-foreground">
                <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-success/12 text-success">
                  <Check className="size-3.5" aria-hidden="true" />
                </span>
                {b}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <section className="mt-20" aria-labelledby="career-title">
        <h2 id="career-title" className="text-3xl font-bold">
          Career Path
        </h2>
        <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-6">
          {CAREER.map((c, i) => (
            <li key={c.title} className={cx(card, "relative p-5")}>
              <div className="flex items-center justify-between">
                <span className="inline-flex size-9 items-center justify-center rounded-lg bg-soft text-primary">
                  <c.icon className="size-4" aria-hidden="true" />
                </span>
                <span className="font-mono text-xs text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <h3 className="mt-4 font-semibold">{c.title}</h3>
              <p className="mt-1.5 text-sm">{c.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <div className="mt-20">
        <CtaBlock title="Ready to Upgrade Your Revenue Systems?" text="Let's build a practical pipeline that converts." />
      </div>
    </Container>
  );
}
