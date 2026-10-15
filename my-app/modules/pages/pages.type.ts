import { PageSlugParamSchema } from "@/shared/schema/pages.schema";
import z from "zod";

export type PageSlugParamSchemaType = z.infer<typeof PageSlugParamSchema>;