import { Suspense } from 'react'
import { Header } from '@/components/header'
import { HomeContent } from './home-content'

function HomeSkeleton() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        <div className="bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <div className="h-12 bg-blue-400 rounded w-3/4 mx-auto mb-4 animate-pulse" />
            <div className="h-6 bg-blue-300 rounded w-1/2 mx-auto mb-2 animate-pulse" />
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg h-96 animate-pulse" />
            ))}
          </div>
        </div>
      </main>
    </>
  )
}

export default function Home() {
  return (
    <Suspense fallback={<HomeSkeleton />}>
      <HomeContent />
    </Suspense>
  )
}
