'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Header from '@/components/Header'

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
    coordinates?: {
      lat: number
      lng: number
    }
  }
  images: string[]
  description: string
  views: number
  createdAt: string
}

export default function Marketplace() {
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'sale' | 'rent'>('sale')
  const [searchFilters, setSearchFilters] = useState({
    location: '',
    searchRadius: 'this-area-only',
    propertyTypes: 'any',
    addedToSite: 'anytime',
    priceMin: 'no-min',
    priceMax: 'no-max',
    bedroomsMin: 'no-min',
    bedroomsMax: 'no-max',
    includeUnderOffer: false,
    includeLetAgreed: false
  })
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null)
  const [searchLocation, setSearchLocation] = useState<{lat: number, lng: number} | null>(null)
  const [locationSuggestions, setLocationSuggestions] = useState<string[]>([])
  const [showLocationSuggestions, setShowLocationSuggestions] = useState(false)

  // Calculate distance between two coordinates (Haversine formula)
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 3959 // Radius of the Earth in miles
    const dLat = (lat2 - lat1) * Math.PI / 180
    const dLon = (lon2 - lon1) * Math.PI / 180
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
    return R * c
  }

  // Get radius in miles from search radius option
  const getRadiusInMiles = (searchRadius: string): number => {
    switch (searchRadius) {
      case 'this-area-only': return 0.5
      case '0.25-miles': return 0.25
      case '0.5-miles': return 0.5
      case '1-mile': return 1
      case '3-miles': return 3
      case '5-miles': return 5
      case '10-miles': return 10
      case '15-miles': return 15
      case '20-miles': return 20
      case '30-miles': return 30
      case '40-miles': return 40
      default: return 5
    }
  }

  // Mock geocoding function (in production, use Google Maps API or similar)
  const mockGeocode = async (address: string): Promise<{lat: number, lng: number} | null> => {
    // Mock UK locations for demo
    const mockLocations: {[key: string]: {lat: number, lng: number}} = {
      'london': { lat: 51.5074, lng: -0.1278 },
      'manchester': { lat: 53.4808, lng: -2.2426 },
      'birmingham': { lat: 52.4862, lng: -1.8904 },
      'leeds': { lat: 53.8008, lng: -1.5491 },
      'liverpool': { lat: 53.4084, lng: -2.9916 },
      'bristol': { lat: 51.4545, lng: -2.5879 },
      'cardiff': { lat: 51.4816, lng: -3.1791 },
      'edinburgh': { lat: 55.9533, lng: -3.1883 },
      'glasgow': { lat: 55.8642, lng: -4.2518 },
      'sw1a 1aa': { lat: 51.5014, lng: -0.1419 },
      'm1 1aa': { lat: 53.4808, lng: -2.2426 },
      'ec1v 2nj': { lat: 51.5200, lng: -0.1000 }
    }

    const normalizedAddress = address.toLowerCase().trim()
    
    // Check for exact matches first
    if (mockLocations[normalizedAddress]) {
      return mockLocations[normalizedAddress]
    }

    // Check for partial matches
    for (const [key, coords] of Object.entries(mockLocations)) {
      if (key.includes(normalizedAddress) || normalizedAddress.includes(key)) {
        return coords
      }
    }

    return null
  }

  // Handle location search
  const handleLocationSearch = async (locationQuery: string) => {
    if (!locationQuery.trim()) {
      setSearchLocation(null)
      return
    }

    const coords = await mockGeocode(locationQuery)
    if (coords) {
      setSearchLocation(coords)
    }
  }

  // Generate location suggestions
  const generateLocationSuggestions = (query: string) => {
    if (!query.trim()) {
      setLocationSuggestions([])
      return
    }

    const commonLocations = [
      'London', 'Manchester', 'Birmingham', 'Leeds', 'Liverpool', 
      'Bristol', 'Cardiff', 'Edinburgh', 'Glasgow', 'Newcastle',
      'Sheffield', 'Bradford', 'Coventry', 'Leicester', 'Nottingham'
    ]

    const filtered = commonLocations.filter(location => 
      location.toLowerCase().includes(query.toLowerCase())
    )

    setLocationSuggestions(filtered.slice(0, 5))
  }

  // Mock data for now - will be replaced with API call
  useEffect(() => {
    const mockProperties: Property[] = [
      {
        id: '1',
        title: 'Modern Three-Bedroom Apartment',
        price: 450000,
        bedrooms: 3,
        bathrooms: 2,
        size: 1200,
        type: 'apartment',
        listingType: 'sale',
        address: {
          street: '123 Oak Street',
          city: 'London',
          zipCode: 'SW1A 1AA',
          coordinates: { lat: 51.5014, lng: -0.1419 }
        },
        images: ['/api/placeholder/400/300'],
        description: 'Contemporary apartment in prime London location with modern fixtures and stunning city views.',
        views: 45,
        createdAt: new Date().toISOString()
      },
      {
        id: '2',
        title: 'Victorian Terraced House',
        price: 2500,
        bedrooms: 4,
        bathrooms: 3,
        size: 1800,
        type: 'house',
        listingType: 'rent',
        address: {
          street: '456 Baker Street',
          city: 'Manchester',
          zipCode: 'M1 1AA',
          coordinates: { lat: 53.4808, lng: -2.2426 }
        },
        images: ['/api/placeholder/400/300'],
        description: 'Elegant Victorian property with period features, fully renovated with modern amenities.',
        views: 32,
        createdAt: new Date().toISOString()
      },
      {
        id: '3',
        title: 'Luxury Penthouse with Terrace',
        price: 1250000,
        bedrooms: 2,
        bathrooms: 2,
        size: 1100,
        type: 'apartment',
        listingType: 'sale',
        address: {
          street: '789 City Road',
          city: 'London',
          zipCode: 'EC1V 2NJ',
          coordinates: { lat: 51.5200, lng: -0.1000 }
        },
        images: ['/api/placeholder/400/300'],
        description: 'Stunning penthouse with private terrace and panoramic city views.',
        views: 128,
        createdAt: new Date().toISOString()
      },
      {
        id: '4',
        title: 'Charming Cottage in Birmingham',
        price: 325000,
        bedrooms: 2,
        bathrooms: 1,
        size: 900,
        type: 'house',
        listingType: 'sale',
        address: {
          street: '321 Cottage Lane',
          city: 'Birmingham',
          zipCode: 'B1 1AA',
          coordinates: { lat: 52.4862, lng: -1.8904 }
        },
        images: ['/api/placeholder/400/300'],
        description: 'Beautiful cottage with original features and modern updates.',
        views: 67,
        createdAt: new Date().toISOString()
      },
      {
        id: '5',
        title: 'Family Home in Leeds',
        price: 1800,
        bedrooms: 3,
        bathrooms: 2,
        size: 1400,
        type: 'house',
        listingType: 'rent',
        address: {
          street: '654 Family Close',
          city: 'Leeds',
          zipCode: 'LS1 1AA',
          coordinates: { lat: 53.8008, lng: -1.5491 }
        },
        images: ['/api/placeholder/400/300'],
        description: 'Spacious family home with garden and parking.',
        views: 89,
        createdAt: new Date().toISOString()
      }
    ]
    
    setTimeout(() => {
      setProperties(mockProperties)
      setLoading(false)
    }, 1000)
  }, [])

  // Price range options for sale and rent
  const saleMinPrices = [
    { value: 'no-min', label: 'No min' },
    { value: '50000', label: '£50,000' },
    { value: '75000', label: '£75,000' },
    { value: '100000', label: '£100,000' },
    { value: '125000', label: '£125,000' },
    { value: '150000', label: '£150,000' },
    { value: '175000', label: '£175,000' },
    { value: '200000', label: '£200,000' },
    { value: '250000', label: '£250,000' },
    { value: '300000', label: '£300,000' },
    { value: '400000', label: '£400,000' },
    { value: '500000', label: '£500,000' },
    { value: '600000', label: '£600,000' },
    { value: '700000', label: '£700,000' },
    { value: '800000', label: '£800,000' },
    { value: '900000', label: '£900,000' },
    { value: '1000000', label: '£1,000,000' }
  ]

  const saleMaxPrices = [
    { value: 'no-max', label: 'No max' },
    { value: '75000', label: '£75,000' },
    { value: '100000', label: '£100,000' },
    { value: '125000', label: '£125,000' },
    { value: '150000', label: '£150,000' },
    { value: '175000', label: '£175,000' },
    { value: '200000', label: '£200,000' },
    { value: '250000', label: '£250,000' },
    { value: '300000', label: '£300,000' },
    { value: '400000', label: '£400,000' },
    { value: '500000', label: '£500,000' },
    { value: '600000', label: '£600,000' },
    { value: '700000', label: '£700,000' },
    { value: '800000', label: '£800,000' },
    { value: '900000', label: '£900,000' },
    { value: '1000000', label: '£1,000,000' },
    { value: '1250000', label: '£1,250,000' },
    { value: '1500000', label: '£1,500,000' },
    { value: '2000000', label: '£2,000,000' }
  ]

  const rentMinPrices = [
    { value: 'no-min', label: 'No min' },
    { value: '500', label: '£500 pcm' },
    { value: '600', label: '£600 pcm' },
    { value: '700', label: '£700 pcm' },
    { value: '800', label: '£800 pcm' },
    { value: '900', label: '£900 pcm' },
    { value: '1000', label: '£1,000 pcm' },
    { value: '1250', label: '£1,250 pcm' },
    { value: '1500', label: '£1,500 pcm' },
    { value: '1750', label: '£1,750 pcm' },
    { value: '2000', label: '£2,000 pcm' },
    { value: '2500', label: '£2,500 pcm' },
    { value: '3000', label: '£3,000 pcm' },
    { value: '4000', label: '£4,000 pcm' },
    { value: '5000', label: '£5,000 pcm' }
  ]

  const rentMaxPrices = [
    { value: 'no-max', label: 'No max' },
    { value: '600', label: '£600 pcm' },
    { value: '700', label: '£700 pcm' },
    { value: '800', label: '£800 pcm' },
    { value: '900', label: '£900 pcm' },
    { value: '1000', label: '£1,000 pcm' },
    { value: '1250', label: '£1,250 pcm' },
    { value: '1500', label: '£1,500 pcm' },
    { value: '1750', label: '£1,750 pcm' },
    { value: '2000', label: '£2,000 pcm' },
    { value: '2500', label: '£2,500 pcm' },
    { value: '3000', label: '£3,000 pcm' },
    { value: '4000', label: '£4,000 pcm' },
    { value: '5000', label: '£5,000 pcm' },
    { value: '7500', label: '£7,500 pcm' },
    { value: '10000', label: '£10,000 pcm' }
  ]

  const filteredProperties = properties.filter(property => {
    const matchesListingType = property.listingType === filter
    
    // Location-based filtering
    let matchesLocation = true
    if (searchLocation && property.address.coordinates) {
      const distance = calculateDistance(
        searchLocation.lat, searchLocation.lng,
        property.address.coordinates.lat, property.address.coordinates.lng
      )
      const radiusInMiles = getRadiusInMiles(searchFilters.searchRadius)
      matchesLocation = distance <= radiusInMiles
    } else if (searchFilters.location) {
      // Fallback to text search if no coordinates
      matchesLocation = property.title.toLowerCase().includes(searchFilters.location.toLowerCase()) ||
                       property.address.city.toLowerCase().includes(searchFilters.location.toLowerCase()) ||
                       property.address.zipCode.toLowerCase().includes(searchFilters.location.toLowerCase())
    }
    
    const matchesType = searchFilters.propertyTypes === 'any' || property.type === searchFilters.propertyTypes
    
    const minPrice = searchFilters.priceMin === 'no-min' ? 0 : parseInt(searchFilters.priceMin)
    const maxPrice = searchFilters.priceMax === 'no-max' ? Infinity : parseInt(searchFilters.priceMax)
    const matchesPrice = property.price >= minPrice && property.price <= maxPrice
    
    const minBedrooms = searchFilters.bedroomsMin === 'no-min' ? 0 : parseInt(searchFilters.bedroomsMin)
    const maxBedrooms = searchFilters.bedroomsMax === 'no-max' ? Infinity : parseInt(searchFilters.bedroomsMax)
    const matchesBedrooms = property.bedrooms >= minBedrooms && property.bedrooms <= maxBedrooms
    
    return matchesListingType && matchesLocation && matchesType && matchesPrice && matchesBedrooms
  })

  // Sort by distance if search location is set
  const sortedProperties = searchLocation 
    ? filteredProperties.sort((a, b) => {
        if (!a.address.coordinates || !b.address.coordinates) return 0
        const distanceA = calculateDistance(
          searchLocation.lat, searchLocation.lng,
          a.address.coordinates.lat, a.address.coordinates.lng
        )
        const distanceB = calculateDistance(
          searchLocation.lat, searchLocation.lng,
          b.address.coordinates.lat, b.address.coordinates.lng
        )
        return distanceA - distanceB
      })
    : filteredProperties

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Page Title & Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">
            {filter === 'sale' ? 'Find property for sale' : 'Properties to rent'}
          </h1>

          {/* Property Type Tabs */}
          <div className="flex space-x-0 mb-4 sm:mb-6">
            <button
              onClick={() => setFilter('sale')}
              className={`px-4 sm:px-6 py-2 sm:py-3 text-sm font-medium border-b-2 transition-colors touch-manipulation ${
                filter === 'sale'
                  ? 'text-gray-900 border-gray-900'
                  : 'text-gray-600 border-transparent hover:text-gray-900 hover:border-gray-300'
              }`}
            >
              Buy
            </button>
            <button
              onClick={() => setFilter('rent')}
              className={`px-4 sm:px-6 py-2 sm:py-3 text-sm font-medium border-b-2 transition-colors touch-manipulation ${
                filter === 'rent'
                  ? 'text-gray-900 border-gray-900'
                  : 'text-gray-600 border-transparent hover:text-gray-900 hover:border-gray-300'
              }`}
            >
              Rent
            </button>
          </div>

          {/* Rightmove-style Search Form */}
          <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6">
            {/* Location Search - New Section */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location
              </label>
              <div className="relative">
                <div className="relative">
                  <input
                    type="text"
                    value={searchFilters.location}
                    onChange={(e) => {
                      setSearchFilters(prev => ({ ...prev, location: e.target.value }))
                      generateLocationSuggestions(e.target.value)
                      setShowLocationSuggestions(true)
                    }}
                    onFocus={() => setShowLocationSuggestions(true)}
                    onBlur={() => setTimeout(() => setShowLocationSuggestions(false), 200)}
                    placeholder="Enter location, postcode, or area..."
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm bg-white text-gray-900"
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  {searchFilters.location && (
                    <button
                      onClick={() => {
                        setSearchFilters(prev => ({ ...prev, location: '' }))
                        setSearchLocation(null)
                      }}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                    >
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>
                
                {/* Location Suggestions Dropdown */}
                {showLocationSuggestions && locationSuggestions.length > 0 && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                    {locationSuggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setSearchFilters(prev => ({ ...prev, location: suggestion }))
                          handleLocationSearch(suggestion)
                          setShowLocationSuggestions(false)
                        }}
                        className="w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors text-sm text-gray-900 border-b border-gray-100 last:border-b-0"
                      >
                        <div className="flex items-center">
                          <svg className="h-4 w-4 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          {suggestion}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-4">
              {/* Search radius */}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Search radius</label>
                <select
                  value={searchFilters.searchRadius}
                  onChange={(e) => setSearchFilters(prev => ({ ...prev, searchRadius: e.target.value }))}
                  className="w-full px-3 py-2 sm:py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm bg-white text-gray-900 touch-manipulation"
                >
                  <option value="this-area-only">This area only</option>
                  <option value="0.25-miles">+ 1/4 mile</option>
                  <option value="0.5-miles">+ 1/2 mile</option>
                  <option value="1-mile">+ 1 mile</option>
                  <option value="3-miles">+ 3 miles</option>
                  <option value="5-miles">+ 5 miles</option>
                  <option value="10-miles">+ 10 miles</option>
                  <option value="15-miles">+ 15 miles</option>
                  <option value="20-miles">+ 20 miles</option>
                  <option value="30-miles">+ 30 miles</option>
                  <option value="40-miles">+ 40 miles</option>
                </select>
              </div>

              {/* Property types */}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Property types</label>
                <select
                  value={searchFilters.propertyTypes}
                  onChange={(e) => setSearchFilters(prev => ({ ...prev, propertyTypes: e.target.value }))}
                  className="w-full px-3 py-2 sm:py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm bg-white text-gray-900 touch-manipulation"
                >
                  <option value="any">Any</option>
                  <option value="house">Houses</option>
                  <option value="apartment">Flats/Apartments</option>
                  <option value="bungalow">Bungalows</option>
                  <option value="land">Land</option>
                  <option value="commercial">Commercial</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Added to site */}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Added to site</label>
                <select
                  value={searchFilters.addedToSite}
                  onChange={(e) => setSearchFilters(prev => ({ ...prev, addedToSite: e.target.value }))}
                  className="w-full px-3 py-2 sm:py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm bg-white text-gray-900 touch-manipulation"
                >
                  <option value="anytime">Anytime</option>
                  <option value="last-24-hours">Last 24 hours</option>
                  <option value="last-3-days">Last 3 days</option>
                  <option value="last-7-days">Last 7 days</option>
                  <option value="last-14-days">Last 14 days</option>
                </select>
              </div>

              {/* Include checkboxes */}
              <div className="flex items-center space-x-2 sm:space-x-4 pt-4 sm:pt-6">
                {filter === 'sale' ? (
                  <label className="flex items-center touch-manipulation">
                    <input
                      type="checkbox"
                      checked={searchFilters.includeUnderOffer}
                      onChange={(e) => setSearchFilters(prev => ({ ...prev, includeUnderOffer: e.target.checked }))}
                      className="w-4 h-4 text-teal-600 bg-gray-100 border-gray-300 rounded focus:ring-teal-500 focus:ring-2 touch-manipulation"
                    />
                    <span className="ml-2 text-xs sm:text-sm text-gray-700">Include Under Offer, Sold STC</span>
                  </label>
                ) : (
                  <label className="flex items-center touch-manipulation">
                    <input
                      type="checkbox"
                      checked={searchFilters.includeLetAgreed}
                      onChange={(e) => setSearchFilters(prev => ({ ...prev, includeLetAgreed: e.target.checked }))}
                      className="w-4 h-4 text-teal-600 bg-gray-100 border-gray-300 rounded focus:ring-teal-500 focus:ring-2 touch-manipulation"
                    />
                    <span className="ml-2 text-xs sm:text-sm text-gray-700">Include Let Agreed properties</span>
                  </label>
                )}
              </div>
            </div>

            {/* Price and bedroom filters */}
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-4">
              {/* Price range */}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                  Price range (£)
                </label>
                <select
                  value={searchFilters.priceMin}
                  onChange={(e) => setSearchFilters(prev => ({ ...prev, priceMin: e.target.value }))}
                  className="w-full px-3 py-2 sm:py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm bg-white text-gray-900 touch-manipulation"
                >
                  {(filter === 'sale' ? saleMinPrices : rentMinPrices).map(price => (
                    <option key={price.value} value={price.value}>{price.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">&nbsp;</label>
                <select
                  value={searchFilters.priceMax}
                  onChange={(e) => setSearchFilters(prev => ({ ...prev, priceMax: e.target.value }))}
                  className="w-full px-3 py-2 sm:py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm bg-white text-gray-900 touch-manipulation"
                >
                  {(filter === 'sale' ? saleMaxPrices : rentMaxPrices).map(price => (
                    <option key={price.value} value={price.value}>{price.label}</option>
                  ))}
                </select>
              </div>

              {/* Bedrooms */}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">No. of bedrooms</label>
                <select
                  value={searchFilters.bedroomsMin}
                  onChange={(e) => setSearchFilters(prev => ({ ...prev, bedroomsMin: e.target.value }))}
                  className="w-full px-3 py-2 sm:py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm bg-white text-gray-900 touch-manipulation"
                >
                  <option value="no-min">No min</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                </select>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">&nbsp;</label>
                <select
                  value={searchFilters.bedroomsMax}
                  onChange={(e) => setSearchFilters(prev => ({ ...prev, bedroomsMax: e.target.value }))}
                  className="w-full px-3 py-2 sm:py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm bg-white text-gray-900 touch-manipulation"
                >
                  <option value="no-max">No max</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10+</option>
                </select>
              </div>
            </div>

            {/* Search button */}
            <div className="flex justify-between items-center">
              <button 
                onClick={() => handleLocationSearch(searchFilters.location)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 sm:px-8 rounded-lg transition-colors text-sm w-full sm:w-auto touch-manipulation"
              >
                Search properties
              </button>
              
              {searchLocation && (
                <span className="text-sm text-gray-600 ml-4">
                  <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Showing properties near {searchFilters.location}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Results Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 sm:space-x-4">
              <span className="text-xs sm:text-sm text-gray-600">
                {sortedProperties.length} {sortedProperties.length === 1 ? 'property' : 'properties'}
              </span>
            </div>
            
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="flex border border-gray-300 rounded-lg">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 touch-manipulation ${viewMode === 'grid' ? 'bg-gray-900 text-white' : 'text-gray-600 hover:text-gray-900'}`}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 touch-manipulation ${viewMode === 'list' ? 'bg-gray-900 text-white' : 'text-gray-600 hover:text-gray-900'}`}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Properties */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {loading ? (
          <div className={`grid gap-4 sm:gap-6 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-sm border border-gray-200 animate-pulse">
                <div className="h-48 sm:h-64 bg-gray-200"></div>
                <div className="p-4 sm:p-6">
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                  <div className="h-6 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className={`grid gap-4 sm:gap-6 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
            {sortedProperties.map((property) => (
              <Link key={property.id} href={`/property/${property.id}`} className="group touch-manipulation">
                <div className={`bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300 active:scale-[0.98] ${
                  viewMode === 'list' ? 'sm:flex' : ''
                }`}>
                  <div className={`relative bg-gray-100 ${viewMode === 'list' ? 'sm:w-80 sm:h-64 h-48' : 'h-48 sm:h-64'}`}>
                    {/* Property Image Placeholder */}
                    <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                      <svg className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    
                    {/* Property Type Badge */}
                    <div className="absolute top-2 sm:top-3 left-2 sm:left-3">
                      <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-semibold text-white ${
                        property.listingType === 'sale' ? 'bg-blue-600' : 'bg-green-600'
                      }`}>
                        {property.listingType === 'sale' ? 'For Sale' : 'To Rent'}
                      </span>
                    </div>
                    
                    {/* Distance Badge */}
                    {searchLocation && property.address.coordinates && (
                      <div className="absolute top-2 sm:top-3 right-2 sm:right-3">
                        <span className="px-2 py-1 bg-black/75 text-white text-xs rounded-full">
                          {calculateDistance(
                            searchLocation.lat, searchLocation.lng,
                            property.address.coordinates.lat, property.address.coordinates.lng
                          ).toFixed(1)} miles
                        </span>
                      </div>
                    )}
                    
                    {/* Heart/Save Button */}
                    <div className={`absolute ${searchLocation && property.address.coordinates ? 'top-9 sm:top-10' : 'top-2 sm:top-3'} right-2 sm:right-3`}>
                      <button className="w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors touch-manipulation">
                        <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      </button>
                    </div>
                    
                    {/* Views Counter */}
                    <div className="absolute bottom-2 sm:bottom-3 right-2 sm:right-3 bg-black/50 text-white px-2 py-1 rounded text-xs">
                      {property.views} views
                    </div>
                  </div>
                  
                  <div className={`p-4 sm:p-6 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-base sm:text-lg text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                        {property.title}
                      </h3>
                    </div>
                    
                    <p className="text-gray-600 text-xs sm:text-sm mb-3 flex items-center">
                      <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {property.address.city}, {property.address.zipCode}
                    </p>
                    
                    <div className="flex items-center gap-3 sm:gap-4 text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4">
                      <span className="flex items-center">
                        <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                        </svg>
                        {property.bedrooms}
                      </span>
                      <span className="flex items-center">
                        <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                        </svg>
                        {property.bathrooms}
                      </span>
                      <span className="flex items-center">
                        <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                        </svg>
                        <span className="hidden sm:inline">{property.size.toLocaleString()} sqft</span>
                        <span className="sm:hidden">{property.size.toLocaleString()}</span>
                      </span>
                    </div>
                    
                    {viewMode === 'list' && (
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2 hidden sm:block">
                        {property.description}
                      </p>
                    )}
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xl sm:text-2xl font-bold text-gray-900">
                          £{property.price.toLocaleString()}
                          {property.listingType === 'rent' && <span className="text-xs sm:text-sm font-normal text-gray-500"> pcm</span>}
                        </p>
                      </div>
                      <div className="flex items-center text-blue-600 font-medium text-xs sm:text-sm">
                        <span className="hidden sm:inline">View Details</span>
                        <span className="sm:hidden">View</span>
                        <svg className="w-3 h-3 sm:w-4 sm:h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
        
        {/* No Results */}
        {!loading && sortedProperties.length === 0 && (
          <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No properties found</h3>
            <p className="text-gray-600">Try adjusting your search criteria or clear the filters to see more properties.</p>
          </div>
        )}
      </div>
    </div>
  )
} 