/**
 * RecruiterTour.jsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Interactive spotlight tour for recruiters.
 * Uses data-tour="<id>" attributes to locate and highlight elements.
 *
 * SETUP — 3 steps:
 *
 * 1. Add data-tour attributes to your existing components (see list below).
 * 2. Drop this file into src/components/RecruiterTour.jsx
 * 3. Mount it once in BrowsePage.jsx:
 *      import RecruiterTour from '../components/RecruiterTour';
 *      // inside BrowsePage JSX, after <Chatbot />:
 *      <RecruiterTour />
 *
 * ── data-tour attributes to add ──────────────────────────────────────────────
 *
 * ProfileSelectionPage.jsx
 *   • The outer wrapper div → data-tour="profile-grid"
 *   • The "Portfolio" tile  → data-tour="profile-portfolio"
 *
 * Navbar.jsx
 *   • The logo <span>       → data-tour="nav-logo"       (already has onClick)
 *   • Desktop nav links wrapper (the hidden lg:flex div) → data-tour="nav-links"
 *   • The search <button>   → data-tour="nav-search"
 *   • Terminal <button>     → data-tour="nav-terminal"
 *   • Profile avatar button → data-tour="nav-profile"
 *
 * Billboard.jsx
 *   • The outer <header>    → data-tour="billboard"
 *   • Resume <button>       → data-tour="billboard-resume"
 *
 * Row.jsx  (first row only matters — tour targets the first match)
 *   • The scrollable div    → data-tour="row-scroll"
 *   • The right-arrow btn   → data-tour="row-arrow"
 *
 * Chatbot.jsx
 *   • The floating launcher button → data-tour="chatbot-btn"
 * ─────────────────────────────────────────────────────────────────────────────
 */

import {
  useState, useEffect, useCallback,
} from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronRight, ChevronLeft, X, User, Search,
  TerminalSquare, MessageCircle, Play, BookOpen,
  Layers, ArrowRight, Sparkles,
} from 'lucide-react';

// ─── Tour step definitions ────────────────────────────────────────────────────
// target: data-tour value to spotlight (null = centre-screen card, no spotlight)
// placement: where tooltip renders relative to spotlight box
const STEPS = [
  {
    id: 'welcome',
    target: null,
    placement: 'center',
    icon: <Sparkles size={22} className="text-[#E50914]" />,
    badge: 'Welcome',
    title: "Tanmay's Portfolio — Quick Tour",
    body: "This portfolio works like Netflix. You pick a profile, browse projects in rows, and click into any project for the full story. This 8-step tour will get you oriented in under 90 seconds.",
    cta: 'Start Tour',
  },
  {
    id: 'profiles',
    target: 'profile-grid',
    placement: 'center',
    icon: <User size={22} className="text-blue-400" />,
    badge: '1 / 7',
    title: 'Pick a Profile First',
    body: "Four profiles, four lenses on Tanmay's work. Start with Portfolio for the full CV overview, or jump straight to Fullstack or AI/ML if you have a specific focus.",
    cta: 'Next',
    highlight: [
      { color: 'bg-emerald-700', label: 'Portfolio', hint: 'CV overview — start here' },
      { color: 'bg-blue-600',    label: 'Personal',  hint: 'Journey & story' },
      { color: 'bg-red-600',     label: 'Fullstack', hint: 'Web apps & systems' },
      { color: 'bg-purple-600',  label: 'AI / ML',   hint: 'ML & research' },
    ],
  },
  {
    id: 'billboard',
    target: 'billboard',
    placement: 'bottom',
    icon: <Play size={22} className="text-white" />,
    badge: '2 / 7',
    title: 'Hero Banner',
    body: "The big card at the top spotlights the featured project or intro for the active profile. The Resume and About Me buttons are here too.",
    cta: 'Next',
  },
  {
    id: 'row-scroll',
    target: 'row-scroll',
    placement: 'top',
    icon: <Layers size={22} className="text-amber-400" />,
    badge: '3 / 7',
    title: 'Browse Project Rows',
    body: "Each row is a section — Work Experience, Education, Featured Projects, etc. Scroll horizontally inside a row. Hover a row to reveal the arrow buttons.",
    cta: 'Next',
  },
  {
    id: 'row-arrow',
    target: 'row-arrow',
    placement: 'top',
    icon: <ArrowRight size={22} className="text-amber-400" />,
    badge: '4 / 7',
    title: 'Scroll Left & Right',
    body: "Use these arrow buttons to scroll through all projects in a row. Click any project card to open a quick-view popup with the summary, tech stack and role.",
    cta: 'Next',
  },
  {
    id: 'nav-links',
    target: 'nav-links',
    placement: 'bottom',
    icon: <BookOpen size={22} className="text-emerald-400" />,
    badge: '5 / 7',
    title: 'Navigation',
    body: (
      <span>
        <strong className="text-white">Projects</strong> — searchable grid of everything.{' '}
        <strong className="text-white">New & Popular</strong> — ranked by recency.{' '}
        <strong className="text-white">My List</strong> — save projects with the + button on any card.
      </span>
    ),
    cta: 'Next',
  },
  {
    id: 'nav-search',
    target: 'nav-search',
    placement: 'bottom',
    icon: <Search size={22} className="text-emerald-400" />,
    badge: '6 / 7',
    title: 'Search Anything',
    body: "Click this icon, type a skill or keyword (e.g. 'React', 'WebRTC', 'LangGraph'), then press Enter. Results show up instantly on the Projects page.",
    cta: 'Next',
  },
  {
    id: 'chatbot-btn',
    target: 'chatbot-btn',
    placement: 'top-left',
    icon: <MessageCircle size={22} className="text-emerald-400" />,
    badge: '7 / 7',
    title: 'Ask the AI Assistant',
    body: "This chat button opens an AI assistant that knows Tanmay's entire portfolio. Ask it anything -- 'What's his strongest backend project?' or 'Does he know PyTorch?' It may take ~60 sec to respond on first use.",
    cta: "Done — Let's explore!",
    isLast: true,
  },
];

const TOUR_KEY = 'recruiter_tour_v2_done';
const PADDING  = 10; // spotlight padding in px

// ─── Helpers ──────────────────────────────────────────────────────────────────
function getRect(tourId) {
  const el = document.querySelector(`[data-tour="${tourId}"]`);
  if (!el) return null;
  const r = el.getBoundingClientRect();
  return {
    top:    r.top    + window.scrollY - PADDING,
    left:   r.left   + window.scrollX - PADDING,
    width:  r.width  + PADDING * 2,
    height: r.height + PADDING * 2,
    // centre of element (viewport-relative, for scrolling)
    centerY: r.top + r.height / 2,
  };
}

function scrollToElement(tourId) {
  const el = document.querySelector(`[data-tour="${tourId}"]`);
  if (!el) return;
  el.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// ─── Spotlight SVG (cuts a hole in the overlay) ───────────────────────────────
function Spotlight({ rect }) {
  const [ww, wh] = [
    document.documentElement.scrollWidth,
    document.documentElement.scrollHeight,
  ];

  if (!rect) return (
    <svg
      className="absolute inset-0 pointer-events-none"
      style={{ width: ww, height: wh }}
    >
      <rect x={0} y={0} width={ww} height={wh} fill="rgba(0,0,0,0.78)" />
    </svg>
  );

  const r = 12; // border radius of hole
  const { top, left, width, height } = rect;

  return (
    <svg
      className="absolute inset-0 pointer-events-none"
      style={{ width: ww, height: wh }}
    >
      <defs>
        <mask id="tour-mask">
          <rect x={0} y={0} width={ww} height={wh} fill="white" />
          <rect
            x={left} y={top} width={width} height={height}
            rx={r} ry={r} fill="black"
          />
        </mask>
      </defs>
      <rect
        x={0} y={0} width={ww} height={wh}
        fill="rgba(0,0,0,0.78)"
        mask="url(#tour-mask)"
      />
      {/* glowing border around spotlight */}
      <rect
        x={left} y={top} width={width} height={height}
        rx={r} ry={r}
        fill="none"
        stroke="#E50914"
        strokeWidth="2"
        opacity="0.7"
      />
    </svg>
  );
}

// ─── Tooltip card ─────────────────────────────────────────────────────────────
function Tooltip({ step, rect, onNext, onPrev, onClose, stepIndex }) {
  const CARD_W = 320;
  const CARD_H_ESTIMATE = 220;
  const GAP = 16;

  let style = {};

  if (!rect || step.placement === 'center') {
    // centred on viewport
    style = {
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: CARD_W,
      zIndex: 10001,
    };
  } else {
    const vw = window.innerWidth;
    const scrollY = window.scrollY;

    let top, left;

    if (step.placement === 'bottom') {
      top  = rect.top + rect.height + GAP - scrollY;
      left = rect.left + rect.width / 2 - CARD_W / 2 + window.scrollX - window.scrollX;
      // convert to fixed
      top  = rect.top - scrollY + rect.height + GAP;
      left = Math.max(12, Math.min(vw - CARD_W - 12, rect.left + rect.width / 2 - CARD_W / 2));
      style = { position: 'fixed', top, left, width: CARD_W, zIndex: 10001 };
    } else if (step.placement === 'top') {
      top  = rect.top - scrollY - CARD_H_ESTIMATE - GAP;
      left = Math.max(12, Math.min(vw - CARD_W - 12, rect.left + rect.width / 2 - CARD_W / 2));
      style = { position: 'fixed', top: Math.max(12, top), left, width: CARD_W, zIndex: 10001 };
    } else if (step.placement === 'top-left') {
      top  = rect.top - scrollY - CARD_H_ESTIMATE - GAP;
      left = Math.max(12, rect.left - CARD_W - GAP);
      style = { position: 'fixed', top: Math.max(12, top), left: Math.max(12, left), width: CARD_W, zIndex: 10001 };
    } else {
      // fallback centre
      style = {
        position: 'fixed',
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: CARD_W, zIndex: 10001,
      };
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 6, scale: 0.97 }}
      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      style={style}
      className="bg-[#1a1a1a] border border-white/12 rounded-2xl shadow-2xl overflow-hidden"
    >
      {/* Red accent bar */}
      <div className="h-1 w-full bg-linear-to-r from-[#E50914] via-red-400 to-transparent" />

      <div className="p-5">
        {/* Header row */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-white/6 flex items-center justify-center shrink-0">
              {step.icon}
            </div>
            <div>
              <span className="text-[10px] text-gray-500 font-semibold uppercase tracking-widest block">
                {step.badge}
              </span>
              <h3 className="text-white font-bold text-sm leading-snug">{step.title}</h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-300 transition shrink-0 mt-0.5"
          >
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        <p className="text-gray-400 text-xs leading-relaxed mb-4">
          {step.body}
        </p>

        {/* Profile highlights (step 1 only) */}
        {step.highlight && (
          <div className="grid grid-cols-2 gap-1.5 mb-4">
            {step.highlight.map(({ color, label, hint }) => (
              <div key={label} className="flex items-center gap-2 bg-white/4 rounded-lg px-2 py-1.5">
                <span className={`w-3 h-3 rounded ${color} shrink-0`} />
                <div>
                  <span className="text-white text-xs font-semibold block leading-none">{label}</span>
                  <span className="text-gray-500 text-[10px] leading-none">{hint}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between">
          {/* Dot progress */}
          <div className="flex gap-1">
            {STEPS.map((_, i) => (
              <span
                key={i}
                className={`rounded-full transition-all duration-200 ${
                  i === stepIndex
                    ? 'w-4 h-1.5 bg-[#E50914]'
                    : i < stepIndex
                    ? 'w-1.5 h-1.5 bg-gray-600'
                    : 'w-1.5 h-1.5 bg-gray-700'
                }`}
              />
            ))}
          </div>

          {/* Buttons */}
          <div className="flex gap-2">
            {stepIndex > 0 && (
              <button
                onClick={onPrev}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs text-gray-400 hover:text-white hover:bg-white/6 transition"
              >
                <ChevronLeft size={13} /> Back
              </button>
            )}
            <button
              onClick={onNext}
              className={`flex items-center gap-1 px-3.5 py-1.5 rounded-lg text-xs font-bold transition ${
                step.isLast
                  ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                  : 'bg-[#E50914] hover:bg-red-500 text-white'
              }`}
            >
              {step.cta} {!step.isLast && <ChevronRight size={13} />}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function RecruiterTour() {
  const [open,     setOpen]     = useState(false);
  const [stepIdx,  setStepIdx]  = useState(0);
  const [rect,     setRect]     = useState(null);

  // auto-open on first visit
  useEffect(() => {
    if (!localStorage.getItem(TOUR_KEY)) {
      const t = setTimeout(() => { setOpen(true); setStepIdx(0); }, 900);
      return () => clearTimeout(t);
    }
  }, []);

  // lock body scroll while tour is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  // recompute spotlight rect whenever step changes
  const computeRect = useCallback(() => {
    const step = STEPS[stepIdx];
    if (!step.target) { setRect(null); return; }
    const r = getRect(step.target);
    setRect(r);
  }, [stepIdx]);

  // scroll to element then compute rect
  useEffect(() => {
    if (!open) return;
    const step = STEPS[stepIdx];
    if (step.target) {
      scrollToElement(step.target);
      // wait for scroll to finish before measuring
      const t = setTimeout(computeRect, 350);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => setRect(null), 0);
      return () => clearTimeout(t);
    }
  }, [open, stepIdx, computeRect]);

  // recompute on resize
  useEffect(() => {
    if (!open) return;
    const onResize = () => computeRect();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [open, computeRect]);

  const close = useCallback(() => {
    setOpen(false);
    localStorage.setItem(TOUR_KEY, '1');
  }, []);

  // ESC to close
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') close(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [close]);

  const next = useCallback(() => {
    if (stepIdx < STEPS.length - 1) setStepIdx((s) => s + 1);
    else close();
  }, [stepIdx, close]);

  const prev = useCallback(() => {
    setStepIdx((s) => Math.max(0, s - 1));
  }, []);

  const openTour = () => {
    setStepIdx(0);
    setOpen(true);
  };

  const currentStep = STEPS[stepIdx];

  return (
    <>
      {/* ── Floating launcher (always visible, bottom-left) ── */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: open ? 0 : 1, scale: open ? 0.8 : 1, pointerEvents: open ? 'none' : 'auto' }}
        transition={{ duration: 0.2 }}
        onClick={openTour}
        title="Take the recruiter tour"
        className="fixed bottom-6 left-6 z-9998 group flex items-center gap-2
                   bg-[#1a1a1a] border border-white/15 rounded-full
                   pl-3 pr-4 py-2.5 shadow-2xl
                   hover:border-[#E50914]/60 hover:bg-[#1f1f1f] transition-all duration-200"
      >
        <span className="w-5 h-5 rounded-full bg-[#E50914] flex items-center justify-center text-white text-[10px] font-black shrink-0">
          ?
        </span>
        <span className="text-gray-400 text-xs font-semibold group-hover:text-white transition-colors">
          Recruiter Tour
        </span>
      </motion.button>

      {/* ── Tour overlay ── */}
      {createPortal(
        <AnimatePresence>
          {open && (
            <motion.div
              key="tour-root"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-9999"
              style={{ pointerEvents: 'none' }}
            >
              {/* Overlay + spotlight */}
              <div
                className="absolute inset-0"
                style={{
                  width: document.documentElement.scrollWidth,
                  height: document.documentElement.scrollHeight,
                  pointerEvents: 'all',
                }}
                onClick={(e) => {
                  // only close if clicking the dark overlay, not the tooltip
                  if (e.target === e.currentTarget) close();
                }}
              >
                <Spotlight rect={rect} />
              </div>

              {/* Tooltip */}
              <div style={{ pointerEvents: 'all' }}>
                <AnimatePresence mode="wait">
                  <Tooltip
                    key={stepIdx}
                    step={currentStep}
                    rect={rect}
                    stepIndex={stepIdx}
                    totalSteps={STEPS.length}
                    onNext={next}
                    onPrev={prev}
                    onClose={close}
                  />
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </>
  );
}