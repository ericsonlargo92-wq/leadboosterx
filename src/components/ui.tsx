import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { btnPrimary, cx } from "~/lib/ui";

/** Page width + padding used by every section. */
export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cx("mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-10", className)}>{children}</div>;
}

/** Small mono uppercase label, e.g. POSITIONING. */
export function Pill({ children, dot, className }: { children: ReactNode; dot?: boolean; className?: string }) {
  return (
    <span
      className={cx(
        "inline-flex items-center gap-2 rounded-full border border-soft-border bg-soft px-3 py-1 font-mono text-[0.7rem] font-medium uppercase tracking-[0.14em] text-primary",
        className,
      )}
    >
      {dot && (
        <span className="relative flex size-2" aria-hidden="true">
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-70" />
          <span className="relative inline-flex size-2 rounded-full bg-accent" />
        </span>
      )}
      {children}
    </span>
  );
}

/** Soft blue/cyan blurred glows behind a hero or block. Decorative. */
export function AmbientGlow({ grid = false }: { grid?: boolean }) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {grid && <div className="bg-dot-grid absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_75%)]" />}
      <div className="absolute -left-24 -top-24 size-[28rem] rounded-full bg-primary/15 blur-3xl" />
      <div className="absolute -right-24 top-10 size-[24rem] rounded-full bg-accent/15 blur-3xl" />
    </div>
  );
}

export function BookCallButton({ className, label = "Book a Strategy Call" }: { className?: string; label?: string }) {
  return (
    <Link to="/book-a-call" className={cx(btnPrimary, className)}>
      {label}
      <ArrowUpRight className="size-4" aria-hidden="true" />
    </Link>
  );
}

/** Rounded CTA band used at the bottom of most pages. */
export function CtaBlock({ title, text }: { title: ReactNode; text?: ReactNode }) {
  return (
    <div className="relative isolate overflow-hidden rounded-3xl border border-soft-border bg-surface px-6 py-12 text-center sm:px-12">
      <AmbientGlow />
      <h2 className="mx-auto max-w-2xl text-2xl font-bold sm:text-3xl">{title}</h2>
      {text && <p className="mx-auto mt-3 max-w-xl text-body">{text}</p>}
      <BookCallButton className="mt-7" />
    </div>
  );
}
