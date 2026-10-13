import z from "zod";

export class ProductsRequestSchema {
  name = z
    .string()
    .min(1, { message: "Product name is required" })
    .max(100, { message: "Product name must be less than 100 characters" });
  image = z.url({ message: "Image must be a valid URL" });
  categoryId = z.coerce
    .number()
    .int()
    .positive({ message: "Category ID must be a positive integer" });
  title = z
    .string()
    .max(100, { message: "Title must be less than 100 characters" });
  description = z
    .string()
    .max(1000, { message: "Description must be less than 1000 characters" });
  props = z.json({ message: "Props must be a valid JSON" });
  slug = z
    .string()
    .min(1, { message: "Slug is required" })
    .max(250, { message: "Slug must be less than 250 characters" });
}

export class ProductsResponseSchema {
  id = z.number();
  name = z.string();
  image = z.url();
  category = z.object({
    name: z.string(),
  });
  title = z.string();
  description = z.string();
  props = z.json();
  slug = z.string();
}
