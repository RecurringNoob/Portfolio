import React, { useState, useEffect, useRef, useCallback } from "react";
import { profiles } from "../data/profiles";
import { useNavigate } from "react-router-dom";

/* ─────────────────────────────────────────────
   Cinematic Terminal — drop-in replacement
   Paste this file over src/components/Terminal.jsx
───────────────────────────────────────────── */

/* ── Inline styles (no Tailwind dependency for the terminal shell) ── */
const S = {
  overlay: {
    position: "fixed", inset: 0, zIndex: 50,
    background: "#080810",
    display: "flex", flexDirection: "column",
    fontFamily: "'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace",
    overflow: "hidden",
  },
  /* Scanline texture */
  scanlines: {
    position: "absolute", inset: 0, zIndex: 20, pointerEvents: "none",
    background:
      "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.13) 3px, rgba(0,0,0,0.13) 4px)",
  },
  /* Vignette */
  vignette: {
    position: "absolute", inset: 0, zIndex: 19, pointerEvents: "none",
    background:
      "radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.72) 100%)",
  },
  /* Top red accent line */
  redLine: {
    position: "absolute", top: 0, left: 0, right: 0, height: 2, zIndex: 21,
    background:
      "linear-gradient(90deg, transparent 0%, #E50914 20%, #ff1a1a 50%, #E50914 80%, transparent 100%)",
    boxShadow: "0 0 18px 6px rgba(229,9,20,0.55)",
  },
  /* Title bar */
  titleBar: {
    display: "flex", alignItems: "center", justifyContent: "space-between",
    padding: "14px 24px 10px",
    borderBottom: "1px solid rgba(229,9,20,0.15)",
    background: "rgba(229,9,20,0.04)",
    flexShrink: 0, position: "relative", zIndex: 5,
  },
  brand: { display: "flex", alignItems: "center", gap: 12 },
  dots:  { display: "flex", gap: 7 },
  dot:   { width: 12, height: 12, borderRadius: "50%", cursor: "pointer", transition: "filter 0.2s" },
  dotR:  { background: "#E50914", boxShadow: "0 0 7px rgba(229,9,20,0.8)" },
  dotY:  { background: "#f0a500", boxShadow: "0 0 7px rgba(240,165,0,0.5)" },
  dotG:  { background: "#3fb950", boxShadow: "0 0 7px rgba(63,185,80,0.5)" },
  titleText: {
    fontSize: 10, letterSpacing: "0.3em",
    color: "rgba(229,9,20,0.8)", textTransform: "uppercase", fontWeight: 500,
  },
  closeBtn: {
    background: "none", border: "1px solid rgba(229,9,20,0.3)",
    color: "rgba(229,9,20,0.7)", fontFamily: "inherit", fontSize: 9,
    letterSpacing: "0.2em", padding: "4px 12px", borderRadius: 3,
    cursor: "pointer", textTransform: "uppercase", transition: "all 0.2s",
  },
  /* Scrollable body */
  body: {
    flex: 1, overflowY: "auto", padding: "16px 28px 8px",
    position: "relative", zIndex: 5,
    scrollbarWidth: "thin", scrollbarColor: "rgba(229,9,20,0.2) transparent",
  },
  /* ASCII banner */
  ascii: {
    color: "rgba(229,9,20,0.65)", fontSize: 11, lineHeight: 1.3,
    marginBottom: 12, display: "block", whiteSpace: "pre",
    userSelect: "none",
  },
  /* History lines */
  lineBase: { fontSize: 13, lineHeight: 1.75, display: "block" },
  lineInput:  { color: "#46d369" },
  lineOutput: { color: "rgba(200,200,215,0.9)" },
  lineError:  { color: "#E50914" },
  lineSystem: { color: "rgba(229,9,20,0.55)", fontStyle: "italic" },
  /* Prompt row */
  promptRow: {
    display: "flex", alignItems: "center",
    padding: "8px 28px",
    borderTop: "1px solid rgba(229,9,20,0.1)",
    background: "rgba(229,9,20,0.025)",
    flexShrink: 0, position: "relative", zIndex: 5,
  },
  promptSymbol: {
    color: "#E50914", fontSize: 14, fontWeight: 700,
    marginRight: 12, userSelect: "none",
    textShadow: "0 0 10px rgba(229,9,20,0.9)",
  },
  promptInput: {
    flex: 1, background: "transparent", border: "none", outline: "none",
    color: "#e8e8f0", fontFamily: "inherit", fontSize: 13,
    caretColor: "#E50914",
  },
  /* Status bar */
  statusBar: {
    padding: "5px 28px",
    display: "flex", justifyContent: "space-between", alignItems: "center",
    borderTop: "1px solid rgba(229,9,20,0.08)",
    background: "rgba(0,0,0,0.45)",
    flexShrink: 0, position: "relative", zIndex: 5,
  },
  statusTxt: {
    fontSize: 9, letterSpacing: "0.18em", textTransform: "uppercase",
    color: "rgba(150,150,165,0.45)",
  },
  statusDot: {
    width: 5, height: 5, borderRadius: "50%",
    background: "#46d369", boxShadow: "0 0 6px #46d369",
  },
};

/* ── ASCII banner ── */
const ASCII = `██████╗  ██████╗ ██████╗ ████████╗███████╗ ██████╗ ██╗     ██╗ ██████╗
██╔══██╗██╔═══██╗██╔══██╗╚══██╔══╝██╔════╝██╔═══██╗██║     ██║██╔═══██╗
██████╔╝██║   ██║██████╔╝   ██║   █████╗  ██║   ██║██║     ██║██║   ██║
██╔═══╝ ██║   ██║██╔══██╗   ██║   ██╔══╝  ██║   ██║██║     ██║██║   ██║
██║     ╚██████╔╝██║  ██║   ██║   ██║     ╚██████╔╝███████╗██║╚██████╔╝
╚═╝      ╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚═╝      ╚═════╝ ╚══════╝╚═╝ ╚═════╝`;

/* ── Keyframe injection (one-time) ── */
const KEYFRAMES = `
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,300;0,400;0,500;0,700;1,400&display=swap');
@keyframes termIn {
  from { opacity:0; transform:scale(0.97) translateY(14px); filter:brightness(0.2); }
  to   { opacity:1; transform:scale(1)    translateY(0);     filter:brightness(1); }
}
@keyframes redLinePulse { 0%,100%{opacity:1} 50%{opacity:0.55} }
@keyframes promptGlow   {
  0%,100%{ text-shadow: 0 0 8px rgba(229,9,20,0.8); }
  50%    { text-shadow: 0 0 20px rgba(229,9,20,1), 0 0 40px rgba(229,9,20,0.4); }
}
@keyframes statusBlink { 0%,100%{opacity:1} 50%{opacity:0.15} }
@keyframes lineIn {
  from { opacity:0; transform:translateX(-5px); }
  to   { opacity:1; transform:translateX(0); }
}
.term-overlay-anim { animation: termIn 0.45s cubic-bezier(0.16,1,0.3,1) both; }
.term-redline-anim { animation: redLinePulse 3s ease-in-out infinite; }
.term-prompt-anim  { animation: promptGlow 2.2s ease-in-out infinite; }
.term-blink-anim   { animation: statusBlink 1.4s step-end infinite; }
.term-line-anim    { animation: lineIn 0.15s ease both; }
.term-close-hover:hover { background:rgba(229,9,20,0.15) !important; color:#E50914 !important; border-color:#E50914 !important; }
.term-dot-hover:hover   { filter: brightness(1.5) !important; }
.term-body-scroll::-webkit-scrollbar        { width:3px; }
.term-body-scroll::-webkit-scrollbar-thumb  { background:rgba(229,9,20,0.25); border-radius:2px; }
`;

function injectStyles() {
  if (document.getElementById("term-cinematic-styles")) return;
  const el = document.createElement("style");
  el.id = "term-cinematic-styles";
  el.textContent = KEYFRAMES;
  document.head.appendChild(el);
}

/* ══════════════════════════════════════════════
   Main Terminal Component
══════════════════════════════════════════════ */
export const Terminal = ({ onClose }) => {
  const [input, setInput] = useState("");
  const [cmdHistory, setCmdHistory] = useState([]); // arrow-key command history
  const [historyIdx, setHistoryIdx] = useState(-1);
  const [history, setHistory] = useState([
    { type: "system", text: "Welcome to Portfolio Terminal v2.0" },
    { type: "system", text: 'Type "help" for available commands' },
    { type: "empty" },
  ]);

  const navigate = useNavigate();
  const bodyRef  = useRef(null);
  const inputRef = useRef(null);

  /* Inject font + keyframes once */
  useEffect(() => { injectStyles(); }, []);

  /* Auto-scroll */
  useEffect(() => {
    if (bodyRef.current)
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [history]);

  /* Focus on mount */
  useEffect(() => { inputRef.current?.focus(); }, []);

  /* ── Custom scripts ── */
  const customScripts = {
    random: {
      description: "Show a random project from all profiles",
      fn(sandbox) {
        const all = [];
        Object.values(sandbox.profiles).forEach((p) =>
          p.sections.forEach((s) =>
            s.projects.forEach((pr) =>
              all.push({ ...pr, profileName: p.name, sectionName: s.title })
            )
          )
        );
        if (!all.length) return ["No projects available"];
        const r = all[Math.floor(Math.random() * all.length)];
        return [
          "🎲 Random Project:",
          "",
          r.title,
          `Profile : ${r.profileName}`,
          `Section : ${r.sectionName}`,
          "",
          r.description,
          "",
          `Use "project ${r.id}" for full details`,
        ];
      },
    },
    techstack: {
      description: "Technology breakdown across all profiles",
      fn(sandbox) {
        const cnt = {};
        Object.values(sandbox.profiles).forEach((p) =>
          p.sections.forEach((s) =>
            s.projects.forEach((pr) =>
              pr.technologies.forEach((t) => (cnt[t] = (cnt[t] || 0) + 1))
            )
          )
        );
        const sorted = Object.entries(cnt)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 10);
        const maxCount = sorted[0]?.[1] || 1;
        const out = ["Top 10 Technologies:", ""];
        sorted.forEach(([tech, count], i) => {
          const bar = "█".repeat(Math.round((count / maxCount) * 20));
          out.push(
            `  ${String(i + 1).padStart(2)}. ${tech.padEnd(22)} ${bar} (${count})`
          );
        });
        return out;
      },
    },
  };

  const executeSafeScript = (fn, args = []) => {
    try {
      const sandbox = {
        console: { log: (...msgs) => msgs.map(String) },
        Math, Date, JSON,
        profiles: JSON.parse(JSON.stringify(profiles)),
        args,
      };
      const result = fn.call(sandbox, sandbox);
      return Array.isArray(result) ? result : [String(result)];
    } catch (e) {
      return [`Script error: ${e.message}`];
    }
  };

  /* ── Built-in commands ── */
  const commands = {
    help: () => {
      const base = [
        "Available commands:",
        "",
        "  help           Show this message",
        "  about          About me",
        "  skills         All technologies across profiles",
        "  projects       All projects across profiles",
        "  project <id>   View project by ID",
        "  work           Work experience",
        "  education      Education history",
        "  resume         Full resume summary",
        "  download       Download PDF resume",
        "  contact        Contact information",
        "  search <kw>    Full-text project search",
        "  stats          Portfolio statistics",
        "  clear          Clear terminal",
        "  gui            Return to GUI mode",
      ];
      const scripts =
        Object.keys(customScripts).length > 0
          ? [
              "",
              "Custom Scripts:",
              ...Object.entries(customScripts).map(
                ([name, { description }]) =>
                  `  ${name.padEnd(14)} ${description}`
              ),
            ]
          : [];
      return [...base, ...scripts];
    },

    about: () => [
      "Full Stack Developer & AI/ML Engineer",
      "",
      "Passionate about building innovative solutions spanning web development,",
      "artificial intelligence, and real-time systems. From pixel-perfect UIs to",
      "scalable microservices, from NLP models to computer vision applications.",
      "",
      "This terminal provides access to all my work across different domains.",
    ],

    skills: () => {
      const all = new Set();
      Object.values(profiles).forEach((p) =>
        p.sections.forEach((s) =>
          s.projects.forEach((pr) => pr.technologies.forEach((t) => all.add(t)))
        )
      );
      const list = [...all].sort();
      return [
        "Technical Skills (All Domains):",
        "",
        ...list.map((t, i) => `  ${String(i + 1).padStart(2)}. ${t}`),
        "",
        `Total: ${list.length} technologies`,
      ];
    },

    projects: () => {
      const out = ["All Projects:", ""];
      Object.entries(profiles).forEach(([, p]) => {
        out.push(`── ${p.name} ──`, "");
        p.sections.forEach((s) => {
          out.push(`  ${s.title}`);
          s.projects.forEach((pr) =>
            out.push(`    • ${pr.title.padEnd(30)} [${pr.id}]`)
          );
          out.push("");
        });
      });
      out.push('Use "project <id>" for details');
      return out;
    },

    project: (args) => {
      const id = args[0];
      if (!id) return ["Usage: project <id>", "Example: project p-work-1"];
      let found = null, sName = "", pName = "";
      Object.values(profiles).forEach((p) =>
        p.sections.forEach((s) => {
          const pr = s.projects.find((x) => x.id === id);
          if (pr) { found = pr; sName = s.title; pName = p.name; }
        })
      );
      if (!found)
        return [`Project "${id}" not found`, 'Use "projects" to see all IDs'];
      const out = [
        `=== ${found.title} ===`, "",
        `Profile  : ${pName}`,
        `Section  : ${sName}`,
        `Category : ${found.category}`,
        `Year     : ${found.year}`,
        `Duration : ${found.duration}`,
        `Match    : ${found.match}`,
        "", "Description:", found.description,
        "", "Technologies:",
        ...found.technologies.map((t) => `  • ${t}`),
      ];
      if (found.features?.length) {
        out.push("", "Key Features:");
        found.features.forEach((f, i) =>
          out.push(`  ${i + 1}. ${f.title} (${f.duration})`, `     ${f.desc}`, "")
        );
      }
      if (found.tags?.length) out.push("Tags: " + found.tags.join(", "));
      return out;
    },

    work: () => {
      const out = ["Work Experience:", ""];
      Object.values(profiles).forEach((p) => {
        const s = p.sections.find(
          (x) =>
            x.title.toLowerCase().includes("work") ||
            x.title.toLowerCase().includes("experience")
        );
        if (s) {
          out.push(`── ${p.name} ──`);
          s.projects.forEach((pr) => {
            out.push(`  • ${pr.title}`, `    ${pr.year} | ${pr.duration}`, "");
          });
        }
      });
      return out;
    },

    education: () => {
      const out = ["Education:", ""];
      Object.values(profiles).forEach((p) => {
        const s = p.sections.find((x) =>
          x.title.toLowerCase().includes("education")
        );
        if (s) {
          out.push(`── ${p.name} ──`);
          s.projects.forEach((pr) =>
            out.push(
              `  • ${pr.title}`,
              `    ${pr.year} | ${pr.rating}`,
              `    ${pr.description.substring(0, 100)}…`,
              ""
            )
          );
        }
      });
      return out;
    },

    resume: () => {
      const out = ["=== COMPREHENSIVE RESUME ===", ""];
      Object.values(profiles).forEach((p) => {
        out.push(`━━ ${p.name} ━━`, "");
        p.sections.forEach((s) => {
          out.push(`  ${s.title}`);
          s.projects.forEach((pr) => {
            out.push(`    • ${pr.title}  (${pr.year})`);
            if (pr.role) out.push(`      Role: ${pr.role}`);
          });
          out.push("");
        });
      });
      out.push('Type "download" to get the PDF version.');
      return out;
    },

    download: () => {
      const a = document.createElement("a");
      a.href = "/resume.pdf";
      a.download = "Resume.pdf";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      return ["Downloading resume.pdf…"];
    },

    contact: () => [
      "Contact Information:",
      "",
      "  Email    : your.email@example.com",
      "  GitHub   : github.com/yourusername",
      "  LinkedIn : linkedin.com/in/yourprofile",
      "  Portfolio: yourwebsite.com",
    ],

    search: (args) => {
      const q = args.join(" ").toLowerCase();
      if (!q) return ["Usage: search <keyword>", "Example: search react"];
      const results = [];
      Object.values(profiles).forEach((p) =>
        p.sections.forEach((s) =>
          s.projects.forEach((pr) => {
            const hay = (
              pr.title + " " + pr.description + " " +
              pr.technologies.join(" ") + " " + (pr.tags || []).join(" ")
            ).toLowerCase();
            if (hay.includes(q))
              results.push({ id: pr.id, title: pr.title, profile: p.name, section: s.title });
          })
        )
      );
      if (!results.length) return [`No results for "${q}"`];
      const out = [`Found ${results.length} result(s) for "${q}":`, ""];
      results.forEach((r, i) =>
        out.push(
          `  ${i + 1}. ${r.title}`,
          `     Profile: ${r.profile}  |  Section: ${r.section}  |  ID: ${r.id}`,
          ""
        )
      );
      return out;
    },

    stats: () => {
      const s = { projects: 0, techs: new Set(), cats: new Set() };
      Object.values(profiles).forEach((p) =>
        p.sections.forEach((sec) =>
          sec.projects.forEach((pr) => {
            s.projects++;
            pr.technologies.forEach((t) => s.techs.add(t));
            s.cats.add(pr.category);
          })
        )
      );
      const breakdown = Object.values(profiles).map((p) => {
        let n = 0;
        p.sections.forEach((sec) => (n += sec.projects.length));
        return `  • ${p.name.padEnd(12)} ${n} projects`;
      });
      return [
        "Portfolio Statistics:",
        "",
        `  Profiles     : ${Object.keys(profiles).length}`,
        `  Projects     : ${s.projects}`,
        `  Technologies : ${s.techs.size}`,
        `  Categories   : ${s.cats.size}`,
        "",
        "Breakdown:",
        ...breakdown,
      ];
    },

    clear: () => "__clear__",
    gui:   () => "__gui__",
  };

  /* ── Command execution ── */
  const handleCommand = useCallback(
    (raw) => {
      if (!raw.trim()) return;

      // Save to arrow-key history
      setCmdHistory((prev) => [raw, ...prev].slice(0, 50));
      setHistoryIdx(-1);

      const parts = raw.trim().split(/\s+/);
      const cmd   = parts[0].toLowerCase();
      const args  = parts.slice(1);

      const addInput  = (text) => ({ type: "input",  text: `❯ ${text}` });
      const addOutput = (text) => ({ type: "output", text });
      const addError  = (text) => ({ type: "error",  text });
      const addEmpty  = ()     => ({ type: "empty" });

      // Handle sentinels that need to fire outside the state updater
      if (cmd === "clear") { setHistory([]); return; }
      if (cmd === "gui") {
        setHistory((prev) => [...prev, addInput(raw), addOutput("Clearing session…"), addOutput("Switching to GUI mode…"), addEmpty()]);
        setTimeout(() => {
          localStorage.removeItem("selectedProfile");
          navigate("/");
        }, 120);
        return;
      }

      setHistory((prev) => {
        const lines = [...prev, addInput(raw)];

        if (commands[cmd]) {
          try {
            const result = commands[cmd](args);
            if (Array.isArray(result)) {
              result.forEach((l) =>
                lines.push(l === "" ? addEmpty() : addOutput(l))
              );
            }
          } catch (e) {
            lines.push(addError(`Error: ${e.message}`));
          }
        } else if (customScripts[cmd]) {
          const result = executeSafeScript(customScripts[cmd].fn, args);
          result.forEach((l) =>
            lines.push(l === "" ? addEmpty() : addOutput(l))
          );
        } else {
          lines.push(addError(`Command not found: ${cmd}`));
          lines.push(addOutput('Type "help" to see available commands'));
        }

        lines.push(addEmpty());
        return lines;
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [onClose]
  );

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleCommand(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const next = Math.min(historyIdx + 1, cmdHistory.length - 1);
      setHistoryIdx(next);
      setInput(cmdHistory[next] ?? "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = Math.max(historyIdx - 1, -1);
      setHistoryIdx(next);
      setInput(next === -1 ? "" : cmdHistory[next] ?? "");
    } else if (e.key === "Escape") {
      onClose();
    }
  };

  /* ── Render ── */
  return (
    <div style={S.overlay} className="term-overlay-anim selection:bg-green-500 selection:text-black">
      {/* Atmosphere layers */}
      <div style={S.scanlines} />
      <div style={S.vignette} />
      <div style={S.redLine} className="term-redline-anim" />

      {/* Title bar */}
      <div style={S.titleBar}>
        <div style={S.brand}>
          <div style={S.dots}>
            <div
              style={{ ...S.dot, ...S.dotR }}
              className="term-dot-hover"
              onClick={onClose}
              title="Close"
            />
            <div style={{ ...S.dot, ...S.dotY }} className="term-dot-hover" />
            <div style={{ ...S.dot, ...S.dotG }} className="term-dot-hover" />
          </div>
          <span style={S.titleText}>Portfolio Terminal — v2.0</span>
        </div>
        <button
          style={S.closeBtn}
          className="term-close-hover"
          onClick={onClose}
        >
          [ ESC ]
        </button>
      </div>

      {/* Scrollable history */}
      <div
        ref={bodyRef}
        style={S.body}
        className="term-body-scroll"
        onClick={() => inputRef.current?.focus()}
      >
        {/* ASCII banner */}
        <span style={S.ascii}>{ASCII}</span>

        {history.map((line, i) => {
          if (line.type === "empty")
            return <span key={i} style={{ display: "block", height: 6 }} />;
          return (
            <span
              key={i}
              className="term-line-anim"
              style={{
                ...S.lineBase,
                ...(line.type === "input"  ? S.lineInput  : {}),
                ...(line.type === "output" ? S.lineOutput : {}),
                ...(line.type === "error"  ? S.lineError  : {}),
                ...(line.type === "system" ? S.lineSystem : {}),
              }}
            >
              {line.text}
            </span>
          );
        })}

        <div style={{ height: 4 }} />
      </div>

      {/* Prompt */}
      <div style={S.promptRow}>
        <span style={S.promptSymbol} className="term-prompt-anim">❯</span>
        <input
          ref={inputRef}
          autoFocus
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          style={S.promptInput}
          placeholder="type a command…"
          autoComplete="off"
          spellCheck="false"
        />
      </div>

      {/* Status bar */}
      <div style={S.statusBar}>
        <span style={S.statusTxt}>
          safe shell &nbsp;|&nbsp; all profiles loaded &nbsp;|&nbsp; type{" "}
          <span style={{ color: "#E50914" }}>help</span>
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
          <span style={S.statusTxt}>live</span>
          <div style={S.statusDot} className="term-blink-anim" />
        </div>
      </div>
    </div>
  );
};

export default Terminal;