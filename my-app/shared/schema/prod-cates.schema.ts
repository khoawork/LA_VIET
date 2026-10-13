import z from "zod";

export class ProdCatesRequestSchema {
  name = z
    .string()
    .min(1, "Name is required")
    .max(100, "Name must be less than 100 characters");
}

export class ProdCatesResponseSchema {
  id = z.number();
  name = z.string();
}
