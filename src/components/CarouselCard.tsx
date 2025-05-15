import React from 'react';
import Image from 'next/image';

interface CarouselCardProps {
  title: string;
  category: string;
  imageUrl: string;
  isSelected?: boolean;
  isHovered?: boolean;
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

const CarouselCard: React.FC<CarouselCardProps> = ({
  title,
  category,
  imageUrl,
  isHovered,
  onClick,
  onMouseEnter,
  onMouseLeave,
}) => {
  return (
    <div
      className={`flex-shrink-0 w-64 h-80 bg-white rounded-2xl shadow-xl border-2 transition-all duration-500 cursor-pointer relative
        ${isHovered ? 'shadow-2xl' : ''}
      `}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{ 
        transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
        transform: isHovered ? 'scale(1.02)' : 'scale(1)'
      }}
    >
      <div className="relative overflow-hidden">
        <Image
          src={imageUrl}
          alt={title}
          width={256}
          height={192}
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
        <div className="text-lg font-semibold text-gray-700">{category}</div>
      </div>
    </div>
  );
};

export default CarouselCard; 