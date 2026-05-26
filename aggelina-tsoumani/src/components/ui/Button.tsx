"use client";

import type { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

const variants: Record<Variant, string> = {
  primary:
    "bg-accent-linocut-red text-white hover:opacity-90 disabled:opacity-50",
  outline:
    "border-2 border-ink-primary text-ink-primary hover:bg-ink-primary hover:text-white disabled:opacity-50",
  ghost: "text-ink-primary hover:opacity-60 disabled:opacity-50",
};

const sizes: Record<Size, string> = {
  sm: "px-5 py-2 text-[13px] rounded-full",
  md: "px-8 py-3 text-[14px] rounded-full",
  lg: "px-8 py-4 text-[16px] rounded-[30px]",
};

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center font-medium transition-all ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
