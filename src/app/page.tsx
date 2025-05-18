'use client'

import { useState } from 'react'
import AssetCard from '@/components/AssetCard'
import Carousel from '@/components/Carousel'
import { weddingInvitationDetails } from '@/data/constant'
import HeroSection from '@/components/HeroSection';
import VideoPlayer from '@/components/VideoPlayer';
import { motion, AnimatePresence } from 'framer-motion';

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
      <section className="w-full bg-gradient-to-br from-[#1a1a2e] via-[#23234b] to-[#3a3a6a] py-16 md:py-24">
        <VideoPlayer />
      </section>

      {/* Carousel Section */}
      <section className="max-w-7xl w-full mx-auto px-4 py-8">
        <div className="animate-slide-up">
          <Carousel onCategorySelect={handleCategorySelect} />
        </div>
      </section>
    </div>
  )
} 