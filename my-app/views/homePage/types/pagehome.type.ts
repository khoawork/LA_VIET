import { z } from "zod";
import {
  HomeHeroSectionSchema,
  HomeHeroCollectionSchema,
  HomeStatisticsSectionSchema,
  HomeStatItemSchema,
  HomeSpotlightSectionSchema,
  HomeSpotlightInfoBoxSchema,
  HomeNewsSectionSchema,
  HomePartnersSectionSchema,
  HomeCtaSectionSchema,
  HomeSeoSectionSchema,
  PageHomePropsSchema,
  CreatePageHomeRequestSchema,
  UpdatePageHomeRequestSchema,
  PageHomeResponseSchema,
  DEFAULT_PAGE_HOME_PROPS,
} from "@/shared/schema/pages/pagehome.schema";

// Types cho từng Section của Trang chủ
export type HomeHeroSectionType = z.infer<typeof HomeHeroSectionSchema>;
export type HomeHeroCollectionType = z.infer<typeof HomeHeroCollectionSchema>;
export type HomeStatisticsSectionType = z.infer<typeof HomeStatisticsSectionSchema>;
export type HomeStatItemType = z.infer<typeof HomeStatItemSchema>;
export type HomeSpotlightSectionType = z.infer<typeof HomeSpotlightSectionSchema>;
export type HomeSpotlightInfoBoxType = z.infer<typeof HomeSpotlightInfoBoxSchema>;
export type HomeNewsSectionType = z.infer<typeof HomeNewsSectionSchema>;
export interface HomeNewsArticleType {
  id: number;
  name: string;
  image: string;
  date: string;
  description: string;
  preside: string;
  slug: string;
  category?: { id: number; name: string };
}
export type HomePartnersSectionType = z.infer<typeof HomePartnersSectionSchema>;
export type HomeCtaSectionType = z.infer<typeof HomeCtaSectionSchema>;
export type HomeSeoSectionType = z.infer<typeof HomeSeoSectionSchema>;

// Type tổng hợp toàn bộ props JSON của Trang chủ
export type PageHomePropsType = z.infer<typeof PageHomePropsSchema>;

// Types cho CRUD bản ghi trang trong bảng `pages`
export type CreatePageHomeType = z.infer<typeof CreatePageHomeRequestSchema>;
export type UpdatePageHomeType = z.infer<typeof UpdatePageHomeRequestSchema>;
export type PageHomeResponseType = z.infer<typeof PageHomeResponseSchema>;

export { DEFAULT_PAGE_HOME_PROPS };

