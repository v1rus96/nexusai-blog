import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllSlugs, getPostBySlug, getRelatedPosts, slugify } from "@/lib/posts";
import { SITE_NAME, SITE_URL } from "@/lib/constants";
import ReadingProgress from "@/components/ReadingProgress";
import ShareButtons from "@/components/ShareButtons";
import RelatedPosts from "@/components/RelatedPosts";
import NewsletterSignup from "@/components/NewsletterSignup";
import TableOfContents from "@/components/TableOfContents";
import AuthorCard from "@/components/AuthorCard";

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      url: `${SITE_URL}/blog/${slug}`,
      siteName: SITE_NAME,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-");
}

function extractText(children: React.ReactNode): string {
  if (typeof children === "string") return children;
  if (Array.isArray(children)) return children.map(extractText).join("");
  if (children && typeof children === "object" && "props" in children) {
    return extractText((children as React.ReactElement<{ children?: React.ReactNode }>).props.children);
  }
  return "";
}

const mdxComponents = {
  h1: (props: React.ComponentProps<"h1">) => (
    <h1 className="text-3xl sm:text-4xl font-bold mt-12 mb-6 tracking-tight scroll-mt-20" {...props} />
  ),
  h2: (props: React.ComponentProps<"h2">) => {
    const id = slugifyHeading(extractText(props.children));
    return <h2 id={id} className="text-2xl font-bold mt-14 mb-5 tracking-tight scroll-mt-20" {...props} />;
  },
  h3: (props: React.ComponentProps<"h3">) => {
    const id = slugifyHeading(extractText(props.children));
    return <h3 id={id} className="text-xl font-semibold mt-10 mb-4 scroll-mt-20" {...props} />;
  },
  p: (props: React.ComponentProps<"p">) => (
    <p className="my-6 leading-[1.75] text-gray-700 dark:text-gray-300 text-[17px]" {...props} />
  ),
  ul: (props: React.ComponentProps<"ul">) => (
    <ul className="my-5 ml-6 list-disc space-y-2.5 marker:text-blue-400/60" {...props} />
  ),
  ol: (props: React.ComponentProps<"ol">) => (
    <ol className="my-5 ml-6 list-decimal space-y-2.5 marker:text-blue-400/60" {...props} />
  ),
  li: (props: React.ComponentProps<"li">) => (
    <li className="leading-[1.75] text-gray-700 dark:text-gray-300 text-[17px] pl-1" {...props} />
  ),
  code: (props: React.ComponentProps<"code">) => (
    <code className="bg-blue-600/[0.08] dark:bg-white/[0.06] rounded-md px-2 py-1 text-[0.875em] font-mono text-blue-800 dark:text-blue-300" {...props} />
  ),
  pre: (props: React.ComponentProps<"pre">) => (
    <pre className="bg-gray-100 dark:bg-[#0D1117] border border-black/[0.08] dark:border-white/[0.06] rounded-xl p-6 overflow-x-auto my-8 text-[14px] leading-[1.6]" {...props} />
  ),
  blockquote: (props: React.ComponentProps<"blockquote">) => (
    <blockquote className="border-l-3 border-blue-600/40 dark:border-blue-500/50 pl-6 italic my-10 text-gray-600 dark:text-gray-400 bg-blue-500/[0.05] dark:bg-blue-500/[0.03] py-4 pr-4 rounded-r-xl" {...props} />
  ),
  a: (props: React.ComponentProps<"a">) => (
    <a className="text-blue-600 dark:text-blue-400 underline decoration-blue-600/30 dark:decoration-blue-500/30 underline-offset-[6px] hover:decoration-blue-600 dark:hover:decoration-blue-400 hover:decoration-2 transition-colors" {...props} />
  ),
  strong: (props: React.ComponentProps<"strong">) => (
    <strong className="font-semibold text-gray-900 dark:text-gray-100" {...props} />
  ),
  hr: () => (
    <hr className="my-12 border-black/[0.08] dark:border-white/[0.06]" />
  ),
  table: (props: React.ComponentProps<"table">) => (
    <div className="my-8 overflow-x-auto">
      <table className="w-full text-sm border-collapse" {...props} />
    </div>
  ),
  th: (props: React.ComponentProps<"th">) => (
    <th className="text-left font-semibold px-4 py-3 border-b border-black/[0.08] dark:border-white/[0.08] text-gray-900 dark:text-gray-200" {...props} />
  ),
  td: (props: React.ComponentProps<"td">) => (
    <td className="px-4 py-3 border-b border-black/[0.04] dark:border-white/[0.04] text-gray-700 dark:text-gray-300" {...props} />
  ),
};

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const relatedPosts = getRelatedPosts(slug, 2);

  // Extract headings for TOC
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const headings: { level: number; text: string; id: string }[] = [];
  let match;
  while ((match = headingRegex.exec(post.content)) !== null) {
    const text = match[2].replace(/\*\*/g, "").replace(/\*/g, "").replace(/`/g, "").replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
    headings.push({
      level: match[1].length,
      text,
      id: slugifyHeading(text),
    });
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: { "@type": "Person", name: post.author },
    publisher: { "@type": "Organization", name: SITE_NAME },
    url: `${SITE_URL}/blog/${slug}`,
    image: `${SITE_URL}/og-default.png`,
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/blog/${slug}` },
  };

  return (
    <>
      <ReadingProgress />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="max-w-3xl mx-auto">
        {/* Header */}
        <header className="mb-12">
          <div className="flex items-center gap-3 text-sm mb-6">
            <Link
              href={`/category/${slugify(post.category)}`}
              className="gradient-pill hover:scale-105 transition-transform"
            >
              <span className="block px-3 py-1 text-xs font-semibold text-blue-400">
                {post.category}
              </span>
            </Link>
            <span className="text-gray-500">
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            <span className="flex items-center gap-1 text-gray-500">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {post.readingTime}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-5 leading-tight">
            {post.title}
          </h1>

          <p className="text-lg text-gray-500 dark:text-gray-400 leading-relaxed mb-8">
            {post.description}
          </p>

          {post.image && (
            <div className="relative w-full aspect-[1200/630] rounded-xl overflow-hidden mb-8">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 800px"
                priority
              />
            </div>
          )}

          <div className="flex items-center justify-between flex-wrap gap-4 pb-8 border-b border-black/[0.06] dark:border-white/[0.06]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center text-white text-sm font-bold shadow-lg shadow-blue-500/20">
                {post.author.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-medium">{post.author}</p>
                <p className="text-xs text-gray-500">Author</p>
              </div>
            </div>
            <ShareButtons slug={slug} title={post.title} />
          </div>
        </header>

        {/* Table of Contents (mobile: inline above content) */}
        {headings.length >= 3 && (
          <TableOfContents headings={headings} />
        )}

        {/* Content */}
        <div className="prose-custom max-w-[680px]">
          <MDXRemote source={post.content} components={mdxComponents} />
        </div>

        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="mt-10 pt-8 border-t border-black/[0.06] dark:border-white/[0.06]">
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="gradient-pill"
                >
                  <span className="block px-3 py-1 text-xs font-medium text-gray-500 dark:text-gray-400">
                    #{tag}
                  </span>
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Author Card */}
        <div className="mt-10">
          <AuthorCard compact />
        </div>

        {/* Bottom nav */}
        <div className="mt-10 pt-8 border-t border-black/[0.06] dark:border-white/[0.06] flex items-center justify-between flex-wrap gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors group"
          >
            <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            </svg>
            Back to all posts
          </Link>
          <ShareButtons slug={slug} title={post.title} />
        </div>

        {/* Related */}
        <RelatedPosts posts={relatedPosts} />

        {/* Newsletter */}
        <div className="mt-16">
          <NewsletterSignup />
        </div>
      </article>
    </>
  );
}
