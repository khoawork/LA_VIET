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

/**
 * Giá trị mặc định chuẩn của toàn bộ nội dung trang Tin tức
 * Dùng làm khởi tạo ban đầu cho Admin CMS hoặc khi seed database
 */
export const DEFAULT_PAGE_NEW_PROPS: PageNewPropsType = {
  header: {
    breadcrumb: {
      homeText: "Trang chủ",
      homeLink: "/",
      currentPageText: "Tin tức & Nghiên cứu",
    },
    accentColor: "#9A1C1F",
    title: "",
    description: "",
  },
  featured: {
    specialBadge: "",
    issueNumber: "",
    verifiedBadge: "",
    title: "",
    slug: "",
    author: "",
    publishedDate: "",
    readTime: "",
    description: "",
    imageUrl: "",
    buttonText: "",
    highlightStats: [],
  },
  articlesSection: {
    eyebrow: "",
    title: "",
    filterGroups: [],
  },
  stats: {
    items: [],
  },
  cta: {
    badge: "",
    title: "",
    description: "",
    primaryButton: {
      text: "",
      link: "",
    },
    secondaryButton: {
      text: "",
      link: "",
    },
  },
  seo: {
    metaTitle: "",
    metaDescription: "",
    keywords: "",
    ogImage: "",
  },
};
