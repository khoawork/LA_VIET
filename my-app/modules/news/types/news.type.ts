import { z } from "zod";
import {
  NewsRequestSchema,
  NewsResponseSchema,
  NewsIdSchema,
  NewsPatchRequestSchema,
  NewsUpdateRequestSchema,
  NewsQuerySchema,
} from "@/shared/schema/news.schema";

export type CreateNewsType = z.infer<typeof NewsRequestSchema>;
export type UpdateNewsType = z.infer<typeof NewsUpdateRequestSchema>;
export type PatchNewsType = z.infer<typeof NewsPatchRequestSchema>;
export type NewsIdType = z.infer<typeof NewsIdSchema>;
export type NewsQueryType = z.infer<typeof NewsQuerySchema>;
export type NewsResponseType = z.infer<typeof NewsResponseSchema>;

export interface NewsWithCategory {
  id: number;
  name: string;
  image: string;
  preside: string;
  presideIcon: string;
  date: Date;
  description: string;
  button: string;
  slug: string;
  reading: string;
  categoryId: number;
  createdAt: Date;
  updatedAt: Date;
  category?: {
    id: number;
    name: string;
  };
}
