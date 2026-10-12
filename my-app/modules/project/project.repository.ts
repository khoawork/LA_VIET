import { prisma } from "@/prisma/prisma.service";
import type {
  CreateProjectDto,
  UpdateProjectDto,
  ProjectQueryDto,
  ProjectResponseDto,
} from "./project.dto";

export class ProjectRepository {
  async findMany(query: ProjectQueryDto): Promise<ProjectResponseDto[]> {
    const {
      page,
      limit,
      search,
      name,
      sortBy = "createdAt",
      sortOrder = "desc",
    } = query;
    const skip = (page - 1) * limit;

    const where = {
      ...(name ? { name: { contains: name } } : {}),
      ...(search
        ? {
            OR: [
              { name: { contains: search } },
              { description: { contains: search } },
            ],
          }
        : {}),
    };

    return prisma.project.findMany({
      where,
      skip,
      take: limit,
      orderBy: {
        [sortBy]: sortOrder,
      },
    });
  }

  async count(query: ProjectQueryDto): Promise<number> {
    const { search, name } = query;
    const where = {
      ...(name ? { name: { contains: name } } : {}),
      ...(search
        ? {
            OR: [
              { name: { contains: search } },
              { description: { contains: search } },
            ],
          }
        : {}),
    };

    return prisma.project.count({ where });
  }

  async findByName(name: string): Promise<ProjectResponseDto | null> {
    return prisma.project.findFirst({
      where: { name },
    });
  }

  async create(data: CreateProjectDto): Promise<ProjectResponseDto> {
    return prisma.project.create({
      data: {
        name: data.name,
        description: data.description ?? null,
      },
    });
  }

  async updateByName(
    name: string,
    data: UpdateProjectDto,
  ): Promise<ProjectResponseDto> {
    const existing = await this.findByName(name);
    if (!existing) {
      throw new Error(`Dự án "${name}" không tồn tại`);
    }

    return prisma.project.update({
      where: { id: existing.id },
      data: {
        ...(data.newName !== undefined ? { name: data.newName } : {}),
        ...(data.description !== undefined
          ? { description: data.description }
          : {}),
      },
    });
  }

  async deleteByName(name: string): Promise<ProjectResponseDto> {
    const existing = await this.findByName(name);
    if (!existing) {
      throw new Error(`Dự án "${name}" không tồn tại`);
    }

    return prisma.project.delete({
      where: { id: existing.id },
    });
  }
}

export const projectRepository = new ProjectRepository();
