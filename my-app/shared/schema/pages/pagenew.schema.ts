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
  title: z
    .string()
    .min(1, "Tiêu đề trang không được để trống")
    .default("TIN TỨC, NGHIÊN CỨU & HOẠT ĐỘNG LIÊN NGÀNH"),
  description: z
    .string()
    .default(
      "Không gian tổng hợp các công trình khảo cứu kỹ nghệ chất liệu, chuyên luận bảo tồn di sản hội họa và nhật ký thực thi kiến trúc sơn mài quy mô lớn từ Là Việt cùng các đối tác chuyên môn.",
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
  specialBadge: z.string().default("TIÊU ĐIỂM NGHIÊN CỨU"),
  issueNumber: z.string().default("CHUYÊN KHẢO #42"),
  verifiedBadge: z.string().default("Đã qua kiểm định viện vật liệu"),
  title: z
    .string()
    .min(1, "Tiêu đề bài viết tiêu điểm không được để trống"),
  slug: z
    .string()
    .min(1, "Slug bài viết tiêu điểm không được để trống"),
  author: z.string().default("Ban Nghiên cứu Vật liệu Là Việt"),
  publishedDate: z.string().default("15/10/2025"),
  readTime: z.string().default("8 phút đọc"),
  description: z.string(),
  imageUrl: z.string(),
  buttonText: z.string().default("ĐỌC TOÀN VĂN NGHIÊN CỨU"),
  highlightStats: z.array(NewsHighlightStatSchema).default([]),
});

/**
 * 3. Schema Section Lưới bài viết & Cấu hình bộ lọc
 */
export const NewsArticlesSectionSchema = z.object({
  eyebrow: z.string().default("DÒNG SỰ KIỆN & HỒ SƠ KỸ THUẬT"),
  title: z.string().default("CÁC BÀI VIẾT VÀ BÁO CÁO MỚI NHẤT"),
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
  badge: z.string().default("CHUYÊN KHẢO KỸ THUẬT & DI SẢN"),
  title: z.string().default("KẾT NỐI HỢP TÁC NGHIÊN CỨU CÙNG LÀ VIỆT"),
  description: z
    .string()
    .default(
      "Đăng ký nhận định kỳ các báo cáo kiểm nghiệm vật liệu sơn ta hữu cơ, chuyên luận bảo tồn nghệ thuật và thông tin hội thảo liên ngành kiến trúc đương đại.",
    ),
  primaryButton: z.object({
    text: z.string().default("LIÊN HỆ BAN NGHIÊN CỨU"),
    link: z.string().default("/contact"),
  }),
  secondaryButton: z.object({
    text: z.string().default("ĐĂNG KÝ BẢN TIN CHUYÊN KHẢO"),
    link: z.string().default("#newsletter"),
  }),
});

/**
 * 6. Schema Cấu hình SEO Trang
 */
export const NewsSeoSectionSchema = z.object({
  metaTitle: z
    .string()
    .default("Tin tức, Nghiên cứu & Hoạt động Liên ngành | Là Việt"),
  metaDescription: z
    .string()
    .default(
      "Không gian tổng hợp các công trình khảo cứu kỹ nghệ sơn mài và kiến trúc Là Việt.",
    ),
  keywords: z
    .string()
    .default("sơn mài, là việt, nghiên cứu sơn mài, nghệ thuật đương đại"),
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

