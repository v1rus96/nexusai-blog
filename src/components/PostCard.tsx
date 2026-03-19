import Link from "next/link";
import Image from "next/image";
import type { PostMeta } from "@/lib/posts";
import { slugify } from "@/lib/posts";

export default function PostCard({ post, featured = false }: { post: PostMeta; featured?: boolean }) {
  return (
    <article className={`group glass-card rounded-2xl overflow-hidden ${featured ? "" : ""}`}>
      <Link href={`/blog/${post.slug}`} className="block">
        {post.image && (
          <div className="relative w-full aspect-video overflow-hidden rounded-t-xl">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes={featured ? "(max-width: 768px) 100vw, 1200px" : "(max-width: 768px) 100vw, 600px"}
              loading="lazy"
            />
          </div>
        )}
      <div className={featured ? "p-8 sm:p-10" : "p-6"}>
        <div className="flex items-center gap-3 text-sm mb-4">
          <span className="gradient-pill">
            <span className="block px-3 py-1 text-xs font-semibold text-blue-400 dark:text-blue-300">
              {post.category}
            </span>
          </span>
          <span className="text-gray-500 dark:text-gray-500">
            {new Date(post.date).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </span>
          <span className="flex items-center gap-1 text-gray-500 dark:text-gray-500">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {post.readingTime}
          </span>
        </div>

        <h2 className={`font-bold mb-3 transition-colors duration-200 group-hover:text-blue-400 ${
          featured ? "text-2xl sm:text-3xl" : "text-xl"
        }`}>
          {post.title}
        </h2>

        <p className={`text-gray-500 dark:text-gray-400 leading-relaxed ${
          featured ? "text-lg line-clamp-3" : "line-clamp-2 text-sm"
        }`}>
          {post.description}
        </p>

        <div className="mt-5 inline-flex items-center text-sm font-medium text-blue-400 group-hover:text-blue-300 transition-all duration-200">
          <span>Read article</span>
          <svg className="w-4 h-4 ml-1.5 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      </div>
      </Link>
    </article>
  );
}
