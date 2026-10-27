import { z } from "zod";

/**
 * 1. Schema Section Header & Breadcrumb
 */
export const NewsHeaderSectionSchema = z.object({
  breadcrumb: z.object({
    homeText: z.string().default(""),
    homeLink: z.string().default(""),
    currentPageText: z.string().default(""),
  }),
  accentColor: z.string().default("#9A1C1F"),
  title: z
    .string()
    .min(1, "Tiêu đề trang không được để trống")
    .default(""),
  description: z
    .string()
    .default(
      "",
    ),
});

/**
 * 2. Schema Section Bài viết Tiêu điểm (Featured Article)
 */
export const NewsHighlightStatSchema = z.object({
  label: z.string(),
  value: z.string(),
  accentColor: z.string().default("text-[#9A1C1F]"),
});

export const NewsFeaturedSectionSchema = z.object({
  specialBadge: z.string().default(""),
  issueNumber: z.string().default(""),
  verifiedBadge: z.string().default(""),
  title: z
    .string()
    .min(1, "Tiêu đề bài viết tiêu điểm không được để trống"),
  slug: z
    .string()
    .min(1, "Slug bài viết tiêu điểm không được để trống"),
  author: z.string().default(""),
  publishedDate: z.string().default(""),
  readTime: z.string().default(""),
  description: z.string(),
  imageUrl: z.string(),
  buttonText: z.string().default(""),
  highlightStats: z.array(NewsHighlightStatSchema).default([]),
});

/**
 * 3. Schema Section Lưới bài viết & Cấu hình bộ lọc
 */
export const NewsArticlesSectionSchema = z.object({
  eyebrow: z.string().default(""),
  title: z.string().default(""),
  filterGroups: z.array(z.object({
    name: z.string().min(1, "Tên nhóm lọc không được để trống"),
    categories: z.array(z.number().int().positive()).default([]),
  })).default([]),
});

/**
 * 4. Schema Section Thống kê Khảo cứu (Stats)
 */
export const NewsStatItemSchema = z.object({
  id: z.string(),
  value: z.string(),
  label: z.string(),
  description: z.string(),
  color: z.string().default("text-[#9A1C1F]"),
});

export const NewsStatsSectionSchema = z.object({
  items: z.array(NewsStatItemSchema),
});

/**
 * 5. Schema Section Kêu gọi Hợp tác & Bản tin (CTA)
 */
export const NewsCtaSectionSchema = z.object({
  badge: z.string().default(""),
  title: z.string().default(""),
  description: z
    .string()
    .default(
      "",
    ),
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
  metaTitle: z
    .string()
    .default(""),
  metaDescription: z
    .string()
    .default(
      "",
    ),
  keywords: z
    .string()
    .default(""),
  ogImage: z.string().optional(),
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
  seo: NewsSeoSectionSchema.optional(),
});

// =================================================================
// SCHEMA CHO BẢN GHI TRANG TRONG BẢNG `pages` (Prisma)
// =================================================================
export const CreatePageNewRequestSchema = z.object({
  name: z.string().min(1, "Tên trang là bắt buộc").max(100),
  slug: z.string().min(1, "Slug trang là bắt buộc").max(100).default("news"),
  props: PageNewPropsSchema,
});

export const UpdatePageNewRequestSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  slug: z.string().min(1).max(100).optional(),
  props: PageNewPropsSchema.partial().optional(),
});

export const PageNewResponseSchema = z.object({
  id: z.number(),
  name: z.string(),
  slug: z.string(),
  props: PageNewPropsSchema,
});

