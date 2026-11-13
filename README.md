# isfandiyormadaminov.dev

Personal portfolio of Isfandiyor Madaminov — IT mentor and Flutter developer.
Live at <https://isfandiyormadaminov.dev>.

A single-page React app in three languages (English, Uzbek, Russian) with a dark
and a light theme, project pages, a printable resume and nine small browser games.

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
```

| Command              | What it does                                                        |
| -------------------- | ------------------------------------------------------------------- |
| `npm run dev`        | Dev server with hot reload                                          |
| `npm run build`      | Production build into `dist/`                                       |
| `npm run preview`    | Serve the production build locally                                  |
| `npm run lint`       | ESLint                                                              |
| `npm run assets`     | Regenerate the icons and the link-preview image in `public/`        |
| `npm run resume:pdf` | Build, then print `/resume` to `public/cv/*.pdf` (one per language) |

`assets` and `resume:pdf` drive a headless Chrome or Edge. If yours is not in a
standard location, set `CHROME_PATH` to the executable.

## Environment variables

Both are optional. Copy `.env.example` to `.env` and fill in what you need; the
example file also has the SQL for the leaderboard table.

| Variable                                         | Used for                 | Without it                                    |
| ------------------------------------------------ | ------------------------ | --------------------------------------------- |
| `VITE_EMAILJS_SERVICE_ID`, `_TEMPLATE_ID`, `_PUBLIC_KEY` | Contact form     | The form opens the visitor's mail app instead |
| `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`    | Global game leaderboard  | Scores are kept in the browser only           |

On Netlify, set them under Site settings → Environment variables.

## Where things live

```
index.html              Head tags for the home page: SEO, Open Graph, JSON-LD, fonts
vite.config.js          Build config; also writes one HTML file per route (see below)
public/                 Static files: icons, og-image, screenshots, CV PDFs, APKs, sw.js
public/compiland/       Clips of compiland.uz for its page (day and night versions)
public/fonts/           Inter and Fira Code, self-hosted for the project pages
public/hoji/            Photos of the two blind types, for the Hoji Jalyuzi page
public/rahimovdevs/     Snapshots of students' sites, for the RahimovDevs page
scripts/                Generators for the images and PDFs in public/
src/
  App.jsx               Routes and the always-on pieces (cursor, terminal, intro)
  components/           Home page sections and effects
  pages/                Project pages (each in its own product's design), games, scores, resume, 404
  pages/compiland/      The Compiland page's parts: the road and its car, drawings, clips
  games/                The nine games, loaded on demand
  constants/data.js     Projects, skills, resume facts, social links
  constants/seo.js      Title and description for every route
  i18n/translations.js  All text, in en / uz / ru
  styles/global.css     Theme variables and shared classes
  styles/project-pages.css  The "more projects" strip under every project page (.pp-more)
  styles/compiland.css  Compiland's page, in its own look (.cl-*); likewise hoji.css (.hj-*),
                        chontak.css (.ch-*) and rahimovdevs.css (.rd-*)
  styles/fonts-local.css  The self-hosted Inter and Fira Code
```

## Common edits

**Change text.** Everything visible is in `src/i18n/translations.js`, under the
same keys in `en`, `uz` and `ru`. Keep the three in step.

**Add a project.** Add an entry to `PROJECTS` in `src/constants/data.js`. Give it
`shots` (phone screenshots) or `preview` (one wide screenshot) to show an image on
its card; put the files under `public/screenshots/<project>/`. If it has its own
page, add the route in `src/App.jsx` and its title in `src/constants/seo.js`.

**Change the resume.** Edit `RESUME` in `data.js` and the `resume` block in
`translations.js`, then run `npm run resume:pdf` and commit the new PDFs —
"Download CV" serves those files, so they do not update on their own.

**Change the favicon.** Replace `public/favicon.svg` and run `npm run assets`;
the PNG icons are rendered from it.

## How a few things work

**Per-route HTML.** The app is client-rendered, so on its own every URL would
serve the home page's `<title>` and preview tags. At build time `vite.config.js`
writes `dist/chontak.html`, `dist/resume.html` and so on, each with the title,
description and canonical URL from `src/constants/seo.js`. Netlify serves those
for the matching path; `useSeo` keeps the tags right during in-app navigation.

**Languages.** The choice is saved in `localStorage`. `?lang=ru` (or `uz`, `en`)
in the URL overrides it, which is how the PDF generator picks a language.
Orbitron and Share Tech Mono have no Cyrillic, so Tektur and JetBrains Mono sit
behind them in the font stacks for Russian.

**Service worker.** `public/sw.js` fetches pages from the network first, so a
deploy is visible on the next visit, and caches only the hashed files under
`/assets/`. Bump `CACHE` in that file if you change its rules.

**Easter eggs.** `/` opens a terminal (`help` lists the commands), `Tab` while
the pointer is on the hero keyboard starts a typing test, and there is a Konami
code.

## Deploy

Netlify builds with `npm run build` and publishes `dist/`. `netlify.toml` sends
unknown paths to `index.html` so client-side routes work.
