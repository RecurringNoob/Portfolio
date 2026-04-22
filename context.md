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
├── pages/
│   ├── ProfileSelectionPage.jsx  # "Who's watching?" screen
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
    │   └── Navbar.jsx            # Top navigation bar
    ├── Terminal.jsx              # Full-screen CLI terminal overlay
    ├── Chatbot.jsx               # Floating chat assistant (bottom-right)
    ├── ProjectModal.jsx          # Quick-view modal (from Row click)
    ├── ProjectDetails.jsx        # Alternative detail component (not currently routed)
    └── ProfileSelection.jsx      # Alternative profile selection component (not currently routed)
```

> **Note**: `ProjectDetails.jsx` and `ProfileSelection.jsx` are earlier versions that are not currently used in the active routing. The live app uses `ProjectPage.jsx` and `ProfileSelectionPage.jsx` instead.

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

A lightweight custom hook exported from `MyListPage.jsx` that manages the user's saved/bookmarked project IDs in `localStorage`.

**localStorage key**: `portfolio_my_list`

**Exported values:**

| Value | Type | Description |
|---|---|---|
| `list` | `string[]` | Array of saved project `id` strings |
| `add(id)` | `function` | Adds a project ID to the list |
| `remove(id)` | `function` | Removes a project ID from the list |
| `toggle(id)` | `function` | Adds if not present, removes if present |
| `has(id)` | `function` | Returns `true` if project ID is in the list |

**`MyListButton` component** (also exported from `MyListPage.jsx`): a drop-in `+` / `✓` toggle button that can be placed on any project card. Accepts a `projectId` prop and an optional `size` prop (default `20`).

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

**Auth guard pattern**: If `profile` is `null` (no profile selected), any unknown route redirects to `/select-profile`. Once a profile is selected, the root `/` redirects to `/browse`.

---

## 7. Pages

### `ProfileSelectionPage.jsx`

The "Who's watching?" screen. Displays three profile cards (Personal, Fullstack, AI/ML) as large coloured icon tiles.

- Clicking a tile calls `selectProfile(key)` from context, then navigates to `/browse`
- "Manage Profiles" button calls `logout()` and reloads the page
- Profiles are hardcoded locally in this file (not imported from `profiles.js`) with icon mappings: `personal → User`, `fullstack → Code`, `aiml → Brain`
- Uses Framer Motion for entrance animation and hover/tap scaling

---

### `BrowsePage.jsx`

The main content browsing screen. Composed of:

1. `<Terminal>` — conditionally rendered as a full-screen overlay
2. `<Chatbot>` — always rendered (floating button)
3. `<Navbar>` — receives `profile.color` and `onTerminal` handler
4. `<Billboard>` — receives `profile.hero`
5. `<main>` — maps over `profile.sections`, rendering a `<Row>` for each
6. `<ProjectModal>` — rendered when `selectedProject` state is non-null

**Key state:**
- `selectedProject` — the project object currently shown in the modal (or `null`)
- `isTerminalOpen` — boolean controlling Terminal visibility

**Keyboard shortcut**: `Ctrl + `` ` `` ` toggles the terminal.

Row clicks call `setSelectedProject(project)`, opening the modal. The modal's "Play" button navigates to `/project/:id`.

---

### `ProjectPage.jsx`

Full-screen project detail page. Accessed via `/project/:id`.

**Data flow:**
1. Reads `:id` from URL params via `useParams()`
2. Reads `profile` from context
3. Searches `profile.sections[].projects` for a project with matching `id`
4. Also finds `relatedProjects` — other projects in the same section

**Layout sections:**
- Fixed "Back to Browse" button (top-left)
- Hero: full-bleed image with gradient overlays, title, metadata, action buttons (Live Demo, Source Code, Plus, ThumbsUp)
- Content grid (2/3 + 1/3):
  - Left: description + "Key Milestones" (features list, styled like Netflix episodes)
  - Right: Tech Stack, Role, Difficulty, Tags
- "More Like This" grid (up to 4 related projects)

If the project is not found, renders a "not found" message with a back link.

---

### `ProjectsPage.jsx` *(new)*

A full grid view of all projects in the active profile. Accessed via `/projects`.

**Features:**
- Live text search across title, description, and technologies
- Category filter pills (derived dynamically from `project.category` values)
- Animated grid using `AnimatePresence` + `motion.div` with staggered entrance
- Empty state with "Clear filters" CTA
- Each card shows thumbnail, title, year, category badge, tech stack on hover, and match badge
- Clicking a card navigates to `/project/:id`

---

### `NewPopularPage.jsx` *(new)*

A ranked view of projects sorted by recency (`year` descending) then match score. Accessed via `/new-popular`.

**Layout:**
- Top 3 projects rendered as large spotlight cards with a large watermark rank number (1, 2, 3) and a "Top Rated" badge on #1
- Remaining projects rendered as a compact ranked list (rank number, thumbnail, title, description snippet, match %, year)
- Framer Motion entrance animations (cards slide up, list items slide in from left)

---

### `MyListPage.jsx` *(new)*

Displays projects the user has bookmarked. Accessed via `/my-list`. Persists via `localStorage` key `portfolio_my_list`.

**Features:**
- Grid of saved project cards with a hover-reveal "Remove" (`BookmarkX`) button
- Empty state with a "Browse Projects" CTA
- Animated card removal via `AnimatePresence` `layout` prop
- Exports `useMyList` hook and `MyListButton` component for use elsewhere (see §5)

---

## 8. Components

### `Billboard.jsx` (`components/common/`)

The hero banner at the top of `BrowsePage`.

**Props:**
- `hero` — object from `profile.hero` (see schema below)

Renders: full-bleed image, two gradient overlays (bottom-fade + left-fade), title, metadata row (match %, year, rating, duration), description, and two buttons ("Resume" and "About Me").

> **Note**: The "Resume" and "About Me" buttons are currently non-functional placeholders.

---

### `Row.jsx` (`components/common/`)

A horizontally scrollable row of project cards.

**Props:**
- `title` — section heading string
- `projects` — array of project objects
- `onSelect` — optional callback; if provided, clicking a card calls `onSelect(project)` instead of navigating

**Behaviour:**
- Left/right chevron buttons appear on row hover (`group-hover/row`)
- Clicking a card: if `onSelect` is provided → calls it (used by `BrowsePage` to open modal); otherwise → navigates to `/project/:id`
- Card hover: Framer Motion `whileHover` scale 1.1 + image overlay with title

---

### `Navbar.jsx` (`components/layout/`)

Top navigation bar.

**Props:**
- `profileColor` — CSS class string (e.g. `"bg-red-600"`) for the avatar circle
- `onTerminal` — callback to toggle the Terminal overlay

**Behaviour:**
- Becomes fixed/opaque (with `backdrop-blur`) after scrolling past 50px; transparent gradient while at top
- A spacer `<div>` (class `h-16`) prevents content jump when fixed
- "PORTFOLIO" logo navigates to `/browse` with `whileHover` scale animation
- **Nav links** (desktop): Home, Projects, New & Popular, My List — active link has a sliding `layoutId` underline via Framer Motion; non-active links show a hover underline via CSS scale transition
- **Mobile**: Collapses links into a "Browse ›" label
- **Inline search**: Clicking the Search icon expands an animated input field in place (width animates from 0 → 220px). `Enter` navigates to `/browse?search=<query>`. `Escape` or the `×` button closes it
- **Bell icon**: Shows a red pulse dot (clears on click)
- **Terminal icon**: Calls `onTerminal`; tooltip shows `Ctrl + \``
- **Profile avatar**: Shows profile name label and `ChevronDown` caret on desktop hover; clicking opens a dropdown menu
- **Profile dropdown** (click): "Viewing as [Profile Name]" header, "Switch Profile" (navigates to `/select-profile` without logging out), "Sign Out" (calls `logout()` + navigates to `/select-profile`); closes on outside click via `mousedown` listener; animated with `AnimatePresence`
- Framer Motion `whileHover` / `whileTap` on all icon buttons

> **Removed**: The "Kids" label that previously appeared between Bell and Terminal icons has been removed.

---

### `Terminal.jsx`

A full-screen CLI terminal overlay. Two versions exist; the live one is imported into `BrowsePage`.

**Props:**
- `onClose` — callback to close the terminal

**Architecture:**
- `history` state: array of `{ type: 'input' | 'output' | 'error', text: string }`
- `input` state: current line being typed
- `commands` object: maps command names to functions returning `string[]`
- `customScripts` object: extensible script registry (`random`, `techstack` built in)
- `executeSafeScript(fn, args)` — runs a custom script in a sandboxed object (no `window`, no `document`; only `Math`, `Date`, `JSON`, `console.log`, and a deep copy of `profiles`)

**Available commands:**

| Command | Description |
|---|---|
| `help` | Lists all commands + custom scripts |
| `about` | Shows bio text |
| `skills` | Lists all unique technologies across all profiles |
| `projects` | Lists all projects across all profiles |
| `project <id>` | Shows full detail for a specific project by ID |
| `work` | Shows sections with "work" or "experience" in the title |
| `education` | Shows sections with "education" in the title |
| `resume` | Shows a structured summary of all profiles/sections |
| `download` | Triggers download of `/resume.pdf` |
| `contact` | Shows contact info |
| `search <term>` | Full-text search across title, description, technologies, tags |
| `stats` | Shows aggregate statistics (total projects, technologies, etc.) |
| `clear` | Clears the terminal history |
| `gui` | Calls `onClose()` to return to GUI mode |
| `random` | (custom script) Shows a random project |
| `techstack` | (custom script) Shows top 10 technologies by frequency |

**Keyboard**: `Enter` submits, auto-scrolls to bottom after each command, input auto-focuses on mount.

---

### `Chatbot.jsx`

A floating chat assistant, fixed to the bottom-right corner.

**State:**
- `isOpen` — boolean, toggles the chat window
- `messages` — array of `{ text, sender: 'user' | 'bot' }`
- `input` — current user input

**Response logic** (`getBotReply`): keyword-matching against the user message:
- `"project"` → lists project titles from active profile
- `"skill"` / `"tech"` → lists unique technologies from active profile
- `"contact"` / `"email"` → returns hardcoded contact info placeholder
- `"about"` → returns bio blurb
- Default → generic fallback message

> **Note**: Contact info is currently a placeholder (`your.email@example.com`). Update `getBotReply` to use real data from `profiles.js` or a separate config.

---

### `ProjectModal.jsx`

A quick-view modal triggered by clicking a project card in a `Row`.

**Props:**
- `project` — project object or `null`
- `onClose` — callback to clear selection

**Behaviour:**
- Uses `AnimatePresence` + `motion.div` for fade/scale in-out animation
- Clicking the backdrop overlay calls `onClose`
- "Play" button navigates to `/project/:id` and calls `onClose`
- Shows: image hero, title, match/year/rating, description, tech stack, category, role

---

### `ProjectDetails.jsx` (legacy, not currently routed)

An earlier version of the project detail view designed to be used as a component (not a page). Accepts `project`, `onBack`, `relatedProjects`, and `onProjectSelect` as props. Functionality is now superseded by `ProjectPage.jsx`.

---

### `ProfileSelection.jsx` (legacy, not currently routed)

An earlier version of the profile selection screen used as a component. Superseded by `ProfileSelectionPage.jsx`.

---

## 9. Data Schema

Full schema for `src/data/profiles.js`:

```json
{
  "personal": {
    "name": "string — display name for the profile",
    "icon": "string — icon identifier (optional, used in legacy component)",
    "color": "string — Tailwind bg class, e.g. 'bg-blue-600'",
    "hero": {
      "title": "string — billboard headline",
      "description": "string — billboard subtitle / tagline",
      "image": "string — URL to hero image",
      "match": "string — e.g. '97% Match'",
      "year": "string — e.g. '2024'",
      "rating": "string — e.g. 'HD' or 'PG-13'",
      "duration": "string — e.g. '5 yrs exp'"
    },
    "sections": [
      {
        "title": "string — section heading shown in Row",
        "projects": [
          {
            "id": "string — unique across ALL profiles, used in URL /project/:id",
            "title": "string — project name",
            "description": "string — full description",
            "category": "string — e.g. 'Web App', 'AI/ML', 'Mobile'",
            "image": "string — URL to project thumbnail/hero image",
            "technologies": ["string"],
            "match": "string — e.g. '98% Match'",
            "year": "string — e.g. '2023'",
            "rating": "string — e.g. 'HD'",
            "duration": "string — e.g. '3 months'",
            "role": "string — e.g. 'Lead Developer'",
            "difficulty": "string — e.g. 'Advanced'",
            "tags": ["string"],
            "links": {
              "demo": "string — URL to live demo",
              "code": "string — URL to source code / GitHub"
            },
            "features": [
              {
                "title": "string — milestone/feature name",
                "duration": "string — e.g. 'Week 1-2'",
                "desc": "string — description of this milestone"
              }
            ]
          }
        ]
      }
    ]
  },
  "fullstack": { "...same structure as personal..." },
  "aiml": { "...same structure as personal..." }
}
```

**Important rules:**
- `id` must be **globally unique** across all profiles and sections. Convention: `p-work-1`, `fs-ecommerce-2`, `ai-nlp-3`, etc.
- `color` must be a valid Tailwind background utility class (e.g. `bg-red-600`).
- `features` is optional. If omitted or empty, the "Key Milestones" section is hidden in `ProjectPage`.
- `links.demo` and `links.code` default to `"#"` if not provided (handled in `ProjectPage`).

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
| Accent Green | `#46d369` | Match percentage, terminal prompt |
| Accent Emerald | `emerald-400` | Navbar icons |
| Border | `#404040` | Section dividers |

### Typography

- All text: `font-sans` (system sans-serif via Tailwind)
- Terminal: `font-mono`
- Hero titles: `font-black tracking-tighter uppercase`
- Section headings: `text-xl font-bold`

### Spacing conventions

- Page horizontal padding: `px-4 md:px-12` (mobile → desktop)
- Row vertical margin: `my-10`
- Billboard overlap: `BrowsePage` uses `-mt-32 relative z-10` on `<main>` to overlap the billboard

### Z-index layers

| Layer | z-index | Element |
|---|---|---|
| Page content | default | Billboard, Rows |
| Navbar | `z-50` | Navbar (when fixed) |
| Row cards hover | `z-50` (via `hover:z-50`) | Card on hover |
| Project Modal | `z-[200]` | Modal overlay |
| Terminal | `z-50` | Terminal overlay (full-screen) |
| Chatbot | `z-40` / `z-50` | Floating button / chat window |

---

## 11. Features & Interactions

### Profile persistence
Selected profile is saved to `localStorage` under key `selectedProfile`. On app load, `ProfileContext` restores it automatically, bypassing the selection screen.

### My List persistence
Bookmarked project IDs are saved to `localStorage` under key `portfolio_my_list`. Managed via the `useMyList` hook exported from `MyListPage.jsx`. The `MyListButton` component can be dropped onto any project card.

### Terminal shortcut
`Ctrl + `` ` `` ` toggles the terminal from anywhere on `BrowsePage`.

### Navbar inline search
Clicking the Search icon in the Navbar expands an animated inline input. Pressing `Enter` navigates to `/browse?search=<query>`. Pressing `Escape` or the `×` button collapses it.

### Row scrolling
Left/right arrow buttons appear on row hover and scroll by one viewport width. Overflow is hidden with `scrollbar-hide` (custom Tailwind utility).

### Project navigation flow
```
BrowsePage (Row card click)
  → ProjectModal (quick view)
    → "Play" button → /project/:id (ProjectPage)
      → "Back to Browse" → /browse

/projects (ProjectsPage)
  → card click → /project/:id (ProjectPage)

/new-popular (NewPopularPage)
  → card / row click → /project/:id (ProjectPage)

/my-list (MyListPage)
  → card click → /project/:id (ProjectPage)
```

### Mute toggle
`ProjectPage` has a mute/unmute button (VolumeX / Volume2 icon). Currently cosmetic — no actual video/audio is wired up.

---

## 12. Extension Points

### Adding a new profile
1. Add a new key to `src/data/profiles.js` following the schema in §9.
2. Add the profile to the local `profiles` object in `ProfileSelectionPage.jsx` with its icon mapping.
3. If needed, add icon to `ProfileSelection.jsx` (legacy component).

### Adding a new terminal command
In `Terminal.jsx`, add a new key to the `commands` object:
```js
mycommand: (args) => {
  return ['Line 1 of output', 'Line 2 of output'];
}
```

### Adding a new custom script
Add to the `customScripts` object in `Terminal.jsx`. The function receives a `sandbox` object with `profiles`, `Math`, `Date`, `JSON`, `console`, and `args`.

### Upgrading the Chatbot to use AI
Replace `getBotReply` in `Chatbot.jsx` with a call to the Anthropic API (or any LLM). Pass `profile` from context as part of the system prompt so the bot has full knowledge of the current profile's projects.

### Wiring up the Billboard buttons
In `Billboard.jsx`, the "Resume" and "About Me" buttons are inert. Connect them to:
- "Resume" → `links.resume` in the hero object, or trigger a PDF download
- "About Me" → a dedicated `/about` route or a modal

### Adding `MyListButton` to project cards
Import `MyListButton` from `pages/MyListPage.jsx` and drop it into any card component:
```jsx
import { MyListButton } from '../pages/MyListPage.jsx';
// Inside a card:
<MyListButton projectId={project.id} size={20} />
```

### Adding a new page
1. Create the page in `src/pages/`.
2. Add a `<Route>` in `App.jsx` (wrap with auth guard if needed).
3. Add a nav link entry to the `navLinks` array in `Navbar.jsx`.