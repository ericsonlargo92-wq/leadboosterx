import { useCallback, useEffect, useRef, useState } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowRight, ChevronDown, Maximize2, Pause, Play, Volume2 } from "lucide-react";
import { Lightbox, type LightboxImage } from "~/components/Lightbox";
import { Container, CtaBlock, Pill } from "~/components/ui";
import { FILTERS, PROJECTS, type Project, type ProjectFilter, type WorkflowShot } from "~/lib/projects";
import { STAGES } from "~/lib/offer";
import { STAGE_ICONS } from "~/lib/stage-icons";
import { Reveal } from "~/components/motion";
import { seo } from "~/lib/seo";
import { card, cx, focusRing } from "~/lib/ui";

export const Route = createFileRoute("/_site/projects")({
  head: () =>
    seo({
      title: "Projects — GoHighLevel Builds | LeadBoosterX",
      description:
        "Freight, upholstery and tree service demo systems built in GoHighLevel, with screenshots of the real Nurture and Close workflows behind them, plus a live payment recovery pipeline.",
      path: "/projects",
    }),
  component: ProjectsPage,
});

const PREVIEW_NODES = 4;

function ProjectsPage() {
  const [filter, setFilter] = useState<ProjectFilter>("all");
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const [lightbox, setLightbox] = useState<LightboxImage | null>(null);
  const closeLightbox = useCallback(() => setLightbox(null), []);

  const visible = filter === "all" ? PROJECTS : PROJECTS.filter((p) => p.stages.includes(filter));
  const count = (id: ProjectFilter) => (id === "all" ? PROJECTS.length : PROJECTS.filter((p) => p.stages.includes(id)).length);

  return (
    <Container className="py-12 sm:py-16">
      <Pill>Systems &amp; Builds</Pill>
      <h1 className="mt-5 text-4xl font-bold sm:text-5xl">Selected Projects.</h1>
      <p className="mt-4 max-w-2xl text-lg">
        Three demo systems built in GoHighLevel, each covering Capture, Nurture and Close, plus a live payment recovery
        build (client details redacted). Pick a stage to see that part of the build: the website and form for Capture,
        and the real workflows from the GoHighLevel builder for Nurture and Close.
      </p>

      <div role="group" aria-label="Filter projects" className="mt-8 flex flex-wrap gap-2">
        {FILTERS.map((f) => {
          const active = filter === f.id;
          return (
            <button
              key={f.id}
              type="button"
              aria-pressed={active}
              onClick={() => {
                setFilter(f.id);
                setOpenSlug(null);
              }}
              className={cx(
                "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                active
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-surface text-body hover:bg-hover hover:text-foreground",
                focusRing,
              )}
            >
              {f.label}
              <span
                className={cx(
                  "rounded-full px-1.5 font-mono text-xs",
                  active ? "bg-primary-foreground/20" : "bg-hover text-muted-foreground",
                )}
              >
                {count(f.id)}
              </span>
            </button>
          );
        })}
      </div>

      <p className="sr-only" aria-live="polite">
        Showing {visible.length} projects
      </p>

      <ul className="mt-8 grid gap-6 lg:grid-cols-2">
        {visible.map((p) => (
          <ProjectCard
            key={p.slug}
            project={p}
            filter={filter}
            open={openSlug === p.slug}
            onToggle={() => setOpenSlug((s) => (s === p.slug ? null : p.slug))}
            onOpenImage={setLightbox}
          />
        ))}
      </ul>

      <div className="mt-16">
        <CtaBlock title="Want a system like this behind your ads?" />
      </div>

      <Lightbox image={lightbox} onClose={closeLightbox} />
    </Container>
  );
}

function ProjectCard({
  project: p,
  filter,
  open,
  onToggle,
  onOpenImage,
}: {
  project: Project;
  filter: ProjectFilter;
  open: boolean;
  onToggle: () => void;
  onOpenImage: (img: LightboxImage) => void;
}) {
  const isLive = p.label.startsWith("Real build");
  const wide = p.wide ?? isLive;
  const nodes = open ? p.workflow : p.workflow.slice(0, PREVIEW_NODES);
  const hidden = p.workflow.length - PREVIEW_NODES;
  const flowId = `flow-${p.slug}`;
  // Under the Nurture / Close filters a build with workflow screenshots shows that workflow instead of its website.
  const stageShot = p.workflowShots && (filter === "nurture" || filter === "close") ? p.workflowShots[filter] : null;
  const stageName = (id: "nurture" | "close") => STAGES.find((s) => s.id === id)?.name ?? id;
  const openShot = (shot: WorkflowShot) => onOpenImage({ src: shot.src, alt: shot.alt, caption: shot.caption, tall: true });

  return (
    <Reveal as="li" className={cx(card, "flex flex-col p-6", wide && "lg:col-span-2")}>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span
          className={cx(
            "rounded-full border px-2.5 py-0.5 text-xs font-semibold",
            isLive ? "border-success/30 bg-success/10 text-success" : "border-border bg-hover text-body",
          )}
        >
          {p.label}
        </span>
        <span className="font-mono text-xs uppercase tracking-wider text-primary">
          {p.category}
        </span>
      </div>

      <div className={cx("mt-5 gap-6", wide && "lg:grid lg:grid-cols-[1fr_1.1fr]")}>
        <div>
          <div className="flex items-start gap-4">
            <span
              className={cx(
                "inline-flex size-11 shrink-0 items-center justify-center rounded-xl bg-soft text-primary",
              )}
            >
              <p.icon className="size-5" aria-hidden="true" />
            </span>
            <h2 className="pt-1.5 text-xl font-semibold">{p.title}</h2>
          </div>
          <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Stages this build covers">
            {STAGES.filter((s) => p.stages.includes(s.id)).map((s) => {
              const Icon = STAGE_ICONS[s.id];
              return (
                <li
                  key={s.id}
                  className="inline-flex items-center gap-1 rounded-md border border-soft-border bg-soft px-2 py-0.5 text-xs font-semibold text-primary"
                >
                  <Icon className="size-3.5" aria-hidden="true" />
                  {s.name}
                </li>
              );
            })}
          </ul>
          <p className="mt-4 text-sm leading-relaxed">{p.description}</p>

          <div className="mt-5 rounded-xl border border-border bg-surface p-4">
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-muted-foreground">Workflow</p>
            <ol id={flowId} className="mt-3 flex flex-wrap items-center gap-x-1.5 gap-y-2 text-xs">
              {nodes.map((n, i) => (
                <li key={n} className="flex items-center gap-1.5">
                  <span className="rounded-md border border-border bg-surface px-2 py-1 font-medium text-foreground">{n}</span>
                  {i < nodes.length - 1 && (
                    <span className="text-muted-foreground" aria-hidden="true">
                      →
                    </span>
                  )}
                </li>
              ))}
              {!open && hidden > 0 && (
                <li className="text-muted-foreground" aria-hidden="true">
                  → …
                </li>
              )}
            </ol>
            {hidden > 0 && (
              <button
                type="button"
                onClick={onToggle}
                aria-expanded={open}
                aria-controls={flowId}
                className={cx("mt-3 inline-flex items-center gap-1 rounded text-xs font-semibold text-primary hover:underline", focusRing)}
              >
                {open ? "Hide workflow" : `Show full workflow (+${hidden})`}
                <ChevronDown className={cx("size-3.5 transition-transform", open && "rotate-180")} aria-hidden="true" />
              </button>
            )}
          </div>

          <div className="mt-5">
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-muted-foreground">Tools</p>
            <ul className="mt-2 flex flex-wrap gap-1.5">
              {p.tools.map((t) => (
                <li key={t} className="rounded-md bg-soft px-2 py-0.5 text-xs font-medium text-primary">
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {stageShot ? (
          <WorkflowShotPanel shot={stageShot} stage={stageName(filter as "nurture" | "close")} onOpen={() => openShot(stageShot)} />
        ) : (
          (p.video || p.workflowShots) && (
            <div className="mt-6 lg:mt-0">
              {p.video && <ProjectVideo video={p.video} />}
              {filter === "all" && p.workflowShots && (
                <div className="mt-4 grid grid-cols-2 gap-3">
                  {(["nurture", "close"] as const).map((id) => (
                    <WorkflowShotThumb key={id} shot={p.workflowShots![id]} stage={stageName(id)} onOpen={() => openShot(p.workflowShots![id])} />
                  ))}
                </div>
              )}
            </div>
          )
        )}

        {p.images && (
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:mt-0 lg:grid-cols-1 xl:grid-cols-2">
            {p.images.map((img) => (
              <figure key={img.src}>
                <button
                  type="button"
                  onClick={() => onOpenImage(img)}
                  aria-label={`Enlarge image: ${img.caption}`}
                  className={cx("group relative block w-full overflow-hidden rounded-xl border border-border bg-surface", focusRing)}
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    width={1600}
                    height={1200}
                    loading="lazy"
                    className="aspect-[4/3] w-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.02]"
                  />
                  <span className="absolute right-2 top-2 inline-flex size-8 items-center justify-center rounded-lg bg-surface/90 text-foreground opacity-0 shadow transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                    <Maximize2 className="size-4" aria-hidden="true" />
                  </span>
                </button>
                <figcaption className="mt-2 text-xs text-muted-foreground">{img.caption}</figcaption>
              </figure>
            ))}
          </div>
        )}
      </div>

      <div className="mt-auto pt-6">
        <Link to="/contact" className={cx("inline-flex items-center gap-1.5 rounded text-sm font-semibold text-primary hover:underline", focusRing)}>
          Ask about this build
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </div>
    </Reveal>
  );
}

/**
 * Screen recording of a build. The light silent loop starts buffering well before it reaches the screen (so it plays
 * without a delay), plays while visible and pauses when scrolled away. "Watch with voiceover" swaps in the narrated
 * version with sound and controls. Reduced-motion visitors get the poster and the buttons, no autoplay.
 */
function ProjectVideo({ video }: { video: NonNullable<Project["video"]> }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [narrated, setNarrated] = useState(false);
  const [paused, setPaused] = useState(false);
  const userPaused = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || narrated) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Start downloading about a screen early.
    const near = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.preload = "auto";
          el.load();
          near.disconnect();
        }
      },
      { rootMargin: "900px 0px" },
    );
    near.observe(el);
    if (reduce) {
      setPaused(true);
      return () => near.disconnect();
    }
    const vis = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !userPaused.current) el.play().catch(() => {});
        else el.pause();
      },
      { threshold: 0.35 },
    );
    vis.observe(el);
    return () => {
      near.disconnect();
      vis.disconnect();
    };
  }, [narrated]);

  const startNarrated = () => {
    const el = ref.current;
    if (!el || !video.voiceover) return;
    setNarrated(true);
    el.src = video.voiceover;
    el.muted = false;
    el.loop = false;
    el.controls = true;
    el.currentTime = 0;
    el.play().catch(() => {});
  };

  const togglePause = () => {
    const el = ref.current;
    if (!el) return;
    if (el.paused) {
      userPaused.current = false;
      el.play().catch(() => {});
    } else {
      userPaused.current = true;
      el.pause();
    }
  };

  return (
    <figure>
      <div className="overflow-hidden rounded-xl border border-border bg-surface shadow-lg shadow-[oklch(0.2_0.05_260/0.15)]">
        <div className="flex items-center gap-1.5 border-b border-border bg-surface px-3 py-2" aria-hidden="true">
          <span className="size-2.5 rounded-full bg-destructive/60" />
          <span className="size-2.5 rounded-full bg-cta/80" />
          <span className="size-2.5 rounded-full bg-success/70" />
        </div>
        <div className="relative">
          <video
            ref={ref}
            src={video.loop}
            poster={video.poster}
            aria-label={video.label}
            width={1280}
            height={800}
            muted
            loop
            playsInline
            preload="none"
            onPlay={() => setPaused(false)}
            onPause={() => setPaused(true)}
            className="block aspect-[16/10] w-full bg-background object-contain [&:fullscreen]:bg-black"
          />
          {!narrated && (
            <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 bg-gradient-to-t from-[oklch(0.15_0.04_258/0.75)] to-transparent p-3">
              {video.voiceover && (
                <button
                  type="button"
                  onClick={startNarrated}
                  className={cx("inline-flex items-center gap-2 rounded-full bg-cta px-3.5 py-2 text-xs font-bold text-cta-foreground shadow hover:bg-cta-hover", focusRing)}
                >
                  <Volume2 className="size-4" aria-hidden="true" />
                  Watch with voiceover{video.duration ? ` (${video.duration})` : ""}
                </button>
              )}
              <button
                type="button"
                onClick={togglePause}
                aria-label={paused ? "Play preview" : "Pause preview"}
                className={cx("inline-flex size-8 items-center justify-center rounded-full bg-[oklch(0.15_0.04_258/0.7)] text-white hover:bg-[oklch(0.15_0.04_258/0.9)]", focusRing)}
              >
                {paused ? <Play className="size-4" aria-hidden="true" /> : <Pause className="size-4" aria-hidden="true" />}
              </button>
            </div>
          )}
        </div>
      </div>
      <figcaption className="mt-2 text-xs text-muted-foreground">{video.caption}</figcaption>
    </figure>
  );
}

/**
 * A real Nurture or Close workflow from the GoHighLevel builder. The screenshot is tall, so the card shows the top
 * (trigger and first steps) and "View full workflow" opens the whole thing at reading size.
 */
function WorkflowShotPanel({ shot, stage, onOpen }: { shot: WorkflowShot; stage: string; onOpen: () => void }) {
  const [playing, setPlaying] = useState(false);
  const vo = shot.voiceover;
  if (vo && playing) {
    return (
      <figure className="mt-6 lg:mt-0">
        <div className="overflow-hidden rounded-xl border border-border bg-surface shadow-lg shadow-[oklch(0.2_0.05_260/0.15)]">
          <div className="flex items-center justify-between gap-2 border-b border-border px-3 py-2 text-xs">
            <span className="font-semibold text-foreground">{stage} workflow · walkthrough</span>
            <button
              type="button"
              onClick={() => setPlaying(false)}
              className={cx("rounded font-semibold text-primary hover:underline", focusRing)}
            >
              Back to screenshot
            </button>
          </div>
          <video
            src={vo.src}
            poster={vo.poster}
            aria-label={vo.label}
            width={1280}
            height={800}
            controls
            autoPlay
            playsInline
            className="block aspect-[16/10] w-full bg-[#f6f7f9] object-contain [&:fullscreen]:bg-black"
          />
        </div>
        <figcaption className="mt-2 text-xs text-muted-foreground">{shot.caption}</figcaption>
      </figure>
    );
  }
  return (
    <figure className="mt-6 lg:mt-0">
      <button
        type="button"
        onClick={onOpen}
        aria-label={`View the full ${stage} workflow`}
        className={cx(
          "group block w-full overflow-hidden rounded-xl border border-border bg-surface text-left shadow-lg shadow-[oklch(0.2_0.05_260/0.15)]",
          focusRing,
        )}
      >
        <span className="flex items-center justify-between gap-2 border-b border-border px-3 py-2 text-xs">
          <span className="font-semibold text-foreground">{stage} workflow</span>
          <span className="text-muted-foreground">GoHighLevel workflow builder</span>
        </span>
        <span className="relative block h-[420px] overflow-hidden bg-[#f6f7f9] sm:h-[540px]">
          <img
            src={shot.src}
            alt={shot.alt}
            width={shot.width}
            height={shot.height}
            loading="lazy"
            className="mx-auto block h-auto w-full max-w-[640px] transition-transform duration-300 group-hover:scale-[1.01]"
          />
          <span className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-surface via-surface/80 to-transparent" />
          <span className="absolute bottom-4 left-1/2 inline-flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full bg-primary px-4 py-2 text-xs font-bold text-primary-foreground shadow group-hover:bg-primary/90">
            <Maximize2 className="size-4" aria-hidden="true" />
            View full workflow
          </span>
        </span>
      </button>
      {vo && (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          className={cx(
            "mt-3 inline-flex items-center gap-2 rounded-full bg-cta px-3.5 py-2 text-xs font-bold text-cta-foreground shadow hover:bg-cta-hover",
            focusRing,
          )}
        >
          <Volume2 className="size-4" aria-hidden="true" />
          Watch with voiceover ({vo.duration})
        </button>
      )}
      <figcaption className="mt-2 text-xs text-muted-foreground">{shot.caption}</figcaption>
    </figure>
  );
}

/** Small preview of a workflow screenshot, used under the website recording in the "All" view. */
function WorkflowShotThumb({ shot, stage, onOpen }: { shot: WorkflowShot; stage: string; onOpen: () => void }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`View the full ${stage} workflow`}
      className={cx("group block w-full overflow-hidden rounded-xl border border-border bg-surface text-left", focusRing)}
    >
      <span className="relative block h-40 overflow-hidden bg-[#f6f7f9]">
        <img
          src={shot.src}
          alt=""
          width={shot.width}
          height={shot.height}
          loading="lazy"
          className="block h-auto w-full transition-transform duration-300 group-hover:scale-[1.03]"
        />
        <span className="absolute right-2 top-2 inline-flex size-7 items-center justify-center rounded-lg bg-surface/90 text-foreground shadow">
          <Maximize2 className="size-3.5" aria-hidden="true" />
        </span>
      </span>
      <span className="block border-t border-border px-3 py-2 text-xs font-semibold text-foreground">{stage} workflow</span>
    </button>
  );
}
