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
import { withoutMissingDefaults } from "@/shared/utils/without-missing-defaults";

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
   * Chỉ trả về nội dung đã lưu trong DB.
   */
  async getPageNewContent(slug: string = this.defaultSlug) {
    const page = await this.repo.findBySlug(slug);
    if (!page) throw new NotFoundException("Page news not found");

    const props = withoutMissingDefaults(
      page.props,
      PageNewPropsSchema.parse(page.props),
    );
    props.featured.imageUrl = props.featured.imageUrl.trim();

    return {
      id: page.id,
      name: page.name,
      slug: page.slug,
      props,
    };
  }

  /**
   * Cập nhật nội dung các Section của trang Tin tức từ Admin CMS
   */
  async updatePageNewContent(
    slug: string = this.defaultSlug,
    data: UpdatePageNewType,
  ) {
    const existing = await this.repo.findBySlug(slug);
    if (!existing) {
      const props = await this.uploadFeaturedImage(PageNewPropsSchema.parse(data.props));
      const created = await this.repo.create({
        name: data.name ?? this.defaultPageName,
        slug,
        props,
      });
      return {
        id: created.id,
        name: created.name,
        slug: created.slug,
        props,
      };
    }
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
              "",
            metaDescription:
              data.props.seo.metaDescription ??
              current.props.seo?.metaDescription ??
              "",
            keywords:
              data.props.seo.keywords ??
              current.props.seo?.keywords ??
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
