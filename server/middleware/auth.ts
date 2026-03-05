import type { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/errors";

export function requireAdmin(req: Request, _res: Response, next: NextFunction) {
  if (!req.session?.isAdmin) {
    throw AppError.unauthorized();
  }
  next();
}
