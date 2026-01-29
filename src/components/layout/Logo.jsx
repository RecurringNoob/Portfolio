import React from 'react';

const Logo = ({ className = "" }) => {
  return (
    <div className={`relative flex items-center ${className}`}>

      <div className="md:hidden w-8 h-12 relative overflow-hidden">
        {/* Left vertical bar */}
        <div className="absolute left-0 top-0 bottom-0 w-2.5 bg-[#E50914] shadow-lg z-20"></div>
        {/* Curve */}
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-br from-[#b81d24] to-[#E50914] rounded-r-full z-10"></div>
        {/* Shadow overlay for depth */}
        <div className="absolute left-2.5 top-0 bottom-0 w-1 bg-black/20 z-30 blur-[1px]"></div>
      </div>

      {/* DESKTOP LOGO: "DEVFLIX" Wordmark
         Visible only on medium screens and up (>= md)
      */}
      <h1 className="hidden md:block font-netflix text-[#E50914] text-4xl lg:text-5xl font-medium tracking-wide drop-shadow-md select-none">
        Tanmay Khandelwal
      </h1>
    </div>
  );
};

export default Logo;