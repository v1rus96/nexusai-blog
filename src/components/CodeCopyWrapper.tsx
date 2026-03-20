"use client";

import { useRef, useCallback, useState } from "react";

export default function CodeCopyWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    if (!ref.current) return;
    const pre = ref.current.querySelector("pre");
    const code = pre?.textContent || "";
    try {
      await navigator.clipboard.writeText(code);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = code;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, []);

  return (
    <div ref={ref} className="relative group">
      {children}
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 p-2 bg-white/10 hover:bg-white/20 rounded-lg cursor-pointer transition-colors duration-200 opacity-0 group-hover:opacity-100 focus-visible:opacity-100 focus-visible:ring-2 focus-visible:ring-[#E91E90]/50 [@media(hover:none)]:opacity-100"
        aria-label={copied ? "Copied!" : "Copy code to clipboard"}
        tabIndex={0}
      >
        <div className="relative w-4 h-4">
          <svg
            className={`w-4 h-4 text-white/60 absolute inset-0 transition-opacity duration-200 ${
              copied ? "opacity-0" : "opacity-100"
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth={2}
          >
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
            <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
          </svg>
          <svg
            className={`w-4 h-4 text-green-400 absolute inset-0 transition-opacity duration-200 ${
              copied ? "opacity-100" : "opacity-0"
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth={2}
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
      </button>
    </div>
  );
}
