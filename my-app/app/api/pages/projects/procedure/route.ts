import { pageProjectService } from "@/modules/pages/page-project/page-project.service";
import { HttpStatus, validateBody, withErrorHandler } from "@/shared";
import { PageProjectProcedureSchema } from "@/shared/schema/pages/page-project.schema";
import { NextRequest, NextResponse } from "next/server";

export const GET = withErrorHandler(async () => {
  const procedure = await pageProjectService.getProcedure();
  return NextResponse.json(procedure, { status: HttpStatus.OK });
});

export const PATCH = withErrorHandler(async (request: NextRequest) => {
  const body = await validateBody(PageProjectProcedureSchema, request);
  await pageProjectService.updateProcedure(body);
  return new NextResponse(null, { status: HttpStatus.NO_CONTENT });
});
