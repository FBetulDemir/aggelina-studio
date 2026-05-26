"use client";

import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2 } from "lucide-react";
import {
  getArtworks,
  addArtwork,
  updateArtwork,
  deleteArtwork,
} from "@/lib/firestore";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { ToggleSwitch } from "@/components/ui/ToggleSwitch";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import type { Artwork } from "@/types";

const CATEGORIES = ["Printmaking", "Ceramics", "Painting", "Other"];

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

type ArtworkForm = Omit<Artwork, "id">;

const empty: ArtworkForm = {
  title: "",
  medium: "",
  year: new Date().getFullYear().toString(),
  category: "Printmaking",
  price: 0,
  image: "",
  inStock: true,
  description: "",
};

export default function ArtworksAdminPage() {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [editing, setEditing] = useState<Artwork | null>(null);
  const [form, setForm] = useState<ArtworkForm>(empty);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      setArtworks(await getArtworks());
    } catch {
      setError("Could not load artworks. Check Firestore connection.");
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

  const openEdit = (a: Artwork) => {
    setEditing(a);
    setForm({
      title: a.title,
      medium: a.medium,
      year: a.year,
      category: a.category,
      price: a.price,
      image: a.image,
      inStock: a.inStock,
      description: a.description ?? "",
    });
    setModalOpen(true);
  };

  const handleSave = async () => {
    if (!form.title.trim()) return;
    setError("");
    setSaving(true);
    try {
      if (editing) {
        await updateArtwork(editing.id, form);
      } else {
        await addArtwork(form);
      }
      await load();
      setModalOpen(false);
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      setError(`Save failed: ${msg}`);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setError("");
    try {
      await deleteArtwork(deleteId);
      setDeleteId(null);
      await load();
    } catch {
      setError("Delete failed.");
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-[30px] font-serif text-ink-primary">Artworks</h1>
          <p className="text-[13px] text-text-muted mt-0.5">
            {artworks.length} items in collection
          </p>
        </div>
        <Button onClick={openAdd} className="flex items-center gap-1.5">
          <Plus className="w-4 h-4" /> Add Artwork
        </Button>
      </div>

      {error && (
        <div className="mb-6 px-4 py-3 bg-red-50 text-red-600 text-[13px] rounded-lg">
          {error}
        </div>
      )}

      {/* Grid */}
      {loading ? (
        <div className="text-text-muted text-center py-24 text-[14px]">
          Loading…
        </div>
      ) : artworks.length === 0 ? (
        <div className="text-center py-24 border-2 border-dashed border-ink-primary/15 rounded-2xl">
          <p className="text-text-muted text-[15px] mb-4">
            No artworks yet. Add your first piece.
          </p>
          <Button variant="outline" onClick={openAdd}>
            Add Artwork
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
          {artworks.map((a) => (
            <div
              key={a.id}
              className="group bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="relative aspect-[3/4] bg-surface-off-white">
                <ImageWithFallback
                  src={a.image}
                  alt={a.title}
                  className="w-full h-full object-cover"
                />
                {!a.inStock && (
                  <div className="absolute top-2 left-2 bg-black/70 text-white text-[10px] font-medium px-2 py-0.5 rounded">
                    SOLD
                  </div>
                )}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button
                    onClick={() => openEdit(a)}
                    className="p-2 bg-white rounded-full hover:bg-gray-50 transition-colors"
                    title="Edit"
                  >
                    <Edit2 className="w-3.5 h-3.5 text-ink-primary" />
                  </button>
                  <button
                    onClick={() => setDeleteId(a.id)}
                    className="p-2 bg-white rounded-full hover:bg-red-50 transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-3.5 h-3.5 text-red-500" />
                  </button>
                </div>
              </div>
              <div className="p-3">
                <p className="text-[13px] font-medium text-ink-primary truncate">
                  {a.title}
                </p>
                <p className="text-[11px] text-text-muted mt-0.5">
                  {a.category} · €{a.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Modal */}
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editing ? "Edit Artwork" : "Add Artwork"}
      >
        <div className="space-y-4">
          <Field label="Title">
            <input
              value={form.title}
              onChange={(e) =>
                setForm((f) => ({ ...f, title: e.target.value }))
              }
              className={INPUT}
              placeholder="e.g. Geometric Dreams"
            />
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Medium">
              <input
                value={form.medium}
                onChange={(e) =>
                  setForm((f) => ({ ...f, medium: e.target.value }))
                }
                className={INPUT}
                placeholder="e.g. Linocut Print"
              />
            </Field>
            <Field label="Year">
              <input
                value={form.year}
                onChange={(e) =>
                  setForm((f) => ({ ...f, year: e.target.value }))
                }
                className={INPUT}
                placeholder="2025"
              />
            </Field>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Category">
              <select
                value={form.category}
                onChange={(e) =>
                  setForm((f) => ({ ...f, category: e.target.value }))
                }
                className={INPUT}
              >
                {CATEGORIES.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
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

          <Field label="Image URL">
            <input
              value={form.image}
              onChange={(e) =>
                setForm((f) => ({ ...f, image: e.target.value }))
              }
              className={INPUT}
              placeholder="https://…"
            />
          </Field>

          {form.image && (
            <div className="h-36 rounded-lg overflow-hidden bg-surface-off-white">
              <ImageWithFallback
                src={form.image}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <Field label="Description">
            <textarea
              value={form.description}
              onChange={(e) =>
                setForm((f) => ({ ...f, description: e.target.value }))
              }
              className={`${INPUT} h-24 resize-none`}
              placeholder="Short description shown on the artwork page…"
            />
          </Field>

          <ToggleSwitch
            checked={form.inStock}
            onChange={(v) => setForm((f) => ({ ...f, inStock: v }))}
            label="Available for purchase"
          />

          <div className="flex gap-3 pt-2">
            <Button
              onClick={handleSave}
              disabled={saving || !form.title.trim()}
              className="flex-1 py-3 rounded-lg"
            >
              {saving ? "Saving…" : editing ? "Save Changes" : "Add Artwork"}
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
        title="Delete Artwork"
      >
        <p className="text-text-muted text-[15px] mb-6">
          This will permanently remove the artwork. This cannot be undone.
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
