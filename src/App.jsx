import { Routes, Route, Navigate } from 'react-router-dom';
import { useProfile } from './contexts/useProfile.js';
import ProfileSelectionPage from './pages/ProfileSelectionPage';
import BrowsePage from './pages/BrowsePage';
import ProjectPage from './pages/ProjectPage';

function App() {
  const { profile } = useProfile();

  return (
    <Routes>
      {/* Profile selection is always accessible */}
      <Route path="/select-profile" element={<ProfileSelectionPage />} />

      {/* If no profile is selected, redirect to selection */}
      {!profile ? (
        <Route path="*" element={<Navigate to="/select-profile" replace />} />
      ) : (
        <>
          <Route path="/" element={<Navigate to="/browse" replace />} />
          <Route path="/browse" element={<BrowsePage />} />
          <Route path="/project/:id" element={<ProjectPage />} />
        </>
      )}
    </Routes>
  );
}

export default App;