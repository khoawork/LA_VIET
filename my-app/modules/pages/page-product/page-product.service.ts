import {
  pageProductRepository,
  PageProductRepository,
} from "./page-product.repository";
import {
  CreatePageProductType,
  UpdatePageProductType,
} from "./page-product.type";
import { ProductsPagePropsSchema } from "@/shared/schema/pages/page-product.schema";
import { NotFoundException } from "@/shared/common/app-error";

export class PageProductService {
  constructor(
    private readonly pageProductRepository: PageProductRepository,
  ) {}

  async getPageBySlug(slug: string = "products") {
    const page = await this.pageProductRepository.getPageBySlug(slug);
    if (!page) {
      throw new NotFoundException("Page products not found");
    }
    return page;
  }

  async getAllProducts() {
    return await this.pageProductRepository.getAllProducts();
  }

  async getProductPageData(slug: string = "products") {
    const [page, products] = await Promise.all([
      this.pageProductRepository.getPageBySlug(slug),
      this.getAllProducts(),
    ]);

    return {
      page,
      products,
    };
  }

  async getProductPageSummary(slug: string = "products") {
    const page = await this.getPageBySlug(slug);
    const props = ProductsPagePropsSchema.pick({
      displayedProductIds: true,
    }).safeParse(page.props);
    const ids = props.success ? props.data.displayedProductIds : [];
    const categories = await this.pageProductRepository.getProductCategoryNames(ids);
    return { page, categories };
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

