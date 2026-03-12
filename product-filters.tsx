'use client'

import { useState } from 'react'
import { Filter, X } from 'lucide-react'

interface ProductFiltersProps {
  onFilterChange: (filters: { priceRange: [number, number]; rating: number }) => void
}

export function ProductFilters({ onFilterChange }: ProductFiltersProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 300000])
  const [minRating, setMinRating] = useState(0)

  const handlePriceChange = (newPrice: [number, number]) => {
    setPriceRange(newPrice)
    onFilterChange({ priceRange: newPrice, rating: minRating })
  }

  const handleRatingChange = (rating: number) => {
    setMinRating(rating)
    onFilterChange({ priceRange, rating })
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition font-medium"
      >
        <Filter size={18} />
        Filters
      </button>

      {isOpen && (
        <div className="absolute top-12 left-0 bg-white border border-gray-300 rounded-lg shadow-lg p-6 w-80 z-50">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-900">Filter Products</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-gray-100 rounded transition"
            >
              <X size={18} />
            </button>
          </div>

          {/* Price Range */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Price Range: ₹{priceRange[0].toLocaleString()} - ₹{priceRange[1].toLocaleString()}
            </label>
            <div className="space-y-2">
              <input
                type="range"
                min="0"
                max="300000"
                value={priceRange[0]}
                onChange={(e) => handlePriceChange([Number(e.target.value), priceRange[1]])}
                className="w-full"
              />
              <input
                type="range"
                min="0"
                max="300000"
                value={priceRange[1]}
                onChange={(e) => handlePriceChange([priceRange[0], Number(e.target.value)])}
                className="w-full"
              />
            </div>
          </div>

          {/* Rating Filter */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-3">Minimum Rating</label>
            <div className="space-y-2">
              {[0, 3, 3.5, 4, 4.5].map((rating) => (
                <label key={rating} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="rating"
                    value={rating}
                    checked={minRating === rating}
                    onChange={() => handleRatingChange(rating)}
                    className="w-4 h-4"
                  />
                  <span className="text-sm text-gray-700">
                    {rating === 0 ? 'All Ratings' : `${rating}★ & above`}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <button
            onClick={() => {
              setPriceRange([0, 300000])
              setMinRating(0)
              onFilterChange({ priceRange: [0, 300000], rating: 0 })
            }}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium text-sm"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  )
}
