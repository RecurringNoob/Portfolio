import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProfile } from '../contexts/useProfile';
import { Play, ArrowLeft, Plus, ThumbsUp, Github } from 'lucide-react';

export default function ProjectPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { profile } = useProfile();

  let project = null;
  let sectionTitle = '';
  profile?.sections?.forEach((section) => {
    const found = section.projects.find((p) => p.id === id);
    if (found) {
      project = found;
      sectionTitle = section.title;
    }
  });

  const relatedProjects =
    profile?.sections
      ?.find((s) => s.title === sectionTitle)
      ?.projects.filter((p) => p.id !== id) || [];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!project) {
    return (
      <div className="min-h-screen bg-[#141414] text-white flex items-center justify-center">
        <p>Project not found.</p>
        <button onClick={() => navigate('/browse')} className="ml-4 underline">
          Go back
        </button>
      </div>
    );
  }

  const links = project.links || { demo: '#', code: '#' };

  return (
    <div className="bg-[#141414] min-h-screen font-sans text-white">

      {/*
        Hero: no fixed height — uses min-h so short titles still look cinematic
        but long titles can expand the container naturally without overflowing.
        Back button is the first child so it's always visible at the top.
      */}
      <div className="relative w-full min-h-[60vh] md:min-h-[80vh] flex flex-col justify-between">

        {/* Background image + gradients */}
        <div className="absolute inset-0">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-[#141414] via-[#141414]/30 to-black/60" />
          <div className="absolute inset-0 bg-linear-to-r from-[#141414] via-[#141414]/40 to-transparent" />
        </div>

        {/* Back button — top of the flex column, always visible */}
        <div className="relative z-10 px-4 md:px-10 pt-6">
          <button
            onClick={() => navigate('/browse')}
            className="inline-flex items-center gap-2 text-white/80 hover:text-white transition
                       bg-black/50 px-4 py-2 rounded-full backdrop-blur-md"
          >
            <ArrowLeft size={20} />
            <span className="font-bold">Back to Browse</span>
          </button>
        </div>

        {/* Title block — bottom of the flex column, grows naturally */}
        <div className="relative z-10 px-6 md:px-16 pb-10 md:pb-16 pt-8 w-full md:w-[65%] space-y-5">
          {/*
            clamp font size: starts at 2rem (mobile), scales up to 5rem max.
            This prevents ultra-long titles from becoming wall-of-text giant text.
            Use leading-none so multi-line titles don't add excessive spacing.
          */}
          <h1
            className="font-black tracking-tighter uppercase drop-shadow-2xl leading-none"
            style={{ fontSize: 'clamp(1.75rem, 5vw, 4.5rem)' }}
          >
            {project.title}
          </h1>

          <div className="flex flex-wrap items-center gap-3 text-sm md:text-base font-medium text-gray-300">
            <span className="text-[#46d369] font-bold">{project.match || '98% Match'}</span>
            <span className="text-gray-400">{project.year || '2024'}</span>
            <span className="border border-gray-500 px-1 rounded text-xs">{project.rating || 'HD'}</span>
            <span className="text-white">{project.duration || 'Project'}</span>
          </div>

          <div className="flex flex-wrap gap-4 pt-2">
            <a
              href={links.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-white text-black px-6 md:px-8 py-2 md:py-3 rounded font-bold hover:bg-white/90 transition"
            >
              <Play fill="black" size={22} /> Live Demo
            </a>
            <a
              href={links.code}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-gray-500/40 text-white px-6 md:px-8 py-2 md:py-3 rounded font-bold hover:bg-gray-500/30 transition backdrop-blur-sm"
            >
              <Github size={22} /> Source Code
            </a>
            <button className="p-3 border-2 border-gray-500/50 rounded-full hover:border-white transition">
              <Plus size={20} />
            </button>
            <button className="p-3 border-2 border-gray-500/50 rounded-full hover:border-white transition">
              <ThumbsUp size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="px-6 md:px-16 grid grid-cols-1 lg:grid-cols-3 gap-10 mt-8 relative z-10 pb-20">
        <div className="lg:col-span-2 space-y-10">
          <p className="text-lg md:text-xl text-white leading-relaxed">{project.description}</p>

          {project.features?.length > 0 && (
            <div>
              <div className="flex items-center justify-between border-b border-gray-700 pb-4 mb-6">
                <h3 className="text-2xl font-bold">Key Milestones</h3>
                <span className="text-lg text-gray-400">{project.title}</span>
              </div>
              <div className="space-y-6">
                {project.features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex flex-col md:flex-row gap-4 p-4 hover:bg-[#333] rounded-lg transition cursor-pointer group"
                  >
                    <div className="w-full md:w-48 h-28 bg-gray-800 rounded relative overflow-hidden shrink-0">
                      <img
                        src={project.image}
                        className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition"
                        alt=""
                      />
                      <span className="absolute bottom-2 left-2 font-bold text-4xl text-white drop-shadow-md">
                        {index + 1}
                      </span>
                    </div>
                    <div className="flex flex-col justify-center">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-bold text-base md:text-lg">{feature.title}</h4>
                        <span className="text-sm text-gray-400">{feature.duration}</span>
                      </div>
                      <p className="text-gray-400 text-sm line-clamp-2">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="space-y-6 text-sm">
          <div className="flex flex-col gap-2">
            <span className="text-gray-500">Tech Stack:</span>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((t) => (
                <span key={t} className="text-white hover:underline cursor-pointer">{t},</span>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-gray-500">Role:</span>
            <span className="text-white">{project.role || 'Developer'}</span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-gray-500">Difficulty:</span>
            <span className="text-white">{project.difficulty || 'Standard'}</span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-gray-500">Tags:</span>
            <p className="text-white leading-6">
              {project.tags?.map((tag, i) => (
                <span key={i} className="cursor-pointer hover:underline mr-2">{tag},</span>
              ))}
            </p>
          </div>
        </div>
      </div>

      {/* More Like This */}
      {relatedProjects.length > 0 && (
        <div className="px-6 md:px-16 pb-20 border-t-2 border-[#404040] pt-10 mx-6 md:mx-16">
          <h3 className="text-2xl font-bold mb-6">More Like This</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {relatedProjects.slice(0, 4).map((p) => (
              <div
                key={p.id}
                onClick={() => navigate(`/project/${p.id}`)}
                className="bg-[#2f2f2f] rounded-md overflow-hidden cursor-pointer hover:scale-105 transition duration-300 group"
              >
                <div className="h-32 md:h-40 relative">
                  <img src={p.image} className="w-full h-full object-cover" alt={p.title} />
                  <span className="absolute top-2 right-2 text-[10px] font-bold bg-black/60 px-1 py-0.5 rounded text-white">
                    {p.category}
                  </span>
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                    <div className="bg-white rounded-full p-2">
                      <Play fill="black" size={16} className="text-black" />
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[#46d369] font-bold text-xs">{p.match || '90% Match'}</span>
                    <span className="border border-gray-500 px-1 text-[10px] text-gray-400">{p.rating || 'HD'}</span>
                  </div>
                  <p className="text-sm font-semibold text-white line-clamp-2">{p.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}