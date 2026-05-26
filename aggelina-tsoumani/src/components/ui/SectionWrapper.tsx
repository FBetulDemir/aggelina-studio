import type { ReactNode } from "react";

type Bg = "warm-white" | "off-white" | "transparent";

const bgClass: Record<Bg, string> = {
  "warm-white": "bg-surface-warm-white",
  "off-white": "bg-surface-off-white",
  transparent: "",
};

interface SectionWrapperProps {
  id?: string;
  children: ReactNode;
  bg?: Bg;
  className?: string;
  innerClassName?: string;
}

export function SectionWrapper({
  id,
  children,
  bg = "transparent",
  className = "",
  innerClassName = "",
}: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={`py-24 lg:py-32 px-6 lg:px-12 ${bgClass[bg]} ${className}`}
    >
      <div className={`max-w-8xl mx-auto ${innerClassName}`}>{children}</div>
    </section>
  );
}
