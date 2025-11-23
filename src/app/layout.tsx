import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { QueryProvider } from "@/components/providers/query-provider";
import { StructuredData } from "@/components/structured-data";

export const metadata: Metadata = {
  metadataBase: new URL("https://reatorai.vercel.app"),
  title: {
    default: "ReatorAI - AI-Powered Viral Content Research & Script Generation",
    template: "%s | ReatorAI",
  },
  description:
    "Transform viral videos into winning scripts in minutes. ReatorAI helps content creators discover trending content, analyze what makes videos go viral, and generate custom scripts optimized for YouTube Shorts, TikTok, and Instagram Reels.",
  keywords: [
    "AI script generator",
    "viral content research",
    "YouTube Shorts scripts",
    "TikTok script writer",
    "content creation tool",
    "viral video analysis",
    "AI scriptwriting",
    "short-form content",
    "content creator tools",
    "video script generator",
    "viral content AI",
    "YouTube automation",
  ],
  authors: [{ name: "ReatorAI Team" }],
  creator: "ReatorAI",
  publisher: "ReatorAI",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://reatorai.vercel.app",
    siteName: "ReatorAI",
    title: "ReatorAI - AI-Powered Viral Content Research & Script Generation",
    description:
      "Transform viral videos into winning scripts in minutes. Discover trending content, analyze viral patterns, and generate custom scripts for YouTube, TikTok, and Instagram.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "ReatorAI - Turn Viral Videos Into Winning Scripts",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ReatorAI - AI-Powered Viral Content Research & Script Generation",
    description:
      "Transform viral videos into winning scripts in minutes. Discover trending content, analyze viral patterns, and generate custom scripts.",
    images: ["/og-image.png"],
    creator: "@reatorai",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon.png", type: "image/png", sizes: "32x32" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/manifest.json",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <StructuredData />
      </head>
      <body className="antialiased">
        <QueryProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster />
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
