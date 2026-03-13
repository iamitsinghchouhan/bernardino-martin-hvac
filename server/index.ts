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

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL must be set");
}

const PgStore = connectPgSimple(session);

const app = express();
const httpServer = createServer(app);

/*
Disable strict CSP because it blocks Vite/React scripts
*/
app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
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

/*
API logging
*/
app.use((req, res, next) => {
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

(async () => {
  await registerRoutes(httpServer, app);

  app.use(errorHandler);

  /*
  Serve React build
  dist/index.cjs -> dist/public
  */
  const distPath = path.resolve(__dirname, "public");

  app.use(express.static(distPath));

  /*
  SPA fallback
  */
  app.get("*", (req: Request, res: Response) => {
    res.sendFile(path.join(distPath, "index.html"));
  });

  const port = Number(process.env.PORT || 3000);

  httpServer.listen(port, "0.0.0.0", () => {
    logger.info(`Server running on port ${port}`);
  });
})();