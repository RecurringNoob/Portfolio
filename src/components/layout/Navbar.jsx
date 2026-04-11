import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Bell, User, Terminal as TerminalIcon } from 'lucide-react';
import { useProfile } from '../../contexts/useProfile.js';

// Declared outside component to avoid "component created during render" error
function Placeholder({ isFixed }) {
  return <div className={`${isFixed ? 'block' : 'hidden'} h-16`} />;
}

export default function Navbar({ profileColor, onTerminal }) {
  const navigate = useNavigate();
  const { logout } = useProfile();
  const [isFixed, setIsFixed] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsFixed(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleProfileClick = () => {
    logout();
    navigate('/select-profile');
  };

  return (
    <>
      <Placeholder isFixed={isFixed} />
      <nav
        className={`w-full transition-all duration-500 flex items-center justify-between px-4 md:px-12 py-3 z-50
          ${isFixed
            ? 'fixed top-0 bg-[#141414] shadow-xl'
            : 'relative bg-transparent'
          }`}
      >
        <div className="flex items-center gap-5 md:gap-10">
          <span
            onClick={() => navigate('/browse')}
            className="text-[#E50914] text-2xl md:text-3xl font-extrabold tracking-tighter cursor-pointer"
          >
            PORTFOLIO
          </span>
          <div className="hidden lg:flex gap-5 text-sm font-light text-gray-200">
            <Link to="/browse" className="hover:text-gray-400 transition font-bold text-white">
              Home
            </Link>
            <a href="#projects" className="hover:text-gray-400 transition">Projects</a>
            <a href="#new" className="hover:text-gray-400 transition">New & Popular</a>
            <a href="#list" className="hover:text-gray-400 transition">My List</a>
          </div>
        </div>

        <div className="flex items-center gap-4 md:gap-6">
          <Search size={22} className="cursor-pointer text-emerald-400 hover:text-emerald-300 transition" />
          <span className="hidden md:block text-sm">Kids</span>
          <Bell size={22} className="cursor-pointer text-emerald-400 hover:text-emerald-300 transition" />
          <TerminalIcon
            size={22}
            className="cursor-pointer text-emerald-400 hover:text-emerald-300 transition"
            onClick={onTerminal}
          />
          <div
            className="w-8 h-8 rounded overflow-hidden cursor-pointer"
            onClick={handleProfileClick}
          >
            <div className={`w-full h-full ${profileColor} flex items-center justify-center`}>
              <User size={18} className="text-white" />
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}