import type z from "zod";
import type { PageContactResponseSchema } from "@/shared/schema/pages/page-contact.schema";

export type PageContactData = z.infer<typeof PageContactResponseSchema>;
export type PageContactProps = PageContactData["props"];
export type ConsultationFormData = Record<string, string>;
