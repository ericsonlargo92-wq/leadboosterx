/** Shared class strings so buttons and cards look the same everywhere. */
export function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

const btnBase =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-60 disabled:cursor-not-allowed";

export const btnPrimary = `${btnBase} sheen glow bg-gradient-to-r from-primary to-accent text-primary-foreground hover:brightness-110 hover:-translate-y-px motion-reduce:hover:translate-y-0`;
export const btnSecondary = `${btnBase} glass text-foreground hover:bg-hover`;

/** Frosted glass card. Add `lift` for a hover lift. */
export const card = "glass lift rounded-2xl";

export const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

export const gradientText =
  "bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-brand-gradient";
