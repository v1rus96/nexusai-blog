import Link from "next/link";
import Image from "next/image";
import type { PostMeta } from "@/lib/posts";

export default function RelatedPosts({ posts }: { posts: PostMeta[] }) {
  if (posts.length === 0) return null;

  return (
    <section className="mt-12 mb-16">
      <div className="glass-card rounded-2xl p-8 bg-white/[0.06] backdrop-blur-sm border border-white/[0.08]">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-gray-900 dark:text-gray-200">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          Continue Reading
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group glass-card rounded-xl p-6 hover:bg-white/[0.08] dark:hover:bg-white/[0.08] transition-all duration-300 cursor-pointer bg-white/[0.06] backdrop-blur-sm border border-white/[0.08]"
            >
              <article className="flex gap-4">
                <div className="w-20 h-20 rounded-lg overflow-hidden bg-gradient-to-br from-blue-500/20 to-violet-600/20 flex-shrink-0 relative">
                  {post.image ? (
                    <Image 
                      src={post.image} 
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300" 
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs px-2 py-1 rounded-full bg-blue-500/10 text-blue-400 font-medium">
                      {post.category}
                    </span>
                    <span className="text-xs text-gray-500 flex items-center gap-1">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {post.readingTime}
                    </span>
                  </div>
                  
                  <h3 className="font-semibold text-sm line-clamp-2 group-hover:text-blue-400 transition-colors text-gray-900 dark:text-gray-200">
                    {post.title}
                  </h3>
                  
                  <div className="flex items-center mt-3 text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <div className="w-4 h-1 bg-gradient-to-r from-blue-500 to-violet-600 rounded-full"></div>
                      <span>90% match</span>
                    </div>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
