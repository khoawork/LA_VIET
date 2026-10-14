import { projCatesService } from "@/modules/project-categories/proj-cates.service";
import {
  HttpStatus,
  validateBody,
  withErrorHandler,
} from "@/shared";
import { ProjCatesRequestSchema, ProjCatesResponseSchema } from "@/shared/schema/proj-cates.schema";
import { NextRequest } from "next/dist/server/web/spec-extension/request";
import { NextResponse } from "next/server";

export const POST = withErrorHandler(async (request: NextRequest) => {
  const body = await validateBody(ProjCatesRequestSchema, request);
  const newProject = await projCatesService.createProjectCategory(body);
  return NextResponse.json(ProjCatesResponseSchema.parse(newProject), {
    status: HttpStatus.CREATED,
  });
});

export const GET = withErrorHandler(async () => {
  const projectCategories = await projCatesService.getProjectCategories();
  return NextResponse.json(ProjCatesResponseSchema.array().parse(projectCategories), {
    status: HttpStatus.OK,
  });
});
