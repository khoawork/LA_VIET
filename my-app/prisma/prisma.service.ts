
import { PrismaClient } from "./generated/prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function requireEnvironmentVariable(name: string, allowEmpty = false) {
  const value = process.env[name];
  if (value === undefined || (!allowEmpty && value.length === 0)) {
    throw new Error(`Missing required database environment variable: ${name}`);
  }
  return value;
}

function createPrismaClient() {
  const host = requireEnvironmentVariable("DB_HOST");
  const user = requireEnvironmentVariable("DB_USER");
  const password = requireEnvironmentVariable("DB_PASSWORD", true);
  const database = requireEnvironmentVariable("DB_NAME");
  const port = Number(process.env.DB_PORT ?? 3306);
  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error("DB_PORT must be an integer between 1 and 65535.");
  }

  const adapter = new PrismaMariaDb({
    host,
    port,
    user,
    password,
    database,
    connectionLimit: 10,
    acquireTimeout: 10_000,
    idleTimeout: 300,
    allowPublicKeyRetrieval: true,
  });

  return new PrismaClient({ adapter });
}

export const prisma =
  globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
