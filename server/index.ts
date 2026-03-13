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

const PgStore = connectPgSimple(session);

const app = express();
const httpServer = createServer(app);

process.on("uncaughtException", (err) => {
  logger.error({ err }, "Uncaught exception");
});

process.on("unhandledRejection", (reason) => {
  logger.error({ reason }, "Unhandled rejection");
});

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL must be set");
}

app.use(
  helmet({
    crossOriginEmbedderPolicy: false
  })
);

app.use(compression());

app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: false }));

app.use(sanitizeInput);

const sessionSecret =
  process.env.SESSION_SECRET || crypto.randomBytes(32).toString("hex");

app.use(
  session({
    store: new PgStore({
      pool,
      createTableIfMissing: true
    }),
    secret: sessionSecret,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      httpOnly: true,
      sameSite: "lax"
    }
  })
);

app.get("/health", (_req: Request, res: Response) => {
  res.json({ status: "ok" });
});

app.use((req, res, next) => {
  const start = Date.now();

  res.on("finish", () => {
    if (req.path.startsWith("/api")) {
      logger.info({
        method: req.method,
        path: req.path,
        status: res.statusCode,
        duration: Date.now() - start
      });
    }
  });

  next();
});

(async () => {
  await registerRoutes(httpServer, app);

  app.use(errorHandler);

  const distPath = path.resolve(__dirname, "public");

  // serve static files
  app.use(express.static(distPath));

  // React SPA fallback WITHOUT wildcard route
  app.use((req: Request, res: Response, next: NextFunction) => {
    if (req.path.startsWith("/api")) {
      return next();
    }

    if (req.method !== "GET") {
      return next();
    }

    res.sendFile(path.join(distPath, "index.html"));
  });

  const port = Number(process.env.PORT || 3000);

  httpServer.listen(port, "0.0.0.0", () => {
    logger.info(`Server running on port ${port}`);
  });
})();