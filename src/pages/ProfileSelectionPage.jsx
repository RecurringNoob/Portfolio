import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useProfile } from '../contexts/useProfile.js';
import { User, Code, Brain } from 'lucide-react';
import { pingServer } from '../service/chatService.js';

const profiles = {
  personal: { name: 'Personal', color: 'bg-blue-600', icon: User },
  fullstack: { name: 'Fullstack', color: 'bg-red-600', icon: Code },
  aiml:      { name: 'AI/ML',    color: 'bg-purple-600', icon: Brain },
};

export default function ProfileSelectionPage() {
  const { selectProfile, logout } = useProfile();
  const navigate = useNavigate();

  // ── Silent wake-up ping ──────────────────────────────────────────────
  // The recruiter will spend 30–60 s on this screen choosing a profile,
  // which gives Render plenty of time to boot before they ever open chat.
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
    <div className="fixed inset-0 bg-[#141414] flex flex-col items-center justify-center z-50">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-white text-4xl md:text-6xl font-medium mb-12 tracking-wide"
      >
        Who's watching?
      </motion.h1>

      <div className="flex flex-wrap justify-center gap-8 md:gap-12">
        {Object.entries(profiles).map(([key, p]) => (
          <motion.div
            key={key}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleSelect(key)}
            className="group flex flex-col items-center cursor-pointer"
          >
            <div
              className={`w-36 h-36 md:w-44 md:h-44 rounded-lg ${p.color} flex items-center justify-center border-4 border-transparent group-hover:border-white transition-all duration-300 shadow-2xl`}
            >
              <p.icon size={72} className="text-white opacity-90" />
            </div>
            <span className="text-gray-400 mt-4 text-xl md:text-2xl group-hover:text-white transition-colors font-medium">
              {p.name}
            </span>
          </motion.div>
        ))}
      </div>

      <button
        onClick={handleManageProfiles}
        className="mt-20 px-8 py-3 border-2 border-gray-600 text-gray-400 hover:text-white hover:border-white transition uppercase tracking-widest text-sm font-semibold"
      >
        Manage Profiles
      </button>
    </div>
  );
}