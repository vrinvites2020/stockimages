import React from 'react';
import Image from 'next/image';

interface CarouselCardProps {
  category: string;
  imageUrl: string;
  isSelected?: boolean;
  isHovered?: boolean;
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

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
      className={`flex-shrink-0 w-64 h-80 bg-white rounded-2xl shadow-xl border transition-all duration-500 cursor-pointer relative group
        ${isHovered ? 'shadow-2xl border-indigo-300 scale-105' : 'border-transparent'}
      `}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{ 
        transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      <div className="relative aspect-video w-full h-60 overflow-hidden rounded-t-2xl">
        <Image
          src={imageUrl}
          alt={category}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          draggable={false}
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-2xl"></div>
      </div>
      <div className="p-4 flex flex-col gap-2 items-center justify-center">
            <span className="text-xs bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full font-medium">{category}</span>
      </div>
    </div>
  );
};

export default CarouselCard; 