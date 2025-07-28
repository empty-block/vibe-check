import { Hono } from 'hono'
import { config } from '../config'

export const authRoutes = new Hono()

// Get current authenticated user info
authRoutes.get('/me', async (c) => {
  // In mock mode, return a test user
  if (!config.bot.fid || !config.bot.signerUuid) {
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
  
  // TODO: Implement Farcaster Quick Auth verification
  return c.json({ 
    message: 'Auth endpoint not yet implemented',
    user: null 
  })
})

// Verify Farcaster Quick Auth token
authRoutes.post('/verify', async (c) => {
  try {
    const body = await c.req.json()
    const { token } = body
    
    // TODO: Implement token verification with Farcaster
    return c.json({ 
      success: false,
      message: 'Token verification not yet implemented' 
    })
  } catch (error) {
    return c.json({ 
      success: false, 
      error: 'Invalid request' 
    }, 400)
  }
})