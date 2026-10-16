import { siteSettingsService } from "@/modules/site-settings/site-settings.service";
import { HttpStatus, validateBody, withErrorHandler } from "@/shared";
import { SiteSettingsDetailsPatchSchema } from "@/shared/schema/site-settings.schema";
import { NextRequest, NextResponse } from "next/server";

export const GET = withErrorHandler(async () => {
  const data = await siteSettingsService.getDetails();
  return NextResponse.json(data, { status: HttpStatus.OK });
});

export const PATCH = withErrorHandler(async (request: NextRequest) => {
  const body = await validateBody(SiteSettingsDetailsPatchSchema, request);
  await siteSettingsService.updateDetails(body);
  return new NextResponse(null, { status: HttpStatus.NO_CONTENT });
});
