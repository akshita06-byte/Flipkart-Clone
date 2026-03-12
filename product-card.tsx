'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Star, Heart, ShoppingCart as ShoppingCartIcon } from 'lucide-react'
import { Product } from '@/lib/products'
import { Button } from '@/components/ui/button'
import { useCart } from '@/context/cart-context'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart()
  const [isFavorite, setIsFavorite] = useState(false)
  const [showAddedNotification, setShowAddedNotification] = useState(false)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
      discount: product.discount,
    })
    setShowAddedNotification(true)
    setTimeout(() => setShowAddedNotification(false), 2000)
  }

  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsFavorite(!isFavorite)
  }

  return (
    <Link href={`/product/${product.id}`}>
      <div className="bg-white rounded-lg overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer h-full flex flex-col hover:scale-105 transform group relative">
        {/* Image Container */}
        <div className="relative w-full aspect-square bg-gray-50 overflow-hidden">
          <Image
            src={product.image}
            alt={product.title}
            fill
            loading="eager"
            className="object-cover group-hover:scale-110 transition-transform duration-300"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          />
          <div className="absolute top-3 right-3 bg-gradient-to-r from-orange-600 to-red-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-md">
            {product.discount}% OFF
          </div>

          {/* Favorite Button */}
          <button
            onClick={handleFavorite}
            className="absolute top-3 left-3 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-all duration-200 opacity-0 group-hover:opacity-100"
          >
            <Heart
              size={20}
              className={`transition-colors ${
                isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400 hover:text-red-500'
              }`}
            />
          </button>
        </div>

        {/* Product Details */}
        <div className="flex-1 p-4 flex flex-col justify-between">
          <div>
            <h3 className="font-semibold text-gray-900 line-clamp-2 text-sm mb-3 leading-snug group-hover:text-blue-600 transition-colors">
              {product.title}
            </h3>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-3">
              <div className="bg-green-700 text-white px-2.5 py-0.5 rounded text-xs font-bold flex items-center gap-1 shadow-sm">
                <Star size={13} fill="white" />
                {product.rating}
              </div>
              <span className="text-gray-500 text-xs font-medium">({product.reviews.toLocaleString()})</span>
            </div>

            {/* Price */}
            <div className="mb-4">
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold text-gray-900">₹{product.price.toLocaleString()}</span>
                <span className="text-gray-400 line-through text-sm font-medium">₹{product.originalPrice.toLocaleString()}</span>
              </div>
              <div className="text-green-700 text-xs font-semibold mt-1">
                Save ₹{(product.originalPrice - product.price).toLocaleString()}
              </div>
            </div>
          </div>

          {/* Add to Cart Button */}
          <div className="relative">
            <Button
              onClick={handleAddToCart}
              className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 rounded-lg transition-all duration-200 shadow-sm flex items-center justify-center gap-2"
            >
              <ShoppingCartIcon size={18} />
              Add to Cart
            </Button>

            {/* Added Notification */}
            {showAddedNotification && (
              <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap animate-bounce shadow-lg">
                Added to cart!
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
