import { prisma } from "@/prisma/prisma.service";
import { CreatePageAboutType, UpdatePageAboutType } from "./page-about.type";

export class PageAboutRepository {
  async getPageBySlug(slug: string = "about") {
    return await prisma.page.findUnique({
      where: { slug },
    });
  }

  async createPage(data: CreatePageAboutType) {
    return await prisma.page.create({
      data: {
        name: data.name,
        slug: data.slug,
        props: data.props as any,
      },
    });
  }

  async upsertPage(data: UpdatePageAboutType, slug: string = "about") {
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

  async deletePage(slug: string = "about") {
    return await prisma.page.delete({
      where: { slug },
    });
  }
}

export const pageAboutRepository = new PageAboutRepository();

