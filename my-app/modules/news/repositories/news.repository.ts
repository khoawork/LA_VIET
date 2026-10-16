import { prisma } from "@/prisma/prisma.service";
import type { Prisma } from "@/prisma/generated/prisma/client";
import type {
  CreateNewsType,
  NewsWithCategory,
} from "../types/news.type";

export class NewsRepository {
  async findMany(options: {
    skip?: number;
    take?: number;
    where?: Prisma.NewsWhereInput;
    orderBy?: Prisma.NewsOrderByWithRelationInput;
  }): Promise<[NewsWithCategory[], number]> {
    return await prisma.$transaction([
      prisma.news.findMany({
        skip: options.skip,
        take: options.take,
        where: options.where,
        orderBy: options.orderBy,
        include: {
          category: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      }),
      prisma.news.count({
        where: options.where,
      }),
    ]);
  }

  async findById(id: number): Promise<NewsWithCategory | null> {
    return await prisma.news.findUnique({
      where: { id },
      include: {
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  async findBySlug(slug: string): Promise<NewsWithCategory | null> {
    return await prisma.news.findUnique({
      where: { slug },
      include: {
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  async create(data: CreateNewsType & { slug: string }): Promise<NewsWithCategory> {
    return await prisma.news.create({
      data: {
        name: data.name,
        image: data.image,
        categoryId: data.categoryId,
        preside: data.preside ?? "",
        presideIcon: data.presideIcon ?? "",
        date: data.date,
        description: data.description,
        button: data.button ?? "Xem chi tiết",
        slug: data.slug,
        reading: data.reading ?? "5 phút đọc",
      },
      include: {
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  async update(
    id: number,
    data: Prisma.NewsUpdateInput | Prisma.NewsUncheckedUpdateInput,
  ): Promise<NewsWithCategory> {
    return await prisma.news.update({
      where: { id },
      data,
      include: {
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  async delete(id: number): Promise<NewsWithCategory> {
    return await prisma.news.delete({
      where: { id },
      include: {
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  async count(where?: Prisma.NewsWhereInput): Promise<number> {
    return await prisma.news.count({ where });
  }
}

export const newsRepository = new NewsRepository();
