import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import { AppError } from "@/shared/common/app-error";
import { sendError } from "@/shared/common/api-response";
import { HttpStatus } from "@/shared/common/http-status";
import { formatZodError } from "./validate";

export type RouteContext<TParams = Record<string, string | string[]>> = {
  params: Promise<TParams>;
};

type ApiHandlerFunction<TContext = RouteContext> = (
  req: NextRequest,
  context: TContext,
) => Promise<NextResponse> | NextResponse;

/**
 * Wrapper bắt lỗi toàn cục cho các API Route Handlers
 */
export function withErrorHandler<TContext = RouteContext>(
  handler: ApiHandlerFunction<TContext>,
) {
  return async (req: NextRequest, context: TContext): Promise<NextResponse> => {
    try {
      return await handler(req, context);
    } catch (error: unknown) {
      // Cho phép Next.js xử lý các lỗi điều hướng và render động nội bộ (NEXT_PRERENDER_INTERRUPTED, NEXT_REDIRECT, ...)
      if (
        error &&
        typeof error === "object" &&
        "digest" in error &&
        typeof (error as { digest: unknown }).digest === "string" &&
        (error as { digest: string }).digest.startsWith("NEXT_")
      ) {
        throw error;
      }

      if (error instanceof AppError) {
        return sendError(
          error.message,
          error.statusCode,
          error.errors,
          error.errorCode,
        );
      }

      if (error instanceof ZodError) {
        return sendError(
          "Dữ liệu không đúng định dạng",
          HttpStatus.UNPROCESSABLE_ENTITY,
          formatZodError(error),
          "VALIDATION_ERROR",
        );
      }

      const errObj = error as { code?: string; meta?: { target?: string[] } };
      if (errObj && typeof errObj.code === "string") {
        if (errObj.code === "P2002") {
          const fields = errObj.meta?.target?.join(", ") ?? "dữ liệu";
          return sendError(
            `Giá trị của trường ${fields} đã tồn tại trong hệ thống`,
            HttpStatus.CONFLICT,
            undefined,
            "DUPLICATE_RECORD",
          );
        }
        if (errObj.code === "P2025") {
          return sendError(
            "Bản ghi yêu cầu không tồn tại hoặc đã bị xóa",
            HttpStatus.NOT_FOUND,
            undefined,
            "RECORD_NOT_FOUND",
          );
        }
      }

      console.error("[API_ERROR_UNHANDLED]:", error);
      const isDev = process.env.NODE_ENV !== "production";
      const message =
        isDev && error instanceof Error
          ? error.message
          : "Hệ thống gặp sự cố, vui lòng thử lại sau";

      return sendError(
        message,
        HttpStatus.INTERNAL_SERVER_ERROR,
        undefined,
        "INTERNAL_SERVER_ERROR",
      );
    }
  };
}

