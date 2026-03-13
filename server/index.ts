import "dotenv/config";
import express, { Request, Response, NextFunction } from "express";
import session from "express-session";
import connectPgSimple from "connect-pg-simple";
import helmet from "helmet";
import compression from "compression";
import path from "path";
import { createServer } from "http";
import crypto from "crypto";

import { registerRoutes } from "./routes";
import { pool } from "./db";
import { logger } from "./logger";
import { sanitizeInput } from "./middleware/sanitize";
import { errorHandler } from "./middleware/error-handler";

const isProduction = process.env.NODE_ENV === "production";

process.on("uncaughtException", (err) => {
  logger.fatal({ err }, "Uncaught exception");
});

process.on("unhandledRejection", (reason) => {
  logger.error({ reason }, "Unhandled promise rejection");
});

function validateEnv() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL must be set");
  }

  if (!process.env.SESSION_SECRET) {
    logger.warn("SESSION_SECRET not set — using temporary secret");
  }
}

validateEnv();

const PgStore = connectPgSimple(session);

const app = express();
const httpServer = createServer(app);

app.use(
  helmet({
    crossOriginEmbedderPolicy: false,
  })
);

app.use(compression());

app.use(
  express.json({
    limit: "1mb",
  })
);

app.use(express.urlencoded({ extended: false, limit: "1mb" }));

app.use(sanitizeInput);

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

app.get("/health", (_req: Request, res: Response) => {
  res.json({ status: "ok" });
});

app.use((req, res, next) => {
  const start = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - start;

    if (req.path.startsWith("/api")) {
      logger.info({
        method: req.method,
        path: req.path,
        status: res.statusCode,
        duration,
      });
    }
  });

  next();
});

(async () => {
  await registerRoutes(httpServer, app);

  app.use(errorHandler);

  const distPath = path.resolve(process.cwd(), "dist/public");

  app.use(express.static(distPath));

  app.use((req: Request, res: Response) => {
    res.sendFile(path.join(distPath, "index.html"));
  });

  const port = parseInt(process.env.PORT || "3000", 10);

  httpServer.listen(port, "0.0.0.0", () => {
    logger.info(`Server running on port ${port}`);
  });
})();