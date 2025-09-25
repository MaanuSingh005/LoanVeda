import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distIndex = path.resolve(__dirname, '..', 'dist', 'index.html');
const dist404 = path.resolve(__dirname, '..', 'dist', '404.html');
// This is a comment
try {
  if (fs.existsSync(distIndex)) {
    fs.copyFileSync(distIndex, dist404);
    console.log('Copied index.html to 404.html for SPA fallback');
  } else {
    console.warn('dist/index.html not found — did the build succeed?');
  }
} catch (err) {
  console.error('Failed to copy index.html to 404.html:', err);
  process.exitCode = 1;
}
