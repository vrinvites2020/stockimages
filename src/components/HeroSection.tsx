'use client';

import React from 'react';
import SearchBar from '@/components/SearchBar';
import { weddingInvitationDetails } from '@/data/constant';

/**
 * Asset type definition for filtering and display
 */
type Asset = {
  id: number;
  title: string;
  category: string;
  language: string;
  price: number;
  imageUrl: string;
}

/**
 * Convert wedding invitation details to Asset format
 */
const assets: Asset[] = weddingInvitationDetails.map(item => ({
  id: item.id,
  title: item.title,
  category: item.category,
  language: item.language,
  price: item.price,
  imageUrl: item.imageUrl
}));

/**
 * Props interface for HeroSection component
 */
interface HeroSectionProps {
  filteredAssets: Asset[];                    // Currently filtered assets
  setFilteredAssets: (assets: Asset[]) => void;  // Function to update filtered assets
}

/**
 * HeroSection component
 * Main landing section with search functionality and asset filtering
 * Features animated background elements and responsive design
 */
const HeroSection = ({ filteredAssets, setFilteredAssets }: HeroSectionProps) => {
  /**
   * Handles search query filtering by asset title
   */
  const handleSearch = (query: string) => {
    const filtered = assets.filter(asset => 
      asset.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredAssets(filtered);
  };

  /**
   * Handles filtering by category, language, and sorting options
   */
  const handleFilterChange = (category: string, language: string, sortBy: string) => {
    let filtered: Asset[] = [...assets];
    if (category !== 'all') {
      filtered = filtered.filter(asset => 
        asset.category.toLowerCase() === category.toLowerCase()
      );
    }
    if (language !== 'all') {
      filtered = filtered.filter(asset => 
        asset.language.toLowerCase() === language.toLowerCase()
      );
    }
    if (sortBy === 'price-low') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'newest') {
      filtered.sort((a, b) => b.id - a.id);
    } else {
      filtered.sort((a, b) => a.id - b.id);
    }
    setFilteredAssets(filtered);
  };

  return (
    <div className="min-h-[60vh] bg-gradient-to-br from-[#18122B] via-[#1E1B3A] to-[#232946] flex items-center justify-center relative overflow-hidden py-4 md:py-8">
      {/* Floating circles and lines for background flair */}
      <div className="absolute top-10 left-10 w-24 h-24 bg-gradient-to-tr from-purple-500 to-indigo-500 rounded-full opacity-30 blur-2xl animate-pulse" />
      <div className="absolute bottom-20 right-32 w-16 h-16 bg-gradient-to-tr from-purple-400 to-indigo-400 rounded-full opacity-40 blur-xl animate-pulse" />
      <div className="absolute top-1/3 right-1/4 w-8 h-8 border-2 border-purple-400 rounded-full opacity-60 animate-bounce" />
      <div className="absolute bottom-1/4 left-1/3 w-12 h-12 border-2 border-indigo-400 rounded-full opacity-50 animate-bounce delay-1000" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center relative z-10 text-center pt-8 pb-12">
        <h1 className="text-4xl sm:text-5xl md:text-6xl text-gray-200 font-extrabold mb-6 px-4">
          Discover Creative Assets
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto mb-8 font-medium drop-shadow px-4">
          Find high-quality templates, icons, and graphics for your next project
        </p>
        <div className="w-full max-w-4xl px-4 sm:px-0">
          <SearchBar 
            onSearch={handleSearch}
            onFilterChange={handleFilterChange}
            resultsCount={filteredAssets.length}
          />
        </div>
        <p className="text-base sm:text-lg md:text-xl text-gray-200 max-w-3xl mx-auto mt-8 mb-4 sm:mb-8 font-medium drop-shadow px-4 sm:px-0">
          If you are from another state or language? No worries just download our project and replace the audio and fonts in your language.
        </p>
      </div>
    </div>
  );
};

export default HeroSection; 