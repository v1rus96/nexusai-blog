# 📦 PRODUCTION-SCOPE.md — NexusAI Blog Production Polish Sprint

**CPO:** The Agency  
**Date:** 2026-03-19  
**Blog URL:** https://ai-blockchain-blog.vercel.app  
**Source:** `/data/ai-blockchain-blog/`  
**Stack:** Next.js 16, Tailwind CSS v4, MDX (next-mdx-remote/rsc), Vercel  

---

## Context & Baseline

The blog shipped with a strong foundation. After the initial build sprint, the following are **already in place** and working:

- ✅ Correct `SITE_URL` (`ai-blockchain-blog.vercel.app`)
- ✅ Standardized categories (`AI`, `Blockchain`) with slugified URLs
- ✅ 2 high-quality long-form posts (no placeholders)
- ✅ Inter font via `next/font` with swap display
- ✅ Skip-to-content accessibility link
- ✅ Mobile hamburger menu with animated open/close
- ✅ Featured post treatment on homepage
- ✅ Share buttons (X, LinkedIn, copy link)
- ✅ Related posts component
- ✅ Reading progress bar
- ✅ Newsletter CTA (client-side UI)
- ✅ RSS feed, sitemap, robots.txt
- ✅ JSON-LD structured data (Article schema)
- ✅ Dark-first glassmorphism design
- ✅ Theme toggle (dark/light)
- ✅ `not-found.tsx` custom 404 page
- ✅ `output: "standalone"` removed from next.config

This sprint focuses on **production polish** — fixing things that look broken or unfinished to a real visitor, and adding high-impact features that meaningfully improve SEO, engagement, or trust.

---

## P0 — Must-Fix for Production

These items make the site look unfinished, broken, or untrustworthy if left as-is. Ship-blockers.

---

### P0-1: Dynamic OG Images Per Post

**Problem:** Every page shares the same static `og-default.png`. When shared on X/LinkedIn, all posts look identical. The current blog post metadata hardcodes `og-default.png` for both `openGraph.images` and `twitter.images`.

**Scope:**
- Create `src/app/blog/[slug]/opengraph-image.tsx` using Next.js `ImageResponse` API
- Generate a dynamic image from the post title, category, and reading time
- Match the blog's glassmorphism aesthetic (dark bg, gradient accents, Inter font)
- Keep `og-default.png` as the global fallback for homepage/category pages
- Remove hardcoded `og-default.png` references from `generateMetadata` in `[slug]/page.tsx` (let the file-based convention take over)

**Acceptance Criteria:**
- [ ] Each blog post URL produces a unique OG image at `/blog/[slug]/opengraph-image`
- [ ] Image renders post title, category pill, and "NexusAI Blog" branding
- [ ] Image dimensions: 1200×630
- [ ] Homepage and category pages still use `og-default.png`
- [ ] Validates with [opengraph.xyz](https://opengraph.xyz) or Twitter Card Validator

**Estimate:** 2–3 hours

---

### P0-2: Fix Footer Social Links

**Problem:** Footer social icons link to bare `https://twitter.com` and `https://linkedin.com` — clearly placeholder. Any visitor who clicks them sees a generic homepage, signaling the site isn't real.

**Scope:**
- Either link to actual brand profiles or remove the social icons entirely
- If no real profiles exist yet: remove the icons and leave category + RSS links only
- If profiles exist: update `href` values and add `aria-label` for accessibility

**Acceptance Criteria:**
- [ ] No footer link points to a generic social media homepage
- [ ] If icons are present, they link to real, active profiles
- [ ] Each social link has an `aria-label` (e.g., "Follow us on X")

**Estimate:** 15 minutes

---

### P0-3: Fix Light Mode Contrast & Readability

**Problem:** The MDX content components hardcode dark-mode-only colors. Specifically:
- `<p>` and `<li>` use `text-gray-300` regardless of theme — near-invisible on white background
- `<strong>` uses `text-gray-100` — invisible in light mode
- `<code>` uses `bg-white/[0.06]` — invisible in light mode
- `<blockquote>` uses `text-gray-400` — low contrast in light mode
- `<pre>` uses `bg-[#0D1117]` — a dark block on a light page

These aren't "potential" issues — they're actual broken rendering for any visitor in light mode.

**Scope:**
- Update all MDX component styles in `[slug]/page.tsx` to use Tailwind dark: variants
- Use appropriate light-mode text colors (e.g., `text-gray-700 dark:text-gray-300`)
- Ensure code blocks, blockquotes, and inline code have visible backgrounds in both modes
- Verify the header mobile menu light mode styling (currently has hardcoded `bg-[#0A0A0F]/90`)

**Acceptance Criteria:**
- [ ] All MDX body text (p, li, strong, a, code, pre, blockquote) passes WCAG AA contrast in both light and dark mode
- [ ] Code blocks have distinct background in light mode
- [ ] No hardcoded dark-only colors in content area — all use `dark:` variant pairs
- [ ] Mobile menu background is appropriate in light mode
- [ ] Manual QA: toggle theme on a blog post and visually confirm readability

**Estimate:** 1–2 hours

---

### P0-4: Add `loading.tsx` and `error.tsx`

**Problem:** No loading or error states exist. If MDX rendering fails, the user sees a raw Next.js error page. During navigation, there's no loading feedback.

**Scope:**
- Add `src/app/blog/[slug]/loading.tsx` — skeleton matching article layout (title block, meta bar, content lines)
- Add `src/app/blog/[slug]/error.tsx` — "Something went wrong" with retry button, matching site design
- Add `src/app/loading.tsx` — lightweight global loading skeleton
- Add `src/app/error.tsx` — global error boundary

**Acceptance Criteria:**
- [ ] `loading.tsx` renders a skeleton that visually matches the blog post layout (no layout shift on resolve)
- [ ] `error.tsx` shows a styled error message with a "Try again" button and a "Back to home" link
- [ ] Both files use `"use client"` where required
- [ ] `error.tsx` includes `reset()` function call on retry
- [ ] Visually consistent with the glassmorphism design

**Estimate:** 1 hour

---

## P1 — High-Impact Improvements

Not broken, but noticeably missing for a polished production blog. High ROI for reader engagement and SEO.

---

### P1-1: Table of Contents for Long Posts

**Problem:** Both posts are 12–14 min reads with 8+ heading sections. No way for readers to navigate or preview structure.

**Scope:**
- Create `src/components/TableOfContents.tsx` — auto-generated from MDX headings (H2, H3)
- Display as a collapsible section above the article content (mobile-friendly)
- Optionally: sticky sidebar TOC on desktop (≥1280px), inline collapsible on mobile
- Headings need `id` attributes — update MDX `h2`/`h3` components to auto-generate slug IDs
- Highlight active section on scroll (IntersectionObserver)

**Acceptance Criteria:**
- [ ] TOC renders with all H2 and H3 headings from the post
- [ ] Each TOC link scrolls smoothly to the corresponding heading
- [ ] Headings have URL-friendly `id` attributes (e.g., `#what-are-ai-agents`)
- [ ] Active heading is visually highlighted as user scrolls
- [ ] On mobile: collapsible/expandable TOC above content
- [ ] Does not appear if post has ≤2 headings

**Estimate:** 2–3 hours

---

### P1-2: About Page & Author Bios

**Problem:** "NexusAI Team" appears as author but links nowhere. No about page exists. Visitors have no way to know who writes the content — a trust and E-E-A-T signal issue for SEO.

**Scope:**
- Create `src/app/about/page.tsx` with:
  - Blog mission/vision blurb
  - Author card(s) with avatar, name, short bio
  - Link to contact or social profiles
- Add author card at the bottom of blog posts (above newsletter CTA)
- Add "About" link to header navigation (desktop + mobile)
- Include proper `metadata` export for SEO

**Acceptance Criteria:**
- [ ] `/about` page renders and is navigable from header
- [ ] Author card appears on every blog post
- [ ] About page has proper `<title>` and `meta description`
- [ ] Design is consistent with glassmorphism theme
- [ ] Mobile-responsive

**Estimate:** 2 hours

---

### P1-3: Internal Cross-Linking Between Posts

**Problem:** The two existing posts cover adjacent topics (AI agents → blockchain AI integration) but don't link to each other. Internal linking is one of the highest-ROI SEO actions.

**Scope:**
- Edit `ai-agents-automation-2026.mdx`: add 1–2 natural contextual links to the blockchain post
- Edit `blockchain-ai-integration.mdx`: add 1–2 natural contextual links to the AI agents post
- Use descriptive anchor text (not "click here")

**Acceptance Criteria:**
- [ ] Each post contains at least 1 contextual internal link to the other post
- [ ] Links use descriptive anchor text relevant to the target post's topic
- [ ] Links are inline within paragraphs (not tacked on at the end)
- [ ] Links render correctly with the MDX `<a>` component styling

**Estimate:** 30 minutes

---

### P1-4: Favicon & App Icons

**Problem:** Only a default `favicon.ico` exists. No apple-touch-icon, no web manifest. Tab icon is generic.

**Scope:**
- Generate a favicon set from the "N" gradient logo already used in Header/Footer
- Add: `favicon.ico` (multi-size), `apple-touch-icon.png` (180×180), `icon-192.png`, `icon-512.png`
- Add `manifest.json` (or `manifest.webmanifest`) with `name`, `short_name`, `theme_color`, `icons`
- Reference in layout.tsx metadata or `<head>`

**Acceptance Criteria:**
- [ ] Custom favicon visible in browser tab (not default Next.js icon)
- [ ] Apple touch icon renders on iOS "Add to Home Screen"
- [ ] Web manifest is valid (test with Lighthouse)
- [ ] Icon matches the "N" gradient branding used in header

**Estimate:** 1 hour

---

### P1-5: Category Page OG Metadata

**Problem:** Category pages have `openGraph` and `twitter` metadata now (verified in code), but they lack an `images` field — social shares will have no preview image.

**Scope:**
- Add `images: [{ url: \`${SITE_URL}/og-default.png\`, width: 1200, height: 630 }]` to category page `generateMetadata`
- Optionally: create per-category OG images in the future (P2)

**Acceptance Criteria:**
- [ ] Category page social shares include a preview image
- [ ] Twitter card renders with image

**Estimate:** 15 minutes

---

## P2 — Defer (Next Sprint)

These are real improvements but not needed for a credible production launch. Defer to avoid scope creep.

| ID | Item | Reason to Defer |
|----|------|-----------------|
| P2-1 | **Newsletter backend (email capture)** | Current client-only CTA works as a placeholder. Requires choosing a provider (Buttondown, ConvertKit, Resend) and backend integration. Do it when there's an audience to capture. |
| P2-2 | **Analytics integration (GA4/Plausible)** | Important for growth but doesn't affect the reader experience. Can be added post-launch with zero code changes to the UI. |
| P2-3 | **More content (3rd+ posts)** | Content is king, but 2 quality posts is enough to launch. Content velocity is an ongoing effort, not a sprint item. |
| P2-4 | **Search functionality** | With 2 posts, search adds no value. Implement when post count reaches 8–10. |
| P2-5 | **Comments system (Giscus/Disqus)** | Nice for engagement but adds complexity and moderation burden. Launch without. |
| P2-6 | **Breadcrumb structured data** | SEO enhancement but not critical. JSON-LD Article schema is already in place. |
| P2-7 | **Page transition animations** | Polish, not substance. |
| P2-8 | **Component tests & CI pipeline** | Important for team scale but a solo blog doesn't need CI/CD overhead yet. |
| P2-9 | **Scroll-to-top button** | Minor UX convenience. TOC (P1-1) partially solves this. |
| P2-10 | **Tags rendered as links / tag pages** | Tags display on posts but aren't clickable. Low priority with only 2 posts. |

---

## Sprint Summary

| Priority | Items | Total Estimate |
|----------|-------|---------------|
| **P0** (must-fix) | 4 items | ~4.5–6 hours |
| **P1** (high-impact) | 5 items | ~5.5–7 hours |
| **P2** (defer) | 10 items | — |
| **Total in-scope** | **9 items** | **~10–13 hours** |

### Execution Order (Recommended)

1. **P0-2** — Fix footer social links (15 min, quick win)
2. **P0-3** — Fix light mode contrast (1–2h, fixes broken UX)
3. **P0-4** — Add loading/error states (1h, framework hygiene)
4. **P0-1** — Dynamic OG images (2–3h, biggest SEO gap)
5. **P1-5** — Category OG images field (15 min, while doing OG work)
6. **P1-4** — Favicon & app icons (1h, branding)
7. **P1-3** — Internal cross-linking (30 min, content)
8. **P1-1** — Table of Contents (2–3h, engagement)
9. **P1-2** — About page & author bios (2h, trust)

### Definition of Done

- All P0 items pass their acceptance criteria
- All P1 items pass their acceptance criteria
- Vercel preview deployment renders correctly in both dark and light mode
- No console errors on any page
- Lighthouse accessibility score ≥ 90
- OG images validate on opengraph.xyz for at least 1 blog post + homepage

---

*This document supersedes the implementation order in IMPROVEMENT-PLAN.md. That plan was written pre-build; this one reflects the actual current state of the shipped codebase.*
