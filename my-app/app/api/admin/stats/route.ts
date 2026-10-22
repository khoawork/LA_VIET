import { prisma } from "@/prisma/prisma.service";
import { withErrorHandler } from "@/shared/utils";
import { sendSuccess } from "@/shared/common/api-response";

export const GET = withErrorHandler(async () => {
  const [productsCount, projectsCount, newsCount] = await Promise.all([
    prisma.product.count(),
    prisma.project.count(),
    prisma.news.count(),
  ]);

  return sendSuccess(
    {
      products: productsCount,
      projects: projectsCount,
      news: newsCount,
    },
    "Lấy số liệu thống kê thành công",
  );
});

