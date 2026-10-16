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


// Base Schema cho Request tạo / cập nhật trang
export const PagesRequestSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Name is required" })
    .max(100, { message: "Name must be less than 100 characters" }),
  slug: z
    .string()
    .min(1, { message: "Slug is required" })
    .max(100, { message: "Slug must be less than 100 characters" }),
  props: z.record(z.string(), z.any()).default({}),
});

// Base Schema cho Response trả về của trang
export const PagesResponseSchema = z.object({
  id: z.number(),
  name: z.string(),
  slug: z.string(),
  props: z.record(z.string(), z.any()),
});

export type PagesRequestType = z.infer<typeof PagesRequestSchema>;
export type PagesResponseType = z.infer<typeof PagesResponseSchema>;
export const PagesResponseSchemaExtended = PagesRequestSchema.extend({
  id: z.number(),
});

export const PageSlugParamSchema = z.object({
  slug: PageSlugSchema,
});
