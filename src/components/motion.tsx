import { createElement, useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

/**
 * Fades and lifts its children in the first time they scroll into view.
 *
 * Progressive: the server renders content fully visible. Only once the browser has run the tiny
 * `html.js` script in <head> does CSS hide `.reveal` elements until they enter the viewport, so the
 * page never waits on JavaScript to show text. No animation library: one shared IntersectionObserver.
 * Reduced-motion visitors get no movement (see styles.css).
 */
let observer: IntersectionObserver | null = null;
const callbacks = new WeakMap<Element, () => void>();

function observe(el: Element, onShow: () => void) {
  if (typeof IntersectionObserver === "undefined") return onShow();
  observer ??= new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          callbacks.get(e.target)?.();
          callbacks.delete(e.target);
          observer?.unobserve(e.target);
        }
      }
    },
    { rootMargin: "0px 0px -60px 0px" },
  );
  callbacks.set(el, onShow);
  observer.observe(el);
}

export function Reveal({
  children,
  delay = 0,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li" | "section";
}) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (ref.current) observe(ref.current, () => setShown(true));
  }, []);

  const style: CSSProperties | undefined = delay ? { transitionDelay: `${delay}s` } : undefined;
  return createElement(as, { ref, className: ["reveal", shown && "in", className].filter(Boolean).join(" "), style }, children);
}

/** Stagger step for list items: <Reveal as="li" delay={i * STAGGER}>. */
export const STAGGER = 0.08;

/** True when the visitor asked their system to reduce motion. */
export function useReducedMotion() {
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
