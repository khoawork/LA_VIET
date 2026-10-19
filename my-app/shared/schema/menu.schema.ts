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

export const DEFAULT_MENU_ITEMS: MenuItemType[] = [
  { id: "home", label: "TRANG CHỦ", path: "/", status: "Hiển thị", order: 1 },
  { id: "about", label: "VỀ CHÚNG TÔI", path: "/about", status: "Hiển thị", order: 2 },
  { id: "products", label: "SẢN PHẨM", path: "/products", status: "Hiển thị", order: 3 },
  { id: "project", label: "DỰ ÁN", path: "/project", status: "Hiển thị", order: 4 },
  { id: "news", label: "TIN TỨC", path: "/news", status: "Hiển thị", order: 5 },
  { id: "contact", label: "LIÊN HỆ", path: "/contact", status: "Hiển thị", order: 6 },
];

