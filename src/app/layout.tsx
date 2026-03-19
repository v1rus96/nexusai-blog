import type { Metadata } from "next";
import Script from "next/script";
import { Inter } from "next/font/google";
import { SITE_NAME, SITE_TAGLINE, SITE_DESCRIPTION, SITE_URL } from "@/lib/constants";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${SITE_NAME} — ${SITE_TAGLINE}`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: "/" },
  openGraph: {
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: `${SITE_URL}/og-default.png`,
        width: 1200,
        height: 630,
        alt: SITE_NAME,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: [`${SITE_URL}/og-default.png`],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||(!t&&matchMedia('(prefers-color-scheme:dark)').matches))document.documentElement.classList.add('dark');else if(t==='light')document.documentElement.classList.remove('dark');else document.documentElement.classList.add('dark')}catch(e){document.documentElement.classList.add('dark')}})()`,
          }}
        />
        <link rel="alternate" type="application/rss+xml" title={SITE_NAME} href="/rss" />
      </head>
      <body className="min-h-screen flex flex-col antialiased font-[family-name:var(--font-inter)]">
        <Header />
        <main id="main-content" className="flex-1 mx-auto max-w-6xl w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          {children}
        </main>
        <Footer />

        {/* Tawk.to Live Chat Widget */}
        <Script
          id="tawkto"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
              var Tawk_API = Tawk_API || {};
              var Tawk_LoadStart = new Date();
              Tawk_API.customStyle = {
                visibility: {
                  desktop: { position: 'br', xOffset: 20, yOffset: 20 },
                  mobile: { position: 'br', xOffset: 10, yOffset: 10 },
                },
              };
              (function(){
                var s1 = document.createElement("script"), s0 = document.getElementsByTagName("script")[0];
                s1.async = true;
                s1.src = 'https://embed.tawk.to/69bb5403bb7f0b1c337b2f70/1jk1s0bsl';
                s1.charset = 'UTF-8';
                s1.setAttribute('crossorigin','*');
                s0.parentNode.insertBefore(s1, s0);
              })();
            `,
          }}
        />
      </body>
    </html>
  );
}
