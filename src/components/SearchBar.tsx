import { useState } from 'react'

interface SearchBarProps {
  onSearch: (query: string) => void
  onFilterChange: (category: string, language: string, sortBy: string) => void
}

export default function SearchBar({ onSearch, onFilterChange }: SearchBarProps) {
  const [category, setCategory] = useState('all')
  const [language, setLanguage] = useState('all')
  const [sortBy, setSortBy] = useState('newest')

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
          onChange={(e) => onSearch(e.target.value)}
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
          <option value="presets">Presets</option>
          <option value="templates">Templates</option>
          <option value="courses">Courses</option>
          <option value="educational">Educational</option>
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
    </div>
  )
} 