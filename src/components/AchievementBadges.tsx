"use client";

import { useState, useEffect, useCallback, useRef } from "react";

const ACHIEVEMENTS_KEY = "techlion-achievements";
const STREAK_KEY = "techlion-streak";
const QUIZ_KEY = "techlion-quiz-scores";
const ARTICLES_READ_KEY = "techlion-articles-read";

// All known post slugs — update as new posts are added
const ALL_POST_SLUGS = [
  "ai-agents-automation-2026",
  "blockchain-ai-integration",
  "defi-ai-machine-learning",
  "building-first-ai-agent-guide",
  "zero-knowledge-proofs-ai-privacy",
  "multi-agent-systems-collaboration",
];

interface Badge {
  id: string;
  name: string;
  emoji: string;
  description: string;
  check: () => boolean;
}

const BADGES: Badge[] = [
  {
    id: "first-read",
    name: "First Read",
    emoji: "📖",
    description: "Read your first article",
    check: () => {
      try {
        const read = JSON.parse(localStorage.getItem(ARTICLES_READ_KEY) || "[]");
        return read.length >= 1;
      } catch { return false; }
    },
  },
  {
    id: "quiz-master",
    name: "Quiz Master",
    emoji: "🧠",
    description: "Score a perfect quiz",
    check: () => {
      try {
        const scores = JSON.parse(localStorage.getItem(QUIZ_KEY) || "{}");
        return Object.values(scores).some(
          (s: unknown) => (s as { score: number; total: number }).score === (s as { score: number; total: number }).total && (s as { score: number; total: number }).total > 0
        );
      } catch { return false; }
    },
  },
  {
    id: "streak-starter",
    name: "Streak Starter",
    emoji: "🔥",
    description: "3-day reading streak",
    check: () => {
      try {
        const data = JSON.parse(localStorage.getItem(STREAK_KEY) || "{}");
        return (data.current >= 3) || (data.longest >= 3);
      } catch { return false; }
    },
  },
  {
    id: "bookworm",
    name: "Bookworm",
    emoji: "📚",
    description: "Read all articles",
    check: () => {
      try {
        const read = JSON.parse(localStorage.getItem(ARTICLES_READ_KEY) || "[]");
        return ALL_POST_SLUGS.every((slug) => read.includes(slug));
      } catch { return false; }
    },
  },
  {
    id: "quiz-completionist",
    name: "Quiz Completionist",
    emoji: "🏅",
    description: "Complete all quizzes",
    check: () => {
      try {
        const scores = JSON.parse(localStorage.getItem(QUIZ_KEY) || "{}");
        return ALL_POST_SLUGS.every((slug) => scores[slug]);
      } catch { return false; }
    },
  },
];

function getUnlockedBadges(): string[] {
  try {
    const data = JSON.parse(localStorage.getItem(ACHIEVEMENTS_KEY) || '{"badges":[]}');
    return data.badges || [];
  } catch { return []; }
}

function saveUnlockedBadges(badges: string[]) {
  localStorage.setItem(ACHIEVEMENTS_KEY, JSON.stringify({ badges }));
}

// Toast component
function Toast({ badge, onClose }: { badge: Badge; onClose: () => void }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 200);
    }, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`fixed top-4 right-4 z-50 w-80 max-w-[calc(100vw-2rem)] bg-white/10 backdrop-blur-xl border border-yellow-400/30 rounded-xl shadow-xl shadow-yellow-500/10 p-4 flex items-center gap-3 transition-all duration-300 ${
        visible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
      }`}
    >
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-violet-500 border border-yellow-400 flex items-center justify-center text-lg flex-shrink-0">
        {badge.emoji}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold text-white">Achievement Unlocked!</p>
        <p className="text-xs text-yellow-400/80">{badge.name}</p>
      </div>
      <button
        onClick={() => { setVisible(false); setTimeout(onClose, 200); }}
        className="text-white/40 hover:text-white/70 ml-auto flex-shrink-0 cursor-pointer"
        aria-label="Close"
      >
        ✕
      </button>
    </div>
  );
}

// Trophy icon for header
export function TrophyIcon() {
  const [hasNew, setHasNew] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);
  const [unlockedIds, setUnlockedIds] = useState<string[]>([]);
  const panelRef = useRef<HTMLDivElement>(null);

  const checkBadges = useCallback(() => {
    const unlocked = getUnlockedBadges();
    setUnlockedIds(unlocked);
    // Check if any new badges can be unlocked
    const newlyUnlocked = BADGES.filter(
      (b) => !unlocked.includes(b.id) && b.check()
    );
    setHasNew(newlyUnlocked.length > 0);
  }, []);

  useEffect(() => {
    checkBadges();
    const handler = () => checkBadges();
    window.addEventListener("storage", handler);
    window.addEventListener("quiz-completed", handler);
    window.addEventListener("article-read", handler);
    return () => {
      window.removeEventListener("storage", handler);
      window.removeEventListener("quiz-completed", handler);
      window.removeEventListener("article-read", handler);
    };
  }, [checkBadges]);

  useEffect(() => {
    if (!panelOpen) return;
    const handler = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setPanelOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [panelOpen]);

  return (
    <div className="relative" ref={panelRef}>
      <button
        onClick={() => setPanelOpen(!panelOpen)}
        className="relative text-yellow-500 hover:text-yellow-400 transition-colors duration-200 cursor-pointer p-1"
        aria-label="Achievements"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
        {hasNew && (
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full" />
        )}
      </button>

      {panelOpen && (
        <BadgePanel
          unlockedIds={unlockedIds}
          onUnlock={(ids) => { setUnlockedIds(ids); setHasNew(false); }}
        />
      )}
    </div>
  );
}

function BadgePanel({
  unlockedIds,
  onUnlock,
}: {
  unlockedIds: string[];
  onUnlock: (ids: string[]) => void;
}) {
  const [toastBadge, setToastBadge] = useState<Badge | null>(null);

  useEffect(() => {
    // Check and unlock new badges
    const current = [...unlockedIds];
    let changed = false;
    for (const badge of BADGES) {
      if (!current.includes(badge.id) && badge.check()) {
        current.push(badge.id);
        changed = true;
        setToastBadge(badge);
      }
    }
    if (changed) {
      saveUnlockedBadges(current);
      onUnlock(current);
    }
  }, [unlockedIds, onUnlock]);

  const unlockedCount = unlockedIds.length;

  return (
    <>
      {toastBadge && (
        <Toast badge={toastBadge} onClose={() => setToastBadge(null)} />
      )}
      <div className="absolute top-full mt-2 right-0 w-80 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl shadow-black/50 p-6 z-50">
        <h3 className="text-lg font-bold text-white mb-1">🏆 Achievements</h3>
        <p className="text-sm text-white/50 mb-3">
          {unlockedCount} of {BADGES.length} unlocked
        </p>
        <div className="h-1.5 bg-white/10 rounded-full mb-4">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-violet-500 rounded-full transition-all duration-500"
            style={{ width: `${(unlockedCount / BADGES.length) * 100}%` }}
          />
        </div>
        <div className="grid grid-cols-3 gap-4">
          {BADGES.map((badge) => {
            const unlocked = unlockedIds.includes(badge.id);
            return (
              <div
                key={badge.id}
                className="flex flex-col items-center gap-2"
                title={badge.description}
              >
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl ${
                    unlocked
                      ? "bg-gradient-to-br from-blue-500 to-violet-500 border-2 border-yellow-400 shadow-lg shadow-blue-500/25 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/30 transition-transform duration-200"
                      : "bg-white/5 border border-white/10 opacity-40 grayscale"
                  }`}
                >
                  {badge.emoji}
                </div>
                <span
                  className={`text-xs text-center ${
                    unlocked
                      ? "text-white/70 font-medium"
                      : "text-white/30"
                  }`}
                >
                  {badge.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

// Standalone component for checking and showing toasts (mount once in layout)
export default function AchievementBadges() {
  const [toastQueue, setToastQueue] = useState<Badge[]>([]);

  useEffect(() => {
    const check = () => {
      const unlocked = getUnlockedBadges();
      const newBadges: Badge[] = [];
      const updated = [...unlocked];

      for (const badge of BADGES) {
        if (!updated.includes(badge.id) && badge.check()) {
          updated.push(badge.id);
          newBadges.push(badge);
        }
      }

      if (newBadges.length > 0) {
        saveUnlockedBadges(updated);
        setToastQueue((prev) => [...prev, ...newBadges]);
      }
    };

    // Check on mount and on custom events
    check();
    window.addEventListener("quiz-completed", check);
    window.addEventListener("article-read", check);

    return () => {
      window.removeEventListener("quiz-completed", check);
      window.removeEventListener("article-read", check);
    };
  }, []);

  if (toastQueue.length === 0) return null;

  return (
    <Toast
      badge={toastQueue[0]}
      onClose={() => setToastQueue((prev) => prev.slice(1))}
    />
  );
}
