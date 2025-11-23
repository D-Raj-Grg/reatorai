# Product Requirements Document (PRD)
## ReatorAI - Viral Content Research & Script Generator

---

## 1. Product Overview

### 1.1 Product Name
**ReatorAI** - AI-Powered Viral Content Research & Script Generator

### 1.2 Product Vision
Build an AI-powered research and scriptwriting tool that helps educational content creators (starting with LAZY SANDY) discover viral YouTube videos in their niche, analyze what makes them successful, and generate custom scripts optimized for short-form platforms (TikTok, YouTube Shorts, Instagram Reels).

### 1.3 Problem Statement
Content creators spend 5-10 hours per week:
- Manually searching for trending topics and viral videos
- Analyzing successful content to understand patterns
- Writing scripts for new videos
- Struggling to convert viewers into followers

### 1.4 Solution
A web application that:
1. Automatically tracks YouTube channels in the educational niche
2. Identifies "outlier" videos (performing 2x+ better than channel average)
3. Extracts and analyzes video transcripts
4. Generates custom scripts using proven viral frameworks
5. Helps optimize content for maximum viewer-to-follower conversion

### 1.5 Success Metrics
- **Primary**: Reduce script research + writing time from 60 minutes to 10 minutes
- **Secondary**: Increase user's viral hit rate by 50%
- **Tertiary**: Achieve 100+ videos analyzed per user per month

---

## 1.6 How It Works

ReatorAI handles the heavy lifting of idea research and scriptwriting so you can focus on bringing your short-form videos to life.

### STEP 1: Build Your Watchlists
Track your favorite channels across YouTube (Instagram & TikTok coming soon). Add unlimited channels. Build unlimited watchlists to organize by niche, topic, or content style.

**Key Features:**
- Create multiple watchlists (e.g., "Science Channels", "Geography Creators", "Viral History")
- Add unlimited channels to each watchlist
- Organize channels by category, performance, or topic
- Quick-add channels via URL, handle, or channel ID
- Auto-sync all channels every 6 hours

### STEP 2: Find Outlier Videos
Discover the top performing videos in your niche using powerful search, filtering and sorting tools.

**Key Features:**
- Automatic outlier detection (videos performing 2x+ better than channel average)
- Advanced filters: date range, views, engagement rate, channel
- Search by keywords in title/description
- Sort by views, engagement, date, or outlier score
- Visual badges for outlier videos
- Performance metrics at a glance

### STEP 3: Understand Why They Went Viral
Easily unpack topics, hooks, story structures, visual formats, styles and more. High quality transcripts available instantly.

**Key Features:**
- AI-powered analysis of viral videos
- Breakdown of hook effectiveness (first 3-5 seconds)
- Storytelling structure identification
- Emotional trigger analysis
- Visual format recommendations
- Instant transcript extraction
- Key takeaways and actionable insights

### STEP 4: Write Winning Short-Form Scripts
Take outlier ideas and apply proven storytelling formats and viral hooks to instantly remix into your own version. And it'll sound like you, not a generic chatbot.

**Key Features:**
- Choose from 9 viral hook formats
- Select from 7 proven storytelling frameworks
- Custom writing style that matches YOUR voice
- 60-90 second scripts optimized for short-form
- Includes visual suggestions and CTA guidance
- Export scripts for easy filming
- Save to library for future reference

---

## 2. Technology Stack

### 2.1 Frontend
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **State Management**: Zustand (for client state) + React Query (for server state)
- **Forms**: React Hook Form + Zod validation
- **Charts/Visualizations**: Recharts or Tremor

### 2.2 Backend
- **Runtime**: Next.js API Routes (serverless functions)
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Storage**: Supabase Storage (for thumbnails, exports)
- **Caching**: Vercel Edge Cache + Supabase caching
- **Background Jobs**: Vercel Cron Jobs (for scheduled tasks)

### 2.3 External APIs
- **YouTube Data API v3** (already available)
- **OpenAI GPT-4/GPT-4o** (ChatGPT API - already available)
- **YouTube Transcript API** (for extracting transcripts)

### 2.4 Deployment
- **Hosting**: Vercel
- **Database**: Supabase (hosted PostgreSQL)
- **Domain**: Custom domain (TBD)
- **Analytics**: Vercel Analytics or PostHog

### 2.5 Development Tools
- **Version Control**: Git + GitHub
- **Package Manager**: npm or pnpm
- **Code Quality**: ESLint + Prettier
- **Type Checking**: TypeScript strict mode
- **Testing** (Optional for MVP): Jest + React Testing Library

---

## 3. User Personas

### 3.1 Primary Persona: Raj (The Educational Creator)
- **Role**: Content creator running LAZY SANDY brand
- **Goals**: 
  - Create engaging educational content about science, geography, history
  - Increase follower conversion rate
  - Maintain consistent posting schedule
- **Pain Points**:
  - Limited time for research
  - Difficulty identifying trending topics
  - Low viewer-to-follower conversion
- **Technical Skill**: Moderate (comfortable with web tools)

### 3.2 Secondary Persona: Content Creators in Similar Niches
- Educational content creators
- Science communicators
- Geography enthusiasts
- History storytellers

---

## 4. Core Features & Requirements

### 4.1 Feature Set Overview

#### MVP (Phase 1) - Weeks 1-6
1. User Authentication
2. Channel Tracking (YouTube only)
3. Video Discovery & Outlier Detection
4. Transcript Extraction
5. Basic Script Generation
6. Dashboard with Analytics

#### Phase 2 - Weeks 7-10
1. Advanced Filtering & Search
2. Project/Collection Organization
3. Custom Writing Style Training
4. Multiple Hook & Storytelling Frameworks
5. Video Analysis (AI-powered)

#### Phase 3 - Weeks 11-14
1. Alerts & Notifications
2. Export Functionality
3. Collaboration Features (optional)
4. Performance Analytics

---

### 4.2 Detailed Feature Requirements

## Feature 1: User Authentication & Account Management

### 4.2.1 Authentication
**Priority**: P0 (MVP Blocker)

**Requirements**:
- Email/password authentication via Supabase Auth
- Google OAuth sign-in (optional but recommended)
- Email verification for new accounts
- Password reset functionality
- Session management with automatic refresh

**User Stories**:
- As a new user, I want to sign up with my email so I can access the platform
- As a returning user, I want to log in quickly with Google
- As a user, I want to reset my password if I forget it

**Acceptance Criteria**:
- [ ] User can create an account with email + password
- [ ] User receives verification email upon signup
- [ ] User can log in with verified credentials
- [ ] User can log out and session is cleared
- [ ] User can reset password via email link
- [ ] Session persists across browser refreshes
- [ ] Protected routes redirect to login if not authenticated

**Technical Implementation**:
```typescript
// Supabase Auth setup
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// Sign up
const { data, error } = await supabase.auth.signUp({
  email: 'user@example.com',
  password: 'password123'
})

// Sign in
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'password123'
})

// OAuth (Google)
const { data, error } = await supabase.auth.signInWithOAuth({
  provider: 'google'
})
```

---

## Feature 2: Channel Tracking

### 4.2.2 Add YouTube Channels
**Priority**: P0 (MVP Blocker)

**Requirements**:
- User can add YouTube channels by:
  - Channel URL
  - Channel ID
  - Channel handle (@username)
- System validates channel exists
- System fetches and stores basic channel info
- User can view list of tracked channels
- User can remove channels from tracking

**User Stories**:
- As a user, I want to add educational YouTube channels I want to monitor
- As a user, I want to see all channels I'm tracking in one place
- As a user, I want to remove channels I'm no longer interested in

**Acceptance Criteria**:
- [ ] User can paste YouTube channel URL and add it to tracking list
- [ ] System validates channel exists before adding
- [ ] System displays channel thumbnail, name, subscriber count
- [ ] User can view all tracked channels in a list/grid
- [ ] User can delete channels from tracking
- [ ] Maximum 50 channels can be tracked (MVP limit)

**Database Schema**:
```sql
-- Channels table
CREATE TABLE channels (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    platform VARCHAR(20) DEFAULT 'youtube',
    channel_id VARCHAR(255) NOT NULL,
    channel_name VARCHAR(255),
    channel_handle VARCHAR(255),
    thumbnail_url TEXT,
    subscriber_count BIGINT,
    total_videos INTEGER,
    description TEXT,
    last_synced_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(user_id, channel_id)
);

CREATE INDEX idx_channels_user_id ON channels(user_id);
CREATE INDEX idx_channels_channel_id ON channels(channel_id);
```

**API Endpoint**:
```typescript
// POST /api/channels/add
interface AddChannelRequest {
  channelUrl: string; // or channelId or handle
}

interface AddChannelResponse {
  success: boolean;
  channel?: {
    id: string;
    name: string;
    handle: string;
    thumbnail: string;
    subscribers: number;
  };
  error?: string;
}
```

**YouTube API Integration**:
```typescript
// Fetch channel info
async function getChannelInfo(channelId: string) {
  const response = await fetch(
    `https://www.googleapis.com/youtube/v3/channels?` +
    `part=snippet,statistics&id=${channelId}&key=${YOUTUBE_API_KEY}`
  );
  
  const data = await response.json();
  const channel = data.items[0];
  
  return {
    id: channel.id,
    name: channel.snippet.title,
    thumbnail: channel.snippet.thumbnails.default.url,
    subscribers: parseInt(channel.statistics.subscriberCount),
    totalVideos: parseInt(channel.statistics.videoCount),
    description: channel.snippet.description
  };
}
```

---

## Feature 2.5: Watchlists (Collections)

### 4.2.25 Create and Manage Watchlists
**Priority**: P1 (Important for Organization)

**Requirements**:
- User can create multiple watchlists (collections of channels)
- Each watchlist can contain unlimited channels
- User can organize channels by topic, niche, content type, etc.
- Watchlists help users organize research and focus on specific content areas
- User can rename, delete, or reorganize watchlists

**User Stories**:
- As a user, I want to group related channels together (e.g., "Science Channels", "Top Competitors")
- As a user, I want to view videos from a specific watchlist only
- As a user, I want to track different niches separately
- As a user, I want to quickly switch between different content categories

**Acceptance Criteria**:
- [ ] User can create new watchlists with custom names
- [ ] User can add channels to one or multiple watchlists
- [ ] User can view all watchlists in sidebar or dedicated page
- [ ] User can filter videos by watchlist
- [ ] User can rename/delete watchlists
- [ ] User can see channel count per watchlist
- [ ] Deleting a watchlist doesn't delete the channels (just the grouping)
- [ ] User can have unlimited watchlists (no artificial limits)

**Database Schema**:
```sql
-- Watchlists table
CREATE TABLE watchlists (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    
    name VARCHAR(255) NOT NULL,
    description TEXT,
    color VARCHAR(7), -- Hex color for visual distinction
    icon VARCHAR(50), -- Icon name for UI
    
    -- Metadata
    channel_count INTEGER DEFAULT 0,
    total_videos INTEGER DEFAULT 0,
    total_outliers INTEGER DEFAULT 0,
    
    -- Display order
    display_order INTEGER DEFAULT 0,
    
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Watchlist channels (many-to-many relationship)
CREATE TABLE watchlist_channels (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    watchlist_id UUID REFERENCES watchlists(id) ON DELETE CASCADE,
    channel_id UUID REFERENCES channels(id) ON DELETE CASCADE,
    
    added_at TIMESTAMP DEFAULT NOW(),
    
    UNIQUE(watchlist_id, channel_id)
);

CREATE INDEX idx_watchlists_user_id ON watchlists(user_id);
CREATE INDEX idx_watchlist_channels_watchlist_id ON watchlist_channels(watchlist_id);
CREATE INDEX idx_watchlist_channels_channel_id ON watchlist_channels(channel_id);

-- Function to update watchlist stats
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
```

**API Endpoints**:

```typescript
// GET /api/watchlists
// Get all watchlists for user
interface WatchlistResponse {
  watchlists: Array<{
    id: string;
    name: string;
    description: string;
    color: string;
    icon: string;
    channelCount: number;
    totalVideos: number;
    totalOutliers: number;
  }>;
}

// POST /api/watchlists
// Create new watchlist
interface CreateWatchlistRequest {
  name: string;
  description?: string;
  color?: string;
  icon?: string;
}

// PATCH /api/watchlists/[id]
// Update watchlist
interface UpdateWatchlistRequest {
  name?: string;
  description?: string;
  color?: string;
  icon?: string;
}

// DELETE /api/watchlists/[id]
// Delete watchlist (not the channels)

// POST /api/watchlists/[id]/channels
// Add channel to watchlist
interface AddChannelToWatchlistRequest {
  channelId: string;
}

// DELETE /api/watchlists/[id]/channels/[channelId]
// Remove channel from watchlist

// GET /api/watchlists/[id]/videos
// Get all videos from channels in this watchlist
interface WatchlistVideosQuery {
  isOutlier?: boolean;
  sortBy?: 'views' | 'engagement' | 'date';
  limit?: number;
  page?: number;
}
```

**UI Components**:

```typescript
// Watchlist card for sidebar/grid
interface WatchlistCardProps {
  watchlist: {
    id: string;
    name: string;
    color: string;
    icon: string;
    channelCount: number;
    totalOutliers: number;
  };
  onSelect: (id: string) => void;
}

// Watchlist creation modal
interface CreateWatchlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (watchlist: Watchlist) => void;
}

// Channel assignment to watchlists
interface ChannelWatchlistsProps {
  channelId: string;
  currentWatchlists: string[];
  onUpdate: (watchlistIds: string[]) => void;
}
```

**Implementation Example**:

```typescript
// Create watchlist
export async function POST(request: Request) {
  const session = await getSession();
  const { name, description, color, icon } = await request.json();
  
  const { data, error } = await supabase
    .from('watchlists')
    .insert({
      user_id: session.user.id,
      name,
      description,
      color: color || '#3B82F6',
      icon: icon || 'folder'
    })
    .select()
    .single();
  
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
  
  return NextResponse.json({ watchlist: data });
}

// Add channel to watchlist
export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { channelId } = await request.json();
  
  const { error } = await supabase
    .from('watchlist_channels')
    .insert({
      watchlist_id: params.id,
      channel_id: channelId
    });
  
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
  
  return NextResponse.json({ success: true });
}

// Get videos from watchlist
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { searchParams } = new URL(request.url);
  const isOutlier = searchParams.get('isOutlier') === 'true';
  
  // Get all channel IDs in this watchlist
  const { data: watchlistChannels } = await supabase
    .from('watchlist_channels')
    .select('channel_id')
    .eq('watchlist_id', params.id);
  
  const channelIds = watchlistChannels?.map(wc => wc.channel_id) || [];
  
  // Get videos from these channels
  let query = supabase
    .from('videos')
    .select(`
      *,
      channels(id, channel_name, thumbnail_url)
    `)
    .in('channel_id', channelIds);
  
  if (isOutlier) {
    query = query.eq('is_outlier', true);
  }
  
  const { data: videos, error } = await query
    .order('published_at', { ascending: false })
    .limit(50);
  
  return NextResponse.json({ videos });
}
```

**UI Layout for Watchlists**:

```tsx
// Sidebar with watchlists
function Sidebar() {
  const { data: watchlists } = useQuery({
    queryKey: ['watchlists'],
    queryFn: fetchWatchlists
  });
  
  return (
    <aside className="w-64 border-r">
      <div className="p-4">
        <h2 className="font-semibold mb-4">Watchlists</h2>
        
        <Button 
          onClick={() => setShowCreateModal(true)}
          className="w-full mb-4"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Watchlist
        </Button>
        
        <div className="space-y-2">
          {watchlists?.map(watchlist => (
            <WatchlistCard
              key={watchlist.id}
              watchlist={watchlist}
              onSelect={handleSelectWatchlist}
            />
          ))}
        </div>
      </div>
    </aside>
  );
}

// Watchlist card component
function WatchlistCard({ watchlist, onSelect }: WatchlistCardProps) {
  return (
    <button
      onClick={() => onSelect(watchlist.id)}
      className="w-full p-3 rounded-lg hover:bg-gray-100 text-left transition"
    >
      <div className="flex items-center gap-3">
        <div 
          className="w-10 h-10 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: watchlist.color + '20' }}
        >
          <Icon 
            name={watchlist.icon} 
            style={{ color: watchlist.color }}
          />
        </div>
        
        <div className="flex-1 min-w-0">
          <p className="font-medium truncate">{watchlist.name}</p>
          <p className="text-sm text-gray-500">
            {watchlist.channelCount} channels · {watchlist.totalOutliers} outliers
          </p>
        </div>
      </div>
    </button>
  );
}
```

**Predefined Watchlist Templates** (Optional - for better UX):

When user first signs up, offer to create starter watchlists:

```typescript
const WATCHLIST_TEMPLATES = [
  {
    name: "Top Competitors",
    description: "Track your main competitors",
    color: "#EF4444",
    icon: "target"
  },
  {
    name: "Inspiration",
    description: "Channels that inspire your content",
    color: "#8B5CF6",
    icon: "lightbulb"
  },
  {
    name: "My Niche",
    description: "Educational creators in my space",
    color: "#3B82F6",
    icon: "bookmark"
  },
  {
    name: "Rising Stars",
    description: "Fast-growing channels to watch",
    color: "#10B981",
    icon: "trending-up"
  }
];
```

**Color Palette for Watchlists**:

```typescript
const WATCHLIST_COLORS = [
  { name: 'Blue', value: '#3B82F6' },
  { name: 'Purple', value: '#8B5CF6' },
  { name: 'Green', value: '#10B981' },
  { name: 'Red', value: '#EF4444' },
  { name: 'Orange', value: '#F59E0B' },
  { name: 'Pink', value: '#EC4899' },
  { name: 'Teal', value: '#14B8A6' },
  { name: 'Indigo', value: '#6366F1' },
];
```

**Icon Options for Watchlists** (using Lucide icons):

```typescript
const WATCHLIST_ICONS = [
  'folder', 'bookmark', 'star', 'target', 'heart',
  'lightbulb', 'trending-up', 'zap', 'flag', 'award',
  'compass', 'eye', 'film', 'play-circle', 'users'
];
```

---

### 4.2.3 Automatic Video Fetching
**Priority**: P0 (MVP Blocker)

**Requirements**:
- System automatically fetches latest videos from tracked channels
- Videos are synced every 24 hours (configurable)
- Store video metadata (title, views, likes, comments, published date)
- Calculate engagement metrics
- Identify outlier videos

**User Stories**:
- As a user, I want videos from my tracked channels to be automatically fetched
- As a user, I want to see which videos are performing exceptionally well (outliers)

**Acceptance Criteria**:
- [ ] System fetches latest 50 videos from each tracked channel daily
- [ ] Video data includes: title, description, views, likes, comments, duration, thumbnail
- [ ] System calculates engagement rate: (likes + comments) / views
- [ ] System identifies outliers (videos with 2x+ views vs channel average)
- [ ] Videos are stored in database with all metadata
- [ ] User can manually trigger sync for a specific channel

**Database Schema**:
```sql
-- Videos table
CREATE TABLE videos (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    channel_id UUID REFERENCES channels(id) ON DELETE CASCADE,
    platform VARCHAR(20) DEFAULT 'youtube',
    video_id VARCHAR(255) NOT NULL UNIQUE,
    title TEXT NOT NULL,
    description TEXT,
    thumbnail_url TEXT,
    duration INTEGER, -- in seconds
    view_count BIGINT DEFAULT 0,
    like_count BIGINT DEFAULT 0,
    comment_count BIGINT DEFAULT 0,
    published_at TIMESTAMP,
    
    -- Calculated fields
    engagement_rate FLOAT,
    is_outlier BOOLEAN DEFAULT FALSE,
    outlier_score FLOAT,
    
    -- Transcript
    transcript TEXT,
    transcript_fetched_at TIMESTAMP,
    
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_videos_channel_id ON videos(channel_id);
CREATE INDEX idx_videos_is_outlier ON videos(is_outlier);
CREATE INDEX idx_videos_published_at ON videos(published_at DESC);
CREATE INDEX idx_videos_view_count ON videos(view_count DESC);
```

**Outlier Detection Algorithm**:
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
  
  // Calculate view ratio (how much better than channel average)
  const viewRatio = video.views / channelAvg.avgViews;
  
  // Calculate engagement ratio
  const engagementRatio = engagementRate / channelAvg.avgEngagementRate;
  
  // Weighted outlier score (60% views, 40% engagement)
  const outlierScore = (viewRatio * 0.6) + (engagementRatio * 0.4);
  
  // Mark as outlier if 2x better than average
  const isOutlier = outlierScore >= 2.0;
  
  return { isOutlier, score: outlierScore };
}
```

**Cron Job for Syncing** (Vercel Cron):
```typescript
// app/api/cron/sync-videos/route.ts
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  // Verify cron secret
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  // Fetch all channels
  const channels = await supabase
    .from('channels')
    .select('*')
    .order('last_synced_at', { ascending: true })
    .limit(10); // Process 10 channels per run
  
  for (const channel of channels.data) {
    await syncChannelVideos(channel);
  }
  
  return NextResponse.json({ success: true });
}
```

**vercel.json** configuration:
```json
{
  "crons": [
    {
      "path": "/api/cron/sync-videos",
      "schedule": "0 */6 * * *"
    }
  ]
}
```

---

## Feature 4: Transcript Extraction

### 4.2.4 YouTube Transcript Fetching
**Priority**: P0 (MVP Blocker)

**Requirements**:
- Extract transcripts from YouTube videos
- Support multiple languages (primarily English)
- Handle videos without transcripts gracefully
- Store transcripts in database for analysis

**User Stories**:
- As a user, I want to read the transcript of any video
- As a user, I want the system to automatically fetch transcripts for outlier videos

**Acceptance Criteria**:
- [ ] System fetches transcript when video is marked as outlier
- [ ] Transcript is stored in videos.transcript column
- [ ] User can view transcript in video detail view
- [ ] System handles videos without transcripts (shows "No transcript available")
- [ ] Transcript is used for AI analysis and script generation

**Technical Implementation**:
```typescript
// Using youtube-transcript library
import { YoutubeTranscript } from 'youtube-transcript';

async function fetchTranscript(videoId: string): Promise<string | null> {
  try {
    const transcript = await YoutubeTranscript.fetchTranscript(videoId);
    
    // Combine all transcript segments into one text
    const fullTranscript = transcript
      .map(segment => segment.text)
      .join(' ');
    
    return fullTranscript;
  } catch (error) {
    console.error('Failed to fetch transcript:', error);
    return null;
  }
}

// Store in database
await supabase
  .from('videos')
  .update({
    transcript: transcript,
    transcript_fetched_at: new Date().toISOString()
  })
  .eq('id', videoId);
```

**Package Installation**:
```bash
npm install youtube-transcript
```

---

## Feature 5: Video Analysis (AI-Powered)

### 4.2.5 Analyze Why Videos Went Viral
**Priority**: P1 (Important for MVP)

**Requirements**:
- Use OpenAI GPT-4 to analyze viral videos
- Extract insights about:
  - Hook effectiveness (first 3-5 seconds)
  - Storytelling structure
  - Emotional triggers
  - Visual format recommendations
  - Call-to-action effectiveness
- Store analysis in database
- Display analysis in video detail view

**User Stories**:
- As a user, I want to understand why a specific video went viral
- As a user, I want AI-generated insights about successful content patterns

**Acceptance Criteria**:
- [ ] User can click "Analyze" button on any outlier video
- [ ] System sends video metadata + transcript to OpenAI API
- [ ] AI returns structured analysis with key insights
- [ ] Analysis is stored in database
- [ ] Analysis is displayed in readable format with sections
- [ ] Analysis costs are tracked (OpenAI API usage)

**Database Schema**:
```sql
-- Video analysis table
CREATE TABLE video_analyses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    video_id UUID REFERENCES videos(id) ON DELETE CASCADE,
    
    -- Analysis sections
    hook_analysis TEXT,
    storytelling_analysis TEXT,
    emotional_triggers TEXT,
    visual_format TEXT,
    cta_analysis TEXT,
    key_takeaways TEXT,
    
    -- Metadata
    analyzed_at TIMESTAMP DEFAULT NOW(),
    tokens_used INTEGER,
    
    UNIQUE(video_id)
);
```

**OpenAI Integration**:
```typescript
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

async function analyzeVideo(video: {
  title: string;
  description: string;
  transcript: string;
  views: number;
  likes: number;
  comments: number;
}) {
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
   - What framework is used? (Problem-Solution, Before-After, Story Arc, etc.)
   - How is information sequenced?

3. **Emotional Triggers**
   - What emotions are evoked? (Curiosity, surprise, awe, etc.)
   - How does it maintain engagement?

4. **Visual Format Recommendations**
   - What visual style likely worked? (Talking head, B-roll, graphics, etc.)
   - Any specific visual hooks mentioned?

5. **Call-to-Action**
   - How does it encourage engagement (likes, comments, follows)?
   - Is there a strong ending?

6. **Key Takeaways**
   - 3-5 specific tactics that made this video successful
   - How can these be applied to future videos?

Format your response in clean markdown with headers for each section.
`;

  const response = await openai.chat.completions.create({
    model: 'gpt-4o', // or 'gpt-4-turbo'
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

  return response.choices[0].message.content;
}
```

**API Endpoint**:
```typescript
// POST /api/videos/[videoId]/analyze
export async function POST(
  request: Request,
  { params }: { params: { videoId: string } }
) {
  const { videoId } = params;
  
  // Fetch video from database
  const { data: video } = await supabase
    .from('videos')
    .select('*')
    .eq('id', videoId)
    .single();
  
  if (!video || !video.transcript) {
    return NextResponse.json(
      { error: 'Video or transcript not found' },
      { status: 404 }
    );
  }
  
  // Analyze with AI
  const analysis = await analyzeVideo(video);
  
  // Store analysis
  await supabase
    .from('video_analyses')
    .upsert({
      video_id: videoId,
      full_analysis: analysis,
      analyzed_at: new Date().toISOString()
    });
  
  return NextResponse.json({ analysis });
}
```

---

## Feature 6: Script Generation

### 4.2.6 Generate Viral Scripts with AI
**Priority**: P0 (MVP Blocker)

**Requirements**:
- Generate short-form video scripts (60-90 seconds)
- Support multiple hook formats
- Support multiple storytelling frameworks
- Allow custom writing style/voice
- Generate based on viral video insights
- Export scripts in various formats

**User Stories**:
- As a user, I want to generate a script based on a viral video's topic
- As a user, I want to choose different hook formats and storytelling structures
- As a user, I want the script to sound like me, not generic AI
- As a user, I want to export the script to use while filming

**Acceptance Criteria**:
- [ ] User can click "Generate Script" from any video
- [ ] User can select hook format (9 options)
- [ ] User can select storytelling framework (7 options)
- [ ] User can input custom writing style preferences
- [ ] Generated script is 60-90 seconds when spoken aloud
- [ ] Script includes sections: Hook, Body, CTA
- [ ] Script includes visual suggestions
- [ ] User can regenerate with different parameters
- [ ] Scripts are saved to user's library
- [ ] User has monthly script generation limit based on plan

**Hook Formats** (9 Types):
1. Pattern Interrupt - "Wait, what?! Did you know..."
2. Shocking Stat - "97% of people don't know..."
3. Personal Story - "I lost $X before I learned..."
4. Bold Claim - "This will change everything about..."
5. Question Hook - "Ever wonder why...?"
6. Trend Jacking - "Everyone's talking about X, but..."
7. Contrarian Take - "Everything you've been told about X is wrong"
8. List Format - "3 secrets that..."
9. Direct Address - "If you're trying to... watch this"

**Storytelling Frameworks** (7 Types):
1. Problem-Agitate-Solve (PAS)
2. Before-After-Bridge (BAB)
3. AIDA (Attention-Interest-Desire-Action)
4. Hero's Journey (simplified)
5. Situation-Complication-Resolution
6. Feature-Benefit-Proof
7. Curiosity Loop

**Database Schema**:
```sql
-- User writing styles
CREATE TABLE user_writing_styles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    style_name VARCHAR(255) DEFAULT 'Default',
    
    -- Style parameters
    tone VARCHAR(100), -- casual, professional, enthusiastic, etc.
    vocabulary_level VARCHAR(50), -- simple, moderate, advanced
    sentence_length VARCHAR(50), -- short, medium, long
    personality_traits TEXT[], -- funny, serious, curious, etc.
    example_text TEXT, -- User provides example of their writing
    
    is_default BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW(),
    
    UNIQUE(user_id, style_name)
);

-- Generated scripts
CREATE TABLE scripts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    source_video_id UUID REFERENCES videos(id) ON DELETE SET NULL,
    writing_style_id UUID REFERENCES user_writing_styles(id),
    
    -- Script parameters
    hook_format VARCHAR(100),
    storytelling_framework VARCHAR(100),
    
    -- Generated content
    topic VARCHAR(255),
    hook_text TEXT,
    body_text TEXT,
    cta_text TEXT,
    visual_suggestions TEXT,
    full_script TEXT,
    
    -- Metadata
    estimated_duration INTEGER, -- in seconds
    word_count INTEGER,
    tokens_used INTEGER,
    
    -- Status
    is_favorite BOOLEAN DEFAULT FALSE,
    
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_scripts_user_id ON scripts(user_id);
CREATE INDEX idx_scripts_created_at ON scripts(created_at DESC);
```

**Script Generation Implementation**:
```typescript
interface ScriptGenerationRequest {
  sourceVideoId: string;
  hookFormat: string;
  storytellingFramework: string;
  writingStyleId?: string;
  customTopic?: string; // If different from source video
}

async function generateScript(params: ScriptGenerationRequest) {
  // Fetch source video
  const { data: video } = await supabase
    .from('videos')
    .select('*')
    .eq('id', params.sourceVideoId)
    .single();
  
  // Fetch user writing style
  let writingStyle = null;
  if (params.writingStyleId) {
    const { data } = await supabase
      .from('user_writing_styles')
      .select('*')
      .eq('id', params.writingStyleId)
      .single();
    writingStyle = data;
  }
  
  // Build prompt
  const prompt = buildScriptPrompt({
    video,
    hookFormat: params.hookFormat,
    framework: params.storytellingFramework,
    writingStyle,
    customTopic: params.customTopic
  });
  
  // Generate with OpenAI
  const response = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      {
        role: 'system',
        content: `You are an expert scriptwriter for viral short-form educational content. You specialize in creating engaging 60-90 second scripts that maximize viewer retention and follower conversion.`
      },
      {
        role: 'user',
        content: prompt
      }
    ],
    temperature: 0.8,
    max_tokens: 1500
  });
  
  const scriptContent = response.choices[0].message.content;
  
  // Parse and structure the script
  const parsedScript = parseScriptResponse(scriptContent);
  
  // Save to database
  const { data: savedScript } = await supabase
    .from('scripts')
    .insert({
      user_id: userId,
      source_video_id: params.sourceVideoId,
      writing_style_id: params.writingStyleId,
      hook_format: params.hookFormat,
      storytelling_framework: params.storytellingFramework,
      topic: parsedScript.topic,
      hook_text: parsedScript.hook,
      body_text: parsedScript.body,
      cta_text: parsedScript.cta,
      visual_suggestions: parsedScript.visuals,
      full_script: scriptContent,
      estimated_duration: parsedScript.estimatedDuration,
      word_count: parsedScript.wordCount,
      tokens_used: response.usage?.total_tokens
    })
    .select()
    .single();
  
  return savedScript;
}

function buildScriptPrompt(params: any): string {
  const { video, hookFormat, framework, writingStyle, customTopic } = params;
  
  return `
Create a viral short-form video script for educational content.

**Source Video Information:**
- Title: ${video.title}
- Topic: ${customTopic || video.title}
- Performance: ${video.view_count.toLocaleString()} views
- Key Points from Transcript: ${video.transcript?.substring(0, 1000)}

**Script Requirements:**
- Hook Format: ${hookFormat}
- Storytelling Framework: ${framework}
- Target Duration: 60-90 seconds when spoken aloud
${writingStyle ? `
**Writing Style:**
- Tone: ${writingStyle.tone}
- Vocabulary: ${writingStyle.vocabulary_level}
- Personality: ${writingStyle.personality_traits?.join(', ')}
${writingStyle.example_text ? `- Example of user's style: "${writingStyle.example_text}"` : ''}
` : ''}

**Output Format:**
Provide the script in this exact structure:

---
**TOPIC:** [One-line topic description]

**HOOK (0-3 seconds):**
[Opening line using ${hookFormat} format - must grab attention immediately]

**BODY (3-60 seconds):**
[Main content following ${framework} framework]
- Present information in engaging, easy-to-follow way
- Use specific examples or facts
- Build curiosity and maintain attention
- Natural transitions between points

**CALL-TO-ACTION (60-90 seconds):**
[Strong ending that encourages follows/engagement]
- Make viewers want to follow for more
- Clear, specific ask

**VISUAL SUGGESTIONS:**
[Specific visual ideas for each section]
- What to show during hook
- B-roll or graphics for body
- Visual CTA elements

**ESTIMATED DURATION:** [X seconds]
---

CRITICAL REQUIREMENTS:
1. Script must be concise enough for 60-90 seconds
2. Use conversational, engaging language
3. Every word should add value - no fluff
4. Hook must be compelling within 3 seconds
5. End with clear CTA to convert viewers to followers
${writingStyle ? '6. Match the provided writing style - make it sound human and authentic' : ''}
`;
}
```

**Usage Tracking**:
```sql
-- User subscriptions/plans
CREATE TABLE user_subscriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
    plan_type VARCHAR(50) DEFAULT 'free', -- free, pro, premium
    
    -- Usage limits
    max_scripts_per_month INTEGER DEFAULT 10,
    max_channels INTEGER DEFAULT 5,
    max_analyses_per_month INTEGER DEFAULT 20,
    
    -- Usage tracking
    scripts_used_this_month INTEGER DEFAULT 0,
    analyses_used_this_month INTEGER DEFAULT 0,
    
    -- Billing
    current_period_start DATE,
    current_period_end DATE,
    
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Reset usage monthly (via cron)
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
```

---

## Feature 7: Dashboard & Video Library

### 4.2.7 Main Dashboard
**Priority**: P0 (MVP Blocker)

**Requirements**:
- Display overview of tracked channels
- Show recent outlier videos
- Quick stats (total videos, outliers, scripts generated)
- Search and filter videos
- Sort by views, engagement, date

**User Stories**:
- As a user, I want to see all my data in one place
- As a user, I want to quickly find high-performing videos
- As a user, I want to search by topic or keyword

**UI Components**:

```typescript
// Dashboard sections
interface DashboardData {
  stats: {
    totalChannels: number;
    totalVideos: number;
    totalOutliers: number;
    scriptsGenerated: number;
    scriptsRemaining: number;
  };
  recentOutliers: Video[];
  topChannels: Channel[];
  recentScripts: Script[];
}
```

**Key Views**:

1. **Stats Overview**
   - Cards showing key metrics
   - Monthly usage progress bars

2. **Outlier Videos Feed**
   - Grid/list of recent outlier videos
   - Thumbnail, title, views, engagement rate
   - Quick actions: Analyze, Generate Script, Save

3. **Tracked Channels**
   - List of all tracked channels
   - Last sync time
   - Quick stats per channel

4. **My Scripts**
   - Library of generated scripts
   - Filter by date, topic, hook format
   - Export, edit, favorite

---

## Feature 8: Search & Filtering

### 4.2.8 Advanced Filtering
**Priority**: P1 (Important)

**Requirements**:
- Filter videos by:
  - Date range
  - View count range
  - Engagement rate
  - Channel
  - Outlier status
- Search by keyword in title/description
- Sort by multiple criteria
- Save filter presets

**Implementation**:
```typescript
interface VideoFilters {
  searchQuery?: string;
  channelIds?: string[];
  isOutlier?: boolean;
  dateRange?: {
    start: Date;
    end: Date;
  };
  viewRange?: {
    min: number;
    max: number;
  };
  engagementRange?: {
    min: number;
    max: number;
  };
  sortBy: 'views' | 'engagement' | 'date' | 'outlierScore';
  sortOrder: 'asc' | 'desc';
}

// Supabase query builder
async function getFilteredVideos(filters: VideoFilters) {
  let query = supabase
    .from('videos')
    .select(`
      *,
      channels(id, channel_name, thumbnail_url)
    `);
  
  if (filters.searchQuery) {
    query = query.or(
      `title.ilike.%${filters.searchQuery}%,description.ilike.%${filters.searchQuery}%`
    );
  }
  
  if (filters.channelIds?.length) {
    query = query.in('channel_id', filters.channelIds);
  }
  
  if (filters.isOutlier !== undefined) {
    query = query.eq('is_outlier', filters.isOutlier);
  }
  
  if (filters.dateRange) {
    query = query
      .gte('published_at', filters.dateRange.start.toISOString())
      .lte('published_at', filters.dateRange.end.toISOString());
  }
  
  if (filters.viewRange) {
    query = query
      .gte('view_count', filters.viewRange.min)
      .lte('view_count', filters.viewRange.max);
  }
  
  query = query.order(filters.sortBy, {
    ascending: filters.sortOrder === 'asc'
  });
  
  const { data, error } = await query;
  return data;
}
```

---

## 5. User Interface Design

### 5.1 Design Principles
- **Clean & Minimal**: Focus on content, not clutter
- **Data-First**: Surface insights quickly
- **Action-Oriented**: Clear CTAs for every feature
- **Responsive**: Mobile-friendly (though primarily desktop tool)
- **Fast**: Optimistic UI updates, skeleton loaders

### 5.2 Color Palette
```css
/* Primary Brand Colors */
--primary: #3B82F6; /* Blue - for CTAs */
--primary-dark: #2563EB;
--primary-light: #60A5FA;

/* Semantic Colors */
--success: #10B981; /* Green - for outliers, positive metrics */
--warning: #F59E0B; /* Orange - for warnings */
--error: #EF4444; /* Red - for errors */
--info: #6366F1; /* Purple - for info */

/* Neutrals */
--background: #FFFFFF;
--surface: #F9FAFB;
--border: #E5E7EB;
--text-primary: #111827;
--text-secondary: #6B7280;
--text-muted: #9CA3AF;
```

### 5.3 Typography
```css
/* Font Stack */
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;

/* Type Scale */
--text-xs: 0.75rem;    /* 12px */
--text-sm: 0.875rem;   /* 14px */
--text-base: 1rem;     /* 16px */
--text-lg: 1.125rem;   /* 18px */
--text-xl: 1.25rem;    /* 20px */
--text-2xl: 1.5rem;    /* 24px */
--text-3xl: 1.875rem;  /* 30px */
--text-4xl: 2.25rem;   /* 36px */
```

### 5.4 Key Pages & Layouts

#### Page 1: Dashboard (`/dashboard`)
```
┌─────────────────────────────────────────────────┐
│ Header: Logo | Search | User Menu              │
├─────────────────────────────────────────────────┤
│ Sidebar:                │ Main Content:         │
│ - Dashboard            │                        │
│ - Videos               │ Stats Cards:           │
│                        │ ┌────┬────┬────┬────┐ │
│ WATCHLISTS:            │ │ 12 │ 45 │ 8  │ 7  │ │
│ + New Watchlist        │ │Chan│Vids│Out │Scrp│ │
│ 📁 My Niche            │ └────┴────┴────┴────┘ │
│ 🎯 Competitors         │                        │
│ 💡 Inspiration         │ Recent Outliers:       │
│                        │ ┌────────────────────┐ │
│ - Channels             │ │ Video Card         │ │
│ - Scripts              │ │ Video Card         │ │
│ - Settings             │ │ Video Card         │ │
│                        │ └────────────────────┘ │
└─────────────────────────────────────────────────┘
```

#### Page 2: Videos Library (`/videos`)
```
┌─────────────────────────────────────────────────┐
│ Header                                          │
├─────────────────────────────────────────────────┤
│ Sidebar │ Filters:                              │
│         │ [ Search Box                      ]   │
│         │ □ Only Outliers                       │
│         │ Channel: [Dropdown ▼]                 │
│         │ Date Range: [Picker]                  │
│         │ Sort: [Views ▼]                       │
│         │                                       │
│         │ Video Grid:                           │
│         │ ┌─────┬─────┬─────┐                  │
│         │ │ Vid │ Vid │ Vid │                  │
│         │ │ 1   │ 2   │ 3   │                  │
│         │ ├─────┼─────┼─────┤                  │
│         │ │ Vid │ Vid │ Vid │                  │
│         │ │ 4   │ 5   │ 6   │                  │
│         │ └─────┴─────┴─────┘                  │
└─────────────────────────────────────────────────┘
```

#### Page 3: Video Detail (`/videos/[id]`)
```
┌─────────────────────────────────────────────────┐
│ Header                                          │
├─────────────────────────────────────────────────┤
│ Sidebar │ Video Player Embed                    │
│         │                                       │
│         │ Title: "Amazing Science Fact..."     │
│         │ Channel: [Avatar] Channel Name        │
│         │ Published: 2 days ago                 │
│         │                                       │
│         │ Metrics:                              │
│         │ 👁 1.2M views  👍 45K  💬 1.2K       │
│         │ ⚡ Outlier Score: 3.2x                │
│         │                                       │
│         │ Actions:                              │
│         │ [Analyze Video] [Generate Script]    │
│         │                                       │
│         │ Tabs:                                 │
│         │ [Transcript] [Analysis] [Scripts]    │
│         │                                       │
│         │ Tab Content...                        │
└─────────────────────────────────────────────────┘
```

#### Page 4: Script Generator (`/scripts/new`)
```
┌─────────────────────────────────────────────────┐
│ Header                                          │
├─────────────────────────────────────────────────┤
│ Sidebar │ Generate Script                       │
│         │                                       │
│         │ Source Video:                         │
│         │ [Selected Video Preview]              │
│         │                                       │
│         │ Hook Format:                          │
│         │ ○ Pattern Interrupt                   │
│         │ ● Shocking Stat                       │
│         │ ○ Personal Story                      │
│         │ [... more options]                    │
│         │                                       │
│         │ Storytelling Framework:               │
│         │ ● Problem-Agitate-Solve               │
│         │ ○ Before-After-Bridge                 │
│         │ [... more options]                    │
│         │                                       │
│         │ Writing Style:                        │
│         │ [My Default Style ▼]                  │
│         │                                       │
│         │ [Generate Script Button]              │
│         │                                       │
│         │ Generated Script:                     │
│         │ ┌────────────────────────┐            │
│         │ │ HOOK:                 │            │
│         │ │ ...                   │            │
│         │ │ BODY:                 │            │
│         │ │ ...                   │            │
│         │ └────────────────────────┘            │
│         │ [Copy] [Export] [Regenerate]         │
└─────────────────────────────────────────────────┘
```

### 5.5 Component Library (shadcn/ui)
Key components to use:
- Button
- Card
- Input
- Select
- Textarea
- Dialog/Modal
- Tabs
- Table
- Badge
- Avatar
- Skeleton (loading states)
- Toast (notifications)
- Command (search palette)

---

## 6. Data Flow & Architecture

### 6.1 Application Architecture

```
┌─────────────────────────────────────────────────┐
│                  Client (Browser)                │
│  Next.js 16 App Router + React + TypeScript     │
└───────────────────┬─────────────────────────────┘
                    │
                    │ HTTP/WebSocket
                    ▼
┌─────────────────────────────────────────────────┐
│           Vercel Edge Functions                  │
│       Next.js API Routes (Serverless)            │
├─────────────────────────────────────────────────┤
│  /api/auth/*         - Supabase Auth             │
│  /api/channels/*     - Channel management        │
│  /api/videos/*       - Video CRUD + analysis     │
│  /api/scripts/*      - Script generation         │
│  /api/cron/*         - Background jobs           │
└─────┬───────────────────────────────────┬───────┘
      │                                   │
      │                                   │
      ▼                                   ▼
┌─────────────────┐              ┌──────────────────┐
│  Supabase       │              │  External APIs   │
│  PostgreSQL     │              ├──────────────────┤
│  + Auth         │              │ YouTube Data API │
│  + Storage      │              │ OpenAI API       │
│  + Realtime     │              │ YouTube Transcript│
└─────────────────┘              └──────────────────┘
```

### 6.2 Data Flow Examples

#### Flow 1: Adding a Channel
```
User clicks "Add Channel"
  ↓
Input YouTube URL
  ↓
Client validates URL format
  ↓
POST /api/channels/add { channelUrl }
  ↓
Extract channel ID from URL
  ↓
Call YouTube Data API
  ↓
Get channel metadata
  ↓
Insert into Supabase channels table
  ↓
Trigger initial video sync (background)
  ↓
Return success to client
  ↓
Update UI with new channel
```

#### Flow 2: Generating a Script
```
User selects video + clicks "Generate Script"
  ↓
Choose hook format + framework
  ↓
POST /api/scripts/generate { videoId, hookFormat, framework }
  ↓
Check usage limits (scripts remaining)
  ↓
Fetch video + transcript from DB
  ↓
Build prompt with parameters
  ↓
Call OpenAI API
  ↓
Parse response into structured sections
  ↓
Save script to DB
  ↓
Increment usage counter
  ↓
Return script to client
  ↓
Display in UI with copy/export options
```

#### Flow 3: Daily Video Sync (Cron)
```
Vercel Cron triggers /api/cron/sync-videos
  ↓
Fetch all channels from DB (10 at a time)
  ↓
For each channel:
  ↓
  Call YouTube API for latest videos
  ↓
  For each video:
    ↓
    Check if exists in DB
    ↓
    If new: Insert
    If exists: Update metrics
  ↓
  Calculate channel averages
  ↓
  Run outlier detection
  ↓
  For outliers: Fetch transcript (if not exists)
  ↓
Update channel.last_synced_at
  ↓
Log sync results
```

---

## 7. API Endpoints Specification

### 7.1 Authentication

#### POST `/api/auth/signup`
```typescript
Request:
{
  email: string;
  password: string;
}

Response:
{
  success: boolean;
  user?: {
    id: string;
    email: string;
  };
  error?: string;
}
```

#### POST `/api/auth/login`
```typescript
Request:
{
  email: string;
  password: string;
}

Response:
{
  success: boolean;
  session?: Session;
  error?: string;
}
```

### 7.2 Channels

#### GET `/api/channels`
Get all tracked channels for user
```typescript
Response:
{
  channels: Channel[];
}
```

#### POST `/api/channels`
Add a new channel to track
```typescript
Request:
{
  channelUrl: string; // or channelId
}

Response:
{
  success: boolean;
  channel?: Channel;
  error?: string;
}
```

#### DELETE `/api/channels/[id]`
Remove a channel
```typescript
Response:
{
  success: boolean;
}
```

#### POST `/api/channels/[id]/sync`
Manually trigger sync for a channel
```typescript
Response:
{
  success: boolean;
  videosAdded: number;
  videosUpdated: number;
}
```

### 7.3 Videos

#### GET `/api/videos`
Get filtered videos
```typescript
Query Params:
{
  search?: string;
  channelId?: string;
  isOutlier?: boolean;
  startDate?: string;
  endDate?: string;
  sortBy?: 'views' | 'engagement' | 'date';
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

Response:
{
  videos: Video[];
  total: number;
  page: number;
  hasMore: boolean;
}
```

#### GET `/api/videos/[id]`
Get single video with details
```typescript
Response:
{
  video: Video & {
    channel: Channel;
    analysis?: VideoAnalysis;
    scripts?: Script[];
  };
}
```

#### POST `/api/videos/[id]/analyze`
Generate AI analysis for a video
```typescript
Response:
{
  analysis: VideoAnalysis;
  tokensUsed: number;
}
```

### 7.4 Scripts

#### GET `/api/scripts`
Get user's generated scripts
```typescript
Query Params:
{
  page?: number;
  limit?: number;
  sortBy?: 'date' | 'favorite';
}

Response:
{
  scripts: Script[];
  total: number;
  remaining: number; // scripts left this month
}
```

#### POST `/api/scripts/generate`
Generate a new script
```typescript
Request:
{
  videoId: string;
  hookFormat: string;
  framework: string;
  writingStyleId?: string;
  customTopic?: string;
}

Response:
{
  success: boolean;
  script?: Script;
  error?: string;
  remaining: number; // scripts left this month
}
```

#### GET `/api/scripts/[id]`
Get single script
```typescript
Response:
{
  script: Script;
}
```

#### DELETE `/api/scripts/[id]`
Delete a script
```typescript
Response:
{
  success: boolean;
}
```

#### PATCH `/api/scripts/[id]`
Update script (toggle favorite, edit content)
```typescript
Request:
{
  isFavorite?: boolean;
  content?: {
    hook?: string;
    body?: string;
    cta?: string;
  };
}

Response:
{
  success: boolean;
  script: Script;
}
```

### 7.5 User

#### GET `/api/user/subscription`
Get user's subscription and usage
```typescript
Response:
{
  plan: 'free' | 'pro' | 'premium';
  usage: {
    scriptsUsed: number;
    scriptsLimit: number;
    analysesUsed: number;
    analysesLimit: number;
    channelsUsed: number;
    channelsLimit: number;
  };
  periodEnd: string;
}
```

#### GET `/api/user/stats`
Get user's overall stats
```typescript
Response:
{
  totalChannels: number;
  totalVideos: number;
  totalOutliers: number;
  totalScripts: number;
  totalAnalyses: number;
}
```

---

## 8. Database Schema (Complete)

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (managed by Supabase Auth)
-- We'll reference auth.users

-- User subscriptions and limits
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

-- Channels
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

-- Videos
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

-- Video analyses
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

-- User writing styles
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

-- Generated scripts
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

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply triggers
CREATE TRIGGER update_channels_updated_at BEFORE UPDATE ON channels
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_videos_updated_at BEFORE UPDATE ON videos
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_scripts_updated_at BEFORE UPDATE ON scripts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_subscriptions_updated_at BEFORE UPDATE ON user_subscriptions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS) Policies

-- Channels: Users can only access their own channels
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

-- Videos: Users can access videos from their tracked channels
ALTER TABLE videos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view videos from their channels"
    ON videos FOR SELECT
    USING (
        channel_id IN (
            SELECT id FROM channels WHERE user_id = auth.uid()
        )
    );

-- Scripts: Users can only access their own scripts
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

-- Video analyses: Users can access analyses for videos they track
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

-- User writing styles: Users can only access their own styles
ALTER TABLE user_writing_styles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own writing styles"
    ON user_writing_styles FOR ALL
    USING (auth.uid() = user_id);

-- User subscriptions: Users can view their own subscription
ALTER TABLE user_subscriptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own subscription"
    ON user_subscriptions FOR SELECT
    USING (auth.uid() = user_id);

-- Watchlists: Users can only access their own watchlists
ALTER TABLE watchlists ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own watchlists"
    ON watchlists FOR ALL
    USING (auth.uid() = user_id);

-- Watchlist channels: Users can manage channels in their watchlists
ALTER TABLE watchlist_channels ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their watchlist channels"
    ON watchlist_channels FOR ALL
    USING (
        watchlist_id IN (
            SELECT id FROM watchlists WHERE user_id = auth.uid()
        )
    );
```

---

## 9. Environment Variables

Create `.env.local` file:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# YouTube API
YOUTUBE_API_KEY=your_youtube_api_key

# OpenAI
OPENAI_API_KEY=your_openai_api_key

# Vercel Cron (for security)
CRON_SECRET=your_random_secret_key

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## 10. Development Phases & Timeline

### Phase 1: MVP Foundation (Weeks 1-2)
**Goal**: Basic authentication and project setup

- [ ] Initialize Next.js 16 project with TypeScript
- [ ] Setup Tailwind CSS + shadcn/ui
- [ ] Configure Supabase project and database
- [ ] Implement authentication (signup, login, logout)
- [ ] Create basic layout and navigation
- [ ] Setup environment variables
- [ ] Deploy to Vercel (staging)

**Deliverables**:
- Working auth flow
- Basic dashboard shell
- Deployed to Vercel

---

### Phase 2: Channel Management (Week 3)
**Goal**: Users can add and track YouTube channels with watchlists

- [ ] Create channel addition UI
- [ ] Implement YouTube API integration
- [ ] Build channel validation logic
- [ ] Create channels list/grid view
- [ ] Implement channel deletion
- [ ] Add channel stats display
- [ ] **Build watchlist creation and management**
- [ ] **Implement channel-to-watchlist assignment**
- [ ] **Add watchlist filtering in video library**

**Deliverables**:
- Users can add/remove channels
- Users can create and organize watchlists
- Users can group channels by topic/niche
- Channel data is stored in Supabase
- Channel and watchlist lists display correctly

---

### Phase 3: Video Sync & Discovery (Week 4)
**Goal**: Automatically fetch and display videos

- [ ] Build video sync API endpoint
- [ ] Implement YouTube video fetching logic
- [ ] Create outlier detection algorithm
- [ ] Build video grid/list UI
- [ ] Implement video detail view
- [ ] Setup Vercel cron for auto-sync
- [ ] Add manual sync trigger

**Deliverables**:
- Videos automatically sync every 6 hours
- Outliers are identified
- Video library is browsable

---

### Phase 4: Transcript & Analysis (Week 5)
**Goal**: Extract transcripts and generate AI analysis

- [ ] Integrate youtube-transcript library
- [ ] Build transcript extraction logic
- [ ] Create video analysis API endpoint
- [ ] Implement OpenAI integration for analysis
- [ ] Design analysis display UI
- [ ] Add usage tracking for analyses

**Deliverables**:
- Transcripts are extracted for outlier videos
- Users can generate AI analysis
- Analysis is displayed in structured format

---

### Phase 5: Script Generation (Week 6)
**Goal**: Generate viral scripts with AI

- [ ] Build script generation API
- [ ] Implement hook format selection
- [ ] Implement framework selection
- [ ] Create writing style management
- [ ] Build script display/editor UI
- [ ] Add script library view
- [ ] Implement usage limits
- [ ] Add export functionality

**Deliverables**:
- Users can generate scripts
- Scripts are customizable
- Usage limits are enforced
- Scripts can be saved and exported

---

### Phase 6: Search & Filtering (Week 7)
**Goal**: Advanced video discovery

- [ ] Build search functionality
- [ ] Implement filter UI (date, views, etc.)
- [ ] Add sorting options
- [ ] Create saved filter presets
- [ ] Optimize database queries

**Deliverables**:
- Advanced search works
- Filters are functional
- Performance is acceptable

---

### Phase 7: Polish & UX (Week 8)
**Goal**: Improve user experience

- [ ] Add loading states (skeletons)
- [ ] Implement error handling
- [ ] Add toast notifications
- [ ] Improve mobile responsiveness
- [ ] Add keyboard shortcuts
- [ ] Create onboarding flow
- [ ] Add help/tooltips

**Deliverables**:
- Smooth UX throughout app
- Mobile-friendly
- Good error handling

---

### Phase 8: Testing & Launch (Week 9-10)
**Goal**: Prepare for launch

- [ ] User testing with 5-10 beta users
- [ ] Fix critical bugs
- [ ] Performance optimization
- [ ] SEO setup
- [ ] Analytics integration
- [ ] Create documentation
- [ ] Launch marketing page
- [ ] Production deployment

**Deliverables**:
- Stable, tested application
- Ready for public use

---

## 11. Success Metrics & KPIs

### Product Metrics
- **User Activation**: % of users who add ≥1 channel within first week
- **Engagement**: Average videos analyzed per user per week
- **Retention**: % of users who return after 7 days, 30 days
- **Script Generation**: Average scripts generated per user per month
- **Time Saved**: Average time from research to script (goal: <10 min)

### Technical Metrics
- **Performance**: Page load time <2 seconds
- **Uptime**: 99.5% uptime
- **API Success Rate**: 95%+ success rate for YouTube/OpenAI calls
- **Error Rate**: <1% error rate in production

### Business Metrics (Future)
- **Conversion**: Free to paid conversion rate
- **MRR**: Monthly recurring revenue
- **Churn**: Monthly churn rate
- **LTV**: Customer lifetime value

---

## 12. Future Enhancements (Post-MVP)

### Phase 2 Features
- TikTok integration
- Instagram Reels integration
- Collaboration/team features
- More advanced analytics dashboard
- A/B testing for scripts
- Export to video editing tools
- Mobile app (React Native)

### Phase 3 Features
- AI video generation (text-to-video)
- Automated posting scheduler
- Performance tracking (track which scripts performed well)
- Community features (share scripts, templates)
- API for developers
- White-label solution for agencies

---

## 13. Risks & Mitigations

### Technical Risks

**Risk**: YouTube API quota limits
**Mitigation**: 
- Implement caching
- Batch requests efficiently
- Consider YouTube API alternatives if needed

**Risk**: OpenAI API costs too high
**Mitigation**:
- Set strict usage limits
- Use GPT-4o-mini for less critical features
- Implement caching for similar requests

**Risk**: Vercel cold starts affect performance
**Mitigation**:
- Use Vercel Edge Functions where possible
- Implement proper caching
- Consider upgrading to Pro plan if needed

### Product Risks

**Risk**: Users don't find value in AI-generated scripts
**Mitigation**:
- Focus on quality of prompts
- Allow user customization
- Iterate based on feedback

**Risk**: Feature complexity overwhelms users
**Mitigation**:
- Start with simple MVP
- Add features gradually
- Good onboarding flow

### Business Risks

**Risk**: Low user adoption
**Mitigation**:
- Start with you as primary user
- Build in public, share progress
- Get early feedback from content creator communities

---

## 14. Launch Strategy

### Pre-Launch (Weeks 1-8)
- Build in public on Twitter/LinkedIn
- Share development progress
- Collect email signups for beta
- Create landing page

### Beta Launch (Week 9)
- Invite 10-20 beta users
- Gather feedback
- Fix critical issues
- Create case studies

### Public Launch (Week 10)
- Launch on Product Hunt
- Share on Twitter, Reddit (r/socialmedia, r/NewTubers)
- Post in content creator communities
- Create launch video

### Post-Launch (Weeks 11+)
- Iterate based on feedback
- Add requested features
- Build community
- Consider paid plans

---

## 15. Appendix

### 15.1 Useful Resources

**Documentation**:
- [Next.js Docs](https://nextjs.org/docs)
- [Supabase Docs](https://supabase.com/docs)
- [YouTube Data API](https://developers.google.com/youtube/v3)
- [OpenAI API](https://platform.openai.com/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com/)

**Tools**:
- [Vercel Dashboard](https://vercel.com/dashboard)
- [Supabase Dashboard](https://app.supabase.com/)
- [YouTube API Console](https://console.cloud.google.com/)
- [OpenAI Platform](https://platform.openai.com/)

### 15.2 Code Quality Standards

- Use TypeScript strict mode
- Follow ESLint rules
- Write descriptive commit messages
- Use meaningful variable names
- Add comments for complex logic
- Keep functions small and focused
- Handle errors gracefully
- Add loading states for async operations

### 15.3 Deployment Checklist

- [ ] All environment variables set in Vercel
- [ ] Database migrations applied
- [ ] RLS policies enabled
- [ ] API rate limits configured
- [ ] Error monitoring setup
- [ ] Analytics configured
- [ ] Custom domain configured (if applicable)
- [ ] SSL certificate active
- [ ] Backup strategy in place

---

## 16. Conclusion

This PRD outlines a comprehensive plan to build **ReatorAI**, an AI-powered viral content research and script generation tool. The MVP focuses on YouTube integration with plans to expand to TikTok and Instagram in later phases.

**Next Steps**:
1. Review and approve this PRD
2. Setup development environment
3. Initialize Next.js project
4. Begin Phase 1 development

**Estimated Timeline**: 10 weeks to MVP launch
**Estimated Cost**: 
- Development: Your time (or $20K-40K if hiring)
- Monthly operating costs: $50-200 (APIs, hosting)

**Success Definition**: 
- Reduce script creation time from 60 minutes to <10 minutes
- Successfully generate 100+ scripts in first month
- Achieve 50% improvement in viral hit rate

---

**Document Version**: 1.0  
**Last Updated**: November 23, 2025  
**Author**: Raj (LAZY SANDY)  
**Status**: Ready for Development
