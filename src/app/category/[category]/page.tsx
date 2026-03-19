import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPostsByCategory, getAllCategories, slugify } from "@/lib/posts";
import { SITE_NAME, SITE_URL } from "@/lib/constants";
import PostCard from "@/components/PostCard";

export async function generateStaticParams() {
  return getAllCategories().map((c) => ({ category: slugify(c) }));
}

type Props = { params: Promise<{ category: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const display = category.charAt(0).toUpperCase() + category.slice(1);
  return {
    title: `${display} Articles`,
    description: `Browse all ${display} articles on ${SITE_NAME}.`,
    alternates: { canonical: `/category/${category}` },
    openGraph: {
      title: `${display} Articles | ${SITE_NAME}`,
      description: `Browse all ${display} articles on ${SITE_NAME}.`,
      url: `${SITE_URL}/category/${category}`,
      siteName: SITE_NAME,
      images: [{ url: `${SITE_URL}/og-default.png`, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${display} Articles | ${SITE_NAME}`,
      description: `Browse all ${display} articles on ${SITE_NAME}.`,
      images: [`${SITE_URL}/og-default.png`],
    },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const posts = getPostsByCategory(category);
  if (posts.length === 0) notFound();

  const display = category.charAt(0).toUpperCase() + category.slice(1);

  return (
    <>
      <div className="mb-12">
        <div className="gradient-pill inline-block mb-4">
          <span className="block px-4 py-1.5 text-sm font-semibold text-blue-400">
            {display}
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">{display} Articles</h1>
        <p className="text-gray-400 text-lg">
          All articles in the {display} category.
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
