import React from 'react';
import SearchBar from '@/components/SearchBar';
import { weddingInvitationDetails } from '@/data/constant';

type Asset = {
  id: number;
  title: string;
  category: string;
  language: string;
  price: number;
  imageUrl: string;
}

const assets: Asset[] = weddingInvitationDetails.map(item => ({
  id: item.id,
  title: item.title,
  category: item.category,
  language: item.language,
  price: item.price,
  imageUrl: item.imageUrl
}));

interface HeroSectionProps {
  filteredAssets: Asset[];
  setFilteredAssets: (assets: Asset[]) => void;
}

const HeroSection = ({ filteredAssets, setFilteredAssets }: HeroSectionProps) => {
  const handleSearch = (query: string) => {
    const filtered = assets.filter(asset => 
      asset.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredAssets(filtered);
  };

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
    <div className="min-h-[60vh] bg-gradient-to-br from-[#18122B] via-[#1E1B3A] to-[#232946] flex items-center justify-center relative overflow-hidden">
      {/* Floating circles and lines for background flair */}
      <div className="absolute top-10 left-10 w-24 h-24 bg-gradient-to-tr from-purple-500 to-indigo-500 rounded-full opacity-30 blur-2xl animate-pulse" />
      <div className="absolute bottom-20 right-32 w-16 h-16 bg-gradient-to-tr from-purple-400 to-indigo-400 rounded-full opacity-40 blur-xl animate-pulse" />
      <div className="absolute top-1/3 right-1/4 w-8 h-8 border-2 border-purple-400 rounded-full opacity-60 animate-bounce" />
      <div className="absolute bottom-1/4 left-1/3 w-12 h-12 border-2 border-indigo-400 rounded-full opacity-50 animate-bounce delay-1000" />
      <div className="container mx-auto px-4 flex flex-col items-center justify-center relative z-10 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-indigo-400 via-pink-400 to-purple-500 text-transparent bg-clip-text drop-shadow-lg">
          Discover Creative Assets
        </h1>
        <p className="text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto mb-8 font-medium drop-shadow">
          Find high-quality templates, icons, and graphics for your next project
        </p>
        <div className="w-full max-w-4xl">
          <SearchBar 
            onSearch={handleSearch}
            onFilterChange={handleFilterChange}
            resultsCount={filteredAssets.length}
          />
        </div>
        <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto mb-8 mt-8 font-medium drop-shadow">
        If you are from another state or language? No worries just download our project and replace the audio and fonts in your language.</p>
      </div>
      {/* Custom keyframes for up-down animation */}
      <style jsx global>{`
        @keyframes updown {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-32px); }
        }
        .animate-updown {
          animation: updown 2.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default HeroSection; 