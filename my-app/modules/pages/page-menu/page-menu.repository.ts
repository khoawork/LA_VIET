import { prisma } from "@/prisma/prisma.service";
import type { MenuItemType } from "@/shared/schema/menu.schema";

export class PageMenuRepository {
  async getMenu() {
    return await prisma.page.findUnique({
      where: { slug: "menu" },
    });
  }

  async upsertMenu(items: MenuItemType[]) {
    return await prisma.page.upsert({
      where: { slug: "menu" },
      update: {
        name: "Menu & Điều Hướng Website",
        props: { items },
      },
      create: {
        name: "Menu & Điều Hướng Website",
        slug: "menu",
        props: { items },
      },
    });
  }
}

export const pageMenuRepository = new PageMenuRepository();

