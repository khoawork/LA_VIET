import { projCatesService } from "@/modules/project-categories/proj-cates.service";
import {
  HttpStatus,
  validateBody,
  validateParams,
  withErrorHandler,
} from "@/shared";
import {
  ProjCatesParamsSchema,
  ProjCatesRequestSchema,
} from "@/shared/schema/proj-cates.schema";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = withErrorHandler(
  async (_request: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
    const { id } = await validateParams(ProjCatesParamsSchema, params);
    await projCatesService.deleteProjectCategory(id);
    return new NextResponse(null, {
      status: HttpStatus.NO_CONTENT,
    });
  },
);

export const PUT = withErrorHandler(
  async (request: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
    const { id } = await validateParams(ProjCatesParamsSchema, params);
    const body = await validateBody(ProjCatesRequestSchema, request);
    await projCatesService.updateProjectCategory(id, body);
    return new NextResponse(null, {
      status: HttpStatus.NO_CONTENT,
    });
  },
);
