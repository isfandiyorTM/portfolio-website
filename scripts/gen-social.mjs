// Generates the images that index.html and site.webmanifest point at:
//   public/apple-touch-icon.png  180×180  (iOS home screen)
//   public/icon-192.png          192×192  (web app manifest)
//   public/logo.png              512×512  (manifest + JSON-LD)
//   public/og-image.png         1200×630  (link previews)
// The icons are rendered from public/favicon.svg, so they always match it.
// The share image is a screenshot of scripts/og-image.html, taken with a
// headless browser so it uses the site's real web fonts.
// Run with: npm run assets
import { Resvg } from '@resvg/resvg-js';
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath, pathToFileURL } from 'url';
import { dirname, resolve } from 'path';
import { headless } from './browser.mjs';

const __dir = dirname(fileURLToPath(import.meta.url));
const pub   = resolve(__dir, '../public');

const favicon = readFileSync(resolve(pub, 'favicon.svg'), 'utf8');

// favicon.svg only has a viewBox, so give it an explicit pixel size to render at
function icon(size, file, svg = favicon) {
  const sized = svg.replace('<svg ', `<svg width="${size}" height="${size}" `);
  writeFileSync(resolve(pub, file), new Resvg(sized).render().asPng());
  console.log(`✓ ${file} (${size}×${size})`);
}

// iOS rounds the corners itself and paints transparent pixels black,
// so the touch icon is the same mark on a full-bleed square.
icon(180, 'apple-touch-icon.png', favicon.replaceAll('rx="14"', 'rx="0"'));
icon(192, 'icon-192.png');
icon(512, 'logo.png');

headless([
  `--screenshot=${resolve(pub, 'og-image.png')}`,
  '--window-size=1200,630',
  '--force-device-scale-factor=1',
  '--virtual-time-budget=5000', // lets the web fonts finish loading
  pathToFileURL(resolve(__dir, 'og-image.html')).href,
]);
console.log('✓ og-image.png (1200×630)');
