import posthog from 'posthog-js'

// Initialize PostHog client-side analytics
export function initPostHog() {
  if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_POSTHOG_KEY) {
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://app.posthog.com',
      loaded: (posthog) => {
        if (process.env.NODE_ENV === 'development') {
          posthog.debug()
        }
      },
      capture_pageview: false, // We'll manually capture pageviews in layout
      autocapture: false, // We'll manually capture events for better control
    })
  }
}

// Track custom events
export const analytics = {
  // User events
  userSignedUp: (userId: string, email?: string) => {
    posthog.capture('user_signed_up', {
      user_id: userId,
      email,
    })
    posthog.identify(userId, { email })
  },

  userLoggedIn: (userId: string) => {
    posthog.capture('user_logged_in', {
      user_id: userId,
    })
  },

  // Channel events
  channelAdded: (channelId: string, channelTitle: string) => {
    posthog.capture('channel_added', {
      channel_id: channelId,
      channel_title: channelTitle,
    })
  },

  channelSynced: (channelId: string, videoCount: number, duration: number) => {
    posthog.capture('channel_synced', {
      channel_id: channelId,
      video_count: videoCount,
      duration_ms: duration,
    })
  },

  channelDeleted: (channelId: string) => {
    posthog.capture('channel_deleted', {
      channel_id: channelId,
    })
  },

  // Watchlist events
  watchlistCreated: (watchlistId: string, watchlistName: string) => {
    posthog.capture('watchlist_created', {
      watchlist_id: watchlistId,
      watchlist_name: watchlistName,
    })
  },

  watchlistChannelAdded: (watchlistId: string, channelId: string) => {
    posthog.capture('watchlist_channel_added', {
      watchlist_id: watchlistId,
      channel_id: channelId,
    })
  },

  // Video events
  videoViewed: (videoId: string, isOutlier: boolean) => {
    posthog.capture('video_viewed', {
      video_id: videoId,
      is_outlier: isOutlier,
    })
  },

  videoAnalyzed: (videoId: string, duration: number) => {
    posthog.capture('video_analyzed', {
      video_id: videoId,
      duration_ms: duration,
    })
  },

  transcriptFetched: (videoId: string, transcriptLength: number) => {
    posthog.capture('transcript_fetched', {
      video_id: videoId,
      transcript_length: transcriptLength,
    })
  },

  videoFiltered: (filterType: string, filterValue: string | boolean) => {
    posthog.capture('video_filtered', {
      filter_type: filterType,
      filter_value: filterValue,
    })
  },

  // Script events
  scriptGenerated: (scriptId: string, hookFormat: string, framework: string, duration: number) => {
    posthog.capture('script_generated', {
      script_id: scriptId,
      hook_format: hookFormat,
      framework,
      duration_ms: duration,
    })
  },

  scriptCopied: (scriptId: string, section?: string) => {
    posthog.capture('script_copied', {
      script_id: scriptId,
      section,
    })
  },

  scriptDownloaded: (scriptId: string, format: string) => {
    posthog.capture('script_downloaded', {
      script_id: scriptId,
      format,
    })
  },

  scriptFavorited: (scriptId: string, isFavorited: boolean) => {
    posthog.capture('script_favorited', {
      script_id: scriptId,
      is_favorited: isFavorited,
    })
  },

  scriptDeleted: (scriptId: string) => {
    posthog.capture('script_deleted', {
      script_id: scriptId,
    })
  },

  // Conversion events
  upgradeClicked: (currentPlan: string, targetPlan: string) => {
    posthog.capture('upgrade_clicked', {
      current_plan: currentPlan,
      target_plan: targetPlan,
    })
  },

  pricingViewed: (referrer?: string) => {
    posthog.capture('pricing_viewed', {
      referrer,
    })
  },

  checkoutStarted: (plan: string, amount: number) => {
    posthog.capture('checkout_started', {
      plan,
      amount,
    })
  },

  checkoutCompleted: (plan: string, amount: number, transactionId: string) => {
    posthog.capture('checkout_completed', {
      plan,
      amount,
      transaction_id: transactionId,
    })
  },

  // Feature usage events
  searchUsed: (query: string, resultCount: number) => {
    posthog.capture('search_used', {
      query,
      result_count: resultCount,
    })
  },

  helpViewed: (page: string) => {
    posthog.capture('help_viewed', {
      page,
    })
  },

  // Page views (call this in layout)
  pageView: (path: string) => {
    posthog.capture('$pageview', {
      $current_url: path,
    })
  },

  // Identify user (call after login/signup)
  identify: (userId: string, traits?: Record<string, unknown>) => {
    posthog.identify(userId, traits)
  },

  // Reset on logout
  reset: () => {
    posthog.reset()
  },
}

export default posthog
