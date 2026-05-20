"use client";

import { motion } from "motion/react";
import { useInView } from "react-intersection-observer";
import { Instagram } from "lucide-react";

export function ContactSection() {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });

  return (
    <section
      id="contact"
      ref={ref}
      className="py-32 px-6 lg:px-12 bg-surface-off-white"
    >
      <div className="max-w-[1000px] mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-[48px] lg:text-[64px] mb-6 leading-[1.1] font-serif text-ink-primary"
        >
          Get in Touch
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-[18px] mb-12 text-text-muted"
        >
          Available for commissions, workshop collaborations, and exhibition
          inquiries.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="flex flex-wrap justify-center gap-6"
        >
          <a
            href="mailto:hello@aggelinatsoumani.com"
            className="px-8 py-4 bg-accent-linocut-red text-white text-[16px] font-medium rounded-[30px]"
          >
            Email Me
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-8 py-4 border-2 border-ink-primary text-ink-primary text-[16px] font-medium rounded-[30px]"
          >
            <Instagram className="w-5 h-5" /> Instagram
          </a>
        </motion.div>
      </div>
    </section>
  );
}
