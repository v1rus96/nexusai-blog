# NexusAI Blog — Design Specification

> 🎨 **Produced by:** CDO (Chief Design Officer) — The Agency
> **Date:** 2026-03-19
> **Status:** Ready for Implementation

---

## Table of Contents

- [Part A: Chat Widget Appearance Spec](#part-a-chat-widget-appearance-spec)
- [Part B: Blog Image Style Guide](#part-b-blog-image-style-guide)

---

## Design System Reference

All designs inherit from the existing NexusAI Blog design tokens:

| Token | Value | Usage |
|---|---|---|
| `--color-accent-blue` | `#3B82F6` | Primary accent, links, user actions |
| `--color-accent-violet` | `#8B5CF6` | Secondary accent, gradients |
| `--color-accent-cyan` | `#06B6D4` | Tertiary accent, highlights |
| `--color-surface-dark` | `#0A0A0F` | Page background |
| `--color-surface-card` | `#12121A` | Card backgrounds |
| `--color-surface-elevated` | `#1A1A25` | Elevated surfaces |
| `--color-glass-light` | `rgba(255,255,255,0.06)` | Glass fill |
| `--color-glass-border` | `rgba(255,255,255,0.08)` | Glass border default |
| `--color-glass-border-hover` | `rgba(255,255,255,0.15)` | Glass border hover |
| Font | Inter | All text |
| Transition | `0.3s cubic-bezier(0.4, 0, 0.2, 1)` | All interactive elements |

**Gradient formula (reused everywhere):**
```
linear-gradient(135deg, #3B82F6, #8B5CF6, #06B6D4)
```

**Light mode adjustments:** Deeper saturated variants — `#2563EB`, `#7C3AED`, `#0891B2`.

---

# Part A: Chat Widget Appearance Spec

## A.1 — Trigger Button (FAB)

| Property | Value |
|---|---|
| **Size** | 56 × 56 px |
| **Shape** | Circle (`border-radius: 50%`) |
| **Position** | Fixed, bottom-right: `bottom: 24px; right: 24px` |
| **Z-index** | `9999` |
| **Background** | `linear-gradient(135deg, #3B82F6, #8B5CF6, #06B6D4)` |
| **Shadow** | `0 4px 20px rgba(59, 130, 246, 0.35)` |
| **Icon** | Chat bubble icon (e.g., Lucide `MessageCircle`), 24px, `#FFFFFF` |
| **Hover** | Scale to `1.08`, shadow intensifies to `0 6px 28px rgba(139, 92, 246, 0.45)` |
| **Active/pressed** | Scale `0.95` |
| **Transition** | `all 0.2s ease-out` |

### Pulse Animation

A concentric ring radiates outward to draw attention on first visit or after inactivity:

```
@keyframes chat-pulse {
  0%   { box-shadow: 0 0 0 0 rgba(139, 92, 246, 0.5); }
  70%  { box-shadow: 0 0 0 14px rgba(139, 92, 246, 0); }
  100% { box-shadow: 0 0 0 0 rgba(139, 92, 246, 0); }
}
```

- **Duration:** 2s, infinite loop
- **Behavior:** Stops after first click; re-triggers after 60s of inactivity if widget is closed
- **Accessibility:** `prefers-reduced-motion: reduce` → disable pulse, use subtle opacity fade instead

### Open → Close State Transition

When widget opens, the button icon morphs:
- **Closed state:** `MessageCircle` icon
- **Open state:** `X` (close) icon, 20px
- **Transition:** 180° rotation + crossfade over 0.25s
- **Background remains:** gradient (no change)

### Light Mode Variant

| Property | Change |
|---|---|
| **Background** | `linear-gradient(135deg, #2563EB, #7C3AED, #0891B2)` |
| **Shadow** | `0 4px 20px rgba(37, 99, 235, 0.25)` |
| **Icon** | Stays `#FFFFFF` |

---

## A.2 — Chat Window

### Container

| Property | Value |
|---|---|
| **Width** | 380px |
| **Height** | 520px |
| **Position** | Fixed, `bottom: 92px; right: 24px` (sits above FAB) |
| **Border radius** | `16px` |
| **Background** | `rgba(18, 18, 26, 0.85)` — maps to `surface-card` with alpha |
| **Backdrop filter** | `blur(20px) saturate(1.3)` |
| **Border** | `1px solid rgba(255, 255, 255, 0.08)` (`glass-border`) |
| **Shadow** | `0 24px 64px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(139, 92, 246, 0.08)` |
| **Z-index** | `9998` |
| **Overflow** | Hidden (children handle scroll) |

### Open/Close Animation

```
Entry:  transform: translateY(16px) scale(0.95) → translateY(0) scale(1)
        opacity: 0 → 1
        duration: 0.25s ease-out
        transform-origin: bottom right

Exit:   reverse, 0.2s ease-in
```

### Light Mode Variant

| Property | Change |
|---|---|
| **Background** | `rgba(255, 255, 255, 0.88)` |
| **Border** | `1px solid rgba(0, 0, 0, 0.08)` |
| **Shadow** | `0 24px 64px rgba(0, 0, 0, 0.12), 0 0 0 1px rgba(59, 130, 246, 0.1)` |

---

## A.3 — Header Bar

| Property | Value |
|---|---|
| **Height** | 56px |
| **Background** | `linear-gradient(135deg, #3B82F6, #8B5CF6)` |
| **Border radius** | `16px 16px 0 0` (inherits from container top) |
| **Padding** | `0 16px` |
| **Layout** | Flex row, `align-items: center`, `justify-content: space-between` |

### Content (left to right)

1. **Bot avatar:** 32px circle, `#FFFFFF` background at 15% opacity, robot/sparkle icon inside (16px, white)
2. **Title group** (flex column, gap 2px):
   - Title: `"NexusAI Support"` — 14px, font-weight 600, `#FFFFFF`
   - Subtitle: `"Online · Typically replies instantly"` — 11px, font-weight 400, `rgba(255,255,255,0.7)`
3. **Online indicator:** 8px circle, `#22C55E`, with subtle `box-shadow: 0 0 6px rgba(34,197,94,0.5)`, positioned as dot after "Online"
4. **Close button (right):** 28px hit area, `X` icon 16px, `rgba(255,255,255,0.7)`, hover → `#FFFFFF`

### Light Mode

Same gradient — the header stays vibrant in both modes. Text stays white.

---

## A.4 — Message Area

| Property | Value |
|---|---|
| **Height** | Fills between header (56px) and input bar (64px) → `calc(100% - 120px)` = ~400px |
| **Padding** | `16px` |
| **Overflow-y** | `auto` (smooth scroll) |
| **Background** | Transparent (inherits from container glass) |
| **Scrollbar** | 4px wide, `rgba(255,255,255,0.08)` thumb, transparent track |

### Bot Message Bubble

| Property | Value |
|---|---|
| **Alignment** | Left |
| **Max-width** | `80%` of message area |
| **Background** | `rgba(255, 255, 255, 0.05)` (glass-card style) |
| **Border** | `1px solid rgba(255, 255, 255, 0.06)` |
| **Border radius** | `12px 12px 12px 4px` (notch bottom-left) |
| **Padding** | `10px 14px` |
| **Text** | 13px, `#E5E7EB`, line-height 1.5 |
| **Timestamp** | 10px, `rgba(255,255,255,0.4)`, below bubble, left-aligned |

### User Message Bubble

| Property | Value |
|---|---|
| **Alignment** | Right |
| **Max-width** | `80%` of message area |
| **Background** | `#3B82F6` (accent-blue, solid) |
| **Border** | none |
| **Border radius** | `12px 12px 4px 12px` (notch bottom-right) |
| **Padding** | `10px 14px` |
| **Text** | 13px, `#FFFFFF`, line-height 1.5 |
| **Timestamp** | 10px, `rgba(255,255,255,0.5)`, below bubble, right-aligned |

### Typing Indicator (Bot)

Three dots in a bot-style bubble, animated sequentially:
```
@keyframes typing-dot {
  0%, 60%, 100% { opacity: 0.3; transform: translateY(0); }
  30%            { opacity: 1;   transform: translateY(-4px); }
}
```
- Dot size: 6px circles, `rgba(255,255,255,0.5)`
- Spacing: 4px gap
- Stagger: 0.15s delay between each dot

### Welcome State

When no conversation exists:
- Bot avatar: 48px, centered, with gradient ring (`linear-gradient` border trick)
- Welcome text: `"Hi! 👋 How can I help you today?"` — 15px, font-weight 500, centered
- Quick-action chips below (optional): glass-card style pills, 12px text
  - Examples: `"What's NexusAI?"` · `"Latest articles"` · `"Contact us"`
  - Chip style: `glass-card` base, `border-radius: 9999px`, padding `6px 14px`
  - Hover: border shifts to `rgba(139, 92, 246, 0.3)`

### Light Mode Variants

| Element | Change |
|---|---|
| Bot bubble background | `rgba(0, 0, 0, 0.04)` |
| Bot bubble border | `1px solid rgba(0, 0, 0, 0.06)` |
| Bot bubble text | `#1F2937` |
| User bubble background | `#2563EB` (darker blue for contrast) |
| User bubble text | `#FFFFFF` (unchanged) |
| Timestamps | `rgba(0, 0, 0, 0.4)` |

---

## A.5 — Input Bar

| Property | Value |
|---|---|
| **Height** | 64px |
| **Position** | Sticky bottom of chat window |
| **Background** | `rgba(18, 18, 26, 0.6)` with `backdrop-filter: blur(12px)` |
| **Border-top** | `1px solid rgba(255, 255, 255, 0.06)` |
| **Padding** | `12px 16px` |
| **Layout** | Flex row, gap 8px, align-items center |

### Text Input

| Property | Value |
|---|---|
| **Height** | 40px |
| **Flex** | `1` (fills available width) |
| **Background** | `rgba(255, 255, 255, 0.05)` |
| **Border** | `1px solid rgba(255, 255, 255, 0.08)` |
| **Border radius** | `20px` (pill shape) |
| **Padding** | `0 16px` |
| **Font** | 13px Inter |
| **Placeholder** | `"Type a message..."` — `rgba(255, 255, 255, 0.3)` |
| **Focus border** | `rgba(139, 92, 246, 0.4)` |
| **Focus shadow** | `0 0 0 3px rgba(139, 92, 246, 0.1)` |

### Send Button

| Property | Value |
|---|---|
| **Size** | 40 × 40 px |
| **Shape** | Circle |
| **Background (empty)** | `rgba(255, 255, 255, 0.05)` — disabled appearance |
| **Background (has text)** | `linear-gradient(135deg, #3B82F6, #8B5CF6)` |
| **Icon** | `Send` / `ArrowUp` from Lucide, 18px, `#FFFFFF` |
| **Transition** | Background crossfade 0.2s |

### Light Mode

| Element | Change |
|---|---|
| Bar background | `rgba(255, 255, 255, 0.7)` with blur |
| Bar border-top | `1px solid rgba(0, 0, 0, 0.06)` |
| Input background | `rgba(0, 0, 0, 0.04)` |
| Input border | `1px solid rgba(0, 0, 0, 0.08)` |
| Placeholder | `rgba(0, 0, 0, 0.35)` |

---

## A.6 — Mobile Responsive (≤ 640px)

### Trigger Button

| Property | Change |
|---|---|
| **Position** | `bottom: 16px; right: 16px` |
| **Size** | 52px (slightly smaller for thumb reach) |

### Chat Window → Bottom Sheet

| Property | Value |
|---|---|
| **Width** | `100vw` |
| **Height** | `85vh` (leaves status bar visible) |
| **Position** | Fixed, `bottom: 0; left: 0; right: 0` |
| **Border radius** | `20px 20px 0 0` (top corners only) |
| **Transform origin** | `bottom center` |

### Drag Handle

- A `40px × 4px` pill centered at top of the sheet, `rgba(255,255,255,0.2)`, `border-radius: 2px`
- Sits `8px` below top edge, above the header
- Swipe-down gesture to dismiss (velocity threshold: 300px/s)

### Entry Animation

```
translateY(100%) → translateY(0)
duration: 0.3s, ease-out
```

### Overlay

Behind the bottom sheet: `rgba(0, 0, 0, 0.5)` overlay covering the page. Tap to dismiss.

---

## A.7 — Accessibility Notes

| Concern | Solution |
|---|---|
| **Focus trap** | When open, tab cycles within chat window only |
| **ARIA** | FAB: `aria-label="Open chat"`, window: `role="dialog"`, `aria-label="NexusAI Support Chat"` |
| **Keyboard** | `Escape` closes widget, `Enter` sends message |
| **Screen reader** | New bot messages announced via `aria-live="polite"` region |
| **Motion** | All animations respect `prefers-reduced-motion: reduce` |
| **Contrast** | All text meets WCAG AA minimum (4.5:1 ratio minimum) |

---

# Part B: Blog Image Style Guide

## B.1 — Global Visual Language

### Style

**Abstract geometric tech illustration.** No photorealism, no stock-photo humans. Think:

- Layered geometric shapes (hexagons, nodes, circuit-like paths)
- Glowing edges and gradient fills from the blog palette
- Subtle depth via overlapping translucent planes
- Dark backgrounds matching `#0A0A0F` → `#12121A`
- Sparse particle/dot-grid textures for atmosphere
- Occasional wireframe 3D elements (isometric cubes, spheres)

### Color Palette for All Images

| Role | Color | Usage |
|---|---|---|
| **Primary glow** | `#3B82F6` (blue) | Main shapes, connecting lines, primary nodes |
| **Secondary glow** | `#8B5CF6` (violet) | Accent shapes, secondary nodes, halos |
| **Tertiary highlight** | `#06B6D4` (cyan) | Data flows, sparkle accents, terminal highlights |
| **Background base** | `#0A0A0F` → `#0F0F18` | Dark canvas, subtle radial gradient |
| **Neutral shapes** | `rgba(255,255,255,0.05–0.1)` | Glass planes, grid lines |
| **Text on images** | `#E5E7EB` | If any labels are needed |

### Rendering Style

- Flat/semi-flat with gradient fills (no heavy 3D rendering)
- Glowing edges: `1–2px` strokes with matching-color drop shadow (`blur 8–12px, opacity 0.4`)
- Subtle noise/grain overlay at 3–5% opacity for texture
- No harsh outlines — soft luminous edges

---

## B.2 — Image Dimensions & Formats

| Type | Dimensions | Aspect Ratio | Format | Notes |
|---|---|---|---|---|
| **Hero image** | 1200 × 630 px | ~1.9:1 | WebP | Top of article, full-bleed within content column |
| **PostCard thumbnail** | 600 × 315 px | 16:9 | WebP | Top of card, `border-radius: 12px 12px 0 0` (rounded-t-xl) |
| **Inline diagram** | max-width 800px, height auto | Varies | SVG | Scalable, editable, theme-aware |
| **Inline illustration** | max-width 800px, height auto | ~16:9 or 4:3 | WebP | Within article body |

### Thumbnail Relationship

- PostCard thumbnails are **cropped/resized versions** of the hero image
- Focal point must remain centered so the 1200×630 → 600×315 crop is safe
- Thumbnails should read clearly at small sizes — avoid tiny details in the center

### Image Optimization

- WebP quality: 80–85 (good balance of size/clarity)
- SVG: minified, no embedded fonts (use `font-family: Inter, sans-serif` reference)
- All images include `alt` text (specified per image below)

---

## B.3 — Post 1: "How AI Agents Are Changing Automation in 2026"

### Hero Image — `ai-agents-hero.webp`

**Concept:** A constellation of autonomous agent nodes operating in concert.

**Visual description:**
- Dark background with subtle radial gradient (blue center glow)
- 5–7 luminous hexagonal nodes arranged in a loose network, each containing a different abstract icon (gear, brain, lightning bolt, chart, shield)
- Connecting lines between nodes: dashed/dotted, glowing blue (#3B82F6), suggesting data flow
- Directional arrows along the lines showing autonomous movement
- Central node is larger (the "orchestrator"), pulsing with a violet (#8B5CF6) halo
- Scattered particle dots in cyan (#06B6D4) floating in background
- Bottom-left: faint circuit-board trace pattern fading into the dark

**Alt text:** *"Network of interconnected AI agent nodes with glowing blue-violet connections, representing autonomous multi-agent automation"*

**Thumbnail crop:** Center on the orchestrator node and its immediate connections. The outer particles and circuit traces can be cropped.

---

### Inline Image 1 — `ai-agents-workflow.svg`

**Concept:** Agent workflow pipeline diagram.

**Visual description:**
- Horizontal flow diagram, left to right
- Three stages, each in a rounded-rectangle glass-card container:
  1. **"Perceive"** — eye icon, blue fill
  2. **"Decide"** — brain icon, violet fill
  3. **"Act"** — lightning icon, cyan fill
- Connecting arrows between stages: gradient stroke (blue → violet → cyan)
- Below each stage: 2–3 small text labels describing sub-tasks (e.g., under "Perceive": "Read data", "Parse context")
- Background: transparent (inherits page bg)
- Border on containers: `rgba(255,255,255,0.08)` to match glass-card

**Alt text:** *"Three-stage AI agent workflow: Perceive, Decide, Act — showing the autonomous decision pipeline"*

**Dimensions:** 800 × 280 px

---

### Inline Image 2 — `ai-agents-comparison.svg`

**Concept:** Traditional automation vs. AI agent automation comparison.

**Visual description:**
- Split layout, left and right panels
- **Left panel — "Traditional":** Rigid flowchart, sharp right-angle connectors, monochrome gray nodes, single linear path top to bottom. Feels static.
- **Right panel — "AI Agents":** Dynamic web of interconnected nodes, curved/organic connectors, gradient-filled nodes (blue/violet/cyan), multiple branching paths. Feels alive.
- Divider: thin vertical line, gradient stroke, with a "VS" label centered
- Subtle background difference: left side slightly grayer, right side has the blog's radial gradient glow

**Alt text:** *"Side-by-side comparison of rigid traditional automation flowcharts versus dynamic AI agent networks"*

**Dimensions:** 800 × 400 px

---

### Inline Image 3 — `ai-agents-ecosystem.webp`

**Concept:** The 2026 AI agent ecosystem — agents operating across domains.

**Visual description:**
- Isometric/2.5D scene with layered glass planes
- Bottom layer: data plane — grid of small dots, representing raw data
- Middle layer: agent plane — 4 agent icons (different colors from palette) moving along paths
- Top layer: application plane — abstract representations of outputs (document, chart, notification bell, code bracket)
- Vertical connections between layers: glowing cyan (#06B6D4) light beams
- Everything sits on the dark `#0A0A0F` background
- Subtle depth-of-field blur on the back layer

**Alt text:** *"Layered isometric view of the AI agent ecosystem: data layer, agent processing layer, and application output layer"*

**Dimensions:** 800 × 500 px

---

## B.4 — Post 2: "Blockchain and AI Integration"

### Hero Image — `blockchain-ai-hero.webp`

**Concept:** The convergence of a neural network and a blockchain chain.

**Visual description:**
- Dark background, dual radial glows: blue (left, representing AI) and violet (right, representing blockchain)
- **Left side:** Abstract neural network — organic, curved connections between nodes, brain-like clustering, blue (#3B82F6) glow
- **Right side:** Blockchain structure — linked blocks in a chain (3D isometric cubes with rounded edges), each block has a subtle hash-text pattern, violet (#8B5CF6) glow
- **Center convergence:** Where the two systems meet, nodes and blocks interlink — connections shift to cyan (#06B6D4), creating a bright focal point
- Energetic particles at the convergence point, suggesting fusion/synergy
- Very faint grid underlay across the entire image

**Alt text:** *"Visual convergence of a neural network (AI) and blockchain chain, merging at a glowing cyan focal point"*

**Thumbnail crop:** Center on the convergence point. The outer extremities of the neural net and chain can be cropped.

---

### Inline Image 1 — `blockchain-ai-architecture.svg`

**Concept:** System architecture — how AI and blockchain interact.

**Visual description:**
- Three-tier architecture diagram (vertical stack):
  1. **Top — "AI Layer":** Cloud-like container with brain icon, labeled sub-components: "Model Training", "Inference", "Decision Engine" — blue tones
  2. **Middle — "Middleware / Oracle":** Narrow bridge band, cyan accent, bi-directional arrows up and down
  3. **Bottom — "Blockchain Layer":** Chain of connected blocks, labeled: "Smart Contracts", "Consensus", "Immutable Ledger" — violet tones
- Arrows show data flow: AI sends decisions down → blockchain records them; blockchain sends verified data up → AI trains on it
- Glass-card containers for each tier, matching the blog's border/bg tokens
- Clean, spacious layout — generous whitespace

**Alt text:** *"Three-tier architecture: AI layer communicates through an oracle middleware to the blockchain layer, with bidirectional data flow"*

**Dimensions:** 800 × 450 px

---

### Inline Image 2 — `blockchain-ai-usecases.svg`

**Concept:** Use-case wheel showing real-world applications.

**Visual description:**
- Central hub: hexagon with interlinked AI+blockchain icon, gradient fill
- 6 spokes radiating outward to satellite nodes, each representing a use case:
  1. 🏦 **DeFi** — finance icon, blue
  2. 🏥 **Healthcare** — medical cross, violet
  3. 🔗 **Supply Chain** — chain link, cyan
  4. 🎨 **Digital Identity** — fingerprint, blue
  5. ⚡ **Energy** — lightning bolt, violet
  6. 🗳️ **Governance** — ballot box, cyan
- Spokes are thin gradient lines connecting hub to each satellite
- Each satellite node: 48px circle with icon, glass-card border
- Background: transparent

**Alt text:** *"Use-case diagram showing six applications of blockchain-AI integration: DeFi, Healthcare, Supply Chain, Digital Identity, Energy, and Governance"*

**Dimensions:** 800 × 800 px (square for the radial layout)

---

### Inline Image 3 — `blockchain-ai-dataflow.webp`

**Concept:** Data flowing through a decentralized AI pipeline.

**Visual description:**
- Horizontal scene, left to right flow
- **Left:** Raw data sources (abstract document stacks, sensor dots) in cool gray
- **Center:** A decentralized network of AI processing nodes — interconnected with glowing edges, each node pulses as data passes through. Nodes vary in size (some larger = more compute). Blue-violet palette.
- **Right:** Verified outputs landing in blockchain blocks — blocks stack/chain together, each stamped with a checkmark. Violet-cyan palette.
- Data particles (tiny dots) stream from left → through center → into right, tracing curved paths
- The entire flow sits on a subtle horizontal grid (perspective lines converging right)

**Alt text:** *"Data flow visualization: raw data enters a decentralized AI network for processing, then outputs are recorded immutably on a blockchain"*

**Dimensions:** 800 × 360 px

---

## B.5 — File Naming & Directory Structure

```
public/
└── images/
    └── blog/
        ├── ai-agents-hero.webp          (1200×630)
        ├── ai-agents-hero-thumb.webp     (600×315)
        ├── ai-agents-workflow.svg        (800×280)
        ├── ai-agents-comparison.svg      (800×400)
        ├── ai-agents-ecosystem.webp      (800×500)
        ├── blockchain-ai-hero.webp       (1200×630)
        ├── blockchain-ai-hero-thumb.webp (600×315)
        ├── blockchain-ai-architecture.svg(800×450)
        ├── blockchain-ai-usecases.svg    (800×800)
        └── blockchain-ai-dataflow.webp   (800×360)
```

---

## B.6 — Usage in Components

### PostCard Thumbnail

```
Position:     Top of card
Aspect ratio: 16:9 (enforced by container, not image)
Border radius: rounded-t-xl (12px top corners, 0 bottom)
Object-fit:   cover
Loading:      lazy (except above-the-fold cards)
```

### Article Hero

```
Position:     Below title, above body content
Width:        100% of content column
Border radius: 12px (rounded-xl)
Margin:       24px 0
```

### Inline Images

```
Position:     Within article body, between paragraphs
Max-width:    800px (100% on mobile)
Border radius: 8px (rounded-lg)
Margin:       32px auto (centered)
Caption:      Below image, 12px, rgba(255,255,255,0.5), centered
```

### Light Mode Adjustments

For SVG diagrams:
- Background fills shift from `rgba(255,255,255,0.05)` → `rgba(0,0,0,0.03)`
- Borders shift from `rgba(255,255,255,0.08)` → `rgba(0,0,0,0.08)`
- Glow effects: reduce opacity by 40%
- Text fills: switch to `#1F2937`

For WebP images:
- No runtime adjustment (baked raster)
- Dark-first design is acceptable since the blog is dark-mode by default
- Optional: provide `-light` variants if light mode usage is significant

---

*End of Design Specification*
