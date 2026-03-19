export default function AuthorCard({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={`glass-card rounded-2xl flex items-center gap-6 ${
        compact ? "p-5 sm:p-6" : "p-6 sm:p-8"
      }`}
    >
      <div
        className={`flex-shrink-0 rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center text-white font-bold shadow-lg shadow-blue-500/20 ${
          compact ? "w-12 h-12 text-lg" : "w-16 h-16 text-2xl"
        }`}
      >
        N
      </div>
      <div>
        <p className={`font-bold text-gray-900 dark:text-gray-100 ${compact ? "text-lg" : "text-xl"}`}>
          NexusAI Team
        </p>
        {!compact && (
          <p className="text-sm text-blue-600 dark:text-blue-400 mb-1">NexusAI Team</p>
        )}
        <p className={`text-gray-600 dark:text-gray-400 leading-relaxed ${compact ? "text-sm" : "text-sm"}`}>
          {compact
            ? "Technologists and writers exploring the frontier of AI and decentralized systems."
            : "Technologists and writers exploring the frontier of AI and decentralized systems. We focus on what's real, what works, and what matters."}
        </p>
      </div>
    </div>
  );
}
