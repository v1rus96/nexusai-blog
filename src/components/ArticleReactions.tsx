"use client";

import { useState, useEffect, useCallback } from "react";

const REACTIONS = [
  { key: "fire", emoji: "🔥" },
  { key: "brain", emoji: "🧠" },
  { key: "lightbulb", emoji: "💡" },
  { key: "clap", emoji: "👏" },
  { key: "rocket", emoji: "🚀" },
] as const;

const STORAGE_KEY = "techlion-reactions";

type ReactionCounts = Record<string, number>;
type AllReactions = Record<string, ReactionCounts>;

function getReactions(): AllReactions {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}

function saveReactions(data: AllReactions) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export default function ArticleReactions({ slug }: { slug: string }) {
  const [counts, setCounts] = useState<ReactionCounts>({});
  const [selected, setSelected] = useState<Set<string>>(new Set());

  useEffect(() => {
    const all = getReactions();
    const slugData = all[slug] || {};
    setCounts(slugData);
    // Track which ones the user toggled on (stored separately)
    try {
      const userSelections = JSON.parse(
        localStorage.getItem(`${STORAGE_KEY}-user`) || "{}"
      );
      setSelected(new Set(userSelections[slug] || []));
    } catch {
      setSelected(new Set());
    }
  }, [slug]);

  const toggle = useCallback(
    (key: string) => {
      const all = getReactions();
      const slugData = all[slug] || {};
      const userSelections = JSON.parse(
        localStorage.getItem(`${STORAGE_KEY}-user`) || "{}"
      );
      const userSlug: string[] = userSelections[slug] || [];

      const isSelected = userSlug.includes(key);
      if (isSelected) {
        slugData[key] = Math.max((slugData[key] || 0) - 1, 0);
        userSelections[slug] = userSlug.filter((k: string) => k !== key);
      } else {
        slugData[key] = (slugData[key] || 0) + 1;
        userSelections[slug] = [...userSlug, key];
      }

      all[slug] = slugData;
      saveReactions(all);
      localStorage.setItem(`${STORAGE_KEY}-user`, JSON.stringify(userSelections));
      setCounts({ ...slugData });
      setSelected(new Set(userSelections[slug]));
    },
    [slug]
  );

  return (
    <div className="flex items-center justify-center gap-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 mt-10 mx-auto max-w-md">
      {REACTIONS.map(({ key, emoji }) => {
        const count = counts[key] || 0;
        const isSelected = selected.has(key);
        return (
          <button
            key={key}
            onClick={() => toggle(key)}
            className={`flex flex-col items-center justify-center gap-1 min-w-[44px] min-h-[44px] w-10 h-10 rounded-xl cursor-pointer transition-transform duration-150 ease-out hover:scale-110 active:scale-95 border ${
              isSelected
                ? "ring-2 ring-[#E91E90]/50 bg-white/10 scale-105 border-transparent"
                : "bg-transparent hover:bg-white/10 border-transparent"
            }`}
            aria-label={`React with ${emoji}`}
          >
            <span className="text-xl">{emoji}</span>
            {count > 0 && (
              <span className="text-xs text-white/60 font-medium tabular-nums">
                {count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
