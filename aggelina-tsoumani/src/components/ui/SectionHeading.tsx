"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

interface SectionHeadingProps {
  children: ReactNode;
  inView?: boolean;
  className?: string;
}

export function SectionHeading({
  children,
  inView = true,
  className = "",
}: SectionHeadingProps) {
  return (
    <motion.h2
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
      className={`text-[48px] lg:text-[64px] leading-[1.1] font-serif text-ink-primary ${className}`}
    >
      {children}
    </motion.h2>
  );
}
