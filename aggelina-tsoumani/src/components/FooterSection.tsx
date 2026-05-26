"use client";

import Link from "next/link";
import { LINKS } from "@/lib/links";

export function FooterSection() {
  return (
    <footer className="py-12 px-6 lg:px-12 border-t border-ink-primary/10">
      <div className="max-w-8xl mx-auto flex flex-col items-center gap-4 text-center">
        <p className="text-[14px] text-surface-clay-mid">
          © 2025 Aggelina Tsoumani. All rights reserved.
        </p>
        <Link
          href={LINKS.admin}
          className="text-[11px] text-surface-clay-mid/40 hover:text-surface-clay-mid transition-colors duration-300"
        >
          Admin
        </Link>
      </div>
    </footer>
  );
}
