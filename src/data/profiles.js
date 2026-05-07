// profiles.js — v4 (single project source of truth + consolidated sections)
//
// HOW IT WORKS
// ─────────────────────────────────────────────────────────────────────────────
// 1. Every project is defined ONCE in `allProjects` (keyed by a stable slug).
// 2. Profiles compose sections by referencing those slugs via the internal
//    `get(...ids)` helper — no duplication, no divergent descriptions.
// 3. `getProject(id)` is exported for ProjectPage / Terminal lookups.
// 4. `profiles` is still exported with fully-resolved `projects` arrays, so
//    no existing consumer (BrowsePage, Row, ProjectModal, etc.) needs changes.
//
// MIGRATION NOTES FOR ProjectPage.jsx
// ─────────────────────────────────────────────────────────────────────────────
//   OLD: iterate all profile sections to find project by id
//   NEW: import { getProject } from '../data/profiles';
//        const project = getProject(params.id);
//
// SECTION COUNT TARGETS
//   portfolio  → 6  (CV layout — About / Skills / Work / Education / Projects / Leadership)
//   personal   → 3  (Work / Education / Activities)
//   fullstack  → 3  (Production Systems / AI-Powered Tools / Utilities & Apps)
//   aiml       → 4  (NLP / Agentic AI / Computer Vision / RAG & IoT)
// ─────────────────────────────────────────────────────────────────────────────

// ─── CENTRAL PROJECT STORE ────────────────────────────────────────────────────

const allProjects = {

  // ── Portfolio / CV cards ──────────────────────────────────────────────────

  "about-me": {
    id: "about-me",
    title: "Who I Am",
    description:
      "I'm Tanmay Khandelwal — a passionate Full Stack Developer and AI/ML Engineer based in India. I love building things that matter: from real-time WebRTC platforms to ML pipelines that detect misinformation. I thrive at the intersection of engineering rigour and product thinking. When I'm not coding, I'm mentoring juniors, organising hackathons, or grinding algorithmic problems.",
    category: "About",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80",
    technologies: [],
    match: "100% Match",
    year: "2025",
    rating: "About",
    duration: "Always",
    role: "Myself",
    difficulty: "Human",
    tags: ["Full Stack", "AI/ML", "Open Source", "Mentorship"],
    links: { demo: "#", code: "#" },
    metrics: [
      { label: "Projects Built", value: "15+" },
      { label: "Students Mentored", value: "50+" },
      { label: "Months Exp.", value: "6" },
      { label: "Languages", value: "5+" },
    ],
    features: [],
  },

  "skills": {
    id: "skills",
    title: "Technical Skills",
    description:
      "A practitioner's stack — tools I've used in production, shipped code with, or built non-trivial systems in. Not a bingo card.",
    category: "Skills",
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80",
    technologies: [
      "React", "TypeScript", "Node.js", "Express", "Python",
      "FastAPI", "MongoDB", "PostgreSQL", "Redis",
      "Docker", "WebRTC", "Socket.IO", "LangChain",
      "scikit-learn", "PyTorch", "TensorFlow",
      "Java", "Tailwind CSS", "Git",
    ],
    match: "100% Match",
    year: "2025",
    rating: "Skills",
    duration: "Growing",
    role: "Engineer",
    difficulty: "Expert",
    tags: ["Frontend", "Backend", "AI/ML", "DevOps", "Systems", "Database"],
    links: { demo: "#", code: "#" },
    metrics: [
      { label: "Frontend", value: "React · TS · Tailwind" },
      { label: "Backend", value: "Node · Python · Java" },
      { label: "AI/ML", value: "PyTorch · sk-learn · LLMs" },
      { label: "Infra", value: "Docker · PostgreSQL · Redis" },
    ],
    features: [
      {
        title: "Frontend",
        duration: "Daily",
        desc: "React, TypeScript, Tailwind CSS, Framer Motion, Redux Toolkit, Vite.",
      },
      {
        title: "Backend",
        duration: "Daily",
        desc: "Node.js, Express, Python, FastAPI, REST API design, Zod, Mongoose.",
      },
      {
        title: "AI / ML",
        duration: "Regular",
        desc: "PyTorch, TensorFlow, scikit-learn, LangChain, LangGraph, HuggingFace, OpenCV.",
      },
      {
        title: "Databases",
        duration: "Regular",
        desc: "MongoDB, PostgreSQL, TimescaleDB, Supabase, SQLite, Redis.",
      },
      {
        title: "DevOps & Tools",
        duration: "Regular",
        desc: "Docker, Docker Compose, GitHub Actions, Git, Linux, APScheduler.",
      },
    ],
  },

  "mentox-internship": {
    id: "mentox-internship",
    title: "Backend Developer Intern — Mentox Technologies",
    description:
      "Designed and developed scalable backend services for an intelligent ERP platform serving real enterprise workflows. Built RESTful APIs from scratch, architected optimised MongoDB schemas with Mongoose, and implemented multi-step automation workflows handling large-scale data. Worked in a fast-paced production environment with a strong emphasis on code quality, data integrity, and zero-downtime deployments.",
    category: "Internship",
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80",
    technologies: ["Node.js", "Express", "MongoDB", "Mongoose", "Zod", "REST API", "Git"],
    match: "99% Match",
    year: "2024–2025",
    rating: "Work",
    duration: "6 Months",
    role: "Backend Developer Intern",
    difficulty: "Professional",
    tags: ["Backend Development", "API Design", "Database Optimization", "ERP Systems"],
    links: { demo: "#", code: "#" },
    metrics: [
      { label: "Duration", value: "6 months" },
      { label: "Stack", value: "Node · MongoDB" },
      { label: "Focus", value: "ERP Backend" },
      { label: "Type", value: "Production" },
    ],
    caseStudy: {
      problem:
        "The ERP platform had no unified API layer — each module (inventory, HR, finance) had ad-hoc scripts with no validation, inconsistent error handling, and full-collection MongoDB scans on every request.",
      solution:
        "Built a modular Express.js API layer with Zod validation at every boundary, Mongoose schemas with compound indexes and pre-save hooks, and a deterministic allocation engine for sectioning pipelines.",
      outcome:
        "Reduced average response times on heavy endpoints, eliminated a class of runtime type errors at the API boundary, and gave the team a consistent architecture to build future modules on.",
    },
    features: [
      {
        title: "RESTful API Development",
        duration: "Ongoing",
        desc: "Designed and implemented modular Express.js endpoints for multiple ERP modules — inventory, HR, and finance — with consistent error handling, pagination, and versioning conventions.",
      },
      {
        title: "MongoDB Schema Architecture",
        duration: "Throughout",
        desc: "Modelled complex relational data using Mongoose with pre-save hooks, virtual fields, compound indexes, and validation layers that improved query throughput by reducing full-collection scans.",
      },
      {
        title: "Automation & Allocation Engine",
        duration: "Core Focus",
        desc: "Built deterministic allocation algorithms for sectioning and grouping pipelines that processed thousands of records with configurable rules, handling edge cases like circular dependencies and split assignments.",
      },
      {
        title: "Zod-Powered Validation Layer",
        duration: "Continuous",
        desc: "Enforced runtime type safety at every API boundary using Zod schemas, catching malformed payloads before they reached the database and providing developer-friendly error messages.",
      },
      {
        title: "Performance & Query Optimisation",
        duration: "Regular",
        desc: "Profiled slow queries using MongoDB explain plans, added strategic indexes, and converted N+1 patterns to aggregation pipelines — reducing average response times on heavy endpoints.",
      },
      {
        title: "Code Reviews & Team Collaboration",
        duration: "Daily",
        desc: "Participated in daily standups, pull-request reviews, and architecture discussions; maintained shared coding standards and helped onboard a junior intern to the codebase.",
      },
    ],
  },

  "btech-cse": {
    id: "btech-cse",
    title: "B.Tech — Computer Science & Engineering",
    description:
      "Pursuing a Bachelor of Technology in CSE with a focus on building strong theoretical foundations alongside hands-on engineering practice. Coursework spans Data Structures & Algorithms, Operating Systems, DBMS, Computer Networks, Machine Learning, and System Design. Active contributor to academic projects and club activities.",
    category: "Education",
    image:
      "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&q=80",
    technologies: ["CS Fundamentals", "DSA", "OS", "DBMS", "ML", "Networks", "System Design"],
    match: "100% Match",
    year: "2023–2027",
    rating: "Academic",
    duration: "4 Years",
    role: "Student",
    difficulty: "Academic",
    tags: ["Computer Science", "Engineering", "Research"],
    links: { demo: "#", code: "#" },
    metrics: [
      { label: "Degree", value: "B.Tech CSE" },
      { label: "Duration", value: "2023–2027" },
      { label: "Projects", value: "10+" },
      { label: "Focus", value: "Systems + AI" },
    ],
    features: [
      {
        title: "Core CS Curriculum",
        duration: "Years 1–3",
        desc: "Completed rigorous coursework in Data Structures, Algorithm Design, Operating Systems, DBMS, and Computer Networks — forming the theoretical backbone of all practical projects.",
      },
      {
        title: "Academic Project Portfolio",
        duration: "Ongoing",
        desc: "Built 10+ projects across web, systems, and AI/ML domains, translating classroom concepts into functional software with real-world architecture considerations.",
      },
      {
        title: "Competitive Programming",
        duration: "Throughout",
        desc: "Regularly participates in coding contests on Codeforces and LeetCode, sharpening problem-solving skills in graph algorithms, dynamic programming, and combinatorics.",
      },
    ],
  },

  "acm-leadership": {
    id: "acm-leadership",
    title: "ACM Student Chapter — Web Development Lead",
    description:
      "Led the university's ACM Student Chapter as Web Development Lead, driving technical workshops, hackathons, and community initiatives. Mentored 50+ junior students in web development and competitive programming, managed a 20-person volunteer team, and owned the club's online presence end-to-end.",
    category: "Leadership",
    image:
      "https://images.unsplash.com/photo-1528605105345-5344ea20e269?w=800&q=80",
    technologies: ["Leadership", "Event Management", "Public Speaking", "Mentorship", "React", "Node.js"],
    match: "98% Match",
    year: "2023–2024",
    rating: "Leadership",
    duration: "1 Year",
    role: "Web Development Lead",
    difficulty: "Soft Skills",
    tags: ["Leadership", "Community", "Mentorship", "Event Management"],
    links: { demo: "#", code: "#" },
    metrics: [
      { label: "Mentored", value: "50+" },
      { label: "Team Size", value: "20" },
      { label: "Workshops", value: "Monthly" },
      { label: "Duration", value: "1 Year" },
    ],
    features: [
      {
        title: "Hackathon Organisation",
        duration: "Semester-wise",
        desc: "Co-organised multiple intra- and inter-college hackathons — defining problem statements, coordinating judges, managing participant registrations, and ensuring smooth execution on event day.",
      },
      {
        title: "Technical Workshop Series",
        duration: "Monthly",
        desc: "Designed and delivered hands-on workshops on React, Node.js, Git, and web fundamentals for 100+ attendees per session, with live coding demos and take-home exercises.",
      },
      {
        title: "Junior Mentorship Program",
        duration: "Ongoing",
        desc: "Ran structured one-on-one and group mentoring sessions helping first- and second-year students build their first projects, understand open-source contribution, and prepare for internship interviews.",
      },
      {
        title: "Club Website — Development & Maintenance",
        duration: "Full Year",
        desc: "Built and maintained the ACM chapter website covering events, member profiles, and announcements; handled deployments, content updates, and performance improvements throughout the year.",
      },
    ],
  },

  // ── Core Projects ─────────────────────────────────────────────────────────

  "ai-productivity-agent": {
    id: "ai-productivity-agent",
    title: "AI Productivity Agent",
    description:
      "An advanced agentic backend system that manages calendar scheduling and email triage through natural language instructions. Built with FastAPI, LangGraph, and Google Gemini, it routes requests to specialised sub-agents — a Contest Agent that fetches and deduplicates upcoming coding contests, and an Email Agent that classifies and batch-processes inbox messages. High-stakes actions are staged as Human-in-the-Loop pending actions requiring explicit confirmation before execution. Safe calendar concurrency is enforced with asyncio.Lock to prevent double-booking.",
    category: "Agentic AI",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
    technologies: [
      "Python", "FastAPI", "LangChain", "LangGraph", "SQLModel",
      "SQLite", "Google Gemini", "asyncio", "structlog", "Alembic", "pytest",
    ],
    match: "99% Match",
    year: "2025",
    rating: "AI",
    duration: "2 Months",
    role: "AI/ML Engineer",
    difficulty: "Expert",
    tags: ["LangGraph", "Multi-Agent", "HITL", "FastAPI", "Agentic AI"],
    links: {
      demo: "#",
      code: "https://github.com/RecurringNoob/AI-productivity-agent",
    },
    metrics: [
      { label: "Tests", value: "150+" },
      { label: "Sub-Agents", value: "3" },
      { label: "Coverage", value: "Full HITL" },
      { label: "Concurrency", value: "asyncio.Lock" },
    ],
    caseStudy: {
      problem:
        "Developers waste hours weekly on repetitive scheduling and email triage that follows predictable patterns — but existing automation tools require manual triggers for every action and have no safety net for high-stakes operations.",
      solution:
        "Built a multi-agent supervisor (LangGraph) routing natural language to a Contest Agent and Email Agent. High-stakes actions are staged as Human-in-the-Loop PendingAction records requiring explicit /confirm before execution.",
      outcome:
        "Automated contest scheduling with Levenshtein deduplication, parallel email classification with Gemini, asyncio.Lock preventing double-booking, and 150+ tests covering the full HITL lifecycle.",
    },
    features: [
      {
        title: "Multi-Agent Supervisor Architecture",
        duration: "2 Weeks",
        desc: "A Supervisor agent parses incoming natural language instructions and routes them to specialised sub-agents — Contest Agent for coding contest scheduling and Email Agent for inbox triage — each implemented as a LangGraph state machine.",
      },
      {
        title: "Human-in-the-Loop (HITL) Review",
        duration: "1 Week",
        desc: "High-stakes actions (scheduling long events, bulk email deletion) are staged as PendingAction records in SQLite; the agent never executes them until the user explicitly confirms or cancels via /agent/confirm/{id}.",
      },
      {
        title: "Contest Agent with Deduplication",
        duration: "1 Week",
        desc: "Fetches upcoming contests from Codeforces and LeetCode APIs, applies Levenshtein distance deduplication to eliminate near-duplicate entries, then schedules them to the calendar with configurable travel buffers.",
      },
      {
        title: "Parallel Email Triage Agent",
        duration: "1 Week",
        desc: "Classifies inbox messages as Spam, Meeting Request, or General using Gemini, then processes each category in parallel — auto-archiving spam, extracting meeting times for calendar proposals, and summarising general threads.",
      },
      {
        title: "Safe Calendar Concurrency",
        duration: "3 Days",
        desc: "All calendar reads and writes are guarded by a class-level asyncio.Lock, preventing race conditions and double-booking even under concurrent API requests — critical for a single-worker production deployment.",
      },
      {
        title: "Production Observability",
        duration: "Throughout",
        desc: "Structured JSON logging via structlog, a request latency middleware tagging every response with elapsed time, background expiry sweeper for stale HITL actions, and a /metrics endpoint for operational snapshots.",
      },
      {
        title: "150+ Test Suite",
        duration: "Continuous",
        desc: "Comprehensive pytest suite with 150+ unit and integration tests using pytest-asyncio and in-memory isolated SQLite databases — covering agent routing, HITL lifecycle, calendar conflict detection, and email classification.",
      },
    ],
  },

  "webrtc-platform": {
    id: "webrtc-platform",
    title: "Campus Chat",
    description:
      "Production-ready WebRTC communication platform with P2P video calling, random peer matching, synchronised watch parties, and real-time chat. Architected with Redux Toolkit for deterministic lifecycle management, Socket.IO for WebRTC signalling, and a clean separation between media state and UI state. Supports mid-call device switching, screen sharing, and host-controlled synchronised media playback with sub-second drift correction.",
    category: "Real-Time Systems",
    image:
      "https://i.postimg.cc/B6TrK0HK/Screenshot-2026-05-07-181434.jpg",
    technologies: [
      "React", "WebRTC", "Socket.IO", "Redux Toolkit", "Node.js", "Express",
    ],
    match: "100% Match",
    year: "2024",
    rating: "Production",
    duration: "4 Months",
    role: "Full Stack Engineer",
    difficulty: "Expert",
    tags: ["WebRTC", "Real-time", "Media Streaming", "Signalling", "P2P"],
    links: { demo: "https://tubular-puffpuff-44ddcb.netlify.app/", code: "https://github.com/RecurringNoob/CampusChat-Frontend" },
    metrics: [
      { label: "Sync Drift", value: "<200ms" },
      { label: "Build Time", value: "4 months" },
      { label: "Chat", value: "Real-time" },
      { label: "Matching", value: "Queue-based" },
    ],
    caseStudy: {
      problem:
        "Students needed a platform for spontaneous video study sessions and watch parties, but existing tools like Zoom lack random peer matching and synchronised co-watching features for community use.",
      solution:
        "Built a full WebRTC stack with Socket.IO signalling, queue-based random matching, host-controlled watch party sync engine, and Redux Toolkit managing all media lifecycle state deterministically.",
      outcome:
        "Sub-200ms watch party drift correction, clean mid-call device switching, and zero ghost connections via explicit disconnect cleanup — deployed and used by the student community.",
    },
    features: [
      {
        title: "WebRTC Peer Engine",
        duration: "1 Month",
        desc: "Built full P2P video negotiation including offer/answer exchange, ICE candidate gathering, mid-call track replacement for device switching, and screen share with graceful fallback.",
      },
      {
        title: "Socket.IO Signalling Architecture",
        duration: "2 Weeks",
        desc: "Designed a single-instance signalling server managing rooms, peer discovery, and clean disconnection cleanup — preventing ghost connections and stale offer/answer races.",
      },
      {
        title: "Random Peer Matching",
        duration: "1 Week",
        desc: "Implemented a queue-based matching system with category filtering, ensuring fair FIFO pairing while handling edge cases like simultaneous disconnects and re-queue requests.",
      },
      {
        title: "Watch Party Sync Engine",
        duration: "2 Weeks",
        desc: "Host-controlled synchronised playback where the host's play/pause/seek events are broadcast to all participants; client-side drift correction keeps videos within 200ms of each other.",
      },
      {
        title: "Redux State Management",
        duration: "Throughout",
        desc: "Managed complex media state (streams, device lists, room membership, chat) with Redux Toolkit slices, eliminating prop-drilling and enabling time-travel debugging.",
      },
      {
        title: "Real-Time Chat",
        duration: "1 Week",
        desc: "Built in-call text chat with message history, read receipts, and emoji support — all over the existing Socket.IO connection without additional HTTP requests.",
      },
    ],
  },

  "fake-news-detection": {
    id: "fake-news-detection",
    title: "Fake News Detection System",
    description:
      "End-to-end ML pipeline for misinformation detection combining classical and deep learning approaches. Built an RSS scraper ingesting 15+ news sources, then engineered a rich feature set spanning TF-IDF, VADER sentiment scores, spaCy semantic embeddings, and fine-tuned BERT representations. Benchmarked Naive Bayes, SVM, Random Forest, LSTM, and BERT across identical train/test splits — SVM with combined features achieved 97.6% accuracy, outperforming all deep learning baselines.",
    category: "NLP & Classification",
    image:
      "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&q=80",
    technologies: [
      "Python", "scikit-learn", "BERT", "LSTM", "spaCy",
      "VADER", "TensorFlow", "BeautifulSoup", "feedparser",
    ],
    match: "98% Match",
    year: "2024",
    rating: "Research",
    duration: "3 Months",
    role: "Data Scientist",
    difficulty: "Advanced",
    tags: ["NLP", "Deep Learning", "Feature Engineering", "Text Classification"],
    links: { demo: "#", code: "#" },
    metrics: [
      { label: "Best Accuracy", value: "97.6%" },
      { label: "Models Tested", value: "5" },
      { label: "News Sources", value: "15+" },
      { label: "Best Model", value: "SVM" },
    ],
    caseStudy: {
      problem:
        "Misinformation spreads faster than manual fact-checking. Existing classifiers rely on single feature families (TF-IDF or embeddings alone) and underperform on real-world news from diverse sources.",
      solution:
        "Engineered four complementary feature families (TF-IDF n-grams, VADER sentiment, spaCy embeddings, BERT CLS tokens) and benchmarked 5 models on identical stratified splits for fair comparison.",
      outcome:
        "SVM with combined features achieved 97.6% accuracy — outperforming fine-tuned BERT — proving complementary linguistic signals matter more than model complexity for this classification task.",
    },
    features: [
      {
        title: "Automated Data Collection",
        duration: "2 Weeks",
        desc: "Built an RSS feed scraper using feedparser and BeautifulSoup covering 15+ news sources with retry logic, deduplication, and scheduled refresh to maintain a fresh labelled dataset.",
      },
      {
        title: "Multi-Modal Feature Engineering",
        duration: "3 Weeks",
        desc: "Extracted four complementary feature families — TF-IDF n-grams, VADER sentiment polarity scores, spaCy sentence embeddings, and BERT [CLS] token representations — then concatenated them into a unified feature matrix.",
      },
      {
        title: "5-Model Benchmark Suite",
        duration: "2 Weeks",
        desc: "Trained and evaluated Naive Bayes (baseline), SVM (97.6% ✓), Random Forest, a custom LSTM with GloVe embeddings, and fine-tuned BERT — all on identical stratified splits for fair comparison.",
      },
      {
        title: "Exploratory Data Analysis",
        duration: "1 Week",
        desc: "Investigated content length distributions, reading complexity (Flesch score), sentiment divergence between real and fake news, and top discriminative n-grams — surfacing insights that directly guided feature selection.",
      },
      {
        title: "Ensemble Feature Strategy",
        duration: "1 Week",
        desc: "Determined that combining TF-IDF + VADER + spaCy vectors into a single SVM input outperformed any single feature family, including BERT alone — demonstrating complementary signal across linguistic dimensions.",
      },
    ],
  },

  "fluxlink": {
    id: "fluxlink",
    title: "FluxLink — Semantic PCB Diff & RAG Chat",
    description:
      "Developer tooling for hardware engineers: a semantic diff engine for KiCad .kicad_pcb files (FluxDiff) paired with a RAG-powered chat layer (FluxLink Chat). Review board changes in an interactive viewer with findings markers, then query the entire git history in natural language — every answer cited to a specific commit ID and file.",
    category: "Developer Tools / RAG",
    image:
      "https://i.postimg.cc/44vLvPMN/Screenshot-2026-04-23-163041.jpg",
    technologies: [
      "Python", "FastAPI", "Flask", "React", "Vite",
      "OpenAI", "FAISS", "OpenCV", "CairoSVG", "KiCad CLI",
    ],
    match: "98% Match",
    year: "2025",
    rating: "Research",
    duration: "2 Months",
    role: "Full Stack / AI Engineer",
    difficulty: "Expert",
    tags: ["RAG", "PCB", "Developer Tools", "Vector Search", "LLM"],
    links: { demo: "#", code: "https://github.com/RecurringNoob/FluxLink" },
    metrics: [
      { label: "Analysis Modules", value: "8" },
      { label: "Chat", value: "RAG + FAISS" },
      { label: "View Modes", value: "3" },
      { label: "Deploy", value: "pip install" },
    ],
    caseStudy: {
      problem:
        "Hardware engineers reviewing PCB revisions face raw S-expression diffs that are unreadable and miss semantic issues — power shorts, impedance regressions, or diff-pair length mismatches aren't visible in a text diff.",
      solution:
        "FluxDiff parses KiCad files into domain objects and runs 8 analysis modules (ERC, power tree, diff pairs, impedance, BOM). FluxLink Chat ingests diff summaries into FAISS and answers natural-language questions via OpenAI with cited commit sources.",
      outcome:
        "Engineers get a single CLI command to produce a full semantic diff report, interactive SVG board viewer with severity-filtered findings, and a conversational interface over their entire revision history.",
    },
    features: [
      {
        title: "Semantic KiCad Parser",
        duration: "2 Weeks",
        desc: "S-expression tokeniser and AST builder converts raw .kicad_pcb files to typed domain objects (Pad, Component, Net, Trace, Via) enabling structural comparison rather than text diff. Git loader walks commits and runs FluxDiff on consecutive board snapshots.",
      },
      {
        title: "8 Analysis Modules",
        duration: "2 Weeks",
        desc: "ERC (power shorts, missing bypass caps), Power Tree (rail contention, sourceless rails), Differential Pairs (length/via asymmetry), Grounding (island detection), Impedance (microstrip/stripline), BOM/supply chain — each producing typed Finding objects.",
      },
      {
        title: "FAISS Vector Store & Embeddings",
        duration: "1 Week",
        desc: "OpenAI text-embedding-3-small encodes diff summaries; FAISS flat index stores embeddings with commit ID and document type metadata. SHA-256 content hashing makes ingestion idempotent — re-running produces an identical index.",
      },
      {
        title: "RAG Chat with Rolling Memory",
        duration: "2 Weeks",
        desc: "FastAPI /chat endpoint answers natural-language queries with commit-cited sources via OpenAI completions. ChatMemory keeps the last 5 turns in context; responses always include commit ID and file citations.",
      },
      {
        title: "Interactive Board Viewer",
        duration: "1 Week",
        desc: "Flask + React/Vite SPA with side-by-side, toggle, and pixel-level overlay modes; findings sidebar with CRITICAL/WARNING/INFO severity badges, free-text search, and pan-to-location on click. Full-page /chat route for conversational board history queries.",
      },
      {
        title: "Filtered Retrieval API",
        duration: "3 Days",
        desc: "POST /chat/filtered restricts FAISS retrieval by commit, document type (impedance, power_tree, bom…), or file — enabling precise queries like 'impedance issues in the last commit on board/main.kicad_pcb'.",
      },
      {
        title: "Modular Extension Architecture",
        duration: "Throughout",
        desc: "Adding a new analysis module is 6 steps: implement analyse_X(), extend DiffResult, call it in compare_pcbs(), add to the report, expose in the viewer API, and register in the RAG document builder.",
      },
    ],
  },

  "nextflow": {
    id: "nextflow",
    title: "NextFlow — Visual AI Workflow Builder",
    description:
      "Dark-themed, Krea.ai-inspired node-based canvas for building and running AI pipelines without code. Users drag LLM, media-processing, and output nodes onto a React Flow canvas, wire them with type-validated edges, and execute the DAG asynchronously via Trigger.dev workers — with real-time status polling, run history, and a full workflow dashboard.",
    category: "AI-Powered Tools",
    image:
      "https://i.postimg.cc/mkJXhpk7/Screenshot-2026-05-05-195143.jpg",
    technologies: [
      "Next.js 16", "TypeScript", "React Flow", "Zustand",
      "Clerk", "Neon PostgreSQL", "Prisma",
      "Trigger.dev v4", "Google Gemini", "Transloadit", "FFmpeg",
    ],
    match: "99% Match",
    year: "2025",
    rating: "Production",
    duration: "2 Months",
    role: "Full Stack Engineer",
    difficulty: "Expert",
    tags: ["Visual Programming", "AI Pipelines", "Next.js", "Node-based UI", "Async Execution"],
    links: { demo: "https://nextflow-peach-alpha.vercel.app/", code: "https://github.com/RecurringNoob/NextFlow" },
    metrics: [
      { label: "Node Types", value: "7" },
      { label: "LLM Models", value: "3 Gemini" },
      { label: "Execution", value: "Trigger.dev" },
      { label: "Deploy", value: "Vercel" },
    ],
    caseStudy: {
      problem:
        "Building multi-step AI pipelines requires writing boilerplate orchestration code for every new workflow — there's no visual, no-code way to prototype, run, and iterate on complex LLM + media pipelines.",
      solution:
        "Built a node-based canvas (React Flow + Zustand) where users wire AI workflows visually. Trigger.dev orchestrates async DAG execution; Gemini LLM nodes handle multimodal inputs; FFmpeg powers media processing.",
      outcome:
        "Complete AI workflow builder with undo/redo, auto-save, run history, type-safe handle connections, and a full CRUD dashboard — deployed on Vercel with Clerk auth, Neon PostgreSQL, and Trigger.dev cloud workers.",
    },
    features: [
      {
        title: "React Flow Node Canvas",
        duration: "2 Weeks",
        desc: "Drag-and-drop nodes with typed handles (text, image, video, number), type-safe connection validation, undo/redo history stack (⌘Z/⌘⇧Z), debounced auto-save, and five tool modes: pointer, grab, scissors, magic select, copy.",
      },
      {
        title: "Async DAG Execution via Trigger.dev",
        duration: "2 Weeks",
        desc: "Topological sort with cycle detection determines node execution order; Trigger.dev orchestrator runs nodes in the background with real-time status polling and per-node output streaming to the sidebar.",
      },
      {
        title: "LLM Node (Gemini 2.5)",
        duration: "1 Week",
        desc: "Configurable system prompt and user message; supports multimodal image inputs via Transloadit CDN URLs; model selection across Gemini 2.5 Flash, Pro, and Flash-Lite variants.",
      },
      {
        title: "Media Processing Nodes",
        duration: "1 Week",
        desc: "Upload Image/Video via Transloadit CDN; Crop Image with FFmpeg (percentage-based); Extract Frame from video at timestamp or percentage — all producing typed outputs for downstream LLM nodes.",
      },
      {
        title: "Workflow Dashboard",
        duration: "1 Week",
        desc: "Full CRUD: create, rename, duplicate, export (JSON), import, and delete workflows; run history sidebar shows per-node outputs, errors, and wall-clock execution time for every past run.",
      },
      {
        title: "Auth & Persistence",
        duration: "Throughout",
        desc: "Clerk authentication with webhook-driven user seeding; workflow graph and run history persisted to Neon PostgreSQL via Prisma; Zustand manages ephemeral canvas state client-side.",
      },
    ],
  },

  "ecommerce-supabase": {
    id: "ecommerce-supabase",
    title: "The Discount Store",
    description:
      "Full-stack e-commerce application with role-based pricing tiers, phone OTP authentication, and WhatsApp-based checkout. Built on normalised PostgreSQL with strict Row Level Security policies, persisted cart and wishlist state, and a category browsing system with computed product counts. Debugged and resolved complex RLS policy recursion issues that caused silent auth failures in nested queries.",
    category: "E-Commerce",
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80",
    technologies: [
      "React", "TypeScript", "Supabase", "PostgreSQL", "Tailwind CSS", "RLS",
    ],
    match: "98% Match",
    year: "2024",
    rating: "SaaS",
    duration: "3 Months",
    role: "Full Stack Developer",
    difficulty: "Advanced",
    tags: ["BaaS", "Auth", "Database Design", "Security", "E-Commerce"],
    links: { demo: "https://e-commerce-five-rust-53.vercel.app/", code: "#" },
    metrics: [
      { label: "Auth", value: "Phone OTP" },
      { label: "Pricing", value: "Role-based" },
      { label: "Checkout", value: "WhatsApp" },
      { label: "Security", value: "RLS Strict" },
    ],
    caseStudy: {
      problem:
        "A wholesale/retail business needed an e-commerce platform where wholesale and retail buyers see different prices for the same products, with phone-based auth (no email) and a WhatsApp checkout flow their customers already use.",
      solution:
        "Normalised PostgreSQL schema with computed price-tier views per user role, strict RLS policies, phone OTP auth, and a WhatsApp Click-to-Chat checkout that persists the order to DB before redirect.",
      outcome:
        "Eliminated a class of silent 403 errors from recursive RLS policies, delivered role-based pricing with zero client-side price logic, and reduced signup friction by removing email requirement.",
    },
    features: [
      {
        title: "Normalised Database Schema",
        duration: "2 Weeks",
        desc: "Designed PostgreSQL schemas for products, categories, orders, carts, and wishlists with computed views for category product counts and materialised price tiers per user role.",
      },
      {
        title: "Row Level Security Implementation",
        duration: "2 Weeks",
        desc: "Implemented strict RLS policies ensuring users can only read/write their own cart and order data; diagnosed and fixed a recursive policy loop causing 403 errors on nested auth checks.",
      },
      {
        title: "Phone OTP Authentication",
        duration: "1 Week",
        desc: "Integrated Supabase phone auth with OTP verification, persistent sessions, and protected route guards — no email required, reducing signup friction significantly.",
      },
      {
        title: "Role-Based Pricing Engine",
        duration: "1 Week",
        desc: "Built a pricing layer where wholesale and retail users see different price columns from the same product table, computed server-side via RLS + SQL views.",
      },
      {
        title: "WhatsApp Checkout Flow",
        duration: "1 Week",
        desc: "Persisted order to the database before redirecting to WhatsApp Click-to-Chat with a pre-filled order summary, ensuring no orders are lost even if the user drops off mid-conversation.",
      },
      {
        title: "Cart & Wishlist Persistence",
        duration: "3 Days",
        desc: "Implemented server-side cart and wishlist synced across devices; optimistic UI updates on add/remove with rollback on failure.",
      },
    ],
  },

  "pdf-editor": {
    id: "pdf-editor",
    title: "React PDF Editor Pro",
    description:
      "Browser-based PDF annotation suite with a dual-layer canvas architecture separating static PDF rendering from dynamic annotation overlays. Features non-destructive editing with full undo/redo, coordinate normalisation across zoom levels, and a compositing export pipeline that burns annotations into the final PDF. Runs entirely client-side with zero backend dependencies.",
    category: "Productivity Tool",
    image:
      "https://images.unsplash.com/photo-1554224311-beee415c201f?w=800&q=80",
    technologies: ["React", "PDF.js", "Canvas API", "jsPDF"],
    match: "99% Match",
    year: "2024",
    rating: "Tool",
    duration: "2 Months",
    role: "Frontend Engineer",
    difficulty: "Expert",
    tags: ["Canvas", "PDF", "Vector Graphics", "Performance"],
    links: { demo: "#", code: "https://github.com/RecurringNoob/PDF-Editor" },
    metrics: [
      { label: "Architecture", value: "Dual-layer" },
      { label: "Backend", value: "Zero" },
      { label: "Export", value: "Burn-in PDF" },
      { label: "Undo/Redo", value: "Unlimited" },
    ],
    features: [
      {
        title: "Dual-Layer Rendering Architecture",
        duration: "2 Weeks",
        desc: "Static PDF.js render layer sits beneath a transparent Canvas annotation layer; the two never interfere, achieving consistent 60fps annotation drawing without re-rendering the PDF.",
      },
      {
        title: "Coordinate Normalisation System",
        duration: "1 Week",
        desc: "All annotation coordinates are stored as relative percentages of page dimensions, then remapped to pixel coordinates on render — keeping annotations pixel-perfect across any zoom level.",
      },
      {
        title: "Undo / Redo Stack",
        duration: "3 Days",
        desc: "Immutable annotation history implemented as a command stack, supporting unlimited undo/redo with minimal memory overhead through structural sharing.",
      },
      {
        title: "PDF Export / Burn-in Engine",
        duration: "1 Week",
        desc: "Compositing pipeline that renders the annotation canvas at 2× resolution and merges it with the original PDF pages using jsPDF, producing a single downloadable file with no quality loss.",
      },
      {
        title: "Annotation Tool Suite",
        duration: "Throughout",
        desc: "Implemented freehand drawing, straight lines, rectangles, circles, text boxes, and highlight overlays — each with configurable colour, opacity, and stroke width.",
      },
    ],
  },

  "travel-billing": {
    id: "travel-billing",
    title: "Travel Agency Billing System",
    description:
      "Production-grade Java Swing desktop application for travel agents to generate GST-compliant invoices covering flight bookings and car rentals. A 4-step wizard (Customer → Flights → Cars → Preview/Export) guides agents through data entry with full inline editing. Sessions are serialised to disk for reload and history browsing. Multi-page A4 PDFs are generated with Apache PDFBox using coordinate-mapped layouts that handle variable-length itineraries gracefully.",
    category: "Desktop Application",
    image:
      "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80",
    technologies: [
      "Java", "Swing", "Apache PDFBox", "MVC", "Graphics2D", "BigDecimal", "Serialisation",
    ],
    match: "99% Match",
    year: "2024",
    rating: "Production",
    duration: "3 Months",
    role: "Software Engineer",
    difficulty: "Advanced",
    tags: ["Desktop", "Financial", "PDF Generation", "Custom UI", "Java"],
    links: {
      demo: "#",
      code: "https://github.com/RecurringNoob/TravelAgencyBill",
    },
    metrics: [
      { label: "Platform", value: "Java Swing" },
      { label: "PDF", value: "Apache PDFBox" },
      { label: "Precision", value: "BigDecimal" },
      { label: "Session", value: "Serialisable" },
    ],
    features: [
      {
        title: "4-Step CardLayout Wizard",
        duration: "3 Weeks",
        desc: "Wizard-style navigation using CardLayout with non-destructive back-navigation; each panel reads from and writes to a shared BookingSession so no data is lost when stepping back.",
      },
      {
        title: "Custom Graphics2D UI Components",
        duration: "2 Weeks",
        desc: "Built flat-design rounded buttons, table renderers, and header bands using Graphics2D with anti-aliasing, custom border radii, and shadow simulation — achieving a modern look in pure Swing.",
      },
      {
        title: "Multi-Page PDF Generation",
        duration: "2 Weeks",
        desc: "Apache PDFBox pipeline with a dynamic coordinate mapper that flows content across A4 pages; handles variable-length itineraries, company branding header, GST breakdown, and page-numbered footer.",
      },
      {
        title: "Session Persistence & History",
        duration: "1 Week",
        desc: "BookingSession is Java-serialisable; agents can save sessions to .rss files and reload them later. A history panel scans a folder of sessions and lets agents reopen any past invoice.",
      },
      {
        title: "GST-Compliant Financial Engine",
        duration: "3 Days",
        desc: "All monetary calculations use BigDecimal with HALF_UP rounding to eliminate floating-point drift; configurable GST rate persists across restarts via a .properties file.",
      },
      {
        title: "Inline Table Editing & Validation",
        duration: "1 Week",
        desc: "Flight and car tables support inline row editing with full validation: non-blank fields, source ≠ destination, positive fares — errors surface as dialog messages before any data is committed.",
      },
    ],
  },

  "blog-platform": {
    id: "blog-platform",
    title: "Blog Platform with Appwrite",
    description:
      "Full-featured blogging platform with React frontend and Appwrite as the backend-as-a-service. Supports user authentication, rich text editing with TinyMCE, image uploads to Appwrite Storage, and a comment system. Fully responsive with Tailwind CSS.",
    category: "Content Platform",
    image:
      "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&q=80",
    technologies: ["React", "Appwrite", "Tailwind CSS", "TinyMCE"],
    match: "92% Match",
    year: "2023",
    rating: "Blog",
    duration: "1 Month",
    role: "Full Stack Developer",
    difficulty: "Intermediate",
    tags: ["CMS", "BaaS", "Content Creation"],
    links: { demo: "#", code: "https://github.com/RecurringNoob/PDF-Editor" },
    metrics: [
      { label: "Backend", value: "Appwrite BaaS" },
      { label: "Editor", value: "TinyMCE" },
      { label: "Auth", value: "Email/Password" },
      { label: "Duration", value: "1 Month" },
    ],
    features: [
      {
        title: "Appwrite Auth & Storage",
        duration: "1 Week",
        desc: "Email/password authentication with persistent sessions; post cover images uploaded to Appwrite Storage with public URL generation.",
      },
      {
        title: "Rich Text Editor",
        duration: "3 Days",
        desc: "TinyMCE integration for WYSIWYG post authoring with image embedding, formatting, and HTML output stored in Appwrite Database.",
      },
      {
        title: "Responsive Design",
        duration: "Throughout",
        desc: "Mobile-first Tailwind CSS layout with card-based post listings, reading progress indicators, and adaptive typography.",
      },
    ],
  },

  "college-mgmt": {
    id: "college-mgmt",
    title: "College Management System",
    description:
      "Community engagement platform for a college club with a Node.js/Express backend and React frontend. Features dynamic content rendering for events and announcements, member sign-up flows, club activity tracking, and cross-device accessibility.",
    category: "Management System",
    image:
      "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&q=80",
    technologies: ["React", "Node.js", "Express", "MongoDB"],
    match: "94% Match",
    year: "2023",
    rating: "Web",
    duration: "2 Months",
    role: "Full Stack Developer",
    difficulty: "Intermediate",
    tags: ["CRUD", "Backend", "Community"],
    links: { demo: "#", code: "#" },
    metrics: [
      { label: "Stack", value: "MERN" },
      { label: "Auth", value: "Basic Middleware" },
      { label: "Features", value: "Events · Members" },
      { label: "Duration", value: "2 Months" },
    ],
    features: [
      {
        title: "Event & Announcement CMS",
        duration: "2 Weeks",
        desc: "Admin panel for creating and publishing events with date, venue, and description; announcements rendered dynamically on the homepage without page reloads.",
      },
      {
        title: "Member Registration Flow",
        duration: "1 Week",
        desc: "Sign-up form with server-side validation, duplicate detection, and confirmation email trigger via Nodemailer.",
      },
      {
        title: "MongoDB CRUD Backend",
        duration: "Throughout",
        desc: "RESTful Express API with Mongoose models for members, events, and announcements; all endpoints protected with basic auth middleware.",
      },
    ],
  },

  "object-detection": {
    id: "object-detection",
    title: "Object Detection Threshold Analysis",
    description:
      "Comparative study of Faster R-CNN, YOLOv5, and YOLOv8 on aerial traffic imagery, examining how confidence threshold selection affects detection quality across architectures. Conducted systematic threshold sensitivity analysis from 0.1 to 0.9, evaluated IoU-based NMS behaviour, and visualised per-class detection frequency curves — surfacing meaningful precision-recall trade-offs between region-based and single-shot detectors.",
    category: "Computer Vision",
    image:
      "https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=800&q=80",
    technologies: [
      "Python", "PyTorch", "YOLOv5", "YOLOv8",
      "Torchvision", "OpenCV", "Matplotlib", "Ultralytics",
    ],
    match: "97% Match",
    year: "2024",
    rating: "Research",
    duration: "1 Month",
    role: "Computer Vision Engineer",
    difficulty: "Advanced",
    tags: ["Object Detection", "Model Comparison", "Performance Analysis", "YOLO"],
    links: {
      demo: "#",
      code: "https://github.com/RecurringNoob/obj-detection-comparision",
    },
    metrics: [
      { label: "Models", value: "3" },
      { label: "Threshold Steps", value: "0.1–0.9" },
      { label: "Domain", value: "Aerial Traffic" },
      { label: "Pipeline", value: "Modular OOP" },
    ],
    features: [
      {
        title: "Multi-Architecture Comparison",
        duration: "2 Weeks",
        desc: "Ran Faster R-CNN (ResNet-50 FPN region-proposal) and YOLOv5/v8 (single-shot) on identical aerial traffic images, controlling for image preprocessing to isolate architecture-level differences.",
      },
      {
        title: "Threshold Sensitivity Study",
        duration: "1 Week",
        desc: "Swept confidence thresholds from 0.1 to 0.9 in 0.1 increments for each model, recording per-class detection frequency at each threshold and plotting response curves to identify optimal operating points.",
      },
      {
        title: "NMS & IoU Analysis",
        duration: "3 Days",
        desc: "Analysed how Non-Maximum Suppression with varying IoU thresholds affects bounding box retention for dense traffic scenes — identifying regimes where aggressive NMS merges valid detections.",
      },
      {
        title: "Modular OOP Pipeline",
        duration: "Throughout",
        desc: "Architected with clean separation: ImagePreprocessor, DetectionModel (abstract base), FasterRCNNModel, YOLOModel, and DetectionPostProcessor — making it trivial to plug in new models or datasets.",
      },
      {
        title: "Visualisation & Reporting",
        duration: "Throughout",
        desc: "Produced annotated detection images, per-class frequency vs. threshold line plots, and total detection count curves using Matplotlib — all exportable for inclusion in academic reports.",
      },
    ],
  },

  "dipkit": {
    id: "dipkit",
    title: "dipkit — Digital Image Processing Toolkit",
    description:
      "A modular, production-grade Python package for Digital Image Processing built with strict OOP principles. Provides a composable pipeline API covering noise injection, adaptive median filtering, Canny edge detection, and Otsu thresholding — each stage implemented as an independently testable, swappable component. Supports both single-image and batch processing modes with Matplotlib-based visualisation and output saving.",
    category: "Image Processing",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
    technologies: [
      "Python", "OpenCV", "NumPy", "Matplotlib", "scikit-image",
    ],
    match: "96% Match",
    year: "2024",
    rating: "Research",
    duration: "1 Month",
    role: "ML Engineer",
    difficulty: "Intermediate",
    tags: ["Image Processing", "OOP Design", "Computer Vision", "Pipeline Architecture"],
    links: { demo: "#", code: "https://github.com/RecurringNoob/dipkit" },
    metrics: [
      { label: "Design", value: "SOLID OOP" },
      { label: "Modes", value: "Single + Batch" },
      { label: "Filters", value: "Adaptive Median" },
      { label: "Export", value: "Matplotlib" },
    ],
    features: [
      {
        title: "Composable DIPPipeline API",
        duration: "1 Week",
        desc: "DIPPipeline accepts any compatible filter, edge detector, and thresholder via constructor injection — swapping components requires zero changes to pipeline orchestration code.",
      },
      {
        title: "Adaptive Median Filter",
        duration: "1 Week",
        desc: "AdaptiveMedianFilter dynamically grows the filter window up to a configurable max size to remove salt-and-pepper noise while preserving fine detail — outperforming fixed-kernel median filters on images with varying noise density.",
      },
      {
        title: "Canny Edge Detector Wrapper",
        duration: "3 Days",
        desc: "CannyEdgeDetector wraps cv2.Canny with configurable low/high thresholds and optional Gaussian pre-smoothing, exposing a clean apply() interface consistent with all other pipeline stages.",
      },
      {
        title: "Otsu Thresholder",
        duration: "2 Days",
        desc: "OtsuThresholder computes the optimal global binarisation threshold and exposes it via PipelineResult for downstream analysis — useful for quantifying image bimodality across a batch.",
      },
      {
        title: "Batch Processing & PipelineResult",
        duration: "3 Days",
        desc: "run_batch() processes multiple images in sequence, returning a list of PipelineResult dataclasses holding all intermediate outputs (noisy, filtered, edges, thresholded) for each image.",
      },
      {
        title: "SOLID Design Principles",
        duration: "Throughout",
        desc: "Each module owns exactly one processing stage (SRP); BaseFilter and BaseEdgeDetector abstract base classes allow new implementations without modifying existing code (OCP); all dependencies are injected, not hardcoded (DIP).",
      },
    ],
  },

  "predictive-maintenance": {
    id: "predictive-maintenance",
    title: "Predictive Maintenance System",
    description:
      "End-to-end ML system for industrial machine health monitoring — from ESP32 sensor hardware through a FastAPI backend to a live React dashboard. An IoT poller collects temperature, RPM, torque, and tool-wear readings from ThingSpeak every 15 seconds, feeds them into a trained scikit-learn Random Forest classifier, and streams predictions to the frontend via Server-Sent Events with sub-5-second latency. Classifies six failure modes in real time.",
    category: "Predictive Analytics & IoT",
    image:
      "https://i.postimg.cc/Kj50ZcLq/Screenshot-2026-05-05-182809.jpg",
    technologies: [
      "Python", "FastAPI", "scikit-learn", "Random Forest",
      "PostgreSQL", "TimescaleDB", "React", "TypeScript",
      "ESP32", "MQTT", "Docker", "APScheduler",
    ],
    match: "96% Match",
    year: "2024",
    rating: "IoT",
    duration: "3 Months",
    role: "ML Engineer & Full Stack Developer",
    difficulty: "Advanced",
    tags: ["IoT", "Real-time ML", "Predictive Maintenance", "Full Stack", "SSE"],
    links: {
      demo: "https://predictive-maintainence-for-industr-five.vercel.app/",
      code: "https://github.com/RecurringNoob/machine-predictive-maintenance",
    },
    metrics: [
      { label: "SSE Latency", value: "<5 seconds" },
      { label: "Failure Modes", value: "6" },
      { label: "Poll Interval", value: "15 seconds" },
      { label: "Deploy", value: "Docker Compose" },
    ],
    caseStudy: {
      problem:
        "Industrial machines fail without warning, causing costly downtime. Existing monitoring is reactive — engineers only know something's wrong after it breaks. No real-time inference pipeline existed for the sensor data already being collected.",
      solution:
        "End-to-end system: ESP32 firmware → ThingSpeak MQTT → FastAPI APScheduler poller → Random Forest inference → TimescaleDB → SSE stream → React live dashboard. All in one Docker Compose stack.",
      outcome:
        "Sub-5-second latency from sensor publish to dashboard update, six failure modes classified in real time, and a single docker-compose up deploys the entire stack including the time-series database.",
    },
    features: [
      {
        title: "ESP32 Sensor Firmware",
        duration: "1 Week",
        desc: "Arduino firmware for ESP32 reading DHT11 temperature/humidity and INA219 current sensors, publishing fields to ThingSpeak MQTT every 15 seconds with Wi-Fi reconnect logic.",
      },
      {
        title: "MLService Inference Engine",
        duration: "2 Weeks",
        desc: "Single source of truth for all ML inference: OrdinalEncoder for machine type, StandardScaler for numeric features, and Random Forest predict/predict_proba — loaded once at startup, reused across all requests.",
      },
      {
        title: "APScheduler IoT Poller",
        duration: "1 Week",
        desc: "Background APScheduler job polls ThingSpeak REST API every 15 seconds, persists raw readings to PostgreSQL/TimescaleDB, triggers ML inference, and pushes results to connected SSE clients.",
      },
      {
        title: "Server-Sent Events Real-Time Push",
        duration: "1 Week",
        desc: "SSE endpoint streams reading and prediction events to the React dashboard in under 5 seconds from sensor publish — no WebSocket overhead, no polling from the client.",
      },
      {
        title: "React Live Dashboard",
        duration: "2 Weeks",
        desc: "Vite + TypeScript frontend with live gauge cards for each sensor, failure-type badge with confidence score, historical trend charts via Recharts, and a manual prediction form for ad-hoc inference.",
      },
      {
        title: "Docker Compose Full-Stack Deploy",
        duration: "3 Days",
        desc: "Single docker-compose.yml spins up FastAPI backend, PostgreSQL + TimescaleDB, and React frontend; GitHub Actions CI runs pytest and frontend tests on every push.",
      },
    ],
  },
};

// ─── INTERNAL HELPER ──────────────────────────────────────────────────────────
// Builds a resolved projects array from slugs.
// Throws at module load time if a slug is missing — catches typos immediately.
const get = (...ids) =>
  ids.map((id) => {
    if (!allProjects[id]) throw new Error(`[profiles.js] Unknown project id: "${id}"`);
    return allProjects[id];
  });

// ─── PUBLIC LOOKUP ────────────────────────────────────────────────────────────
// Use this in ProjectPage.jsx instead of iterating all profile sections.
//
//   import { getProject } from '../data/profiles';
//   const project = getProject(params.id);  // returns null if not found
//
export const getProject = (id) => allProjects[id] ?? null;

// Handy for Terminal stats command and search-all-projects features.
export const getAllProjects = () => Object.values(allProjects);

// ─── PROFILES ─────────────────────────────────────────────────────────────────

export const profiles = {

  // ── PORTFOLIO (CV / recruiter view) ────────────────────────────────────────
  portfolio: {
    name: "Portfolio",
    icon: "BookOpen",
    color: "bg-emerald-700",
    hero: {
      title: "Tanmay Khandelwal",
      description:
        "Full Stack Developer · AI/ML Engineer · Problem Solver. I build intelligent systems and scalable web applications. Currently pursuing B.Tech in CSE and open to exciting opportunities.",
      image:
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&q=80",
      match: "100% Match",
      year: "2025",
      rating: "Open to Work",
      duration: "Available",
    },
    sections: [
      { title: "About Me",             projects: get("about-me") },
      { title: "Skills",               projects: get("skills") },
      { title: "Work Experience",      projects: get("mentox-internship") },
      { title: "Education",            projects: get("btech-cse") },
      {
        title: "Featured Projects",
        projects: get(
          "ai-productivity-agent",
          "webrtc-platform",
          "fake-news-detection",
          "fluxlink",
          "nextflow"
        ),
      },
      { title: "Leadership & Community", projects: get("acm-leadership") },
    ],
  },

  // ── PERSONAL ───────────────────────────────────────────────────────────────
  personal: {
    name: "Personal",
    icon: "User",
    color: "bg-blue-600",
    hero: {
      title: "Hi, I'm Tanmay Khandelwal",
      description:
        "A passionate Full Stack Developer, AI/ML Engineer, and problem solver. I build intelligent systems, scalable web applications, and elegant solutions to complex problems. Welcome to my digital space where I share my journey and experiences.",
      image:
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&q=80",
      match: "98% Match",
      year: "2023",
      rating: "General",
      duration: "Continuous",
    },
    sections: [
      { title: "Work Experience",          projects: get("mentox-internship") },
      { title: "Education",                projects: get("btech-cse") },
      { title: "Activities & Leadership",  projects: get("acm-leadership") },
    ],
  },

  // ── FULL STACK ─────────────────────────────────────────────────────────────
  fullstack: {
    name: "Full Stack Developer",
    icon: "Code",
    color: "bg-red-600",
    hero: {
      title: "Full Stack Engineering",
      description:
        "From pixel-perfect UIs to scalable microservices — building end-to-end solutions that matter. Specialised in real-time systems, modern web frameworks, and production-grade architectures.",
      image:
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&q=80",
      match: "100% Match",
      year: "2024",
      rating: "Code",
      duration: "Specialisation",
    },
    sections: [
      {
        title: "Production Systems",
        projects: get("webrtc-platform", "ecommerce-supabase"),
      },
      {
        title: "AI-Powered Tools",
        projects: get("nextflow", "fluxlink"),
      },
      {
        title: "Utilities & Apps",
        projects: get("pdf-editor", "travel-billing", "blog-platform", "college-mgmt"),
      },
    ],
  },

  // ── AI / ML ────────────────────────────────────────────────────────────────
  aiml: {
    name: "AI/ML Engineer",
    icon: "Brain",
    color: "bg-purple-600",
    hero: {
      title: "Artificial Intelligence & Machine Learning",
      description:
        "Building intelligent systems that learn, adapt, and solve real-world problems. From NLP to Computer Vision, transforming data into actionable insights.",
      image:
        "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&q=80",
      match: "99% Match",
      year: "2025",
      rating: "Research",
      duration: "Innovation",
    },
    sections: [
      {
        title: "NLP & Text Classification",
        projects: get("fake-news-detection"),
      },
      {
        title: "Agentic AI & Orchestration",
        projects: get("ai-productivity-agent", "nextflow"),
      },
      {
        title: "Computer Vision & Image Processing",
        projects: get("object-detection", "dipkit"),
      },
      {
        title: "RAG Systems & IoT",
        projects: get("fluxlink", "predictive-maintenance"),
      },
    ],
  },
};

export default profiles;