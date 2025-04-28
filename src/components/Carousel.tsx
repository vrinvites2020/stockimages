import React, { useState, useMemo, useRef, useEffect } from 'react';
import Image from 'next/image';

interface Asset {
  id: number;
  title: string;
  category: string;
  language: string;
  price: number;
  imageUrl: string;
}

interface CarouselProps {
  assets: Asset[];
  onCategorySelect: (category: string) => void;
}

const Carousel: React.FC<CarouselProps> = ({ assets, onCategorySelect }) => {
  // Always show one asset per category
  const categories = useMemo(() => {
    return Array.from(new Set(assets.map(a => a.category)));
  }, [assets]);

  const displayAssets = useMemo(() => {
    return categories.map(cat => assets.find(a => a.category === cat)).filter(Boolean) as Asset[];
  }, [assets, categories]);

  // Scrollable carousel logic
  const scrollRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  // Touch drag state for mobile
  const touchState = useRef({ isDown: false, startX: 0, scrollLeft: 0 });

  // Scroll to current card
  useEffect(() => {
    if (scrollRef.current && displayAssets.length > 0) {
      const card = scrollRef.current.children[current] as HTMLElement;
      if (card) {
        card.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      }
    }
  }, [current, displayAssets]);

  // Drag/scroll navigation (mouse)
  let isDown = false;
  let startX = 0;
  let scrollLeft = 0;

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    isDown = true;
    startX = e.pageX - (scrollRef.current?.offsetLeft || 0);
    scrollLeft = scrollRef.current?.scrollLeft || 0;
    document.body.style.cursor = 'grabbing';
  };
  const handleMouseLeave = () => {
    isDown = false;
    document.body.style.cursor = '';
  };
  const handleMouseUp = () => {
    isDown = false;
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
    touchState.current.startX = e.touches[0].pageX - (scrollRef.current?.offsetLeft || 0);
    touchState.current.scrollLeft = scrollRef.current?.scrollLeft || 0;
  };
  const handleTouchEnd = () => {
    touchState.current.isDown = false;
  };
  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!touchState.current.isDown) return;
    const x = e.touches[0].pageX - (scrollRef.current?.offsetLeft || 0);
    const walk = (x - touchState.current.startX) * 1.5;
    if (scrollRef.current) scrollRef.current.scrollLeft = touchState.current.scrollLeft - walk;
  };

  const handlePrev = () => {
    setCurrent((prev) => (prev === 0 ? displayAssets.length - 1 : prev - 1));
  };
  const handleNext = () => {
    setCurrent((prev) => (prev === displayAssets.length - 1 ? 0 : prev + 1));
  };

  // Ripple effect for click
  const handleCardClick = (idx: number, category: string, e: React.MouseEvent<HTMLDivElement>) => {
    setSelectedIdx(idx);
    setCurrent(idx);
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
    <div className="flex flex-col items-center w-full mb-8">
      <div className="relative w-full max-w-5xl flex items-center justify-center rounded-3xl bg-gradient-to-br from-blue-50/80 to-white shadow-2xl py-8 px-2">
        <button
          className="absolute left-0 z-10 bg-blue-600 text-white rounded-full p-3 shadow-lg hover:bg-blue-800 transition-colors duration-200"
          onClick={handlePrev}
          aria-label="Previous"
          style={{ top: '50%', transform: 'translateY(-50%)' }}
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7"/></svg>
        </button>
        <div
          ref={scrollRef}
          className="flex gap-10 overflow-x-auto scrollbar-hide px-16 py-4 snap-x snap-mandatory cursor-grab relative"
          style={{ scrollBehavior: 'smooth', minHeight: '22rem' }}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onTouchMove={handleTouchMove}
        >
          {displayAssets.map((asset, idx) => {
            const isSelected = selectedIdx === idx;
            return (
              <div
                key={asset.id}
                className={`snap-center flex-shrink-0 w-64 h-80 bg-white rounded-2xl shadow-xl border-2 transition-all duration-500 cursor-pointer relative
                  ${isSelected ? 'ring-2 ring-blue-500 border-blue-500 scale-105 shadow-2xl' : 'border-transparent'}
                  ${!isSelected ? 'hover:scale-105' : ''}
                `}
                onClick={(e) => handleCardClick(idx, asset.category, e)}
                style={{ transition: 'transform 0.5s cubic-bezier(.4,2,.3,1), border 0.3s' }}
              >
                <Image
                  src={asset.imageUrl}
                  alt={asset.title}
                  width={256}
                  height={192}
                  className="w-full h-48 object-cover rounded-t-2xl"
                  draggable={false}
                  unoptimized
                />
                <div className="p-4 text-center">
                  <div className="font-bold text-lg truncate" title={asset.title}>{asset.title}</div>
                  <div className="text-sm text-gray-500 mb-2">{asset.category}</div>
                  <div className="text-xs text-gray-400">{asset.language} &bull; ₹{asset.price}</div>
                </div>
              </div>
            );
          })}
        </div>
        <button
          className="absolute right-0 z-10 bg-blue-600 text-white rounded-full p-3 shadow-lg hover:bg-blue-800 transition-colors duration-200"
          onClick={handleNext}
          aria-label="Next"
          style={{ top: '50%', transform: 'translateY(-50%)' }}
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"/></svg>
        </button>
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
    </div>
  );
};

export default Carousel;
