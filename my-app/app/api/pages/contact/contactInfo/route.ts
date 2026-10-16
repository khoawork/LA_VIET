import { pageContactService } from "@/modules/pages/page-contact/page-contact.service";
import { HttpStatus, validateBody, withErrorHandler } from "@/shared";
import { PageContactInfoSchema } from "@/shared/schema/pages/page-contact.schema";
import { NextRequest, NextResponse } from "next/server";

export const GET = withErrorHandler(async () => {
  const data = await pageContactService.getSection("contactInfo");
  return NextResponse.json(data, { status: HttpStatus.OK });
});

export const PATCH = withErrorHandler(async (request: NextRequest) => {
  const body = await validateBody(PageContactInfoSchema, request);
  await pageContactService.updateSection("contactInfo", body);
  return new NextResponse(null, { status: HttpStatus.NO_CONTENT });
});
