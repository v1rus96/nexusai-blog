# 🎨 DESIGN-SPECS.md — NexusAI Blog Production Polish

**CDO:** The Agency  
**Date:** 2026-03-19  
**Design System Baseline:** Dark-first glassmorphism, Inter font, blue/violet/cyan accent palette  

---

## Design Tokens Reference

These are the existing tokens. All specs below reference them or introduce new ones explicitly.

| Token | Dark Value | Light Value |
|---|---|---|
| Accent Blue | `#3B82F6` | `#2563EB` |
| Accent Violet | `#8B5CF6` | `#7C3AED` |
| Accent Cyan | `#06B6D4` | `#0891B2` |
| Surface Dark | `#0A0A0F` | — |
| Surface Card | `#12121A` | — |
| Surface Elevated | `#1A1A25` | — |
| Glass Light | `rgba(255,255,255,0.06)` | `rgba(255,255,255,0.6)` |
| Glass Border | `rgba(255,255,255,0.08)` | `rgba(0,0,0,0.06)` |

---

## 1. Dynamic OG Image Design (1200×630)

### Canvas & Background

- **Dimensions:** 1200 × 630 px
- **Background:** Solid `#0A0A0F` base, overlaid with two radial gradient spots:
  - Top-left: `radial-gradient(ellipse 60% 50% at 15% 20%, rgba(59,130,246,0.15), transparent)` — blue glow
  - Bottom-right: `radial-gradient(ellipse 50% 45% at 85% 75%, rgba(139,92,246,0.12), transparent)` — violet glow
- **Noise overlay:** A 2% opacity noise texture across the entire canvas for tactile depth (optional, skip if ImageResponse doesn't support it)

### Layout (Top to Bottom)

```
┌──────────────────────────────────────────────────┐
│  [60px top padding]                              │
│                                                  │
│  ┌─ Category Pill ──────────────────┐            │
│  │  "AI" or "Blockchain"            │            │
│  └──────────────────────────────────┘            │
│  [16px gap]                                      │
│                                                  │
│  Post Title (max 3 lines)                        │
│  ─────────────────────────────                   │
│                                                  │
│  [auto flex-grow spacer]                         │
│                                                  │
│  ┌─ Bottom Bar ─────────────────────────────────┐│
│  │  [N] NexusAI Blog          ai-blockchain-... ││
│  └──────────────────────────────────────────────┘│
│  [48px bottom padding]                           │
└──────────────────────────────────────────────────┘
```

### Element Specifications

**Category Pill:**
- Position: Top-left, `60px` from top, `64px` from left
- Pill background: `rgba(59,130,246,0.15)` with `1px` border `rgba(59,130,246,0.3)`
- Border-radius: `9999px` (full pill)
- Padding: `8px 20px`
- Text: Category name, uppercase
- Font: Inter SemiBold, `16px`, color `#60A5FA` (blue-400)

**Post Title:**
- Position: Below pill, `16px` gap
- Left padding: `64px`, right padding: `64px`
- Font: Inter Bold, `48px`, line-height `1.2`
- Color: `#F9FAFB` (gray-50)
- Max lines: 3 (truncate with `...` if overflow)
- If title ≤ 40 chars: bump to `56px`
- Letter-spacing: `-0.02em` (tracking-tight)

**Bottom Bar:**
- Position: Bottom, `48px` from bottom edge, full width minus `64px` padding each side
- A `1px` horizontal divider line above it, color `rgba(255,255,255,0.08)`, `20px` margin above
- Left side: The "N" gradient square (`32px × 32px`, rounded `8px`, gradient `from-blue-500 to-violet-600`) + `"NexusAI Blog"` in Inter Medium, `18px`, color `#9CA3AF` (gray-400), `12px` gap
- Right side: Domain `ai-blockchain-blog.vercel.app` in Inter Regular, `14px`, color `#6B7280` (gray-500)

### Color Summary for OG

| Element | Color |
|---|---|
| Background | `#0A0A0F` |
| Title text | `#F9FAFB` |
| Category pill bg | `rgba(59,130,246,0.15)` |
| Category pill border | `rgba(59,130,246,0.3)` |
| Category pill text | `#60A5FA` |
| Brand text | `#9CA3AF` |
| Domain text | `#6B7280` |
| Divider | `rgba(255,255,255,0.08)` |

---

## 2. Light Mode Color Refinements (WCAG AA Compliant)

All values below target **≥ 4.5:1** contrast ratio for normal text and **≥ 3:1** for large text against their respective backgrounds.

### 2.1 Page-Level Surfaces

| Element | Dark Mode | Light Mode |
|---|---|---|
| Body background | `#0A0A0F` | `#FAFBFC` |
| Mesh gradient blue | `rgba(59,130,246,0.08)` | `rgba(59,130,246,0.04)` |
| Mesh gradient violet | `rgba(139,92,246,0.07)` | `rgba(139,92,246,0.035)` |
| Mesh gradient cyan | `rgba(6,182,212,0.05)` | `rgba(6,182,212,0.03)` |

### 2.2 Glass Card (Light Mode)

| Property | Value |
|---|---|
| Background | `rgba(255,255,255,0.7)` |
| Border | `1px solid rgba(0,0,0,0.08)` |
| Hover background | `rgba(255,255,255,0.85)` |
| Hover border | `rgba(59,130,246,0.2)` |
| Hover shadow | `0 8px 32px rgba(59,130,246,0.08)` |
| Backdrop-filter | `blur(12px)` (unchanged) |

### 2.3 MDX Content Typography (Light Mode Values)

These are the `html:not(.dark)` / light-mode counterparts. Each MDX component should use Tailwind `dark:` variant pairs.

| Element | Dark Mode Class/Color | Light Mode Color | Contrast on `#FAFBFC` |
|---|---|---|---|
| `<p>`, `<li>` body text | `text-gray-300` / `#D1D5DB` | `#374151` (gray-700) | 10.3:1 ✅ |
| `<strong>` | `text-gray-100` / `#F3F4F6` | `#111827` (gray-900) | 17.4:1 ✅ |
| `<blockquote>` text | `text-gray-400` / `#9CA3AF` | `#4B5563` (gray-600) | 7.0:1 ✅ |
| `<a>` links | `#60A5FA` (blue-400) | `#2563EB` (blue-600) | 4.6:1 ✅ |
| `<a>` underline | `rgba(59,130,246,0.3)` | `rgba(37,99,235,0.3)` | decorative |
| `<code>` inline bg | `rgba(255,255,255,0.06)` | `rgba(37,99,235,0.08)` | — |
| `<code>` inline text | `#93C5FD` (blue-300) | `#1E40AF` (blue-800) | 8.5:1 ✅ |
| `<pre>` code block bg | `#0D1117` | `#F3F4F6` (gray-100) | — |
| `<pre>` border | `rgba(255,255,255,0.06)` | `rgba(0,0,0,0.08)` | — |
| `<blockquote>` bg | `rgba(59,130,246,0.03)` | `rgba(59,130,246,0.05)` | — |
| `<blockquote>` left border | `rgba(59,130,246,0.5)` | `rgba(37,99,235,0.4)` | decorative |
| `<hr>` | `rgba(255,255,255,0.06)` | `rgba(0,0,0,0.08)` | decorative |
| Heading (`h1–h3`) | inherits foreground `#E5E7EB` | inherits foreground `#111827` | 17.4:1 ✅ |

### 2.4 Header (Light Mode)

| Element | Light Mode Value |
|---|---|
| Scrolled header bg | `rgba(250,251,252,0.8)` |
| Scrolled border | `rgba(0,0,0,0.06)` |
| Scrolled shadow | `0 1px 20px rgba(0,0,0,0.06)` |
| Nav link default | `#6B7280` (gray-500) |
| Nav link hover | `#111827` (gray-900) |
| Nav link hover bg | `rgba(0,0,0,0.04)` |
| Mobile menu bg | `rgba(250,251,252,0.95)` |
| Mobile menu border-top | `rgba(0,0,0,0.06)` |
| Divider (ThemeToggle separator) | `rgba(0,0,0,0.08)` |

### 2.5 Footer (Light Mode)

| Element | Light Mode Value |
|---|---|
| Top border | `rgba(0,0,0,0.06)` |
| Brand name | `#6B7280` (gray-500) |
| Nav link default | `#6B7280` (gray-500) |
| Nav link hover | `#111827` (gray-900) |
| Copyright text | `#9CA3AF` (gray-400) — 3.0:1 passes for small decorative text |
| Inner border | `rgba(0,0,0,0.04)` |

### 2.6 Gradient Pill (Light Mode)

| Property | Value |
|---|---|
| Background | `rgba(255,255,255,0.8)` |
| Gradient border | `linear-gradient(135deg, rgba(37,99,235,0.4), rgba(124,58,237,0.4))` |
| Category text | `#2563EB` (blue-600) — 4.6:1 on white ✅ |

### 2.7 Misc Components (Light Mode)

| Component | Property | Light Mode Value |
|---|---|---|
| PostCard description | text color | `#6B7280` (gray-500) |
| Reading time / date | text color | `#6B7280` (gray-500) |
| Newsletter input | bg | `rgba(0,0,0,0.03)` |
| Newsletter input | border | `rgba(0,0,0,0.1)` |
| Newsletter input | text | `#111827` |
| Newsletter input | placeholder | `#9CA3AF` |
| Tag pill text | color | `#6B7280` (gray-500) |
| Selection highlight | bg | `rgba(59,130,246,0.15)` |
| Scrollbar thumb | bg | `rgba(0,0,0,0.12)` |
| Scrollbar thumb hover | bg | `rgba(0,0,0,0.2)` |

---

## 3. About Page Layout

### Route & SEO

- Route: `/about`
- Title: `"About — NexusAI Blog"`
- Meta description: `"Meet the team behind NexusAI Blog — exploring the frontier of AI and blockchain technology."`

### Page Structure

```
┌──────────────────────────────────────────────────┐
│  [Header — existing, add "About" nav link]       │
├──────────────────────────────────────────────────┤
│                                                  │
│  Hero Section                                    │
│  ─────────────                                   │
│  "About NexusAI" (gradient text, same animation) │
│  Tagline: "Where AI Meets Blockchain"            │
│                                                  │
├──────────────────────────────────────────────────┤
│                                                  │
│  Mission Section (glass-card)                    │
│  ─────────────────────────                       │
│  Icon + "Our Mission"                            │
│  2–3 sentences on what the blog covers           │
│  and why it exists                               │
│                                                  │
├──────────────────────────────────────────────────┤
│                                                  │
│  What We Cover (2-column grid)                   │
│  ──────────────────────────                      │
│  [AI Card]          [Blockchain Card]            │
│  Icon + title       Icon + title                 │
│  Brief description  Brief description            │
│                                                  │
├──────────────────────────────────────────────────┤
│                                                  │
│  Team / Author Section                           │
│  ─────────────────────                           │
│  Author card(s) — see spec below                 │
│                                                  │
├──────────────────────────────────────────────────┤
│                                                  │
│  Newsletter CTA (reuse existing component)       │
│                                                  │
├──────────────────────────────────────────────────┤
│  [Footer]                                        │
└──────────────────────────────────────────────────┘
```

### Section Specs

**Hero Section:**
- Max-width: `max-w-3xl mx-auto`, centered text
- Top padding: `pt-16 sm:pt-20`
- Title: "About NexusAI" — use `.animate-gradient-text`, `text-4xl sm:text-5xl font-bold tracking-tight`
- Subtitle: The site tagline, `text-lg text-gray-400`, `mt-4`
- Bottom margin: `mb-16`

**Mission Section:**
- Container: `glass-card rounded-2xl p-8 sm:p-10`
- Decorative icon top-left: A lightbulb or sparkle icon, `text-blue-400`, `24px`
- Heading: "Our Mission" — `text-xl font-bold mb-4`
- Body: 2–3 sentences, `text-gray-400 dark:text-gray-400` / light: `text-gray-600`, `leading-relaxed text-[17px]`
- Bottom margin: `mb-12`

**What We Cover (Topic Cards):**
- Heading: "What We Cover" — `text-2xl font-bold mb-8`
- Grid: `grid sm:grid-cols-2 gap-6`
- Each card: `glass-card rounded-2xl p-6`
  - Icon: Relevant SVG icon (brain for AI, chain-link for Blockchain), `w-10 h-10`, color `#3B82F6` for AI and `#8B5CF6` for Blockchain
  - Title: Category name, `text-lg font-semibold mt-4 mb-2`
  - Description: 1–2 sentences, `text-sm text-gray-400` / light: `text-gray-600`
  - Link: `"Browse [Category] articles →"` — `text-sm text-blue-400`

**Author Card (reusable — also used on blog posts):**
- Container: `glass-card rounded-2xl p-6 sm:p-8`
- Layout: Horizontal on desktop (avatar left, text right), stacked on mobile
- Avatar: `64px × 64px` rounded-xl, gradient background `from-blue-500 to-violet-600`, initial letter `text-2xl font-bold text-white`
- Name: `text-xl font-bold`
- Role: `text-sm text-blue-400` — e.g. "NexusAI Team"
- Bio: 2–3 sentences, `text-gray-400` / light: `text-gray-600`, `text-sm leading-relaxed`
- Gap between avatar and text: `gap-6`

**Author Card on Blog Posts (compact variant):**
- Placed between tags section and "Related Articles"
- Same glass-card style but `p-5 sm:p-6`
- Avatar: `48px × 48px`
- Name: `text-lg font-semibold`
- Bio: 1 sentence, `text-sm text-gray-500`
- Horizontal layout always (avatar left, text right)

---

## 4. Table of Contents Component

### Behavior Rules

- Only renders if the post has **≥ 3** headings (H2 + H3 combined)
- Extracts H2 and H3 headings from MDX content
- Each heading gets a slugified `id` attribute (e.g., "What Are AI Agents?" → `what-are-ai-agents`)

### Desktop Layout (≥ 1280px / `xl` breakpoint)

- **Position:** Sticky sidebar, left side of the article
- **Placement:** Floats in the left margin, `position: sticky`, `top: 96px` (below header)
- **Width:** `220px`
- **Max-height:** `calc(100vh - 128px)`, overflow-y auto with thin scrollbar
- **Left offset:** Positioned outside the `max-w-3xl` article container. Use a wider page wrapper (`max-w-6xl`) with the article centered and TOC absolutely positioned to the left.
- **Vertical start:** Aligns with the top of the article content (below the post header)

**Visual Style (Desktop):**
- Container: No background (transparent), no border — clean and minimal
- Left edge: A `2px` vertical line, `rgba(255,255,255,0.04)` dark / `rgba(0,0,0,0.04)` light
- Each item:
  - Font: Inter, `13px`, `font-medium`
  - H2 items: `padding-left: 12px`
  - H3 items: `padding-left: 24px` (indented)
  - Default color: `#6B7280` (gray-500)
  - Hover color: `#D1D5DB` (gray-300) dark / `#374151` (gray-700) light
  - **Active item:** `color: #60A5FA` (blue-400) dark / `#2563EB` (blue-600) light, plus the left `2px` line segment turns `#3B82F6` for that item's height
  - Transition: `color 200ms, border-color 200ms`
- Item spacing: `8px` vertical gap between items

### Mobile Layout (< 1280px)

- **Position:** Inline, above article content (below post header, above MDX body)
- **Default state:** Collapsed (only shows "Table of Contents" label + chevron)
- **Expanded state:** Full list of links visible

**Visual Style (Mobile):**
- Container: `glass-card rounded-xl p-4`
- Toggle bar: Flex row with "Table of Contents" `text-sm font-semibold` + chevron icon (`w-4 h-4`), full-width clickable
- Chevron rotates `180deg` on expand, `transition-transform 200ms`
- List: `mt-3`, each item `py-1.5`
- Font: `13px`, `text-gray-500` default, `text-blue-400` active
- H3 indent: `ml-4`
- Max-height on expand: `320px`, overflow-y auto
- Collapse animation: `max-height` transition `300ms ease`
- After clicking a TOC link on mobile: auto-collapse the TOC

### Active Section Detection

- Use `IntersectionObserver` with `rootMargin: "-80px 0px -70% 0px"` (highlights heading when it enters the top ~30% of viewport)
- Only one item active at a time
- Smooth-scroll on click: `scroll-behavior: smooth` already set on `html`
- Scroll offset: Account for `64px` sticky header by using `scroll-margin-top: 80px` on all heading elements

---

## 5. Footer Improvements

### Problem

Current footer has placeholder social links to generic `twitter.com` and `linkedin.com`. This signals the site is fake.

### Recommended Design: Remove Social Icons, Add Value

Replace the social icons with useful links and a brief brand statement.

### Revised Layout

```
┌──────────────────────────────────────────────────┐
│  Border-top (1px, rgba(255,255,255,0.06) dark /  │
│  rgba(0,0,0,0.06) light)                        │
│                                                  │
│  Row 1: Brand + Navigation                       │
│  ──────────────────────                          │
│  Left: [N] NexusAI Blog                          │
│  Right: AI · Blockchain · About · RSS            │
│                                                  │
│  Row 2: Tagline                                  │
│  ──────────                                      │
│  Center: "Exploring the frontier of AI &         │
│  blockchain technology."                         │
│  (text-sm, text-gray-500)                        │
│                                                  │
│  Inner border (1px, rgba(255,255,255,0.04) dark /│
│  rgba(0,0,0,0.04) light)                        │
│                                                  │
│  Row 3: Copyright                                │
│  ────────────                                    │
│  Center: © 2026 NexusAI Blog. All rights         │
│  reserved.                                       │
│                                                  │
└──────────────────────────────────────────────────┘
```

### Specs

- Container: `max-w-6xl mx-auto`, `px-4 sm:px-6 lg:px-8`, `py-12`
- **Row 1:** `flex flex-col sm:flex-row items-center justify-between gap-6`
  - Brand: Same as current — `[N]` gradient icon `24px` + name `text-sm font-semibold text-gray-400`
  - Navigation: Category links + "About" + "RSS"
    - Style: `text-sm text-gray-500 hover:text-gray-300` dark / `hover:text-gray-900` light
    - Gap: `gap-6` between links
    - Separator dots: Use `·` (middle dot) between items, `text-gray-600`
- **Row 2:** `mt-6 text-center`
  - Text: Site description (from constants), `text-sm text-gray-500/80`, `max-w-md mx-auto`
- **Inner border:** `mt-8 pt-6 border-t` (same as current)
- **Row 3:** Copyright, `text-xs text-gray-600` centered (same as current)

### What's Removed

- X (Twitter) icon + link
- LinkedIn icon + link

### What's Added

- "About" nav link in footer
- Site tagline / description line
- The "About" link only appears once the About page (P1-2) exists

---

## 6. Loading Skeleton Design

### Design Principles

- Skeletons mirror the actual layout dimensions to prevent layout shift (CLS = 0)
- Use animated shimmer: a diagonal gradient sweep
- Dark mode skeleton bg: `rgba(255,255,255,0.04)` with shimmer highlight `rgba(255,255,255,0.08)`
- Light mode skeleton bg: `rgba(0,0,0,0.04)` with shimmer highlight `rgba(0,0,0,0.06)`
- Border-radius matches the element being skeletonized
- Animation: A `1.5s` infinite linear shimmer moving left-to-right

### 6.1 Blog Post Skeleton (`/blog/[slug]/loading.tsx`)

```
┌──────────────────────────────────────────────────┐
│  max-w-3xl mx-auto                               │
│                                                  │
│  [Skeleton pill: 64×28, rounded-full] [date bar: │
│   120×16] [time bar: 80×16]                      │
│  gap-3, mb-6                                     │
│                                                  │
│  [Title line 1: 100% × 40px, rounded-lg]         │
│  [Title line 2: 75% × 40px, rounded-lg]          │
│  gap-3, mb-5                                     │
│                                                  │
│  [Description: 100% × 20px]                      │
│  [Description: 60% × 20px]                       │
│  gap-2, mb-8                                     │
│                                                  │
│  [Author avatar: 40×40, rounded-xl] +            │
│  [Name: 120×16] + [Role: 60×12]                  │
│  mb-8                                            │
│                                                  │
│  [Border: 1px, full width]                       │
│                                                  │
│  [Content paragraph: 100% × 16px] × 4 lines     │
│  [gap: 12px between lines]                       │
│  [30px gap]                                      │
│  [Content paragraph: 100% × 16px] × 3 lines     │
│  [30px gap]                                      │
│  [Content paragraph: 90% × 16px] × 5 lines      │
│                                                  │
└──────────────────────────────────────────────────┘
```

**Skeleton element styles:**
- Skeleton bar: `rounded-lg` (8px), height as specified
- Skeleton pill: `rounded-full`
- Skeleton circle/square: `rounded-xl`
- All: `bg-white/[0.04] dark:bg-white/[0.04]` / light: `bg-gray-200/60`
- Shimmer overlay: `animate-shimmer` — linear-gradient `90deg`: transparent 0%, highlight at 50%, transparent 100%; `background-size: 200% 100%`

### 6.2 Homepage / Category Page Skeleton (`/loading.tsx`, category loading)

```
┌──────────────────────────────────────────────────┐
│  max-w-6xl mx-auto                               │
│                                                  │
│  [Hero section skeleton]                         │
│  [Title: 50% × 48px, centered]                   │
│  [Subtitle: 35% × 20px, centered]               │
│  mb-16                                           │
│                                                  │
│  [Featured Post Card Skeleton]                   │
│  glass-card, rounded-2xl, p-8                    │
│  [Pill: 64×28] [Date: 120×16] [Time: 80×16]     │
│  [Title: 90% × 32px]                            │
│  [Title: 60% × 32px]                            │
│  [Desc: 100% × 16px] × 2                        │
│  [CTA: 120×16]                                   │
│  mb-8                                            │
│                                                  │
│  [Post Cards Grid: sm:grid-cols-2, gap-6]        │
│  Each card: glass-card, rounded-2xl, p-6         │
│  [Pill + meta line]                              │
│  [Title: 80% × 24px]                            │
│  [Desc: 100% × 14px] × 2                        │
│  [CTA: 100×14]                                   │
│                                                  │
└──────────────────────────────────────────────────┘
```

### 6.3 Shimmer Animation Spec

```
@keyframes shimmer {
  0%   { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

.animate-shimmer {
  background: linear-gradient(
    90deg,
    transparent 25%,
    rgba(255,255,255,0.06) 50%,   /* dark mode highlight */
    transparent 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite linear;
}

/* Light mode */
html:not(.dark) .animate-shimmer {
  background: linear-gradient(
    90deg,
    transparent 25%,
    rgba(0,0,0,0.04) 50%,
    transparent 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite linear;
}
```

---

## 7. Typography & Spacing Refinements for Article Readability

### Current Issues

1. Body text at `17px` is good, but line-height `1.8` creates slightly too much vertical air for shorter paragraphs
2. No `max-width` constraint on text lines — on very wide viewports within `max-w-3xl`, lines can hit ~85 characters (ideal: 65–75)
3. Headings lack sufficient whitespace above to create clear section breaks
4. Code blocks feel disconnected from surrounding text

### Recommended Refinements

**Body Text (`<p>`, `<li>`):**
- Font size: `17px` ✅ (keep)
- Line-height: `1.75` (slightly tighter than 1.8 — reduces air while keeping readability)
- Paragraph spacing: `my-6` (increase from `my-5` — more breathing room between paragraphs)
- Max character width: Apply `max-w-[680px]` to the prose container (this naturally limits to ~70 characters per line at 17px Inter)

**Headings:**
- `<h2>`: `mt-14 mb-5` (increase from `mt-12 mb-4`) — more space above for clear section breaks
- `<h3>`: `mt-10 mb-4` (increase from `mt-8 mb-3`)
- Add `scroll-margin-top: 80px` to all headings (for TOC smooth-scroll with sticky header offset)
- H2: Keep `text-2xl font-bold tracking-tight`
- H3: Keep `text-xl font-semibold`

**Lists (`<ul>`, `<ol>`):**
- Keep `my-5 ml-6 space-y-2` ✅
- Increase `space-y-2` to `space-y-2.5` for slightly more list item spacing

**Blockquotes:**
- Increase left padding: `pl-6` (from `pl-5`)
- Add top/bottom margin: `my-10` (from `my-8`) — more separation from body text
- Border-left width: `3px` (from `2px`) — slightly bolder accent

**Code Blocks (`<pre>`):**
- Keep `my-8` ✅
- Add `text-[14px]` explicitly (ensure consistency)
- Line-height within code: `1.6` (slightly more than default `leading-relaxed`)
- Padding: `p-6` (increase from `p-5`) for more internal breathing room

**Inline Code (`<code>`):**
- Padding: `px-2 py-1` (increase from `px-1.5 py-0.5`) — more comfortable
- Font-size: `0.875em` relative to parent (ensure it doesn't look oversized)

**Horizontal Rule (`<hr>`):**
- Keep `my-10` ✅
- Consider `my-12` for stronger section separation

**Links (`<a>`):**
- Underline offset: `underline-offset-[6px]` (increase from `underline-offset-4`) — gives more space between text and underline for cleaner look
- Hover: Add subtle `decoration-2` (thicker underline on hover) for tactile feedback

### Spacing Summary Table

| Element | Current | Recommended |
|---|---|---|
| `<p>` margin | `my-5` | `my-6` |
| `<p>` line-height | `1.8` | `1.75` |
| `<h2>` top margin | `mt-12` | `mt-14` |
| `<h2>` bottom margin | `mb-4` | `mb-5` |
| `<h3>` top margin | `mt-8` | `mt-10` |
| `<h3>` bottom margin | `mb-3` | `mb-4` |
| `<blockquote>` margin | `my-8` | `my-10` |
| `<blockquote>` left border | `2px` | `3px` |
| `<blockquote>` left padding | `pl-5` | `pl-6` |
| `<pre>` padding | `p-5` | `p-6` |
| `<code>` padding | `px-1.5 py-0.5` | `px-2 py-1` |
| `<ul>/<ol>` item spacing | `space-y-2` | `space-y-2.5` |
| `<a>` underline offset | `4px` | `6px` |
| Heading scroll-margin-top | none | `80px` |
| Prose max-width | none (uses `max-w-3xl`) | `max-w-[680px]` on content area |

---

## 8. Error Page Design

### `/blog/[slug]/error.tsx` and `/error.tsx`

**Layout:**
- Centered vertically and horizontally within viewport: `min-h-[60vh] flex items-center justify-center`
- Container: `max-w-md mx-auto text-center px-4`

**Elements:**
1. **Icon:** A warning/alert icon or the "N" logo with a glitch effect
   - `w-16 h-16 mx-auto mb-6`
   - Use the gradient brand colors but with reduced opacity (`opacity-50`) to convey "something's off"
2. **Heading:** "Something went wrong" — `text-2xl font-bold mb-3`
3. **Description:** "We couldn't load this page. Please try again." — `text-gray-400 mb-8 text-sm`
4. **Buttons:** Two actions side by side
   - "Try again" — primary: `bg-gradient-to-r from-blue-500 to-violet-600 text-white font-semibold rounded-xl px-6 py-3 text-sm` (calls `reset()`)
   - "Back to home" — secondary: `glass-card rounded-xl px-6 py-3 text-sm font-medium text-gray-400 hover:text-white` (links to `/`)
   - Gap: `gap-3`, `flex justify-center`

**Colors match existing theme — no new tokens needed.**

---

## Appendix: Navigation Update

Add "About" to the navigation in both Header and Footer:

**Header desktop nav:** Insert between last category link and RSS:
```
...Categories... | About | RSS | [ThemeToggle]
```

**Header mobile menu:** Insert before RSS.

**Footer nav:** Insert between last category and RSS:
```
AI · Blockchain · About · RSS
```

**Style:** Same as existing nav links — no new styling needed.

---

*End of design specifications. This document provides all visual values needed for implementation without containing any code.*
