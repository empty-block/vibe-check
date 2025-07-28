import { Hono } from 'hono'
import { config } from '../config'
import { MOCK_BOT_CAST, MOCK_RESPONSES, getMockStats } from '../services/mockData'

export const castRoutes = new Hono()

// Get today's prompt cast and all replies
castRoutes.get('/today', async (c) => {
  // If no bot configured, return mock data
  if (!config.bot.fid || !config.bot.signerUuid) {
    return c.json({
      cast: MOCK_BOT_CAST,
      responses: MOCK_RESPONSES,
      stats: getMockStats(),
      mock: true
    })
  }
  
  // TODO: Fetch today's vibe check cast from Farcaster via Neynar
  return c.json({
    cast: null,
    responses: [],
    stats: {
      totalResponses: 0,
      topEmojis: []
    }
  })
})

// Submit user's vibe (posts to Farcaster thread)
castRoutes.post('/vibe', async (c) => {
  try {
    const body = await c.req.json()
    const { vibe, parentCastHash, userId } = body
    
    if (!vibe || !vibe.trim()) {
      return c.json({
        success: false,
        error: 'Vibe cannot be empty'
      }, 400)
    }
    
    // If no bot configured, simulate success
    if (!config.bot.fid || !config.bot.signerUuid) {
      console.log('🎭 Mock mode: Would post vibe:', { vibe, userId, parentCastHash })
      return c.json({
        success: true,
        message: 'Vibe received (simulation mode)',
        mock: true,
        cast: {
          hash: 'mock-response-' + Date.now(),
          text: vibe,
          timestamp: Date.now()
        }
      })
    }
    
    // TODO: Post vibe as reply to today's cast via Neynar API
    return c.json({
      success: false,
      message: 'Vibe posting not yet implemented'
    })
  } catch (error) {
    return c.json({
      success: false,
      error: 'Invalid request'
    }, 400)
  }
})

// Get community stats for today
castRoutes.get('/stats/today', async (c) => {
  // If no bot configured, return mock stats
  if (!config.bot.fid || !config.bot.signerUuid) {
    return c.json({
      ...getMockStats(),
      mock: true
    })
  }
  
  // TODO: Parse today's responses for community stats
  return c.json({
    totalResponses: 0,
    uniqueUsers: 0,
    topEmojis: [],
    averageSentiment: null,
    lastUpdated: new Date().toISOString()
  })
})