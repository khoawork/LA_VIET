import { NextRequest } from "next/server";
import { pageHomeService } from "@/views/homePage/services/pagehome.service";
import {
  UpdatePageHomeRequestSchema,
  CreatePageHomeRequestSchema,
} from "@/shared/schema/pages/pagehome.schema";
import { withErrorHandler, validateBody } from "@/shared/utils";
import { sendSuccess } from "@/shared/common/api-response";
import { HttpStatus } from "@/shared/common/http-status";

/**
 * GET /api/admin/home/page
 * Lấy toàn bộ cấu trúc Section của Trang chủ để hiển thị trên Admin CMS
 */
export const GET = withErrorHandler(async () => {
  const pageContent = await pageHomeService.getPageHomeContent("home");
  return sendSuccess(pageContent, "Lấy cấu trúc Trang chủ thành công");
});

/**
 * PUT /api/admin/home/page
 * Cập nhật cấu trúc Section của Trang chủ từ Admin CMS
 */
export const PUT = withErrorHandler(async (request: NextRequest) => {
  const body = await validateBody(UpdatePageHomeRequestSchema, request);
  const updated = await pageHomeService.updatePageHomeContent("home", body);
  return sendSuccess(updated, "Cập nhật cấu trúc Trang chủ thành công");
});

/**
 * POST /api/admin/home/page
 * Khôi phục về mặc định với { "action": "reset" } hoặc lưu mới
 */
export const POST = withErrorHandler(async (request: NextRequest) => {
  let json: { action?: string } | null = null;
  try {
    json = await request.clone().json();
  } catch {
    // Không phải JSON
  }

  if (json?.action === "reset") {
    const resetPage = await pageHomeService.resetToDefault("home");
    return sendSuccess(
      resetPage,
      "Khôi phục cấu trúc Trang chủ về mặc định thành công",
    );
  }

  const body = await validateBody(CreatePageHomeRequestSchema, request);
  const result = await pageHomeService.updatePageHomeContent("home", body);
  return sendSuccess(
    result,
    "Lưu cấu trúc Trang chủ thành công",
    HttpStatus.CREATED,
  );
});

