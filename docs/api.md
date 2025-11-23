# API Documentation

Complete API reference for ReatorAI endpoints.

---

## Authentication

### Signup
```typescript
POST /api/auth/signup
Body: { email: string, password: string }
Response: { success: boolean, user?: User, error?: string }
```

### Login
```typescript
POST /api/auth/login
Body: { email: string, password: string }
Response: { success: boolean, session?: Session, error?: string }
```

### Logout
```typescript
POST /api/auth/logout
Response: { success: boolean }
```

---

## Watchlists

### Get All Watchlists
```typescript
GET /api/watchlists
Response: { watchlists: Watchlist[] }
```

### Create Watchlist
```typescript
POST /api/watchlists
Body: {
  name: string,
  description?: string,
  color?: string,
  icon?: string
}
Response: { watchlist: Watchlist }
```

### Update Watchlist
```typescript
PATCH /api/watchlists/[id]
Body: {
  name?: string,
  description?: string,
  color?: string,
  icon?: string
}
Response: { watchlist: Watchlist }
```

### Delete Watchlist
```typescript
DELETE /api/watchlists/[id]
Response: { success: boolean }
```

### Add Channel to Watchlist
```typescript
POST /api/watchlists/[id]/channels
Body: { channelId: string }
Response: { success: boolean }
```

### Remove Channel from Watchlist
```typescript
DELETE /api/watchlists/[id]/channels/[channelId]
Response: { success: boolean }
```

### Get Watchlist Videos
```typescript
GET /api/watchlists/[id]/videos
Query: {
  isOutlier?: boolean,
  sortBy?: string,
  page?: number
}
Response: { videos: Video[], total: number }
```

---

## Channels

### Get All Channels
```typescript
GET /api/channels
Response: { channels: Channel[] }
```

### Add Channel
```typescript
POST /api/channels
Body: { channelUrl: string }
Response: {
  success: boolean,
  channel?: Channel,
  error?: string
}
```

### Get Channel Details
```typescript
GET /api/channels/[id]
Response: {
  channel: Channel & { videos: Video[] }
}
```

### Delete Channel
```typescript
DELETE /api/channels/[id]
Response: { success: boolean }
```

### Sync Channel Videos
```typescript
POST /api/channels/[id]/sync
Response: {
  success: boolean,
  videosAdded: number,
  videosUpdated: number
}
```

---

## Videos

### Get Videos (with Filters)
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
Response: {
  videos: Video[],
  total: number,
  page: number,
  hasMore: boolean
}
```

### Get Video Details
```typescript
GET /api/videos/[id]
Response: {
  video: Video & {
    channel: Channel,
    analysis?: VideoAnalysis,
    scripts?: Script[]
  }
}
```

### Analyze Video
```typescript
POST /api/videos/[id]/analyze
Response: {
  analysis: VideoAnalysis,
  tokensUsed: number
}
```

---

## Scripts

### Get All Scripts
```typescript
GET /api/scripts
Query: {
  page?: number,
  limit?: number,
  sortBy?: 'date' | 'favorite'
}
Response: {
  scripts: Script[],
  total: number,
  remaining: number
}
```

### Generate Script
```typescript
POST /api/scripts/generate
Body: {
  videoId: string,
  hookFormat: string,
  framework: string,
  writingStyleId?: string,
  customTopic?: string
}
Response: {
  success: boolean,
  script?: Script,
  error?: string,
  remaining: number
}
```

Hook formats:
- Pattern Interrupt
- Shocking Stat
- Personal Story
- Bold Claim
- Question Hook
- Trend Jacking
- Contrarian Take
- List Format
- Direct Address

Storytelling frameworks:
- Problem-Agitate-Solve (PAS)
- Before-After-Bridge (BAB)
- AIDA (Attention-Interest-Desire-Action)
- Hero's Journey
- Situation-Complication-Resolution
- Feature-Benefit-Proof
- Curiosity Loop

### Get Script Details
```typescript
GET /api/scripts/[id]
Response: { script: Script }
```

### Update Script
```typescript
PATCH /api/scripts/[id]
Body: {
  isFavorite?: boolean,
  content?: {
    hook?: string,
    body?: string,
    cta?: string
  }
}
Response: {
  success: boolean,
  script: Script
}
```

### Delete Script
```typescript
DELETE /api/scripts/[id]
Response: { success: boolean }
```

---

## User

### Get Subscription Info
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
```

### Get User Stats
```typescript
GET /api/user/stats
Response: {
  totalChannels: number,
  totalVideos: number,
  totalOutliers: number,
  totalScripts: number,
  totalAnalyses: number
}
```

---

## Cron Jobs

### Sync All Videos
```typescript
GET /api/cron/sync-videos
Headers: { authorization: 'Bearer CRON_SECRET' }
Response: {
  success: boolean,
  channelsSynced: number,
  videosAdded: number
}
```

---

## Common Patterns

### Error Handling

All endpoints return consistent error format:

```typescript
{
  error: string,
  details?: any
}
```

HTTP Status Codes:
- `200` - Success
- `400` - Bad Request (validation error)
- `401` - Unauthorized (not logged in)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found
- `500` - Internal Server Error

### Pagination

Endpoints that return lists support pagination:

```typescript
{
  data: T[],
  page: number,
  limit: number,
  total: number,
  hasMore: boolean
}
```

Default: `page=1`, `limit=50`

### Authentication

Most endpoints require authentication via Supabase session cookie.

Check authentication status:
```typescript
const { data: { user } } = await supabase.auth.getUser();
if (!user) {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
}
```

---

**See also**: [Database Schema](./database.md) | [Development Guide](./development.md)
