"use client";

import { useState, useEffect, useRef } from "react";
import { SITE_URL } from "@/lib/constants";

interface SearchResult {
  url: string;
  title: string;
  excerpt: string;
}

export default function Search() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [pagefind, setPagefind] = useState<any>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initialize Pagefind
  useEffect(() => {
    async function initPagefind() {
      if (typeof window !== 'undefined') {
        try {
          // Try to load pagefind from the public directory
          const script = document.createElement('script');
          script.src = '/_next/static/pagefind/pagefind.js';
          script.onload = async () => {
            // @ts-ignore
            if (window.pagefind) {
              // @ts-ignore
              setPagefind(window.pagefind);
            }
          };
          script.onerror = () => {
            console.warn('Pagefind not available. Search index may not be built yet.');
          };
          document.head.appendChild(script);
        } catch (error) {
          console.warn('Failed to initialize Pagefind:', error);
        }
      }
    }
    initPagefind();
  }, []);

  // Handle search
  useEffect(() => {
    async function search() {
      if (!pagefind || !query.trim()) {
        setResults([]);
        return;
      }

      setLoading(true);
      try {
        const searchResults = await pagefind.search(query);
        const results = await Promise.all(
          searchResults.results.slice(0, 8).map(async (result: any) => {
            const data = await result.data();
            return {
              url: data.url,
              title: data.meta.title || "Untitled",
              excerpt: data.excerpt || "",
            };
          })
        );
        setResults(results);
      } catch (error) {
        console.error('Search error:', error);
        setResults([]);
      } finally {
        setLoading(false);
      }
    }

    const debounceTimer = setTimeout(search, 300);
    return () => clearTimeout(debounceTimer);
  }, [query, pagefind]);

  // Close search on escape or outside click
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false);
        setQuery("");
      }
      // Open search with Cmd/Ctrl + K
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault();
        setIsOpen(true);
        setTimeout(() => inputRef.current?.focus(), 50);
      }
    }

    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleResultClick = (url: string) => {
    setIsOpen(false);
    setQuery("");
    // Navigate to the result
    if (url.startsWith('/')) {
      window.location.href = url;
    } else if (url.startsWith(SITE_URL)) {
      window.location.href = url.replace(SITE_URL, '');
    } else {
      window.location.href = url;
    }
  };

  return (
    <div className="relative" ref={searchRef}>
      {/* Search trigger button */}
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          if (!isOpen) {
            setTimeout(() => inputRef.current?.focus(), 50);
          }
        }}
        className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-lg hover:bg-black/[0.04] dark:hover:bg-white/[0.06] transition-all duration-200 border border-transparent hover:border-black/[0.08] dark:hover:border-white/[0.08]"
        title="Search (⌘K)"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <span className="hidden sm:inline">Search</span>
      </button>

      {/* Search overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/20 dark:bg-black/40 backdrop-blur-sm">
          <div className="min-h-screen px-4 text-center">
            <div className="inline-block w-full max-w-2xl mt-16 text-left align-middle transition-all transform bg-white/95 dark:bg-[#0A0A0F]/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-black/[0.08] dark:border-white/[0.08] overflow-hidden">
              
              {/* Search input */}
              <div className="p-6 pb-4">
                <div className="relative">
                  <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search articles..."
                    className="w-full pl-10 pr-4 py-3 bg-white/[0.04] dark:bg-white/[0.02] border border-black/[0.08] dark:border-white/[0.08] rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                  />
                  {loading && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <svg className="animate-spin w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25"></circle>
                        <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" className="opacity-75"></path>
                      </svg>
                    </div>
                  )}
                </div>
              </div>

              {/* Search results */}
              <div className="max-h-96 overflow-y-auto">
                {query.trim() === "" ? (
                  <div className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
                    <svg className="mx-auto w-12 h-12 mb-4 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <p className="text-sm">Start typing to search articles</p>
                    <p className="text-xs mt-2 opacity-60">Use ⌘K to quickly open search</p>
                  </div>
                ) : results.length === 0 && !loading ? (
                  <div className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
                    <svg className="mx-auto w-12 h-12 mb-4 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0121 12c0-3.35-1.64-6.322-4.18-8.18C14.68 1.64 11.708 0 8.292 0A7.962 7.962 0 010 8.292c0 3.35 1.64 6.322 4.18 8.18C6.322 18.64 9.292 20 12.708 20a7.962 7.962 0 008.18-4.18z" />
                    </svg>
                    <p className="text-sm">No articles found for "{query}"</p>
                    <p className="text-xs mt-2 opacity-60">Try different keywords or check spelling</p>
                  </div>
                ) : (
                  <div className="pb-2">
                    {results.map((result, index) => (
                      <button
                        key={index}
                        onClick={() => handleResultClick(result.url)}
                        className="w-full text-left px-6 py-4 hover:bg-black/[0.04] dark:hover:bg-white/[0.04] transition-colors border-t border-black/[0.06] dark:border-white/[0.06] first:border-t-0"
                      >
                        <h3 className="font-medium text-gray-900 dark:text-white mb-1 line-clamp-1">
                          {result.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 leading-relaxed">
                          {result.excerpt}
                        </p>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="px-6 py-4 border-t border-black/[0.06] dark:border-white/[0.06] bg-black/[0.02] dark:bg-white/[0.02]">
                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                  <div className="flex items-center gap-4">
                    <kbd className="px-2 py-1 bg-black/[0.06] dark:bg-white/[0.08] rounded border border-black/[0.08] dark:border-white/[0.12]">↵</kbd>
                    <span>to select</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <kbd className="px-2 py-1 bg-black/[0.06] dark:bg-white/[0.08] rounded border border-black/[0.08] dark:border-white/[0.12]">esc</kbd>
                    <span>to close</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}