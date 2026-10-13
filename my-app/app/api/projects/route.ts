import { projectService } from "@/modules/project/project.service";
import {
  CreateProjectSchema,
  HttpStatus,
  ProjectsResponseSchema,
  validateBody,
  withErrorHandler,
} from "@/shared";
import { NextRequest, NextResponse } from "next/server";

export const POST = withErrorHandler(async (request: NextRequest) => {
  const body = await validateBody(CreateProjectSchema, request);
  const newProject = await projectService.createProject(body);

  return NextResponse.json(ProjectsResponseSchema.parse(newProject), {
    status: HttpStatus.CREATED,
  });
});
