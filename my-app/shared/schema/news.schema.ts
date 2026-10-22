import { z } from "zod";

export const NewsRequestSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: "Tiêu đề tin tức không được để trống" })
    .max(255, { message: "Tiêu đề không được vượt quá 255 ký tự" }),
  image: z
    .string()
    .trim()
    .min(1, { message: "Hình ảnh không được để trống" }),
  categoryId: z.coerce
    .number()
    .int({ message: "ID danh mục phải là số nguyên" })
    .positive({ message: "ID danh mục phải là số nguyên dương" }),
  preside: z
    .string()
    .max(255, { message: "Chủ trì không được vượt quá 255 ký tự" })
    .default(""),
  presideIcon: z
    .string()
    .max(255, { message: "Icon chủ trì không được vượt quá 255 ký tự" })
    .default(""),
  date: z.coerce.date({
    message: "Ngày đăng không hợp lệ",
  }),
  description: z
    .string()
    .trim()
    .min(1, { message: "Mô tả không được để trống" }),
  button: z
    .string()
    .max(100, { message: "Nút hành động không được vượt quá 100 ký tự" })
    .default("Xem chi tiết"),
  slug: z
    .string()
    .trim()
    .max(255, { message: "Slug không được vượt quá 255 ký tự" })
    .optional(),
  reading: z
    .string()
    .max(100, { message: "Thời gian đọc không được vượt quá 100 ký tự" })
    .default("5 phút đọc"),
});

export const NewsUpdateRequestSchema = NewsRequestSchema;

export const NewsPatchRequestSchema = NewsRequestSchema.partial().refine(
  (data) => Object.keys(data).length > 0,
  {
    message: "Phải có ít nhất một trường dữ liệu để cập nhật",
  },
);

export const NewsIdSchema = z.object({
  id: z.coerce
    .number()
    .int({ message: "ID phải là số nguyên" })
    .positive({ message: "ID phải là số nguyên dương" }),
});

export const NewsQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(10),
  search: z.string().trim().optional(),
  categoryId: z.coerce.number().int().positive().optional(),
  categoryIds: z.string()
    .regex(/^[1-9]\d*(,[1-9]\d*)*$/)
    .transform((value) => [...new Set(value.split(",").map(Number))])
    .optional(),
  sortBy: z.enum(["id", "name", "date", "createdAt"]).default("createdAt"),
  sortOrder: z.enum(["asc", "desc"]).default("desc"),
});

export const NewsResponseSchema = z.object({
  id: z.number(),
  name: z.string(),
  image: z.string(),
  preside: z.string(),
  presideIcon: z.string(),
  date: z.date(),
  description: z.string(),
  button: z.string(),
  slug: z.string(),
  reading: z.string(),
  categoryId: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
  category: z
    .object({
      id: z.number(),
      name: z.string(),
    })
    .optional(),
});
