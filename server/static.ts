import express, { type Express } from "express";
import fs from "fs";
import path from "path";

const SITE_URL = "https://bernardinomartinhvac.com";

export function serveStatic(app: Express) {
  const distPath = path.resolve(__dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`,
    );
  }

  // Canonicalize the request path before anything else: uppercase and trailing-slash
  // variants 301-redirect to the one true lowercase, slash-less URL, so crawlers never
  // see the same page reachable at two different addresses.
  app.use((req, res, next) => {
    const trimmed = req.path !== "/" && req.path.endsWith("/") ? req.path.slice(0, -1) : req.path;
    const normalized = trimmed.toLowerCase();
    if (normalized !== req.path) {
      const query = req.url.slice(req.path.length);
      res.redirect(301, normalized + query);
      return;
    }
    next();
  });

  app.use(
    "/assets",
    express.static(path.join(distPath, "assets"), {
      maxAge: "1y",
      immutable: true,
    }),
  );

  app.use("/images", express.static(path.join(distPath, "images"), { maxAge: "1y", immutable: true }));
  app.use("/videos", express.static(path.join(distPath, "videos"), { maxAge: "1y", immutable: true }));

  app.use(
    express.static(distPath, {
      maxAge: "1h",
      setHeaders: (res, filePath) => {
        if (filePath.endsWith(".html")) {
          res.setHeader("Cache-Control", "no-cache");
        }
      },
    }),
  );

  // Cache the SPA shell once; every unmatched route gets it back with a canonical tag
  // stamped in for ITS OWN path. Without this, the raw (pre-JS) HTML is byte-identical
  // for every route — the SEO component only adds a canonical after React hydrates —
  // which is what produces "Duplicate without user-selected canonical" in Search
  // Console: Google can't tell the pages apart until it renders the JS, and by then it
  // may have already clustered a batch of near-identical routes and picked its own
  // canonical for them. The tag carries data-ssr-canonical so main.tsx can remove it
  // right before React mounts, avoiding a duplicate once Helmet's own tag takes over.
  const indexHtmlPath = path.resolve(distPath, "index.html");
  const indexHtmlTemplate = fs.readFileSync(indexHtmlPath, "utf-8");

  app.use("/{*path}", (req, res) => {
    const canonicalUrl = `${SITE_URL}${req.path === "/" ? "" : req.path}`;
    const html = indexHtmlTemplate.replace(
      "</head>",
      `<link rel="canonical" href="${canonicalUrl}" data-ssr-canonical="true" />\n  </head>`,
    );
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Content-Type", "text/html");
    res.send(html);
  });
}
