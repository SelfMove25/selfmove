'use client'

import { useAuth } from '@/lib/auth'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function OffersPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [offers, setOffers] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'sent' | 'received'>('sent')

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/login')
    }
  }, [user, loading, router])

  useEffect(() => {
    if (user) {
      // Load user's offers
      // For now, we'll just set some mock data
      setTimeout(() => {
        setOffers([
          {
            id: '1',
            type: 'sent',
            property: {
              id: '1',
              title: 'Modern 2-Bedroom Apartment',
              address: '123 Main St, London',
              price: '£2,500/month',
              image: '/api/placeholder/300/200'
            },
            amount: '£2,300/month',
            status: 'pending',
            message: 'I would like to rent this property. Available to move in immediately.',
            createdAt: '2024-01-15',
            updatedAt: '2024-01-15'
          },
          {
            id: '2',
            type: 'received',
            property: {
              id: '2',
              title: 'Victorian House',
              address: '456 Oak Ave, Manchester',
              price: '£450,000',
              image: '/api/placeholder/300/200'
            },
            amount: '£425,000',
            status: 'pending',
            message: 'Interested in purchasing this property. Can we schedule a viewing?',
            createdAt: '2024-01-14',
            updatedAt: '2024-01-14',
            contactInfo: {
              name: 'John Smith',
              email: 'john@example.com',
              phone: '+44 7700 900123'
            }
          }
        ])
        setIsLoading(false)
      }, 1000)
    }
  }, [user])

  const handleOfferResponse = (offerId: string, response: 'accept' | 'decline') => {
    setOffers(prev => prev.map(offer => 
      offer.id === offerId 
        ? { ...offer, status: response === 'accept' ? 'accepted' : 'declined' }
        : offer
    ))
  }

  const filteredOffers = offers.filter(offer => offer.type === activeTab)

  if (loading || isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your offers...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">My Offers</h1>
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('sent')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'sent'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Offers Sent ({offers.filter(o => o.type === 'sent').length})
              </button>
              <button
                onClick={() => setActiveTab('received')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'received'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Offers Received ({offers.filter(o => o.type === 'received').length})
              </button>
            </nav>
          </div>
        </div>

        {filteredOffers.length === 0 ? (
          <div className="text-center py-12">
            <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No {activeTab === 'sent' ? 'sent' : 'received'} offers
            </h3>
            <p className="text-gray-600 mb-4">
              {activeTab === 'sent' 
                ? "You haven't made any offers yet. Start browsing properties to make your first offer."
                : "You haven't received any offers yet. Make sure your properties are listed and visible."
              }
            </p>
            <Link
              href={activeTab === 'sent' ? '/marketplace' : '/list-property'}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              {activeTab === 'sent' ? 'Browse Properties' : 'List a Property'}
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredOffers.map((offer) => (
              <div key={offer.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <img
                        src={offer.property.image}
                        alt={offer.property.title}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{offer.property.title}</h3>
                        <p className="text-sm text-gray-600">{offer.property.address}</p>
                        <p className="text-sm text-gray-500">Listed at {offer.property.price}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                        offer.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        offer.status === 'accepted' ? 'bg-green-100 text-green-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {offer.status.charAt(0).toUpperCase() + offer.status.slice(1)}
                      </span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-lg font-bold text-gray-900 mb-2">Offer Amount: {offer.amount}</p>
                    <p className="text-gray-700">{offer.message}</p>
                  </div>

                  {offer.contactInfo && (
                    <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                      <h4 className="font-medium text-gray-900 mb-2">Contact Information</h4>
                      <p className="text-sm text-gray-700">Name: {offer.contactInfo.name}</p>
                      <p className="text-sm text-gray-700">Email: {offer.contactInfo.email}</p>
                      <p className="text-sm text-gray-700">Phone: {offer.contactInfo.phone}</p>
                    </div>
                  )}

                  <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                    <span>Created: {new Date(offer.createdAt).toLocaleDateString()}</span>
                    <span>Updated: {new Date(offer.updatedAt).toLocaleDateString()}</span>
                  </div>

                  <div className="flex space-x-3">
                    <Link
                      href={`/property/${offer.property.id}`}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
                    >
                      View Property
                    </Link>
                    
                    {activeTab === 'received' && offer.status === 'pending' && (
                      <>
                        <button
                          onClick={() => handleOfferResponse(offer.id, 'accept')}
                          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm"
                        >
                          Accept Offer
                        </button>
                        <button
                          onClick={() => handleOfferResponse(offer.id, 'decline')}
                          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm"
                        >
                          Decline Offer
                        </button>
                      </>
                    )}
                    
                    {activeTab === 'sent' && (
                      <button className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors text-sm">
                        Send Message
                      </button>
                    )}
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