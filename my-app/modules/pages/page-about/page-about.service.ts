import {
  pageAboutRepository,
  PageAboutRepository,
} from "./page-about.repository";
import {
  CreatePageAboutType,
  DEFAULT_ABOUT_PAGE_CONFIG,
  UpdatePageAboutType,
} from "./page-about.type";

export class PageAboutService {
  constructor(
    private readonly pageAboutRepository: PageAboutRepository,
  ) {}

  async getPageBySlug(slug: string = "about") {
    const page = await this.pageAboutRepository.getPageBySlug(slug);
    if (!page) {
      return {
        id: 0,
        name: DEFAULT_ABOUT_PAGE_CONFIG.name,
        slug: DEFAULT_ABOUT_PAGE_CONFIG.slug,
        props: DEFAULT_ABOUT_PAGE_CONFIG.props as any,
      };
    }
    return page;
  }

  async getAboutPageData(slug: string = "about") {
    const page = await this.getPageBySlug(slug);
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

