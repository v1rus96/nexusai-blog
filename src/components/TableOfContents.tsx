"use client";

import { useState, useEffect, useRef } from "react";

interface Heading {
  level: number;
  text: string;
  id: string;
}

export default function TableOfContents({ headings }: { headings: Heading[] }) {
  const [activeId, setActiveId] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-80px 0px -70% 0px" }
    );

    const timer = setTimeout(() => {
      headings.forEach(({ id }) => {
        const el = document.getElementById(id);
        if (el) observerRef.current?.observe(el);
      });
    }, 500);

    return () => {
      clearTimeout(timer);
      observerRef.current?.disconnect();
    };
  }, [headings]);

  const handleClick = (id: string) => {
    setIsOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Mobile TOC (inline, collapsible) - shown below xl */}
      <div className="xl:hidden mb-10">
        <div className="glass-card rounded-xl p-4">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center justify-between w-full text-sm font-semibold text-gray-900 dark:text-gray-200"
          >
            <span>Table of Contents</span>
            <svg
              className={`w-4 h-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              isOpen ? "max-h-80 mt-3" : "max-h-0"
            }`}
          >
            <nav className="overflow-y-auto max-h-72">
              {headings.map(({ level, text, id }) => (
                <button
                  key={id}
                  onClick={() => handleClick(id)}
                  className={`block w-full text-left py-1.5 text-[13px] transition-colors duration-200 ${
                    level === 3 ? "ml-4" : ""
                  } ${
                    activeId === id
                      ? "text-blue-600 dark:text-blue-400"
                      : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                  }`}
                >
                  {text}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Desktop TOC (sticky sidebar) - shown at xl and above */}
      <aside
        className="hidden xl:block fixed"
        style={{
          top: 96,
          left: "max(1rem, calc(50% - 540px - 220px - 40px))",
          width: 220,
          maxHeight: "calc(100vh - 128px)",
          overflowY: "auto",
        }}
      >
        <nav className="border-l-2 border-black/[0.04] dark:border-white/[0.04]">
          {headings.map(({ level, text, id }) => (
            <button
              key={id}
              onClick={() => handleClick(id)}
              className={`block w-full text-left text-[13px] font-medium transition-colors duration-200 ${
                level === 3 ? "pl-6" : "pl-3"
              } py-1 ${
                activeId === id
                  ? "text-blue-600 dark:text-blue-400 border-l-2 border-blue-500 -ml-[2px]"
                  : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              }`}
              style={{ marginBottom: 8 }}
            >
              {text}
            </button>
          ))}
        </nav>
      </aside>
    </>
  );
}
