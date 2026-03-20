"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SITE_NAME, CATEGORIES } from "@/lib/constants";
import Search from "./Search";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    ...CATEGORIES.map((cat) => ({
      name: cat,
      href: `/category/${cat.toLowerCase()}`,
    })),
    { name: "About", href: "/about" },
    { name: "RSS", href: "/rss" },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#1A0A2E]/95 backdrop-blur-xl border-b border-white/[0.06]"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100] focus:px-4 focus:py-2 focus:bg-[#E91E90] focus:text-white focus:rounded-lg"
      >
        Skip to content
      </a>
      <nav className="flex items-center justify-between px-6 sm:px-10 lg:px-16 h-20">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-[family-name:var(--font-playfair)] italic text-white hover:opacity-80 transition-opacity tracking-wide"
        >
          {SITE_NAME}
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`relative text-[15px] font-medium transition-colors duration-200 ${
                isActive(link.href)
                  ? "text-[#E91E90]"
                  : "text-white/[0.85] hover:text-white"
              }`}
            >
              {link.name}
              {isActive(link.href) && (
                <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-5 h-[3px] bg-[#E91E90] rounded-full" />
              )}
            </Link>
          ))}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <Search />
          
          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 text-white/80 hover:text-white transition-colors rounded-lg"
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
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          menuOpen ? "max-h-72 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6 py-4 space-y-1 bg-[#1A0A2E]/95 backdrop-blur-xl border-t border-white/[0.06]">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`block px-3 py-2 text-sm font-medium rounded-lg transition-all ${
                isActive(link.href)
                  ? "text-[#E91E90] bg-white/[0.04]"
                  : "text-white/[0.7] hover:text-white hover:bg-white/[0.04]"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
