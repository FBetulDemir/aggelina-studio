"use client";

import { useInView } from "react-intersection-observer";
import { Instagram } from "lucide-react";
import { SectionWrapper } from "./ui/SectionWrapper";
import { SectionHeading } from "./ui/SectionHeading";
import { AnimatedSection } from "./ui/AnimatedSection";
import { Button } from "./ui/Button";
import { LINKS } from "@/lib/links";

export function ContactSection() {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });

  return (
    <SectionWrapper id="contact" bg="off-white">
      <div ref={ref} className="max-w-[1000px] mx-auto text-center">
        <SectionHeading inView={inView} className="mb-6">
          Get in Touch
        </SectionHeading>

        <AnimatedSection inView={inView} delay={0.1}>
          <p className="text-[18px] mb-12 text-text-muted">
            Available for commissions, workshop collaborations, and exhibition
            inquiries.
          </p>

          <div className="flex flex-wrap justify-center gap-6">
            <a href={LINKS.email}>
              <Button size="lg">Email Me</Button>
            </a>
            <a
              href={LINKS.instagram}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline" size="lg" className="flex items-center gap-2">
                <Instagram className="w-5 h-5" /> Instagram
              </Button>
            </a>
          </div>
        </AnimatedSection>
      </div>
    </SectionWrapper>
  );
}
