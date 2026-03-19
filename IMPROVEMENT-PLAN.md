# 🛠️ Blog Improvement Plan — NexusAI Blog

**Audited:** 2026-03-19  
**Auditor:** 🎛️ Orchestrator Agent  
**Live URL:** https://ai-blockchain-blog.vercel.app  
**Source:** `/data/ai-blockchain-blog/`  

---

## Executive Summary

The blog has a solid foundation — Next.js 16, Tailwind CSS 4, MDX content, dark mode, RSS, sitemap, robots.txt, and JSON-LD structured data are all in place. However, there are **critical SEO bugs** (wrong domain in sitemap/robots), **3 placeholder posts** that need real content, and the site lacks key engagement features (search, newsletter, social sharing, reading progress). The design is clean but minimal — it needs visual depth (images, featured posts, better typography) to compete.

Priority legend:
- **P0** — Critical / blocking SEO or functionality. Do first.
- **P1** — High-impact improvements. Do this sprint.
- **P2** — Nice-to-have polish. Next sprint.

---

## 1. SEO Audit

### P0 — Critical

| # | Issue | Details | Action |
|---|-------|---------|--------|
| 1.1 | **Wrong domain in SITE_URL** | `constants.ts` defaults to `https://nexusai-blog.vercel.app` but site is deployed at `https://ai-blockchain-blog.vercel.app`. Sitemap, robots.txt, canonical URLs, and OG URLs all point to the wrong domain. | Set `NEXT_PUBLIC_SITE_URL` env var on Vercel to `https://ai-blockchain-blog.vercel.app`, OR update the fallback in `constants.ts`. |
| 1.2 | **Category URLs contain spaces** | Category "Artificial Intelligence" generates sitemap URL `/category/artificial intelligence` (unencoded space). This is invalid XML and will confuse crawlers. | Either rename the category to "AI" in the MDX frontmatter, or URL-encode categories in `sitemap.ts` using `encodeURIComponent()`. Standardize categories across all posts. |
| 1.3 | **Missing OG images** | No `og:image` on any page. Social shares will have no preview image. Twitter cards won't render properly with `summary_large_image` but no image. | Generate OG images — either static per-post (add `image` field to frontmatter and reference in metadata) or use Next.js `ImageResponse` API to auto-generate OG images from post titles. |

### P1 — High Impact

| # | Issue | Details | Action |
|---|-------|---------|--------|
| 1.4 | **No favicon / app icons** | Only default `favicon.ico` exists. No apple-touch-icon, no PWA manifest. | Add proper favicon set: `favicon.ico`, `apple-touch-icon.png`, `icon-192.png`, `icon-512.png`. Add `manifest.json`. |
| 1.5 | **Missing `dateModified` in JSON-LD** | Article structured data only has `datePublished`. Google prefers both. | Add `dateModified` field to MDX frontmatter (or default to `datePublished`). Include in JSON-LD. |
| 1.6 | **No `image` in JSON-LD Article schema** | Google strongly recommends article images in structured data. | Add `image` property to JSON-LD once OG images are implemented. |
| 1.7 | **RSS feed uses wrong base URL** | Same SITE_URL issue — RSS `<link>` tags point to wrong domain. | Fixed by fixing 1.1. |
| 1.8 | **Category pages lack OG metadata** | `generateMetadata` in `[category]/page.tsx` doesn't include `openGraph` or `twitter` cards. | Add OG title, description, URL to category page metadata. |

### P2 — Polish

| # | Issue | Details | Action |
|---|-------|---------|--------|
| 1.9 | **No Google Analytics / Search Console** | Can't measure anything without analytics. | Add Google Analytics 4 (via `@next/third-parties` or script tag). Register with Google Search Console and submit sitemap. |
| 1.10 | **No `hreflang` tags** | Not critical for English-only, but good practice. | Add if multilingual support is planned. |
| 1.11 | **No breadcrumb structured data** | Helps with rich snippets in search results. | Add `BreadcrumbList` JSON-LD to blog post and category pages. |

---

## 2. Design / UI

### P0 — Critical

| # | Issue | Details | Action |
|---|-------|---------|--------|
| 2.1 | **No hero images / featured images on posts** | Every post card and post page is text-only. No visual differentiation between posts. The homepage looks like a list of text blocks. | Add hero/cover images to MDX frontmatter. Display in `PostCard` and at top of blog post pages. Use `next/image` for optimization. |

### P1 — High Impact

| # | Issue | Details | Action |
|---|-------|---------|--------|
| 2.2 | **No featured post treatment** | All posts look identical on homepage. The most recent/important should stand out. | Make the first post a large featured card (full-width, with image, larger title). Rest remain as list. |
| 2.3 | **Typography needs refinement** | Using system-ui only. No custom web font. Line heights and letter spacing could be improved for long-form reading. | Add Inter or similar via `next/font`. Set proper `prose` typography for article content. Consider using `@tailwindcss/typography` plugin. |
| 2.4 | **Mobile nav is cramped** | Header nav items (AI, Blockchain, RSS, theme toggle) are all inline. On small screens they may wrap awkwardly. | Add hamburger menu for mobile. Collapse nav items into a slide-out or dropdown on screens < 768px. |
| 2.5 | **No visual hierarchy on homepage** | Tagline section is plain. No background gradient, no accent colors, no visual weight. | Add subtle gradient background or accent color block to hero section. Add section dividers between featured and recent posts. |
| 2.6 | **PostCard hover state is minimal** | Only border color changes on hover. No elevation, no image zoom, no visual feedback. | Add `shadow-lg` on hover, subtle translateY, and image scale transform if images are added. |
| 2.7 | **Footer is too sparse** | Just name, tagline, copyright. No links, no social, no newsletter CTA. | Add social links, category links, "About" blurb, and newsletter signup to footer. |

### P2 — Polish

| # | Issue | Details | Action |
|---|-------|---------|--------|
| 2.8 | **No loading states** | No skeleton loaders or spinners during page transitions. | Add loading.tsx skeleton for blog post pages. |
| 2.9 | **No page transition animations** | Hard cuts between pages feel abrupt. | Add subtle fade-in transitions using CSS or framer-motion. |
| 2.10 | **Dark mode toggle lacks animation** | Instant switch with no transition. | Add `transition-colors duration-200` to `<html>` or `<body>`. |
| 2.11 | **No scroll-to-top button** | Long posts require manual scrolling back. | Add a floating "back to top" button that appears after scrolling down. |

---

## 3. Content Quality

### P0 — Critical

| # | Issue | Details | Action |
|---|-------|---------|--------|
| 3.1 | **3 placeholder posts need real content** | `getting-started-with-ai.mdx` (29 lines), `blockchain-fundamentals.mdx` (29 lines), and `ai-meets-blockchain.mdx` (29 lines) are stubs ending with "*This is a placeholder post.*" | Write full 1500–2500 word articles for each. Match the quality of the two existing long posts (`ai-agents-automation-2026` and `blockchain-ai-integration`). |
| 3.2 | **Placeholder posts reference non-existent images** | Frontmatter has `image: "/images/ai-placeholder.jpg"` etc. but no `/public/images/` directory exists. | Either add real images or remove the `image` field until real images are ready. |

### P1 — High Impact

| # | Issue | Details | Action |
|---|-------|---------|--------|
| 3.3 | **Inconsistent category naming** | Posts use both "AI" and "Artificial Intelligence" as categories. This creates duplicate category pages and confuses navigation. | Standardize on one name per category. Recommend: "AI" and "Blockchain". Update all frontmatter. |
| 3.4 | **No tags displayed in UI** | Posts have `tags` in frontmatter but they're never rendered. Tags help with SEO and internal discovery. | Display tags on post pages. Optionally create `/tag/[tag]` pages. |
| 3.5 | **Missing internal links between posts** | The two long posts don't link to each other or to related content on the blog. Internal linking is crucial for SEO. | Add contextual links between related posts. E.g., the AI agents post should link to the AI+blockchain post and vice versa. |
| 3.6 | **No table of contents for long posts** | The 12-14 min read posts have many H2/H3 sections but no TOC. Readers can't navigate. | Auto-generate TOC from headings. Display as sticky sidebar or collapsible top section. |

### P2 — Polish

| # | Issue | Details | Action |
|---|-------|---------|--------|
| 3.7 | **No author bio / about page** | "NexusAI Team" is the author but there's no about page or author card. | Add author card at bottom of posts. Create `/about` page. |
| 3.8 | **No estimated reading progress** | The reading time is shown but there's no progress bar as you scroll. | Implement reading progress bar (see 5.5). |

---

## 4. Performance

### P1 — High Impact

| # | Issue | Details | Action |
|---|-------|---------|--------|
| 4.1 | **`output: "standalone"` is unnecessary** | Vercel handles deployment natively. `standalone` mode is for Docker/self-hosted. It increases build complexity. | Remove `output: "standalone"` from `next.config.ts`. |
| 4.2 | **No `next/image` usage** | No images are being optimized. When hero images are added, they must use `next/image` for automatic WebP/AVIF conversion, lazy loading, and responsive srcset. | Use `<Image>` component from `next/image` for all images. |
| 4.3 | **No font optimization** | System font stack is fine for performance but if custom fonts are added, they must use `next/font` to avoid layout shift. | If adding custom fonts (see 2.3), use `next/font/google` for zero-layout-shift loading. |
| 4.4 | **CSS is minimal but could use purging verification** | Tailwind v4 handles this automatically, but verify no unused CSS is shipped. | Run build and check CSS bundle size. Should be < 20KB gzipped. |

### P2 — Polish

| # | Issue | Details | Action |
|---|-------|---------|--------|
| 4.5 | **No `<link rel="preload">` for critical resources** | First paint could be faster with preloading. | Preload critical fonts and above-the-fold images. |
| 4.6 | **Theme toggle causes flash on first load** | The inline script handles this but could be improved with a cookie-based approach. | Current approach is acceptable. Monitor CLS scores. |
| 4.7 | **MDX rendering is server-side (good)** | `next-mdx-remote/rsc` renders on the server. No action needed. | ✅ Already optimal. |

---

## 5. Functionality

### P1 — High Impact

| # | Issue | Details | Action |
|---|-------|---------|--------|
| 5.1 | **No search functionality** | Users can't search posts. With 5 posts it's fine, but won't scale. | Implement client-side search. Options: (a) Simple filter with Fuse.js, (b) Algolia/Meilisearch for production. Start with Fuse.js. |
| 5.2 | **No newsletter / email signup** | No way to capture audience. Missing the most basic growth lever. | Add email signup form. Options: Buttondown, ConvertKit, Resend, or Mailchimp. Add CTA in footer, sidebar, and end of posts. |
| 5.3 | **No social sharing buttons** | Readers can't easily share posts on Twitter/LinkedIn/etc. | Add share buttons at top or bottom of blog posts (Twitter, LinkedIn, Copy Link, WhatsApp). |
| 5.4 | **No related posts** | At the end of each post, there's just "← Back to all posts". No discovery mechanism. | Show 2-3 related posts based on category or tags at the bottom of each article. |
| 5.5 | **No reading progress indicator** | Long posts (12-14 min) have no visual progress. | Add a thin progress bar at the top of the page (below header) that fills as the user scrolls through the article. |

### P2 — Nice to Have

| # | Issue | Details | Action |
|---|-------|---------|--------|
| 5.6 | **No "copy link" button** | Easy win for sharing. | Add copy-to-clipboard button next to post title or in share toolbar. |
| 5.7 | **No pagination** | All posts shown on homepage. Will need pagination at 10+ posts. | Implement pagination or infinite scroll when post count grows. |
| 5.8 | **No estimated read time progress** | Could show "3 of 12 min read" as you scroll. | Implement with IntersectionObserver. |
| 5.9 | **No comments system** | No reader engagement mechanism. | Consider Giscus (GitHub-based), Disqus, or custom. |
| 5.10 | **No "Back to top" button** | Long scroll on post pages. | Floating button that appears after 500px scroll. |

---

## 6. Code Quality

### P1 — High Impact

| # | Issue | Details | Action |
|---|-------|---------|--------|
| 6.1 | **No skip-to-content link** | Accessibility issue. Screen reader and keyboard users can't skip nav. | Add visually-hidden skip link as first element in `<body>`: `<a href="#main-content" className="sr-only focus:not-sr-only">Skip to content</a>`. Add `id="main-content"` to `<main>`. |
| 6.2 | **Category URL handling is fragile** | Category "Artificial Intelligence" creates URL `/category/artificial intelligence` with a literal space. The `getPostsByCategory` does case-insensitive match but doesn't handle URL encoding/spaces. | Slugify categories: `artificial-intelligence` instead of `artificial intelligence`. Add a `categorySlug` utility. |
| 6.3 | **No error boundary** | If MDX rendering fails, the entire page crashes. | Add React error boundary wrapper around MDX content. Add `error.tsx` pages. |
| 6.4 | **ThemeToggle has hydration mismatch potential** | `useState(false)` then `useEffect` sets actual value. During SSR the sun icon renders, then potentially swaps to moon. | Use `suppressHydrationWarning` on the button, or render null until mounted. Current approach works but could flash. |
| 6.5 | **`PostMeta.image` is unused** | The interface defines `image: string` but it's never used in any component. Dead field. | Either implement image rendering or remove the field until images are added. |

### P2 — Polish

| # | Issue | Details | Action |
|---|-------|---------|--------|
| 6.6 | **No component tests** | Zero tests in the project. | Add Jest + React Testing Library. Write tests for PostCard, Header, ThemeToggle, and the posts utility functions. |
| 6.7 | **ESLint config is minimal** | Only `eslint-config-next`. No Prettier, no import sorting, no accessibility rules. | Add `eslint-plugin-jsx-a11y`, Prettier integration, and import sorting. |
| 6.8 | **No Prettier config** | Code formatting is inconsistent. | Add `.prettierrc` and format all files. |
| 6.9 | **No CI pipeline** | No GitHub Actions for lint, build, or test. | Add `.github/workflows/ci.yml` with lint + build + test steps. |
| 6.10 | **MDX components are inline** | The `mdxComponents` object in `[slug]/page.tsx` is large and could be extracted. | Move to `src/components/mdx/` directory for reusability and testing. |
| 6.11 | **No `loading.tsx` or `error.tsx`** | Missing Next.js app router conventions for loading and error states. | Add `loading.tsx` (skeleton) and `error.tsx` (error boundary) to blog and category routes. |

---

## 📋 Implementation Order (Recommended)

### Sprint 1 — Fix Critical Bugs (P0)
1. ~~1.1~~ Fix `SITE_URL` (5 min)
2. ~~1.2~~ Fix category URL spaces (30 min)  
3. ~~3.3~~ Standardize category names in all frontmatter (15 min)
4. ~~1.3~~ Add OG image generation (2-3 hours)
5. ~~3.1~~ Write 3 full blog posts to replace placeholders (content team, 1-2 days)
6. ~~3.2~~ Fix/remove placeholder image references (10 min)
7. ~~2.1~~ Add hero images to posts (1-2 hours)

### Sprint 2 — High-Impact Features (P1)
8. ~~6.1~~ Add skip-to-content link (15 min)
9. ~~6.2~~ Slugify category URLs (1 hour)
10. ~~2.3~~ Add custom typography / web font (1 hour)
11. ~~5.2~~ Add newsletter signup (2-3 hours)
12. ~~5.3~~ Add social sharing buttons (1-2 hours)
13. ~~5.4~~ Add related posts component (1-2 hours)
14. ~~5.5~~ Add reading progress bar (1 hour)
15. ~~3.6~~ Add table of contents for long posts (2 hours)
16. ~~2.2~~ Featured post card on homepage (1 hour)
17. ~~2.4~~ Mobile hamburger menu (1-2 hours)
18. ~~4.1~~ Remove `output: "standalone"` (5 min)
19. ~~1.4~~ Add proper favicon set (30 min)

### Sprint 3 — Polish & Scale (P2)
20. Analytics setup (1.9)
21. Author bios and about page (3.7)
22. Component tests (6.6)
23. CI pipeline (6.9)
24. Loading/error states (6.11)
25. Breadcrumb structured data (1.11)
26. Comments system (5.9)
27. Page transitions (2.9)
28. ESLint + Prettier hardening (6.7, 6.8)

---

## Tech Stack Notes

- **Framework:** Next.js 16.2.0 (App Router) — latest, good
- **Styling:** Tailwind CSS v4 — latest, good
- **Content:** MDX via `next-mdx-remote/rsc` (server-rendered) — good choice
- **TypeScript:** Strict mode enabled — good
- **Hosting:** Vercel — optimal for Next.js

## Files to Create/Modify

| File | Action |
|------|--------|
| `src/lib/constants.ts` | Fix SITE_URL |
| `src/app/sitemap.ts` | URL-encode categories |
| `src/app/opengraph-image.tsx` | New: auto-generate OG images |
| `src/app/blog/[slug]/opengraph-image.tsx` | New: per-post OG images |
| `src/components/PostCard.tsx` | Add hero image, hover effects |
| `src/components/Header.tsx` | Add mobile menu, skip link |
| `src/components/Footer.tsx` | Add social links, newsletter |
| `src/components/ShareButtons.tsx` | New: social sharing |
| `src/components/RelatedPosts.tsx` | New: related posts |
| `src/components/ReadingProgress.tsx` | New: progress bar |
| `src/components/TableOfContents.tsx` | New: TOC component |
| `src/components/NewsletterSignup.tsx` | New: email capture |
| `src/components/Search.tsx` | New: search component |
| `src/components/mdx/index.ts` | New: extracted MDX components |
| `content/posts/*.mdx` | Fix categories, expand placeholders |
| `next.config.ts` | Remove standalone output |
| `public/images/` | New: hero images, favicons |
| `.github/workflows/ci.yml` | New: CI pipeline |

---

*This plan was generated by auditing the source code at `/data/ai-blockchain-blog/` and the live deployment at `https://ai-blockchain-blog.vercel.app`. All findings are based on the state as of 2026-03-19.*
