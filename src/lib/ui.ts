/** Shared class strings so buttons and cards look the same everywhere. */
export function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

const btnBase =
  "inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-60 disabled:cursor-not-allowed";

export const btnPrimary = `${btnBase} bg-primary text-primary-foreground hover:bg-primary-hover shadow-sm shadow-primary/20`;
export const btnSecondary = `${btnBase} bg-surface text-foreground border border-border hover:bg-hover`;

export const card = "rounded-2xl border border-border bg-card shadow-[0_1px_2px_rgb(15_23_42/0.04),0_4px_16px_-8px_rgb(15_23_42/0.06)]";

export const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

export const gradientText =
  // Light mode passes through the darker cyan (--accent-foreground) so large text keeps 3:1 contrast on white.
  "bg-gradient-to-r from-primary via-accent-foreground to-primary dark:via-accent bg-clip-text text-transparent animate-brand-gradient";
