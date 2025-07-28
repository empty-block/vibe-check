import React, { createContext, useContext, useEffect, useState } from 'react'
import * as FarcasterSDK from '@farcaster/miniapp-sdk'

interface FarcasterUser {
  fid: number
  username: string
  displayName: string
  pfpUrl: string
}

interface FarcasterContextValue {
  client: any | null
  user: FarcasterUser | null
  loading: boolean
  error: Error | null
}

const FarcasterContext = createContext<FarcasterContextValue>({
  client: null,
  user: null,
  loading: true,
  error: null,
})

export const useFarcaster = () => {
  const context = useContext(FarcasterContext)
  if (!context) {
    throw new Error('useFarcaster must be used within FarcasterProvider')
  }
  return context
}

interface FarcasterProviderProps {
  children: React.ReactNode
}

export function FarcasterProvider({ children }: FarcasterProviderProps) {
  const [client, setClient] = useState<any | null>(null)
  const [user, setUser] = useState<FarcasterUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const initClient = async () => {
      try {
        // Import SDK
        const { sdk } = FarcasterSDK as any
        
        // Try to initialize SDK
        if (sdk) {
          setClient(sdk)
          
          // Get the user context
          const context = await sdk.context
          
          if (context?.user) {
            setUser({
              fid: context.user.fid,
              username: context.user.username || '',
              displayName: context.user.displayName || '',
              pfpUrl: context.user.pfpUrl || '',
            })
          }
          
          // CRITICAL: Tell Farcaster the app is ready
          await sdk.actions.ready()
        }
      } catch (err) {
        console.error('Failed to initialize Farcaster client:', err)
        // In development, use mock data
        console.log('Using mock data for development')
        setUser({
          fid: 12345,
          username: 'testuser',
          displayName: 'Test User',
          pfpUrl: 'https://api.dicebear.com/7.x/personas/svg?seed=testuser'
        })
      } finally {
        setLoading(false)
      }
    }

    initClient()
  }, [])

  return (
    <FarcasterContext.Provider value={{ client, user, loading, error }}>
      {children}
    </FarcasterContext.Provider>
  )
}