import { prisma } from "@/prisma/prisma.service";
import type { Prisma } from "@/prisma/generated/prisma/client";
import type { PageHomePropsType } from "../types/pagehome.type";

export class PageHomeRepository {
  private readonly defaultSlug = "home";

  /**
   * Tìm bản ghi trang theo slug (mặc định là "home")
   */
  async findBySlug(slug: string = this.defaultSlug) {
    return await prisma.page.findUnique({
      where: { slug },
    });
  }

  /**
   * Tạo mới bản ghi trang
   */
  async create(data: { name: string; slug?: string; props: PageHomePropsType }) {
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
    data: { name?: string; props: PageHomePropsType },
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
   * Upsert bản ghi trang: Nếu chưa có thì tạo mới, nếu có thì cập nhật
   */
  async upsert(
    slug: string = this.defaultSlug,
    data: { name: string; props: PageHomePropsType },
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
}

export const pageHomeRepository = new PageHomeRepository();

