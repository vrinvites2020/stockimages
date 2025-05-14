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


  const carouselRef = useRef<HTMLDivElement>(null);
  const [angle, setAngle] = useState(0);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);


  useEffect(() => {
    if (hoveredIdx === null) {
      const interval = setInterval(() => {
        setAngle((prev) => prev + 45); // Rotate by 45 degrees every interval
      }, 3000); // Adjust the interval as needed
      return () => clearInterval(interval);
    }
  }, [hoveredIdx]);

  // const radius = 380; // Adjust the radius for the 3D effect
  // const cardWidth = 200; // Width of each card
  // const cardHeight = 182; // Height of each card

  // Responsive card size and radius
  const [dimensions, setDimensions] = useState({
    cardWidth: 200,
    cardHeight: 182,
    radius: 380,
  });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 500) {
        setDimensions({ cardWidth: 120, cardHeight: 110, radius: 170 });
      } else if (width < 768) {
        setDimensions({ cardWidth: 150, cardHeight: 135, radius: 220 });
      } else if (width < 1024) {
        setDimensions({ cardWidth: 170, cardHeight: 155, radius: 300 });
      } else {
        setDimensions({ cardWidth: 200, cardHeight: 182, radius: 380 });
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // ...existing useEffects and logic...






  // Always show one asset per category
  const categories = useMemo(() => {
    return Array.from(new Set(assets.map(a => a.category)));
  }, [assets]);

  const displayAssets = useMemo(() => {
    const uniqueAssets = categories.map(cat => assets.find(a => a.category === cat)).filter(Boolean) as Asset[];
    // Clone first few items to end and last few to start for smooth infinite scroll
    return [...uniqueAssets.slice(-2), ...uniqueAssets, ...uniqueAssets.slice(0, 2)];
  }, [assets, categories]);

  // Scrollable carousel logic
  const scrollRef = useRef<HTMLDivElement>(null);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
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

      if (currentScroll >= maxScroll - 1) {
        scrollContainer.scrollLeft = 0;
      } else if (currentScroll <= 0) {
        scrollContainer.scrollLeft = maxScroll;
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
    <div className="flex flex-col items-center w-full mb-8 bg-black">
      <div className="relative flex justify-center items-center w-full h-[400px] perspective-1000">

        {/* Spotlight overlay */}
        <div
          className="pointer-events-none absolute inset-0 z-10"
          style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(0,0,0,0) 45%, rgba(0,0,0,0.85) 80%)',
            transition: 'background 0.4s',
          }}
        />


        <div
          ref={carouselRef}
          className="absolute w-full h-full flex items-center justify-center"
          style={{
            transform: `rotateY(${angle}deg)`,
            transformStyle: 'preserve-3d',
            transition: 'transform 1s cubic-bezier(0.4, 0, 0.2, 1)',
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
          {assets.map((asset, idx) => {

            const rotation = (360 / assets.length) * idx;
            const isSelected = selectedIdx === idx;
            const isHovered = hoveredIdx === idx;
            return (
              <div
                key={asset.id}
                className={`absolute ${isSelected ? 'ring-2 ring-blue-500 border-blue-500 scale-105 shadow-2xl' : 'border-transparent'}
                  ${isHovered ? 'shadow-2xl' : ''} `}

                style={{
                  width: `${dimensions.cardWidth}px`,
                  height: `${dimensions.cardHeight}px`,
                  transform: `rotateY(${rotation}deg) translateZ(${dimensions.radius + 50}px)`,
                  transformStyle: 'preserve-3d',
                }}
                onClick={(e) => handleCardClick(idx, asset.category, e)}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}

              >
                <div className="relative overflow-hidden rounded-t-2xl">
                  <Image
                    src={asset.imageUrl}
                    alt={asset.title}
                    width={dimensions.cardWidth}
                    height={dimensions.cardHeight}
                    className="w-full h-48 object-cover rounded-t-2xl transition-transform duration-700 ease-out"
                    style={{
                      transform: isHovered ? 'scale(1.1)' : 'scale(1)',
                      transition: 'transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                    draggable={false}
                    unoptimized
                  />
                </div>
                <div className="p-4 text-center">
                  <div className="font-bold text-lg truncate text-gray-500" title={asset.title}>{asset.title}</div>
                  <div className="text-sm text-gray-500 mb-2">{asset.category}</div>
                  <div className="text-xs text-gray-400">{asset.language} • ₹{asset.price}</div>
                </div>
              </div>
            );
          })}
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
          .perspective-1000 {
          perspective: 1000px;
      }
          @media (max-width: 500px) {
          .perspective-1000 { height: 220px !important; }
        }
        @media (max-width: 768px) {
          .perspective-1000 { height: 320px !important; }
        }
      `}
      </style>
    </div>
  );
};

export default Carousel;
