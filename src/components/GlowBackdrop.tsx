/** Fixed, full-screen background: deep navy with slowly drifting blue, cyan and indigo light. Decorative. */
export function GlowBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-20 overflow-hidden">
      <div className="blob blob-a -left-[10vw] -top-[15vh] size-[55vw] max-w-[760px] max-h-[760px] bg-glow-blue opacity-45" />
      <div className="blob blob-b -right-[12vw] top-[20vh] size-[48vw] max-w-[680px] max-h-[680px] bg-glow-cyan opacity-30" />
      <div className="blob blob-c bottom-[-20vh] left-[25vw] size-[50vw] max-w-[700px] max-h-[700px] bg-glow-indigo opacity-35" />
      <div className="bg-dot-grid absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)]" />
    </div>
  );
}
