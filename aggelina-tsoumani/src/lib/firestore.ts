import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "./firebase";
import type { Artwork, Event } from "@/types";

// ─── Artworks ────────────────────────────────────────────────────────────────

export async function getArtworks(): Promise<Artwork[]> {
  const snap = await getDocs(collection(db, "artworks"));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Artwork));
}

export async function addArtwork(
  data: Omit<Artwork, "id">
): Promise<string> {
  const ref = await addDoc(collection(db, "artworks"), {
    ...data,
    createdAt: serverTimestamp(),
  });
  return ref.id;
}

export async function updateArtwork(
  id: string,
  data: Partial<Omit<Artwork, "id">>
): Promise<void> {
  await updateDoc(doc(db, "artworks", id), {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

export async function deleteArtwork(id: string): Promise<void> {
  await deleteDoc(doc(db, "artworks", id));
}

// ─── Events ──────────────────────────────────────────────────────────────────

export async function getEvents(): Promise<Event[]> {
  const snap = await getDocs(collection(db, "events"));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Event));
}

export async function addEvent(data: Omit<Event, "id">): Promise<string> {
  const ref = await addDoc(collection(db, "events"), {
    ...data,
    createdAt: serverTimestamp(),
  });
  return ref.id;
}

export async function updateEvent(
  id: string,
  data: Partial<Omit<Event, "id">>
): Promise<void> {
  await updateDoc(doc(db, "events", id), {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

export async function deleteEvent(id: string): Promise<void> {
  await deleteDoc(doc(db, "events", id));
}
