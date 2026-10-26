import { prisma } from "@/prisma/prisma.service";
import { CreateProductType, ProductQueryType } from "./product.type";
import type { Prisma } from "@/prisma/generated/prisma/client";

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

    async getAllProducts(query: ProductQueryType) {
        const where: Prisma.ProductWhereInput = {
            ...(query.categoryId ? { categoryId: query.categoryId } : {}),
            ...(query.categoryName ? { category: { name: query.categoryName } } : {}),
            ...(query.ids?.length ? { id: { in: query.ids } } : {}),
            ...(query.search ? {
                OR: [
                    { name: { contains: query.search } },
                    { title: { contains: query.search } },
                    { description: { contains: query.search } },
                ],
            } : {}),
        };
        const [products, totalItems] = await prisma.$transaction([
            prisma.product.findMany({
                where,
                skip: (query.page - 1) * query.limit,
                take: query.limit,
                select: {
                    id: true,
                    name: true,
                    image: true,
                    slug: true,
                    description: true,
                    title: true,
                    props: true,
                    categoryId: true,
                    category: {
                        select: {
                            name: true,
                        },
                    },
                },
                orderBy: { id: "desc" },
            }),
            prisma.product.count({ where }),
        ]);
        return { products, totalItems };
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
