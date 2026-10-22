import {
  newsRepository,
  NewsRepository,
} from "../repositories/news.repository";
import {
  newsCatesRepository,
  NewsCatesRepository,
} from "../repositories/news-cates.repository";
import type {
  CreateNewsType,
  UpdateNewsType,
  PatchNewsType,
  NewsQueryType,
  NewsWithCategory,
} from "../types/news.type";
import type { Prisma } from "@/prisma/generated/prisma/client";
import {
  NotFoundException,
  ConflictException,
} from "@/shared/common/app-error";
import { createPaginationMeta, type PaginationMeta } from "@/shared/common/pagination";
import { slugify } from "@/shared/utils/slug";

export class NewsService {
  constructor(
    private readonly repo: NewsRepository,
    private readonly catesRepo: NewsCatesRepository,
  ) {}

  async getAllNews(query: NewsQueryType): Promise<{
    items: NewsWithCategory[];
    meta: PaginationMeta;
  }> {
    const page = query.page ?? 1;
    const limit = query.limit ?? 10;
    const skip = (page - 1) * limit;

    const where: Prisma.NewsWhereInput = {};

    if (query.search) {
      where.OR = [
        { name: { contains: query.search } },
        { description: { contains: query.search } },
        { preside: { contains: query.search } },
      ];
    }

    if (query.categoryIds?.length) {
      where.categoryId = { in: query.categoryIds };
    } else if (query.categoryId) {
      where.categoryId = query.categoryId;
    }

    const orderBy: Prisma.NewsOrderByWithRelationInput = {
      [query.sortBy ?? "createdAt"]: query.sortOrder ?? "desc",
    };

    const [items, totalItems] = await this.repo.findMany({
      skip,
      take: limit,
      where,
      orderBy,
    });

    const meta = createPaginationMeta(totalItems, page, limit);

    return { items, meta };
  }

  async getNewsById(id: number): Promise<NewsWithCategory> {
    const news = await this.repo.findById(id);
    if (!news) {
      throw new NotFoundException(`Không tìm thấy tin tức với ID ${id}`);
    }
    return news;
  }

  async getNewsBySlug(slug: string): Promise<NewsWithCategory> {
    const news = await this.repo.findBySlug(slug);
    if (!news) {
      throw new NotFoundException(`Không tìm thấy tin tức với slug "${slug}"`);
    }
    return news;
  }

  async createNews(data: CreateNewsType): Promise<NewsWithCategory> {
    const category = await this.catesRepo.findById(data.categoryId);
    if (!category) {
      throw new NotFoundException(
        `Danh mục tin tức với ID ${data.categoryId} không tồn tại`,
      );
    }

    let slug = data.slug?.trim() || slugify(data.name);
    if (!slug) {
      slug = `news-${Date.now()}`;
    }

    const existingSlug = await this.repo.findBySlug(slug);
    if (existingSlug) {
      slug = `${slug}-${Date.now()}`;
    }

    return await this.repo.create({
      ...data,
      slug,
    });
  }

  async updateNews(
    id: number,
    data: UpdateNewsType | PatchNewsType,
  ): Promise<NewsWithCategory> {
    const existing = await this.getNewsById(id);

    if (data.categoryId && data.categoryId !== existing.categoryId) {
      const category = await this.catesRepo.findById(data.categoryId);
      if (!category) {
        throw new NotFoundException(
          `Danh mục tin tức với ID ${data.categoryId} không tồn tại`,
        );
      }
    }

    if (data.slug && data.slug !== existing.slug) {
      const duplicate = await this.repo.findBySlug(data.slug);
      if (duplicate && duplicate.id !== id) {
        throw new ConflictException(`Slug "${data.slug}" đã được sử dụng`);
      }
    }

    return await this.repo.update(id, data);
  }

  async deleteNews(id: number): Promise<NewsWithCategory> {
    await this.getNewsById(id);
    return await this.repo.delete(id);
  }
}

export const newsService = new NewsService(newsRepository, newsCatesRepository);
