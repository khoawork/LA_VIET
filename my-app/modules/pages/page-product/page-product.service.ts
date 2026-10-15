import {
  pageProductRepository,
  PageProductRepository,
} from "./page-product.repository";
import {
  CreatePageProductType,
  DEFAULT_PRODUCTS_PAGE_CONFIG,
  UpdatePageProductType,
} from "./page-product.type";

export class PageProductService {
  constructor(
    private readonly pageProductRepository: PageProductRepository,
  ) {}

  async getPageBySlug(slug: string = "products") {
    const page = await this.pageProductRepository.getPageBySlug(slug);
    if (!page) {
      return {
        id: 0,
        name: DEFAULT_PRODUCTS_PAGE_CONFIG.name,
        slug: DEFAULT_PRODUCTS_PAGE_CONFIG.slug,
        props: DEFAULT_PRODUCTS_PAGE_CONFIG.props as any,
      };
    }
    return page;
  }

  async getAllProducts() {
    return await this.pageProductRepository.getAllProducts();
  }

  async getProductPageData(slug: string = "products") {
    const [page, products] = await Promise.all([
      this.getPageBySlug(slug),
      this.getAllProducts(),
    ]);

    return {
      page,
      products,
    };
  }

  async createPage(data: CreatePageProductType) {
    return await this.pageProductRepository.createPage(data);
  }

  async updateProductPage(
    data: UpdatePageProductType,
    slug: string = "products",
  ) {
    return await this.pageProductRepository.upsertPage(data, slug);
  }

  async deletePage(slug: string = "products") {
    return await this.pageProductRepository.deletePage(slug);
  }
}

export const pageProductService = new PageProductService(
  pageProductRepository,
);

