# Analytics & Monitoring Setup

Complete guide for setting up analytics and monitoring for ReatorAI.

---

## Table of Contents
1. [Analytics Overview](#analytics-overview)
2. [PostHog Setup](#posthog-setup)
3. [Vercel Analytics](#vercel-analytics)
4. [Custom Events](#custom-events)
5. [Dashboard & Metrics](#dashboard--metrics)
6. [Error Monitoring](#error-monitoring)

---

## Analytics Overview

ReatorAI uses a multi-layered analytics approach:

**1. Product Analytics (PostHog)**
- User behavior tracking
- Feature usage
- Conversion funnel
- Cohort analysis
- Custom events

**2. Web Analytics (Vercel)**
- Page views
- Traffic sources
- Geographic data
- Device/browser stats

**3. Performance Analytics (Vercel Speed Insights)**
- Core Web Vitals
- Page load times
- Performance scores

**4. Error Monitoring (Vercel + Optional Sentry)**
- Runtime errors
- API failures
- Console errors

---

## PostHog Setup

### Why PostHog?

- **Open source**: Self-host or use cloud
- **Privacy-focused**: GDPR compliant
- **Feature flags**: Test features with subsets
- **Session recording**: See user behavior
- **Free tier**: 1M events/month
- **No tracking code overhead**: Lightweight SDK

### Step 1: Create PostHog Account

1. Go to [posthog.com](https://posthog.com)
2. Sign up for free account
3. Create new project: "ReatorAI Production"
4. Copy your Project API Key

### Step 2: Add Environment Variables

Add to your `.env.local` (and Vercel environment variables):

```bash
NEXT_PUBLIC_POSTHOG_KEY=phc_YOUR_PROJECT_KEY_HERE
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com
```

**For Vercel:**
1. Go to Vercel Dashboard → Project Settings
2. Navigate to Environment Variables
3. Add both variables
4. Set for: Production, Preview, Development
5. Redeploy

### Step 3: Verify Installation

**Check initialization:**
1. Run app locally: `npm run dev`
2. Open browser DevTools → Console
3. Look for PostHog debug messages (in dev mode)
4. Navigate between pages
5. Check PostHog dashboard for events

**Check production:**
1. Visit production URL
2. Open DevTools → Network tab
3. Look for requests to `app.posthog.com`
4. Go to PostHog dashboard
5. Check "Live Events" for recent activity

### Step 4: Configure PostHog Settings

**In PostHog Dashboard:**

1. **Project Settings** → **General**
   - Set project timezone
   - Configure data retention (default: 7 years)

2. **Project Settings** → **Recordings**
   - Enable session recordings (optional)
   - Set sampling rate (25% recommended for cost)
   - Mask sensitive fields

3. **Project Settings** → **Autocapture**
   - Disable autocapture (we track manually)
   - Better control and cleaner data

4. **Project Settings** → **Toolbar**
   - Enable PostHog toolbar for debugging
   - Only visible to authorized users

---

## Vercel Analytics

### Step 1: Enable Analytics

**In Vercel Dashboard:**

1. Go to your ReatorAI project
2. Navigate to **Analytics** tab
3. Click **Enable Analytics**
4. Choose plan:
   - **Free**: 100k events/month
   - **Pro**: 1M events/month

### Step 2: Enable Speed Insights

1. Navigate to **Speed Insights** tab
2. Click **Enable Speed Insights**
3. Free on all plans!

### Step 3: Verify Setup

**Check installation:**
1. Deploy to Vercel
2. Visit production URL
3. Navigate a few pages
4. Wait 5-10 minutes
5. Check Analytics dashboard in Vercel

**What you'll see:**
- Real-time visitors
- Page views
- Top pages
- Referrers
- Geographic distribution
- Device/browser breakdown

---

## Custom Events

### Event Tracking Strategy

We track events at key moments in the user journey:

**Acquisition Events:**
- Landing page view
- Pricing page view
- Sign-up start

**Activation Events:**
- User signed up
- Email confirmed
- First channel added

**Engagement Events:**
- Channel synced
- Video viewed
- Video analyzed
- Script generated

**Retention Events:**
- Watchlist created
- Script favorited
- Return visit (7 days)

**Revenue Events:**
- Upgrade clicked
- Checkout started
- Checkout completed
- Subscription renewed

### Implementing Event Tracking

**Import analytics:**
```typescript
import { analytics } from '@/lib/analytics/posthog'
```

**Track events in your components/API routes:**

#### User Events

```typescript
// When user signs up
analytics.userSignedUp(user.id, user.email)

// When user logs in
analytics.userLoggedIn(user.id)
```

#### Channel Events

```typescript
// When channel is added
analytics.channelAdded(channel.id, channel.title)

// When channel sync completes
const startTime = Date.now()
// ... sync logic ...
const duration = Date.now() - startTime
analytics.channelSynced(channel.id, videoCount, duration)

// When channel is deleted
analytics.channelDeleted(channel.id)
```

#### Video Events

```typescript
// When user views a video
analytics.videoViewed(video.id, video.is_outlier)

// When video analysis completes
const startTime = Date.now()
// ... analysis logic ...
const duration = Date.now() - startTime
analytics.videoAnalyzed(video.id, duration)

// When transcript is fetched
analytics.transcriptFetched(video.id, transcript.length)

// When user applies filters
analytics.videoFiltered('outliers_only', true)
```

#### Script Events

```typescript
// When script is generated
const startTime = Date.now()
// ... generation logic ...
const duration = Date.now() - startTime
analytics.scriptGenerated(
  script.id,
  hookFormat,
  framework,
  duration
)

// When user copies script
analytics.scriptCopied(script.id, 'full') // or 'hook', 'body', 'cta'

// When user downloads script
analytics.scriptDownloaded(script.id, 'txt') // or 'pdf'

// When user favorites script
analytics.scriptFavorited(script.id, true)

// When user deletes script
analytics.scriptDeleted(script.id)
```

#### Conversion Events

```typescript
// When user clicks upgrade
analytics.upgradeClicked('free', 'pro')

// When user views pricing
analytics.pricingViewed(document.referrer)

// When checkout starts
analytics.checkoutStarted('pro', 29.00)

// When checkout completes
analytics.checkoutCompleted('pro', 29.00, transactionId)
```

#### Search & Help

```typescript
// When user searches
analytics.searchUsed(query, results.length)

// When user views help
analytics.helpViewed('getting-started')
```

### Example Implementation

**In a React component:**

```typescript
'use client'

import { analytics } from '@/lib/analytics/posthog'
import { useEffect } from 'react'

export function ChannelCard({ channel }) {
  const handleSync = async () => {
    const startTime = Date.now()

    try {
      const result = await syncChannel(channel.id)
      const duration = Date.now() - startTime

      // Track successful sync
      analytics.channelSynced(
        channel.id,
        result.videoCount,
        duration
      )

      toast.success('Channel synced!')
    } catch (error) {
      toast.error('Sync failed')
    }
  }

  return (
    <div onClick={handleSync}>
      Sync Channel
    </div>
  )
}
```

**In an API route:**

```typescript
import { analytics } from '@/lib/analytics/posthog'

export async function POST(req: Request) {
  const { videoId } = await req.json()

  try {
    const startTime = Date.now()
    const analysis = await analyzeVideo(videoId)
    const duration = Date.now() - startTime

    // Track analysis completion
    analytics.videoAnalyzed(videoId, duration)

    return Response.json(analysis)
  } catch (error) {
    return Response.json({ error }, { status: 500 })
  }
}
```

---

## Dashboard & Metrics

### PostHog Dashboard Setup

**Create custom dashboards:**

#### 1. Acquisition Dashboard

**Metrics:**
- New sign-ups (daily)
- Sign-up conversion rate
- Traffic sources
- Landing page views
- Pricing page views

**Insights:**
```sql
-- Daily sign-ups
SELECT count(*)
FROM events
WHERE event = 'user_signed_up'
GROUP BY toDate(timestamp)
```

#### 2. Activation Dashboard

**Metrics:**
- Users who added first channel
- Time to first channel (median)
- First script generation rate
- Activation funnel

**Insights:**
```sql
-- Activation funnel
SELECT
  step,
  count(*) as users,
  count(*) / (SELECT count(*) FROM events WHERE event = 'user_signed_up') as rate
FROM (
  SELECT DISTINCT user_id, 'signed_up' as step FROM events WHERE event = 'user_signed_up'
  UNION ALL
  SELECT DISTINCT user_id, 'added_channel' as step FROM events WHERE event = 'channel_added'
  UNION ALL
  SELECT DISTINCT user_id, 'generated_script' as step FROM events WHERE event = 'script_generated'
)
GROUP BY step
ORDER BY step
```

#### 3. Engagement Dashboard

**Metrics:**
- Daily active users (DAU)
- Weekly active users (WAU)
- Scripts generated per user
- Videos analyzed per user
- Feature usage breakdown

#### 4. Retention Dashboard

**Metrics:**
- Day 1, 7, 30 retention
- Cohort analysis
- Churn rate
- Return user rate

#### 5. Revenue Dashboard

**Metrics:**
- Free to paid conversion rate
- Monthly recurring revenue (MRR)
- Upgrade clicks
- Checkout completion rate
- Customer lifetime value (LTV)

### Key Metrics to Track

**North Star Metric:**
> Scripts generated per week (measures core value delivery)

**Supporting Metrics:**

**Acquisition:**
- Sign-ups per day
- Sign-up conversion rate: `(sign-ups / landing page views) * 100`

**Activation:**
- % users who add channel: `(users with channel / total users) * 100`
- % users who generate script: `(users with script / total users) * 100`
- Time to first value: Median time from signup to first script

**Engagement:**
- Scripts generated per user per week
- Videos analyzed per user per week
- Session duration
- Pages per session

**Retention:**
- Day 7 retention: `(users active day 7 / total signups) * 100`
- Day 30 retention
- Churn rate: `(users who didn't return / total users) * 100`

**Revenue:**
- Free to paid conversion: `(paid users / total users) * 100`
- MRR: Sum of all monthly subscriptions
- Average revenue per user (ARPU): `MRR / total users`
- Customer acquisition cost (CAC): `marketing spend / new customers`
- LTV to CAC ratio: Should be > 3:1

### SQL Queries for Key Metrics

**Daily Active Users:**
```sql
SELECT
  toDate(timestamp) as date,
  count(DISTINCT user_id) as dau
FROM events
WHERE timestamp >= now() - INTERVAL 30 DAY
GROUP BY date
ORDER BY date
```

**Scripts Generated (Daily):**
```sql
SELECT
  toDate(timestamp) as date,
  count(*) as scripts_generated,
  count(DISTINCT user_id) as unique_users
FROM events
WHERE event = 'script_generated'
  AND timestamp >= now() - INTERVAL 30 DAY
GROUP BY date
ORDER BY date
```

**Conversion Funnel:**
```sql
SELECT
  count(DISTINCT CASE WHEN event = 'pricing_viewed' THEN user_id END) as pricing_views,
  count(DISTINCT CASE WHEN event = 'upgrade_clicked' THEN user_id END) as upgrade_clicks,
  count(DISTINCT CASE WHEN event = 'checkout_started' THEN user_id END) as checkout_starts,
  count(DISTINCT CASE WHEN event = 'checkout_completed' THEN user_id END) as purchases,

  (count(DISTINCT CASE WHEN event = 'upgrade_clicked' THEN user_id END) * 100.0 /
   count(DISTINCT CASE WHEN event = 'pricing_viewed' THEN user_id END)) as pricing_to_upgrade_rate,

  (count(DISTINCT CASE WHEN event = 'checkout_completed' THEN user_id END) * 100.0 /
   count(DISTINCT CASE WHEN event = 'checkout_started' THEN user_id END)) as checkout_completion_rate
FROM events
WHERE timestamp >= now() - INTERVAL 30 DAY
```

**Feature Usage:**
```sql
SELECT
  event,
  count(*) as total_events,
  count(DISTINCT user_id) as unique_users,
  avg(count(*)) OVER () as avg_per_event
FROM events
WHERE event IN (
  'channel_added',
  'video_analyzed',
  'script_generated',
  'watchlist_created'
)
  AND timestamp >= now() - INTERVAL 7 DAY
GROUP BY event
ORDER BY total_events DESC
```

---

## Error Monitoring

### Vercel Error Monitoring (Built-in)

**Automatically tracked:**
- Runtime errors (500 errors)
- API route errors
- Build errors
- Function timeout errors

**Access errors:**
1. Vercel Dashboard → Project
2. Navigate to **Logs** tab
3. Filter by error level
4. Search and analyze

### Optional: Sentry Integration

**For advanced error tracking:**

**Why Sentry?**
- Detailed error reports
- Source maps support
- User context
- Release tracking
- Performance monitoring
- Issue assignment & workflows

**Setup Sentry:**

1. **Create Sentry account:**
   - Go to [sentry.io](https://sentry.io)
   - Create project: "ReatorAI"
   - Choose "Next.js" platform

2. **Install Sentry:**
   ```bash
   npm install @sentry/nextjs
   npx @sentry/wizard@latest -i nextjs
   ```

3. **Add environment variable:**
   ```bash
   SENTRY_DSN=your_sentry_dsn_here
   ```

4. **Configure alerts:**
   - Email notifications for errors
   - Slack integration
   - Issue assignment rules

---

## Analytics Best Practices

### 1. Event Naming Convention

Use consistent naming:
- Format: `object_action` (e.g., `channel_added`, `script_generated`)
- Lowercase with underscores
- Clear and descriptive

### 2. Event Properties

Include context in event properties:
```typescript
analytics.scriptGenerated(scriptId, hookFormat, framework, duration)
// Properties: { script_id, hook_format, framework, duration_ms }
```

### 3. User Identification

Identify users after authentication:
```typescript
analytics.identify(user.id, {
  email: user.email,
  plan: user.plan,
  created_at: user.created_at,
})
```

### 4. Privacy & GDPR

- **Don't track PII** without consent
- **Anonymize IPs** (PostHog does this)
- **Allow opt-out** (add settings page)
- **Data retention** policy (default: 7 years, reduce if needed)

### 5. Performance

- **Async tracking**: Don't block UI
- **Batch events**: PostHog batches automatically
- **Sample sessions**: Don't record 100% of sessions

---

## Monitoring Checklist

Daily checks:
- [ ] Sign-up rate normal?
- [ ] Error rate <2%?
- [ ] Core features working?
- [ ] Any spikes/drops in usage?

Weekly checks:
- [ ] Review conversion funnel
- [ ] Check retention cohorts
- [ ] Analyze feature usage
- [ ] Review top errors
- [ ] Monitor performance metrics

Monthly checks:
- [ ] MRR growth on track?
- [ ] LTV to CAC ratio healthy?
- [ ] Churn rate acceptable?
- [ ] Update dashboards
- [ ] Export data for reporting

---

## Resources

- [PostHog Documentation](https://posthog.com/docs)
- [PostHog Dashboard](https://app.posthog.com)
- [Vercel Analytics](https://vercel.com/docs/analytics)
- [Vercel Dashboard](https://vercel.com/dashboard)
- [Web Analytics Best Practices](https://web.dev/vitals/)

---

**Last Updated**: November 23, 2025
