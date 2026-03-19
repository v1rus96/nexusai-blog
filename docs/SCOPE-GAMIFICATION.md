# Scope: Gamification & Content Expansion

**Project:** TechLion AI & Blockchain Blog  
**Date:** 2026-03-19  
**Author:** 📦 CPO  
**Status:** Draft

---

## 1. Gamification Features

### 1.1 Article Reactions

- Row of 5 emoji buttons rendered below each article: 🔥 🧠 💡 👏 🚀
- Click increments count; current count displayed next to each emoji
- One reaction per emoji per article per user (toggle on/off)
- **localStorage key:** `techlion-reactions`
  ```json
  { "[slug]": { "fire": 3, "brain": 1, "lightbulb": 0, "clap": 2, "rocket": 1 } }
  ```

### 1.2 Reading Streak

- Track consecutive days a user visits the blog
- Header badge displays: "🔥 X day streak"
- Reset streak if gap between visits exceeds 24 hours
- **localStorage key:** `techlion-streak`
  ```json
  { "lastVisit": "2026-03-19", "current": 5, "longest": 12 }
  ```

### 1.3 End-of-Article Quiz

- 3 multiple-choice questions per article, shown at the end of the post
- Score displayed after completion (e.g., "2/3 correct!")
- Quiz can be retaken; latest score stored
- **localStorage key:** `techlion-quiz-scores`
  ```json
  { "[slug]": { "score": 2, "total": 3 } }
  ```

### 1.4 Achievement Badges

| Badge | Condition |
|-------|-----------|
| **First Article Read** | Read any article |
| **Quiz Master** | Score a perfect 3/3 on any quiz |
| **Streak Starter** | Reach a 3-day reading streak |
| **Bookworm** | Read all articles |
| **Quiz Completionist** | Complete all quizzes |

- Toast notification on badge unlock
- Trophy icon (🏆) in header opens a badge panel overlay
- **localStorage key:** `techlion-achievements`
  ```json
  { "badges": ["first-read", "quiz-master"] }
  ```

### 1.5 Code Block Copy Button

- Copy button positioned top-right of every code block
- Click copies code to clipboard and shows a ✓ checkmark for 2 seconds
- Subtle fade-in animation on code block scroll into view

---

## 2. New Content (4 Posts)

| # | Title | Slug | Category | Words |
|---|-------|------|----------|-------|
| 1 | DeFi Meets AI: How ML Is Revolutionizing DeFi | `defi-ai-machine-learning` | Blockchain | ~2000 |
| 2 | Building Your First AI Agent: Step-by-Step | `building-first-ai-agent-guide` | AI | ~2200 |
| 3 | Zero-Knowledge Proofs & AI: Privacy-Preserving ML | `zero-knowledge-proofs-ai-privacy` | Blockchain | ~1800 |
| 4 | The Rise of Multi-Agent Systems | `multi-agent-systems-collaboration` | AI | ~2000 |

**Each post includes:**
- SVG hero image
- Author: "NexusAI Team"
- Date: 2026-03-19
- 3 multiple-choice quiz questions

---

## 3. Acceptance Criteria

- [ ] All 5 gamification components render correctly
- [ ] localStorage persists across page refreshes
- [ ] All 6 blog posts load (2 existing + 4 new)
- [ ] Each post has working quiz (3 questions)
- [ ] Reactions increment and persist
- [ ] Streak tracks consecutive days
- [ ] At least 2 badges unlockable and toast appears
- [ ] Code copy button works
- [ ] Mobile responsive (375px, 768px)
- [ ] Dark mode compatible
- [ ] Build passes with zero errors
- [ ] No console errors
