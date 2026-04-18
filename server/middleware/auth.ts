import type { Request, Response, NextFunction } from "express";
import { logger } from "../logger";

export function requireAdmin(req: Request, res: Response, next: NextFunction) {
  logger.debug(
    {
      sessionId: req.sessionID,
      isAdmin: req.session?.isAdmin ?? false,
      path: req.path,
    },
    "requireAdmin check",
  );

  if (!req.session?.isAdmin) {
    logger.warn(
      {
        sessionId: req.sessionID,
        path: req.path,
      },
      "Unauthorized admin access attempt",
    );
    return res.status(401).json({ error: "Unauthorized - admin login required" });
  }

  next();
}
