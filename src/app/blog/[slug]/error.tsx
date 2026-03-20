"use client";

import Link from "next/link";

export default function BlogPostError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="max-w-md mx-auto text-center px-4">
        {/* Icon */}
        <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-[#E91E90]/50 to-[#C61884]/50 flex items-center justify-center opacity-50">
          <span className="text-white text-2xl font-bold">N</span>
        </div>

        <h2 className="text-2xl font-bold mb-3 text-gray-900 text-white">
          Something went wrong
        </h2>
        <p className="text-gray-500 text-white/60 mb-8 text-sm">
          We couldn&apos;t load this article. Please try again.
        </p>

        <div className="flex justify-center gap-3">
          <button
            onClick={() => reset()}
            className="bg-gradient-to-r from-[#C61884] to-[#E91E90] text-white font-semibold rounded-xl px-6 py-3 text-sm hover:opacity-90 transition-opacity"
          >
            Try again
          </button>
          <Link
            href="/"
            className="glass-card rounded-xl px-6 py-3 text-sm font-medium text-gray-500 text-white/60 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
