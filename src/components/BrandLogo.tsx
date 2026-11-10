import { useId } from "react";
import { cx } from "~/lib/ui";

type Size = "sm" | "md" | "lg";

const sizes: Record<Size, { mark: string; word: string; tag: string }> = {
  sm: { mark: "size-8", word: "text-lg", tag: "text-[0.55rem]" },
  md: { mark: "size-10", word: "text-xl", tag: "text-[0.6rem]" },
  lg: { mark: "size-14", word: "text-3xl", tag: "text-xs" },
};

/** The LB growth mark on its own (also used for the favicon). */
export function BrandMark({ className }: { className?: string }) {
  const id = useId().replace(/:/g, "");
  const g = `lbx-mark-${id}`;
  const l = `lbx-light-${id}`;
  const a = `lbx-arrow-${id}`;
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={g} x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="#1D4ED8" />
          <stop offset="55%" stopColor="#2563EB" />
          <stop offset="100%" stopColor="#06B6D4" />
        </linearGradient>
        <linearGradient id={l} x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#2563EB" />
          <stop offset="100%" stopColor="#38BDF8" />
        </linearGradient>
        <linearGradient id={a} x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="#06B6D4" />
          <stop offset="100%" stopColor="#38BDF8" />
        </linearGradient>
      </defs>
      {/* L stem + base */}
      <rect x="5" y="5" width="6.5" height="38" rx="3.25" fill={`url(#${g})`} />
      <rect x="5" y="36.5" width="38" height="6.5" rx="3.25" fill={`url(#${g})`} />
      {/* B spine: two bowls hugging the stem */}
      <path
        d="M11.5 7.5c6.5 0 9.5 2.6 9.5 6.4s-3 6.3-9.5 6.3c7.2 0 10.4 2.8 10.4 6.8"
        fill="none"
        stroke={`url(#${l})`}
        strokeWidth="2.4"
        strokeLinecap="round"
        opacity="0.55"
      />
      {/* three ascending bars */}
      <rect x="17" y="27" width="5" height="7.5" rx="1.5" fill={`url(#${l})`} opacity="0.7" />
      <rect x="25" y="22" width="5" height="12.5" rx="1.5" fill={`url(#${l})`} opacity="0.85" />
      <rect x="33" y="16" width="5" height="18.5" rx="1.5" fill={`url(#${l})`} />
      {/* trend line + arrowhead */}
      <path
        d="M15 24.5 23 18l6.5 2.5L41.5 8"
        fill="none"
        stroke={`url(#${a})`}
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M35.6 7.2 43 5.2l-1.6 7.5z" fill="#38BDF8" />
    </svg>
  );
}

export function BrandLogo({ size = "md", className }: { size?: Size; className?: string }) {
  const s = sizes[size];
  return (
    <span className={cx("group/logo inline-flex items-center gap-2.5", className)}>
      <span className="relative inline-flex shrink-0">
        <span
          aria-hidden="true"
          className="absolute inset-0 scale-90 rounded-full bg-primary/15 opacity-0 blur-md transition-all duration-300 group-hover/logo:scale-110 group-hover/logo:opacity-100"
        />
        <BrandMark
          className={cx(
            s.mark,
            "relative transition-all duration-300 [filter:drop-shadow(0_2px_6px_rgb(37_99_235/0.25))] group-hover/logo:scale-[1.04] group-hover/logo:[filter:drop-shadow(0_2px_8px_rgb(6_182_212/0.4))]",
          )}
        />
      </span>
      <span className="flex flex-col leading-none">
        <span className={cx("font-display font-bold tracking-tight text-foreground", s.word)}>
          Lead
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Booster</span>
          <span className="text-accent">X</span>
        </span>
        <span className={cx("mt-1 font-mono font-medium tracking-[0.2em] text-muted-foreground", s.tag)}>
          REVENUE SYSTEMS
        </span>
      </span>
    </span>
  );
}
