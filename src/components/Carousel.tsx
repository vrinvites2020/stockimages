import React, { useState, useMemo, useRef, useEffect } from 'react';
import CarouselCard from './CarouselCard';
import { carouselCardsData } from '../data/carouselcardsdata';

interface CarouselProps {
  onCategorySelect: (category: string) => void;
}

const Carousel: React.FC<CarouselProps> = ({ onCategorySelect }) => {
  // Show all assets, not just one per category
  const displayAssets = useMemo(() => {
    return [...carouselCardsData.slice(-2), ...carouselCardsData, ...carouselCardsData.slice(0, 2)];
  }, []);

  // Scrollable carousel logic
  const scrollRef = useRef<HTMLDivElement>(null);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [scrolling, setScrolling] = useState(true);

  // Auto-scroll logic with infinite loop
  useEffect(() => {
    if (hoveredIdx === null && scrollRef.current && scrolling) {
      const scrollContainer = scrollRef.current;
      const cardWidth = 296; // width(264) + gap(32)
      let animationFrameId: number;
      let lastTimestamp: number;
      
      const animate = (timestamp: number) => {
        if (!lastTimestamp) lastTimestamp = timestamp;
        const delta = timestamp - lastTimestamp;
        lastTimestamp = timestamp;

        if (scrollContainer) {
          const currentScroll = scrollContainer.scrollLeft;
          scrollContainer.scrollLeft += (delta * 0.05); // Smoother speed based on frame time

          // Check if we need to loop
          const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;
          if (currentScroll >= maxScroll - 1) {
            scrollContainer.scrollLeft = cardWidth * 2;
            lastTimestamp = timestamp;
          }
        }
        animationFrameId = requestAnimationFrame(animate);
      };

      animationFrameId = requestAnimationFrame(animate);
      return () => {
        if (animationFrameId) {
          cancelAnimationFrame(animationFrameId);
        }
      };
    }
  }, [hoveredIdx, scrolling]);

  // Handle scroll snap and infinite loop
  const handleScroll = () => {
    if (!isDown && scrollRef.current) {
      const scrollContainer = scrollRef.current;
      const currentScroll = scrollContainer.scrollLeft;
      const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;
      const cardWidth = 296; // width(264) + gap(32)
      // If at the end, jump to the start of the real cards
      if (currentScroll >= maxScroll - 1) {
        scrollContainer.scrollLeft = cardWidth * 2;
      } else if (currentScroll <= 0) {
        // If at the start, jump to the end of the real cards
        scrollContainer.scrollLeft = maxScroll - cardWidth * 2;
      }
    }
  };

  // Touch drag state for mobile
  const touchState = useRef({ isDown: false, startX: 0, scrollLeft: 0 });

  // Drag/scroll navigation (mouse)
  let isDown = false;
  let startX = 0;
  let scrollLeft = 0;

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    isDown = true;
    setScrolling(false);
    startX = e.pageX - (scrollRef.current?.offsetLeft || 0);
    scrollLeft = scrollRef.current?.scrollLeft || 0;
    document.body.style.cursor = 'grabbing';
  };

  const handleMouseLeave = () => {
    isDown = false;
    setScrolling(true);
    document.body.style.cursor = '';
  };

  const handleMouseUp = () => {
    isDown = false;
    setScrolling(true);
    document.body.style.cursor = '';
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - (scrollRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 1.5;
    if (scrollRef.current) scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  // Touch drag/scroll navigation for mobile
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchState.current.isDown = true;
    setScrolling(false);
    touchState.current.startX = e.touches[0].pageX - (scrollRef.current?.offsetLeft || 0);
    touchState.current.scrollLeft = scrollRef.current?.scrollLeft || 0;
  };

  const handleTouchEnd = () => {
    touchState.current.isDown = false;
    setScrolling(true);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!touchState.current.isDown) return;
    const x = e.touches[0].pageX - (scrollRef.current?.offsetLeft || 0);
    const walk = (x - touchState.current.startX) * 1.5;
    if (scrollRef.current) scrollRef.current.scrollLeft = touchState.current.scrollLeft - walk;
  };

  // Ripple effect for click
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
      <div className="relative w-full max-w-7xl mx-auto px-4 flex items-center justify-center rounded-3xl shadow-2xl py-8 overflow-hidden">
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide snap-none cursor-grab relative"
          style={{ 
            scrollBehavior: 'auto',
            minHeight: '22rem',
            WebkitOverflowScrolling: 'touch'
          }}
          onScroll={handleScroll}
          onMouseDown={handleMouseDown}
          onMouseLeave={() => {
            handleMouseLeave();
            setHoveredIdx(null);
          }}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onTouchMove={handleTouchMove}
        >
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
      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes ripple {
          to { transform: scale(2.5); opacity: 0; }
        }
        .animate-ripple {
          animation: ripple 0.5s linear;
        }
      `}</style>
    </section>
  );
};

export default Carousel;
