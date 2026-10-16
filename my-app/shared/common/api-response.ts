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

/**
 * Định dạng thời gian theo múi giờ Việt Nam: giờ trước ngày sau (HH:mm:ss DD/MM/YYYY)
 */
export function getVietnamTimestamp(date = new Date()): string {
  return new Intl.DateTimeFormat("vi-VN", {
    timeZone: "Asia/Ho_Chi_Minh",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour12: false,
  }).format(date);
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
      timestamp: getVietnamTimestamp(),
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
      timestamp: getVietnamTimestamp(),
    },
    { status: statusCode },
  );
}
