import { CreateProjectType } from "./project.type";
import { prisma } from "@/prisma/prisma.service";

export class ProjectRepository {
  async createProject(data: CreateProjectType) {
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
}

export const projectRepository = new ProjectRepository();
