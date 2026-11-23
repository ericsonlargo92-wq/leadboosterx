import type { CSSProperties } from "react";

const glow = (color: string): CSSProperties => ({ ["--blob" as string]: `var(${color})` });

/**
 * Fixed, full-screen background: deep navy with slowly drifting blue, cyan and indigo light. Decorative.
 * The glows are radial gradients (no blur filter) and only `transform` animates, so phones stay smooth.
 */
export function GlowBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-20 overflow-hidden">
      <div className="blob blob-a -left-[30vw] -top-[35vh] size-[90vw] max-h-[1150px] max-w-[1150px] opacity-55" style={glow("--glow-blue")} />
      <div className="blob blob-b -right-[30vw] top-[5vh] size-[80vw] max-h-[1050px] max-w-[1050px] opacity-40" style={glow("--glow-cyan")} />
      <div className="blob blob-c bottom-[-40vh] left-[10vw] size-[85vw] max-h-[1100px] max-w-[1100px] opacity-45" style={glow("--glow-indigo")} />
      <div className="bg-dot-grid absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)]" />
    </div>
  );
}
