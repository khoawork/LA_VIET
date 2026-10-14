import { prisma } from "@/prisma/prisma.service";
import { ProjCatesRequestSchemaType } from "./proj-cates.type";

export class ProjCatesRepository {
    async createProjectCategory(data: ProjCatesRequestSchemaType) {
        return await prisma.projectCategory.create({
            data,
        });
    }

    async getProjectCategories() {
        return await prisma.projectCategory.findMany();
    }

    async updateProjectCategory(id: number, data: ProjCatesRequestSchemaType) {
        await prisma.projectCategory.update({
            where: { id },
            data,
        });
    }

    async deleteProjectCategory(id: number) {
        await prisma.projectCategory.delete({
            where: { id },
        });
    }

}

export const projCatesRepository = new ProjCatesRepository();