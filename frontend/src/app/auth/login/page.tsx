'use client'

import { useState, useEffect, Suspense } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { doc, setDoc, serverTimestamp } from 'firebase/firestore'
import { auth, db } from '@/lib/firebase'
import { useAuth } from '@/lib/auth'

function LoginForm() {
  const searchParams = useSearchParams()
  const { user } = useAuth()
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  // Redirect if user is already logged in
  useEffect(() => {
    if (user) {
      router.push('/')
    }
  }, [user, router])

  // Check URL parameters to set initial mode
  useEffect(() => {
    const mode = searchParams.get('mode')
    if (mode === 'signup') {
      setIsLogin(false)
    }
  }, [searchParams])

  // Don't render the form if user is already logged in
  if (user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-navy-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-navy-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Redirecting...</p>
        </div>
      </div>
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      if (isLogin) {
        // Sign in existing user
        const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password)
        console.log('User signed in:', userCredential.user)
        router.push('/')
      } else {
        // Sign up new user
        if (formData.password !== formData.confirmPassword) {
          throw new Error('Passwords do not match')
        }

        if (formData.password.length < 6) {
          throw new Error('Password must be at least 6 characters')
        }

        if (!formData.firstName.trim() || !formData.lastName.trim()) {
          throw new Error('First name and last name are required')
        }

        // Create user with Firebase Auth
        const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password)
        const user = userCredential.user

        // Update user profile with display name
        await updateProfile(user, {
          displayName: `${formData.firstName} ${formData.lastName}`
        })

        // Create user document in Firestore
        await setDoc(doc(db, 'users', user.uid), {
          id: user.uid,
          email: user.email,
          displayName: `${formData.firstName} ${formData.lastName}`,
          firstName: formData.firstName,
          lastName: formData.lastName,
          photoURL: user.photoURL || null,
          phoneNumber: user.phoneNumber || null,
          isVerified: false,
          kycStatus: 'pending',
          role: 'user',
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        })

        console.log('User created successfully:', user)
        router.push('/')
      }
    } catch (error: any) {
      console.error('Authentication error:', error)
      
      // Handle specific Firebase auth errors
      let errorMessage = 'An error occurred. Please try again.'
      
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'This email is already registered. Please sign in instead.'
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'Password is too weak. Please choose a stronger password.'
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Please enter a valid email address.'
      } else if (error.code === 'auth/user-not-found') {
        errorMessage = 'No account found with this email address.'
      } else if (error.code === 'auth/wrong-password') {
        errorMessage = 'Incorrect password. Please try again.'
      } else if (error.code === 'auth/too-many-requests') {
        errorMessage = 'Too many failed attempts. Please try again later.'
      } else if (error.message) {
        errorMessage = error.message
      }
      
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const signInWithGoogle = async () => {
    try {
      setLoading(true)
      setError('')
      
      const provider = new GoogleAuthProvider()
      const result = await signInWithPopup(auth, provider)
      const user = result.user

      // Create or update user document in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        id: user.uid,
        email: user.email,
        displayName: user.displayName,
        firstName: user.displayName?.split(' ')[0] || '',
        lastName: user.displayName?.split(' ').slice(1).join(' ') || '',
        photoURL: user.photoURL,
        phoneNumber: user.phoneNumber,
        isVerified: user.emailVerified,
        kycStatus: 'pending',
        role: 'user',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      }, { merge: true })

      console.log('Google sign-in successful:', user)
      router.push('/')
    } catch (error: any) {
      console.error('Google sign-in error:', error)
      setError('Failed to sign in with Google. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy-50 to-blue-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        <div className="p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome to SelfMove
            </h1>
            <p className="text-gray-600">
              {isLogin ? 'Sign in to your account' : 'Create your account'}
            </p>
          </div>

          {/* Toggle buttons */}
          <div className="flex bg-gray-100 rounded-lg p-1 mb-6">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-all ${
                isLogin
                  ? 'bg-navy-600 text-white'
                  : 'text-gray-600 hover:text-navy-600'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-all ${
                !isLogin
                  ? 'bg-navy-600 text-white'
                  : 'text-gray-600 hover:text-navy-600'
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Error message */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name fields for registration */}
            {!isLogin && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => updateFormData('firstName', e.target.value)}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-transparent text-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => updateFormData('lastName', e.target.value)}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-transparent text-gray-900"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => updateFormData('email', e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-transparent text-gray-900"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password *
              </label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => updateFormData('password', e.target.value)}
                required
                minLength={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-transparent text-gray-900"
              />
            </div>

            {/* Confirm password for registration */}
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password *
                </label>
                <input
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => updateFormData('confirmPassword', e.target.value)}
                  required
                  minLength={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-transparent text-gray-900"
                />
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-navy-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-navy-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {isLogin ? 'Signing in...' : 'Creating account...'}
                </span>
              ) : (
                isLogin ? 'Sign In' : 'Create Account'
              )}
            </button>
          </form>

          {/* Forgot Password Link */}
          {isLogin && (
            <div className="mt-4 text-center">
              <Link href="/auth/forgot-password" className="text-sm text-navy-600 hover:text-navy-700">
                Forgot your password?
              </Link>
            </div>
          )}

          {/* Social Login */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            <div className="mt-6">
              <button
                type="button"
                onClick={signInWithGoogle}
                disabled={loading}
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-lg bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="mr-2">📧</span>
                Google
              </button>
            </div>
          </div>

          {/* Terms for registration */}
          {!isLogin && (
            <p className="mt-6 text-xs text-gray-500 text-center">
              By creating an account, you agree to our{' '}
              <Link href="/terms" className="text-navy-600 hover:text-navy-700">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link href="/privacy" className="text-navy-600 hover:text-navy-700">
                Privacy Policy
              </Link>
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default function Login() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-navy-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-navy-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <LoginForm />
    </Suspense>
  )
} 