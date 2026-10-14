import { productCategoryService } from "@/modules/product/product-category.service";
import { HttpStatus, validateBody, withErrorHandler } from "@/shared";
import {
  ProdCatesRequestSchema,
  ProdCatesResponseSchema,
} from "@/shared/schema/prod-cates.schema";
import { NextRequest, NextResponse } from "next/server";

export const GET = withErrorHandler(async (request: NextRequest) => {
    return NextResponse.json(
        await productCategoryService.getAllCategories(),
        { status: HttpStatus.OK },
    );
});

export const POST = withErrorHandler(async (request: NextRequest) => {
  const body = await validateBody(ProdCatesRequestSchema, request);
  const newCategory = await productCategoryService.createCategory(body);

  return NextResponse.json(ProdCatesResponseSchema.parse(newCategory), {
    status: HttpStatus.CREATED,
  });
});



