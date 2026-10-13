import z from "zod";

export const  CreateProjectSchema = z.object({
  name : z
    .string()
    .min(1, { message: "Project name is required" })
    .max(100, { message: "Project name must be less than 100 characters" }),
  image : z.url({ message: "Image must be a valid URL" }),
  categoryId : z.coerce
    .number()
    .int()
    .positive({ message: "Category ID must be a positive integer" }),
  location : z.string(),
  caption : z
    .string()
    .max(500, { message: "Caption must be less than 500 characters" }),
  description : z
    .string()
    .max(1000, { message: "Description must be less than 1000 characters" }),
  material : z
    .string()
    .max(500, { message: "Material must be less than 500 characters" }),
  scale : z
    .string()
    .max(100, { message: "Scale must be less than 100 characters" }),
  button : z
    .string()
    .max(100, { message: "Button text must be less than 100 characters" }),
  slug : z
    .string()
    .min(1, { message: "Slug is required" })
    .max(250, { message: "Slug must be less than 250 characters" }),
});

export const ProjectsResponseSchema = z.object({
  id : z.number(),
  name : z.string(),
  image : z.url(),
  category : z.object({
    name: z.string(),
  }),
  location : z.string(),
  caption : z.string(),
  description : z.string(),
  material : z.string(),
  scale : z.string(),
  button : z.string(),
  slug : z.string(),
});
