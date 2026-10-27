import { z } from "zod";
import {
  PagesRequestSchema,
  PagesResponseSchema,
} from "../pages.schema";

/**
 * 1. Hero Section Schema
 */
export const AboutHeroMetricSchema = z.object({
  value: z.string(),
  label: z.string(),
});

export const AboutHeroSectionSchema = z.object({
  badge: z.string().default(""),
  heading: z
    .string()
    .min(1, { message: "Heading is required" })
    .default(""),
  description: z
    .string()
    .min(1, { message: "Hero description is required" })
    .default(
      "",
    ),
  metrics: z
    .array(AboutHeroMetricSchema)
    .default([]),
  image: z.string().optional().default(""),
  imageTitle: z.string().optional().default(""),
  imageSubtitle: z.string().optional().default(""),
});

/**
 * 2. Technology / Khái Lược Hội Hoạ Liên Ngành Schema
 */
export const AboutStatSchema = z.object({
  id: z.string(),
  label: z.string(),
  value: z.string(),
  unit: z.string().optional().default(""),
  description: z.string(),
  accentColor: z.string().optional().default("text-[#9A1C1F]"),
});

export const AboutWorkshopImageSchema = z.object({
  image: z
    .string()
    .default(
      "",
    ),
  badge: z.string().default(""),
  caption: z
    .string()
    .default(""),
});

export const AboutTechnologySectionSchema = z.object({
  badge: z.string().default(""),
  heading: z
    .string()
    .default(""),
  description: z
    .string()
    .optional()
    .default(
      "",
    ),
  description1: z
    .string()
    .optional()
    .default(
      "",
    ),
  description2: z
    .string()
    .optional()
    .default(
      "",
    ),
  stats: z.array(AboutStatSchema).default([]),
  workshop: AboutWorkshopImageSchema,
});

/**
 * 3. Values / Tầm Nhìn & Giá Trị Cốt Lõi Schema
 */
export const AboutValueItemSchema = z.object({
  id: z.string(),
  category: z.string(),
  title: z.string(),
  description: z.string(),
  tag: z.string(),
  gradient: z
    .string()
    .optional()
    .default("from-[#9A1C1F] via-[#9A1C1F]/80 to-transparent"),
  accentColor: z.string().optional().default("text-[#9A1C1F]"),
  pillars: z.array(z.string()).optional(),
});

export const AboutValuesSectionSchema = z.object({
  items: z.array(AboutValueItemSchema).default([]),
});

/**
 * 4. Organization / Bộ Máy Quản Trị & Sáng Tác Schema
 */
export const OrgLeaderSchema = z.object({
  id: z.string(),
  name: z.string(),
  role: z.string(),
  tag: z.string(),
  bio: z.string(),
  avatar: z.string(),
  department: z.string().optional().default(""),
  accentColor: z.string().optional().default("border-[#9A1C1F] text-[#9A1C1F]"),
});

export const OrgDivisionSchema = z.object({
  code: z.string(),
  title: z.string(),
  subtitle: z.string(),
  description: z.string(),
  focus: z.string(),
  accentBorder: z.string().optional().default("border-t-[#9A1C1F]"),
});

export const AboutOrganizationSectionSchema = z.object({
  badge: z.string().default(""),
  heading: z.string().default(""),
  description: z
    .string()
    .default(
      "",
    ),
  leaders: z.array(OrgLeaderSchema).default([]),
  divisions: z.array(OrgDivisionSchema).default([]),
});

/**
 * 5. Partners & Testimonial Schema
 */
export const AboutPartnerSchema = z.object({
  name: z.string(),
  role: z.string(),
  category: z.string().optional().default(""),
  logo: z.string().optional().default(""),
});

export const AboutTestimonialSchema = z.object({
  quote: z.string(),
  organization: z.string(),
  note: z.string(),
  avatar: z.string(),
});

export const AboutPartnersSectionSchema = z.object({
  badge: z.string().default(""),
  heading: z.string().default(""),
  items: z.array(AboutPartnerSchema).default([]),
  testimonial: AboutTestimonialSchema,
});

/**
 * 6. CTA Section Schema
 */
export const AboutCtaButtonSchema = z.object({
  label: z.string(),
  link: z.string(),
});

export const AboutCtaSectionSchema = z.object({
  badge: z.string().default(""),
  heading: z.string().default(""),
  description: z
    .string()
    .default(
      "",
    ),
  primaryButton: AboutCtaButtonSchema,
  secondaryButton: AboutCtaButtonSchema,
});

/**
 * Định nghĩa chi tiết cấu trúc JSON `props` của toàn bộ Trang Giới Thiệu (About)
 */
export const AboutPagePropsSchema = z.object({
  title: z
    .string()
    .min(1, { message: "Title is required" })
    .max(100, { message: "Title must be less than 100 characters" })
    .default(""),
  description: z
    .string()
    .max(1000, { message: "Description must be less than 1000 characters" })
    .default(
      "",
    ),
  image: z.string().optional().default(""),
  herosection: AboutHeroSectionSchema,
  technologySection: AboutTechnologySectionSchema,
  valuesSection: AboutValuesSectionSchema,
  organizationSection: AboutOrganizationSectionSchema,
  partnersSection: AboutPartnersSectionSchema,
  ctaSection: AboutCtaSectionSchema,
  enabledSections: z
    .object({
      herosection: z.boolean().default(true),
      technologySection: z.boolean().default(true),
      valuesSection: z.boolean().default(true),
      organizationSection: z.boolean().default(true),
      partnersSection: z.boolean().default(true),
      ctaSection: z.boolean().default(true),
    })
    .default({
      herosection: true,
      technologySection: true,
      valuesSection: true,
      organizationSection: true,
      partnersSection: true,
      ctaSection: true,
    }),
});

/**
 * Định nghĩa ĐẦU VÀO (Request) của Trang Giới Thiệu - Kế thừa từ PagesRequestSchema
 */
export const AboutPageRequestSchema = PagesRequestSchema.extend({
  props: AboutPagePropsSchema,
});

/**
 * Định nghĩa ĐẦU RA (Response) của Trang Giới Thiệu - Kế thừa từ PagesResponseSchema
 */
export const AboutPageResponseSchema = PagesResponseSchema.extend({
  props: AboutPagePropsSchema,
});

// Xuất các kiểu dữ liệu TypeScript suy diễn từ Zod
export type AboutHeroMetricType = z.infer<typeof AboutHeroMetricSchema>;
export type AboutHeroSectionType = z.infer<typeof AboutHeroSectionSchema>;
export type AboutStatType = z.infer<typeof AboutStatSchema>;
export type AboutWorkshopImageType = z.infer<typeof AboutWorkshopImageSchema>;
export type AboutTechnologySectionType = z.infer<typeof AboutTechnologySectionSchema>;
export type AboutValueItemType = z.infer<typeof AboutValueItemSchema>;
export type AboutValuesSectionType = z.infer<typeof AboutValuesSectionSchema>;
export type OrgLeaderType = z.infer<typeof OrgLeaderSchema>;
export type OrgDivisionType = z.infer<typeof OrgDivisionSchema>;
export type AboutOrganizationSectionType = z.infer<typeof AboutOrganizationSectionSchema>;
export type AboutPartnerType = z.infer<typeof AboutPartnerSchema>;
export type AboutTestimonialType = z.infer<typeof AboutTestimonialSchema>;
export type AboutPartnersSectionType = z.infer<typeof AboutPartnersSectionSchema>;
export type AboutCtaButtonType = z.infer<typeof AboutCtaButtonSchema>;
export type AboutCtaSectionType = z.infer<typeof AboutCtaSectionSchema>;

export type AboutPagePropsType = z.infer<typeof AboutPagePropsSchema>;
export type AboutPageRequestType = z.infer<typeof AboutPageRequestSchema>;
export type AboutPageResponseType = z.infer<typeof AboutPageResponseSchema>;

