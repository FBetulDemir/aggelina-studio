"use client";

interface FooterSectionProps {
  scrollToSection: (id: string) => void;
}

export function FooterSection({ scrollToSection: _scrollToSection }: FooterSectionProps) {
  return (
    <footer className="py-12 px-6 lg:px-12 border-t border-ink-primary/10">
      <div className="max-w-8xl mx-auto text-center">
        <p className="text-[14px] text-surface-clay-mid">
          © 2025 Aggelina Tsoumani. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
