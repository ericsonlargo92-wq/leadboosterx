import { useCallback, useEffect, useRef, useState } from "react";
import { Play, Volume2 } from "lucide-react";
import { cx, focusRing } from "~/lib/ui";
import { raise, type Preload } from "~/lib/warm-video";

export const INTRO_VIDEO = {
  src: "/projects/ericson-largo-intro-v2.mp4",
  poster: "/projects/ericson-largo-intro-poster-v2.webp",
  duration: "1:07",
  label:
    "Ericson Largo's intro: HighLevel Certified Admin and founder of LeadBoosterX, his background at Intuit and AI for Business, the Capture, Nurture and Close system, and real GoHighLevel builds",
};

/**
 * Ericson's narrated intro. Shows the poster with a big play button; the video warms up while it's on screen
 * ("metadata"), buffers when the pointer reaches it ("auto"), and plays with sound and controls on click.
 */
export function IntroVideo({ className, large = false }: { className?: string; large?: boolean }) {
  const ref = useRef<HTMLVideoElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const [preload, setPreload] = useState<Preload>("none");
  const [started, setStarted] = useState(false);
  const [loading, setLoading] = useState(false);
  const warm = useCallback((level: Preload) => setPreload((p) => raise(p, level)), []);

  useEffect(() => {
    const el = btnRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    let timer = 0;
    const io = new IntersectionObserver(
      ([e]) => {
        clearTimeout(timer);
        if (e.isIntersecting)
          timer = window.setTimeout(() => {
            warm("metadata");
            io.disconnect();
          }, 600);
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => {
      clearTimeout(timer);
      io.disconnect();
    };
  }, [warm]);

  const play = () => {
    const v = ref.current;
    if (!v) return;
    setPreload("auto");
    setStarted(true);
    if (v.readyState < 3) setLoading(true);
    v.play().catch(() => setLoading(false));
  };
  const intent = () => warm("auto");

  return (
    <figure className={className}>
      <div className="relative overflow-hidden rounded-2xl border border-border bg-background shadow-2xl shadow-[oklch(0.25_0.12_255/0.45)]">
        <video
          ref={ref}
          src={INTRO_VIDEO.src}
          poster={INTRO_VIDEO.poster}
          aria-label={INTRO_VIDEO.label}
          width={1920}
          height={1080}
          controls={started}
          playsInline
          preload={preload}
          onPlaying={() => setLoading(false)}
          onWaiting={() => started && setLoading(true)}
          onPause={() => setLoading(false)}
          className="block aspect-video w-full bg-background object-cover [&:fullscreen]:bg-black"
        />
        {!started && (
          <button
            ref={btnRef}
            type="button"
            onClick={play}
            onPointerEnter={intent}
            onFocus={intent}
            onTouchStart={intent}
            aria-label={`Play with sound: Meet Ericson, 1-minute intro (${INTRO_VIDEO.duration})`}
            className={cx(
              "group/play absolute inset-0 flex items-end justify-start gap-3 bg-gradient-to-t from-[oklch(0.12_0.04_258/0.7)] via-transparent to-transparent p-4 transition-colors hover:from-[oklch(0.12_0.04_258/0.85)]",
              large ? "sm:gap-4 sm:p-8" : "sm:p-5",
              focusRing,
            )}
          >
            <span className={cx("relative inline-flex shrink-0 items-center justify-center", large ? "size-14 sm:size-20" : "size-14 sm:size-16")} aria-hidden="true">
              <span className="absolute inset-0 rounded-full bg-cta/50 motion-safe:animate-[ping_2.2s_cubic-bezier(0,0,0.2,1)_infinite]" />
              <span className={cx("relative inline-flex items-center justify-center rounded-full bg-cta text-cta-foreground shadow-xl ring-4 ring-white/70 transition-transform duration-200 group-hover/play:scale-110", large ? "size-14 sm:size-20" : "size-14 sm:size-16")}>
                <Play className={cx("ml-1 fill-current", large ? "size-6 sm:size-9" : "size-6 sm:size-7")} />
              </span>
            </span>
            <span className={cx("mb-2 inline-flex items-center gap-2 rounded-full bg-[oklch(0.15_0.04_258/0.85)] px-4 py-1.5 font-semibold text-white shadow", large ? "text-sm sm:mb-5 sm:px-5 sm:py-2 sm:text-base" : "text-xs sm:mb-3 sm:text-sm")}>
              <Volume2 className="size-4 shrink-0" aria-hidden="true" />
              Meet Ericson · {INTRO_VIDEO.duration}
            </span>
          </button>
        )}
        {loading && (
          <span role="status" className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <span className="size-12 animate-spin rounded-full border-4 border-white/40 border-t-white shadow-lg" aria-hidden="true" />
            <span className="sr-only">Loading video</span>
          </span>
        )}
      </div>
    </figure>
  );
}
