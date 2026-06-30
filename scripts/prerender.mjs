/**
 * Static prerender: renders every localized route to a self-contained HTML file
 * inside dist/, baking in the content and the <head> tags produced by
 * react-helmet-async. Also emits sitemap.xml. No headless browser required.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const dist = path.join(root, 'dist');
const serverEntry = path.join(root, 'dist-server', 'entry-server.js');

const { render, ALL_PATHS, ROUTES, LANGS, SITE_URL } = await import(pathToFileURL(serverEntry).href);

const templatePath = path.join(dist, 'index.html');
const template = fs.readFileSync(templatePath, 'utf8');

if (!template.includes('<!--app-html-->') || !template.includes('<!--app-head-->')) {
  console.error('[prerender] index.html is missing <!--app-html--> / <!--app-head--> markers.');
  process.exit(1);
}

function buildPage(location) {
  const { html, helmet } = render(location);
  let out = template;

  const htmlAttrs = helmet ? helmet.htmlAttributes.toString() : 'lang="es"';
  out = out.replace(/<html[^>]*>/, `<html ${htmlAttrs}>`);

  const head = helmet
    ? [helmet.title.toString(), helmet.meta.toString(), helmet.link.toString(), helmet.script.toString()]
        .filter(Boolean)
        .join('\n    ')
        // Normalize react-helmet's camelCase attribute to the HTML-standard form
        // so strict validators (and not just case-insensitive parsers) are happy.
        .replace(/hrefLang=/g, 'hreflang=')
    : '';
  out = out.replace('<!--app-head-->', head);
  out = out.replace('<!--app-html-->', html);
  return out;
}

function writePage(routePath, html) {
  // '/' -> dist/index.html ; '/es/servicios' -> dist/es/servicios/index.html
  const target =
    routePath === '/'
      ? path.join(dist, 'index.html')
      : path.join(dist, routePath, 'index.html');
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, html);
  return path.relative(dist, target);
}

// 1) Prerender all localized routes + the bare root.
const routesToRender = ['/', ...ALL_PATHS];
let count = 0;
for (const r of routesToRender) {
  const html = buildPage(r);
  const rel = writePage(r, html);
  count += 1;
  console.log(`[prerender] ${r} -> dist/${rel}`);
}

// 2) Sitemap with hreflang alternates.
const today = new Date().toISOString().slice(0, 10);
const urls = ROUTES.map((route) => {
  const alternates = LANGS.map(
    (l) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${SITE_URL}${route.paths[l]}"/>`,
  ).join('\n');
  const xdefault = `    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE_URL}${route.paths.es}"/>`;
  return LANGS.map(
    (l) => `  <url>
    <loc>${SITE_URL}${route.paths[l]}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority.toFixed(1)}</priority>
${alternates}
${xdefault}
  </url>`,
  ).join('\n');
}).join('\n');

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>
`;
fs.writeFileSync(path.join(dist, 'sitemap.xml'), sitemap);
console.log(`[prerender] sitemap.xml -> ${ROUTES.length * LANGS.length} urls`);

console.log(`[prerender] done: ${count} pages.`);
