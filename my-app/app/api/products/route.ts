import { productService } from "@/modules/product/product.service";
import {
  createPaginationMeta,
  HttpStatus,
  sendPaginated,
  validateBody,
  validateQuery,
  withErrorHandler,
} from "@/shared";
import {
  ProductsListItemResponseSchema,
  ProductsQuerySchema,
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
  const query = validateQuery(ProductsQuerySchema, request.nextUrl.searchParams);
  const { products, totalItems } = await productService.getAllProducts(query);
  return sendPaginated(
    ProductsListItemResponseSchema.array().parse(products),
    createPaginationMeta(totalItems, query.page, query.limit),
  );
});


