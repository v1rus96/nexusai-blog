"use client";

import { useEffect } from "react";

const ARTICLES_READ_KEY = "techlion-articles-read";

export default function ArticleReadTracker({ slug }: { slug: string }) {
  useEffect(() => {
    let triggered = false;

    const handleScroll = () => {
      if (triggered) return;

      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;

      // User has scrolled to ~80% of the article
      if (scrollTop + clientHeight >= scrollHeight * 0.8) {
        triggered = true;
        try {
          const read: string[] = JSON.parse(
            localStorage.getItem(ARTICLES_READ_KEY) || "[]"
          );
          if (!read.includes(slug)) {
            read.push(slug);
            localStorage.setItem(ARTICLES_READ_KEY, JSON.stringify(read));
            window.dispatchEvent(
              new CustomEvent("article-read", { detail: { slug } })
            );
          }
        } catch {
          // ignore
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [slug]);

  return null;
}
