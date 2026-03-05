export const ErrorCodes = {
  VALIDATION_ERROR: "VALIDATION_ERROR",
  NOT_FOUND: "NOT_FOUND",
  UNAUTHORIZED: "UNAUTHORIZED",
  INTERNAL_ERROR: "INTERNAL_ERROR",
  RATE_LIMITED: "RATE_LIMITED",
  BAD_REQUEST: "BAD_REQUEST",
} as const;

export type ErrorCode = (typeof ErrorCodes)[keyof typeof ErrorCodes];

export class AppError extends Error {
  public readonly statusCode: number;
  public readonly errorCode: ErrorCode;

  constructor(message: string, statusCode: number, errorCode: ErrorCode) {
    super(message);
    this.statusCode = statusCode;
    this.errorCode = errorCode;
    Object.setPrototypeOf(this, AppError.prototype);
  }

  static validation(message: string) {
    return new AppError(message, 400, ErrorCodes.VALIDATION_ERROR);
  }

  static notFound(message: string) {
    return new AppError(message, 404, ErrorCodes.NOT_FOUND);
  }

  static unauthorized(message = "Unauthorized") {
    return new AppError(message, 401, ErrorCodes.UNAUTHORIZED);
  }

  static internal(message = "Internal Server Error") {
    return new AppError(message, 500, ErrorCodes.INTERNAL_ERROR);
  }

  static badRequest(message: string) {
    return new AppError(message, 400, ErrorCodes.BAD_REQUEST);
  }
}
