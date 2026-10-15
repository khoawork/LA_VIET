import { prisma } from "@/prisma/prisma.service";
import type { Prisma } from "@/prisma/generated/prisma/client";
import type { PageNewPropsType } from "../types/pagenew.type";

export class PageNewRepository {
  private readonly defaultSlug = "news";

  /**
   * Tìm bản ghi trang theo slug (mặc định là "news")
   */
  async findBySlug(slug: string = this.defaultSlug) {
    return await prisma.page.findUnique({
      where: { slug },
    });
  }

  /**
   * Tạo mới bản ghi trang
   */
  async create(data: { name: string; slug?: string; props: PageNewPropsType }) {
    return await prisma.page.create({
      data: {
        name: data.name,
        slug: data.slug ?? this.defaultSlug,
        props: data.props as unknown as Prisma.InputJsonValue,
      },
    });
  }

  /**
   * Cập nhật bản ghi trang theo slug
   */
  async update(
    slug: string = this.defaultSlug,
    data: { name?: string; props: PageNewPropsType },
  ) {
    return await prisma.page.update({
      where: { slug },
      data: {
        ...(data.name ? { name: data.name } : {}),
        props: data.props as unknown as Prisma.InputJsonValue,
      },
    });
  }

  /**
   * Upsert bản ghi trang: Nếu chưa có thì tạo mới với props mặc định, nếu có thì cập nhật
   */
  async upsert(
    slug: string = this.defaultSlug,
    data: { name: string; props: PageNewPropsType },
  ) {
    return await prisma.page.upsert({
      where: { slug },
      create: {
        name: data.name,
        slug,
        props: data.props as unknown as Prisma.InputJsonValue,
      },
      update: {
        name: data.name,
        props: data.props as unknown as Prisma.InputJsonValue,
      },
    });
  }

  /**
   * Xóa bản ghi trang theo slug
   */
  async delete(slug: string = this.defaultSlug) {
    return await prisma.page.delete({
      where: { slug },
    });
  }
}

export const pageNewRepository = new PageNewRepository();

