import { CreateProjectSchema, ProjectsResponseSchema } from "@/shared";
import { z } from "zod";

export type CreateProjectType = z.infer<typeof CreateProjectSchema>;
export type ProjectResponseType = z.infer<typeof ProjectsResponseSchema>;
