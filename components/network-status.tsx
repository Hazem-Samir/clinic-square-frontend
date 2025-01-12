'use client'

import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

export function NetworkStatus({ children }: { children: React.ReactNode }) {
  const [isOnline, setIsOnline] = useState(true)

  useEffect(() => {
    // Set initial status
    setIsOnline(navigator.onLine)

    // Show toast when going offline
    const handleOffline = () => {
      setIsOnline(false)
      console.log("offilne")
      toast.error('You are offline. Please check your internet connection.', {
        duration: Infinity, // Toast will remain until back online
        id: 'offline-toast' // Unique ID to prevent duplicate toasts
      })
    }

    // Clear toast when back online
    const handleOnline = () => {
      setIsOnline(true)
      toast.success('You are back online!', {
        duration: 2000
      })
      toast.dismiss('offline-toast')
    }

    // Add event listeners
    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    // Cleanup
    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  return (
    
      children
    
  )
}

