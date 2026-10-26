import { NextRequest } from "next/server";
import {
  pageProductService,
  DEFAULT_PRODUCTS_PAGE_CONFIG,
} from "@/modules/pages/page-product";
import {
  HttpStatus,
  sendSuccess,
  validateBody,
  withErrorHandler,
} from "@/shared";
import {
  ProductsPageRequestSchema,
  ProductsPageResponseSchema,
} from "@/shared/schema/pages/page-product.schema";

export { DEFAULT_PRODUCTS_PAGE_CONFIG };

export const GET = withErrorHandler(async (request: NextRequest) => {
  if (request.nextUrl.searchParams.get("summary") === "true") {
    const summary = await pageProductService.getProductPageSummary();
    return sendSuccess(summary, "Lấy cấu hình trang sản phẩm thành công");
  }
  const data = await pageProductService.getProductPageData();

  return sendSuccess(
    data,
    "Lấy dữ liệu trang sản phẩm thành công",
    HttpStatus.OK,
  );
});

export const PUT = withErrorHandler(async (request: NextRequest) => {
  const body = await validateBody(ProductsPageRequestSchema, request);
  const updatedPage = await pageProductService.updateProductPage(body);

  const parsed = ProductsPageResponseSchema.parse(updatedPage);

  return sendSuccess(
    parsed,
    "Lưu cấu hình trang sản phẩm thành công",
    HttpStatus.OK,
  );
});
