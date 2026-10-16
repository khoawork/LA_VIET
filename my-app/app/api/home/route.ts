import { pageHomeService } from "@/views/homePage/services/pagehome.service";
import { withErrorHandler, sendSuccess } from "@/shared";

/**
 * GET /api/home
 * Lấy cấu trúc toàn bộ nội dung Trang chủ cho phía người dùng (Frontend)
 */
export const GET = withErrorHandler(async () => {
  const content = await pageHomeService.getPageHomeContent("home");
  return sendSuccess(content, "Lấy nội dung Trang chủ thành công");
});