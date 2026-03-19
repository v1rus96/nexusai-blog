export interface Author {
  slug: string;
  name: string;
  title: string;
  bio: string;
  shortBio: string;
  company: string;
  companyUrl: string;
  avatar?: string;
  social: {
    twitter?: string;
    linkedin?: string;
    github?: string;
    website?: string;
  };
}

export const authors: Record<string, Author> = {
  "firuz-akhmadov": {
    slug: "firuz-akhmadov",
    name: "Firuz Akhmadov",
    title: "Founder & CEO",
    bio: "Firuz Akhmadov is the founder of LionTech AI, where he builds at the intersection of artificial intelligence and blockchain technology. With deep expertise in agentic AI systems, decentralized architectures, and machine learning infrastructure, Firuz writes about what's real, what works, and what's coming next in the convergence of AI and Web3.",
    shortBio: "Founder of LionTech AI. Building at the intersection of AI and blockchain.",
    company: "LionTech AI",
    companyUrl: "https://liontech.ai",
    social: {
      twitter: "https://x.com/v1rus96",
      github: "https://github.com/v1rus96",
      website: "https://liontech.ai",
    },
  },
};

export function getAuthorBySlug(slug: string): Author | undefined {
  return authors[slug];
}

export function getAuthorByName(name: string): Author | undefined {
  return Object.values(authors).find(
    (a) => a.name.toLowerCase() === name.toLowerCase()
  );
}

export function getAllAuthors(): Author[] {
  return Object.values(authors);
}
