import "dotenv/config";
import express, { Request, Response, NextFunction } from "express";
import session from "express-session";
import connectPgSimple from "connect-pg-simple";
import helmet from "helmet";
import compression from "compression";
import path from "path";
import crypto from "crypto";
import { createServer } from "http";

import { registerRoutes } from "./routes";
import { pool } from "./db";
import { logger } from "./logger";
import { sanitizeInput } from "./middleware/sanitize";
import { errorHandler } from "./middleware/error-handler";

const isProduction = process.env.NODE_ENV === "production";

/* ================================
   Environment Validation
================================ */

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL must be set in environment variables");
}

/* ================================
   Express Setup
================================ */

const app = express();
const httpServer = createServer(app);

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
        ],
        styleSrc: [
          "'self'",
          "'unsafe-inline'",
          "https://fonts.googleapis.com",
          "https://cdnjs.cloudflare.com"
        ],
        fontSrc: [
          "'self'",
          "https://fonts.gstatic.com"
        ],
        imgSrc: [
          "'self'",
          "data:",
          "blob:",
          "https:"
        ],
        connectSrc: [
          "'self'",
          "ws:",
          "wss:"
        ],
        frameSrc: [
          "'self'",
          "https://js.stripe.com"
        ],
      }
    },
    crossOriginEmbedderPolicy: false
  })
);

/* ================================
   Performance
================================ */

app.use(compression());

/* ================================
   Body Parsing
================================ */

app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: false }));

/* ================================
   Input Sanitization
================================ */

app.use(sanitizeInput);

/* ================================
   Session Configuration
================================ */

const PgStore = connectPgSimple(session);

const sessionSecret =
  process.env.SESSION_SECRET || crypto.randomBytes(32).toString("hex");

app.use(
  session({
    store: new PgStore({
      pool,
      createTableIfMissing: true,
    }),
    secret: sessionSecret,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      httpOnly: true,
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

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

/* ================================
   Server Boot
================================ */

(async () => {
  /* Register API routes */
  await registerRoutes(httpServer, app);

  /* Global error handler */
  app.use(errorHandler);

  /* ================================
     React Frontend
  ================================= */

  if (isProduction) {
    const distPath = path.resolve(process.cwd(), "dist/public");

    app.use(express.static(distPath));

    app.use((req: Request, res: Response) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  } else {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  }

  /* ================================
     Start Server
  ================================= */

  const port = Number(process.env.PORT || 3000);

  httpServer.listen(port, "0.0.0.0", () => {
    logger.info(`🚀 Server running on port ${port}`);
  });
})();