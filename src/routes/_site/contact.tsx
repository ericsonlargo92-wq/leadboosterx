import { createFileRoute } from "@tanstack/react-router";
import { ChevronDown, Facebook, Mail, PhoneCall } from "lucide-react";
import { ContactForm } from "~/components/ContactForm";
import { AmbientGlow, BookCallButton, Container, Pill } from "~/components/ui";
import { CONTACT } from "~/lib/config";
import { seo } from "~/lib/seo";
import { cx, focusRing, gradientText } from "~/lib/ui";

export const Route = createFileRoute("/_site/contact")({
  head: () =>
    seo({
      title: "FAQs & Contact — LeadBoosterX",
      description:
        "Answers to common questions about lead generation, Meta Ads, GoHighLevel CRM and AI receptionists — and a form to tell Ericson where your leads get stuck.",
      path: "/contact",
    }),
  component: ContactPage,
});

const FAQS = [
  {
    q: "What kinds of businesses do you work with?",
    a: "Mainly coaches and online programs, and home service businesses. If you sell through discovery calls, consultations, or estimates, the systems I build fit well. Other appointment-based businesses are welcome to book a call too.",
  },
  {
    q: "What do you actually do?",
    a: "I build and run Meta Ads, a funnel, and automatic follow-up as one system, so leads get a fast reply, book a call, and get reminded until they show up. There are three packages: a Follow-Up System, a Full Growth System (ads + funnel + follow-up), and monthly Growth Management.",
  },
  {
    q: "What does it cost?",
    a: "It depends on your setup — how many offers you run, whether you already have ads and a CRM, and which package fits. I'll scope it on the free call and send a clear quote before any work starts.",
  },
  {
    q: "What do I need to provide?",
    a: "Access to your ad account, CRM and calendar, the details of your offer, and any photos, videos or testimonials you want to use. I'll send a short checklist once we agree to work together.",
  },
  {
    q: "What happens if it's not live in 14 days?",
    a: "I keep working for free until it is. The 14 days start once I have access to your accounts and the assets we agree on.",
  },
  {
    q: "Do I need to sign a long-term contract?",
    a: "No. The build is a one-time project, and monthly management is month-to-month. You can stop anytime.",
  },
  {
    q: "Do you only generate leads?",
    a: "No. Leads are only the start. I focus just as much on what happens next — fast response, qualification, booking, reminders, and follow-up — because that's where most revenue is won or lost.",
  },
  {
    q: "Can you set up an AI receptionist for my business?",
    a: "Yes. I set up AI chat and voice assistants that answer common questions, ask qualifying questions, and book calls into your calendar, with a handoff to your team when a person needs to step in.",
  },
  {
    q: "Do you work with clients outside the Philippines?",
    a: "Yes. I'm based in the Philippines and work remotely with clients in the US and elsewhere. I adjust my hours to overlap with your business day.",
  },
  {
    q: "Do you take one-off projects?",
    a: "Yes. I take one-time builds — like a funnel, a CRM setup, or a follow-up automation — as well as ongoing monthly support for ads and system management.",
  },
  {
    q: "How do we get started?",
    a: "Book a free strategy call. We'll look at how leads come in today, where they're slipping through, and what to build first. You'll leave with a clear next step, whether or not we work together.",
  },
];

function ContactPage() {
  return (
    <>
      <Container className="py-12 sm:py-16">
        <Pill>FAQs</Pill>
        <h1 className="mt-5 text-4xl font-bold sm:text-5xl">Questions, Answered.</h1>

        <div className="mt-8 divide-y divide-border overflow-hidden rounded-2xl border border-border bg-surface">
          {FAQS.map((f, i) => (
            <details key={f.q} open={i === 0} className="group">
              <summary
                className={cx(
                  "flex cursor-pointer items-center justify-between gap-4 px-5 py-4 font-display font-semibold text-foreground hover:bg-hover sm:px-6",
                  focusRing,
                  "focus-visible:ring-inset focus-visible:ring-offset-0",
                )}
              >
                {f.q}
                <ChevronDown className="size-5 shrink-0 text-muted-foreground transition-transform group-open:rotate-180" aria-hidden="true" />
              </summary>
              <p className="px-5 pb-5 text-sm leading-relaxed sm:px-6">{f.a}</p>
            </details>
          ))}
        </div>

        {/* Contact block */}
        <section id="contact" aria-labelledby="contact-title" className="relative isolate mt-16 overflow-hidden rounded-3xl border border-soft-border bg-surface p-5 sm:p-8 lg:p-10">
          <AmbientGlow />
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
            <div>
              <h2 id="contact-title" className="text-3xl font-bold sm:text-4xl">
                Have Leads But Not Enough Customers?
              </h2>
              <p className="mt-4 text-lg">
                Tell me about your business and where things are getting stuck. I'll reply with ideas and a suggested next step.
              </p>

              <div className="mt-8 rounded-2xl border border-border bg-surface p-5">
                <div className="flex items-center gap-3">
                  <span className="inline-flex size-10 items-center justify-center rounded-xl bg-soft text-primary">
                    <PhoneCall className="size-5" aria-hidden="true" />
                  </span>
                  <p className="font-display font-semibold text-foreground">Prefer to talk it through?</p>
                </div>
                <BookCallButton className="mt-4 w-full sm:w-auto" />
              </div>

              <ul className="mt-6 space-y-3 text-sm">
                <li>
                  <a href={`mailto:${CONTACT.email}`} className={cx("inline-flex items-center gap-3 rounded text-foreground hover:text-primary", focusRing)}>
                    <span className="inline-flex size-9 items-center justify-center rounded-lg border border-border bg-surface">
                      <Mail className="size-4" aria-hidden="true" />
                    </span>
                    <span className="break-all">{CONTACT.email}</span>
                  </a>
                </li>
                <li>
                  <a
                    href={CONTACT.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cx("inline-flex items-center gap-3 rounded text-foreground hover:text-primary", focusRing)}
                  >
                    <span className="inline-flex size-9 items-center justify-center rounded-lg border border-border bg-surface">
                      <Facebook className="size-4" aria-hidden="true" />
                    </span>
                    Message me on Facebook
                  </a>
                </li>
              </ul>
            </div>
            <ContactForm />
          </div>
        </section>
      </Container>

      {/* Final CTA band */}
      <section className="relative isolate overflow-hidden border-t border-border bg-surface">
        <AmbientGlow />
        <Container className="py-16 text-center sm:py-20">
          <p className="font-display text-2xl font-bold leading-snug text-foreground sm:text-4xl">
            Better Marketing Gets Attention.
            <br />
            Better Sales Creates Revenue.
            <br />
            <span className={gradientText}>
              Better Systems Connect the Two.
            </span>
          </p>
          <BookCallButton className="mt-8" />
        </Container>
      </section>
    </>
  );
}
