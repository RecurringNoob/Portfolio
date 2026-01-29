// src/components/common/Billboard.jsx
import React from 'react';
import { Play, Info } from 'lucide-react';

const Billboard = ({ hero }) => (
  <header className="relative h-[75vh] min-h-130 w-full overflow-hidden">
    <img
      src={hero.image}
      alt={hero.title}
      className="absolute inset-0 w-full h-full object-cover brightness-90 contrast-110"
    />

    {/* overlays */}
    <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/60 to-transparent" />
    <div className="absolute inset-0 bg-gradient-to-r from-[#141414] via-transparent to-transparent" />

    {/* content */}
    <div className="relative h-full flex flex-col justify-end px-6 md:px-14 pb-28 max-w-xl space-y-5">
      <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white drop-shadow-lg">
        {hero.title}
      </h1>
      
      {/* Added Hero Metadata line */}
      <div className="flex items-center gap-3 text-white font-semibold drop-shadow-md">
         <span className="text-[#46d369]">{hero.match}</span>
         <span>{hero.year}</span>
         <span className="border px-1 text-sm">{hero.rating}</span>
         <span>{hero.duration}</span>
      </div>

      <p className="text-gray-200 text-sm md:text-lg leading-relaxed line-clamp-3 drop-shadow-md">
        {hero.description}
      </p>

      <div className="flex gap-3">
        <button className="flex items-center gap-2 bg-white text-black px-8 py-3 rounded-md font-bold hover:bg-white/80 transition">
          <Play fill="black" size={22} /> Resume
        </button>

        <button className="flex items-center gap-2 bg-gray-500/60 text-white px-8 py-3 rounded-md font-bold hover:bg-gray-500/40 transition backdrop-blur-md">
          <Info size={22} /> About Me
        </button>
      </div>
    </div>
  </header>
);

export default Billboard;