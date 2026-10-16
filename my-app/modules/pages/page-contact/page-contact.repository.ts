import { prisma } from "@/prisma/prisma.service";
import type { PageContactPropsType, PageContactRequestType } from "./page-contact.type";

export class PageContactRepository {
  async createPageContact(data: PageContactRequestType) {
    return prisma.page.create({
      data: { name: data.name, slug: "contact", props: data.props },
    });
  }

  async getPageContact() {
    return prisma.page.findUnique({ where: { slug: "contact" } });
  }

  async updateProps(id: number, props: PageContactPropsType) {
    return prisma.page.update({ where: { id }, data: { props } });
  }
}

export const pageContactRepository = new PageContactRepository();
