import { useState } from 'react'
import { motion } from 'framer-motion'

interface SearchBarProps {
  onSearch: (query: string) => void
  onFilterChange: (category: string, language: string, sortBy: string) => void
  resultsCount?: number
}

export default function SearchBar({ onSearch, onFilterChange }: SearchBarProps) {
  const [category, setCategory] = useState('all')
  const [language, setLanguage] = useState('all')
  const [sortBy, setSortBy] = useState('newest')
  const [isExpanded, setIsExpanded] = useState(false)

  const handleSearch = (query: string) => {
    onSearch(query)
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
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-6xl mx-auto space-y-4 bg-gradient-to-br from-[#232946] via-[#1E1B3A] to-[#18122B] rounded-2xl shadow-2xl border border-purple-900/40 p-4 sm:p-6 text-white"
    >
      <div className="relative group">
        <input
          type="text"
          placeholder="Search assets..."
          className="w-full input-field pl-12 pr-4 py-3 text-white placeholder-gray-400 bg-[#18122B]/80 backdrop-blur-sm border border-purple-700/40 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 shadow-md transition-all duration-300 ease-in-out align-middle"
          style={{ height: '48px', lineHeight: '48px' }}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={() => setIsExpanded(true)}
          onBlur={() => setIsExpanded(false)}
        />
        <motion.svg
          className="absolute left-4 top-1/3 -translate-y-1/2 h-5 w-5 text-purple-400 pointer-events-none"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          animate={{ scale: isExpanded ? 1.1 : 1 }}
          transition={{ duration: 0.2 }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </motion.svg>
      </div>
      
      <motion.div 
        className="flex flex-col sm:flex-row gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="relative group">
          <select
            className="w-full sm:max-w-[200px] input-field text-white bg-[#18122B]/80 backdrop-blur-sm border border-purple-700/40 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 shadow transition-all duration-300 ease-in-out py-3 px-4 pr-10 appearance-none cursor-pointer"
            value={category}
            onChange={handleCategoryChange}
          >
            <option value="all">All Categories</option>
            <option value="Wedding">Wedding</option>
            <option value="Engagement">Engagement</option>
            <option value="Birthday">Birthday</option>
          </select>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
            <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        <div className="relative group">
          <select
            className="w-full sm:max-w-[200px] input-field text-white bg-[#18122B]/80 backdrop-blur-sm border border-purple-700/40 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 shadow transition-all duration-300 ease-in-out py-3 px-4 pr-10 appearance-none cursor-pointer"
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
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
            <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        <div className="relative group">
          <select
            className="w-full sm:max-w-[200px] input-field text-white bg-[#18122B]/80 backdrop-blur-sm border border-purple-700/40 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 shadow transition-all duration-300 ease-in-out py-3 px-4 pr-10 appearance-none cursor-pointer"
            value={sortBy}
            onChange={handleSortChange}
          >
            <option value="newest">Newest First</option>
            <option value="popular">Most Popular</option>
          </select>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
            <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
} 