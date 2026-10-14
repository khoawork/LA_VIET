import { NextRequest } from "next/server";
import { newsCatesService } from "@/modules/news/services/news-cates.service";
import {
  NewsCatesIdSchema,
  NewsCatesUpdateRequestSchema,
  NewsCatesPatchRequestSchema,
} from "@/shared/schema/news-cates.schema";
import {
  withErrorHandler,
  validateParams,
  validateBody,
  RouteContext,
} from "@/shared/utils";
import { sendSuccess } from "@/shared/common/api-response";

export const GET = withErrorHandler(
  async (_request: NextRequest, context: RouteContext<{ id: string }>) => {
    const { id } = await validateParams(NewsCatesIdSchema, context.params);
    const category = await newsCatesService.getCategoryById(id);

    return sendSuccess(category, "Lấy chi tiết danh mục tin tức thành công");
  },
);

export const PUT = withErrorHandler(
  async (request: NextRequest, context: RouteContext<{ id: string }>) => {
    const { id } = await validateParams(NewsCatesIdSchema, context.params);
    const body = await validateBody(NewsCatesUpdateRequestSchema, request);
    const updated = await newsCatesService.updateCategory(id, body);

    return sendSuccess(updated, "Cập nhật danh mục tin tức thành công");
  },
);

export const PATCH = withErrorHandler(
  async (request: NextRequest, context: RouteContext<{ id: string }>) => {
    const { id } = await validateParams(NewsCatesIdSchema, context.params);
    const body = await validateBody(NewsCatesPatchRequestSchema, request);
    const updated = await newsCatesService.updateCategory(id, body);

    return sendSuccess(updated, "Cập nhật một phần danh mục tin tức thành công");
  },
);

export const DELETE = withErrorHandler(
  async (_request: NextRequest, context: RouteContext<{ id: string }>) => {
    const { id } = await validateParams(NewsCatesIdSchema, context.params);
    const deleted = await newsCatesService.deleteCategory(id);

    return sendSuccess(deleted, "Xóa danh mục tin tức thành công");
  },
);

