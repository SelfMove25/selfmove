'use client'

import { useState } from 'react'
import Link from 'next/link'
import Header from '@/components/Header'

export default function ListProperty() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Basic Info
    title: '',
    description: '',
    price: '',
    type: '',
    listingType: '',
    tenure: '',
    
    // Location
    street: '',
    city: '',
    zipCode: '',
    
    // Details  
    bedrooms: '',
    bathrooms: '',
    size: '',
    sizeUnit: 'sqft',
    receptions: '',
    
    // Key Features (bullet points)
    keyFeatures: [] as string[],
    
    // Property Features
    features: [] as string[],
    customFeatures: [] as string[],
    
    // Additional Details
    councilTax: '',
    councilTaxBand: '',
    epcRating: '',
    parking: '',
    parkingSpaces: '',
    garden: '',
    gardenSize: '',
    accessibility: '',
    
    // Outside & Extras
    outsideFeatures: [] as string[],
    
    // Location Highlights
    locationHighlights: '',
    nearbyTransport: [] as string[],
    nearbySchools: [] as string[],
    nearbyAmenities: [] as string[],
    
    // Additional Info
    chainFree: false,
    newBuild: false,
    sharedOwnership: false,
    
    // Utilities & Tech
    broadbandSpeed: '',
    utilities: [] as string[],
    smartTech: [] as string[],
    
    // Images
    images: [] as File[]
  })

  const propertyFeatures = [
    'Parking', 'Garden', 'Balcony', 'Terrace', 'Garage', 'Furnished', 
    'Pet Friendly', 'Recently Renovated', 'Central Heating', 'Air Conditioning',
    'Fireplace', 'Double Glazing', 'En-Suite', 'Walk-in Wardrobe', 'Utility Room',
    'Study/Office', 'Conservatory', 'Basement', 'Loft Conversion', 'Annex',
    'Swimming Pool', 'Gym', 'Tennis Court', 'Concierge', 'Security System',
    'CCTV', 'Alarm System', 'Gated Community', 'Porter', 'Lift'
  ]

  const outsideFeatures = [
    'Private Garden', 'Shared Garden', 'Landscaped Garden', 'Patio', 'Decking',
    'Driveway', 'Off-Street Parking', 'Garage', 'Carport', 'Bicycle Storage',
    'Outbuilding', 'Shed', 'Greenhouse', 'Summer House', 'Hot Tub', 'Barbecue Area'
  ]

  const smartTechFeatures = [
    'Smart Home System', 'Hive Heating', 'Hue Lighting', 'Smart Doorbell',
    'Smart Locks', 'CCTV System', 'Intercom System', 'Underfloor Heating',
    'Solar Panels', 'Electric Car Charging Point', 'Home Automation'
  ]

  const utilityFeatures = [
    'Gas Central Heating', 'Electric Heating', 'Oil Heating', 'Underfloor Heating',
    'Mains Gas', 'Mains Electricity', 'Mains Water', 'Mains Drainage',
    'Septic Tank', 'Private Water Supply', 'Renewable Energy'
  ]

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleFeatureToggle = (feature: string) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter(f => f !== feature)
        : [...prev.features, feature]
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log('Form submitted:', formData)
    // Navigate to success page or show success message
  }

  const nextStep = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const getStepTitle = (step: number) => {
    switch (step) {
      case 1: return 'Property Details'
      case 2: return 'Location & Address'
      case 3: return 'Features & Specifications'
      case 4: return 'Location Highlights'
      case 5: return 'Photos & Review'
      default: return ''
    }
  }

  // Helper functions for array handling
  const handleArrayFeatureToggle = (featureArray: string[], feature: string, setterName: string) => {
    const newArray = featureArray.includes(feature)
      ? featureArray.filter(f => f !== feature)
      : [...featureArray, feature];
    setFormData(prev => ({ ...prev, [setterName]: newArray }));
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/50 via-white to-green-50/50">
      <Header />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="text-center mb-8 relative">
          <div className="mb-4">
            <span className="text-4xl animate-bounce">🏡</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            List your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600">property</span>
          </h1>
          <p className="text-lg text-gray-600">
            Create a <span className="font-semibold text-blue-600">professional listing</span> and connect directly with qualified buyers and tenants
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {[1, 2, 3, 4, 5].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full font-bold text-sm transition-all duration-300 ${
                  step <= currentStep 
                    ? 'bg-gradient-to-r from-blue-600 to-green-600 text-white shadow-lg transform scale-110' 
                    : 'bg-gray-200 text-gray-500 hover:bg-gray-300'
                }`}>
                  {step < currentStep ? (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    step
                  )}
                </div>
                {step < 5 && (
                  <div className={`flex-1 h-1 mx-4 rounded-full transition-all duration-300 ${
                    step < currentStep ? 'bg-gradient-to-r from-blue-600 to-green-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4">
            <span className="text-sm text-gray-600 font-medium flex items-center">
              <span className="mr-1">📋</span>
              Details
            </span>
            <span className="text-sm text-gray-600 font-medium flex items-center">
              <span className="mr-1">📍</span>
              Location
            </span>
            <span className="text-sm text-gray-600 font-medium flex items-center">
              <span className="mr-1">⭐</span>
              Features
            </span>
            <span className="text-sm text-gray-600 font-medium flex items-center">
              <span className="mr-1">🎯</span>
              Highlights
            </span>
            <span className="text-sm text-gray-600 font-medium flex items-center">
              <span className="mr-1">📸</span>
              Review
            </span>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Step Header */}
          <div className="bg-gray-50 px-8 py-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900">
              {getStepTitle(currentStep)}
            </h2>
            <p className="text-gray-600 mt-1">
              Step {currentStep} of 4
            </p>
          </div>

          <div className="px-8 py-8">
            {/* Step 1: Property Details */}
            {currentStep === 1 && (
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      I want to
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => handleInputChange('listingType', 'sale')}
                        className={`p-4 rounded-xl border-2 text-left transition-all ${
                          formData.listingType === 'sale'
                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="font-semibold">Sell</div>
                        <div className="text-sm text-gray-600">List for sale</div>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleInputChange('listingType', 'rent')}
                        className={`p-4 rounded-xl border-2 text-left transition-all ${
                          formData.listingType === 'rent'
                            ? 'border-green-500 bg-green-50 text-green-700'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="font-semibold">Let</div>
                        <div className="text-sm text-gray-600">List for rent</div>
                      </button>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Property Type
                    </label>
                    <select
                      value={formData.type}
                      onChange={(e) => handleInputChange('type', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-transparent text-gray-900"
                      required
                    >
                      <option value="">Select type</option>
                      <option value="detached">Detached House</option>
                      <option value="semi-detached">Semi-Detached House</option>
                      <option value="terraced">Terraced House</option>
                      <option value="end-terrace">End of Terrace House</option>
                      <option value="townhouse">Town House</option>
                      <option value="cottage">Cottage</option>
                      <option value="bungalow">Bungalow</option>
                      <option value="apartment">Apartment</option>
                      <option value="flat">Flat</option>
                      <option value="maisonette">Maisonette</option>
                      <option value="penthouse">Penthouse</option>
                      <option value="studio">Studio</option>
                      <option value="duplex">Duplex</option>
                      <option value="new-build">New Build</option>
                      <option value="conversion">Conversion</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Tenure
                    </label>
                    <select
                      value={formData.tenure}
                      onChange={(e) => handleInputChange('tenure', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-transparent text-gray-900"
                      required
                    >
                      <option value="">Select tenure</option>
                      <option value="freehold">Freehold</option>
                      <option value="leasehold">Leasehold</option>
                      <option value="commonhold">Commonhold</option>
                      <option value="shared-freehold">Shared Freehold</option>
                      <option value="shared-ownership">Shared Ownership</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Property Title
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    placeholder="e.g., Modern Three-Bedroom Family Home with Garden"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-transparent text-gray-900"
                    required
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Create an engaging title that highlights your property&apos;s best features
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    {formData.listingType === 'rent' ? 'Monthly Rent (£)' : 'Sale Price (£)'}
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-3 text-gray-500">£</span>
                    <input
                      type="number"
                      value={formData.price}
                      onChange={(e) => handleInputChange('price', e.target.value)}
                      placeholder={formData.listingType === 'rent' ? '2,500' : '450,000'}
                      className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-transparent text-gray-900"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Describe your property&apos;s key features, condition, location benefits, and what makes it special..."
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-transparent resize-none text-gray-900"
                    required
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Include details about nearby amenities, transport links, and unique selling points
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Key Features (Bullet Points)
                  </label>
                  <div className="space-y-2">
                    {formData.keyFeatures.map((feature, index) => (
                      <div key={index} className="flex gap-2">
                        <input
                          type="text"
                          value={feature}
                          onChange={(e) => {
                            const newKeyFeatures = [...formData.keyFeatures];
                            newKeyFeatures[index] = e.target.value;
                            setFormData(prev => ({ ...prev, keyFeatures: newKeyFeatures }));
                          }}
                          placeholder="e.g., 6 Bedrooms, 3 Bathrooms, Corner Plot"
                          className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-transparent text-gray-900"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const newKeyFeatures = formData.keyFeatures.filter((_, i) => i !== index);
                            setFormData(prev => ({ ...prev, keyFeatures: newKeyFeatures }));
                          }}
                          className="px-3 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, keyFeatures: [...prev.keyFeatures, ''] }))}
                      className="w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-600 hover:border-gray-400 hover:text-gray-700 transition-colors"
                    >
                      + Add Key Feature
                    </button>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    These will appear as bullet points at the top of your listing
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="chainFree"
                      checked={formData.chainFree}
                      onChange={(e) => setFormData(prev => ({ ...prev, chainFree: e.target.checked }))}
                      className="w-4 h-4 text-gray-900 bg-gray-100 border-gray-300 rounded focus:ring-gray-900 focus:ring-2"
                    />
                    <label htmlFor="chainFree" className="ml-2 text-sm font-medium text-gray-900">
                      Chain Free
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="newBuild"
                      checked={formData.newBuild}
                      onChange={(e) => setFormData(prev => ({ ...prev, newBuild: e.target.checked }))}
                      className="w-4 h-4 text-gray-900 bg-gray-100 border-gray-300 rounded focus:ring-gray-900 focus:ring-2"
                    />
                    <label htmlFor="newBuild" className="ml-2 text-sm font-medium text-gray-900">
                      New Build
                    </label>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="sharedOwnership"
                      checked={formData.sharedOwnership}
                      onChange={(e) => setFormData(prev => ({ ...prev, sharedOwnership: e.target.checked }))}
                      className="w-4 h-4 text-gray-900 bg-gray-100 border-gray-300 rounded focus:ring-gray-900 focus:ring-2"
                    />
                    <label htmlFor="sharedOwnership" className="ml-2 text-sm font-medium text-gray-900">
                      Shared Ownership
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Location */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Street Address
                  </label>
                  <input
                    type="text"
                    value={formData.street}
                    onChange={(e) => handleInputChange('street', e.target.value)}
                    placeholder="e.g., 123 Oak Street"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-transparent text-gray-900"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      City/Town
                    </label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      placeholder="e.g., London"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-transparent text-gray-900"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Postcode
                    </label>
                    <input
                      type="text"
                      value={formData.zipCode}
                      onChange={(e) => handleInputChange('zipCode', e.target.value)}
                      placeholder="e.g., SW1A 1AA"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-transparent text-gray-900"
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Features & Specifications */}
            {currentStep === 3 && (
              <div className="space-y-6">
                {/* Basic Property Details */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Property Specifications</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Bedrooms</label>
                      <select
                        value={formData.bedrooms}
                        onChange={(e) => handleInputChange('bedrooms', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent text-sm bg-white text-gray-900"
                        required
                      >
                        <option value="">Select</option>
                        <option value="studio">Studio</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8+">8+</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Bathrooms</label>
                      <select
                        value={formData.bathrooms}
                        onChange={(e) => handleInputChange('bathrooms', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent text-sm bg-white text-gray-900"
                        required
                      >
                        <option value="">Select</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6+">6+</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Reception Rooms</label>
                      <select
                        value={formData.receptions}
                        onChange={(e) => handleInputChange('receptions', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent text-sm bg-white text-gray-900"
                      >
                        <option value="">Select</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5+">5+</option>
                      </select>
                    </div>
                    
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Size</label>
                      <div className="flex gap-2">
                        <input
                          type="number"
                          value={formData.size}
                          onChange={(e) => handleInputChange('size', e.target.value)}
                          placeholder="1200"
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent text-sm text-gray-900"
                        />
                        <select
                          value={formData.sizeUnit}
                          onChange={(e) => handleInputChange('sizeUnit', e.target.value)}
                          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent text-sm bg-white text-gray-900 min-w-[80px]"
                        >
                          <option value="sqft">sq ft</option>
                          <option value="sqm">sq m</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Property Details */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Property Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Council Tax Band</label>
                      <select
                        value={formData.councilTaxBand}
                        onChange={(e) => handleInputChange('councilTaxBand', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent text-sm bg-white text-gray-900"
                      >
                        <option value="">Select band</option>
                        <option value="A">Band A</option>
                        <option value="B">Band B</option>
                        <option value="C">Band C</option>
                        <option value="D">Band D</option>
                        <option value="E">Band E</option>
                        <option value="F">Band F</option>
                        <option value="G">Band G</option>
                        <option value="H">Band H</option>
                        <option value="ask-agent">Ask Agent</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">EPC Rating</label>
                      <select
                        value={formData.epcRating}
                        onChange={(e) => handleInputChange('epcRating', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent text-sm bg-white text-gray-900"
                      >
                        <option value="">Select rating</option>
                        <option value="A">A (92-100)</option>
                        <option value="B">B (81-91)</option>
                        <option value="C">C (69-80)</option>
                        <option value="D">D (55-68)</option>
                        <option value="E">E (39-54)</option>
                        <option value="F">F (21-38)</option>
                        <option value="G">G (1-20)</option>
                        <option value="exempt">Exempt</option>
                        <option value="ask-agent">Ask Agent</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Parking</label>
                      <select
                        value={formData.parking}
                        onChange={(e) => handleInputChange('parking', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent text-sm bg-white text-gray-900"
                      >
                        <option value="">Select parking</option>
                        <option value="no-parking">No Parking</option>
                        <option value="on-street">On-Street Parking</option>
                        <option value="off-street">Off-Street Parking</option>
                        <option value="driveway">Driveway</option>
                        <option value="garage">Garage</option>
                        <option value="multiple-spaces">Multiple Spaces</option>
                        <option value="residents-permit">Residents Permit</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Garden</label>
                      <select
                        value={formData.garden}
                        onChange={(e) => handleInputChange('garden', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent text-sm bg-white text-gray-900"
                      >
                        <option value="">Select garden</option>
                        <option value="no">No Garden</option>
                        <option value="yes">Yes</option>
                        <option value="private">Private Garden</option>
                        <option value="shared">Shared Garden</option>
                        <option value="front">Front Garden</option>
                        <option value="rear">Rear Garden</option>
                        <option value="front-and-rear">Front & Rear</option>
                        <option value="communal">Communal Garden</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Property Features - Compact */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Property Features</h3>
                  
                  {/* Most Common Features */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Common Features</label>
                    <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                      {['Balcony', 'Central Heating', 'Double Glazing', 'Furnished', 'Pet Friendly', 'Recently Renovated'].map((feature) => (
                        <button
                          key={feature}
                          type="button"
                          onClick={() => handleFeatureToggle(feature)}
                          className={`p-2 rounded-lg border text-xs font-medium transition-all ${
                            formData.features.includes(feature)
                              ? 'border-gray-900 bg-gray-900 text-white'
                              : 'border-gray-300 bg-white hover:border-gray-400 text-gray-700'
                          }`}
                        >
                          {feature}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Additional Features Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Indoor Features */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Indoor</label>
                      <div className="space-y-1">
                        {['En-Suite', 'Walk-in Wardrobe', 'Utility Room', 'Study/Office', 'Conservatory', 'Basement', 'Loft Conversion'].map((feature) => (
                          <label key={feature} className="flex items-center">
                            <input
                              type="checkbox"
                              checked={formData.features.includes(feature)}
                              onChange={() => handleFeatureToggle(feature)}
                              className="w-4 h-4 text-gray-900 bg-gray-100 border-gray-300 rounded focus:ring-gray-900 focus:ring-2"
                            />
                            <span className="ml-2 text-sm text-gray-700">{feature}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Outdoor Features */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Outdoor</label>
                      <div className="space-y-1">
                        {['Private Garden', 'Shared Garden', 'Patio', 'Decking', 'Driveway', 'Bicycle Storage', 'Outbuilding'].map((feature) => (
                          <label key={feature} className="flex items-center">
                            <input
                              type="checkbox"
                              checked={formData.outsideFeatures.includes(feature)}
                              onChange={() => {
                                const newOutsideFeatures = formData.outsideFeatures.includes(feature)
                                  ? formData.outsideFeatures.filter(f => f !== feature)
                                  : [...formData.outsideFeatures, feature];
                                setFormData(prev => ({ ...prev, outsideFeatures: newOutsideFeatures }));
                              }}
                              className="w-4 h-4 text-gray-900 bg-gray-100 border-gray-300 rounded focus:ring-gray-900 focus:ring-2"
                            />
                            <span className="ml-2 text-sm text-gray-700">{feature}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Technology & Energy */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Technology & Energy</label>
                      <div className="space-y-1">
                        {['Smart Home System', 'Solar Panels', 'Underfloor Heating', 'Electric Car Charging', 'CCTV System', 'Security System', 'Fiber Broadband'].map((feature) => (
                          <label key={feature} className="flex items-center">
                            <input
                              type="checkbox"
                              checked={formData.smartTech.includes(feature)}
                              onChange={() => {
                                const newSmartTech = formData.smartTech.includes(feature)
                                  ? formData.smartTech.filter(f => f !== feature)
                                  : [...formData.smartTech, feature];
                                setFormData(prev => ({ ...prev, smartTech: newSmartTech }));
                              }}
                              className="w-4 h-4 text-gray-900 bg-gray-100 border-gray-300 rounded focus:ring-gray-900 focus:ring-2"
                            />
                            <span className="ml-2 text-sm text-gray-700">{feature}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Custom Features */}
                  <div className="mt-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Custom Features</label>
                    <p className="text-xs text-gray-500 mb-3">Add any unique features not listed above</p>
                    <div className="space-y-2">
                      {formData.customFeatures.map((feature, index) => (
                        <div key={index} className="flex gap-2">
                          <input
                            type="text"
                            value={feature}
                            onChange={(e) => {
                              const newCustomFeatures = [...formData.customFeatures];
                              newCustomFeatures[index] = e.target.value;
                              setFormData(prev => ({ ...prev, customFeatures: newCustomFeatures }));
                            }}
                            placeholder="e.g., Wine Cellar, Home Cinema, Granny Annexe"
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent text-sm text-gray-900"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const newCustomFeatures = formData.customFeatures.filter((_, i) => i !== index);
                              setFormData(prev => ({ ...prev, customFeatures: newCustomFeatures }));
                            }}
                            className="px-2 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, customFeatures: [...prev.customFeatures, ''] }))}
                        className="w-full px-3 py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-gray-400 text-sm"
                      >
                        + Add Custom Feature
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Location Highlights */}
            {currentStep === 4 && (
              <div className="space-y-8">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Location Highlights
                  </label>
                  <textarea
                    value={formData.locationHighlights}
                    onChange={(e) => handleInputChange('locationHighlights', e.target.value)}
                    placeholder="Describe the area's key benefits, local amenities, transport links, schools, shopping, dining, parks..."
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-transparent resize-none text-gray-900"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Highlight what makes this location desirable and convenient
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-4">
                      Nearby Transport
                    </label>
                    <div className="space-y-2">
                      {formData.nearbyTransport.map((transport, index) => (
                        <div key={index} className="flex gap-2">
                          <input
                            type="text"
                            value={transport}
                            onChange={(e) => {
                              const newTransport = [...formData.nearbyTransport];
                              newTransport[index] = e.target.value;
                              setFormData(prev => ({ ...prev, nearbyTransport: newTransport }));
                            }}
                            placeholder="e.g., Highams Park Station (0.3 miles)"
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent text-sm text-gray-900"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const newTransport = formData.nearbyTransport.filter((_, i) => i !== index);
                              setFormData(prev => ({ ...prev, nearbyTransport: newTransport }));
                            }}
                            className="px-2 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, nearbyTransport: [...prev.nearbyTransport, ''] }))}
                        className="w-full px-3 py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-gray-400 text-sm"
                      >
                        + Add Transport Link
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-4">
                      Nearby Schools
                    </label>
                    <div className="space-y-2">
                      {formData.nearbySchools.map((school, index) => (
                        <div key={index} className="flex gap-2">
                          <input
                            type="text"
                            value={school}
                            onChange={(e) => {
                              const newSchools = [...formData.nearbySchools];
                              newSchools[index] = e.target.value;
                              setFormData(prev => ({ ...prev, nearbySchools: newSchools }));
                            }}
                            placeholder="e.g., Selwyn Primary School (0.2 miles)"
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent text-sm text-gray-900"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const newSchools = formData.nearbySchools.filter((_, i) => i !== index);
                              setFormData(prev => ({ ...prev, nearbySchools: newSchools }));
                            }}
                            className="px-2 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, nearbySchools: [...prev.nearbySchools, ''] }))}
                        className="w-full px-3 py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-gray-400 text-sm"
                      >
                        + Add School
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-4">
                      Nearby Amenities
                    </label>
                    <div className="space-y-2">
                      {formData.nearbyAmenities.map((amenity, index) => (
                        <div key={index} className="flex gap-2">
                          <input
                            type="text"
                            value={amenity}
                            onChange={(e) => {
                              const newAmenities = [...formData.nearbyAmenities];
                              newAmenities[index] = e.target.value;
                              setFormData(prev => ({ ...prev, nearbyAmenities: newAmenities }));
                            }}
                            placeholder="e.g., Tesco Superstore (0.4 miles)"
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent text-sm text-gray-900"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const newAmenities = formData.nearbyAmenities.filter((_, i) => i !== index);
                              setFormData(prev => ({ ...prev, nearbyAmenities: newAmenities }));
                            }}
                            className="px-2 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, nearbyAmenities: [...prev.nearbyAmenities, ''] }))}
                        className="w-full px-3 py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-gray-400 text-sm"
                      >
                        + Add Amenity
                      </button>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Broadband Speed (optional)
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <input
                      type="text"
                      value={formData.broadbandSpeed}
                      onChange={(e) => handleInputChange('broadbandSpeed', e.target.value)}
                      placeholder="e.g., Up to 1000 Mbps (Fibre)"
                      className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-900 focus:border-transparent text-gray-900"
                    />
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    Include available broadband speeds and providers if known
                  </p>
                </div>
              </div>
            )}

            {/* Step 5: Images and Review */}
            {currentStep === 5 && (
              <div className="space-y-8">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-4">
                    Property Photos
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-2xl p-12 text-center hover:border-gray-400 transition-colors">
                    <svg className="mx-auto h-16 w-16 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                      <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <p className="mt-4 text-lg font-medium text-gray-900">
                      Upload property photos
                    </p>
                    <p className="text-gray-600 mt-2">
                      Drag and drop your images here, or click to browse
                    </p>
                    <p className="text-sm text-gray-500 mt-4">
                      PNG, JPG, JPEG up to 10MB each • Maximum 20 photos
                    </p>
                    <button
                      type="button"
                      className="mt-6 bg-gray-900 text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition-colors font-medium"
                    >
                      Choose Files
                    </button>
                  </div>
                </div>

                {/* Comprehensive Listing Summary */}
                <div className="bg-gray-50 rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-6">Complete Listing Summary</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Property Details</h4>
                      <div className="space-y-2 text-sm">
                        <p><span className="text-gray-600 font-medium">Title:</span> {formData.title || 'Not specified'}</p>
                        <p><span className="text-gray-600 font-medium">Type:</span> {formData.type || 'Not specified'}</p>
                        <p><span className="text-gray-600 font-medium">Tenure:</span> {formData.tenure || 'Not specified'}</p>
                        <p><span className="text-gray-600 font-medium">Listing:</span> {formData.listingType === 'sale' ? 'For Sale' : formData.listingType === 'rent' ? 'For Rent' : 'Not specified'}</p>
                        <p><span className="text-gray-600 font-medium">Price:</span> £{formData.price ? parseInt(formData.price).toLocaleString() : 'Not specified'}</p>
                        {formData.chainFree && <p className="text-green-700 font-medium">✓ Chain Free</p>}
                        {formData.newBuild && <p className="text-blue-700 font-medium">✓ New Build</p>}
                        {formData.sharedOwnership && <p className="text-purple-700 font-medium">✓ Shared Ownership</p>}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Specifications</h4>
                      <div className="space-y-2 text-sm">
                        <p><span className="text-gray-600 font-medium">Location:</span> {formData.city ? `${formData.street}, ${formData.city}, ${formData.zipCode}` : 'Not specified'}</p>
                        <p><span className="text-gray-600 font-medium">Bedrooms:</span> {formData.bedrooms || 'Not specified'}</p>
                        <p><span className="text-gray-600 font-medium">Bathrooms:</span> {formData.bathrooms || 'Not specified'}</p>
                        <p><span className="text-gray-600 font-medium">Receptions:</span> {formData.receptions || 'Not specified'}</p>
                        <p><span className="text-gray-600 font-medium">Size:</span> {formData.size ? `${formData.size} ${formData.sizeUnit}` : 'Not specified'}</p>
                        <p><span className="text-gray-600 font-medium">Council Tax:</span> {formData.councilTaxBand ? `Band ${formData.councilTaxBand}` : 'Not specified'}</p>
                        <p><span className="text-gray-600 font-medium">EPC Rating:</span> {formData.epcRating || 'Not specified'}</p>
                        <p><span className="text-gray-600 font-medium">Parking:</span> {formData.parking || 'Not specified'}</p>
                        <p><span className="text-gray-600 font-medium">Garden:</span> {formData.garden || 'Not specified'}</p>
                      </div>
                    </div>
                  </div>

                  {formData.keyFeatures.length > 0 && (
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-3">Key Features</h4>
                      <ul className="list-disc list-inside text-sm space-y-1">
                        {formData.keyFeatures.filter(f => f.trim()).map((feature, index) => (
                          <li key={index} className="text-gray-700">{feature}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {formData.features.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Property Features</h4>
                        <div className="flex flex-wrap gap-2">
                          {formData.features.map((feature) => (
                            <span key={feature} className="px-2 py-1 bg-gray-200 text-gray-700 rounded text-xs">
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {formData.outsideFeatures.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Outside Features</h4>
                        <div className="flex flex-wrap gap-2">
                          {formData.outsideFeatures.map((feature) => (
                            <span key={feature} className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {formData.smartTech.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Smart Technology</h4>
                        <div className="flex flex-wrap gap-2">
                          {formData.smartTech.map((feature) => (
                            <span key={feature} className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {formData.utilities.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Utilities</h4>
                        <div className="flex flex-wrap gap-2">
                          {formData.utilities.map((feature) => (
                            <span key={feature} className="px-2 py-1 bg-orange-100 text-orange-700 rounded text-xs">
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {(formData.nearbyTransport.length > 0 || formData.nearbySchools.length > 0 || formData.nearbyAmenities.length > 0) && (
                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <h4 className="font-semibold text-gray-900 mb-4">Location Information</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {formData.nearbyTransport.filter(t => t.trim()).length > 0 && (
                          <div>
                            <h5 className="font-medium text-gray-800 mb-2">Transport</h5>
                            <ul className="text-sm space-y-1">
                              {formData.nearbyTransport.filter(t => t.trim()).map((transport, index) => (
                                <li key={index} className="text-gray-600">• {transport}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                        
                        {formData.nearbySchools.filter(s => s.trim()).length > 0 && (
                          <div>
                            <h5 className="font-medium text-gray-800 mb-2">Schools</h5>
                            <ul className="text-sm space-y-1">
                              {formData.nearbySchools.filter(s => s.trim()).map((school, index) => (
                                <li key={index} className="text-gray-600">• {school}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                        
                        {formData.nearbyAmenities.filter(a => a.trim()).length > 0 && (
                          <div>
                            <h5 className="font-medium text-gray-800 mb-2">Amenities</h5>
                            <ul className="text-sm space-y-1">
                              {formData.nearbyAmenities.filter(a => a.trim()).map((amenity, index) => (
                                <li key={index} className="text-gray-600">• {amenity}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                      {formData.broadbandSpeed && (
                        <div className="mt-4 text-sm">
                          <span className="font-medium text-gray-800">Broadband:</span>
                          <span className="text-gray-600 ml-2">{formData.broadbandSpeed}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="bg-gray-50 px-8 py-6 border-t border-gray-200 flex justify-between">
            <button
              type="button"
              onClick={prevStep}
              disabled={currentStep === 1}
              className={`px-6 py-3 rounded-xl font-medium transition-colors ${
                currentStep === 1
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              Previous
            </button>
            
            {currentStep < 5 ? (
              <button
                type="button"
                onClick={nextStep}
                className="px-6 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-colors font-medium"
              >
                Next Step
              </button>
            ) : (
              <button
                type="submit"
                className="px-8 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-colors font-medium"
              >
                Publish Listing
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
} 