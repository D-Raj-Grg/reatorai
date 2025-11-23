# Architecture

ReatorAI application architecture and project structure.

---

## Technology Stack

### Frontend
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **State Management**: Zustand (client) + React Query (server)
- **Forms**: React Hook Form + Zod validation
- **Charts**: Recharts or Tremor
- **Icons**: Lucide React

### Backend
- **Runtime**: Next.js API Routes (Vercel Serverless)
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Storage**: Supabase Storage
- **Caching**: Vercel Edge Cache
- **Background Jobs**: Vercel Cron Jobs

### External APIs
- **YouTube Data API v3**: Video and channel metadata
- **YouTube Transcript API**: Transcript extraction
- **OpenAI GPT-4/GPT-4o**: AI analysis and script generation

### Deployment
- **Hosting**: Vercel
- **Database**: Supabase (hosted PostgreSQL)
- **Analytics**: Vercel Analytics or PostHog

---

## Application Architecture

```
┌─────────────────────────────────────────────────┐
│                  Client (Browser)                │
│       Next.js 16 App Router + React              │
│              TypeScript + Tailwind               │
└───────────────────┬─────────────────────────────┘
                    │
                    │ HTTP/WebSocket
                    ▼
┌─────────────────────────────────────────────────┐
│           Vercel Edge Functions                  │
│       Next.js API Routes (Serverless)            │
├─────────────────────────────────────────────────┤
│  /api/auth/*         - Authentication            │
│  /api/channels/*     - Channel CRUD              │
│  /api/watchlists/*   - Watchlist management      │
│  /api/videos/*       - Video CRUD + analysis     │
│  /api/scripts/*      - Script generation         │
│  /api/cron/*         - Background sync jobs      │
└─────┬───────────────────────────────────┬───────┘
      │                                   │
      │                                   │
      ▼                                   ▼
┌─────────────────┐              ┌──────────────────┐
│  Supabase       │              │  External APIs   │
├─────────────────┤              ├──────────────────┤
│ • PostgreSQL    │              │ • YouTube Data   │
│ • Auth          │              │ • YouTube Trans. │
│ • Storage       │              │ • OpenAI GPT-4   │
│ • Realtime      │              │                  │
│ • Row Level Sec │              │                  │
└─────────────────┘              └──────────────────┘
```

---

## Project Structure

```
reatorai/
├── app/
│   ├── (auth)/                 # Auth routes group
│   │   ├── login/
│   │   │   └── page.tsx
│   │   └── signup/
│   │       └── page.tsx
│   │
│   ├── (dashboard)/            # Protected routes group
│   │   ├── layout.tsx         # Dashboard layout with sidebar
│   │   ├── dashboard/
│   │   │   └── page.tsx       # Main dashboard
│   │   ├── videos/
│   │   │   ├── page.tsx       # Video library
│   │   │   └── [id]/
│   │   │       └── page.tsx   # Video detail
│   │   ├── channels/
│   │   │   └── page.tsx       # Channel management
│   │   ├── watchlists/
│   │   │   ├── page.tsx       # All watchlists
│   │   │   └── [id]/
│   │   │       └── page.tsx   # Watchlist detail
│   │   ├── scripts/
│   │   │   ├── page.tsx       # Script library
│   │   │   ├── new/
│   │   │   │   └── page.tsx   # Script generator
│   │   │   └── [id]/
│   │   │       └── page.tsx   # Script detail
│   │   └── settings/
│   │       └── page.tsx       # User settings
│   │
│   ├── api/
│   │   ├── auth/
│   │   │   ├── signup/
│   │   │   │   └── route.ts
│   │   │   ├── login/
│   │   │   │   └── route.ts
│   │   │   └── logout/
│   │   │       └── route.ts
│   │   ├── channels/
│   │   │   ├── route.ts       # GET all, POST new
│   │   │   └── [id]/
│   │   │       ├── route.ts   # GET, PATCH, DELETE
│   │   │       └── sync/
│   │   │           └── route.ts
│   │   ├── watchlists/
│   │   │   ├── route.ts
│   │   │   └── [id]/
│   │   │       ├── route.ts
│   │   │       ├── channels/
│   │   │       │   └── route.ts
│   │   │       └── videos/
│   │   │           └── route.ts
│   │   ├── videos/
│   │   │   ├── route.ts
│   │   │   └── [id]/
│   │   │       ├── route.ts
│   │   │       └── analyze/
│   │   │           └── route.ts
│   │   ├── scripts/
│   │   │   ├── route.ts
│   │   │   ├── generate/
│   │   │   │   └── route.ts
│   │   │   └── [id]/
│   │   │       └── route.ts
│   │   └── cron/
│   │       └── sync-videos/
│   │           └── route.ts
│   │
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Landing page
│   └── globals.css             # Global styles
│
├── components/
│   ├── ui/                     # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── dialog.tsx
│   │   ├── tabs.tsx
│   │   └── ...
│   ├── auth/
│   │   ├── login-form.tsx
│   │   └── signup-form.tsx
│   ├── dashboard/
│   │   ├── sidebar.tsx
│   │   ├── header.tsx
│   │   ├── stats-cards.tsx
│   │   └── recent-outliers.tsx
│   ├── videos/
│   │   ├── video-card.tsx
│   │   ├── video-grid.tsx
│   │   ├── video-filters.tsx
│   │   └── video-detail.tsx
│   ├── watchlists/
│   │   ├── watchlist-card.tsx
│   │   ├── create-watchlist-modal.tsx
│   │   └── watchlist-sidebar.tsx
│   ├── channels/
│   │   ├── channel-card.tsx
│   │   ├── add-channel-modal.tsx
│   │   └── channel-list.tsx
│   └── scripts/
│       ├── script-card.tsx
│       ├── script-generator.tsx
│       └── script-editor.tsx
│
├── lib/
│   ├── supabase/
│   │   ├── client.ts          # Client-side Supabase
│   │   └── server.ts          # Server-side Supabase
│   ├── youtube/
│   │   ├── api.ts             # YouTube Data API
│   │   └── transcript.ts      # Transcript extraction
│   ├── openai/
│   │   ├── client.ts          # OpenAI client
│   │   ├── analyze.ts         # Video analysis
│   │   └── generate.ts        # Script generation
│   ├── utils.ts               # Utility functions
│   └── constants.ts           # App constants
│
├── types/
│   ├── index.ts               # Shared types
│   ├── database.ts            # Database types (generated)
│   └── api.ts                 # API types
│
├── hooks/
│   ├── use-user.ts            # User session hook
│   ├── use-watchlists.ts      # Watchlists data
│   ├── use-videos.ts          # Videos data
│   └── use-scripts.ts         # Scripts data
│
├── store/
│   └── index.ts               # Zustand store
│
├── docs/                       # Documentation
│   ├── architecture.md        # This file
│   ├── database.md            # Database schema
│   ├── api.md                 # API reference
│   └── development.md         # Dev guide
│
├── public/
│   ├── logo.svg
│   └── favicon.ico
│
├── .env.local                 # Environment variables
├── .env.example               # Example env file
├── proxy.ts                   # Auth proxy (Next.js 16)
├── next.config.js             # Next.js config
├── tailwind.config.js         # Tailwind config
├── tsconfig.json              # TypeScript config
├── vercel.json                # Vercel config (cron jobs)
├── package.json
├── PRD.md                     # Product Requirements
└── CLAUDE.md                  # AI assistant guide
```

---

## Key Features & Implementation

### 1. Outlier Detection Algorithm

```typescript
interface VideoMetrics {
  views: number;
  likes: number;
  comments: number;
}

interface ChannelAverage {
  avgViews: number;
  avgEngagementRate: number;
}

function calculateOutlierScore(
  video: VideoMetrics,
  channelAvg: ChannelAverage
): { isOutlier: boolean; score: number } {
  // Calculate engagement rate for this video
  const engagementRate = (video.likes + video.comments) / video.views;

  // Calculate ratios
  const viewRatio = video.views / channelAvg.avgViews;
  const engagementRatio = engagementRate / channelAvg.avgEngagementRate;

  // Weighted score (60% views, 40% engagement)
  const outlierScore = (viewRatio * 0.6) + (engagementRatio * 0.4);

  // Mark as outlier if 2x better than average
  const isOutlier = outlierScore >= 2.0;

  return { isOutlier, score: outlierScore };
}
```

### 2. YouTube API Integration

See `lib/youtube/api.ts` for complete implementation.

Key functions:
- `getChannelInfo(channelId)` - Fetch channel metadata
- `getChannelVideos(channelId)` - Get recent videos
- `parseDuration(duration)` - Convert ISO 8601 to seconds

### 3. Transcript Extraction

```typescript
// lib/youtube/transcript.ts
import { YoutubeTranscript } from 'youtube-transcript';

export async function fetchTranscript(videoId: string): Promise<string | null> {
  try {
    const transcript = await YoutubeTranscript.fetchTranscript(videoId);
    return transcript.map(s => s.text).join(' ').trim();
  } catch (error) {
    console.error('Failed to fetch transcript:', error);
    return null;
  }
}
```

### 4. AI Video Analysis

Uses OpenAI GPT-4o to analyze:
- Hook effectiveness
- Storytelling structure
- Emotional triggers
- Visual format
- Call-to-action
- Key takeaways

See `lib/openai/analyze.ts` for implementation.

### 5. Script Generation

Uses AI to generate scripts with:
- 9 hook formats
- 7 storytelling frameworks
- Custom writing styles
- 60-90 second target duration

See `lib/openai/generate.ts` for implementation.

---

## Data Flow Examples

### Example: Adding a Channel

```
1. User enters channel URL in UI
2. Frontend validates and extracts channel ID
3. POST /api/channels with channelUrl
4. API validates user authentication
5. Fetch channel info from YouTube API
6. Save to Supabase channels table
7. Return channel data to frontend
8. Frontend updates UI with new channel
```

### Example: Generating a Script

```
1. User selects video and parameters
2. POST /api/scripts/generate
3. Check user's script quota
4. Fetch video details and transcript
5. Call OpenAI API with prompt
6. Parse and structure the response
7. Save script to database
8. Update user's usage count
9. Return script to frontend
```

---

**See also**: [Database Schema](./database.md) | [API Documentation](./api.md) | [Development Guide](./development.md)
