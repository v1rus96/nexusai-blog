import { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "@/lib/constants";
import NewsletterSignup from "@/components/NewsletterSignup";

export const metadata: Metadata = {
  title: "Subscribe",
  description:
    "Get weekly insights on AI + Blockchain delivered to your inbox. No spam, just signal.",
  alternates: { canonical: "/subscribe" },
  openGraph: {
    title: `Subscribe | ${SITE_NAME}`,
    description:
      "Get weekly insights on AI + Blockchain delivered to your inbox. No spam, just signal.",
    url: `${SITE_URL}/subscribe`,
    siteName: SITE_NAME,
    images: [{ url: `${SITE_URL}/og-default.png`, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: `Subscribe | ${SITE_NAME}`,
    description:
      "Get weekly insights on AI + Blockchain delivered to your inbox. No spam, just signal.",
    images: [`${SITE_URL}/og-default.png`],
  },
};

export default function SubscribePage() {
  return (
    <div className="max-w-2xl mx-auto">
      {/* Hero */}
      <section className="text-center pt-16 sm:pt-20 mb-12">
        <div className="text-5xl mb-6">📬</div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4 animate-gradient-text">
          Stay Ahead of the Curve
        </h1>
        <p className="text-lg text-gray-400 max-w-lg mx-auto">
          Get weekly insights on AI + Blockchain delivered to your inbox. No spam, just signal.
        </p>
      </section>

      {/* Newsletter form */}
      <section className="mb-12">
        <NewsletterSignup />
      </section>

      {/* Social proof */}
      <section className="glass-card rounded-2xl p-8 sm:p-10 mb-8 text-center">
        <p className="text-sm text-blue-400 font-semibold uppercase tracking-wider mb-4">
          Join 100+ readers
        </p>
        <p className="text-gray-400 text-sm leading-relaxed max-w-md mx-auto">
          Founders, developers, and researchers who want to understand AI and blockchain without the hype.
        </p>
      </section>

      {/* What to expect */}
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-6 text-center">What You&apos;ll Get</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="glass-card rounded-xl p-6 text-center">
            <div className="text-2xl mb-3">🧠</div>
            <h3 className="font-semibold text-sm mb-2">Deep Dives</h3>
            <p className="text-xs text-gray-500">
              Technical breakdowns of AI agents, blockchain protocols, and where they intersect.
            </p>
          </div>
          <div className="glass-card rounded-xl p-6 text-center">
            <div className="text-2xl mb-3">🔗</div>
            <h3 className="font-semibold text-sm mb-2">Curated Links</h3>
            <p className="text-xs text-gray-500">
              The best articles, papers, and tools we found that week — so you don&apos;t have to.
            </p>
          </div>
          <div className="glass-card rounded-xl p-6 text-center">
            <div className="text-2xl mb-3">🚀</div>
            <h3 className="font-semibold text-sm mb-2">Early Access</h3>
            <p className="text-xs text-gray-500">
              New articles and guides delivered before they hit social media.
            </p>
          </div>
        </div>
      </section>

      {/* Frequency note */}
      <div className="text-center text-sm text-gray-600 dark:text-gray-500">
        <p>
          One email per week. Unsubscribe anytime.{" "}
          <span className="text-gray-500 dark:text-gray-600">We respect your inbox.</span>
        </p>
      </div>
    </div>
  );
}
