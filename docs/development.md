# Development Guide

Development setup, code patterns, and best practices for ReatorAI.

---

## Environment Setup

### 1. Clone and Install

```bash
git clone <repo-url> reatorai
cd reatorai
npm install
```

### 2. Environment Variables

```bash
cp .env.example .env.local
```

Required variables:
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# YouTube
YOUTUBE_API_KEY=your-youtube-api-key

# OpenAI
OPENAI_API_KEY=your-openai-api-key

# Cron (for background jobs)
CRON_SECRET=your-secret-token
```

### 3. Setup Supabase

1. Create new project at https://supabase.com
2. Run database schema from [docs/database.md](./database.md)
3. Copy credentials to `.env.local`

### 4. Setup External APIs

**YouTube Data API:**
- Enable YouTube Data API v3 in Google Cloud Console
- Create API key
- Add to `.env.local`

**OpenAI:**
- Get API key from https://platform.openai.com
- Add to `.env.local`

### 5. Run Development Server

```bash
npm run dev
```

Visit http://localhost:3000

---

## Code Patterns

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

### 4. Component Pattern (shadcn/ui)

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

## Common Tasks

### Add a New API Endpoint

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

### Add a New Database Table

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

### Create a New UI Component

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

// 2. Add shadcn/ui component if needed
npx shadcn-ui@latest add card

// 3. Use in pages
import { MyComponent } from '@/components/my-feature/my-component';

export default function Page() {
  return <MyComponent data="Hello" />;
}
```

### Setup Cron Job

```typescript
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

### Supabase RLS Blocking Queries

```typescript
// Check if user is authenticated
const { data: { user } } = await supabase.auth.getUser();
console.log('User:', user); // Should not be null

// Verify RLS policies allow the operation
// Check Supabase dashboard > Authentication > Policies
```

### YouTube API Quota Exceeded

```typescript
// Implement caching and batching
// Cache responses for 6 hours
const cached = await redis.get(`channel:${channelId}`);
if (cached) return JSON.parse(cached);

// Batch multiple requests
const channels = await Promise.all(
  channelIds.map(id => getChannelInfo(id))
);
```

### OpenAI API Timeout

```typescript
// Add timeout and retry logic
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

### Vercel Serverless Function Timeout

```typescript
// Move long-running tasks to background jobs
// Instead of:
await syncAllChannels(); // Takes 5 minutes

// Do:
await queueSyncJob(); // Queues job, returns immediately
return NextResponse.json({ jobQueued: true });
```

### Database Query Too Slow

```sql
-- Add indexes
CREATE INDEX idx_videos_published_at ON videos(published_at DESC);
CREATE INDEX idx_videos_view_count ON videos(view_count DESC);

-- Use EXPLAIN ANALYZE to debug
EXPLAIN ANALYZE
SELECT * FROM videos WHERE is_outlier = true;
```

---

## Git Workflow

### Feature Branches

```bash
# Create feature branch
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

---

## Code Quality

### Type Checking

```bash
npm run type-check
```

### Linting

```bash
npm run lint
```

### Format

```bash
npm run format
```

---

## Useful Commands

### Development

```bash
npm run dev              # Start dev server
npm run build           # Build for production
npm run start           # Start production server
npm run lint            # Run ESLint
npm run type-check      # Check TypeScript
```

### Database

```bash
# Generate TypeScript types from Supabase
npx supabase gen types typescript --project-id PROJECT_ID > types/database.ts
```

### shadcn/ui

```bash
# Add component
npx shadcn-ui@latest add [component]

# Add multiple
npx shadcn-ui@latest add button card input dialog
```

### Deployment

```bash
vercel                  # Deploy to Vercel
vercel --prod          # Deploy to production
```

---

## Best Practices

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

## Important URLs

```
Local: http://localhost:3000
Supabase Dashboard: https://app.supabase.com
Vercel Dashboard: https://vercel.com/dashboard
Google Cloud Console: https://console.cloud.google.com
OpenAI Platform: https://platform.openai.com
```

---

**See also**: [Architecture](./architecture.md) | [API Documentation](./api.md) | [Database Schema](./database.md)
