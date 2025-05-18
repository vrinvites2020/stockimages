import React from 'react';

export default function FinalBanner() {
  return (
    <section className="relative w-full flex flex-col items-center justify-center py-16 bg-[#1a1530] overflow-hidden">
      {/* Large faded background text */}
      <span className="absolute inset-0 flex items-center justify-center select-none pointer-events-none">
        <span className="text-[clamp(2.5rem,10vw,7rem)] font-extrabold text-white/10 tracking-tight" style={{letterSpacing: '-0.05em'}}>Create your</span>
      </span>
      {/* Foreground text */}
      <div className="relative z-10 flex flex-col items-center">
        <span className="text-sm md:text-base font-semibold text-purple-300 mb-1 ml-8">ideas into</span>
        <span className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent font-script drop-shadow-lg" style={{fontFamily: 'Dancing Script, cursive'}}>
          Visuals
        </span>
      </div>
      {/* Google Fonts import for Dancing Script */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&display=swap');
        .font-script {
          font-family: 'Dancing Script', cursive;
        }
      `}</style>
    </section>
  );
} 