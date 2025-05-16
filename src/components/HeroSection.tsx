import React from 'react';

const HeroSection = () => {
  // Scroll to searchbar section
  const handleExploreClick = () => {
    const el = document.getElementById('searchbar-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-[60vh] bg-gradient-to-br from-[#18122B] via-[#1E1B3A] to-[#232946] flex items-center justify-center relative overflow-hidden">
      {/* Floating circles and lines for background flair */}
      <div className="absolute top-10 left-10 w-24 h-24 bg-gradient-to-tr from-purple-500 to-indigo-500 rounded-full opacity-30 blur-2xl animate-pulse" />
      <div className="absolute bottom-20 right-32 w-16 h-16 bg-gradient-to-tr from-purple-400 to-indigo-400 rounded-full opacity-40 blur-xl animate-pulse" />
      <div className="absolute top-1/3 right-1/4 w-8 h-8 border-2 border-purple-400 rounded-full opacity-60 animate-bounce" />
      <div className="absolute bottom-1/4 left-1/3 w-12 h-12 border-2 border-indigo-400 rounded-full opacity-50 animate-bounce delay-1000" />
      <div className="container mx-auto px-4 flex flex-col items-center justify-center relative z-10 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-indigo-400 via-pink-400 to-purple-500 text-transparent bg-clip-text drop-shadow-lg">
          Discover Creative Assets
        </h1>
        <p className="text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto mb-8 font-medium drop-shadow">
          Find high-quality templates, icons, and graphics for your next project
        </p>
        <button
          className="px-10 py-4 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-bold text-lg shadow-xl hover:scale-105 transition-transform"
          onClick={handleExploreClick}
        >
          Explore
        </button>
      </div>
      {/* Custom keyframes for up-down animation */}
      <style jsx global>{`
        @keyframes updown {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-32px); }
        }
        .animate-updown {
          animation: updown 2.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default HeroSection; 