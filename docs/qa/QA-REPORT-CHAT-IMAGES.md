# QA Report: Chat Widget & Blog Images

**QA Lead:** 🧪 The Agency QA  
**Date:** 2026-03-19  
**Scope:** Tawk.to chat widget integration + SVG blog images  
**Source Specs:** [SUPPORT-SYSTEM-SPEC.md](../specs/SUPPORT-SYSTEM-SPEC.md), [DESIGN-SPEC.md](../design/DESIGN-SPEC.md)

---

## 1. Build

| # | Check | Result |
|---|---|---|
| 1.1 | `npm run build` completes with zero errors | ✅ **PASS** |
| 1.2 | All 16 routes generated (static + SSG) | ✅ **PASS** |

---

## 2. Chat Widget (Tawk.to)

| # | Check | Result |
|---|---|---|
| 2.1 | Tawk.to `<Script>` tag exists in `src/app/layout.tsx` | ✅ **PASS** |
| 2.2 | Uses `strategy="lazyOnload"` for async loading | ✅ **PASS** |
| 2.3 | No hardcoded API keys (uses placeholder `PROPERTY_ID_HERE/default`) | ✅ **PASS** |
| 2.4 | Imports `Script` from `next/script` | ✅ **PASS** |
| 2.5 | Custom style config matches spec (position `br`, offsets for desktop/mobile) | ✅ **PASS** |

---

## 3. SVG Images Exist

| # | File | Size | Result |
|---|---|---|---|
| 3.1 | `public/images/blog/ai-agents-hero.svg` | 6,304 B | ✅ **PASS** |
| 3.2 | `public/images/blog/ai-agents-workflow.svg` | 4,334 B | ✅ **PASS** |
| 3.3 | `public/images/blog/ai-agents-ecosystem.svg` | 7,317 B | ✅ **PASS** |
| 3.4 | `public/images/blog/blockchain-ai-hero.svg` | 8,991 B | ✅ **PASS** |
| 3.5 | `public/images/blog/blockchain-ai-architecture.svg` | 7,329 B | ✅ **PASS** |
| 3.6 | `public/images/blog/blockchain-ai-usecases.svg` | 6,443 B | ✅ **PASS** |

All files >1KB ✅

---

## 4. MDX Content

| # | Check | Result |
|---|---|---|
| 4.1 | `ai-agents-automation-2026.mdx` has `image` field in frontmatter (`/images/blog/ai-agents-hero.svg`) | ✅ **PASS** |
| 4.2 | `blockchain-ai-integration.mdx` has `image` field in frontmatter (`/images/blog/blockchain-ai-hero.svg`) | ✅ **PASS** |
| 4.3 | `ai-agents-automation-2026.mdx` references inline images: `ai-agents-workflow.svg`, `ai-agents-ecosystem.svg` | ✅ **PASS** |
| 4.4 | `blockchain-ai-integration.mdx` references inline images: `blockchain-ai-usecases.svg`, `blockchain-ai-architecture.svg` | ✅ **PASS** |
| 4.5 | All referenced image paths match actual files in `public/images/blog/` | ✅ **PASS** |

---

## 5. Components

| # | Check | Result |
|---|---|---|
| 5.1 | `PostCard.tsx` imports `Image` from `next/image` | ✅ **PASS** |
| 5.2 | `PostCard.tsx` displays post image conditionally (`post.image &&`) | ✅ **PASS** |
| 5.3 | `PostCard.tsx` uses `<Image>` with `fill`, `sizes`, `loading="lazy"` | ✅ **PASS** |
| 5.4 | `blog/[slug]/page.tsx` imports `Image` from `next/image` | ✅ **PASS** |
| 5.5 | `blog/[slug]/page.tsx` renders hero image in article header (`post.image &&`) | ✅ **PASS** |
| 5.6 | Hero image uses `priority` loading (above the fold) | ✅ **PASS** |
| 5.7 | Both components use `next/image` for optimization | ✅ **PASS** |

---

## 6. SVG Quality

| # | Check | Result |
|---|---|---|
| 6.1 | `ai-agents-hero.svg` — has proper `viewBox="0 0 1200 630"`, valid SVG structure with gradients, filters, shapes | ✅ **PASS** |
| 6.2 | `blockchain-ai-usecases.svg` — has proper `viewBox="0 0 800 800"`, radial layout with hub + 6 spokes, icons, labels | ✅ **PASS** |
| 6.3 | All SVGs are >1KB (smallest: 4,334 B, largest: 8,991 B) | ✅ **PASS** |
| 6.4 | SVGs contain real illustration content (gradients, filters, glow effects, geometric shapes) — not empty/broken | ✅ **PASS** |

---

## 7. Accessibility

| # | Check | Result |
|---|---|---|
| 7.1 | `ai-agents-automation-2026.mdx` inline images have alt text in markdown syntax | ✅ **PASS** |
| 7.2 | `blockchain-ai-integration.mdx` inline images have alt text in markdown syntax | ✅ **PASS** |
| 7.3 | `PostCard.tsx` — Image `alt` set to `post.title` | ✅ **PASS** |
| 7.4 | `blog/[slug]/page.tsx` — Hero image `alt` set to `post.title` | ✅ **PASS** |

---

## Summary

| Section | Result |
|---|---|
| 1. Build | ✅ PASS |
| 2. Chat Widget | ✅ PASS |
| 3. SVG Images Exist | ✅ PASS |
| 4. MDX Content | ✅ PASS |
| 5. Components | ✅ PASS |
| 6. SVG Quality | ✅ PASS |
| 7. Accessibility | ✅ PASS |

---

## Overall Verdict: ✅ APPROVE

All validation checks pass. The Tawk.to chat widget is properly integrated with lazy loading and placeholder credentials. All 6 SVG blog images exist, are well-structured illustrations with proper viewBox attributes, and are correctly referenced in both MDX frontmatter and inline content. Components use `next/image` for optimization with appropriate alt text. Build completes cleanly with zero errors.
