import { prisma } from "@/prisma/prisma.service";
import { withErrorHandler, sendSuccess } from "@/shared";

export const GET = withErrorHandler(async () => {
  await prisma.$queryRaw`SELECT 1`;
  return sendSuccess({ database: "connected" }, "Kết nối MySQL thành công!");
});