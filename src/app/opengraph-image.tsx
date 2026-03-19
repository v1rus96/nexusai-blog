import { ImageResponse } from "next/og";
import { SITE_NAME } from "@/lib/constants";

export const alt = SITE_NAME;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#0A0A0F",
          fontFamily: "Inter, sans-serif",
          position: "relative",
        }}
      >
        {/* Background gradients */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              "radial-gradient(ellipse 60% 50% at 15% 20%, rgba(59,130,246,0.15), transparent), radial-gradient(ellipse 50% 45% at 85% 75%, rgba(139,92,246,0.12), transparent)",
          }}
        />

        {/* Logo */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 80,
            height: 80,
            borderRadius: 20,
            background: "linear-gradient(135deg, #3B82F6, #7C3AED)",
            marginBottom: 32,
            fontSize: 40,
            fontWeight: 700,
            color: "white",
          }}
        >
          N
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: 56,
            fontWeight: 700,
            color: "#F9FAFB",
            letterSpacing: "-0.02em",
            marginBottom: 16,
          }}
        >
          {SITE_NAME}
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 24,
            color: "#9CA3AF",
          }}
        >
          Where AI Meets Blockchain
        </div>

        {/* Bottom divider + domain */}
        <div
          style={{
            position: "absolute",
            bottom: 48,
            left: 64,
            right: 64,
            display: "flex",
            flexDirection: "column",
            gap: 20,
          }}
        >
          <div style={{ width: "100%", height: 1, background: "rgba(255,255,255,0.08)" }} />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              fontSize: 14,
              color: "#6B7280",
            }}
          >
            ai-blockchain-blog.vercel.app
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
