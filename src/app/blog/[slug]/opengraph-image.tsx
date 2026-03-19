import { ImageResponse } from "next/og";
import { getPostBySlug, getAllSlugs } from "@/lib/posts";

export const alt = "NexusAI Blog";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export default async function OGImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  const title = post?.title ?? "NexusAI Blog";
  const category = post?.category ?? "";
  const readingTime = post?.readingTime ?? "";
  const titleSize = title.length <= 40 ? 56 : 48;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#0A0A0F",
          fontFamily: "Inter, sans-serif",
          padding: "60px 64px 48px 64px",
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

        {/* Category pill */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "8px 20px",
              borderRadius: 9999,
              background: "rgba(59,130,246,0.15)",
              border: "1px solid rgba(59,130,246,0.3)",
              fontSize: 16,
              fontWeight: 600,
              color: "#60A5FA",
              textTransform: "uppercase" as const,
              letterSpacing: "0.05em",
            }}
          >
            {category}
          </div>
          {readingTime && (
            <div style={{ marginLeft: 16, fontSize: 14, color: "#6B7280" }}>
              {readingTime}
            </div>
          )}
        </div>

        {/* Post title */}
        <div
          style={{
            fontSize: titleSize,
            fontWeight: 700,
            color: "#F9FAFB",
            lineHeight: 1.2,
            letterSpacing: "-0.02em",
            marginTop: 16,
            maxHeight: "240px",
            overflow: "hidden",
            display: "flex",
          }}
        >
          {title}
        </div>

        {/* Spacer */}
        <div style={{ flex: 1 }} />

        {/* Bottom bar */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 20,
          }}
        >
          <div style={{ width: "100%", height: 1, background: "rgba(255,255,255,0.08)" }} />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              {/* N logo */}
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  background: "linear-gradient(135deg, #3B82F6, #7C3AED)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  fontSize: 16,
                  fontWeight: 700,
                }}
              >
                N
              </div>
              <span style={{ fontSize: 18, fontWeight: 500, color: "#9CA3AF" }}>
                NexusAI Blog
              </span>
            </div>
            <span style={{ fontSize: 14, color: "#6B7280" }}>
              ai-blockchain-blog.vercel.app
            </span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
