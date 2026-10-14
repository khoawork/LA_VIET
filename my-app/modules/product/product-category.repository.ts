import { prisma } from "@/prisma/prisma.service";
import { ProdCatesRequestType } from "@/shared/schema/prod-cates.schema";

export class ProductCategoryRepository {
  async createCategory(data: ProdCatesRequestType) {
    return await prisma.productCategory.create({
      data,
    });
  }

  async getAllCategories() {
    return await prisma.productCategory.findMany({
      orderBy: { id: "asc" },
    });
  }

  async getCategoryById(id: number) {
    return await prisma.productCategory.findUnique({
      where: { id },
      include: {
        products: true,
      },
    });
  }

  async updateCategory(id: number, data: ProdCatesRequestType) {
    return await prisma.productCategory.update({
      where: { id },
      data,
    });
  }

  async deleteCategory(id: number) {
    return await prisma.productCategory.delete({
      where: { id },
    });
  }
}

export const productCategoryRepository = new ProductCategoryRepository();

