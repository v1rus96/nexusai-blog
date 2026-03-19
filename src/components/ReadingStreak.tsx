"use client";

import { useState, useEffect, useRef } from "react";

const STORAGE_KEY = "techlion-streak";

interface StreakData {
  lastVisit: string;
  current: number;
  longest: number;
}

function getToday(): string {
  return new Date().toISOString().split("T")[0];
}

function getStreak(): StreakData {
  if (typeof window === "undefined") return { lastVisit: "", current: 0, longest: 0 };
  try {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
    if (data && data.lastVisit) return data;
  } catch {}
  return { lastVisit: "", current: 0, longest: 0 };
}

function daysBetween(a: string, b: string): number {
  const msPerDay = 86400000;
  const da = new Date(a + "T00:00:00Z").getTime();
  const db = new Date(b + "T00:00:00Z").getTime();
  return Math.round(Math.abs(db - da) / msPerDay);
}

function updateStreak(): StreakData {
  const today = getToday();
  const data = getStreak();

  if (data.lastVisit === today) return data;

  if (data.lastVisit && daysBetween(data.lastVisit, today) === 1) {
    data.current += 1;
  } else if (!data.lastVisit || daysBetween(data.lastVisit, today) > 1) {
    data.current = 1;
  }

  data.lastVisit = today;
  data.longest = Math.max(data.longest, data.current);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  return data;
}

export default function ReadingStreak() {
  const [streak, setStreak] = useState(0);
  const [showTooltip, setShowTooltip] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const data = updateStreak();
    setStreak(data.current);
  }, []);

  useEffect(() => {
    if (!showTooltip) return;
    const handler = (e: MouseEvent) => {
      if (tooltipRef.current && !tooltipRef.current.contains(e.target as Node)) {
        setShowTooltip(false);
      }
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [showTooltip]);

  if (streak === 0) return null;

  return (
    <div className="relative inline-flex">
      <button
        onClick={() => setShowTooltip(!showTooltip)}
        className="inline-flex items-center gap-1 bg-gradient-to-r from-orange-500 to-red-500 rounded-full px-3 py-1 hover:shadow-lg hover:shadow-orange-500/25 transition-shadow cursor-pointer md:px-3 md:py-1 px-2 py-0.5"
        aria-label={`Reading streak: ${streak} days`}
      >
        <span className="animate-pulse motion-reduce:animate-none">🔥</span>
        <span className="text-sm font-bold text-white tabular-nums md:text-sm text-xs">
          {streak}
        </span>
      </button>
      {showTooltip && (
        <div
          ref={tooltipRef}
          className="absolute top-full mt-2 right-0 bg-gray-900/95 backdrop-blur-sm border border-white/10 rounded-xl p-3 text-sm text-white/80 shadow-xl whitespace-nowrap z-50"
        >
          You&apos;ve read articles {streak} day{streak !== 1 ? "s" : ""} in a row!
        </div>
      )}
    </div>
  );
}
