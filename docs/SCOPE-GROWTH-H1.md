# 📦 SCOPE: Blog Growth H1 — Foundation Sprint

**Date:** 2026-03-19  
**Owner:** CPO  
**Blog:** https://ai-blockchain-blog.vercel.app  
**Stack:** Next.js 16, React 19, MDX, Vercel  
**Source:** `/data/ai-blockchain-blog/`  
**Strategy ref:** `/home/ubuntu/.openclaw/workspace/blog-growth-strategy.md`

---

## Current State (Verified)

- **6 posts** in `content/posts/`
- **Newsletter:** Buttondown integration exists in `NewsletterSignup.tsx` — uses `no-cors` fetch to Buttondown embed API. `BUTTONDOWN_USERNAME` set in `constants.ts`. Needs live verification (does the Buttondown account exist? Do submissions actually land?)
- **Brand:** Rebranded to "TechLion Blog" in `constants.ts` (`SITE_NAME = "TechLion Blog"`)
- **No `/subscribe` page** — no route exists at `src/app/subscribe/`
- **No `/tags` pages** — no route exists at `src/app/tags/`
- **No `/author` pages** — no route exists at `src/app/author/`
- **`AuthorCard` component** exists but has no dynamic author routing

---

## Deliverable 1: Newsletter Fix

**Owner:** CTO (code) + CMO (verification)

### Tasks
- Verify Buttondown account is active and `BUTTONDOWN_USERNAME` matches a real account
- Submit a test email and confirm it appears in Buttondown dashboard
- If broken: fix the integration (consider switching from `no-cors` to a server-side API route using Buttondown API key for reliable response handling)
- Create `/subscribe` page at `src/app/subscribe/page.tsx` — standalone page with the `NewsletterSignup` component, SEO meta, and value proposition copy
- Add `/subscribe` link to Header nav and Footer

### Acceptance Criteria
- [ ] Test email submitted via the form appears in Buttondown subscriber list
- [ ] `/subscribe` page renders, is indexed (in sitemap), has proper meta tags
- [ ] Header and Footer link to `/subscribe`
- [ ] Form shows correct success/error states (not just opaque `no-cors` assumption)

### Dependencies
- Valid Buttondown account credentials
- `BUTTONDOWN_API_KEY` env var if switching to server-side route

---

## Deliverable 2: 4 New Blog Posts

**Owner:** CMO (content creation) + CTO (MDX setup, review)

### Posts

| # | Title | Type | Target Length | Target Keyword |
|---|-------|------|--------------|----------------|
| 1 | "What is Decentralized AI? The Complete Guide" | Pillar | 2000+ words | decentralized AI |
| 2 | "Top 10 AI + Blockchain Projects to Watch in 2026" | Listicle | 1500 words | AI blockchain projects 2026 |
| 3 | "Fetch.ai vs SingularityNET vs Ocean Protocol: Compared" | Comparison | 1500 words | fetch.ai vs singularitynet |
| 4 | "How AI Agents Use Smart Contracts: A Developer's Guide" | Tutorial | 2000 words | AI agents smart contracts |

### Per-Post Requirements
- MDX file in `content/posts/` following existing frontmatter schema
- Target keyword in: title, H1, meta description, first 100 words, URL slug
- 2-3 internal links to existing posts
- 1-2 external links to authoritative sources
- FAQ section (3-5 questions) with JSON-LD FAQ schema
- OG image auto-generated via existing `opengraph-image.tsx`
- Quiz added to `src/data/quizzes.ts` for each post
- Author set to "Firuz Akhmadov" (see Deliverable 3)

### Acceptance Criteria
- [ ] All 4 posts render at `/blog/[slug]` without errors
- [ ] Each post meets minimum word count
- [ ] Each post has working internal links, external links, and FAQ section
- [ ] Each post appears in sitemap and RSS feed
- [ ] Lighthouse SEO score ≥ 90 on each post page
- [ ] Quiz exists and functions for each post

### Dependencies
- Deliverable 3 (author pages) should be in progress — posts should reference new author
- Existing frontmatter schema and quiz format as templates

---

## Deliverable 3: Author Pages

**Owner:** CTO (code) + CMO (author bio content)

### Tasks
- Create author data model (e.g., `src/data/authors.ts` or YAML/JSON)
  - Fields: slug, name, bio, avatar, social links (Twitter, LinkedIn, GitHub)
- Create `/author/[slug]/page.tsx` — lists all posts by that author, shows bio card
- Update all existing 6 posts: change author from "NexusAI Team" to "Firuz Akhmadov"
- Update `AuthorCard` component to link to `/author/[slug]`
- Add author structured data (`Person` schema) to post pages
- Generate static params for author pages

### Acceptance Criteria
- [ ] `/author/firuz-akhmadov` page renders with bio, avatar, social links, and all posts
- [ ] All 6 existing posts + 4 new posts show "Firuz Akhmadov" as author
- [ ] Author name on post pages links to `/author/firuz-akhmadov`
- [ ] Author page included in sitemap
- [ ] `Person` JSON-LD schema present on author page

### Dependencies
- Author bio, headshot photo, and social links from Firuz
- No blocker on other deliverables

---

## Deliverable 4: Tags/Categories Pages

**Owner:** CTO (code) + CMO (tag taxonomy)

### Tasks
- Define tag taxonomy from existing posts + new posts (e.g., "AI Agents", "DeFi", "Zero-Knowledge", "Decentralized AI", "Smart Contracts", "Blockchain", "Machine Learning")
- Add `tags` field to post frontmatter (if not already present)
- Tag all existing 6 posts + 4 new posts
- Create `/tags/page.tsx` — index page listing all tags with post counts
- Create `/tags/[tag]/page.tsx` — filtered post list for each tag
- Add tag links to post cards and post detail pages
- Add `/tags` to Header/Footer navigation
- Generate static params for all tag pages

### Acceptance Criteria
- [ ] `/tags` page renders with all tags and post counts
- [ ] `/tags/[tag]` pages render correct filtered posts (e.g., `/tags/ai-agents`)
- [ ] Every post has at least 1 tag, max 5
- [ ] Tag pages are in sitemap
- [ ] Tag links visible on `PostCard` and blog post pages
- [ ] Tags have proper meta titles/descriptions for SEO (e.g., "AI Agents Articles — TechLion Blog")

### Dependencies
- Agreement on tag taxonomy (CMO defines, CTO implements)
- Must be done before or in parallel with Deliverable 2 (new posts need tags)

---

## Deliverable 5: Cross-Posting Guide

**Owner:** CMO

### Tasks
- Create doc at `/data/ai-blockchain-blog/docs/CROSS-POSTING-GUIDE.md`
- Cover platforms: Medium, dev.to, Hashnode
- Include per-platform instructions:
  - Account setup
  - How to set canonical URL (critical for SEO — always point back to TechLion Blog)
  - Formatting differences and gotchas
  - Optimal posting timing
  - How to add CTAs that drive traffic back to the blog
- Include a cross-posting checklist template

### Acceptance Criteria
- [ ] Guide exists at `docs/CROSS-POSTING-GUIDE.md`
- [ ] Covers Medium, dev.to, and Hashnode with step-by-step instructions
- [ ] Canonical URL setup explained for each platform
- [ ] Includes a reusable checklist for each new cross-post
- [ ] Reviewed by CTO for technical accuracy

### Dependencies
- None — can be done independently and first

---

## Ownership Summary

| Deliverable | CTO | CMO |
|-------------|-----|-----|
| 1. Newsletter Fix | Code: API route, `/subscribe` page, nav links | Verify Buttondown account, test flow |
| 2. 4 New Posts | MDX setup, quiz integration, review | Research, write, SEO optimize |
| 3. Author Pages | Author data model, routes, schema | Bio copy, headshot, social links |
| 4. Tags Pages | Routes, static generation, UI | Define taxonomy, tag existing posts |
| 5. Cross-Posting Guide | Review for accuracy | Write the guide |

---

## Suggested Execution Order

```
Week 1:  [5] Cross-Posting Guide (no deps, quick win)
         [1] Newsletter Fix (critical path)
         [3] Author Pages (unblocks post authorship)
         [4] Tags Pages (unblocks post tagging)

Week 2:  [2] Blog Posts 1-2 (pillar + listicle)

Week 3:  [2] Blog Posts 3-4 (comparison + tutorial)
         Cross-post first 2 posts to dev.to/Hashnode/Medium
```

---

## Out of Scope (H2+)

- Social media account creation and content cadence
- Backlink building campaign
- Email drip sequences / lead magnets
- Community (Discord/Telegram) setup
- Monetization (affiliate, sponsored, job board)
- Exit-intent popups / advanced CRO
- Video content

---

*Scoped by 📦 CPO — 2026-03-19*
