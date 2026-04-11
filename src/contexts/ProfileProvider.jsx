import { useState } from 'react';
import { ProfileContext } from './ProfileContext';
import { profiles } from '../data/profiles';

function getInitialState() {
  const saved = localStorage.getItem('selectedProfile');
  if (saved && profiles[saved]) return { key: saved, data: profiles[saved] };
  return { key: null, data: null };
}

export function ProfileProvider({ children }) {
  const [profileKey, setProfileKey] = useState(() => getInitialState().key);
  const [profile, setProfile]       = useState(() => getInitialState().data);

  const selectProfile = (key) => {
    setProfileKey(key);
    setProfile(profiles[key]);
    localStorage.setItem('selectedProfile', key);
  };

  const logout = () => {
    setProfileKey(null);
    setProfile(null);
    localStorage.removeItem('selectedProfile');
  };

  return (
    <ProfileContext.Provider value={{ profile, profileKey, selectProfile, logout }}>
      {children}
    </ProfileContext.Provider>
  );
}