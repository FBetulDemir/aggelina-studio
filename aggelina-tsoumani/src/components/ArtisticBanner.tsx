"use client";

import { motion } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface ArtisticBannerProps {
  scrollToSection: (id: string) => void;
}

export function ArtisticBanner({ scrollToSection }: ArtisticBannerProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.5 }}
      className="relative mt-24 py-16 px-6 lg:px-12 overflow-hidden bg-[#FFF9E6]"
    >
      <div className="max-w-8xl mx-auto relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative z-10">
            <motion.h2
              className="mb-6 font-caveat text-[clamp(48px,8vw,96px)] leading-[1.1] text-ink-primary -rotate-2 [text-shadow:2px_2px_0px_rgba(0,0,0,0.1)]"
            >
              NEW WORK
              <br />
              AVAILABLE
            </motion.h2>
            <motion.p className="text-[18px] lg:text-[22px] mb-8 italic text-text-muted font-serif">
              Original prints &amp; ceramics
              <br />
              Handmade in Gothenburg
            </motion.p>
            <motion.button
              onClick={() => scrollToSection("shop")}
              whileHover={{ scale: 1.05, rotate: -2 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-accent-linocut-red text-white text-[16px] font-medium shadow-lg rounded-[30px] rotate-1"
            >
              Browse Collection →
            </motion.button>
          </div>

          <div className="relative">
            <motion.div
              animate={{ rotate: [0, 2, 0, -2, 0], y: [0, -10, 0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="relative"
            >
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1760292343796-5299717e6944?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600"
                alt="Colorful artwork"
                className="w-full h-auto rounded-lg shadow-2xl -rotate-3"
              />
            </motion.div>
            <motion.div
              className="absolute -top-4 -right-4 w-24 h-24 rounded-full opacity-60 bg-accent-ochre"
              animate={{ scale: [1, 1.1, 1], rotate: [0, 90, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            <motion.div
              className="absolute -bottom-6 -left-6 w-32 h-32 rounded-full opacity-40 bg-accent-deep-blue"
              animate={{ scale: [1, 1.2, 1], rotate: [0, -90, 0] }}
              transition={{ duration: 5, repeat: Infinity }}
            />
          </div>
        </div>
      </div>
    </motion.section>
  );
}
