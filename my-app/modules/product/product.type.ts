import { ProductsRequestSchema, ProductsResponseSchema } from "@/shared/schema/products.schema";
import z from "zod";


export type CreateProductType = z.infer<typeof ProductsRequestSchema>;
export type ProductResponseType = z.infer<typeof ProductsResponseSchema>;