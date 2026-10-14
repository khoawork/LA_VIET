import { siteSettingsService } from "@/modules/site-settings/site-settings.service";
import { HttpStatus, validateBody, withErrorHandler } from "@/shared";
import {
  SiteSettingsRequestSchema,
  SiteSettingsResponseSchema,
} from "@/shared/schema/site-settings.schema";
import { NextRequest } from "next/dist/server/web/spec-extension/request";
import { NextResponse } from "next/server";

export const POST = withErrorHandler(async (request: NextRequest) => {
  const body = await validateBody(SiteSettingsRequestSchema, request);
  const siteSettings = await siteSettingsService.createSiteSettings(body);
  return NextResponse.json(SiteSettingsResponseSchema.parse(siteSettings), {
    status: HttpStatus.CREATED,
  });
});

export const GET = withErrorHandler(async () => {
  const siteSettings = await siteSettingsService.getAllSiteSettings();
  return NextResponse.json(
    SiteSettingsResponseSchema.array().parse(siteSettings),
    {
      status: HttpStatus.OK,
    },
  );
});
