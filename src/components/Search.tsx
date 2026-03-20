"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { SITE_URL } from "@/lib/constants";

interface SearchResult {
  url: string;
  title: string;
  excerpt: string;
  category?: string;
  date?: string;
  readingTime?: string;
  image?: string;
}

export default function Search() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [pagefind, setPagefind] = useState<any>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

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

  // Handle search with enhanced results
  useEffect(() => {
    async function search() {
      if (!pagefind || !query.trim()) {
        setResults([]);
        setSelectedIndex(-1);
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
              category: data.meta.category || "AI",
              date: data.meta.date,
              readingTime: data.meta.readingTime || "5 min read",
              image: data.meta.image,
            };
          })
        );
        
        // Filter by active filter
        const filteredResults = activeFilter === "all" 
          ? results 
          : results.filter(result => 
              result.category?.toLowerCase().includes(activeFilter.toLowerCase())
            );
        
        setResults(filteredResults);
        setSelectedIndex(-1);
      } catch (error) {
        console.error('Search error:', error);
        setResults([]);
      } finally {
        setLoading(false);
      }
    }

    const debounceTimer = setTimeout(search, 300);
    return () => clearTimeout(debounceTimer);
  }, [query, pagefind, activeFilter]);

  // Enhanced keyboard navigation
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (!isOpen) {
        // Open search with Cmd/Ctrl + K
        if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
          event.preventDefault();
          setIsOpen(true);
          setTimeout(() => inputRef.current?.focus(), 50);
        }
        return;
      }

      switch (event.key) {
        case 'Escape':
          setIsOpen(false);
          setQuery("");
          setSelectedIndex(-1);
          break;
        
        case 'ArrowDown':
          event.preventDefault();
          setSelectedIndex(prev => 
            prev < results.length - 1 ? prev + 1 : prev
          );
          break;
        
        case 'ArrowUp':
          event.preventDefault();
          setSelectedIndex(prev => prev > -1 ? prev - 1 : -1);
          break;
        
        case 'Enter':
          event.preventDefault();
          if (selectedIndex >= 0 && selectedIndex < results.length) {
            handleResultClick(results[selectedIndex].url);
          }
          break;
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
  }, [isOpen, results, selectedIndex]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleResultClick = (url: string) => {
    setIsOpen(false);
    setQuery("");
    setSelectedIndex(-1);
    // Navigate to the result
    if (url.startsWith('/')) {
      window.location.href = url;
    } else if (url.startsWith(SITE_URL)) {
      window.location.href = url.replace(SITE_URL, '');
    } else {
      window.location.href = url;
    }
  };

  const filters = [
    { key: "all", label: "All" },
    { key: "ai", label: "AI" },
    { key: "blockchain", label: "Blockchain" },
    { key: "web3", label: "Web3" },
  ];

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
        className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-500 text-white/60 hover:text-gray-900 dark:hover:text-white rounded-lg hover:bg-black/[0.04] dark:hover:bg-white/[0.06] transition-all duration-200 border border-transparent hover:border-black/[0.08] dark:hover:border-white/[0.08]"
        title="Search (⌘K)"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <span className="hidden sm:inline">Search</span>
      </button>

      {/* Enhanced Search Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm">
          <div className="min-h-screen px-4 text-center">
            <div className="inline-block w-full max-w-2xl mt-16 text-left align-middle transition-all transform bg-white/[0.08] backdrop-blur-xl rounded-2xl shadow-2xl border border-white/[0.10] overflow-hidden">
              
              <div className="p-6 pb-0">
                {/* Search input */}
                <div className="relative">
                  <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search articles, topics, or authors..."
                    className="w-full pl-12 pr-4 py-4 bg-white/[0.05] border border-white/[0.10] rounded-xl text-white placeholder-gray-400 focus:border-[#E91E90] focus:ring-1 focus:ring-[#E91E90] transition-colors"
                    autoFocus
                  />
                  {query && (
                    <button 
                      onClick={() => setQuery('')}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 p-1 hover:bg-white/[0.08] rounded-lg transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                  {loading && (
                    <div className="absolute right-12 top-1/2 transform -translate-y-1/2">
                      <svg className="animate-spin w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25"></circle>
                        <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" className="opacity-75"></path>
                      </svg>
                    </div>
                  )}
                </div>
                
                {/* Quick filters */}
                <div className="flex gap-2 mt-4">
                  {filters.map((filter) => (
                    <button
                      key={filter.key}
                      onClick={() => setActiveFilter(filter.key)}
                      className={`px-3 py-1 rounded-full text-xs transition-colors ${
                        activeFilter === filter.key
                          ? 'bg-[#E91E90] text-white'
                          : 'bg-white/[0.05] text-gray-400 hover:bg-white/[0.08]'
                      }`}
                    >
                      {filter.label}
                    </button>
                  ))}
                  
                  {/* Advanced filters toggle */}
                  <button 
                    onClick={() => setShowAdvanced(!showAdvanced)}
                    className="px-3 py-1 rounded-full text-xs bg-white/[0.05] text-gray-400 hover:bg-white/[0.08] transition-colors ml-auto"
                  >
                    <svg className="w-3 h-3 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                    </svg>
                    Filters
                  </button>
                </div>
                
                {/* Advanced filters */}
                {showAdvanced && (
                  <div className="grid grid-cols-2 gap-4 mt-4 p-4 bg-white/[0.02] rounded-lg border border-white/[0.05]">
                    <div>
                      <label className="block text-xs text-gray-400 mb-2">Reading Time</label>
                      <select className="w-full px-3 py-2 bg-white/[0.05] border border-white/[0.10] rounded-lg text-sm">
                        <option>Any duration</option>
                        <option>Quick read (1-5 min)</option>
                        <option>Medium (5-15 min)</option>
                        <option>Deep dive (15+ min)</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-xs text-gray-400 mb-2">Date Range</label>
                      <select className="w-full px-3 py-2 bg-white/[0.05] border border-white/[0.10] rounded-lg text-sm">
                        <option>Any time</option>
                        <option>Last week</option>
                        <option>Last month</option>
                        <option>Last year</option>
                      </select>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Enhanced Search results */}
              <div className="max-h-96 overflow-y-auto p-6 pt-4" ref={resultsRef}>
                {loading && (
                  <div className="space-y-4">
                    {Array.from({ length: 3 }).map((_, index) => (
                      <div key={index} className="animate-pulse">
                        <div className="flex gap-4">
                          <div className="w-16 h-16 bg-gray-800 rounded-lg flex-shrink-0"></div>
                          <div className="flex-1 space-y-2">
                            <div className="h-4 bg-gray-800 rounded w-3/4"></div>
                            <div className="h-3 bg-gray-800 rounded w-1/2"></div>
                            <div className="h-3 bg-gray-800 rounded w-2/3"></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                
                {!loading && query.trim() === "" && (
                  <div className="text-center py-12">
                    <svg className="w-12 h-12 text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <h3 className="font-medium text-gray-400 mb-2">Start searching</h3>
                    <p className="text-sm text-gray-500">
                      Try searching for "AI", "blockchain", or any topic
                    </p>
                  </div>
                )}
                
                {!loading && query && results.length === 0 && (
                  <div className="text-center py-12">
                    <svg className="w-12 h-12 text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0121 12c0-3.35-1.64-6.322-4.18-8.18C14.68 1.64 11.708 0 8.292 0A7.962 7.962 0 010 8.292c0 3.35 1.64 6.322 4.18 8.18C6.322 18.64 9.292 20 12.708 20a7.962 7.962 0 008.18-4.18z" />
                    </svg>
                    <h3 className="font-medium text-gray-400 mb-2">No results found</h3>
                    <p className="text-sm text-gray-500">
                      Try adjusting your search terms or filters
                    </p>
                  </div>
                )}
                
                {!loading && results.map((result, index) => (
                  <button
                    key={index}
                    onClick={() => handleResultClick(result.url)}
                    className={`w-full text-left p-4 rounded-lg transition-colors mb-2 ${
                      selectedIndex === index ? 'bg-white/[0.08]' : 'hover:bg-white/[0.03]'
                    }`}
                  >
                    <div className="flex gap-4">
                      <div className="w-16 h-16 rounded-lg overflow-hidden bg-gradient-to-br from-[#E91E90]/25 to-[#C61884]/25 flex-shrink-0">
                        {result.image ? (
                          <Image 
                            src={result.image} 
                            alt={result.title}
                            width={64}
                            height={64}
                            className="w-full h-full object-cover" 
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0120 12c0-4.418-3.582-8-8-8s-8 3.582-8 8 3.582 8 8 8c1.846 0 3.543-.635 4.889-1.709" />
                            </svg>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium mb-1 line-clamp-1 group-hover:text-[#E91E90] transition-colors">
                          {result.title}
                        </h3>
                        
                        <p className="text-sm text-gray-400 line-clamp-2 mb-2">
                          {result.excerpt}
                        </p>
                        
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <span className="px-2 py-1 bg-[#E91E90]/15 text-[#E91E90] rounded-full">
                            {result.category}
                          </span>
                          <span>{result.readingTime}</span>
                          <span>•</span>
                          {result.date && (
                            <time>{new Date(result.date).toLocaleDateString()}</time>
                          )}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {/* Enhanced footer with navigation hints */}
              <div className="px-6 py-4 border-t border-white/[0.06] bg-white/[0.02]">
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <kbd className="px-2 py-1 bg-white/[0.08] rounded border border-white/[0.12]">↓↑</kbd>
                      <span>navigate</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <kbd className="px-2 py-1 bg-white/[0.08] rounded border border-white/[0.12]">↵</kbd>
                      <span>select</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <kbd className="px-2 py-1 bg-white/[0.08] rounded border border-white/[0.12]">esc</kbd>
                    <span>close</span>
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
