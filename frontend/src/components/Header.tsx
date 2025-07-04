'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useAuth } from '@/lib/auth'
import Logo from './Logo'

export default function Header() {
  const { user, loading, logout } = useAuth()
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleLogout = async () => {
    try {
      await logout()
      setUserMenuOpen(false)
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuOpen || mobileMenuOpen) {
        const target = event.target as HTMLElement
        if (!target.closest('.user-menu') && !target.closest('.mobile-menu') && !target.closest('.mobile-user-menu')) {
          setUserMenuOpen(false)
          setMobileMenuOpen(false)
        }
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [userMenuOpen, mobileMenuOpen])

  return (
    <header className="bg-white/95 backdrop-blur-sm border-b border-blue-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3 sm:py-4">
          <Logo size="md" showText={false} />
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/list-property" className="text-gray-700 hover:text-green-600 transition-colors font-medium relative group">
              <span className="mr-1">📝</span>
              List Property
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-green-500 to-emerald-500 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link href="/marketplace" className="text-gray-700 hover:text-blue-600 transition-colors font-medium relative group">
              <span className="mr-1">🔍</span>
              Browse Properties
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 group-hover:w-full transition-all duration-300"></span>
            </Link>
            
            {loading ? (
              // Loading state - show placeholder to prevent layout shift
              <div className="flex items-center space-x-3">
                <div className="w-16 h-8 bg-gradient-to-r from-blue-200 to-green-200 rounded-lg animate-pulse"></div>
                <div className="w-16 h-8 bg-gradient-to-r from-green-200 to-blue-200 rounded-lg animate-pulse"></div>
              </div>
            ) : user ? (
              // Logged in user menu
              <div className="relative user-menu">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 transition-colors group"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-green-500 text-white rounded-full flex items-center justify-center text-sm font-medium shadow-lg group-hover:shadow-xl group-hover:scale-105 transition-all duration-300">
                    {user.displayName ? user.displayName.charAt(0).toUpperCase() : user.email?.charAt(0).toUpperCase()}
                  </div>
                  <span className="font-medium">{user.displayName || 'Profile'}</span>
                  <svg className={`w-4 h-4 transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50 backdrop-blur-sm">
                    <div className="px-4 py-3 border-b border-gray-100 bg-white rounded-t-2xl">
                      <p className="text-sm font-bold text-gray-900">{user.displayName}</p>
                      <p className="text-sm text-gray-600">{user.email}</p>
                    </div>
                    
                    <Link href="/profile" className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors group">
                      <span className="mr-3">👤</span>
                      My Profile
                      <svg className="w-4 h-4 ml-auto group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                    
                    <Link href="/my-properties" className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors group">
                      <span className="mr-3">🏠</span>
                      My Properties
                      <svg className="w-4 h-4 ml-auto group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                    
                    <Link href="/liked-properties" className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors group">
                      <span className="mr-3">❤️</span>
                      Liked Properties
                      <svg className="w-4 h-4 ml-auto group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                    
                    <Link href="/offers" className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-colors group">
                      <span className="mr-3">📄</span>
                      My Offers
                      <svg className="w-4 h-4 ml-auto group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                    
                    <Link href="/settings" className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-600 transition-colors group">
                      <span className="mr-3">⚙️</span>
                      Settings
                      <svg className="w-4 h-4 ml-auto group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                    
                    <div className="border-t border-gray-100 mt-2 pt-2">
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors group"
                      >
                        <span className="mr-3">🚪</span>
                        Sign Out
                        <svg className="w-4 h-4 ml-auto group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              // Not logged in - show sign in/up buttons
              <div className="flex items-center space-x-3">
                <Link href="/auth/login" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                  <span className="mr-1">🔐</span>
                  Sign In
                </Link>
                <Link href="/auth/login?mode=signup" className="bg-gradient-to-r from-blue-600 to-green-600 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-green-700 transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                  <span className="mr-1">✨</span>
                  Sign Up
                </Link>
              </div>
            )}
          </nav>
          
          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center space-x-2">
            {loading ? (
              <div className="flex items-center space-x-2">
                <div className="w-16 h-8 bg-gradient-to-r from-blue-200 to-green-200 rounded-lg animate-pulse"></div>
                <div className="w-10 h-10 bg-gradient-to-br from-green-200 to-blue-200 rounded-full animate-pulse"></div>
              </div>
            ) : user ? (
              // Logged in user - show profile button
              <div className="relative mobile-user-menu">
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="flex items-center space-x-1 bg-gradient-to-r from-blue-600 to-green-600 text-white px-3 py-2 rounded-lg transition-all duration-300 hover:from-blue-700 hover:to-green-700 shadow-lg hover:shadow-xl"
                >
                  <div className="w-6 h-6 bg-white text-gray-900 rounded-full flex items-center justify-center text-xs font-bold">
                    {user.displayName ? user.displayName.charAt(0).toUpperCase() : user.email?.charAt(0).toUpperCase()}
                  </div>
                  <svg className={`w-4 h-4 text-white transition-transform ${mobileMenuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
            ) : (
              // Not logged in - show sign in button and hamburger menu
              <>
                <Link href="/auth/login" className="bg-gradient-to-r from-blue-600 to-green-600 text-white p-2 rounded-lg flex items-center justify-center hover:from-blue-700 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-xl">
                  <span className="text-sm">🔐</span>
                </Link>
                <div className="mobile-menu">
                  <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className={`p-2 rounded-lg transition-all duration-300 ${
                      mobileMenuOpen 
                        ? 'bg-gradient-to-r from-blue-600 to-green-600 text-white shadow-lg' 
                        : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                    }`}
                  >
                    {mobileMenuOpen ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                      </svg>
                    )}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-sm border-t border-blue-100 px-4 py-3 mobile-menu">
          <div className="space-y-1">
            {loading ? (
              // Loading state
              <div className="px-3 py-2 border-t border-gray-200">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-200 to-green-200 rounded-full animate-pulse"></div>
                  <div className="space-y-1">
                    <div className="w-20 h-4 bg-gradient-to-r from-blue-200 to-green-200 rounded animate-pulse"></div>
                    <div className="w-16 h-3 bg-gradient-to-r from-green-200 to-blue-200 rounded animate-pulse"></div>
                  </div>
                </div>
              </div>
            ) : user ? (
              // Logged in user menu
              <>
                <div className="px-3 py-3 bg-white rounded-xl mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-green-500 text-white rounded-full flex items-center justify-center text-sm font-medium shadow-lg">
                      {user.displayName ? user.displayName.charAt(0).toUpperCase() : user.email?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900">{user.displayName}</p>
                      <p className="text-xs text-gray-600">{user.email}</p>
                    </div>
                  </div>
                </div>
                
                <Link href="/profile" className="flex items-center px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                  <span className="mr-3">👤</span>
                  My Profile
                </Link>
                <Link href="/my-properties" className="flex items-center px-3 py-2 text-gray-700 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                  <span className="mr-3">🏠</span>
                  My Properties
                </Link>
                <Link href="/liked-properties" className="flex items-center px-3 py-2 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                  <span className="mr-3">❤️</span>
                  Liked Properties
                </Link>
                <Link href="/offers" className="flex items-center px-3 py-2 text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors">
                  <span className="mr-3">📄</span>
                  My Offers
                </Link>
                <Link href="/settings" className="flex items-center px-3 py-2 text-gray-700 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                  <span className="mr-3">⚙️</span>
                  Settings
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <span className="mr-3">🚪</span>
                  Sign Out
                </button>
              </>
            ) : (
              // Not logged in - show navigation options
              <>
                <Link href="/list-property" className="flex items-center px-3 py-2 text-gray-700 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                  <span className="mr-3">📝</span>
                  List Property
                </Link>
                <Link href="/marketplace" className="flex items-center px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                  <span className="mr-3">🔍</span>
                  Browse Properties
                </Link>
                <Link href="/auth/login?mode=signup" className="flex items-center px-3 py-2 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-lg hover:from-blue-700 hover:to-green-700 transition-all duration-300 shadow-lg">
                  <span className="mr-3">✨</span>
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  )
} 