// Prints the /resume page to public/cv/isfandiyor-madaminov-cv-<lang>.pdf, once
// per language, so "Download CV" hands over a real file instead of a print dialog.
// It serves the production build and prints it with a headless browser, so the
// PDFs always match what the page shows.
// Run with: npm run resume:pdf   (builds first — rerun whenever the resume text changes)
import { spawn } from 'child_process';
import { existsSync, mkdirSync, statSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { headless } from './browser.mjs';

const __dir = dirname(fileURLToPath(import.meta.url));
const root  = resolve(__dir, '..');
const out   = resolve(root, 'public/cv');
const PORT  = 4179;
const LANGS = ['en', 'uz', 'ru'];

if (!existsSync(resolve(root, 'dist/index.html'))) {
  throw new Error('dist/ is missing — run `npm run resume:pdf`, which builds first.');
}
mkdirSync(out, { recursive: true });

const vite   = resolve(root, 'node_modules/vite/bin/vite.js');
const server = spawn(process.execPath, [vite, 'preview', '--port', String(PORT), '--strictPort'], { cwd: root, stdio: 'ignore' });

async function waitForServer() {
  for (let i = 0; i < 50; i++) {
    try { if ((await fetch(`http://localhost:${PORT}/`)).ok) return; } catch { /* not up yet */ }
    await new Promise(r => setTimeout(r, 200));
  }
  throw new Error(`Preview server did not start on port ${PORT}`);
}

try {
  await waitForServer();
  for (const lang of LANGS) {
    const file = resolve(out, `isfandiyor-madaminov-cv-${lang}.pdf`);
    headless([
      `--print-to-pdf=${file}`,
      '--no-pdf-header-footer',
      // Long enough for the intro to finish and the fonts to load; virtual, so it costs no real time
      '--virtual-time-budget=5000',
      `http://localhost:${PORT}/resume?lang=${lang}`,
    ]);
    console.log(`✓ cv/isfandiyor-madaminov-cv-${lang}.pdf (${Math.round(statSync(file).size / 1024)} KB)`);
  }
} finally {
  server.kill();
}
