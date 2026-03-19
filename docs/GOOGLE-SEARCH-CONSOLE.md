# Google Search Console Setup Guide

## Prerequisites
- Google account with access to manage the blog domain
- Blog deployed at: https://ai-blockchain-blog.vercel.app

## Step 1: Access Google Search Console
1. Go to [Google Search Console](https://search.google.com/search-console)
2. Sign in with the Google account that should manage the blog

## Step 2: Add Property
1. Click **"Add property"** (top-left dropdown)
2. Choose **"URL prefix"** method
3. Enter: `https://ai-blockchain-blog.vercel.app`
4. Click **Continue**

## Step 3: Verify Ownership

### Option A: HTML Tag (Recommended for Vercel)
1. Google will provide a meta tag like:
   ```html
   <meta name="google-site-verification" content="YOUR_VERIFICATION_CODE" />
   ```
2. Add the verification code as an environment variable in Vercel:
   - Go to Vercel Dashboard → Project Settings → Environment Variables
   - Add: `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` = `YOUR_VERIFICATION_CODE`
3. Then add this to `src/app/layout.tsx` inside the `<head>` tag:
   ```tsx
   {process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION && (
     <meta name="google-site-verification" content={process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION} />
   )}
   ```
4. Deploy and click **Verify** in Search Console

### Option B: DNS Verification (If you own the domain)
1. Google will provide a TXT record
2. Add it to your DNS settings
3. Click **Verify** in Search Console

## Step 4: Submit Sitemap
1. In Search Console, go to **Sitemaps** (left sidebar)
2. Enter: `sitemap.xml`
3. Click **Submit**
4. The sitemap is auto-generated at: https://ai-blockchain-blog.vercel.app/sitemap.xml

## Step 5: Verify Everything Works
- Sitemap: https://ai-blockchain-blog.vercel.app/sitemap.xml ✅ (auto-generated)
- Robots.txt: https://ai-blockchain-blog.vercel.app/robots.txt ✅ (auto-generated)
- RSS Feed: https://ai-blockchain-blog.vercel.app/rss ✅

## What's Already Configured
The blog already has:
- ✅ Dynamic `sitemap.xml` with all posts and categories
- ✅ `robots.txt` allowing all crawlers with sitemap reference
- ✅ RSS feed at `/rss`
- ✅ Canonical URLs on all pages
- ✅ Open Graph tags on all pages
- ✅ Twitter Card meta tags
- ✅ JSON-LD structured data (WebSite + BlogPosting)
- ✅ Meta descriptions on all posts
