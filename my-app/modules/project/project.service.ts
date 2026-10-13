import { projectRepository, ProjectRepository } from "./project.repository";
import { CreateProjectType } from "./project.type";

export class ProjectService {
  constructor(private readonly projectRepository: ProjectRepository) {}

  async createProject(data: CreateProjectType) {
    return await this.projectRepository.createProject(data);
  }
}

export const projectService = new ProjectService(projectRepository);
