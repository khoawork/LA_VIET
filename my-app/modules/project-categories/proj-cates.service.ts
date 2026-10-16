import { projCatesRepository, ProjCatesRepository } from "./proj-cates.repository";
import { ProjCatesRequestSchemaType } from "./proj-cates.type";

export class ProjCatesService {
    constructor(private readonly projCatesRepository: ProjCatesRepository) {}

    async createProjectCategory(data: ProjCatesRequestSchemaType) {
        return this.projCatesRepository.createProjectCategory(data);
    }

    async getProjectCategories() {
        return this.projCatesRepository.getProjectCategories();
    }

    async updateProjectCategory(id: number, data: ProjCatesRequestSchemaType) {
        return this.projCatesRepository.updateProjectCategory(id, data);
    }

    async deleteProjectCategory(id: number) {
        return this.projCatesRepository.deleteProjectCategory(id);
    }
    
}

export const projCatesService = new ProjCatesService(projCatesRepository);