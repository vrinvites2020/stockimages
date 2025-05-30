'use client'

import { useState } from 'react'
import AssetCard from '@/components/AssetCard'
import Carousel from '@/components/Carousel'
import { weddingInvitationDetails } from '@/data/constant'
import HeroSection from '@/components/HeroSection';
import VideoPlayer from '@/components/VideoPlayer';
import { motion, AnimatePresence } from 'framer-motion';
import RecentDownloads from '@/components/RecentDownloads';
import FinalBanner from '@/components/FinalBanner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp, faTelegram } from '@fortawesome/free-brands-svg-icons';

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
}))

export default function Home() {
  const [filteredAssets, setFilteredAssets] = useState<Asset[]>(assets)

  // When a category is selected from the carousel or tabs
  const handleCategorySelect = (category: string) => {
    const filtered = category === 'all' 
      ? assets 
      : assets.filter(asset => asset.category === category);
    setFilteredAssets(filtered);
  }

  return (
    <>
      <div className="min-h-screen">
        {/* Hero Section */}
        <HeroSection 
          filteredAssets={filteredAssets}
          setFilteredAssets={setFilteredAssets}
        />

        {/* Assets Grid */}
        <section id="searchbar-section" className="max-w-7xl w-full mx-auto px-4 py-12">
          <div className="max-w-6xl mx-auto">
            {filteredAssets.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 place-items-center sm:place-items-start">
                {filteredAssets.map(asset => (
                  <div key={asset.id} className="animate-fade-in w-full max-w-[300px]">
                    <AssetCard
                      id={asset.id}
                      title={asset.title}
                      category={asset.category}
                      language={asset.language}
                      price={asset.price}
                      imageUrl={asset.imageUrl}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <AnimatePresence>
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-center py-16"
                >
                  <h3 className="text-2xl font-semibold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    No Results Found
                  </h3>
                  <p className="mt-4 text-gray-400 text-lg">
                    We couldn&apos;t find any assets matching your search or filters.<br />
                    We&apos;re working hard to add more—please check back soon!
                  </p>
                </motion.div>
              </AnimatePresence>
            )}
          </div>
        </section>


        {/* Video Player Section */}
        <section className="w-full bg-gradient-to-br from-[#1a1a2e] via-[#23234b] to-[#3a3a6a] py-0">
        <h2 className="text-center pt-2 text-2xl md:text-4xl font-extrabold pt-4 bg-gradient-to-r from-indigo-400 via-pink-400 to-purple-500 text-transparent bg-clip-text drop-shadow-lg">Here remaining posters will come</h2>
          <VideoPlayer />
        </section>

         {/* Recent Downloads Section */}
        <RecentDownloads />
        
           
        {/* Carousel Section */}
        <section className="max-w-7xl w-full mx-auto px-4 py-8">
          <div className="animate-slide-up">
            <Carousel onCategorySelect={handleCategorySelect} />
          </div>
        </section>
      </div>
      <FinalBanner />

      {/* Fixed Contact Card with Icons */}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col items-center p-4 rounded-lg shadow-lg bg-gray-800 bg-opacity-75 md:bottom-8 md:right-8">
        <p className="text-white text-sm font-medium drop-shadow mb-2">For more details contact</p>
        <div className="flex space-x-4">
          <a href="https://wa.me/+918500003951" target="_blank" rel="noopener noreferrer" className="transition-transform transform hover:scale-110">
            {/* Font Awesome WhatsApp icon */}
            <FontAwesomeIcon icon={faWhatsapp} className="text-green-500 text-4xl md:text-5xl" />
          </a>
          <a href="https://t.me/Vinaykumar7093" target="_blank" rel="noopener noreferrer" className="transition-transform transform hover:scale-110">
            {/* Font Awesome Telegram icon */}
            <FontAwesomeIcon icon={faTelegram} className="text-blue-500 text-4xl md:text-5xl" />
          </a>
        </div>
      </div>
    </>
  )
} 