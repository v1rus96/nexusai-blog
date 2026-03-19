import { Metadata } from "next";
import Link from "next/link";
import { getAllTags, slugify } from "@/lib/posts";
import { SITE_NAME, SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Tags",
  description: `Browse all topics and tags on ${SITE_NAME}.`,
  alternates: { canonical: "/tags" },
  openGraph: {
    title: `Tags | ${SITE_NAME}`,
    description: `Browse all topics and tags on ${SITE_NAME}.`,
    url: `${SITE_URL}/tags`,
    siteName: SITE_NAME,
    images: [{ url: `${SITE_URL}/og-default.png`, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: `Tags | ${SITE_NAME}`,
    description: `Browse all topics and tags on ${SITE_NAME}.`,
    images: [`${SITE_URL}/og-default.png`],
  },
};

export default function TagsPage() {
  const tags = getAllTags();

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3 animate-gradient-text">
          Tags
        </h1>
        <p className="text-gray-400 text-lg">
          Browse articles by topic.
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        {tags.map(({ tag, count }) => (
          <Link
            key={tag}
            href={`/tags/${slugify(tag)}`}
            className="glass-card rounded-xl px-4 py-2.5 flex items-center gap-2 hover:!border-blue-500/30 transition-all group"
          >
            <span className="text-sm font-medium text-gray-300 group-hover:text-blue-400 transition-colors">
              {tag}
            </span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-white/[0.06] text-gray-500 group-hover:text-blue-400/80 transition-colors">
              {count}
            </span>
          </Link>
        ))}
      </div>

      {tags.length === 0 && (
        <div className="glass-card rounded-2xl p-8 text-center">
          <p className="text-gray-500">No tags found.</p>
        </div>
      )}
    </div>
  );
}
