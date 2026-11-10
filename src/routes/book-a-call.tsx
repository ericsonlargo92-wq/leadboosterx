import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowLeft, CheckCircle2, Info } from "lucide-react";
import { BrandLogo } from "~/components/BrandLogo";
import { CalEmbed } from "~/components/CalEmbed";
import { ThemeToggle } from "~/components/theme-provider";
import { AmbientGlow, Container } from "~/components/ui";
import { seo } from "~/lib/seo";
import { card, cx, focusRing } from "~/lib/ui";

export const Route = createFileRoute("/book-a-call")({
  head: () =>
    seo({
      title: "Book a Strategy Call — LeadBoosterX",
      description:
        "Book a free 30-minute growth strategy call with Ericson Largo to look at your lead sources, follow-up and the first system worth building.",
      path: "/book-a-call",
    }),
  component: BookACallPage,
});

const COVER = [
  "Your current lead sources",
  "How inquiries are handled today",
  "Where follow-up breaks down",
  "The first system worth building",
];

const GOOD_TO_KNOW = [
  "Free, no obligation",
  "Times shown in your time zone",
  "Google Meet link and email reminders after booking",
];

function BookACallPage() {
  return (
    <div className="min-h-dvh">
      <header className="sticky top-0 z-40 border-b border-border bg-surface/90 backdrop-blur">
        <Container className="flex h-16 items-center justify-between gap-3">
          <Link to="/" className={cx("rounded-lg", focusRing)} aria-label="LeadBoosterX home">
            <BrandLogo size="sm" />
          </Link>
          <div className="flex items-center gap-2 sm:gap-4">
            <Link to="/" className={cx("inline-flex items-center gap-1.5 rounded text-sm font-medium text-body hover:text-primary", focusRing)}>
              <ArrowLeft className="size-4" aria-hidden="true" />
              <span className="hidden sm:inline">Back to site</span>
              <span className="sm:hidden">Back</span>
            </Link>
            <ThemeToggle />
          </div>
        </Container>
      </header>

      <main id="main" className="relative isolate overflow-x-clip">
        <AmbientGlow grid />
        <Container className="py-10 sm:py-14">
          <h1 className="text-4xl font-bold sm:text-5xl">Book a Growth Strategy Call</h1>
          <p className="mt-4 max-w-2xl text-lg">
            A free 30-minute call to look at how leads come in today, where they're slipping through, and what to fix
            first. Pick a time that works for you below.
          </p>

          <div className="mt-10 grid gap-8 lg:grid-cols-12">
            <aside className="space-y-5 lg:col-span-5">
              <div className={cx(card, "p-6")}>
                <h2 className="text-lg font-semibold">What we'll cover</h2>
                <ul className="mt-4 space-y-2.5">
                  {COVER.map((c) => (
                    <li key={c} className="flex items-start gap-2.5 text-sm text-foreground">
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-success" aria-hidden="true" />
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
              <div className={cx(card, "p-6")}>
                <h2 className="text-lg font-semibold">Good to know</h2>
                <ul className="mt-4 space-y-2.5">
                  {GOOD_TO_KNOW.map((c) => (
                    <li key={c} className="flex items-start gap-2.5 text-sm text-foreground">
                      <Info className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
              <div className={cx(card, "flex items-center gap-4 p-4")}>
                <img
                  src="/images/ericson.jpg"
                  alt="Ericson Largo"
                  width={800}
                  height={1000}
                  className="size-16 rounded-xl object-cover object-[50%_20%]"
                />
                <div>
                  <p className="font-display font-semibold text-foreground">Ericson Largo</p>
                  <p className="text-sm text-muted-foreground">Founder, LeadBoosterX · Remote, Philippines</p>
                </div>
              </div>
            </aside>

            <div className="lg:col-span-7">
              <CalEmbed />
            </div>
          </div>
        </Container>
      </main>
    </div>
  );
}
