# Blog Critical Fixes — Scope Document

**Date:** 2026-03-19  
**Status:** Ready for implementation

## 1. Newsletter Fix (Priority: HIGH)

**Current state:** Newsletter component (`src/components/NewsletterSignup.tsx`) already has Buttondown API integration with form fallback, BUT:
- The API call to `https://api.buttondown.com/v1/subscribers` requires an `Authorization: Token <API_KEY>` header — currently missing
- Without auth, every API call fails silently and falls back to `submitViaForm()` which opens a new tab (bad UX)

**Fix:**
- Switch primary submission to Buttondown's embed-subscribe form endpoint (no CORS, no API key needed for free tier)
- Use `https://buttondown.com/api/emails/embed-subscribe/${BUTTONDOWN_USERNAME}` as the form action
- Submit via `fetch` with `FormData` (no-cors mode) for seamless UX, with form fallback
- Remove the broken API v1 call

## 2. Brand Consistency (Priority: HIGH)

**Current state:** `constants.ts` already says "TechLion Blog" / "LionTech AI". But NexusAI references remain:

| File | Line | Current | Target |
|------|------|---------|--------|
| `src/lib/posts.ts` | 50, 71 | `"NexusAI Team"` | `"LionTech AI Team"` |
| `content/posts/ai-agents-automation-2026.mdx` | ~236 | `"NexusAI Blog newsletter"` | `"TechLion Blog newsletter"` |
| `content/posts/blockchain-ai-integration.mdx` | ~234 | `"NexusAI Blog"` | `"TechLion Blog"` |

**OG images:** Already use `SITE_NAME` constant ("TechLion Blog") ✅  
**Header/Footer/About:** Already use constants ✅

## 3. Google Search Console (Priority: MEDIUM)

**Current state:** `sitemap.ts` and `robots.ts` already exist and are correct.

**Fix:** Create `SEARCH-CONSOLE-SETUP.md` with step-by-step verification instructions.

## 4. SEO Improvements (Priority: MEDIUM)

**Current state:** Already solid:
- ✅ All posts have meta descriptions via `generateMetadata()`
- ✅ Canonical URLs on all pages
- ✅ OG tags (title, description, images) on all pages
- ✅ Twitter cards configured
- ✅ JSON-LD structured data on blog posts
- ✅ `robots.ts` with sitemap reference
- ✅ `sitemap.ts` with all posts and categories

**No additional SEO changes needed** — implementation is production-ready.

## Implementation Checklist

- [ ] Fix newsletter to use Buttondown embed endpoint properly
- [ ] Replace "NexusAI Team" default author in `posts.ts`
- [ ] Replace "NexusAI Blog" in 2 MDX files
- [ ] Create `SEARCH-CONSOLE-SETUP.md`
- [ ] Verify build succeeds
- [ ] Push to liontech remote
