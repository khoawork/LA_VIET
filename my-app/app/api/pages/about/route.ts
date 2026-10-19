import { NextRequest } from "next/server";
import {
  pageAboutService,
  DEFAULT_ABOUT_PAGE_CONFIG,
} from "@/modules/pages/page-about";
import {
  HttpStatus,
  sendSuccess,
  validateBody,
  withErrorHandler,
} from "@/shared";
import {
  AboutPageRequestSchema,
  AboutPageResponseSchema,
} from "@/shared/schema/pages/about-product.schema";

export { DEFAULT_ABOUT_PAGE_CONFIG };

export const GET = withErrorHandler(async () => {
  const data = await pageAboutService.getAboutPageData();

  return sendSuccess(
    data,
    "Lấy dữ liệu trang giới thiệu thành công",
    HttpStatus.OK,
  );
});

export const PUT = withErrorHandler(async (request: NextRequest) => {
  const body = await validateBody(AboutPageRequestSchema, request);
  const updatedPage = await pageAboutService.updateAboutPage(body);

  const parsed = AboutPageResponseSchema.parse(updatedPage);

  return sendSuccess(
    parsed,
    "Lưu cấu hình trang giới thiệu thành công",
    HttpStatus.OK,
  );
});
