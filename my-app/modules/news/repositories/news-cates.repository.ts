import { prisma } from "@/prisma/prisma.service";
import type {
  CreateNewsCatesType,
  UpdateNewsCatesType,
  PatchNewsCatesType,
  NewsCatesResponseType,
} from "../types/news-cates.type";

export class NewsCatesRepository {
  async findMany() {
    return await prisma.newsCategory.findMany({
      include: {
        _count: {
          select: {
            news: true,
          },
        },
      },
    });
  }

  async findById(id: number) {
    return await prisma.newsCategory.findUnique({
      where: { id },
      include: {
        _count: {
          select: {
            news: true,
          },
        },
      },
    });
  }

  async findByName(name: string) {
    return await prisma.newsCategory.findFirst({
      where: { name },
    });
  }

  async create(data: CreateNewsCatesType): Promise<NewsCatesResponseType> {
    return await prisma.newsCategory.create({
      data,
    });
  }

  async update(
    id: number,
    data: UpdateNewsCatesType | PatchNewsCatesType,
  ): Promise<NewsCatesResponseType> {
    return await prisma.newsCategory.update({
      where: { id },
      data,
    });
  }

  async delete(id: number): Promise<NewsCatesResponseType> {
    return await prisma.newsCategory.delete({
      where: { id },
    });
  }
}

export const newsCatesRepository = new NewsCatesRepository();
