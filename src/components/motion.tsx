import type { ReactNode } from "react";
import { motion } from "motion/react";

const ease = [0.22, 1, 0.36, 1] as const;

/** Fades and lifts its children in the first time they scroll into view. Respects reduced motion via MotionConfig. */
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
  const Tag = as === "li" ? motion.li : as === "section" ? motion.section : motion.div;
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease, delay }}
    >
      {children}
    </Tag>
  );
}

/** Staggers the reveal of direct list items: wrap each item in <Reveal as="li" delay={i * STAGGER}>. */
export const STAGGER = 0.08;
