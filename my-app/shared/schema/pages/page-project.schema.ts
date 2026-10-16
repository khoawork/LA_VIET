import z from "zod";
import { PagesRequestSchema } from "../pages.schema";

export const PageProjectHeaderSchema = z.object({
  breadcrumb: z.object({
    homeLabel: z.string().min(1, "Home label is required"),
    currentLabel: z.string().min(1, "Current label is required"),
  }),
  stats: z
    .array(
      z.object({
        title: z.string().min(1, "Title is required"),
        icon: z.string().min(1, "Icon is required"),
        quantity: z.string().min(1, "Quantity is required"),
        quantityColor: z
          .string()
          .regex(/^#[0-9a-fA-F]{6}$/, "Quantity color must be a hex color")
          .optional(),
        suffix: z.string().optional(),
        suffixColor: z
          .string()
          .regex(/^#[0-9a-fA-F]{6}$/, "Suffix color must be a hex color")
          .optional(),
        description: z.string().min(1, "Description is required"),
      }),
    )
    .nullish(),
});

export const PageProjectFilterSchema = z.object({
  key: z.array(
    z.object({
      name: z.string().min(1, "Name is required"),
      categories: z.array(z.number().int().positive()).default([]),
    }),
  ),
});

// export const PageProjectCardSchema = z.object({
//   title: z.string().min(1, "Title is required"),
//   description: z.string().min(1, "Description is required"),
//   image: z.string().url("Image must be a valid URL").optional(),
//   link: z.string().url("Link must be a valid URL").optional(),
// });

// export const PageProjectListCardSchema = z
//   .array(PageProjectCardSchema)
//   .optional();

export const PageProjectProcedureSchema = z.object({
  eyebrow: z.string().min(1, "Eyebrow is required"),
  title: z.string().min(1, "Title is required"),
  steps: z
    .array(
      z.object({
        order: z.string().min(1, "Order is required"),
        icon: z.string().min(1, "Icon is required"),
        title: z.string().min(1, "Title is required"),
        description: z.string().min(1, "Description is required"),
        value: z.string().min(1, "Value is required"),
      }),
    )
    .nullish(),
});

export const PageProjectCTASchema = z.object({
  eyebrow: z.string().min(1, "Eyebrow is required"),
  eyebrow_icon: z.string().min(1, "Eyebrow icon is required"),
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  contacts: z
    .array(
      z.object({
        icon: z.string().min(1, "Icon is required"),
        label: z.string().min(1, "Label is required"),
        value: z.string().min(1, "Value is required"),
      }),
    )
    .nullish(),
  actions: z
    .array(
      z.object({
        label: z.string().min(1, "Label is required"),
        link: z.url("Link must be a valid URL").optional(),
      }),
    )
    .nullish(),
});

export const PageProjectPropsSchema = z.object({
  header: PageProjectHeaderSchema,
  filter: PageProjectFilterSchema.optional(),
  procedure: PageProjectProcedureSchema.optional(),
  cta: PageProjectCTASchema.optional(),
});

export const PageProjectRequestSchema = PagesRequestSchema.omit({
  props: true,
  slug: true,
}).extend({
  props: PageProjectPropsSchema,
});

export const PageProjectResponseSchema = PageProjectRequestSchema.extend({
  id: z.number(),
  slug: z.literal("projects"),
});
