# Vibe Check

A Farcaster mini-app for daily community vibe checking.

## Overview

Vibe Check is a simple Farcaster Mini App that creates a daily social vibe barometer for the Farcaster community. Every day, a bot posts "How are the vibes today?" and users can respond with emojis, text, or combinations through either direct cast replies or the mini-app interface.

## Key Features

- 🤖 **Daily Automated Prompts** - Bot posts daily vibe check questions
- 📱 **Mini-App Integration** - Seamless posting through Farcaster Mini App
- 🔥 **Emoji-First Design** - Encourages quick emoji responses with full flexibility
- 🧵 **Thread-Based Storage** - Uses Farcaster's social infrastructure as the database
- ⚡ **Real-Time Updates** - Live community vibe stats and responses

## Tech Stack

- **Framework**: BHVR Stack (Bun + Hono + Vite + React with TypeScript)
- **Farcaster Integration**: @farcaster/miniapp-sdk
- **Authentication**: Farcaster Quick Auth (JWT-based)
- **Data Provider**: Neynar API
- **Deployment**: Cloudflare Workers + orbiter.host
- **Styling**: Tailwind CSS

## Getting Started

### Prerequisites

- [Bun](https://bun.sh) installed
- Neynar API key
- Farcaster bot account credentials

### Installation

1. Clone the repository:
```bash
git clone https://github.com/emptyblock/vibe-check.git
cd vibe-check
```

2. Install dependencies:
```bash
bun install
```

3. Copy environment variables:
```bash
cp .env.example .env
```

4. Configure your `.env` file with:
   - `NEYNAR_API_KEY` - Your Neynar API key
   - `BOT_FID` - Your bot's Farcaster ID
   - `BOT_SIGNER_UUID` - Your bot's signer UUID

### Development

Run both the client and server in development mode:

```bash
bun run dev
```

This will start:
- Vite dev server on http://localhost:5173
- Hono API server on http://localhost:3000

### Building for Production

```bash
bun run build
```

This creates:
- Client build in `dist/client/`
- Server build in `dist/server/`

## API Endpoints

- `GET /api/health` - Health check
- `GET /api/auth/me` - Get authenticated user
- `POST /api/auth/verify` - Verify auth token
- `GET /api/today` - Get today's vibe thread
- `POST /api/vibe` - Post a vibe response
- `GET /api/stats/today` - Get community stats
- `POST /api/bot/daily-prompt` - Trigger daily prompt
- `GET /api/bot/status` - Check bot status

## Documentation

📋 **[Complete Specifications](./specs.md)** - Detailed technical specifications, user flows, and implementation notes.

---

*A project by Empty Block* 
