"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { SITE_NAME, CATEGORIES } from "@/lib/constants";
import ThemeToggle from "./ThemeToggle";
import ReadingStreak from "./ReadingStreak";
import { TrophyIcon } from "./AchievementBadges";
import Search from "./Search";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollingDown = currentScrollY > lastScrollY && currentScrollY > 100;
      const scrollingUp = currentScrollY < lastScrollY;
      
      // Update scrolled state for styling
      setScrolled(currentScrollY > 10);
      
      // Handle header visibility
      if (scrollingDown && headerVisible) {
        setHeaderVisible(false);
      } else if (scrollingUp && !headerVisible) {
        setHeaderVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [headerVisible, lastScrollY]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          headerVisible ? 'translate-y-0' : '-translate-y-full'
        } ${
          scrolled
            ? "bg-[#FAFBFC]/80 dark:bg-[#0A0A0F]/70 backdrop-blur-xl border-b border-black/[0.06] dark:border-white/[0.06] shadow-[0_1px_20px_rgba(0,0,0,0.06)] dark:shadow-[0_1px_20px_rgba(0,0,0,0.3)]"
            : "bg-transparent border-b border-transparent"
        }`}
      >
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100] focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded-lg"
      >
        Skip to content
      </a>
      <nav className="mx-auto max-w-6xl flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16">
        <Link
          href="/"
          className="text-lg font-bold tracking-tight hover:opacity-80 transition-opacity flex items-center gap-2"
        >
          <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center text-white text-sm font-bold shadow-lg shadow-blue-500/20">
            T
          </span>
          <span className="hidden sm:inline">{SITE_NAME}</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden sm:flex items-center gap-1">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat}
              href={`/category/${cat.toLowerCase()}`}
              className="px-3 py-1.5 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-lg hover:bg-black/[0.04] dark:hover:bg-white/[0.06] transition-all duration-200"
            >
              {cat}
            </Link>
          ))}
          <Link
            href="/about"
            className="px-3 py-1.5 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-lg hover:bg-black/[0.04] dark:hover:bg-white/[0.06] transition-all duration-200"
          >
            About
          </Link>
          <Link
            href="/rss"
            className="px-3 py-1.5 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-lg hover:bg-black/[0.04] dark:hover:bg-white/[0.06] transition-all duration-200"
            title="RSS Feed"
          >
            RSS
          </Link>
          <div className="ml-2 pl-2 border-l border-black/[0.08] dark:border-white/[0.08] flex items-center gap-2">
            <Search />
            <ReadingStreak />
            <TrophyIcon />
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile */}
        <div className="flex sm:hidden items-center gap-1">
          <Search />
          <ReadingStreak />
          <TrophyIcon />
          <ThemeToggle />
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors rounded-lg hover:bg-black/[0.04] dark:hover:bg-white/[0.06]"
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`sm:hidden overflow-hidden transition-all duration-300 ${
          menuOpen ? "max-h-72 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 py-4 space-y-1 bg-[#FAFBFC]/95 dark:bg-[#0A0A0F]/90 backdrop-blur-xl border-t border-black/[0.06] dark:border-white/[0.06]">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat}
              href={`/category/${cat.toLowerCase()}`}
              onClick={() => setMenuOpen(false)}
              className="block px-3 py-2 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-lg hover:bg-black/[0.04] dark:hover:bg-white/[0.06] transition-all"
            >
              {cat}
            </Link>
          ))}
          <Link
            href="/about"
            onClick={() => setMenuOpen(false)}
            className="block px-3 py-2 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-lg hover:bg-black/[0.04] dark:hover:bg-white/[0.06] transition-all"
          >
            About
          </Link>
          <Link
            href="/rss"
            onClick={() => setMenuOpen(false)}
            className="block px-3 py-2 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-lg hover:bg-black/[0.04] dark:hover:bg-white/[0.06] transition-all"
          >
            RSS Feed
          </Link>
        </div>
      </div>
    </header>

    {/* Mobile bottom navigation */}
    <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden">
      <div className="bg-[#FAFBFC]/90 dark:bg-[#0A0A0F]/90 backdrop-blur-xl border-t border-black/[0.06] dark:border-white/[0.08]">
        <nav className="flex items-center justify-around py-2">
          <Link 
            href="/" 
            className="flex flex-col items-center gap-1 p-2 text-xs text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span>Home</span>
          </Link>
          
          <div className="flex flex-col items-center gap-1 p-2 text-xs text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
            <Search />
            <span className="text-xs">Search</span>
          </div>
          
          <Link 
            href="/category/ai" 
            className="flex flex-col items-center gap-1 p-2 text-xs text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <span>AI</span>
          </Link>
          
          <Link 
            href="/category/blockchain" 
            className="flex flex-col items-center gap-1 p-2 text-xs text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
            <span>Blockchain</span>
          </Link>

          <button 
            className="flex flex-col items-center gap-1 p-2 text-xs text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors relative"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Reading</span>
          </button>
        </nav>
      </div>
    </div>
    </>
  );
}
