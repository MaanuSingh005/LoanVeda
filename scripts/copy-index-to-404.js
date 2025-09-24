const fs = require('fs');
const path = require('path');

const distIndex = path.resolve(__dirname, '..', 'dist', 'index.html');
const dist404 = path.resolve(__dirname, '..', 'dist', '404.html');

if (fs.existsSync(distIndex)) {
  fs.copyFileSync(distIndex, dist404);
  console.log('Copied index.html to 404.html for GitHub Pages SPA fallback');
} else {
  console.warn('dist/index.html not found — did the build succeed?');
}
