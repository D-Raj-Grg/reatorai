import Link from "next/link";
import { ArrowRight, Sparkles, Zap, Target, TrendingUp, Clock, Video, FileText, BarChart3, Users, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ShimmerButton from "@/components/ui/shimmer-button";
import Particles from "@/components/ui/particles";
import { ThemeToggle } from "@/components/theme-toggle";

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      {/* Theme Toggle */}
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>

      {/* Navigation */}
      <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">ReatorAI</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#features" className="text-sm font-medium transition-colors hover:text-primary">
              Features
            </Link>
            <Link href="#how-it-works" className="text-sm font-medium transition-colors hover:text-primary">
              How It Works
            </Link>
            <Link href="#pricing" className="text-sm font-medium transition-colors hover:text-primary">
              Pricing
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost" size="sm">
                Log In
              </Button>
            </Link>
            <Link href="/signup">
              <Button size="sm">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border/40">
        <Particles
          className="absolute inset-0"
          quantity={100}
          ease={80}
          color="#60a5fa"
          refresh={false}
        />
        <div className="container relative z-10 flex flex-col items-center justify-center px-4 py-24 md:py-32 lg:py-40">
          <Badge className="mb-4 animate-fade-in-up" variant="secondary">
            <Zap className="mr-1 h-3 w-3" />
            AI-Powered Content Research
          </Badge>
          <h1 className="max-w-4xl text-center text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl animate-fade-in-up">
            Turn{" "}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient">
              Viral Videos
            </span>{" "}
            Into Winning Scripts
          </h1>
          <p className="mt-6 max-w-2xl text-center text-lg text-muted-foreground animate-fade-in-up md:text-xl">
            Reduce content research from 60 minutes to 10 minutes. Discover viral patterns, analyze what works, and generate custom scripts for YouTube Shorts, TikTok, and Instagram Reels.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row animate-fade-in-up">
            <Link href="/signup">
              <ShimmerButton
                className="text-base font-semibold px-8 py-6"
                shimmerColor="#60a5fa"
                background="linear-gradient(to right, #3b82f6, #8b5cf6)"
              >
                <span className="flex items-center gap-2">
                  Start Free Trial
                  <ArrowRight className="h-5 w-5" />
                </span>
              </ShimmerButton>
            </Link>
            <Link href="#how-it-works">
              <Button size="lg" variant="outline" className="text-base px-8 py-6">
                See How It Works
              </Button>
            </Link>
          </div>
          <div className="mt-12 flex items-center gap-6 text-sm text-muted-foreground animate-fade-in-up">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              No credit card required
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              10 free scripts/month
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Bento Grid */}
      <section id="features" className="container px-4 py-24 md:py-32">
        <div className="text-center mb-16">
          <Badge className="mb-4" variant="outline">
            Features
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Everything You Need to Go Viral
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Powerful features designed specifically for educational content creators
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {/* Feature 1 - Large */}
          <Card className="md:col-span-2 group hover:shadow-xl transition-shadow overflow-hidden border-border/50">
            <CardContent className="p-8">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mb-4 group-hover:scale-110 transition-transform">
                    <Video className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-2">Outlier Detection</h3>
                  <p className="text-muted-foreground mb-6">
                    Automatically find videos performing 2x+ better than average. Our AI analyzes view patterns to surface hidden gems before they trend.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">Smart Algorithm</Badge>
                    <Badge variant="secondary">Real-time Tracking</Badge>
                    <Badge variant="secondary">Multi-channel</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Feature 2 */}
          <Card className="group hover:shadow-xl transition-shadow border-border/50">
            <CardContent className="p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-500/10 mb-4 group-hover:scale-110 transition-transform">
                <Target className="h-6 w-6 text-purple-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Watchlists</h3>
              <p className="text-muted-foreground">
                Organize channels by niche. Track unlimited channels and create custom watchlists for different content categories.
              </p>
            </CardContent>
          </Card>

          {/* Feature 3 */}
          <Card className="group hover:shadow-xl transition-shadow border-border/50">
            <CardContent className="p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-pink-500/10 mb-4 group-hover:scale-110 transition-transform">
                <BarChart3 className="h-6 w-6 text-pink-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">AI Analysis</h3>
              <p className="text-muted-foreground">
                Understand why videos went viral. Get detailed breakdowns of hooks, storytelling, and emotional triggers.
              </p>
            </CardContent>
          </Card>

          {/* Feature 4 - Large */}
          <Card className="md:col-span-2 group hover:shadow-xl transition-shadow overflow-hidden border-border/50">
            <CardContent className="p-8">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-500/10 mb-4 group-hover:scale-110 transition-transform">
                    <FileText className="h-6 w-6 text-green-500" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-2">Script Generation</h3>
                  <p className="text-muted-foreground mb-6">
                    Generate 60-90 second scripts using 9 hook formats and 7 storytelling frameworks. Sounds like you, not AI.
                  </p>
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Custom writing style</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Viral frameworks</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Platform optimized</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Instant generation</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Feature 5 */}
          <Card className="group hover:shadow-xl transition-shadow border-border/50">
            <CardContent className="p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-500/10 mb-4 group-hover:scale-110 transition-transform">
                <Clock className="h-6 w-6 text-orange-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Save 50 Hours/Month</h3>
              <p className="text-muted-foreground">
                Automate your research workflow. From 5-10 hours per week to just 10 minutes per video.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="relative border-y border-border/40 bg-muted/30">
        <div className="container px-4 py-24 md:py-32">
          <div className="text-center mb-16">
            <Badge className="mb-4" variant="outline">
              Simple Process
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              4 Steps to Viral Content
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Our proven workflow gets you from research to script in minutes
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                step: "01",
                title: "Build Watchlists",
                description: "Track your favorite channels across YouTube. Create unlimited watchlists organized by niche.",
                icon: Users,
                color: "blue",
              },
              {
                step: "02",
                title: "Find Outliers",
                description: "Our AI automatically detects videos performing 2x+ better with advanced filtering and search.",
                icon: TrendingUp,
                color: "purple",
              },
              {
                step: "03",
                title: "Understand Why",
                description: "Get AI-powered analysis of viral patterns, hooks, storytelling techniques, and emotional triggers.",
                icon: BarChart3,
                color: "pink",
              },
              {
                step: "04",
                title: "Write Scripts",
                description: "Generate winning 60-90 second scripts with 9 hook formats and 7 storytelling frameworks.",
                icon: FileText,
                color: "green",
              },
            ].map((item, index) => (
              <Card
                key={index}
                className="relative overflow-hidden border-border/50 hover:shadow-xl transition-all group"
              >
                <CardContent className="p-6">
                  <div className="absolute top-0 right-0 text-8xl font-bold text-muted/10 -mr-4 -mt-4">
                    {item.step}
                  </div>
                  <div className={`flex h-12 w-12 items-center justify-center rounded-lg bg-${item.color}-500/10 mb-4 group-hover:scale-110 transition-transform relative z-10`}>
                    <item.icon className={`h-6 w-6 text-${item.color}-500`} />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 relative z-10">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground relative z-10">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container px-4 py-24 md:py-32">
        <div className="grid gap-8 md:grid-cols-3">
          {[
            { value: "10min", label: "Research Time", sublabel: "Down from 60 minutes" },
            { value: "2x+", label: "Performance Boost", sublabel: "Outlier detection threshold" },
            { value: "50hrs", label: "Saved Per Month", sublabel: "For active creators" },
          ].map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform">
                {stat.value}
              </div>
              <div className="text-xl font-semibold mb-1">{stat.label}</div>
              <div className="text-sm text-muted-foreground">{stat.sublabel}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section id="pricing" className="relative overflow-hidden border-y border-border/40 bg-muted/30">
        <div className="container relative z-10 px-4 py-24 md:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <Badge className="mb-4" variant="outline">
              Get Started Today
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-6">
              Ready to Create Viral Content?
            </h2>
            <p className="text-lg text-muted-foreground mb-10">
              Join content creators who are saving hours every week and growing their channels faster.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/signup">
                <ShimmerButton
                  className="text-base font-semibold px-8 py-6"
                  shimmerColor="#60a5fa"
                  background="linear-gradient(to right, #3b82f6, #8b5cf6)"
                >
                  <span className="flex items-center gap-2">
                    Start Free Trial
                    <ArrowRight className="h-5 w-5" />
                  </span>
                </ShimmerButton>
              </Link>
            </div>
            <p className="mt-6 text-sm text-muted-foreground">
              Free tier includes 10 scripts and 20 analyses per month. No credit card required.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40">
        <div className="container px-4 py-12">
          <div className="grid gap-8 md:grid-cols-4">
            <div className="md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="h-5 w-5 text-primary" />
                <span className="text-lg font-bold">ReatorAI</span>
              </div>
              <p className="text-sm text-muted-foreground">
                AI-powered viral content research and script generation for creators.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Product</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#features" className="hover:text-foreground transition-colors">Features</Link></li>
                <li><Link href="#how-it-works" className="hover:text-foreground transition-colors">How It Works</Link></li>
                <li><Link href="#pricing" className="hover:text-foreground transition-colors">Pricing</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Company</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/about" className="hover:text-foreground transition-colors">About</Link></li>
                <li><Link href="/blog" className="hover:text-foreground transition-colors">Blog</Link></li>
                <li><Link href="/contact" className="hover:text-foreground transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Legal</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/privacy" className="hover:text-foreground transition-colors">Privacy</Link></li>
                <li><Link href="/terms" className="hover:text-foreground transition-colors">Terms</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-border/40 text-center text-sm text-muted-foreground">
            <p>&copy; 2025 ReatorAI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
