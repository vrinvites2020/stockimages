import { useState } from 'react'

interface SearchBarProps {
  onSearch: (query: string) => void
  onFilterChange: (category: string, language: string, sortBy: string) => void
}

export default function SearchBar({ onSearch, onFilterChange }: SearchBarProps) {
  const [category, setCategory] = useState('all')
  const [language, setLanguage] = useState('all')
  const [sortBy, setSortBy] = useState('newest')
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<string[] | null>(null)

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    onSearch(query)
    // Simulating null results for now
    setSearchResults(null)
  }

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCategory = e.target.value
    setCategory(newCategory)
    onFilterChange(newCategory, language, sortBy)
  }

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLanguage = e.target.value
    setLanguage(newLanguage)
    onFilterChange(category, newLanguage, sortBy)
  }

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSort = e.target.value
    setSortBy(newSort)
    onFilterChange(category, language, newSort)
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-4">
      <div className="relative">
        <input
          type="text"
          placeholder="Search assets..."
          className="input-field pl-12 text-foreground placeholder-muted"
          onChange={(e) => handleSearch(e.target.value)}
        />
        <svg
          className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
      
      <div className="flex flex-wrap gap-4">
        <select
          className="input-field max-w-[200px] text-foreground"
          value={category}
          onChange={handleCategoryChange}
        >
          <option value="all">All Categories</option>
          <option value="Wedding">Wedding</option>
          <option value="Engagement">Engagement</option>
          <option value="Birthday">Birthday</option>
        </select>

        <select
          className="input-field max-w-[200px] text-foreground"
          value={language}
          onChange={handleLanguageChange}
        >
          <option value="all">All Languages</option>
          <option value="English">English</option>
          <option value="Telugu">Telugu</option>
          <option value="Hindi">Hindi</option>
          <option value="Tamil">Tamil</option>
          <option value="Kannada">Kannada</option>
          <option value="Malayalam">Malayalam</option>
          <option value="Marathi">Marathi</option>
        </select>

        <select
          className="input-field max-w-[200px] text-foreground"
          value={sortBy}
          onChange={handleSortChange}
        >
          <option value="newest">Newest First</option>
          <option value="popular">Most Popular</option>
        </select>
      </div>

      {searchQuery && searchResults === null && (
        <div className="text-center py-8 text-muted">
          <h3 className="text-xl font-semibold">Coming Soon</h3>
          <p className="mt-2">Search functionality will be available shortly.</p>
        </div>
      )}
    </div>
  )
} 