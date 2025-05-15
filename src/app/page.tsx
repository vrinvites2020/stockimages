'use client'

import { useState } from 'react'
import SearchBar from '@/components/SearchBar'
import AssetCard from '@/components/AssetCard'
import Carousel from '@/components/Carousel'
import { DownloadCard } from "@/components/DownloadCard";

// Mock data for demonstration
const mockAssets = [
  {
    id: 1,
    title: 'Traditional Wedding Photography Guide',
    category: 'Wedding',
    language: 'Telugu',
    price: 2499,
    imageUrl: 'https://media.istockphoto.com/id/1186214696/photo/hindu-wedding-ritual-wherein-bride-and-groom-hand.jpg?s=612x612&w=0&k=20&c=fTlNejRdY7dkvk742auNgI3j6Ve9UqqWSnb3QJ-D2gw=',
  },
  {
    id: 2,
    title: 'Portrait Photography Masterclass',
    category: 'Portrait',
    language: 'English',
    price: 1699,
    imageUrl: 'https://images.pexels.com/photos/2613260/pexels-photo-2613260.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  }
]

export default function Home() {
  const [filteredAssets, setFilteredAssets] = useState(mockAssets)

  // Helper to filter assets by category
  const filterAssetsByCategory = (category: string, assets = mockAssets) => {
    return category === 'all' ? assets : assets.filter(asset => asset.category === category)
  }

  // When a category is selected from the carousel or tabs
  const handleCategorySelect = (category: string) => {
    setFilteredAssets(filterAssetsByCategory(category))
  }

  const handleSearch = (query: string) => {
    const filtered = mockAssets.filter(asset => 
      asset.title.toLowerCase().includes(query.toLowerCase())
    )
    setFilteredAssets(filtered)
  }

  const handleFilterChange = (category: string, language: string, sortBy: string) => {
    let filtered = [...mockAssets]
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
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-indigo-50 via-white to-background py-20">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 gradient-text">
              Discover Creative Assets
            </h1>
            <p className="text-xl text-muted max-w-2xl mx-auto">
              Find high-quality templates, icons, and graphics for your next project
            </p>
          </div>
          <div className="animate-slide-up">
            <SearchBar onSearch={handleSearch} onFilterChange={handleFilterChange} />
          </div>
        </div>
      </section>

      {/* Carousel Section */}
      <section className="container mx-auto px-4 py-8">
        <div className="animate-slide-up">
          <Carousel
            onCategorySelect={handleCategorySelect}
          />
        </div>
      </section>

      {/* Assets Grid */}
      <section className="container mx-auto px-4 py-12 mt-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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

      <DownloadCard />
    </div>
  )
} 