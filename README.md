# ReatorAI

> AI-powered viral content research and script generation platform for short-form creators

ReatorAI helps content creators discover viral videos, analyze what makes them successful, and generate custom scripts optimized for YouTube Shorts, TikTok, and Instagram Reels.

## What Problem Does It Solve?

**The Problem**: Content creators spend 5-10 hours per week manually searching for trending topics, analyzing successful content, and writing scripts.

**The Solution**: ReatorAI reduces this time from 60 minutes to 10 minutes by:
- Automatically tracking YouTube channels
- Identifying "outlier" videos (performing 2x+ better than average)
- Extracting and analyzing transcripts with AI
- Generating custom scripts using proven viral frameworks

## Key Features

- **Channel Tracking** - Monitor your favorite YouTube channels
- **Watchlists** - Organize channels into custom watchlists
- **Outlier Detection** - Automatically identify videos performing 2x+ above average
- **Transcript Extraction** - Extract and analyze video transcripts
- **AI Script Generation** - Generate scripts using viral frameworks
- **Analytics** - Track usage and performance with PostHog

## Tech Stack

### Frontend
- **Next.js 16** (App Router)
- **TypeScript** (strict mode)
- **Tailwind CSS** + shadcn/ui
- **React Query** + Zustand
- **React Hook Form** + Zod

### Backend
- **Next.js API Routes** (Serverless)
- **Supabase** (PostgreSQL + Auth)
- **Vercel** (Hosting + Cron Jobs)

### External APIs
- **YouTube Data API v3**
- **YouTube Transcript API**
- **OpenAI GPT-4/GPT-4o**
- **PostHog** (Analytics)

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm
- Supabase account
- YouTube Data API key
- OpenAI API key
- PostHog account (optional, for analytics)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url> reatorai
   cd reatorai
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```

   Then fill in your environment variables:
   ```env
   # Supabase Configuration
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

   # YouTube API
   YOUTUBE_API_KEY=your_youtube_api_key

   # OpenAI API
   OPENAI_API_KEY=your_openai_api_key

   # App Configuration
   NEXT_PUBLIC_APP_URL=http://localhost:3000

   # Analytics (PostHog)
   NEXT_PUBLIC_POSTHOG_KEY=your_posthog_project_key
   NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com
   ```

4. **Set up Supabase**
   - Create a new Supabase project
   - Run the database migrations (see [Database Schema](./docs/database.md))
   - Enable Row Level Security (RLS) policies

5. **Run the development server**
   ```bash
   pnpm dev
   ```

6. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

## Development

### Available Commands

```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint
pnpm type-check   # Check TypeScript types
```

### Project Structure

```
reatorai/
├── app/                    # Next.js app directory
│   ├── (auth)/            # Protected routes
│   └── api/               # API endpoints
├── components/            # React components
│   └── ui/               # shadcn/ui components
├── lib/                  # Utilities & integrations
│   ├── supabase/        # Supabase clients
│   ├── youtube/         # YouTube API
│   ├── openai/          # OpenAI integration
│   └── analytics/       # PostHog analytics
├── docs/                 # Documentation
├── types/               # TypeScript types
└── hooks/               # React hooks
```

## Documentation

For detailed documentation, see:

- **[CLAUDE.md](./CLAUDE.md)** - Main documentation for AI assistants
- **[Architecture](./docs/architecture.md)** - System architecture and design
- **[Database Schema](./docs/database.md)** - Database structure and RLS policies
- **[API Reference](./docs/api.md)** - API endpoints and usage
- **[Development Guide](./docs/development.md)** - Development patterns and best practices
- **[PRD.md](./PRD.md)** - Product requirements and roadmap

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | Yes |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key | Yes |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key | Yes |
| `YOUTUBE_API_KEY` | YouTube Data API v3 key | Yes |
| `OPENAI_API_KEY` | OpenAI API key | Yes |
| `NEXT_PUBLIC_APP_URL` | Application URL | Yes |
| `NEXT_PUBLIC_POSTHOG_KEY` | PostHog project key | No |
| `NEXT_PUBLIC_POSTHOG_HOST` | PostHog host URL | No |

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import your repository in Vercel
3. Configure environment variables
4. Deploy

```bash
vercel
```

For detailed deployment instructions, see [Development Guide](./docs/development.md#deployment).

## Analytics

ReatorAI uses PostHog for product analytics, including:
- User behavior tracking
- Feature usage metrics
- Performance monitoring
- Error tracking

To enable analytics, add your PostHog credentials to `.env.local`. For more details, see [docs/analytics-setup.md](./docs/analytics-setup.md).

## Contributing

1. Create a feature branch (`git checkout -b feature/amazing-feature`)
2. Commit your changes (`git commit -m 'feat: add amazing feature'`)
3. Push to the branch (`git push origin feature/amazing-feature`)
4. Open a Pull Request

## License

This project is private and proprietary.

## Support

For questions or issues:
- Check the [Troubleshooting Guide](./docs/development.md#troubleshooting)
- Review the [FAQ](./docs/faq.md)
- Contact the maintainer: Raj (LAZY SANDY)

---

**Built with** Next.js 16 • TypeScript • Supabase • OpenAI • PostHog

**Status**: Active Development
