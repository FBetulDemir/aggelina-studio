"use client";

import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, MapPin, Clock } from "lucide-react";
import {
  getEvents,
  addEvent,
  updateEvent,
  deleteEvent,
} from "@/lib/firestore";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { ToggleSwitch } from "@/components/ui/ToggleSwitch";
import type { Event } from "@/types";

const INPUT =
  "w-full px-4 py-2.5 border border-gray-200 rounded-lg text-[14px] text-ink-primary focus:outline-none focus:border-ink-primary transition-colors bg-white";

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-[12px] font-medium text-ink-primary mb-1.5 uppercase tracking-wide">
        {label}
      </label>
      {children}
    </div>
  );
}

type EventForm = Omit<Event, "id">;

const empty: EventForm = {
  title: "",
  date: "",
  time: "",
  location: "",
  description: "",
  price: 0,
  isUpcoming: true,
};

export default function EventsAdminPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [editing, setEditing] = useState<Event | null>(null);
  const [form, setForm] = useState<EventForm>(empty);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      setEvents(await getEvents());
    } catch {
      setError("Could not load events. Check Firestore connection.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const openAdd = () => {
    setEditing(null);
    setForm(empty);
    setModalOpen(true);
  };

  const openEdit = (e: Event) => {
    setEditing(e);
    setForm({
      title: e.title,
      date: e.date,
      time: e.time,
      location: e.location,
      description: e.description,
      price: e.price,
      isUpcoming: e.isUpcoming,
    });
    setModalOpen(true);
  };

  const handleSave = async () => {
    if (!form.title.trim()) return;
    setError("");
    setSaving(true);
    try {
      if (editing) {
        await updateEvent(editing.id, form);
      } else {
        await addEvent(form);
      }
      await load();
      setModalOpen(false);
    } catch {
      setError("Save failed. Try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setError("");
    try {
      await deleteEvent(deleteId);
      setDeleteId(null);
      await load();
    } catch {
      setError("Delete failed.");
    }
  };

  const fmt = (date: string) => {
    if (!date) return "";
    return new Date(date + "T00:00:00").toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-[30px] font-serif text-ink-primary">Events</h1>
          <p className="text-[13px] text-text-muted mt-0.5">
            {events.filter((e) => e.isUpcoming).length} upcoming ·{" "}
            {events.length} total
          </p>
        </div>
        <Button onClick={openAdd} className="flex items-center gap-1.5">
          <Plus className="w-4 h-4" /> Add Event
        </Button>
      </div>

      {error && (
        <div className="mb-6 px-4 py-3 bg-red-50 text-red-600 text-[13px] rounded-lg">
          {error}
        </div>
      )}

      {/* List */}
      {loading ? (
        <div className="text-text-muted text-center py-24 text-[14px]">
          Loading…
        </div>
      ) : events.length === 0 ? (
        <div className="text-center py-24 border-2 border-dashed border-ink-primary/15 rounded-2xl">
          <p className="text-text-muted text-[15px] mb-4">
            No events yet. Add your first workshop.
          </p>
          <Button variant="outline" onClick={openAdd}>
            Add Event
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          {events
            .sort((a, b) => (a.date < b.date ? 1 : -1))
            .map((e) => (
              <div
                key={e.id}
                className={`bg-white rounded-xl border overflow-hidden ${
                  e.isUpcoming
                    ? "border-accent-linocut-red/30"
                    : "border-gray-100 opacity-70"
                }`}
              >
                <div className="flex items-start gap-4 p-5">
                  {/* Date badge */}
                  <div
                    className={`shrink-0 text-center px-3 py-2 rounded-lg text-white min-w-[56px] ${
                      e.isUpcoming
                        ? "bg-accent-deep-blue"
                        : "bg-surface-clay-mid"
                    }`}
                  >
                    <div className="text-[10px] uppercase tracking-wider">
                      {e.date
                        ? new Date(e.date + "T00:00:00").toLocaleDateString(
                            "en-US",
                            { month: "short" }
                          )
                        : "—"}
                    </div>
                    <div className="text-[20px] font-serif leading-none">
                      {e.date
                        ? new Date(e.date + "T00:00:00").getDate()
                        : "—"}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-[15px] font-medium text-ink-primary">
                          {e.title}
                        </h3>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1">
                          {e.time && (
                            <span className="flex items-center gap-1 text-[12px] text-text-muted">
                              <Clock className="w-3 h-3" />
                              {e.time}
                            </span>
                          )}
                          {e.location && (
                            <span className="flex items-center gap-1 text-[12px] text-text-muted">
                              <MapPin className="w-3 h-3" />
                              {e.location}
                            </span>
                          )}
                        </div>
                        {e.description && (
                          <p className="text-[12px] text-text-muted mt-1.5 line-clamp-2">
                            {e.description}
                          </p>
                        )}
                      </div>
                      <div className="shrink-0 text-right">
                        <div className="text-[18px] font-serif text-accent-linocut-red">
                          €{e.price}
                        </div>
                        <div
                          className={`text-[10px] font-medium mt-0.5 ${
                            e.isUpcoming ? "text-accent-deep-blue" : "text-text-muted"
                          }`}
                        >
                          {e.isUpcoming ? "UPCOMING" : "PAST"}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="shrink-0 flex gap-1">
                    <button
                      onClick={() => openEdit(e)}
                      className="p-2 hover:bg-surface-off-white rounded-lg transition-colors"
                      title="Edit"
                    >
                      <Edit2 className="w-4 h-4 text-text-muted" />
                    </button>
                    <button
                      onClick={() => setDeleteId(e.id)}
                      className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4 text-red-400" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}

      {/* Add / Edit Modal */}
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editing ? "Edit Event" : "Add Event"}
      >
        <div className="space-y-4">
          <Field label="Title">
            <input
              value={form.title}
              onChange={(e) =>
                setForm((f) => ({ ...f, title: e.target.value }))
              }
              className={INPUT}
              placeholder="e.g. Linoleum Printmaking Workshop"
            />
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Date">
              <input
                type="date"
                value={form.date}
                onChange={(e) =>
                  setForm((f) => ({ ...f, date: e.target.value }))
                }
                className={INPUT}
              />
            </Field>
            <Field label="Price (€)">
              <input
                type="number"
                min={0}
                value={form.price}
                onChange={(e) =>
                  setForm((f) => ({ ...f, price: Number(e.target.value) }))
                }
                className={INPUT}
              />
            </Field>
          </div>

          <Field label="Time">
            <input
              value={form.time}
              onChange={(e) =>
                setForm((f) => ({ ...f, time: e.target.value }))
              }
              className={INPUT}
              placeholder="e.g. Saturday · 14:00–16:30 CEST"
            />
          </Field>

          <Field label="Location">
            <input
              value={form.location}
              onChange={(e) =>
                setForm((f) => ({ ...f, location: e.target.value }))
              }
              className={INPUT}
              placeholder="e.g. Gothenburg"
            />
          </Field>

          <Field label="Description">
            <textarea
              value={form.description}
              onChange={(e) =>
                setForm((f) => ({ ...f, description: e.target.value }))
              }
              className={`${INPUT} h-28 resize-none`}
              placeholder="What participants will do and learn…"
            />
          </Field>

          <ToggleSwitch
            checked={form.isUpcoming}
            onChange={(v) => setForm((f) => ({ ...f, isUpcoming: v }))}
            label="Show as upcoming"
          />

          <div className="flex gap-3 pt-2">
            <Button
              onClick={handleSave}
              disabled={saving || !form.title.trim()}
              className="flex-1 py-3 rounded-lg"
            >
              {saving ? "Saving…" : editing ? "Save Changes" : "Add Event"}
            </Button>
            <Button
              variant="outline"
              onClick={() => setModalOpen(false)}
              className="flex-1 py-3 rounded-lg"
            >
              Cancel
            </Button>
          </div>
        </div>
      </Modal>

      {/* Delete Confirm Modal */}
      <Modal
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        title="Delete Event"
      >
        <p className="text-text-muted text-[15px] mb-6">
          This will permanently remove the event. This cannot be undone.
        </p>
        <div className="flex gap-3">
          <button
            onClick={handleDelete}
            className="flex-1 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg text-[14px] font-medium transition-colors"
          >
            Delete
          </button>
          <Button
            variant="outline"
            onClick={() => setDeleteId(null)}
            className="flex-1 py-3 rounded-lg"
          >
            Cancel
          </Button>
        </div>
      </Modal>
    </div>
  );
}
