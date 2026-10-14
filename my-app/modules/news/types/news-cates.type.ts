import { z } from "zod";
import {
  NewsCatesRequestSchema,
  NewsCatesResponseSchema,
  NewsCatesIdSchema,
  NewsCatesPatchRequestSchema,
  NewsCatesUpdateRequestSchema,
} from "@/shared/schema/news-cates.schema";

export type CreateNewsCatesType = z.infer<typeof NewsCatesRequestSchema>;
export type UpdateNewsCatesType = z.infer<typeof NewsCatesUpdateRequestSchema>;
export type PatchNewsCatesType = z.infer<typeof NewsCatesPatchRequestSchema>;
export type NewsCatesIdType = z.infer<typeof NewsCatesIdSchema>;
export type NewsCatesResponseType = z.infer<typeof NewsCatesResponseSchema>;
