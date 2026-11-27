/*
 * ============================================================================================
 *  EXPLAINER PLAYER TEMPLATE  (website-explainer-video skill)
 * --------------------------------------------------------------------------------------------
 *  Copy to src/components/Explainer.tsx and adapt. Reference build: LeadBoosterX (2026-11-11).
 *
 *  Data it reads (written by the skill's scripts):
 *    ~/data/explainer-cues.json   { total, cues: [{ id, text, start, end }] }     (tts.mjs / timeline.py)
 *    ~/data/explainer-words.json  [[{ w, s, e }, ...], ...] caption groups          (timeline.py)
 *    ~/data/explainer-shots.json  { total, poster, shots: [{ src, start, end }] }   (broll-cut.mjs)
 *    /audio/explainer-mix.mp3     the soundtrack = the clock                         (mix.mjs)
 *    /broll/<src>.mp4             B-roll clips
 *
 *  Site dependencies to swap for the target site's own: cx + focusRing (class helpers), BrandLogo,
 *  TanStack Link (use the site's router link or <a>), design tokens used in classes
 *  (glass, glow, sheen, bg-background, text-primary, from-primary to-accent, bg-glow-blue,
 *  bg-glow-cyan, bg-soft, bg-soft-cyan, text-accent-foreground, bg-success, text-destructive, bg-dot-grid),
 *  lucide-react icons (reduced motion is detected with matchMedia, no library). Add the `caption-in` keyframes to the CSS:
 *    @keyframes caption-in { from { opacity: 0; transform: translateY(0.4em) scale(0.97); } to { opacity: 1; transform: none; } }
 *  tsconfig lib needs ES2023 (findLastIndex).
 *
 *  The PLAYER parts (BRoll, cameraScale, KineticCaption, Explainer) are generic: keep them.
 *  The SCENES (Intro … Cta) and the SCENES list are the LeadBoosterX example: rewrite them for each new
 *  script — one scene per story beat, every reveal pinned to a cue (rel("cueId","sceneId")) or a word
 *  (relWord("word","cueId","sceneId")), so the picture moves exactly when the voice says it.
 *  Phones get a 4:5 stage: at most 2 stacked panels + a heading per scene, or hide detail with `hidden @xl:block`.
 *  (The LeadBoosterX site's own src/components/Explainer.tsx is this file without this header.)
 * ============================================================================================
 */
import { useCallback, useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowUpRight,
  BadgeCheck,
  CalendarX,
  Captions,
  Check,
  Clock,
  Handshake,
  Inbox,
  Magnet,
  Pause,
  Play,
  RefreshCw,
  RotateCcw,
  UserPlus,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";
import cueData from "~/data/explainer-cues.json";
import shotData from "~/data/explainer-shots.json";
import wordGroups from "~/data/explainer-words.json";
import { cx, focusRing } from "~/lib/ui";
import { lowData } from "~/lib/warm-video";

/*
 * A ~57 second animated explainer rendered live in the page. The soundtrack (/audio/explainer-mix.mp3:
 * AI voiceover, ducked piano music and sound effects) is the clock: every frame is computed from the audio playhead, so it can be paused and scrubbed.
 * Scene changes are pinned to the voiceover's line timings (src/data/explainer-cues.json, from ElevenLabs).
 * The stage scales with its own width (container query units), and switches to a taller layout on phones.
 */

type Cue = { id: string; text: string; start: number; end: number };
const CUES = cueData.cues as Cue[];
const C = Object.fromEntries(CUES.map((c) => [c.id, c])) as Record<string, Cue>;
/** Length of the mixed soundtrack (voice + music + sound effects). */
const MIX_TOTAL = shotData.total;
const TOTAL = MIX_TOTAL;

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const easeOut = (v: number) => 1 - Math.pow(1 - v, 3);
/** Eased progress 0→1 of a step starting at `start` lasting `dur` seconds. */
const p = (t: number, start: number, dur = 0.6) => easeOut(clamp01((t - start) / dur));
const fadeUp = (t: number, start: number, dur = 0.6): CSSProperties => {
  const v = p(t, start, dur);
  return { opacity: v, transform: `translateY(${(1 - v) * 0.9}em)` };
};
const pop = (t: number, start: number, dur = 0.45): CSSProperties => {
  const v = p(t, start, dur);
  return { opacity: v, transform: `scale(${0.85 + v * 0.15})` };
};
const clock = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;

/* ---------- Scene timeline ---------- */

type SceneProps = { t: number };
const SCENES: { id: string; start: number; Comp: (p: SceneProps) => ReactNode }[] = [
  { id: "intro", start: 0, Comp: Intro },
  { id: "leaks", start: C.three.start - 0.15, Comp: Leaks },
  { id: "system", start: C.system.start - 0.15, Comp: System },
  { id: "promise", start: C.promise.start - 0.15, Comp: PromiseScene },
  { id: "cta", start: C.cta.start - 0.15, Comp: Cta },
];
/** Absolute time (s) the voice starts saying `word` (first match at/after `after` seconds). Pin reveals to words. */
const wordAt = (word: string, after = 0) =>
  (wordGroups as { w: string; s: number }[][]).flat().find((x) => x.s >= after && x.w.toLowerCase().replace(/[^a-z0-9']/g, "").startsWith(word.toLowerCase()))?.s ?? after;
/** Time of cue `id` relative to the start of scene `scene`. */
const rel = (id: string, scene: string) => C[id].start - SCENES.find((s) => s.id === scene)!.start;
/** Time of `word` (first said at/after cue `cue`) relative to the start of scene `scene`. */
const relWord = (word: string, cue: string, scene: string) => wordAt(word, C[cue].start) - SCENES.find((x) => x.id === scene)!.start;

/* ---------- Small building blocks ---------- */

function Eyebrow({ t, at = 0.15, children }: { t: number; at?: number; children: ReactNode }) {
  return (
    <p style={fadeUp(t, at)} className="font-mono text-[0.8em] font-medium uppercase tracking-[0.18em] text-accent-foreground">
      {children}
    </p>
  );
}

function Panel({ className, style, children, active }: { className?: string; style?: CSSProperties; children: ReactNode; active?: boolean }) {
  return (
    <div
      style={style}
      className={cx(
        "glass rounded-[1em] p-[0.9em] transition-[border-color,box-shadow] duration-300",
        active && "border-primary/70 shadow-[0_0_2.5em_-0.6em_var(--glow-blue)]",
        className,
      )}
    >
      {children}
    </div>
  );
}

function Tag({ tone, children, style }: { tone: "bad" | "good"; children: ReactNode; style?: CSSProperties }) {
  return (
    <span
      style={style}
      className={cx(
        "inline-flex items-center gap-[0.3em] rounded-full px-[0.6em] py-[0.15em] text-[0.75em] font-semibold",
        tone === "bad" ? "bg-destructive/15 text-destructive" : "bg-success/15 text-success",
      )}
    >
      {tone === "good" ? <Check className="size-[1em]" aria-hidden="true" /> : <X className="size-[1em]" aria-hidden="true" />}
      {children}
    </span>
  );
}

function Icon({ icon: I, tone = "blue" }: { icon: typeof Inbox; tone?: "blue" | "red" | "cyan" }) {
  return (
    <span
      className={cx(
        "inline-flex size-[2.2em] shrink-0 items-center justify-center rounded-[0.6em]",
        tone === "blue" && "bg-soft text-primary",
        tone === "cyan" && "bg-soft-cyan text-accent-foreground",
        tone === "red" && "bg-destructive/15 text-destructive",
      )}
    >
      <I className="size-[1.15em]" aria-hidden="true" />
    </span>
  );
}

/* ---------- Scenes (t = seconds since the scene started) — LeadBoosterX GoHighLevel explainer ---------- */

function Intro({ t }: SceneProps) {
  const waited = Math.max(0, t - 1.2) * 1500; // fast-forwarding "minutes waited"
  const mins = Math.floor(waited / 60);
  const so = wordAt("so", 0.5);
  return (
    <div className="flex h-full flex-col justify-center gap-[1.6em] @xl:flex-row @xl:items-center @xl:gap-[3em]">
      <div className="@xl:flex-1">
        <Eyebrow t={t}>LeadBoosterX · in one minute</Eyebrow>
        <h3 style={fadeUp(t, 0.35, 0.7)} className="mt-[0.4em] text-[2.6em] font-bold leading-[1.05] @xl:text-[3.2em]">
          You've got GoHighLevel.
        </h3>
        <h3 style={fadeUp(t, so, 0.7)} className="text-[2.6em] font-bold leading-[1.05] @xl:text-[3.2em]">
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">So why are leads still slipping through?</span>
        </h3>
      </div>
      <Panel
        style={{ ...fadeUp(t, 0.75, 0.5), rotate: `${t > 0.75 && t < 1.5 ? Math.sin((t - 0.75) * 50) * 2.5 * (1.5 - t) : 0}deg` }}
        className="w-full @xl:w-[19em]"
      >
        <div className="flex items-center gap-[0.7em]">
          <Icon icon={UserPlus} />
          <div>
            <p className="text-[0.95em] font-semibold text-foreground">New lead · Website form</p>
            <p className="text-[0.8em] text-muted-foreground">Not in your pipeline yet</p>
          </div>
        </div>
        <div className="mt-[0.9em] flex items-center justify-between border-t border-border pt-[0.7em] text-[0.85em]">
          <span className="inline-flex items-center gap-[0.35em] text-muted-foreground">
            <Clock className="size-[1em]" aria-hidden="true" /> Waiting for reply
          </span>
          <span className="font-mono font-semibold text-destructive">
            {mins >= 60 ? `${Math.floor(mins / 60)}h ${mins % 60}m` : `${mins}m`}
          </span>
        </div>
      </Panel>
    </div>
  );
}

function Leaks({ t }: SceneProps) {
  const cap = rel("capture", "leaks");
  const nur = rel("nurture", "leaks");
  const clo = rel("close", "leaks");
  const intro = 1 - p(t, cap - 0.4, 0.4); // headline phase fades out as the cards come in
  const sources = ["Ads", "Forms", "Calls", "DMs"];
  const firstSrc = relWord("ads", "capture", "leaks");
  const five = relWord("five", "capture", "leaks");
  const cold = relWord("cold", "nurture", "leaks");
  const forgotten = relWord("forgotten", "close", "leaks");
  const reminder = relWord("reminder", "close", "leaks");
  const payment = relWord("payment", "close", "leaks");
  // A warm lead cooling down: a bar that drains over the Nurture line
  const warmth = 1 - p(t, nur + 0.6, Math.max(0.5, cold - nur - 0.6));

  return (
    <div className="relative h-full">
      <div style={{ opacity: intro }} className="absolute inset-0 flex flex-col justify-center">
        <h3 style={fadeUp(t, 0.15, 0.7)} className="text-[2.5em] font-bold leading-[1.08] @xl:text-[3.2em]">
          Most setups break in
        </h3>
        <h3 style={fadeUp(t, 0.9, 0.7)} className="text-[2.5em] font-bold leading-[1.08] @xl:text-[3.2em]">
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">one of three places.</span>
        </h3>
      </div>

      <div style={{ opacity: p(t, cap - 0.3, 0.4) }} className="absolute inset-0 flex flex-col justify-center">
        <Eyebrow t={t} at={cap - 0.2}>Where GoHighLevel setups leak</Eyebrow>
        <div className="mt-[0.9em] grid gap-[0.7em] @xl:grid-cols-3 @xl:gap-[1em]">
          <Panel style={fadeUp(t, cap, 0.5)} active={t >= cap && t < nur} className="@xl:min-h-[11em]">
            <div className="flex items-center gap-[0.6em]">
              <Icon icon={Inbox} tone="red" />
              <p className="text-[1.05em] font-semibold text-foreground">Capture</p>
            </div>
            <div className="mt-[0.6em] hidden flex-wrap gap-[0.35em] @xl:flex">
              {sources.map((s, i) => (
                <span key={s} style={pop(t, firstSrc + i * 0.45)} className="rounded-[0.4em] bg-hover px-[0.5em] py-[0.15em] text-[0.8em] text-foreground">
                  {s}
                </span>
              ))}
            </div>
            <div className="mt-[0.6em]">
              <Tag tone="bad" style={pop(t, five)}>
                5 different places
              </Tag>
            </div>
          </Panel>
          <Panel style={fadeUp(t, nur, 0.5)} active={t >= nur && t < clo} className="@xl:min-h-[11em]">
            <div className="flex items-center gap-[0.6em]">
              <Icon icon={Clock} tone="red" />
              <p className="text-[1.05em] font-semibold text-foreground">Nurture</p>
            </div>
            <div className="mt-[0.7em] hidden @xl:block">
              <p className="text-[0.75em] text-muted-foreground">Lead temperature</p>
              <div className="mt-[0.3em] h-[0.5em] overflow-hidden rounded-full bg-hover">
                <div className="h-full rounded-full bg-gradient-to-r from-destructive to-[oklch(0.8_0.15_70)]" style={{ width: `${Math.max(6, warmth * 100)}%` }} />
              </div>
            </div>
            <div className="mt-[0.6em]">
              <Tag tone="bad" style={pop(t, cold)}>
                Warm lead went cold
              </Tag>
            </div>
          </Panel>
          <Panel style={fadeUp(t, clo, 0.5)} active={t >= clo} className="@xl:min-h-[11em]">
            <div className="flex items-center gap-[0.6em]">
              <Icon icon={CalendarX} tone="red" />
              <p className="text-[1.05em] font-semibold text-foreground">Close</p>
            </div>
            <p
              className="mt-[0.6em] hidden text-[0.9em] font-medium text-foreground decoration-destructive decoration-2 @xl:block"
              style={{ textDecorationLine: t > forgotten ? "line-through" : "none" }}
            >
              Discovery call · 2:00 PM
            </p>
            <div className="mt-[0.6em] flex flex-wrap gap-[0.35em]">
              <Tag tone="bad" style={pop(t, reminder)}>
                No reminder
              </Tag>
              <Tag tone="bad" style={pop(t, payment)}>
                No payment link
              </Tag>
            </div>
          </Panel>
        </div>
      </div>
    </div>
  );
}

function System({ t }: SceneProps) {
  const cap = rel("cap2", "system");
  const nur = rel("nur2", "system");
  const clo = rel("clo2", "system");
  const nodes = [
    { label: "Capture", sub: "Every lead in one place", icon: Magnet, at: cap },
    { label: "Nurture", sub: "Automatic follow-up", icon: RefreshCw, at: nur },
    { label: "Close", sub: "A clear path to the sale", icon: Handshake, at: clo },
  ];
  const checks = [
    { label: "Texts", at: relWord("texts", "nur2", "system") },
    { label: "Emails", at: relWord("emails", "nur2", "system") },
    { label: "Reminders", at: relWord("reminders", "nur2", "system") },
    { label: "Booked → closed", at: relWord("path", "clo2", "system") },
  ];
  return (
    <div className="flex h-full flex-col justify-center">
      <Eyebrow t={t}>The fix</Eyebrow>
      <h3 style={fadeUp(t, 0.3, 0.7)} className="mt-[0.3em] text-[1.9em] font-bold leading-[1.08] @xl:text-[2.6em]">
        One <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">connected</span> system inside GoHighLevel.
      </h3>

      <div className="mt-[1.1em] flex flex-col gap-[0.5em] @xl:flex-row @xl:items-stretch @xl:gap-0">
        {nodes.map((n, i) => (
          <div key={n.label} className="flex flex-col @xl:flex-1 @xl:flex-row @xl:items-center">
            <Panel style={pop(t, n.at - 0.1)} active={t >= n.at && t < (nodes[i + 1]?.at ?? 99)} className="flex items-center gap-[0.7em] @xl:flex-1">
              <Icon icon={n.icon} tone={i === 1 ? "cyan" : "blue"} />
              <div>
                <p className="text-[1.05em] font-semibold text-foreground">{n.label}</p>
                <p className="hidden text-[0.8em] text-muted-foreground @xl:block">{n.sub}</p>
              </div>
            </Panel>
            {i < nodes.length - 1 && (
              <div className="relative mx-auto h-[0.9em] w-[2px] overflow-hidden bg-border @xl:mx-[0.6em] @xl:h-[2px] @xl:w-[2.4em]">
                <div
                  className="absolute inset-0 origin-top bg-gradient-to-b from-primary to-accent @xl:origin-left @xl:bg-gradient-to-r"
                  style={{ transform: `scale(${p(t, n.at + 0.3, nodes[i + 1].at - n.at - 0.4)})` }}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-[1em] flex flex-wrap gap-[0.5em]">
        {checks.map((c) => (
          <span
            key={c.label}
            style={pop(t, c.at)}
            className="inline-flex items-center gap-[0.4em] rounded-full border border-success/30 bg-success/10 px-[0.8em] py-[0.35em] text-[0.9em] font-semibold text-success"
          >
            <Check className="size-[1em]" aria-hidden="true" />
            {c.label}
          </span>
        ))}
      </div>
    </div>
  );
}

function PromiseScene({ t }: SceneProps) {
  const contract = rel("contract", "promise");
  const tested = relWord("tested", "promise", "promise");
  const single = relWord("single", "promise", "promise");
  const fill = p(t, tested, Math.max(0.5, single - tested));
  const tests = ["Forms", "Workflows", "Calendars", "Reminders"];
  const checks = [
    { label: "Built in your own account", at: 0.4 },
    { label: "Tested end to end", at: tested },
    { label: "No long-term contract", at: contract },
  ];
  return (
    <div className="flex h-full flex-col justify-center">
      <Eyebrow t={t}>The promise</Eyebrow>
      <h3 style={fadeUp(t, 0.25, 0.7)} className="mt-[0.3em] text-[2.4em] font-bold leading-[1.05] @xl:text-[3em]">
        Tested <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">before launch.</span>
      </h3>
      <Panel style={fadeUp(t, 0.5, 0.5)} className="mt-[1em]">
        <div className="flex items-center justify-between text-[0.85em]">
          <span className="font-mono text-muted-foreground">Launch check</span>
          <span style={pop(t, single + 0.2)}>
            <Tag tone="good">Ready</Tag>
          </span>
        </div>
        <div className="mt-[0.5em] grid grid-cols-2 gap-[0.35em] text-[0.85em] @xl:grid-cols-4">
          {tests.map((x, i) => (
            <span key={x} className="flex items-center gap-[0.35em] text-foreground">
              <span
                className="inline-flex size-[1.2em] items-center justify-center rounded-full bg-success/15 text-success"
                style={{ opacity: fill >= (i + 1) / tests.length ? 1 : 0.25 }}
              >
                <Check className="size-[0.75em]" aria-hidden="true" />
              </span>
              {x}
            </span>
          ))}
        </div>
      </Panel>
      <div className="mt-[1em] grid gap-[0.45em] @xl:grid-cols-2">
        {checks.map((c) => (
          <p key={c.label} style={fadeUp(t, c.at, 0.45)} className="flex items-center gap-[0.5em] text-[1em] font-medium text-foreground">
            <span className="inline-flex size-[1.4em] items-center justify-center rounded-full bg-success/15 text-success">
              <Check className="size-[0.85em]" aria-hidden="true" />
            </span>
            {c.label}
          </p>
        ))}
      </div>
    </div>
  );
}

function Cta({ t }: SceneProps) {
  const cert = relWord("highlevel", "cta", "cta");
  return (
    <div className="flex h-full flex-col items-center justify-center text-center">
      <p
        style={pop(t, cert)}
        className="inline-flex items-center gap-[0.4em] rounded-full border border-success/30 bg-success/10 px-[0.8em] py-[0.3em] text-[0.9em] font-semibold text-success"
      >
        <BadgeCheck className="size-[1.1em]" aria-hidden="true" />
        HighLevel Certified Admin
      </p>
      <h3 style={fadeUp(t, cert + 1.2, 0.7)} className="mt-[0.6em] max-w-[16em] text-[2.1em] font-bold leading-[1.1] @xl:text-[2.6em]">
        Find where your system is{" "}
        <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">leaking.</span>
      </h3>
    </div>
  );
}

/* ---------- B-roll ---------- */

/** Stock footage (Pixabay Content License, see docs/licenses.md), one shot every ~2.5–4 s, timed to the voice. */
const SHOTS: { src: string; start: number; end: number }[] = shotData.shots;

function BRoll({ t, playing, started, primed }: { t: number; playing: boolean; started: boolean; primed: boolean }) {
  const refs = useRef<(HTMLVideoElement | null)[]>([]);
  const active = Math.max(0, SHOTS.findLastIndex((s) => t >= s.start));

  // Keep the active clip in step with the soundtrack; pause the rest.
  useEffect(() => {
    refs.current.forEach((v, i) => {
      if (!v) return;
      if (i !== active) {
        if (!v.paused) v.pause();
        return;
      }
      const want = Math.max(0, t - SHOTS[i].start);
      if (Number.isFinite(v.duration) && want < v.duration && Math.abs(v.currentTime - want) > (playing ? 0.3 : 0.05)) v.currentTime = want;
      if (playing && v.paused) v.play().catch(() => {});
      if (!playing && !v.paused) v.pause();
    });
  }, [t, active, playing]);

  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden bg-background">
      {!started && <img src={`/broll/${shotData.poster}`} alt="" className="absolute inset-0 size-full object-cover" />}
      {SHOTS.map((s, i) => {
        // Load the current clip and the next three, so each one is buffered well before its cut.
        // Before the first play, "primed" (the player is on screen) loads the opening clips.
        const near = i >= active - 1 && i <= active + 3;
        const load = (started || primed) && near;
        const local = t - s.start;
        const len = s.end - s.start;
        const inOpacity = i === active ? clamp01(local / 0.3) : i === active - 1 && t - SHOTS[active].start < 0.3 ? 1 : 0;
        // slow push in / pull out, alternating per shot
        const k = clamp01(local / len);
        const scale = i % 2 === 0 ? 1.04 + k * 0.08 : 1.12 - k * 0.08;
        return (
          <video
            key={s.src}
            ref={(el) => {
              refs.current[i] = el;
            }}
            src={load ? `/broll/${s.src}.mp4` : undefined}
            muted
            playsInline
            preload={load ? "auto" : "none"}
            className="absolute inset-0 size-full object-cover will-change-transform"
            style={{
              opacity: started ? inOpacity : 0,
              zIndex: i === active ? 2 : 1,
              transform: `scale(${scale}) translateX(${(i % 3 - 1) * k * 1.2}%)`,
            }}
          />
        );
      })}
      {/* tint + vignette so text stays readable on any footage */}
      <div className="absolute inset-0 z-10 bg-gradient-to-br from-background/85 via-background/60 to-glow-blue/35" />
      <div className="absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_center,transparent_35%,var(--background)_100%)] opacity-80" />
    </div>
  );
}

/* ---------- Camera snaps on key words ---------- */

type Word = { w: string; s: number; e: number };
const WORD_GROUPS = wordGroups as Word[][];
const ALL_WORDS = WORD_GROUPS.flat();
/** Key words that get a camera snap (first occurrence; punctuation and case ignored). Pick ~8–12 per minute. */
const SNAP_WORDS = ["slipping", "three", "five", "cold", "forgotten", "connected", "automatically", "path", "tested", "single", "contract", "leaking"];
const bare = (x: string) => x.toLowerCase().replace(/[^a-z0-9']/g, "");
const SNAPS = SNAP_WORDS.map((sw) => ALL_WORDS.find((w) => bare(w.w) === bare(sw))?.s).filter((v): v is number => v != null);

/** Camera scale: a slow drift plus a quick snap between two sizes on each key word. */
function cameraScale(t: number) {
  const passed = SNAPS.filter((s) => t >= s);
  const n = passed.length;
  const since = n ? t - passed[n - 1] : 99;
  const target = n % 2 === 1 ? 1.045 : 1;
  const prev = n % 2 === 1 ? 1 : 1.045;
  const snap = prev + (target - prev) * easeOut(clamp01(since / 0.18));
  return snap + Math.sin(t / 6) * 0.006;
}

/* ---------- Word-by-word captions ---------- */

function KineticCaption({ t }: { t: number }) {
  const gi = WORD_GROUPS.findIndex((g, i) => {
    const next = WORD_GROUPS[i + 1];
    return t >= g[0].s - 0.12 && t < (next ? Math.min(next[0].s - 0.12, g.at(-1)!.e + 0.9) : g.at(-1)!.e + 1.2);
  });
  if (gi < 0) return null;
  const g = WORD_GROUPS[gi];
  return (
    <p
      aria-hidden="true"
      key={gi}
      className="absolute inset-x-[4%] bottom-[3.5%] z-30 mx-auto w-fit max-w-[92%] rounded-[0.6em] bg-background/75 px-[0.8em] py-[0.35em] text-center font-display text-[1.25em] font-bold leading-snug backdrop-blur @xl:text-[1.15em]"
      style={{ animation: "caption-in 0.18s ease-out" }}
    >
      {g.map((w, i) => {
        const spoken = t >= w.s;
        const now = t >= w.s && t <= w.e + 0.08;
        return (
          <span
            key={i}
            className={cx(
              "inline-block transition-colors duration-100",
              i < g.length - 1 && "mr-[0.3em]",
              now ? "text-accent [text-shadow:0_0_14px_var(--glow-cyan)]" : spoken ? "text-foreground" : "text-foreground/35",
            )}
          >
            {w.w}
          </span>
        );
      })}
    </p>
  );
}

/** True when the visitor asked their system to reduce motion (no animation library needed). */
function useReducedMotion() {
  const [reduce, setReduce] = useState(false);
  useEffect(() => {
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduce(m.matches);
    const on = () => setReduce(m.matches);
    m.addEventListener("change", on);
    return () => m.removeEventListener("change", on);
  }, []);
  return reduce;
}

/* ---------- Player ---------- */

export function Explainer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const raf = useRef<number>(0);
  const [t, setT] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [started, setStarted] = useState(false);
  const [ended, setEnded] = useState(false);
  const [muted, setMuted] = useState(false);
  const [captions, setCaptions] = useState(true);
  const [buffering, setBuffering] = useState(false);
  // How much of the soundtrack to fetch before play: the header once the player mounts (it mounts only when the
  // section is near), all of it once the player is on screen or the pointer reaches the play button.
  const [warm, setWarm] = useState<"metadata" | "auto">("metadata");
  const rootRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const warmUp = useCallback(() => {
    if (!lowData()) setWarm("auto");
  }, []);

  useEffect(() => {
    const el = rootRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          warmUp();
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [warmUp]);

  const tick = useCallback(() => {
    const a = audioRef.current;
    if (a) setT(a.ended ? TOTAL : a.currentTime);
    raf.current = requestAnimationFrame(tick);
  }, []);

  useEffect(() => () => cancelAnimationFrame(raf.current), []);

  const play = useCallback(async () => {
    const a = audioRef.current;
    if (!a) return;
    if (ended || a.ended) {
      a.currentTime = 0;
      setEnded(false);
    }
    setStarted(true);
    if (a.readyState < 3) setBuffering(true);
    try {
      await a.play();
    } catch {
      setBuffering(false);
      return;
    }
    setPlaying(true);
    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(tick);
  }, [ended, tick]);

  const pause = useCallback(() => {
    audioRef.current?.pause();
    setPlaying(false);
    setBuffering(false);
    cancelAnimationFrame(raf.current);
  }, []);

  const seek = (v: number) => {
    const a = audioRef.current;
    if (!a) return;
    a.currentTime = Math.min(v, a.duration || v);
    setT(v);
    setEnded(false);
    setStarted(true);
  };

  // Before the first play, show a fully built intro frame as the poster.
  const shownT = started ? t : 3.6;
  const sceneIndex = SCENES.findLastIndex((s) => shownT >= s.start);
  const scene = SCENES[Math.max(0, sceneIndex)];
  const next = SCENES[sceneIndex + 1];
  const local = shownT - scene.start;
  const fadeIn = sceneIndex === 0 ? 1 : easeOut(clamp01(local / 0.4));
  const fadeOut = next ? clamp01((next.start - shownT) / 0.25) : 1;
  const Comp = scene.Comp;
  // whip-pan light streak across scene changes
  const streak = !reduce && sceneIndex > 0 && local < 0.45 ? local / 0.45 : null;

  return (
    <div ref={rootRef}>
      <div className="theme-dark @container">
        <div
          className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-background shadow-xl shadow-[oklch(0.2_0.05_260/0.3)] text-[3.5cqw] @xl:aspect-video @xl:text-[1.5cqw]"
          role="img"
          aria-label="Animated explainer: how LeadBoosterX turns leads into booked calls. A transcript is available below."
        >
          {/* camera: B-roll and scene move together */}
          <div className="absolute inset-0 origin-center will-change-transform" style={{ transform: `scale(${started && !reduce ? cameraScale(shownT) : 1})` }}>
            <BRoll t={shownT} playing={playing} started={started} primed={warm === "auto"} />
            <div
              className="absolute inset-0 z-20 px-[6%] pb-[24%] pt-[6%] [text-shadow:0_2px_18px_rgb(0_0_0/0.45)] @xl:pb-[10%]"
              style={{
                opacity: Math.min(fadeIn, fadeOut),
                transform: `translateX(${(1 - fadeIn) * 7 - (1 - fadeOut) * 7}%)`,
                filter: fadeIn < 1 || fadeOut < 1 ? `blur(${(1 - Math.min(fadeIn, fadeOut)) * 6}px)` : undefined,
              }}
            >
              <Comp t={local} />
            </div>
          </div>

          {streak !== null && (
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 z-20 w-[45%] -skew-x-12 bg-gradient-to-r from-transparent via-accent/25 to-transparent"
              style={{ left: `${-50 + streak * 160}%` }}
            />
          )}

          {/* the CTA button is real and clickable in the last scene */}
          {scene.id === "cta" && started && (
            <div className="absolute inset-x-0 bottom-[22%] z-30 flex justify-center @xl:bottom-[16%]" style={fadeUp(local, 1.8, 0.6)}>
              <Link
                to="/book-a-call"
                className={cx(
                  "sheen glow inline-flex items-center gap-[0.4em] rounded-full bg-gradient-to-r from-primary to-accent px-[1.4em] py-[0.7em] text-[1em] font-semibold text-primary-foreground",
                  focusRing,
                )}
              >
                Book Your Free Discovery Call
                <ArrowUpRight className="size-[1.1em]" aria-hidden="true" />
              </Link>
            </div>
          )}

          {captions && started && <KineticCaption t={shownT} />}

          {/* progress line */}
          {started && (
            <div aria-hidden="true" className="absolute inset-x-0 bottom-0 z-30 h-[3px] bg-white/10">
              <div className="h-full bg-gradient-to-r from-primary to-accent" style={{ width: `${(Math.min(t, TOTAL) / TOTAL) * 100}%` }} />
            </div>
          )}

          {started && buffering && (
            <span role="status" className="pointer-events-none absolute inset-0 z-40 flex items-center justify-center">
              <span className="size-[3.5em] animate-spin rounded-full border-[0.35em] border-white/30 border-t-white" aria-hidden="true" />
              <span className="sr-only">Loading</span>
            </span>
          )}

          {!started && (
            <button
              type="button"
              onClick={play}
              onPointerEnter={warmUp}
              onFocus={warmUp}
              onTouchStart={warmUp}
              className={cx("group absolute inset-0 z-40 flex flex-col items-center justify-center gap-[0.8em] bg-background/70 backdrop-blur-[3px]", focusRing)}
              aria-label="Play the 1-minute explainer"
            >
              <span className="glow relative inline-flex size-[4.5em] items-center justify-center rounded-full bg-gradient-to-r from-primary to-accent text-primary-foreground transition-transform duration-300 group-hover:scale-110 motion-reduce:group-hover:scale-100">
                <span className="absolute inset-0 animate-ping rounded-full bg-primary/40" aria-hidden="true" />
                <Play className="relative ml-[0.2em] size-[1.8em]" aria-hidden="true" />
              </span>
              <span className="text-[1.25em] font-semibold text-foreground">Watch the 1-minute explainer</span>
              <span className="text-[0.85em] text-muted-foreground">{clock(MIX_TOTAL)} · voiceover, music and captions</span>
            </button>
          )}
        </div>
      </div>

      {/* Controls */}
      <div className="glass mt-3 flex items-center gap-3 rounded-full px-3 py-2">
        <button
          type="button"
          onClick={ended ? play : playing ? pause : play}
          aria-label={ended ? "Replay" : playing ? "Pause" : "Play"}
          className={cx("inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground hover:bg-primary-hover", focusRing)}
        >
          {ended ? <RotateCcw className="size-4" aria-hidden="true" /> : playing ? <Pause className="size-4" aria-hidden="true" /> : <Play className="ml-0.5 size-4" aria-hidden="true" />}
        </button>
        <span className="w-[5.5rem] shrink-0 font-mono text-xs text-muted-foreground">
          {clock(Math.min(t, MIX_TOTAL))} / {clock(MIX_TOTAL)}
        </span>
        <input
          type="range"
          min={0}
          max={MIX_TOTAL}
          step={0.1}
          value={Math.min(t, MIX_TOTAL)}
          onChange={(e) => seek(Number(e.target.value))}
          aria-label="Seek"
          className="h-1.5 min-w-0 flex-1 cursor-pointer accent-[var(--primary)]"
        />
        <button
          type="button"
          onClick={() => setCaptions((c) => !c)}
          aria-pressed={captions}
          aria-label="Captions"
          className={cx("inline-flex size-9 shrink-0 items-center justify-center rounded-full hover:bg-hover", captions ? "text-primary" : "text-muted-foreground", focusRing)}
        >
          <Captions className="size-4" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => {
            const m = !muted;
            setMuted(m);
            if (audioRef.current) audioRef.current.muted = m;
          }}
          aria-label={muted ? "Unmute" : "Mute"}
          className={cx("inline-flex size-9 shrink-0 items-center justify-center rounded-full text-foreground hover:bg-hover", focusRing)}
        >
          {muted ? <VolumeX className="size-4" aria-hidden="true" /> : <Volume2 className="size-4" aria-hidden="true" />}
        </button>
      </div>

      <details className="mt-3 text-sm">
        <summary className={cx("w-fit cursor-pointer rounded text-muted-foreground hover:text-foreground", focusRing)}>Read the transcript</summary>
        <p className="mt-2 leading-relaxed">{CUES.map((c) => c.text).join(" ")}</p>
      </details>

      <audio
        ref={audioRef}
        src="/audio/explainer-ghl-v4.mp3"
        preload={warm}
        onWaiting={() => setBuffering(true)}
        onPlaying={() => setBuffering(false)}
        onEnded={() => {
          setPlaying(false);
          setEnded(true);
          setT(TOTAL);
          cancelAnimationFrame(raf.current);
        }}
        onPause={() => setPlaying(false)}
        onPlay={() => setPlaying(true)}
      />
    </div>
  );
}
