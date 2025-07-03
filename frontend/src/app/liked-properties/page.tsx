'use client'

import { useAuth } from '@/lib/auth'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function LikedPropertiesPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [likedProperties, setLikedProperties] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/login')
    }
  }, [user, loading, router])

  useEffect(() => {
    if (user) {
      // Load user's liked properties
      // For now, we'll just set some mock data
      setTimeout(() => {
        setLikedProperties([
          {
            id: '1',
            title: 'Luxury Penthouse with City Views',
            address: '789 Sky Tower, London',
            price: '£3,200/month',
            type: 'rental',
            bedrooms: 3,
            bathrooms: 2,
            area: '1200 sq ft',
            likedAt: '2024-01-15',
            images: ['/api/placeholder/300/200']
          },
          {
            id: '2',
            title: 'Charming Cottage in Countryside',
            address: '15 Village Green, Cotswolds',
            price: '£275,000',
            type: 'sale',
            bedrooms: 2,
            bathrooms: 1,
            area: '850 sq ft',
            likedAt: '2024-01-12',
            images: ['/api/placeholder/300/200']
          }
        ])
        setIsLoading(false)
      }, 1000)
    }
  }, [user])

  const handleUnlike = (propertyId: string) => {
    setLikedProperties(prev => prev.filter(p => p.id !== propertyId))
  }

  if (loading || isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your liked properties...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Liked Properties</h1>
            <div className="flex items-center space-x-4">
              <Link
                href="/marketplace"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Browse More Properties
              </Link>
              <button
                onClick={() => router.back()}
                className="text-gray-600 hover:text-gray-900"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {likedProperties.length === 0 ? (
          <div className="text-center py-12">
            <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No liked properties</h3>
            <p className="text-gray-600 mb-4">You haven't liked any properties yet. Start browsing to find your dream property.</p>
            <Link
              href="/marketplace"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Browse Properties
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {likedProperties.map((property) => (
              <div key={property.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="relative">
                  <img
                    src={property.images[0]}
                    alt={property.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-3 right-3">
                    <button
                      onClick={() => handleUnlike(property.id)}
                      className="bg-red-100 text-red-600 p-2 rounded-full hover:bg-red-200 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                  <div className="absolute top-3 left-3">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 text-xs font-medium rounded-full">
                      {property.type === 'rental' ? 'For Rent' : 'For Sale'}
                    </span>
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">{property.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">{property.address}</p>
                  <p className="text-lg font-bold text-gray-900 mb-3">{property.price}</p>
                  
                  <div className="flex justify-between items-center text-sm text-gray-600 mb-4">
                    <span>{property.bedrooms} bed</span>
                    <span>{property.bathrooms} bath</span>
                    <span>{property.area}</span>
                  </div>
                  
                  <div className="flex justify-between items-center text-xs text-gray-500 mb-3">
                    <span>Liked on {new Date(property.likedAt).toLocaleDateString()}</span>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Link
                      href={`/property/${property.id}`}
                      className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors text-center text-sm"
                    >
                      View Details
                    </Link>
                    <button className="flex-1 bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm">
                      Contact
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
} 