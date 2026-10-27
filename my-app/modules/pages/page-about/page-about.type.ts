import {
  AboutPageRequestSchema,
  AboutPageResponseSchema,
  type AboutPagePropsType,
  type AboutPageRequestType,
  type AboutPageResponseType,
} from "@/shared/schema/pages/about-product.schema";
import z from "zod";

export type {
  AboutPagePropsType,
  AboutPageRequestType,
  AboutPageResponseType,
};

export type CreatePageAboutType = z.infer<typeof AboutPageRequestSchema>;
export type UpdatePageAboutType = z.infer<typeof AboutPageRequestSchema>;
export type PageAboutResponseType = z.infer<typeof AboutPageResponseSchema>;
