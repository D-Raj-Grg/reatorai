# Analytics Integration Examples

Quick reference for adding PostHog analytics tracking to existing ReatorAI components.

---

## Import Analytics

```typescript
import { analytics } from '@/lib/analytics/posthog'
```

---

## User Events

### After Sign Up (Auth Callback)

```typescript
// src/app/auth/callback/route.ts
import { analytics } from '@/lib/analytics/posthog'

export async function GET(request: Request) {
  // ... existing auth code ...

  if (user) {
    // Track new user signup
    analytics.userSignedUp(user.id, user.email)
    analytics.identify(user.id, {
      email: user.email,
      created_at: new Date().toISOString(),
    })
  }

  return NextResponse.redirect(new URL('/dashboard', request.url))
}
```

### After Login

```typescript
// src/app/(auth)/layout.tsx or login callback
import { analytics } from '@/lib/analytics/posthog'

// When user is authenticated
if (user) {
  analytics.userLoggedIn(user.id)
  analytics.identify(user.id)
}
```

---

## Channel Events

### When Channel is Added

```typescript
// src/hooks/use-channels.ts or API route
import { analytics } from '@/lib/analytics/posthog'

export function useAddChannel() {
  return useMutation({
    mutationFn: async (channelUrl: string) => {
      const response = await fetch('/api/channels', {
        method: 'POST',
        body: JSON.stringify({ url: channelUrl }),
      })
      return response.json()
    },
    onSuccess: (data) => {
      // Track channel addition
      analytics.channelAdded(data.id, data.title)

      queryClient.invalidateQueries({ queryKey: ['channels'] })
      toast.success(`${data.title} added successfully!`)
    },
  })
}
```

### When Channel Syncs

```typescript
// src/hooks/use-channels.ts
import { analytics } from '@/lib/analytics/posthog'

export function useSyncChannel() {
  return useMutation({
    mutationFn: async (channelId: string) => {
      const startTime = Date.now()

      const response = await fetch(`/api/channels/${channelId}/sync`, {
        method: 'POST',
      })
      const result = await response.json()

      // Track sync completion with duration
      const duration = Date.now() - startTime
      analytics.channelSynced(channelId, result.videoCount, duration)

      return result
    },
    onSuccess: (data) => {
      toast.success(`Synced ${data.videoCount} videos`)
    },
  })
}
```

### When Channel is Deleted

```typescript
// src/hooks/use-channels.ts
import { analytics } from '@/lib/analytics/posthog'

export function useDeleteChannel() {
  return useMutation({
    mutationFn: async (channelId: string) => {
      await fetch(`/api/channels/${channelId}`, {
        method: 'DELETE',
      })

      // Track deletion
      analytics.channelDeleted(channelId)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['channels'] })
      toast.success('Channel deleted')
    },
  })
}
```

---

## Video Events

### When Video is Viewed

```typescript
// src/app/(auth)/videos/[id]/page.tsx
import { analytics } from '@/lib/analytics/posthog'
import { useEffect } from 'react'

export default function VideoDetailPage({ params }: { params: { id: string } }) {
  const { data: video } = useVideo(params.id)

  useEffect(() => {
    if (video) {
      // Track video view
      analytics.videoViewed(video.id, video.is_outlier)
    }
  }, [video])

  return (
    // ... video detail UI ...
  )
}
```

### When Video is Analyzed

```typescript
// src/hooks/use-videos.ts or API route
import { analytics } from '@/lib/analytics/posthog'

export function useAnalyzeVideo() {
  return useMutation({
    mutationFn: async (videoId: string) => {
      const startTime = Date.now()

      const response = await fetch(`/api/videos/${videoId}/analyze`, {
        method: 'POST',
      })
      const result = await response.json()

      // Track analysis completion
      const duration = Date.now() - startTime
      analytics.videoAnalyzed(videoId, duration)

      return result
    },
    onSuccess: () => {
      toast.success('Analysis complete!')
    },
  })
}
```

### When Transcript is Fetched

```typescript
// src/app/api/videos/[id]/transcript/route.ts
import { analytics } from '@/lib/analytics/posthog'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const transcript = await fetchTranscript(params.id)

  // Track transcript fetch
  analytics.transcriptFetched(params.id, transcript.length)

  return Response.json({ transcript })
}
```

### When Filter is Applied

```typescript
// src/app/(auth)/videos/page.tsx
import { analytics } from '@/lib/analytics/posthog'

export default function VideosPage() {
  const [showOutliersOnly, setShowOutliersOnly] = useState(false)

  const handleFilterToggle = () => {
    const newValue = !showOutliersOnly
    setShowOutliersOnly(newValue)

    // Track filter usage
    analytics.videoFiltered('outliers_only', newValue)
  }

  return (
    // ... videos UI with filter toggle ...
  )
}
```

---

## Script Events

### When Script is Generated

```typescript
// src/hooks/use-scripts.ts or API route
import { analytics } from '@/lib/analytics/posthog'

export function useGenerateScript() {
  return useMutation({
    mutationFn: async (params: GenerateScriptParams) => {
      const startTime = Date.now()

      const response = await fetch('/api/scripts/generate', {
        method: 'POST',
        body: JSON.stringify(params),
      })
      const result = await response.json()

      // Track generation completion
      const duration = Date.now() - startTime
      analytics.scriptGenerated(
        result.id,
        params.hookFormat,
        params.framework,
        duration
      )

      return result
    },
    onSuccess: () => {
      toast.success('Script generated!')
    },
  })
}
```

### When Script is Copied

```typescript
// src/components/scripts/script-detail.tsx
import { analytics } from '@/lib/analytics/posthog'

export function ScriptDetail({ script }: { script: Script }) {
  const handleCopy = (section?: 'hook' | 'body' | 'cta') => {
    const textToCopy = section
      ? script[section]
      : script.full_script

    navigator.clipboard.writeText(textToCopy)

    // Track copy action
    analytics.scriptCopied(script.id, section)

    toast.success(section ? `${section} copied!` : 'Script copied!')
  }

  return (
    <div>
      <button onClick={() => handleCopy()}>Copy Full Script</button>
      <button onClick={() => handleCopy('hook')}>Copy Hook</button>
      <button onClick={() => handleCopy('body')}>Copy Body</button>
      <button onClick={() => handleCopy('cta')}>Copy CTA</button>
    </div>
  )
}
```

### When Script is Downloaded

```typescript
// src/components/scripts/script-detail.tsx
import { analytics } from '@/lib/analytics/posthog'

export function ScriptDetail({ script }: { script: Script }) {
  const handleDownload = (format: 'txt' | 'pdf') => {
    // ... download logic ...

    // Track download
    analytics.scriptDownloaded(script.id, format)

    toast.success(`Downloaded as ${format.toUpperCase()}`)
  }

  return (
    <div>
      <button onClick={() => handleDownload('txt')}>Download TXT</button>
      <button onClick={() => handleDownload('pdf')}>Download PDF</button>
    </div>
  )
}
```

### When Script is Favorited

```typescript
// src/hooks/use-scripts.ts
import { analytics } from '@/lib/analytics/posthog'

export function useToggleFavorite() {
  return useMutation({
    mutationFn: async ({ scriptId, isFavorited }: {
      scriptId: string
      isFavorited: boolean
    }) => {
      await fetch(`/api/scripts/${scriptId}/favorite`, {
        method: 'POST',
        body: JSON.stringify({ favorited: !isFavorited }),
      })

      // Track favorite toggle
      analytics.scriptFavorited(scriptId, !isFavorited)
    },
    onSuccess: (_, { isFavorited }) => {
      toast.success(isFavorited ? 'Removed from favorites' : 'Added to favorites')
    },
  })
}
```

---

## Watchlist Events

### When Watchlist is Created

```typescript
// src/hooks/use-watchlists.ts
import { analytics } from '@/lib/analytics/posthog'

export function useCreateWatchlist() {
  return useMutation({
    mutationFn: async (data: CreateWatchlistData) => {
      const response = await fetch('/api/watchlists', {
        method: 'POST',
        body: JSON.stringify(data),
      })
      return response.json()
    },
    onSuccess: (data) => {
      // Track watchlist creation
      analytics.watchlistCreated(data.id, data.name)

      toast.success('Watchlist created!')
    },
  })
}
```

### When Channel is Added to Watchlist

```typescript
// src/hooks/use-watchlists.ts
import { analytics } from '@/lib/analytics/posthog'

export function useAddChannelToWatchlist() {
  return useMutation({
    mutationFn: async ({
      watchlistId,
      channelId
    }: {
      watchlistId: string
      channelId: string
    }) => {
      await fetch(`/api/watchlists/${watchlistId}/channels`, {
        method: 'POST',
        body: JSON.stringify({ channelId }),
      })

      // Track channel addition
      analytics.watchlistChannelAdded(watchlistId, channelId)
    },
    onSuccess: () => {
      toast.success('Channel added to watchlist')
    },
  })
}
```

---

## Conversion Events

### When Upgrade Button is Clicked

```typescript
// src/components/pricing/pricing-card.tsx
import { analytics } from '@/lib/analytics/posthog'
import { useAuth } from '@/hooks/use-auth'

export function PricingCard({ plan }: { plan: Plan }) {
  const { user } = useAuth()

  const handleUpgradeClick = () => {
    // Track upgrade intent
    analytics.upgradeClicked(user?.plan || 'free', plan.id)

    // Navigate to checkout
    router.push(`/checkout?plan=${plan.id}`)
  }

  return (
    <button onClick={handleUpgradeClick}>
      Upgrade to {plan.name}
    </button>
  )
}
```

### When Pricing Page is Viewed

```typescript
// src/app/pricing/page.tsx
import { analytics } from '@/lib/analytics/posthog'
import { useEffect } from 'react'

export default function PricingPage() {
  useEffect(() => {
    // Track pricing page view
    analytics.pricingViewed(document.referrer)
  }, [])

  return (
    // ... pricing page UI ...
  )
}
```

### When Checkout Starts

```typescript
// src/app/checkout/page.tsx
import { analytics } from '@/lib/analytics/posthog'
import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

export default function CheckoutPage() {
  const searchParams = useSearchParams()
  const plan = searchParams.get('plan')

  useEffect(() => {
    if (plan) {
      const amount = getPlanAmount(plan) // Your pricing logic

      // Track checkout start
      analytics.checkoutStarted(plan, amount)
    }
  }, [plan])

  return (
    // ... checkout UI ...
  )
}
```

### When Checkout Completes

```typescript
// src/app/api/checkout/webhook/route.ts (Stripe webhook)
import { analytics } from '@/lib/analytics/posthog'

export async function POST(request: Request) {
  const event = await stripe.webhooks.constructEvent(
    await request.text(),
    request.headers.get('stripe-signature')!,
    webhookSecret
  )

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object

    // Track successful purchase
    analytics.checkoutCompleted(
      session.metadata.plan,
      session.amount_total / 100,
      session.id
    )
  }

  return Response.json({ received: true })
}
```

---

## Search & Help Events

### When Search is Used

```typescript
// src/components/search/search-input.tsx
import { analytics } from '@/lib/analytics/posthog'
import { useState } from 'react'

export function SearchInput() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])

  const handleSearch = async (searchQuery: string) => {
    setQuery(searchQuery)

    // Perform search
    const searchResults = await searchVideos(searchQuery)
    setResults(searchResults)

    // Track search
    analytics.searchUsed(searchQuery, searchResults.length)
  }

  return (
    <input
      onChange={(e) => handleSearch(e.target.value)}
      placeholder="Search videos..."
    />
  )
}
```

### When Help Page is Viewed

```typescript
// src/app/help/[page]/page.tsx
import { analytics } from '@/lib/analytics/posthog'
import { useEffect } from 'react'

export default function HelpPage({ params }: { params: { page: string } }) {
  useEffect(() => {
    // Track help page view
    analytics.helpViewed(params.page)
  }, [params.page])

  return (
    // ... help content ...
  )
}
```

---

## User Identification

### After Authentication

```typescript
// Call this after user logs in or signs up
import { analytics } from '@/lib/analytics/posthog'

analytics.identify(user.id, {
  email: user.email,
  name: user.name,
  plan: user.plan,
  created_at: user.created_at,
  // Any other relevant user properties
})
```

### On Logout

```typescript
// Call this when user logs out
import { analytics } from '@/lib/analytics/posthog'

analytics.reset()
```

---

## Testing Analytics

### In Development

```typescript
// PostHog will be in debug mode if NODE_ENV === 'development'
// Check browser console for PostHog logs
console.log('PostHog tracking:', analytics)
```

### In Production

1. Open browser DevTools
2. Go to Network tab
3. Filter by "posthog"
4. Perform actions in app
5. See POST requests to `app.posthog.com/batch/`
6. Check PostHog dashboard "Live Events"

---

## Best Practices

### 1. Track User Actions, Not Just Views

```typescript
// Good: Track meaningful actions
analytics.scriptGenerated(scriptId, hookFormat, framework, duration)

// Less useful: Just tracking page views
analytics.pageView('/scripts') // This happens automatically
```

### 2. Include Context in Events

```typescript
// Good: Rich context
analytics.scriptGenerated(
  scriptId,
  'question_hook',
  'AIDA',
  15234 // duration in ms
)

// Bad: Minimal context
analytics.scriptGenerated(scriptId)
```

### 3. Don't Block UI for Analytics

```typescript
// Good: Fire and forget
analytics.channelAdded(channel.id, channel.title)
toast.success('Channel added!')

// Bad: Awaiting analytics (unnecessary)
await analytics.channelAdded(channel.id, channel.title)
toast.success('Channel added!')
```

### 4. Track Performance Metrics

```typescript
// Track operation duration
const startTime = Date.now()

// ... perform operation ...

const duration = Date.now() - startTime
analytics.videoAnalyzed(videoId, duration)
```

### 5. Handle Errors Gracefully

```typescript
try {
  const result = await generateScript(params)
  analytics.scriptGenerated(result.id, params.hookFormat, params.framework, duration)
} catch (error) {
  // Don't track failed operations
  console.error('Script generation failed:', error)
}
```

---

## Quick Integration Checklist

- [ ] Import analytics in component
- [ ] Identify key user action to track
- [ ] Call appropriate analytics function
- [ ] Include relevant context (IDs, properties)
- [ ] Test in development (check console)
- [ ] Verify in PostHog dashboard
- [ ] Document any custom events

---

## Need More Events?

Add custom events in `/src/lib/analytics/posthog.ts`:

```typescript
export const analytics = {
  // ... existing events ...

  // Add your custom event
  customEvent: (param1: string, param2: number) => {
    posthog.capture('custom_event', {
      param1,
      param2,
    })
  },
}
```

---

**Last Updated**: November 23, 2025
**See Also**: `/docs/analytics-setup.md` for full setup guide
