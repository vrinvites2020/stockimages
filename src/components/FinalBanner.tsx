import React from "react";

export default function FinalBanner() {
  return (
    <section className="relative w-full flex flex-col items-center justify-center py-16 bg-gradient-to-b from-[#0d0820] to-[#1a1530] overflow-hidden">
      <div className="relative z-10 flex flex-col items-center text-center px-4">
        <h2 className="text-sm md:text-lg font-bold text-yellow-100 tracking-widest uppercase drop-shadow-md mb-2">
          Create Your Ideas
        </h2>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold bg-gradient-to-r from-yellow-300 via-orange-400 to-yellow-500 bg-clip-text text-transparent uppercase drop-shadow-[0_0_12px_rgba(255,215,0,0.6)] tracking-tight font-cinzel">
          Into Visuals
        </h1>
      </div>

      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Cinzel:wght@700&display=swap");
        .font-cinzel {
          font-family: "Cinzel", serif;
        }
      `}</style>
    </section>
  );
}
