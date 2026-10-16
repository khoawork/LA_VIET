import type { z } from "zod";
import type {
  SiteSettingsRequestSchema,
  SiteSettingsResponseSchema,
} from "@/shared/schema/site-settings.schema";

export type SiteSetting = z.infer<typeof SiteSettingsResponseSchema>;
export type SiteSettingsDraft = z.infer<typeof SiteSettingsRequestSchema>;
export type FooterDraft = SiteSettingsDraft["footer"];
export type BrandingTab =
  | "brand"
  | "footer"
  | "details"
  | "policies";
