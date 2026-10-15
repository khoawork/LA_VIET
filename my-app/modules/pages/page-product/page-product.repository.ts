import { prisma } from "@/prisma/prisma.service";
import { CreatePageProductType, UpdatePageProductType } from "./page-product.type";

export class PageProductRepository {
  async getPageBySlug(slug: string = "products") {
    return await prisma.page.findUnique({
      where: { slug },
    });
  }

  async createPage(data: CreatePageProductType) {
    return await prisma.page.create({
      data: {
        name: data.name,
        slug: data.slug,
        props: data.props as any,
      },
    });
  }

  async upsertPage(data: UpdatePageProductType, slug: string = "products") {
    return await prisma.page.upsert({
      where: { slug },
      update: {
        name: data.name,
        props: data.props as any,
      },
      create: {
        name: data.name,
        slug: data.slug || slug,
        props: data.props as any,
      },
    });
  }

  async getAllProducts() {
    return await prisma.product.findMany({
      include: {
        category: {
          select: {
            name: true,
          },
        },
      },
      orderBy: { id: "asc" },
    });
  }

  async deletePage(slug: string = "products") {
    return await prisma.page.delete({
      where: { slug },
    });
  }
}

export const pageProductRepository = new PageProductRepository();

