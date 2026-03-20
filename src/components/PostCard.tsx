import Link from "next/link";
import Image from "next/image";
import type { PostMeta } from "@/lib/posts";

export default function PostCard({ 
  post, 
  featured = false, 
  loading = false 
}: { 
  post?: PostMeta; 
  featured?: boolean;
  loading?: boolean;
}) {
  // Loading skeleton
  if (loading || !post) {
    return (
      <div className="animate-pulse">
        <div className="aspect-[16/11] bg-white/[0.05] rounded-xl mb-4"></div>
        <div className="space-y-3">
          <div className="h-3 bg-white/[0.05] rounded w-1/3"></div>
          <div className="h-5 bg-white/[0.08] rounded"></div>
          <div className="h-5 bg-white/[0.08] rounded w-3/4"></div>
        </div>
      </div>
    );
  }

  return (
    <article className="group transition-transform duration-300 hover:-translate-y-1">
      <Link href={`/blog/${post.slug}`} className="block">
        {/* Image */}
        <div className="relative overflow-hidden rounded-xl mb-4">
          {post.image ? (
            <Image
              src={post.image}
              alt={post.title}
              width={400}
              height={275}
              className="w-full aspect-[16/11] object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              loading="lazy"
            />
          ) : (
            <div className="w-full aspect-[16/11] bg-gradient-to-br from-[#E91E90]/10 to-[#C61884]/10 rounded-xl flex items-center justify-center">
              <svg className="w-10 h-10 text-[#E91E90]/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
          )}
        </div>

        {/* Meta: Date • Category */}
        <div className="flex items-center gap-2 text-xs mb-2">
          <time dateTime={post.date} className="text-white/[0.45]">
            {new Date(post.date).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </time>
          <span className="w-1 h-1 rounded-full bg-[#E91E90]" />
          <span className="text-white/[0.7]">{post.category}</span>
        </div>

        {/* Heading */}
        <h2 className="font-[family-name:var(--font-playfair)] text-xl font-bold text-white leading-snug line-clamp-2 group-hover:text-[#E91E90] transition-colors duration-200">
          {post.title}
        </h2>
      </Link>
    </article>
  );
}
