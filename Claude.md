# ReatorAI - AI Assistant Guide

This is the main documentation for AI assistants working on the ReatorAI project.

---

## What is ReatorAI?

ReatorAI is an **AI-powered viral content research and script generation platform** designed for short-form content creators. It helps creators discover viral videos, analyze what makes them successful, and generate custom scripts optimized for platforms like YouTube Shorts, TikTok, and Instagram Reels.

### Core Value Proposition

**Problem**: Content creators spend 5-10 hours per week manually searching for trending topics, analyzing successful content, and writing scripts.

**Solution**: ReatorAI reduces this time from 60 minutes to 10 minutes by:
1. Automatically tracking YouTube channels
2. Identifying "outlier" videos (performing 2x+ better than average)
3. Extracting and analyzing transcripts with AI
4. Generating custom scripts using proven viral frameworks

### How It Works

1. **Build Your Watchlists** - Track favorite channels across YouTube
2. **Find Outlier Videos** - Automatic outlier detection (2x+ performance)
3. **Understand Why They Went Viral** - AI-powered analysis of viral patterns
4. **Write Winning Scripts** - Generate scripts using viral frameworks

---

## Documentation Structure

All detailed documentation has been organized into topic-specific files:

### 📁 [Architecture](./docs/architecture.md)
- Technology stack overview
- Application architecture diagram
- Project folder structure
- Key features & implementation
- Data flow examples

### 🗄️ [Database Schema](./docs/database.md)
- Complete PostgreSQL schema
- Table relationships
- Indexes and triggers
- Row Level Security (RLS) policies
- Useful SQL commands

### 🔌 [API Reference](./docs/api.md)
- All API endpoints
- Request/response formats
- Authentication patterns
- Error handling
- Pagination

### 🛠️ [Development Guide](./docs/development.md)
- Environment setup
- Code patterns & best practices
- Common development tasks
- Troubleshooting guide
- Git workflow & commands

---

## Quick Start

### For AI Assistants

When helping with this project:

1. **Always reference the documentation** - Use the links above to find specific information
2. **Follow established patterns** - Check existing code before creating new implementations
3. **Use TypeScript strictly** - Never use `any` type
4. **Prioritize security** - Always validate auth and permissions
5. **Consider performance** - Cache, batch, and optimize queries
6. **Match existing patterns** - Look at similar features for consistency

### Common Questions Quick Reference

**"What's the project structure?"** → [Architecture](./docs/architecture.md)

**"How do I set up the development environment?"** → [Development Guide](./docs/development.md#environment-setup)

**"What are the API endpoints?"** → [API Reference](./docs/api.md)

**"How do I add a new database table?"** → [Development Guide](./docs/development.md#add-a-new-database-table)

**"What's the database schema?"** → [Database Schema](./docs/database.md)

**"How do I fix X error?"** → [Troubleshooting](./docs/development.md#troubleshooting)

---

## Technology Stack

### Frontend
- Next.js 16 (App Router)
- TypeScript (strict mode)
- Tailwind CSS + shadcn/ui
- React Query + Zustand
- React Hook Form + Zod

### Backend
- Next.js API Routes (Serverless)
- Supabase (PostgreSQL + Auth)
- Vercel (Hosting + Cron Jobs)

### External APIs
- YouTube Data API v3
- YouTube Transcript API
- OpenAI GPT-4/GPT-4o

📖 **Full tech stack details**: [Architecture](./docs/architecture.md#technology-stack)

---

## Key Files & Locations

```
reatorai/
├── app/                    # Next.js app directory
│   ├── (auth)/            # Auth routes
│   ├── (dashboard)/       # Protected routes
│   └── api/               # API endpoints
├── components/            # React components
│   └── ui/               # shadcn/ui components
├── lib/                  # Utilities & integrations
│   ├── supabase/        # Supabase clients
│   ├── youtube/         # YouTube API
│   └── openai/          # OpenAI integration
├── docs/                 # Documentation
│   ├── architecture.md
│   ├── database.md
│   ├── api.md
│   └── development.md
├── types/               # TypeScript types
├── hooks/               # React hooks
└── .env.local          # Environment variables
```

---

## Development Workflow

### 1. Environment Setup

```bash
git clone <repo-url> reatorai
cd reatorai
npm install
cp .env.example .env.local
# Fill in environment variables
npm run dev
```

📖 **Detailed setup**: [Development Guide](./docs/development.md#environment-setup)

### 2. Making Changes

```bash
# Create feature branch
git checkout -b feature/my-feature

# Make changes following existing patterns
# Commit with conventional commits
git commit -m "feat: add new feature"

# Push and create PR
git push origin feature/my-feature
```

📖 **Git workflow**: [Development Guide](./docs/development.md#git-workflow)

### 3. Code Patterns

All code should follow established patterns:
- **API Routes**: [Development Guide](./docs/development.md#2-api-route-pattern)
- **React Hooks**: [Development Guide](./docs/development.md#3-react-query-hook-pattern)
- **Components**: [Development Guide](./docs/development.md#4-component-pattern-shadcnui)

---

## Project Status & Roadmap

### Current Status
- ✅ Project setup complete
- ✅ Basic authentication
- ✅ Channel tracking
- ✅ Watchlists
- 🔄 Video sync (in progress)
- 🔄 Outlier detection (in progress)
- ⏳ Script generation (planned)
- ⏳ Video analysis (planned)

### MVP Features (Weeks 1-6)
- Authentication
- Channel tracking
- Watchlists
- Video sync
- Outlier detection
- Transcript extraction
- Script generation

### Future Phases
- Advanced filtering
- Video analysis
- Custom writing styles
- TikTok integration
- Instagram integration
- Team collaboration

---

## Important Notes

### Security
- **Always** use Row Level Security (RLS) on Supabase tables
- **Always** validate user authentication in API routes
- **Never** expose sensitive API keys to the client

### Performance
- Cache YouTube API responses (quota limits)
- Batch OpenAI requests when possible
- Use database indexes for common queries
- Optimize images and assets

### Best Practices
1. Use TypeScript strictly - no `any` types
2. Follow Next.js 16 App Router patterns
3. Implement proper error handling
4. Use React Query for data fetching
5. Keep components small and focused
6. Write meaningful commit messages
7. Test edge cases (empty states, errors, loading)

📖 **Full best practices**: [Development Guide](./docs/development.md#best-practices)

---

## Useful Commands

```bash
# Development
npm run dev              # Start dev server
npm run build           # Build for production
npm run lint            # Run linter
npm run type-check      # Check TypeScript

# Database
npx supabase gen types typescript --project-id PROJECT_ID > types/database.ts

# UI Components
npx shadcn-ui@latest add [component]

# Deployment
vercel                  # Deploy to Vercel
```

📖 **All commands**: [Development Guide](./docs/development.md#useful-commands)

---

## Getting Help

### Documentation Links
- 📁 [Architecture & Structure](./docs/architecture.md)
- 🗄️ [Database Schema](./docs/database.md)
- 🔌 [API Reference](./docs/api.md)
- 🛠️ [Development Guide](./docs/development.md)
- 📄 [Product Requirements (PRD.md)](./PRD.md)

### External Resources
- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [shadcn/ui Components](https://ui.shadcn.com)
- [TailwindCSS](https://tailwindcss.com/docs)

### Important URLs
- Local: http://localhost:3000
- Supabase Dashboard: https://app.supabase.com
- Vercel Dashboard: https://vercel.com/dashboard
- Google Cloud Console: https://console.cloud.google.com
- OpenAI Platform: https://platform.openai.com

---

## For AI Assistants: Quick Decision Tree

**User wants to:**

- **Understand the project** → Start with this file, then [Architecture](./docs/architecture.md)
- **Add a feature** → Check [Architecture](./docs/architecture.md) for patterns, [Development Guide](./docs/development.md) for tasks
- **Fix a bug** → Check [Troubleshooting](./docs/development.md#troubleshooting)
- **Modify database** → See [Database Schema](./docs/database.md)
- **Add API endpoint** → See [API Reference](./docs/api.md) and [Development Guide](./docs/development.md#add-a-new-api-endpoint)
- **Set up project** → Follow [Development Guide](./docs/development.md#environment-setup)
- **Deploy** → Check [Development Guide](./docs/development.md#deployment)

---

**Document Version**: 2.0
**Last Updated**: November 23, 2025
**Maintainer**: Raj (LAZY SANDY)
**Status**: Active Development

---

*This is a living document. Update it as the project evolves.*
