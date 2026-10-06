/**
 * Captures the <title>, meta description and canonical that the client renders for every
 * sitemap URL, and writes them to server/seo/route-meta.json. The server bakes these into the
 * initial HTML it sends, so crawlers that read raw HTML (before JavaScript runs) see the same
 * unique metadata a browser does, instead of the homepage's generic tags on every route.
 *
 * Run against a server already serving the current build:
 *   npm run build && npm start   (in one terminal)
 *   npm run seo:manifest         (in another)
 */
import { chromium } from "playwright";
import fs from "fs";
import path from "path";

const BASE_URL = process.env.SEO_BASE_URL ?? "http://localhost:3000";
const SITEMAP = path.resolve(process.cwd(), "client/public/sitemap.xml");
const OUT = path.resolve(process.cwd(), "server/seo/route-meta.json");

const locs = [...fs.readFileSync(SITEMAP, "utf8").matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
const paths = locs.map((loc) => new URL(loc).pathname);

const browser = await chromium.launch();
const meta: Record<string, { title: string; description: string; canonical: string }> = {};

for (const p of paths) {
  const page = await browser.newPage();
  try {
    await page.goto(`${BASE_URL}${p}`, { waitUntil: "networkidle", timeout: 30000 });
    const captured = await page.evaluate(() => ({
      title: document.title,
      description: document.querySelector('meta[name="description"]')?.getAttribute("content") ?? "",
      canonical: document.querySelector('link[rel="canonical"]')?.getAttribute("href") ?? "",
    }));
    if (!captured.title || !captured.description || !captured.canonical) {
      throw new Error(`incomplete head for ${p}: ${JSON.stringify(captured)}`);
    }
    meta[p] = captured;
    console.log("ok", p);
  } finally {
    await page.close();
  }
}

await browser.close();
fs.writeFileSync(OUT, JSON.stringify(meta, null, 2) + "\n");
console.log(`wrote ${Object.keys(meta).length} routes to server/seo/route-meta.json`);
