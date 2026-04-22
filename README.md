# 🎬 DevFolio — Netflix-Style Developer Portfolio

> *Browse your work like the world browses content.*

A Netflix-inspired developer portfolio where each **profile** represents a domain of expertise. Visitors pick a profile, browse projects in horizontal rows, dive into full project detail pages, and can explore via a built-in CLI terminal.

---

## ✨ Features

- **Profile Selection** — Switch between Personal, Fullstack, and AI/ML views ("Who's watching?")
- **Billboard Hero** — Cinematic hero banner per profile with metadata and CTAs
- **Horizontal Rows** — Scrollable project rows grouped by section (Work, Education, etc.)
- **Project Detail Page** — Full-screen page with tech stack, milestones, related projects, and links
- **Projects Grid** — Live search + category filter across all projects in the active profile
- **New & Popular** — Projects ranked by recency and match score with spotlight cards
- **My List** — Bookmark/save projects to localStorage; managed via a reusable hook
- **Terminal** — Full-screen CLI overlay (`Ctrl + \``) with commands like `search`, `stats`, `resume`
- **Chatbot** — Floating assistant with keyword-based responses about your projects and skills
- **Inline Search** — Navbar search that animates open on click and routes to results

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Framework | React (Vite) |
| Routing | React Router v6 |
| Animation | Framer Motion |
| Styling | Tailwind CSS v4 |
| Icons | Lucide React |
| State | React Context API |
| Persistence | `localStorage` |

---

## 🗂 Project Structure

```
src/
├── main.jsx                      # Entry point — mounts BrowserRouter + ProfileProvider
├── App.jsx                       # Route definitions + auth-guard logic
├── index.css                     # Global styles
│
├── contexts/
│   └── ProfileContext.jsx        # Global profile state (selected profile, select, logout)
│
├── data/
│   └── profiles.js               # ⭐ Single source of truth for ALL content
│
├── pages/
│   ├── ProfileSelectionPage.jsx  # "Who's watching?" screen
│   ├── BrowsePage.jsx            # Main browsing page (billboard + rows)
│   ├── ProjectPage.jsx           # Full-screen project detail page
│   ├── ProjectsPage.jsx          # All-projects grid with search + category filter
│   ├── NewPopularPage.jsx        # Projects ranked by recency + match score
│   └── MyListPage.jsx            # Bookmarked/saved projects
│
└── components/
    ├── common/
    │   ├── Billboard.jsx         # Hero header on BrowsePage
    │   └── Row.jsx               # Horizontal scrolling project row
    ├── layout/
    │   └── Navbar.jsx            # Top navigation bar
    ├── Terminal.jsx              # Full-screen CLI terminal overlay
    ├── Chatbot.jsx               # Floating chat assistant (bottom-right)
    └── ProjectModal.jsx          # Quick-view modal (from Row click)
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/devfolio.git
cd devfolio

# Install dependencies
npm install

# Start the dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
npm run preview
```

---

## 📝 Customising Your Content

**All content lives in one file: `src/data/profiles.js`**

This is the only file you need to edit to make the portfolio yours. It exports a `profiles` object with three keys: `personal`, `fullstack`, and `aiml`.

### Profile Schema

```js
{
  personal: {
    name: "Your Name",
    color: "bg-blue-600",        // Tailwind bg class for your avatar
    hero: {
      title: "Full Stack Developer",
      description: "Building things for the web.",
      image: "https://...",      // Hero background image URL
      match: "97% Match",
      year: "2024",
      rating: "HD",
      duration: "5 yrs exp"
    },
    sections: [
      {
        title: "Work Experience",
        projects: [
          {
            id: "p-work-1",      // ⚠️ Must be globally unique
            title: "My Project",
            description: "What it does and why it matters.",
            category: "Web App",
            image: "https://...",
            technologies: ["React", "Node.js", "PostgreSQL"],
            match: "98% Match",
            year: "2023",
            rating: "HD",
            duration: "3 months",
            role: "Lead Developer",
            difficulty: "Advanced",
            tags: ["SaaS", "Open Source"],
            links: {
              demo: "https://your-demo.com",
              code: "https://github.com/your-repo"
            },
            features: [
              {
                title: "Planning & Architecture",
                duration: "Week 1–2",
                desc: "Designed the system and chose the stack."
              }
            ]
          }
        ]
      }
    ]
  },
  fullstack: { /* same structure */ },
  aiml: { /* same structure */ }
}
```

> **Rule**: `id` must be unique across **all** profiles. Suggested convention: `p-work-1`, `fs-ecommerce-2`, `ai-nlp-3`.

---

## 🗺 Routes

| Path | Page | Notes |
|---|---|---|
| `/select-profile` | Profile Selection | Always accessible |
| `/browse` | Browse | Requires profile selected |
| `/project/:id` | Project Detail | Requires profile selected |
| `/projects` | Projects Grid | Requires profile selected |
| `/new-popular` | New & Popular | Requires profile selected |
| `/my-list` | My List | Requires profile selected |
| `*` | Redirect | → `/select-profile` or `/browse` |

---

## 💻 Terminal Commands

Open the terminal with **Ctrl + `** from the Browse page.

| Command | Description |
|---|---|
| `help` | List all available commands |
| `about` | Show bio text |
| `projects` | List all projects across all profiles |
| `project <id>` | Show full detail for a specific project |
| `skills` | List all unique technologies |
| `work` | Show work experience sections |
| `education` | Show education sections |
| `resume` | Structured summary of all profiles |
| `download` | Download `/resume.pdf` |
| `contact` | Show contact info |
| `search <term>` | Full-text search across all projects |
| `stats` | Aggregate statistics (projects, technologies, etc.) |
| `random` | Show a random project |
| `techstack` | Top 10 technologies by frequency |
| `clear` | Clear terminal history |
| `gui` | Close terminal and return to GUI |

---

## 🔖 My List

Projects can be bookmarked from anywhere using the `MyListButton` component:

```jsx
import { MyListButton } from '../pages/MyListPage.jsx';

// Drop into any card:
<MyListButton projectId={project.id} size={20} />
```

The `useMyList` hook is also exported for custom implementations:

```js
import { useMyList } from '../pages/MyListPage.jsx';

const { list, add, remove, toggle, has } = useMyList();
```

Bookmarks persist to `localStorage` under key `portfolio_my_list`.

---

## 🧩 Extension Points

### Add a new profile

1. Add a new key to `src/data/profiles.js` following the schema above.
2. Add the profile to the local `profiles` object in `ProfileSelectionPage.jsx` with its icon mapping (`User`, `Code`, or `Brain` from Lucide).

### Add a terminal command

In `Terminal.jsx`, add a new entry to the `commands` object:

```js
mycommand: (args) => {
  return ['Line 1 of output', 'Line 2 of output'];
}
```

### Add a new page

1. Create the page in `src/pages/`.
2. Add a `<Route>` in `App.jsx` (wrap with the auth guard if needed).
3. Add a nav link entry to the `navLinks` array in `Navbar.jsx`.

### Upgrade the Chatbot to use AI

Replace `getBotReply` in `Chatbot.jsx` with a call to any LLM API. Pass `profile` from context as the system prompt so the bot has full knowledge of your projects.

---

## 🎨 Design System

| Token | Value | Usage |
|---|---|---|
| Background | `#141414` | Page background |
| Surface | `#181818` | Cards, modals |
| Accent Red | `#E50914` | Logo, highlights, notification dot |
| Accent Green | `#46d369` | Match percentages, terminal prompt |
| Border | `#404040` | Section dividers |

---

## 📄 License

MIT © [Your Name](https://github.com/your-username)