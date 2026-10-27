import { z } from "zod";
import {
  NewsHeaderSectionSchema,
  NewsHighlightStatSchema,
  NewsFeaturedSectionSchema,
  NewsArticlesSectionSchema,
  NewsStatItemSchema,
  NewsStatsSectionSchema,
  NewsCtaSectionSchema,
  NewsSeoSectionSchema,
  PageNewPropsSchema,
  CreatePageNewRequestSchema,
  UpdatePageNewRequestSchema,
  PageNewResponseSchema,
} from "@/shared/schema/pages/pagenew.schema";

// Types cho từng Section của trang Tin tức
export type NewsHeaderSectionType = z.infer<typeof NewsHeaderSectionSchema>;
export type NewsHighlightStatType = z.infer<typeof NewsHighlightStatSchema>;
export type NewsFeaturedSectionType = z.infer<typeof NewsFeaturedSectionSchema>;
export type NewsArticlesSectionType = z.infer<typeof NewsArticlesSectionSchema>;
export type NewsStatItemType = z.infer<typeof NewsStatItemSchema>;
export type NewsStatsSectionType = z.infer<typeof NewsStatsSectionSchema>;
export type NewsCtaSectionType = z.infer<typeof NewsCtaSectionSchema>;
export type NewsSeoSectionType = z.infer<typeof NewsSeoSectionSchema>;

// Type tổng hợp toàn bộ props JSON của trang News
export type PageNewPropsType = z.infer<typeof PageNewPropsSchema>;

// Types cho CRUD bản ghi trang trong bảng `pages`
export type CreatePageNewType = z.infer<typeof CreatePageNewRequestSchema>;
export type UpdatePageNewType = z.infer<typeof UpdatePageNewRequestSchema>;
export type PageNewResponseType = z.infer<typeof PageNewResponseSchema>;
