"use client";

import Link from "next/link";
import { SITE_NAME, CATEGORIES } from "@/lib/constants";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: "Twitter", href: "#", icon: "M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" },
    { name: "GitHub", href: "#", icon: "M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" },
    { name: "LinkedIn", href: "#", icon: "M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" },
  ];

  return (
    <footer className="border-t border-white/[0.06] mt-16">
      <div className="px-6 sm:px-10 lg:px-16 py-12">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="flex items-center gap-6">
            <Link
              href="/"
              className="text-xl font-[family-name:var(--font-playfair)] italic text-white hover:opacity-80 transition-opacity"
            >
              {SITE_NAME}
            </Link>
            
            {/* Social links */}
            <div className="flex items-center gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="p-2 text-white/30 hover:text-[#E91E90] transition-colors duration-200"
                  title={social.name}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={social.icon} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6 text-sm text-white/40">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat}
                href={`/category/${cat.toLowerCase()}`}
                className="hover:text-[#E91E90] transition-colors"
              >
                {cat}
              </Link>
            ))}
            <Link href="/about" className="hover:text-[#E91E90] transition-colors">
              About
            </Link>
            <Link href="/subscribe" className="hover:text-[#E91E90] transition-colors">
              Subscribe
            </Link>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-white/[0.04] text-center text-xs text-white/30">
          © {currentYear} {SITE_NAME}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
