"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { X, Plus, Edit2, Trash2 } from "lucide-react";
import type { Artwork, Event } from "@/types";

interface AdminPanelProps {
  artworks: Artwork[];
  setArtworks: React.Dispatch<React.SetStateAction<Artwork[]>>;
  events: Event[];
  setEvents: React.Dispatch<React.SetStateAction<Event[]>>;
  onClose: () => void;
}

export function AdminPanel({
  artworks,
  setArtworks: _setArtworks,
  events,
  setEvents: _setEvents,
  onClose,
}: AdminPanelProps) {
  const [activeTab, setActiveTab] = useState<"artworks" | "events">("artworks");

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
      >
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-[28px] font-serif text-ink-primary">
            Admin Panel
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab("artworks")}
            className={`px-6 py-4 text-[14px] font-medium ${
              activeTab === "artworks"
                ? "border-b-2 border-accent-linocut-red text-accent-linocut-red"
                : "text-gray-600"
            }`}
          >
            Manage Artworks
          </button>
          <button
            onClick={() => setActiveTab("events")}
            className={`px-6 py-4 text-[14px] font-medium ${
              activeTab === "events"
                ? "border-b-2 border-accent-linocut-red text-accent-linocut-red"
                : "text-gray-600"
            }`}
          >
            Manage Events
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
          {activeTab === "artworks" ? (
            <div className="space-y-4">
              <button className="w-full py-3 bg-accent-linocut-red text-white rounded-lg flex items-center justify-center gap-2">
                <Plus className="w-5 h-5" /> Add New Artwork
              </button>
              {artworks.map((art) => (
                <div
                  key={art.id}
                  className="p-4 border border-gray-200 rounded-lg flex items-center justify-between"
                >
                  <div>
                    <h3 className="font-medium">{art.title}</h3>
                    <p className="text-sm text-gray-600">
                      {art.medium} · €{art.price} ·{" "}
                      {art.inStock ? "In Stock" : "Sold"}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 hover:bg-gray-100 rounded">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button className="p-2 hover:bg-red-100 rounded">
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              <button className="w-full py-3 bg-accent-linocut-red text-white rounded-lg flex items-center justify-center gap-2">
                <Plus className="w-5 h-5" /> Add New Event
              </button>
              {events.map((event) => (
                <div
                  key={event.id}
                  className="p-4 border border-gray-200 rounded-lg flex items-center justify-between"
                >
                  <div>
                    <h3 className="font-medium">{event.title}</h3>
                    <p className="text-sm text-gray-600">
                      {event.date} · €{event.price} ·{" "}
                      {event.isUpcoming ? "Upcoming" : "Past"}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 hover:bg-gray-100 rounded">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button className="p-2 hover:bg-red-100 rounded">
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
