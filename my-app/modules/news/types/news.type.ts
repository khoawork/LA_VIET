import { z } from "zod";
import {
  NewsRequestSchema,
  NewsResponseSchema,
  NewsIdSchema,
  NewsPatchRequestSchema,
  NewsUpdateRequestSchema,
} from "@/shared/schema/news.schema";

export type CreateNewsRequest = z.infer<typeof NewsRequestSchema>;
export type NewsResponse = z.infer<typeof NewsResponseSchema>;
export type NewsIdRequest = z.infer<typeof NewsIdSchema>;
export type NewsPatchRequest = z.infer<typeof NewsPatchRequestSchema>;
export type NewsUpdateRequest = z.infer<typeof NewsUpdateRequestSchema>;
