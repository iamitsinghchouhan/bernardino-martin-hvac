import express, { type Request, Response, NextFunction } from "express";
import session from "express-session";
import connectPgSimple from "connect-pg-simple";
import { registerRoutes } from "./routes";
import { serveStatic } from "./static";
import { createServer } from "http";
import crypto from "crypto";
import { pool } from "./db";
import { logger } from "./logger";

const isProduction = process.env.NODE_ENV === "production";

process.on("uncaughtException", (err) => {
  logger.fatal({ err }, "Uncaught exception — process will continue but this should be investigated");
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
      logger.warn("SESSION_SECRET is not set — sessions will not persist across server restarts in production");
    } else {
      logger.info("SESSION_SECRET not set — using random secret for development");
    }
  }

  const optional: { key: string; label: string }[] = [
    { key: "STRIPE_SECRET_KEY", label: "Stripe payment integration" },
    { key: "ADMIN_PASSWORD", label: "Admin panel login" },
  ];

  for (const { key, label } of optional) {
    if (!process.env[key]) {
      logger.info(`Optional env variable ${key} not set — ${label} may be unavailable`);
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

app.use(
  express.json({
    verify: (req, _res, buf) => {
      req.rawBody = buf;
    },
  }),
);

app.use(express.urlencoded({ extended: false }));

if (isProduction) {
  app.set("trust proxy", 1);
}

app.use(
  session({
    store: new PgStore({
      pool,
      createTableIfMissing: true,
      pruneSessionInterval: 60 * 15,
    }),
    secret: process.env.SESSION_SECRET || crypto.randomBytes(32).toString("hex"),
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: isProduction,
      httpOnly: true,
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    },
  }),
);

export function log(message: string, source = "express") {
  logger.info({ source }, message);
}

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      logger.info(
        {
          method: req.method,
          path,
          statusCode: res.statusCode,
          duration,
          ...(capturedJsonResponse ? { response: capturedJsonResponse } : {}),
        },
        `${req.method} ${path} ${res.statusCode} in ${duration}ms`,
      );
    }
  });

  next();
});

(async () => {
  await registerRoutes(httpServer, app);

  app.use((err: any, _req: Request, res: Response, next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    logger.error({ err, status }, "Request error");

    if (res.headersSent) {
      return next(err);
    }

    return res.status(status).json({ message });
  });

  if (process.env.NODE_ENV === "production") {
    serveStatic(app);
  } else {
    const { setupVite } = await import("./vite");
    await setupVite(httpServer, app);
  }

  const port = parseInt(process.env.PORT || "5000", 10);
  httpServer.listen(
    {
      port,
      host: "0.0.0.0",
      reusePort: true,
    },
    () => {
      log(`serving on port ${port}`);
    },
  );
})();
