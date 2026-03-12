'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Search, ShoppingCart, LogIn, LogOut, Package, Settings } from 'lucide-react'
import { useCart } from '@/context/cart-context'
import { useUser } from '@/context/user-context'
import { Button } from '@/components/ui/button'

export function Header() {
  const router = useRouter()
  const { items } = useCart()
  const { user, isLoggedIn, logout } = useUser()
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/?search=${encodeURIComponent(searchQuery)}`)
      setSearchQuery('')
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-lg">
      {/* Top Navigation Bar */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-6 md:gap-8">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-1 flex-shrink-0 hover:opacity-90 transition">
              <div className="text-3xl font-bold tracking-tight">Flipkart</div>
              <span className="text-yellow-300 text-xs font-semibold">Plus</span>
            </Link>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md">
              <div className="flex items-center w-full bg-white rounded-lg overflow-hidden shadow-md">
                <input
                  type="text"
                  placeholder="Search for products, brands and more"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 px-4 py-3 text-gray-700 outline-none text-sm"
                />
                <button type="submit" className="px-4 py-3 bg-blue-600 text-white hover:bg-blue-700 transition">
                  <Search size={20} />
                </button>
              </div>
            </form>

            {/* Right Actions */}
            <div className="ml-auto flex items-center gap-4 md:gap-6">
              {isLoggedIn ? (
                <>
                  {user?.isAdmin && (
                    <Link href="/admin" className="flex items-center gap-2 hover:text-blue-100 transition font-medium bg-yellow-500 hover:bg-yellow-600 px-3 py-1 rounded-lg">
                      <Settings size={20} />
                      <span className="hidden sm:inline text-sm">Admin</span>
                    </Link>
                  )}
                  <Link href="/orders" className="flex items-center gap-2 hover:text-blue-100 transition font-medium">
                    <Package size={20} />
                    <span className="hidden sm:inline text-sm">Orders</span>
                  </Link>
                  <button
                    onClick={() => {
                      logout()
                      router.push('/')
                    }}
                    className="flex items-center gap-2 hover:text-blue-100 transition font-medium"
                  >
                    <LogOut size={20} />
                    <span className="hidden sm:inline text-sm">Logout</span>
                  </button>
                </>
              ) : (
                <button
                  onClick={() => router.push('/login')}
                  className="flex items-center gap-2 hover:text-blue-100 transition font-medium"
                >
                  <LogIn size={20} />
                  <span className="hidden sm:inline text-sm">Login</span>
                </button>
              )}

              <Link href="/cart" className="flex items-center gap-2 hover:text-blue-100 transition relative">
                <ShoppingCart size={20} />
                <span className="hidden sm:inline text-sm font-medium">Cart</span>
                {items.length > 0 && (
                  <span className="absolute -top-3 -right-3 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold shadow-lg">
                    {items.length}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Category Menu */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center overflow-x-auto gap-4 md:gap-8 py-4">
            {['Mobiles', 'Fashion', 'Electronics', 'Home', 'Sports', 'Books'].map((category) => (
              <button
                key={category}
                onClick={() => router.push(`/?category=${category}`)}
                className="text-gray-700 hover:text-blue-600 hover:font-semibold whitespace-nowrap font-medium text-sm transition duration-200"
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  )
}
