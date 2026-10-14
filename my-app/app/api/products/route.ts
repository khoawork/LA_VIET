import { productService } from "@/modules/product/product.service";
import { HttpStatus, validateBody, withErrorHandler } from "@/shared";
import {
  ProductsRequestSchema,
  ProductsResponseSchema,
} from "@/shared/schema/products.schema";
import { NextRequest, NextResponse } from "next/server";


export const POST = withErrorHandler(async (request: NextRequest) => {
  const body = await validateBody(ProductsRequestSchema, request);
  const newProduct = await productService.createProduct(body);

  return NextResponse.json(ProductsResponseSchema.parse(newProduct), {
    status: HttpStatus.CREATED,
  });
});

export const GET = withErrorHandler(async (request: NextRequest) => {
  const categoryId = request.nextUrl.searchParams.get("categoryId");
  const id = categoryId ? Number(categoryId) : undefined;

  if (categoryId && isNaN(id!)) {
    return NextResponse.json(
      { message: "ID danh mục không hợp lệ" },
      { status: HttpStatus.BAD_REQUEST },
    );
  }

  const products = await productService.getAllProducts(id);
  return NextResponse.json(
    ProductsResponseSchema.array().parse(products),
    { status: HttpStatus.OK },
  );
});


