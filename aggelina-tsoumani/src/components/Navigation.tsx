"use client";

import { useEffect } from "react";
import { motion } from "motion/react";
import { ArrowRight, Menu, X } from "lucide-react";

interface NavigationProps {
  isScrolled: boolean;
  isMenuOpen: boolean;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  scrollToSection: (id: string) => void;
  setShowAdmin: React.Dispatch<React.SetStateAction<boolean>>;
}

export function Navigation({
  isScrolled,
  isMenuOpen,
  setIsMenuOpen,
  scrollToSection,
  setShowAdmin,
}: NavigationProps) {
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === "A") {
        setShowAdmin((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [setShowAdmin]);

  const navLinks = ["shop", "workshops", "about"] as const;

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-surface-warm-white/95 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-8xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-24">
          <div className="flex items-center gap-12">
            <div>
              <div className="text-[15px] font-medium text-ink-primary">
                Aggelina Tsoumani
              </div>
              <div className="text-[10px] tracking-[0.15em] uppercase opacity-60 text-text-muted">
                Printmaker · Artist · Educator
              </div>
            </div>
            <div className="hidden lg:flex gap-8 text-[14px] font-medium">
              {navLinks.map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className="relative group"
                >
                  <span className="text-ink-primary capitalize">{section}</span>
                  <span className="absolute bottom-0 left-0 w-0 h-px bg-ink-primary group-hover:w-full transition-all duration-300" />
                </button>
              ))}
            </div>
          </div>

          <div className="hidden lg:flex gap-8 text-[14px] font-medium items-center">
            <button
              onClick={() => scrollToSection("contact")}
              className="relative group"
            >
              <span className="text-ink-primary">Contact</span>
              <span className="absolute bottom-0 left-0 w-0 h-px bg-ink-primary group-hover:w-full transition-all duration-300" />
            </button>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:opacity-60 transition-opacity text-ink-primary"
            >
              Instagram <ArrowRight className="w-3 h-3" />
            </a>
          </div>

          <button
            className="lg:hidden text-ink-primary"
            onClick={() => setIsMenuOpen((prev) => !prev)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:hidden absolute top-24 left-0 right-0 bg-surface-warm-white/[0.98] backdrop-blur-lg border-t border-ink-primary/10 shadow-2xl"
        >
          <div className="flex flex-col gap-6 px-6 py-8">
            {[...navLinks, "contact"].map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className="text-left text-[15px] font-medium text-ink-primary capitalize"
              >
                {section}
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}
