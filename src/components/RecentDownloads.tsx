import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';

const recentDownloads = [
  { name: 'Suryateja', role: 'Warangal', image: '/images/boy 1.jpg' },
  { name: 'Jayaram', role: 'Vijayawada', image: '/images/boy 2.jpg' },
  { name: 'Chinmayi', role: 'Hyderabad', image: '/images/girl 1.jpg' },
  { name: 'Mahesh', role: 'Mumbai', image: '/images/boy 3.jpg' },
  { name: 'Sadashiva', role: 'Tamil Nadu', image: '/images/boy 4.jpg' },
  { name: 'Rajini', role: 'Kerala', image: '/images/girl 2.jpg' },
  { name: 'Vasudev', role: 'Karnataka', image: '/images/boy 5.jpg' },
  { name: 'Priya', role: 'Delhi', image: '/images/girl 3.jpg' },
  { name: 'Rahul', role: 'Punjab', image: '/images/boy 6.jpg' },
  { name: 'Ananya', role: 'Kolkata', image: '/images/girl 4.jpg' },
];

export default function RecentDownloads() {
  const [trackWidth, setTrackWidth] = useState(0);
  const originalSetRef = useRef<HTMLDivElement>(null);
  const animationDuration = 40; // seconds

  useEffect(() => {
    if (originalSetRef.current) {
      setTrackWidth(originalSetRef.current.getBoundingClientRect().width);
    }
    // Optional: update on window resize for responsiveness
    const handleResize = () => {
      if (originalSetRef.current) {
        setTrackWidth(originalSetRef.current.getBoundingClientRect().width);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section className="w-full py-12 bg-[#2a2040] flex flex-col items-center">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Recent Downloads</h2>
      <div className="relative w-full max-w-7xl mx-auto px-4 flex items-center justify-center rounded-3xl shadow-2xl py-8 overflow-hidden">
        <div
          className="flex gap-8 overflow-x-hidden carousel-container"
          style={{
            minHeight: '12rem',
            WebkitOverflowScrolling: 'touch',
            position: 'relative',
          }}
        >
          <div
            className="carousel-track flex"
            style={{
              width: trackWidth ? `${trackWidth * 2}px` : 'auto',
              animation: trackWidth
                ? `scroll-carousel ${animationDuration}s linear infinite`
                : 'none',
            }}
          >
            {/* First set (measured for width) */}
            <div className="flex gap-8" ref={originalSetRef}>
              {recentDownloads.map((download, idx) => (
                <div key={`${download.name}-${idx}`} className="flex flex-col items-center min-w-[120px]">
                  <div className="relative w-20 h-20 rounded-full overflow-hidden shadow-lg transition-transform duration-300 hover:scale-110">
                    <Image
                      src={download.image}
                      alt={download.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 80px, 80px"
                    />
                  </div>
                  <span className="mt-2 text-white font-semibold text-base drop-shadow-lg">{download.name}</span>
                  <span className="text-xs text-purple-300 font-medium">{download.role}</span>
                </div>
              ))}
            </div>
            {/* Second set (for seamless loop) */}
            <div className="flex gap-8">
              {recentDownloads.map((download, idx) => (
                <div key={`${download.name}-dup-${idx}`} className="flex flex-col items-center min-w-[120px]">
                  <div className="relative w-20 h-20 rounded-full overflow-hidden shadow-lg transition-transform duration-300 hover:scale-110">
                    <Image
                      src={download.image}
                      alt={download.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 80px, 80px"
                    />
                  </div>
                  <span className="mt-2 text-white font-semibold text-base drop-shadow-lg">{download.name}</span>
                  <span className="text-xs text-purple-300 font-medium">{download.role}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
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
        .carousel-container {
          position: relative;
          overflow: hidden;
        }
        .carousel-container:hover .carousel-track,
        .carousel-track:hover,
        .carousel-track *:hover {
          animation-play-state: paused !important;
        }
        @keyframes scroll-carousel {
          0% {
            transform: translateX(-${trackWidth}px);
          }
          100% {
            transform: translateX(0);
          }
        }
      `}</style>
    </section>
  );
} 