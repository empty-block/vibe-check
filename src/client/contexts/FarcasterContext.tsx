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
  authenticate: () => Promise<void>
  getAuthToken: () => Promise<string | null>
}

const FarcasterContext = createContext<FarcasterContextValue>({
  client: null,
  user: null,
  loading: true,
  error: null,
  authenticate: async () => {},
  getAuthToken: async () => null,
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
  const [authToken, setAuthToken] = useState<string | null>(null)

  const authenticate = async () => {
    try {
      if (!client) {
        throw new Error('Farcaster client not initialized')
      }
      
      // Get auth token using Quick Auth
      const { token } = await client.quickAuth.getToken()
      setAuthToken(token)
      
      // Fetch user profile from our backend
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3002'
      const res = await client.quickAuth.fetch(`${apiUrl}/api/auth/me`)
      if (res.ok) {
        const data = await res.json()
        setUser(data.user)
      } else {
        throw new Error('Failed to fetch user profile')
      }
    } catch (err) {
      console.error('Authentication failed:', err)
      setError(err as Error)
    }
  }

  const getAuthToken = async () => {
    try {
      if (!client) return null
      
      // Get a fresh token if needed
      const { token } = await client.quickAuth.getToken()
      setAuthToken(token)
      return token
    } catch (err) {
      console.error('Failed to get auth token:', err)
      return null
    }
  }

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
            
            // Don't authenticate here, will be called after init
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
    <FarcasterContext.Provider value={{ client, user, loading, error, authenticate, getAuthToken }}>
      {children}
    </FarcasterContext.Provider>
  )
}