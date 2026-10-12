import { NextRequest } from "next/server";
import { projectService } from "@/modules/project/project.service";
import {
  CreateProjectSchema,
  UpdateProjectSchema,
  ProjectQuerySchema,
  DeleteProjectSchema,
  withErrorHandler,
  validateBody,
  validateQuery,
  sendSuccess,
  sendPaginated,
  HttpStatus,
} from "@/shared";

/**
 * GET /api/projects
 * - Nếu truyền ?name=abc -> Lấy chi tiết dự án theo tên
 * - Nếu không truyền ?name -> Lấy danh sách dự án (có tìm kiếm & phân trang)
 */
export const GET = withErrorHandler(async (req: NextRequest) => {
  const query = validateQuery(ProjectQuerySchema, req.nextUrl.searchParams);

  if (query.name) {
    const project = await projectService.getProjectByName(query.name);
    return sendSuccess(project, "Lấy thông tin dự án theo tên thành công");
  }

  const { items, meta } = await projectService.getAllProjects(query);
  return sendPaginated(items, meta, "Lấy danh sách dự án thành công");
});

/**
 * POST /api/projects
 * Tạo mới dự án (nhận { name, description })
 */
export const POST = withErrorHandler(async (req: NextRequest) => {
  const body = await validateBody(CreateProjectSchema, req);
  const newProject = await projectService.createProject(body);

  return sendSuccess(
    newProject,
    "Tạo dự án mới thành công",
    HttpStatus.CREATED,
  );
});

/**
 * PUT /api/projects
 * Cập nhật dự án trực tiếp theo tên (nhận { name, newName?, description? })
 */
export const PUT = withErrorHandler(async (req: NextRequest) => {
  const body = await validateBody(UpdateProjectSchema, req);
  const updated = await projectService.updateProject(body);

  return sendSuccess(updated, "Cập nhật dự án thành công");
});

/**
 * DELETE /api/projects
 * Xóa dự án theo tên (nhận ?name=abc trong URL Query hoặc { name } trong Request Body)
 */
export const DELETE = withErrorHandler(async (req: NextRequest) => {
  let targetName = req.nextUrl.searchParams.get("name")?.trim();

  if (!targetName) {
    const body = await validateBody(DeleteProjectSchema, req);
    targetName = body.name;
  }

  const deleted = await projectService.deleteProject(targetName);

  return sendSuccess(deleted, `Đã xóa dự án "${targetName}" thành công`);
});
