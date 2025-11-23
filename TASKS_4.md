## Milestone 4: Monetization (Weeks 7-8)

**Goal**: Script generation works and users can pay
**Duration**: 2 weeks
**Success Criteria**:
- ✅ User can generate high-quality scripts
- ✅ Script library manages saved scripts
- ✅ Billing integration works
- ✅ Free and paid tiers enforced

---

### Week 7: Script Generation

#### Epic 4.1: Script Generator (Days 31-35)

**User Story 4.1.1**: As a user, I want to generate viral scripts from videos
**Priority**: P0
**Estimated Time**: 16 hours

**Tasks**:

🔴 **T4.1.1**: Create generateScript function
- [ ] Create `lib/openai/generate.ts`
- [ ] Copy implementation from CLAUDE.md
- [ ] Define hook formats and frameworks
- [ ] Build comprehensive prompt
- [ ] Parse response into sections
- [ ] Return structured script
- **Acceptance**: Generates quality scripts

🔴 **T4.1.2**: Create script generator page
- [ ] Create `app/(dashboard)/scripts/new/page.tsx`
- [ ] Layout:
  - Left: Video selection & options
  - Right: Generated script preview
- [ ] Can access from:
  - Video detail page
  - Scripts page
  - Dashboard
- **Acceptance**: Page renders correctly

🔴 **T4.1.3**: Build video selection interface
- [ ] Show selected video:
  - Thumbnail
  - Title
  - Basic stats
- [ ] Button to change video
- [ ] Opens video picker modal
- [ ] Can search/filter videos
- [ ] Select and confirm
- **Acceptance**: Can choose video

🔴 **T4.1.4**: Create hook format selector
- [ ] List all 9 hook formats:
  - Pattern Interrupt
  - Shocking Stat
  - Personal Story
  - Bold Claim
  - Question Hook
  - Trend Jacking
  - Contrarian Take
  - List Format
  - Direct Address
- [ ] Radio buttons or cards
- [ ] Show description of each
- [ ] Select one (required)
- **Acceptance**: Can select hook

🔴 **T4.1.5**: Create framework selector
- [ ] List all 7 storytelling frameworks:
  - Problem-Agitate-Solve (PAS)
  - Before-After-Bridge (BAB)
  - AIDA
  - Hero's Journey
  - Situation-Complication-Resolution
  - Feature-Benefit-Proof
  - Curiosity Loop
- [ ] Radio buttons or cards
- [ ] Show description of each
- [ ] Select one (required)
- **Acceptance**: Can select framework

🔴 **T4.1.6**: Add writing style options (basic)
- [ ] Tone dropdown:
  - Casual
  - Professional
  - Enthusiastic
  - Educational
- [ ] Vocabulary level:
  - Simple
  - Moderate
  - Advanced
- [ ] Save as default for user
- **Acceptance**: Can customize style

🔴 **T4.1.7**: Create POST /api/scripts/generate
- [ ] Create endpoint
- [ ] Request body:
  ```typescript
  {
    videoId: string;
    hookFormat: string;
    framework: string;
    tone?: string;
    vocabularyLevel?: string;
    customTopic?: string;
  }
  ```
- [ ] Check usage limit
- [ ] Fetch video data
- [ ] Call generateScript function
- [ ] Parse response
- [ ] Save to scripts table
- [ ] Increment scripts_used_this_month
- [ ] Return script
- **Acceptance**: API generates script

🔴 **T4.1.8**: Implement script preview
- [ ] Display generated script sections:
  - Topic
  - Hook
  - Body
  - Call-to-Action
  - Visual Suggestions
  - Estimated Duration
- [ ] Format nicely
- [ ] Syntax highlighting for sections
- [ ] Word count display
- **Acceptance**: Script looks professional

🔴 **T4.1.9**: Add script actions
- [ ] "Copy to Clipboard" button
- [ ] "Save to Library" button
- [ ] "Regenerate" button (uses same settings)
- [ ] "Edit" button (future)
- [ ] Share button (future)
- [ ] Show success toasts
- **Acceptance**: Actions work

🔴 **T4.1.10**: Create useGenerateScript hook
- [ ] Create mutation hook
- [ ] Handle loading state
- [ ] Handle errors
- [ ] Show usage remaining
- [ ] Invalidate queries on success
- **Acceptance**: Hook manages state

---

#### Epic 4.2: Script Library (Days 35-37)

**User Story 4.2.1**: As a user, I want to manage my saved scripts
**Priority**: P0
**Estimated Time**: 6 hours

**Tasks**:

🔴 **T4.2.1**: Create scripts library page
- [ ] Create `app/(dashboard)/scripts/page.tsx`
- [ ] Display all user's scripts
- [ ] Show as cards:
  - Topic
  - Hook preview (first 100 chars)
  - Created date
  - Source video thumbnail
  - Favorite icon
- [ ] Sort by: Date, Favorite
- [ ] Filter by: Hook format, Framework
- **Acceptance**: Scripts display nicely

🔴 **T4.2.2**: Implement GET /api/scripts
- [ ] Create endpoint
- [ ] Fetch user's scripts
- [ ] Support pagination
- [ ] Support filters
- [ ] Include source video info
- [ ] Order by created_at DESC
- **Acceptance**: API returns scripts

🔴 **T4.2.3**: Create script detail page
- [ ] Create `app/(dashboard)/scripts/[id]/page.tsx`
- [ ] Display full script
- [ ] Show all sections
- [ ] Show source video
- [ ] Show generation parameters
- [ ] Add actions:
  - Copy
  - Favorite/Unfavorite
  - Delete
  - Edit (future)
- **Acceptance**: Can view script details

🔴 **T4.2.4**: Implement favorite toggle
- [ ] Create PATCH `/api/scripts/[id]`
- [ ] Update is_favorite field
- [ ] Update UI optimistically
- [ ] Show in favorites filter
- **Acceptance**: Can favorite scripts

🔴 **T4.2.5**: Implement delete script
- [ ] Add DELETE handler to `/api/scripts/[id]`
- [ ] Show confirmation dialog
- [ ] Delete from database
- [ ] Redirect to scripts library
- [ ] Show success message
- **Acceptance**: Can delete scripts

🔴 **T4.2.6**: Add export functionality
- [ ] Export as plain text
- [ ] Export as markdown
- [ ] Export as JSON (with metadata)
- [ ] Download file
- [ ] Copy to clipboard option
- **Acceptance**: Can export scripts

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

