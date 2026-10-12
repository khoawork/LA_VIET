import { HttpStatus, type HttpStatusCode } from "./http-status";

export class AppError extends Error {
  public readonly statusCode: HttpStatusCode;
  public readonly errorCode: string;
  public readonly errors?: unknown;

  constructor(
    message: string,
    statusCode: HttpStatusCode = HttpStatus.INTERNAL_SERVER_ERROR,
    errorCode: string = "INTERNAL_ERROR",
    errors?: unknown,
  ) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.errorCode = errorCode;
    this.errors = errors;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class BadRequestException extends AppError {
  constructor(message = "Yêu cầu không hợp lệ", errors?: unknown) {
    super(message, HttpStatus.BAD_REQUEST, "BAD_REQUEST", errors);
  }
}

export class UnauthorizedException extends AppError {
  constructor(message = "Không có quyền truy cập / Chưa xác thực") {
    super(message, HttpStatus.UNAUTHORIZED, "UNAUTHORIZED");
  }
}

export class ForbiddenException extends AppError {
  constructor(message = "Hành động bị từ chối") {
    super(message, HttpStatus.FORBIDDEN, "FORBIDDEN");
  }
}

export class NotFoundException extends AppError {
  constructor(message = "Không tìm thấy tài nguyên") {
    super(message, HttpStatus.NOT_FOUND, "NOT_FOUND");
  }
}

export class ConflictException extends AppError {
  constructor(message = "Dữ liệu bị trùng lặp hoặc xung đột", errors?: unknown) {
    super(message, HttpStatus.CONFLICT, "CONFLICT", errors);
  }
}

export class ValidationException extends AppError {
  constructor(message = "Dữ liệu không đúng định dạng", errors?: unknown) {
    super(message, HttpStatus.UNPROCESSABLE_ENTITY, "VALIDATION_ERROR", errors);
  }
}

export class InternalServerErrorException extends AppError {
  constructor(message = "Lỗi hệ thống máy chủ nội bộ", errors?: unknown) {
    super(message, HttpStatus.INTERNAL_SERVER_ERROR, "INTERNAL_SERVER_ERROR", errors);
  }
}

