export const SITE_NAME = "TechLion Blog";
export const SITE_TAGLINE = "Where AI Meets Blockchain";
export const SITE_DESCRIPTION =
  "TechLion Blog by LionTech AI — exploring the frontier of artificial intelligence and blockchain technology.";
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://ai-blockchain-blog.vercel.app";
export const CATEGORIES = ["AI", "Blockchain"] as const;

// Buttondown newsletter (free tier, no backend needed)
export const BUTTONDOWN_USERNAME = process.env.NEXT_PUBLIC_BUTTONDOWN_USERNAME || "techlion";
