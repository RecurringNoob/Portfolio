import React from 'react';
import { profiles } from '../data/profiles';
import { User, Code, Edit } from 'lucide-react';

const ProfileSelection = ({ onSelect }) => {
  return (
    <div className="fixed inset-0 bg-[#141414] flex flex-col items-center justify-center z-50 animate-fadeIn">
      <h1 className="text-white text-4xl md:text-6xl font-medium mb-12 tracking-wide">Who's watching?</h1>
      
      <div className="flex flex-wrap justify-center gap-8 md:gap-12">
        {Object.keys(profiles).map((key) => {
          const p = profiles[key];
          const Icon = key === 'fullstack' ? Code : User;
          
          return (
            <div 
              key={key}
              onClick={() => onSelect(key)}
              className="group flex flex-col items-center cursor-pointer transform transition-all duration-300 hover:scale-110"
            >
              <div className={`w-36 h-36 md:w-44 md:h-44 rounded-lg relative overflow-hidden transition-all duration-300 border-4 border-transparent group-hover:border-white shadow-2xl`}>
                <div className={`w-full h-full ${p.color} flex items-center justify-center group-hover:brightness-110`}>
                  <Icon size={72} className="text-white opacity-90" />
                </div>
              </div>
              <span className="text-gray-400 mt-4 text-xl md:text-2xl group-hover:text-white transition-colors font-medium">{p.name}</span>
            </div>
          );
        })}
      </div>

      <button className="mt-20 px-8 py-3 border-2 border-gray-600 text-gray-400 hover:text-white hover:border-white transition uppercase tracking-widest text-sm font-semibold">
        Manage Profiles
      </button>
    </div>
  );
};
export default ProfileSelection;