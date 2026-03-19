#!/bin/bash
# TechLion Blog Publish Script
# Self-service tool for CMO to publish blog posts without technical knowledge
# Author: CTO Agent
# Version: 1.0

set -e  # Exit on any error

# Configuration
BLOG_URL="https://ai-blockchain-blog.vercel.app"
POSTS_DIR="content/posts"
IMAGES_DIR="public/images/blog"
REQUIRED_FIELDS=("title" "description" "date" "author" "slug" "image")

# Check for Vercel token
if [ -z "$VERCEL_TOKEN" ]; then
    log_error "VERCEL_TOKEN environment variable not set!"
    echo "Set it with: export VERCEL_TOKEN='your-token-here'"
    echo "Or add it to your ~/.bashrc for persistence"
    exit 1
fi

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Logging functions
log_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

log_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

log_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

log_error() {
    echo -e "${RED}❌ $1${NC}"
}

log_step() {
    echo -e "\n${BLUE}🔄 $1${NC}"
}

# Helper function to extract frontmatter
extract_frontmatter() {
    local file="$1"
    awk '/^---$/{if(++c==2) exit} c==1{print}' "$file"
}

# Helper function to get frontmatter value
get_frontmatter_value() {
    local content="$1"
    local field="$2"
    echo "$content" | grep "^$field:" | sed "s/^$field:[[:space:]]*[\"']\?//" | sed "s/[\"']\?$//"
}

# Check if we're in the right directory
if [ ! -f "package.json" ] || [ ! -d "$POSTS_DIR" ]; then
    log_error "Not in blog directory! Run this script from /data/ai-blockchain-blog/"
    exit 1
fi

echo -e "${BLUE}🚀 TechLion Blog Publisher${NC}"
echo "=============================="

# Step 1: Validate posts
log_step "Validating MDX posts..."

validation_errors=()
missing_images=()
post_count=0
valid_posts=()

for post in "$POSTS_DIR"/*.mdx; do
    if [ ! -f "$post" ]; then
        continue
    fi
    
    post_count=$((post_count + 1))
    post_name=$(basename "$post")
    
    # Extract frontmatter
    frontmatter=$(extract_frontmatter "$post")
    
    # Check required fields
    missing_fields=()
    for field in "${REQUIRED_FIELDS[@]}"; do
        value=$(get_frontmatter_value "$frontmatter" "$field")
        if [ -z "$value" ]; then
            missing_fields+=("$field")
        fi
    done
    
    if [ ${#missing_fields[@]} -gt 0 ]; then
        validation_errors+=("$post_name: missing fields: ${missing_fields[*]}")
        continue
    fi
    
    # Check hero image exists
    image_path=$(get_frontmatter_value "$frontmatter" "image")
    # Remove leading slash if present
    image_path=${image_path#/}
    full_image_path="public/$image_path"
    
    if [ ! -f "$full_image_path" ]; then
        missing_images+=("$post_name: $image_path")
        continue
    fi
    
    valid_posts+=("$post_name")
done

# Report validation results
if [ ${#validation_errors[@]} -gt 0 ]; then
    log_error "Frontmatter validation failed:"
    for error in "${validation_errors[@]}"; do
        echo "  - $error"
    done
    exit 1
fi

if [ ${#missing_images[@]} -gt 0 ]; then
    log_error "Missing hero images:"
    for missing in "${missing_images[@]}"; do
        echo "  - $missing"
    done
    exit 1
fi

log_success "Validated $post_count posts"

# Step 2: Check git status for new/changed posts
log_step "Checking for changes..."

# Get list of new/modified posts
new_posts=$(git status --porcelain "$POSTS_DIR"/*.mdx 2>/dev/null | wc -l)
changed_posts=$(git diff --name-only HEAD "$POSTS_DIR"/*.mdx 2>/dev/null | wc -l)
total_changes=$((new_posts + changed_posts))

if [ $total_changes -eq 0 ]; then
    log_warning "No changes detected in posts directory"
    echo "If you've made changes, make sure to save your files first."
    exit 0
fi

log_info "Detected $total_changes changed/new posts"

# Step 3: Build the site
log_step "Building Next.js site..."

# Capture build output
build_output=$(npm run build 2>&1)
build_exit_code=$?

if [ $build_exit_code -ne 0 ]; then
    log_error "Build failed!"
    echo "Last 20 lines of build output:"
    echo "$build_output" | tail -20
    exit 1
fi

# Extract page count from build output
page_count=$(echo "$build_output" | grep -o "compiled [0-9]* pages" | grep -o "[0-9]*" || echo "unknown")
log_success "Build successful ($page_count pages)"

# Step 4: Commit changes
log_step "Committing changes..."

# Add all changes
git add .

# Generate commit message
if [ $new_posts -gt 0 ] && [ $changed_posts -gt 0 ]; then
    commit_msg="feat: add $new_posts new posts, update $changed_posts posts"
elif [ $new_posts -gt 0 ]; then
    commit_msg="feat: add $new_posts new posts"
else
    commit_msg="feat: update $changed_posts posts"
fi

# Get list of changed post titles for detailed commit message
changed_files=$(git diff --cached --name-only "$POSTS_DIR"/*.mdx)
post_titles=()

for file in $changed_files; do
    if [ -f "$file" ]; then
        frontmatter=$(extract_frontmatter "$file")
        title=$(get_frontmatter_value "$frontmatter" "title")
        post_titles+=("- $title")
    fi
done

# Create detailed commit message
detailed_msg="$commit_msg

Posts updated:
$(printf '%s\n' "${post_titles[@]}")

[Auto-generated by publish.sh]"

git commit -m "$detailed_msg"
commit_hash=$(git rev-parse --short HEAD)

log_success "Committed: $commit_msg (${commit_hash})"

# Step 5: Deploy to Vercel
log_step "Deploying to Vercel..."

# Set Vercel token
export VERCEL_TOKEN="$VERCEL_TOKEN"

# Deploy to production
deploy_output=$(npx vercel --prod --yes --token "$VERCEL_TOKEN" 2>&1)
deploy_exit_code=$?

if [ $deploy_exit_code -ne 0 ]; then
    log_error "Deployment failed!"
    echo "$deploy_output"
    exit 1
fi

# Extract deployment URL
deploy_url=$(echo "$deploy_output" | grep -o "https://[^[:space:]]*" | tail -1)
if [ -z "$deploy_url" ]; then
    deploy_url="$BLOG_URL"
fi

log_success "Deployed to production"

# Step 6: Verify deployment
log_step "Verifying deployment..."

# Wait a moment for deployment to be ready
sleep 5

# Test main site
main_status=$(curl -s -o /dev/null -w "%{http_code}" "$BLOG_URL")
if [ "$main_status" != "200" ]; then
    log_error "Main site not returning 200 (got $main_status)"
    exit 1
fi

# Test individual post URLs
verification_errors=()
verified_count=0

for post in $changed_files; do
    if [ -f "$post" ]; then
        frontmatter=$(extract_frontmatter "$post")
        slug=$(get_frontmatter_value "$frontmatter" "slug")
        
        if [ ! -z "$slug" ]; then
            post_url="$BLOG_URL/blog/$slug"
            status=$(curl -s -o /dev/null -w "%{http_code}" "$post_url")
            
            if [ "$status" = "200" ]; then
                verified_count=$((verified_count + 1))
            else
                verification_errors+=("$slug: HTTP $status")
            fi
        fi
    fi
done

if [ ${#verification_errors[@]} -gt 0 ]; then
    log_warning "Some posts returned non-200 status:"
    for error in "${verification_errors[@]}"; do
        echo "  - $error"
    done
    echo "This might be normal if the posts are very new. Check manually if needed."
else
    log_success "Verified: all posts returning 200"
fi

# Step 7: Push to git
log_step "Pushing to repository..."
git push origin main
log_success "Pushed to repository"

# Final success report
echo ""
echo -e "${GREEN}🎉 PUBLISH COMPLETE! 🎉${NC}"
echo "=========================="
log_success "Validated $post_count posts ($total_changes new/changed)"
log_success "All hero images found"
log_success "Build successful ($page_count pages)"
log_success "Committed: $commit_msg"
log_success "Deployed to production"
if [ ${#verification_errors[@]} -eq 0 ]; then
    log_success "Verified: all posts returning 200"
fi
echo -e "\n🔗 ${BLUE}$BLOG_URL${NC}"

if [ $verified_count -gt 0 ]; then
    echo -e "\n📝 Published posts:"
    for post in $changed_files; do
        if [ -f "$post" ]; then
            frontmatter=$(extract_frontmatter "$post")
            slug=$(get_frontmatter_value "$frontmatter" "slug")
            title=$(get_frontmatter_value "$frontmatter" "title")
            if [ ! -z "$slug" ] && [ ! -z "$title" ]; then
                echo -e "   • ${title}"
                echo -e "     ${BLUE}$BLOG_URL/blog/$slug${NC}"
            fi
        fi
    done
fi

echo ""
echo -e "${GREEN}Ready for readers! 📚${NC}"