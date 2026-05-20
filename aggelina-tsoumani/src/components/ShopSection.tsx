"use client";

import { motion } from "motion/react";
import { useInView } from "react-intersection-observer";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { initialArtworks } from "@/lib/data";
import type { Artwork } from "@/types";

interface ShopSectionProps {
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
  filters: string[];
  filteredItems: Artwork[];
}

export function ShopSection({
  activeFilter,
  setActiveFilter,
  filters,
  filteredItems,
}: ShopSectionProps) {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  const getCategoryCount = (category: string) => {
    if (category === "All") return initialArtworks.length;
    return initialArtworks.filter((art) => art.category === category).length;
  };

  return (
    <section id="shop" ref={ref} className="py-20 px-6 lg:px-12">
      <div className="max-w-8xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          {/* Category Navigation Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-8 mb-12 pb-8 border-b border-ink-primary/10">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`text-center transition-all duration-300 ${
                  activeFilter === filter
                    ? "opacity-100"
                    : "opacity-50 hover:opacity-75"
                }`}
              >
                <div
                  className={`text-[20px] lg:text-[24px] mb-1 font-serif text-ink-primary ${
                    activeFilter === filter ? "font-medium" : "font-normal"
                  }`}
                >
                  {filter === "All" ? "All Works" : filter}
                </div>
                <div className="text-[14px] text-surface-clay-mid">
                  ({getCategoryCount(filter)})
                </div>
              </button>
            ))}
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
            <button className="px-5 py-2 border border-ink-primary/30 rounded-full text-[13px] font-medium text-ink-primary transition-all hover:bg-ink-primary hover:text-white hover:border-ink-primary">
              All Items
            </button>
            <button className="px-5 py-2 border border-ink-primary/30 rounded-full text-[13px] font-medium text-ink-primary transition-all hover:bg-ink-primary hover:text-white hover:border-ink-primary">
              Available Only
            </button>
          </div>

          {/* Artwork Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 + index * 0.05 }}
                className="group relative overflow-hidden"
              >
                <div className="relative overflow-hidden aspect-[3/4] bg-surface-off-white mb-4">
                  <ImageWithFallback
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {!item.inStock && (
                    <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                      <span className="text-white text-[16px] font-medium tracking-wide">
                        SOLD
                      </span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <div className="text-white w-full">
                      <h3 className="text-[16px] mb-1 font-serif">
                        {item.title}
                      </h3>
                      <p className="text-[12px] opacity-90">{item.medium}</p>
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <h3 className="text-[15px] mb-1 opacity-70 hover:opacity-100 transition-opacity text-ink-primary">
                    {item.title}
                  </h3>
                  <p className="text-[18px] font-medium text-accent-linocut-red font-serif">
                    €{item.price}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Load More */}
          <motion.div
            className="text-center mt-16"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.8 }}
          >
            <button className="px-8 py-3 border-2 border-ink-primary rounded-full text-[14px] font-medium text-ink-primary transition-all hover:bg-ink-primary hover:text-white">
              View More Works
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
