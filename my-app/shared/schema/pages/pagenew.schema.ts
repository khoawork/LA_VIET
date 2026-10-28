import { z } from "zod";

/**
 * 1. Schema Section Header & Breadcrumb
 */
export const NewsHeaderSectionSchema = z.object({
  breadcrumb: z.object({
    homeText: z.string().default("Trang chủ"),
    homeLink: z.string().default("/"),
    currentPageText: z.string().default("Tin tức & Nghiên cứu"),
  }),
  accentColor: z.string().default("#9A1C1F"),
  title: z.string().default(""),
  description: z.string().default(""),
});

/**
 * 2. Schema Section Bài viết Tiêu điểm (Featured Article)
 */
export const NewsHighlightStatSchema = z.object({
  label: z.string().default(""),
  value: z.string().default(""),
  accentColor: z.string().default("text-[#9A1C1F]"),
});

export const NewsFeaturedSectionSchema = z.object({
  specialBadge: z.string().default(""),
  issueNumber: z.string().default(""),
  verifiedBadge: z.string().default(""),
  title: z.string().default(""),
  slug: z.string().default(""),
  author: z.string().default(""),
  publishedDate: z.string().default(""),
  readTime: z.string().default(""),
  description: z.string().default(""),
  imageUrl: z.string().default(""),
  buttonText: z.string().default(""),
  highlightStats: z.array(NewsHighlightStatSchema).default([]),
});

/**
 * 3. Schema Section Lưới bài viết & Cấu hình bộ lọc
 */
export const NewsArticlesSectionSchema = z.object({
  eyebrow: z.string().default(""),
  title: z.string().default(""),
  filterGroups: z
    .array(
      z.object({
        name: z.string().default(""),
        categories: z.array(z.number().int().positive()).default([]),
      }),
    )
    .default([]),
});

/**
 * 4. Schema Section Thống kê Khảo cứu (Stats)
 */
export const NewsStatItemSchema = z.object({
  id: z.string().default(""),
  value: z.string().default(""),
  label: z.string().default(""),
  description: z.string().default(""),
  color: z.string().default("text-[#9A1C1F]"),
});

export const NewsStatsSectionSchema = z.object({
  items: z.array(NewsStatItemSchema).default([]),
});

/**
 * 5. Schema Section Kêu gọi Hợp tác & Bản tin (CTA)
 */
export const NewsCtaSectionSchema = z.object({
  badge: z.string().default(""),
  title: z.string().default(""),
  description: z.string().default(""),
  primaryButton: z.object({
    text: z.string().default(""),
    link: z.string().default(""),
  }),
  secondaryButton: z.object({
    text: z.string().default(""),
    link: z.string().default(""),
  }),
});

/**
 * 6. Schema Cấu hình SEO Trang
 */
export const NewsSeoSectionSchema = z.object({
  metaTitle: z.string().default(""),
  metaDescription: z.string().default(""),
  keywords: z.string().default(""),
  ogImage: z.string().default(""),
});

// =================================================================
// SCHEMA TỔNG HỢP CHO TOÀN BỘ CẤU TRÚC PROPS JSON CỦA TRANG NEWS
// Khớp với cột `props Json` trong Prisma model Page (pages.prisma)
// =================================================================
export const PageNewPropsSchema = z.object({
  header: NewsHeaderSectionSchema,
  featured: NewsFeaturedSectionSchema,
  articlesSection: NewsArticlesSectionSchema,
  stats: NewsStatsSectionSchema,
  cta: NewsCtaSectionSchema,
  seo: NewsSeoSectionSchema,
});

// =================================================================
// SCHEMA CHO BẢN GHI TRANG TRONG BẢNG `pages` (Prisma)
// =================================================================
export const CreatePageNewRequestSchema = z.object({
  name: z.string().default("Tin tức, Nghiên cứu & Hoạt động"),
  slug: z.string().default("news"),
  props: PageNewPropsSchema,
});

export const UpdatePageNewRequestSchema = z.object({
  name: z.string().optional(),
  slug: z.string().optional(),
  props: PageNewPropsSchema.partial().optional(),
});

export const PageNewResponseSchema = z.object({
  id: z.number(),
  name: z.string(),
  slug: z.string(),
  props: PageNewPropsSchema,
});
