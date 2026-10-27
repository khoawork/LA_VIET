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
 * GET /api/admin/news
 * Lấy cấu trúc toàn bộ Section của trang tin tức dành cho Admin
 */
export const GET = withErrorHandler(async () => {
  const pageContent = await pageNewService.getPageNewContent("news");
  return sendSuccess(pageContent, "Lấy cấu trúc trang tin tức thành công");
});

/**
 * PUT /api/admin/news
 * Cập nhật cấu trúc Section của trang tin tức từ Admin CMS
 */
export const PUT = withErrorHandler(async (request: NextRequest) => {
  const body = await validateBody(UpdatePageNewRequestSchema, request);
  const updated = await pageNewService.updatePageNewContent("news", body);
  return sendSuccess(updated, "Cập nhật cấu trúc trang tin tức thành công");
});

/**
 * POST /api/admin/news
 * Khởi tạo cấu trúc trang tin tức
 */
export const POST = withErrorHandler(async (request: NextRequest) => {
  const body = await validateBody(CreatePageNewRequestSchema, request);
  const result = await pageNewService.updatePageNewContent("news", body);
  return sendSuccess(
    result,
    "Lưu cấu trúc trang tin tức thành công",
    HttpStatus.CREATED,
  );
});

