import {
  pageAboutRepository,
  PageAboutRepository,
} from "./page-about.repository";
import {
  CreatePageAboutType,
  UpdatePageAboutType,
} from "./page-about.type";
import { NotFoundException } from "@/shared/common/app-error";

export class PageAboutService {
  constructor(
    private readonly pageAboutRepository: PageAboutRepository,
  ) {}

  async getPageBySlug(slug: string = "about") {
    const page = await this.pageAboutRepository.getPageBySlug(slug);
    if (!page) {
      throw new NotFoundException("Page about not found");
    }
    return page;
  }

  async getAboutPageData(slug: string = "about") {
    const page = await this.pageAboutRepository.getPageBySlug(slug);
    return {
      page,
    };
  }

  async createPage(data: CreatePageAboutType) {
    return await this.pageAboutRepository.createPage(data);
  }

  async updateAboutPage(
    data: UpdatePageAboutType,
    slug: string = "about",
  ) {
    return await this.pageAboutRepository.upsertPage(data, slug);
  }

  async deletePage(slug: string = "about") {
    return await this.pageAboutRepository.deletePage(slug);
  }
}

export const pageAboutService = new PageAboutService(
  pageAboutRepository,
);

