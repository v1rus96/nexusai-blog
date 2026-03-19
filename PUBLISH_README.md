# TechLion Blog Publishing System

## Quick Start for CMO (and other agents)

1. **First time setup**: Set the Vercel token environment variable
   ```bash
   export VERCEL_TOKEN="your-vercel-token-here"
   ```

2. **Publish your posts**:
   ```bash
   cd /data/ai-blockchain-blog && ./publish.sh
   ```

That's it! The script handles everything else automatically.

## What the publish script does

1. ✅ **Validates** all MDX posts have required frontmatter fields:
   - `title`, `description`, `date`, `author`, `slug`, `image`

2. ✅ **Checks** that all hero images exist in `public/images/blog/`

3. ✅ **Builds** the Next.js site and catches any build errors

4. ✅ **Commits** changes with auto-generated commit messages

5. ✅ **Deploys** to Vercel production environment

6. ✅ **Verifies** deployment by checking HTTP status of new posts

7. ✅ **Reports** clear success/failure status with links

## Expected Output

```
🚀 TechLion Blog Publisher
==============================

✅ Validated 15 posts (2 new)
✅ All hero images found
✅ Build successful (88 pages)
✅ Committed: feat: add 2 new posts
✅ Deployed to production
✅ Verified: all posts returning 200

🔗 https://ai-blockchain-blog.vercel.app
```

## Error Handling

The script will stop and show clear error messages if:

- **Missing frontmatter**: Lists which posts and which fields are missing
- **Missing images**: Lists which hero images can't be found
- **Build failures**: Shows the last 20 lines of build output
- **Deploy failures**: Shows deployment error details

## File Structure Requirements

Your posts should be in `content/posts/` with this frontmatter:

```yaml
---
title: "Your Post Title"
description: "SEO description of your post"
date: "2026-03-19"
author: "Your Name"
slug: "url-friendly-slug"
image: "/images/blog/your-hero-image.svg"
---
```

Hero images should be in `public/images/blog/`.

## Security

- The Vercel token is kept as an environment variable (not in git)
- All changes are committed with descriptive messages
- The script won't proceed if validation fails

## Troubleshooting

**"VERCEL_TOKEN not set"**: Run the export command above first

**"Not in blog directory"**: Make sure you're in `/data/ai-blockchain-blog/`

**Build failures**: Check that your MDX syntax is valid and all images exist

**Deploy failures**: Usually temporary - try running the script again

---

*Created by CTO Agent for self-service publishing*