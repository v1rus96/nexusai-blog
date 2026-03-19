import Link from "next/link";
import { SITE_NAME, SITE_DESCRIPTION, CATEGORIES } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-black/[0.06] dark:border-white/[0.06]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-md bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center text-white text-xs font-bold">
              T
            </span>
            <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">
              {SITE_NAME}
            </span>
          </div>

          <nav className="flex items-center gap-2 sm:gap-3 flex-wrap justify-center">
            {CATEGORIES.map((cat, i) => (
              <span key={cat} className="flex items-center gap-2 sm:gap-3">
                <Link
                  href={`/category/${cat.toLowerCase()}`}
                  className="text-sm text-gray-500 hover:text-gray-900 dark:hover:text-gray-300 transition-colors"
                >
                  {cat}
                </Link>
                {i < CATEGORIES.length - 1 && (
                  <span className="text-gray-400 dark:text-gray-600">·</span>
                )}
              </span>
            ))}
            <span className="text-gray-400 dark:text-gray-600">·</span>
            <Link
              href="/tags"
              className="text-sm text-gray-500 hover:text-gray-900 dark:hover:text-gray-300 transition-colors"
            >
              Tags
            </Link>
            <span className="text-gray-400 dark:text-gray-600">·</span>
            <Link
              href="/about"
              className="text-sm text-gray-500 hover:text-gray-900 dark:hover:text-gray-300 transition-colors"
            >
              About
            </Link>
            <span className="text-gray-400 dark:text-gray-600">·</span>
            <Link
              href="/subscribe"
              className="text-sm text-gray-500 hover:text-gray-900 dark:hover:text-gray-300 transition-colors"
            >
              Subscribe
            </Link>
            <span className="text-gray-400 dark:text-gray-600">·</span>
            <Link
              href="/rss"
              className="text-sm text-gray-500 hover:text-gray-900 dark:hover:text-gray-300 transition-colors"
            >
              RSS
            </Link>
          </nav>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500/80 max-w-md mx-auto">
            {SITE_DESCRIPTION}
          </p>
        </div>

        <div className="mt-8 pt-6 border-t border-black/[0.04] dark:border-white/[0.04] text-center">
          <p className="text-xs text-gray-400 dark:text-gray-600">
            © {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
