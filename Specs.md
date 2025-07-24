# Vibe Check Mini App Specs

## Overview

Vibe Check is a simple Farcaster Mini App that leverages Farcaster's social infrastructure as both data storage and engagement mechanism. 

Every day, the Vibe Check bot posts a "How are the vibes today?" cast, and users can respond either by replying directly to the cast or through the mini-app (which automatically posts their response to the thread). This creates a public, social vibe barometer for the Farcaster community.

## Tech Stack & Architecture

- **Framework**: BHVR Stack (Bun + Hono + Vite + React with TypeScript)
- **Farcaster Integration**: @farcaster/miniapp-sdk for Mini App functionality
- **Authentication**: Farcaster Quick Auth (JWT-based)
- **Data Provider**: Neynar API for cast data and posting
- **Bot Account**: Dedicated Farcaster account for daily prompts
- **Client Deployment**: [orbiter.host](http://orbiter.host) (static hosting)
- **Server Deployment**: Cloudflare Workers
- **Styling**: Tailwind CSS
- **Data Storage**: Farcaster casts and replies (no traditional database)

## Core Requirements

### Essential Functionality

- **Daily Automated Prompts**: Bot posts daily vibe check cast with rotating phrases at consistent time
- **Dual Response Methods**: Users can respond via direct cast reply OR through mini-app
- **Mini-App Posting**: When users submit via mini-app, automatically post their response to today's thread
- **Live Thread Reading**: Parse today's cast thread to show community vibe stats
- **Emoji-First Design**: Mini-app encourages emoji responses while allowing complete flexibility
- **Native Emoji Support**: Use standard device emoji picker, no custom UI needed
- **Organic Response Format**: Thread accepts any content - emojis, text, combinations, whatever feels natural
- **Prompt Rotation**: Vary daily prompt phrasing to keep engagement fresh

### Performance Expectations

- App loads and displays current thread within 2 seconds
- Vibe submission posts to Farcaster within 3 seconds
- Real-time or near real-time thread stats updates
- Works on both mobile and desktop Farcaster clients

### Integration Requirements

- Seamless posting to Farcaster threads via mini-app
- Proper Mini App manifest configuration
- Bot account management and automation

## Data Schema

**No traditional database** - All data lives in Farcaster casts and replies.

```
// Daily prompt cast structure (posted by bot)
const dailyPromptCast = {
  text: "How are the vibes today? 🌟",
  timestamp: Date,
  hash: string, // Used to fetch replies
  author: "vibecheck" // Bot account
};

// User response structure (cast replies)
const vibeResponse = {
  text: string, // User's vibe - emojis, text, combinations, anything
  author: {
    fid: number,
    username: string,
    display_name: string,
    pfp_url: string
  },
  timestamp: Date,
  parent: string // Hash of daily prompt cast
};

// Examples of response variety:
// "🔥" - single emoji
// "😅💪" - emoji combination
// "🌧️ rough morning but getting better" - emoji + text
// "Feeling great today!" - text only (from direct thread replies)

// Mini-app session data (temporary)
const sessionData = {
  user: {
    fid: number,
    username: string,
    display_name: string,
    pfp_url: string
  },
  todaysCast: {
    hash: string,
    responses: vibeResponse[]
  }
};
```

## API Endpoints

### Authentication & User Data

- `GET /api/auth/me` - Get current authenticated user info
- `POST /api/auth/verify` - Verify Farcaster Quick Auth token

### Cast Management

- `GET /api/today` - Get today's prompt cast and all replies
- `POST /api/vibe` - Submit user's vibe (posts to Farcaster thread)
- `GET /api/stats/today` - Parse today's responses for community stats

### Bot Management

- `POST /api/bot/daily-prompt` - Trigger daily prompt cast (automated)
- `GET /api/bot/status` - Check bot account status

### Mini App Manifest

- `GET /.well-known/farcaster.json` - Mini App manifest configuration

## User Flow

### First Time User

1. User opens VibeCheck Mini App from Farcaster
2. App automatically authenticates via Farcaster Quick Auth
3. App fetches today's prompt cast and existing responses
4. Main interface shows today's question with community responses preview
5. User composes their vibe response:
    - Primary UI encourages emoji responses (prominent emoji button/native picker)
    - Can add multiple emojis, emoji combinations
    - Optional text field available for elaboration
    - Complete flexibility - whatever feels natural
6. User taps "Share Vibe" button
7. App posts their response as a reply to today's prompt cast
8. Success animation shows, displays updated community stats
9. User can see their response now part of the public thread

### Daily Interaction Pattern

1. User opens app to see today's vibe question
2. Quick view of how the community is vibing today
3. 10-second interaction to add their own vibe to the thread
4. Instant feedback showing their contribution to the community conversation
5. Can browse other responses in the thread for social connection

### Bot Daily Flow

1. Every day at consistent time (e.g., 9 AM EST), bot posts new prompt
2. Automated prompt rotation system cycles through different phrasings
3. Thread accumulates diverse responses throughout the day (emojis, text, combinations)
4. Next day, new prompt starts fresh thread
5. System tracks which prompts generate most engagement for optimization

## External Dependencies

### Required Services

- **Neynar API**: Cast posting, thread reading, user authentication
- **Farcaster Quick Auth**: JWT-based authentication
- **Bot Farcaster Account**: Dedicated account for daily prompts
- **Cron Service**: Daily prompt automation (Cloudflare Cron Triggers)

### API Rate Limits

- Neynar API: Consider paid tier for reliable cast posting
- Cast reading frequency: Balance real-time updates with rate limits
- Bot posting: One cast per day + any error recovery

## Error Scenarios

### Network/API Failures

- **Neynar API Down**: Show cached thread data, queue vibe submissions
- **Cast Posting Failed**: Retry mechanism with user feedback
- **Thread Loading Failed**: Show previous day's thread or error state
- **Authentication Failure**: Redirect to Farcaster re-auth flow

### Bot Account Issues

- **Daily Prompt Failed**: Manual trigger capability + alerts
- **Bot Account Suspended**: Fallback posting mechanism
- **Duplicate Daily Posts**: Prevention logic + cleanup

### User Input Validation

- **Empty Response**: Require some content (emoji or text) before posting
- **Content Flexibility**: Accept any valid cast content - no format restrictions
- **Duplicate Posts**: Check if user already responded to today's thread
- **Rate Limiting**: Handle Farcaster's posting rate limits gracefully
- **Emoji Parsing**: Proper handling of emoji combinations and unicode characters

## Visual Guidelines

### Design System

- **Primary Colors**: Light purple (#af9ee7 ), emoji-friendly color palette
- **Typography**: System fonts optimized for emoji display
- **Layout**: Mobile-first, optimized for quick emoji/text input
- **Animations**: Celebratory posting animations, live update transitions

### Component Design

- **Vibe Input**: Clean interface prioritizing emoji responses with native picker integration
- **Community Preview**: Live-updating visual feed of today's diverse responses
- **Response Flexibility**: Support for emoji-only, emoji combinations, emoji+text, or text-only
- **Thread Integration**: Clear visual connection showing mini-app responses joining public thread

### Emoji Integration

- **Native Emoji Picker**: Use device's standard emoji interface (no custom UI needed)
- **Emoji-First UX**: Design encourages emoji responses while maintaining complete flexibility
- **Multi-Emoji Support**: Users can naturally combine emojis (🔥💪, 😅☕, etc.)
- **Emoji Analytics**: Parse and display popular emojis from thread responses
- **Visual Thread Display**: Emoji-rich responses create engaging, scannable community feed
- **Universal Language**: Emojis work across all languages and cultures

## Success Criteria

- Bot successfully posts daily prompts without manual intervention
- Users can seamlessly post responses through mini-app
- App accurately reads and displays thread responses in real-time
- Community engagement grows over time (more daily responses)
- Zero data loss (all data preserved in Farcaster's infrastructure)
- App loads and displays current thread within 2 seconds
- Vibe submissions post to Farcaster within 3 seconds

## Privacy & Security

### Data Handling

- All data is public by design (stored in public Farcaster casts)
- No private user data storage beyond Farcaster's own systems
- Users control their own data through Farcaster account management
- Transparent data model - everything visible on Farcaster

### Security Measures

- Bot account security (secure key management)
- Rate limiting to prevent spam
- Input validation for cast content
- Proper authentication flow for posting permissions

## Future Considerations

### Phase 2 Enhancements

- **Prompt Variations**: More creative daily questions, themed prompts
- **Historical Threads**: Easy browsing of previous days' vibe threads
- **Trend Analysis**: Simple parsing of response patterns over time
- **Community Highlights**: Showcase interesting or popular responses
- **Response Templates**: Optional structured response formats for users who want them

### Phase 3 Features

- **Multiple Channels**: Different vibe categories (work, life, creativity)
- **Weekly Summaries**: Automated recap casts of week's vibe trends
- **Integration Features**: Allow other apps to post to vibe threads
- **Advanced Analytics**: Community mood patterns, emoji trend analysis
- **Gamification**: Streak tracking for daily participation (stored in bio or separate casts)

## Technical Implementation Notes

### Bot Account Management

- Dedicated Farcaster account for VibeCheck bot
- Secure storage of bot account keys in Cloudflare Workers secrets
- Daily automation via Cloudflare Cron Triggers
- Error monitoring and alerting for failed posts

### Thread Management

- Track current day's cast hash for reply targeting
- Efficient parsing of thread replies for stats
- Handle timezone considerations for "daily" concept
- Cleanup/archival strategy for old threads

### Mini-App Integration

- Seamless posting flow that feels native to Farcaster
- Visual feedback showing connection between mini-app and public thread
- Option to compose longer-form responses within mini-app
- Preview of how response will appear in public thread 