import type z from "zod";
import type {
  PageContactCTASchema,
  PageContactExperienceSchema,
  PageContactHeaderSchema,
  PageContactInfoSchema,
  PageContactMapSchema,
  PageContactPropsSchema,
  PageContactRequestSchema,
} from "@/shared/schema/pages/page-contact.schema";

export type PageContactRequestType = z.infer<typeof PageContactRequestSchema>;
export type PageContactPropsType = z.infer<typeof PageContactPropsSchema>;
export type PageContactHeaderType = z.infer<typeof PageContactHeaderSchema>;
export type PageContactInfoType = z.infer<typeof PageContactInfoSchema>;
export type PageContactMapType = z.infer<typeof PageContactMapSchema>;
export type PageContactCTAType = z.infer<typeof PageContactCTASchema>;
export type PageContactExperienceType = z.infer<typeof PageContactExperienceSchema>;
