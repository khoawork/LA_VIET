import type { z } from "zod";
import type {
  ProjectRequestSchema,
  ProjectsListResponseSchema,
  ProjectsResponseSchema,
} from "@/shared/schema/projects.schema";
import type { ProjCatesResponseSchema } from "@/shared/schema/proj-cates.schema";

export type ProjectFormData = z.infer<typeof ProjectRequestSchema>;
export type ProjectItem = z.infer<typeof ProjectsListResponseSchema>[number];
export type ProjectDetail = z.infer<typeof ProjectsResponseSchema>;
export type ProjectCategory = z.infer<typeof ProjCatesResponseSchema>;

export interface ProjectListResult {
  data: ProjectItem[];
  meta: {
    page: number;
    totalPages: number;
    totalItems: number;
  };
}
