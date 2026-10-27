import type { MenuItemType } from "@/shared/schema/menu.schema";
import {
  PageMenuRepository,
  pageMenuRepository,
} from "./page-menu.repository";

export class PageMenuService {
  constructor(private readonly repository: PageMenuRepository) {}

  async getMenu(): Promise<MenuItemType[]> {
    const page = await this.repository.getMenu();
    if (!page || !page.props) {
      return [];
    }

    const props = page.props as { items?: MenuItemType[] };
    if (Array.isArray(props.items)) {
      // Sort items by order if order is present
      return [...props.items].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
    }

    return [];
  }

  async updateMenu(items: MenuItemType[]) {
    // Re-index order 1..N based on array position
    const orderedItems = items.map((item, index) => ({
      ...item,
      order: index + 1,
    }));
    return await this.repository.upsertMenu(orderedItems);
  }
}

export const pageMenuService = new PageMenuService(pageMenuRepository);

