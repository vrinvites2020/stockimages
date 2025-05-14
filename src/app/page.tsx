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
  },
  {
    id: 3,
    title: 'Ethnic Fashion Photography',
    category: 'Fashion',
    language: 'Hindi',
    price: 2099,
    imageUrl: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800&auto=format&fit=crop&q=60',
  },
  {
    id: 4,
    title: 'Landscape Photography Guide',
    category: 'Nature',
    language: 'Tamil',
    price: 4199,
    imageUrl: 'https://images.unsplash.com/photo-1455156218388-5e61b526818b?w=800&auto=format&fit=crop&q=60',
  },
  {
    id: 5,
    title: 'Studio Lighting Setup Guide',
    category: 'Studio',
    language: 'English',
    price: 2999,
    imageUrl: 'https://images.unsplash.com/photo-1587614382346-4ec70e388b28?w=800&auto=format&fit=crop&q=60',
  },
  {
    id: 6,
    title: 'Cultural Event Photography',
    category: 'Events',
    language: 'Telugu',
    price: 3799,
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQt5W8iHsslLvVY7tVgd8olmDe8df1-ymRDzQ&s',
  },
  {
    id: 7,
    title: 'Product Photography Guide',
    category: 'Commercial',
    language: 'Hindi',
    price: 2399,
    imageUrl: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&auto=format&fit=crop&q=60',
  },
  {
    id: 8,
    title: 'Street Photography Techniques',
    category: 'Street',
    language: 'Tamil',
    price: 3399,
    imageUrl: 'https://images.unsplash.com/photo-1520106212299-d99c443e4568?w=800&auto=format&fit=crop&q=60',
  },
  {
    id: 9,
    title: 'Traditional Ceremony Photography',
    category: 'Cultural',
    language: 'Telugu',
    price: 4599,
    imageUrl: 'https://images.unsplash.com/photo-1587271636175-90d58cdad458?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8aW5kaWFuJTIwd2VkZGluZ3xlbnwwfHwwfHx8MA%3D%3D',
  },
  {
    id: 10,
    title: 'Black & White Portrait Guide',
    category: 'Portrait',
    language: 'English',
    price: 1699,
    imageUrl: 'https://images.unsplash.com/photo-1508186225823-0963cf9ab0de?w=800&auto=format&fit=crop&q=60',
  },
  {
    id: 11,
    title: 'Fashion Photography Templates',
    category: 'Fashion',
    language: 'Hindi',
    price: 1299,
    imageUrl: 'https://images.pexels.com/photos/1375736/pexels-photo-1375736.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    id: 12,
    title: 'Food Photography Masterclass',
    category: 'Commercial',
    language: 'Tamil',
    price: 4199,
    imageUrl: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=800&auto=format&fit=crop&q=60',
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
    <div className="min-h-screen bg-black">
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
            assets={mockAssets}
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