import { Prisma } from "@/prisma/generated/prisma/client";
import {
  ProjectPatchSchemaType,
  ProjectQuerySchemaType,
  ProjectRequestType,
} from "./project.type";
import { prisma } from "@/prisma/prisma.service";

export class ProjectRepository {
  async createProject(data: ProjectRequestType) {
    return await prisma.project.create({
      data,
      include: {
        category: {
          select: {
            name: true,
          },
        },
      },
    });
  }

  async deleteProject(id: number) {
    return await prisma.project.delete({
      where: {
        id: id,
      },
    });
  }

  async getProjects(query: ProjectQuerySchemaType) {
    const skip = (query.page - 1) * query.limit;
    const where: Prisma.ProjectWhereInput = {
      ...(query.search
        ? {
            name: {
              contains: query.search,
            },
          }
        : {}),
      ...(query.categoryId !== undefined
        ? {
            categoryId: query.categoryId,
          }
        : {}),
    };
    const [projects, totalItems] = await prisma.$transaction([
      prisma.project.findMany({
        where,
        skip,
        take: query.limit,
        orderBy: {
          updatedAt: "desc",
        },
        include: {
          category: {
            select: {
              name: true,
            },
          },
        },
      }),
      prisma.project.count({
        where,
      }),
    ]);
    return { projects, totalItems };
  }

  async getProjectByIds(ids: number[]) {
    return await prisma.project.findMany({
      where: {
        id: {
          in: ids,
        },
      },
      include: {
        category: {
          select: {
            name: true,
          },
        },
      },
    });
  }

  async getProjectById(id: number) {
    return await prisma.project.findUnique({
      where: {
        id: id,
      },
      include: {
        category: {
          select: {
            name: true,
          },
        },
      },
    });
  }

  async updatePatchProject(id: number, data: ProjectPatchSchemaType) {
    await prisma.project.update({
      where: {
        id: id,
      },
      data,
    });
  }
}

export const projectRepository = new ProjectRepository();
