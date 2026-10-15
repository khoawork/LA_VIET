import { FooterPatchSchema, FooterSchema, SiteSettingsPatchSchema, SiteSettingsRequestSchema, SiteSettingsResponseSchema } from "@/shared/schema/site-settings.schema";
import z from "zod";

export type SiteSettingsRequestSchemaType = z.infer<typeof SiteSettingsRequestSchema>;
export type SiteSettingsResponseSchemaType = z.infer<typeof SiteSettingsResponseSchema>;
export type SiteSettingsPatchSchemaType = z.infer<typeof SiteSettingsPatchSchema>;
export type FooterSchemaType = z.infer<typeof FooterSchema>;
export type FooterPatchSchemaType = z.infer<typeof FooterPatchSchema>;