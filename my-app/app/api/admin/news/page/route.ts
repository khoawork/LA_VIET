import { NextRequest } from "next/server";
import { pageNewService } from "@/views/newPages/services/pagenew.service";
import {
  UpdatePageNewRequestSchema,
  CreatePageNewRequestSchema,
} from "@/shared/schema/pages/pagenew.schema";
import { withErrorHandler, validateBody } from "@/shared/utils";
import { sendSuccess } from "@/shared/common/api-response";
import { HttpStatus } from "@/shared/common/http-status";

/**
 * GET /api/admin/news/page
 * Lấy toàn bộ cấu trúc Section của trang Tin tức để hiển thị trên Admin CMS
 */
export const GET = withErrorHandler(async () => {
  const pageContent = await pageNewService.getPageNewContent("news");
  return sendSuccess(pageContent, "Lấy cấu trúc trang tin tức thành công");
});

/**
 * PUT /api/admin/news/page
 * Cập nhật cấu trúc Section của trang Tin tức từ Admin CMS
 */
export const PUT = withErrorHandler(async (request: NextRequest) => {
  const body = await validateBody(UpdatePageNewRequestSchema, request);
  const updated = await pageNewService.updatePageNewContent("news", body);
  return sendSuccess(updated, "Cập nhật cấu trúc trang tin tức thành công");
});

/**
 * POST /api/admin/news/page
 * Lưu khởi tạo mới hoặc khôi phục về mặc định với { "action": "reset" }
 */
export const POST = withErrorHandler(async (request: NextRequest) => {
  let json: { action?: string } | null = null;
  try {
    json = await request.clone().json();
  } catch {
    // Không phải JSON hợp lệ thì tiếp tục validate theo schema bình thường
  }

  if (json?.action === "reset") {
    const resetPage = await pageNewService.resetToDefault("news");
    return sendSuccess(
      resetPage,
      "Khôi phục cấu trúc trang tin tức về mặc định thành công",
    );
  }

  const body = await validateBody(CreatePageNewRequestSchema, request);
  const result = await pageNewService.updatePageNewContent("news", body);
  return sendSuccess(
    result,
    "Lưu cấu trúc trang tin tức thành công",
    HttpStatus.CREATED,
  );
});

