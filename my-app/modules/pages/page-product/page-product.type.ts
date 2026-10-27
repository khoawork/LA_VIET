import {
  ProductsPagePropsSchema,
  ProductsPageRequestSchema,
  ProductsPageResponseSchema,
} from "@/shared/schema/pages/page-product.schema";
import z from "zod";

export type ProductsPagePropsType = z.infer<typeof ProductsPagePropsSchema>;
export type CreatePageProductType = z.infer<typeof ProductsPageRequestSchema>;
export type UpdatePageProductType = z.infer<typeof ProductsPageRequestSchema>;
export type PageProductResponseType = z.infer<typeof ProductsPageResponseSchema>;
