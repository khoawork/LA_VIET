import { NotFoundException } from "@/shared/common/app-error";
import { projectRepository, ProjectRepository } from "./project.repository";
import { ProjectListDetailResponseType, ProjectPatchSchemaType, ProjectQuerySchemaType, ProjectRequestType, ProjectResponseType, ProjectsListResponseType } from "./project.type";

export class ProjectService {
  constructor(private readonly projectRepository: ProjectRepository) {}

  async createProject(data: ProjectRequestType): Promise<ProjectResponseType> {
    return this.projectRepository.createProject(data);
  }

  async getProjects(query: ProjectQuerySchemaType) {
    return this.projectRepository.getProjects(query);
  }

  async deleteProject(id: number) {
    return this.projectRepository.deleteProject(id);
  }

  async getProjectByIds(ids: number[]): Promise<ProjectListDetailResponseType> {
    return this.projectRepository.getProjectByIds(ids);
  }

  async getProjectById(id: number): Promise<ProjectResponseType> {
    const project = await this.projectRepository.getProjectById(id);
    if (!project) {
      throw new NotFoundException(`Project with id ${id} not found`);
    }
    return project;
  }

  async updatePatchProject(id: number, data: ProjectPatchSchemaType) {
    await this.projectRepository.updatePatchProject(id, data);
  }

}

export const projectService = new ProjectService(projectRepository);
