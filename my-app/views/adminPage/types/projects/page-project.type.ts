import type { z } from "zod";
import type { PageProjectResponseSchema } from "@/shared/schema/pages/page-project.schema";

export type PageProjectData = z.infer<typeof PageProjectResponseSchema>;
export type PageProjectSection = keyof PageProjectData["props"];
export type PageProjectProps = PageProjectData["props"];
export type PageProjectHeader = PageProjectProps["header"];
export type PageProjectFilter = NonNullable<PageProjectProps["filter"]>;
export type PageProjectProcedure = NonNullable<PageProjectProps["procedure"]>;
export type PageProjectCTA = NonNullable<PageProjectProps["cta"]>;
