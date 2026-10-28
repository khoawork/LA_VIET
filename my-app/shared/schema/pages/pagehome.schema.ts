import { z } from "zod";

/**
 * 1. Schema Section Hero (Biểu ngữ chính & dải thông tin)
 */
export const HomeHeroCollectionSchema = z.object({
  title: z.string().default(""),
  // Giữ tên trường cũ để các nhãn đã lưu trong JSON tiếp tục hiển thị đúng.
  desc: z.string().default(""),
});

export const HomeHeroSectionSchema = z.object({
  tagline: z.string().optional().default(""),
  title: z.string().default(""),
  highlightWord: z.string().default(""),
  description: z.string().default(""),
  primaryButton: z.object({
    text: z.string().default(""),
    href: z.string().default(""),
  }),
  secondaryButton: z.object({
    text: z.string().default(""),
    href: z.string().default(""),
  }),
  image: z.object({
    src: z.string().default(""),
  }),
  collections: z.array(HomeHeroCollectionSchema).default([]),
});

/**
 * 2. Schema Section Thống kê thành tựu
 */
export const HomeStatItemSchema = z.object({
  num: z.string().default(""),
  label: z.string().default(""),
  desc: z.string().default(""),
  tag: z.string().default(""),
  icon: z.string().optional().default(""),
});

export const HomeStatisticsSectionSchema = z.object({
  tagline: z.string().default(""),
  title: z.string().default(""),
  description: z.string().default(""),
  stats: z.array(HomeStatItemSchema).default([]),
});

/**
 * 3. Schema Section Tiêu điểm dự án (Spotlight)
 */
export const HomeSpotlightInfoBoxSchema = z.object({
  label: z.string().default(""),
  value: z.string().default(""),
});

export const HomeSpotlightSectionSchema = z.object({
  tagline: z.string().default(""),
  title: z.string().default(""),
  description: z.string().default(""),
  image: z.string().default(""),
  seal: z.object({
    logo: z.string().default(""),
    line1: z.string().default(""),
    line2: z.string().default(""),
  }),
  infoBoxes: z.array(HomeSpotlightInfoBoxSchema).default([]),
  link: z.object({
    text: z.string().default(""),
    href: z.string().default(""),
  }),
});

/**
 * 4. Schema Section Tin tức mới nhất trên Trang chủ
 */
export const HomeNewsSectionSchema = z.object({
  tagline: z.string().default(""),
  title: z.string().default(""),
  description: z.string().default(""),
  link: z.object({
    text: z.string().default(""),
    href: z.string().default(""),
  }),
  articleIds: z
    .array(z.number().int().positive())
    .default([])
    .transform((ids) => [...new Set(ids)]),
});

/**
 * 5. Schema Section Đối tác chiến lược & Khách hàng
 */
export const HomePartnerItemSchema = z
  .union([
    z.string(),
    z.object({
      name: z.string().default(""),
      subtitle: z.string().default(""),
    }),
  ])
  .transform((partner) =>
    typeof partner === "string" ? { name: partner, subtitle: "" } : partner,
  );

export const HomePartnersSectionSchema = z.object({
  tagline: z.string().default(""),
  title: z.string().default(""),
  description: z.string().default(""),
  partners: z.array(HomePartnerItemSchema).default([]),
  testimonial: z.object({
    quote: z.string().default(""),
    author: z.string().default(""),
  }),
});

/**
 * 6. Schema Section Kêu gọi hành động (CTA)
 */
export const HomeCtaSectionSchema = z.object({
  tagline: z.string().default(""),
  title: z.string().default(""),
  description: z.string().default(""),
  primaryButton: z.object({
    text: z.string().default(""),
    href: z.string().default(""),
  }),
  secondaryButton: z.object({
    text: z.string().default(""),
    href: z.string().default(""),
  }),
});

/**
 * 7. Schema Section Cấu hình SEO Trang chủ
 */
export const HomeSeoSectionSchema = z.object({
  title: z.string().default(""),
  description: z.string().default(""),
  keywords: z.string().default(""),
  ogImage: z.string().default(""),
});

/**
 * Schema tổng hợp toàn bộ các Section của Trang chủ
 */
export const PageHomePropsSchema = z.object({
  hero: HomeHeroSectionSchema,
  statistics: HomeStatisticsSectionSchema,
  spotlight: HomeSpotlightSectionSchema,
  newsSection: HomeNewsSectionSchema,
  partners: HomePartnersSectionSchema,
  cta: HomeCtaSectionSchema,
  seo: HomeSeoSectionSchema,
});

export type PageHomePropsType = z.infer<typeof PageHomePropsSchema>;

/**
 * Schema DTO API Request
 */
export const CreatePageHomeRequestSchema = z.object({
  name: z.string().default("Trang Chủ"),
  slug: z.string().default("home"),
  props: PageHomePropsSchema,
});

export const UpdatePageHomeRequestSchema = z.object({
  name: z.string().optional(),
  props: PageHomePropsSchema,
});

export const PageHomeResponseSchema = z.object({
  id: z.number(),
  name: z.string(),
  slug: z.string(),
  props: PageHomePropsSchema,
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

/**
 * Dữ liệu mặc định chuẩn của toàn bộ nội dung Trang chủ
 */
export const DEFAULT_PAGE_HOME_PROPS: PageHomePropsType = {
  hero: {
    tagline: "",
    title: "",
    highlightWord: "",
    description: "",
    primaryButton: {
      text: "",
      href: "",
    },
    secondaryButton: {
      text: "",
      href: "",
    },
    image: {
      src: "",
    },
    collections: [],
  },
  statistics: {
    tagline: "",
    title: "",
    description: "",
    stats: [],
  },
  spotlight: {
    tagline: "",
    title: "",
    description: "",
    image: "",
    seal: {
      logo: "",
      line1: "",
      line2: "",
    },
    infoBoxes: [],
    link: {
      text: "",
      href: "",
    },
  },
  newsSection: {
    tagline: "",
    title: "",
    description: "",
    link: {
      text: "",
      href: "",
    },
    articleIds: [],
  },
  partners: {
    tagline: "",
    title: "",
    description: "",
    partners: [],
    testimonial: {
      quote: "",
      author: "",
    },
  },
  cta: {
    tagline: "",
    title: "",
    description: "",
    primaryButton: {
      text: "",
      href: "",
    },
    secondaryButton: {
      text: "",
      href: "",
    },
  },
  seo: {
    title: "",
    description: "",
    keywords: "",
    ogImage: "",
  },
};
