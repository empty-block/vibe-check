// Mock data for testing without a bot account

export const MOCK_BOT_CAST = {
  hash: 'mock-cast-hash-' + new Date().toISOString().split('T')[0],
  author: {
    fid: 999999,
    username: 'vibecheck-bot',
    display_name: 'Vibe Check Bot',
    pfp_url: 'https://api.dicebear.com/7.x/bottts/svg?seed=vibecheck'
  },
  text: "How are the vibes today? 🌟",
  timestamp: new Date().setHours(9, 0, 0, 0), // 9 AM today
  replies: {
    count: 12
  }
}

export const MOCK_RESPONSES = [
  {
    hash: 'response-1',
    author: {
      fid: 1234,
      username: 'alice',
      display_name: 'Alice',
      pfp_url: 'https://api.dicebear.com/7.x/personas/svg?seed=alice'
    },
    text: '🔥🔥🔥',
    timestamp: Date.now() - 1000 * 60 * 30, // 30 mins ago
    parent_hash: MOCK_BOT_CAST.hash
  },
  {
    hash: 'response-2',
    author: {
      fid: 5678,
      username: 'bob',
      display_name: 'Bob',
      pfp_url: 'https://api.dicebear.com/7.x/personas/svg?seed=bob'
    },
    text: '😅 rough morning but getting better',
    timestamp: Date.now() - 1000 * 60 * 45, // 45 mins ago
    parent_hash: MOCK_BOT_CAST.hash
  },
  {
    hash: 'response-3',
    author: {
      fid: 9012,
      username: 'carol',
      display_name: 'Carol',
      pfp_url: 'https://api.dicebear.com/7.x/personas/svg?seed=carol'
    },
    text: '☕💪 powered by coffee',
    timestamp: Date.now() - 1000 * 60 * 60, // 1 hour ago
    parent_hash: MOCK_BOT_CAST.hash
  },
  {
    hash: 'response-4',
    author: {
      fid: 3456,
      username: 'david',
      display_name: 'David',
      pfp_url: 'https://api.dicebear.com/7.x/personas/svg?seed=david'
    },
    text: '🚀',
    timestamp: Date.now() - 1000 * 60 * 90, // 1.5 hours ago
    parent_hash: MOCK_BOT_CAST.hash
  },
  {
    hash: 'response-5',
    author: {
      fid: 7890,
      username: 'eve',
      display_name: 'Eve',
      pfp_url: 'https://api.dicebear.com/7.x/personas/svg?seed=eve'
    },
    text: '🌧️😔',
    timestamp: Date.now() - 1000 * 60 * 120, // 2 hours ago
    parent_hash: MOCK_BOT_CAST.hash
  }
]

export function getMockStats() {
  // Count emojis
  const emojiRegex = /\p{Emoji}/gu
  const emojiCounts: Record<string, number> = {}
  
  MOCK_RESPONSES.forEach(response => {
    const emojis = response.text.match(emojiRegex) || []
    emojis.forEach(emoji => {
      emojiCounts[emoji] = (emojiCounts[emoji] || 0) + 1
    })
  })
  
  // Get top emojis
  const topEmojis = Object.entries(emojiCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([emoji, count]) => ({ emoji, count }))
  
  return {
    totalResponses: MOCK_RESPONSES.length,
    uniqueUsers: new Set(MOCK_RESPONSES.map(r => r.author.fid)).size,
    topEmojis,
    lastUpdated: new Date().toISOString()
  }
}