import { prisma } from "@/prisma/prisma.service";
import { CreateProductType } from "./product.type";

export class ProductRepository {
    async createProduct(data: CreateProductType) {
        return await prisma.product.create({
            data,
            include: {
                category: {
                    select: {
                        name: true,
                    },
                },
            },
        });
    }

    async getProductById(id: number) {
        return await prisma.product.findUnique({
            where: { id },
            include: {
                category: {
                    select: {
                        name: true,
                    },
                },
            },
        });
    }

    async getAllProducts(categoryId?: number) {
        return await prisma.product.findMany({
            where: categoryId ? { categoryId } : undefined,
            include: {
                category: {
                    select: {
                        name: true,
                    },
                },
            },
            orderBy: { id: "desc" },
        });
    }

    async updateProduct(id: number, data: CreateProductType) {
        return await prisma.product.update({
            where: { id },
            data,
            include: {
                category: {
                    select: {
                        name: true,
                    },
                },
            },
        });
    }

    async deleteProduct(id: number) {
        return await prisma.product.delete({
            where: { id },
        });
    }
}

export const productRepository = new ProductRepository();