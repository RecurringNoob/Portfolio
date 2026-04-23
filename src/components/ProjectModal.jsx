import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, ThumbsUp } from 'lucide-react';
import { MyListButton } from '../pages/MyListPage.jsx';

export default function ProjectModal({ project, onClose }) {
  const navigate = useNavigate();

  const handlePlay = () => {
    navigate(`/project/${project.id}`);
    onClose();
  };

  return (
    <AnimatePresence>
      {project && (
        <>
          {/* Backdrop */}
          <motion.div
            key="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[200] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={onClose}
          >
            {/* Modal panel */}
            <motion.div
              key="modal-panel"
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-lg bg-[#181818] rounded-xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-3 right-3 z-10 bg-black/60 hover:bg-black/80 rounded-full p-1.5 text-gray-400 hover:text-white transition"
                aria-label="Close"
              >
                <X size={16} />
              </button>

              {/* Hero image */}
              <div className="relative aspect-video overflow-hidden">
                {project.image ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900" />
                )}
                {/* Bottom gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-transparent to-transparent" />
              </div>

              {/* Content */}
              <div className="px-5 pb-5 -mt-6 relative">
                {/* Action row */}
                <div className="flex items-center gap-3 mb-4">
                  {/* Play */}
                  <motion.button
                    onClick={handlePlay}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-full text-sm font-bold hover:bg-gray-200 transition"
                  >
                    <Play size={14} fill="black" />
                    View Project
                  </motion.button>

                  {/* MyListButton */}
                  <MyListButton projectId={project.id} size={22} />

                  {/* ThumbsUp — cosmetic */}
                  <motion.button
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.9 }}
                    className="rounded-full border-2 border-gray-400 text-gray-300 hover:border-white hover:text-white p-1 transition-colors"
                    title="Like"
                  >
                    <ThumbsUp size={14} />
                  </motion.button>
                </div>

                {/* Meta row */}
                <div className="flex items-center gap-3 text-xs mb-3">
                  {project.match && (
                    <span className="text-emerald-400 font-bold">{project.match}</span>
                  )}
                  {project.year && (
                    <span className="text-gray-400">{project.year}</span>
                  )}
                  {project.rating && (
                    <span className="border border-gray-600 text-gray-400 px-1 rounded">
                      {project.rating}
                    </span>
                  )}
                  {project.duration && (
                    <span className="text-gray-400">{project.duration}</span>
                  )}
                </div>

                {/* Title */}
                <h2 className="text-white text-lg font-bold mb-2 leading-tight">
                  {project.title}
                </h2>

                {/* Description */}
                {project.description && (
                  <p className="text-gray-400 text-sm leading-relaxed line-clamp-3 mb-4">
                    {project.description}
                  </p>
                )}

                {/* Bottom meta */}
                <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-gray-500">
                  {project.technologies?.length > 0 && (
                    <div>
                      <span className="text-gray-400 font-medium">Stack: </span>
                      {project.technologies.slice(0, 5).join(', ')}
                    </div>
                  )}
                  {project.category && (
                    <div>
                      <span className="text-gray-400 font-medium">Category: </span>
                      {project.category}
                    </div>
                  )}
                  {project.role && (
                    <div>
                      <span className="text-gray-400 font-medium">Role: </span>
                      {project.role}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}