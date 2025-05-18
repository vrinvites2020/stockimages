import React from 'react';

// Simple animated avatar using SVG and CSS
const AnimatedAvatar = () => (
  <div className="w-20 h-20 rounded-[30%] bg-gradient-to-b from-[#3a1c71] via-[#d76d77] to-[#ffaf7b] flex items-center justify-center shadow-lg animate-bounce-slow">
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <circle cx="24" cy="20" r="12" fill="#fff" fillOpacity="0.9" />
      <ellipse cx="24" cy="38" rx="14" ry="8" fill="#fff" fillOpacity="0.7" />
    </svg>
  </div>
);

const people = [
  { name: 'Suryateja', role: 'Warangal' },
  { name: 'Jayaram', role: 'Vijayawada' },
  { name: 'Chinmayi', role: 'Hyderabad' },
  { name: 'Mahesh', role: 'Mumbai' },
  { name: 'Sadashiva', role: 'Tamil Nadu' },
  { name: 'Rajini', role: 'Kerala' },
  { name: 'Vasudev', role: 'Karnataka' },
];

export default function RecentDownloads() {
  return (
    <section className="w-full py-12 bg-[#2a2040] flex flex-col items-center">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Recent Downloads</h2>
      <div className="flex flex-wrap gap-8 justify-center mb-12">
        {people.map((person) => (
          <div key={person.name} className="flex flex-col items-center">
            <AnimatedAvatar />
            <span className="mt-2 text-white font-semibold text-base drop-shadow-lg">{person.name}</span>
            <span className="text-xs text-purple-300 font-medium">{person.role}</span>
          </div>
        ))}
      </div>
      <div className="w-full flex flex-col md:flex-row justify-center items-center gap-8 mt-4">
        <div className="flex-1 text-center">
          <h3 className="text-lg font-bold text-purple-400 mb-1">Save time</h3>
          <p className="text-sm text-gray-200">Don&apos;t need to spend<br />hours laboring over video design</p>
        </div>
        <div className="flex-1 text-center">
          <h3 className="text-lg font-bold text-purple-400 mb-1">Broadcast quality</h3>
          <p className="text-sm text-gray-200">We build quality video templates to ensure<br />your clients dream fulfill</p>
        </div>
        <div className="flex-1 text-center">
          <h3 className="text-lg font-bold text-purple-400 mb-1">Easy Editable</h3>
          <p className="text-sm text-gray-200">Our templates are super easy<br />to use and fully Prerendered Elements</p>
        </div>
      </div>
      <style jsx>{`
        .animate-bounce-slow {
          animation: bounce 2.5s infinite alternate;
        }
        @keyframes bounce {
          0% { transform: translateY(0); }
          100% { transform: translateY(-12px); }
        }
      `}</style>
    </section>
  );
} 