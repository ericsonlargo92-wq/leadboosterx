import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowRight, BadgeCheck, Check, ChevronDown, ExternalLink } from "lucide-react";
import { Reveal, STAGGER } from "~/components/motion";
import { BookCallButton, Container, CtaBlock, Pill } from "~/components/ui";
import { PROFILES } from "~/lib/config";
import { HIRE_FAQS, HIRE_PATH, REASONS, SKILLS, WORK_TYPES } from "~/lib/hire";
import { CREDENTIAL, PRICING_NOTE } from "~/lib/offer";
import { faqJsonLd, webPageJsonLd } from "~/lib/schema";
import { hireServicesJsonLd } from "~/lib/schema-pages";
import { seo } from "~/lib/seo";
import { btnSecondary, card, cx, focusRing } from "~/lib/ui";

const TITLE = "Hire a GoHighLevel Freelancer & Virtual Assistant (VA) | LeadBoosterX";
const DESCRIPTION =
  "Hire Ericson Largo, a HighLevel Certified Admin, as your GoHighLevel freelancer or VA: part-time, dedicated or project-based. Remote from the Philippines.";

export const Route = createFileRoute("/_site/hire-gohighlevel-freelancer")({
  head: () =>
    seo({
      title: TITLE,
      description: DESCRIPTION,
      path: HIRE_PATH,
      crumb: "Hire a GoHighLevel Freelancer",
      jsonLd: [webPageJsonLd("WebPage", HIRE_PATH, "Hire a GoHighLevel Freelancer & Virtual Assistant", DESCRIPTION), hireServicesJsonLd(), faqJsonLd(HIRE_FAQS)],
    }),
  component: HirePage,
});

function HirePage() {
  const profiles = PROFILES.filter((p) => p.url);
  return (
    <>
      <Container className="py-12 sm:py-16">
        <Pill>Hire a GoHighLevel freelancer</Pill>
        <h1 className="mt-5 max-w-3xl text-4xl font-bold sm:text-5xl">Hire a GoHighLevel Freelancer &amp; Virtual Assistant.</h1>
        <p className="mt-4 max-w-2xl text-lg">
          I'm Ericson Largo, a {CREDENTIAL} based in the Philippines. Businesses and agencies hire me as a GoHighLevel freelancer or
          virtual assistant (VA) to build, fix and run their GoHighLevel accounts — remotely, with hours that overlap your business day.
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <BookCallButton />
          <Link to="/projects" className={cx(btnSecondary, focusRing)}>
            See my GoHighLevel projects
          </Link>
        </div>
        <p className="mt-4 inline-flex items-center gap-1.5 rounded-md border border-success/30 bg-success/10 px-2 py-0.5 text-xs font-semibold text-success">
          <BadgeCheck className="size-4" aria-hidden="true" />
          {CREDENTIAL} ·{" "}
          <Link to="/certification" className={cx("rounded underline hover:no-underline", focusRing)}>
            verify the credential
          </Link>
        </p>

        {/* Ways to work together */}
        <h2 className="mt-14 text-3xl font-bold sm:text-4xl">Ways to Hire Me</h2>
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

        {/* Skills */}
        <h2 className="mt-16 text-3xl font-bold sm:text-4xl">What I Do in GoHighLevel</h2>
        <ul className="mt-6 flex flex-wrap gap-2">
          {SKILLS.map((s) => (
            <li key={s} className="rounded-lg border border-soft-border bg-soft px-3 py-1.5 text-sm font-medium text-primary">
              {s}
            </li>
          ))}
        </ul>

        {/* Why hire me */}
        <h2 className="mt-16 text-3xl font-bold sm:text-4xl">Why Hire Me</h2>
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
          <h2 className="text-3xl font-bold sm:text-4xl">Hiring Questions, Answered</h2>
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
            title="Need a GoHighLevel Freelancer or VA?"
            text="Book a free 30-minute call. We'll look at your GoHighLevel setup and agree on the right way to work together."
          />
        </div>
      </Container>
    </>
  );
}
