import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { Play } from "lucide-react";
import shotData from "~/data/explainer-shots.json";

// The player (scenes, captions, B-roll logic) is its own chunk, fetched only when the section nears the viewport.
const Explainer = lazy(() => import("./Explainer").then((m) => ({ default: m.Explainer })));

/** Same footprint as the real player, so nothing jumps when it swaps in. */
function Placeholder() {
  return (
    <div aria-hidden="true">
      <div className="@container">
        <div className="glass relative aspect-[4/5] overflow-hidden rounded-3xl text-[3.5cqw] @xl:aspect-video @xl:text-[1.5cqw]">
          <img src={`/broll/${shotData.poster}`} alt="" loading="lazy" className="absolute inset-0 size-full object-cover" />
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-[0.8em] bg-background/70">
            <span className="glow inline-flex size-[4.5em] items-center justify-center rounded-full bg-cta text-cta-foreground">
              <Play className="ml-[0.2em] size-[1.8em]" />
            </span>
            <span className="text-[1.25em] font-semibold text-foreground">Watch the 1-minute explainer</span>
          </div>
        </div>
      </div>
      <div className="glass mt-3 h-[52px] rounded-full" />
    </div>
  );
}

export function LazyExplainer() {
  const ref = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Also load if someone arrives via #explainer.
    if (typeof IntersectionObserver === "undefined" || location.hash === "#explainer") return setNear(true);
    const io = new IntersectionObserver((e) => e.some((x) => x.isIntersecting) && setNear(true), { rootMargin: "600px 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref}>
      {near ? (
        <Suspense fallback={<Placeholder />}>
          <Explainer />
        </Suspense>
      ) : (
        <Placeholder />
      )}
    </div>
  );
}
