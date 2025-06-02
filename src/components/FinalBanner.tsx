import React from "react";

export default function FinalBanner() {
  return (
    <section className="relative w-full flex flex-col items-center justify-center py-16 bg-gradient-to-b from-[#0d0820] to-[#1a1530] overflow-hidden">
      {/* Optional background element */}
      <span className="absolute inset-0 select-none pointer-events-none"></span>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center text-center px-4">
        <h2 className="text-sm md:text-lg font-bold uppercase tracking-widest mb-2 text-[#FFD700]">
          CREATE YOUR IDEAS
        </h2>
        <h1 className="text-4xl md:text-6xl font-extrabold uppercase text-[#FFD700]">
          INTO VISUALS
        </h1>
      </div>
    </section>
  );
}
