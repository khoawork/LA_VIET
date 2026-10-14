import { SiteSettingsPatchSchema, SiteSettingsRequestSchema, SiteSettingsResponseSchema } from "@/shared/schema/site-settings.schema";
import z from "zod";

export type SiteSettingsRequestSchemaType = z.infer<typeof SiteSettingsRequestSchema>;
export type SiteSettingsResponseSchemaType = z.infer<typeof SiteSettingsResponseSchema>;
export type SiteSettingsPatchSchemaType = z.infer<typeof SiteSettingsPatchSchema>;