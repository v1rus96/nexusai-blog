"use client";

import Link from "next/link";
import { SITE_NAME, SITE_DESCRIPTION, CATEGORIES } from "@/lib/constants";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: "Twitter", href: "#", icon: "M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" },
    { name: "GitHub", href: "#", icon: "M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" },
    { name: "LinkedIn", href: "#", icon: "M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" },
  ];

  const quickLinks = [
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Privacy", href: "/privacy" },
    { name: "Terms", href: "/terms" },
  ];

  return (
    <footer className="relative mt-20">
      {/* Glassmorphism background */}
      <div className="absolute inset-0 bg-white/[0.02] backdrop-blur-sm border-t border-white/[0.06]" />
      
      {/* Gradient glow effects */}
      <div className="absolute top-0 left-1/4 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl" />
      <div className="absolute top-0 right-1/4 w-32 h-32 bg-violet-500/5 rounded-full blur-3xl" />
      
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand section */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-blue-500/20">
                T
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">{SITE_NAME}</h3>
                <p className="text-xs text-gray-500">Future of Technology</p>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed mb-6 max-w-md">
              {SITE_DESCRIPTION}
            </p>
            
            {/* Social links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  className="p-2 glass-card rounded-lg hover:bg-white/[0.08] transition-all duration-200 group"
                  title={social.name}
                >
                  <svg 
                    className="w-4 h-4 text-gray-400 group-hover:text-blue-400 transition-colors" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={social.icon} />
                  </svg>
                </Link>
              ))}
            </div>
          </div>
          
          {/* Categories section */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
              <div className="w-1 h-4 bg-gradient-to-b from-blue-500 to-violet-600 rounded-full" />
              Topics
            </h4>
            <nav className="space-y-3">
              {CATEGORIES.map((category) => (
                <Link
                  key={category}
                  href={`/category/${category.toLowerCase()}`}
                  className="block text-sm text-gray-400 hover:text-blue-400 transition-colors duration-200"
                >
                  {category}
                </Link>
              ))}
              <Link
                href="/tags"
                className="block text-sm text-gray-400 hover:text-blue-400 transition-colors duration-200"
              >
                All Tags
              </Link>
            </nav>
          </div>
          
          {/* Quick links section */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
              <div className="w-1 h-4 bg-gradient-to-b from-violet-500 to-cyan-500 rounded-full" />
              Quick Links
            </h4>
            <nav className="space-y-3">
              {quickLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="block text-sm text-gray-400 hover:text-violet-400 transition-colors duration-200"
                >
                  {link.name}
                </Link>
              ))}
              <Link
                href="/subscribe"
                className="block text-sm text-gray-400 hover:text-violet-400 transition-colors duration-200"
              >
                Newsletter
              </Link>
              <Link
                href="/rss"
                className="block text-sm text-gray-400 hover:text-violet-400 transition-colors duration-200"
              >
                RSS Feed
              </Link>
            </nav>
          </div>
        </div>

        {/* Newsletter CTA */}
        <div className="glass-card rounded-xl p-6 mb-8 bg-gradient-to-r from-blue-500/5 to-violet-600/5 border border-white/[0.08]">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="text-lg font-semibold text-white mb-1">Stay in the loop</h4>
              <p className="text-sm text-gray-400">Get the latest AI and blockchain insights delivered to your inbox.</p>
            </div>
            <Link
              href="/subscribe"
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-violet-600 text-white font-medium rounded-lg hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-200 whitespace-nowrap"
            >
              Subscribe Now
            </Link>
          </div>
        </div>

        {/* Bottom section */}
        <div className="pt-8 border-t border-white/[0.04]">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-6 text-xs text-gray-500">
              <span>© {currentYear} {SITE_NAME}</span>
              <span>•</span>
              <span>All rights reserved</span>
              <span>•</span>
              <span>Made with ❤️ for the future</span>
            </div>
            
            {/* Back to top button */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center gap-2 text-xs text-gray-500 hover:text-blue-400 transition-colors duration-200 glass-card px-3 py-2 rounded-lg hover:bg-white/[0.05]"
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
              </svg>
              Back to top
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
