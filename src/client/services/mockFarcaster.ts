interface VibePost {
  id: string;
  author: {
    fid: number;
    username: string;
    displayName: string;
    pfp: string;
  };
  content: {
    emojis: string;
    text?: string;
  };
  timestamp: Date;
}

// Mock data for community vibes
const mockVibes: VibePost[] = [
  {
    id: '1',
    author: {
      fid: 123,
      username: 'alice',
      displayName: 'Alice',
      pfp: 'https://i.imgur.com/placeholder1.png'
    },
    content: {
      emojis: '🔥💪',
      text: 'Ready to crush it today!'
    },
    timestamp: new Date(Date.now() - 1000 * 60 * 5) // 5 minutes ago
  },
  {
    id: '2',
    author: {
      fid: 456,
      username: 'bob',
      displayName: 'Bob',
      pfp: 'https://i.imgur.com/placeholder2.png'
    },
    content: {
      emojis: '😴☕',
      text: 'Need more coffee...'
    },
    timestamp: new Date(Date.now() - 1000 * 60 * 15) // 15 minutes ago
  },
  {
    id: '3',
    author: {
      fid: 789,
      username: 'charlie',
      displayName: 'Charlie',
      pfp: 'https://i.imgur.com/placeholder3.png'
    },
    content: {
      emojis: '🌈✨🎉'
    },
    timestamp: new Date(Date.now() - 1000 * 60 * 30) // 30 minutes ago
  }
];

export const mockPostVibe = async (vibe: { emojis: string; text?: string }, user: any): Promise<VibePost> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const newPost: VibePost = {
    id: Date.now().toString(),
    author: {
      fid: user.fid,
      username: user.username,
      displayName: user.display_name,
      pfp: user.pfp_url
    },
    content: vibe,
    timestamp: new Date()
  };
  
  // Add to the beginning of mock vibes
  mockVibes.unshift(newPost);
  
  return newPost;
};

export const mockGetRecentVibes = async (): Promise<VibePost[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Return the most recent vibes
  return mockVibes.slice(0, 10);
};

export const mockGetTodayPrompt = async (): Promise<{ prompt: string; emoji: string }> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const prompt = "What's the vibe today?";
  const emojis = ["✨", "🌟", "⚡", "🎯", "🔥", "🌈", "💫", "🎉", "🚀", "💎"];
  
  // Use date to pick a "daily" emoji
  const emojiIndex = new Date().getDate() % emojis.length;
  
  return {
    prompt,
    emoji: emojis[emojiIndex]!
  };
};