import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProfile } from '../contexts/useProfile';
import {
  Play, ArrowLeft, Plus, ThumbsUp, Github,
  ChevronLeft, ChevronRight, X, ChevronDown
} from 'lucide-react';

// ─── Image Gallery Strip ──────────────────────────────────────────────────────
function GalleryStrip({ images, title }) {
  const [lightbox, setLightbox] = useState(null);

  if (!images?.length) return null;

  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-bold border-b border-gray-700 pb-4">Screenshots</h3>

      <div className="flex gap-4 overflow-x-auto pb-3 scrollbar-hide">
        {images.map((src, i) => (
          <button
            key={i}
            onClick={() => setLightbox(i)}
            className="shrink-0 w-64 h-40 rounded-lg overflow-hidden relative group focus:outline-none focus:ring-2 focus:ring-white/50"
          >
            <img
              src={src}
              alt={`${title} screenshot ${i + 1}`}
              className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
            />
            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
              <span className="text-white text-xs font-bold bg-black/60 px-2 py-1 rounded">
                View
              </span>
            </div>
          </button>
        ))}
      </div>

      {lightbox !== null && (
        <div
          className="fixed inset-0 bg-black/90 z-[300] flex items-center justify-center"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-4 right-4 text-white/70 hover:text-white p-2"
            onClick={() => setLightbox(null)}
          >
            <X size={28} />
          </button>
          {lightbox > 0 && (
            <button
              className="absolute left-4 text-white/70 hover:text-white p-2"
              onClick={(e) => { e.stopPropagation(); setLightbox(lightbox - 1); }}
            >
              <ChevronLeft size={36} />
            </button>
          )}
          <img
            src={images[lightbox]}
            alt={`${title} screenshot ${lightbox + 1}`}
            className="max-w-[90vw] max-h-[85vh] object-contain rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
          {lightbox < images.length - 1 && (
            <button
              className="absolute right-4 text-white/70 hover:text-white p-2"
              onClick={(e) => { e.stopPropagation(); setLightbox(lightbox + 1); }}
            >
              <ChevronRight size={36} />
            </button>
          )}
          <div className="absolute bottom-4 text-white/50 text-sm">
            {lightbox + 1} / {images.length}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Metrics Bar ─────────────────────────────────────────────────────────────
function MetricsBar({ metrics }) {
  if (!metrics?.length) return null;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {metrics.map((m, i) => (
        <div
          key={i}
          className="bg-[#1e1e1e] border border-[#404040] rounded-xl p-4 text-center"
        >
          <div className="text-[#46d369] font-black text-xl md:text-2xl leading-none mb-1">
            {m.value}
          </div>
          <div className="text-gray-500 text-xs uppercase tracking-widest">
            {m.label}
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Case Study ───────────────────────────────────────────────────────────────
function CaseStudy({ caseStudy }) {
  if (!caseStudy) return null;

  const cols = [
    { label: 'Problem', color: 'text-red-400', border: 'border-red-500/30', bg: 'bg-red-500/5', content: caseStudy.problem },
    { label: 'Solution', color: 'text-blue-400', border: 'border-blue-500/30', bg: 'bg-blue-500/5', content: caseStudy.solution },
    { label: 'Outcome', color: 'text-[#46d369]', border: 'border-emerald-500/30', bg: 'bg-emerald-500/5', content: caseStudy.outcome },
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-bold border-b border-gray-700 pb-4">Case Study</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {cols.map(({ label, color, border, bg, content }) => (
          <div
            key={label}
            className={`rounded-xl border ${border} ${bg} p-5 space-y-3`}
          >
            <span className={`text-xs font-black uppercase tracking-widest ${color}`}>
              {label}
            </span>
            <p className="text-gray-300 text-sm leading-relaxed">{content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Video Embed ──────────────────────────────────────────────────────────────
function VideoEmbed({ videoUrl, title }) {
  if (!videoUrl) return null;

  const isYoutube = videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be');
  const isVimeo = videoUrl.includes('vimeo.com');

  const getEmbedUrl = () => {
    if (isYoutube) {
      const id = videoUrl.split('v=')[1]?.split('&')[0] || videoUrl.split('/').pop();
      return `https://www.youtube.com/embed/${id}`;
    }
    if (isVimeo) {
      const id = videoUrl.split('/').pop();
      return `https://player.vimeo.com/video/${id}`;
    }
    return null;
  };

  const embedUrl = getEmbedUrl();

  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-bold border-b border-gray-700 pb-4">Demo</h3>
      {embedUrl ? (
        <div className="relative w-full rounded-xl overflow-hidden" style={{ paddingTop: '56.25%' }}>
          <iframe
            className="absolute inset-0 w-full h-full"
            src={embedUrl}
            title={`${title} demo`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      ) : (
        <video
          src={videoUrl}
          controls
          className="w-full rounded-xl max-h-[480px] bg-black"
        >
          Your browser does not support the video tag.
        </video>
      )}
    </div>
  );
}

// ─── Architecture Section ─────────────────────────────────────────────────────
function ArchitectureSection({ architecture }) {
  if (!architecture) return null;

  const hasImage = typeof architecture === 'object' && architecture.image;
  const description = typeof architecture === 'string' ? architecture : architecture.description;
  const image = typeof architecture === 'object' ? architecture.image : null;

  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-bold border-b border-gray-700 pb-4">System Architecture</h3>
      <div className="space-y-4">
        {description && (
          <p className="text-gray-300 leading-relaxed">{description}</p>
        )}
        {hasImage && (
          <div className="rounded-xl overflow-hidden border border-[#404040]">
            <img
              src={image}
              alt="System architecture diagram"
              className="w-full object-contain bg-[#1a1a1a]"
            />
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Feature Accordion ────────────────────────────────────────────────────────
function FeatureAccordion({ features, projectImage }) {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="space-y-3">
      {features.map((feature, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={index}
            className={`rounded-lg border transition-all duration-200 cursor-pointer select-none
              ${isOpen
                ? 'border-white/20 bg-[#2a2a2a]'
                : 'border-transparent bg-[#1e1e1e] hover:bg-[#252525]'
              }`}
            onClick={() => setOpenIndex(isOpen ? null : index)}
          >
            {/* Row header — always visible */}
            <div className="flex flex-col md:flex-row gap-4 p-4">
              {/* Thumbnail */}
              <div className="w-full md:w-48 h-28 bg-gray-800 rounded relative overflow-hidden shrink-0">
                <img
                  src={projectImage}
                  className={`w-full h-full object-cover transition duration-300
                    ${isOpen ? 'opacity-100 scale-105' : 'opacity-60'}`}
                  alt=""
                />
                <span className="absolute bottom-2 left-2 font-bold text-4xl text-white drop-shadow-md">
                  {index + 1}
                </span>
              </div>

              {/* Title row */}
              <div className="flex flex-col justify-center flex-1 min-w-0">
                <div className="flex justify-between items-start gap-2 mb-2">
                  <h4 className="font-bold text-base md:text-lg leading-snug">{feature.title}</h4>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-sm text-gray-400 whitespace-nowrap">{feature.duration}</span>
                    <ChevronDown
                      size={18}
                      className={`text-gray-400 transition-transform duration-300
                        ${isOpen ? 'rotate-180 text-white' : ''}`}
                    />
                  </div>
                </div>

                {/* Preview when collapsed */}
                {!isOpen && (
                  <p className="text-gray-400 text-sm line-clamp-2">{feature.desc}</p>
                )}
              </div>
            </div>

            {/* Expanded full description */}
            {isOpen && (
              <div className="px-4 pb-5 md:pl-[calc(12rem+2rem)]">
                <p className="text-gray-300 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
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
  const hasRichContent =
    project.metrics?.length ||
    project.caseStudy ||
    project.gallery?.length ||
    project.videoUrl ||
    project.architecture;

  return (
    <div className="bg-[#141414] min-h-screen font-sans text-white">

      {/* ── Hero ── */}
      <div className="relative w-full min-h-[60vh] md:min-h-[80vh] flex flex-col justify-between">
        <div className="absolute inset-0">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-[#141414] via-[#141414]/30 to-black/60" />
          <div className="absolute inset-0 bg-linear-to-r from-[#141414] via-[#141414]/40 to-transparent" />
        </div>

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

        <div className="relative z-10 px-6 md:px-16 pb-10 md:pb-16 pt-8 w-full md:w-[65%] space-y-5">
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

      {/* ── Content Grid ── */}
      <div className="px-6 md:px-16 grid grid-cols-1 lg:grid-cols-3 gap-10 mt-8 relative z-10 pb-8">

        {/* Left: main content */}
        <div className="lg:col-span-2 space-y-10">
          <p className="text-lg md:text-xl text-white leading-relaxed">{project.description}</p>

          <MetricsBar metrics={project.metrics} />
          <CaseStudy caseStudy={project.caseStudy} />
          <GalleryStrip images={project.gallery} title={project.title} />
          <VideoEmbed videoUrl={project.videoUrl} title={project.title} />
          <ArchitectureSection architecture={project.architecture} />

          {/* ── Key Milestones — expandable accordion ── */}
          {project.features?.length > 0 && (
            <div>
              <div className="flex items-center justify-between border-b border-gray-700 pb-4 mb-6">
                <h3 className="text-2xl font-bold">Key Milestones</h3>
                <span className="text-lg text-gray-400">{project.title}</span>
              </div>
              <FeatureAccordion features={project.features} projectImage={project.image} />
            </div>
          )}
        </div>

        {/* Right: metadata sidebar */}
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
          {project.tags?.length > 0 && (
            <div className="flex flex-col gap-2">
              <span className="text-gray-500">Tags:</span>
              <p className="text-white leading-6">
                {project.tags.map((tag, i) => (
                  <span key={i} className="cursor-pointer hover:underline mr-2">{tag},</span>
                ))}
              </p>
            </div>
          )}

          {hasRichContent && (
            <div className="flex flex-col gap-2 pt-4 border-t border-[#404040]">
              <span className="text-gray-500 text-xs uppercase tracking-widest">This page includes</span>
              <div className="flex flex-col gap-1">
                {project.metrics?.length > 0 && (
                  <span className="text-[#46d369] text-xs">✓ Key metrics</span>
                )}
                {project.caseStudy && (
                  <span className="text-[#46d369] text-xs">✓ Case study</span>
                )}
                {project.gallery?.length > 0 && (
                  <span className="text-[#46d369] text-xs">✓ Screenshots</span>
                )}
                {project.videoUrl && (
                  <span className="text-[#46d369] text-xs">✓ Demo video</span>
                )}
                {project.architecture && (
                  <span className="text-[#46d369] text-xs">✓ Architecture</span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── More Like This ── */}
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