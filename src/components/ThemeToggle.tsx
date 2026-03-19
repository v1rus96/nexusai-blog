"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const isDark = stored === "light" ? false : stored === "dark" ? true : prefersDark;
    setDark(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  return (
    <button
      onClick={toggle}
      aria-label="Toggle dark mode"
      className="relative p-2 rounded-lg hover:bg-white/[0.06] dark:hover:bg-white/[0.06] transition-all duration-200 group"
    >
      <div className="relative w-5 h-5">
        {/* Sun */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`absolute inset-0 h-5 w-5 transition-all duration-300 ${
            dark ? "opacity-100 rotate-0 scale-100" : "opacity-0 rotate-90 scale-75"
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m8.66-13.66l-.71.71M4.05 19.95l-.71.71M21 12h-1M4 12H3m16.66 7.66l-.71-.71M4.05 4.05l-.71-.71M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
        {/* Moon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`absolute inset-0 h-5 w-5 transition-all duration-300 ${
            dark ? "opacity-0 -rotate-90 scale-75" : "opacity-100 rotate-0 scale-100"
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.005 9.005 0 0012 21a9.005 9.005 0 008.354-5.646z" />
        </svg>
      </div>
    </button>
  );
}
