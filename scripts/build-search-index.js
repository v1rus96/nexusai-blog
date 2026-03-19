#!/usr/bin/env node

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

function buildSearchIndex() {
  console.log('🔍 Building Pagefind search index...');

  try {
    // Create the pagefind directory in public if it doesn't exist
    const publicDir = path.join(process.cwd(), 'public');
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }

    // Run pagefind on the .next/server/app directory which contains the static HTML
    const pagefindCommand = [
      'npx pagefind',
      '--source .next/server/app',
      '--output-path public/pagefind',
      '--glob "**/*.html"',
      '--verbose'
    ].join(' ');

    console.log('Running command:', pagefindCommand);
    const output = execSync(pagefindCommand, { 
      encoding: 'utf8',
      cwd: process.cwd()
    });

    console.log('✅ Pagefind index built successfully!');
    console.log(output);

  } catch (error) {
    console.error('❌ Failed to build Pagefind index:', error.message);
    if (error.stdout) console.log('stdout:', error.stdout);
    if (error.stderr) console.log('stderr:', error.stderr);
    process.exit(1);
  }
}

buildSearchIndex();