import { pageProjectService } from "@/modules/pages/page-project/page-project.service";
import { HttpStatus, validateBody, withErrorHandler } from "@/shared";
import { PageProjectFilterSchema } from "@/shared/schema/pages/page-project.schema";
import { NextRequest, NextResponse } from "next/server";

export const GET = withErrorHandler(async () => {
  const filter = await pageProjectService.getFilter();
  return NextResponse.json(filter, { status: HttpStatus.OK });
});

export const PATCH = withErrorHandler(async (request: NextRequest) => {
  const body = await validateBody(PageProjectFilterSchema, request);
  await pageProjectService.updateFilter(body);
  return new NextResponse(null, { status: HttpStatus.NO_CONTENT });
});
