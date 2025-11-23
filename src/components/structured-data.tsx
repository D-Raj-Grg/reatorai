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
    </>
  );
}
