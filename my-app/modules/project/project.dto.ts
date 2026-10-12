import { z } from "zod";
import {
  CreateProjectSchema,
  UpdateProjectSchema,
  ProjectQuerySchema,
  ProjectNameSchema,
  DeleteProjectSchema,
} from "@/shared";

/**
 * Các DTO kế thừa từ Zod Schemas trong shared/schema
 */
export type CreateProjectDto = z.infer<typeof CreateProjectSchema>;
export type UpdateProjectDto = z.infer<typeof UpdateProjectSchema>;
export type ProjectQueryDto = z.infer<typeof ProjectQuerySchema>;
export type ProjectNameDto = z.infer<typeof ProjectNameSchema>;
export type DeleteProjectDto = z.infer<typeof DeleteProjectSchema>;

/**
 * DTO dữ liệu trả về của Project
 */
export interface ProjectResponseDto {
  id: number;
  name: string;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
}
