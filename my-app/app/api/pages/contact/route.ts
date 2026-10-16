import { pageContactService } from "@/modules/pages/page-contact/page-contact.service";
import { HttpStatus, validateBody, withErrorHandler } from "@/shared";
import {
  PageContactRequestSchema,
  PageContactResponseSchema,
} from "@/shared/schema/pages/page-contact.schema";
import { NextRequest, NextResponse } from "next/server";

export const GET = withErrorHandler(async () => {
  const page = await pageContactService.getPageContact();
  return NextResponse.json(PageContactResponseSchema.parse(page), { status: HttpStatus.OK });
});

export const POST = withErrorHandler(async (request: NextRequest) => {
  const body = await validateBody(PageContactRequestSchema, request);
  const page = await pageContactService.createPageContact(body);
  return NextResponse.json(PageContactResponseSchema.parse(page), { status: HttpStatus.CREATED });
});
