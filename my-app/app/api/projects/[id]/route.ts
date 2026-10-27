import { projectService } from "@/modules/project/project.service";
import {
  HttpStatus,
  ProjectParamSchema,
  ProjectPatchSchema,
  ProjectsResponseSchema,
  validateBody,
  validateParams,
  withErrorHandler,
} from "@/shared";
import { NextResponse } from "next/server";

export const DELETE = withErrorHandler(
  async (_request, { params }: { params: Promise<{ id: string }> }) => {
    const { id } = await validateParams(ProjectParamSchema, params);
    await projectService.deleteProject(id);
    return new NextResponse(null, { status: HttpStatus.NO_CONTENT });
  },
);

export const GET = withErrorHandler(
  async (_request, { params }: { params: Promise<{ id: string }> }) => {
    const { id } = await validateParams(ProjectParamSchema, params);
    const project = await projectService.getProjectById(id);
    return NextResponse.json(ProjectsResponseSchema.parse(project), {
      status: HttpStatus.OK,
    });
  },
);

export const PATCH = withErrorHandler(
  async (_request, { params }: { params: Promise<{ id: string }> }) => {
    const { id } = await validateParams(ProjectParamSchema, params);
    const body = await validateBody(ProjectPatchSchema, _request);
    const updated = await projectService.updatePatchProject(id, body);
    return NextResponse.json(ProjectsResponseSchema.parse(updated), {
      status: HttpStatus.OK,
    });
  },
);
