const fs = require('fs');
const path = require('path');

const preferred = path.resolve(__dirname, '..', 'frontend', 'dist', 'encuestas-app', 'browser');
const fallback = path.resolve(__dirname, '..', 'frontend', 'dist', 'encuestas-app');
const src = fs.existsSync(preferred) ? preferred : fallback;
const dest = path.resolve(__dirname, '..', 'docs');

function copyRecursiveSync(src, dest) {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();
  if (isDirectory) {
    if (!fs.existsSync(dest)) fs.mkdirSync(dest);
    fs.readdirSync(src).forEach(function(childItemName) {
      copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName));
    });
  } else {
    fs.copyFileSync(src, dest);
  }
}

if (!fs.existsSync(src)) {
  console.error('Source build not found. Run the frontend build first: cd frontend && npm run build:ghpages or npm run build');
  process.exit(1);
}

// Remove existing docs folder first
if (fs.existsSync(dest)) {
  console.log('Removing existing docs folder...');
  fs.rmSync(dest, { recursive: true, force: true });
}

console.log('Copying browser build to docs/ ...');
copyRecursiveSync(src, dest);
console.log('Done.');
