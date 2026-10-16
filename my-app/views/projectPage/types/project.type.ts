import type { z } from "zod";
import type { PageProjectResponseSchema } from "@/shared/schema/pages/page-project.schema";
import type { ProjectsListResponseSchema } from "@/shared/schema/projects.schema";

export type ProjectPageData = z.infer<typeof PageProjectResponseSchema>;
export type ProjectRecord = z.infer<typeof ProjectsListResponseSchema>[number];
export type ProjectFilterItem = NonNullable<ProjectPageData["props"]["filter"]>["key"][number];
export type ProjectHeaderData = ProjectPageData["props"]["header"];
export type ProjectProcedureData = NonNullable<ProjectPageData["props"]["procedure"]>;
export type ProjectCtaData = NonNullable<ProjectPageData["props"]["cta"]>;
