# Aggelina Studio — Development Guidelines

## Check this file before writing any component or styling

---

## Git — commit after every change

After every code change, create a git commit before moving on. No batching multiple features into one commit.

```
git add <changed files>
git commit -m "short description of what changed"
```

- Commit message should describe **what** changed, not just "update"
- Never commit `.env.local` or any file containing secrets
- Stage specific files — never `git add .` blindly

---

## Reusable UI — always check `/src/components/ui/` first

| Component | Use for | Key props |
|---|---|---|
| `Button` | Every clickable button | `variant` (primary\|outline\|ghost), `size` (sm\|md\|lg) |
| `SectionWrapper` | Every page section | `id`, `bg` (warm-white\|off-white\|transparent) |
| `SectionHeading` | Every `<h2>` title | `inView`, `className` |
| `AnimatedSection` | Scroll-triggered fade-in | `inView`, `delay`, `direction` (up\|left\|right) |
| `Modal` | Overlay dialogs | `open`, `onClose`, `title` |
| `ToggleSwitch` | Boolean toggles | `checked`, `onChange`, `label` |

### Rules
1. **Never** inline `py-32 px-6 lg:px-12` + `max-w-8xl mx-auto` — use `SectionWrapper`
2. **Never** inline the `h2` font/size/animation — use `SectionHeading`
3. **Never** inline `motion.div` with `useInView` for a fade-in — use `AnimatedSection`
4. **Never** inline button classes — use `Button`

---

## Styling tokens — no hardcoded hex values

```
text-ink-primary          bg-surface-warm-white     bg-accent-linocut-red
text-text-muted           bg-surface-off-white      bg-accent-deep-blue
text-surface-clay-mid     bg-accent-ochre
font-serif  (Cormorant Garamond)
font-caveat (Caveat)
```

All defined in `tailwind.config.ts`. CSS variables live in `src/styles/globals.css`.
**Never use `@apply` with CSS-variable-based colors** — use plain CSS or tokens.

---

## Links — always use `src/lib/links.ts`

All external URLs and internal route strings must be defined in `src/lib/links.ts` and imported from there. **Never hardcode a URL or route string directly in a component.**

```ts
import { LINKS } from "@/lib/links";
// LINKS.email, LINKS.instagram, LINKS.admin
```

### Rules
1. **Never** write `href="mailto:..."`, `href="https://instagram.com"`, or `href="/admin"` inline in a component
2. **Always** add new links to `LINKS` in `src/lib/links.ts` first, then use them via the import
3. The admin route (`LINKS.admin`) is rendered as a subtle footer link — do not add it to the main navigation

---

## Firebase & Data

- Client SDK → `src/lib/firebase.ts` exports: `app`, `db`, `auth`
- Firestore CRUD → `src/lib/firestore.ts`: `getArtworks / addArtwork / updateArtwork / deleteArtwork`, same for events
- Collections: `artworks`, `events`
- Types: `src/types/index.ts` — IDs are **strings** (Firestore document IDs)
- Fallback mock data: `src/lib/data.ts` (used when Firestore collections are empty)

---

## Admin site

- Route: `/admin` — redirects to `/admin/artworks`
- Protected by Firebase Auth (Email/Password)
- Create admin user in **Firebase Console → Authentication → Add user**
- Artworks CRUD: `/admin/artworks`
- Events CRUD: `/admin/events`
- Public site fetches Firestore on mount, falls back to `src/lib/data.ts` if empty
