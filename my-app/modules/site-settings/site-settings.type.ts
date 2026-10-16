import type z from "zod";
import type {
  FooterSchema,
  SiteSettingsBrandPatchSchema,
  SiteSettingsDetailsPatchSchema,
  SiteSettingsFooterContentPatchSchema,
  SiteSettingsPoliciesPatchSchema,
  SiteSettingsRequestSchema,
} from "@/shared/schema/site-settings.schema";

export type SiteSettingsRequestType = z.infer<typeof SiteSettingsRequestSchema>;
export type FooterType = z.infer<typeof FooterSchema>;
export type SiteSettingsBrandType = z.infer<typeof SiteSettingsBrandPatchSchema>;
export type SiteSettingsFooterContentType = z.infer<typeof SiteSettingsFooterContentPatchSchema>;
export type SiteSettingsDetailsType = z.infer<typeof SiteSettingsDetailsPatchSchema>;
export type SiteSettingsPoliciesType = z.infer<typeof SiteSettingsPoliciesPatchSchema>;
