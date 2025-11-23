import { ImageResponse } from "next/og";

// Image metadata
export const alt = "ReatorAI - Turn Viral Videos Into Winning Scripts";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

// Image generation
export default async function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* Logo/Icon */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 30,
          }}
        >
          <div
            style={{
              width: 80,
              height: 80,
              borderRadius: 16,
              background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 48,
              fontWeight: 700,
              color: "white",
            }}
          >
            R
          </div>
        </div>

        {/* Main title */}
        <div
          style={{
            display: "flex",
            fontSize: 64,
            fontWeight: 700,
            background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
            backgroundClip: "text",
            color: "transparent",
            marginBottom: 20,
            textAlign: "center",
            padding: "0 60px",
          }}
        >
          ReatorAI
        </div>

        {/* Tagline */}
        <div
          style={{
            display: "flex",
            fontSize: 36,
            color: "#e2e8f0",
            textAlign: "center",
            maxWidth: 900,
            padding: "0 60px",
            lineHeight: 1.4,
          }}
        >
          Turn Viral Videos Into Winning Scripts
        </div>

        {/* Feature bullets */}
        <div
          style={{
            display: "flex",
            gap: 40,
            marginTop: 40,
            fontSize: 20,
            color: "#94a3b8",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            ⚡ Outlier Detection
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            🎯 AI Analysis
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            ✍️ Script Generation
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
