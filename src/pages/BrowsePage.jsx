import { useState, useEffect } from 'react';
import { useProfile } from '../contexts/useProfile.js';
import Navbar from '../components/layout/Navbar';
import Billboard from '../components/common/Billboard';
import Row from '../components/common/Row';
import ProjectModal from '../components/ProjectModal';
import Terminal from '../components/Terminal';
import Chatbot from '../components/Chatbox';

export default function BrowsePage() {
  const { profile } = useProfile();
  const [selectedProject, setSelectedProject] = useState(null);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

  useEffect(() => {
    const handleShortcut = (e) => {
      if (e.ctrlKey && e.key === '`') setIsTerminalOpen((prev) => !prev);
    };
    window.addEventListener('keydown', handleShortcut);
    return () => window.removeEventListener('keydown', handleShortcut);
  }, []);

  if (!profile) return null;

  return (
    <div className="bg-[#141414] min-h-screen pb-20 selection:bg-[#E50914] relative">
      {isTerminalOpen && <Terminal onClose={() => setIsTerminalOpen(false)} />}
      <Chatbot />
      <Navbar
        profileColor={profile.color}
        onTerminal={() => setIsTerminalOpen(true)}
      />
      {/* No mt-16 needed now */}
      <Billboard hero={profile.hero} />

      <main className="-mt-16 relative z-10">
        {profile.sections.map((section, idx) => (
          <Row
            key={idx}
            title={section.title}
            projects={section.projects}
            onSelect={setSelectedProject}
          />
        ))}
      </main>

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}