"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

type Direction = "up" | "left" | "right" | "none";

const initial = {
  up: { opacity: 0, y: 40 },
  left: { opacity: 0, x: -40 },
  right: { opacity: 0, x: 40 },
  none: { opacity: 0 },
} satisfies Record<Direction, { opacity: number; x?: number; y?: number }>;

interface AnimatedSectionProps {
  children: ReactNode;
  inView?: boolean;
  delay?: number;
  direction?: Direction;
  className?: string;
}

export function AnimatedSection({
  children,
  inView = true,
  delay = 0,
  direction = "up",
  className = "",
}: AnimatedSectionProps) {
  return (
    <motion.div
      initial={initial[direction]}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.8, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
