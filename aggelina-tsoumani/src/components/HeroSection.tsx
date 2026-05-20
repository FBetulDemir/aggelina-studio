"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { ChevronDown } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface HeroSectionProps {
  scrollToSection: (id: string) => void;
}

export function HeroSection({ scrollToSection }: HeroSectionProps) {
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
      <motion.div className="absolute inset-0" style={{ y: heroY }}>
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1730134427007-31d9db377e52?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
          alt="Printmaking process"
          className="w-full h-full object-cover scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/20 to-transparent" />
      </motion.div>

      <motion.div
        className="relative z-10 text-center px-4"
        style={{ opacity: heroOpacity }}
      >
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="text-[56px] sm:text-[80px] lg:text-[100px] mb-4 leading-[0.95] font-serif !text-white tracking-[-0.02em]"
        >
          Handmade Art
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="text-[14px] tracking-[0.25em] uppercase text-white"
        >
          Prints · Ceramics · Workshops
        </motion.p>
      </motion.div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        onClick={() => scrollToSection("shop")}
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ChevronDown className="w-10 h-10 text-white" strokeWidth={1.5} />
        </motion.div>
      </motion.button>
    </section>
  );
}
