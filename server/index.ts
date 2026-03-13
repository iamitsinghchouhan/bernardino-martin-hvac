import "dotenv/config";
import express, { type Request, Response, NextFunction } from "express";
import session from "express-session";
import connectPgSimple from "connect-pg-simple";
import helmet from "helmet";
import compression from "compression";
import path from "path";
import { registerRoutes } from "./routes";
import { serveStatic } from "./static";
import { createServer } from "http";
import crypto from "crypto";
import { pool } from "./db";
import { logger } from "./logger";
import { sanitizeInput } from "./middleware/sanitize";
import { errorHandler } from "./middleware/error-handler";

const isProduction = process.env.NODE_ENV === "production";

process.on("uncaughtException", (err) => {
  logger.fatal({ err }, "Uncaught exception — investigate immediately");
});

process.on("unhandledRejection", (reason) => {
  logger.error({ reason }, "Unhandled promise rejection");
});

function validateEnv() {
  const missing: string[] = [];

  if (!process.env.DATABASE_URL) {
    missing.push("DATABASE_URL");
  }

  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(", ")}`);
  }

  if (!process.env.SESSION_SECRET) {
    if (isProduction) {
      logger.warn("SESSION_SECRET not set — sessions may reset on restart");
    } else {
      logger.info("SESSION_SECRET not set — generating temporary secret");
    }
  }
}

validateEnv();

const PgStore = connectPgSimple(session);

const app = express();
const httpServer = createServer(app);

declare module "http" {
  interface IncomingMessage {
    rawBody: unknown;
  }
}

declare module "express-session" {
  interface SessionData {
    isAdmin?: boolean;
  }
}

/*
Helmet security configuration
Relaxed slightly for React/Vite compatibility
*/
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
        styleSrc: [
          "'self'",
          "'unsafe-inline'",
          "https://fonts.googleapis.com",
          "https://cdnjs.cloudflare.com",
        ],
        fontSrc: [
          "'self'",
          "https://fonts.gstatic.com",
          "https://cdnjs.cloudflare.com",
        ],
        imgSrc: [
          "'self'",
          "data:",
          "blob:",
          "https://*",
        ],
        connectSrc: ["'self'", "ws:", "wss:"],
      },
    },
    crossOriginEmbedderPolicy: false,
  })
);

app.use(compression());

app.get("/health", (_req: Request, res: Response) => {
  res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
});

app.use(
  express.json({
    limit: "1mb",
    verify: (req, _res, buf) => {
      req.rawBody = buf;
    },
  })
);

app.use(express.urlencoded({ extended: false, limit: "1mb" }));

app.use(sanitizeInput);

if (isProduction) {
  app.set("trust proxy", 1);

  app.use((req: Request, res: Response, next: NextFunction) => {
    if (req.headers["x-forwarded-proto"] === "http") {
      return res.redirect(`https://${req.headers.host}${req.url}`);
    }
    next();
  });
}

const sessionSecret =
  process.env.SESSION_SECRET || crypto.randomBytes(32).toString("hex");

const sessionMiddleware = session({
  store: new PgStore({
    pool,
    createTableIfMissing: true,
  }),
  secret: sessionSecret,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: isProduction,
    httpOnly: true,
    sameSite: "lax",
    maxAge: 24 * 60 * 60 * 1000,
  },
});

app.use(sessionMiddleware);

app.use((req, res, next) => {
  const start = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - start;

    if (req.path.startsWith("/api")) {
      logger.info(
        {
          method: req.method,
          path: req.path,
          statusCode: res.statusCode,
          duration,
        },
        `${req.method} ${req.path} ${res.statusCode} in ${duration}ms`
      );
    }
  });

  next();
});

(async () => {
  await registerRoutes(httpServer, app);

  app.use(errorHandler);

  /*
  IMPORTANT FIX
  Serve the built React frontend correctly
  */
  const distPath = path.resolve(process.cwd(), "dist/public");

  app.use(express.static(distPath));

  /*
  SPA fallback so React routes work
  */
  app.use((req, res) => {
   res.sendFile(path.join(distPath, "index.html"));
});

  if (!isProduction) {
    const { setupVite } = await import("./vite");
    await setupVite(httpServer, app);
  }

  const port = parseInt(process.env.PORT || "3000", 10);

  httpServer.listen(
    {
      port,
      host: "0.0.0.0",
    },
    () => {
      logger.info(`Server running on port ${port}`);
    }
  );
})();