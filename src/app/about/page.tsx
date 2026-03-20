import { Metadata } from "next";
import Link from "next/link";
import { SITE_NAME } from "@/lib/constants";
import NewsletterSignup from "@/components/NewsletterSignup";
import AuthorCard from "@/components/AuthorCard";

export const metadata: Metadata = {
  title: `About — ${SITE_NAME}`,
  description:
    "Meet the team behind TechLion Blog by LionTech AI — exploring the frontier of AI and blockchain technology.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto">
      {/* Hero */}
      <section className="text-center pt-16 sm:pt-20 mb-16">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4 animate-gradient-text">
          About TechLion
        </h1>
        <p className="text-lg text-gray-500 text-white/60 mt-4">
          Where AI Meets Blockchain
        </p>
      </section>

      {/* Mission */}
      <section className="glass-card rounded-2xl p-8 sm:p-10 mb-12">
        <div className="flex items-center gap-3 mb-4">
          <svg className="w-6 h-6 text-[#C61884] dark:text-[#E91E90]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
          <h2 className="text-xl font-bold text-gray-900 text-white">Our Mission</h2>
        </div>
        <p className="text-gray-600 text-white/60 leading-relaxed text-[17px]">
          TechLion Blog by LionTech AI exists because the intersection of artificial intelligence and decentralized
          technology is one of the most consequential spaces in tech right now — and most of the
          coverage is either hype-driven clickbait or impenetrable academic papers. We think
          there&apos;s room for something in between: insightful, honest analysis for people who
          build things.
        </p>
      </section>

      {/* What We Cover */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-8 text-gray-900 text-white">What We Cover</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {/* AI Card */}
          <div className="glass-card rounded-2xl p-6">
            <svg className="w-10 h-10 text-[#E91E90]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
            </svg>
            <h3 className="text-lg font-semibold mt-4 mb-2 text-gray-900 text-white">
              Artificial Intelligence
            </h3>
            <p className="text-sm text-gray-600 text-white/60 mb-3">
              AI agents and automation, autonomous systems reshaping workflows from software
              development to healthcare — practical guides, not just theory.
            </p>
            <Link
              href="/category/ai"
              className="text-sm text-[#C61884] dark:text-[#E91E90] hover:underline"
            >
              Browse AI articles →
            </Link>
          </div>

          {/* Blockchain Card */}
          <div className="glass-card rounded-2xl p-6">
            <svg className="w-10 h-10 text-[#E91E90]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m9.07-9.07l4.5-4.5a4.5 4.5 0 016.364 6.364l-1.757 1.757" />
            </svg>
            <h3 className="text-lg font-semibold mt-4 mb-2 text-gray-900 text-white">
              Blockchain
            </h3>
            <p className="text-sm text-gray-600 text-white/60 mb-3">
              Where decentralized technology and machine learning genuinely complement each other —
              and where they don&apos;t. Honest assessments and real use cases.
            </p>
            <Link
              href="/category/blockchain"
              className="text-sm text-[#C61884] dark:text-[#E91E90] hover:underline"
            >
              Browse Blockchain articles →
            </Link>
          </div>
        </div>
      </section>

      {/* Who This Is For */}
      <section className="glass-card rounded-2xl p-8 sm:p-10 mb-12">
        <h2 className="text-xl font-bold mb-4 text-gray-900 text-white">Who This Is For</h2>
        <p className="text-gray-600 text-white/60 leading-relaxed text-[17px]">
          Founders evaluating AI tools. Developers building with agents and smart contracts.
          Product managers making build-or-buy decisions. Anyone who wants to understand these
          technologies without wading through marketing fluff.
        </p>
      </section>

      {/* Our Approach */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 text-white">Our Approach</h2>
        <p className="text-gray-600 text-white/60 leading-relaxed text-[17px] mb-4">
          Every article we publish passes a simple test:{" "}
          <strong className="text-gray-900 text-white">
            would this be useful to someone making a real decision?
          </strong>{" "}
          If the answer is no, we don&apos;t publish it.
        </p>
        <p className="text-gray-600 text-white/60 leading-relaxed text-[17px]">
          We cite our sources. We distinguish between what&apos;s shipping in production and
          what&apos;s still experimental. We include concrete examples, not just theory. And when
          we don&apos;t know something, we say so.
        </p>
      </section>

      {/* Team */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-8 text-gray-900 text-white">The Team</h2>
        <AuthorCard />
        <p className="text-sm text-gray-500 dark:text-gray-500 mt-6 text-center italic">
          Have a topic you&apos;d like us to cover? A correction to suggest? Reach out — we read
          everything.
        </p>
      </section>

      {/* Newsletter */}
      <section className="mb-8">
        <NewsletterSignup />
      </section>
    </div>
  );
}
