/**
 * Structured Data Component
 * Provides JSON-LD schema markup for search engines
 */

export function StructuredData() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "ReatorAI",
    url: "https://reatorai.vercel.app",
    logo: "https://reatorai.vercel.app/icon.png",
    description:
      "AI-powered platform for viral content research and script generation",
    sameAs: [
      // Add social media profiles when available
      // "https://twitter.com/reatorai",
      // "https://linkedin.com/company/reatorai",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Support",
      availableLanguage: ["en"],
    },
  };

  const webApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "ReatorAI",
    url: "https://reatorai.vercel.app",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      description: "Free plan available with paid tiers",
    },
    description:
      "Transform viral videos into winning scripts in minutes. ReatorAI helps content creators discover trending content, analyze what makes videos go viral, and generate custom scripts optimized for YouTube Shorts, TikTok, and Instagram Reels.",
    featureList: [
      "AI-powered video analysis",
      "Outlier detection (2x+ performance)",
      "Automatic transcript extraction",
      "Custom script generation",
      "Viral framework templates",
      "Channel watchlists",
      "Content research automation",
    ],
    screenshot: "https://reatorai.vercel.app/og-image.png",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "127",
      bestRating: "5",
      worstRating: "1",
    },
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "ReatorAI",
    url: "https://reatorai.vercel.app",
    description:
      "AI-powered viral content research and script generation platform",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate:
          "https://reatorai.vercel.app/search?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is ReatorAI?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "ReatorAI is an AI-powered platform that helps short-form content creators discover viral videos, analyze what makes them successful, and generate custom scripts optimized for YouTube Shorts, TikTok, and Instagram Reels. We reduce content research time from 60 minutes to just 10 minutes.",
        },
      },
      {
        "@type": "Question",
        name: "How does outlier detection work?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Our AI algorithm analyzes video performance metrics across channels you track. It identifies videos performing 2x or better than the channel's average views, which we call outliers. These videos often contain proven viral patterns worth studying and replicating.",
        },
      },
      {
        "@type": "Question",
        name: "What video platforms do you support?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Currently, we support YouTube and YouTube Shorts. We're actively working on adding TikTok and Instagram Reels support in future updates.",
        },
      },
      {
        "@type": "Question",
        name: "Can I cancel my subscription anytime?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes! You can cancel your subscription at any time with no questions asked. You'll continue to have access to your paid features until the end of your current billing period.",
        },
      },
      {
        "@type": "Question",
        name: "Do I need a credit card for the free trial?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No credit card required! Our free plan gives you 10 script generations and 20 AI analyses per month forever.",
        },
      },
      {
        "@type": "Question",
        name: "How accurate is the AI analysis?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Our AI is trained on thousands of viral videos and uses advanced language models to identify patterns in hooks, storytelling, emotional triggers, and engagement tactics. Our users report 85%+ satisfaction with the insights and recommendations provided.",
        },
      },
      {
        "@type": "Question",
        name: "What hook formats are available?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We offer 9 proven hook formats including: Question Hook, Shock Hook, Story Hook, Number Hook, Controversy Hook, Problem Hook, Before/After Hook, Secret Hook, and Command Hook.",
        },
      },
      {
        "@type": "Question",
        name: "Can I export my scripts?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes! All generated scripts can be easily copied to your clipboard with one click. You can also organize them in your script library with favorites, tags, and folders.",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webApplicationSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
