import type { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { AppError, ErrorCodes } from "../utils/errors";
import { logger } from "../logger";

export function errorHandler(err: any, _req: Request, res: Response, next: NextFunction) {
  if (res.headersSent) {
    return next(err);
  }

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      errorCode: err.errorCode,
    });
  }

  if (err instanceof ZodError) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errorCode: ErrorCodes.VALIDATION_ERROR,
      errors: err.errors.map((e) => ({
        field: e.path.join("."),
        message: e.message,
      })),
    });
  }

  const statusCode = err.status || err.statusCode || 500;
  const message = statusCode === 500 ? "Internal Server Error" : (err.message || "Internal Server Error");

  logger.error({ err, statusCode }, "Unhandled request error");

  return res.status(statusCode).json({
    success: false,
    message,
    errorCode: ErrorCodes.INTERNAL_ERROR,
  });
}
