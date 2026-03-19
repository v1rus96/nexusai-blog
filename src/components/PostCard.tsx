import Link from "next/link";
import Image from "next/image";
import type { PostMeta } from "@/lib/posts";
import { slugify } from "@/lib/posts";

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
      <div className="glass-card rounded-2xl overflow-hidden animate-pulse border border-white/[0.05]">
        <div className="aspect-video bg-gray-800"></div>
        <div className="p-6 space-y-4">
          <div className="h-4 bg-gray-800 rounded w-1/3"></div>
          <div className="h-6 bg-gray-700 rounded"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-800 rounded"></div>
            <div className="h-4 bg-gray-800 rounded w-2/3"></div>
          </div>
          <div className="flex gap-2">
            <div className="h-6 bg-gray-800 rounded w-16"></div>
            <div className="h-6 bg-gray-800 rounded w-20"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <article className={`group glass-card rounded-2xl overflow-hidden hover:bg-white/[0.08] transition-all duration-300 border border-white/[0.05] hover:border-white/[0.10] ${featured ? "" : ""}`}>
      <Link href={`/blog/${post.slug}`} className="block">
        {/* Image section with enhanced hover effects */}
        <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-blue-500/10 to-violet-600/10">
          {post.image ? (
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover transition-all duration-500 group-hover:scale-105 group-hover:brightness-110"
              sizes={featured ? "(max-width: 768px) 100vw, 1200px" : "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"}
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <svg className="w-12 h-12 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0120 12c0-4.418-3.582-8-8-8s-8 3.582-8 8 3.582 8 8 8c1.846 0 3.543-.635 4.889-1.709" />
              </svg>
            </div>
          )}
          
          {/* Category badge overlay */}
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 bg-blue-600/90 backdrop-blur-sm text-white text-xs font-semibold rounded-full">
              {post.category}
            </span>
          </div>
          
          {/* Reading time badge */}
          <div className="absolute bottom-4 right-4">
            <span className="px-2 py-1 bg-black/60 backdrop-blur-sm text-white text-xs rounded-lg flex items-center gap-1">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {post.readingTime}
            </span>
          </div>
        </div>

        <div className={featured ? "p-8 sm:p-10" : "p-6"}>
          <div className="flex items-center gap-3 text-xs mb-3 text-gray-500">
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </time>
            
            {post.author && (
              <>
                <span>•</span>
                <span>{post.author}</span>
              </>
            )}
          </div>

          <h2 className={`font-bold mb-3 line-clamp-2 group-hover:text-blue-400 transition-colors duration-200 ${
            featured ? "text-2xl sm:text-3xl" : "text-xl"
          }`}>
            {post.title}
          </h2>

          <p className={`text-gray-400 leading-relaxed mb-4 ${
            featured ? "text-lg line-clamp-3" : "line-clamp-3 text-sm"
          }`}>
            {post.description}
          </p>
          
          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.slice(0, 3).map((tag, index) => (
                <span 
                  key={index}
                  className="px-2 py-1 bg-gray-800 text-gray-400 text-xs rounded-lg"
                >
                  #{tag}
                </span>
              ))}
              {post.tags.length > 3 && (
                <span className="px-2 py-1 bg-gray-800 text-gray-400 text-xs rounded-lg">
                  +{post.tags.length - 3}
                </span>
              )}
            </div>
          )}
          
          {/* Enhanced footer with engagement indicators */}
          <div className="flex items-center justify-between">
            <span className="text-blue-400 text-sm font-medium group-hover:text-blue-300 transition-colors">
              Read more →
            </span>
            
            {/* Engagement indicators */}
            <div className="flex items-center gap-3 text-xs text-gray-600">
              <span className="flex items-center gap-1">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                2.3k
              </span>
              <span className="flex items-center gap-1">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                45
              </span>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}
