'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'

interface Property {
  id: string
  title: string
  price: number
  bedrooms: number
  bathrooms: number
  size: number
  type: string
  listingType: 'sale' | 'rent'
  address: {
    street: string
    city: string
    zipCode: string
  }
  images: string[]
  description: string
  views: number
  features: string[]
  owner: {
    name: string
    joinDate: string
    verified: boolean
  }
  createdAt: string
}

export default function PropertyDetails() {
  const params = useParams()
  const propertyId = params?.id as string
  
  const [property, setProperty] = useState<Property | null>(null)
  const [loading, setLoading] = useState(true)
  const [showOfferModal, setShowOfferModal] = useState(false)
  const [offerAmount, setOfferAmount] = useState('')
  const [offerMessage, setOfferMessage] = useState('')

  // Mock data - will be replaced with API call
  useEffect(() => {
    const mockProperty: Property = {
      id: propertyId,
      title: 'Modern 3-Bedroom Apartment',
      price: 450000,
      bedrooms: 3,
      bathrooms: 2,
      size: 1200,
      type: 'apartment',
      listingType: 'sale',
      address: {
        street: '123 Oak Street',
        city: 'London',
        zipCode: 'SW1A 1AA'
      },
      images: ['/api/placeholder/800/600'],
      description: 'Beautiful modern apartment in the heart of London with stunning views and contemporary finishes. This property features an open-plan living area, fully equipped kitchen, and spacious bedrooms with built-in storage. Located in a prime area with excellent transport links.',
      views: 45,
      features: [
        'Central Heating',
        'Double Glazing',
        'Parking Space',
        'Garden/Terrace',
        'Near Transport',
        'Recently Renovated'
      ],
      owner: {
        name: 'Sarah Johnson',
        joinDate: 'January 2023',
        verified: true
      },
      createdAt: new Date().toISOString()
    }
    
    setTimeout(() => {
      setProperty(mockProperty)
      setLoading(false)
    }, 1000)
  }, [propertyId])

  const handleOfferSubmit = () => {
    // TODO: Implement offer submission
    console.log('Offer submitted:', { propertyId, offerAmount, offerMessage })
    alert('Offer submitted successfully! (This is a demo)')
    setShowOfferModal(false)
    setOfferAmount('')
    setOfferMessage('')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-polished-blue-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">🏠</div>
          <p className="text-gray-600">Loading property details...</p>
        </div>
      </div>
    )
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-polished-blue-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">❌</div>
          <p className="text-gray-600">Property not found</p>
          <Link href="/marketplace" className="text-polished-blue-600 hover:text-polished-blue-700 mt-4 block">
            ← Back to Marketplace
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-polished-blue-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-polished-blue-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-navy-800">
            🏡 SelfMove
          </Link>
          <nav className="hidden md:flex space-x-6">
            <Link href="/marketplace" className="text-gray-700 hover:text-polished-blue-600 transition-colors">
              ← Back to Marketplace
            </Link>
            <Link href="/auth/login" className="bg-navy-600 text-white px-4 py-2 rounded-lg hover:bg-navy-700 transition-colors">
              Sign In
            </Link>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Property Images */}
            <div className="bg-white rounded-lg shadow-lg border border-polished-blue-200 overflow-hidden">
              <div className="h-96 bg-gradient-to-br from-polished-blue-100 to-blue-100 flex items-center justify-center">
                <span className="text-8xl">🏠</span>
              </div>
            </div>

            {/* Property Info */}
            <div className="bg-white rounded-lg shadow-lg border border-polished-blue-200 p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{property.title}</h1>
                  <p className="text-gray-600 flex items-center">
                    📍 {property.address.street}, {property.address.city}, {property.address.zipCode}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-polished-blue-600">
                    £{property.price.toLocaleString()}
                    {property.listingType === 'rent' && '/month'}
                  </div>
                  <div className="text-sm text-gray-500">👁️ {property.views} views</div>
                </div>
              </div>

              <div className="flex items-center gap-6 text-gray-600 mb-6 pb-6 border-b border-gray-200">
                <span className="flex items-center">
                  🛏️ {property.bedrooms} bedroom{property.bedrooms !== 1 ? 's' : ''}
                </span>
                <span className="flex items-center">
                  🚿 {property.bathrooms} bathroom{property.bathrooms !== 1 ? 's' : ''}
                </span>
                <span className="flex items-center">
                  📐 {property.size} sqft
                </span>
                <span className="flex items-center">
                  🏢 {property.type}
                </span>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Description</h3>
                <p className="text-gray-600 leading-relaxed">{property.description}</p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Features</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {property.features.map((feature, index) => (
                    <div key={index} className="bg-polished-blue-50 text-polished-blue-700 px-3 py-2 rounded-lg text-sm">
                      ✓ {feature}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Owner Info */}
            <div className="bg-white rounded-lg shadow-lg border border-polished-blue-200 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Property Owner 👤</h3>
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-polished-blue-100 rounded-full flex items-center justify-center text-xl">
                  👨‍💼
                </div>
                <div className="ml-3">
                  <p className="font-semibold text-gray-900">{property.owner.name}</p>
                  <p className="text-sm text-gray-600">
                    {property.owner.verified ? '✅ Verified' : '⏳ Pending verification'}
                  </p>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                📅 Joined {property.owner.joinDate}
              </p>
              <button className="w-full bg-polished-blue-600 text-white py-2 rounded-lg hover:bg-polished-blue-700 transition-colors">
                Contact Owner 📞
              </button>
            </div>

            {/* Make Offer */}
            <div className="bg-white rounded-lg shadow-lg border border-polished-blue-200 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {property.listingType === 'rent' ? 'Book Viewing 📅' : 'Make Offer 💰'}
              </h3>
              <div className="space-y-4">
                <button
                  onClick={() => setShowOfferModal(true)}
                  className="w-full bg-gradient-to-r from-polished-blue-600 to-blue-600 text-white py-3 rounded-lg font-semibold hover:from-polished-blue-700 hover:to-blue-700 transition-all"
                >
                  {property.listingType === 'rent' ? 'Request Viewing 📅' : 'Submit Offer 💰'}
                </button>
                <p className="text-xs text-gray-500 text-center">
                  ⚠️ KYC verification required for all offers
                </p>
              </div>
            </div>

            {/* Property Stats */}
            <div className="bg-white rounded-lg shadow-lg border border-polished-blue-200 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Property Stats 📊</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Listed:</span>
                  <span className="font-semibold">
                    {new Date(property.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Views:</span>
                  <span className="font-semibold">{property.views}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Type:</span>
                  <span className="font-semibold capitalize">{property.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <span className="font-semibold text-green-600">Available</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Offer Modal */}
      {showOfferModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-900">
                {property.listingType === 'rent' ? 'Request Viewing 📅' : 'Submit Offer 💰'}
              </h3>
              <button
                onClick={() => setShowOfferModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-4">
              {property.listingType === 'sale' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Offer Amount (£) *
                  </label>
                  <input
                    type="number"
                    value={offerAmount}
                    onChange={(e) => setOfferAmount(e.target.value)}
                    placeholder="450000"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-polished-blue-500 focus:border-transparent text-gray-900"
                  />
                </div>
              )}
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {property.listingType === 'rent' ? 'Message to Owner' : 'Message (Optional)'}
                </label>
                <textarea
                  value={offerMessage}
                  onChange={(e) => setOfferMessage(e.target.value)}
                  rows={4}
                  placeholder={property.listingType === 'rent' 
                    ? "Hi, I'm interested in viewing this property. When would be a good time?"
                    : "I'm very interested in this property and would like to make an offer..."
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-polished-blue-500 focus:border-transparent text-gray-900"
                />
              </div>
              
              <div className="bg-polished-blue-50 p-4 rounded-lg">
                <p className="text-sm text-polished-blue-700">
                  ⚠️ <strong>KYC Required:</strong> You'll need to complete identity verification before your {property.listingType === 'rent' ? 'viewing request' : 'offer'} can be processed.
                </p>
              </div>
              
              <div className="flex gap-3">
                <button
                  onClick={() => setShowOfferModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleOfferSubmit}
                  className="flex-1 bg-polished-blue-600 text-white px-4 py-2 rounded-lg hover:bg-polished-blue-700 transition-colors"
                >
                  {property.listingType === 'rent' ? 'Send Request' : 'Submit Offer'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 