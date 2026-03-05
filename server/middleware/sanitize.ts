import type { Request, Response, NextFunction } from "express";

function stripHtml(value: unknown): unknown {
  if (typeof value === "string") {
    return value
      .replace(/<[^>]*>/g, "")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&amp;/g, "&")
      .replace(/<[^>]*>/g, "")
      .trim();
  }
  if (Array.isArray(value)) {
    return value.map(stripHtml);
  }
  if (value && typeof value === "object") {
    const sanitized: Record<string, unknown> = {};
    for (const [key, val] of Object.entries(value)) {
      sanitized[key] = stripHtml(val);
    }
    return sanitized;
  }
  return value;
}

export function sanitizeInput(req: Request, _res: Response, next: NextFunction) {
  if (req.body && typeof req.body === "object") {
    req.body = stripHtml(req.body);
  }
  if (req.query && typeof req.query === "object") {
    req.query = stripHtml(req.query) as typeof req.query;
  }
  next();
}
