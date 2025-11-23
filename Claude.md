# CLAUDE.md - ReatorAI Project Knowledge Base

This document contains comprehensive knowledge about the ReatorAI project to help AI assistants understand the context, architecture, and implementation details when assisting with development.

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Architecture & Data Flow](#architecture--data-flow)
4. [Database Schema](#database-schema)
5. [API Endpoints](#api-endpoints)
6. [Key Features & Implementation](#key-features--implementation)
7. [Code Patterns & Best Practices](#code-patterns--best-practices)
8. [Development Guidelines](#development-guidelines)
9. [Common Tasks & Solutions](#common-tasks--solutions)
10. [Troubleshooting](#troubleshooting)

---

## Project Overview

### What is ReatorAI?

ReatorAI is an AI-powered viral content research and script generation platform designed for short-form content creators. It helps creators discover viral videos, analyze what makes them successful, and generate custom scripts optimized for platforms like YouTube Shorts, TikTok, and Instagram Reels.

### Core Value Proposition

**Problem**: Content creators spend 5-10 hours per week manually searching for trending topics, analyzing successful content, and writing scripts.

**Solution**: ReatorAI reduces this time from 60 minutes to 10 minutes by:
1. Automatically tracking YouTube channels
2. Identifying "outlier" videos (performing 2x+ better than average)
3. Extracting and analyzing transcripts with AI
4. Generating custom scripts using proven viral frameworks

### Target User

**Primary**: Raj (LAZY SANDY brand)
- Educational content creator
- Focuses on science, geography, and historical topics
- Posts on TikTok (@lazysandyinfo, @lazysandy) and YouTube (@lazysandyinfo)
- Struggles with viewer-to-follower conversion
- Needs faster content research and scriptwriting

**Secondary**: Educational content creators in similar niches

### How It Works (4 Steps)

**STEP 1: Build Your Watchlists**
- Track favorite channels across YouTube
- Create unlimited watchlists to organize by niche
- Add unlimited channels per watchlist

**STEP 2: Find Outlier Videos**
- Automatic outlier detection (2x+ performance)
- Advanced filtering and search
- Sort by views, engagement, date

**STEP 3: Understand Why They Went Viral**
- AI-powered analysis of viral patterns
- Hook, storytelling, emotional triggers
- Instant transcript extraction

**STEP 4: Write Winning Scripts**
- 9 viral hook formats
- 7 storytelling frameworks
- Custom writing style (sounds like you, not AI)
- 60-90 second scripts for short-form

---

## Technology Stack

### Frontend
```
Framework: Next.js 16 (App Router)
Language: TypeScript (strict mode)
Styling: Tailwind CSS
UI Components: shadcn/ui
State Management: 
  - Zustand (client state)
  - React Query / TanStack Query (server state)
Forms: React Hook Form + Zod validation
Charts: Recharts or Tremor
Icons: Lucide React
```

### Backend
```
Runtime: Next.js API Routes (Vercel Serverless Functions)
Database: Supabase (PostgreSQL)
Authentication: Supabase Auth
Storage: Supabase Storage
Caching: Vercel Edge Cache + Supabase caching
Background Jobs: Vercel Cron Jobs
```

### External APIs
```
YouTube Data API v3: Video and channel metadata
YouTube Transcript API: Transcript extraction
OpenAI GPT-4/GPT-4o: AI analysis and script generation
```

### Deployment
```
Hosting: Vercel
Database: Supabase (hosted PostgreSQL)
Analytics: Vercel Analytics or PostHog
Domain: TBD
```

### Key Dependencies
```json
{
  "dependencies": {
    "next": "^16.0.0",
    "react": "^19.0.0",
    "typescript": "^5.0.0",
    "@supabase/supabase-js": "^2.39.0",
    "@supabase/auth-helpers-nextjs": "^0.10.0",
    "openai": "^4.0.0",
    "youtube-transcript": "^1.0.0",
    "zustand": "^4.5.0",
    "@tanstack/react-query": "^5.0.0",
    "react-hook-form": "^7.0.0",
    "zod": "^3.22.0",
    "tailwindcss": "^3.4.0",
    "lucide-react": "^0.300.0",
    "recharts": "^2.10.0",
    "date-fns": "^3.0.0"
  }
}
```

---

## Architecture & Data Flow

### Application Architecture

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

### Folder Structure

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
├── public/
│   ├── logo.svg
│   └── favicon.ico
│
├── .env.local                 # Environment variables
├── .env.example               # Example env file
├── proxy.ts                   # Auth proxy (Next.js 16 convention)
├── next.config.js             # Next.js config
├── tailwind.config.js         # Tailwind config
├── tsconfig.json              # TypeScript config
├── vercel.json                # Vercel config (cron jobs)
├── package.json
├── PRD.md                     # Product Requirements Doc
└── CLAUDE.md                  # This file
```

---

## Database Schema

### Complete Schema with Relationships

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- USER SUBSCRIPTIONS & LIMITS
-- ============================================

CREATE TABLE user_subscriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
    
    plan_type VARCHAR(50) DEFAULT 'free',
    
    -- Limits per plan
    max_scripts_per_month INTEGER DEFAULT 10,
    max_analyses_per_month INTEGER DEFAULT 20,
    max_channels INTEGER DEFAULT 5,
    
    -- Current usage
    scripts_used_this_month INTEGER DEFAULT 0,
    analyses_used_this_month INTEGER DEFAULT 0,
    channels_count INTEGER DEFAULT 0,
    
    -- Billing period
    current_period_start DATE DEFAULT CURRENT_DATE,
    current_period_end DATE DEFAULT (CURRENT_DATE + INTERVAL '1 month'),
    
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- ============================================
-- WATCHLISTS
-- ============================================

CREATE TABLE watchlists (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    
    name VARCHAR(255) NOT NULL,
    description TEXT,
    color VARCHAR(7) DEFAULT '#3B82F6', -- Hex color
    icon VARCHAR(50) DEFAULT 'folder',
    
    -- Stats (auto-calculated)
    channel_count INTEGER DEFAULT 0,
    total_videos INTEGER DEFAULT 0,
    total_outliers INTEGER DEFAULT 0,
    
    display_order INTEGER DEFAULT 0,
    
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_watchlists_user_id ON watchlists(user_id);

-- ============================================
-- CHANNELS
-- ============================================

CREATE TABLE channels (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    
    platform VARCHAR(20) DEFAULT 'youtube',
    channel_id VARCHAR(255) NOT NULL,
    channel_name VARCHAR(255),
    channel_handle VARCHAR(255),
    thumbnail_url TEXT,
    description TEXT,
    
    -- Stats
    subscriber_count BIGINT,
    total_videos INTEGER,
    
    -- Calculated averages (for outlier detection)
    avg_view_count BIGINT,
    avg_engagement_rate FLOAT,
    
    -- Sync info
    last_synced_at TIMESTAMP,
    
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    
    UNIQUE(user_id, channel_id)
);

CREATE INDEX idx_channels_user_id ON channels(user_id);
CREATE INDEX idx_channels_channel_id ON channels(channel_id);

-- ============================================
-- WATCHLIST CHANNELS (Many-to-Many)
-- ============================================

CREATE TABLE watchlist_channels (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    watchlist_id UUID REFERENCES watchlists(id) ON DELETE CASCADE,
    channel_id UUID REFERENCES channels(id) ON DELETE CASCADE,
    
    added_at TIMESTAMP DEFAULT NOW(),
    
    UNIQUE(watchlist_id, channel_id)
);

CREATE INDEX idx_watchlist_channels_watchlist_id ON watchlist_channels(watchlist_id);
CREATE INDEX idx_watchlist_channels_channel_id ON watchlist_channels(channel_id);

-- ============================================
-- VIDEOS
-- ============================================

CREATE TABLE videos (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    channel_id UUID REFERENCES channels(id) ON DELETE CASCADE,
    
    platform VARCHAR(20) DEFAULT 'youtube',
    video_id VARCHAR(255) NOT NULL UNIQUE,
    
    -- Metadata
    title TEXT NOT NULL,
    description TEXT,
    thumbnail_url TEXT,
    duration INTEGER, -- in seconds
    published_at TIMESTAMP,
    
    -- Metrics
    view_count BIGINT DEFAULT 0,
    like_count BIGINT DEFAULT 0,
    comment_count BIGINT DEFAULT 0,
    
    -- Calculated
    engagement_rate FLOAT,
    is_outlier BOOLEAN DEFAULT FALSE,
    outlier_score FLOAT,
    
    -- Content
    transcript TEXT,
    transcript_fetched_at TIMESTAMP,
    
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_videos_channel_id ON videos(channel_id);
CREATE INDEX idx_videos_video_id ON videos(video_id);
CREATE INDEX idx_videos_is_outlier ON videos(is_outlier);
CREATE INDEX idx_videos_published_at ON videos(published_at DESC);
CREATE INDEX idx_videos_view_count ON videos(view_count DESC);

-- ============================================
-- VIDEO ANALYSES
-- ============================================

CREATE TABLE video_analyses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    video_id UUID REFERENCES videos(id) ON DELETE CASCADE UNIQUE,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    
    -- Analysis sections
    hook_analysis TEXT,
    storytelling_analysis TEXT,
    emotional_triggers TEXT,
    visual_format TEXT,
    cta_analysis TEXT,
    key_takeaways TEXT,
    full_analysis TEXT,
    
    -- Metadata
    tokens_used INTEGER,
    analyzed_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_analyses_video_id ON video_analyses(video_id);
CREATE INDEX idx_analyses_user_id ON video_analyses(user_id);

-- ============================================
-- USER WRITING STYLES
-- ============================================

CREATE TABLE user_writing_styles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    
    style_name VARCHAR(255) DEFAULT 'Default',
    
    -- Style parameters
    tone VARCHAR(100),
    vocabulary_level VARCHAR(50),
    sentence_length VARCHAR(50),
    personality_traits TEXT[],
    example_text TEXT,
    
    is_default BOOLEAN DEFAULT FALSE,
    
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    
    UNIQUE(user_id, style_name)
);

CREATE INDEX idx_writing_styles_user_id ON user_writing_styles(user_id);

-- ============================================
-- GENERATED SCRIPTS
-- ============================================

CREATE TABLE scripts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    source_video_id UUID REFERENCES videos(id) ON DELETE SET NULL,
    writing_style_id UUID REFERENCES user_writing_styles(id) ON DELETE SET NULL,
    
    -- Generation parameters
    hook_format VARCHAR(100),
    storytelling_framework VARCHAR(100),
    
    -- Content
    topic VARCHAR(255),
    hook_text TEXT,
    body_text TEXT,
    cta_text TEXT,
    visual_suggestions TEXT,
    full_script TEXT,
    
    -- Metadata
    estimated_duration INTEGER,
    word_count INTEGER,
    tokens_used INTEGER,
    
    -- User actions
    is_favorite BOOLEAN DEFAULT FALSE,
    
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_scripts_user_id ON scripts(user_id);
CREATE INDEX idx_scripts_source_video ON scripts(source_video_id);
CREATE INDEX idx_scripts_created_at ON scripts(created_at DESC);
CREATE INDEX idx_scripts_is_favorite ON scripts(is_favorite);

-- ============================================
-- TRIGGERS
-- ============================================

-- Update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_channels_updated_at 
    BEFORE UPDATE ON channels
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_videos_updated_at 
    BEFORE UPDATE ON videos
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_scripts_updated_at 
    BEFORE UPDATE ON scripts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_watchlists_updated_at 
    BEFORE UPDATE ON watchlists
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_subscriptions_updated_at 
    BEFORE UPDATE ON user_subscriptions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Update watchlist stats
CREATE OR REPLACE FUNCTION update_watchlist_stats()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE watchlists
    SET 
        channel_count = (
            SELECT COUNT(*)
            FROM watchlist_channels
            WHERE watchlist_id = NEW.watchlist_id
        ),
        total_videos = (
            SELECT COUNT(*)
            FROM videos v
            INNER JOIN watchlist_channels wc ON v.channel_id = wc.channel_id
            WHERE wc.watchlist_id = NEW.watchlist_id
        ),
        total_outliers = (
            SELECT COUNT(*)
            FROM videos v
            INNER JOIN watchlist_channels wc ON v.channel_id = wc.channel_id
            WHERE wc.watchlist_id = NEW.watchlist_id
            AND v.is_outlier = true
        )
    WHERE id = NEW.watchlist_id;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_watchlist_stats_trigger
    AFTER INSERT OR DELETE ON watchlist_channels
    FOR EACH ROW EXECUTE FUNCTION update_watchlist_stats();

-- Reset monthly usage
CREATE OR REPLACE FUNCTION reset_monthly_usage()
RETURNS void AS $$
BEGIN
    UPDATE user_subscriptions
    SET 
        scripts_used_this_month = 0,
        analyses_used_this_month = 0,
        current_period_start = CURRENT_DATE,
        current_period_end = CURRENT_DATE + INTERVAL '1 month'
    WHERE current_period_end < CURRENT_DATE;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

-- Channels
ALTER TABLE channels ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own channels"
    ON channels FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own channels"
    ON channels FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own channels"
    ON channels FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own channels"
    ON channels FOR DELETE
    USING (auth.uid() = user_id);

-- Videos
ALTER TABLE videos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view videos from their channels"
    ON videos FOR SELECT
    USING (
        channel_id IN (
            SELECT id FROM channels WHERE user_id = auth.uid()
        )
    );

-- Scripts
ALTER TABLE scripts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own scripts"
    ON scripts FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own scripts"
    ON scripts FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own scripts"
    ON scripts FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own scripts"
    ON scripts FOR DELETE
    USING (auth.uid() = user_id);

-- Video analyses
ALTER TABLE video_analyses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view analyses for their videos"
    ON video_analyses FOR SELECT
    USING (
        video_id IN (
            SELECT v.id FROM videos v
            INNER JOIN channels c ON v.channel_id = c.id
            WHERE c.user_id = auth.uid()
        )
    );

CREATE POLICY "Users can create analyses for their videos"
    ON video_analyses FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Writing styles
ALTER TABLE user_writing_styles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own writing styles"
    ON user_writing_styles FOR ALL
    USING (auth.uid() = user_id);

-- Watchlists
ALTER TABLE watchlists ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own watchlists"
    ON watchlists FOR ALL
    USING (auth.uid() = user_id);

-- Watchlist channels
ALTER TABLE watchlist_channels ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their watchlist channels"
    ON watchlist_channels FOR ALL
    USING (
        watchlist_id IN (
            SELECT id FROM watchlists WHERE user_id = auth.uid()
        )
    );

-- User subscriptions
ALTER TABLE user_subscriptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own subscription"
    ON user_subscriptions FOR SELECT
    USING (auth.uid() = user_id);
```

---

## API Endpoints

### Authentication

```typescript
POST /api/auth/signup
Body: { email: string, password: string }
Response: { success: boolean, user?: User, error?: string }

POST /api/auth/login
Body: { email: string, password: string }
Response: { success: boolean, session?: Session, error?: string }

POST /api/auth/logout
Response: { success: boolean }
```

### Watchlists

```typescript
GET /api/watchlists
Response: { watchlists: Watchlist[] }

POST /api/watchlists
Body: { name: string, description?: string, color?: string, icon?: string }
Response: { watchlist: Watchlist }

PATCH /api/watchlists/[id]
Body: { name?: string, description?: string, color?: string, icon?: string }
Response: { watchlist: Watchlist }

DELETE /api/watchlists/[id]
Response: { success: boolean }

POST /api/watchlists/[id]/channels
Body: { channelId: string }
Response: { success: boolean }

DELETE /api/watchlists/[id]/channels/[channelId]
Response: { success: boolean }

GET /api/watchlists/[id]/videos
Query: { isOutlier?: boolean, sortBy?: string, page?: number }
Response: { videos: Video[], total: number }
```

### Channels

```typescript
GET /api/channels
Response: { channels: Channel[] }

POST /api/channels
Body: { channelUrl: string }
Response: { success: boolean, channel?: Channel, error?: string }

GET /api/channels/[id]
Response: { channel: Channel & { videos: Video[] } }

DELETE /api/channels/[id]
Response: { success: boolean }

POST /api/channels/[id]/sync
Response: { success: boolean, videosAdded: number, videosUpdated: number }
```

### Videos

```typescript
GET /api/videos
Query: {
  search?: string,
  channelId?: string,
  watchlistId?: string,
  isOutlier?: boolean,
  startDate?: string,
  endDate?: string,
  sortBy?: 'views' | 'engagement' | 'date',
  sortOrder?: 'asc' | 'desc',
  page?: number,
  limit?: number
}
Response: { videos: Video[], total: number, page: number, hasMore: boolean }

GET /api/videos/[id]
Response: {
  video: Video & {
    channel: Channel,
    analysis?: VideoAnalysis,
    scripts?: Script[]
  }
}

POST /api/videos/[id]/analyze
Response: { analysis: VideoAnalysis, tokensUsed: number }
```

### Scripts

```typescript
GET /api/scripts
Query: { page?: number, limit?: number, sortBy?: 'date' | 'favorite' }
Response: { scripts: Script[], total: number, remaining: number }

POST /api/scripts/generate
Body: {
  videoId: string,
  hookFormat: string,
  framework: string,
  writingStyleId?: string,
  customTopic?: string
}
Response: { success: boolean, script?: Script, error?: string, remaining: number }

GET /api/scripts/[id]
Response: { script: Script }

PATCH /api/scripts/[id]
Body: { isFavorite?: boolean, content?: { hook?: string, body?: string, cta?: string } }
Response: { success: boolean, script: Script }

DELETE /api/scripts/[id]
Response: { success: boolean }
```

### User

```typescript
GET /api/user/subscription
Response: {
  plan: 'free' | 'pro' | 'premium',
  usage: {
    scriptsUsed: number,
    scriptsLimit: number,
    analysesUsed: number,
    analysesLimit: number,
    channelsUsed: number,
    channelsLimit: number
  },
  periodEnd: string
}

GET /api/user/stats
Response: {
  totalChannels: number,
  totalVideos: number,
  totalOutliers: number,
  totalScripts: number,
  totalAnalyses: number
}
```

### Cron

```typescript
GET /api/cron/sync-videos
Headers: { authorization: 'Bearer CRON_SECRET' }
Response: { success: boolean, channelsSynced: number, videosAdded: number }
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

```typescript
// lib/youtube/api.ts
import { google } from 'googleapis';

const youtube = google.youtube({
  version: 'v3',
  auth: process.env.YOUTUBE_API_KEY
});

export async function getChannelInfo(channelId: string) {
  const response = await youtube.channels.list({
    part: ['snippet', 'statistics'],
    id: [channelId]
  });
  
  const channel = response.data.items?.[0];
  if (!channel) throw new Error('Channel not found');
  
  return {
    id: channel.id!,
    name: channel.snippet!.title!,
    handle: channel.snippet!.customUrl,
    thumbnail: channel.snippet!.thumbnails!.default!.url!,
    subscribers: parseInt(channel.statistics!.subscriberCount!),
    totalVideos: parseInt(channel.statistics!.videoCount!),
    description: channel.snippet!.description
  };
}

export async function getChannelVideos(channelId: string, maxResults: number = 50) {
  // First, get the uploads playlist ID
  const channelResponse = await youtube.channels.list({
    part: ['contentDetails'],
    id: [channelId]
  });
  
  const uploadsPlaylistId = channelResponse.data.items?.[0]
    ?.contentDetails?.relatedPlaylists?.uploads;
  
  if (!uploadsPlaylistId) throw new Error('Uploads playlist not found');
  
  // Get videos from uploads playlist
  const playlistResponse = await youtube.playlistItems.list({
    part: ['snippet', 'contentDetails'],
    playlistId: uploadsPlaylistId,
    maxResults
  });
  
  const videoIds = playlistResponse.data.items?.map(
    item => item.contentDetails!.videoId!
  ) || [];
  
  // Get detailed stats for each video
  const videosResponse = await youtube.videos.list({
    part: ['snippet', 'statistics', 'contentDetails'],
    id: videoIds
  });
  
  return videosResponse.data.items?.map(video => ({
    videoId: video.id!,
    title: video.snippet!.title!,
    description: video.snippet!.description,
    thumbnail: video.snippet!.thumbnails!.high!.url!,
    publishedAt: video.snippet!.publishedAt!,
    duration: parseDuration(video.contentDetails!.duration!),
    views: parseInt(video.statistics!.viewCount || '0'),
    likes: parseInt(video.statistics!.likeCount || '0'),
    comments: parseInt(video.statistics!.commentCount || '0')
  })) || [];
}

function parseDuration(duration: string): number {
  // Convert ISO 8601 duration to seconds
  const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return 0;
  
  const hours = parseInt(match[1] || '0');
  const minutes = parseInt(match[2] || '0');
  const seconds = parseInt(match[3] || '0');
  
  return hours * 3600 + minutes * 60 + seconds;
}
```

### 3. Transcript Extraction

```typescript
// lib/youtube/transcript.ts
import { YoutubeTranscript } from 'youtube-transcript';

export async function fetchTranscript(videoId: string): Promise<string | null> {
  try {
    const transcript = await YoutubeTranscript.fetchTranscript(videoId);
    
    // Combine all segments into one text
    const fullTranscript = transcript
      .map(segment => segment.text)
      .join(' ')
      .replace(/\s+/g, ' ') // Normalize whitespace
      .trim();
    
    return fullTranscript;
  } catch (error) {
    console.error('Failed to fetch transcript:', error);
    return null;
  }
}
```

### 4. AI Video Analysis

```typescript
// lib/openai/analyze.ts
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function analyzeVideo(video: {
  title: string;
  description: string;
  transcript: string;
  views: number;
  likes: number;
  comments: number;
}): Promise<string> {
  const prompt = `
Analyze this viral educational video and explain why it performed exceptionally well:

**Video Details:**
- Title: ${video.title}
- Views: ${video.views.toLocaleString()}
- Likes: ${video.likes.toLocaleString()}
- Comments: ${video.comments.toLocaleString()}

**Description:**
${video.description}

**Transcript (first 2000 chars):**
${video.transcript.substring(0, 2000)}

Provide detailed analysis in these sections:

1. **Hook Analysis** (First 3-5 seconds)
   - What makes the opening compelling?
   - Does it create curiosity or pattern interrupt?

2. **Storytelling Structure**
   - What framework is used? (Problem-Solution, Before-After, etc.)
   - How is information sequenced?

3. **Emotional Triggers**
   - What emotions are evoked?
   - How does it maintain engagement?

4. **Visual Format Recommendations**
   - What visual style likely worked?
   - Any specific visual hooks mentioned?

5. **Call-to-Action**
   - How does it encourage engagement?
   - Is there a strong ending?

6. **Key Takeaways**
   - 3-5 specific tactics that made this successful
   - How to apply to future videos

Format your response in clean markdown with headers for each section.
`;

  const response = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      {
        role: 'system',
        content: 'You are an expert in viral content analysis, specializing in educational short-form videos. Provide actionable insights based on data and content structure.'
      },
      {
        role: 'user',
        content: prompt
      }
    ],
    temperature: 0.7,
    max_tokens: 2000
  });

  return response.choices[0].message.content || '';
}
```

### 5. Script Generation

```typescript
// lib/openai/generate.ts
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export const HOOK_FORMATS = [
  'Pattern Interrupt',
  'Shocking Stat',
  'Personal Story',
  'Bold Claim',
  'Question Hook',
  'Trend Jacking',
  'Contrarian Take',
  'List Format',
  'Direct Address'
];

export const STORYTELLING_FRAMEWORKS = [
  'Problem-Agitate-Solve (PAS)',
  'Before-After-Bridge (BAB)',
  'AIDA (Attention-Interest-Desire-Action)',
  'Hero\'s Journey',
  'Situation-Complication-Resolution',
  'Feature-Benefit-Proof',
  'Curiosity Loop'
];

interface ScriptParams {
  video: {
    title: string;
    transcript: string;
    viewCount: number;
  };
  hookFormat: string;
  framework: string;
  writingStyle?: {
    tone: string;
    vocabularyLevel: string;
    personalityTraits: string[];
    exampleText?: string;
  };
  customTopic?: string;
}

export async function generateScript(params: ScriptParams): Promise<string> {
  const { video, hookFormat, framework, writingStyle, customTopic } = params;
  
  const prompt = `
Create a viral short-form video script for educational content.

**Source Video Information:**
- Title: ${video.title}
- Topic: ${customTopic || video.title}
- Performance: ${video.viewCount.toLocaleString()} views
- Key Points: ${video.transcript.substring(0, 1000)}

**Script Requirements:**
- Hook Format: ${hookFormat}
- Storytelling Framework: ${framework}
- Target Duration: 60-90 seconds when spoken aloud
${writingStyle ? `
**Writing Style:**
- Tone: ${writingStyle.tone}
- Vocabulary: ${writingStyle.vocabularyLevel}
- Personality: ${writingStyle.personalityTraits.join(', ')}
${writingStyle.exampleText ? `- Example: "${writingStyle.exampleText}"` : ''}
` : ''}

**Output Format:**
---
**TOPIC:** [One-line description]

**HOOK (0-3 seconds):**
[Opening line using ${hookFormat} - grab attention immediately]

**BODY (3-60 seconds):**
[Main content following ${framework}]
- Present information engagingly
- Use specific examples/facts
- Build curiosity
- Natural transitions

**CALL-TO-ACTION (60-90 seconds):**
[Strong ending encouraging follows/engagement]
- Make viewers want to follow
- Clear, specific ask

**VISUAL SUGGESTIONS:**
[Specific visual ideas for each section]

**ESTIMATED DURATION:** [X seconds]
---

CRITICAL:
1. 60-90 seconds maximum
2. Conversational, engaging language
3. Every word adds value
4. Hook compelling within 3 seconds
5. Clear CTA to convert viewers to followers
${writingStyle ? '6. Match writing style - sound human and authentic' : ''}
`;

  const response = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      {
        role: 'system',
        content: 'You are an expert scriptwriter for viral short-form educational content. You specialize in creating engaging 60-90 second scripts that maximize viewer retention and follower conversion.'
      },
      {
        role: 'user',
        content: prompt
      }
    ],
    temperature: 0.8,
    max_tokens: 1500
  });

  return response.choices[0].message.content || '';
}
```

---

## Code Patterns & Best Practices

### 1. Supabase Client Setup

```typescript
// lib/supabase/client.ts (Client-side)
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/types/database';

export const createClient = () => {
  return createClientComponentClient<Database>();
};

// lib/supabase/server.ts (Server-side)
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { Database } from '@/types/database';

export const createClient = () => {
  return createServerComponentClient<Database>({ cookies });
};
```

### 2. API Route Pattern

```typescript
// app/api/videos/route.ts
import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: Request) {
  try {
    const supabase = await createClient();
    
    // Get authenticated user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    // Get query params
    const { searchParams } = new URL(request.url);
    const isOutlier = searchParams.get('isOutlier') === 'true';
    
    // Query database
    let query = supabase
      .from('videos')
      .select(`
        *,
        channels(id, channel_name, thumbnail_url)
      `);
    
    if (isOutlier) {
      query = query.eq('is_outlier', true);
    }
    
    const { data, error } = await query
      .order('published_at', { ascending: false })
      .limit(50);
    
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    
    return NextResponse.json({ videos: data });
  } catch (error) {
    console.error('Error fetching videos:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

### 3. React Query Hook Pattern

```typescript
// hooks/use-videos.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

interface VideoFilters {
  isOutlier?: boolean;
  channelId?: string;
  watchlistId?: string;
}

export function useVideos(filters: VideoFilters = {}) {
  return useQuery({
    queryKey: ['videos', filters],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (filters.isOutlier) params.set('isOutlier', 'true');
      if (filters.channelId) params.set('channelId', filters.channelId);
      if (filters.watchlistId) params.set('watchlistId', filters.watchlistId);
      
      const response = await fetch(`/api/videos?${params}`);
      if (!response.ok) throw new Error('Failed to fetch videos');
      return response.json();
    }
  });
}

export function useAnalyzeVideo() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (videoId: string) => {
      const response = await fetch(`/api/videos/${videoId}/analyze`, {
        method: 'POST'
      });
      if (!response.ok) throw new Error('Failed to analyze video');
      return response.json();
    },
    onSuccess: (data, videoId) => {
      // Invalidate video query to refetch with new analysis
      queryClient.invalidateQueries({ queryKey: ['video', videoId] });
    }
  });
}
```

### 4. Component Pattern (shadcn/ui style)

```typescript
// components/videos/video-card.tsx
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Video } from '@/types';
import { Eye, ThumbsUp, MessageCircle } from 'lucide-react';
import Link from 'next/link';

interface VideoCardProps {
  video: Video & {
    channels: {
      channel_name: string;
      thumbnail_url: string;
    };
  };
}

export function VideoCard({ video }: VideoCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition">
      <Link href={`/videos/${video.id}`}>
        <div className="relative aspect-video">
          <img
            src={video.thumbnail_url}
            alt={video.title}
            className="object-cover w-full h-full"
          />
          {video.is_outlier && (
            <Badge className="absolute top-2 right-2 bg-green-500">
              ⚡ Outlier {video.outlier_score.toFixed(1)}x
            </Badge>
          )}
        </div>
      </Link>
      
      <CardContent className="p-4">
        <Link href={`/videos/${video.id}`}>
          <h3 className="font-semibold line-clamp-2 hover:text-blue-600 transition">
            {video.title}
          </h3>
        </Link>
        
        <div className="flex items-center gap-2 mt-2">
          <img
            src={video.channels.thumbnail_url}
            alt={video.channels.channel_name}
            className="w-6 h-6 rounded-full"
          />
          <span className="text-sm text-gray-600">
            {video.channels.channel_name}
          </span>
        </div>
        
        <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <Eye className="w-4 h-4" />
            {formatNumber(video.view_count)}
          </div>
          <div className="flex items-center gap-1">
            <ThumbsUp className="w-4 h-4" />
            {formatNumber(video.like_count)}
          </div>
          <div className="flex items-center gap-1">
            <MessageCircle className="w-4 h-4" />
            {formatNumber(video.comment_count)}
          </div>
        </div>
        
        <div className="flex gap-2 mt-4">
          <Button size="sm" variant="outline" className="flex-1">
            Analyze
          </Button>
          <Button size="sm" className="flex-1">
            Generate Script
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function formatNumber(num: number): string {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num.toString();
}
```

---

## Development Guidelines

### Environment Setup

1. **Clone and install:**
```bash
git clone <repo-url> reatorai
cd reatorai
npm install
```

2. **Setup environment variables:**
```bash
cp .env.example .env.local
# Fill in all required variables
```

3. **Setup Supabase:**
- Create new project at https://supabase.com
- Run database schema from PRD.md
- Copy credentials to .env.local

4. **Setup APIs:**
- Enable YouTube Data API in Google Cloud Console
- Get OpenAI API key
- Add to .env.local

5. **Run development server:**
```bash
npm run dev
```

### Git Workflow

```bash
# Feature branches
git checkout -b feature/watchlists
# Commit often with clear messages
git commit -m "feat: add watchlist creation modal"
# Push and create PR
git push origin feature/watchlists
```

### Commit Message Convention

```
feat: Add new feature
fix: Bug fix
docs: Documentation
style: Formatting
refactor: Code restructuring
test: Add tests
chore: Maintenance
```

### Code Quality

```bash
# Type checking
npm run type-check

# Linting
npm run lint

# Format
npm run format
```

---

## Common Tasks & Solutions

### Task 1: Add a New API Endpoint

```typescript
// 1. Create route file: app/api/my-feature/route.ts
import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: Request) {
  const supabase = await createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  // Your logic here
  
  return NextResponse.json({ success: true });
}

// 2. Add TypeScript types in types/api.ts
export interface MyFeatureResponse {
  success: boolean;
  data?: any;
}

// 3. Create React Query hook in hooks/
export function useMyFeature() {
  return useQuery({
    queryKey: ['my-feature'],
    queryFn: async () => {
      const res = await fetch('/api/my-feature');
      return res.json();
    }
  });
}
```

### Task 2: Add a New Database Table

```sql
-- 1. Create migration in Supabase
CREATE TABLE my_table (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    data TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- 2. Add indexes
CREATE INDEX idx_my_table_user_id ON my_table(user_id);

-- 3. Enable RLS
ALTER TABLE my_table ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own data"
    ON my_table FOR ALL
    USING (auth.uid() = user_id);

-- 4. Generate TypeScript types
npx supabase gen types typescript --project-id YOUR_PROJECT_ID > types/database.ts
```

### Task 3: Create a New UI Component

```typescript
// 1. Create component file
// components/my-feature/my-component.tsx
import { Card } from '@/components/ui/card';

interface MyComponentProps {
  data: string;
}

export function MyComponent({ data }: MyComponentProps) {
  return (
    <Card>
      <p>{data}</p>
    </Card>
  );
}

// 2. Add to shadcn/ui if needed
npx shadcn-ui@latest add card

// 3. Use in pages
import { MyComponent } from '@/components/my-feature/my-component';

export default function Page() {
  return <MyComponent data="Hello" />;
}
```

### Task 4: Setup Cron Job

```javascript
// 1. Create cron route: app/api/cron/my-job/route.ts
export async function GET(request: Request) {
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  // Your cron logic
  
  return NextResponse.json({ success: true });
}

// 2. Add to vercel.json
{
  "crons": [
    {
      "path": "/api/cron/my-job",
      "schedule": "0 */6 * * *"  // Every 6 hours
    }
  ]
}
```

---

## Troubleshooting

### Common Issues & Solutions

**Issue**: Supabase RLS blocking queries
```typescript
// Solution: Check if user is authenticated
const { data: { user } } = await supabase.auth.getUser();
console.log('User:', user); // Should not be null

// Verify RLS policies allow the operation
// Check Supabase dashboard > Authentication > Policies
```

**Issue**: YouTube API quota exceeded
```typescript
// Solution: Implement caching and batching
// Cache responses for 6 hours
const cached = await redis.get(`channel:${channelId}`);
if (cached) return JSON.parse(cached);

// Batch multiple requests
const channels = await Promise.all(
  channelIds.map(id => getChannelInfo(id))
);
```

**Issue**: OpenAI API timeout
```typescript
// Solution: Add timeout and retry logic
const response = await openai.chat.completions.create({
  // ... params
  timeout: 30000, // 30 seconds
});

// With retry
let attempts = 0;
while (attempts < 3) {
  try {
    return await generateScript(params);
  } catch (error) {
    attempts++;
    if (attempts === 3) throw error;
    await new Promise(r => setTimeout(r, 1000 * attempts));
  }
}
```

**Issue**: Vercel serverless function timeout
```typescript
// Solution: Move long-running tasks to background jobs
// Instead of:
await syncAllChannels(); // Takes 5 minutes

// Do:
await queueSyncJob(); // Queues job, returns immediately
return NextResponse.json({ jobQueued: true });
```

**Issue**: Database query too slow
```sql
-- Solution: Add indexes
CREATE INDEX idx_videos_published_at ON videos(published_at DESC);
CREATE INDEX idx_videos_view_count ON videos(view_count DESC);

-- Use EXPLAIN ANALYZE to debug
EXPLAIN ANALYZE
SELECT * FROM videos WHERE is_outlier = true;
```

---

## Quick Reference

### Useful Commands

```bash
# Development
npm run dev              # Start dev server
npm run build           # Build for production
npm run start           # Start production server
npm run lint            # Run ESLint
npm run type-check      # Check TypeScript

# Database
npx supabase gen types typescript --project-id PROJECT_ID > types/database.ts

# shadcn/ui
npx shadcn-ui@latest add [component]
npx shadcn-ui@latest add button card input dialog

# Deployment
vercel                  # Deploy to Vercel
vercel --prod          # Deploy to production
```

### Important URLs

```
Local: http://localhost:3000
Supabase Dashboard: https://app.supabase.com
Vercel Dashboard: https://vercel.com/dashboard
Google Cloud Console: https://console.cloud.google.com
OpenAI Platform: https://platform.openai.com
```

### Key File Locations

```
Environment: .env.local
Database Schema: See PRD.md or this file
API Routes: app/api/
Components: components/
Types: types/
Hooks: hooks/
Utils: lib/
```

---

## Best Practices Summary

1. **Always use TypeScript** - Define interfaces for all data structures
2. **Follow Next.js 16 patterns** - Use App Router, Server Components where possible
3. **Implement proper error handling** - Try-catch all async operations
4. **Use React Query** - For all data fetching and mutations
5. **Enable RLS** - Never skip Row Level Security in Supabase
6. **Cache aggressively** - Reduce API calls to YouTube and OpenAI
7. **Validate user input** - Use Zod for runtime validation
8. **Keep components small** - Single responsibility principle
9. **Write meaningful commits** - Use conventional commit messages
10. **Test edge cases** - Empty states, errors, loading states

---

## Project Status & Roadmap

### MVP (Weeks 1-6)
- [x] Project setup
- [ ] Authentication
- [ ] Channel tracking
- [ ] Watchlists
- [ ] Video sync
- [ ] Outlier detection
- [ ] Transcript extraction
- [ ] Script generation

### Phase 2 (Weeks 7-10)
- [ ] Advanced filtering
- [ ] Video analysis
- [ ] Custom writing styles
- [ ] Polish & UX improvements

### Future
- [ ] TikTok integration
- [ ] Instagram integration
- [ ] Team collaboration
- [ ] Advanced analytics
- [ ] Mobile app

---

**Document Version**: 1.0  
**Last Updated**: November 23, 2025  
**Maintainer**: Raj (LAZY SANDY)  
**Status**: Active Development

---

## Notes for AI Assistants

When helping with this project:

1. **Always reference this document** for context about architecture and patterns
2. **Follow established conventions** in code structure and naming
3. **Use TypeScript strictly** - Never use `any` type
4. **Prioritize user security** - Always validate auth and permissions
5. **Consider performance** - Cache, batch, and optimize queries
6. **Write production-ready code** - Include error handling and edge cases
7. **Match existing patterns** - Look at similar features for consistency
8. **Update this document** - If you add new patterns or make architectural changes

### When User Asks For:

**"Add a feature"** → Check if similar feature exists, follow same pattern
**"Fix a bug"** → Look for similar implementations, check common issues
**"Optimize"** → Review caching, indexes, API calls
**"Deploy"** → Check Vercel config, environment variables
**"Database change"** → Update schema, RLS policies, types

---

*This is a living document. Update it as the project evolves.*
