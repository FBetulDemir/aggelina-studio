"use client";

import { useInView } from "react-intersection-observer";
import { SectionWrapper } from "./ui/SectionWrapper";
import { AnimatedSection } from "./ui/AnimatedSection";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function AboutSection() {
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true });

  return (
    <SectionWrapper id="about">
      <div ref={ref} className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        <AnimatedSection inView={inView} direction="left">
          <h2 className="text-[48px] lg:text-[64px] mb-8 leading-[1.1] font-serif text-ink-primary">
            About Aggelina
          </h2>
          <p className="text-[18px] leading-[1.8] mb-6 text-text-muted">
            Printmaker and educator based in Gothenburg. I hold a Master&apos;s
            degree in Printmaking and have taught linocut, etching, and
            screenprinting to beginners and professionals since 2014.
          </p>
          <p className="text-[18px] leading-[1.8] text-text-muted">
            Member of the Greek Printmakers Association. Currently based at
            HDK-Valand, Gothenburg.
          </p>
        </AnimatedSection>

        <AnimatedSection
          inView={inView}
          direction="right"
          className="relative aspect-[3/4] overflow-hidden rounded-lg"
        >
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1768695205624-101b2893644a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900"
            alt="Artist at work"
            className="w-full h-full object-cover"
          />
        </AnimatedSection>
      </div>
    </SectionWrapper>
  );
}
