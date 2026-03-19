export default function CategoryLoading() {
  return (
    <div className="animate-pulse">
      {/* Header */}
      <div className="mb-12">
        <div className="w-20 h-8 rounded-full bg-gray-200/60 dark:bg-white/[0.04] mb-4" />
        <div className="w-48 h-10 rounded-lg bg-gray-200/60 dark:bg-white/[0.04] mb-3" />
        <div className="w-64 h-5 rounded-lg bg-gray-200/60 dark:bg-white/[0.04]" />
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {[1, 2].map((i) => (
          <div key={i} className="glass-card rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-14 h-6 rounded-full bg-gray-200/60 dark:bg-white/[0.04]" />
              <div className="w-24 h-4 rounded-lg bg-gray-200/60 dark:bg-white/[0.04]" />
              <div className="w-16 h-4 rounded-lg bg-gray-200/60 dark:bg-white/[0.04]" />
            </div>
            <div className="w-4/5 h-6 rounded-lg bg-gray-200/60 dark:bg-white/[0.04] mb-3" />
            <div className="space-y-2 mb-4">
              <div className="w-full h-3.5 rounded-lg bg-gray-200/60 dark:bg-white/[0.04]" />
              <div className="w-full h-3.5 rounded-lg bg-gray-200/60 dark:bg-white/[0.04]" />
            </div>
            <div className="w-24 h-3.5 rounded-lg bg-gray-200/60 dark:bg-white/[0.04]" />
          </div>
        ))}
      </div>
    </div>
  );
}
