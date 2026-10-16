import {
  PageProjectCTASchema,
  PageProjectFilterSchema,
  PageProjectHeaderSchema,
  PageProjectProcedureSchema,
  PageProjectPropsSchema,
  PageProjectRequestSchema,
} from "@/shared/schema/pages/page-project.schema";
import z from "zod";

export type PageProjectRequestType = z.infer<typeof PageProjectRequestSchema>;
export type PageProjectPropsType = z.infer<typeof PageProjectPropsSchema>;
export type PageProjectHeaderType = z.infer<typeof PageProjectHeaderSchema>;
export type PageProjectFilterType = z.infer<typeof PageProjectFilterSchema>;
export type PageProjectProcedureType = z.infer<typeof PageProjectProcedureSchema>;
export type PageProjectCTAType = z.infer<typeof PageProjectCTASchema>;
