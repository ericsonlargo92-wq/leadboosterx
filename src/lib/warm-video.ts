/**
 * Media warm-up helpers. A player starts with preload="none"; once its play button has been on screen for a moment it
 * moves to "metadata" (header and first frames, which also warms the CDN edge), and to "auto" when the pointer
 * reaches the button, it gets keyboard focus or a touch starts. The same element then plays, so nothing downloads twice.
 */
export type Preload = "none" | "metadata" | "auto";

/** Visitor asked to save data, or is on 2G: never buffer ahead. */
export function lowData() {
  if (typeof navigator === "undefined") return false;
  const c = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
  return !!c && (c.saveData === true || /(^|-)2g$/.test(c.effectiveType ?? ""));
}

/** Only ever raise the preload level, never lower it. */
export function raise(current: Preload, next: Preload): Preload {
  const rank = { none: 0, metadata: 1, auto: 2 } as const;
  if (next === "auto" && lowData()) next = "metadata";
  return rank[next] > rank[current] ? next : current;
}
