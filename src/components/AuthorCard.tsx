import Link from "next/link";
import { getAuthorByName } from "@/data/authors";

export default function AuthorCard({ compact = false, authorName }: { compact?: boolean; authorName?: string }) {
  const author = getAuthorByName(authorName || "Firuz Akhmadov");

  const name = author?.name ?? "Firuz Akhmadov";
  const slug = author?.slug ?? "firuz-akhmadov";
  const title = author?.company ?? "LionTech AI";
  const description = compact
    ? author?.shortBio ?? "Founder of LionTech AI. Building at the intersection of AI and blockchain."
    : author?.bio ?? "Founder of LionTech AI, building at the intersection of AI and blockchain technology.";

  return (
    <Link href={`/author/${slug}`} className="block">
      <div
        className={`glass-card rounded-2xl flex items-center gap-6 ${
          compact ? "p-5 sm:p-6" : "p-6 sm:p-8"
        }`}
      >
        <div
          className={`flex-shrink-0 rounded-xl bg-gradient-to-br from-[#C61884] to-[#E91E90] flex items-center justify-center text-white font-bold shadow-lg shadow-[#E91E90]/20 ${
            compact ? "w-12 h-12 text-lg" : "w-16 h-16 text-2xl"
          }`}
        >
          {name.charAt(0)}
        </div>
        <div>
          <p className={`font-bold text-gray-900 text-white ${compact ? "text-lg" : "text-xl"}`}>
            {name}
          </p>
          {!compact && (
            <p className="text-sm text-[#C61884] dark:text-[#E91E90] mb-1">{title}</p>
          )}
          <p className={`text-gray-600 text-white/60 leading-relaxed ${compact ? "text-sm" : "text-sm"}`}>
            {description}
          </p>
        </div>
      </div>
    </Link>
  );
}
