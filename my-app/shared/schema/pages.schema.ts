import z from "zod";

export class PagesRequestSchema {
  name = z
    .string()
    .min(1, "Name is required")
    .max(100, "Name must be less than 100 characters");
  slug = z
    .string()
    .min(1, "Slug is required")
    .max(100, "Slug must be less than 100 characters");
  props = z.json({ message: "Props must be a valid JSON" });
}

export class PagesResponseSchema {
  id = z.number();
  name = z.string();
  slug = z.string();
  props = z.json();
}
