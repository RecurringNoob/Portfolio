import React, { useState, useEffect, useRef } from 'react';
import { Play, Info, ChevronLeft, ChevronRight, Search, Bell, User, Code } from 'lucide-react';

const Home = () => {
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [currentPage, setCurrentPage] = useState('profile-selection');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const profiles = {
    personal: { name: "Personal", color: "bg-blue-500", icon: User },
    fullstack: { name: "Fullstack", color: "bg-red-600", icon: Code }
  };

  const ProfileSelection = () => (
    /* FIXED: z-[200] -> z-200 */
    <div className="fixed inset-0 bg-[#141414] flex flex-col items-center justify-center z-200">
      <h1 className="text-white text-3xl md:text-5xl font-medium mb-8 tracking-wide">Who's watching?</h1>
      <div className="flex flex-wrap justify-center gap-6 md:gap-10">
        {Object.entries(profiles).map(([key, p]) => (
          <div 
            key={key}
            onClick={() => { setSelectedProfile(key); setCurrentPage('home'); }}
            className="group flex flex-col items-center cursor-pointer"
          >
            <div className={`w-28 h-28 md:w-40 md:h-40 rounded ${p.color} flex items-center justify-center border-2 border-transparent group-hover:border-white transition-all duration-300 overflow-hidden relative`}>
               <p.icon size={60} className="text-white opacity-90" />
            </div>
            <span className="text-gray-400 mt-4 text-lg md:text-2xl group-hover:text-white transition-colors">{p.name}</span>
          </div>
        ))}
      </div>
      <button className="mt-16 px-6 py-2 border border-gray-500 text-gray-500 hover:text-white hover:border-white transition uppercase tracking-[0.2em] text-sm font-light">
        Manage Profiles
      </button>
    </div>
  );

  const Row = ({ title, items }) => {
    const rowRef = useRef(null);
    const scroll = (dir) => {
      if (rowRef.current) {
        const { scrollLeft, clientWidth } = rowRef.current;
        const scrollTo = dir === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
        rowRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
      }
    };

    return (
      <div className="space-y-2 px-4 md:px-12 my-8 group/row relative">
        <h2 className="text-white text-lg md:text-2xl font-bold transition-colors duration-200 cursor-pointer inline-flex items-center group">
          {title} <ChevronRight className="opacity-0 group-hover:opacity-100 transition-opacity ml-1 w-5 h-5" />
        </h2>
        <div className="relative group">
          <button 
            onClick={() => scroll('left')} 
            className="absolute left-0 top-0 bottom-0 w-12 z-40 bg-black/40 text-white opacity-0 group-hover:opacity-100 hover:bg-black/60 transition-all flex items-center justify-center"
          >
            <ChevronLeft size={40} />
          </button>
          
          <div 
            ref={rowRef} 
            className="flex items-center gap-2 overflow-x-auto scrollbar-hide py-4 scroll-smooth"
            style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}
          >
            {items.map((item, idx) => (
              /* FIXED: min-w-[200px] -> min-w-50 AND md:min-w-[280px] -> md:min-w-70 */
              <div 
                key={idx} 
                className="relative h-28 min-w-50 md:h-40 md:min-w-70 cursor-pointer transition-all duration-300 
                           hover:scale-125 hover:z-50 first:origin-left last:origin-right rounded-md overflow-hidden"
              >
                <img src={item.image} alt="" className="w-full h-full object-cover rounded-md" />
                <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                  <span className="text-white font-bold text-sm md:text-base">{item.title}</span>
                  <div className="flex gap-2 mt-1">
                    {item.technologies.map(t => <span key={t} className="text-[10px] text-green-400 font-bold uppercase">{t}</span>)}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button 
            onClick={() => scroll('right')} 
            className="absolute right-0 top-0 bottom-0 w-12 z-40 bg-black/40 text-white opacity-0 group-hover:opacity-100 hover:bg-black/60 transition-all flex items-center justify-center"
          >
            <ChevronRight size={40} />
          </button>
        </div>
      </div>
    );
  };

  if (currentPage === 'profile-selection') return <ProfileSelection />;

  const profileData = profiles[selectedProfile] || profiles.personal;

  return (
    <div className="min-h-screen bg-[#141414] text-white font-sans selection:bg-[#E50914]">
      {/* Navbar */}
      {/* FIXED: z-[100] -> z-100 AND bg-gradient-to-b -> bg-linear-to-b */}
      <nav className={`fixed top-0 w-full z-100 transition-all duration-500 flex items-center justify-between px-4 md:px-12 py-3 
                      ${isScrolled ? 'bg-[#141414] shadow-xl' : 'bg-transparent bg-linear-to-b from-black/80 to-transparent'}`}>
        <div className="flex items-center gap-5 md:gap-10">
          <span className="text-[#E50914] text-2xl md:text-3xl font-extrabold tracking-tighter cursor-pointer">PORTFOLIO</span>
          <div className="hidden lg:flex gap-5 text-sm font-light text-gray-200">
            <button className="hover:text-gray-400 transition font-bold text-white">Home</button>
            <button className="hover:text-gray-400 transition">Projects</button>
            <button className="hover:text-gray-400 transition">New & Popular</button>
            <button className="hover:text-gray-400 transition">My List</button>
          </div>
        </div>
        <div className="flex items-center gap-4 md:gap-6">
          <Search size={22} className="cursor-pointer hover:text-gray-300" />
          <span className="hidden md:block text-sm">Kids</span>
          <Bell size={22} className="cursor-pointer hover:text-gray-300" />
          <div 
            className="w-8 h-8 rounded bg-blue-500 overflow-hidden cursor-pointer" 
            onClick={() => setCurrentPage('profile-selection')}
          >
            <div className={`w-full h-full ${profileData.color} flex items-center justify-center`}>
              <User size={18} />
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      {/* FIXED: min-h-[400px] -> min-h-100 */}
      <header className="relative h-[56.25vw] max-h-[80vh] min-h-100 w-full overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200" 
          className="absolute inset-0 w-full h-full object-cover" 
          alt="Hero"
        />
        {/* Cinematic Overlays */}
        {/* FIXED: bg-gradient-to-t -> bg-linear-to-t AND bg-gradient-to-r -> bg-linear-to-r */}
        <div className="absolute inset-0 bg-linear-to-t from-[#141414] via-transparent to-black/30" />
        <div className="absolute inset-0 bg-linear-to-r from-[#141414] via-transparent to-transparent" />

        <div className="relative h-full flex flex-col justify-center px-4 md:px-12 pt-16 md:pt-0 max-w-xl space-y-4">
          <h1 className="text-3xl md:text-6xl font-black drop-shadow-2xl uppercase tracking-tighter text-white">The Fullstack Dev</h1>
          <p className="text-sm md:text-lg font-medium text-white drop-shadow-lg leading-tight line-clamp-3">
            In a digital world dominated by legacy code, one engineer dares to ship modern, 
            performant, and beautiful applications. Season 2 available now.
          </p>
          <div className="flex gap-3">
            <button className="bg-white text-black px-5 md:px-8 py-2 md:py-3 rounded-md font-bold flex items-center gap-2 hover:bg-white/80 transition shadow-lg">
              <Play fill="black" size={24} /> Play
            </button>
            <button className="bg-gray-500/60 text-white px-5 md:px-8 py-2 md:py-3 rounded-md font-bold flex items-center gap-2 hover:bg-gray-500/40 transition backdrop-blur-md">
              <Info size={24} /> More Info
            </button>
          </div>
        </div>
      </header>

      <main className="relative z-10 -mt-20 md:-mt-32 lg:-mt-52 pb-20">
        <Row title="Trending Now" items={[
          { title: "E-Commerce", image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=400", technologies: ["React", "Node"] },
          { title: "Social App", image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400", technologies: ["Express", "SQL"] },
          { title: "Task Manager", image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400", technologies: ["Next.js"] },
          { title: "Real Estate", image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400", technologies: ["MongoDB"] },
          { title: "Blog Platform", image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=400", technologies: ["Tailwind"] },
        ]} />
      </main>
    </div>
  );
};

export default Home;