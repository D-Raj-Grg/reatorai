## Milestone 2: Core Features (Weeks 3-4)

**Goal**: Users can track channels and organize with watchlists
**Duration**: 2 weeks
**Success Criteria**:
- ✅ User can add YouTube channels
- ✅ User can create watchlists
- ✅ User can organize channels into watchlists
- ✅ Channel data displays correctly

---

### Week 3: Channel Management

#### Epic 2.1: YouTube API Integration (Days 11-13) ✅ COMPLETE

**User Story 2.1.1**: As a developer, I need YouTube API integration working
**Priority**: P0
**Estimated Time**: 8 hours
**Status**: ✅ COMPLETE

**Tasks**:

🟢 **T2.1.1**: Setup YouTube API client ✅ COMPLETE
- [x] Create `lib/youtube/api.ts`
- [x] Install googleapis: `npm install googleapis` (v166.0.0)
- [x] Initialize YouTube API client:
  ```typescript
  import { google } from 'googleapis';

  const youtube = google.youtube({
    version: 'v3',
    auth: process.env.YOUTUBE_API_KEY
  });
  ```
- [x] Add error handling
- [x] Test API connection
- **Acceptance**: ✅ Can make API calls

🟢 **T2.1.2**: Implement getChannelInfo function ✅ COMPLETE
- [x] Create function to fetch channel metadata:
  ```typescript
  export async function getChannelInfo(channelId: string) {
    // Call YouTube API channels.list
    // Return: id, name, handle, thumbnail, subscribers, totalVideos
  }
  ```
- [x] Handle different input types:
  - Channel ID (UC...)
  - Channel handle (@username)
  - Channel URL
- [x] Add input validation
- [x] Add caching (optional for MVP) - Deferred
- [x] Test with real channels
- **Acceptance**: ✅ Returns correct channel data

🟢 **T2.1.3**: Implement getChannelVideos function ✅ COMPLETE
- [x] Create function to fetch channel videos:
  ```typescript
  export async function getChannelVideos(
    channelId: string,
    maxResults: number = 50
  ) {
    // 1. Get uploads playlist ID
    // 2. Fetch videos from playlist
    // 3. Get video statistics
    // 4. Return array of videos
  }
  ```
- [x] Parse ISO 8601 duration to seconds
- [x] Handle pagination (if needed)
- [x] Test with various channels
- **Acceptance**: ✅ Returns video array

🟢 **T2.1.4**: Add API quota monitoring ✅ COMPLETE
- [x] Create function to track API usage
- [x] Log each API call
- [x] Calculate quota consumption
- [x] Alert if approaching limit (10,000/day)
- [x] Document quota usage in console
- **Acceptance**: ✅ Can monitor quota

🟢 **T2.1.5**: Implement error handling ✅ COMPLETE
- [x] Handle common errors:
  - Invalid API key
  - Channel not found
  - Quota exceeded
  - Network timeout
- [x] Return user-friendly error messages
- [x] Log errors for debugging
- [x] Add retry logic for transient errors (Deferred)
- **Acceptance**: ✅ Graceful error handling

---

#### Epic 2.2: Add Channels (Days 13-15) ✅ COMPLETE

**User Story 2.2.1**: As a user, I want to add YouTube channels to track
**Priority**: P0
**Estimated Time**: 10 hours
**Status**: ✅ COMPLETE

**Tasks**:

🟢 **T2.2.1**: Create "Add Channel" UI ✅ COMPLETE
- [x] Create `components/channels/add-channel-modal.tsx` (integrated into page)
- [x] Use shadcn Dialog component
- [x] Add input for channel URL/ID/handle
- [x] Add "Add Channel" button
- [x] Show loading spinner during fetch
- [x] Display preview before confirming (Simplified for MVP)
- [x] Style professionally
- **Acceptance**: ✅ Modal opens and closes

🟢 **T2.2.2**: Implement channel URL parsing ✅ COMPLETE
- [x] Create `lib/youtube/api.ts` (parseChannelUrl function)
- [x] Parse different URL formats:
  - https://youtube.com/channel/UC...
  - https://youtube.com/@username
  - https://youtube.com/c/ChannelName
  - Just channel ID
  - Just handle
- [x] Extract channel ID
- [x] Validate format
- [x] Test with examples
- **Acceptance**: ✅ Correctly parses URLs

🟢 **T2.2.3**: Create POST /api/channels endpoint ✅ COMPLETE
- [x] Create `app/api/channels/route.ts`
- [x] Implement POST handler:
  ```typescript
  export async function POST(request: Request) {
    // 1. Get authenticated user
    // 2. Parse request body (channelUrl)
    // 3. Extract channel ID
    // 4. Check if already tracking
    // 5. Fetch channel info from YouTube
    // 6. Insert into channels table
    // 7. Increment channels_count in user_subscriptions
    // 8. Return channel data
  }
  ```
- [x] Validate user hasn't exceeded limit (5 for free tier)
- [x] Handle duplicates
- [x] Return appropriate errors
- **Acceptance**: ✅ API creates channel

🟢 **T2.2.4**: Implement add channel frontend logic ✅ COMPLETE
- [x] Create mutation hook:
  ```typescript
  export function useAddChannel() {
    return useMutation({
      mutationFn: async (channelUrl: string) => {
        const res = await fetch('/api/channels', {
          method: 'POST',
          body: JSON.stringify({ channelUrl })
        });
        return res.json();
      },
      onSuccess: () => {
        // Invalidate channels query
        // Show success toast
        // Close modal
      }
    });
  }
  ```
- [x] Wire up to form
- [x] Handle errors
- [x] Show success message
- **Acceptance**: ✅ Channel added successfully

🟢 **T2.2.5**: Create channels list view ✅ COMPLETE
- [x] Create `app/(auth)/channels/page.tsx`
- [x] Create `components/channels/channel-card.tsx`
- [x] Display:
  - Channel thumbnail
  - Channel name
  - Subscriber count
  - Total videos
  - Last synced time
  - Actions (sync, delete)
- [x] Layout as grid (2-3 columns)
- [x] Add "Add Channel" button at top
- **Acceptance**: ✅ Channels display nicely

🟢 **T2.2.6**: Implement GET /api/channels ✅ COMPLETE
- [x] Create GET handler in `app/api/channels/route.ts`
- [x] Fetch all channels for current user
- [x] Include basic stats
- [x] Order by created_at DESC
- [x] Return as JSON
- **Acceptance**: ✅ Returns user's channels

🟢 **T2.2.7**: Create useChannels hook ✅ COMPLETE
- [x] Create `hooks/use-channels.ts`
- [x] Use React Query:
  ```typescript
  export function useChannels() {
    return useQuery({
      queryKey: ['channels'],
      queryFn: async () => {
        const res = await fetch('/api/channels');
        return res.json();
      }
    });
  }
  ```
- [x] Handle loading state
- [x] Handle errors
- **Acceptance**: ✅ Hook fetches channels

🟢 **T2.2.8**: Implement delete channel ✅ COMPLETE
- [x] Add DELETE handler: `app/api/channels/[id]/route.ts`
- [x] Delete channel from database
- [x] Cascade delete related data (RLS handles this)
- [x] Decrement channels_count
- [x] Return success
- [x] Add delete button to channel card
- [x] Add confirmation dialog
- [x] Show success toast
- **Acceptance**: ✅ Can delete channels

---

### Week 4: Watchlists

#### Epic 2.3: Watchlist Management (Days 16-18)

**User Story 2.3.1**: As a user, I want to organize channels into watchlists
**Priority**: P1
**Estimated Time**: 12 hours

**Tasks**:

🔴 **T2.3.1**: Create watchlists database functions
- [ ] Verify watchlists table exists
- [ ] Test inserting a watchlist
- [ ] Test adding channel to watchlist
- [ ] Test removing channel from watchlist
- [ ] Test deleting watchlist
- [ ] Verify triggers update stats
- **Acceptance**: Database operations work

🔴 **T2.3.2**: Create POST /api/watchlists
- [ ] Create `app/api/watchlists/route.ts`
- [ ] Implement POST handler:
  ```typescript
  export async function POST(request: Request) {
    // 1. Get authenticated user
    // 2. Parse body: { name, description?, color?, icon? }
    // 3. Insert into watchlists table
    // 4. Return created watchlist
  }
  ```
- [ ] Validate name is not empty
- [ ] Set default color and icon if not provided
- [ ] Handle errors
- **Acceptance**: Creates watchlist

🔴 **T2.3.3**: Create GET /api/watchlists
- [ ] Implement GET handler
- [ ] Fetch all watchlists for user
- [ ] Include stats (channel_count, total_outliers)
- [ ] Order by display_order, then created_at
- [ ] Return as JSON
- **Acceptance**: Returns watchlists

🔴 **T2.3.4**: Build "Create Watchlist" modal
- [ ] Create `components/watchlists/create-watchlist-modal.tsx`
- [ ] Form fields:
  - Name (required)
  - Description (optional)
  - Color picker (9 preset colors)
  - Icon selector (15 icons)
- [ ] Use react-hook-form + Zod
- [ ] Preview watchlist card
- [ ] Submit button
- **Acceptance**: Modal creates watchlist

🔴 **T2.3.5**: Add watchlists to sidebar
- [ ] Update `components/dashboard/sidebar.tsx`
- [ ] Add "Watchlists" section
- [ ] List all user's watchlists:
  - Icon with color
  - Name
  - Channel count badge
- [ ] Add "+ New Watchlist" button
- [ ] Make clickable (navigate to watchlist page)
- [ ] Collapse/expand section
- **Acceptance**: Watchlists show in sidebar

🔴 **T2.3.6**: Create watchlist detail page
- [ ] Create `app/(dashboard)/watchlists/[id]/page.tsx`
- [ ] Fetch watchlist data
- [ ] Display:
  - Watchlist name and description
  - Stats (channels, videos, outliers)
  - List of channels in watchlist
  - List of videos from those channels
- [ ] Add "Edit" and "Delete" buttons
- [ ] Style with watchlist color
- **Acceptance**: Page displays correctly

🔴 **T2.3.7**: Implement add channel to watchlist
- [ ] Create POST `/api/watchlists/[id]/channels`
- [ ] Request body: `{ channelId }`
- [ ] Insert into watchlist_channels junction table
- [ ] Handle duplicate (channel already in watchlist)
- [ ] Trigger updates stats
- [ ] Return success
- **Acceptance**: Channel added to watchlist

🔴 **T2.3.8**: Add "Add to Watchlist" UI
- [ ] Add dropdown to channel card
- [ ] Show all user's watchlists
- [ ] Checkboxes for watchlists channel is in
- [ ] Toggle on/off to add/remove
- [ ] Show success toast
- [ ] Update UI optimistically
- **Acceptance**: Can manage channel watchlists

🔴 **T2.3.9**: Implement watchlist deletion
- [ ] Add DELETE `/api/watchlists/[id]`
- [ ] Confirm deletion (doesn't delete channels)
- [ ] Delete watchlist record
- [ ] Cascade deletes watchlist_channels (database handles)
- [ ] Show confirmation dialog
- [ ] Redirect to watchlists page after delete
- **Acceptance**: Can delete watchlists

🔴 **T2.3.10**: Create useWatchlists hook
- [ ] Create `hooks/use-watchlists.ts`
- [ ] Fetch watchlists with React Query
- [ ] Add mutation hooks:
  - useCreateWatchlist
  - useUpdateWatchlist
  - useDeleteWatchlist
  - useAddChannelToWatchlist
- [ ] Handle loading/error states
- **Acceptance**: Hooks work correctly

---

#### Epic 2.4: Channel Suggestions (Days 18-20) ✅ COMPLETE

**User Story 2.4.1**: As a new user, I want suggestions for channels to add
**Priority**: P2
**Estimated Time**: 4 hours
**Status**: ✅ COMPLETE

**Tasks**:

🟢 **T2.4.1**: Create suggested channels list ✅ COMPLETE
- [x] Create `lib/suggestions/educational-channels.ts`
- [x] Add array of popular educational channels (24+ channels):
  ```typescript
  export const SUGGESTED_CHANNELS = [
    { name: 'Veritasium', channelId: 'UCHnyfMqiRRG1u-2MsSQLbXA', ... },
    { name: 'Vsauce', channelId: 'UC6nSFpj9HTCZ5t-N3Rm3-HA', ... },
    // ... 24+ total channels
  ];
  ```
- [x] Categorize by topic (Science, Geography, History, General Education)
- [x] Include channel IDs, handles, descriptions, subscriber counts
- **Acceptance**: ✅ List created with 24+ channels

🟢 **T2.4.2**: Add suggestions to empty state ✅ COMPLETE
- [x] Update channels page empty state
- [x] Show "Popular Educational Channels" with sparkles icon
- [x] Display as tabbed interface with 4 categories
- [x] Cards show:
  - Channel name, handle
  - Description
  - Subscriber badge
  - "Add Channel" button
- [x] Clicking "Add" pre-fills modal with channel handle
- [x] Responsive grid layout (2-3 columns)
- **Acceptance**: ✅ Suggestions help new users get started quickly

🟡 **T2.4.3**: Add suggestions during onboarding (optional) - DEFERRED
- [ ] Create onboarding modal for first login
- [ ] Step 1: Welcome
- [ ] Step 2: Add channels (show suggestions)
- [ ] Step 3: Create first watchlist
- [ ] Save progress
- [ ] Can skip
- **Acceptance**: Smooth onboarding
- **Status**: ⏸️ P3 - Deferred to future enhancement

---

### Milestone 2 Acceptance Criteria

**Before marking M2 complete, verify**:

- [ ] User can add YouTube channel via URL/ID/handle
- [ ] Channel data fetches correctly from YouTube API
- [ ] Channel card displays with thumbnail, stats
- [ ] User can delete channels
- [ ] User can create watchlists with custom color/icon
- [ ] Watchlists appear in sidebar
- [ ] User can add channels to watchlists
- [ ] User can remove channels from watchlists
- [ ] User can delete watchlists
- [ ] Watchlist detail page shows channels and stats
- [ ] Suggested channels help new users
- [ ] No errors when adding/removing channels
- [ ] UI is responsive and polished

**Success Metrics**:
- User can add 3 channels in < 3 minutes
- User can create watchlist in < 1 minute
- 80% of test users complete adding channels
- Zero data loss on operations

---

