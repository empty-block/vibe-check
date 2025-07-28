export const config = {
  port: process.env.PORT || 3002,
  appUrl: process.env.APP_URL || 'http://localhost:5173',
  
  neynar: {
    apiKey: process.env.NEYNAR_API_KEY || '',
    apiUrl: 'https://api.neynar.com/v2'
  },
  
  bot: {
    fid: process.env.BOT_FID || '',
    signerUuid: process.env.BOT_SIGNER_UUID || ''
  },
  
  production: {
    url: process.env.PRODUCTION_URL || 'https://vibe-check.orbiter.host',
    apiUrl: process.env.API_URL || 'https://vibe-check-api.your-domain.workers.dev'
  }
}

// Validate required config
export function validateConfig() {
  const required = [
    { key: 'NEYNAR_API_KEY', value: config.neynar.apiKey }
  ]
  
  const optional = [
    { key: 'BOT_FID', value: config.bot.fid },
    { key: 'BOT_SIGNER_UUID', value: config.bot.signerUuid }
  ]
  
  const missing = required.filter(item => !item.value)
  const missingOptional = optional.filter(item => !item.value)
  
  if (missing.length > 0) {
    console.error('❌ Missing required environment variables:', missing.map(m => m.key).join(', '))
    console.error('   Please check your .env file')
  }
  
  if (missingOptional.length > 0) {
    console.warn('⚠️  Bot features disabled. Missing:', missingOptional.map(m => m.key).join(', '))
    console.warn('   App will run in simulation mode')
  }
  
  return missing.length === 0
}