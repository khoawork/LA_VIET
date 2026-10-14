import { ProjCatesRequestSchema, ProjCatesResponseSchema } from "@/shared/schema/proj-cates.schema";
import z from "zod";

export type ProjCatesRequestSchemaType = z.infer<typeof ProjCatesRequestSchema>;
export type ProjCatesResponseSchemaType = z.infer<typeof ProjCatesResponseSchema>;