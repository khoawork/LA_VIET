import { prisma } from "@/prisma/prisma.service";

export class PageRepository {
  async getPageBySlug(slug: string) {
    return prisma.page.findUnique({
      where: { slug },
    });
  }
}

export const pageRepository = new PageRepository();