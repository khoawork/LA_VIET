import { z } from "zod";
import { PaginationQuerySchema } from "./pagination.schema";

/**
 * Schema tạo mới Project
 */
export const CreateProjectSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Tên dự án tối thiểu 2 ký tự")
    .max(100, "Tên dự án tối đa 100 ký tự"),
  description: z
    .string()
    .trim()
    .max(500, "Mô tả tối đa 500 ký tự")
    .optional()
    .nullable(),
});

/**
 * Schema cập nhật Project theo tên (name)
 */
export const UpdateProjectSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(1, "Tên định danh dự án cần cập nhật là bắt buộc"),
    newName: z
      .string()
      .trim()
      .min(2, "Tên mới tối thiểu 2 ký tự")
      .max(100, "Tên mới tối đa 100 ký tự")
      .optional(),
    description: z
      .string()
      .trim()
      .max(500, "Mô tả tối đa 500 ký tự")
      .optional()
      .nullable(),
  })
  .refine(
    (data) => data.newName !== undefined || data.description !== undefined,
    {
      message: "Phải cung cấp newName hoặc description để cập nhật",
    },
  );

/**
 * Schema query danh sách Project hoặc tìm theo tên
 */
export const ProjectQuerySchema = PaginationQuerySchema.extend({
  name: z.string().trim().optional(),
});

/**
 * Schema định danh Project theo tên (name)
 */
export const ProjectNameSchema = z.object({
  name: z.string().trim().min(1, "Tên dự án không được để trống"),
});

/**
 * Schema xóa Project theo tên
 */
export const DeleteProjectSchema = z.object({
  name: z.string().trim().min(1, "Tên dự án cần xóa là bắt buộc"),
});
