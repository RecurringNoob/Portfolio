// src/pages/ProjectDetails.jsx
import React, { useEffect, useState } from 'react';
import { Play, ArrowLeft, Plus, ThumbsUp, Volume2, VolumeX, Github, Globe } from 'lucide-react';
import {motion} from 'framer-motion';
const ProjectDetails = ({ project, onBack, relatedProjects, onProjectSelect }) => {
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [project]);

  if (!project) return null;

  // Default fallbacks if data is missing
  const features = project.features || [];
  const tags = project.tags || [];
  const links = project.links || { demo: '#', code: '#' };

  return (
    <motion.div 
      key={project.id}
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="bg-[#141414] min-h-screen font-sans text-white relative z-50"
    >
      <button 
        onClick={onBack}
        className="fixed top-4 left-4 md:top-8 md:left-10 z-50 flex items-center gap-2 text-white/70 hover:text-white transition bg-black/50 px-4 py-2 rounded-full backdrop-blur-md"
      >
        <ArrowLeft size={24} /> <span className="hidden md:inline font-bold">Back to Browse</span>
      </button>

      {/* Hero Section */}
      <div className="relative h-[60vh] md:h-[85vh] w-full">
        <div className="absolute inset-0">
          <img 
            src={project.image || "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200"} 
            alt={project.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/20 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#141414] via-[#141414]/40 to-transparent" />
        </div>

        <div className="absolute bottom-0 left-0 p-6 md:p-16 w-full md:w-[60%] space-y-6">
          <h1 className="text-4xl md:text-7xl font-black tracking-tighter uppercase drop-shadow-2xl">
            {project.title}
          </h1>
          
          <div className="flex items-center gap-4 text-sm md:text-base font-medium text-gray-300">
             <span className="text-[#46d369] font-bold">{project.match || "98% Match"}</span>
             <span className="text-gray-400">{project.year || "2024"}</span>
             <span className="border border-gray-500 px-1 rounded text-xs">{project.rating || "HD"}</span>
             <span className="text-white">{project.duration || "Project"}</span>
          </div>

          <div className="flex flex-wrap gap-4 pt-4">
            <a href={links.demo} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-white text-black px-6 md:px-8 py-2 md:py-3 rounded font-bold hover:bg-white/90 transition">
              <Play fill="black" size={24} /> Live Demo
            </a>
            <a href={links.code} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-gray-500/40 text-white px-6 md:px-8 py-2 md:py-3 rounded font-bold hover:bg-gray-500/30 transition backdrop-blur-sm">
              <Github size={24} /> Source Code
            </a>
            <button className="p-3 border-2 border-gray-500/50 rounded-full hover:border-white transition">
               <Plus size={20} />
            </button>
            <button className="p-3 border-2 border-gray-500/50 rounded-full hover:border-white transition">
               <ThumbsUp size={20} />
            </button>
          </div>
        </div>

        <button 
          onClick={() => setMuted(!muted)}
          className="absolute bottom-[30%] right-10 p-3 bg-transparent border border-gray-500/50 rounded-full text-white/70 hover:text-white hover:border-white transition hidden md:block"
        >
          {muted ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </button>
      </div>

      {/* Content Grid */}
      <div className="px-6 md:px-16 grid grid-cols-1 lg:grid-cols-3 gap-10 -mt-10 relative z-10 pb-20">
        
        {/* Left Column: Synopsis & Features */}
        <div className="lg:col-span-2 space-y-10">
          <div className="flex flex-col gap-4">
             <div className="flex items-center gap-2 text-sm">
               <span className="font-bold text-white">Most Liked</span>
               <span className="text-gray-400">in {project.category}</span>
             </div>
             <p className="text-lg md:text-xl text-white leading-relaxed">
               {project.description}
             </p>
          </div>

          {/* Dynamic "Episodes" / Features List */}
          {features.length > 0 && (
            <div>
              <div className="flex items-center justify-between border-b border-gray-700 pb-4 mb-6">
                <h3 className="text-2xl font-bold">Key Milestones</h3>
                <span className="text-lg text-gray-400">{project.title}</span>
              </div>
              
              <div className="space-y-6">
                {features.map((item, index) => (
                  <div key={index} className="flex flex-col md:flex-row gap-4 p-4 hover:bg-[#333] rounded-lg transition cursor-pointer group">
                    <div className="w-full md:w-48 h-28 bg-gray-800 rounded relative overflow-hidden flex-shrink-0">
                      <img src={project.image} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition" alt="" />
                      <span className="absolute bottom-2 left-2 font-bold text-4xl text-white drop-shadow-md">{index + 1}</span>
                    </div>
                    <div className="flex flex-col justify-center">
                      <div className="flex justify-between items-center mb-2">
                         <h4 className="font-bold text-base md:text-lg">{item.title}</h4>
                         <span className="text-sm text-gray-400">{item.duration}</span>
                      </div>
                      <p className="text-gray-400 text-sm line-clamp-2">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Meta Details */}
        <div className="space-y-6 text-sm">
          <div className="flex flex-col gap-2">
            <span className="text-gray-500">Tech Stack:</span>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map(t => (
                <span key={t} className="text-white hover:underline cursor-pointer">{t},</span>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-gray-500">Role:</span>
            <span className="text-white">{project.role || "Developer"}</span>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-gray-500">Difficulty:</span>
            <span className="text-white">{project.difficulty || "Standard"}</span>
          </div>

          <div className="flex flex-col gap-2">
             <span className="text-gray-500">Tags:</span>
             <p className="text-white leading-6">
               {tags.map((tag, i) => (
                  <span key={i} className="cursor-pointer hover:underline mr-2">{tag},</span>
               ))}
             </p>
          </div>
        </div>
      </div>

      {/* "More Like This" Section */}
      <div className="px-6 md:px-16 pb-20 border-t-2 border-[#404040] pt-10 mx-6 md:mx-16">
         <h3 className="text-2xl font-bold mb-6">More Like This</h3>
         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {relatedProjects.slice(0, 4).map(p => (
              <div 
                key={p.id} 
                onClick={() => onProjectSelect(p)}
                className="bg-[#2f2f2f] rounded-md overflow-hidden cursor-pointer hover:scale-105 transition duration-300 group"
              >
                 <div className="h-32 md:h-40 relative">
                    <img src={p.image || "https://via.placeholder.com/400"} className="w-full h-full object-cover" alt={p.title} />
                    <span className="absolute top-2 right-2 text-[10px] font-bold bg-black/60 px-1 py-0.5 rounded text-white">{p.category}</span>
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                        <div className="bg-white rounded-full p-2">
                            <Play fill="black" size={16} className="text-black" />
                        </div>
                    </div>
                 </div>
                 <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                       <span className="text-[#46d369] font-bold text-xs">{p.match || "90% Match"}</span>
                       <span className="border border-gray-500 px-1 text-[10px] text-gray-400">{p.rating || "HD"}</span>
                    </div>
                    <p className="text-sm font-semibold text-white line-clamp-2">{p.title}</p>
                 </div>
              </div>
            ))}
         </div>
      </div>
    </motion.div>
  );
};

export default ProjectDetails;