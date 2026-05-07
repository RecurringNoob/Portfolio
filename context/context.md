# Portfolio Project — Context & Source of Truth

> **Purpose**: This document is the single source of truth for the Netflix-style developer portfolio application. Reference it whenever adding features, debugging, or onboarding to the codebase.

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Tech Stack](#2-tech-stack)
3. [Project Structure](#3-project-structure)
4. [Data Layer](#4-data-layer)
5. [State Management](#5-state-management)
6. [Routing](#6-routing)
7. [Pages](#7-pages)
8. [Components](#8-components)
9. [Data Schema](#9-data-schema)
10. [Design System](#10-design-system)
11. [Features & Interactions](#11-features--interactions)
12. [Extension Points](#12-extension-points)

---

## 1. Project Overview

A Netflix-inspired developer portfolio where each "profile" (Personal, Fullstack, AI/ML) represents a domain of work. Visitors pick a profile, browse projects in horizontal rows, click into a project detail page, and can optionally open a terminal for a CLI-style portfolio experience.

**Core UX metaphor**: Netflix content browsing → Developer project browsing.

| Netflix concept | Portfolio equivalent |
|---|---|
| Profile (who's watching?) | Domain focus (Personal / Fullstack / AI/ML) |
| Show / Movie | Project |
| Row / Category | Section (e.g. "Work Experience", "Education") |
| Hero billboard | Featured project or personal intro |
| Detail modal / page | Project detail page |
| Search | Navbar inline search or Terminal `search` command |
| My List | Bookmarked projects (localStorage) |

---

## 2. Tech Stack

| Layer | Technology |
|---|---|
| Framework | React (Vite) |
| Routing | React Router v6 |
| Animation | Framer Motion |
| Styling | Tailwind CSS v4 |
| Icons | Lucide React |
| State | React Context API |
| Persistence | `localStorage` (selected profile, My List) |
| Chat backend | REST API hosted on Render (cold-start aware) |

---

## 3. Project Structure

```
src/
├── main.jsx                    # App entry point — mounts BrowserRouter + ProfileProvider
├── App.jsx                     # Route definitions and auth-guard logic
├── index.css                   # Global styles
│
├── contexts/
│   └── ProfileContext.jsx      # Global profile state (selected profile, select, logout)
│
├── data/
│   └── profiles.js             # ⭐ Single source of truth for ALL content
│
├── service/
│   └── chatService.js          # Chat API client — pingServer(), sendChatMessage()
│
├── pages/
│   ├── ProfileSelectionPage.jsx  # "Who's watching?" screen — fires server wake-up ping
│   ├── BrowsePage.jsx            # Main browsing page (billboard + rows)
│   ├── ProjectPage.jsx           # Full-screen project detail page
│   ├── ProjectsPage.jsx          # All-projects grid with search + category filter
│   ├── NewPopularPage.jsx        # Projects ranked by recency + match score
│   └── MyListPage.jsx            # Bookmarked/saved projects (localStorage)
│
└── components/
    ├── common/
    │   ├── Billboard.jsx         # Hero header on BrowsePage
    │   └── Row.jsx               # Horizontal scrolling project row
    ├── layout/
    │   └── Navbar.jsx            # Top navigation bar (mobile drawer + inline search)
    ├── Terminal.jsx              # Full-screen CLI terminal overlay
    ├── Chatbot.jsx               # Floating chat assistant (bottom-right)
    ├── ProjectModal.jsx          # Quick-view modal (from Row click)
    ├── ProjectDetails.jsx        # Alternative detail component (not currently routed)
    └── ProfileSelection.jsx      # Alternative profile selection component (not currently routed)
```

> **Note**: `ProjectDetails.jsx` and `ProfileSelection.jsx` are earlier versions not used in active routing. The live app uses `ProjectPage.jsx` and `ProfileSelectionPage.jsx` instead.

---

## 4. Data Layer

### `src/data/profiles.js`

**This is the only file you need to edit to change portfolio content.**

It exports a `profiles` object with three top-level keys: `personal`, `fullstack`, and `aiml`. Every piece of content — projects, hero banners, section titles — lives here.

```js
export const profiles = {
  personal: { ... },
  fullstack: { ... },
  aiml: { ... }
}
```

This file is imported by:
- `ProfileContext.jsx` — to look up a profile by key
- `Terminal.jsx` — to power all CLI commands (`projects`, `search`, `stats`, etc.)
- `ProfileSelectionPage.jsx` — to render the profile icons
- `ProfileSelection.jsx` (legacy, unused in routing)

### `src/service/chatService.js`

Handles all communication with the chat backend. Two named exports:

**`pingServer()`** — fires a fire-and-forget `GET /health` to wake the Render server. Errors are intentionally swallowed. Called once on `ProfileSelectionPage` mount so the server has maximum warm-up time before the user reaches the chat widget.

**`sendChatMessage(message)`** — posts to `POST /chat`. Returns a structured result object and never throws:

| Result shape | Meaning |
|---|---|
| `{ ok: true, reply: string }` | Success — display the reply |
| `{ ok: false, coldStart: true }` | HTTP 503 — server still booting, trigger retry loop |
| `{ ok: false, coldStart: false, error: string }` | Other failure — display error message |

Persists `sessionId` at module level across calls so multi-turn conversation context is maintained without React state.

---

## 5. State Management

### `ProfileContext` (`src/contexts/ProfileContext.jsx`)

A React Context that holds the currently selected profile. Wraps the entire app in `main.jsx`.

**Exported values:**

| Value | Type | Description |
|---|---|---|
| `profile` | `object \| null` | Full profile data object from `profiles.js` |
| `profileKey` | `string \| null` | Key string: `"personal"`, `"fullstack"`, or `"aiml"` |
| `selectProfile(key)` | `function` | Sets profile by key, saves to `localStorage` |
| `logout()` | `function` | Clears profile from state and `localStorage` |

**Persistence**: On mount, `ProfileContext` reads `localStorage` key `selectedProfile`. If a valid saved key exists, it auto-selects that profile so users don't have to re-pick on every visit.

**Consumed by**: `App.jsx`, `BrowsePage.jsx`, `ProjectPage.jsx`, `Navbar.jsx`, `Chatbot.jsx`, `ProjectsPage.jsx`, `NewPopularPage.jsx`, `MyListPage.jsx`

### `useMyList` hook (`src/pages/MyListPage.jsx`)

A custom hook that manages bookmarked project IDs in `localStorage` using a **module-level singleton store** (`_list`, `_listeners`, `_save`, `_notify`). All `useMyList()` instances across the app share the same list and re-render together when it changes — no extra Context needed.

**localStorage key**: `portfolio_my_list`

**Exported values:**

| Value | Type | Description |
|---|---|---|
| `list` | `string[]` | Array of saved project `id` strings |
| `add(id)` | `function` | Adds a project ID to the list |
| `remove(id)` | `function` | Removes a project ID from the list |
| `toggle(id)` | `function` | Adds if not present, removes if present |
| `has(id)` | `function` | Returns `true` if project ID is in the list |

**`MyListButton` component** (also exported from `MyListPage.jsx`): a drop-in `+` / `✓` toggle button for any project card. Accepts `projectId` and optional `size` (default `20`) props. Uses `e.stopPropagation()` so clicking never triggers card navigation. Already wired into `ProjectsPage`, `MyListPage`, and `ProjectModal`.

---

## 6. Routing

Defined in `App.jsx`. Uses React Router v6 `<Routes>` / `<Route>`.

| Path | Component | Access |
|---|---|---|
| `/select-profile` | `ProfileSelectionPage` | Always accessible |
| `/browse` | `BrowsePage` | Requires profile selected |
| `/project/:id` | `ProjectPage` | Requires profile selected |
| `/projects` | `ProjectsPage` | Requires profile selected |
| `/new-popular` | `NewPopularPage` | Requires profile selected |
| `/my-list` | `MyListPage` | Requires profile selected |
| `*` (catch-all) | Redirect | → `/select-profile` if no profile, otherwise → `/browse` |

**Auth guard pattern**: If `profile` is `null`, any unknown route redirects to `/select-profile`. Once a profile is selected, the root `/` redirects to `/browse`.

---

## 7. Pages

### `ProfileSelectionPage.jsx`

The "Who's watching?" screen. Displays three profile cards (Personal, Fullstack, AI/ML) as large coloured icon tiles.

- **Fires `pingServer()` on mount** — the earliest point in the user journey, giving the Render backend 30–60 seconds to boot before the user reaches the chat widget
- Clicking a tile calls `selectProfile(key)` then navigates to `/browse`
- "Manage Profiles" calls `logout()` then navigates to `/select-profile`
- Icon mappings: `personal → User`, `fullstack → Code`, `aiml → Brain`
- Framer Motion entrance animation and hover/tap scaling

---

### `BrowsePage.jsx`

The main content browsing screen. Composed of:

1. `<Terminal>` — conditionally rendered as a full-screen overlay
2. `<Chatbot>` — always rendered (floating button)
3. `<Navbar>` — receives `profile.color` and `onTerminal` handler
4. `<Billboard>` — receives `profile.hero`
5. `<main>` — maps over `profile.sections`, rendering a `<Row>` for each
6. `<ProjectModal>` — rendered when `selectedProject` state is non-null

**Key state:** `selectedProject` (modal), `isTerminalOpen` (terminal overlay)

**Keyboard shortcut**: `Ctrl + `` ` `` ` toggles the terminal.

---

### `ProjectPage.jsx`

Full-screen project detail page at `/project/:id`.

**Layout:** hero image, title, metadata, action buttons → content grid (description + milestones left, tech/role/difficulty/tags right) → "More Like This" grid.

---

### `ProjectsPage.jsx`

All-projects grid at `/projects`.

- Reads `?search=` query param on load (set by Navbar search) — `search` is derived directly from `useSearchParams`, never mirrored in separate state
- URL stays in sync as user types (shareable links)
- Category filter pills, animated grid, `MyListButton` on each card (hover-reveal, top-right)

---

### `NewPopularPage.jsx`

Ranked project view at `/new-popular`. Sorted by `year` descending then match score. Top 3 as spotlight cards with watermark rank numbers; rest as a compact ranked list.

---

### `MyListPage.jsx`

Bookmarked projects at `/my-list`. Grid with hover-reveal `BookmarkX` remove button, animated removal, empty state CTA. Exports `useMyList` and `MyListButton`.

---

## 8. Components

### `Billboard.jsx` (`components/common/`)

Hero banner at the top of `BrowsePage`.

**Props:** `hero` — object from `profile.hero`

> **Note**: "Resume" and "About Me" buttons are currently non-functional placeholders.

---

### `Row.jsx` (`components/common/`)

Horizontally scrollable row of project cards.

**Props:** `title`, `projects`, `onSelect` (optional callback)

Chevron buttons on hover, `whileHover` scale on cards.

---

### `Navbar.jsx` (`components/layout/`)

**Props:** `profileColor`, `onTerminal`

**Desktop behaviour:**
- Transparent gradient → fixed opaque after 50px scroll
- Nav links with animated active underline (`layoutId`)
- Inline search expands to 220px; `Enter` → `/projects?search=<query>`
- Bell with red pulse dot; Terminal icon with keyboard hint
- Profile avatar → dropdown (Viewing as / Switch Profile / Sign Out)

**Mobile behaviour:**
- `Menu` hamburger opens spring-animated slide-in drawer (`z-70`)
- Drawer contains: logo, profile badge, search input, nav links with icons + active dot, footer actions (Terminal, Switch Profile, Sign Out)
- Body scroll locks while drawer is open
- Drawer closes on route change or `Escape`
- Terminal icon hidden from main bar on mobile (accessible via drawer)

---

### `Terminal.jsx`

Full-screen CLI overlay. `onClose` prop to dismiss.

**Available commands:** `help`, `about`, `skills`, `projects`, `project <id>`, `work`, `education`, `resume`, `download`, `contact`, `search <term>`, `stats`, `clear`, `gui`, `random` (script), `techstack` (script).

---

### `Chatbot.jsx`

Floating chat assistant (bottom-right).

**State:** `isOpen`, `messages`, `input`, `isTyping`, `serverState` (`'idle' | 'warming'`)

**Cold-start flow:**
1. User sends a message → `attemptSend(msg, false, deps)` called
2. If response is `{ ok: false, coldStart: true }` (HTTP 503): `serverState` → `'warming'`, amber status bubble shown, `setInterval` retries every 5 s
3. On success: interval cleared, reply posted, `serverState` → `'idle'`
4. Input, chips, and send button disabled during `'warming'`; header dot turns yellow with spinning loader

**Architecture:** `attemptSend` is a **plain module-level `async` function** (not a hook, not inside the component). It receives all setters and refs via a `deps` argument. This avoids stale closures, ref-during-render violations, and `useCallback` hoisting issues — the `setInterval` callback calls it with the same `deps` object directly.

> `pingServer()` lives in `ProfileSelectionPage.jsx`, not here. See §7.

---

### `ProjectModal.jsx`

Quick-view modal from Row card clicks.

**Props:** `project`, `onClose`

Shows hero image, metadata, description, tech stack, role. Action row: "View Project" button, `MyListButton`, ThumbsUp (cosmetic).

---

### `ProjectDetails.jsx` / `ProfileSelection.jsx` (legacy, not routed)

Superseded by `ProjectPage.jsx` and `ProfileSelectionPage.jsx` respectively.

---

## 9. Data Schema

Full schema for `src/data/profiles.js`:

```json
{
  "personal": {
    "name": "string",
    "icon": "string (optional)",
    "color": "string — Tailwind bg class, e.g. 'bg-blue-600'",
    "hero": {
      "title": "string",
      "description": "string",
      "image": "string — URL",
      "match": "string — e.g. '97% Match'",
      "year": "string — e.g. '2024'",
      "rating": "string — e.g. 'HD'",
      "duration": "string — e.g. '5 yrs exp'"
    },
    "sections": [
      {
        "title": "string",
        "projects": [
          {
            "id": "string — globally unique, used in /project/:id",
            "title": "string",
            "description": "string",
            "category": "string — e.g. 'Web App'",
            "image": "string — URL",
            "technologies": ["string"],
            "match": "string",
            "year": "string",
            "rating": "string",
            "duration": "string",
            "role": "string",
            "difficulty": "string",
            "tags": ["string"],
            "links": { "demo": "string", "code": "string" },
            "features": [
              { "title": "string", "duration": "string", "desc": "string" }
            ]
          }
        ]
      }
    ]
  },
  "fullstack": { "...same structure..." },
  "aiml": { "...same structure..." }
}
```

**Rules:** `id` globally unique (convention: `p-work-1`, `fs-ecommerce-2`, `ai-nlp-3`). `color` must be a valid Tailwind bg class. `features` is optional. `links` default to `"#"` if omitted.

---

## 10. Design System

### Colors

| Token | Value | Usage |
|---|---|---|
| Background | `#141414` | Page background |
| Surface | `#181818` | Modal, card backgrounds |
| Surface-2 | `#2f2f2f` | Related project cards |
| Surface-3 | `#333` | Hover state for feature rows |
| Accent Red | `#E50914` | Logo, selection highlight, notification dot |
| Accent Green | `#46d369` | Match %, terminal prompt, chatbot online dot |
| Accent Emerald | `emerald-400` | Navbar icons |
| Accent Yellow | `yellow-400` | Chatbot warming/cold-start state |
| Border | `#404040` | Section dividers |

### Typography

- All text: `font-sans`
- Terminal: `font-mono`
- Hero titles: `font-black tracking-tighter uppercase`
- Section headings: `text-xl font-bold`

### Tailwind v4 class conventions

Always use canonical Tailwind v4 names:

| ❌ Avoid | ✅ Use |
|---|---|
| `bg-gradient-to-b` | `bg-linear-to-b` |
| `h-[2px]` | `h-0.5` |
| `border-white/[0.08]` | `border-white/8` |
| `z-[60]` | `z-60` |

### Spacing

- Page horizontal padding: `px-4 md:px-12`
- Row vertical margin: `my-10`
- Billboard overlap: `-mt-32 relative z-10` on `<main>`

### Z-index layers

| Layer | z-index | Element |
|---|---|---|
| Page content | default | Billboard, Rows |
| Navbar | `z-50` | Fixed navbar |
| Row cards hover | `z-50` | Card on hover |
| Project Modal | `z-[200]` | Modal overlay |
| Terminal | `z-50` | Full-screen overlay |
| Chatbot launcher | `z-40` | Floating button |
| Chatbot panel | `z-50` | Chat window |
| Mobile drawer backdrop | `z-60` | Dark overlay |
| Mobile drawer panel | `z-70` | Slide-in nav panel |

---

## 11. Features & Interactions

### Profile persistence
Saved to `localStorage` key `selectedProfile`. Restored on mount by `ProfileContext`.

### My List persistence
Saved to `localStorage` key `portfolio_my_list`. Managed by `useMyList` singleton. `MyListButton` is wired into `ProjectsPage` cards, `ProjectModal`, and `MyListPage`.

### Server wake-up (cold-start mitigation)
`pingServer()` fires on `ProfileSelectionPage` mount — the earliest point in the journey. Gives the Render backend up to 60 seconds of warm-up before the user opens chat.

### Chat cold-start retry loop
HTTP 503 from `/chat` → `serverState = 'warming'` → amber status bubble → 5-second retry loop via `setInterval` → on 200 OK, clear timer, post reply, `serverState = 'idle'`.

### Navbar inline search
`Enter` in the expanded search input navigates to `/projects?search=<query>`. `ProjectsPage` reads the param and pre-filters the grid. Works from both desktop inline search and mobile drawer search.

### Mobile navigation
`Menu` hamburger (visible `< lg`) opens a spring-animated drawer. Full nav links, search, and account actions available. Body scroll locked while open.

### Terminal shortcut
`Ctrl + `` ` `` ` toggles terminal on `BrowsePage`.

### Row scrolling
Chevron buttons on hover, `scrollbar-hide` overflow.

### Project navigation flow

```
ProfileSelectionPage
  → /browse (BrowsePage)
      Row card → ProjectModal (MyListButton available)
        "View Project" → /project/:id (ProjectPage)
          "Back to Browse" → /browse

/projects  → card → /project/:id
/new-popular → card → /project/:id
/my-list → card → /project/:id
```

---

## 12. Extension Points

### Adding a new profile
1. Add key to `src/data/profiles.js` (see §9 schema)
2. Add entry to `profiles` object in `ProfileSelectionPage.jsx` with icon mapping
3. Add filter/nav option if needed

### Adding a new terminal command
```js
// In Terminal.jsx, commands object:
mycommand: (args) => ['Line 1', 'Line 2']
```

### Adding a new custom script
Add to `customScripts` in `Terminal.jsx`. Receives `sandbox` with `profiles`, `Math`, `Date`, `JSON`, `console`, `args`.

### Changing chat AI model or system prompt
Update the backend — `chatService.js` is model-agnostic. To adjust retry timing, change `RETRY_INTERVAL_MS` in `Chatbot.jsx`.

### Wiring up Billboard buttons
- "Resume" → `links.resume` in the hero object or trigger PDF download
- "About Me" → `/about` route or modal

### Adding `MyListButton` to a new component
```jsx
import { MyListButton } from '../pages/MyListPage.jsx';
<MyListButton projectId={project.id} size={20} />
```
No props wiring needed — the singleton hook handles state automatically.

### Adding a new page
1. Create in `src/pages/`
2. Add `<Route>` in `App.jsx` (auth-guard if profile-scoped)
3. Add entry to `navLinks` array in `Navbar.jsx` with `label`, `path`, `icon`