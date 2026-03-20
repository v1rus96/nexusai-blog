import Link from "next/link";
import Image from "next/image";
import { getAllPosts } from "@/lib/posts";
import PostCard from "@/components/PostCard";
import NewsletterSignup from "@/components/NewsletterSignup";

export default function HomePage() {
  const posts = getAllPosts();
  const featured = posts[0];
  const rest = posts.slice(1);

  return (
    <>
      {/* Hero — 2-column layout */}
      {featured && (
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center py-8 sm:py-12 mb-12 sm:mb-16">
          {/* Left — Featured image with decoration */}
          <div className="relative">
            <Link href={`/blog/${featured.slug}`} className="block">
              <div className="relative overflow-hidden rounded-xl">
                {featured.image ? (
                  <Image
                    src={featured.image}
                    alt={featured.title}
                    width={600}
                    height={450}
                    className="w-full aspect-[4/3] object-cover rounded-xl transition-transform duration-500 hover:scale-105"
                    priority
                  />
                ) : (
                  <div className="w-full aspect-[4/3] bg-gradient-to-br from-[#E91E90]/20 to-[#C61884]/20 rounded-xl flex items-center justify-center">
                    <svg className="w-16 h-16 text-[#E91E90]/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                )}
              </div>
            </Link>
            
            {/* Pink dot grid decoration — bottom-left */}
            <div className="absolute -bottom-3 -left-3 w-16 h-16 dot-grid opacity-60 pointer-events-none" />
            
            {/* Pink spark decoration — top-left */}
            <div className="absolute -top-2 -left-2 text-[#E91E90] pointer-events-none">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0L14.59 8.41L24 12L14.59 15.59L12 24L9.41 15.59L0 12L9.41 8.41Z" />
              </svg>
            </div>
          </div>

          {/* Right — Content */}
          <div className="flex flex-col gap-5">
            {/* Meta: Date • Category */}
            <div className="flex items-center gap-3 text-sm">
              <time dateTime={featured.date} className="text-white/50">
                {new Date(featured.date).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </time>
              <span className="w-1.5 h-1.5 rounded-full bg-[#E91E90]" />
              <span className="text-white/80">{featured.category}</span>
            </div>

            {/* Heading */}
            <h1 className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl lg:text-[44px] font-bold text-white leading-tight">
              {featured.title}
            </h1>

            {/* Description */}
            <p className="text-white/50 text-base leading-relaxed max-w-lg">
              {featured.description}
            </p>

            {/* CTA Button */}
            <Link
              href={`/blog/${featured.slug}`}
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-[#C61884] to-[#E91E90] text-white text-[15px] font-medium rounded-full w-fit hover:shadow-lg hover:shadow-[#E91E90]/30 transition-all duration-300 hover:-translate-y-0.5 mt-2"
            >
              Continue Reading
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </section>
      )}

      {/* Blog Cards — 3-column grid */}
      {rest.length > 0 && (
        <section className="mb-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {rest.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </section>
      )}

      {posts.length === 0 && (
        <p className="text-center text-white/50 py-16">
          No posts yet. Check back soon!
        </p>
      )}

      {/* Newsletter */}
      <section className="mt-20 mb-8">
        <NewsletterSignup />
      </section>
    </>
  );
}
