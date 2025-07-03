'use client'

import { useEffect, useState } from 'react'
import { auth, db } from '@/lib/firebase'
import { connectAuthEmulator } from 'firebase/auth'
import { connectFirestoreEmulator } from 'firebase/firestore'

export default function FirebaseTest() {
  const [config, setConfig] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    try {
      // Check Firebase configuration
      const firebaseConfig = {
        apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
        authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
      }
      
      setConfig(firebaseConfig)
      
      // Test Firebase connection
      console.log('Firebase Auth:', auth)
      console.log('Firebase DB:', db)
      console.log('Firebase Config:', firebaseConfig)
      
    } catch (error: any) {
      setError(error.message)
      console.error('Firebase configuration error:', error)
    }
  }, [])

  if (process.env.NODE_ENV !== 'development') {
    return null // Only show in development
  }

  return (
    <div className="fixed bottom-4 right-4 bg-white border border-gray-300 rounded-lg p-4 shadow-lg max-w-sm">
      <h3 className="font-bold text-sm mb-2">🔥 Firebase Config Debug</h3>
      
      {error ? (
        <div className="text-red-600 text-xs">
          <strong>Error:</strong> {error}
        </div>
      ) : (
        <div className="text-xs space-y-1">
          <div className={`${config?.apiKey ? 'text-green-600' : 'text-red-600'}`}>
            API Key: {config?.apiKey ? '✅ Set' : '❌ Missing'}
          </div>
          <div className={`${config?.authDomain ? 'text-green-600' : 'text-red-600'}`}>
            Auth Domain: {config?.authDomain ? '✅ Set' : '❌ Missing'}
          </div>
          <div className={`${config?.projectId ? 'text-green-600' : 'text-red-600'}`}>
            Project ID: {config?.projectId ? '✅ Set' : '❌ Missing'}
          </div>
          <div className={`${auth ? 'text-green-600' : 'text-red-600'}`}>
            Auth Instance: {auth ? '✅ Connected' : '❌ Failed'}
          </div>
          <div className={`${db ? 'text-green-600' : 'text-red-600'}`}>
            Firestore: {db ? '✅ Connected' : '❌ Failed'}
          </div>
        </div>
      )}
    </div>
  )
} 