import React, { useState } from 'react';
import { Search, Bell, ChevronDown, Terminal,Monitor } from 'lucide-react';
import { useScroll } from '../../hooks/useScroll';

const Navbar = ({ profileColor, onReset, onTerminal }) => {
  const isScrolled = useScroll();
  const [showSearch, setShowSearch] = useState(false);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled ? 'bg-black/95 backdrop-blur-xl shadow-2xl' : 'bg-gradient-to-b from-black via-black/50 to-transparent'
    }`}>
      <div className="px-6 md:px-14 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <h1 className="text-[#E50914] text-2xl md:text-4xl font-black tracking-tighter cursor-pointer hover:scale-105 transition-transform uppercase">
                PORTFOLIO
            </h1>
            <ul className="hidden md:flex items-center gap-6 text-sm">
              <li className="text-white font-semibold cursor-pointer hover:text-red-400 transition relative group">
                Home
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-red-500 to-pink-500 group-hover:w-full transition-all duration-300"></span>
              </li>
              <li className="text-gray-300 cursor-pointer hover:text-white transition">Projects</li>
              <li className="text-gray-300 cursor-pointer hover:text-white transition">Skills</li>
              <li className="text-gray-300 cursor-pointer hover:text-white transition">About</li>
            </ul>
          </div>

          <div className="flex items-center gap-4 md:gap-6">
            <button 
              onClick={() => setShowSearch(!showSearch)}
              className="text-white hover:text-red-400 transition transform hover:scale-110"
            >
              <Search size={20} />
            </button>
            <button 
              onClick={onTerminal} 
              className="text-white hover:text-green-400 transition transform hover:scale-110 relative group"
            >
              <Monitor size={20} />
              <span className="absolute -bottom-8 right-0 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
                Terminal Mode
              </span>
            </button>
            <div className="flex items-center gap-2 cursor-pointer group" onClick={onReset}>
              <div className={`w-8 h-8 rounded-full ${profileColor} shadow-lg ring-2 ring-white/20 group-hover:ring-white/60 transition`} />
              <ChevronDown size={16} className="text-white group-hover:rotate-180 transition-transform duration-300" />
            </div>
          </div>
        </div>

        {showSearch && (
          <div className="mt-4 animate-fadeIn">
            <input
              type="text"
              placeholder="Search projects, skills, experience..."
              className="w-full md:w-96 bg-white/10 backdrop-blur-xl border border-white/20 text-white placeholder-gray-400 px-4 py-3 rounded-lg focus:outline-none focus:border-red-500/60 focus:ring-2 focus:ring-red-500/20 transition"
              autoFocus
            />
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;