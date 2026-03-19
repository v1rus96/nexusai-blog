import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const postsDirectory = path.join(process.cwd(), "content/posts");

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-");
}

export interface PostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  tags: string[];
  image: string;
  author: string;
  readingTime: string;
}

export interface Post extends PostMeta {
  content: string;
}

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(postsDirectory)) return [];
  const files = fs.readdirSync(postsDirectory).filter((f) => f.endsWith(".mdx"));
  const posts = files.map((filename) => {
    const slug = filename.replace(/\.mdx$/, "");
    const filePath = path.join(postsDirectory, filename);
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContents);
    const rt = readingTime(content);
    return {
      slug,
      title: data.title ?? "",
      description: data.description ?? "",
      date: data.date ?? "",
      category: data.category ?? "",
      tags: Array.isArray(data.tags) ? data.tags : [],
      image: data.image ?? "",
      author: data.author ?? "NexusAI Team",
      readingTime: rt.text,
    };
  });
  return posts.sort((a, b) => (a.date > b.date ? -1 : 1));
}

export function getPostBySlug(slug: string): Post | null {
  const filePath = path.join(postsDirectory, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);
  const rt = readingTime(content);
  return {
    slug,
    title: data.title ?? "",
    description: data.description ?? "",
    date: data.date ?? "",
    category: data.category ?? "",
    tags: Array.isArray(data.tags) ? data.tags : [],
    image: data.image ?? "",
    author: data.author ?? "NexusAI Team",
    readingTime: rt.text,
    content,
  };
}

export function getPostsByCategory(category: string): PostMeta[] {
  return getAllPosts().filter(
    (p) => slugify(p.category) === slugify(category)
  );
}

export function getAllCategories(): string[] {
  const posts = getAllPosts();
  return [...new Set(posts.map((p) => p.category))];
}

export function getAllSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) return [];
  return fs
    .readdirSync(postsDirectory)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function getRelatedPosts(currentSlug: string, limit = 2): PostMeta[] {
  const current = getPostBySlug(currentSlug);
  if (!current) return [];
  const all = getAllPosts().filter((p) => p.slug !== currentSlug);
  
  // Score by shared tags and same category
  const scored = all.map((post) => {
    let score = 0;
    if (post.category === current.category) score += 2;
    const sharedTags = post.tags.filter((t) => current.tags.includes(t));
    score += sharedTags.length;
    return { post, score };
  });
  
  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map((s) => s.post);
}
