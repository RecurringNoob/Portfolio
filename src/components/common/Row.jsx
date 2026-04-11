import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Row({ title, projects, onSelect }) {
  const rowRef = useRef(null);
  const navigate = useNavigate();

  const scroll = (dir) => {
    if (!rowRef.current) return;
    const { scrollLeft, clientWidth } = rowRef.current;
    rowRef.current.scrollTo({
      left: dir === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth,
      behavior: 'smooth',
    });
  };

  const handleClick = (project) => {
    if (onSelect) {
      onSelect(project);
    } else {
      navigate(`/project/${project.id}`);
    }
  };

  return (
    <div className="px-4 md:px-12 my-10 group/row">
      <h2 className="text-white text-xl font-bold mb-4">{title}</h2>

      {/* Wrapper: arrow buttons sit OUTSIDE the scroll track, row fills the middle */}
      <div className="flex items-center gap-2">
        {/* Left arrow */}
        <button
          onClick={() => scroll('left')}
          className="flex-shrink-0 w-10 h-10 flex items-center justify-center
                     bg-black/60 rounded-full text-white
                     opacity-0 group-hover/row:opacity-100 transition
                     hover:bg-black/80 z-10"
        >
          <ChevronLeft size={28} />
        </button>

        {/* Scrollable row */}
        <div
          ref={rowRef}
          className="flex gap-2 overflow-x-auto scrollbar-hide py-4 flex-1"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {projects.map((p) => (
            <div
              key={p.id}
              onClick={() => handleClick(p)}
              className="min-w-50 md:min-w-70 h-40
                         relative rounded-md overflow-hidden shrink-0
                         cursor-pointer transition-transform duration-300
                         hover:scale-110 hover:z-50 origin-center will-change-transform"
            >
              <img
                src={p.image}
                alt={p.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition flex items-end p-3">
                <p className="text-white font-bold text-sm">{p.title}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Right arrow */}
        <button
          onClick={() => scroll('right')}
          className="flex-shrink-0 w-10 h-10 flex items-center justify-center
                     bg-black/60 rounded-full text-white
                     opacity-0 group-hover/row:opacity-100 transition
                     hover:bg-black/80 z-10"
        >
          <ChevronRight size={28} />
        </button>
      </div>
    </div>
  );
}