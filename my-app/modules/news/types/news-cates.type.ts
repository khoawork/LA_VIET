import { z } from "zod";
import { NewsCatesRequestSchema, NewsCatesResponseSchema } from "@/shared/schema/news-cates.schema";

export type NewsCatesRequest = z.infer<NewsCatesRequestSchema>;
export type NewsCatesResponse = z.infer<NewsCatesResponseSchema>;