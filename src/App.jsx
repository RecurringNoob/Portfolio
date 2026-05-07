import { Routes, Route, Navigate } from 'react-router-dom';
import { useProfile } from './contexts/useProfile.js';
import ProfileSelectionPage from './pages/ProfileSelectionPage';
import BrowsePage from './pages/BrowsePage';
import ProjectPage from './pages/ProjectPage';
import ProjectsPage from './pages/ProjectsPage.jsx';
import NewPopularPage from './pages/NewPopularPage.jsx';
import MyListPage from './pages/MyListPage.jsx';
import Terminal from './pages/Terminal.jsx';
import PortfolioPage from './pages/PortfolioPage.jsx';

function App() {
  const { profile } = useProfile();

  return (
    <Routes>
      {/* Root always goes to profile selection */}
      <Route path="/" element={<Navigate to="/select-profile" replace />} />

      {/* Always accessible — no profile required */}
      <Route path="/select-profile" element={<ProfileSelectionPage />} />
      <Route path="/terminal" element={<Terminal />} />
      <Route path="/portfolio" element={<PortfolioPage />} />
      <Route path="/project/:id" element={<ProjectPage />} />
      <Route path="/projects" element={<ProjectsPage />} />

      {/* Profile-gated routes */}
      {!profile ? (
        <Route path="*" element={<Navigate to="/select-profile" replace />} />
      ) : (
        <>
          <Route path="/browse" element={<BrowsePage />} />

          <Route path="/new-popular" element={<NewPopularPage />} />
          <Route path="/my-list" element={<MyListPage />} />
        </>
      )}
    </Routes>
  );
}

export default App;