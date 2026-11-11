import { useCallback, useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { useReducedMotion } from "motion/react";
import {
  ArrowUpRight,
  CalendarCheck,
  CalendarX,
  Captions,
  Check,
  Clock,
  Hammer,
  GraduationCap,
  LayoutTemplate,
  Megaphone,
  MessageSquare,
  Pause,
  Play,
  RotateCcw,
  UserPlus,
  Volume2,
  VolumeX,
  X,
  Zap,
} from "lucide-react";
import cueData from "~/data/explainer-cues.json";
import wordGroups from "~/data/explainer-words.json";
import { BrandLogo } from "./BrandLogo";
import { cx, focusRing } from "~/lib/ui";

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
const MIX_TOTAL = 57.2;
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
  { id: "leaks", start: C.gaps.start - 0.15, Comp: Leaks },
  { id: "system", start: C.system.start - 0.15, Comp: System },
  { id: "paths", start: C.coaches.start - 0.15, Comp: Paths },
  { id: "promise", start: C.promise.start - 0.15, Comp: Promise14 },
  { id: "cta", start: C.cta.start - 0.15, Comp: Cta },
];
/** Time of cue `id` relative to the start of scene `scene`. */
const rel = (id: string, scene: string) => C[id].start - SCENES.find((s) => s.id === scene)!.start;

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

function Icon({ icon: I, tone = "blue" }: { icon: typeof Zap; tone?: "blue" | "red" | "cyan" }) {
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

/* ---------- Scenes (t = seconds since the scene started) ---------- */

function Intro({ t }: SceneProps) {
  const waited = Math.max(0, t - 1.2) * 1500; // fast-forwarding "minutes waited"
  const mins = Math.floor(waited / 60);
  return (
    <div className="flex h-full flex-col justify-center gap-[1.6em] @xl:flex-row @xl:items-center @xl:gap-[3em]">
      <div className="@xl:flex-1">
        <Eyebrow t={t}>LeadBoosterX · in one minute</Eyebrow>
        <h3 style={fadeUp(t, 0.35, 0.7)} className="mt-[0.4em] text-[2.6em] font-bold leading-[1.05] @xl:text-[3.2em]">
          You paid for that lead.
        </h3>
        <h3 style={fadeUp(t, 1.9, 0.7)} className="text-[2.6em] font-bold leading-[1.05] @xl:text-[3.2em]">
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">So why didn't it book?</span>
        </h3>
      </div>
      <Panel style={{ ...fadeUp(t, 0.75, 0.5), rotate: `${t > 0.75 && t < 1.5 ? Math.sin((t - 0.75) * 50) * 2.5 * (1.5 - t) : 0}deg` }} className="w-full @xl:w-[19em]">
        <div className="flex items-center gap-[0.7em]">
          <Icon icon={UserPlus} />
          <div>
            <p className="text-[0.95em] font-semibold text-foreground">New lead · Facebook ad</p>
            <p className="text-[0.8em] text-muted-foreground">Form submitted</p>
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
  const slow = rel("slow", "leaks");
  const silence = rel("silence", "leaks");
  const noshow = rel("noshow", "leaks");
  const intro = 1 - p(t, slow - 0.4, 0.4); // headline phase fades out as cards come in
  // 9:00 PM ticking to the next morning
  const hour = 21 + Math.min(12, Math.max(0, (t - slow - 0.6) * 4));
  const h = Math.floor(hour) % 24;
  const timeLabel = `${((h + 11) % 12) + 1}:00 ${h >= 12 && h < 24 ? "PM" : "AM"}`;

  return (
    <div className="relative h-full">
      <div style={{ opacity: intro }} className="absolute inset-0 flex flex-col justify-center">
        <h3 style={fadeUp(t, 0.15, 0.7)} className="text-[2.5em] font-bold leading-[1.08] @xl:text-[3.2em]">
          Leads aren't lost to bad ads.
        </h3>
        <h3 style={fadeUp(t, 2.0, 0.7)} className="text-[2.5em] font-bold leading-[1.08] @xl:text-[3.2em]">
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">They're lost in the gaps.</span>
        </h3>
      </div>

      <div style={{ opacity: p(t, slow - 0.3, 0.4) }} className="absolute inset-0 flex flex-col justify-center">
        <Eyebrow t={t} at={slow - 0.2}>Where leads leak</Eyebrow>
        <div className="mt-[0.9em] grid gap-[0.7em] @xl:grid-cols-3 @xl:gap-[1em]">
          <Panel style={fadeUp(t, slow, 0.5)} className="@xl:min-h-[11em]">
            <div className="flex items-center gap-[0.6em]">
              <Icon icon={Clock} tone="red" />
              <p className="text-[1.05em] font-semibold text-foreground">Slow reply</p>
            </div>
            <p className="mt-[0.6em] font-mono text-[1.4em] font-semibold text-foreground @xl:text-[1.9em]">{timeLabel}</p>
            <Tag tone="bad" style={pop(t, slow + 3.6)}>
              Booked someone else
            </Tag>
          </Panel>
          <Panel style={fadeUp(t, silence, 0.5)} className="@xl:min-h-[11em]">
            <div className="flex items-center gap-[0.6em]">
              <Icon icon={MessageSquare} tone="red" />
              <p className="text-[1.05em] font-semibold text-foreground">One try, then silence</p>
            </div>
            <p className="mt-[0.6em] w-fit rounded-[0.8em] rounded-bl-[0.2em] bg-hover px-[0.7em] py-[0.35em] text-[0.85em]">
              Hi! Thanks for reaching out…
            </p>
            <Tag tone="bad" style={pop(t, silence + 1.2)}>
              No follow-up
            </Tag>
          </Panel>
          <Panel style={fadeUp(t, noshow, 0.5)} className="@xl:min-h-[11em]">
            <div className="flex items-center gap-[0.6em]">
              <Icon icon={CalendarX} tone="red" />
              <p className="text-[1.05em] font-semibold text-foreground">No-show</p>
            </div>
            <p
              className="mt-[0.6em] text-[1em] font-medium text-foreground decoration-destructive decoration-2"
              style={{ textDecorationLine: t > noshow + 1.2 ? "line-through" : "none" }}
            >
              Discovery call · 2:00 PM
            </p>
            <Tag tone="bad" style={pop(t, noshow + 1.4)}>
              Never showed up
            </Tag>
          </Panel>
        </div>
      </div>
    </div>
  );
}

function System({ t }: SceneProps) {
  const ads = rel("ads", "system");
  const funnel = rel("funnel", "system");
  const fu = rel("followup", "system");
  const nodes = [
    { label: "Meta Ads", sub: "The right people", icon: Megaphone, at: ads },
    { label: "Funnel", sub: "Clicks → leads", icon: LayoutTemplate, at: funnel },
    { label: "Follow-up", sub: "Automatic", icon: Zap, at: fu },
  ];
  const checks = [
    { label: "Replied right away", at: fu + 1.3 },
    { label: "Call booked", at: fu + 2.6 },
    { label: "Reminders sent", at: fu + 3.7 },
  ];
  return (
    <div className="flex h-full flex-col justify-center">
      <Eyebrow t={t}>The fix</Eyebrow>
      <h3 style={fadeUp(t, 0.3, 0.7)} className="mt-[0.3em] text-[2.3em] font-bold leading-[1.08] @xl:text-[2.8em]">
        One <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">connected</span> system.
      </h3>

      <div className="mt-[1.1em] flex flex-col gap-[0.5em] @xl:flex-row @xl:items-stretch @xl:gap-0">
        {nodes.map((n, i) => (
          <div key={n.label} className="flex flex-col @xl:flex-1 @xl:flex-row @xl:items-center">
            <Panel style={pop(t, n.at - 0.1)} active={t >= n.at && t < (nodes[i + 1]?.at ?? 99)} className="flex items-center gap-[0.7em] @xl:flex-1">
              <Icon icon={n.icon} tone={i === 2 ? "cyan" : "blue"} />
              <div>
                <p className="text-[1.05em] font-semibold text-foreground">{n.label}</p>
                <p className="text-[0.8em] text-muted-foreground">{n.sub}</p>
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

function Paths({ t }: SceneProps) {
  const home = rel("home", "paths");
  const slots = Array.from({ length: 10 });
  const jobs = ["Roof inspection", "AC tune-up", "Kitchen estimate"];
  return (
    <div className="flex h-full flex-col justify-center">
      <Eyebrow t={t}>Built for how you sell</Eyebrow>
      <div className="mt-[0.9em] grid gap-[0.8em] @xl:grid-cols-2 @xl:gap-[1.2em]">
        <Panel style={fadeUp(t, 0.2, 0.6)} active={t < home}>
          <div className="flex items-center gap-[0.6em]">
            <Icon icon={GraduationCap} />
            <p className="font-mono text-[0.75em] uppercase tracking-[0.14em] text-primary">Coaches & online programs</p>
          </div>
          <p className="mt-[0.6em] text-[1.35em] font-bold leading-tight text-foreground @xl:text-[1.6em]">More discovery calls</p>
          <div className="mt-[0.7em] grid grid-cols-5 gap-[0.35em]">
            {slots.map((_, i) => {
              const v = p(t, 0.7 + i * 0.22, 0.3);
              return (
                <span
                  key={i}
                  className="flex h-[1.6em] items-center justify-center rounded-[0.4em] border border-border"
                  style={{ background: `color-mix(in oklch, var(--primary) ${v * 70}%, transparent)` }}
                >
                  {v > 0.6 && <CalendarCheck className="size-[0.9em] text-primary-foreground" aria-hidden="true" />}
                </span>
              );
            })}
          </div>
        </Panel>
        <Panel style={fadeUp(t, home, 0.6)} active={t >= home}>
          <div className="flex items-center gap-[0.6em]">
            <Icon icon={Hammer} tone="cyan" />
            <p className="font-mono text-[0.75em] uppercase tracking-[0.14em] text-accent-foreground">Home service businesses</p>
          </div>
          <p className="mt-[0.6em] text-[1.35em] font-bold leading-tight text-foreground @xl:text-[1.6em]">More booked estimates</p>
          <ul className="mt-[0.7em] space-y-[0.35em]">
            {jobs.map((j, i) => (
              <li key={j} style={fadeUp(t, home + 0.6 + i * 0.5, 0.4)} className="flex items-center justify-between rounded-[0.5em] bg-hover px-[0.7em] py-[0.3em] text-[0.85em]">
                <span className="text-foreground">{j}</span>
                <Tag tone="good">Booked</Tag>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </div>
  );
}

function Promise14({ t }: SceneProps) {
  const contract = rel("contract", "promise");
  const fill = p(t, 0.6, 4.2);
  const day = Math.max(1, Math.round(fill * 14));
  const checks = [
    { label: "Built in your own accounts", at: 1.3 },
    { label: "Tested end to end", at: 2.9 },
    { label: "Free until it's live", at: 5.4 },
    { label: "No long-term contract", at: contract },
  ];
  return (
    <div className="flex h-full flex-col justify-center">
      <Eyebrow t={t}>The promise</Eyebrow>
      <h3 style={fadeUp(t, 0.25, 0.7)} className="mt-[0.3em] text-[2.4em] font-bold leading-[1.05] @xl:text-[3em]">
        Live in <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">14 days.</span>
      </h3>
      <Panel style={fadeUp(t, 0.5, 0.5)} className="mt-[1em]">
        <div className="flex items-center justify-between text-[0.85em]">
          <span className="font-mono text-muted-foreground">Day {day} of 14</span>
          <span style={pop(t, 4.7)}>
            <Tag tone="good">Live</Tag>
          </span>
        </div>
        <div className="mt-[0.5em] h-[0.55em] overflow-hidden rounded-full bg-hover">
          <div className="h-full rounded-full bg-gradient-to-r from-primary to-accent" style={{ width: `${fill * 100}%` }} />
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
  return (
    <div className="flex h-full flex-col items-center justify-center text-center">
      <div style={pop(t, 0.15, 0.6)} className="text-[0.9em]">
        <BrandLogo size="lg" />
      </div>
      <h3 style={fadeUp(t, 0.6, 0.7)} className="mt-[0.9em] max-w-[16em] text-[2.1em] font-bold leading-[1.1] @xl:text-[2.6em]">
        Find out where your leads are{" "}
        <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">leaking.</span>
      </h3>
      <p style={fadeUp(t, 1.4, 0.6)} className="mt-[0.6em] text-[1em] text-muted-foreground">
        Free 30-minute growth call · no obligation
      </p>
    </div>
  );
}

/* ---------- B-roll ---------- */

/** Stock footage (Pixabay Content License, see docs/licenses.md), one shot every ~2.5–4 s, timed to the voice. */
const SHOTS: { src: string; start: number; end: number }[] = [
  { src: "01-hook", start: 0, end: 4.0 },
  { src: "02-night", start: 4.0, end: 8.25 },
  { src: "03-clock", start: 8.25, end: 11.2 },
  { src: "04-sleep", start: 11.2, end: 14.85 },
  { src: "05-phone", start: 14.85, end: 17.35 },
  { src: "06-empty-room", start: 17.35, end: 20.25 },
  { src: "07-system", start: 20.25, end: 23.85 },
  { src: "08-scroll", start: 23.85, end: 26.35 },
  { src: "09-funnel", start: 26.35, end: 28.85 },
  { src: "10-reply", start: 28.85, end: 31.5 },
  { src: "11-booking", start: 31.5, end: 34.4 },
  { src: "12-coaching", start: 34.4, end: 37.5 },
  { src: "13-contractor", start: 37.5, end: 40.85 },
  { src: "14-plan", start: 40.85, end: 44.6 },
  { src: "15-build", start: 44.6, end: 48.45 },
  { src: "16-handshake", start: 48.45, end: 50.0 },
  { src: "17-calm", start: 50.0, end: TOTAL + 1 },
];

function BRoll({ t, playing, started }: { t: number; playing: boolean; started: boolean }) {
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
      {!started && <img src="/broll/01-hook.jpg" alt="" className="absolute inset-0 size-full object-cover" />}
      {SHOTS.map((s, i) => {
        const near = i >= active - 1 && i <= active + 2;
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
            src={started && near ? `/broll/${s.src}.mp4` : undefined}
            muted
            playsInline
            preload={started && near ? "auto" : "none"}
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
const SNAP_WORDS = ["gaps.", "tomorrow,", "never", "connected", "right", "discovery", "estimates.", "14", "free", "contract.", "leaking."];
const SNAPS = SNAP_WORDS.map((sw) => ALL_WORDS.find((w) => w.w.toLowerCase() === sw)?.s).filter((v): v is number => v != null);

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
  const reduce = useReducedMotion();

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
    try {
      await a.play();
    } catch {
      return;
    }
    setPlaying(true);
    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(tick);
  }, [ended, tick]);

  const pause = useCallback(() => {
    audioRef.current?.pause();
    setPlaying(false);
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
    <div>
      <div className="@container">
        <div
          className="glass relative aspect-[4/5] overflow-hidden rounded-3xl text-[3.5cqw] @xl:aspect-video @xl:text-[1.5cqw]"
          role="img"
          aria-label="Animated explainer: how LeadBoosterX turns leads into booked calls. A transcript is available below."
        >
          {/* camera: B-roll and scene move together */}
          <div className="absolute inset-0 origin-center will-change-transform" style={{ transform: `scale(${started && !reduce ? cameraScale(shownT) : 1})` }}>
            <BRoll t={shownT} playing={playing} started={started} />
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
                Book a Free Growth Call
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

          {!started && (
            <button
              type="button"
              onClick={play}
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
          className={cx("inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-primary to-accent text-primary-foreground", focusRing)}
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
        src="/audio/explainer-mix.mp3"
        preload="metadata"
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
