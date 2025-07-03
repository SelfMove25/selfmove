'use client'

import Link from 'next/link'
import Header from '@/components/Header'

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-green-50 overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-10 left-10 w-32 h-32 bg-blue-200/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-green-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-purple-200/20 rounded-full blur-2xl animate-pulse delay-500"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 lg:pt-24 pb-8 sm:pb-10 lg:pb-12 relative z-10">
          <div className="text-center">
            <div className="mb-4 sm:mb-6">
              <span className="inline-block text-2xl sm:text-3xl mb-2 animate-bounce">🏡</span>
              <div className="text-sm sm:text-base font-medium text-blue-600 bg-blue-100 px-4 py-2 rounded-full inline-block">
                ✨ No Agent Fees • Direct Deals • 100% Control
              </div>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight px-2 sm:px-0">
              Sell or let your property 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600"> directly</span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-8 sm:mb-12 max-w-3xl mx-auto font-light px-4 sm:px-0">
              Keep 100% of your property's value. Connect directly with buyers and tenants. 
              <span className="font-medium text-green-600">No agent fees, no commission.</span>
            </p>
            
            {/* Quick Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-8 sm:mb-12 px-4 sm:px-0">
              <Link 
                href="/list-property"
                className="group bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 touch-manipulation"
              >
                <span className="flex items-center justify-center">
                  🚀 List Your Property
                  <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </Link>
              <Link 
                href="/marketplace"
                className="group bg-white border-2 border-blue-600 text-blue-600 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg hover:bg-blue-50 transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 touch-manipulation"
              >
                <span className="flex items-center justify-center">
                  🔍 Browse Properties
                  <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 text-xs sm:text-sm text-gray-500 px-4 sm:px-0">
              <div className="flex items-center sm:flex-col sm:text-center bg-white/80 sm:bg-white/60 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-3 w-full sm:w-auto shadow-sm sm:shadow-md border border-white/20 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center justify-center w-8 h-8 sm:w-8 sm:h-8 bg-gradient-to-br from-green-400 to-green-600 sm:bg-gradient-to-br sm:from-green-400 sm:to-green-600 rounded-full mr-3 sm:mr-0 sm:mb-2 flex-shrink-0">
                  <svg className="w-5 h-5 sm:w-4 sm:h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="font-medium text-gray-700 sm:text-gray-600 text-sm sm:text-xs">✅ Verified Users Only</span>
              </div>
              <div className="flex items-center sm:flex-col sm:text-center bg-white/80 sm:bg-white/60 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-3 w-full sm:w-auto shadow-sm sm:shadow-md border border-white/20 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center justify-center w-8 h-8 sm:w-8 sm:h-8 bg-gradient-to-br from-blue-400 to-blue-600 sm:bg-gradient-to-br sm:from-blue-400 sm:to-blue-600 rounded-full mr-3 sm:mr-0 sm:mb-2 flex-shrink-0">
                  <svg className="w-5 h-5 sm:w-4 sm:h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="font-medium text-gray-700 sm:text-gray-600 text-sm sm:text-xs">🔐 Secure Transactions</span>
              </div>
              <div className="flex items-center sm:flex-col sm:text-center bg-white/80 sm:bg-white/60 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-3 w-full sm:w-auto shadow-sm sm:shadow-md border border-white/20 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center justify-center w-8 h-8 sm:w-8 sm:h-8 bg-gradient-to-br from-purple-400 to-purple-600 sm:bg-gradient-to-br sm:from-purple-400 sm:to-purple-600 rounded-full mr-3 sm:mr-0 sm:mb-2 flex-shrink-0">
                  <svg className="w-5 h-5 sm:w-4 sm:h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="font-medium text-gray-700 sm:text-gray-600 text-sm sm:text-xs">⭐ Professional Service</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Actions - Prioritizing Listing */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 pb-12 sm:pb-16">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-10">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
            <span className="text-2xl mr-2">🎯</span>
            Choose your path
          </h2>
          <p className="text-gray-600 text-sm sm:text-base">
            Whether you're selling or buying, we've got you covered
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Sell/Let Card - Primary (spans 2 columns) */}
          <Link href="/list-property" className="group lg:col-span-2 touch-manipulation">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 p-6 sm:p-8 lg:p-12 min-h-[320px] sm:h-96 flex flex-col justify-between hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] border border-green-100">
              <div className="absolute inset-0 bg-gradient-to-br from-green-400/5 to-emerald-400/10"></div>
              <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <span className="text-6xl">💰</span>
              </div>
              <div className="relative z-10">
                <div className="flex flex-col sm:flex-row sm:items-center mb-4 sm:mb-6 gap-3 sm:gap-0">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                    <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span className="sm:ml-4 text-base sm:text-lg font-bold text-green-700 bg-gradient-to-r from-green-100 to-emerald-100 px-3 sm:px-4 py-1 sm:py-2 rounded-full self-start border border-green-200">
                    💵 Make Money
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
                  <span className="mr-2">🏠</span>
                  List your property
                </h2>
                <p className="text-gray-600 text-base sm:text-lg mb-4 sm:mb-6 leading-relaxed">
                  Sell or let your property directly to qualified buyers and tenants. 
                  <span className="font-semibold text-green-600">Professional tools, maximum exposure, zero commission fees.</span>
                </p>
                <div className="bg-white/90 backdrop-blur-sm rounded-xl p-3 sm:p-4 mb-4 sm:mb-6 border border-green-100 group-hover:bg-white transition-colors">
                  <div className="grid grid-cols-2 gap-3 sm:gap-4 text-center">
                    <div className="group-hover:scale-110 transition-transform">
                      <div className="text-xl sm:text-2xl font-bold text-green-600 flex items-center justify-center">
                        <span className="mr-1">💷</span>£15k
                      </div>
                      <div className="text-xs sm:text-sm text-gray-600">Average Saving</div>
                    </div>
                    <div className="group-hover:scale-110 transition-transform">
                      <div className="text-xl sm:text-2xl font-bold text-green-600 flex items-center justify-center">
                        <span className="mr-1">⚡</span>48hrs
                      </div>
                      <div className="text-xs sm:text-sm text-gray-600">Average Listing Time</div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center text-green-600 font-semibold text-base sm:text-lg group-hover:text-green-700">
                  <span className="mr-2">🚀</span>
                  <span>Start listing for free</span>
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 ml-2 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </div>
          </Link>

          {/* Buy/Rent Card - Secondary */}
          <Link href="/marketplace" className="group touch-manipulation">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6 sm:p-8 lg:p-12 min-h-[280px] sm:h-96 flex flex-col justify-between hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] border border-blue-100">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400/5 to-indigo-400/10"></div>
              <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <span className="text-4xl">🔍</span>
              </div>
              <div className="relative z-10">
                <div className="flex flex-col sm:flex-row sm:items-center mb-3 sm:mb-4 gap-3 sm:gap-0">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <span className="sm:ml-3 text-sm font-bold text-blue-700 bg-gradient-to-r from-blue-100 to-indigo-100 px-3 py-1 rounded-full self-start border border-blue-200">
                    🏘️ Find Properties
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
                  <span className="mr-2">🏡</span>
                  Browse properties
                </h2>
                <p className="text-gray-600 text-base sm:text-lg mb-4 sm:mb-6">
                  Discover <span className="font-semibold text-blue-600">verified properties</span> from trusted owners and landlords.
                </p>
                <div className="flex items-center text-blue-600 font-semibold text-base group-hover:text-blue-700">
                  <span className="mr-2">🎯</span>
                  <span>Start browsing</span>
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 ml-2 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Value Proposition for Sellers */}
      <section className="bg-gradient-to-br from-gray-50 via-blue-50/30 to-green-50/30 py-16 relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <div className="absolute top-20 left-20 w-20 h-20 bg-blue-200/20 rounded-full blur-2xl"></div>
          <div className="absolute bottom-20 right-20 w-32 h-32 bg-green-200/20 rounded-full blur-2xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <div className="mb-4">
              <span className="text-3xl">🎉</span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Why property owners <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600">choose SelfMove</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join thousands of property owners who've <span className="font-semibold text-green-600">saved money</span> and <span className="font-semibold text-blue-600">maintained control</span>
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center group hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-red-400 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:rotate-12 transition-transform duration-300 shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                <span className="mr-2">🚫</span>
                Zero Agent Fees
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Keep 100% of your property's value. <span className="font-semibold text-red-600">No commission, no hidden fees, no surprises.</span>
              </p>
            </div>
            
            <div className="text-center group hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:rotate-12 transition-transform duration-300 shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                <span className="mr-2">🎯</span>
                Complete Control
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Set your own price, manage viewings, and <span className="font-semibold text-blue-600">negotiate directly with buyers.</span>
              </p>
            </div>
            
            <div className="text-center group hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:rotate-12 transition-transform duration-300 shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                <span className="mr-2">🛠️</span>
                Professional Tools
              </h3>
              <p className="text-gray-600 leading-relaxed">
                <span className="font-semibold text-green-600">Advanced listing tools, verified buyers,</span> and secure transaction processing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">10k+</div>
              <div className="text-gray-600">Properties Listed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">£2.1B+</div>
              <div className="text-gray-600">Transaction Value</div>
            </div>
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">25k+</div>
              <div className="text-gray-600">Happy Sellers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">£15k</div>
              <div className="text-gray-600">Average Saving</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">SelfMove</h3>
              <p className="text-gray-400">
                Professional property platform connecting buyers and sellers directly.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">For Sellers</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/list-property" className="hover:text-white transition-colors">List Property</Link></li>
                <li><Link href="/sell-guide" className="hover:text-white transition-colors">Selling Guide</Link></li>
                <li><Link href="/valuation" className="hover:text-white transition-colors">Property Valuation</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">For Buyers</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/marketplace" className="hover:text-white transition-colors">Browse Properties</Link></li>
                <li><Link href="/buy-guide" className="hover:text-white transition-colors">Buying Guide</Link></li>
                <li><Link href="/mortgage" className="hover:text-white transition-colors">Mortgage Calculator</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/help" className="hover:text-white transition-colors">Help Center</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
                <li><Link href="/legal" className="hover:text-white transition-colors">Legal</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 SelfMove. All rights reserved.</p>
          </div>
        </div>
      </footer>

    </div>
  )
} 