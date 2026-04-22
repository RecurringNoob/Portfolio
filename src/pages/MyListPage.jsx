import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, BookmarkX, Plus, Check, ListVideo } from 'lucide-react';
import { useProfile } from '../contexts/useProfile.js';

const STORAGE_KEY = 'portfolio_my_list';

// ─── Hook: manage "My List" in localStorage ───────────────────────────────
export function useMyList() {
  const [list, setList] = useState(() => {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; }
    catch { return []; }
  });

  const save = (next) => {
    setList(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  };

  const add    = (id) => { if (!list.includes(id)) save([...list, id]); };
  const remove = (id) => save(list.filter((x) => x !== id));
  const toggle = (id) => (list.includes(id) ? remove(id) : add(id));
  const has    = (id) => list.includes(id);

  return { list, add, remove, toggle, has };
}

// ─── MyListButton — use anywhere on a project card ────────────────────────
export function MyListButton({ projectId, size = 20 }) {
  const { has, toggle } = useMyList();
  const saved = has(projectId);
  return (
    <motion.button
      onClick={(e) => { e.stopPropagation(); toggle(projectId); }}
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.9 }}
      title={saved ? 'Remove from My List' : 'Add to My List'}
      className={`rounded-full border-2 p-1 transition-colors duration-200
        ${saved
          ? 'border-white bg-white text-black'
          : 'border-gray-400 text-gray-300 hover:border-white hover:text-white'
        }`}
    >
      {saved ? <Check size={size - 4} strokeWidth={3} /> : <Plus size={size - 4} />}
    </motion.button>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────
export default function MyListPage() {
  const navigate  = useNavigate();
  const { profile } = useProfile();
  const { list, remove } = useMyList();

  const allProjects = useMemo(() => {
    if (!profile?.sections) return [];
    return profile.sections.flatMap((sec) => sec.projects || []);
  }, [profile]);

  const saved = useMemo(
    () => allProjects.filter((p) => list.includes(p.id)),
    [allProjects, list]
  );

  if (!profile) return null;

  return (
    <div className="min-h-screen bg-[#141414] text-white pb-20">

      {/* ── Header ───────────────────────────────────────────────────── */}
      <div className="px-4 md:px-12 pt-8 pb-6 border-b border-white/5">
        <button
          onClick={() => navigate('/browse')}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition text-sm mb-6"
        >
          <ArrowLeft size={18} />
          Back to Browse
        </button>
        <div className="flex items-center gap-3">
          <ListVideo size={28} className="text-emerald-400" />
          <div>
            <h1 className="text-2xl font-black tracking-tight">My List</h1>
            <p className="text-gray-400 text-sm mt-0.5">
              {saved.length === 0
                ? 'No saved projects yet'
                : `${saved.length} saved project${saved.length !== 1 ? 's' : ''}`}
            </p>
          </div>
        </div>
      </div>

      <div className="px-4 md:px-12 mt-8">
        <AnimatePresence mode="popLayout">
          {saved.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-32 text-center"
            >
              <ListVideo size={56} className="text-gray-700 mb-4" />
              <p className="text-gray-400 text-lg font-semibold">Your list is empty</p>
              <p className="text-gray-600 text-sm mt-2 max-w-xs">
                Add projects using the <Plus size={12} className="inline" /> button on any project card.
              </p>
              <button
                onClick={() => navigate('/browse')}
                className="mt-6 px-5 py-2 bg-white text-black rounded-lg text-sm font-semibold hover:bg-gray-200 transition"
              >
                Browse Projects
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="grid"
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4"
            >
              {saved.map((project, i) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.85, transition: { duration: 0.2 } }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
                  className="relative group cursor-pointer rounded-lg overflow-hidden bg-[#181818] border border-white/5 hover:border-white/20 transition-all hover:shadow-2xl"
                >
                  {/* Remove button */}
                  <motion.button
                    onClick={(e) => { e.stopPropagation(); remove(project.id); }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/70 rounded-full p-1 text-gray-400 hover:text-[#E50914]"
                    title="Remove from My List"
                  >
                    <BookmarkX size={15} />
                  </motion.button>

                  {/* Card body */}
                  <div onClick={() => navigate(`/project/${project.id}`)}>
                    <div className="aspect-video overflow-hidden">
                      {project.image ? (
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900" />
                      )}
                    </div>
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
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}