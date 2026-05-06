import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useProfile } from '../contexts/useProfile.js';
import { User, Code, Brain, BookOpen } from 'lucide-react';
import { pingServer } from '../service/chatService.js';

const profiles = {
  portfolio: { name: 'Portfolio',  color: 'bg-emerald-700', icon: BookOpen },
  personal:  { name: 'Personal',   color: 'bg-blue-600',    icon: User },
  fullstack: { name: 'Fullstack',  color: 'bg-red-600',     icon: Code },
  aiml:      { name: 'AI/ML',      color: 'bg-purple-600',  icon: Brain },
};

// Subtitle hints shown beneath each profile name — helps visitors pick quickly
const subtitles = {
  portfolio: 'CV & overview',
  personal:  'Journey & story',
  fullstack: 'Web & apps',
  aiml:      'ML & research',
};

export default function ProfileSelectionPage() {
  const { selectProfile, logout } = useProfile();
  const navigate = useNavigate();

  useEffect(() => {
    pingServer();
  }, []);

  const handleSelect = (key) => {
    selectProfile(key);
    navigate('/browse');
  };

  const handleManageProfiles = () => {
    logout();
    navigate('/select-profile', { replace: true });
  };

  return (
    <div className="fixed inset-0 bg-[#141414] flex flex-col items-center justify-center z-50 px-4">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-white text-4xl md:text-6xl font-medium mb-4 tracking-wide text-center"
      >
        Who's watching?
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="text-gray-500 text-sm md:text-base mb-12 text-center"
      >
        New here? Start with{' '}
        <button
          onClick={() => handleSelect('portfolio')}
          className="text-emerald-400 hover:text-emerald-300 underline underline-offset-2 transition"
        >
          Portfolio
        </button>{' '}
        for a quick overview.
      </motion.p>

      <div className="flex flex-wrap justify-center gap-6 md:gap-10">
        {Object.entries(profiles).map(([key, p], i) => (
          <motion.div
            key={key}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 + i * 0.08 }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleSelect(key)}
            className="group flex flex-col items-center cursor-pointer"
          >
            <div
              className={`w-32 h-32 md:w-40 md:h-40 rounded-xl ${p.color} flex items-center justify-center border-4 border-transparent group-hover:border-white transition-all duration-300 shadow-2xl`}
            >
              <p.icon size={64} className="text-white opacity-90" />
            </div>
            <span className="text-gray-400 mt-4 text-lg md:text-xl group-hover:text-white transition-colors font-medium">
              {p.name}
            </span>
            <span className="text-gray-600 text-xs mt-0.5 group-hover:text-gray-400 transition-colors">
              {subtitles[key]}
            </span>
          </motion.div>
        ))}
      </div>

      <button
        onClick={handleManageProfiles}
        className="mt-16 px-8 py-3 border-2 border-gray-600 text-gray-400 hover:text-white hover:border-white transition uppercase tracking-widest text-sm font-semibold"
      >
        Manage Profiles
      </button>
    </div>
  );
}