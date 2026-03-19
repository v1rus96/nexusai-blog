import { MetadataRoute } from "next";
import { getAllPosts, getAllCategories, getAllTags, slugify } from "@/lib/posts";
import { getAllAuthors } from "@/data/authors";
import { SITE_URL } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts().map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const categories = getAllCategories().map((cat) => ({
    url: `${SITE_URL}/category/${slugify(cat)}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  const tags = getAllTags().map((t) => ({
    url: `${SITE_URL}/tags/${slugify(t.tag)}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.5,
  }));

  const authors = getAllAuthors().map((a) => ({
    url: `${SITE_URL}/author/${a.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    ...posts,
    ...categories,
    {
      url: `${SITE_URL}/tags`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.6,
    },
    ...tags,
    ...authors,
    {
      url: `${SITE_URL}/subscribe`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];
}
