// src/components/ProjectModal.jsx
import React from 'react';
import { AnimatePresence,motion } from 'framer-motion';
import { X, Play, Plus, ThumbsUp } from 'lucide-react';

const ProjectModal = ({ project, onClose, onPlay }) => {
  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[200] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div className="absolute inset-0" onClick={onClose} />

          <motion.div
            layoutId={project.id}
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="relative w-full max-w-4xl bg-[#181818] rounded-xl overflow-hidden shadow-2xl z-10"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 bg-black/60 rounded-full text-white hover:bg-black z-20"
            >
              <X />
            </button>

            <div className="relative h-64 md:h-96">
              <img
                src={project.image || "https://via.placeholder.com/800"}
                className="w-full h-full object-cover"
                alt={project.title}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-transparent to-transparent" />

              <div className="absolute bottom-6 left-6 space-y-4">
                <h2 className="text-3xl md:text-4xl font-bold text-white">
                  {project.title}
                </h2>

                <div className="flex gap-2">
                  <button className="bg-white text-black px-6 py-2 rounded-md font-bold flex items-center gap-2 hover:bg-white/90" onClick={onPlay}>
                    <Play fill="black" size={20} /> Play
                  </button>
                  <button className="p-2 border border-gray-500 rounded-full text-white hover:border-white">
                    <Plus />
                  </button>
                  <button className="p-2 border border-gray-500 rounded-full text-white hover:border-white">
                    <ThumbsUp />
                  </button>
                </div>
              </div>
            </div>

            <div className="p-6 md:p-8 grid md:grid-cols-3 gap-6 text-white">
              <div className="md:col-span-2 space-y-3">
                <div className="flex items-center gap-2 mb-2">
                   <span className="text-green-400 font-bold">{project.match || "98% Match"}</span>
                   <span className="text-gray-400">{project.year || "2024"}</span>
                   <span className="border border-gray-500 px-1 text-xs rounded">{project.rating || "HD"}</span>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {project.description}
                </p>
              </div>

              <div className="text-sm space-y-2 text-gray-300">
                <p>
                  <span className="text-gray-500">Tech:</span>{' '}
                  {project.technologies.join(', ')}
                </p>
                <p>
                  <span className="text-gray-500">Category:</span>{' '}
                  {project.category}
                </p>
                <p>
                  <span className="text-gray-500">Role:</span>{' '}
                  {project.role || "Developer"}
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;