import { Role } from "@/prisma/generated/prisma/enums";
import z from "zod";

export class UsersRequestSchema {
  username = z
    .string()
    .min(1, "Username is required")
    .max(50, "Username must be less than 50 characters");
  password = z.string().min(6, "Password must be at least 6 characters long");
  email = z.email("Invalid email address");
  fullname = z
    .string()
    .min(1, "Full name is required")
    .max(100, "Full name must be less than 100 characters");
  avatar = z.url({ message: "Avatar must be a valid URL" }).optional();
  role = z.enum(Role, { message: "Role must be either USER or ADMIN" });
}

export class UsersResponseSchema {
  id = z.number();
  username = z.string();
  email = z.string();
  fullname = z.string();
  avatar = z.url().nullable();
  role = z.enum(Role);
}
