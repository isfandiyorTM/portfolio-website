// Runs an installed Chromium-based browser headless. The generators use it to
// turn real pages into files (the share image, the CV PDFs), so the output is
// drawn with the same fonts and CSS the site uses.
// Set CHROME_PATH if your browser lives somewhere else.
import { existsSync, mkdtempSync, rmSync } from 'fs';
import { spawnSync } from 'child_process';
import { tmpdir } from 'os';
import { join } from 'path';

const CANDIDATES = [
  process.env.CHROME_PATH,
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
  '/usr/bin/chromium-browser',
].filter(Boolean);

export function headless(args) {
  const browser = CANDIDATES.find(existsSync);
  if (!browser) throw new Error('No Chrome or Edge found — set CHROME_PATH to its executable.');

  // A throwaway profile, so this never attaches to a browser window that is already open
  const profile = mkdtempSync(join(tmpdir(), 'portfolio-headless-'));
  try {
    const run = spawnSync(browser, [
      '--headless=new', '--disable-gpu', '--hide-scrollbars', '--no-first-run',
      `--user-data-dir=${profile}`,
      ...args,
    ], { stdio: ['ignore', 'ignore', 'pipe'], encoding: 'utf8' });
    if (run.status !== 0) throw new Error(`Browser exited with ${run.status}: ${run.stderr}`);
  } finally {
    rmSync(profile, { recursive: true, force: true, maxRetries: 5 });
  }
}
