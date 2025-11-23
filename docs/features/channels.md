# Channels Guide

Learn how to track YouTube channels, sync videos, and organize your content research.

---

## Table of Contents
1. [What are Channels?](#what-are-channels)
2. [Adding Channels](#adding-channels)
3. [Channel Stats](#channel-stats)
4. [Syncing Videos](#syncing-videos)
5. [Managing Channels](#managing-channels)
6. [Best Practices](#best-practices)

---

## What are Channels?

Channels in ReatorAI represent YouTube creators you want to track for content inspiration. When you add a channel:

- ReatorAI fetches channel metadata (name, description, subscriber count)
- Videos are automatically synced and analyzed for outliers
- New videos are detected daily
- Performance metrics are tracked over time

**Why track channels?**
- Discover what's working in your niche
- Learn from successful creators
- Identify trending topics early
- Generate scripts based on proven content

---

## Adding Channels

### How to Add a Channel

1. Navigate to "Channels" in the sidebar
2. Click "Add Channel" button (top right)
3. Paste the YouTube channel URL
4. Click "Add Channel"
5. Wait for initial sync (5-10 seconds)

### Supported URL Formats

ReatorAI accepts any of these formats:

- `https://www.youtube.com/@MrBeast`
- `https://www.youtube.com/c/MrBeast`
- `https://www.youtube.com/channel/UCX6OQ3DkcsbYNE6H8uQQuVA`
- `youtube.com/@MrBeast` (we'll add https://)

### Where to Find Channel URLs

**Method 1: From YouTube Homepage**
1. Go to YouTube.com
2. Search for a creator
3. Click on their channel name
4. Copy the URL from your browser

**Method 2: From a Video**
1. Watch any video
2. Click the channel name below the video
3. Copy the URL from the channel page

**Method 3: From YouTube Studio (Your Own Channel)**
1. Open YouTube Studio
2. Go to Customization > Basic Info
3. Your channel URL is displayed there

### Bulk Import (Coming Soon)
Future feature: Upload a CSV of channel URLs to track multiple channels at once.

---

## Channel Stats

Each channel displays key performance metrics:

### Overview Stats
- **Subscriber Count**: Total subscribers (updated daily)
- **Total Videos**: Number of videos tracked
- **Videos Synced**: Videos currently in ReatorAI
- **Last Synced**: When we last checked for new videos
- **Outliers Found**: Count of high-performing videos

### Performance Metrics
- **Average Views**: Mean views across all videos
- **Average Engagement**: Likes, comments, shares
- **Upload Frequency**: How often they post
- **Growth Rate**: Subscriber growth trend (Pro plan)

### Outlier Stats
- **Outlier Rate**: Percentage of videos that are outliers
- **Best Performing**: Highest multiplier video
- **Recent Outliers**: Last 7 days

---

## Syncing Videos

### Automatic Syncing

ReatorAI automatically syncs:
- **On Add**: First 100 videos when you add a channel
- **Daily**: New videos published since last sync
- **Smart Sync**: Only fetches what's new (saves API quota)

### Manual Sync

Force a sync if needed:
1. Go to Channels page
2. Click the refresh icon on a channel card
3. Wait for sync to complete (shown in toast notification)

### Sync Limits

**Free Plan:**
- 5 channels max
- 100 videos per channel
- Daily automatic sync

**Pro Plan:**
- 25 channels
- 500 videos per channel
- Hourly automatic sync
- Historical data (older videos)

**Enterprise Plan:**
- Unlimited channels
- Full video history
- Real-time sync
- Custom retention

### What Gets Synced?

For each video:
- Title, description, thumbnail
- View count, like count, comment count
- Published date
- Duration
- Tags (if available)
- Transcript (if available)
- Performance metrics

---

## Managing Channels

### Editing Channel Info

You can customize:
- **Display Name**: Override the channel name
- **Notes**: Add personal notes about the channel
- **Tags**: Organize with custom tags (Pro plan)
- **Notification Settings**: Get alerts for new outliers

### Removing Channels

To delete a channel:
1. Click the "..." menu on a channel card
2. Select "Delete Channel"
3. Confirm deletion

**Warning**: This permanently removes:
- The channel from your account
- All synced videos from that channel
- Any scripts based on those videos
- Watchlist associations

Videos in other channels are not affected.

### Archiving Channels (Pro Plan)

Instead of deleting, archive channels you want to keep but not actively track:
1. Click "..." menu
2. Select "Archive Channel"
3. View archived channels in "Archived" tab

Benefits:
- Keeps historical data
- Stops automatic syncing
- Doesn't count toward channel limit
- Can unarchive anytime

---

## Best Practices

### Choosing Channels to Track

**Do:**
- Track direct competitors in your niche
- Follow creators one step ahead of you
- Monitor aspirational creators (where you want to be)
- Track adjacent niches for crossover ideas
- Include diverse content styles

**Don't:**
- Track too many channels (focus on quality over quantity)
- Only track mega-creators (they have different advantages)
- Ignore smaller channels (they often innovate first)
- Track channels unrelated to your content

### Organizing Channels

**Use Watchlists to Organize By:**
1. **Niche**: Fitness, Finance, Tech, etc.
2. **Performance Level**: Beginner, Intermediate, Advanced
3. **Content Style**: Educational, Entertainment, Storytelling
4. **Research Stage**: Active Study, Inspiration, Archive
5. **Competition Level**: Direct Competitor, Adjacent, Aspirational

### Monitoring Strategy

**Daily (5 minutes):**
- Check for new outliers across all channels
- Quick scan of what's trending

**Weekly (30 minutes):**
- Deep dive into top outliers from the week
- Analyze common patterns
- Generate scripts for upcoming content

**Monthly (1 hour):**
- Review channel performance trends
- Add/remove channels based on relevance
- Adjust watchlist organization
- Update content strategy based on insights

### Channel Research Workflow

1. **Discovery Phase** (Week 1)
   - Add 10-15 candidate channels
   - Let them sync for a week
   - Observe which provide best insights

2. **Curation Phase** (Week 2)
   - Keep top 5-7 most relevant
   - Remove channels that don't provide value
   - Organize into watchlists

3. **Analysis Phase** (Ongoing)
   - Daily: Scan for new outliers
   - Weekly: Deep analysis of patterns
   - Monthly: Strategy adjustment

### Getting the Most Value

**For New Creators:**
- Start with 3-5 channels in your exact niche
- Focus on creators with 10k-100k subscribers
- Study what's working for similar sized channels

**For Established Creators:**
- Track 5-7 direct competitors
- Add 2-3 aspirational channels
- Monitor adjacent niches for expansion ideas

**For Content Agencies:**
- Organize by client niche
- Track 10+ channels per niche
- Use team features to collaborate (Pro plan)

---

## Troubleshooting

**Q: Channel won't add**
- Verify the URL is correct
- Ensure the channel is public
- Check you haven't reached your channel limit

**Q: Videos not syncing**
- Wait 5 minutes for initial sync
- Try manual refresh
- Check if channel has published videos recently

**Q: Stats not updating**
- Stats update once per day
- Manual sync updates immediately
- Cached data may show temporarily

**Q: Outliers not appearing**
- Channel needs at least 10 videos for outlier detection
- New channels may take 24 hours to calculate baseline
- Very consistent channels may have few outliers

---

## Advanced Features (Pro Plan)

### Team Collaboration
- Share channels with team members
- Assign channels to team members
- Collaborative notes and insights

### Custom Alerts
- Email/Slack notifications for new outliers
- Performance threshold alerts
- New video notifications

### Historical Analysis
- Sync videos older than 100 most recent
- Track performance over time
- Identify seasonal trends

### API Access
- Export channel data via API
- Integrate with your own tools
- Bulk operations

---

## Related Guides

- [Video Analysis Guide](/docs/features/videos.md)
- [Watchlists Guide](/docs/features/watchlists.md)
- [Script Generation Guide](/docs/features/scripts.md)

---

**Need help?** Check our [FAQ](/docs/faq.md) or [contact support](mailto:support@reatorai.com)

---

*Last Updated: November 23, 2025*
