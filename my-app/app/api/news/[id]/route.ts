import { NextRequest } from "next/server";
import { newsService } from "@/modules/news/services/news.service";
import {
  NewsIdSchema,
  NewsUpdateRequestSchema,
  NewsPatchRequestSchema,
} from "@/shared/schema/news.schema";
import {
  withErrorHandler,
  validateParams,
  validateBody,
  RouteContext,
} from "@/shared/utils";
import { sendSuccess } from "@/shared/common/api-response";

export const GET = withErrorHandler(
  async (_request: NextRequest, context: RouteContext<{ id: string }>) => {
    const { id } = await validateParams(NewsIdSchema, context.params);
    const news = await newsService.getNewsById(id);

    return sendSuccess(news, "Lấy chi tiết tin tức thành công");
  },
);

export const PUT = withErrorHandler(
  async (request: NextRequest, context: RouteContext<{ id: string }>) => {
    const { id } = await validateParams(NewsIdSchema, context.params);
    const body = await validateBody(NewsUpdateRequestSchema, request);
    const updated = await newsService.updateNews(id, body);

    return sendSuccess(updated, "Cập nhật tin tức thành công");
  },
);

export const PATCH = withErrorHandler(
  async (request: NextRequest, context: RouteContext<{ id: string }>) => {
    const { id } = await validateParams(NewsIdSchema, context.params);
    const body = await validateBody(NewsPatchRequestSchema, request);
    const updated = await newsService.updateNews(id, body);

    return sendSuccess(updated, "Cập nhật một phần tin tức thành công");
  },
);

export const DELETE = withErrorHandler(
  async (_request: NextRequest, context: RouteContext<{ id: string }>) => {
    const { id } = await validateParams(NewsIdSchema, context.params);
    const deleted = await newsService.deleteNews(id);

    return sendSuccess(deleted, "Xóa tin tức thành công");
  },
);
