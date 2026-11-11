import { useCallback, useState } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowRight, ChevronDown, Maximize2 } from "lucide-react";
import { Lightbox, type LightboxImage } from "~/components/Lightbox";
import { Container, CtaBlock, Pill } from "~/components/ui";
import { FILTERS, PROJECTS, type Project, type ProjectFilter } from "~/lib/projects";
import { Reveal } from "~/components/motion";
import { seo } from "~/lib/seo";
import { card, cx, focusRing } from "~/lib/ui";

export const Route = createFileRoute("/_site/projects")({
  head: () =>
    seo({
      title: "Projects — Lead Generation & Automation Systems | LeadBoosterX",
      description:
        "Live work and sample systems for lead generation, booking and follow-up: a GoHighLevel payment recovery pipeline, AI receptionist, funnels and Meta Ads.",
      path: "/projects",
    }),
  component: ProjectsPage,
});

const PREVIEW_NODES = 4;

function ProjectsPage() {
  const [filter, setFilter] = useState<"all" | ProjectFilter>("all");
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const [lightbox, setLightbox] = useState<LightboxImage | null>(null);
  const closeLightbox = useCallback(() => setLightbox(null), []);

  const visible = filter === "all" ? PROJECTS : PROJECTS.filter((p) => p.filter === filter);
  const count = (id: "all" | ProjectFilter) => (id === "all" ? PROJECTS.length : PROJECTS.filter((p) => p.filter === id).length);

  return (
    <Container className="py-12 sm:py-16">
      <Pill>Systems &amp; Builds</Pill>
      <h1 className="mt-5 text-4xl font-bold sm:text-5xl">Selected Projects.</h1>
      <p className="mt-4 max-w-2xl text-lg">
        A mix of live work and sample systems that show how I approach lead generation, booking, and follow-up. Live
        builds have client details redacted.
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
  open,
  onToggle,
  onOpenImage,
}: {
  project: Project;
  open: boolean;
  onToggle: () => void;
  onOpenImage: (img: LightboxImage) => void;
}) {
  const isLive = p.label.startsWith("Real build");
  const isAutomation = p.filter === "automation";
  const nodes = open ? p.workflow : p.workflow.slice(0, PREVIEW_NODES);
  const hidden = p.workflow.length - PREVIEW_NODES;
  const flowId = `flow-${p.slug}`;

  return (
    <Reveal as="li" className={cx(card, "flex flex-col p-6", isLive && "lg:col-span-2")}>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span
          className={cx(
            "rounded-full border px-2.5 py-0.5 text-xs font-semibold",
            isLive ? "border-success/30 bg-success/10 text-success" : "border-border bg-hover text-body",
          )}
        >
          {p.label}
        </span>
        <span className={cx("font-mono text-xs uppercase tracking-wider", isAutomation ? "text-accent-foreground" : "text-primary")}>
          {p.category}
        </span>
      </div>

      <div className={cx("mt-5 gap-6", isLive && "lg:grid lg:grid-cols-[1fr_1.1fr]")}>
        <div>
          <div className="flex items-start gap-4">
            <span
              className={cx(
                "inline-flex size-11 shrink-0 items-center justify-center rounded-xl",
                isAutomation ? "bg-soft-cyan text-accent-foreground" : "bg-soft text-primary",
              )}
            >
              <p.icon className="size-5" aria-hidden="true" />
            </span>
            <h2 className="pt-1.5 text-xl font-semibold">{p.title}</h2>
          </div>
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
