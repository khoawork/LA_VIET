import {
  pageNewRepository,
  PageNewRepository,
} from "../repositories/pagenew.repository";
import {
  PageNewPropsSchema,
} from "@/shared/schema/pages/pagenew.schema";
import {
  PageNewPropsType,
  DEFAULT_PAGE_NEW_PROPS,
  UpdatePageNewType,
} from "../types/pagenew.type";
import { NotFoundException } from "@/shared/common/app-error";
import { CloudinaryService } from "@/shared/services/cloudinary.service";

export class PageNewService {
  private readonly defaultSlug = "news";
  private readonly defaultPageName = "Trang Tin Tức & Nghiên Cứu";

  constructor(private readonly repo: PageNewRepository) {}

  private async uploadFeaturedImage(props: PageNewPropsType): Promise<PageNewPropsType> {
    const imageUrl = props.featured.imageUrl.trim();
    if (!imageUrl.startsWith("data:image/")) {
      return {
        ...props,
        featured: { ...props.featured, imageUrl },
      };
    }

    try {
      const uploaded = await CloudinaryService.uploadString(imageUrl);
      return {
        ...props,
        featured: { ...props.featured, imageUrl: uploaded.url },
      };
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      throw new Error(`Upload ảnh bài viết tiêu điểm thất bại: ${message}`);
    }
  }

  /**
   * Lấy cấu trúc toàn bộ Section của trang Tin tức.
   * Nếu chưa có bản ghi trong DB, tự động khởi tạo với DEFAULT_PAGE_NEW_PROPS.
   */
  async getPageNewContent(slug: string = this.defaultSlug) {
    let page = await this.repo.findBySlug(slug);

    if (!page) {
      // Auto-seed trang lần đầu truy cập
      page = await this.repo.create({
        name: this.defaultPageName,
        slug,
        props: DEFAULT_PAGE_NEW_PROPS,
      });
    }

    // Đảm bảo dữ liệu props trả ra luôn tuân thủ đúng PageNewPropsSchema
    const parsedProps = PageNewPropsSchema.safeParse(page.props);

    const safeProps: PageNewPropsType = parsedProps.success
      ? parsedProps.data
      : {
          ...DEFAULT_PAGE_NEW_PROPS,
          ...(typeof page.props === "object" && page.props !== null
            ? (page.props as Record<string, unknown>)
            : {}),
        };

    safeProps.featured.imageUrl = safeProps.featured.imageUrl.trim();

    return {
      id: page.id,
      name: page.name,
      slug: page.slug,
      props: safeProps,
    };
  }

  /**
   * Cập nhật nội dung các Section của trang Tin tức từ Admin CMS
   */
  async updatePageNewContent(
    slug: string = this.defaultSlug,
    data: UpdatePageNewType,
  ) {
    const current = await this.getPageNewContent(slug);

    // Merge các section được cập nhật vào props hiện tại
    const mergedProps: PageNewPropsType = {
      header: {
        ...current.props.header,
        ...(data.props?.header ?? {}),
      },
      featured: {
        ...current.props.featured,
        ...(data.props?.featured ?? {}),
      },
      articlesSection: {
        ...current.props.articlesSection,
        ...(data.props?.articlesSection ?? {}),
      },
      stats: {
        ...current.props.stats,
        ...(data.props?.stats ?? {}),
      },
      cta: {
        ...current.props.cta,
        ...(data.props?.cta ?? {}),
      },
      seo: data.props?.seo
        ? {
            metaTitle:
              data.props.seo.metaTitle ??
              current.props.seo?.metaTitle ??
              DEFAULT_PAGE_NEW_PROPS.seo?.metaTitle ??
              "",
            metaDescription:
              data.props.seo.metaDescription ??
              current.props.seo?.metaDescription ??
              DEFAULT_PAGE_NEW_PROPS.seo?.metaDescription ??
              "",
            keywords:
              data.props.seo.keywords ??
              current.props.seo?.keywords ??
              DEFAULT_PAGE_NEW_PROPS.seo?.keywords ??
              "",
            ogImage: data.props.seo.ogImage ?? current.props.seo?.ogImage,
          }
        : current.props.seo,
    };

    // Validate toàn bộ cấu trúc trước khi lưu vào DB
    const validatedProps = await this.uploadFeaturedImage(
      PageNewPropsSchema.parse(mergedProps),
    );

    const updated = await this.repo.upsert(slug, {
      name: data.name ?? current.name,
      props: validatedProps,
    });

    return {
      id: updated.id,
      name: updated.name,
      slug: updated.slug,
      props: validatedProps,
    };
  }

  /**
   * Cập nhật riêng lẻ một Section cụ thể (header, featured, stats, cta, seo...)
   */
  async updateSection<K extends keyof PageNewPropsType>(
    slug: string = this.defaultSlug,
    sectionKey: K,
    sectionData: PageNewPropsType[K],
  ) {
    const current = await this.getPageNewContent(slug);

    const updatedProps: PageNewPropsType = {
      ...current.props,
      [sectionKey]: sectionData,
    };

    const validatedProps = await this.uploadFeaturedImage(
      PageNewPropsSchema.parse(updatedProps),
    );

    const updated = await this.repo.upsert(slug, {
      name: current.name,
      props: validatedProps,
    });

    return {
      id: updated.id,
      name: updated.name,
      slug: updated.slug,
      props: validatedProps,
    };
  }

  /**
   * Đưa toàn bộ cấu trúc trang về mặc định ban đầu
   */
  async resetToDefault(slug: string = this.defaultSlug) {
    const updated = await this.repo.upsert(slug, {
      name: this.defaultPageName,
      props: DEFAULT_PAGE_NEW_PROPS,
    });

    return {
      id: updated.id,
      name: updated.name,
      slug: updated.slug,
      props: DEFAULT_PAGE_NEW_PROPS,
    };
  }

  /**
   * Xóa bản ghi cấu trúc trang
   */
  async deletePage(slug: string = this.defaultSlug) {
    const existing = await this.repo.findBySlug(slug);
    if (!existing) {
      throw new NotFoundException(`Không tìm thấy cấu trúc trang với slug "${slug}"`);
    }
    return await this.repo.delete(slug);
  }
}

export const pageNewService = new PageNewService(pageNewRepository);
