## Milestone 4: Monetization (Weeks 7-8) 🟡 In Progress

**Status**: 🟢 **100% COMPLETE** (16/16 tasks done in Epic 4.1 + 4.2)
**Last Updated**: November 24, 2025

**Goal**: Script generation works and users can pay
**Duration**: 2 weeks
**Success Criteria**:
- ✅ User can generate high-quality scripts
- ✅ Script library manages saved scripts
- 🔴 Billing integration works
- 🔴 Free and paid tiers enforced

---

### Week 7: Script Generation

#### Epic 4.1: Script Generator (Days 31-35) ✅ 100% COMPLETE

**User Story 4.1.1**: As a user, I want to generate viral scripts from videos
**Priority**: P0
**Estimated Time**: 16 hours
**Status**: 🟢 **COMPLETE** (10/10 tasks complete)

**Tasks**:

🟢 **T4.1.1**: Create generateScript function ✅ COMPLETE
- [x] Create `lib/openai/generate.ts`
- [x] Create `lib/openai/constants.ts` (9 hooks, 7 frameworks, 4 tones, 3 vocab levels)
- [x] Define hook formats and frameworks
- [x] Build comprehensive prompt (300+ lines)
- [x] Use GPT-4o with JSON response format
- [x] Return structured script with metadata
- [x] Helper functions: getAllHookFormats(), getAllFrameworks(), getAllTones(), getAllVocabularyLevels()
- [x] Support for script variations
- **Acceptance**: ✅ Generates quality scripts

🟢 **T4.1.2**: Create script generator page ✅ COMPLETE
- [x] Create `app/(auth)/scripts/new/page.tsx`
- [x] Multi-step form layout
- [x] Left 2/3: Form sections (video, hook, framework, style)
- [x] Right 1/3: Info panel and output guide
- [x] Can access from Scripts page "Generate Script" button
- [x] Responsive design
- **Acceptance**: ✅ Page renders correctly

🟢 **T4.1.3**: Build video selection interface ✅ COMPLETE
- [x] Dropdown select component
- [x] Shows video title
- [x] Filters to only show videos with transcripts
- [x] Displays outlier badge if applicable
- [x] Loading state during fetch
- [x] Empty state message
- **Acceptance**: ✅ Can choose video

🟢 **T4.1.4**: Create hook format selector ✅ COMPLETE
- [x] All 9 hook formats implemented:
  - Pattern Interrupt
  - Shocking Stat
  - Personal Story
  - Bold Claim
  - Question Hook
  - Trend Jacking
  - Contrarian Take
  - List Format
  - Direct Address
- [x] Radio group with full descriptions
- [x] Show example for each format
- [x] Show "bestFor" use case badges
- [x] Required field validation
- **Acceptance**: ✅ Can select hook

🟢 **T4.1.5**: Create framework selector ✅ COMPLETE
- [x] All 7 storytelling frameworks implemented:
  - Problem-Agitate-Solve (PAS)
  - Before-After-Bridge (BAB)
  - AIDA
  - Hero's Journey
  - Situation-Complication-Resolution
  - Feature-Benefit-Proof
  - Curiosity Loop
- [x] Radio group with full descriptions
- [x] Show structure for each framework
- [x] Show "bestFor" use case badges
- [x] Required field validation
- **Acceptance**: ✅ Can select framework

🟢 **T4.1.6**: Add writing style options ✅ COMPLETE
- [x] Tone dropdown:
  - Casual
  - Professional
  - Enthusiastic
  - Educational
- [x] Vocabulary level dropdown:
  - Simple (6th-8th grade)
  - Moderate (9th-12th grade)
  - Advanced (College level)
- [x] Custom topic input (optional)
- [x] Target duration input (30-180 seconds)
- [x] Defaults: Casual tone, Simple vocabulary, 90 seconds
- **Acceptance**: ✅ Can customize style

🟢 **T4.1.7**: Create POST /api/scripts/generate ✅ COMPLETE
- [x] Create `app/api/scripts/generate/route.ts`
- [x] Request body validation (videoId, hookFormat, framework required)
- [x] Check usage limit via canGenerateScript()
- [x] Fetch video data with analysis (if available)
- [x] Call generateScript function
- [x] Save to scripts table with all metadata
- [x] Track usage via trackScriptGeneration()
- [x] Return script + metadata + remaining count
- [x] Comprehensive error handling
- **Acceptance**: ✅ API generates script

🟢 **T4.1.8**: Create Script Detail Page ✅ COMPLETE
- [x] Create script detail page `/scripts/[id]/page.tsx`
- [x] Display generated script sections:
  - Topic
  - Hook
  - Body
  - Call-to-Action
  - Visual Suggestions
  - Estimated Duration
- [x] Format nicely with proper typography and spacing
- [x] Word count and metadata display
- [x] Show generation parameters used (hook format, framework)
- [x] Include source video info with thumbnail and link
- [x] Use shadcn/ui components (Card, Badge, Separator, etc.)
- [x] Responsive design (2/3 content, 1/3 sidebar on desktop)
- **Acceptance**: ✅ Script looks professional

🟢 **T4.1.9**: Add Script Actions ✅ COMPLETE
- [x] "Copy to Clipboard" button (copies entire script with visual feedback)
- [x] "Download as TXT" button (downloads script with metadata)
- [x] "Download as Markdown" button (downloads formatted markdown file)
- [x] Download options organized in dropdown menu
- [x] "Toggle Favorite" button (updates is_favorite field)
- [x] "Regenerate" button (navigates to /scripts/new with same video)
- [x] "Delete" button (with confirmation dialog)
- [x] All actions show success toasts
- [x] Use React Query hooks from `hooks/use-scripts.ts`
- [x] API endpoints created:
  - GET `/api/scripts/[id]` - fetch single script
  - PATCH `/api/scripts/[id]/favorite` - toggle favorite
  - DELETE `/api/scripts/[id]` - delete script
- **Acceptance**: ✅ All actions work correctly

🟢 **T4.1.10**: Create useGenerateScript hook ✅ COMPLETE
- [x] Create `hooks/use-scripts.ts`
- [x] useGenerateScript() mutation hook
- [x] Also created: useScripts(), useScript(id), useDeleteScript(), useToggleFavorite()
- [x] Handle loading state
- [x] Handle errors with toast notifications
- [x] Show usage remaining in success toast
- [x] Invalidate queries on success
- [x] Redirect to /scripts after generation
- **Acceptance**: ✅ Hook manages state

---

#### Epic 4.2: Script Library (Days 35-37) ✅ 100% COMPLETE

**User Story 4.2.1**: As a user, I want to manage my saved scripts
**Priority**: P0
**Estimated Time**: 6 hours
**Status**: 🟢 **COMPLETE** (6/6 tasks complete)

**Tasks**:

🟢 **T4.2.1**: Create scripts library page ✅ COMPLETE
- [x] Create `app/(auth)/scripts/page.tsx`
- [x] Display all user's scripts as cards in grid
- [x] Show card details:
  - Topic/title
  - Hook preview (first 100 chars)
  - Created date (relative time with formatDistanceToNow)
  - Source video thumbnail
  - Favorite icon (filled if favorited)
  - Hook format and framework badges
  - Estimated duration and word count
- [x] "Generate New Script" button at top
- [x] Sorting: Most Recent, Favorites First, Topic, Word Count, Duration
- [x] Filters: Hook Format (9 options), Framework (7 options), Favorites Only (checkbox)
- [x] Search by topic/hook content
- [x] Clear filters button
- [x] Empty state with "Generate your first script" CTA
- [x] Responsive grid layout (3 columns on large, 2 on medium, 1 on small)
- [x] Pagination info showing "X of Y scripts"
- [x] Favorite toggle on each card
- [x] Regenerate button on each card
- **Acceptance**: ✅ Scripts display beautifully with full filtering

🟢 **T4.2.2**: Implement GET /api/scripts ✅ COMPLETE
- [x] Create `app/api/scripts/route.ts`
- [x] Fetch all scripts for authenticated user
- [x] Query parameters:
  - search (filter by topic/hook with ILIKE)
  - hookFormat (exact match)
  - framework (exact match)
  - favoritesOnly (boolean)
  - sortBy (created_at, is_favorite, topic, estimated_duration, word_count)
  - sortOrder (asc/desc)
  - page (default 1)
  - limit (default 50)
- [x] Include source video info via join
- [x] Return paginated results with metadata
- [x] Proper error handling and authentication
- **Acceptance**: ✅ API returns filtered scripts

🟢 **T4.2.3**: Create script detail page ✅ COMPLETE
- [x] Already existed at `app/(auth)/scripts/[id]/page.tsx`
- [x] Display full script sections (Hook, Body, CTA, Visual Suggestions)
- [x] Show all metadata (duration, word count, parameters)
- [x] Show source video with thumbnail and link
- [x] Show generation parameters (hook format, framework)
- [x] Actions implemented:
  - Copy to clipboard
  - Favorite/Unfavorite toggle
  - Delete with confirmation
  - Regenerate with same video
  - Download (TXT, Markdown, JSON)
- [x] Responsive 2/3 content + 1/3 sidebar layout
- **Acceptance**: ✅ Full script details with all actions

🟢 **T4.2.4**: Implement favorite toggle ✅ COMPLETE
- [x] PATCH `/api/scripts/[id]/favorite` endpoint already exists
- [x] Updates is_favorite field
- [x] RLS ensures user owns script
- [x] useToggleFavorite() hook with optimistic updates
- [x] Shows in favorites filter on library page
- [x] Success toast notification
- [x] Invalidates React Query cache
- **Acceptance**: ✅ Can favorite/unfavorite scripts

🟢 **T4.2.5**: Implement delete script ✅ COMPLETE
- [x] DELETE `/api/scripts/[id]` endpoint already exists
- [x] Confirmation dialog with AlertDialog component
- [x] Deletes from database with RLS protection
- [x] Redirects to scripts library after deletion
- [x] Success toast message
- [x] useDeleteScript() hook handles state
- [x] Invalidates React Query cache
- **Acceptance**: ✅ Can delete scripts safely

🟢 **T4.2.6**: Add export functionality ✅ COMPLETE
- [x] Export as plain text (.txt)
  - Includes topic, hook, body, CTA
  - Includes metadata footer
- [x] Export as markdown (.md)
  - Full formatting with headers
  - Includes source video link
  - Professional structure
- [x] Export as JSON (.json)
  - Complete metadata object
  - Content sections
  - Source video details
  - Export timestamp
- [x] Download via browser download API
- [x] Copy to clipboard option (separate button)
- [x] Success toast for each action
- [x] Dropdown menu for download options
- **Acceptance**: ✅ Can export in all three formats

---

### Week 8: Billing & Limits

#### Epic 4.3: Stripe Integration (Days 38-40)

**User Story 4.3.1**: As a user, I want to upgrade to a paid plan
**Priority**: P0
**Estimated Time**: 12 hours

**Tasks**:

🔴 **T4.3.1**: Setup Stripe account
- [ ] Create Stripe account
- [ ] Get API keys (test and live)
- [ ] Add to environment variables
- [ ] Install: `npm install stripe @stripe/stripe-js`
- [ ] Create products in Stripe:
  - Pro: $39/month
  - Creator: $79/month
- [ ] Create prices for each
- **Acceptance**: Stripe configured

🔴 **T4.3.2**: Create pricing page
- [ ] Create `app/pricing/page.tsx`
- [ ] Display all tiers:
  - Free (current plan indicator)
  - Pro ($39/mo or $390/yr)
  - Creator ($79/mo or $790/yr)
- [ ] List features for each
- [ ] Highlight differences
- [ ] "Choose Plan" buttons
- [ ] FAQ section
- [ ] Style professionally
- **Acceptance**: Pricing page looks good

🔴 **T4.3.3**: Implement checkout flow
- [ ] Create POST `/api/checkout`
- [ ] Create Stripe Checkout Session
- [ ] Redirect to Stripe
- [ ] Handle success/cancel URLs
- [ ] Store session ID
- **Acceptance**: Checkout initiates

🔴 **T4.3.4**: Setup Stripe webhook
- [ ] Create POST `/api/webhooks/stripe`
- [ ] Verify webhook signature
- [ ] Handle events:
  - checkout.session.completed
  - customer.subscription.created
  - customer.subscription.updated
  - customer.subscription.deleted
  - invoice.payment_succeeded
  - invoice.payment_failed
- [ ] Update user_subscriptions table
- [ ] Update plan_type and limits
- **Acceptance**: Webhooks update database

🔴 **T4.3.5**: Create customer portal
- [ ] Add "Manage Billing" to settings
- [ ] Create Stripe Customer Portal session
- [ ] Allow users to:
  - Update payment method
  - Cancel subscription
  - View invoices
  - Change plan
- [ ] Redirect to portal
- **Acceptance**: Can manage subscription

🔴 **T4.3.6**: Implement plan limits enforcement
- [ ] Check limits before:
  - Adding channels
  - Generating scripts
  - Running analyses
- [ ] Show upgrade prompt if limit reached
- [ ] Block action if exceeded
- [ ] Clear messaging about limits
- **Acceptance**: Limits enforced

🔴 **T4.3.7**: Add upgrade prompts
- [ ] Soft prompts:
  - "5 scripts remaining" banner
  - "Upgrade for unlimited" tooltip
- [ ] Hard blocks:
  - "Limit reached" modal
  - "Upgrade to continue" button
- [ ] Show value proposition
- [ ] Make upgrading easy
- **Acceptance**: Prompts drive upgrades

🔴 **T4.3.8**: Test payment flow
- [ ] Use Stripe test cards
- [ ] Test successful payment
- [ ] Test failed payment
- [ ] Test subscription cancellation
- [ ] Test plan changes
- [ ] Verify database updates
- [ ] Test webhooks locally (Stripe CLI)
- **Acceptance**: Payment flow works

---

### Milestone 4 Acceptance Criteria

**Before marking M4 complete, verify**:

- [ ] User can generate scripts from any video
- [ ] Can choose hook format and framework
- [ ] Generated scripts are high quality
- [ ] Scripts save to library
- [ ] Can view, favorite, delete scripts
- [ ] Can export scripts
- [ ] Pricing page explains plans clearly
- [ ] Can upgrade to paid plan via Stripe
- [ ] Stripe webhooks update database correctly
- [ ] Can manage subscription in portal
- [ ] Usage limits enforced
- [ ] Upgrade prompts appear appropriately
- [ ] Test payments work end-to-end
- [ ] All errors handled gracefully

**Success Metrics**:
- Script generation success rate >95%
- Average script quality rating >4/5
- Payment success rate >98%
- Zero billing errors
- Upgrade conversion >5% (early users)

---

