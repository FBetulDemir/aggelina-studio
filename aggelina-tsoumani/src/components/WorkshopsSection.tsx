"use client";

import { useInView } from "react-intersection-observer";
import { motion } from "motion/react";
import { SectionWrapper } from "./ui/SectionWrapper";
import { SectionHeading } from "./ui/SectionHeading";
import { Button } from "./ui/Button";
import type { Event } from "@/types";

interface WorkshopsSectionProps {
  events: Event[];
}

export function WorkshopsSection({ events }: WorkshopsSectionProps) {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });

  return (
    <SectionWrapper id="workshops" bg="off-white" className="ref-target">
      <div ref={ref}>
        <SectionHeading inView={inView} className="mb-16">
          Workshops &amp; Classes
        </SectionHeading>

        <div className="grid lg:grid-cols-2 gap-8">
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.2 * index }}
              className={`p-8 lg:p-10 rounded-lg shadow-lg bg-white ${
                event.isUpcoming
                  ? "border-2 border-accent-linocut-red"
                  : "opacity-70"
              }`}
            >
              <div
                className={`inline-block px-4 py-2 mb-6 text-[11px] tracking-[0.1em] uppercase font-medium text-white ${
                  event.isUpcoming
                    ? "bg-accent-deep-blue"
                    : "bg-surface-clay-mid"
                }`}
              >
                {event.date
                  ? new Date(event.date + "T00:00:00").toLocaleDateString(
                      "en-US",
                      { month: "short", day: "numeric", year: "numeric" }
                    )
                  : event.date}
              </div>

              <h3 className="text-[24px] lg:text-[28px] mb-3 leading-[1.2] font-serif text-ink-primary">
                {event.title}
              </h3>
              <p className="text-[14px] mb-2 uppercase tracking-wide text-surface-clay-mid">
                {event.time}
              </p>
              <p className="text-[14px] mb-6 text-surface-clay-mid">
                {event.location}
              </p>
              <p className="text-[17px] leading-[1.75] mb-6 text-text-muted">
                {event.description}
              </p>

              <div className="flex items-center justify-between">
                <span className="text-[32px] font-medium text-accent-linocut-red font-serif">
                  €{event.price}
                </span>
                {event.isUpcoming && (
                  <Button size="md" className="rounded-md">
                    Contact to Book
                  </Button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
