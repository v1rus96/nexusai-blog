"use client";

import { useState, useEffect, useRef } from "react";
import { BUTTONDOWN_USERNAME } from "@/lib/constants";

const STORAGE_KEY = "newsletter_subscribed";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "already" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    try {
      if (localStorage.getItem(STORAGE_KEY)) {
        setStatus("already");
      }
    } catch {
      // localStorage unavailable
    }
  }, []);

  // Show success animation
  useEffect(() => {
    if (status === "success") {
      setShowSuccess(true);
      const timer = setTimeout(() => setShowSuccess(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus("success");
        try { localStorage.setItem(STORAGE_KEY, "1"); } catch {}
        setEmail("");
      } else {
        setStatus("error");
        setErrorMsg(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      // Network error — fall back to direct form submission
      submitViaForm();
    }
  };

  const submitViaForm = () => {
    // Create a hidden form and submit directly to Buttondown
    const form = document.createElement("form");
    form.method = "POST";
    form.action = `https://buttondown.com/api/emails/embed-subscribe/${BUTTONDOWN_USERNAME}`;
    form.target = "_blank";

    const input = document.createElement("input");
    input.type = "email";
    input.name = "email";
    input.value = email;
    form.appendChild(input);

    const tag = document.createElement("input");
    tag.type = "hidden";
    tag.name = "tag";
    tag.value = "website";
    form.appendChild(tag);

    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);

    setStatus("success");
    try { localStorage.setItem(STORAGE_KEY, "1"); } catch {}
    setEmail("");
  };

  return (
    <section className="relative overflow-hidden rounded-2xl glass-card border border-white/[0.08] hover:border-white/[0.12] transition-all duration-300">
      {/* Enhanced gradient glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#E91E90]/8 via-[#E91E90]/4 to-cyan-500/8 pointer-events-none" />
      <div className="absolute -top-32 -right-32 w-64 h-64 bg-[#E91E90]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-[#E91E90]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

      <div className="relative p-8 sm:p-10">
        {status === "success" || status === "already" ? (
          <div className="text-center py-6">
            <div className={`text-5xl mb-4 transition-all duration-500 ${
              showSuccess ? 'animate-bounce' : ''
            }`}>
              {status === "already" ? "👋" : "🎉"}
            </div>
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-[#C61884] mx-auto mb-4 flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-[#E91E90] to-[#E91E90] bg-clip-text text-transparent">
              {status === "already" ? "You're already in the club!" : "Welcome to the future!"}
            </h3>
            <p className="text-gray-400 max-w-md mx-auto leading-relaxed">
              {status === "already"
                ? "We've got your email. You'll continue receiving our cutting-edge insights on AI and blockchain technologies."
                : "Check your inbox for a confirmation email. Get ready for weekly doses of AI & blockchain insights — curated by experts, delivered with precision."}
            </p>
            {status === "success" && (
              <div className="mt-6 flex items-center justify-center gap-4 text-xs text-gray-500">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-[#E91E90] rounded-full animate-pulse"></div>
                  <span>Premium content</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-[#E91E90] rounded-full animate-pulse"></div>
                  <span>Weekly insights</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse"></div>
                  <span>No spam ever</span>
                </div>
              </div>
            )}
          </div>
        ) : (
          <>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#C61884] to-[#E91E90] flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-[#E91E90] to-[#E91E90] bg-clip-text text-transparent">
                  Join 10,000+ Tech Leaders
                </h3>
                <p className="text-xs text-gray-500">Weekly AI & Blockchain insights</p>
              </div>
            </div>
            
            <p className="text-gray-400 mb-6 max-w-lg leading-relaxed">
              Get exclusive insights on emerging AI models, blockchain innovations, and Web3 trends. 
              <span className="text-[#E91E90] font-medium"> Curated by industry experts</span>, 
              delivered every Tuesday.
            </p>

            {/* Benefits list */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-[#E91E90] rounded-full"></div>
                <span className="text-gray-300">AI breakthroughs</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-[#E91E90] rounded-full"></div>
                <span className="text-gray-300">DeFi updates</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                <span className="text-gray-300">Market analysis</span>
              </div>
            </div>
            
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your.email@company.com"
                    required
                    disabled={status === "loading"}
                    className="w-full px-4 py-4 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#E91E90]/50 focus:border-[#E91E90]/50 transition-all disabled:opacity-50 hover:border-white/[0.12]"
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
                
                <button
                  type="submit"
                  disabled={status === "loading" || !email}
                  className="px-8 py-4 bg-gradient-to-r from-[#C61884] to-[#E91E90] text-white font-semibold rounded-xl hover:shadow-xl hover:shadow-[#E91E90]/25 transition-all duration-300 whitespace-nowrap hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 relative overflow-hidden group"
                >
                  {status === "loading" ? (
                    <div className="flex items-center gap-2">
                      <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25"></circle>
                        <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" className="opacity-75"></path>
                      </svg>
                      Subscribing...
                    </div>
                  ) : (
                    <span className="flex items-center gap-2">
                      Get Started Free
                      <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                  )}
                  
                  {/* Button shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                </button>
              </div>

              <div className="flex items-center text-xs text-gray-500">
                <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span>100% privacy protected • Unsubscribe anytime • Join 10,000+ readers</span>
              </div>
            </form>

            {/* Enhanced error state */}
            {status === "error" && (
              <div className="mt-4 p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-red-400 font-medium text-sm">Subscription failed</p>
                    <p className="text-red-400/80 text-xs">{errorMsg || "Something went wrong. Please try again or contact support."}</p>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
