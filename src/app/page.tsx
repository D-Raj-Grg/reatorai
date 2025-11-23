"use client"

import Link from "next/link";
import { useRef } from "react";
import { useTheme } from "next-themes";
import { ArrowRight, Sparkles, Zap, Target, TrendingUp, Clock, Video, FileText, BarChart3, Users, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ShimmerButton from "@/components/ui/shimmer-button";
import Particles from "@/components/ui/particles";
import { BorderBeam } from "@/components/ui/border-beam";
import { NumberTicker } from "@/components/ui/number-ticker";
import { WordRotate } from "@/components/ui/word-rotate";
import { RetroGrid } from "@/components/ui/retro-grid";
import { DotPattern } from "@/components/ui/dot-pattern";
import { ThemeToggle } from "@/components/theme-toggle";
import { BentoGrid, BentoCard } from "@/components/ui/bento-grid";
import { AnimatedBeam } from "@/components/ui/animated-beam";
import { ShineBorder } from "@/components/ui/shine-border";
import { NavigationDock } from "@/components/navigation-dock";

export default function Home() {
  const { theme } = useTheme();

  // Refs for AnimatedBeam demo
  const containerRef = useRef<HTMLDivElement>(null);
  const div1Ref = useRef<HTMLDivElement>(null);
  const div2Ref = useRef<HTMLDivElement>(null);
  const div3Ref = useRef<HTMLDivElement>(null);
  const div4Ref = useRef<HTMLDivElement>(null);

  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      {/* Theme Toggle */}
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>

      {/* Floating Dock Navigation */}
      <NavigationDock />

      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border/40">
        <RetroGrid className="opacity-50" />
        <Particles
          className="absolute inset-0 z-10 will-change-transform"
          quantity={15}
          ease={120}
          color={theme === 'dark' ? '#60a5fa' : '#3b82f6'}
          refresh={false}
        />
        <div className="container relative z-20 flex flex-col items-center justify-center px-4 py-32 md:py-40 lg:py-48 max-w-6xl mx-auto">
          <Badge className="mb-6 animate-fade-in-up" variant="secondary">
            <Zap className="mr-1 h-3 w-3" />
            AI-Powered Content Research
          </Badge>
          <h1 className="max-w-3xl text-center text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl animate-fade-in-up">
            Turn{" "}
            <WordRotate
              words={["Viral Videos", "Trending Content", "Popular Shorts", "Viral Reels"]}
              className="inline-block bg-gradient-to-r from-primary via-accent to-primary dark:from-primary/90 dark:via-accent/90 dark:to-primary/90 bg-clip-text text-transparent"
              duration={3000}
            />{" "}
            Into Winning Scripts
          </h1>
          <p className="mt-6 max-w-2xl text-center text-lg text-muted-foreground animate-fade-in-up md:text-xl">
            Reduce content research from 60 minutes to 10 minutes. Discover viral patterns, analyze what works, and generate custom scripts for YouTube Shorts, TikTok, and Instagram Reels.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row animate-fade-in-up">
            <Link href="/signup">
              <ShimmerButton
                className="text-base font-semibold px-8 py-6"
                shimmerColor={theme === 'dark' ? '#60a5fa' : '#3b82f6'}
                background={theme === 'dark'
                  ? "linear-gradient(to right, #60a5fa, #a78bfa)"
                  : "linear-gradient(to right, #3b82f6, #8b5cf6)"}
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
          <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground animate-fade-in-up">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
              No credit card required
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
              10 free scripts/month
            </div>
          </div>
        </div>
      </section>

      {/* Stats Banner */}
      <section className="relative bg-muted/20 border-b border-border/40">
        <div className="container max-w-6xl mx-auto px-4 py-16 md:py-20">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">The ReatorAI Impact</h2>
            <p className="text-muted-foreground">Real results from real creators</p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="text-center group">
              <div className="flex items-center justify-center mb-3">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-primary/80 dark:from-primary dark:to-primary/70 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform">
                <NumberTicker value={1000} />
                <span>+</span>
              </div>
              <div className="text-lg font-semibold mb-1">Creators</div>
              <div className="text-sm text-muted-foreground">Using ReatorAI daily</div>
            </div>

            <div className="text-center group">
              <div className="flex items-center justify-center mb-3">
                <Clock className="h-8 w-8 text-primary/80 dark:text-primary/90" />
              </div>
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary/80 via-accent to-primary/80 dark:from-primary/90 dark:via-accent/90 dark:to-primary/90 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform">
                <div className="flex items-baseline justify-center gap-2">
                  <NumberTicker value={60} />
                  <span className="text-2xl">→</span>
                  <NumberTicker value={10} />
                  <span className="text-xl">min</span>
                </div>
              </div>
              <div className="text-lg font-semibold mb-1">Research Time</div>
              <div className="text-sm text-muted-foreground">Down from 60 minutes</div>
            </div>

            <div className="text-center group">
              <div className="flex items-center justify-center mb-3">
                <TrendingUp className="h-8 w-8 text-accent dark:text-accent/90" />
              </div>
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-accent to-primary/80 dark:from-accent/90 dark:to-primary/80 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform">
                <NumberTicker value={2} />
                <span>x+</span>
              </div>
              <div className="text-lg font-semibold mb-1">Outlier Detection</div>
              <div className="text-sm text-muted-foreground">Performance threshold</div>
            </div>

            <div className="text-center group">
              <div className="flex items-center justify-center mb-3">
                <Zap className="h-8 w-8 text-accent/80 dark:text-accent/70" />
              </div>
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-accent/80 to-accent dark:from-accent/70 dark:to-accent/90 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform">
                <NumberTicker value={50} />
                <span>hrs</span>
              </div>
              <div className="text-lg font-semibold mb-1">Saved Per Month</div>
              <div className="text-sm text-muted-foreground">For active creators</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Bento Grid */}
      <section id="features" className="container max-w-7xl mx-auto px-4 py-24 md:py-32">
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

        <BentoGrid className="lg:grid-rows-3">
          <BentoCard
            name="Outlier Detection"
            className="col-span-3 lg:col-span-2"
            background={
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/20 to-transparent dark:from-primary/10 dark:via-accent/10 dark:to-transparent" />
            }
            Icon={Video}
            description="Automatically find videos performing 2x+ better than average. Our AI analyzes view patterns to surface hidden gems before they trend."
            href="#how-it-works"
            cta="Learn more"
          />

          <BentoCard
            name="Watchlists"
            className="col-span-3 lg:col-span-1"
            background={
              <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-primary/20 to-transparent dark:from-accent/10 dark:via-primary/10 dark:to-transparent" />
            }
            Icon={Target}
            description="Organize channels by niche. Track unlimited channels and create custom watchlists for different content categories."
            href="#how-it-works"
            cta="Explore"
          />

          <BentoCard
            name="AI Analysis"
            className="col-span-3 lg:col-span-1"
            background={
              <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-accent/30 to-transparent dark:from-accent/10 dark:via-accent/15 dark:to-transparent" />
            }
            Icon={BarChart3}
            description="Understand why videos went viral. Get detailed breakdowns of hooks, storytelling, and emotional triggers."
            href="#how-it-works"
            cta="See analysis"
          />

          <BentoCard
            name="Script Generation"
            className="col-span-3 lg:col-span-2"
            background={
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/15 to-transparent dark:from-primary/10 dark:via-accent/10 dark:to-transparent" />
            }
            Icon={FileText}
            description="Generate 60-90 second scripts using 9 hook formats and 7 storytelling frameworks. Sounds like you, not AI. Custom writing style, viral frameworks, platform optimized."
            href="#pricing"
            cta="Start creating"
          />
        </BentoGrid>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="relative border-y border-border/40 bg-muted/30">
        <div className="container max-w-6xl mx-auto px-4 py-24 md:py-32">
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
            <Card className="relative overflow-hidden border-border/50 hover:shadow-xl transition-all group">
              <CardContent className="p-6">
                <div className="absolute top-0 right-0 text-8xl font-bold text-muted/10 -mr-4 -mt-4">
                  01
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 dark:bg-primary/20 mb-4 group-hover:scale-110 transition-transform relative z-10">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2 relative z-10">
                  Build Watchlists
                </h3>
                <p className="text-muted-foreground relative z-10">
                  Track your favorite channels across YouTube. Create unlimited watchlists organized by niche.
                </p>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden border-border/50 hover:shadow-xl transition-all group">
              <CardContent className="p-6">
                <div className="absolute top-0 right-0 text-8xl font-bold text-muted/10 -mr-4 -mt-4">
                  02
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 dark:bg-primary/20 mb-4 group-hover:scale-110 transition-transform relative z-10">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2 relative z-10">
                  Find Outliers
                </h3>
                <p className="text-muted-foreground relative z-10">
                  Our AI automatically detects videos performing 2x+ better with advanced filtering and search.
                </p>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden border-border/50 hover:shadow-xl transition-all group">
              <CardContent className="p-6">
                <div className="absolute top-0 right-0 text-8xl font-bold text-muted/10 -mr-4 -mt-4">
                  03
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 dark:bg-accent/20 mb-4 group-hover:scale-110 transition-transform relative z-10">
                  <BarChart3 className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-2 relative z-10">
                  Understand Why
                </h3>
                <p className="text-muted-foreground relative z-10">
                  Get AI-powered analysis of viral patterns, hooks, storytelling techniques, and emotional triggers.
                </p>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden border-border/50 hover:shadow-xl transition-all group">
              <CardContent className="p-6">
                <div className="absolute top-0 right-0 text-8xl font-bold text-muted/10 -mr-4 -mt-4">
                  04
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 dark:bg-accent/20 mb-4 group-hover:scale-110 transition-transform relative z-10">
                  <FileText className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-2 relative z-10">
                  Write Scripts
                </h3>
                <p className="text-muted-foreground relative z-10">
                  Generate winning 60-90 second scripts with 9 hook formats and 7 storytelling frameworks.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Interactive Demo Section */}
      <section id="demo" className="relative overflow-hidden border-b border-border/40">
        <DotPattern className="opacity-30" />
        <div className="container max-w-5xl mx-auto relative z-10 px-4 py-24 md:py-32">
          <div className="text-center mb-16">
            <Badge className="mb-4" variant="outline">
              See It In Action
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              How ReatorAI Works
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              From channel tracking to script generation in one seamless flow
            </p>
          </div>

          <div ref={containerRef} className="relative flex h-[300px] w-full items-center justify-between px-4">
            {/* Channel Input */}
            <div ref={div1Ref} className="relative z-10 transform-gpu">
              <div className="flex flex-col items-center gap-2 group">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/20 border-2 border-primary group-hover:scale-110 transition-transform">
                  <Video className="h-8 w-8 text-primary" />
                </div>
                <span className="text-sm font-medium">Channel</span>
              </div>
            </div>

            {/* Outlier Detection */}
            <div ref={div2Ref} className="relative z-10 transform-gpu">
              <div className="flex flex-col items-center gap-2 group">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/20 border-2 border-primary group-hover:scale-110 transition-transform">
                  <TrendingUp className="h-8 w-8 text-primary" />
                </div>
                <span className="text-sm font-medium">Outlier AI</span>
              </div>
            </div>

            {/* Analysis */}
            <div ref={div3Ref} className="relative z-10 transform-gpu">
              <div className="flex flex-col items-center gap-2 group">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/20 border-2 border-accent group-hover:scale-110 transition-transform">
                  <BarChart3 className="h-8 w-8 text-accent" />
                </div>
                <span className="text-sm font-medium">Analysis</span>
              </div>
            </div>

            {/* Script Output */}
            <div ref={div4Ref} className="relative z-10 transform-gpu">
              <div className="flex flex-col items-center gap-2 group">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/20 border-2 border-accent group-hover:scale-110 transition-transform">
                  <FileText className="h-8 w-8 text-accent" />
                </div>
                <span className="text-sm font-medium">Script</span>
              </div>
            </div>

            {/* Animated Beams */}
            <AnimatedBeam
              containerRef={containerRef}
              fromRef={div1Ref}
              toRef={div2Ref}
              gradientStartColor={theme === 'dark' ? '#60a5fa' : '#3b82f6'}
              gradientStopColor={theme === 'dark' ? '#a78bfa' : '#8b5cf6'}
              duration={3}
            />
            <AnimatedBeam
              containerRef={containerRef}
              fromRef={div2Ref}
              toRef={div3Ref}
              gradientStartColor={theme === 'dark' ? '#a78bfa' : '#8b5cf6'}
              gradientStopColor={theme === 'dark' ? '#ec4899' : '#ec4899'}
              duration={3}
            />
            <AnimatedBeam
              containerRef={containerRef}
              fromRef={div3Ref}
              toRef={div4Ref}
              gradientStartColor={theme === 'dark' ? '#ec4899' : '#ec4899'}
              gradientStopColor={theme === 'dark' ? '#10b981' : '#10b981'}
              duration={3}
            />
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="container max-w-6xl mx-auto px-4 py-24 md:py-32">
        <div className="text-center mb-16">
          <Badge className="mb-4" variant="outline">
            Pricing
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Simple, Transparent Pricing
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Start free, upgrade when you're ready
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {/* Free Plan */}
          <Card className="relative overflow-hidden border-border/50 hover:shadow-xl transition-all">
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2">Free</h3>
                <div className="text-4xl font-bold mb-2">$0</div>
                <div className="text-sm text-muted-foreground">per month</div>
              </div>

              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 shrink-0" />
                  <span>10 scripts per month</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 shrink-0" />
                  <span>20 analyses per month</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 shrink-0" />
                  <span>5 channels max</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 shrink-0" />
                  <span>Basic support</span>
                </li>
              </ul>

              <Link href="/signup">
                <Button className="w-full" variant="outline">
                  Get Started
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Pro Plan */}
          <Card className="relative overflow-hidden border-2 border-primary hover:shadow-2xl transition-all scale-105">
            <ShineBorder
              borderWidth={2}
              duration={10}
              shineColor={theme === 'dark'
                ? ["#60a5fa", "#a78bfa", "#ec4899"]
                : ["#3b82f6", "#8b5cf6", "#ec4899"]}
            />
            <CardContent className="p-8">
              <Badge className="mb-4">Most Popular</Badge>
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2">Pro</h3>
                <div className="text-4xl font-bold mb-2">$19</div>
                <div className="text-sm text-muted-foreground">per month</div>
              </div>

              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 shrink-0" />
                  <span className="font-semibold">50 scripts per month</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 shrink-0" />
                  <span className="font-semibold">Unlimited analyses</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 shrink-0" />
                  <span className="font-semibold">25 channels</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 shrink-0" />
                  <span className="font-semibold">Custom writing style</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 shrink-0" />
                  <span>Priority support</span>
                </li>
              </ul>

              <Link href="/signup">
                <Button className="w-full">
                  Get Started
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Premium Plan */}
          <Card className="relative overflow-hidden border-border/50 hover:shadow-xl transition-all">
            <BorderBeam
              size={200}
              duration={10}
              colorFrom={theme === 'dark' ? '#a78bfa' : '#8b5cf6'}
              colorTo={theme === 'dark' ? '#ec4899' : '#ec4899'}
            />
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2">Premium</h3>
                <div className="text-4xl font-bold mb-2">$49</div>
                <div className="text-sm text-muted-foreground">per month</div>
              </div>

              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 shrink-0" />
                  <span className="font-semibold">Unlimited scripts</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 shrink-0" />
                  <span className="font-semibold">Unlimited analyses</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 shrink-0" />
                  <span className="font-semibold">Unlimited channels</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 shrink-0" />
                  <span className="font-semibold">Custom writing styles</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 shrink-0" />
                  <span className="font-semibold">Priority support</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 shrink-0" />
                  <span className="font-semibold">API access</span>
                </li>
              </ul>

              <Link href="/signup">
                <Button className="w-full" variant="outline">
                  Get Started
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative border-y border-border/40 bg-muted/30">
        <div className="container max-w-6xl mx-auto px-4 py-24 md:py-32">
          <div className="text-center mb-16">
            <Badge className="mb-4" variant="outline">
              Testimonials
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              What Creators Are Saying
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                quote: "Cut my research time by 80%. I'm now posting 3x more content and growing faster than ever!",
                author: "LAZY SANDY",
                handle: "@lazysandyinfo",
                subscribers: "500K+ subscribers",
                initial: "L",
              },
              {
                quote: "Found 10 viral video ideas in minutes. The AI analysis is spot-on and the scripts sound like me!",
                author: "Tech Explainer",
                handle: "@techexplain",
                subscribers: "1M+ subscribers",
                initial: "T",
              },
              {
                quote: "The scripts don't sound like AI at all. My audience thinks I write everything from scratch!",
                author: "Science Daily",
                handle: "@sciencedaily",
                subscribers: "2M+ subscribers",
                initial: "S",
              },
            ].map((testimonial, index) => (
              <Card key={index} className="border-border/50 hover:shadow-xl transition-all">
                <CardContent className="p-6">
                  <p className="text-lg mb-6 italic">"{testimonial.quote}"</p>
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-primary-foreground font-bold text-lg shrink-0">
                      {testimonial.initial}
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold truncate">{testimonial.author}</p>
                      <p className="text-sm text-muted-foreground truncate">{testimonial.handle}</p>
                      <p className="text-xs text-muted-foreground mt-1">{testimonial.subscribers}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-background to-muted/30">
        <DotPattern className="opacity-40" glow />
        <div className="container max-w-4xl mx-auto relative z-10 px-4 py-24 md:py-32">
          <Card className="relative overflow-hidden border-2 bg-background/50 backdrop-blur-xl">
            <BorderBeam size={250} duration={10} delay={0} />
            <CardContent className="p-12 text-center">
              <Badge className="mb-6" variant="outline">
                <Sparkles className="mr-1 h-3 w-3" />
                Get Started Today
              </Badge>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-6 bg-gradient-to-r from-primary via-accent to-primary dark:from-primary/90 dark:via-accent/90 dark:to-primary/90 bg-clip-text text-transparent">
                Ready to Create Viral Content?
              </h2>
              <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
                Join content creators who are saving hours every week and growing their channels faster with AI-powered insights.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link href="/signup">
                  <ShimmerButton
                    className="text-base font-semibold px-10 py-7"
                    shimmerColor={theme === 'dark' ? '#60a5fa' : '#3b82f6'}
                    background={theme === 'dark'
                      ? "linear-gradient(to right, #60a5fa, #a78bfa)"
                      : "linear-gradient(to right, #3b82f6, #8b5cf6)"}
                  >
                    <span className="flex items-center gap-2">
                      Start Free Trial
                      <ArrowRight className="h-5 w-5" />
                    </span>
                  </ShimmerButton>
                </Link>
                <Link href="/login">
                  <Button size="lg" variant="outline" className="text-base px-10 py-7">
                    Sign In
                  </Button>
                </Link>
              </div>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400 shrink-0" />
                  10 free scripts per month
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400 shrink-0" />
                  20 free analyses per month
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400 shrink-0" />
                  No credit card required
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Minimal Footer */}
      <footer className="border-t border-border/40">
        <div className="container max-w-4xl mx-auto px-4 py-8">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              <span className="text-lg font-bold">ReatorAI</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              AI-powered viral content research and script generation for creators
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
              <Link href="#features" className="hover:text-foreground transition-colors">Features</Link>
              <Link href="#how-it-works" className="hover:text-foreground transition-colors">How It Works</Link>
              <Link href="#pricing" className="hover:text-foreground transition-colors">Pricing</Link>
              <span className="text-border">|</span>
              <Link href="/about" className="hover:text-foreground transition-colors">About</Link>
              <Link href="/blog" className="hover:text-foreground transition-colors">Blog</Link>
              <Link href="/contact" className="hover:text-foreground transition-colors">Contact</Link>
              <span className="text-border">|</span>
              <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
              <Link href="/terms" className="hover:text-foreground transition-colors">Terms</Link>
            </div>
            <p className="text-sm text-muted-foreground pt-4 border-t border-border/40 max-w-md mx-auto">
              &copy; 2025 ReatorAI. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
