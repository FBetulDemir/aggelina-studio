"use client";

import { useState, useEffect } from "react";
import { CustomCursor } from "./CustomCursor";
import { Navigation } from "./Navigation";
import { ArtisticBanner } from "./ArtisticBanner";
import { HeroSection } from "./HeroSection";
import { ShopSection } from "./ShopSection";
import { WorkshopsSection } from "./WorkshopsSection";
import { AboutSection } from "./AboutSection";
import { ContactSection } from "./ContactSection";
import { FooterSection } from "./FooterSection";
import { AdminPanel } from "./AdminPanel";
import { initialArtworks, initialEvents } from "@/lib/data";
import type { Artwork, Event } from "@/types";

export function PageClient() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [artworks, setArtworks] = useState<Artwork[]>(initialArtworks);
  const [events, setEvents] = useState<Event[]>(initialEvents);

  const filters = ["All", "Printmaking", "Ceramics", "Painting"];

  const filteredItems =
    activeFilter === "All"
      ? artworks
      : artworks.filter((item) => item.category === activeFilter);

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-surface-warm-white">
      <CustomCursor />

      {showAdmin && (
        <AdminPanel
          artworks={artworks}
          setArtworks={setArtworks}
          events={events}
          setEvents={setEvents}
          onClose={() => setShowAdmin(false)}
        />
      )}

      <Navigation
        isScrolled={isScrolled}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        scrollToSection={scrollToSection}
        setShowAdmin={setShowAdmin}
      />
      <ArtisticBanner scrollToSection={scrollToSection} />
      <HeroSection scrollToSection={scrollToSection} />
      <ShopSection
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        filters={filters}
        filteredItems={filteredItems}
      />
      <WorkshopsSection events={events} />
      <AboutSection />
      <ContactSection />
      <FooterSection scrollToSection={scrollToSection} />
    </div>
  );
}
