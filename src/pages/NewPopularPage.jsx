import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, TrendingUp, Star, Zap } from 'lucide-react';
import { useProfile } from '../contexts/useProfile.js';

export default function NewPopularPage() {
  const navigate  = useNavigate();
  const { profile } = useProfile();

  const allProjects = useMemo(() => {
    if (!profile?.sections) return [];
    return profile.sections.flatMap((sec) =>
      (sec.projects || []).map((p) => ({ ...p, sectionTitle: sec.title }))
    );
  }, [profile]);

  // Sort newest first, then by match score descending
  const ranked = useMemo(() => {
    return [...allProjects].sort((a, b) => {
      const yearDiff = parseInt(b.year || 0) - parseInt(a.year || 0);
      if (yearDiff !== 0) return yearDiff;
      const matchA = parseInt(a.match) || 0;
      const matchB = parseInt(b.match) || 0;
      return matchB - matchA;
    });
  }, [allProjects]);

  const top = ranked.slice(0, 3);
  const rest = ranked.slice(3);

  if (!profile) return null;

  return (
    <div className="min-h-screen bg-[#141414] text-white pb-20">

      {/* ── Header ─────────────────────────────────────────────────────── */}
      <div className="px-4 md:px-12 pt-8 pb-6 border-b border-white/5">
        <button
          onClick={() => navigate('/browse')}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition text-sm mb-6"
        >
          <ArrowLeft size={18} />
          Back to Browse
        </button>
        <div className="flex items-center gap-3">
          <TrendingUp size={28} className="text-[#E50914]" />
          <div>
            <h1 className="text-2xl font-black tracking-tight">New &amp; Popular</h1>
            <p className="text-gray-400 text-sm mt-0.5">Latest projects and highest-rated work</p>
          </div>
        </div>
      </div>

      <div className="px-4 md:px-12 mt-8 space-y-12">

        {/* ── Top 3 spotlight ──────────────────────────────────────────── */}
        {top.length > 0 && (
          <section>
            <div className="flex items-center gap-2 mb-5">
              <Star size={16} className="text-yellow-400 fill-yellow-400" />
              <h2 className="text-base font-bold uppercase tracking-widest text-gray-300">Top Picks</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {top.map((project, i) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => navigate(`/project/${project.id}`)}
                  className="relative cursor-pointer group rounded-xl overflow-hidden border border-white/5 hover:border-white/20 transition-all hover:shadow-2xl"
                >
                  {/* Rank number watermark */}
                  <div className="absolute -left-2 bottom-12 z-10 text-[120px] font-black leading-none text-white/5 select-none pointer-events-none">
                    {i + 1}
                  </div>

                  {/* Image */}
                  <div className="aspect-video overflow-hidden">
                    {project.image ? (
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    {i === 0 && (
                      <span className="inline-flex items-center gap-1 text-[10px] bg-[#E50914] text-white rounded px-1.5 py-0.5 mb-2 font-bold uppercase tracking-wide">
                        <Zap size={9} fill="white" /> Top Rated
                      </span>
                    )}
                    <h3 className="text-white font-bold text-base truncate">{project.title}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      {project.match && <span className="text-emerald-400 text-xs font-semibold">{project.match}</span>}
                      <span className="text-gray-400 text-xs">{project.year}</span>
                      {project.difficulty && (
                        <span className="text-gray-400 text-xs border border-gray-600 px-1 rounded">{project.difficulty}</span>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* ── Ranked list ──────────────────────────────────────────────── */}
        {rest.length > 0 && (
          <section>
            <h2 className="text-base font-bold uppercase tracking-widest text-gray-300 mb-5">
              More to Explore
            </h2>
            <div className="space-y-2">
              {rest.map((project, i) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.05, duration: 0.3 }}
                  whileHover={{ x: 6 }}
                  onClick={() => navigate(`/project/${project.id}`)}
                  className="flex items-center gap-5 p-3 rounded-lg hover:bg-white/5 cursor-pointer group transition-all border border-transparent hover:border-white/10"
                >
                  {/* Rank */}
                  <span className="text-2xl font-black text-gray-700 w-8 text-center shrink-0 group-hover:text-gray-500 transition">
                    {i + 4}
                  </span>

                  {/* Thumbnail */}
                  <div className="w-24 h-14 rounded overflow-hidden shrink-0">
                    {project.image ? (
                      <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-gray-800" />
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-semibold text-sm truncate group-hover:text-emerald-400 transition">
                      {project.title}
                    </p>
                    <p className="text-gray-500 text-xs mt-0.5 line-clamp-1">{project.description}</p>
                  </div>

                  {/* Meta */}
                  <div className="hidden sm:flex flex-col items-end gap-1 shrink-0">
                    {project.match && (
                      <span className="text-emerald-400 text-xs font-semibold">{project.match}</span>
                    )}
                    <span className="text-gray-600 text-xs">{project.year}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}