import { readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { ROUTE_META, routeUrl } from './src/constants/seo.js'

const attr = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;')

// Replaces the value of one attribute on the first tag matching `tag`
function setAttr(html, tag, name, value) {
  const re = new RegExp(`(<${tag}[^>]*\\s${name}=")[^"]*(")`)
  if (!re.test(html)) throw new Error(`route-html: no match for <${tag} … ${name}> in index.html`)
  return html.replace(re, (_, a, b) => a + attr(value) + b)
}

// Writes dist/<route>.html for every route in ROUTE_META, each with its own
// title, description and canonical URL. The app boots the same way from any of
// them; the copies exist so link previews and crawlers that don't run
// JavaScript see the right page instead of the home page's tags.
function routeHtml() {
  let outDir
  return {
    name: 'route-html',
    apply: 'build',
    configResolved(config) { outDir = resolve(config.root, config.build.outDir) },
    closeBundle() {
      const base = readFileSync(resolve(outDir, 'index.html'), 'utf8')
      for (const [path, meta] of Object.entries(ROUTE_META)) {
        if (path === '/') continue
        let html = base.replace(/<title>[^<]*<\/title>/, () => `<title>${attr(meta.title)}</title>`)
        html = setAttr(html, 'meta name="description"',         'content', meta.description)
        html = setAttr(html, 'meta property="og:title"',        'content', meta.title)
        html = setAttr(html, 'meta property="og:description"',  'content', meta.description)
        html = setAttr(html, 'meta name="twitter:title"',       'content', meta.title)
        html = setAttr(html, 'meta name="twitter:description"', 'content', meta.description)
        html = setAttr(html, 'meta property="og:url"',          'content', routeUrl(path))
        html = setAttr(html, 'link rel="canonical"',            'href',    routeUrl(path))
        writeFileSync(resolve(outDir, `${path.slice(1)}.html`), html)
      }
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), routeHtml()],
})
