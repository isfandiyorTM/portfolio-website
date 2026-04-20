import { Resvg } from '@resvg/resvg-js';
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __dir = dirname(fileURLToPath(import.meta.url));
const pub   = resolve(__dir, '../public');

const fontBuffer = readFileSync(resolve(__dir, 'Orbitron-Black.ttf'));

function makeSvg(size) {
  const radius   = Math.round(size * 0.156); // ~10px at 64px
  const fontSize = Math.round(size * 0.44);
  const cy       = Math.round(size * 0.66);
  const cx       = Math.round(size / 2);
  const glowDev  = (size / 64) * 2.5;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <defs>
    <filter id="glow">
      <feGaussianBlur stdDeviation="${glowDev}" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>
  <rect width="${size}" height="${size}" rx="${radius}" ry="${radius}" fill="#00ff88"/>
  <text
    x="${cx}" y="${cy}"
    fill="#ffffff"
    font-family="Orbitron"
    font-weight="900"
    font-size="${fontSize}"
    letter-spacing="${Math.round(size * 0.03)}"
    text-anchor="middle"
    filter="url(#glow)"
  >IM</text>
</svg>`;
}

const sizes = [
  { file: 'favicon-16.png',       size: 16  },
  { file: 'favicon-32.png',       size: 32  },
  { file: 'apple-touch-icon.png', size: 180 },
];

for (const { file, size } of sizes) {
  const svg = makeSvg(size);
  const resvg = new Resvg(svg, {
    font: { loadSystemFonts: false, fontBuffers: [fontBuffer] },
    fitTo: { mode: 'width', value: size },
  });
  const png = resvg.render().asPng();
  writeFileSync(resolve(pub, file), png);
  console.log(`✓ ${file} (${size}×${size})`);
}
