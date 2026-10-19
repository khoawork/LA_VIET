import { NextRequest } from "next/server";
import { pageMenuService } from "@/modules/pages/page-menu";
import {
  HttpStatus,
  sendSuccess,
  validateBody,
  withErrorHandler,
} from "@/shared";
import {
  MenuPropsSchema,
  DEFAULT_MENU_ITEMS,
} from "@/shared/schema/menu.schema";

export const GET = withErrorHandler(async () => {
  const items = await pageMenuService.getMenu();

  return sendSuccess(
    items,
    "Lấy danh sách menu điều hướng thành công",
    HttpStatus.OK,
  );
});

export const PUT = withErrorHandler(async (request: NextRequest) => {
  const body = await validateBody(MenuPropsSchema, request);
  const updated = await pageMenuService.updateMenu(body.items);

  const items = (updated.props as { items: unknown }).items;

  return sendSuccess(
    items,
    "Cập nhật thứ tự menu điều hướng thành công",
    HttpStatus.OK,
  );
});

