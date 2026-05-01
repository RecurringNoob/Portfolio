// Enhanced Profile — v2 (improved + new projects added)

export const profiles = {
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
      {
        title: "Work Experience",
        projects: [
          {
            id: "p-work-1",
            title: "Backend Developer Intern @ Mentox Technologies Pvt. Ltd.",
            description:
              "Designed and developed scalable backend services for an intelligent ERP platform serving real enterprise workflows. Built RESTful APIs from scratch, architected optimized MongoDB schemas with Mongoose, and implemented multi-step automation workflows handling large-scale data. Worked in a fast-paced production environment with a strong emphasis on code quality, data integrity, and zero-downtime deployments.",
            category: "Internship",
            image:
              "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80",
            technologies: [
              "Node.js",
              "Express",
              "MongoDB",
              "Mongoose",
              "Zod",
              "REST API",
              "Git",
            ],
            match: "99% Match",
            year: "2024–2025",
            rating: "Work",
            duration: "6 Months",
            role: "Backend Developer Intern",
            difficulty: "Professional",
            tags: [
              "Backend Development",
              "API Design",
              "Database Optimization",
              "ERP Systems",
            ],
            links: {
              demo: "#",
              code: "#",
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
                title: "Performance & Query Optimization",
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
        ],
      },
      {
        title: "Education",
        projects: [
          {
            id: "p-edu-1",
            title: "B.Tech in Computer Science & Engineering",
            description:
              "Pursuing a Bachelor of Technology in CSE with a focus on building strong theoretical foundations alongside hands-on engineering practice. Coursework spans Data Structures & Algorithms, Operating Systems, DBMS, Computer Networks, Machine Learning, and System Design. Active contributor to academic projects and club activities.",
            category: "Education",
            image:
              "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&q=80",
            technologies: [
              "CS Fundamentals",
              "DSA",
              "OS",
              "DBMS",
              "ML",
              "Networks",
              "System Design",
            ],
            match: "100% Match",
            year: "2023–2027",
            rating: "",
            duration: "4 Years",
            role: "Student",
            difficulty: "Academic",
            tags: ["Computer Science", "Engineering", "Research"],
            links: {
              demo: "#",
              code: "#",
            },
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
        ],
      },
      {
        title: "Extracurricular Activities",
        projects: [
          {
            id: "p-extra-1",
            title: "ACM Student Chapter — Web Development Lead",
            description:
              "Led the university's ACM Student Chapter as Web Development Lead, driving technical workshops, hackathons, and community initiatives. Mentored 50+ junior students in web development and competitive programming, managed a 20-person volunteer team, and owned the club's online presence end-to-end.",
            category: "Leadership",
            image:
              "https://images.unsplash.com/photo-1528605105345-5344ea20e269?w=800&q=80",
            technologies: [
              "Leadership",
              "Event Management",
              "Public Speaking",
              "Mentorship",
              "React",
              "Node.js",
            ],
            match: "98% Match",
            year: "2023–2024",
            rating: "Leadership",
            duration: "1 Year",
            role: "Web Development Lead",
            difficulty: "Soft Skills",
            tags: ["Leadership", "Community", "Mentorship", "Event Management"],
            links: {
              demo: "#",
              code: "#",
            },
            features: [
              {
                title: "Hackathon Organization",
                duration: "Semester-wise",
                desc: "Co-organized multiple intra- and inter-college hackathons — defining problem statements, coordinating judges, managing participant registrations, and ensuring smooth execution on event day.",
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
        ],
      },
    ],
  },

  fullstack: {
    name: "Full Stack Developer",
    icon: "Code",
    color: "bg-red-600",
    hero: {
      title: "Full Stack Engineering",
      description:
        "From pixel-perfect UIs to scalable microservices — building end-to-end solutions that matter. Specialized in real-time systems, modern web frameworks, and production-grade architectures.",
      image:
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&q=80",
      match: "100% Match",
      year: "2024",
      rating: "Code",
      duration: "Specialization",
    },
    sections: [
      {
        title: "Real-Time & Communication",
        projects: [
          {
            id: "fs-rtc-1",
            title: "Student-Verified Video Platform",
            description:
              "Production-ready WebRTC communication platform with P2P video calling, random peer matching, synchronized watch parties, and real-time chat. Architected with Redux Toolkit for deterministic lifecycle management, Socket.IO for WebRTC signaling, and a clean separation between media state and UI state. Supports mid-call device switching, screen sharing, and host-controlled synchronized media playback with sub-second drift correction.",
            category: "Real-Time Systems",
            image:
              "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=800&q=80",
            technologies: [
              "React",
              "WebRTC",
              "Socket.IO",
              "Redux Toolkit",
              "Node.js",
              "Express",
            ],
            match: "100% Match",
            year: "2024",
            rating: "Production",
            duration: "4 Months",
            role: "Full Stack Engineer",
            difficulty: "Expert",
            tags: [
              "WebRTC",
              "Real-time",
              "Media Streaming",
              "Signaling",
              "P2P",
            ],
            links: {
              demo: "#",
              code: "#",
            },
            features: [
              {
                title: "WebRTC Peer Engine",
                duration: "1 Month",
                desc: "Built full P2P video negotiation including offer/answer exchange, ICE candidate gathering, mid-call track replacement for device switching, and screen share with graceful fallback.",
              },
              {
                title: "Socket.IO Signaling Architecture",
                duration: "2 Weeks",
                desc: "Designed a single-instance signaling server managing rooms, peer discovery, and clean disconnection cleanup — preventing ghost connections and stale offer/answer races.",
              },
              {
                title: "Random Peer Matching",
                duration: "1 Week",
                desc: "Implemented a queue-based matching system with category filtering, ensuring fair FIFO pairing while handling edge cases like simultaneous disconnects and re-queue requests.",
              },
              {
                title: "Watch Party Sync Engine",
                duration: "2 Weeks",
                desc: "Host-controlled synchronized playback where the host's play/pause/seek events are broadcast to all participants; client-side drift correction keeps videos within 200ms of each other.",
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
        ],
      },
      {
        title: "E-Commerce & SaaS",
        projects: [
          {
            id: "fs-ecom-1",
            title: "Supabase E-Commerce Platform",
            description:
              "Full-stack e-commerce application with role-based pricing tiers, phone OTP authentication, and WhatsApp-based checkout. Built on normalized PostgreSQL with strict Row Level Security policies, persisted cart and wishlist state, and a category browsing system with computed product counts. Debugged and resolved complex RLS policy recursion issues that caused silent auth failures in nested queries.",
            category: "E-Commerce",
            image:
              "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80",
            technologies: [
              "React",
              "TypeScript",
              "Supabase",
              "PostgreSQL",
              "Tailwind CSS",
              "RLS",
            ],
            match: "98% Match",
            year: "2024",
            rating: "SaaS",
            duration: "3 Months",
            role: "Full Stack Developer",
            difficulty: "Advanced",
            tags: [
              "BaaS",
              "Auth",
              "Database Design",
              "Security",
              "E-Commerce",
            ],
            links: {
              demo: "#",
              code: "#",
            },
            features: [
              {
                title: "Normalized Database Schema",
                duration: "2 Weeks",
                desc: "Designed PostgreSQL schemas for products, categories, orders, carts, and wishlists with computed views for category product counts and materialized price tiers per user role.",
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
        ],
      },
      {
        title: "Document Processing & Tools",
        projects: [
          {
            id: "fs-pdf-1",
            title: "React PDF Editor Pro",
            description:
              "Browser-based PDF annotation suite with a dual-layer canvas architecture separating static PDF rendering from dynamic annotation overlays. Features non-destructive editing with full undo/redo, coordinate normalization across zoom levels, and a compositing export pipeline that burns annotations into the final PDF. Runs entirely client-side with zero backend dependencies — all processing happens in the browser.",
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
            links: {
              demo: "#",
              code: "#",
            },
            features: [
              {
                title: "Dual-Layer Rendering Architecture",
                duration: "2 Weeks",
                desc: "Static PDF.js render layer sits beneath a transparent Canvas annotation layer; the two never interfere, achieving consistent 60fps annotation drawing without re-rendering the PDF.",
              },
              {
                title: "Coordinate Normalization System",
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
                desc: "Implemented freehand drawing, straight lines, rectangles, circles, text boxes, and highlight overlays — each with configurable color, opacity, and stroke width.",
              },
            ],
          },
        ],
      },
      {
        title: "Desktop Application",
        projects: [
          {
            id: "fs-desktop-1",
            title: "Travel Agency Billing System",
            description:
              "Production-grade Java Swing desktop application for travel agents to generate GST-compliant invoices covering flight bookings and car rentals. A 4-step wizard (Customer → Flights → Cars → Preview/Export) guides agents through data entry with full inline editing. Sessions are serialized to disk for reload and history browsing. Multi-page A4 PDFs are generated with Apache PDFBox using coordinate-mapped layouts that handle variable-length itineraries gracefully.",
            category: "Desktop Application",
            image:
              "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80",
            technologies: [
              "Java",
              "Swing",
              "Apache PDFBox",
              "MVC",
              "Graphics2D",
              "BigDecimal",
              "Serialization",
            ],
            match: "99% Match",
            year: "2024",
            rating: "Production",
            duration: "3 Months",
            role: "Software Engineer",
            difficulty: "Advanced",
            tags: [
              "Desktop",
              "Financial",
              "PDF Generation",
              "Custom UI",
              "Java",
            ],
            links: {
              demo: "#",
              code: "https://github.com/RecurringNoob/ridhi-sidhi-tours",
            },
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
                desc: "BookingSession is Java-serializable; agents can save sessions to .rss files and reload them later. A history panel scans a folder of sessions and lets agents reopen any past invoice.",
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
        ],
      },
      {
        title: "Content & Community",
        projects: [
          {
            id: "fs-blog-1",
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
            links: {
              demo: "#",
              code: "#",
            },
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
          {
            id: "fs-mgmt-1",
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
            links: {
              demo: "#",
              code: "#",
            },
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
        ],
      },
    ],
  },

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
        title: "Natural Language Processing",
        projects: [
          {
            id: "ai-nlp-1",
            title: "Fake News Detection System",
            description:
              "End-to-end ML pipeline for misinformation detection combining classical and deep learning approaches. Built an RSS scraper ingesting 15+ news sources, then engineered a rich feature set spanning TF-IDF, VADER sentiment scores, spaCy semantic embeddings, and fine-tuned BERT representations. Benchmarked Naive Bayes, SVM, Random Forest, LSTM, and BERT across identical train/test splits — SVM with combined features achieved 97.6% accuracy, outperforming all deep learning baselines.",
            category: "NLP & Classification",
            image:
              "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&q=80",
            technologies: [
              "Python",
              "scikit-learn",
              "BERT",
              "LSTM",
              "spaCy",
              "VADER",
              "TensorFlow",
              "BeautifulSoup",
              "feedparser",
            ],
            match: "98% Match",
            year: "2024",
            rating: "Research",
            duration: "3 Months",
            role: "Data Scientist",
            difficulty: "Advanced",
            tags: [
              "NLP",
              "Deep Learning",
              "Feature Engineering",
              "Text Classification",
            ],
            links: {
              demo: "#",
              code: "#",
            },
            features: [
              {
                title: "Automated Data Collection",
                duration: "2 Weeks",
                desc: "Built an RSS feed scraper using feedparser and BeautifulSoup covering 15+ news sources with retry logic, deduplication, and scheduled refresh to maintain a fresh labeled dataset.",
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
        ],
      },
      {
        title: "Agentic AI Systems",
        projects: [
          {
            id: "ai-agent-1",
            title: "AI Productivity Agent",
            description:
              "An advanced agentic backend system that manages calendar scheduling and email triage through natural language instructions. Built with FastAPI, LangGraph, and Google Gemini, it routes requests to specialized sub-agents — a Contest Agent that fetches and deduplicates upcoming coding contests, and an Email Agent that classifies and batch-processes inbox messages. High-stakes actions are staged as Human-in-the-Loop pending actions requiring explicit confirmation before execution. Safe calendar concurrency is enforced with asyncio.Lock to prevent double-booking.",
            category: "Agentic AI",
            image:
              "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
            technologies: [
              "Python",
              "FastAPI",
              "LangChain",
              "LangGraph",
              "SQLModel",
              "SQLite",
              "Google Gemini",
              "asyncio",
              "structlog",
              "Alembic",
              "pytest",
            ],
            match: "99% Match",
            year: "2025",
            rating: "Research",
            duration: "2 Months",
            role: "AI/ML Engineer",
            difficulty: "Expert",
            tags: [
              "LangGraph",
              "Multi-Agent",
              "HITL",
              "FastAPI",
              "Agentic AI",
            ],
            links: {
              demo: "#",
              code: "https://github.com/RecurringNoob/AI-productivity-agent",
            },
            features: [
              {
                title: "Multi-Agent Supervisor Architecture",
                duration: "2 Weeks",
                desc: "A Supervisor agent parses incoming natural language instructions and routes them to specialized sub-agents — Contest Agent for coding contest scheduling and Email Agent for inbox triage — each implemented as a LangGraph state machine.",
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
                desc: "Classifies inbox messages as Spam, Meeting Request, or General using Gemini, then processes each category in parallel — auto-archiving spam, extracting meeting times for calendar proposals, and summarizing general threads.",
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
        ],
      },
      {
        title: "Computer Vision",
        projects: [
          {
            id: "ai-cv-1",
            title: "Object Detection Threshold Analysis",
            description:
              "Comparative study of Faster R-CNN, YOLOv5, and YOLOv8 on aerial traffic imagery, examining how confidence threshold selection affects detection quality across architectures. Conducted systematic threshold sensitivity analysis from 0.1 to 0.9, evaluated IoU-based NMS behavior, and visualized per-class detection frequency curves — surfacing meaningful precision-recall trade-offs between region-based and single-shot detectors.",
            category: "Computer Vision",
            image:
              "https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=800&q=80",
            technologies: [
              "Python",
              "PyTorch",
              "YOLOv5",
              "YOLOv8",
              "Torchvision",
              "OpenCV",
              "Matplotlib",
              "Ultralytics",
            ],
            match: "97% Match",
            year: "2024",
            rating: "Research",
            duration: "1 Month",
            role: "Computer Vision Engineer",
            difficulty: "Advanced",
            tags: [
              "Object Detection",
              "Model Comparison",
              "Performance Analysis",
              "YOLO",
            ],
            links: {
              demo: "#",
              code: "https://github.com/RecurringNoob/object-detection-pipeline",
            },
            features: [
              {
                title: "Multi-Architecture Comparison",
                duration: "2 Weeks",
                desc: "Ran Faster R-CNN (ResNet-50 FPN region-proposal) and YOLOv5/v8 (single-shot) on identical aerial traffic images, controlling for image preprocessing to isolate architecture-level differences in detection behavior.",
              },
              {
                title: "Threshold Sensitivity Study",
                duration: "1 Week",
                desc: "Swept confidence thresholds from 0.1 to 0.9 in 0.1 increments for each model, recording per-class detection frequency at each threshold and plotting response curves to identify optimal operating points.",
              },
              {
                title: "NMS & IoU Analysis",
                duration: "3 Days",
                desc: "Analyzed how Non-Maximum Suppression with varying IoU thresholds affects bounding box retention for dense traffic scenes — identifying regimes where aggressive NMS merges valid detections.",
              },
              {
                title: "Modular OOP Pipeline",
                duration: "Throughout",
                desc: "Architected the project with clean separation: ImagePreprocessor, DetectionModel (abstract base), FasterRCNNModel, YOLOModel, and DetectionPostProcessor — making it trivial to plug in new models or datasets.",
              },
              {
                title: "Visualization & Reporting",
                duration: "Throughout",
                desc: "Produced annotated detection images, per-class frequency vs. threshold line plots, and total detection count curves using Matplotlib — all exportable for inclusion in academic reports.",
              },
            ],
          },
        ],
      },
      {
        title: "Image Processing",
        projects: [
          {
            id: "ai-dip-1",
            title: "dipkit — Digital Image Processing Toolkit",
            description:
              "A modular, production-grade Python package for Digital Image Processing built with strict OOP principles. Provides a composable pipeline API covering noise injection, adaptive median filtering, Canny edge detection, and Otsu thresholding — each stage implemented as an independently testable, swappable component. Supports both single-image and batch processing modes with Matplotlib-based visualization and output saving.",
            category: "Image Processing",
            image:
              "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
            technologies: [
              "Python",
              "OpenCV",
              "NumPy",
              "Matplotlib",
              "scikit-image",
            ],
            match: "96% Match",
            year: "2024",
            rating: "Research",
            duration: "1 Month",
            role: "ML Engineer",
            difficulty: "Intermediate",
            tags: [
              "Image Processing",
              "OOP Design",
              "Computer Vision",
              "Pipeline Architecture",
            ],
            links: {
              demo: "#",
              code: "#",
            },
            features: [
              {
                title: "Composable DIPPipeline API",
                duration: "1 Week",
                desc: "DIPPipeline accepts any compatible filter, edge detector, and thresholder via constructor injection — swapping components (e.g. switching from Canny to Sobel) requires zero changes to pipeline orchestration code.",
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
                desc: "OtsuThresholder computes the optimal global binarization threshold and exposes it via PipelineResult for downstream analysis — useful for quantifying image bimodality across a batch.",
              },
              {
                title: "Batch Processing & PipelineResult",
                duration: "3 Days",
                desc: "run_batch() processes multiple images in sequence, returning a list of PipelineResult dataclasses holding all intermediate outputs (noisy, filtered, edges, thresholded) for each image — enabling dataset-level analysis.",
              },
              {
                title: "SOLID Design Principles",
                duration: "Throughout",
                desc: "Each module owns exactly one processing stage (SRP); BaseFilter and BaseEdgeDetector abstract base classes allow new implementations without modifying existing code (OCP); all dependencies are injected, not hardcoded (DIP).",
              },
            ],
          },
        ],
      },
      {
        title: "Predictive Analytics & IoT",
        projects: [
          {
            id: "ai-pred-1",
            title: "Predictive Maintenance System",
            description:
              "End-to-end ML system for industrial machine health monitoring — from ESP32 sensor hardware through a FastAPI backend to a live React dashboard. An IoT poller collects temperature, RPM, torque, and tool-wear readings from ThingSpeak every 15 seconds, feeds them into a trained scikit-learn Random Forest classifier, and streams predictions to the frontend via Server-Sent Events with sub-5-second latency. Classifies six failure modes in real time.",
            category: "Predictive Analytics & IoT",
            image:
              "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
            technologies: [
              "Python",
              "FastAPI",
              "scikit-learn",
              "Random Forest",
              "PostgreSQL",
              "TimescaleDB",
              "React",
              "TypeScript",
              "ESP32",
              "MQTT",
              "Docker",
              "APScheduler",
            ],
            match: "96% Match",
            year: "2024",
            rating: "IoT",
            duration: "3 Months",
            role: "ML Engineer & Full Stack Developer",
            difficulty: "Advanced",
            tags: [
              "IoT",
              "Real-time ML",
              "Predictive Maintenance",
              "Full Stack",
              "SSE",
            ],
            links: {
              demo: "#",
              code: "https://github.com/RecurringNoob/machine-predictive-maintenance",
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
                desc: "Single source of truth for all ML inference: OrdinalEncoder for machine type, StandardScaler for numeric features, and Random Forest predict/predict_proba — loaded once at startup, reused across all requests. Every API response flags assumed features explicitly.",
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
        ],
      },
    ],
  },
};

export default profiles;