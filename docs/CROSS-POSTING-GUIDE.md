# Cross-Posting Guide for TechLion Blog

This guide covers how to cross-post articles from TechLion Blog to major publishing platforms while maintaining proper SEO through canonical URLs.

## Why Cross-Post?

Cross-posting amplifies your content's reach without creating duplicate content penalties. The key is **always setting the canonical URL** to point back to the original article on TechLion Blog.

**Your canonical URL format:**
```
https://ai-blockchain-blog.vercel.app/blog/{slug}
```

---

## 1. Medium

### Import Story (Recommended)

Medium has a built-in import tool that automatically handles formatting and sets the canonical URL.

1. Go to [medium.com/p/import](https://medium.com/p/import)
2. Paste the full URL of your TechLion Blog article:
   ```
   https://ai-blockchain-blog.vercel.app/blog/your-article-slug
   ```
3. Click **Import**
4. Medium will pull the content and automatically set the canonical URL
5. Review the imported draft — fix any formatting issues (code blocks, images)
6. Add relevant Medium tags (up to 5): `Artificial Intelligence`, `Blockchain`, `Web3`, `Machine Learning`, `DeFi`
7. Publish

### Verify Canonical URL

After publishing, view page source on your Medium article and confirm:
```html
<link rel="canonical" href="https://ai-blockchain-blog.vercel.app/blog/your-article-slug" />
```

### Tips for Medium
- Add a subtitle that differs slightly from the original description
- Use Medium's built-in code blocks (they render differently from MDX)
- Add a "Originally published on [TechLion Blog](https://ai-blockchain-blog.vercel.app)" note at the bottom
- Submit to relevant Medium publications for extra reach:
  - **Towards Data Science** (AI content)
  - **Better Programming** (developer tutorials)
  - **Coinmonks** (blockchain/crypto content)

---

## 2. dev.to

### Using Front Matter + Canonical URL

dev.to supports YAML front matter, making cross-posting straightforward.

1. Create a new post on [dev.to/new](https://dev.to/new)
2. Switch to the **markdown editor** (v2)
3. Add front matter at the top of your article:

```yaml
---
title: "Your Article Title"
published: true
description: "Your article description"
tags: ai, blockchain, webdev, tutorial
canonical_url: https://ai-blockchain-blog.vercel.app/blog/your-article-slug
cover_image: https://ai-blockchain-blog.vercel.app/images/blog/your-hero-image.svg
---
```

4. Paste your article content below the front matter
5. Review formatting — dev.to Markdown is slightly different from MDX:
   - Remove any JSX components (replace with plain Markdown equivalents)
   - Convert `<Image>` components to standard `![alt](url)` syntax
   - Remove any import statements
6. Publish

### dev.to Tags

dev.to allows up to 4 tags per post. Good combinations:

| Article Type | Tags |
|---|---|
| AI/ML content | `ai`, `machinelearning`, `python`, `tutorial` |
| Blockchain content | `blockchain`, `web3`, `cryptocurrency`, `defi` |
| AI + Blockchain | `ai`, `blockchain`, `webdev`, `beginners` |
| Developer guides | `tutorial`, `beginners`, `programming`, `ai` |

### Tips for dev.to
- dev.to has a large developer audience — lean into practical, tutorial-style content
- Use the series feature for multi-part articles
- Engage with comments — the dev.to community values author interaction
- Cross-post within 24-48 hours of original publication

---

## 3. Hashnode

### Import from URL (Recommended)

Hashnode supports importing articles directly from a URL.

1. Go to your Hashnode dashboard → **Write an article**
2. Click the **Import** button (top-right area)
3. Select **Import from URL**
4. Paste your article URL:
   ```
   https://ai-blockchain-blog.vercel.app/blog/your-article-slug
   ```
5. Hashnode will import the content and auto-set the canonical URL
6. Review and fix any formatting issues
7. Add tags (up to 5) and a cover image
8. Publish

### Manual Canonical URL Setup

If importing doesn't work perfectly:

1. Write/paste the article content
2. In the article settings sidebar, find **"Are you republishing?"**
3. Toggle it on
4. Paste the canonical URL:
   ```
   https://ai-blockchain-blog.vercel.app/blog/your-article-slug
   ```

### Tips for Hashnode
- Hashnode supports MDX-like features — less reformatting needed
- Use Hashnode's built-in series feature for related articles
- Enable the newsletter feature to capture subscribers on Hashnode too
- Hashnode articles get indexed well on Google — canonical URL is critical

---

## Cross-Posting Checklist

Use this checklist for every cross-posted article:

- [ ] Original article is live on TechLion Blog
- [ ] Canonical URL is set correctly on the cross-posted platform
- [ ] Images are loading (use absolute URLs from the original site)
- [ ] Code blocks are formatted correctly
- [ ] All links work
- [ ] Tags/topics are added
- [ ] Attribution note added: "Originally published on [TechLion Blog](https://ai-blockchain-blog.vercel.app)"
- [ ] Verify canonical URL in page source after publishing

---

## Timing Strategy

1. **Day 0:** Publish on TechLion Blog
2. **Day 1-2:** Cross-post to dev.to (fastest indexing of cross-posts)
3. **Day 2-3:** Import to Medium
4. **Day 3-5:** Import to Hashnode
5. **Day 7:** Share on social media with link to original

This staggered approach gives Google time to index the original first, reinforcing canonical authority.

---

## Troubleshooting

### "Duplicate content" warnings
- Always check that the canonical URL is set. This tells search engines which version is the "original."
- Google respects canonical URLs — even identical content won't be penalized if canonical is set correctly.

### Images not loading on cross-posted articles
- Use absolute URLs for all images: `https://ai-blockchain-blog.vercel.app/images/blog/...`
- Some platforms proxy images — if an image is broken, re-upload it directly to the platform.

### Code blocks rendering incorrectly
- Remove MDX-specific syntax (JSX components, imports)
- Use standard Markdown fenced code blocks with language hints:
  ````
  ```python
  def example():
      pass
  ```
  ````

### Medium not setting canonical URL on import
- This occasionally happens. After publishing, go to **Story settings** → **Advanced settings** → **Canonical URL** and set it manually.
