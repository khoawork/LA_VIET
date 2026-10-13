import z from "zod";

export class SiteSettingsRequestSchema {
  logo = z.url();
  company = z
    .string()
    .min(1, "Company is required")
    .max(100, "Company must be less than 100 characters");
  tagline = z
    .string()
    .min(1, "Tagline is required")
    .max(100, "Tagline must be less than 100 characters");
  footer = z.json({ message: "Props must be a valid JSON" });
}

export class SiteSettingsResponseSchema {
  id = z.number();
  logo = z.url();
  company = z.string();
  tagline = z.string();
  footer = z.json();
}
