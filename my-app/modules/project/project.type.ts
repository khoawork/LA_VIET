import {
  ProjectPatchSchema,
  ProjectQuerySchema,
  ProjectRequestSchema,
  ProjectsListDetailResponseSchema,
  ProjectsListResponseSchema,
  ProjectsResponseSchema,
} from "@/shared";
import { z } from "zod";

export type ProjectRequestType = z.infer<typeof ProjectRequestSchema>;
export type ProjectResponseType = z.infer<typeof ProjectsResponseSchema>;
export type ProjectListDetailResponseType = z.infer<typeof ProjectsListDetailResponseSchema>;
export type ProjectsListResponseType = z.infer<typeof ProjectsListResponseSchema>;
export type ProjectPatchSchemaType = z.infer<typeof ProjectPatchSchema>;
export type ProjectQuerySchemaType = z.infer<typeof ProjectQuerySchema>;
