import RSS from "rss";
import { getAllPosts } from "@/lib/posts";
import { SITE_NAME, SITE_DESCRIPTION, SITE_URL } from "@/lib/constants";

export async function GET() {
  const feed = new RSS({
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    site_url: SITE_URL,
    feed_url: `${SITE_URL}/rss`,
    language: "en",
  });

  const posts = getAllPosts();
  posts.forEach((post) => {
    feed.item({
      title: post.title,
      description: post.description,
      url: `${SITE_URL}/blog/${post.slug}`,
      date: post.date,
      categories: [post.category],
      author: post.author,
    });
  });

  return new Response(feed.xml({ indent: true }), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}
