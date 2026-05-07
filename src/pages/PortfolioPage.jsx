import { useEffect,useLayoutEffect,useRef, useState } from "react";
import { getAllProjects} from "../data/profiles";
import { useNavigate } from "react-router-dom";
// ─── DATA ─────────────────────────────────────────────────────────────────────

const SKILLS = {
  Frontend:       { icon: "🎨", pills: ["React","TypeScript","Javascript","NextJS","Redux Toolkit","Vite"] },
  Backend:        { icon: "⚙️", pills: ["Node.js","Express","Python","FastAPI","REST API","Zod","Mongoose"] },
  "AI / ML":      { icon: "🤖", pills: ["PyTorch","TensorFlow","scikit-learn","LangChain","LangGraph","HuggingFace","OpenCV"] },
  Databases:      { icon: "🗄️", pills: ["MongoDB","PostgreSQL","TimescaleDB","Supabase","SQLite","Redis"] },
  "DevOps & Tools":{ icon: "🛠️", pills: ["Docker","Docker Compose","GitHub Actions","Git","Linux","APScheduler"] },
};


const CAT_CLASS = {
  "Agentic AI":               "cat-purple",
  "Real-Time Systems":        "cat-blue",
  "NLP & Classification":     "cat-green",
  "Predictive Analytics & IoT":"cat-orange",
  "E-Commerce":               "cat-red",
  "Desktop Application":      "cat-amber",
  "Computer Vision":          "cat-cyan",
  "Developer Tools / RAG":    "cat-violet",
  "AI-Powered Tools":         "cat-pink",
};

import { getProject } from "../data/profiles";

const PROJECT_IDS = [
  "webrtc-platform",          // Campus Chat
  "nextflow",                 // NextFlow
  "predictive-maintenance",   // Predictive Maintenance
  "fluxlink",                 // FluxLink
];

const ALL_PROJECTS = PROJECT_IDS
  .map((id) => getProject(id))
  .filter(Boolean)
  .map((p) => ({
    id: p.id,

    title: p.title,

    category: p.category,

    year: p.year,

    difficulty: p.difficulty,

    summary: p.description,

    stack: p.technologies || [],

    metrics: (p.metrics || []).slice(0, 3),

    link: p.links?.code || p.links?.demo || "#",

    tabs: (() => {
      const tabs = ["all"];

      if (
        [
          "Agentic AI",
          "NLP & Classification",
          "Predictive Analytics & IoT",
          "Computer Vision",
          "Developer Tools / RAG",
          "AI-Powered Tools",
        ].includes(p.category)
      ) {
        tabs.push("aiml");
      }

      if (
        [
          "Real-Time Systems",
          "E-Commerce",
          "Desktop Application",
          "Content Platform",
          "Management System",
          "Productivity Tool",
        ].includes(p.category)
      ) {
        tabs.push("fullstack");
      }

      if (
        [
          "Desktop Application",
          "Developer Tools / RAG",
          "Productivity Tool",
        ].includes(p.category)
      ) {
        tabs.push("tools");
      }

      return tabs;
    })(),
  }));
// ─── STYLES (injected once) ───────────────────────────────────────────────────

const CSS = `

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --void: #0A0A0F; --charcoal: #12121A; --slate: #1E1E2E;
  --violet: #A855F7; --blue: #3B82F6; --cyan: #06B6D4;
  --white: #F8FAFC; --muted: #94A3B8;
  --glass: rgba(248,250,252,0.03); --border: rgba(255,255,255,0.08);
  --font-sans: 'Syne', sans-serif; --font-mono: 'DM Mono', monospace;
  --font-display: 'Fraunces', serif;
}

html { scroll-behavior: smooth; }

body {
  background: var(--void); color: var(--white);
  font-family: var(--font-sans); line-height: 1.6; overflow-x: hidden; cursor: none;
}

#cursor-dot {
  position: fixed; width: 8px; height: 8px; border-radius: 50%;
  background: var(--white); pointer-events: none; z-index: 9999;
  transform: translate(-50%,-50%); mix-blend-mode: difference;
  transition: transform 0.1s ease;
}
#cursor-ring {
  position: fixed; width: 36px; height: 36px; border-radius: 50%;
  border: 1px solid rgba(168,85,247,0.5); pointer-events: none; z-index: 9998;
  transform: translate(-50%,-50%);
  transition: transform 0.18s ease, width 0.18s ease, height 0.18s ease, border-color 0.18s ease;
}

.portfolio-root::before {
  content:''; position: fixed; inset: 0; pointer-events: none; z-index: 1000;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
  opacity: 0.025; background-size: 180px 180px;
}
.portfolio-root::after {
  content:''; position: fixed; inset: 0; pointer-events: none; z-index: 999;
  background-image: linear-gradient(rgba(255,255,255,0.04) 1px,transparent 1px),
                    linear-gradient(90deg,rgba(255,255,255,0.04) 1px,transparent 1px);
  background-size: 48px 48px;
}

/* NAV */
.p-nav {
  position: fixed; top:0; left:0; right:0; z-index: 200;
  height: 72px; display: flex; align-items: center; justify-content: space-between;
  padding: 0 clamp(1.5rem,5vw,4rem);
  background: rgba(10,10,15,0.85); backdrop-filter: blur(20px);
  border-bottom: 1px solid var(--border);
}
.nav-logo {
  font-family: var(--font-display); font-size: 1.1rem; font-weight: 900;
  color: var(--white); letter-spacing: -0.02em; text-decoration: none;
  background: linear-gradient(135deg,var(--violet),var(--blue));
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
}
.nav-links { display: flex; align-items: center; gap: 2rem; }
.nav-link {
  font-size: 0.8rem; font-family: var(--font-mono); color: var(--muted);
  text-decoration: none; letter-spacing: 0.05em; position: relative; transition: color 0.2s;
}
.nav-link::after {
  content:''; position: absolute; bottom: -3px; left:50%; right:50%;
  height: 1px; background: var(--violet); transition: left 0.25s, right 0.25s;
}
.nav-link:hover { color: var(--white); }
.nav-link:hover::after { left:0; right:0; }
.nav-cta {
  font-size: 0.75rem; font-family: var(--font-mono); font-weight: 500;
  padding: 0.5rem 1.25rem; border-radius: 999px; text-decoration: none;
  border: 1px solid rgba(168,85,247,0.5); color: var(--white);
  background: transparent; letter-spacing: 0.05em; transition: background 0.2s, border-color 0.2s;
}
.nav-cta:hover { background: rgba(168,85,247,0.15); border-color: var(--violet); }
.p-dot { width: 7px; height: 7px; border-radius: 50%; background: #34d399; animation: pulse-green 2s ease-in-out infinite; }
@keyframes pulse-green { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.6;transform:scale(0.85)} }

/* HERO */
#hero {
  min-height: 100vh; display: flex; flex-direction: column; justify-content: flex-end;
  padding: 8rem clamp(1.5rem,6vw,5rem) 5rem; position: relative; overflow: hidden;
}
.hero-glow-1 {
  position: absolute; top:-10%; right:-5%; width:600px; height:600px; border-radius:50%;
  pointer-events:none;
  background: radial-gradient(circle,rgba(168,85,247,0.18) 0%,transparent 70%);
  filter: blur(80px); animation: float-glow 8s ease-in-out infinite;
}
.hero-glow-2 {
  position: absolute; bottom:-15%; left:-10%; width:700px; height:700px; border-radius:50%;
  pointer-events:none;
  background: radial-gradient(circle,rgba(59,130,246,0.14) 0%,transparent 70%);
  filter: blur(100px); animation: float-glow 10s ease-in-out infinite reverse;
}
@keyframes float-glow {
  0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(20px,-20px) scale(1.05)}
}
.hero-tag { display:flex; align-items:center; gap:.75rem; margin-bottom:2rem; opacity:0; animation:fade-up .6s ease forwards .2s; }
.hero-tag-dots { display:flex; gap:5px; }
.hero-tag-dots span { width:7px; height:7px; border-radius:50%; background:rgba(255,255,255,.3); }
.hero-tag-text { font-family:var(--font-mono); font-size:.68rem; color:rgba(255,255,255,.45); letter-spacing:.2em; text-transform:uppercase; }
.hero-name {
  font-family:var(--font-display); font-size:clamp(3.5rem,10vw,8rem);
  font-weight:900; letter-spacing:-0.04em; line-height:0.9; margin-bottom:1.5rem;
  opacity:0; animation:fade-up .7s ease forwards .3s;
}
.hero-name .first { color:var(--white); }
.hero-name .last { color:rgba(255,255,255,.35); }
.hero-tagline { font-size:clamp(.95rem,2vw,1.15rem); color:rgba(255,255,255,.6); max-width:520px; margin-bottom:.5rem; line-height:1.7; opacity:0; animation:fade-up .6s ease forwards .4s; }
.hero-sub { font-size:clamp(.85rem,1.6vw,1rem); color:rgba(255,255,255,.35); max-width:480px; margin-bottom:2.5rem; line-height:1.7; opacity:0; animation:fade-up .6s ease forwards .45s; }
.hero-actions { display:flex; flex-wrap:wrap; align-items:center; gap:1rem; opacity:0; animation:fade-up .5s ease forwards .5s; }
.btn-primary {
  display:inline-flex; align-items:center; gap:.45rem;
  background:var(--white); color:#000; font-family:var(--font-sans); font-size:.8rem; font-weight:700;
  padding:.65rem 1.4rem; border-radius:999px; text-decoration:none; border:none; cursor:pointer;
  transition:background .2s,transform .15s;
}
.btn-primary:hover { background:rgba(248,250,252,.88); transform:translateY(-1px); }
.btn-secondary {
  display:inline-flex; align-items:center; gap:.45rem;
  border:1px solid rgba(255,255,255,.22); color:rgba(255,255,255,.75);
  font-family:var(--font-sans); font-size:.8rem; padding:.65rem 1.4rem;
  border-radius:999px; text-decoration:none; background:none; cursor:pointer;
  transition:color .2s,border-color .2s,transform .15s;
}
.btn-secondary:hover { color:var(--white); border-color:rgba(255,255,255,.45); transform:translateY(-1px); }
.hero-location { display:inline-flex; align-items:center; gap:.35rem; font-family:var(--font-mono); font-size:.72rem; color:rgba(255,255,255,.35); }
.hero-stats { display:flex; flex-wrap:wrap; gap:2.5rem; margin-top:5rem; padding-top:2rem; border-top:1px solid rgba(255,255,255,.08); opacity:0; animation:fade-up .8s ease forwards .6s; }
.stat-value { font-family:var(--font-display); font-size:1.8rem; font-weight:900; letter-spacing:-.03em; }
.stat-label { font-family:var(--font-mono); font-size:.65rem; color:rgba(255,255,255,.4); text-transform:uppercase; letter-spacing:.2em; margin-top:.3rem; }
.scroll-hint { position:absolute; bottom:1.5rem; right:2.5rem; display:flex; flex-direction:column; align-items:center; gap:3px; opacity:.3; animation:bob 2s ease-in-out infinite; }
.scroll-hint span { font-family:var(--font-mono); font-size:.6rem; text-transform:uppercase; letter-spacing:.2em; }
@keyframes bob { 0%,100%{transform:translateY(0)} 50%{transform:translateY(5px)} }

/* MACBOOK */
.macbook-wrap {
  position:absolute; right:clamp(-4rem,5vw,4rem); top:50%;
  transform:translateY(-50%) perspective(1200px) rotateY(-12deg) rotateX(5deg);
  animation:float-mac 6s ease-in-out infinite; display:none;
}
@media(min-width:900px){ .macbook-wrap { display:block; } }
@keyframes float-mac {
  0%,100%{transform:translateY(-50%) perspective(1200px) rotateY(-12deg) rotateX(5deg) translateY(0)}
  50%{transform:translateY(-50%) perspective(1200px) rotateY(-12deg) rotateX(5deg) translateY(-12px)}
}
.macbook { width:380px; filter:drop-shadow(0 40px 80px rgba(0,0,0,.65)) drop-shadow(0 0 40px rgba(168,85,247,.12)); }
.mac-screen { background:#1a1a2e; border-radius:8px 8px 0 0; padding:.5rem; position:relative; }
.mac-screen-inner { border-radius:4px; overflow:hidden; background:linear-gradient(135deg,#0f0f1a 0%,#1a1a3e 50%,#0a0a1f 100%); height:220px; position:relative; }
.mac-screen-glow { position:absolute; inset:0; background:radial-gradient(ellipse at 50% 50%,rgba(168,85,247,.25) 0%,transparent 60%); }
.mac-screen-ui { position:absolute; inset:.75rem; display:grid; grid-template-columns:1fr 1fr; gap:.4rem; }
.mac-ui-card { background:rgba(255,255,255,.06); border:1px solid rgba(255,255,255,.1); border-radius:6px; padding:.5rem; }
.mac-ui-bar { height:4px; border-radius:2px; background:rgba(168,85,247,.6); width:70%; margin-bottom:4px; }
.mac-ui-bar-sm { height:3px; border-radius:2px; background:rgba(255,255,255,.2); width:50%; }
.mac-base { background:linear-gradient(180deg,#2a2a3a 0%,#1a1a28 100%); height:16px; border-radius:0 0 4px 4px; box-shadow:0 8px 32px rgba(0,0,0,.5); }
.mac-notch { width:60px; height:10px; background:#0a0a0f; border-radius:0 0 8px 8px; margin:0 auto; position:relative; top:-1px; }

/* SECTION COMMONS */
.p-section { padding:6rem clamp(1.5rem,6vw,5rem); }
.section-divider { border-top:1px solid rgba(255,255,255,.07); }
.max-wrap { max-width:1100px; margin:0 auto; }
.section-label { display:flex; align-items:center; gap:.75rem; margin-bottom:2.5rem; }
.section-label-line { width:32px; height:1px; background:rgba(255,255,255,.28); }
.section-label-text { font-family:var(--font-mono); font-size:.65rem; color:rgba(255,255,255,.45); text-transform:uppercase; letter-spacing:.25em; }

/* SKILLS */
.skills-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(200px,1fr)); gap:.75rem; }
.skill-card {
  background:rgba(255,255,255,.04); border:1px solid rgba(255,255,255,.09);
  border-radius:16px; padding:1.25rem;
  transition:background .25s,border-color .25s,transform .25s;
  opacity:0; transform:translateY(16px);
}
.skill-card.visible { animation:card-in .4s ease forwards; }
@keyframes card-in { to { opacity:1; transform:translateY(0); } }
.skill-card:hover { background:rgba(255,255,255,.07); border-color:rgba(255,255,255,.15); transform:translateY(-2px); }
.skill-card-header { display:flex; align-items:center; gap:.6rem; margin-bottom:1rem; }
.skill-icon { width:28px; height:28px; border-radius:8px; background:rgba(255,255,255,.1); display:flex; align-items:center; justify-content:center; font-size:.85rem; }
.skill-name { font-size:.82rem; font-weight:600; color:rgba(255,255,255,.85); }
.skill-pills { display:flex; flex-wrap:wrap; gap:.35rem; }
.skill-pill { font-family:var(--font-mono); font-size:.65rem; color:rgba(255,255,255,.55); background:rgba(255,255,255,.05); border:1px solid rgba(255,255,255,.08); padding:.22rem .65rem; border-radius:999px; }

/* EXPERIENCE */
.exp-row { display:flex; flex-direction:column; gap:1.5rem; padding:2rem 0; border-bottom:1px solid rgba(255,255,255,.07); opacity:0; transform:translateY(20px); }
.exp-row.visible { animation:card-in .5s ease forwards; }
@media(min-width:768px){ .exp-row { flex-direction:row; gap:3rem; } }
.exp-meta { min-width:200px; flex-shrink:0; }
.exp-period { font-family:var(--font-mono); font-size:.7rem; color:rgba(255,255,255,.4); margin-bottom:.25rem; }
.exp-type { font-family:var(--font-mono); font-size:.7rem; color:#34d399; font-weight:500; }
.exp-role { font-size:1.1rem; font-weight:700; margin-bottom:.25rem; }
.exp-company { font-size:.85rem; color:rgba(255,255,255,.5); font-weight:500; margin-bottom:1rem; }
.exp-summary { font-size:.82rem; color:rgba(255,255,255,.6); line-height:1.7; margin-bottom:1.25rem; }
.exp-highlights { list-style:none; display:flex; flex-direction:column; gap:.65rem; margin-bottom:1.25rem; }
.exp-highlights li { display:flex; align-items:flex-start; gap:.7rem; font-size:.8rem; color:rgba(255,255,255,.55); }
.exp-highlights li::before { content:''; width:6px; height:6px; border-radius:50%; background:rgba(255,255,255,.3); flex-shrink:0; margin-top:.45rem; }
.tech-pills { display:flex; flex-wrap:wrap; gap:.35rem; }
.tech-pill { font-family:var(--font-mono); font-size:.62rem; color:rgba(255,255,255,.45); border:1px solid rgba(255,255,255,.1); padding:.18rem .55rem; border-radius:999px; }

/* PROJECTS */
.projects-header { display:flex; flex-wrap:wrap; align-items:center; justify-content:space-between; gap:1rem; margin-bottom:2.5rem; }
.tab-bar { display:flex; flex-wrap:wrap; gap:.35rem; }
.tab-btn { font-family:var(--font-mono); font-size:.68rem; font-weight:500; padding:.4rem .9rem; border-radius:999px; border:1px solid rgba(255,255,255,.1); background:transparent; color:rgba(255,255,255,.5); cursor:pointer; transition:all .2s; }
.tab-btn:hover { color:rgba(255,255,255,.8); border-color:rgba(255,255,255,.22); }
.tab-btn.active { background:var(--white); color:#000; border-color:transparent; font-weight:700; }
.projects-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(300px,1fr)); gap:1rem; }
.project-card {
  background:rgba(255,255,255,.05); border:1px solid rgba(255,255,255,.1);
  border-radius:20px; padding:1.5rem; cursor:pointer; position:relative; overflow:hidden;
  transition:background .3s cubic-bezier(.16,1,.3,1), border-color .3s ease, transform .35s cubic-bezier(.16,1,.3,1);
  opacity:0; transform:translateY(20px);
}
.project-card.visible { animation:card-in .45s ease forwards; }
.project-card::before {
  content:''; position:absolute; inset:0; border-radius:20px; padding:1px;
  background:linear-gradient(135deg,rgba(168,85,247,.35),rgba(59,130,246,.12));
  -webkit-mask:linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask-composite:exclude; opacity:0; transition:opacity .3s ease;
}
.project-card:hover { background:rgba(255,255,255,.09); border-color:rgba(168,85,247,.2); transform:translateY(-4px) scale(1.01); }
.project-card:hover::before { opacity:1; }
.project-card-top { display:flex; align-items:flex-start; justify-content:space-between; margin-bottom:1rem; }
.cat-tag { font-family:var(--font-mono); font-size:.65rem; font-weight:500; padding:.3rem .75rem; border-radius:999px; border:1px solid; }
.project-title { font-size:.92rem; font-weight:700; margin-bottom:.6rem; line-height:1.4; }
.project-summary { font-size:.78rem; color:rgba(255,255,255,.6); line-height:1.7; margin-bottom:1rem; display:-webkit-box; -webkit-line-clamp:3; -webkit-box-orient:vertical; overflow:hidden; }
.project-stack { display:flex; flex-wrap:wrap; gap:.3rem; margin-bottom:1rem; }
.stack-chip { font-family:var(--font-mono); font-size:.6rem; color:rgba(255,255,255,.5); background:rgba(255,255,255,.07); border:1px solid rgba(255,255,255,.09); padding:.18rem .55rem; border-radius:999px; }
.project-footer { display:flex; align-items:center; justify-content:space-between; padding-top:.75rem; border-top:1px solid rgba(255,255,255,.09); }
.project-metrics { display:flex; gap:1.2rem; }
.metric-val { font-size:.85rem; font-weight:800; }
.metric-lbl { font-family:var(--font-mono); font-size:.58rem; color:rgba(255,255,255,.4); margin-top:1px; }
.project-year { font-family:var(--font-mono); font-size:.65rem; color:rgba(255,255,255,.35); }
.diff-badge { font-family:var(--font-mono); font-size:.62rem; font-weight:600; }
.diff-expert { color:#fca5a5; } .diff-advanced { color:#fcd34d; } .diff-normal { color:#6ee7b7; }
.card-top-right { display:flex; align-items:center; gap:.5rem; opacity:0; transition:opacity .2s; }
.project-card:hover .card-top-right { opacity:1; }

/* DRAWER */
.drawer-overlay { position:fixed; inset:0; background:rgba(0,0,0,.75); backdrop-filter:blur(4px); z-index:500; opacity:0; pointer-events:none; transition:opacity .25s; }
.drawer-overlay.open { opacity:1; pointer-events:all; }
.drawer-panel { position:fixed; top:0; right:0; bottom:0; width:100%; max-width:480px; background:#0e0e14; border-left:1px solid rgba(255,255,255,.1); z-index:501; overflow-y:auto; transform:translateX(100%); transition:transform .35s cubic-bezier(.16,1,.3,1); }
.drawer-panel.open { transform:translateX(0); }
.drawer-inner { padding:2rem; }
.drawer-close { width:32px; height:32px; border-radius:50%; border:1px solid rgba(255,255,255,.18); background:transparent; color:rgba(255,255,255,.5); cursor:pointer; display:flex; align-items:center; justify-content:center; margin-bottom:2rem; font-size:1rem; transition:border-color .2s,color .2s; }
.drawer-close:hover { border-color:rgba(255,255,255,.4); color:var(--white); }
.drawer-title { font-size:1.5rem; font-weight:800; margin-bottom:.3rem; line-height:1.2; }
.drawer-meta { display:flex; align-items:center; gap:.75rem; margin-bottom:1.5rem; }
.drawer-desc { font-size:.85rem; color:rgba(255,255,255,.65); line-height:1.75; margin-bottom:2rem; }
.drawer-metrics { display:grid; grid-template-columns:repeat(3,1fr); gap:.6rem; margin-bottom:2rem; }
.drawer-metric { background:rgba(255,255,255,.06); border:1px solid rgba(255,255,255,.1); border-radius:14px; padding:.85rem; }
.drawer-metric-val { font-size:1.1rem; font-weight:800; }
.drawer-metric-lbl { font-family:var(--font-mono); font-size:.65rem; color:rgba(255,255,255,.45); margin-top:.25rem; }
.drawer-stack-label { font-family:var(--font-mono); font-size:.65rem; color:rgba(255,255,255,.4); text-transform:uppercase; letter-spacing:.2em; margin-bottom:.65rem; }
.drawer-stack { display:flex; flex-wrap:wrap; gap:.4rem; margin-bottom:2rem; }
.drawer-chip { font-family:var(--font-mono); font-size:.72rem; color:rgba(255,255,255,.6); background:rgba(255,255,255,.07); border:1px solid rgba(255,255,255,.1); padding:.3rem .75rem; border-radius:999px; }
.drawer-link { display:inline-flex; align-items:center; gap:.5rem; font-family:var(--font-mono); font-size:.78rem; color:rgba(255,255,255,.65); border:1px solid rgba(255,255,255,.14); padding:.6rem 1.1rem; border-radius:999px; text-decoration:none; transition:color .2s,border-color .2s; }
.drawer-link:hover { color:var(--white); border-color:rgba(255,255,255,.35); }

/* EDUCATION / LEADERSHIP */
.edu-lead-grid { display:grid; grid-template-columns:1fr; gap:4rem; }
@media(min-width:768px){ .edu-lead-grid { grid-template-columns:1fr 1fr; } }
.edu-icon-row { display:flex; align-items:center; gap:.5rem; margin-bottom:.6rem; }
.edu-period { font-family:var(--font-mono); font-size:.68rem; color:rgba(255,255,255,.4); }
.edu-degree { font-size:1rem; font-weight:700; margin-bottom:.25rem; }
.edu-inst { font-size:.82rem; color:rgba(255,255,255,.5); margin-bottom:1.25rem; }
.edu-tags { display:flex; flex-wrap:wrap; gap:.35rem; }
.edu-tag { font-family:var(--font-mono); font-size:.62rem; color:rgba(255,255,255,.45); border:1px solid rgba(255,255,255,.09); padding:.18rem .55rem; border-radius:999px; }
.lead-role { font-size:1rem; font-weight:700; margin-bottom:1.25rem; }
.lead-list { list-style:none; display:flex; flex-direction:column; gap:.75rem; }
.lead-list li { display:flex; align-items:flex-start; gap:.65rem; font-size:.8rem; color:rgba(255,255,255,.58); }
.lead-list li::before { content:''; width:6px; height:6px; border-radius:50%; background:rgba(255,255,255,.3); flex-shrink:0; margin-top:.4rem; }

/* CONTACT */
.contact-heading { font-family:var(--font-display); font-size:clamp(2.2rem,5vw,4rem); font-weight:900; letter-spacing:-0.03em; line-height:1.05; margin-bottom:1.5rem; }
.contact-sub { font-size:.88rem; color:rgba(255,255,255,.55); line-height:1.75; max-width:480px; margin-bottom:2rem; }
.contact-actions { display:flex; flex-wrap:wrap; gap:.75rem; }

/* FOOTER */
.p-footer { padding:1.5rem clamp(1.5rem,6vw,5rem); border-top:1px solid rgba(255,255,255,.07); display:flex; flex-wrap:wrap; gap:1rem; align-items:center; justify-content:space-between; }
.footer-copy { font-family:var(--font-mono); font-size:.65rem; color:rgba(255,255,255,.3); }
.footer-sig { font-family:var(--font-mono); font-size:.65rem; color:rgba(255,255,255,.2); }

/* ANIMATIONS */
@keyframes fade-up { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }

/* CATEGORY COLORS */
.cat-purple { background:rgba(88,28,135,.4); color:#d8b4fe; border-color:rgba(147,51,234,.4); }
.cat-blue   { background:rgba(30,58,138,.4); color:#93c5fd; border-color:rgba(59,130,246,.4); }
.cat-green  { background:rgba(6,78,59,.4);   color:#6ee7b7; border-color:rgba(16,185,129,.4); }
.cat-orange { background:rgba(124,45,18,.4); color:#fdba74; border-color:rgba(234,88,12,.4); }
.cat-red    { background:rgba(127,29,29,.4); color:#fca5a5; border-color:rgba(220,38,38,.4); }
.cat-amber  { background:rgba(120,53,15,.4); color:#fcd34d; border-color:rgba(245,158,11,.4); }
.cat-cyan   { background:rgba(22,78,99,.4);  color:#67e8f9; border-color:rgba(6,182,212,.4); }
.cat-violet { background:rgba(76,29,149,.4); color:#c4b5fd; border-color:rgba(124,58,237,.4); }
.cat-pink   { background:rgba(131,24,67,.4); color:#f9a8d4; border-color:rgba(236,72,153,.4); }
`;

// ─── SVG ICONS ────────────────────────────────────────────────────────────────

const GithubIcon = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);

const MailIcon = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,12 2,6"/>
  </svg>
);

const MapPinIcon = ({ size = 11 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);

const ChevronDownIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="6 9 12 15 18 9"/>
  </svg>
);

const GradCapIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2">
    <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
    <path d="M6 12v5c3 3 9 3 12 0v-5"/>
  </svg>
);

const UsersIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);

const ExternalLinkIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
    <polyline points="15 3 21 3 21 9"/>
    <line x1="10" y1="14" x2="21" y2="3"/>
  </svg>
);

// ─── HELPERS ──────────────────────────────────────────────────────────────────

const diffClass = (d) =>
  d === "Expert" ? "diff-expert" : d === "Advanced" ? "diff-advanced" : "diff-normal";

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────

export default function PortfolioPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [drawer, setDrawer] = useState(null); // project object or null
const navigate = useNavigate();
  // Inject styles once
useLayoutEffect(() => {
  const id = "portfolio-styles";

  let styleTag = document.getElementById(id);

  if (!styleTag) {
    styleTag = document.createElement("style");
    styleTag.id = id;
    styleTag.textContent = CSS;

    document.head.appendChild(styleTag);
  }

  return () => {
    styleTag?.remove();
  };
}, []);

  // Lock body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = drawer ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [drawer]);

  // Cursor
  useEffect(() => {
    const dot = document.getElementById("cursor-dot");
    const ring = document.getElementById("cursor-ring");
    if (!dot || !ring) return;

    let mx = 0, my = 0, rx = 0, ry = 0, raf;

    const onMove = (e) => {
      mx = e.clientX; my = e.clientY;
      dot.style.left = mx + "px"; dot.style.top = my + "px";
    };
    document.addEventListener("mousemove", onMove);

    const lerp = () => {
      rx += (mx - rx) * 0.12; ry += (my - ry) * 0.12;
      ring.style.left = rx + "px"; ring.style.top = ry + "px";
      raf = requestAnimationFrame(lerp);
    };
    raf = requestAnimationFrame(lerp);

    const grow = () => { ring.style.width = "56px"; ring.style.height = "56px"; };
    const shrink = () => { ring.style.width = "36px"; ring.style.height = "36px"; };
    document.querySelectorAll("a, button, .project-card").forEach((el) => {
      el.addEventListener("mouseenter", grow);
      el.addEventListener("mouseleave", shrink);
    });

    return () => {
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [activeTab]); // re-run when tab changes so new cards get listeners

  // IntersectionObserver for scroll-reveal
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("visible"); io.unobserve(e.target); } }),
      { rootMargin: "-40px" }
    );
    document.querySelectorAll(".skill-card, .exp-row, .project-card").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [activeTab]);

  const filtered = ALL_PROJECTS.filter((p) => p.tabs.includes(activeTab));

  return (
    <div className="portfolio-root" style={{ minHeight: "100vh", background: "#0A0A0F", color: "#F8FAFC" }}>
      {/* Cursor elements */}
      <div id="cursor-dot" />
      <div id="cursor-ring" />

      {/* NAV */}
      <nav className="p-nav">
        <a href="#" className="nav-logo">TK</a>
        <div className="nav-links">
          <a href="#skills" className="nav-link">Skills</a>
          <a href="#experience" className="nav-link">Work</a>
          <a href="#projects" className="nav-link">Projects</a>
          <a href="#contact" className="nav-cta">Let's Talk</a>
          <a href='/select-profile' className="nav-link">Sign Out</a>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <span className="p-dot" />
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "rgba(255,255,255,0.45)" }}>Open to work</span>
        </div>
      </nav>

      {/* HERO */}
      <section id="hero">
        <div className="hero-glow-1" />
        <div className="hero-glow-2" />

        {/* MacBook mockup */}
        <div className="macbook-wrap">
          <div className="macbook">
            <div className="mac-screen">
              <div className="mac-screen-inner">
                <div className="mac-screen-glow" />
                <div className="mac-screen-ui">
                  <div className="mac-ui-card"><div className="mac-ui-bar" /><div className="mac-ui-bar-sm" /></div>
                  <div className="mac-ui-card"><div className="mac-ui-bar" style={{ background: "rgba(59,130,246,0.6)" }} /><div className="mac-ui-bar-sm" /></div>
                  <div className="mac-ui-card" style={{ gridColumn: "1/-1", padding: "0.6rem" }}>
                    <div style={{ height: 3, borderRadius: 2, background: "rgba(6,182,212,0.5)", width: "40%", marginBottom: 5 }} />
                    <div style={{ display: "flex", gap: 4, marginBottom: 4 }}>
                      <div style={{ height: 2, borderRadius: 1, background: "rgba(255,255,255,0.15)", flex: 1 }} />
                      <div style={{ height: 2, borderRadius: 1, background: "rgba(255,255,255,0.1)", flex: 2 }} />
                    </div>
                    <div style={{ display: "flex", gap: 4 }}>
                      <div style={{ height: 2, borderRadius: 1, background: "rgba(255,255,255,0.1)", flex: 2 }} />
                      <div style={{ height: 2, borderRadius: 1, background: "rgba(255,255,255,0.15)", flex: 1 }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mac-notch" />
            <div className="mac-base" />
          </div>
        </div>

        <div style={{ position: "relative", zIndex: 10, maxWidth: 720 }}>
          <div className="hero-tag">
            <div className="hero-tag-dots"><span /><span /><span /></div>
            <span className="hero-tag-text">Portfolio · Full Stack Developer &amp; AI/ML Engineer</span>
          </div>
          <h1 className="hero-name">
            <span className="first">Tanmay</span><br />
            <span className="last">Khandelwal</span>
          </h1>
          <p className="hero-tagline">I build intelligent systems and scalable web applications.</p>
          <p className="hero-sub">Currently pursuing B.Tech in CSE and open to exciting opportunities.</p>
          <div className="hero-actions">
            <a href="https://github.com/RecurringNoob" target="_blank" rel="noopener noreferrer" className="btn-primary">
              <GithubIcon size={14} /> GitHub
            </a>
            <a href="mailto:tanmay@example.com" className="btn-secondary">
              <MailIcon size={14} /> Get in touch
            </a>
            <span className="hero-location"><MapPinIcon /> India</span>
          </div>
        </div>

        <div className="hero-stats">
          {[{ value: "15+", label: "Projects built" }, { value: "350+", label: "DSA Questions solved" }, { value: "5", label: "Tech domains" }].map((s) => (
            <div key={s.label}>
              <div className="stat-value">{s.value}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="scroll-hint">
          <span>scroll</span>
          <ChevronDownIcon />
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="p-section section-divider">
        <div className="max-wrap">
          <div className="section-label">
            <span className="section-label-line" />
            <span className="section-label-text">Skills &amp; Stack</span>
          </div>
          <div className="skills-grid">
            {Object.entries(SKILLS).map(([name, { icon, pills }], i) => (
              <div className="skill-card" key={name} style={{ animationDelay: `${i * 0.08}s` }}>
                <div className="skill-card-header">
                  <div className="skill-icon">{icon}</div>
                  <span className="skill-name">{name}</span>
                </div>
                <div className="skill-pills">
                  {pills.map((p) => <span className="skill-pill" key={p}>{p}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" className="p-section section-divider">
        <div className="max-wrap">
          <div className="section-label">
            <span className="section-label-line" />
            <span className="section-label-text">Work Experience</span>
          </div>
          <div className="exp-row">
            <div className="exp-meta">
              <div className="exp-period">2024</div>
              <div className="exp-type">Internship</div>
            </div>
            <div>
              <div className="exp-role">Software Engineering Intern</div>
              <div className="exp-company">Mentox Technologies · 2 months</div>
              <p className="exp-summary">Worked on full-stack features, integrated AI-powered modules into the platform, and contributed to backend architecture improvements using Node.js and Python microservices.</p>
              <ul className="exp-highlights">
                <li>Built end-to-end AI pipeline for content recommendation</li>
                <li>Optimized database queries reducing load time by 40%</li>
                <li>Deployed containerized services with Docker Compose</li>
              </ul>
              <div className="tech-pills">
                {["Node.js","Python","FastAPI","PostgreSQL","Docker","LangChain"].map((t) => (
                  <span className="tech-pill" key={t}>{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="p-section section-divider">
        <div className="max-wrap">
          <div className="projects-header">
            <div className="section-label" style={{ marginBottom: 0 }}>
              <span className="section-label-line" />
              <span className="section-label-text">Selected Projects</span>
            </div>
            <div className="tab-bar">
              {[["all","all"],["aiml","AI/ML"],["fullstack","Full Stack"],["tools","Tools"]].map(([val, label]) => (
                <button
                  key={val}
                  className={`tab-btn${activeTab === val ? " active" : ""}`}
                  onClick={() => setActiveTab(val)}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="projects-grid">
            {filtered.map((p, i) => (
              <div
                className="project-card"
                key={p.id}
                style={{ animationDelay: `${i * 0.07}s` }}
                onClick={() => navigate(`/project/${p.id}`)}
              >
                <div className="project-card-top">
                  <span className={`cat-tag ${CAT_CLASS[p.category] || "cat-purple"}`}>{p.category}</span>
                  <div className="card-top-right">
                    <span className={`diff-badge ${diffClass(p.difficulty)}`}>{p.difficulty}</span>
                    <span style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.85rem" }}>↗</span>
                  </div>
                </div>
                <div className="project-title">{p.title}</div>
                <div className="project-summary">{p.summary}</div>
                <div className="project-stack">
                  {p.stack.slice(0, 4).map((s) => <span className="stack-chip" key={s}>{s}</span>)}
                  {p.stack.length > 4 && <span className="stack-chip">+{p.stack.length - 4}</span>}
                </div>
                <div className="project-footer">
                  <div className="project-metrics">
                    {p.metrics.slice(0, 2).map((m) => (
                      <div key={m.label}>
                        <div className="metric-val">{m.value}</div>
                        <div className="metric-lbl">{m.label}</div>
                      </div>
                    ))}
                  </div>
                  <span className="project-year">{p.year}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EDUCATION & LEADERSHIP */}
      <section id="education" className="p-section section-divider">
        <div className="max-wrap">
          <div className="edu-lead-grid">
            {/* Education */}
            <div>
              <div className="section-label">
                <span className="section-label-line" />
                <span className="section-label-text">Education</span>
              </div>
              <div className="edu-icon-row">
                <GradCapIcon />
                <span className="edu-period">2023 – 2027</span>
              </div>
              <div className="edu-degree">B.Tech in Computer Science &amp; Engineering</div>
              <div className="edu-inst">LNMIIT, Jaipur</div>
              <div className="edu-tags">
                {["Data Structures","Algorithms","Machine Learning","DBMS","OS","Computer Networks"].map((c) => (
                  <span className="edu-tag" key={c}>{c}</span>
                ))}
              </div>
            </div>

            {/* Leadership */}
            <div>
              <div className="section-label">
                <span className="section-label-line" />
                <span className="section-label-text">Leadership</span>
              </div>
              <div className="edu-icon-row">
                <UsersIcon />
                <span className="edu-period"></span>
              </div>
              <div className="lead-role">Web Dev Lead — ACM LNMIIT Chapter</div>
              <ul className="lead-list">
                <li>Organised technical workshops on DSA and ML for students</li>
                <li>Coordinated inter-college hackathons and coding contests</li>
                <li>Mentored juniors on open-source contribution and project building</li>
                <li>Helped in deployment of college ACM website </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="p-section section-divider">
        <div className="max-wrap">
          <div className="section-label">
            <span className="section-label-line" />
            <span className="section-label-text">Get in touch</span>
          </div>
          <h2 className="contact-heading">Let's build something<br />together.</h2>
          <p className="contact-sub">Open to internships, full-time roles, freelance projects, and research collaborations. If you have something interesting in mind — let's talk.</p>
          <div className="contact-actions">
            <a href="mailto:tanmay@example.com" className="btn-primary" style={{ fontSize: "0.8rem" }}>
              <MailIcon size={13} /> tanmaykh2004@gmail.com
            </a>
            <a href="https://github.com/RecurringNoob" target="_blank" rel="noopener noreferrer" className="btn-secondary" style={{ fontSize: "0.8rem" }}>
              <GithubIcon size={13} /> RecurringNoob
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="p-footer">
        <span className="footer-copy">© 2025 Tanmay Khandelwal</span>
        <span className="footer-sig">Crafted with precision ✦</span>
      </footer>

      {/* PROJECT DRAWER */}
      <div className={`drawer-overlay${drawer ? " open" : ""}`} onClick={() => setDrawer(null)} />
      <div className={`drawer-panel${drawer ? " open" : ""}`}>
        {drawer && (
          <div className="drawer-inner">
            <button className="drawer-close" onClick={() => setDrawer(null)}>✕</button>
            <span className={`cat-tag ${CAT_CLASS[drawer.category] || "cat-purple"}`} style={{ display: "inline-block", marginBottom: "1.25rem" }}>
              {drawer.category}
            </span>
            <div className="drawer-title">{drawer.title}</div>
            <div className="drawer-meta">
              <span className={`diff-badge ${diffClass(drawer.difficulty)}`} style={{ fontSize: "0.72rem" }}>{drawer.difficulty}</span>
              <span style={{ color: "rgba(255,255,255,0.25)" }}>·</span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "rgba(255,255,255,0.45)" }}>{drawer.year}</span>
            </div>
            <p className="drawer-desc">{drawer.summary}</p>
            {drawer.metrics.length > 0 && (
              <div className="drawer-metrics">
                {drawer.metrics.map((m) => (
                  <div className="drawer-metric" key={m.label}>
                    <div className="drawer-metric-val">{m.value}</div>
                    <div className="drawer-metric-lbl">{m.label}</div>
                  </div>
                ))}
              </div>
            )}
            <div className="drawer-stack-label">Tech stack</div>
            <div className="drawer-stack">
              {drawer.stack.map((s) => <span className="drawer-chip" key={s}>{s}</span>)}
            </div>
            {drawer.link && drawer.link !== "#" && (
              <a href={drawer.link} target="_blank" rel="noopener noreferrer" className="drawer-link">
                <GithubIcon size={13} />
                View on GitHub
                <ExternalLinkIcon />
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}