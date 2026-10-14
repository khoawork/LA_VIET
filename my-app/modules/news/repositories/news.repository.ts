import {
  CreateNewsRequest,
  NewsIdRequest,
  NewsResponse,
  NewsPatchRequest,
  NewsUpdateRequest,
} from "@/modules/news/types/news.type";
import { prisma } from "@/prisma/prisma.service";

export const newsRepository = {
  async getAllNews(): Promise<NewsResponse[]> {
    return prisma.news.findMany({
      include: {
        category: true,
      },
    });
  },

  async getNews(data: NewsIdRequest): Promise<NewsResponse | null> {
    return prisma.news.findUnique({
      where: data,
      include: {
        category: true,
      },
    });
  },

  async createNews(data: CreateNewsRequest): Promise<NewsResponse> {
    return prisma.news.create({
      data,
      include: {
        category: true,
      },
    });
  },

  async updateNews(
    newsId: NewsIdRequest,
    data: NewsUpdateRequest | NewsPatchRequest,
  ) {
    return prisma.news.update({
      where: newsId,
      data,
      include: {
        category: true,
      },
    });
  },

  async deleteNews(newsId: NewsIdRequest) {
    return prisma.news.delete({
      where: newsId,
    });
  },
};
