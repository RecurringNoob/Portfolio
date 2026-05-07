# Portfolio Project — Context & Source of Truth

> **Purpose**: This document is the single source of truth for the Netflix-style developer portfolio application. Reference it whenever adding features, debugging, or onboarding to the codebase.
>
> **Last updated**: Reflects the v4 profiles data layer, four-profile layout (Portfolio / Personal / Fullstack / AI/ML), PortfolioPage route, and all current component implementations.

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
13. [Context File Map](#13-context-file-map)

---

## 1. Project Overview

A Netflix-inspired developer portfolio where each "profile" (Portfolio, Personal, Fullstack, AI/ML) represents a domain of work. Visitors pick a profile, browse projects in horizontal rows, click into a project detail page, and can optionally open a terminal for a CLI-style portfolio experience or a chatbot for a conversational one.

**Core UX metaphor**: Netflix content browsing → Developer project browsing.

| Netflix concept | Portfolio equivalent |
|---|---|
| Profile (who's watching?) | Domain focus (Portfolio / Personal / Fullstack / AI/ML) |
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
| State | React Context API + module-level singleton (My List) |
| Persistence | `localStorage` (selected profile, My List) |
| Chat backend | REST API hosted on Render (cold-start aware) |

---

## 3. Project Structure

```
src/
├── main.jsx                      # App entry — mounts BrowserRouter + ProfileProvider
├── App.jsx                       # Route definitions and auth-guard logic
├── index.css                     # Global styles (includes chatbotBlink keyframe)
│
├── contexts/
│   ├── ProfileContext.jsx         # createContext() export only — no logic
│   ├── ProfileProvider.jsx        # Provider component with selectProfile / logout logic
│   └── useProfile.js              # useContext(ProfileContext) convenience hook
│
├── data/
│   └── profiles.js               # ⭐ v4 — single source of truth for ALL content
│                                 #   allProjects map → get() helper → profiles export
│                                 #   also exports: getProject(id), getAllProjects()
│
├── service/
│   └── chatService.js            # Chat API client — pingServer(), sendChatMessage()
│
├── pages/
│   ├── ProfileSelectionPage.jsx  # "Who's watching?" screen — fires server wake-up ping
│   ├── BrowsePage.jsx            # Main browsing page (billboard + rows + modal + terminal)
│   ├── ProjectPage.jsx           # Full-screen project detail page (/project/:id)
│   ├── ProjectsPage.jsx          # All-projects grid with search + category filter
│   ├── NewPopularPage.jsx        # Projects ranked by recency + match score
│   ├── MyListPage.jsx            # Bookmarked/saved projects (localStorage)
│   ├── PortfolioPage.jsx         # Dedicated CV/recruiter view (/portfolio)
│   └── Terminal.jsx              # (also a page route at /terminal — see §6)
│
├── hooks/
│   └── useScroll.js              # Returns boolean: window.scrollY > 20
│
└── components/
    ├── common/
    │   ├── Billboard.jsx          # Hero header on BrowsePage
    │   └── Row.jsx                # Horizontal scrolling project row
    ├── layout/
    │   └── Navbar.jsx             # Top nav (mobile drawer + inline search + profile menu)
    ├── Terminal.jsx               # Full-screen CLI terminal overlay (also imported as component)
    ├── Chatbox.jsx                # Floating chat assistant (bottom-right) — note: file is Chatbox.jsx
    ├── ProjectModal.jsx           # Quick-view modal (from Row card click)
    ├── ProjectDetails.jsx         # Legacy — NOT routed, superseded by ProjectPage
    └── ProfileSelection.jsx       # Legacy — NOT routed, superseded by ProfileSelectionPage
```

> **Note on legacy files**: `ProjectDetails.jsx` and `ProfileSelection.jsx` are earlier versions not used in active routing. Do not modify them expecting changes to appear in the live app.

> **Note on Terminal**: `Terminal.jsx` exists in two locations — `src/components/Terminal.jsx` (used as an overlay inside BrowsePage) and `src/pages/Terminal.jsx` (mounted as a standalone route at `/terminal`). Keep both in sync if the command set changes.

> **Note on Chatbot file name**: The chatbot component file is `Chatbox.jsx` (not `Chatbot.jsx`), but it is imported and used as `<Chatbot />` inside `BrowsePage.jsx`. Confirm the actual filename before editing.

---

## 4. Data Layer

### `src/data/profiles.js` — v4

**This is the only file you need to edit to change portfolio content.**

#### Architecture (v4 change from v3)

Projects are defined **once** in a central `allProjects` object keyed by a stable slug string. Profiles compose sections by referencing those slugs via the internal `get(...ids)` helper — no duplication, no divergent descriptions.

```js
// Internal map — edit projects here
const allProjects = {
  "webrtc-platform": { id, title, description, ... },
  "fake-news-detection": { ... },
  // ...
};

// Internal helper — builds resolved arrays from slugs
// Throws at module load time if a slug is missing (catches typos immediately)
const get = (...ids) => ids.map(id => {
  if (!allProjects[id]) throw new Error(`Unknown project id: "${id}"`);
  return allProjects[id];
});

// Public exports
export const getProject = (id) => allProjects[id] ?? null;
export const getAllProjects = () => Object.values(allProjects);
export const profiles = { portfolio: {...}, personal: {...}, fullstack: {...}, aiml: {...} };
export default profiles;
```

#### Four profiles (as of v4)

| Key | Name | Color | Icon | Purpose |
|---|---|---|---|---|
| `portfolio` | Portfolio | `bg-emerald-700` | BookOpen | CV / recruiter overview — 6 sections |
| `personal` | Personal | `bg-blue-600` | User | Journey & story — 3 sections |
| `fullstack` | Full Stack Developer | `bg-red-600` | Code | Web & apps — 3 sections |
| `aiml` | AI/ML Engineer | `bg-purple-600` | Brain | ML & research — 4 sections |

#### Profile section layout

| Profile | Sections |
|---|---|
| `portfolio` | About Me · Skills · Work Experience · Education · Featured Projects · Leadership & Community |
| `personal` | Work Experience · Education · Activities & Leadership |
| `fullstack` | Production Systems · AI-Powered Tools · Utilities & Apps |
| `aiml` | NLP & Text Classification · Agentic AI & Orchestration · Computer Vision & Image Processing · RAG Systems & IoT |

#### All projects in `allProjects`

| Slug | Title | Category |
|---|---|---|
| `about-me` | Who I Am | About |
| `skills` | Technical Skills | Skills |
| `mentox-internship` | Backend Developer Intern — Mentox Technologies | Internship |
| `btech-cse` | B.Tech — Computer Science & Engineering | Education |
| `acm-leadership` | ACM Student Chapter — Web Development Lead | Leadership |
| `ai-productivity-agent` | AI Productivity Agent | Agentic AI |
| `webrtc-platform` | Campus Chat | Real-Time Systems |
| `fake-news-detection` | Fake News Detection System | NLP & Classification |
| `fluxlink` | FluxLink — Semantic PCB Diff & RAG Chat | Developer Tools / RAG |
| `nextflow` | NextFlow — Visual AI Workflow Builder | AI-Powered Tools |
| `ecommerce-supabase` | The Discount Store | E-Commerce |
| `pdf-editor` | React PDF Editor Pro | Productivity Tool |
| `travel-billing` | Travel Agency Billing System | Desktop Application |
| `blog-platform` | Blog Platform with Appwrite | Content Platform |
| `college-mgmt` | College Management System | Management System |
| `object-detection` | Object Detection Threshold Analysis | Computer Vision |
| `dipkit` | dipkit — Digital Image Processing Toolkit | Image Processing |
| `predictive-maintenance` | Predictive Maintenance System | Predictive Analytics & IoT |

#### Importing data in consumers

```js
// Preferred for ProjectPage — O(1) lookup, no section iteration
import { getProject } from '../data/profiles';
const project = getProject(params.id); // returns null if not found

// All projects (Terminal stats, search-all)
import { getAllProjects } from '../data/profiles';
const all = getAllProjects();

// Full profiles object (BrowsePage, ProfileProvider, ProfileSelectionPage)
import { profiles } from '../data/profiles';
import profiles from '../data/profiles'; // default export also works
```

### `src/service/chatService.js`

Handles all communication with the chat backend. Module-level `sessionId` persists across calls for multi-turn context without React state.

**Environment variable**: `VITE_API_URL` (defaults to `http://localhost:3000`)

**Exports:**

| Export | Signature | Description |
|---|---|---|
| `pingServer()` | `() => void` | Fire-and-forget `GET /health`. Errors swallowed. Call once on mount. |
| `sendChatMessage(message)` | `(string) => Promise<Result>` | Posts to `POST /chat`. Never throws. |
| `resetSession()` | `() => void` | Clears the module-level `sessionId` — useful for testing. |

**`sendChatMessage` return shapes:**

| Shape | Meaning |
|---|---|
| `{ ok: true, reply: string }` | Success — display the reply |
| `{ ok: false, coldStart: true }` | HTTP 503 — server still booting, trigger retry loop |
| `{ ok: false, coldStart: false, error: string }` | Other failure — display error message |

---

## 5. State Management

### `ProfileContext` split across three files

The context is intentionally split to avoid circular imports and keep each file's responsibility narrow:

| File | Responsibility |
|---|---|
| `ProfileContext.jsx` | `createContext()` only — exports `ProfileContext` |
| `ProfileProvider.jsx` | Provider component with all state logic |
| `useProfile.js` | `useContext(ProfileContext)` convenience hook |

**`ProfileProvider` state:**

| Value | Type | Description |
|---|---|---|
| `profile` | `object \| null` | Full profile data object from `profiles.js` |
| `profileKey` | `string \| null` | Key: `"portfolio"`, `"personal"`, `"fullstack"`, or `"aiml"` |
| `selectProfile(key)` | `function` | Sets profile by key, saves to `localStorage` |
| `logout()` | `function` | Clears profile from state and `localStorage` |

**Persistence**: On mount, `ProfileProvider` reads `localStorage` key `selectedProfile`. If a valid saved key exists, it restores the profile automatically.

**Consumed by**: `App.jsx`, `BrowsePage.jsx`, `ProjectPage.jsx`, `Navbar.jsx`, `Chatbot/Chatbox.jsx`, `ProjectsPage.jsx`, `NewPopularPage.jsx`, `MyListPage.jsx`, `PortfolioPage.jsx`

### `useMyList` hook (`src/pages/MyListPage.jsx`)

A module-level singleton store so all `useMyList()` instances across the app share the same list and re-render together — no extra Context required.

**`localStorage` key**: `portfolio_my_list`

| Value | Type | Description |
|---|---|---|
| `list` | `string[]` | Array of saved project `id` strings |
| `add(id)` | `function` | Adds a project ID (no-op if already present) |
| `remove(id)` | `function` | Removes a project ID |
| `toggle(id)` | `function` | Adds if absent, removes if present |
| `has(id)` | `function` | Returns `true` if ID is in the list |

**`MyListButton`** (also exported from `MyListPage.jsx`): drop-in `+` / `✓` toggle button. Props: `projectId` (required), `size` (default `20`). Uses `e.stopPropagation()` so clicks never bubble to card navigation.

### `useScroll` hook (`src/hooks/useScroll.js`)

```js
const isScrolled = useScroll(); // true when window.scrollY > 20
```

Currently used by legacy/unused components. `Navbar.jsx` implements its own scroll listener internally (threshold: 50px).

---

## 6. Routing

Defined in `App.jsx`. Uses React Router v6 `<Routes>` / `<Route>`.

| Path | Component | Access |
|---|---|---|
| `/select-profile` | `ProfileSelectionPage` | Always accessible |
| `/terminal` | `Terminal` (page) | Always accessible |
| `/browse` | `BrowsePage` | Requires profile |
| `/project/:id` | `ProjectPage` | Requires profile |
| `/projects` | `ProjectsPage` | Requires profile |
| `/new-popular` | `NewPopularPage` | Requires profile |
| `/my-list` | `MyListPage` | Requires profile |
| `/portfolio` | `PortfolioPage` | Requires profile |
| `/` | Redirect → `/browse` | Requires profile |
| `*` (catch-all) | Redirect → `/select-profile` | When no profile selected |

**Auth guard pattern**: When `profile` is `null`, the entire protected route block is replaced by a single catch-all `<Route path="*">` that redirects to `/select-profile`. Once a profile is selected, `/` redirects to `/browse`.

```jsx
// App.jsx auth guard — simplified view
{!profile ? (
  <Route path="*" element={<Navigate to="/select-profile" replace />} />
) : (
  <>
    <Route path="/" element={<Navigate to="/browse" replace />} />
    <Route path="/browse" element={<BrowsePage />} />
    {/* ... */}
  </>
)}
```

---

## 7. Pages

### `ProfileSelectionPage.jsx`

The "Who's watching?" screen. Displays four profile cards: Portfolio, Personal, Fullstack, AI/ML.

- **Fires `pingServer()` on mount** — earliest point in the user journey; gives the Render backend max warm-up time before chat is opened
- Shows a "New here? Start with Portfolio" hint linking directly to the Portfolio profile
- Profile icon mapping: `portfolio → BookOpen`, `personal → User`, `fullstack → Code`, `aiml → Brain`
- Subtitle hints: `portfolio → "CV & overview"`, `personal → "Journey & story"`, `fullstack → "Web & apps"`, `aiml → "ML & research"`
- "Manage Profiles" calls `logout()` + navigates to `/select-profile`
- Framer Motion entrance animation (staggered cards) + `whileHover` / `whileTap` scaling

---

### `BrowsePage.jsx`

The main content browsing screen. Composed of:

1. `<Terminal>` — conditionally rendered as a full-screen overlay (`isTerminalOpen` state)
2. `<Chatbot>` (file: `Chatbox.jsx`) — always rendered, floating
3. `<Navbar>` — receives `profile.color` and `onTerminal` handler
4. `<Billboard>` — receives `profile.hero`
5. `<main className="-mt-16 relative z-10">` — maps over `profile.sections`, rendering a `<Row>` for each
6. `<ProjectModal>` — rendered when `selectedProject` state is non-null

**Key state:**

| State | Type | Purpose |
|---|---|---|
| `selectedProject` | `object \| null` | Controls modal open/close |
| `isTerminalOpen` | `boolean` | Controls terminal overlay |

**Keyboard shortcut**: `Ctrl + `` ` `` ` toggles terminal. Listener added/removed via `useEffect`.

---

### `ProjectPage.jsx`

Full-screen project detail page at `/project/:id`.

**Data lookup**: Iterates `profile.sections` to find a project by `id`. (Consider migrating to `getProject(id)` from `profiles.js` for O(1) lookup.)

**Layout:**
- Hero image with gradient overlays (top-to-bottom and left-to-right)
- Back to Browse button (top-left, with backdrop blur)
- Title, metadata (match/year/rating/duration), action buttons (Live Demo, Source Code, +, 👍)
- Content grid: `lg:col-span-2` left (description + rich content + feature accordion) + right sidebar (tech/role/difficulty/tags + rich content checklist)
- "More Like This" grid at the bottom (related projects from same section, max 4)

**Rich content sub-components** (all defined inside `ProjectPage.jsx`):

| Component | Data field | Description |
|---|---|---|
| `MetricsBar` | `project.metrics` | 2×4 grid of value/label stat cards |
| `CaseStudy` | `project.caseStudy` | 3-column Problem / Solution / Outcome |
| `GalleryStrip` | `project.gallery` | Horizontal scroll strip with lightbox |
| `VideoEmbed` | `project.videoUrl` | YouTube/Vimeo embed or `<video>` fallback |
| `ArchitectureSection` | `project.architecture` | Text description + optional image |
| `FeatureAccordion` | `project.features` | Expandable accordion — replaces old flat list |

**`FeatureAccordion`** replaces the flat feature list from `ProjectDetails.jsx`. Each row shows a thumbnail, title, duration, and a collapsed preview; clicking expands the full description.

**`hasRichContent`** flag: true if any of `metrics`, `caseStudy`, `gallery`, `videoUrl`, or `architecture` is present — controls whether the sidebar rich-content checklist section renders.

---

### `ProjectsPage.jsx`

All-projects grid at `/projects`.

- `search` derived directly from `useSearchParams` — never mirrored in separate state
- URL stays in sync as user types (shareable search links)
- `handleSearchChange(val)`: updates `?search=` param, triggers re-render, re-derives `search`
- Category filter pills from all unique `project.category` values
- `MyListButton` on each card (hover-reveal, top-right corner, `e.stopPropagation()`)
- Animated grid with `AnimatePresence mode="popLayout"` and staggered card entries

---

### `NewPopularPage.jsx`

Ranked project view at `/new-popular`.

- Sorted by `year` descending, then by `match` score descending (parseInt)
- Top 3 as spotlight cards with large watermark rank numbers (behind content, `text-white/5`)
- First card gets a "Top Rated" badge with `<Zap>` icon
- Remaining as a compact ranked list with `whileHover={{ x: 6 }}` slide-right animation

---

### `MyListPage.jsx`

Bookmarked projects at `/my-list`.

- Grid with hover-reveal `BookmarkX` remove button (red on hover)
- `AnimatePresence mode="popLayout"` — smooth removal animation on unbookmark
- Empty state with `<ListVideo>` icon + CTA to Browse Projects
- **Also exports**: `useMyList` hook and `MyListButton` component (used across the app)

---

### `PortfolioPage.jsx`

Dedicated CV/recruiter view at `/portfolio`. Composition TBD — references the `portfolio` profile key from `profiles.js` which includes About Me, Skills, Work Experience, Education, Featured Projects, and Leadership sections.

---

## 8. Components

### `Billboard.jsx` (`components/common/`)

Hero banner at the top of `BrowsePage`.

**Props:** `hero` — object from `profile.hero`

Displays: title (with `clamp` font size), description, match/year/rating/duration metadata, and two action buttons.

> **Note**: "Resume" and "About Me" buttons are currently non-functional placeholders. See §12 for wiring instructions.

---

### `Row.jsx` (`components/common/`)

Horizontally scrollable row of project cards.

**Props:** `title`, `projects`, `onSelect` (optional)

- Chevron buttons appear on row hover (left/right), smooth-scroll by `clientWidth`
- `scrollbar-hide` overflow
- Cards use `whileHover={{ scale: 1.125, zIndex: 50 }}` with `first:origin-left` / `last:origin-right`
- Clicking a card calls `onSelect(project)` to open `ProjectModal`

---

### `Navbar.jsx` (`components/layout/`)

**Props:** `profileColor`, `onTerminal`

**Desktop behaviour:**
- Transparent gradient → fixed opaque (with `backdrop-blur-sm` and `shadow`) after 50px scroll
- Nav links with animated active underline (`layoutId="nav-underline"`) and hover underline scale
- Inline search expands to 220px; `Enter` → `/projects?search=<query>`
- Bell with animated red `animate-ping` pulse dot (dismissible by click)
- Terminal icon (hidden on mobile) with keyboard hint tooltip
- Profile avatar → `ChevronDown` → dropdown: Viewing as / Switch Profile / Sign Out

**Mobile behaviour (< lg breakpoint):**
- `<Menu>` hamburger opens spring-animated slide-in drawer (`z-70`)
- Drawer: logo + close button, profile badge (color + name), search input, nav links with icon + active red dot, footer actions (Terminal, Switch Profile, Sign Out)
- Body scroll locked (`document.body.style.overflow = 'hidden'`) while drawer is open
- Drawer closes on: route change (`useEffect` on `location.pathname`), `Escape` key, backdrop click

**Profile label mapping** (inside Navbar):
```js
{ personal: 'Personal', fullstack: 'Fullstack', aiml: 'AI / ML' }[profileKey] ?? profileKey
```
> Note: `portfolio` key falls through to the `?? profileKey` fallback, rendering as `"portfolio"`. Consider adding it to the mapping.

**Nav links array:**
```js
const navLinks = [
  { label: 'Home',          path: '/browse',       icon: Home       },
  { label: 'Projects',      path: '/projects',     icon: Folder     },
  { label: 'New & Popular', path: '/new-popular',  icon: TrendingUp },
  { label: 'My List',       path: '/my-list',      icon: ListVideo  },
];
```

---

### `Terminal.jsx` (component + page)

Full-screen CLI overlay used in `BrowsePage` (`components/Terminal.jsx`) and as a standalone route (`pages/Terminal.jsx`).

**Props (component version):** `onClose`

**Available commands:** `help`, `about`, `skills`, `projects`, `project <id>`, `work`, `education`, `resume`, `download`, `contact`, `search <term>`, `stats`, `clear`, `gui`, `random` (script), `techstack` (script)

Terminal sources data directly from `profiles.js` — any project or profile data change is reflected automatically.

---

### `Chatbox.jsx` (imported as `<Chatbot />` in BrowsePage)

Floating chat assistant (bottom-right). File path: `src/components/Chatbox.jsx`.

**State:**

| State | Type | Description |
|---|---|---|
| `isOpen` | `boolean` | Chat panel visible |
| `messages` | `Message[]` | Conversation history |
| `input` | `string` | Current input field value |
| `isTyping` | `boolean` | Shows typing indicator |
| `serverState` | `'idle' \| 'warming'` | Cold-start status |

**Quick chips:** `['Projects', 'Skills', 'Contact', 'About me']`

**Cold-start flow:**
1. User sends → `attemptSend(msg, false, deps)` called
2. If response `{ ok: false, coldStart: true }` (HTTP 503): `serverState → 'warming'`, amber status bubble shown, `setInterval` retries every 5s (`RETRY_INTERVAL_MS = 5000`)
3. On success: interval cleared, reply posted, `serverState → 'idle'`
4. Input, chips, send button disabled during `'warming'`; header dot turns yellow with `<Loader className="animate-spin">`

**Architecture**: `attemptSend` is a **plain module-level `async` function** (not a hook, not inside the component). It receives all setters and refs via a `deps` argument — avoids stale closures, ref-during-render violations, and `useCallback` hoisting issues. The `setInterval` callback calls it with the same stable `deps` object.

```js
// deps object built in component body — stable because setters never change and refs are always current
const deps = { setMessages, setIsTyping, setServerState, retryTimerRef, pendingMsgRef };
```

**Launcher**: Shows a speech bubble tooltip above the chat button when closed. Button color: `bg-red-600`. Status dot in top-right corner reflects `serverState`.

> `pingServer()` is called in `ProfileSelectionPage`, not here.

---

### `ProjectModal.jsx`

Quick-view modal triggered by Row card clicks.

**Props:** `project`, `onClose`

- Rendered inside `BrowsePage` when `selectedProject` is non-null
- `AnimatePresence` with `scale + y` entrance/exit animation
- Backdrop click → `onClose`; `e.stopPropagation()` on panel prevents bubble-through
- **Action row**: "View Project" button → navigates to `/project/:id` + calls `onClose`, `MyListButton`, ThumbsUp (cosmetic)
- Shows: hero image, match/year/rating/duration metadata, title, description (line-clamp-3), tech stack (first 5), category, role

---

### `ProjectDetails.jsx` / `ProfileSelection.jsx` (legacy, not routed)

Superseded by `ProjectPage.jsx` and `ProfileSelectionPage.jsx` respectively. Do not edit expecting live changes.

---

## 9. Data Schema

Full schema for a project object in `src/data/profiles.js`:

```ts
{
  // Required
  id: string;                    // Globally unique slug — e.g. "webrtc-platform"
  title: string;
  description: string;
  category: string;              // Used for filter pills in ProjectsPage
  image: string;                 // URL — used in card thumbnails, hero, modal, accordion
  technologies: string[];        // Tech stack array
  match: string;                 // e.g. "98% Match" — shown in green
  year: string;                  // e.g. "2024" or "2023–2027"
  rating: string;                // e.g. "HD", "Production", "Research"
  duration: string;              // e.g. "3 Months", "4 Years"
  role: string;                  // e.g. "Full Stack Engineer"
  difficulty: string;            // e.g. "Expert", "Intermediate"
  tags: string[];                // Searchable tags
  links: { demo: string; code: string };  // URLs, default "#"

  // Optional — unlock rich content sections in ProjectPage
  features?: {
    title: string;
    duration: string;
    desc: string;
  }[];

  metrics?: {
    value: string;               // e.g. "97.6%", "150+"
    label: string;               // e.g. "Best Accuracy"
  }[];

  caseStudy?: {
    problem: string;
    solution: string;
    outcome: string;
  };

  gallery?: string[];            // Array of image URLs → GalleryStrip lightbox

  videoUrl?: string;             // YouTube, Vimeo, or direct video URL → VideoEmbed

  architecture?: string | {      // String-only or with diagram image
    description: string;
    image: string;
  };
}
```

**Profile object schema:**

```ts
{
  name: string;
  icon: string;                  // Lucide icon name — e.g. "BookOpen", "Brain"
  color: string;                 // Tailwind bg class — e.g. "bg-emerald-700"
  hero: {
    title: string;
    description: string;
    image: string;
    match: string;
    year: string;
    rating: string;
    duration: string;
  };
  sections: {
    title: string;
    projects: ResolvedProject[]; // Built by get(...ids) helper — fully resolved objects
  }[];
}
```

**ID convention:** `<profile-prefix>-<topic>-<n>` is the historical pattern (e.g. `p-work-1`). Current v4 slugs use descriptive kebab-case names (`webrtc-platform`, `fake-news-detection`). Use descriptive slugs going forward — they must be globally unique across all profiles.

---

## 10. Design System

### Colors

| Token | Value | Usage |
|---|---|---|
| Background | `#141414` | Page background |
| Surface | `#181818` | Modal, card backgrounds |
| Surface-2 | `#2f2f2f` | Related project cards (More Like This) |
| Surface-3 | `#1e1e1e` | Feature accordion rows, metrics cards |
| Surface-4 | `#2a2a2a` | Chatbot message bubble, accordion expanded |
| Accent Red | `#E50914` | Logo, selection highlight, notification dot, active nav |
| Accent Green | `#46d369` | Match %, terminal prompt, chatbot online dot |
| Accent Emerald | `emerald-400` | Navbar icons, My List icon |
| Accent Yellow | `yellow-400` | Chatbot warming/cold-start state |
| Border | `#404040` | Section dividers |
| Border-subtle | `white/5` or `white/8` | Card borders, drawer separator |

### Typography

- All text: `font-sans`
- Terminal: `font-mono`
- Hero titles: `font-black tracking-tighter uppercase` with `clamp()` font size
- Section headings: `text-xl font-bold` or `text-2xl font-bold`
- Stat values (metrics): `font-black text-xl md:text-2xl text-[#46d369]`
- Profile selection heading: `text-4xl md:text-6xl font-medium`

### Tailwind v4 class conventions

Always use canonical Tailwind v4 names — **never v3 equivalents:**

| ❌ Avoid (v3) | ✅ Use (v4) |
|---|---|
| `bg-gradient-to-b` | `bg-linear-to-b` |
| `bg-gradient-to-t` | `bg-linear-to-t` |
| `bg-gradient-to-r` | `bg-linear-to-r` |
| `h-[2px]` | `h-0.5` |
| `border-white/[0.08]` | `border-white/8` |
| `z-[60]` | `z-60` |
| `z-[70]` | `z-70` |
| `z-[100]` | `z-100` |
| `z-[200]` | `z-200` |
| `min-h-[400px]` | `min-h-100` |
| `min-w-[200px]` | `min-w-50` |

### Spacing

- Page horizontal padding: `px-4 md:px-12`
- Row vertical margin: `my-8` or `my-10`
- Billboard / main overlap: `-mt-16 relative z-10` on `<main>` in BrowsePage
- ProjectPage content grid: `px-6 md:px-16`

### Z-index layers

| Layer | z-index | Element |
|---|---|---|
| Page content | default | Billboard, Rows |
| Chatbot launcher | `z-40` | Floating button |
| Sticky header (ProjectsPage) | `z-40` | Sticky search/filter bar |
| Navbar | `z-50` | Fixed navbar |
| Row cards hover | `z-50` | Card on hover |
| Chatbot panel | `z-50` | Chat window |
| Terminal overlay | `z-50` | Full-screen CLI |
| Mobile drawer backdrop | `z-60` | Dark overlay |
| Mobile drawer panel | `z-70` | Slide-in nav |
| Project Modal | `z-[200]` | Modal overlay |
| Gallery lightbox | `z-[300]` | Full-screen image lightbox |

---

## 11. Features & Interactions

### Profile persistence
Saved to `localStorage` key `selectedProfile`. Restored on mount by `ProfileProvider`. Four valid keys: `portfolio`, `personal`, `fullstack`, `aiml`.

### My List persistence
Saved to `localStorage` key `portfolio_my_list`. Managed by `useMyList` singleton. `MyListButton` is wired into `ProjectsPage` cards, `ProjectModal`, and `MyListPage`.

### Server wake-up (cold-start mitigation)
`pingServer()` fires on `ProfileSelectionPage` mount — the earliest point in the journey. Gives the Render backend up to 60 seconds of warm-up before the user opens chat.

### Chat cold-start retry loop
HTTP 503 from `/chat` → `serverState = 'warming'` → amber status bubble → 5-second `setInterval` retry → on 200 OK, clear timer, post reply, `serverState = 'idle'`. Logic lives in module-level `attemptSend()` function to avoid stale closure issues.

### Navbar inline search
`Enter` in the expanded search input navigates to `/projects?search=<query>`. `ProjectsPage` reads the param via `useSearchParams` and pre-filters on mount and whenever the URL changes. Works from both desktop inline search and mobile drawer search.

### Mobile navigation
`<Menu>` hamburger (visible `< lg`) opens spring-animated drawer (`type: 'spring', stiffness: 320, damping: 32`). Full nav links, search, profile badge, and account actions. Body scroll locked while open. Closes on route change, `Escape`, or backdrop click.

### Terminal shortcut
`Ctrl + `` ` `` ` toggles terminal overlay on `BrowsePage`.

### Gallery lightbox (`ProjectPage`)
Clicking a `GalleryStrip` thumbnail opens a fullscreen lightbox at `z-[300]` with prev/next chevrons and a `N / total` counter. Clicking the backdrop or `X` closes it.

### FeatureAccordion (`ProjectPage`)
Single-open accordion — clicking an open row closes it (toggle). The expanded row pushes down subsequent rows. Content indented to align with the title on desktop.

### Row scrolling
Chevron scroll buttons appear on row group-hover. Smooth-scrolls by `clientWidth`. Cards use `scrollbar-hide` overflow.

### Project navigation flow

```
ProfileSelectionPage (/select-profile)
  └── /browse (BrowsePage)
        ├── Row card click → ProjectModal
        │     └── "View Project" → /project/:id (ProjectPage)
        │           └── "Back to Browse" → /browse
        │           └── "More Like This" card → /project/:id
        ├── Navbar "Projects" → /projects
        │     └── card click → /project/:id
        ├── Navbar "New & Popular" → /new-popular
        │     └── card click → /project/:id
        ├── Navbar "My List" → /my-list
        │     └── card click → /project/:id
        └── /portfolio (PortfolioPage)
```

---

## 12. Extension Points

### Adding a new profile
1. Add key and data to `src/data/profiles.js` following the profile schema (§9)
2. Add entry to the `profiles` object in `ProfileSelectionPage.jsx` with icon mapping
3. Add profile label to the mapping in `Navbar.jsx` (`profileLabel` derivation)
4. Optionally add subtitle to `subtitles` in `ProfileSelectionPage.jsx`

### Adding a new project
1. Add entry to `allProjects` in `src/data/profiles.js` with a unique slug
2. Reference it in one or more profile sections via `get("your-slug")`
3. No other file needs changing — all consumers receive the resolved object

### Adding optional rich content to a project
Add any of these fields to the project object in `allProjects`. They are all optional:
- `metrics: [{value, label}]` — renders `MetricsBar`
- `caseStudy: {problem, solution, outcome}` — renders `CaseStudy`
- `gallery: [url, url, ...]` — renders `GalleryStrip` with lightbox
- `videoUrl: "https://..."` — renders `VideoEmbed` (YouTube/Vimeo/direct)
- `architecture: "text"` or `{description, image}` — renders `ArchitectureSection`

### Adding a new terminal command
```js
// In Terminal.jsx, commands object:
mycommand: (args) => ['Line 1 of output', 'Line 2 of output']
```

### Adding a new custom terminal script
Add to `customScripts` in `Terminal.jsx`. Receives `sandbox` with `profiles`, `Math`, `Date`, `JSON`, `console`, `args`.

### Wiring up Billboard buttons
- "Resume" → add `links.resume` to the hero object and wire `onClick` to trigger a PDF download or new tab
- "About Me" → navigate to `/portfolio` or open a modal

### Adding `MyListButton` to a new component
```jsx
import { MyListButton } from '../pages/MyListPage.jsx';
<MyListButton projectId={project.id} size={20} />
// Use e.stopPropagation() on the wrapper div if the parent has an onClick
```

### Adding a new page
1. Create in `src/pages/`
2. Add `<Route>` in `App.jsx` inside the profile-guarded block if it requires a profile
3. Add entry to `navLinks` array in `Navbar.jsx`: `{ label, path, icon }`

### Changing the chat AI model or system prompt
Update the backend — `chatService.js` is model-agnostic. To adjust cold-start retry timing, change `RETRY_INTERVAL_MS` in `Chatbox.jsx`.

### Migrating `ProjectPage` to use `getProject()`
Currently, `ProjectPage.jsx` iterates `profile.sections` to find a project by `:id`. This can be replaced with:
```js
import { getProject } from '../data/profiles';
const project = getProject(id); // O(1), works even if profile changes
```
This also enables cross-profile project lookup and simplifies the "More Like This" query.

---

## 13. Context File Map

Quick reference for where to find each piece of logic:

| What you want to change | File to edit |
|---|---|
| Project content / descriptions | `src/data/profiles.js` → `allProjects` |
| Profile sections / composition | `src/data/profiles.js` → `profiles` object |
| Profile list on selection screen | `ProfileSelectionPage.jsx` → `profiles` const |
| Hero banner content | `src/data/profiles.js` → `profile.hero` |
| Routes | `src/App.jsx` |
| Global context / auth guard | `src/contexts/ProfileProvider.jsx` |
| Chat API endpoint / retry timing | `src/service/chatService.js` + `src/components/Chatbox.jsx` |
| Navbar links / profile label | `src/components/layout/Navbar.jsx` |
| My List storage key | `src/pages/MyListPage.jsx` → `STORAGE_KEY` const |
| Terminal commands | `src/components/Terminal.jsx` or `src/pages/Terminal.jsx` |
| Tailwind / global CSS | `src/index.css` |
| Card hover / Row layout | `src/components/common/Row.jsx` |
| Project detail rich content | `src/pages/ProjectPage.jsx` (sub-components at top of file) |
| Modal quick-view | `src/components/ProjectModal.jsx` |