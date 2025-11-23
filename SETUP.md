# ReatorAI Setup Guide

This guide will help you set up the ReatorAI development environment.

## Prerequisites

- Node.js 20+ installed
- npm or pnpm
- Git
- A Supabase account (free tier works)
- API keys (see below)

## Quick Start

### 1. Clone and Install Dependencies

```bash
git clone <repository-url>
cd reatorai
npm install
```

### 2. Environment Variables

Copy the example environment file:

```bash
cp .env.example .env.local
```

Fill in the following required variables in `.env.local`:

#### Supabase Configuration

1. Go to [Supabase](https://supabase.com)
2. Create a new project
3. Go to Project Settings → API
4. Copy the values:
   - `NEXT_PUBLIC_SUPABASE_URL`: Project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Anon/Public key
   - `SUPABASE_SERVICE_ROLE_KEY`: Service role key (keep secret!)

#### YouTube API

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select existing
3. Enable "YouTube Data API v3"
4. Create credentials → API Key
5. Copy to `YOUTUBE_API_KEY`
6. Set quota limits to avoid overage

#### OpenAI API

1. Go to [OpenAI Platform](https://platform.openai.com)
2. Create an account
3. Go to API Keys
4. Create new secret key
5. Copy to `OPENAI_API_KEY`
6. Add payment method and set usage limits

#### Cron Secret

Generate a random string for cron job authentication:

```bash
openssl rand -base64 32
```

Copy to `CRON_SECRET`

### 3. Database Setup

Once you have Supabase configured:

1. Open Supabase SQL Editor
2. Copy the database schema from `Claude.md` (Database Schema section)
3. Run the SQL commands in order:
   - Extensions
   - Tables (user_subscriptions, watchlists, channels, etc.)
   - Triggers
   - RLS Policies

Verify all tables are created:
```sql
SELECT tablename FROM pg_tables WHERE schemaname = 'public';
```

### 4. Generate Database Types

After creating the database schema:

```bash
npx supabase gen types typescript --project-id YOUR_PROJECT_ID > src/types/database.ts
```

Replace `YOUR_PROJECT_ID` with your Supabase project ID (found in Project Settings).

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
reatorai/
├── src/
│   ├── app/                    # Next.js 16 App Router
│   │   ├── (guest)/           # Public routes (login, signup)
│   │   ├── (auth)/            # Protected routes (dashboard)
│   │   ├── api/               # API routes (coming soon)
│   │   └── layout.tsx         # Root layout
│   ├── components/            # React components
│   │   ├── ui/                # shadcn/ui components
│   │   ├── auth/              # Auth forms
│   │   └── dashboard/         # Dashboard components
│   ├── lib/                   # Utilities and integrations
│   │   ├── supabase/          # Supabase clients
│   │   ├── youtube/           # YouTube API (to be implemented)
│   │   └── openai/            # OpenAI API (to be implemented)
│   ├── types/                 # TypeScript types
│   └── hooks/                 # React hooks
├── public/                    # Static assets
├── docs/                      # Documentation
│   ├── Claude.md             # Technical knowledge base
│   ├── PLANNING.md           # Product strategy
│   └── TASKS.md              # Development tasks
└── .env.local                # Environment variables (not in git)
```

## Current Status

**Progress: ~25% Complete**

### ✅ Completed
- Project initialization with Next.js 16
- TypeScript strict mode
- Tailwind CSS v4
- shadcn/ui components
- Dark mode support
- Basic UI pages (login, signup, dashboard)
- Core dependencies installed
- Supabase client helpers
- Environment variable setup
- Types and placeholder integrations

### 🔨 In Progress
- Authentication backend (API routes)
- Database schema implementation

### 📋 Next Steps
1. Implement authentication API routes
2. Deploy to Vercel staging
3. Channel management (Milestone 2)
4. Video sync and outlier detection (Milestone 3)
5. Script generation (Milestone 4)

## Development Workflow

### Running the App

```bash
npm run dev          # Development server
npm run build        # Production build
npm run start        # Start production server
npm run lint         # Run ESLint
```

### Making Changes

1. Create a new branch: `git checkout -b feature/your-feature`
2. Make changes
3. Test locally
4. Commit: `git commit -m "feat: your feature"`
5. Push: `git push origin feature/your-feature`
6. Create pull request

### Commit Convention

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation
- `style:` Formatting
- `refactor:` Code restructuring
- `test:` Tests
- `chore:` Maintenance

## Troubleshooting

### Build Errors

If you get TypeScript errors:
```bash
npm run type-check
```

### Database Connection Issues

1. Verify environment variables are set
2. Check Supabase project is running
3. Verify API keys are correct
4. Check RLS policies allow access

### API Quota Issues

YouTube API has a quota of 10,000 units/day:
- Implement caching (6-hour cache recommended)
- Batch requests efficiently
- Request quota increase if needed

OpenAI API:
- Set usage limits in OpenAI dashboard
- Monitor costs
- Use GPT-4o-mini for non-critical features

## Resources

- [Next.js 16 Docs](https://nextjs.org/docs)
- [Supabase Docs](https://supabase.com/docs)
- [shadcn/ui Docs](https://ui.shadcn.com)
- [YouTube Data API](https://developers.google.com/youtube/v3)
- [OpenAI API](https://platform.openai.com/docs)

## Getting Help

- Check `Claude.md` for technical details
- Check `TASKS.md` for current progress
- Check `PLANNING.md` for product strategy

## License

Private - All rights reserved
