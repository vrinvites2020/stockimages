'use client'

import { useState } from 'react'
import SearchBar from '@/components/SearchBar'
import AssetCard from '@/components/AssetCard'
import Carousel from '@/components/Carousel'
import { weddingInvitationDetails } from '@/data/constant'
import HeroSection from '@/components/HeroSection';

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

  // Helper to filter assets by category
  const filterAssetsByCategory = (category: string, assetsList: Asset[] = assets) => {
    return category === 'all' ? assetsList : assetsList.filter(asset => asset.category === category)
  }

  // When a category is selected from the carousel or tabs
  const handleCategorySelect = (category: string) => {
    setFilteredAssets(filterAssetsByCategory(category))
  }

  const handleSearch = (query: string) => {
    const filtered = assets.filter(asset => 
      asset.title.toLowerCase().includes(query.toLowerCase())
    )
    setFilteredAssets(filtered)
  }

  const handleFilterChange = (category: string, language: string, sortBy: string) => {
    let filtered: Asset[] = [...assets]
    if (category !== 'all') {
      filtered = filtered.filter(asset => 
        asset.category.toLowerCase() === category.toLowerCase()
      )
    }
    if (language !== 'all') {
      filtered = filtered.filter(asset => 
        asset.language.toLowerCase() === language.toLowerCase()
      )
    }
    if (sortBy === 'price-low') {
      filtered.sort((a, b) => a.price - b.price)
    } else if (sortBy === 'price-high') {
      filtered.sort((a, b) => b.price - a.price)
    } else if (sortBy === 'newest') {
      filtered.sort((a, b) => b.id - a.id)
    } else {
      filtered.sort((a, b) => a.id - b.id)
    }
    setFilteredAssets(filtered)
  }

  // The grid should always show filteredAssets
  return (
    <div className="min-h-screen bg-[#f5f6fa]">
      {/* New Hero Section */}
      <HeroSection />

      {/* Carousel Section */}
      <section className="max-w-7xl w-full mx-auto px-4 py-8">
        <div className="animate-slide-up">
          <Carousel onCategorySelect={handleCategorySelect} />
        </div>
      </section>

      {/* Search Bar and Assets Grid */}
      <section className="max-w-7xl w-full mx-auto px-4 py-12">
        <div className="w-full animate-slide-up mb-8">
          <SearchBar onSearch={handleSearch} onFilterChange={handleFilterChange} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredAssets.map(asset => (
            <div key={asset.id} className="animate-fade-in">
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
      </section>
    </div>
  )
} 