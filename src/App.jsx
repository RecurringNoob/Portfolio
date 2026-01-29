import React, { useState, useEffect } from 'react';
import { profiles } from './data/profiles';
import Navbar from './components/layout/Navbar';
import Billboard from './components/common/Billboard';
import Row from './components/common/Row';
import ProjectModal from './components/ProjectModal';
import ProfileSelection from './components/ProfileSelection';
import ProjectDetails from './pages/ProjectDetails'; 
import { Terminal } from './pages/Terminal';

function App() {
  const [activeProfile, setActiveProfile] = useState(null);
  
  // Navigation State
  const [currentView, setCurrentView] = useState('browse'); // 'browse' | 'details'
  const [detailsProject, setDetailsProject] = useState(null); // The project to show in full screen
  
  // Modal State
  const [selectedProject, setSelectedProject] = useState(null);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

  // Terminal Shortcut
  useEffect(() => {
    const handleShortcut = (e) => {
      if (e.ctrlKey && e.key === '`') setIsTerminalOpen(prev => !prev);
    };
    window.addEventListener('keydown', handleShortcut);
    return () => window.removeEventListener('keydown', handleShortcut);
  }, []);

  // 1. Handle "Play" Click (Switch to Details View)
  const handlePlay = (project) => {
    setDetailsProject(project);   // Set the project for the full page
    setCurrentView('details');    // Switch view
    setSelectedProject(null);     // Close the modal
    window.scrollTo(0, 0);        // Reset scroll
  };

  // 2. Handle "Back" Click (Switch back to Browse)
  const handleBack = () => {
    setCurrentView('browse');
    setDetailsProject(null);
  };

  // Profile Selection Guard
  if (!activeProfile) {
    return <ProfileSelection onSelect={(key) => setActiveProfile(profiles[key])} />;
  }

  // Calculate related projects (flattening all sections)
  const allProjects = activeProfile.sections.flatMap(section => section.projects);
  const relatedProjects = detailsProject 
    ? allProjects.filter(p => p.id !== detailsProject.id) 
    : [];

  return (
    <div className="bg-[#141414] min-h-screen pb-20 selection:bg-[#E50914] relative">
      
      {/* Terminal Overlay (Always available) */}
      {isTerminalOpen && <Terminal onClose={() => setIsTerminalOpen(false)} />}

      {/* VIEW 1: Project Details (Full Screen) */}
      {currentView === 'details' && detailsProject ? (
        <ProjectDetails 
          project={detailsProject} 
          onBack={handleBack} 
          relatedProjects={relatedProjects}
          onProjectSelect={handlePlay}
        />
      ) : (
        /* VIEW 2: Browse (Home) */
        <>
          <Navbar 
            profileColor={activeProfile.color} 
            onReset={() => setActiveProfile(null)} 
            onTerminal={() => setIsTerminalOpen(true)} 
          />
          
          <Billboard hero={activeProfile.hero} />
          
          <main className="-mt-32 relative z-10">
            {activeProfile.sections.map((section, idx) => (
              <Row 
                key={idx} 
                title={section.title} 
                projects={section.projects} 
                onSelect={setSelectedProject} 
              />
            ))}
          </main>

          {/* Modal now accepts onPlay */}
          <ProjectModal 
            project={selectedProject} 
            onClose={() => setSelectedProject(null)} 
            onPlay={() => handlePlay(selectedProject)}
          />
        </>
      )}
    </div>
  );
}

export default App;