import { pageProjectService } from "@/modules/pages/page-project/page-project.service";
import { HttpStatus, validateBody, withErrorHandler } from "@/shared";
import { PageProjectHeaderSchema } from "@/shared/schema/pages/page-project.schema";
import { NextRequest, NextResponse } from "next/server";

export const GET = withErrorHandler(async () => {
  const header = await pageProjectService.getHeader();
  return NextResponse.json(header, { status: HttpStatus.OK });
});

export const PATCH = withErrorHandler(async (request: NextRequest) => {
  const body = await validateBody(PageProjectHeaderSchema, request);
  await pageProjectService.updateHeader(body);
  return new NextResponse(null, { status: HttpStatus.NO_CONTENT });
});
