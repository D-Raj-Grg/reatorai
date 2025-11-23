# TASKS.md - ReatorAI Development Tasks & Milestones

**Complete Task Breakdown with Milestones, Dependencies, and Tracking**

---

## Table of Contents

1. [Overview](#overview)
2. [Milestone Structure](#milestone-structure)
3. [Pre-Development Setup](#pre-development-setup)
4. [Milestone 1: Foundation](#milestone-1-foundation-weeks-1-2)
5. [Milestone 2: Core Features](#milestone-2-core-features-weeks-3-4)
6. [Milestone 3: Intelligence Layer](#milestone-3-intelligence-layer-weeks-5-6)
7. [Milestone 4: Monetization](#milestone-4-monetization-weeks-7-8)
8. [Milestone 5: Polish & Launch](#milestone-5-polish--launch-weeks-9-10)
9. [Post-Launch Tasks](#post-launch-tasks)
10. [Task Templates](#task-templates)

---

## Overview

### Project Timeline
- **Total Duration**: 10 weeks
- **Milestones**: 5 major milestones
- **Tasks**: 150+ individual tasks
- **Launch Target**: January 31, 2026

### Task Status Legend
- 🔴 **Not Started**: Haven't begun work
- 🟡 **In Progress**: Currently working on
- 🟢 **Completed**: Done and tested
- 🔵 **Blocked**: Waiting on dependency
- ⚫ **Cancelled**: No longer needed

### Priority Levels
- **P0 (Critical)**: Must have for MVP, blocks other work
- **P1 (High)**: Important for launch, should complete
- **P2 (Medium)**: Nice to have, can defer if needed
- **P3 (Low)**: Future enhancement

---

## Current Status Summary (Updated: Nov 23, 2025)

### ✅ Completed Tasks

**Pre-Development Setup:**
- ✅ Node.js 20+ and npm installed
- ✅ Git configured with SSH keys
- ✅ GitHub repository created (`reatorai`)
- ✅ Documentation files created (Claude.md, PLANNING.md, TASKS.md, PRD.md)
- ✅ Project folder structure established

**Milestone 1, Week 1 - Project Initialization:**
- ✅ T1.1.1: Next.js 16 project created with TypeScript
- ✅ T1.1.2: TypeScript strict mode configured
- ✅ T1.1.3: Git initialized and pushed to GitHub
- ✅ T1.1.5: shadcn/ui components installed (Button, Card, Input, Dialog, Tabs, Avatar, Badge, Skeleton, etc.)
- ✅ Basic UI components created (signup-form, login-form, sidebar, header)
- ✅ App Router structure with route groups ((guest), (auth))
- ✅ Dark mode support added (next-themes)
- ✅ Basic authentication pages created (login, signup, otp)
- ✅ Dashboard layout structure created

### 🟢 Recently Completed (Nov 23, 2025)

**Epic 1.1: Project Setup (COMPLETE)**
- ✅ T1.1.4: Core dependencies installed
  - ✅ @supabase/supabase-js v2.84.0
  - ✅ @supabase/auth-helpers-nextjs v0.10.0
  - ✅ openai v6.9.1
  - ✅ youtube-transcript v1.2.1
  - ✅ @tanstack/react-query v5.90.10
  - ✅ zustand v5.0.8
  - ✅ react-hook-form v7.66.1
  - ✅ @hookform/resolvers v5.2.2
  - ✅ date-fns v4.1.0

**Epic 1.2: Supabase Setup (COMPLETE)**
- ✅ Environment variable files created (.env.local, .env.example)
- ✅ Types directory structure created
- ✅ Database types placeholder created (src/types/database.ts)
- ✅ Shared TypeScript types created (src/types/index.ts)
- ✅ Supabase client helper created (src/lib/supabase/client.ts)
- ✅ Supabase server helper created (src/lib/supabase/server.ts)
- ✅ Authentication middleware created (src/lib/supabase/middleware.ts)
- ✅ React Query provider created (src/lib/react-query-provider.tsx)

**API Integration Placeholders (COMPLETE)**
- ✅ YouTube API structure created (src/lib/youtube/api.ts)
- ✅ YouTube transcript placeholder (src/lib/youtube/transcript.ts)
- ✅ OpenAI client configuration (src/lib/openai/client.ts)
- ✅ OpenAI analyze placeholder (src/lib/openai/analyze.ts)
- ✅ OpenAI generate placeholder (src/lib/openai/generate.ts)

**Documentation (COMPLETE)**
- ✅ Comprehensive SETUP.md guide created

### 🟢 Recently Completed (Nov 23, 2025 - Latest Session)

**Epic 1.5: Deployment Preparation (T1.5.1 COMPLETE)**
- ✅ Production build tested successfully (19.1s compile time)
- ✅ Production server verified (732ms startup)
- ✅ vercel.json created for cron jobs
- ✅ .env.example verified complete
- ✅ All changes committed and pushed to GitHub
- ✅ Zero build errors or warnings
- ✅ Ready for Vercel deployment

### 🟢 Previously Completed (Nov 23, 2025 - Earlier)

**Epic 1.2: Supabase Setup (100% COMPLETE via MCP)**
- ✅ T1.2.1: Supabase project created and configured
- ✅ T1.2.3: Database schema created via Supabase MCP
  - ✅ All 8 tables created with proper relationships
  - ✅ All indexes added for performance
  - ✅ Triggers and functions configured
  - ✅ Row Level Security (RLS) enabled on all tables
  - ✅ RLS policies applied for data protection
- ✅ T1.2.5: TypeScript types generated from live database schema
  - ✅ src/types/database.ts updated with complete types
  - ✅ Full type safety across the application
- ✅ Security audit passed (3 minor warnings, non-blocking)
- ✅ CRON_SECRET generated and added to .env.local
- ✅ All API credentials configured

**Epic 1.3: Authentication (100% COMPLETE)**
- ✅ T1.3.1: Signup page UI created with form validation
- ✅ T1.3.2: Signup API endpoint implemented
- ✅ T1.3.3: Login page UI created with form validation
- ✅ T1.3.4: Login API endpoint implemented
- ✅ T1.3.5: Logout functionality implemented
- ✅ T1.3.6: Password reset flow completed (forgot-password, reset-password, email verification)
- ✅ T1.3.7: Auth middleware (proxy.ts) configured for Next.js 16
- ✅ T1.3.8: User session hooks created (use-user.ts, use-auth.ts)
- ✅ Sonner toast notifications integrated
- ✅ Email verification system complete
- ✅ All forms connected to backend with proper error handling
- ✅ Loading states and disabled inputs during submission
- ✅ Redirects working (signup → verify-email, login → dashboard)
- ✅ Client-side and server-side validation with Zod
- ✅ TypeScript build successful with no errors

### 🔴 Not Started (Next Priorities)

**IMMEDIATE NEXT STEPS (P0):**
1. ✅ ~~Create Supabase project~~ COMPLETE
2. ✅ ~~Run database schema~~ COMPLETE (via MCP)
3. ✅ ~~Generate database types~~ COMPLETE (via MCP)
4. ✅ ~~Fill in .env.local with actual API keys~~ COMPLETE
5. ✅ ~~Implement authentication API routes~~ COMPLETE
   - ✅ POST /api/auth/signup
   - ✅ POST /api/auth/login
   - ✅ POST /api/auth/logout
6. ✅ ~~Connect auth forms to backend~~ COMPLETE (hooks created)
7. ✅ ~~Test authentication flow end-to-end~~ COMPLETE (Tested locally, working!)
8. ✅ ~~Test production build locally~~ COMPLETE (Build successful, 732ms startup!)
9. 🟡 Deploy to Vercel (READY - needs user Vercel account)

**Overall Assessment:**
- **Progress**: ~65% of Milestone 1 complete (Epic 1.1, 1.2, 1.3, T1.5.1 COMPLETE!)
- **Current Focus**: Vercel deployment (T1.5.2 - requires user action)
- **Blockers**: None! Production build tested successfully
- **Timeline**: Week 1-2 of 10-week plan
- **Status**: All code ready, builds successfully, authentication working - READY FOR DEPLOYMENT!

---

## Milestone Structure

```
MILESTONE → EPIC → USER STORY → TASK → SUBTASK

Example:
└─ M1: Foundation (2 weeks)
   └─ E1.1: Project Setup
      └─ US1.1.1: As a developer, I need the project initialized
         └─ T1.1.1.1: Create Next.js 16 project
            └─ ST1.1.1.1a: Run create-next-app
            └─ ST1.1.1.1b: Configure TypeScript
            └─ ST1.1.1.1c: Setup Tailwind
```

---

## Pre-Development Setup

**Duration**: 1 week before starting Milestone 1
**Owner**: Raj
**Goal**: Have all tools, accounts, and resources ready

### Setup Checklist

#### 🟢 Environment Setup
- [x] Install Node.js 20+ and npm/pnpm
- [x] Install Git and configure SSH keys
- [x] Install VS Code (or preferred IDE)
- [x] Install VS Code extensions:
  - [x] ESLint
  - [x] Prettier
  - [x] Tailwind CSS IntelliSense
  - [x] TypeScript & JavaScript
  - [x] GitLens
- [ ] Install Vercel CLI: `npm i -g vercel` *(optional - can use web UI)*
- [ ] Install Supabase CLI: `npm i -g supabase` *(optional - for later)*

#### 🟢 Accounts & Services
- [x] Create GitHub account/repository
  - [x] Repository name: `reatorai`
  - [x] Set to private initially
  - [x] Add README.md
  - [x] Add .gitignore for Next.js
- [ ] Create Vercel account *(user action needed)*
  - [ ] Connect to GitHub
  - [ ] Note: Will deploy later
- [x] Create Supabase account ✅ COMPLETE
  - [x] Create new project: "ReatorAI Production"
  - [x] Project ID: xisgqllycpshuervveax
  - [x] Region selected (closest to users)
  - [x] Credentials saved securely in .env.local
  - [x] Database schema applied via MCP
  - [x] All 8 tables created with RLS
- [x] Google Cloud Console ✅ COMPLETE
  - [x] Create new project: "ReatorAI"
  - [x] Enable YouTube Data API v3
  - [x] Create API key
  - [x] API key added to .env.local
- [x] OpenAI Platform ✅ COMPLETE
  - [x] Get API key
  - [x] API key added to .env.local
  - [x] Ready for use
- [ ] Domain (optional for MVP)
  - [ ] Purchase reatorai.com or similar
  - [ ] Configure DNS later

#### 🟢 Documentation Setup
- [x] Create project folder structure
  ```
  reatorai/
  ├── PRD.md
  ├── Claude.md
  ├── PLANNING.md
  ├── TASKS.md (this file)
  ├── SETUP.md
  └── src/ (code)
  ```
- [x] All .md files created in root
- [ ] Create project board (GitHub Projects or Linear) *(optional)*
- [x] Set up task tracking system (using TASKS.md)

#### 🟡 Design Resources
- [ ] Decide on logo concept *(future)*
- [x] Choose color palette (using shadcn/ui defaults)
- [ ] Set up Figma/design tool (optional)
- [x] Bookmark shadcn/ui docs
- [x] Bookmark Tailwind docs

#### 🟢 API Keys & Secrets
- [x] Create .env.example file with all required keys
- [x] Create .env.local template
- [x] All API keys configured in .env.local:
  - [x] NEXT_PUBLIC_SUPABASE_URL
  - [x] NEXT_PUBLIC_SUPABASE_ANON_KEY
  - [x] SUPABASE_SERVICE_ROLE_KEY
  - [x] YOUTUBE_API_KEY
  - [x] OPENAI_API_KEY
  - [x] CRON_SECRET (generated)
  - [x] NEXT_PUBLIC_APP_URL
- [ ] Set up password manager for secrets *(optional)*
- [x] Document API quota limits (in SETUP.md)

**Completion Criteria**: ✅ All accounts created, tools installed, can create new Next.js project

---

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

🔴 **T1.5.2**: Deploy to Vercel
- [ ] Log into Vercel dashboard
- [ ] Click "New Project"
- [ ] Import from GitHub (reatorai repo)
- [ ] Configure:
  - Framework: Next.js
  - Root directory: ./
  - Build command: npm run build
  - Output directory: .next
- [ ] Add environment variables (all from .env.local)
- [ ] Deploy
- **Acceptance**: App deployed successfully

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

#### Epic 2.1: YouTube API Integration (Days 11-13)

**User Story 2.1.1**: As a developer, I need YouTube API integration working
**Priority**: P0
**Estimated Time**: 8 hours

**Tasks**:

🔴 **T2.1.1**: Setup YouTube API client
- [ ] Create `lib/youtube/api.ts`
- [ ] Install googleapis: `npm install googleapis`
- [ ] Initialize YouTube API client:
  ```typescript
  import { google } from 'googleapis';
  
  const youtube = google.youtube({
    version: 'v3',
    auth: process.env.YOUTUBE_API_KEY
  });
  ```
- [ ] Add error handling
- [ ] Test API connection
- **Acceptance**: Can make API calls

🔴 **T2.1.2**: Implement getChannelInfo function
- [ ] Create function to fetch channel metadata:
  ```typescript
  export async function getChannelInfo(channelId: string) {
    // Call YouTube API channels.list
    // Return: id, name, handle, thumbnail, subscribers, totalVideos
  }
  ```
- [ ] Handle different input types:
  - Channel ID (UC...)
  - Channel handle (@username)
  - Channel URL
- [ ] Add input validation
- [ ] Add caching (optional for MVP)
- [ ] Test with real channels
- **Acceptance**: Returns correct channel data

🔴 **T2.1.3**: Implement getChannelVideos function
- [ ] Create function to fetch channel videos:
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
- [ ] Parse ISO 8601 duration to seconds
- [ ] Handle pagination (if needed)
- [ ] Test with various channels
- **Acceptance**: Returns video array

🔴 **T2.1.4**: Add API quota monitoring
- [ ] Create function to track API usage
- [ ] Log each API call
- [ ] Calculate quota consumption
- [ ] Alert if approaching limit (10,000/day)
- [ ] Document quota usage in console
- **Acceptance**: Can monitor quota

🔴 **T2.1.5**: Implement error handling
- [ ] Handle common errors:
  - Invalid API key
  - Channel not found
  - Quota exceeded
  - Network timeout
- [ ] Return user-friendly error messages
- [ ] Log errors for debugging
- [ ] Add retry logic for transient errors
- **Acceptance**: Graceful error handling

---

#### Epic 2.2: Add Channels (Days 13-15)

**User Story 2.2.1**: As a user, I want to add YouTube channels to track
**Priority**: P0
**Estimated Time**: 10 hours

**Tasks**:

🔴 **T2.2.1**: Create "Add Channel" UI
- [ ] Create `components/channels/add-channel-modal.tsx`
- [ ] Use shadcn Dialog component
- [ ] Add input for channel URL/ID/handle
- [ ] Add "Add Channel" button
- [ ] Show loading spinner during fetch
- [ ] Display preview before confirming
- [ ] Style professionally
- **Acceptance**: Modal opens and closes

🔴 **T2.2.2**: Implement channel URL parsing
- [ ] Create `lib/youtube/utils.ts`
- [ ] Parse different URL formats:
  - https://youtube.com/channel/UC...
  - https://youtube.com/@username
  - https://youtube.com/c/ChannelName
  - Just channel ID
  - Just handle
- [ ] Extract channel ID
- [ ] Validate format
- [ ] Test with examples
- **Acceptance**: Correctly parses URLs

🔴 **T2.2.3**: Create POST /api/channels endpoint
- [ ] Create `app/api/channels/route.ts`
- [ ] Implement POST handler:
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
- [ ] Validate user hasn't exceeded limit (5 for free tier)
- [ ] Handle duplicates
- [ ] Return appropriate errors
- **Acceptance**: API creates channel

🔴 **T2.2.4**: Implement add channel frontend logic
- [ ] Create mutation hook:
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
- [ ] Wire up to form
- [ ] Handle errors
- [ ] Show success message
- **Acceptance**: Channel added successfully

🔴 **T2.2.5**: Create channels list view
- [ ] Create `app/(dashboard)/channels/page.tsx`
- [ ] Create `components/channels/channel-card.tsx`
- [ ] Display:
  - Channel thumbnail
  - Channel name
  - Subscriber count
  - Total videos
  - Last synced time
  - Actions (sync, delete)
- [ ] Layout as grid (2-3 columns)
- [ ] Add "Add Channel" button at top
- **Acceptance**: Channels display nicely

🔴 **T2.2.6**: Implement GET /api/channels
- [ ] Create GET handler in `app/api/channels/route.ts`
- [ ] Fetch all channels for current user
- [ ] Include basic stats
- [ ] Order by created_at DESC
- [ ] Return as JSON
- **Acceptance**: Returns user's channels

🔴 **T2.2.7**: Create useChannels hook
- [ ] Create `hooks/use-channels.ts`
- [ ] Use React Query:
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
- [ ] Handle loading state
- [ ] Handle errors
- **Acceptance**: Hook fetches channels

🔴 **T2.2.8**: Implement delete channel
- [ ] Add DELETE handler: `app/api/channels/[id]/route.ts`
- [ ] Delete channel from database
- [ ] Cascade delete related data (RLS handles this)
- [ ] Decrement channels_count
- [ ] Return success
- [ ] Add delete button to channel card
- [ ] Add confirmation dialog
- [ ] Show success toast
- **Acceptance**: Can delete channels

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

#### Epic 2.4: Channel Suggestions (Days 18-20)

**User Story 2.4.1**: As a new user, I want suggestions for channels to add
**Priority**: P2
**Estimated Time**: 4 hours

**Tasks**:

🔴 **T2.4.1**: Create suggested channels list
- [ ] Create `lib/suggestions/educational-channels.ts`
- [ ] Add array of popular educational channels:
  ```typescript
  export const SUGGESTED_CHANNELS = [
    { name: 'Veritasium', id: 'UCHnyfMqiRRG1u-2MsSQLbXA' },
    { name: 'Vsauce', id: 'UC6nSFpj9HTCZ5t-N3Rm3-HA' },
    // ... add 20-30 channels
  ];
  ```
- [ ] Categorize by topic (Science, Geography, History)
- [ ] Include channel IDs
- **Acceptance**: List created

🔴 **T2.4.2**: Add suggestions to empty state
- [ ] Update channels page empty state
- [ ] Show "Popular Educational Channels"
- [ ] Display as cards with:
  - Channel name
  - Category tag
  - "Add" button
- [ ] Clicking "Add" adds channel
- [ ] Show only 6-9 suggestions initially
- [ ] "Show more" to expand
- **Acceptance**: Suggestions help new users

🔴 **T2.4.3**: Add suggestions during onboarding (optional)
- [ ] Create onboarding modal for first login
- [ ] Step 1: Welcome
- [ ] Step 2: Add channels (show suggestions)
- [ ] Step 3: Create first watchlist
- [ ] Save progress
- [ ] Can skip
- **Acceptance**: Smooth onboarding

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

## Milestone 3: Intelligence Layer (Weeks 5-6)

**Goal**: Automatically discover videos and identify outliers
**Duration**: 2 weeks
**Success Criteria**:
- ✅ Videos sync automatically from channels
- ✅ Outlier detection works accurately
- ✅ Transcripts extract successfully
- ✅ Video analysis generates insights

---

### Week 5: Video Sync & Discovery

#### Epic 3.1: Automatic Video Syncing (Days 21-23)

**User Story 3.1.1**: As a user, I want videos from my channels synced automatically
**Priority**: P0
**Estimated Time**: 10 hours

**Tasks**:

🔴 **T3.1.1**: Create video sync function
- [ ] Create `lib/sync/sync-channel-videos.ts`
- [ ] Function signature:
  ```typescript
  export async function syncChannelVideos(channelId: string) {
    // 1. Fetch videos from YouTube API
    // 2. For each video:
    //    - Check if exists in database
    //    - If new: insert
    //    - If exists: update metrics
    // 3. Calculate channel averages
    // 4. Run outlier detection
    // 5. Update last_synced_at
    // 6. Return sync stats
  }
  ```
- [ ] Handle errors gracefully
- [ ] Add logging
- [ ] Test with real channel
- **Acceptance**: Videos sync correctly

🔴 **T3.1.2**: Implement outlier detection
- [ ] Create `lib/analytics/outlier-detection.ts`
- [ ] Implement algorithm from CLAUDE.md:
  ```typescript
  function calculateOutlierScore(
    video: VideoMetrics,
    channelAvg: ChannelAverage
  ): { isOutlier: boolean; score: number } {
    // Calculate engagement rate
    // Calculate view ratio
    // Calculate engagement ratio
    // Weighted score (60% views, 40% engagement)
    // Mark as outlier if score >= 2.0
  }
  ```
- [ ] Test with sample data
- [ ] Verify accuracy
- **Acceptance**: Correctly identifies outliers

🔴 **T3.1.3**: Create manual sync endpoint
- [ ] Create POST `/api/channels/[id]/sync`
- [ ] Trigger syncChannelVideos function
- [ ] Return sync stats (videos added, updated)
- [ ] Handle errors
- [ ] Add rate limiting (max 1 sync per channel per hour)
- **Acceptance**: Manual sync works

🔴 **T3.1.4**: Add sync button to channel card
- [ ] Add "Sync Now" button to channel cards
- [ ] Show loading spinner during sync
- [ ] Display sync results in toast
- [ ] Disable button if recently synced
- [ ] Update last_synced_at display
- **Acceptance**: User can manually sync

🔴 **T3.1.5**: Setup Vercel Cron Job
- [ ] Create `app/api/cron/sync-videos/route.ts`
- [ ] Implement GET handler:
  ```typescript
  export async function GET(request: Request) {
    // 1. Verify cron secret
    // 2. Fetch channels ordered by last_synced_at
    // 3. Sync 10 channels (batch)
    // 4. Return stats
  }
  ```
- [ ] Add to `vercel.json`:
  ```json
  {
    "crons": [
      {
        "path": "/api/cron/sync-videos",
        "schedule": "0 */6 * * *"
      }
    ]
  }
  ```
- [ ] Test cron locally
- [ ] Deploy and verify
- **Acceptance**: Videos sync every 6 hours

🔴 **T3.1.6**: Add sync status indicators
- [ ] Show "Syncing..." badge on channels
- [ ] Show last synced time ("2 hours ago")
- [ ] Show sync progress if available
- [ ] Update UI when sync completes
- [ ] Handle errors (show retry option)
- **Acceptance**: User knows sync status

---

#### Epic 3.2: Video Library (Days 23-25)

**User Story 3.2.1**: As a user, I want to browse all discovered videos
**Priority**: P0
**Estimated Time**: 8 hours

**Tasks**:

🔴 **T3.2.1**: Create videos list page
- [ ] Create `app/(dashboard)/videos/page.tsx`
- [ ] Fetch videos with filters
- [ ] Display as grid (3-4 columns desktop, 1-2 mobile)
- [ ] Show:
  - Video thumbnail
  - Title (2 lines max)
  - Channel avatar and name
  - View count, likes, comments
  - Published date
  - Outlier badge if applicable
- [ ] Infinite scroll or pagination
- **Acceptance**: Videos display nicely

🔴 **T3.2.2**: Implement GET /api/videos
- [ ] Create `app/api/videos/route.ts`
- [ ] Support query parameters:
  - search: string
  - channelId: string
  - watchlistId: string
  - isOutlier: boolean
  - sortBy: 'views' | 'engagement' | 'date'
  - sortOrder: 'asc' | 'desc'
  - page: number
  - limit: number (default 50)
- [ ] Build dynamic Supabase query
- [ ] Include channel info in response
- [ ] Return paginated results
- **Acceptance**: API returns filtered videos

🔴 **T3.2.3**: Create video filters UI
- [ ] Create `components/videos/video-filters.tsx`
- [ ] Add filter controls:
  - Search input (debounced)
  - Channel dropdown
  - Watchlist dropdown
  - "Outliers Only" checkbox
  - Sort dropdown (Views, Engagement, Date)
  - Sort order toggle
- [ ] Update URL params on filter change
- [ ] Persist filters in URL
- **Acceptance**: Filters work smoothly

🔴 **T3.2.4**: Create VideoCard component
- [ ] Create `components/videos/video-card.tsx`
- [ ] Props: video, onAnalyze, onGenerateScript
- [ ] Responsive design
- [ ] Hover effects
- [ ] Click to view details
- [ ] Quick actions:
  - "Analyze" button
  - "Generate Script" button
  - Bookmark (future)
- **Acceptance**: Card looks professional

🔴 **T3.2.5**: Implement video detail page
- [ ] Create `app/(dashboard)/videos/[id]/page.tsx`
- [ ] Create GET `/api/videos/[id]`
- [ ] Display:
  - Embedded YouTube player
  - Title and description
  - Channel info
  - Full metrics (views, likes, comments, engagement rate)
  - Outlier score if applicable
  - Published date
  - Duration
- [ ] Add tabs:
  - Overview
  - Transcript
  - Analysis (if available)
  - Generated Scripts (list)
- **Acceptance**: Detail page comprehensive

🔴 **T3.2.6**: Add video search
- [ ] Implement full-text search on title + description
- [ ] Use Supabase text search
- [ ] Debounce search input (300ms)
- [ ] Highlight search terms in results
- [ ] Show "No results" state
- [ ] Add search suggestions (future)
- **Acceptance**: Search works well

🔴 **T3.2.7**: Create useVideos hook
- [ ] Create `hooks/use-videos.ts`
- [ ] Support all filters
- [ ] Use React Query with pagination
- [ ] Handle loading/error states
- [ ] Prefetch next page
- **Acceptance**: Hook manages video data

---

### Week 6: Transcripts & Analysis

#### Epic 3.3: Transcript Extraction (Days 26-27)

**User Story 3.3.1**: As a user, I want to read video transcripts
**Priority**: P0
**Estimated Time**: 6 hours

**Tasks**:

🔴 **T3.3.1**: Setup transcript extraction
- [ ] Install: `npm install youtube-transcript`
- [ ] Create `lib/youtube/transcript.ts`
- [ ] Implement fetchTranscript function:
  ```typescript
  export async function fetchTranscript(videoId: string) {
    try {
      const transcript = await YoutubeTranscript.fetchTranscript(videoId);
      return transcript.map(t => t.text).join(' ');
    } catch (error) {
      return null; // Some videos don't have transcripts
    }
  }
  ```
- [ ] Test with various videos
- [ ] Handle errors gracefully
- **Acceptance**: Transcripts fetch successfully

🔴 **T3.3.2**: Auto-fetch transcripts for outliers
- [ ] Modify syncChannelVideos function
- [ ] After marking as outlier, fetch transcript
- [ ] Store in videos.transcript column
- [ ] Set transcript_fetched_at timestamp
- [ ] Skip if transcript already exists
- [ ] Handle missing transcripts
- **Acceptance**: Outliers have transcripts

🔴 **T3.3.3**: Display transcript in video detail
- [ ] Add "Transcript" tab to video detail page
- [ ] Display full transcript
- [ ] Format nicely (paragraphs, not wall of text)
- [ ] Add timestamps if available (future)
- [ ] Show "Transcript not available" if null
- [ ] Add copy button
- **Acceptance**: Transcript readable

🔴 **T3.3.4**: Add manual transcript fetch
- [ ] Add "Fetch Transcript" button if not available
- [ ] Call API to fetch
- [ ] Show loading state
- [ ] Update UI when complete
- [ ] Handle errors (video has no captions)
- **Acceptance**: Can manually fetch

---

#### Epic 3.4: AI Video Analysis (Days 27-30)

**User Story 3.4.1**: As a user, I want AI to analyze why videos went viral
**Priority**: P1
**Estimated Time**: 10 hours

**Tasks**:

🔴 **T3.4.1**: Setup OpenAI client
- [ ] Create `lib/openai/client.ts`
- [ ] Initialize OpenAI client:
  ```typescript
  import OpenAI from 'openai';
  
  export const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  });
  ```
- [ ] Test connection
- [ ] Handle rate limits
- **Acceptance**: Client works

🔴 **T3.4.2**: Implement analyzeVideo function
- [ ] Create `lib/openai/analyze.ts`
- [ ] Copy implementation from CLAUDE.md
- [ ] Customize prompt for educational content
- [ ] Parse response into sections:
  - Hook analysis
  - Storytelling analysis
  - Emotional triggers
  - Visual format
  - CTA analysis
  - Key takeaways
- [ ] Return structured data
- **Acceptance**: Returns good analysis

🔴 **T3.4.3**: Create POST /api/videos/[id]/analyze
- [ ] Create endpoint
- [ ] Check user hasn't exceeded analysis limit
- [ ] Fetch video + transcript from database
- [ ] Call analyzeVideo function
- [ ] Store in video_analyses table
- [ ] Increment analyses_used_this_month
- [ ] Return analysis
- **Acceptance**: API analyzes video

🔴 **T3.4.4**: Add "Analyze" button to videos
- [ ] Add to video cards
- [ ] Add to video detail page
- [ ] Show loading state during analysis
- [ ] Display success message
- [ ] Navigate to Analysis tab
- [ ] Show remaining analyses count
- **Acceptance**: User can analyze videos

🔴 **T3.4.5**: Display analysis in video detail
- [ ] Create "Analysis" tab
- [ ] Format each section nicely:
  - Section header
  - Content (markdown support)
  - Visual styling
- [ ] Add "Copy Analysis" button
- [ ] Show analyzed timestamp
- [ ] Allow re-analysis (future)
- **Acceptance**: Analysis looks professional

🔴 **T3.4.6**: Implement usage tracking
- [ ] Create `lib/usage/track.ts`
- [ ] Track analysis usage:
  ```typescript
  export async function trackAnalysis(userId: string) {
    // 1. Get user subscription
    // 2. Check if under limit
    // 3. If yes: increment counter
    // 4. If no: throw error
  }
  ```
- [ ] Show usage in UI
- [ ] Alert when approaching limit
- [ ] Block if limit reached
- **Acceptance**: Usage limits enforced

🔴 **T3.4.7**: Add usage indicator to dashboard
- [ ] Show in header or sidebar:
  - "Analyses: 5/20 this month"
  - "Scripts: 8/30 this month"
- [ ] Progress bars
- [ ] Link to upgrade if near limit
- [ ] Reset monthly (cron job)
- **Acceptance**: User knows their usage

---

### Milestone 3 Acceptance Criteria

**Before marking M3 complete, verify**:

- [ ] Videos sync automatically every 6 hours
- [ ] User can manually trigger sync
- [ ] Outlier detection accurately identifies viral videos
- [ ] Video library displays with filters
- [ ] Search works across titles and descriptions
- [ ] Video detail page shows all information
- [ ] Transcripts fetch for outlier videos
- [ ] User can view transcripts
- [ ] AI analysis generates quality insights
- [ ] Analysis displays in structured format
- [ ] Usage limits tracked and enforced
- [ ] User sees remaining quota
- [ ] No API errors or timeouts
- [ ] All UI is responsive

**Success Metrics**:
- 90%+ videos have transcripts
- Analysis quality score >4/5 (manual review)
- API response time <5 seconds for analysis
- Zero quota exceeded errors

---

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

## Milestone 5: Polish & Launch (Weeks 9-10)

**Goal**: Production-ready app ready for public launch
**Duration**: 2 weeks
**Success Criteria**:
- ✅ All features polished
- ✅ No critical bugs
- ✅ Performance optimized
- ✅ Ready for users

---

### Week 9: Polish & Testing

#### Epic 5.1: UX Polish (Days 41-43)

**User Story 5.1.1**: As a user, I want a smooth, polished experience
**Priority**: P1
**Estimated Time**: 12 hours

**Tasks**:

🔴 **T5.1.1**: Implement loading skeletons everywhere
- [ ] Audit all pages for loading states
- [ ] Add skeletons to:
  - Dashboard
  - Videos grid
  - Channels list
  - Scripts library
  - Video detail
- [ ] Match actual content layout
- [ ] Use shadcn Skeleton component
- **Acceptance**: No blank screens

🔴 **T5.1.2**: Add empty states with actions
- [ ] Create beautiful empty states for:
  - No channels: "Add your first channel"
  - No watchlists: "Organize with watchlists"
  - No videos: "Channels will sync soon"
  - No scripts: "Generate your first script"
- [ ] Add illustrations (optional)
- [ ] Clear call-to-action buttons
- [ ] Helpful guidance text
- **Acceptance**: Empty states guide users

🔴 **T5.1.3**: Improve error handling
- [ ] User-friendly error messages
- [ ] Show errors in toasts or alerts
- [ ] Provide actionable solutions
- [ ] Add "Retry" buttons where appropriate
- [ ] Log errors for debugging
- **Acceptance**: Errors are helpful

🔴 **T5.1.4**: Add success feedback
- [ ] Toast notifications for:
  - Channel added
  - Watchlist created
  - Script generated
  - Settings saved
  - Payment successful
- [ ] Use shadcn Toast component
- [ ] 3-5 second display
- [ ] Success icon
- **Acceptance**: Feedback feels good

🔴 **T5.1.5**: Implement keyboard shortcuts
- [ ] Add shortcuts:
  - `/` → Focus search
  - `n` → New script
  - `c` → Add channel
  - `w` → New watchlist
  - `?` → Show shortcuts help
- [ ] Show in UI (tooltips)
- [ ] Create help modal
- **Acceptance**: Power users love it

🔴 **T5.1.6**: Polish mobile experience
- [ ] Test on actual mobile devices
- [ ] Fix any layout issues
- [ ] Ensure all actions accessible
- [ ] Optimize touch targets
- [ ] Test forms on mobile
- [ ] Responsive navigation
- **Acceptance**: Works great on mobile

🔴 **T5.1.7**: Add micro-interactions
- [ ] Hover effects on cards
- [ ] Button press animations
- [ ] Page transitions
- [ ] Loading spinners
- [ ] Progress indicators
- [ ] Make UI feel alive
- **Acceptance**: UI feels polished

🔴 **T5.1.8**: Improve typography
- [ ] Consistent heading hierarchy
- [ ] Readable font sizes
- [ ] Proper line heights
- [ ] Good color contrast (WCAG AA)
- [ ] Use Inter font throughout
- **Acceptance**: Text is readable

---

#### Epic 5.2: Performance Optimization (Days 43-45)

**User Story 5.2.1**: As a user, I want the app to be fast
**Priority**: P1
**Estimated Time**: 8 hours

**Tasks**:

🔴 **T5.2.1**: Optimize images
- [ ] Add next/image for all images
- [ ] Lazy load images below fold
- [ ] Optimize thumbnail sizes
- [ ] Use WebP format
- [ ] Add blur placeholders
- **Acceptance**: Images load fast

🔴 **T5.2.2**: Implement caching
- [ ] Cache YouTube API responses (6 hours)
- [ ] Cache Supabase queries where appropriate
- [ ] Use React Query stale time
- [ ] Cache static assets
- [ ] Add Cache-Control headers
- **Acceptance**: Reduced API calls

🔴 **T5.2.3**: Optimize bundle size
- [ ] Run bundle analyzer
- [ ] Remove unused dependencies
- [ ] Code split large components
- [ ] Dynamic imports for heavy features
- [ ] Tree-shake unused code
- **Acceptance**: Bundle size <200KB

🔴 **T5.2.4**: Add database indexes
- [ ] Review slow queries
- [ ] Add indexes for:
  - videos.is_outlier
  - videos.published_at
  - videos.view_count
  - channels.user_id
- [ ] Test query performance
- **Acceptance**: Queries <100ms

🔴 **T5.2.5**: Run Lighthouse audit
- [ ] Test on production
- [ ] Target scores:
  - Performance: >90
  - Accessibility: >95
  - Best Practices: >90
  - SEO: >90
- [ ] Fix issues
- [ ] Re-test
- **Acceptance**: All scores >90

🔴 **T5.2.6**: Monitor Core Web Vitals
- [ ] Setup Vercel Analytics
- [ ] Track:
  - LCP (Largest Contentful Paint)
  - FID (First Input Delay)
  - CLS (Cumulative Layout Shift)
- [ ] Optimize if needed
- **Acceptance**: All "Good" range

---

#### Epic 5.3: Testing (Days 45-47)

**User Story 5.3.1**: As a developer, I need the app tested thoroughly
**Priority**: P1
**Estimated Time**: 10 hours

**Tasks**:

🔴 **T5.3.1**: Manual testing checklist
- [ ] Test all user flows:
  - Signup → Add channel → Generate script
  - Create watchlist → Organize channels
  - Analyze video → Read analysis
  - Upgrade to paid → Manage subscription
- [ ] Test on different browsers:
  - Chrome
  - Safari
  - Firefox
  - Mobile Safari
  - Mobile Chrome
- [ ] Test error scenarios:
  - Invalid inputs
  - Network failures
  - API errors
- **Acceptance**: Everything works

🔴 **T5.3.2**: User testing with 5 people
- [ ] Recruit 5 beta testers
- [ ] Give them tasks:
  - Sign up and add 3 channels
  - Create a watchlist
  - Generate 2 scripts
  - Provide feedback
- [ ] Watch them use app (screen share)
- [ ] Take notes on confusion points
- [ ] Ask follow-up questions
- **Acceptance**: Gather feedback

🔴 **T5.3.3**: Fix critical bugs from testing
- [ ] Prioritize issues:
  - P0: Blocks core functionality
  - P1: Annoying but not blocking
  - P2: Nice to fix
- [ ] Fix all P0 bugs
- [ ] Fix P1 if time allows
- [ ] Document P2 for later
- **Acceptance**: No blockers

🔴 **T5.3.4**: Security audit
- [ ] Check authentication flows
- [ ] Verify RLS policies work
- [ ] Test for common vulnerabilities:
  - SQL injection (Supabase handles)
  - XSS (React handles mostly)
  - CSRF (Next.js handles)
- [ ] Ensure API keys are secure
- [ ] Check environment variables
- **Acceptance**: No security issues

🔴 **T5.3.5**: Accessibility audit
- [ ] Test with screen reader
- [ ] Test keyboard navigation
- [ ] Check color contrast
- [ ] Ensure alt text on images
- [ ] Proper heading structure
- [ ] ARIA labels where needed
- **Acceptance**: Accessible to all

---

### Week 10: Launch Preparation

#### Epic 5.4: Launch Assets (Days 48-50)

**User Story 5.4.1**: As a marketer, I need launch assets ready
**Priority**: P0
**Estimated Time**: 12 hours

**Tasks**:

🔴 **T5.4.1**: Create landing page
- [ ] Create `app/page.tsx` (public homepage)
- [ ] Sections:
  - Hero (value prop, CTA)
  - How it works (4 steps)
  - Features (with screenshots)
  - Testimonials (if have early users)
  - Pricing
  - FAQ
  - Footer
- [ ] Professional design
- [ ] Mobile responsive
- [ ] Fast loading
- **Acceptance**: Landing page converts

🔴 **T5.4.2**: Create demo video
- [ ] Record 2-minute walkthrough
- [ ] Show:
  - Signing up
  - Adding channels
  - Finding outliers
  - Generating script
- [ ] Add voiceover explaining value
- [ ] Professional editing
- [ ] Upload to YouTube
- [ ] Embed on landing page
- **Acceptance**: Video is compelling

🔴 **T5.4.3**: Write Product Hunt launch post
- [ ] Craft headline (tagline)
- [ ] Write description (4-5 paragraphs)
- [ ] Create launch graphics
- [ ] Prepare 5-7 screenshots
- [ ] Gallery images
- [ ] Record demo GIF
- **Acceptance**: Ready to submit

🔴 **T5.4.4**: Prepare social media content
- [ ] Twitter launch thread (10+ tweets)
- [ ] LinkedIn post
- [ ] Reddit posts (3 subreddits)
- [ ] Creator graphics
- [ ] Schedule posts
- **Acceptance**: Content calendar ready

🔴 **T5.4.5**: Create help documentation
- [ ] Getting started guide
- [ ] Feature tutorials
- [ ] FAQs
- [ ] Troubleshooting
- [ ] Video tutorials (optional)
- [ ] Host on docs site or Notion
- **Acceptance**: Users can self-serve

🔴 **T5.4.6**: Setup analytics and monitoring
- [ ] Vercel Analytics installed
- [ ] PostHog or Mixpanel for product analytics
- [ ] Track key events:
  - Signup
  - Add channel
  - Generate script
  - Upgrade
- [ ] Setup error monitoring (Sentry optional)
- [ ] Create dashboard
- **Acceptance**: Can track metrics

🔴 **T5.4.7**: Prepare email templates
- [ ] Welcome email
- [ ] Email verification
- [ ] Password reset
- [ ] Weekly digest (optional)
- [ ] Payment receipts (Stripe handles)
- [ ] Use nice templates
- **Acceptance**: Emails look professional

---

#### Epic 5.5: Launch Day (Days 50-52)

**User Story 5.5.1**: As a founder, I want a successful launch
**Priority**: P0
**Estimated Time**: 16 hours (launch day is intense!)

**Tasks**:

🔴 **T5.5.1**: Pre-launch checklist
- [ ] All tests passing
- [ ] Production environment ready
- [ ] Environment variables set
- [ ] Database backed up
- [ ] Monitoring active
- [ ] Support email setup
- [ ] Payment system tested
- [ ] Landing page live
- [ ] Demo video uploaded
- [ ] Social posts scheduled
- **Acceptance**: Ready to launch

🔴 **T5.5.2**: Launch on Product Hunt
- [ ] Submit at 12:01am PT
- [ ] Post launch thread on Twitter
- [ ] Engage with comments all day
- [ ] Thank supporters
- [ ] Answer questions
- [ ] Share milestones (50 upvotes! 100 upvotes!)
- [ ] Aim for #1 Product of the Day
- **Acceptance**: Successful PH launch

🔴 **T5.5.3**: Post on Reddit
- [ ] r/SideProject (if appropriate)
- [ ] r/EntrepreneurRideAlong
- [ ] r/Startup_Ideas
- [ ] Follow subreddit rules
- [ ] Engage authentically
- [ ] Don't spam
- **Acceptance**: Positive reception

🔴 **T5.5.4**: Send to email list
- [ ] Send launch announcement
- [ ] Offer launch discount
- [ ] Link to Product Hunt
- [ ] Ask for support
- [ ] Track opens and clicks
- **Acceptance**: List engaged

🔴 **T5.5.5**: Monitor and respond
- [ ] Watch analytics real-time
- [ ] Respond to support questions quickly
- [ ] Fix bugs immediately
- [ ] Collect feedback
- [ ] Thank early users
- [ ] Share wins on Twitter
- **Acceptance**: Community engagement

🔴 **T5.5.6**: Day 1 wrap-up
- [ ] Count signups
- [ ] Count paying customers
- [ ] Review feedback
- [ ] List action items
- [ ] Thank team/supporters
- [ ] Share metrics publicly
- [ ] Plan week 1 improvements
- **Acceptance**: Documented launch results

---

### Milestone 5 Acceptance Criteria

**Before marking M5 complete, verify**:

- [ ] All features are polished
- [ ] Loading states everywhere
- [ ] Empty states guide users
- [ ] Error handling is robust
- [ ] Mobile experience is great
- [ ] Performance is excellent (Lighthouse >90)
- [ ] No critical bugs
- [ ] User testing complete
- [ ] Security audited
- [ ] Accessibility compliant
- [ ] Landing page live
- [ ] Demo video ready
- [ ] Launch content prepared
- [ ] Analytics tracking
- [ ] Support system ready
- [ ] Successfully launched
- [ ] First users signed up
- [ ] First payment received

**Success Metrics**:
- Launch Day:
  - 200+ signups
  - Product Hunt #1 Product of Day
  - 10+ paying customers
- Week 1:
  - 500+ signups
  - 30+ paying customers
  - $1,200+ MRR
  - NPS >40
  - No critical bugs

---

## Post-Launch Tasks

### Week 11+: Iteration & Growth

**Priority**: Ongoing

#### 🟡 Collect and Act on Feedback
- [ ] Daily: Review user feedback
- [ ] Weekly: User interviews (2-3)
- [ ] Monthly: NPS survey
- [ ] Track common requests
- [ ] Prioritize improvements

#### 🟡 Content Marketing
- [ ] Publish 2 blog posts per week
- [ ] Twitter threads (3/week)
- [ ] YouTube tutorials (1/week)
- [ ] Guest posts on creator blogs
- [ ] SEO optimization

#### 🟡 Add Phase 2 Features
- [ ] TikTok integration
- [ ] Instagram integration
- [ ] Custom writing styles (full version)
- [ ] Advanced analytics dashboard
- [ ] Team collaboration features
- [ ] Template marketplace
- [ ] Performance tracking

#### 🟡 Scale Operations
- [ ] Hire part-time designer
- [ ] Hire content writer
- [ ] Consider co-founder
- [ ] Build community
- [ ] Creator partnerships

---

## Task Templates

### Feature Task Template

```markdown
## Feature: [Feature Name]

**Epic**: [Epic Name]
**User Story**: As a [user type], I want [goal] so that [benefit]
**Priority**: [P0/P1/P2/P3]
**Status**: [Not Started/In Progress/Completed/Blocked]
**Estimated Time**: [hours]
**Actual Time**: [hours]

### Tasks
- [ ] Task 1
- [ ] Task 2
- [ ] Task 3

### Acceptance Criteria
- [ ] Criterion 1
- [ ] Criterion 2

### Dependencies
- Depends on: [Task IDs]
- Blocks: [Task IDs]

### Notes
[Any additional context]

### Testing Checklist
- [ ] Unit tests pass
- [ ] Manual testing complete
- [ ] Works on mobile
- [ ] Accessible
- [ ] No console errors
```

### Bug Task Template

```markdown
## Bug: [Short Description]

**Severity**: [Critical/High/Medium/Low]
**Status**: [Open/In Progress/Fixed/Closed]
**Reported By**: [Name]
**Reported Date**: [Date]

### Description
[Detailed description of the bug]

### Steps to Reproduce
1. Step 1
2. Step 2
3. Step 3

### Expected Behavior
[What should happen]

### Actual Behavior
[What actually happens]

### Environment
- Browser: [e.g., Chrome 120]
- OS: [e.g., macOS 14]
- User ID: [if applicable]

### Screenshots/Videos
[Attach if available]

### Fix
- [ ] Identified root cause
- [ ] Implemented fix
- [ ] Tested fix
- [ ] Deployed to production

### Notes
[Any additional context]
```

---

## Progress Tracking

### Weekly Review Template

```markdown
# Week [X] Review - [Date Range]

## Completed
- ✅ Task 1
- ✅ Task 2
- ✅ Task 3

## In Progress
- 🟡 Task 4 (60% complete)
- 🟡 Task 5 (30% complete)

## Blocked
- 🔵 Task 6 (waiting on API approval)

## Metrics
- Signups this week: [X]
- Active users: [X]
- Scripts generated: [X]
- MRR: $[X]

## Learnings
- [Key learning 1]
- [Key learning 2]

## Next Week Focus
- [ ] Priority 1
- [ ] Priority 2
- [ ] Priority 3

## Blockers/Help Needed
- [Blocker 1]
- [Blocker 2]
```

---

## Final Checklist

### Before Calling Project "Done"

- [ ] All Milestone 1 tasks complete
- [ ] All Milestone 2 tasks complete
- [ ] All Milestone 3 tasks complete
- [ ] All Milestone 4 tasks complete
- [ ] All Milestone 5 tasks complete
- [ ] Launched publicly
- [ ] First 100 users signed up
- [ ] First 10 paying customers
- [ ] $1,000+ MRR
- [ ] NPS >40
- [ ] <1% critical bugs
- [ ] Documentation complete
- [ ] Support system in place
- [ ] Growth plan for next 3 months

---

**Document Status**: Living Document - Update weekly
**Last Updated**: November 23, 2025 (Updated 4x today!)
**Current Milestone**: Milestone 1 - Foundation (Week 1-2, Epic 1.3 & T1.5.1 Complete!)
**Overall Progress**: ~65% (Auth ✅, Build ✅, Ready for Deployment!)

---

*Let's build ReatorAI! 🚀*

**Next Actions**:
1. Review this task list
2. Set up project board (GitHub Projects)
3. Import tasks to tracking system
4. Start with Pre-Development Setup
5. Begin Milestone 1 Week 1

Good luck! You've got this! 💪
