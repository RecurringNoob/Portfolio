import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Search, Filter, X, ExternalLink } from 'lucide-react';
import { useProfile } from '../contexts/useProfile.js';

const CATEGORY_ALL = 'All';

export default function ProjectsPage() {
  const navigate = useNavigate();
  const { profile } = useProfile();

  const [search, setSearch]       = useState('');
  const [activeTag, setActiveTag] = useState(CATEGORY_ALL);

  // Flatten all projects from all sections
  const allProjects = useMemo(() => {
    if (!profile?.sections) return [];
    return profile.sections.flatMap((sec) =>
      (sec.projects || []).map((p) => ({ ...p, sectionTitle: sec.title }))
    );
  }, [profile]);

  // Collect unique categories/tags
  const allTags = useMemo(() => {
    const tags = new Set();
    allProjects.forEach((p) => {
      if (p.category) tags.add(p.category);
    });
    return [CATEGORY_ALL, ...Array.from(tags)];
  }, [allProjects]);

  // Filter logic
  const filtered = useMemo(() => {
    return allProjects.filter((p) => {
      const matchesSearch =
        !search ||
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.description?.toLowerCase().includes(search.toLowerCase()) ||
        p.technologies?.some((t) => t.toLowerCase().includes(search.toLowerCase()));
      const matchesTag =
        activeTag === CATEGORY_ALL || p.category === activeTag;
      return matchesSearch && matchesTag;
    });
  }, [allProjects, search, activeTag]);

  if (!profile) {
    return (
      <div className="min-h-screen bg-[#141414] flex items-center justify-center text-white">
        <p className="text-gray-400">No profile selected.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#141414] text-white pb-20">

      {/* ── Header bar ─────────────────────────────────────────────────── */}
      <div className="sticky top-0 z-40 bg-[#141414]/95 backdrop-blur-sm border-b border-white/5 px-4 md:px-12 py-4 flex flex-col gap-4">
        {/* Top row */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate('/browse')}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition text-sm"
          >
            <ArrowLeft size={18} />
            Back to Browse
          </button>
          <h1 className="text-lg font-bold tracking-wide">All Projects</h1>
          <span className="text-sm text-gray-500">{filtered.length} results</span>
        </div>

        {/* Search + filter row */}
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search input */}
          <div className="relative flex-1 max-w-sm">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search projects, skills…"
              className="w-full bg-white/5 border border-white/10 rounded-lg pl-9 pr-8 py-2 text-sm text-white placeholder-gray-500 outline-none focus:border-emerald-500 transition"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Category pills */}
          <div className="flex gap-2 flex-wrap">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                className={`px-3 py-1 rounded-full text-xs font-medium border transition-all duration-200
                  ${activeTag === tag
                    ? 'bg-[#E50914] border-[#E50914] text-white'
                    : 'border-white/20 text-gray-400 hover:border-white/40 hover:text-white'
                  }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Projects grid ──────────────────────────────────────────────── */}
      <div className="px-4 md:px-12 mt-8">
        <AnimatePresence mode="popLayout">
          {filtered.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-32 text-gray-500"
            >
              <Filter size={40} className="mb-4 opacity-30" />
              <p className="text-lg">No projects match your search.</p>
              <button
                onClick={() => { setSearch(''); setActiveTag(CATEGORY_ALL); }}
                className="mt-4 text-sm text-emerald-400 hover:underline"
              >
                Clear filters
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="grid"
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4"
            >
              {filtered.map((project, i) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={i}
                  onClick={() => navigate(`/project/${project.id}`)}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ─── Project card ──────────────────────────────────────────────────────────
function ProjectCard({ project, index, onClick }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.25, delay: Math.min(index * 0.04, 0.4) }}
      whileHover={{ scale: 1.04, zIndex: 10 }}
      onClick={onClick}
      className="relative group cursor-pointer rounded-lg overflow-hidden bg-[#181818] border border-white/5 hover:border-white/20 transition-all duration-300 hover:shadow-2xl"
    >
      {/* Thumbnail */}
      <div className="aspect-video relative overflow-hidden">
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
            <ExternalLink size={28} className="text-gray-600" />
          </div>
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
          <div className="flex gap-1 flex-wrap">
            {project.technologies?.slice(0, 3).map((t) => (
              <span key={t} className="text-[10px] bg-white/10 rounded px-1.5 py-0.5 text-gray-200">
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Match badge */}
        {project.match && (
          <span className="absolute top-2 left-2 text-[10px] font-bold text-emerald-400 bg-black/60 rounded px-1.5 py-0.5">
            {project.match}
          </span>
        )}
      </div>

      {/* Card footer */}
      <div className="p-3">
        <p className="text-sm font-semibold text-white truncate">{project.title}</p>
        <div className="flex items-center justify-between mt-1">
          <span className="text-[11px] text-gray-500">{project.year}</span>
          {project.category && (
            <span className="text-[10px] bg-white/5 text-gray-400 rounded px-1.5 py-0.5">
              {project.category}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}