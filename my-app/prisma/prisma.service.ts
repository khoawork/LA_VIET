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
  let ssl: any = undefined;

  if (process.env.DATABASE_URL) {
    try {
      const url = new URL(process.env.DATABASE_URL);
      host = url.hostname || host;
      port = url.port ? Number(url.port) : port || 3306;
      user = decodeURIComponent(url.username) || user;
      password =
        url.password !== undefined
          ? decodeURIComponent(url.password)
          : password;
      database = url.pathname.replace(/^\//, "") || database;

      const sslMode = url.searchParams.get("ssl-mode") || url.searchParams.get("sslmode");
      if (
        sslMode ||
        url.searchParams.get("ssl") === "true" ||
        (host && host !== "localhost" && host !== "127.0.0.1")
      ) {
        ssl = { rejectUnauthorized: false };
      }
    } catch {
      // Fallback
    }
  }

  // Mặc định bật SSL cho các máy chủ database từ xa (Cloud DB: Aiven, TiDB, PlanetScale, RDS, Railway)
  if (!ssl && host && host !== "localhost" && host !== "127.0.0.1") {
    ssl = { rejectUnauthorized: false };
  }

  return {
    host: host || "localhost",
    port: port || 3306,
    user: user || "root",
    password: password || "",
    database: database || "la_viet_db",
    ssl,
  };
}

function createPrismaClient() {
  const config = getDatabaseConfig();
  const isServerless = Boolean(process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME);

  const adapter = new PrismaMariaDb({
    host: config.host,
    port: config.port,
    user: config.user,
    password: config.password,
    database: config.database,
    // Trên Vercel / serverless: giới hạn 3 kết nối mỗi instance để không làm nghẽn pool cloud DB
    connectionLimit: isServerless ? 3 : 20,
    connectTimeout: 15_000,
    acquireTimeout: 15_000,
    idleTimeout: 300,
    allowPublicKeyRetrieval: true,
    ...(config.ssl ? { ssl: config.ssl } : {}),
  });

  return new PrismaClient({ adapter });
}

export const prisma =
  globalForPrisma.prisma ?? (globalForPrisma.prisma = createPrismaClient());
