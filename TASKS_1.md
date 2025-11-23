## Milestone 1: Foundation (Weeks 1-2)

**Goal**: Launch-ready infrastructure with working authentication
**Duration**: 2 weeks
**Success Criteria**: 
- ✅ User can sign up and log in
- ✅ Dashboard displays with user info
- ✅ Deployed to Vercel staging
- ✅ Zero critical bugs

---

### Week 1: Project Initialization

#### Epic 1.1: Project Setup (Days 1-2)

**User Story 1.1.1**: As a developer, I need the project initialized with Next.js 16
**Priority**: P0
**Estimated Time**: 4 hours

**Tasks**:

🟢 **T1.1.1**: Create Next.js 16 project ✅ COMPLETE
```bash
npx create-next-app@latest reatorai --typescript --tailwind --app
```
- [x] Run create-next-app command
- [x] Select options:
  - TypeScript: Yes
  - ESLint: Yes
  - Tailwind CSS: Yes
  - `src/` directory: Yes (using src/)
  - App Router: Yes
  - Import alias: Yes (@/*)
- [x] Verify project runs: `npm run dev`
- [x] Test http://localhost:3000
- **Acceptance**: ✅ Homepage loads successfully

🟢 **T1.1.2**: Configure TypeScript strict mode ✅ COMPLETE
- [x] Open `tsconfig.json`
- [x] Set `"strict": true`
- [x] TypeScript configured correctly
- [x] Build tested successfully
- **Acceptance**: ✅ No TypeScript errors

🟢 **T1.1.3**: Setup Git and initial commit ✅ COMPLETE
- [x] Initialize Git: `git init`
- [x] Create `.gitignore` (exists)
- [x] Add all files: `git add .`
- [x] Initial commit: `git commit -m "feat: initialize Next.js 16 project"`
- [x] Create GitHub repo
- [x] Push to GitHub
- **Acceptance**: ✅ Code on GitHub

🟢 **T1.1.4**: Install core dependencies ✅ COMPLETE
```bash
npm install @supabase/supabase-js @supabase/auth-helpers-nextjs
npm install openai youtube-transcript
npm install zustand @tanstack/react-query
npm install react-hook-form zod @hookform/resolvers
npm install date-fns
npm install -D @types/node
```
- [x] Run installation command
- [x] All dependencies installed successfully
- [x] Test build: `npm run build`
- **Acceptance**: ✅ Build succeeds

🟢 **T1.1.5**: Setup shadcn/ui ✅ COMPLETE
```bash
npx shadcn-ui@latest init
```
- [x] Run init command
- [x] Select style: Default
- [x] Select base color: Slate
- [x] Install initial components:
  ```bash
  npx shadcn-ui@latest add button card input label
  npx shadcn-ui@latest add select textarea dialog tabs
  npx shadcn-ui@latest add dropdown-menu avatar badge
  npx shadcn-ui@latest add toast skeleton
  ```
- [x] Verify components in `components/ui/`
- **Acceptance**: ✅ Can import and use Button component

---

#### Epic 1.2: Supabase Setup (Days 2-3) ✅ 100% COMPLETE

**User Story 1.2.1**: As a developer, I need Supabase configured for auth and database
**Priority**: P0
**Estimated Time**: 6 hours
**Actual Time**: 2 hours (via MCP automation)
**Status**: ✅ COMPLETE - All tasks finished, database live and production-ready!

**Tasks**:

🟢 **T1.2.1**: Create Supabase project ✅ COMPLETE
- [x] Log into Supabase dashboard
- [x] Click "New Project"
- [x] Project name: "ReatorAI Production"
- [x] Database password: Generated strong password
- [x] Region: Selected closest to target users
- [x] Pricing plan: Free tier
- [x] Project setup completed
- [x] Saved project URL and keys
- [x] Project ID: xisgqllycpshuervveax
- **Acceptance**: ✅ Project created and accessible
- **Status**: ✅ Complete

🟢 **T1.2.2**: Configure environment variables ✅ COMPLETE
- [x] Create `.env.local` file
- [x] Add Supabase credentials template:
  ```
  NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
  NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
  SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
  ```
- [x] Add API keys (placeholders):
  ```
  YOUTUBE_API_KEY=your_youtube_key
  OPENAI_API_KEY=your_openai_key
  CRON_SECRET=generate_random_string
  ```
- [x] Create `.env.example` (same structure, no values)
- [x] Add `.env.local` to `.gitignore`
- [x] Commit `.env.example` only
- **Acceptance**: ✅ Environment variable structure ready
- **Note**: User needs to fill in actual values

🟢 **T1.2.3**: Create database schema ✅ COMPLETE (via Supabase MCP)
- [x] Applied complete migration via MCP
- [x] Migration name: `initial_schema_setup`
- [x] All components created:
  - [x] uuid-ossp extension enabled
  - [x] user_subscriptions table
  - [x] watchlists table
  - [x] channels table
  - [x] watchlist_channels (junction table)
  - [x] videos table
  - [x] video_analyses table
  - [x] user_writing_styles table
  - [x] scripts table
  - [x] All indexes for performance
  - [x] Triggers (update_updated_at, update_watchlist_stats)
  - [x] Functions (reset_monthly_usage)
  - [x] Row Level Security policies (all tables)
- [x] Verified all 8 tables created successfully
- [x] Confirmed RLS enabled on all tables
- [x] Security audit passed (3 minor warnings, non-blocking)
- **Acceptance**: ✅ All tables exist with RLS and proper relationships
- **Status**: ✅ Complete - Production ready!

🟢 **T1.2.4**: Setup Supabase client helpers ✅ COMPLETE
- [x] Create `lib/supabase/client.ts`:
  ```typescript
  import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
  import { Database } from '@/types/database';

  export const createClient = () => {
    return createClientComponentClient<Database>();
  };
  ```
- [x] Create `lib/supabase/server.ts`:
  ```typescript
  import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
  import { cookies } from 'next/headers';
  import { Database } from '@/types/database';

  export const createClient = () => {
    return createServerComponentClient<Database>({ cookies });
  };
  ```
- [x] Create `lib/supabase/middleware.ts` (auth middleware)
- **Acceptance**: ✅ Can import and use clients

🟢 **T1.2.5**: Generate TypeScript types from database ✅ COMPLETE (via MCP)
- [x] Create `types/` directory
- [x] Create placeholder `types/database.ts`
- [x] Create `types/index.ts` for shared types
- [x] Add type exports
- [x] Generated types via Supabase MCP
- [x] Replaced placeholder with complete generated types
- [x] All 8 tables fully typed with Row/Insert/Update types
- [x] Relationship types included
- [x] Functions and Views types included
- [x] Helper types (Tables, TablesInsert, TablesUpdate, Enums, etc.)
- **Acceptance**: ✅ Complete type safety across application
- **Status**: ✅ Complete - src/types/database.ts updated with live schema!

---

#### Epic 1.3: Authentication (Days 3-5)

**User Story 1.3.1**: As a user, I want to sign up with email and password
**Priority**: P0
**Estimated Time**: 8 hours

**Tasks**:

🟢 **T1.3.1**: Create signup page UI ✅ COMPLETE
- [x] Create `app/(guest)/signup/page.tsx`
- [x] Create `components/signup-form.tsx`
- [x] Build form with react-hook-form:
  - Email field
  - Password field (min 8 chars)
  - Confirm password field
  - Submit button
- [x] Add Zod validation schema
- [x] Style with Tailwind + shadcn/ui
- [x] Add loading state
- [x] Add error display
- **Acceptance**: ✅ Form renders and validates

🟢 **T1.3.2**: Implement signup API endpoint ✅ COMPLETE
- [x] Create `app/api/auth/signup/route.ts`
- [x] Implement POST handler:
  ```typescript
  export async function POST(request: Request) {
    // 1. Parse and validate request body
    // 2. Call Supabase auth.signUp()
    // 3. Create user_subscriptions record
    // 4. Return success or error
  }
  ```
- [x] Handle errors (email exists, weak password)
- [x] Send verification email
- [x] Return appropriate status codes
- [x] Zod validation schema for email/password
- **Acceptance**: ✅ API route ready (needs Supabase credentials to test)

🟢 **T1.3.3**: Create login page UI ✅ COMPLETE
- [x] Create `app/(guest)/login/page.tsx`
- [x] Create `components/login-form.tsx`
- [x] Build form:
  - Email field
  - Password field
  - "Forgot password?" link
  - Submit button
- [x] Add validation
- [x] Style consistently with signup
- [x] Add loading states
- **Acceptance**: ✅ Form renders correctly

🟢 **T1.3.4**: Implement login API endpoint ✅ COMPLETE
- [x] Create `app/api/auth/login/route.ts`
- [x] Implement POST handler:
  ```typescript
  export async function POST(request: Request) {
    // 1. Parse credentials
    // 2. Call Supabase auth.signInWithPassword()
    // 3. Set session cookie
    // 4. Return success or error
  }
  ```
- [x] Handle invalid credentials
- [x] Auto-redirect to dashboard on success
- [x] Check and create subscription if missing
- **Acceptance**: ✅ API route ready (needs Supabase credentials to test)

🟢 **T1.3.5**: Implement logout functionality ✅ COMPLETE
- [x] Create `app/api/auth/logout/route.ts`
- [x] Implement POST handler:
  ```typescript
  export async function POST() {
    // 1. Call Supabase auth.signOut()
    // 2. Clear cookies
    // 3. Return success
  }
  ```
- [x] useAuth hook includes logout function
- [x] Auto-redirect to login on logout
- **Acceptance**: ✅ API route ready (needs Supabase credentials to test)

🟡 **T1.3.6**: Create password reset flow ⏸️ LOW PRIORITY
- [x] OTP page created `app/(guest)/otp/page.tsx`
- [ ] Create `app/(guest)/forgot-password/page.tsx`
- [ ] Form to enter email
- [ ] Send reset email via Supabase
- [ ] Create `app/(guest)/reset-password/page.tsx`
- [ ] Form to enter new password
- [ ] Handle reset token
- **Acceptance**: User can reset password
- **Status**: ⏸️ Can defer to later (P2)

🟢 **T1.3.7**: Setup auth middleware ✅ COMPLETE
- [x] Create `middleware.ts` structure in `lib/supabase/middleware.ts`
- [x] Move to root as `middleware.ts`
- [x] Protected routes configured (dashboard, videos, channels, etc.)
- [x] Auth routes configured (login, signup)
- [x] Session refresh logic
- [x] Redirect logic for protected/auth routes
- **Acceptance**: ✅ Auth middleware ready (needs Supabase to test)

🟢 **T1.3.8**: Create user session hook ✅ COMPLETE
- [x] Create `hooks/use-user.ts`
- [x] Use Supabase auth helpers
- [x] Return current user and loading state
- [x] Handle auth state changes
- [x] Create `hooks/use-auth.ts` for auth actions
- [x] Includes signup, login, logout functions
- [x] Toast notifications for user feedback
- [x] Auto-navigation after auth actions
- **Acceptance**: ✅ Can get user anywhere in app (needs Supabase to test)

---

### Week 2: Dashboard & Layout

#### Epic 1.4: Layout & Navigation (Days 6-8)

**User Story 1.4.1**: As a user, I want a clean dashboard layout with navigation
**Priority**: P0
**Estimated Time**: 10 hours

**Tasks**:

🟢 **T1.4.1**: Create dashboard layout ✅ COMPLETE
- [x] Create `app/(auth)/layout.tsx`
- [x] Structure:
  ```
  ┌─────────────────────────┐
  │ Header (top)            │
  ├──────┬──────────────────┤
  │ Side │ Main Content     │
  │ bar  │                  │
  │      │                  │
  └──────┴──────────────────┘
  ```
- [x] Make responsive (sidebar collapses on mobile)
- [x] Add route group wrapper `(auth)`
- **Acceptance**: ✅ Layout renders correctly

🟢 **T1.4.2**: Build header component ✅ COMPLETE
- [x] Create `components/site-header.tsx`
- [x] Add:
  - ReatorAI logo
  - Global search (placeholder for now)
  - User dropdown menu (avatar, name, settings, logout)
- [x] Style with Tailwind
- [x] Make sticky on scroll
- **Acceptance**: ✅ Header looks professional

🟢 **T1.4.3**: Build sidebar component ✅ COMPLETE
- [x] Create `components/app-sidebar.tsx`
- [x] Navigation items:
  - 🏠 Dashboard
  - 🎬 Videos
  - 📚 Watchlists (collapsible)
    - List of user's watchlists
    - + New Watchlist
  - 📺 Channels
  - ✍️ Scripts
  - ⚙️ Settings
- [x] Highlight active route
- [x] Add icons (lucide-react)
- [x] Mobile: Drawer that slides in
- **Acceptance**: ✅ Sidebar navigates correctly

🟢 **T1.4.4**: Create dashboard home page ✅ COMPLETE
- [x] Create `app/(auth)/dashboard/page.tsx`
- [x] Add stats cards component:
  ```typescript
  interface StatsCard {
    title: string;
    value: number;
    icon: ReactNode;
    change?: string; // "+12% from last week"
  }
  ```
- [x] Show:
  - Total channels tracked
  - Total videos discovered
  - Outliers found
  - Scripts generated this month
- [x] Style as grid of cards
- **Acceptance**: ✅ Dashboard shows stats (with mock data)

🟡 **T1.4.5**: Create empty states ⏸️ PARTIAL
- [x] Empty state structure exists
- [ ] Customize for each page:
  - "No channels yet" → "Add your first channel"
  - "No watchlists yet" → "Create a watchlist"
  - "No scripts yet" → "Generate your first script"
- [ ] Friendly, encouraging tone
- **Acceptance**: Empty states guide users
- **Status**: ⏸️ Will add after backend implementation

🟢 **T1.4.6**: Add loading states ✅ COMPLETE
- [x] Create loading skeletons for sections
- [x] Use shadcn/ui Skeleton component
- [x] Match layout of actual content
- [x] Component exists in `components/ui/skeleton.tsx`
- **Acceptance**: ✅ Smooth loading experience

🟡 **T1.4.7**: Implement error boundaries ⏸️ DEFER
- [ ] Create `components/error-boundary.tsx`
- [ ] Catch errors gracefully
- [ ] Show friendly error message
- [ ] Add "Retry" button
- [ ] Log errors to console (or service)
- **Acceptance**: Errors don't crash app
- **Status**: ⏸️ P2 - can defer to polish phase

---

#### Epic 1.5: Deployment (Days 9-10)

**User Story 1.5.1**: As a developer, I need the app deployed to Vercel
**Priority**: P0
**Estimated Time**: 4 hours

**Tasks**:

🟢 **T1.5.1**: Prepare for deployment ✅ COMPLETE
- [x] Test production build locally:
  ```bash
  pnpm run build
  pnpm run start
  ```
- [x] Fix any build errors (None found!)
- [x] Verify environment variables in `.env.example`
- [x] Create `vercel.json` (for cron jobs)
- [x] Commit all changes
- **Acceptance**: ✅ Local production build works perfectly (732ms startup)

🟢 **T1.5.2**: Deploy to Vercel ✅ COMPLETE
- [x] Log into Vercel dashboard
- [x] Click "New Project"
- [x] Import from GitHub (reatorai repo)
- [x] Configure:
  - Framework: Next.js (auto-detected)
  - Root directory: ./
  - Build command: pnpm run build (auto-detected)
  - Output directory: .next (auto-detected)
- [x] Add environment variables (all from .env.local)
- [x] Deploy
- [x] Troubleshoot and fix deployment issues
- **Acceptance**: ✅ App deployed successfully at https://reatorai.vercel.app/

🔴 **T1.5.3**: Configure domains
- [ ] Vercel provides: reatorai.vercel.app
- [ ] (Optional) Add custom domain
- [ ] Configure DNS if custom domain
- [ ] Enable HTTPS (automatic on Vercel)
- [ ] Test deployed app
- **Acceptance**: Can access app at URL

🔴 **T1.5.4**: Setup staging environment
- [ ] Create staging branch in Git
- [ ] Deploy staging branch to Vercel
- [ ] Use different Supabase project (optional)
- [ ] Name: reatorai-staging.vercel.app
- [ ] Test deployment pipeline
- **Acceptance**: Staging and prod separated

🔴 **T1.5.5**: Create deployment checklist
- [ ] Document deployment process
- [ ] Add to docs/DEPLOYMENT.md
- [ ] Include:
  - Pre-deployment checks
  - Environment variables needed
  - Post-deployment verification
  - Rollback procedure
- **Acceptance**: Process documented

---

### Milestone 1 Acceptance Criteria

**Before marking M1 complete, verify**:

- [ ] User can visit app at deployed URL
- [ ] User can sign up with email/password
- [ ] User receives verification email
- [ ] User can log in with credentials
- [ ] User sees dashboard with empty states
- [ ] User can log out
- [ ] User can reset password
- [ ] Dashboard is responsive (mobile + desktop)
- [ ] No console errors on any page
- [ ] All links work
- [ ] Loading states show appropriately
- [ ] TypeScript builds with no errors
- [ ] All code committed to GitHub
- [ ] Staging and production environments work

**Success Metrics**:
- Page load time < 2 seconds
- Lighthouse score > 90
- Zero critical bugs
- Can complete auth flow in < 2 minutes

---

