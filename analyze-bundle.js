#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

function getFileSizeInKB(filePath) {
  const stats = fs.statSync(filePath);
  return Math.round(stats.size / 1024 * 100) / 100;
}

function analyzeBuildOutput() {
  const buildDir = path.join(process.cwd(), '.next');
  
  console.log('📊 TechLion Blog Bundle Analysis');
  console.log('═'.repeat(50));
  
  // Static assets
  if (fs.existsSync(path.join(buildDir, 'static'))) {
    const staticSize = getDirectorySize(path.join(buildDir, 'static'));
    console.log(`📦 Static Assets: ${staticSize.toFixed(2)} KB`);
  }
  
  // Server chunks  
  if (fs.existsSync(path.join(buildDir, 'server'))) {
    const serverSize = getDirectorySize(path.join(buildDir, 'server'));
    console.log(`🖥️  Server Bundle: ${serverSize.toFixed(2)} KB`);
  }
  
  // Total build size
  const totalSize = getDirectorySize(buildDir);
  console.log(`📊 Total Build: ${(totalSize / 1024).toFixed(2)} MB`);
}

function getDirectorySize(dir) {
  if (!fs.existsSync(dir)) return 0;
  
  let totalSize = 0;
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stats = fs.statSync(filePath);
    
    if (stats.isDirectory()) {
      totalSize += getDirectorySize(filePath);
    } else {
      totalSize += stats.size;
    }
  }
  
  return totalSize / 1024; // Convert to KB
}

if (require.main === module) {
  analyzeBuildOutput();
}

module.exports = { analyzeBuildOutput };