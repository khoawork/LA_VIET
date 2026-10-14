import z from "zod";

export const SiteSettingsRequestSchema = z.object({
  logo: z.url(),
  company: z
    .string()
    .min(1, "Company is required")
    .max(100, "Company must be less than 100 characters"),
  tagline: z
    .string()
    .min(1, "Tagline is required")
    .max(100, "Tagline must be less than 100 characters"),
  footer: z.record(z.string(), z.json()),
});

export const SiteSettingsResponseSchema = z.object({
  id: z.number(),
  logo: z.url(),
  company: z.string(),
  tagline: z.string(),
  footer: z.json(),
});

export const SiteSettingsParamSchema = z.object({
  id: z.coerce.number().int().positive(),
});

export const SiteSettingsPatchSchema = SiteSettingsRequestSchema.partial();