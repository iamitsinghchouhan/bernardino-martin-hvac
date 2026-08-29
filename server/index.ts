import "dotenv/config";
import express, { Request, Response, NextFunction } from "express";
import session from "express-session";
import ConnectPgSimple from "connect-pg-simple";
import helmet from "helmet";
import compression from "compression";
import path from "path";
import { createServer } from "http";

import { registerRoutes } from "./routes";
import fs from "fs";
import {
  getCityForPath,
  buildTitleForCity,
  buildDescriptionForCity,
  buildCanonical,
  buildBreadcrumbListJsonLD,
  ALL_CITY_PATHS,
} from "./seo/city-pages";
// Delay importing the database pool so we can optionally skip DB initialization
// during local validation runs by setting SKIP_DB_VALIDATION=true in the environment.
let pool: any = undefined;
import { logger } from "./logger";
import { sanitizeInput } from "./middleware/sanitize";
import { errorHandler } from "./middleware/error-handler";
import { validateEnvironmentVariables, validateDatabaseConnection } from "./config/validation";
import { stopReminderEngine } from "./reminder-engine";
import { stopBackupSchedule } from "./backup";

const isProduction = process.env.NODE_ENV === "production";

/* ================================
   Environment Validation
================================ */

// FIRST: Validate environment variables
validateEnvironmentVariables();

console.log('✓ Starting application...');

/* ================================
   Express Setup
================================ */

const app = express();
const httpServer = createServer(app);

if (isProduction) {
  app.set("trust proxy", 1);
}

/* ================================
   Security
================================ */

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: [
          "'self'",
          "'unsafe-inline'",
          "'unsafe-eval'",
          "https://cdnjs.cloudflare.com",
          "https://unpkg.com"
        ],
        styleSrc: [
          "'self'",
          "'unsafe-inline'",
          "https://fonts.googleapis.com",
          "https://cdnjs.cloudflare.com",
          "https://unpkg.com"
        ],
        fontSrc: [
          "'self'",
          "https://fonts.gstatic.com",
          "https://fonts.googleapis.com"
        ],
        imgSrc: [
          "'self'",
          "data:",
          "blob:",
          "https:",
          "https://cdnjs.cloudflare.com",
          "https://raw.githubusercontent.com",
          "https://basemaps.cartocdn.com"
        ],
        connectSrc: [
          "'self'",
          "ws:",
          "wss:",
          "https://api.mapbox.com",
          "https://basemaps.cartocdn.com"
        ],
        frameAncestors: ["'self'"],
        objectSrc: ["'none'"],
        baseUri: ["'self'"],
        formAction: ["'self'"]
      },
    },
    crossOriginEmbedderPolicy: false,
  })
);

/* ================================
   Performance
================================ */

app.use(compression());

/* ================================
   Body Parsing
================================ */

app.use(express.json({ limit: "8mb" }));
app.use(express.urlencoded({ extended: false }));

/* ================================
   Input Sanitization
================================ */

app.use(sanitizeInput);

/* ================================
   Session Configuration
================================ */

const PgStore = ConnectPgSimple(session);

const sessionSecret = process.env.SESSION_SECRET?.trim();

if (isProduction && !sessionSecret) {
  throw new Error("SESSION_SECRET must be set in production");
}

// We'll configure the session middleware later in the boot sequence once (and
// only if) the database `pool` is available. For local validation runs you can
// set `SKIP_DB_VALIDATION=true` to avoid requiring a Postgres instance; in that
// case we fall back to the default in-memory session store (not for production).
async function configureSessionMiddleware(appInstance: typeof app) {
  const skipDb = process.env.SKIP_DB_VALIDATION === "true";

  if (!skipDb) {
    // pool should have been imported by now
    const sessionStore = new PgStore({ pool, tableName: "session" });

    // Ensure session table exists
    try {
      const client = await pool.connect();
      await client.query(`
        CREATE TABLE IF NOT EXISTS "session" (
          "sid" varchar NOT NULL COLLATE "default",
          "sess" json NOT NULL,
          "expire" timestamp(6) NOT NULL,
          PRIMARY KEY ("sid")
        );
        CREATE INDEX IF NOT EXISTS "IDX_session_expire" on "session" ("expire");
      `);
      client.release();
      console.log("✅ Session table initialized");
    } catch (err) {
      console.error("❌ Failed to initialize session table:", err);
    }

    appInstance.use(
      session({
        store: sessionStore,
        secret: sessionSecret || "fallback-dev-secret-change-in-production",
        resave: true,
        saveUninitialized: true,
        name: "connect.sid",
        proxy: isProduction,
        cookie: {
          secure: false,
          httpOnly: true,
          sameSite: "lax",
          maxAge: 86_400_000,
          path: "/",
        },
      }),
    );
  } else {
    console.warn("⚠ SKIP_DB_VALIDATION=true — using in-memory session store for local validation (not for production)");
    appInstance.use(
      session({
        secret: sessionSecret || "fallback-dev-secret-change-in-production",
        resave: true,
        saveUninitialized: true,
        name: "connect.sid",
        proxy: isProduction,
        cookie: {
          secure: false,
          httpOnly: true,
          sameSite: "lax",
          maxAge: 86_400_000,
          path: "/",
        },
      }),
    );
  }
}



/* ================================
   Health Check
================================ */

app.get("/health", (_req: Request, res: Response) => {
  res.json({
    status: "ok",
    time: new Date().toISOString(),
  });
});

/* ================================
   API Logging
================================ */

app.use((req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();

  res.on("finish", () => {
    if (req.path.startsWith("/api")) {
      logger.info({
        method: req.method,
        path: req.path,
        statusCode: res.statusCode,
        duration: Date.now() - start,
      });
    }
  });

  next();
});

app.use((req: Request, res: Response, next: NextFunction) => {
  const isAdminRoute = req.path === "/admin" || req.path.startsWith("/admin/");
  const isApiRoute = req.path.startsWith("/api");

  if (isAdminRoute || isApiRoute) {
    res.setHeader("X-Robots-Tag", "noindex, nofollow");
  }

  next();
});

/* ================================
   Server Boot
================================ */

(async () => {
  const skipDb = process.env.SKIP_DB_VALIDATION === "true";

  if (!skipDb) {
    // Import the DB pool only when we intend to use it (production/normal runs)
    const dbModule = await import("./db");
    pool = dbModule.pool;

    // Configure sessions (creates session table if missing)
    await configureSessionMiddleware(app);

    // Test database connection BEFORE starting server
    try {
      await validateDatabaseConnection(pool);
      logger.info('✓ Database connection active');
      logger.info('✓ Admin panel features: Delete, Email, Invoices');
    } catch (error) {
      console.error('Database validation failed:', error);
      process.exit(1);
    }
  } else {
    // Local validation run: do not require Postgres. Configure session middleware
    // with an in-memory store and continue.
    await configureSessionMiddleware(app);
    console.warn('⚠ SKIP_DB_VALIDATION=true — database checks skipped for local validation');
  }

  /* Register API routes */
  await registerRoutes(httpServer, app);

  /* Global error handler */
  app.use(errorHandler);

  /* ================================
     React Frontend
  ================================= */

  const distPath = path.resolve(process.cwd(), "dist/public");
  const indexHtmlPath = path.join(distPath, "index.html");
  let indexHtmlTemplate = "";
  try {
    indexHtmlTemplate = fs.readFileSync(indexHtmlPath, "utf8");
  } catch (err) {
    console.warn("Could not read index.html for server-side SEO injection:", err);
  }

  app.use(
    express.static(distPath, {
      maxAge: "1d",
      setHeaders: (res, filePath) => {
        if (filePath.endsWith(".html")) {
          res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
        } else if (filePath.match(/\.(js|css|json)$/)) {
          res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
        } else if (filePath.match(/\.(png|jpg|jpeg|webp|svg|mp4|webm)$/)) {
          res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
        }
      },
    }),
  );

  app.use("/images", express.static(path.join(distPath, "images")));
  app.use("/videos", express.static(path.join(distPath, "videos")));

  /*
  React SPA fallback
  (DO NOT use "*" or "/*" here)
  */
  app.use((req: Request, res: Response) => {
    if (req.path === "/admin" || req.path.startsWith("/admin/")) {
      res.setHeader("X-Robots-Tag", "noindex, nofollow");
    }

    // If we couldn't preload the template, fall back to sendFile.
    if (!indexHtmlTemplate) {
      return res.sendFile(path.join(distPath, "index.html"));
    }

    // Normalize path (strip trailing slash)
    const normalized = req.path.replace(/\/+$|\\/g, (m) => (m === "/" ? "" : "")) || req.path;

    // City-specific pages: /hvac-*
    const city = getCityForPath(normalized);

    // Booking canonicalization: any /booking route (queries ignored)
    const isBooking = normalized === "/booking";
    const isServiceAreas = normalized === "/service-areas";

    if (!city && !isBooking && !isServiceAreas) {
      return res.send(indexHtmlTemplate);
    }

    // Make a shallow copy of template to modify
    let html = indexHtmlTemplate;

    const escapeHtml = (s: string) =>
      s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\"/g, "&quot;").replace(/'/g, "&#39;");

    if (city) {
      const title = buildTitleForCity(city.name);
      const desc = buildDescriptionForCity(city.name);
      const canonical = buildCanonical(city.path);
      const breadcrumbJson = buildBreadcrumbListJsonLD(city.path, city.name);

      // Replace existing <title>
      html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(title)}</title>`);

      // Replace meta description
      if (/meta\s+name="description"/i.test(html)) {
        html = html.replace(/<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i, `<meta name="description" content="${escapeHtml(desc)}" />`);
      } else {
        // insert description before </head>
        html = html.replace(/<\/head>/i, `    <meta name="description" content="${escapeHtml(desc)}" />\n</head>`);
      }

      // Insert canonical if missing
      if (!/rel="canonical"/i.test(html)) {
        html = html.replace(/<\/head>/i, `    <link rel="canonical" href="${escapeHtml(canonical)}" />\n</head>`);
      } else {
        html = html.replace(/<link[^>]*rel="canonical"[^>]*>/i, `<link rel="canonical" href="${escapeHtml(canonical)}" />`);
      }

      // Insert BreadcrumbList JSON-LD
      if (!/"@type"\s*:\s*"BreadcrumbList"/.test(html)) {
        html = html.replace(/<\/head>/i, `    <script type="application/ld+json">${breadcrumbJson}</script>\n</head>`);
      }

      // Insert visible breadcrumb before the hero section
      const breadcrumbHtml = `\n      <nav aria-label="Breadcrumb" class="server-breadcrumb" style="padding:12px 16px;background:#fff;color:#111;font-size:14px">\n        <ol style="list-style:none;margin:0;padding:0;display:flex;gap:8px;align-items:center">\n          <li><a href=\"/\">Home</a></li>\n          <li>→</li>\n          <li><a href=\"/service-areas\">Service Areas</a></li>\n          <li>→</li>\n          <li aria-current=\"page\">${escapeHtml(city.name)}</li>\n        </ol>\n      </nav>\n      `;

      html = html.replace(/<section class="boot-hero"/i, breadcrumbHtml + `<section class="boot-hero"`);
    }

    if (isServiceAreas) {
      // Build a crawlable server-rendered list of canonical city links so crawlers
      // and bots see the full 35-city index in the initial HTML (client-side
      // React will hydrate and replace the UI unchanged). Use the existing
      // central city list (`ALL_CITY_PATHS`) and `getCityForPath()` for names.
      const linksHtml = ALL_CITY_PATHS.map((p) => {
        const info = getCityForPath(p);
        if (!info) return "";
        return `<a href=\"${escapeHtml(info.path)}\" style=\"display:inline-block;margin:6px;padding:10px 12px;border:1px solid #e5e7eb;border-radius:8px;color:#111;text-decoration:none;background:#fff\">${escapeHtml(info.name)}</a>`;
      }).join('\n');

      const serviceAreasBlock = `\n      <div class=\"server-service-areas\" style=\"padding:28px 16px;background:#fff;color:#111\">\n        <div style=\"max-width:1100px;margin:0 auto\">\n          <h2 style=\"font-size:24px;margin:0 0 12px;font-weight:800\">Cities We Serve</h2>\n          <div style=\"display:flex;flex-wrap:wrap;gap:8px;align-items:center\">\n            ${linksHtml}\n          </div>\n        </div>\n      </div>\n      `;

      // Insert after the boot-hero section so it appears in the initial app shell
      html = html.replace(/<section class="boot-hero"[\s\S]*?<\/section>/i, (match) => `${match}\n${serviceAreasBlock}`);
    }

    if (isBooking) {
      const title = `Book Online | Bernardino Martin`;
      const desc = `Book an appointment with Bernardino Martin Home Services. Fast online scheduling and confirmations.`;
      const canonical = `https://bernardinomartinhvac.com/booking`;

      html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(title)}</title>`);

      if (/meta\s+name="description"/i.test(html)) {
        html = html.replace(/<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i, `<meta name="description" content="${escapeHtml(desc)}" />`);
      } else {
        html = html.replace(/<\/head>/i, `    <meta name="description" content="${escapeHtml(desc)}" />\n</head>`);
      }

      if (!/rel="canonical"/i.test(html)) {
        html = html.replace(/<\/head>/i, `    <link rel="canonical" href="${escapeHtml(canonical)}" />\n</head>`);
      } else {
        html = html.replace(/<link[^>]*rel="canonical"[^>]*>/i, `<link rel="canonical" href="${escapeHtml(canonical)}" />`);
      }
    }

    return res.send(html);
  });






  /* ================================
     Start Server
  ================================= */

  const port = Number(process.env.PORT || 3000);

  httpServer.listen(port, "0.0.0.0", () => {
    logger.info(`Server running on port ${port}`);
  });
})();

/* ================================
   Graceful Shutdown
================================ */

async function shutdown(signal: string) {
  logger.info(`Received ${signal} — shutting down gracefully...`);
  try {
    stopReminderEngine();
    stopBackupSchedule();
    if (pool && typeof pool.end === "function") {
      await pool.end();
    }
    logger.info("Graceful shutdown complete.");
    process.exit(0);
  } catch (err) {
    logger.error({ err }, "Error during shutdown");
    process.exit(1);
  }
}

process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT",  () => shutdown("SIGINT"));

/* ================================
   Process Error Guards
================================ */

process.on("uncaughtException", (err) => {
  logger.error({ err }, "Uncaught exception — server will continue");
  // Log but do not exit; let the process keep running
});

process.on("unhandledRejection", (reason) => {
  logger.error({ reason }, "Unhandled promise rejection");
  // Log but do not exit; let the process keep running
});
