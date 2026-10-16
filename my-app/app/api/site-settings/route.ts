import { siteSettingsService } from "@/modules/site-settings/site-settings.service";
import { HttpStatus, validateBody, withErrorHandler } from "@/shared";
import {
  SiteSettingsRequestSchema,
  SiteSettingsResponseSchema,
} from "@/shared/schema/site-settings.schema";
import { NextRequest, NextResponse } from "next/server";

export const GET = withErrorHandler(async () => {
  const setting = await siteSettingsService.getSiteSettings();
  return NextResponse.json(SiteSettingsResponseSchema.parse(setting), {
    status: HttpStatus.OK,
  });
});

export const POST = withErrorHandler(async (request: NextRequest) => {
  const body = await validateBody(SiteSettingsRequestSchema, request);
  const setting = await siteSettingsService.createSiteSettings(body);
  return NextResponse.json(SiteSettingsResponseSchema.parse(setting), {
    status: HttpStatus.CREATED,
  });
});
