import type { Plugin } from "vite";

/**
 * The static "boot hero" in index.html paints the first visible frame using only its own
 * inlined <style> (see index.html's .boot-hero rules) — it doesn't need the main Tailwind
 * bundle at all. That makes the bundle's render-blocking <link rel="stylesheet"> pure wasted
 * blocking time (Lighthouse's render-blocking-requests audit), since nothing visible depends
 * on it being synchronous. This swaps it for the standard preload-then-apply pattern, with a
 * <noscript> fallback for the no-JS case.
 */
export function deferCssPlugin(): Plugin {
  return {
    name: "vite-plugin-defer-css",
    enforce: "post",
    transformIndexHtml: {
      order: "post",
      handler(html) {
        return html.replace(
          /<link rel="stylesheet" crossorigin href="([^"]+)">/,
          (_match, href) =>
            // No inline onload= attribute: the site's CSP sets script-src-attr 'none', which
            // silently blocks inline event-handler attributes (the link just never swaps to
            // 'stylesheet' and the page stays unstyled). addEventListener from a real <script>
            // element is governed by script-src instead, which does allow 'unsafe-inline'.
            `<link rel="preload" as="style" crossorigin href="${href}" id="main-css-preload">` +
            `<script>document.getElementById('main-css-preload').addEventListener('load', function () { this.rel = 'stylesheet'; });</script>` +
            `<noscript><link rel="stylesheet" crossorigin href="${href}"></noscript>`,
        );
      },
    },
  };
}
