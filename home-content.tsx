'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Header } from '@/components/header'
import { ProductCard } from '@/components/product-card'
import { ProductFilters } from '@/components/product-filters'
import { products } from '@/lib/products'

export function HomeContent() {
  const searchParams = useSearchParams()
  const selectedCategory = searchParams.get('category')
  const searchQuery = searchParams.get('search')
  const [filters, setFilters] = useState({ priceRange: [0, 300000], rating: 0 })

  let displayProducts = products

  // Apply category filter
  if (selectedCategory) {
    displayProducts = displayProducts.filter((p) => p.category === selectedCategory)
  }

  // Apply search filter
  if (searchQuery) {
    const query = searchQuery.toLowerCase()
    displayProducts = displayProducts.filter((p) =>
      p.title.toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query) ||
      p.category.toLowerCase().includes(query)
    )
  }

  // Apply price and rating filters
  displayProducts = displayProducts.filter((p) => {
    const inPriceRange = p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
    const hasRating = filters.rating === 0 || p.rating >= filters.rating
    return inPriceRange && hasRating
  })

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
            Biggest Offers of the Season
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 font-semibold mb-2">
            Up to 70% off on selected items
          </p>
          <p className="text-blue-100">Shop from thousands of products with amazing deals</p>
        </div>
      </div>

      {/* Category Tags */}
      {selectedCategory && (
        <div className="bg-white border-b sticky top-16 z-10">
          <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-4">
            <span className="text-gray-600 text-sm font-medium">Viewing:</span>
            <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full font-semibold text-sm">
              {selectedCategory}
            </span>
            <button
              onClick={() => window.history.back()}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium ml-auto"
            >
              ← Back to all products
            </button>
          </div>
        </div>
      )}

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="mb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">
              {searchQuery ? `Search Results for "${searchQuery}"` : selectedCategory ? `${selectedCategory}` : 'Featured Products'}
            </h2>
            <p className="text-gray-600 mt-2">
              {displayProducts.length} amazing products to choose from
            </p>
          </div>
          <ProductFilters onFilterChange={setFilters} />
        </div>

        {displayProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-lg">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-gray-500 text-lg font-medium">No products found</p>
            <button
              onClick={() => window.location.href = '/'}
              className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Browse all products
            </button>
          </div>
        )}
      </div>
    </main>
    </>
  )
}
