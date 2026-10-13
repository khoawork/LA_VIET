import z from "zod";

export class NewsRequestSchema {
  name = z
    .string()
    .min(1, { message: "News name is required" })
    .max(100, { message: "News name must be less than 100 characters" });
  image = z.url({ message: "Image must be a valid URL" });
  categoryId = z.coerce
    .number()
    .int()
    .positive({ message: "Category ID must be a positive integer" });
  preside = z
    .string()
    .max(100, { message: "Preside must be less than 100 characters" });
  presideIcon = z
    .string()
    .max(100, { message: "Preside icon must be less than 100 characters" });
  date = z.date({ message: "Date must be a valid date" });
  description = z
    .string()
    .max(1000, { message: "Description must be less than 1000 characters" });
  button = z
    .string()
    .max(100, { message: "Button text must be less than 100 characters" });
  slug = z
    .string()
    .min(1, { message: "Slug is required" })
    .max(250, { message: "Slug must be less than 250 characters" });
  reading = z
    .string()
    .max(100, { message: "Reading must be less than 100 characters" });
}

export class NewsResponseSchema {
  id = z.number();
  name = z.string();
  image = z.url();
  category = z.object({
    name: z.string(),
  });
  preside = z.string();
  presideIcon = z.string();
  date = z.date();
  description = z.string();
  button = z.string();
  slug = z.string();
  reading = z.string();
}
