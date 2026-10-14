import { productService } from "@/modules/product";
import {
  HttpStatus,
  RouteContext,
  validateBody,
  withErrorHandler,
} from "@/shared";
import {
  ProductsRequestSchema,
  ProductsResponseSchema,
} from "@/shared/schema/products.schema";
import { NextRequest, NextResponse } from "next/server";

export const GET = withErrorHandler(
  async (request: NextRequest, context: RouteContext<{ id: string }>) => {
    const { id } = await context.params;
    const productId = Number(id);

    if (isNaN(productId)) {
      return NextResponse.json(
        { message: "ID sản phẩm không hợp lệ" },
        { status: HttpStatus.BAD_REQUEST },
      );
    }

    const product = await productService.getProductById(productId);
    if (!product) {
      return NextResponse.json(
        { message: "Không tìm thấy sản phẩm" },
        { status: HttpStatus.NOT_FOUND },
      );
    }

    return NextResponse.json(ProductsResponseSchema.parse(product), {
      status: HttpStatus.OK,
    });
  },
);

export const PUT = withErrorHandler(
  async (request: NextRequest, context: RouteContext<{ id: string }>) => {
    const { id } = await context.params;
    const productId = Number(id);

    if (isNaN(productId)) {
      return NextResponse.json(
        { message: "ID sản phẩm không hợp lệ" },
        { status: HttpStatus.BAD_REQUEST },
      );
    }

    const body = await validateBody(ProductsRequestSchema, request);
    const updatedProduct = await productService.updateProduct(productId, body);

    if (!updatedProduct) {
      return NextResponse.json(
        { message: "Không tìm thấy sản phẩm để cập nhật" },
        { status: HttpStatus.NOT_FOUND },
      );
    }

    return NextResponse.json(ProductsResponseSchema.parse(updatedProduct), {
      status: HttpStatus.OK,
    });
  },
);

export const DELETE = withErrorHandler(
  async (request: NextRequest, context: RouteContext<{ id: string }>) => {
    const { id } = await context.params;
    const productId = Number(id);

    if (isNaN(productId)) {
      return NextResponse.json(
        { message: "ID sản phẩm không hợp lệ" },
        { status: HttpStatus.BAD_REQUEST },
      );
    }

    const deletedProduct = await productService.deleteProduct(productId);
    if (!deletedProduct) {
      return NextResponse.json(
        { message: "Không tìm thấy sản phẩm để xóa" },
        { status: HttpStatus.NOT_FOUND },
      );
    }

    return NextResponse.json(
      { message: "Sản phẩm đã được xóa thành công", id: productId },
      { status: HttpStatus.OK },
    );
  },
);
