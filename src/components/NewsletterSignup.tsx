"use client";

import { useState, useEffect } from "react";

const STORAGE_KEY = "newsletter_email";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [alreadySignedUp, setAlreadySignedUp] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setAlreadySignedUp(true);
        setSubmitted(true);
      }
    } catch {
      // localStorage unavailable
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      try {
        localStorage.setItem(STORAGE_KEY, email);
      } catch {
        // localStorage unavailable
      }
      setSubmitted(true);
      setEmail("");
    }
  };

  return (
    <section className="relative overflow-hidden rounded-2xl glass-card !p-0">
      {/* Gradient glow behind */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-violet-500/5 to-cyan-500/10 pointer-events-none" />
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-violet-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative p-8 sm:p-10">
        {submitted ? (
          <div className="text-center py-4">
            <div className="text-4xl mb-3">{alreadySignedUp ? "👋" : "✨"}</div>
            <h3 className="text-xl font-bold mb-2">
              {alreadySignedUp ? "You're already signed up!" : "Newsletter launching soon — we'll notify you when it's live!"}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {alreadySignedUp
                ? "We've got your email. We'll let you know when the newsletter goes live."
                : "Thanks for your interest! We're setting things up and will reach out soon."}
            </p>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-2 mb-2">
              <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <h3 className="text-xl font-bold">Stay ahead of the curve</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-lg text-sm">
              Get the latest insights on AI and blockchain delivered straight to your inbox. No spam, just signal.
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="flex-1 px-4 py-3 rounded-xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/[0.1] dark:border-white/[0.08] text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/40 transition-all text-sm"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-violet-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 whitespace-nowrap cursor-pointer text-sm hover:scale-[1.02] active:scale-[0.98]"
              >
                Subscribe
              </button>
            </form>
          </>
        )}
      </div>
    </section>
  );
}
