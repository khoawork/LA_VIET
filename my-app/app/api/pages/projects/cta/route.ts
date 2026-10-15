import { pageProjectService } from "@/modules/pages/page-project/page-project.service";
import { HttpStatus, validateBody, withErrorHandler } from "@/shared";
import { PageProjectCTASchema } from "@/shared/schema/pages/page-project.schema";
import { NextRequest, NextResponse } from "next/server";

export const GET = withErrorHandler(async () => {
  const cta = await pageProjectService.getCTA();
  return NextResponse.json(cta, { status: HttpStatus.OK });
});

export const PATCH = withErrorHandler(async (request: NextRequest) => {
  const body = await validateBody(PageProjectCTASchema, request);
  await pageProjectService.updateCTA(body);
  return new NextResponse(null, { status: HttpStatus.NO_CONTENT });
});
