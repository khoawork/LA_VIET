import { z } from "zod";

export const NewsCatesRequestSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: "Tên danh mục không được để trống" })
    .max(100, { message: "Tên danh mục không được vượt quá 100 ký tự" }),
});

export const NewsCatesUpdateRequestSchema = NewsCatesRequestSchema;

export const NewsCatesPatchRequestSchema = NewsCatesRequestSchema.partial().refine(
  (data) => Object.keys(data).length > 0,
  {
    message: "Phải có ít nhất một trường để cập nhật",
  },
);

export const NewsCatesIdSchema = z.object({
  id: z.coerce
    .number()
    .int({ message: "ID danh mục phải là số nguyên" })
    .positive({ message: "ID danh mục phải là số nguyên dương" }),
});

export const NewsCatesResponseSchema = z.object({
  id: z.number(),
  name: z.string(),
  _count: z
    .object({
      news: z.number(),
    })
    .optional(),
});
