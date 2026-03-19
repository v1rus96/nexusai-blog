import Link from "next/link";
import type { PostMeta } from "@/lib/posts";

export default function RelatedPosts({ posts }: { posts: PostMeta[] }) {
  if (posts.length === 0) return null;

  return (
    <section className="mt-16 pt-10 border-t border-white/[0.06]">
      <h2 className="text-xl font-bold mb-6">Related Articles</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group glass-card block p-5 rounded-2xl"
          >
            <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
              <span className="gradient-pill">
                <span className="block px-2.5 py-0.5 font-medium text-blue-400">
                  {post.category}
                </span>
              </span>
              <span className="flex items-center gap-1">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {post.readingTime}
              </span>
            </div>
            <h3 className="font-semibold group-hover:text-blue-400 transition-colors line-clamp-2">
              {post.title}
            </h3>
            <p className="mt-2 text-sm text-gray-500 line-clamp-2">
              {post.description}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
