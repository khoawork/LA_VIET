import { NextResponse } from "next/server";
import { HttpStatus, type HttpStatusCode } from "./http-status";
import type { PaginationMeta } from "./pagination";

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  meta?: PaginationMeta;
  errors?: unknown;
  errorCode?: string;
  timestamp: string;
}

export function sendSuccess<T>(
  data: T,
  message = "Thao tác thành công",
  statusCode: HttpStatusCode = HttpStatus.OK,
  meta?: PaginationMeta,
): NextResponse<ApiResponse<T>> {
  return NextResponse.json(
    {
      success: true,
      message,
      data,
      ...(meta ? { meta } : {}),
      timestamp: new Date().toISOString(),
    },
    { status: statusCode },
  );
}

export function sendPaginated<T>(
  data: T,
  meta: PaginationMeta,
  message = "Lấy dữ liệu phân trang thành công",
): NextResponse<ApiResponse<T>> {
  return sendSuccess(data, message, HttpStatus.OK, meta);
}

export function sendError(
  message = "Đã có lỗi xảy ra",
  statusCode: HttpStatusCode = HttpStatus.INTERNAL_SERVER_ERROR,
  errors?: unknown,
  errorCode = "INTERNAL_ERROR",
): NextResponse<ApiResponse<null>> {
  return NextResponse.json(
    {
      success: false,
      message,
      errors,
      errorCode,
      timestamp: new Date().toISOString(),
    },
    { status: statusCode },
  );
}

