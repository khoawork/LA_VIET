import { prisma } from "@/prisma/prisma.service";
import { PageProjectPropsType, PageProjectRequestType } from "./page-project.type";

export class PageProjectRepository {
  async createPageProject(data: PageProjectRequestType) {
    return prisma.page.create({
      data: {
        name: data.name,
        slug: "projects",
        props: data.props,
      },
    });
  }

  async getPageProject(slug: string = "projects") {
    return prisma.page.findUnique({
      where: { slug },
    });
  }

  async updateProps(id: number, props: PageProjectPropsType) {
    return prisma.page.update({
      where: { id },
      data: { props },
    });
  }
}

export const pageProjectRepository = new PageProjectRepository();
