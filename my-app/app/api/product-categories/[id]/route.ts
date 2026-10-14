import { productCategoryService } from "@/modules/product";
import {
  HttpStatus,
  ProdCatesRequestSchema,
  ProdCatesResponseSchema,
  RouteContext,
  validateBody,
  withErrorHandler,
} from "@/shared";
import { NextRequest, NextResponse } from "next/server";

export const GET = withErrorHandler( async (request: NextRequest, context: RouteContext<{ id: string }>) => {
    const { id } = await context.params;
    const categoryId = Number(id);

    if (isNaN(categoryId)) {
      return NextResponse.json(
        { message: "ID danh mục không hợp lệ" },
        { status: HttpStatus.BAD_REQUEST },
      );
    }

    const category = await productCategoryService.getCategoryById(categoryId);
    if (!category) {
      return NextResponse.json(
        { message: "Không tìm thấy danh mục sản phẩm" },
        { status: HttpStatus.NOT_FOUND },
      );
    }

    return NextResponse.json(
      ProdCatesResponseSchema.parse(category),
      { status: HttpStatus.OK },
    );
  },
);

export const PUT = withErrorHandler(
  async (request: NextRequest, context: RouteContext<{ id: string }>) => {
    const { id } = await context.params;
    const categoryId = Number(id);

    if (isNaN(categoryId)) {
      return NextResponse.json(
        { message: "ID danh mục không hợp lệ" },
        { status: HttpStatus.BAD_REQUEST },
      );
    }

    const data = await validateBody(ProdCatesRequestSchema, request);
    const updatedCategory = await productCategoryService.updateCategory(
      categoryId,
      data,
    );

    if (!updatedCategory) {
      return NextResponse.json(
        { message: "Không tìm thấy danh mục sản phẩm để cập nhật" },
        { status: HttpStatus.NOT_FOUND },
      );
    }

    return NextResponse.json(
      ProdCatesResponseSchema.parse(updatedCategory),
      { status: HttpStatus.OK },
    );
  },
);

export const DELETE = withErrorHandler(
  async (request: NextRequest, context: RouteContext<{ id: string }>) => {
    const { id } = await context.params;
    const categoryId = Number(id);

    if (isNaN(categoryId)) {
      return NextResponse.json(
        { message: "ID danh mục không hợp lệ" },
        { status: HttpStatus.BAD_REQUEST },
      );
    }

    const deletedCategory = await productCategoryService.deleteCategory(categoryId);
    if (!deletedCategory) {
      return NextResponse.json(
        { message: "Không tìm thấy danh mục sản phẩm để xóa" },
        { status: HttpStatus.NOT_FOUND },
      );
    }

    return NextResponse.json(
      { message: "Xóa danh mục sản phẩm thành công", id: categoryId },
      { status: HttpStatus.OK },
    );
  },
);