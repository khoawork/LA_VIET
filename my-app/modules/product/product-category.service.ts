import {
  productCategoryRepository,
  ProductCategoryRepository,
} from "./product-category.repository";
import { ProdCatesRequestType } from "@/shared/schema/prod-cates.schema";

export class ProductCategoryService {
  constructor(
    private readonly categoryRepository: ProductCategoryRepository,
  ) {}

  async createCategory(data: ProdCatesRequestType) {
    return await this.categoryRepository.createCategory(data);
  }

  async getAllCategories() {
    return await this.categoryRepository.getAllCategories();
  }

  async getCategoryById(id: number) {
    return await this.categoryRepository.getCategoryById(id);
  }

  async updateCategory(id: number, data: ProdCatesRequestType) {
    return await this.categoryRepository.updateCategory(id, data);
  }

  async deleteCategory(id: number) {
    return await this.categoryRepository.deleteCategory(id);
  }
}

export const productCategoryService = new ProductCategoryService(
  productCategoryRepository,
);

