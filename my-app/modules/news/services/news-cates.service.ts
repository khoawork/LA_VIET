import {
  newsCatesRepository,
  NewsCatesRepository,
} from "../repositories/news-cates.repository";
import type {
  CreateNewsCatesType,
  UpdateNewsCatesType,
  PatchNewsCatesType,
} from "../types/news-cates.type";
import {
  NotFoundException,
  ConflictException,
} from "@/shared/common/app-error";

export class NewsCatesService {
  constructor(private readonly repo: NewsCatesRepository) {}

  async getAllCategories() {
    return await this.repo.findMany();
  }

  async getCategoryById(id: number) {
    const category = await this.repo.findById(id);
    if (!category) {
      throw new NotFoundException(`Không tìm thấy danh mục tin tức với ID ${id}`);
    }
    return category;
  }

  async createCategory(data: CreateNewsCatesType) {
    const existing = await this.repo.findByName(data.name);
    if (existing) {
      throw new ConflictException(`Danh mục "${data.name}" đã tồn tại`);
    }
    return await this.repo.create(data);
  }

  async updateCategory(
    id: number,
    data: UpdateNewsCatesType | PatchNewsCatesType,
  ) {
    const existing = await this.getCategoryById(id);
    if (data.name && data.name !== existing.name) {
      const duplicate = await this.repo.findByName(data.name);
      if (duplicate && duplicate.id !== id) {
        throw new ConflictException(`Danh mục "${data.name}" đã tồn tại`);
      }
    }
    return await this.repo.update(id, data);
  }

  async deleteCategory(id: number) {
    const existing = await this.getCategoryById(id);
    if (existing._count?.news && existing._count.news > 0) {
      throw new ConflictException(
        `Không thể xóa danh mục "${existing.name}" vì vẫn còn ${existing._count.news} tin tức thuộc danh mục này`,
      );
    }
    return await this.repo.delete(id);
  }
}

export const newsCatesService = new NewsCatesService(newsCatesRepository);
