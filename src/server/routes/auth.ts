import { Hono } from 'hono'
import { config } from '../config'
import { createClient } from '@farcaster/quick-auth'

let quickAuthClient: ReturnType<typeof createClient> | null = null

// Initialize Quick Auth client
const getQuickAuthClient = () => {
  if (!quickAuthClient) {
    quickAuthClient = createClient({
      // Optional: Configure domain for production
      // domain: 'vibe-check.orbiter.host'
    })
  }
  return quickAuthClient
}

export const authRoutes = new Hono()

// Get current authenticated user info
authRoutes.get('/me', async (c) => {
  try {
    // Get auth token from Authorization header
    const authorization = c.req.header('Authorization')
    if (!authorization || !authorization.startsWith('Bearer ')) {
      // In development/mock mode, return a test user
      if (!config.neynar.apiKey) {
        return c.json({
          user: {
            fid: 12345,
            username: 'testuser',
            displayName: 'Test User',
            pfpUrl: 'https://api.dicebear.com/7.x/personas/svg?seed=testuser'
          },
          mock: true
        })
      }
      
      return c.json({ error: 'No authorization token provided' }, 401)
    }
    
    // Extract token
    const token = authorization.split(' ')[1]
    
    // Verify JWT with Quick Auth
    const client = getQuickAuthClient()
    const payload = await client.verifyJwt({ 
      token,
      // In production, add domain validation
      // domain: 'vibe-check.orbiter.host' 
    })
    
    const fid = payload.sub
    
    // Fetch user profile from Neynar
    if (config.neynar.apiKey) {
      const response = await fetch(`${config.neynar.apiUrl}/farcaster/user/bulk?fids=${fid}`, {
        headers: {
          'accept': 'application/json',
          'api_key': config.neynar.apiKey
        }
      })
      
      if (response.ok) {
        const data = await response.json()
        const user = data.users?.[0]
        
        if (user) {
          return c.json({
            user: {
              fid: user.fid,
              username: user.username,
              displayName: user.display_name,
              pfpUrl: user.pfp_url
            }
          })
        }
      }
    }
    
    // Fallback to basic FID info
    return c.json({
      user: {
        fid: Number(fid),
        username: `user${fid}`,
        displayName: `User ${fid}`,
        pfpUrl: `https://api.dicebear.com/7.x/personas/svg?seed=${fid}`
      }
    })
    
  } catch (error) {
    console.error('Auth error:', error)
    return c.json({ error: 'Authentication failed' }, 401)
  }
})

// Verify Farcaster Quick Auth token
authRoutes.post('/verify', async (c) => {
  try {
    const body = await c.req.json()
    const { token } = body
    
    if (!token) {
      return c.json({ 
        success: false, 
        error: 'No token provided' 
      }, 400)
    }
    
    // Verify JWT with Quick Auth
    const client = getQuickAuthClient()
    const payload = await client.verifyJwt({ 
      token,
      // In production, add domain validation
      // domain: 'vibe-check.orbiter.host' 
    })
    
    return c.json({ 
      success: true,
      fid: payload.sub
    })
  } catch (error) {
    console.error('Token verification error:', error)
    return c.json({ 
      success: false, 
      error: 'Invalid token' 
    }, 401)
  }
})