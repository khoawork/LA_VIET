import { NextRequest } from "next/server";
import { newsCatesService } from "@/modules/news/services/news-cates.service";
import { NewsCatesRequestSchema } from "@/shared/schema/news-cates.schema";
import { withErrorHandler, validateBody } from "@/shared/utils";
import { sendSuccess } from "@/shared/common/api-response";
import { HttpStatus } from "@/shared/common/http-status";

export const GET = withErrorHandler(async () => {
  const categories = await newsCatesService.getAllCategories();
  return sendSuccess(categories, "Lấy danh sách danh mục tin tức thành công");
});

export const POST = withErrorHandler(async (request: NextRequest) => {
  const body = await validateBody(NewsCatesRequestSchema, request);
  const category = await newsCatesService.createCategory(body);

  return sendSuccess(category, "Tạo danh mục tin tức thành công", HttpStatus.CREATED);
});

