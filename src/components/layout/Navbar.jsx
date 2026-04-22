import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Bell, User, Terminal as TerminalIcon, LogOut, ChevronDown, X } from 'lucide-react';
import { useProfile } from '../../contexts/useProfile.js';

function Placeholder({ isFixed }) {
  return <div className={`${isFixed ? 'block' : 'hidden'} h-16`} />;
}

export default function Navbar({ profileColor, onTerminal }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout, profileKey } = useProfile();

  const [isFixed, setIsFixed]           = useState(false);
  const [searchOpen, setSearchOpen]     = useState(false);
  const [searchQuery, setSearchQuery]   = useState('');
  const [profileMenu, setProfileMenu]   = useState(false);
  const [bellPulse, setBellPulse]       = useState(true);

  const searchRef    = useRef(null);
  const profileRef   = useRef(null);

  // ── Scroll listener ──────────────────────────────────────────────────────
  useEffect(() => {
    const handleScroll = () => setIsFixed(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ── Auto-focus search input ──────────────────────────────────────────────
  useEffect(() => {
    if (searchOpen && searchRef.current) searchRef.current.focus();
  }, [searchOpen]);

  // ── Close profile menu on outside click ─────────────────────────────────
  useEffect(() => {
    const handleClick = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  // ── Keyboard: Escape closes search ──────────────────────────────────────
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') { setSearchOpen(false); setSearchQuery(''); }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  const handleProfileClick = () => {
    setProfileMenu(false);
    logout();
    navigate('/select-profile');
  };

  // Derive display name from profile key
  const profileLabel = profileKey
    ? { personal: 'Personal', fullstack: 'Fullstack', aiml: 'AI / ML' }[profileKey] ?? profileKey
    : 'Profile';

  const navLinks = [
    { label: 'Home',           path: '/browse'         },
    { label: 'Projects',       path: '/projects'       },
    { label: 'New & Popular',  path: '/new-popular'    },
    { label: 'My List',        path: '/my-list'        },
  ];

  const isActive = (path) =>
    path === '/browse'
      ? location.pathname === '/browse'
      : location.pathname.startsWith(path);

  return (
    <>
      <Placeholder isFixed={isFixed} />

      <nav
        className={`w-full transition-all duration-500 flex items-center justify-between px-4 md:px-12 py-3 z-50
          ${isFixed
            ? 'fixed top-0 bg-[#141414]/95 backdrop-blur-sm shadow-[0_4px_24px_rgba(0,0,0,0.6)]'
            : 'relative bg-gradient-to-b from-black/80 via-black/30 to-transparent'
          }`}
      >

        {/* ── LEFT: Logo + Nav Links ──────────────────────────────────────── */}
        <div className="flex items-center gap-6 md:gap-10">
          {/* Logo */}
          <motion.span
            onClick={() => navigate('/browse')}
            className="text-[#E50914] text-2xl md:text-3xl font-extrabold tracking-tighter cursor-pointer select-none"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            PORTFOLIO
          </motion.span>

          {/* Desktop nav links */}
          <div className="hidden lg:flex gap-1 text-sm font-light text-gray-200">
            {navLinks.map(({ label, path }) => (
              <Link
                key={path}
                to={path}
                className={`relative px-3 py-1.5 rounded transition-colors duration-200 group
                  ${isActive(path)
                    ? 'text-white font-semibold'
                    : 'text-gray-300 hover:text-white'
                  }`}
              >
                {label}
                {/* Active underline */}
                {isActive(path) && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute bottom-0 left-3 right-3 h-[2px] bg-[#E50914] rounded-full"
                  />
                )}
                {/* Hover underline for non-active */}
                {!isActive(path) && (
                  <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-gray-500 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
                )}
              </Link>
            ))}
          </div>

          {/* Mobile: "Browse" dropdown hint */}
          <div className="lg:hidden flex items-center gap-1 text-sm text-gray-200 cursor-pointer">
            <span>Browse</span>
            <ChevronDown size={14} />
          </div>
        </div>

        {/* ── RIGHT: Icons ────────────────────────────────────────────────── */}
        <div className="flex items-center gap-3 md:gap-5">

          {/* Search — expands inline */}
          <AnimatePresence mode="wait">
            {searchOpen ? (
              <motion.div
                key="search-open"
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 220, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: 'easeInOut' }}
                className="flex items-center gap-2 border border-gray-500 bg-black/70 backdrop-blur-sm px-3 py-1 rounded overflow-hidden"
              >
                <Search size={15} className="text-gray-400 shrink-0" />
                <input
                  ref={searchRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && searchQuery.trim()) {
                      navigate(`/browse?search=${encodeURIComponent(searchQuery.trim())}`);
                      setSearchOpen(false);
                      setSearchQuery('');
                    }
                  }}
                  placeholder="Titles, people, genres"
                  className="bg-transparent text-white text-sm placeholder-gray-500 outline-none w-full"
                />
                <button
                  onClick={() => { setSearchOpen(false); setSearchQuery(''); }}
                  className="text-gray-400 hover:text-white transition shrink-0"
                >
                  <X size={14} />
                </button>
              </motion.div>
            ) : (
              <motion.button
                key="search-closed"
                onClick={() => setSearchOpen(true)}
                className="text-emerald-400 hover:text-emerald-300 transition p-1 rounded"
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                title="Search"
              >
                <Search size={22} />
              </motion.button>
            )}
          </AnimatePresence>

          {/* Bell with pulse dot */}
          <motion.button
            className="relative text-emerald-400 hover:text-emerald-300 transition p-1 rounded"
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setBellPulse(false)}
            title="Notifications"
          >
            <Bell size={22} />
            {bellPulse && (
              <span className="absolute top-0.5 right-0.5 w-2 h-2 bg-[#E50914] rounded-full">
                <span className="absolute inset-0 bg-[#E50914] rounded-full animate-ping opacity-75" />
              </span>
            )}
          </motion.button>

          {/* Terminal toggle */}
          <motion.button
            onClick={onTerminal}
            className="text-emerald-400 hover:text-emerald-300 transition p-1 rounded"
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            title="Open Terminal  (Ctrl + `)"
          >
            <TerminalIcon size={22} />
          </motion.button>

          {/* Profile avatar + dropdown ─────────────────────────────────── */}
          <div ref={profileRef} className="relative">
            <motion.button
              onClick={() => setProfileMenu((v) => !v)}
              className="flex items-center gap-2 group"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              {/* Avatar circle */}
              <div className={`w-8 h-8 rounded overflow-hidden border-2 border-transparent group-hover:border-white transition-all duration-200 ${profileColor} flex items-center justify-center`}>
                <User size={17} className="text-white" />
              </div>

              {/* Name label — visible on hover via group */}
              <motion.span
                className="hidden md:block text-sm text-gray-300 group-hover:text-white transition-colors duration-150 select-none"
              >
                {profileLabel}
              </motion.span>

              <ChevronDown
                size={14}
                className={`hidden md:block text-gray-400 transition-transform duration-200 ${profileMenu ? 'rotate-180' : ''}`}
              />
            </motion.button>

            {/* Dropdown menu */}
            <AnimatePresence>
              {profileMenu && (
                <motion.div
                  initial={{ opacity: 0, y: -6, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6, scale: 0.97 }}
                  transition={{ duration: 0.15, ease: 'easeOut' }}
                  className="absolute right-0 mt-2 w-48 bg-[#1a1a1a] border border-gray-700 rounded-lg shadow-2xl overflow-hidden"
                >
                  {/* Profile info header */}
                  <div className="px-4 py-3 border-b border-gray-700">
                    <p className="text-xs text-gray-400 uppercase tracking-widest mb-0.5">Viewing as</p>
                    <p className="text-white text-sm font-semibold">{profileLabel}</p>
                  </div>

                  {/* Switch profile */}
                  <button
                    onClick={() => { setProfileMenu(false); navigate('/select-profile'); }}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-300 hover:bg-white/5 hover:text-white transition-colors"
                  >
                    <User size={15} className="text-gray-400" />
                    Switch Profile
                  </button>

                  {/* Sign out */}
                  <button
                    onClick={handleProfileClick}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-300 hover:bg-white/5 hover:text-white transition-colors border-t border-gray-800"
                  >
                    <LogOut size={15} className="text-gray-400" />
                    Sign Out
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </nav>
    </>
  );
}