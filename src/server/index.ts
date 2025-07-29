import { Hono } from 'hono'
import { serve } from '@hono/node-server'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'
import { authRoutes } from './routes/auth'
import { castRoutes } from './routes/casts'
import { botRoutes } from './routes/bot'
import { config, validateConfig } from './config'

const app = new Hono()

// Validate config on startup
validateConfig()

// Middleware
app.use('*', logger())
app.use('*', cors({
  origin: '*',
  credentials: true
}))

// Health check
app.get('/api/health', (c) => {
  return c.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// Mount routes
app.route('/api/auth', authRoutes)
app.route('/api', castRoutes)
app.route('/api/bot', botRoutes)

// Farcaster Mini App manifest
app.get('/.well-known/farcaster.json', (c) => {
  return c.json({
    name: 'Vibe Check',
    description: 'How are the vibes today? Share your daily vibe with the Farcaster community.',
    url: process.env.APP_URL || 'https://vibe-check.orbiter.host',
    miniappUrl: process.env.APP_URL || 'https://vibe-check.orbiter.host',
    primaryColor: '#af9ee7',
    version: '1.0.0'
  })
})

// Start server
const port = config.port
console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port: Number(port)
})