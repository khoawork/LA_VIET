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

export const SiteSettingsResponseSchema = z.object({
  id: z.number(),
  logo: z.url(),
  company: z.string(),
  tagline: z.string(),
  footer: FooterSchema,
});

export const SiteSettingsParamSchema = z.object({
  id: z.coerce.number().int().positive(),
});

export const FooterPatchSchema = FooterSchema.partial().extend({
  office: FooterSchema.shape.office.partial().optional(),
  contact: FooterSchema.shape.contact.partial().optional(),
  social: FooterSchema.shape.social.partial().optional(),
  policies: z.array(FooterSchema.shape.policies.element.partial()).optional(),
});

export const SiteSettingsPatchSchema =
  SiteSettingsRequestSchema.partial().extend({
    footer: FooterPatchSchema.optional(),
  });
