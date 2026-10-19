import z from "zod";
import {
  PagesRequestSchema,
  PagesResponseSchema,
} from "../pages.schema";


export const ProductsPagePropsSchema = z.object({
  title: z
    .string()
    .min(1, { message: "Title is required" })
    .max(100, { message: "Title must be less than 100 characters" }),
  description: z
    .string()
    .max(1000, { message: "Description must be less than 1000 characters" })
    .default(""),
  herosection: z.object({
    badge: z.string().default("GIÁM TUYỂN ĐỘC QUYỀN"),
    heading: z.string().min(1, { message: "Heading is required" }),
    subHeading: z.string().optional(),
    description: z.string().min(1, { message: "Hero description is required" }),
    metrics: z
      .array(
        z.object({
          value: z.string(),
          label: z.string(),
        }),
      )
      .default([
        { value: "100%", label: "SƠN TA TỰ NHIÊN" },
        { value: "06+", label: "THÁNG CHẾ TÁC" },
        { value: "ĐỘC BẢN", label: "KHÔNG BẢN SAO" },
      ]),
    image: z.string().optional().default(""),
  }),
  seo: z
    .object({
      metaTitle: z.string().max(100).optional(),
      metaDescription: z.string().max(500).optional(),
      keywords: z.array(z.string()).optional(),
    })
    .optional(),
  displayedProductIds: z.array(z.number()).default([]),
});

/**
 * Định nghĩa ĐẦU VÀO (Request) của Trang Sản Phẩm - Kế thừa từ PagesRequestSchema
 */
export const ProductsPageRequestSchema = PagesRequestSchema.extend({
  props: ProductsPagePropsSchema,
});

/**
 * Định nghĩa ĐẦU RA (Response) của Trang Sản Phẩm - Kế thừa từ PagesResponseSchema
 */
export const ProductsPageResponseSchema = PagesResponseSchema.extend({
  props: ProductsPagePropsSchema,
});

// Xuất các kiểu dữ liệu TypeScript suy diễn từ Zod
export type ProductsPagePropsType = z.infer<typeof ProductsPagePropsSchema>;
export type ProductsPageRequestType = z.infer<typeof ProductsPageRequestSchema>;
export type ProductsPageResponseType = z.infer<typeof ProductsPageResponseSchema>;