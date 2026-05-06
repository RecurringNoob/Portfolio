import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  ArrowUpRight, MapPin, Mail, Github, Linkedin,
  ChevronDown, X, ExternalLink, Code2, Cpu, Layers,
  BookOpen, Briefcase, GraduationCap, Users, Star,
  Calendar, Clock, Award, TrendingUp, ChevronRight,
  Terminal, Zap, Download
} from 'lucide-react';

// ─── DATA (pulled from profiles.portfolio) ──────────────────────────────────
const DATA = {
  name: 'Tanmay Khandelwal',
  title: 'Full Stack Developer & AI/ML Engineer',
  tagline: 'I build intelligent systems and scalable web applications.',
  location: 'India',
  email: 'tanmay@example.com',
  github: 'RecurringNoob',
  available: true,
  stats: [
    { label: 'Projects built', value: '15+' },
    { label: 'DSA Questions solved', value: '350+' },
  ],
  skills: {
    Frontend: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Redux Toolkit', 'Vite'],
    Backend: ['Node.js', 'Express', 'Python', 'FastAPI', 'REST API', 'Zod', 'Mongoose'],
    'AI / ML': ['PyTorch', 'TensorFlow', 'scikit-learn', 'LangChain', 'LangGraph', 'HuggingFace', 'OpenCV'],
    Databases: ['MongoDB', 'PostgreSQL', 'TimescaleDB', 'Supabase', 'SQLite', 'Redis'],
    'DevOps & Tools': ['Docker', 'Docker Compose', 'GitHub Actions', 'Git', 'Linux', 'APScheduler'],
  },
  experience: [
    {
      id: 'exp-1',
      role: 'Backend Developer Intern',
      company: 'Mentox Technologies',
      period: 'Jun 2024 – Jan 2025',
      duration: '6 months',
      type: 'Internship',
      stack: ['Node.js', 'Express', 'MongoDB', 'Mongoose', 'Zod'],
      summary: 'Designed scalable backend services for an intelligent ERP platform. Built RESTful APIs, architected optimised MongoDB schemas, and implemented multi-step automation workflows handling large-scale data.',
      highlights: [
        'Modular Express.js API layer across inventory, HR, and finance ERP modules',
        'Compound indexes and pre-save hooks — reduced full-collection scans significantly',
        'Deterministic allocation engine processing thousands of records',
        'Zod validation at every API boundary, eliminating runtime type errors',
      ],
    },
  ],
  education: [
    {
      id: 'edu-1',
      degree: 'B.Tech — Computer Science & Engineering',
      institution: 'Currently Pursuing',
      period: '2023 – 2027',
      courses: ['Data Structures & Algorithms', 'Operating Systems', 'DBMS', 'Computer Networks', 'Machine Learning', 'System Design'],
    },
  ],
  projects: [
    {
      id: 'ai-agent-1',
      title: 'AI Productivity Agent',
      category: 'Agentic AI',
      year: '2025',
      difficulty: 'Expert',
      summary: 'Multi-agent supervisor with LangGraph + Gemini managing calendar scheduling and email triage via natural language. Human-in-the-Loop for high-stakes actions.',
      stack: ['Python', 'FastAPI', 'LangGraph', 'Google Gemini', 'SQLite', 'asyncio'],
      metrics: [{ label: 'Tests', value: '150+' }, { label: 'Agents', value: '3' }, { label: 'Latency', value: '<5s' }],
      link: 'https://github.com/RecurringNoob/AI-productivity-agent',
      featured: true,
    },
    {
      id: 'fs-rtc-1',
      title: 'Student Video Platform',
      category: 'Real-Time Systems',
      year: '2024',
      difficulty: 'Expert',
      summary: 'Production-ready WebRTC platform with P2P video calling, random peer matching, watch parties, and real-time chat. Redux Toolkit for state, Socket.IO for signaling.',
      stack: ['React', 'WebRTC', 'Socket.IO', 'Redux Toolkit', 'Node.js'],
      metrics: [{ label: 'Drift', value: '<200ms' }, { label: 'Duration', value: '4 mo' }],
      link: '#',
      featured: true,
    },
    {
      id: 'ai-nlp-1',
      title: 'Fake News Detection',
      category: 'NLP & Classification',
      year: '2024',
      difficulty: 'Advanced',
      summary: 'End-to-end ML pipeline: TF-IDF + VADER + spaCy + BERT. Benchmarked 5 models — SVM hit 97.6% accuracy. RSS scraper ingesting 15+ sources.',
      stack: ['Python', 'scikit-learn', 'BERT', 'LSTM', 'spaCy', 'TensorFlow'],
      metrics: [{ label: 'Accuracy', value: '97.6%' }, { label: 'Models', value: '5' }],
      link: '#',
      featured: true,
    },
    {
      id: 'ai-pred-1',
      title: 'Predictive Maintenance System',
      category: 'IoT & ML',
      year: '2024',
      difficulty: 'Advanced',
      summary: 'ESP32 → FastAPI → Random Forest → SSE → React dashboard. Six failure modes classified in real time with <5s latency. Docker Compose full-stack deploy.',
      stack: ['Python', 'FastAPI', 'scikit-learn', 'React', 'TimescaleDB', 'Docker'],
      metrics: [{ label: 'Latency', value: '<5s' }, { label: 'Modes', value: '6' }],
      link: 'https://github.com/RecurringNoob/machine-predictive-maintenance',
      featured: false,
    },
    {
      id: 'fs-ecom-1',
      title: 'Supabase E-Commerce',
      category: 'Full Stack',
      year: '2024',
      difficulty: 'Advanced',
      summary: 'Role-based pricing tiers, phone OTP auth, WhatsApp checkout. Strict RLS policies on PostgreSQL with normalized schemas and computed price views.',
      stack: ['React', 'TypeScript', 'Supabase', 'PostgreSQL', 'Tailwind CSS'],
      metrics: [{ label: 'Auth', value: 'Phone OTP' }, { label: 'Checkout', value: 'WhatsApp' }],
      link: '#',
      featured: false,
    },
    {
      id: 'fs-desktop-1',
      title: 'Travel Agency Billing System',
      category: 'Desktop App',
      year: '2024',
      difficulty: 'Advanced',
      summary: 'GST-compliant Java Swing desktop app with a 4-step wizard, multi-page PDF export via Apache PDFBox, and session serialization.',
      stack: ['Java', 'Swing', 'Apache PDFBox', 'MVC', 'Graphics2D'],
      metrics: [{ label: 'Type', value: 'Desktop' }, { label: 'Duration', value: '3 mo' }],
      link: 'https://github.com/RecurringNoob/ridhi-sidhi-tours',
      featured: false,
    },
  ],
  leadership: {
    role: 'Web Development Lead — ACM Student Chapter',
    period: '2023 – 2024',
    highlights: ['Mentored 50+ students', 'Managed 20-person volunteer team', 'Monthly workshops: React, Node.js, Git', 'Organised intra & inter-college hackathons'],
  },
};

// ─── UTILITIES ───────────────────────────────────────────────────────────────
const categoryColor = (cat) => {
  const map = {
    'Agentic AI': { bg: 'bg-purple-900/40', text: 'text-purple-300', border: 'border-purple-700/40' },
    'Real-Time Systems': { bg: 'bg-blue-900/40', text: 'text-blue-300', border: 'border-blue-700/40' },
    'NLP & Classification': { bg: 'bg-emerald-900/40', text: 'text-emerald-300', border: 'border-emerald-700/40' },
    'IoT & ML': { bg: 'bg-orange-900/40', text: 'text-orange-300', border: 'border-orange-700/40' },
    'Full Stack': { bg: 'bg-red-900/40', text: 'text-red-300', border: 'border-red-700/40' },
    'Desktop App': { bg: 'bg-amber-900/40', text: 'text-amber-300', border: 'border-amber-700/40' },
    'Computer Vision': { bg: 'bg-cyan-900/40', text: 'text-cyan-300', border: 'border-cyan-700/40' },
  };
  return map[cat] || { bg: 'bg-gray-800', text: 'text-gray-300', border: 'border-gray-600/40' };
};

const difficultyColor = (d) => {
  if (d === 'Expert') return 'text-red-400';
  if (d === 'Advanced') return 'text-amber-400';
  return 'text-emerald-400';
};

// ─── SUB-COMPONENTS ──────────────────────────────────────────────────────────

function Tag({ children, className = '' }) {
  return (
    <span className={`inline-block text-[11px] font-mono px-2 py-0.5 rounded-full border ${className}`}>
      {children}
    </span>
  );
}

function SectionLabel({ children }) {
  return (
    <div className="flex items-center gap-3 mb-8">
      <span className="w-6 h-px bg-white/20" />
      <span className="text-[11px] font-mono text-white/40 uppercase tracking-[0.2em]">{children}</span>
    </div>
  );
}

function ProjectCard({ project, index, onClick }) {
  const col = categoryColor(project.category);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      onClick={() => onClick(project)}
      className="group relative bg-white/[0.03] border border-white/[0.07] rounded-2xl p-6 cursor-pointer hover:bg-white/[0.06] hover:border-white/[0.13] transition-all duration-300"
    >
      <div className="flex items-start justify-between mb-4">
        <Tag className={`${col.bg} ${col.text} ${col.border}`}>{project.category}</Tag>
        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <span className={`text-[11px] font-mono ${difficultyColor(project.difficulty)}`}>{project.difficulty}</span>
          <ArrowUpRight size={14} className="text-white/40" />
        </div>
      </div>

      <h3 className="text-white font-semibold text-[15px] mb-2 leading-snug group-hover:text-white transition-colors">
        {project.title}
      </h3>
      <p className="text-white/50 text-[13px] leading-relaxed mb-4 line-clamp-3">
        {project.summary}
      </p>

      <div className="flex flex-wrap gap-1.5 mb-4">
        {project.stack.slice(0, 4).map((s) => (
          <span key={s} className="text-[10px] font-mono text-white/35 bg-white/[0.05] px-2 py-0.5 rounded-full border border-white/[0.06]">
            {s}
          </span>
        ))}
        {project.stack.length > 4 && (
          <span className="text-[10px] font-mono text-white/25">+{project.stack.length - 4}</span>
        )}
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-white/[0.06]">
        <div className="flex gap-4">
          {project.metrics.map((m) => (
            <div key={m.label}>
              <div className="text-white text-[13px] font-semibold">{m.value}</div>
              <div className="text-white/30 text-[10px] font-mono">{m.label}</div>
            </div>
          ))}
        </div>
        <span className="text-white/25 text-[11px] font-mono">{project.year}</span>
      </div>
    </motion.div>
  );
}

function ProjectDrawer({ project, onClose }) {
  const col = categoryColor(project?.category);

  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [project]);

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <AnimatePresence>
      {project && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[200]"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 260 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-lg bg-[#0e0e0e] border-l border-white/[0.08] z-[201] overflow-y-auto"
          >
            <div className="p-8">
              <button
                onClick={onClose}
                className="mb-8 flex items-center justify-center w-8 h-8 rounded-full border border-white/10 hover:border-white/30 text-white/40 hover:text-white/80 transition-all"
              >
                <X size={14} />
              </button>

              <Tag className={`${col.bg} ${col.text} ${col.border} mb-4`}>{project.category}</Tag>
              <h2 className="text-white text-2xl font-bold mb-1 leading-tight">{project.title}</h2>
              <div className="flex items-center gap-3 mb-6">
                <span className={`text-[12px] font-mono ${difficultyColor(project.difficulty)}`}>{project.difficulty}</span>
                <span className="text-white/20">·</span>
                <span className="text-white/40 text-[12px] font-mono">{project.year}</span>
              </div>

              <p className="text-white/60 text-[14px] leading-relaxed mb-8">
                {project.summary}
              </p>

              {project.metrics.length > 0 && (
                <div className="grid grid-cols-3 gap-3 mb-8">
                  {project.metrics.map((m) => (
                    <div key={m.label} className="bg-white/[0.04] border border-white/[0.07] rounded-xl p-3">
                      <div className="text-white font-semibold text-[18px]">{m.value}</div>
                      <div className="text-white/35 text-[11px] font-mono mt-0.5">{m.label}</div>
                    </div>
                  ))}
                </div>
              )}

              <div className="mb-8">
                <p className="text-[11px] font-mono text-white/30 uppercase tracking-widest mb-3">Tech stack</p>
                <div className="flex flex-wrap gap-2">
                  {project.stack.map((s) => (
                    <span key={s} className="text-[12px] font-mono text-white/50 bg-white/[0.05] px-3 py-1 rounded-full border border-white/[0.07]">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {project.link && project.link !== '#' && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[13px] font-mono text-white/60 hover:text-white border border-white/10 hover:border-white/30 px-4 py-2 rounded-full transition-all"
                >
                  <Github size={13} />
                  View on GitHub
                  <ExternalLink size={11} />
                </a>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function SkillGroup({ name, skills, index }) {
  const icons = {
    Frontend: Layers,
    Backend: Code2,
    'AI / ML': Cpu,
    Databases: Zap,
    'DevOps & Tools': Terminal,
  };
  const Icon = icons[name] || Code2;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="bg-white/[0.02] border border-white/[0.07] rounded-2xl p-5 hover:bg-white/[0.04] transition-colors"
    >
      <div className="flex items-center gap-2.5 mb-4">
        <div className="w-7 h-7 rounded-lg bg-white/[0.06] flex items-center justify-center">
          <Icon size={13} className="text-white/50" />
        </div>
        <span className="text-white/70 text-[13px] font-medium">{name}</span>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {skills.map((s) => (
          <span key={s} className="text-[11px] font-mono text-white/45 bg-white/[0.04] px-2.5 py-1 rounded-full border border-white/[0.06]">
            {s}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
export default function PortfolioPage() {
  const navigate = useNavigate();
  const [activeProject, setActiveProject] = useState(null);
  const [activeTab, setActiveTab] = useState('all');
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

  const tabs = ['all', 'AI/ML', 'Full Stack', 'Tools'];
  const filteredProjects = DATA.projects.filter((p) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'AI/ML') return ['Agentic AI', 'NLP & Classification', 'Computer Vision', 'IoT & ML'].includes(p.category);
    if (activeTab === 'Full Stack') return ['Real-Time Systems', 'Full Stack', 'E-Commerce', 'Content Platform'].includes(p.category);
    if (activeTab === 'Tools') return ['Desktop App', 'Productivity Tool', 'Image Processing'].includes(p.category);
    return true;
  });

  return (
    <div className="min-h-screen bg-[#080808] text-white selection:bg-white/20">
      {/* Subtle grid overlay */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.018]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
        }}
      />

      {/* Back nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 h-14 border-b border-white/[0.06] bg-[#080808]/80 backdrop-blur-xl">
        <button
          onClick={() => navigate('/browse')}
          className="flex items-center gap-2 text-[12px] font-mono text-white/40 hover:text-white/80 transition-colors"
        >
          <ChevronRight size={12} className="rotate-180" />
          Browse
        </button>
        <div className="flex items-center gap-2">
          <div className={`w-1.5 h-1.5 rounded-full ${DATA.available ? 'bg-emerald-400' : 'bg-amber-400'} animate-pulse`} />
          <span className="text-[11px] font-mono text-white/35">
            {DATA.available ? 'Open to work' : 'Not available'}
          </span>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section ref={heroRef} className="relative min-h-screen flex flex-col justify-end pb-20 pt-32 px-6 md:px-20 overflow-hidden">
        {/* Radial glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-white/[0.025] blur-[120px]" />
        </div>

        <motion.div style={{ opacity: heroOpacity, y: heroY }} className="relative z-10 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-8"
          >
            <div className="flex gap-1.5">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: i * 0.08 + 0.2, type: 'spring', stiffness: 300 }}
                  className="w-2 h-2 rounded-full bg-white/20"
                />
              ))}
            </div>
            <span className="text-[11px] font-mono text-white/30 uppercase tracking-[0.2em]">Portfolio</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-[clamp(48px,8vw,96px)] font-black tracking-[-0.04em] leading-[0.92] mb-6"
            style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
          >
            {DATA.name.split(' ').map((w, i) => (
              <span key={i} className={i === 0 ? 'text-white' : 'text-white/30'}>
                {w}{i < DATA.name.split(' ').length - 1 ? ' ' : ''}
              </span>
            ))}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[clamp(14px,2vw,18px)] text-white/40 leading-relaxed max-w-xl mb-10"
          >
            {DATA.tagline}{' '}
            <span className="text-white/60">Currently pursuing B.Tech in CSE and open to exciting opportunities.</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap items-center gap-4"
          >
            <a
              href={`https://github.com/${DATA.github}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-black text-[13px] font-semibold px-5 py-2.5 rounded-full hover:bg-white/90 transition-colors"
            >
              <Github size={14} />
              GitHub
            </a>
            <a
              href={`mailto:${DATA.email}`}
              className="inline-flex items-center gap-2 border border-white/15 text-white/70 hover:text-white hover:border-white/30 text-[13px] px-5 py-2.5 rounded-full transition-all"
            >
              <Mail size={14} />
              Get in touch
            </a>
            <span className="flex items-center gap-1.5 text-[12px] font-mono text-white/25">
              <MapPin size={11} />
              {DATA.location}
            </span>
          </motion.div>
        </motion.div>

        {/* Stats row at bottom of hero */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="relative z-10 flex flex-wrap gap-8 mt-20 pt-8 border-t border-white/[0.07]"
        >
          {DATA.stats.map((s, i) => (
            <div key={i}>
              <div className="text-[28px] font-black tracking-tight text-white leading-none">{s.value}</div>
              <div className="text-[11px] font-mono text-white/30 mt-1 uppercase tracking-widest">{s.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          className="absolute bottom-6 right-8 flex flex-col items-center gap-1 opacity-20"
        >
          <span className="text-[10px] font-mono text-white uppercase tracking-widest">scroll</span>
          <ChevronDown size={12} className="text-white" />
        </motion.div>
      </section>

      {/* ── SKILLS ── */}
      <section className="px-6 md:px-20 py-24 max-w-6xl mx-auto">
        <SectionLabel>Skills & Stack</SectionLabel>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {Object.entries(DATA.skills).map(([name, skills], i) => (
            <SkillGroup key={name} name={name} skills={skills} index={i} />
          ))}
        </div>
      </section>

      {/* ── EXPERIENCE ── */}
      <section className="px-6 md:px-20 py-24 border-t border-white/[0.05] max-w-6xl mx-auto">
        <SectionLabel>Work Experience</SectionLabel>
        {DATA.experience.map((exp, i) => (
          <motion.div
            key={exp.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="group relative"
          >
            <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-12 py-8 border-b border-white/[0.06] last:border-none">
              <div className="md:w-52 flex-shrink-0">
                <div className="text-white/20 text-[11px] font-mono mb-1">{exp.period}</div>
                <div className="text-emerald-400 text-[11px] font-mono">{exp.type}</div>
              </div>
              <div className="flex-1">
                <h3 className="text-white font-semibold text-[18px] mb-0.5">{exp.role}</h3>
                <div className="text-white/40 text-[14px] mb-4">{exp.company} · {exp.duration}</div>
                <p className="text-white/50 text-[13px] leading-relaxed mb-5">{exp.summary}</p>
                <ul className="space-y-2">
                  {exp.highlights.map((h, j) => (
                    <li key={j} className="flex items-start gap-2.5 text-[13px] text-white/40">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-white/20 flex-shrink-0" />
                      {h}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-1.5 mt-5">
                  {exp.stack.map((s) => (
                    <span key={s} className="text-[10px] font-mono text-white/35 border border-white/[0.08] px-2 py-0.5 rounded-full">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </section>

      {/* ── PROJECTS ── */}
      <section className="px-6 md:px-20 py-24 border-t border-white/[0.05]">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <SectionLabel>Selected Projects</SectionLabel>
            <div className="flex gap-1 flex-wrap">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`text-[11px] font-mono px-3 py-1.5 rounded-full transition-all capitalize ${
                    activeTab === tab
                      ? 'bg-white text-black'
                      : 'text-white/35 hover:text-white/60 border border-white/[0.08] hover:border-white/20'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {filteredProjects.map((p, i) => (
                <ProjectCard key={p.id} project={p} index={i} onClick={setActiveProject} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ── EDUCATION & LEADERSHIP ── */}
      <section className="px-6 md:px-20 py-24 border-t border-white/[0.05] max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div>
            <SectionLabel>Education</SectionLabel>
            {DATA.education.map((edu) => (
              <motion.div
                key={edu.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <GraduationCap size={14} className="text-white/30" />
                  <span className="text-white/25 text-[11px] font-mono">{edu.period}</span>
                </div>
                <h3 className="text-white font-semibold text-[16px] mb-1">{edu.degree}</h3>
                <p className="text-white/35 text-[13px] mb-5">{edu.institution}</p>
                <div className="flex flex-wrap gap-1.5">
                  {edu.courses.map((c) => (
                    <span key={c} className="text-[10px] font-mono text-white/35 border border-white/[0.07] px-2 py-0.5 rounded-full">
                      {c}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <div>
            <SectionLabel>Leadership</SectionLabel>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-2 mb-2">
                <Users size={14} className="text-white/30" />
                <span className="text-white/25 text-[11px] font-mono">{DATA.leadership.period}</span>
              </div>
              <h3 className="text-white font-semibold text-[16px] mb-5">{DATA.leadership.role}</h3>
              <ul className="space-y-3">
                {DATA.leadership.highlights.map((h, i) => (
                  <li key={i} className="flex items-center gap-3 text-[13px] text-white/45">
                    <span className="w-1 h-1 rounded-full bg-white/25 flex-shrink-0" />
                    {h}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section className="px-6 md:px-20 py-32 border-t border-white/[0.05]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-xl"
        >
          <SectionLabel>Get in touch</SectionLabel>
          <h2
            className="text-[clamp(32px,5vw,56px)] font-black tracking-tight leading-[1.05] mb-6 text-white"
            style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
          >
            Let's build something together.
          </h2>
          <p className="text-white/40 text-[14px] leading-relaxed mb-8">
            Open to internships, full-time roles, freelance projects, and research collaborations.
            If you have something interesting in mind — let's talk.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href={`mailto:${DATA.email}`}
              className="inline-flex items-center gap-2 bg-white text-black text-[13px] font-semibold px-5 py-2.5 rounded-full hover:bg-white/90 transition-colors"
            >
              <Mail size={13} />
              {DATA.email}
            </a>
            <a
              href={`https://github.com/${DATA.github}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-white/15 text-white/60 hover:text-white hover:border-white/30 text-[13px] px-5 py-2.5 rounded-full transition-all"
            >
              <Github size={13} />
              {DATA.github}
            </a>
          </div>
        </motion.div>
      </section>

      {/* Project drawer */}
      <ProjectDrawer project={activeProject} onClose={() => setActiveProject(null)} />
    </div>
  );
}