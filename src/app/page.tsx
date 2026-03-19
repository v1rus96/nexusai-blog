import { getAllPosts } from "@/lib/posts";
import { SITE_TAGLINE } from "@/lib/constants";
import PostCard from "@/components/PostCard";
import NewsletterSignup from "@/components/NewsletterSignup";

export default function HomePage() {
  const posts = getAllPosts();
  const featured = posts[0];
  const rest = posts.slice(1);

  return (
    <>
      {/* Hero */}
      <section className="relative text-center py-16 sm:py-24 mb-16">
        {/* Decorative orbs */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-glow-pulse pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-violet-500/10 rounded-full blur-3xl animate-glow-pulse pointer-events-none" style={{ animationDelay: "2s" }} />

        <div className="relative">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-black/[0.06] dark:border-white/[0.08] bg-white/[0.6] dark:bg-white/[0.03] backdrop-blur-sm text-sm font-medium text-gray-500 dark:text-gray-400 mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Exploring the future of technology
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6 animate-gradient-text leading-tight">
            {SITE_TAGLINE}
          </h1>

          <p className="text-lg sm:text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Deep dives into artificial intelligence and blockchain technology —
            cutting through the hype to find what actually matters.
          </p>
        </div>
      </section>

      {/* Featured Post */}
      {featured && (
        <section className="mb-16">
          <div className="flex items-center gap-4 mb-8">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-black/[0.06] dark:via-white/[0.08] to-transparent" />
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-[0.2em]">Featured</span>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-black/[0.06] dark:via-white/[0.08] to-transparent" />
          </div>
          <PostCard post={featured} featured />
        </section>
      )}

      {/* Bento Grid */}
      {rest.length > 0 && (
        <section className="mb-16">
          <div className="flex items-center gap-4 mb-8">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-black/[0.06] dark:via-white/[0.08] to-transparent" />
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-[0.2em]">Latest</span>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-black/[0.06] dark:via-white/[0.08] to-transparent" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {rest.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </section>
      )}

      {posts.length === 0 && (
        <p className="text-center text-gray-500 py-16">
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
