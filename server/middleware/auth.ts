import type { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/errors";

export function requireAdmin(req: Request, _res: Response, next: NextFunction) {
  const session = req.session as unknown as { isAdmin?: boolean };
  if (!session.isAdmin) {
    throw AppError.unauthorized();
  }
  next();
}
