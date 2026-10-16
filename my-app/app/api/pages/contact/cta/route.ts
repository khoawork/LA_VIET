import { pageContactService } from "@/modules/pages/page-contact/page-contact.service";
import { HttpStatus, validateBody, withErrorHandler } from "@/shared";
import { PageContactCTASchema } from "@/shared/schema/pages/page-contact.schema";
import { NextRequest, NextResponse } from "next/server";

export const GET = withErrorHandler(async () => {
  const data = await pageContactService.getSection("cta");
  return NextResponse.json(data, { status: HttpStatus.OK });
});

export const PATCH = withErrorHandler(async (request: NextRequest) => {
  const body = await validateBody(PageContactCTASchema, request);
  await pageContactService.updateSection("cta", body);
  return new NextResponse(null, { status: HttpStatus.NO_CONTENT });
});
