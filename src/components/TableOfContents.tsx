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
  const [showMobileTOC, setShowMobileTOC] = useState(false);
  const [sectionProgress, setSectionProgress] = useState<Record<string, number>>({});
  const observerRef = useRef<IntersectionObserver | null>(null);

  const currentSectionIndex = headings.findIndex(h => h.id === activeId);
  const totalSections = headings.length;

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
            
            // Calculate section progress
            const rect = entry.target.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            const progress = Math.max(0, Math.min(100, 
              (windowHeight - rect.top) / (windowHeight + rect.height) * 100
            ));
            
            setSectionProgress(prev => ({
              ...prev,
              [entry.target.id]: progress
            }));
          }
        }
      },
      { rootMargin: "-80px 0px -70% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
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
    setShowMobileTOC(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const toggleMobileTOC = () => {
    setShowMobileTOC(!showMobileTOC);
  };

  return (
    <>
      {/* Mobile TOC (inline, collapsible) - shown below lg */}
      <div className="lg:hidden mb-10">
        <div className="glass-card rounded-xl p-4 bg-white/[0.06] backdrop-blur-xl border border-white/[0.08]">
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
                      ? "text-[#C61884] dark:text-[#E91E90]"
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

      {/* Mobile floating TOC button */}
      <div className="fixed bottom-20 right-4 z-40 lg:hidden">
        <button 
          onClick={toggleMobileTOC}
          className="w-12 h-12 rounded-full bg-[#C61884] shadow-lg shadow-[#C61884]/25 flex items-center justify-center text-white hover:bg-[#E91E90] transition-all duration-200"
          aria-label="Toggle table of contents"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
          </svg>
        </button>
        
        {/* Mobile TOC Modal */}
        {showMobileTOC && (
          <div className="absolute bottom-16 right-0 w-80 glass-card rounded-xl p-4 shadow-xl bg-white/[0.06] backdrop-blur-xl border border-white/[0.08]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900 dark:text-gray-200">Contents</h3>
              <div className="text-xs text-gray-500">
                <span className="text-[#E91E90]">{currentSectionIndex + 1}</span>
                <span className="mx-1">/</span>
                <span>{totalSections}</span>
              </div>
            </div>
            
            <div className="space-y-1 max-h-64 overflow-y-auto">
              {headings.map(({ level, text, id }) => (
                <div key={id} className="relative">
                  <button
                    onClick={() => handleClick(id)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                      activeId === id 
                        ? 'bg-[#E91E90]/10 text-[#E91E90] border-l-2 border-[#E91E90]' 
                        : 'text-gray-400 hover:text-gray-300 hover:bg-white/[0.04]'
                    } ${level === 3 ? "ml-4" : ""}`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="truncate">{text}</span>
                      <div className="flex items-center gap-2">
                        {sectionProgress[id] > 0 && (
                          <div className="w-2 h-2 rounded-full bg-[#E91E90] opacity-60"></div>
                        )}
                      </div>
                    </div>
                    
                    {/* Progress indicator */}
                    <div className="mt-1 h-1 bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-[#C61884] to-[#E91E90] rounded-full transition-all duration-500"
                        style={{ width: `${sectionProgress[id] || 0}%` }}
                      ></div>
                    </div>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Desktop TOC (sticky sidebar) - shown at lg and above */}
      <aside className="hidden lg:block sticky top-24 w-64 h-fit">
        <div className="glass-card rounded-xl p-6 bg-white/[0.06] backdrop-blur-xl border border-white/[0.08]">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-sm text-gray-300">Contents</h2>
            <div className="text-xs text-gray-500">
              <span className="text-[#E91E90]">{currentSectionIndex + 1}</span>
              <span className="mx-1">/</span>
              <span>{totalSections}</span>
            </div>
          </div>
          
          <div className="space-y-1">
            {headings.map(({ level, text, id }) => (
              <div key={id} className="relative">
                <button
                  onClick={() => handleClick(id)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                    activeId === id 
                      ? 'bg-[#E91E90]/10 text-[#E91E90] border-l-2 border-[#E91E90]' 
                      : 'text-gray-400 hover:text-gray-300 hover:bg-white/[0.04]'
                  } ${level === 3 ? "ml-4" : ""}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="truncate">{text}</span>
                    <div className="flex items-center gap-2">
                      {sectionProgress[id] > 0 && (
                        <div className="w-2 h-2 rounded-full bg-[#E91E90] opacity-60"></div>
                      )}
                    </div>
                  </div>
                  
                  {/* Progress indicator */}
                  <div className="mt-1 h-1 bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-[#C61884] to-[#E91E90] rounded-full transition-all duration-500"
                      style={{ width: `${sectionProgress[id] || 0}%` }}
                    ></div>
                  </div>
                </button>
              </div>
            ))}
          </div>
        </div>
      </aside>
    </>
  );
}
