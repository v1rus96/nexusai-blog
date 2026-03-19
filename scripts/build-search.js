#!/usr/bin/env node

const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

async function buildSearch() {
  console.log('🔍 Building search index with Pagefind...');
  
  // Check if .next directory exists
  const nextDir = path.join(process.cwd(), '.next');
  if (!fs.existsSync(nextDir)) {
    console.error('❌ .next directory not found. Run "npm run build" first.');
    process.exit(1);
  }

  // Run Pagefind on the built Next.js static files
  const command = 'npx pagefind --source .next/server/app --output-path public/pagefind';
  
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error('❌ Pagefind build failed:', error.message);
      return;
    }
    
    if (stderr) {
      console.log('⚠️  Pagefind warnings:', stderr);
    }
    
    console.log('✅ Search index built successfully!');
    console.log(stdout);
  });
}

buildSearch();