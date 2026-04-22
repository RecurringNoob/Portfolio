import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, Bell, User, Terminal as TerminalIcon,
  LogOut, ChevronDown, X, Menu, Home, Folder,
  TrendingUp, ListVideo,
} from 'lucide-react';
import { useProfile } from '../../contexts/useProfile.js';

function Placeholder({ isFixed }) {
  return <div className={`${isFixed ? 'block' : 'hidden'} h-16`} />;
}

export default function Navbar({ profileColor, onTerminal }) {
  const navigate   = useNavigate();
  const location   = useLocation();
  const { logout, profileKey } = useProfile();

  const [isFixed, setIsFixed]         = useState(false);
  const [searchOpen, setSearchOpen]   = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [profileMenu, setProfileMenu] = useState(false);
  const [mobileOpen, setMobileOpen]   = useState(false);
  const [bellPulse, setBellPulse]     = useState(true);

  const searchRef  = useRef(null);
  const profileRef = useRef(null);

  // ── Scroll listener ────────────────────────────────────────────────────
  useEffect(() => {
    const onScroll = () => setIsFixed(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // ── Auto-focus search ──────────────────────────────────────────────────
  useEffect(() => {
    if (searchOpen && searchRef.current) searchRef.current.focus();
  }, [searchOpen]);

  // ── Close profile menu on outside click ───────────────────────────────
  useEffect(() => {
    const onDown = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target))
        setProfileMenu(false);
    };
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, []);

  // ── Escape closes search + mobile drawer ──────────────────────────────
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setSearchOpen(false);
        setSearchQuery('');
        setMobileOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // ── Close drawer on route change ──────────────────────────────────────
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { setMobileOpen(false); }, [location.pathname]);

  // ── Lock body scroll when drawer open ─────────────────────────────────
  // This effect only touches an external system (the DOM), never setState —
  // so it is the correct pattern for a useEffect body.
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const handleSignOut = () => {
    setProfileMenu(false);
    logout();
    navigate('/select-profile');
  };

  const profileLabel = profileKey
    ? { personal: 'Personal', fullstack: 'Fullstack', aiml: 'AI / ML' }[profileKey] ?? profileKey
    : 'Profile';

  const navLinks = [
    { label: 'Home',          path: '/browse',       icon: Home       },
    { label: 'Projects',      path: '/projects',     icon: Folder     },
    { label: 'New & Popular', path: '/new-popular',  icon: TrendingUp },
    { label: 'My List',       path: '/my-list',      icon: ListVideo  },
  ];

  const isActive = (path) =>
    path === '/browse'
      ? location.pathname === '/browse'
      : location.pathname.startsWith(path);

  // Navigate to /projects with query so ProjectsPage handles live filtering
  const submitSearch = () => {
    const q = searchQuery.trim();
    if (!q) return;
    navigate(`/projects?search=${encodeURIComponent(q)}`);
    setSearchOpen(false);
    setSearchQuery('');
    setMobileOpen(false);
  };

  return (
    <>
      <Placeholder isFixed={isFixed} />

      {/* ════════════════════════════════════════════════════════════════
          MOBILE DRAWER
      ════════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-60 bg-black/70 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileOpen(false)}
            />

            {/* Slide-in panel */}
            <motion.aside
              key="drawer"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 32 }}
              className="fixed top-0 left-0 bottom-0 z-70 w-72 bg-[#0f0f0f] border-r border-white/8 flex flex-col lg:hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-white/8">
                <span className="text-[#E50914] text-xl font-extrabold tracking-tighter select-none">
                  PORTFOLIO
                </span>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="text-gray-400 hover:text-white transition p-1 rounded"
                  aria-label="Close menu"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Profile badge */}
              <div className="flex items-center gap-3 px-5 py-4 border-b border-white/8">
                <div className={`w-10 h-10 rounded-xl ${profileColor} flex items-center justify-center shrink-0`}>
                  <User size={18} className="text-white" />
                </div>
                <div>
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest">Viewing as</p>
                  <p className="text-white text-sm font-semibold mt-0.5">{profileLabel}</p>
                </div>
              </div>

              {/* Search bar */}
              <div className="px-4 py-3 border-b border-white/8">
                <div className="relative">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') submitSearch(); }}
                    placeholder="Search projects, skills…"
                    className="w-full bg-white/5 border border-white/10 rounded-lg pl-9 pr-3 py-2 text-sm text-white placeholder-gray-500 outline-none focus:border-emerald-500 transition"
                  />
                </div>
              </div>

              {/* Nav links */}
              <nav className="flex-1 px-3 py-3 overflow-y-auto">
                {navLinks.map(({ label, path, icon: Icon }) => (
                  <Link
                    key={path}
                    to={path}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl mb-1 text-sm font-medium transition-all duration-150
                      ${isActive(path)
                        ? 'bg-white/8 text-white'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                      }`}
                  >
                    <Icon
                      size={17}
                      className={isActive(path) ? 'text-[#E50914]' : 'text-gray-500'}
                    />
                    {label}
                    {isActive(path) && (
                      <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#E50914]" />
                    )}
                  </Link>
                ))}
              </nav>

              {/* Footer actions */}
              <div className="px-3 py-4 border-t border-white/8 space-y-1">
                <button
                  onClick={() => { setMobileOpen(false); onTerminal?.(); }}
                  className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                >
                  <TerminalIcon size={16} className="text-emerald-400" />
                  Open Terminal
                  <span className="ml-auto text-[10px] text-gray-600 font-mono bg-white/5 px-1.5 py-0.5 rounded">
                    Ctrl+`
                  </span>
                </button>
                <button
                  onClick={() => { setMobileOpen(false); navigate('/select-profile'); }}
                  className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                >
                  <User size={16} className="text-gray-500" />
                  Switch Profile
                </button>
                <button
                  onClick={handleSignOut}
                  className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-red-400 hover:text-red-300 hover:bg-red-500/5 transition-colors"
                >
                  <LogOut size={16} />
                  Sign Out
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* ════════════════════════════════════════════════════════════════
          MAIN NAVBAR
      ════════════════════════════════════════════════════════════════ */}
      <nav
        className={`w-full transition-all duration-500 flex items-center justify-between px-4 md:px-12 py-3 z-50
          ${isFixed
            ? 'fixed top-0 bg-[#141414]/95 backdrop-blur-sm shadow-[0_4px_24px_rgba(0,0,0,0.6)]'
            : 'relative bg-linear-to-b from-black/80 via-black/30 to-transparent'
          }`}
      >
        {/* ── LEFT ──────────────────────────────────────────────────── */}
        <div className="flex items-center gap-4 md:gap-10">

          {/* Hamburger (mobile only) */}
          <motion.button
            className="lg:hidden text-gray-300 hover:text-white p-1 rounded"
            onClick={() => setMobileOpen(true)}
            whileTap={{ scale: 0.9 }}
            aria-label="Open navigation"
          >
            <Menu size={22} />
          </motion.button>

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
            {navLinks.map(({ label, path }) => ( // icon not needed on desktop
              <Link
                key={path}
                to={path}
                className={`relative px-3 py-1.5 rounded transition-colors duration-200 group
                  ${isActive(path) ? 'text-white font-semibold' : 'text-gray-300 hover:text-white'}`}
              >
                {label}
                {isActive(path) && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#E50914] rounded-full"
                  />
                )}
                {!isActive(path) && (
                  <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-gray-500 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
                )}
              </Link>
            ))}
          </div>
        </div>

        {/* ── RIGHT ─────────────────────────────────────────────────── */}
        <div className="flex items-center gap-3 md:gap-5">

          {/* Inline search — expands on desktop */}
          <AnimatePresence mode="wait">
            {searchOpen ? (
              <motion.div
                key="search-open"
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 220, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: 'easeInOut' }}
                className="hidden sm:flex items-center gap-2 border border-gray-500 bg-black/70 backdrop-blur-sm px-3 py-1 rounded overflow-hidden"
              >
                <Search size={15} className="text-gray-400 shrink-0" />
                <input
                  ref={searchRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') submitSearch(); }}
                  placeholder="Titles, skills, tags…"
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

          {/* Bell */}
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

          {/* Terminal (desktop only — mobile has it in drawer) */}
          <motion.button
            onClick={onTerminal}
            className="hidden sm:block text-emerald-400 hover:text-emerald-300 transition p-1 rounded"
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            title="Open Terminal (Ctrl + `)"
          >
            <TerminalIcon size={22} />
          </motion.button>

          {/* Profile avatar + dropdown */}
          <div ref={profileRef} className="relative">
            <motion.button
              onClick={() => setProfileMenu((v) => !v)}
              className="flex items-center gap-2 group"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <div className={`w-8 h-8 rounded overflow-hidden border-2 border-transparent group-hover:border-white transition-all duration-200 ${profileColor} flex items-center justify-center`}>
                <User size={17} className="text-white" />
              </div>
              <span className="hidden md:block text-sm text-gray-300 group-hover:text-white transition-colors duration-150 select-none">
                {profileLabel}
              </span>
              <ChevronDown
                size={14}
                className={`hidden md:block text-gray-400 transition-transform duration-200 ${profileMenu ? 'rotate-180' : ''}`}
              />
            </motion.button>

            <AnimatePresence>
              {profileMenu && (
                <motion.div
                  initial={{ opacity: 0, y: -6, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6, scale: 0.97 }}
                  transition={{ duration: 0.15, ease: 'easeOut' }}
                  className="absolute right-0 mt-2 w-48 bg-[#1a1a1a] border border-gray-700 rounded-lg shadow-2xl overflow-hidden"
                >
                  <div className="px-4 py-3 border-b border-gray-700">
                    <p className="text-xs text-gray-400 uppercase tracking-widest mb-0.5">Viewing as</p>
                    <p className="text-white text-sm font-semibold">{profileLabel}</p>
                  </div>
                  <button
                    onClick={() => { setProfileMenu(false); navigate('/select-profile'); }}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-300 hover:bg-white/5 hover:text-white transition-colors"
                  >
                    <User size={15} className="text-gray-400" />
                    Switch Profile
                  </button>
                  <button
                    onClick={handleSignOut}
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