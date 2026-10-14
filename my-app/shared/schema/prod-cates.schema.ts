import z from "zod";

export const ProdCatesRequestSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Tên danh mục là bắt buộc" })
    .max(100, { message: "Tên danh mục tối đa 100 ký tự" }),
});

export const ProdCatesResponseSchema = z.object({
  id: z.number(),
  name: z.string(),
});

export type ProdCatesRequestType = z.infer<typeof ProdCatesRequestSchema>;
export type ProdCatesResponseType = z.infer<typeof ProdCatesResponseSchema>;
