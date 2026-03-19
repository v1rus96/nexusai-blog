# 🎮 Gamification Components — Design Specification

> **Design System:** Dark Glassmorphism  
> **Font:** Geist Sans (`font-['Geist_Sans',sans-serif]`)  
> **Base:** `bg-gray-950 text-white`  
> **Accents:** `blue-500` / `violet-500` / `cyan-400`  
> **Glass Pattern:** `bg-white/5 backdrop-blur-xl border border-white/10`  
> **Border Radius:** `rounded-2xl` (cards), `rounded-xl` (buttons/inputs)

---

## 1. ArticleReactions

**Purpose:** Let readers react to articles with emoji. Horizontal row of 5 emoji buttons with counts, centered below article content.

### Container

| Property | Tailwind Classes |
|----------|-----------------|
| Layout | `flex items-center justify-center gap-3` |
| Background | `bg-white/5 backdrop-blur-xl` |
| Border | `border border-white/10 rounded-2xl` |
| Padding | `p-4` |
| Margin | `mt-10 mx-auto max-w-md` |

### Emoji Button (each)

| Property | Tailwind Classes |
|----------|-----------------|
| Size | `w-10 h-10 min-w-[44px] min-h-[44px]` (44px touch target via min dimensions) |
| Layout | `flex flex-col items-center justify-center gap-1` |
| Background | `bg-transparent hover:bg-white/10` |
| Border | `border border-transparent rounded-xl` |
| Cursor | `cursor-pointer` |
| Transition | `transition-transform duration-150 ease-out` |
| Hover | `hover:scale-110` |
| Active | `active:scale-95` |
| Font size (emoji) | `text-xl` |

### Selected State (toggle on)

| Property | Tailwind Classes |
|----------|-----------------|
| Ring | `ring-2 ring-blue-500/50` |
| Background | `bg-white/10` |
| Scale | `scale-105` |

### Count Badge

| Property | Tailwind Classes |
|----------|-----------------|
| Typography | `text-xs text-white/60 font-medium tabular-nums` |
| Position | Inline, directly below or beside the emoji within the button flex column |
| Visibility | Hidden when count is `0` (`opacity-0` or conditional render) |

### Emojis

Five reactions in order: 🔥 (fire/hot), 💡 (insightful), 👏 (applause), 🤔 (thinking), ❤️ (love)

### Responsive

- **Desktop (≥768px):** `gap-3`, horizontal row, `p-4`
- **Mobile (<768px):** `gap-2`, same horizontal row, `p-3`. Touch targets remain 44px minimum. Container `max-w-full mx-4`.

### Animation

- On click: brief `scale-95` bounce via `active:scale-95`, then spring back
- Count increment: no animation (instant update)

---

## 2. ReadingStreak

**Purpose:** Display the user's consecutive-day reading streak as a compact badge in the site header.

### Badge Container

| Property | Tailwind Classes |
|----------|-----------------|
| Background | `bg-gradient-to-r from-orange-500 to-red-500` |
| Shape | `rounded-full` |
| Padding | `px-3 py-1` |
| Layout | `inline-flex items-center gap-1` |
| Position | Right side of site header, before user avatar / nav actions |

### Text

| Property | Tailwind Classes |
|----------|-----------------|
| Content | `🔥 {count}` (e.g., "🔥 7") |
| Typography | `text-sm font-bold text-white` |
| Number | `tabular-nums` for stable width |

### Flame Animation

| Property | Tailwind Classes / Spec |
|----------|------------------------|
| Animation | `animate-pulse` applied to the 🔥 emoji span only |
| Condition | Active when streak ≥ 1 |
| Reduced motion | `motion-reduce:animate-none` |

### Visibility

- **streak = 0:** Component not rendered (hidden entirely, no empty badge)
- **streak ≥ 1:** Visible with pulse animation

### Responsive

- **Desktop:** `px-3 py-1 text-sm` — full badge
- **Mobile (<768px):** `px-2 py-0.5 text-xs` — slightly more compact, same gradient and shape

### Interaction

- **Hover:** `hover:shadow-lg hover:shadow-orange-500/25` — subtle glow
- **Click:** Opens a small tooltip or popover: "You've read articles X days in a row!"
  - Tooltip: `bg-gray-900/95 backdrop-blur-sm border border-white/10 rounded-xl p-3 text-sm text-white/80 shadow-xl`

---

## 3. ArticleQuiz

**Purpose:** Interactive quiz card below article content (after ArticleReactions). Tests reader comprehension with 3 multiple-choice questions.

### Card Container

| Property | Tailwind Classes |
|----------|-----------------|
| Background | `bg-white/5 backdrop-blur-xl` |
| Border | `border border-white/10 rounded-2xl` |
| Top accent | `border-t-2 border-t-transparent` with pseudo-element gradient `from-blue-500 to-violet-500` (or use a 2px div: `h-0.5 bg-gradient-to-r from-blue-500 to-violet-500 rounded-t-2xl`) |
| Padding | `p-6 sm:p-8` |
| Margin | `mt-8 mx-auto max-w-2xl` |

### Gradient Top Border (implementation note)

Use a wrapper approach:
- Outer wrapper: `bg-gradient-to-r from-blue-500 to-violet-500 rounded-2xl p-[1px] pt-[2px]`
- Inner card: `bg-gray-950/90 backdrop-blur-xl rounded-2xl p-6 sm:p-8`

This creates a gradient border effect with a thicker top accent.

### Header

| Property | Tailwind Classes |
|----------|-----------------|
| Text | "🧠 Test Your Knowledge" |
| Typography | `text-xl font-bold text-white` |
| Margin | `mb-6` |
| Subtitle | `text-sm text-white/50 mt-1` — "3 questions about this article" |

### Question Block

| Property | Tailwind Classes |
|----------|-----------------|
| Container | `space-y-6` for question spacing |
| Number | `text-sm font-semibold text-blue-400 mb-2` — "Question 1 of 3" |
| Question text | `text-base font-medium text-white mb-3` |
| Options list | `space-y-2` |

### Option Button (default state)

| Property | Tailwind Classes |
|----------|-----------------|
| Background | `bg-white/5 hover:bg-white/10` |
| Border | `border border-white/10 rounded-xl` |
| Padding | `p-3` |
| Layout | `flex items-center gap-3 w-full text-left` |
| Typography | `text-sm text-white/80` |
| Cursor | `cursor-pointer` |
| Transition | `transition-all duration-200` |
| Radio indicator | `w-4 h-4 rounded-full border-2 border-white/20 flex-shrink-0` |

### Option — Selected (before submit)

| Property | Tailwind Classes |
|----------|-----------------|
| Background | `bg-white/10` |
| Border | `border border-blue-500/50` |
| Radio fill | `bg-blue-500 border-blue-500` (inner dot) |

### Option — Correct (after submit)

| Property | Tailwind Classes |
|----------|-----------------|
| Background | `bg-green-500/20` |
| Border | `border border-green-500/50` |
| Icon | ✓ checkmark, `text-green-400 w-5 h-5` replacing radio indicator |
| Text | `text-green-300` |

### Option — Wrong (after submit)

| Property | Tailwind Classes |
|----------|-----------------|
| Background | `bg-red-500/20` |
| Border | `border border-red-500/50` |
| Icon | ✗ cross, `text-red-400 w-5 h-5` replacing radio indicator |
| Text | `text-red-300` |

### Option — Disabled (after submit, unselected wrong options)

| Property | Tailwind Classes |
|----------|-----------------|
| Opacity | `opacity-50 pointer-events-none` |

### Submit Button

| Property | Tailwind Classes |
|----------|-----------------|
| Background | `bg-gradient-to-r from-blue-500 to-violet-500` |
| Shape | `rounded-xl` |
| Padding | `px-6 py-3` |
| Typography | `text-sm font-semibold text-white` |
| Width | `w-full sm:w-auto` |
| Hover | `hover:from-blue-600 hover:to-violet-600 hover:shadow-lg hover:shadow-blue-500/25` |
| Active | `active:scale-[0.98]` |
| Transition | `transition-all duration-200` |
| Disabled | `opacity-50 cursor-not-allowed` (when no options selected) |
| Margin | `mt-6` |

### Score Reveal (after submit)

| Property | Tailwind Classes |
|----------|-----------------|
| Container | `text-center py-6 mt-6 border-t border-white/10` |
| Score text | `text-4xl font-bold` |
| Gradient by score | |
| — 3/3 | `bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent` |
| — 2/3 | `bg-gradient-to-r from-yellow-400 to-amber-400 bg-clip-text text-transparent` |
| — 1/3 or 0/3 | `bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent` |
| Label | `text-sm text-white/50 mt-2` — "correct answers" |
| Message | `text-base text-white/70 mt-3` — contextual ("Perfect!", "Almost there!", "Keep reading!") |

### Responsive

- **Desktop:** `p-8`, side-by-side layout possible but vertical is preferred for readability
- **Mobile (<768px):** `p-4`, `text-base` questions, full-width submit button

### Animation

- Options: `transition-all duration-200` on background/border color changes
- Score reveal: fade in with `animate-in fade-in duration-500`
- Correct/wrong icons: `transition-opacity duration-300`

---

## 4. AchievementBadges

**Purpose:** Trophy icon in header opens a panel showing earned and locked badges. Toast notifications for new unlocks.

### Trophy Icon (Header)

| Property | Tailwind Classes |
|----------|-----------------|
| Icon | Trophy icon (Lucide `Trophy`), `w-6 h-6` (24px) |
| Color | `text-yellow-500 hover:text-yellow-400` |
| Transition | `transition-colors duration-200` |
| Cursor | `cursor-pointer` |
| Position | Site header, right side, near ReadingStreak badge |
| Notification dot | `absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full` (when new badge unlocked, unseen) |

### Badge Panel (Modal/Dropdown)

| Property | Tailwind Classes |
|----------|-----------------|
| Container | `bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl` |
| Shadow | `shadow-2xl shadow-black/50` |
| Padding | `p-6` |
| Width | Desktop: `w-80` dropdown from icon. Mobile: full-screen modal `fixed inset-0 z-50` |
| Header | `text-lg font-bold text-white mb-4` — "🏆 Achievements" |
| Subheader | `text-sm text-white/50 mb-4` — "X of Y unlocked" |
| Progress bar | `h-1.5 bg-white/10 rounded-full` with fill `bg-gradient-to-r from-blue-500 to-violet-500 rounded-full` |

### Badge Grid

| Property | Tailwind Classes |
|----------|-----------------|
| Layout | `grid grid-cols-3 gap-4` |
| Each cell | `flex flex-col items-center gap-2` |

### Individual Badge — Locked

| Property | Tailwind Classes |
|----------|-----------------|
| Circle | `w-16 h-16 rounded-full` (64px) |
| Background | `bg-white/5` |
| Border | `border border-white/10` |
| Effects | `opacity-40 grayscale` |
| Icon inside | `text-2xl` emoji or icon, inherits grayscale |
| Label | `text-xs text-white/30 text-center` — badge name |

### Individual Badge — Unlocked

| Property | Tailwind Classes |
|----------|-----------------|
| Circle | `w-16 h-16 rounded-full` (64px) |
| Background | `bg-gradient-to-br from-blue-500 to-violet-500` |
| Border | `border-2 border-yellow-400` |
| Shadow | `shadow-lg shadow-blue-500/25` |
| Effects | none (full color, full opacity) |
| Icon inside | `text-2xl` emoji or icon, white |
| Label | `text-xs text-white/70 text-center font-medium` — badge name |
| Hover | `hover:scale-105 hover:shadow-xl hover:shadow-blue-500/30 transition-transform duration-200` |

### Badge Examples

| Badge | Icon | Criteria |
|-------|------|----------|
| First Read | 📖 | Read 1 article |
| Bookworm | 📚 | Read 10 articles |
| Streak Master | 🔥 | 7-day streak |
| Quiz Whiz | 🧠 | Score 3/3 on a quiz |
| Reactor | ⚡ | React to 5 articles |
| Explorer | 🧭 | Read articles from 3+ categories |

### Toast Notification (New Badge Unlocked)

| Property | Tailwind Classes |
|----------|-----------------|
| Position | `fixed top-4 right-4 z-50` |
| Background | `bg-white/10 backdrop-blur-xl` |
| Border | `border border-yellow-400/30 rounded-xl` |
| Shadow | `shadow-xl shadow-yellow-500/10` |
| Padding | `p-4` |
| Layout | `flex items-center gap-3` |
| Width | `w-80 max-w-[calc(100vw-2rem)]` |
| Auto-dismiss | 4 seconds |

#### Toast Content

| Element | Tailwind Classes |
|---------|-----------------|
| Badge icon | `w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-violet-500 border border-yellow-400 flex items-center justify-center text-lg` |
| Title | `text-sm font-bold text-white` — "Achievement Unlocked!" |
| Badge name | `text-xs text-yellow-400/80` |
| Close button | `text-white/40 hover:text-white/70 ml-auto` |

#### Toast Animation

| Phase | Spec |
|-------|------|
| Enter | Slide in from right: `translate-x-full → translate-x-0`, `opacity-0 → opacity-100`, `duration-300 ease-out` |
| Visible | Hold for 4000ms |
| Exit | Slide out to right: `translate-x-0 → translate-x-full`, `opacity-100 → opacity-0`, `duration-200 ease-in` |
| Progress bar | Bottom of toast, `h-0.5 bg-yellow-400/50`, width animates `100% → 0%` over 4s |

### Responsive

- **Desktop:** Dropdown panel anchored to trophy icon, `w-80`, max-height with scroll `max-h-96 overflow-y-auto`
- **Mobile (<768px):** Full-screen modal with `fixed inset-0`, scrollable body, close button top-right

---

## 5. CodeBlock Copy

**Purpose:** Copy-to-clipboard button on code blocks. Appears top-right with icon swap feedback.

### Button Container

| Property | Tailwind Classes |
|----------|-----------------|
| Position | `absolute top-2 right-2` (parent code block must be `relative`) |
| Background | `bg-white/10 hover:bg-white/20` |
| Shape | `rounded-lg` |
| Padding | `p-2` |
| Cursor | `cursor-pointer` |
| Transition | `transition-colors duration-200` |
| Opacity | `opacity-0 group-hover:opacity-100` (code block container is `group`) — appears on hover |
| Focus visible | `focus-visible:opacity-100 focus-visible:ring-2 focus-visible:ring-blue-500/50` |

### Code Block Parent (required context)

| Property | Tailwind Classes |
|----------|-----------------|
| Container | `relative group` |
| Ensures button positioning and hover-reveal behavior |

### Default Icon (Clipboard)

| Property | Tailwind Classes |
|----------|-----------------|
| Icon | Lucide `Clipboard` or `Copy`, `w-4 h-4` |
| Color | `text-white/60` |

### Success Icon (Checkmark)

| Property | Tailwind Classes |
|----------|-----------------|
| Icon | Lucide `Check`, `w-4 h-4` |
| Color | `text-green-400` |

### Icon Transition

| Property | Spec |
|----------|------|
| Method | Crossfade between clipboard and checkmark icons |
| Duration | `duration-200` (200ms) |
| Technique | Both icons stacked absolutely within the button; toggle `opacity-0`/`opacity-100` |
| Checkmark display time | 2000ms, then fade back to clipboard |

### States

| State | Visual |
|-------|--------|
| Hidden | `opacity-0` (code block not hovered) |
| Visible | `opacity-100` (code block hovered or button focused) |
| Hover | `bg-white/20` |
| Click | Brief `scale-95` (`active:scale-95 transition-transform duration-100`) |
| Success | Checkmark icon in `text-green-400`, holds 2s |

### Responsive

- **Desktop:** Hover-reveal behavior (`opacity-0 group-hover:opacity-100`)
- **Mobile (<768px):** Always visible (`opacity-100`), since no hover on touch. Use `@media (hover: hover)` for the hover-reveal, always-show on touch devices.

### Accessibility

- `aria-label="Copy code to clipboard"` (default)
- `aria-label="Copied!"` (success state)
- `role="button"` / `tabindex="0"`

---

## Global Design Tokens (Reference)

```
Colors:
  bg-primary:    bg-gray-950
  text-primary:  text-white
  text-muted:    text-white/60
  text-subtle:   text-white/40
  accent-blue:   blue-500
  accent-violet: violet-500
  accent-cyan:   cyan-400
  accent-yellow: yellow-500 (achievements)
  accent-orange: orange-500 (streaks)
  success:       green-400 / green-500
  error:         red-400 / red-500
  warning:       yellow-400 / amber-400

Glass Card:
  bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl

Gradients:
  primary:      from-blue-500 to-violet-500
  streak:       from-orange-500 to-red-500
  badge-unlock: from-blue-500 to-violet-500 (bg-gradient-to-br)

Transitions:
  fast:    duration-150
  default: duration-200
  smooth:  duration-300
  reveal:  duration-500

Spacing:
  card-padding: p-4 (compact) / p-6 (default) / p-8 (spacious)
  section-gap:  mt-8 / mt-10
```

---

*Design spec v1.0 — 🎨 CDO / March 2026*
