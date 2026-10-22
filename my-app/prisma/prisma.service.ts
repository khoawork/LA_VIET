import { PrismaClient } from "./generated/prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function getDatabaseConfig() {
  let host = process.env.DATABASE_HOST || process.env.DB_HOST;
  let port = Number(process.env.DATABASE_PORT || process.env.DB_PORT);
  let user = process.env.DATABASE_USER || process.env.DB_USER;
  let password = process.env.DATABASE_PASSWORD || process.env.DB_PASSWORD;
  let database = process.env.DATABASE_NAME || process.env.DB_NAME;

  if ((!host || !user) && process.env.DATABASE_URL) {
    try {
      const url = new URL(process.env.DATABASE_URL);
      host = host || url.hostname;
      port = port || (url.port ? Number(url.port) : 3306);
      user = user || decodeURIComponent(url.username);
      password =
        password !== undefined
          ? password
          : decodeURIComponent(url.password);
      database = database || url.pathname.replace(/^\//, "");
    } catch {
      // Fallback
    }
  }

  return {
    host: host || "localhost",
    port: port || 3306,
    user: user || "root",
    password: password || "",
    database: database || "la_viet_db",
  };
}

function createPrismaClient() {
  const config = getDatabaseConfig();

  const adapter = new PrismaMariaDb({
    host: config.host,
    port: config.port,
    user: config.user,
    password: config.password,
    database: config.database,
    connectionLimit: 20,
    acquireTimeout: 30_000,
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
