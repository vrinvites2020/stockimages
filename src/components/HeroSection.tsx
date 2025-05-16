import React from 'react';

const HeroSection = () => {
  return (
    <div className="min-h-[60vh] bg-gradient-to-br from-[#18122B] via-[#1E1B3A] to-[#232946] flex items-center justify-center relative overflow-hidden">
      {/* Floating circles and lines for background flair */}
      <div className="absolute top-10 left-10 w-24 h-24 bg-gradient-to-tr from-purple-500 to-indigo-500 rounded-full opacity-30 blur-2xl animate-pulse" />
      <div className="absolute bottom-20 right-32 w-16 h-16 bg-gradient-to-tr from-purple-400 to-indigo-400 rounded-full opacity-40 blur-xl animate-pulse" />
      <div className="absolute top-1/3 right-1/4 w-8 h-8 border-2 border-purple-400 rounded-full opacity-60 animate-bounce" />
      <div className="absolute bottom-1/4 left-1/3 w-12 h-12 border-2 border-indigo-400 rounded-full opacity-50 animate-bounce delay-1000" />
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between relative z-10">
        {/* Left: Text */}
        <div className="flex-1 text-left space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
            Discover, find,<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-400 to-purple-600 font-extrabold">Sell extraordinary</span><br />
            Monster NFTs
          </h1>
          <p className="text-lg md:text-2xl text-gray-300 max-w-xl mt-4">
            Marketplace For Monster Character Collections Non Fungible Token NFTs
          </p>
          <div className="flex gap-6 mt-8">
            <button className="px-8 py-3 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold text-lg shadow-lg hover:scale-105 transition-transform flex items-center gap-2">
              <span className="material-icons">rocket_launch</span> Explore
            </button>
            <button className="px-8 py-3 rounded-full border-2 border-purple-400 text-white font-semibold text-lg hover:bg-purple-900/30 transition-colors flex items-center gap-2">
              <span className="material-icons">note_add</span> Create
            </button>
          </div>
        </div>
        {/* Right: Animated Mascot Placeholder */}
        <div className="flex-1 flex justify-center items-center mt-12 md:mt-0">
          <div className="relative w-[320px] h-[420px] flex items-end">
            <div className="w-full h-full flex items-end justify-center animate-updown">
              {/* Replace this div with your own image/model */}
              <div className="w-72 h-96 bg-gradient-to-br from-purple-300 via-indigo-200 to-purple-100 rounded-3xl shadow-2xl flex items-center justify-center border-4 border-purple-400/40">
                <span className="text-6xl text-purple-700 opacity-60">🐰</span>
              </div>
            </div>
          </div>
        </div>
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
      {/* Material Icons CDN for icons (optional, or use your own icons) */}
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
    </div>
  );
};

export default HeroSection; 