"use client";

import { useState, useEffect, useRef } from "react";
import { BUTTONDOWN_USERNAME } from "@/lib/constants";

const STORAGE_KEY = "newsletter_subscribed";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "already" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch(
        `https://api.buttondown.com/v1/subscribers`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email_address: email,
            tags: ["website"],
          }),
        }
      );

      if (res.ok || res.status === 201) {
        setStatus("success");
        try { localStorage.setItem(STORAGE_KEY, "1"); } catch {}
        setEmail("");
      } else if (res.status === 409) {
        // Already subscribed
        setStatus("already");
        try { localStorage.setItem(STORAGE_KEY, "1"); } catch {}
      } else {
        // Fallback: submit via Buttondown's plain form endpoint (no CORS issues)
        submitViaForm();
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
    <section className="relative overflow-hidden rounded-2xl glass-card !p-0">
      {/* Gradient glow behind */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-violet-500/5 to-cyan-500/10 pointer-events-none" />
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-violet-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative p-8 sm:p-10">
        {status === "success" || status === "already" ? (
          <div className="text-center py-4">
            <div className="text-4xl mb-3">{status === "already" ? "👋" : "✨"}</div>
            <h3 className="text-xl font-bold mb-2">
              {status === "already" ? "You're already subscribed!" : "You're in! Welcome aboard."}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {status === "already"
                ? "We've got your email. You'll get our latest insights delivered straight to your inbox."
                : "Check your inbox for a confirmation email. We'll send you the best of AI & blockchain — no spam, just signal."}
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
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3 max-w-md"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                disabled={status === "loading"}
                className="flex-1 px-4 py-3 rounded-xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/[0.1] dark:border-white/[0.08] text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/40 transition-all text-sm disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-violet-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 whitespace-nowrap cursor-pointer text-sm hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === "loading" ? "Subscribing..." : "Subscribe"}
              </button>
            </form>
            {status === "error" && (
              <p className="text-red-500 text-sm mt-2">{errorMsg || "Something went wrong. Please try again."}</p>
            )}
          </>
        )}
      </div>
    </section>
  );
}
