import z from "zod";

export const FooterSchema = z
  .object({
    description: z.string().min(1),
    office: z
      .object({
        title: z.string().min(1),
        locations: z.array(
          z.object({
            name: z.string().nullish(),
            address: z.string().nullish(),
          }),
        ),
      })
      .catchall(z.json()),
    contact: z
      .object({
        title: z.string().min(1),
        methods: z.array(
          z.object({
            icon: z.string().nullish(),
            value: z.string().nullish(),
          }),
        ),
      })
      .catchall(z.json()),
    social: z
      .object({
        title: z.string().min(1),
        links: z.array(
          z.object({
            icon: z.string().nullish(),
            href: z.string().nullish(),
          }),
        ),
      })
      .catchall(z.json()),
    copyright: z.string().min(1),
    policies: z.array(
      z.object({
        label: z.string().nullish(),
        href: z.string().nullish(),
      }),
    ),
  })
  .catchall(z.json());

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
  footer: FooterSchema,
});

export const SiteSettingsResponseSchema = SiteSettingsRequestSchema;

// Each Branding tab sends only the fields it owns when editing an existing record.
export const SiteSettingsBrandPatchSchema = z.strictObject({
  logo: SiteSettingsRequestSchema.shape.logo,
  company: SiteSettingsRequestSchema.shape.company,
  tagline: SiteSettingsRequestSchema.shape.tagline,
});

export const SiteSettingsFooterContentPatchSchema = z.strictObject({
  description: FooterSchema.shape.description,
  copyright: FooterSchema.shape.copyright,
});

export const SiteSettingsDetailsPatchSchema = z.strictObject({
  office: FooterSchema.shape.office,
  contact: FooterSchema.shape.contact,
  social: FooterSchema.shape.social,
});

export const SiteSettingsPoliciesPatchSchema = z.strictObject({
  policies: FooterSchema.shape.policies,
});
