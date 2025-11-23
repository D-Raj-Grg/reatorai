# Database Schema

Complete database schema for ReatorAI with Row Level Security (RLS) policies.

---

## Schema Overview

The database consists of 8 main tables:
- `user_subscriptions` - User plan limits and usage tracking
- `watchlists` - User-created content organization
- `channels` - YouTube channels being tracked
- `watchlist_channels` - Many-to-many relationship
- `videos` - Videos from tracked channels
- `video_analyses` - AI-generated video analyses
- `user_writing_styles` - Custom writing style profiles
- `scripts` - AI-generated scripts

---

## Complete Schema

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

## Useful Commands

### Generate TypeScript Types

```bash
npx supabase gen types typescript --project-id YOUR_PROJECT_ID > types/database.ts
```

### Performance Optimization

```sql
-- Check slow queries
EXPLAIN ANALYZE
SELECT * FROM videos WHERE is_outlier = true;

-- Add indexes for common queries
CREATE INDEX idx_videos_published_at ON videos(published_at DESC);
CREATE INDEX idx_videos_view_count ON videos(view_count DESC);
```

---

**See also**: [API Documentation](./api.md) | [Architecture](./architecture.md)
