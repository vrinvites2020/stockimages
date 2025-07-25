import React from 'react';
import Image from 'next/image';

/**
 * Props interface for CarouselCard component
 */
interface CarouselCardProps {
  category: string;     // Category name for the card
  imageUrl: string;     // URL of the card's image
  isSelected?: boolean; // Whether the card is currently selected
  isHovered?: boolean;  // Whether the card is being hovered
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void;  // Click handler
  onMouseEnter: () => void;  // Mouse enter handler
  onMouseLeave: () => void;  // Mouse leave handler
}

/**
 * CarouselCard component
 * Displays an interactive card for carousel navigation
 * Features hover animations, scaling effects, and gradient overlays
 */
const CarouselCard: React.FC<CarouselCardProps> = ({
  category,
  imageUrl,
  isHovered,
  onClick,
  onMouseEnter,
  onMouseLeave,
}) => {
  return (
    <div
      className={`flex-shrink-0 w-64 h-80 bg-gradient-to-br from-[#232946] via-[#1E1B3A] to-[#18122B] rounded-2xl shadow-2xl border border-purple-900/40 transition-all duration-500 cursor-pointer relative group text-white
        ${isHovered ? 'shadow-2xl border-indigo-300 scale-105' : 'border-transparent'}
      `}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{ 
        transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      <div className="relative aspect-video w-full h-[344px] overflow-hidden rounded-2xl">
        <Image
          src={imageUrl}
          alt={`${category} preview`}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          draggable={false}
          unoptimized
        />
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex justify-center w-full pointer-events-none">
          {/* <span className="text-xs bg-gradient-to-r from-pink-500 to-purple-500 text-white px-4 py-1 rounded-full font-semibold shadow-lg border border-purple-400/40 backdrop-blur-md">
            {category}
          </span> */} 
          {/* #TODO: in future we will add category type */}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-2xl"></div>
      </div>
    </div>
  );
};

export default CarouselCard; 