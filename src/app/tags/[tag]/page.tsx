import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getPostsByTag, getAllTags, slugify } from "@/lib/posts";
import { SITE_NAME, SITE_URL } from "@/lib/constants";
import PostCard from "@/components/PostCard";

export async function generateStaticParams() {
  return getAllTags().map((t) => ({ tag: slugify(t.tag) }));
}

type Props = { params: Promise<{ tag: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tag } = await params;
  // Find the display name from tags list
  const allTags = getAllTags();
  const found = allTags.find((t) => slugify(t.tag) === tag);
  const display = found?.tag ?? tag;

  return {
    title: `${display} Articles`,
    description: `Browse all articles tagged "${display}" on ${SITE_NAME}.`,
    alternates: { canonical: `/tags/${tag}` },
    openGraph: {
      title: `${display} Articles | ${SITE_NAME}`,
      description: `Browse all articles tagged "${display}" on ${SITE_NAME}.`,
      url: `${SITE_URL}/tags/${tag}`,
      siteName: SITE_NAME,
      images: [{ url: `${SITE_URL}/og-default.png`, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${display} Articles | ${SITE_NAME}`,
      description: `Browse all articles tagged "${display}" on ${SITE_NAME}.`,
      images: [`${SITE_URL}/og-default.png`],
    },
  };
}

export default async function TagPage({ params }: Props) {
  const { tag } = await params;
  const posts = getPostsByTag(tag);
  if (posts.length === 0) notFound();

  const allTags = getAllTags();
  const found = allTags.find((t) => slugify(t.tag) === tag);
  const display = found?.tag ?? tag;

  return (
    <>
      <div className="mb-12">
        <Link
          href="/tags"
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-[#E91E90] transition-colors mb-4"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
          </svg>
          All tags
        </Link>
        <div className="gradient-pill inline-block mb-4">
          <span className="block px-4 py-1.5 text-sm font-semibold text-[#E91E90]">
            {display}
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
          {display} Articles
        </h1>
        <p className="text-gray-400 text-lg">
          {posts.length} article{posts.length !== 1 ? "s" : ""} tagged with &ldquo;{display}&rdquo;
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </>
  );
}
