import { siteSettingsService } from "@/modules/site-settings/site-settings.service";
import {
  HttpStatus,
  validateBody,
  validateParams,
  withErrorHandler,
} from "@/shared";
import {
  SiteSettingsParamSchema,
  SiteSettingsPatchSchema,
  SiteSettingsResponseSchema,
} from "@/shared/schema/site-settings.schema";
import { NextRequest, NextResponse } from "next/server";

export const GET = withErrorHandler(
  async (_request: NextRequest, { params }: { params: { id: string } }) => {
    const { id } = await validateParams(SiteSettingsParamSchema, params);
    const siteSettings = await siteSettingsService.getSiteSettingsById(id);
    return NextResponse.json(SiteSettingsResponseSchema.parse(siteSettings), {
      status: HttpStatus.OK,
    });
  },
);

export const PATCH = withErrorHandler(
  async (_request: NextRequest, { params }: { params: { id: string } }) => {
    const { id } = await validateParams(SiteSettingsParamSchema, params);
    const body = await validateBody(SiteSettingsPatchSchema, _request);
    await siteSettingsService.updateSiteSettings(id, body);
    return new NextResponse(null, {
      status: HttpStatus.NO_CONTENT,
    });
  },
);

export const DELETE = withErrorHandler(
  async (_request: NextRequest, { params }: { params: { id: string } }) => {
    const { id } = await validateParams(SiteSettingsParamSchema, params);
    await siteSettingsService.deleteSiteSettings(id);
    return new NextResponse(null, {
      status: HttpStatus.NO_CONTENT,
    });
  },
);