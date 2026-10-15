import { NextRequest } from "next/server";
import { newsService } from "@/modules/news/services/news.service";
import {
  NewsRequestSchema,
  NewsQuerySchema,
} from "@/shared/schema/news.schema";
import {
  withErrorHandler,
  validateBody,
  validateQuery,
} from "@/shared/utils";
import { sendPaginated, sendSuccess } from "@/shared/common/api-response";
import { HttpStatus } from "@/shared/common/http-status";

export const GET = withErrorHandler(async (request: NextRequest) => {
  const query = validateQuery(NewsQuerySchema, request.nextUrl.searchParams);
  const result = await newsService.getAllNews(query);

  return sendPaginated(
    result.items,
    result.meta,
    "Lấy danh sách tin tức thành công",
  );
});

export const POST = withErrorHandler(async (request: NextRequest) => {
  const body = await validateBody(NewsRequestSchema, request);
  const news = await newsService.createNews(body);

  return sendSuccess(news, "Tạo tin tức thành công", HttpStatus.CREATED);
});
