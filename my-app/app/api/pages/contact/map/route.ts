import { pageContactService } from "@/modules/pages/page-contact/page-contact.service";
import { HttpStatus, validateBody, withErrorHandler } from "@/shared";
import { PageContactMapSchema } from "@/shared/schema/pages/page-contact.schema";
import { NextRequest, NextResponse } from "next/server";

export const GET = withErrorHandler(async () => {
  const data = await pageContactService.getSection("map");
  return NextResponse.json(data, { status: HttpStatus.OK });
});

export const PATCH = withErrorHandler(async (request: NextRequest) => {
  const body = await validateBody(PageContactMapSchema, request);
  await pageContactService.updateSection("map", body);
  return new NextResponse(null, { status: HttpStatus.NO_CONTENT });
});
