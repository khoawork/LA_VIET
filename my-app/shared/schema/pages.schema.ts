import z from "zod";

export const PageSlugSchema = z
  .string()
  .trim()
  .min(1, "Slug is required")
  .max(100, "Slug must be less than 100 characters")
  .regex(
    /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
    "Slug must be in kebab-case (lowercase letters, numbers, and hyphens only)",
  );

export const PagesRequestSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(100, "Name must be less than 100 characters"),
  slug: PageSlugSchema,
  props: z.json({ message: "Props must be a valid JSON" }),
});

export const PagesResponseSchema = PagesRequestSchema.extend({
  id: z.number(),
});

export const PageSlugParamSchema = z.object({
  slug: PageSlugSchema,
});
