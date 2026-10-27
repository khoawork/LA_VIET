import z from "zod";

export const MenuItemSchema = z.object({
  id: z.string(),
  label: z.string().trim().min(1, "Tên điều hướng là bắt buộc"),
  path: z.string().trim().min(1, "Đường dẫn là bắt buộc"),
  status: z.enum(["Hiển thị", "Ẩn"]).default("Hiển thị"),
  order: z.number().int().default(0),
});

export const MenuPropsSchema = z.object({
  items: z.array(MenuItemSchema).default([]),
});

export const MenuResponseSchema = z.object({
  items: z.array(MenuItemSchema),
});

export type MenuItemType = z.infer<typeof MenuItemSchema>;
export type MenuPropsType = z.infer<typeof MenuPropsSchema>;
