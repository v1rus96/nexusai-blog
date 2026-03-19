# NexusAI Blog — Support/Chat System Specification

**Author:** ⚙️ COO, The Agency  
**Date:** 2026-03-19  
**Status:** Recommendation  
**Target:** https://ai-blockchain-blog.vercel.app

---

## 1. Executive Summary

**Recommendation: Tawk.to** — Free hosted live chat widget with built-in AI Assist.

After evaluating all three options against the constraints (static Next.js 16 on Vercel, no backend, lightweight, topic-focused), Tawk.to is the clear winner for this stage of the blog. It's completely free, requires zero backend infrastructure, deploys via a single script tag, and includes an AI assistant that can be trained on custom knowledge base content.

---

## 2. Options Evaluation

### Option A: Tawk.to ✅ RECOMMENDED

| Criteria | Rating |
|---|---|
| Cost | **Free** (unlimited agents, unlimited chat history) |
| Setup complexity | **Minimal** — single `<script>` embed |
| AI capabilities | Built-in AI Assist with custom knowledge base |
| Backend required | **No** — fully hosted SaaS |
| Next.js compatibility | **Excellent** — script tag in `<head>` or layout |
| Maintenance burden | **Very low** — managed service |
| Customization | Widget color, position, greeting, pre-chat forms |
| Analytics | Built-in visitor tracking, chat analytics |

**Pros:**
- Zero cost, even at scale
- AI Assist can be trained on blog topics via knowledge base articles
- Works entirely client-side — perfect for static Vercel deployments
- Supports canned responses, triggers, and automated greetings
- Mobile apps for live agent takeover if needed later
- GDPR-compliant with data processing options

**Cons:**
- Tawk.to branding on free tier (small "powered by" badge)
- AI Assist quality depends on knowledge base curation
- Less customizable UI compared to a fully custom widget

### Option B: Crisp

| Criteria | Rating |
|---|---|
| Cost | Free tier (2 seats, limited features); chatbot builder requires **Pro at $25/mo** |
| Setup complexity | Low — script embed or npm package |
| AI capabilities | Chatbot builder on paid tier only; free tier is live chat only |
| Backend required | No |

**Why not:** The chatbot/AI features that make Crisp compelling are locked behind the Pro tier ($25/mo/workspace). The free tier is essentially just live chat — no automated responses, no bot flows. For a blog without dedicated support staff, a dumb live chat widget with no AI adds little value.

### Option C: Custom AI Chatbot Widget

| Criteria | Rating |
|---|---|
| Cost | LLM API costs ($5-50+/mo depending on traffic) |
| Setup complexity | **High** — needs API route or edge function, UI component, prompt engineering |
| AI capabilities | Unlimited (full LLM) |
| Backend required | **Yes** — API route for LLM calls (API keys can't be exposed client-side) |

**Why not:** Requires a backend endpoint to proxy LLM API calls (API keys cannot be exposed in client-side code). While Vercel Edge Functions could solve this, it adds infrastructure complexity, ongoing API costs, prompt maintenance, and potential abuse vectors (public endpoint calling a paid API). This is overkill for a blog at this stage and can be revisited later if the blog grows significantly.

---

## 3. Implementation Plan — Tawk.to

### 3.1 Integration Method

**Method:** Script tag embed in the Next.js root layout.

```tsx
// src/app/layout.tsx (or wherever the root layout lives)
import Script from 'next/script';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}

        {/* Tawk.to Live Chat Widget */}
        <Script
          id="tawkto"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
              var Tawk_API = Tawk_API || {};
              var Tawk_LoadStart = new Date();
              Tawk_API.customStyle = {
                visibility: {
                  desktop: { position: 'br', xOffset: 20, yOffset: 20 },
                  mobile: { position: 'br', xOffset: 10, yOffset: 10 },
                },
              };
              (function(){
                var s1 = document.createElement("script"), s0 = document.getElementsByTagName("script")[0];
                s1.async = true;
                s1.src = 'https://embed.tawk.to/YOUR_PROPERTY_ID/YOUR_WIDGET_ID';
                s1.charset = 'UTF-8';
                s1.setAttribute('crossorigin','*');
                s0.parentNode.insertBefore(s1, s0);
              })();
            `,
          }}
        />
      </body>
    </html>
  );
}
```

**Why `lazyOnload`:** Prevents the chat widget from blocking page rendering or hurting Core Web Vitals. The widget loads after the page is fully interactive.

**Alternative:** If the project uses a component-based approach, wrap in a client component:

```tsx
// src/components/TawkChat.tsx
'use client';

import { useEffect } from 'react';

export function TawkChat() {
  useEffect(() => {
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://embed.tawk.to/YOUR_PROPERTY_ID/YOUR_WIDGET_ID';
    script.charset = 'UTF-8';
    script.setAttribute('crossorigin', '*');
    document.body.appendChild(script);

    return () => {
      // Cleanup on unmount
      const tawkElements = document.querySelectorAll('[id^="tawk-"]');
      tawkElements.forEach(el => el.remove());
    };
  }, []);

  return null;
}
```

### 3.2 Account Setup Steps

1. Sign up at [tawk.to](https://www.tawk.to/) (free, no credit card)
2. Create a **Property** named "NexusAI Blog"
3. Copy the Property ID and Widget ID from **Administration → Chat Widget**
4. Replace `YOUR_PROPERTY_ID` and `YOUR_WIDGET_ID` in the script above
5. Configure widget appearance to match the blog's theme (see §3.3)

### 3.3 Widget Configuration

| Setting | Value |
|---|---|
| **Widget color** | Match blog's primary brand color (likely dark/tech theme) |
| **Position** | Bottom-right |
| **Language** | English |
| **Sound notifications** | On for visitor, off by default for agent |
| **Pre-chat form** | Disabled (reduce friction — anonymous chat) |
| **Offline form** | Enabled — collect email for follow-up |

### 3.4 Knowledge Base & AI Assist Configuration

In the Tawk.to dashboard under **AI Assist → Knowledge Base**, create the following articles:

#### Core Knowledge Base Articles

| Article Title | Content Summary |
|---|---|
| **What Are AI Agents?** | Autonomous software entities that perceive, reason, and act. Cover types (reactive, deliberative, hybrid), use cases (customer service, coding, research), and the difference between simple bots and agentic AI. |
| **Agentic AI Explained** | Multi-step reasoning, tool use, planning, memory. How agentic AI differs from traditional chatbots. Mention frameworks like LangChain, CrewAI, AutoGen. |
| **AI Automation for Business** | RPA vs AI automation, workflow orchestration, decision automation. Practical examples. |
| **Blockchain + AI Integration** | How blockchain provides trust, provenance, and decentralization for AI systems. Data marketplaces, verifiable inference, on-chain AI agents. |
| **Decentralized AI** | Federated learning, decentralized compute (Akash, Render), token-incentivized AI training, data sovereignty. |
| **Smart Contracts & AI** | AI-powered smart contract auditing, autonomous agents executing on-chain transactions, oracle-fed AI decisions. |
| **About NexusAI Blog** | What the blog covers, publishing schedule, how to subscribe, social links. |

> **Tip:** Each article should be 300-600 words, written in Q&A format for best AI Assist performance. Include variations of how users might ask the question.

#### AI Assist Settings

- **Enable AI Assist:** Yes
- **Confidence threshold:** 70% (if AI is less than 70% confident, escalate to fallback)
- **Tone:** Friendly, knowledgeable, concise
- **Source restriction:** Knowledge base articles only (don't hallucinate)

### 3.5 Greeting Message & Quick Replies

#### Greeting Message

```
👋 Hey there! Welcome to NexusAI Blog.

I'm the NexusAI assistant — ask me anything about AI agents, automation, or blockchain + AI integration. Pick a topic below or type your question!
```

#### Quick-Reply Buttons

| # | Button Label | Mapped Response Topic |
|---|---|---|
| 1 | 🤖 What are AI agents? | → AI Agents knowledge base article |
| 2 | ⛓️ How does blockchain + AI work? | → Blockchain + AI Integration article |
| 3 | 🧠 What is agentic AI? | → Agentic AI Explained article |
| 4 | 📰 Latest blog posts | → Link to blog homepage / recent posts section |

**Implementation in Tawk.to:**  
Configure these via **Administration → Triggers → Add Trigger**:
- **Trigger type:** Visitor opens chat
- **Action:** Send automated message with quick-reply buttons (use Tawk.to's button shortcuts feature)

### 3.6 Automated Triggers

| Trigger | Condition | Action |
|---|---|---|
| **Welcome message** | Visitor on site > 15 seconds, hasn't chatted | Show greeting bubble (non-intrusive) |
| **Blog post engagement** | Visitor on any `/blog/*` page > 60 seconds | "Enjoying this article? Ask me anything about the topic!" |
| **Exit intent** | Visitor moves cursor toward close/navigation | "Before you go — want to explore more AI + blockchain topics?" |

### 3.7 Operating Hours Strategy

**Always-on AI Assist** — Since there's no dedicated support staff:

| Mode | Hours | Behavior |
|---|---|---|
| **AI Assist (automated)** | 24/7 | AI answers from knowledge base |
| **Live agent** | As available / optional | Blog owner can hop on via Tawk.to mobile app when convenient |
| **Offline fallback** | When AI can't answer + no agent online | Show offline form (see §3.8) |

**Rationale:** A blog doesn't need live human support. The AI assistant handles 80%+ of questions. The blog owner can optionally monitor and jump into conversations when they see fit — no obligation.

### 3.8 Fallback Behavior

When the AI Assist cannot answer (confidence below threshold):

1. **First fallback — Suggest related articles:**
   > "I'm not sure about that specific question. Here are some topics I can help with: [show quick-reply buttons again]"

2. **Second fallback — Offer contact form:**
   > "I couldn't find an answer for that. Want to leave your email? The NexusAI team will get back to you!"
   
   Collect: Email + Message → Delivered to blog owner's email via Tawk.to's built-in email forwarding.

3. **Third fallback — Direct to resources:**
   > "You might find the answer in our blog posts: [link to blog]. You can also reach us on Twitter/X: @[handle]"

---

## 4. Performance Considerations

| Concern | Mitigation |
|---|---|
| **Page load impact** | `lazyOnload` strategy ensures widget loads after page is interactive. Tawk.to script is ~90KB gzipped — minimal impact. |
| **Core Web Vitals** | Widget loads asynchronously; does not block LCP, FID, or CLS. |
| **Mobile experience** | Tawk.to is mobile-responsive. Chat bubble is unobtrusive. |
| **SEO impact** | None — widget is client-side rendered, invisible to crawlers. |

---

## 5. Future Upgrade Path

If the blog grows significantly, consider migrating to a **Custom AI Chatbot** (Option C):

- Use **Vercel Edge Functions** to proxy OpenAI/Anthropic API calls
- Use **RAG** (Retrieval-Augmented Generation) over blog content for more accurate answers
- Build a custom widget with the blog's design system
- This makes sense at **5,000+ monthly visitors** or if the knowledge base outgrows Tawk.to's AI Assist

For now, Tawk.to provides 90% of the value at 0% of the cost.

---

## 6. Implementation Checklist

- [ ] Create Tawk.to account and property
- [ ] Configure widget appearance (colors, position)
- [ ] Write and publish 7 knowledge base articles (see §3.4)
- [ ] Enable AI Assist with 70% confidence threshold
- [ ] Set greeting message and quick-reply buttons
- [ ] Configure triggers (welcome, engagement, exit intent)
- [ ] Set up offline form with email forwarding
- [ ] Add script tag to Next.js root layout
- [ ] Test on desktop and mobile
- [ ] Test AI responses for all quick-reply topics
- [ ] Verify fallback behavior works correctly
- [ ] Deploy to Vercel

**Estimated setup time:** 1-2 hours

---

*Document prepared by the COO. Ready for CTO review and implementation.*
