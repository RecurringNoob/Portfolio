import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Row = ({ title, projects, onSelect }) => {
  const rowRef = useRef(null);

  const scroll = (dir) => {
    if (!rowRef.current) return;
    const { scrollLeft, clientWidth } = rowRef.current;
    rowRef.current.scrollTo({
      left: dir === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth,
      behavior: 'smooth',
    });
  };

  return (
    <div className="px-4 md:px-12 my-10 group/row">
      <h2 className="text-white text-xl font-bold mb-4">{title}</h2>

      <div className="relative">
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-0 bottom-0 z-40 bg-black/60 opacity-0 group-hover/row:opacity-100 transition px-2"
        >
          <ChevronLeft size={40} className="text-white" />
        </button>

        <div
          ref={rowRef}
          className="flex gap-2 overflow-x-auto scrollbar-hide py-4"
        >
          {projects.map((p) => (
            <div
              key={p.id}
              onClick={() => onSelect(p)}
              className="
                min-w-[200px] md:min-w-[280px] h-40
                relative rounded-md overflow-hidden
                cursor-pointer
                transition duration-300
                hover:scale-125 hover:z-50
                origin-center will-change-transform
              "
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

        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-0 bottom-0 z-40 bg-black/60 opacity-0 group-hover/row:opacity-100 transition px-2"
        >
          <ChevronRight size={40} className="text-white" />
        </button>
      </div>
    </div>
  );
};

export default Row;
