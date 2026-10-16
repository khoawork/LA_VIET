import z from "zod";

export const ProjCatesRequestSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(100, "Name must be less than 100 characters"),
});

export const ProjCatesResponseSchema = z.object({
  id: z.number(),
  name: z.string(),
});

export const ProjCatesParamsSchema = z.object({
  id: z.coerce.number().int().positive(),
});
