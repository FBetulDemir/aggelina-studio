import type { Artwork, Event } from "@/types";

export const initialArtworks: Artwork[] = [
  {
    id: "1",
    title: "Geometric Dreams",
    medium: "Linocut Print",
    year: "2025",
    category: "Printmaking",
    price: 250,
    image:
      "https://images.unsplash.com/photo-1760292343796-5299717e6944?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    inStock: true,
    description: "A bold geometric composition carved by hand in linoleum.",
  },
  {
    id: "2",
    title: "Watercolor Abstract",
    medium: "Original Painting",
    year: "2025",
    category: "Painting",
    price: 450,
    image:
      "https://images.unsplash.com/photo-1760292343750-b476acc543b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    inStock: true,
    description: "Layers of translucent watercolor on cold-press paper.",
  },
  {
    id: "3",
    title: "Carving Process Study",
    medium: "Linocut",
    year: "2024",
    category: "Printmaking",
    price: 180,
    image:
      "https://images.unsplash.com/photo-1730134426941-1def6b725da3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    inStock: true,
    description: "An exploration of texture through relief carving.",
  },
  {
    id: "4",
    title: "Ceramic Vessel Set",
    medium: "Ceramics",
    year: "2024",
    category: "Ceramics",
    price: 320,
    image:
      "https://images.unsplash.com/photo-1740329362219-08c21cfe3dbc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    inStock: false,
    description: "Set of three hand-thrown vessels with ash glaze.",
  },
  {
    id: "5",
    title: "Relief Print Series",
    medium: "Printmaking",
    year: "2024",
    category: "Printmaking",
    price: 200,
    image:
      "https://images.unsplash.com/photo-1677094507131-f5f5abce1242?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    inStock: true,
    description: "Part of an ongoing series exploring natural forms.",
  },
  {
    id: "6",
    title: "Handcrafted Bowls",
    medium: "Ceramics",
    year: "2024",
    category: "Ceramics",
    price: 280,
    image:
      "https://images.unsplash.com/photo-1724709163217-833a8c96aba5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    inStock: true,
    description: "Functional bowls with a raw, handmade finish.",
  },
];

export const initialEvents: Event[] = [
  {
    id: "1",
    title: "Linoleum Printmaking Workshop",
    date: "2026-05-09",
    time: "Saturday · 14:15–16:45 CEST",
    location:
      "London Designmarket, Casino — Packhusplatsen 7, 41113 Göteborg",
    description:
      "Carve your own linocut using classical figure motifs. Explore the basics of relief printing — from cutting technique to inking and pressing.",
    price: 85,
    isUpcoming: true,
  },
  {
    id: "2",
    title: "Linocut Workshop",
    date: "2026-04-15",
    time: "Saturday · 14:00–16:30 CEST",
    location: "Gothenburg",
    description: "Past workshop recap available.",
    price: 85,
    isUpcoming: false,
  },
];
