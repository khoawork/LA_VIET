import {
  pageHomeRepository,
  PageHomeRepository,
} from "../repositories/pagehome.repository";
import {
  PageHomePropsSchema,
} from "@/shared/schema/pages/pagehome.schema";
import {
  PageHomePropsType,
  UpdatePageHomeType,
} from "../types/pagehome.type";
import { CloudinaryService } from "@/shared/services/cloudinary.service";
import { NotFoundException } from "@/shared/common/app-error";
import { withoutMissingDefaults } from "@/shared/utils/without-missing-defaults";

export class PageHomeService {
  private readonly defaultSlug = "home";
  private readonly defaultPageName = "Trang Chủ Là Việt";

  constructor(private readonly repo: PageHomeRepository) {}

  /**
   * Quét và tự động upload các ảnh dạng Base64 Data URI lên Cloudinary ở tầng Backend
   * Sau đó thay thế bằng link Cloudinary thực tế trước khi lưu vào Database
   */
  private async processAndUploadHomeImages(
    props: PageHomePropsType
  ): Promise<PageHomePropsType> {
    const cloned: PageHomePropsType = JSON.parse(JSON.stringify(props));

    const isBase64Image = (str?: string): boolean => {
      if (!str || typeof str !== "string") return false;
      return str.startsWith("data:image/") || str.startsWith("data:application/");
    };

    // 1. Khối Hero Image
    if (isBase64Image(cloned.hero?.image?.src)) {
      try {
        const uploadRes = await CloudinaryService.uploadString(cloned.hero.image.src);
        cloned.hero.image.src = uploadRes.url;
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : String(err);
        throw new Error(`Upload ảnh Hero lên Cloudinary thất bại: ${msg}`);
      }
    }

    // 2. Khối Spotlight Image
    if (isBase64Image(cloned.spotlight?.image)) {
      try {
        const uploadRes = await CloudinaryService.uploadString(cloned.spotlight.image);
        cloned.spotlight.image = uploadRes.url;
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : String(err);
        throw new Error(`Upload ảnh Spotlight lên Cloudinary thất bại: ${msg}`);
      }
    }

    // 3. Logo con dấu của khối Tiêu điểm dự án
    if (isBase64Image(cloned.spotlight?.seal?.logo)) {
      try {
        const uploadRes = await CloudinaryService.uploadString(cloned.spotlight.seal.logo);
        cloned.spotlight.seal.logo = uploadRes.url;
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : String(err);
        throw new Error(`Upload logo con dấu thất bại: ${msg}`);
      }
    }

    // 4. Khối SEO ogImage
    if (isBase64Image(cloned.seo?.ogImage)) {
      try {
        const uploadRes = await CloudinaryService.uploadString(cloned.seo.ogImage);
        cloned.seo.ogImage = uploadRes.url;
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : String(err);
        throw new Error(`Upload ảnh SEO lên Cloudinary thất bại: ${msg}`);
      }
    }

    return cloned;
  }

  /**
   * Lấy cấu trúc toàn bộ Section của trang Trang chủ.
   * Chỉ trả về nội dung đã lưu trong DB.
   */
  async getPageHomeContent(slug: string = this.defaultSlug) {
    const page = await this.repo.findBySlug(slug);
    if (!page) throw new NotFoundException("Page home not found");

    const props = withoutMissingDefaults(
      page.props,
      PageHomePropsSchema.parse(page.props),
    );

    return {
      id: page.id,
      name: page.name,
      slug: page.slug,
      props,
    };
  }

  /**
   * Cập nhật nội dung các Section của trang Trang chủ từ Admin CMS.
   * Tầng Backend sẽ tự động phát hiện các ảnh mới (Base64) và upload lên Cloudinary.
   */
  async updatePageHomeContent(
    slug: string = this.defaultSlug,
    data: UpdatePageHomeType,
  ) {
    // Tự động đẩy ảnh lên Cloudinary nếu có ảnh mới
    const processedProps = await this.processAndUploadHomeImages(data.props);

    const existing = await this.repo.findBySlug(slug);

    if (!existing) {
      const created = await this.repo.create({
        name: data.name ?? this.defaultPageName,
        slug,
        props: processedProps,
      });
      return {
        id: created.id,
        name: created.name,
        slug: created.slug,
        props: processedProps,
      };
    }

    const updated = await this.repo.update(slug, {
      name: data.name ?? existing.name,
      props: processedProps,
    });

    return {
      id: updated.id,
      name: updated.name,
      slug: updated.slug,
      props: processedProps,
    };
  }

  /**
   * Cập nhật từng section riêng lẻ
   */
  async updateSection<K extends keyof PageHomePropsType>(
    slug: string = this.defaultSlug,
    sectionKey: K,
    sectionData: PageHomePropsType[K],
  ) {
    const current = await this.getPageHomeContent(slug);
    const updatedProps: PageHomePropsType = {
      ...current.props,
      [sectionKey]: sectionData,
    };

    return await this.updatePageHomeContent(slug, { props: updatedProps });
  }

}

export const pageHomeService = new PageHomeService(pageHomeRepository);
