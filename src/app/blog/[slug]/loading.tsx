export default function BlogPostLoading() {
  return (
    <div className="max-w-3xl mx-auto animate-pulse">
      {/* Meta bar */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-16 h-7 rounded-full bg-gray-200/60 dark:bg-white/[0.04]" />
        <div className="w-28 h-4 rounded-lg bg-gray-200/60 dark:bg-white/[0.04]" />
        <div className="w-20 h-4 rounded-lg bg-gray-200/60 dark:bg-white/[0.04]" />
      </div>

      {/* Title */}
      <div className="space-y-3 mb-5">
        <div className="w-full h-10 rounded-lg bg-gray-200/60 dark:bg-white/[0.04]" />
        <div className="w-3/4 h-10 rounded-lg bg-gray-200/60 dark:bg-white/[0.04]" />
      </div>

      {/* Description */}
      <div className="space-y-2 mb-8">
        <div className="w-full h-5 rounded-lg bg-gray-200/60 dark:bg-white/[0.04]" />
        <div className="w-3/5 h-5 rounded-lg bg-gray-200/60 dark:bg-white/[0.04]" />
      </div>

      {/* Author */}
      <div className="flex items-center gap-3 mb-8 pb-8 border-b border-black/[0.06] dark:border-white/[0.06]">
        <div className="w-10 h-10 rounded-xl bg-gray-200/60 dark:bg-white/[0.04]" />
        <div className="space-y-2">
          <div className="w-28 h-4 rounded-lg bg-gray-200/60 dark:bg-white/[0.04]" />
          <div className="w-16 h-3 rounded-lg bg-gray-200/60 dark:bg-white/[0.04]" />
        </div>
      </div>

      {/* Content skeleton */}
      <div className="space-y-3 mb-8">
        {[100, 100, 95, 88].map((w, i) => (
          <div key={i} className="h-4 rounded-lg bg-gray-200/60 dark:bg-white/[0.04]" style={{ width: `${w}%` }} />
        ))}
      </div>
      <div className="h-8" />
      <div className="space-y-3 mb-8">
        {[100, 92, 100].map((w, i) => (
          <div key={i} className="h-4 rounded-lg bg-gray-200/60 dark:bg-white/[0.04]" style={{ width: `${w}%` }} />
        ))}
      </div>
      <div className="h-8" />
      <div className="space-y-3">
        {[100, 100, 97, 85, 90].map((w, i) => (
          <div key={i} className="h-4 rounded-lg bg-gray-200/60 dark:bg-white/[0.04]" style={{ width: `${w}%` }} />
        ))}
      </div>
    </div>
  );
}
