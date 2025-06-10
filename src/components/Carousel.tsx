import React, { useState, useMemo, useRef } from 'react';
import CarouselCard from './CarouselCard';
import { carouselCardsData } from '../data/carouselcardsdata';

interface CarouselProps {
  onCategorySelect: (category: string) => void;
}

const Carousel: React.FC<CarouselProps> = ({ onCategorySelect }) => {
  const displayAssets = useMemo(() => {
    return [...carouselCardsData, ...carouselCardsData, ...carouselCardsData];
  }, []);

  const scrollRef = useRef<HTMLDivElement>(null);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  // Handle card click
  const handleCardClick = (idx: number, category: string, e: React.MouseEvent<HTMLDivElement>) => {
    setSelectedIdx(idx);
    onCategorySelect(category);
    // Ripple
    const card = e.currentTarget;
    const ripple = document.createElement('span');
    ripple.className = 'absolute rounded-full bg-blue-200 opacity-60 animate-ripple pointer-events-none';
    ripple.style.width = ripple.style.height = '120px';
    ripple.style.left = `${e.nativeEvent.offsetX - 60}px`;
    ripple.style.top = `${e.nativeEvent.offsetY - 60}px`;
    card.appendChild(ripple);
    setTimeout(() => ripple.remove(), 500);
  };

  return (
    <section className="w-full py-8 text-white">
      <h1 className="text-center text-4xl md:text-5xl font-extrabold mb-2 bg-gradient-to-r from-indigo-400 via-pink-400 to-purple-500 text-transparent bg-clip-text drop-shadow-lg">
        UPCOMING PROJECTS
      </h1>
      <p className="text-center text-xl md:text-xl text-gray-200 max-w-3xl mx-auto mb-8 font-medium drop-shadow">
       Be Ready to impress your Wedding Couples with our Designs </p>
      <div className="relative w-full mx-auto px-4 flex items-center justify-center rounded-3xl shadow-2xl py-8 overflow-hidden">
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide cursor-grab relative carousel-container"
          style={{
            minHeight: '22rem',
            WebkitOverflowScrolling: 'touch'
          }}
        >
          <div className="carousel-track">
            {displayAssets.map((asset, idx) => (
              <CarouselCard
                key={`${asset.imageUrl}-${idx}`}
                category={asset.category}
                imageUrl={asset.imageUrl}
                isSelected={selectedIdx === idx}
                isHovered={hoveredIdx === idx}
                onClick={(e) => handleCardClick(idx, asset.category, e)}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
              />
            ))}
          </div>
        </div>
      </div>
      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes ripple {
          to { transform: scale(2.5); opacity: 0; }
        }
        .animate-ripple {
          animation: ripple 0.5s linear;
        }
        .carousel-container {
          position: relative;
          overflow: hidden;
        }
        .carousel-track {
          display: flex;
          animation: scroll 60s linear infinite;
          width: fit-content;
          gap: 32px;
        }
        .carousel-container:hover .carousel-track {
          animation-play-state: paused;
        }
        @keyframes scroll {
          0% {
            transform: translateX(calc(-328px * ${carouselCardsData.length}));
          }
          100% {
            transform: translateX(0);
          }
        }
      `}</style>
    </section>
  );
};

export default Carousel;
