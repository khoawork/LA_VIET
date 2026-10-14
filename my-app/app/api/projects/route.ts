import { projectService } from "@/modules/project/project.service";
import {
  createPaginationMeta,
  HttpStatus,
  ProjectQuerySchema,
  ProjectRequestSchema,
  ProjectsListDetailResponseSchema,
  ProjectsListResponseSchema,
  ProjectsResponseSchema,
  sendPaginated,
  validateBody,
  validateQuery,
  withErrorHandler,
} from "@/shared";
import { NextRequest, NextResponse } from "next/server";

export const POST = withErrorHandler(async (request: NextRequest) => {
  const body = await validateBody(ProjectRequestSchema, request);
  const newProject = await projectService.createProject(body);

  return NextResponse.json(ProjectsResponseSchema.parse(newProject), {
    status: HttpStatus.CREATED,
  });
});

export const GET = withErrorHandler(async (request: NextRequest) => {
  const query = validateQuery(ProjectQuerySchema, request.nextUrl.searchParams);
  if (query.ids?.length) {
    const projects = await projectService.getProjectByIds(query.ids);
    return NextResponse.json(ProjectsListDetailResponseSchema.parse(projects), {
      status: HttpStatus.OK,
    });
  }
  const projects = await projectService.getProjects(query);
  const meta = createPaginationMeta(
    projects.totalItems,
    query.page,
    query.limit,
  );

  return sendPaginated(
    ProjectsListResponseSchema.parse(projects.projects),
    meta,
  );
});
