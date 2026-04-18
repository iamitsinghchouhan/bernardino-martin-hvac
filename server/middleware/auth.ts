import type { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/errors";

export function requireAdmin(req: Request, _res: Response, next: NextFunction) {
  const session = req.session as unknown as { isAdmin?: boolean };
  console.log("requireAdmin check, session ID:", req.session.id, "isAdmin:", session.isAdmin);
  if (!session.isAdmin) {
    throw AppError.unauthorized();
  }
  next();
}
