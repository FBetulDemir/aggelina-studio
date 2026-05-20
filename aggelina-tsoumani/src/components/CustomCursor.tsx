"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const ringX = useSpring(cursorX, { stiffness: 200, damping: 20 });
  const ringY = useSpring(cursorY, { stiffness: 200, damping: 20 });

  const dotX = useSpring(cursorX, { stiffness: 600, damping: 30 });
  const dotY = useSpring(cursorY, { stiffness: 600, damping: 30 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };
    document.addEventListener("mousemove", move);
    return () => document.removeEventListener("mousemove", move);
  }, [cursorX, cursorY]);

  useEffect(() => {
    document.body.style.cursor = "none";
    return () => {
      document.body.style.cursor = "";
    };
  }, []);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-ink-primary/40 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2"
        style={{ x: ringX, y: ringY }}
      />
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-accent-linocut-red pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2"
        style={{ x: dotX, y: dotY }}
      />
    </>
  );
}
