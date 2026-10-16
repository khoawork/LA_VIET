import { pageProjectService } from "@/modules/pages/page-project/page-project.service";
import { HttpStatus, validateBody, withErrorHandler } from "@/shared";
import {
  PageProjectRequestSchema,
  PageProjectResponseSchema,
} from "@/shared/schema/pages/page-project.schema";
import { NextRequest, NextResponse } from "next/server";

export const POST = withErrorHandler(async (request: NextRequest) => {
  const body = await validateBody(PageProjectRequestSchema, request);
  const page = await pageProjectService.createPageProject(body);
  return NextResponse.json(PageProjectResponseSchema.parse(page), {
    status: HttpStatus.CREATED,
  });
});

export const GET = withErrorHandler(async () => {
  const page = await pageProjectService.getPageProject();
  return NextResponse.json(PageProjectResponseSchema.parse(page), {
    status: HttpStatus.OK,
  });
});
