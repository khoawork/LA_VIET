import {
  projectRepository,
  ProjectRepository,
} from "./project.repository";
import type {
  CreateProjectDto,
  UpdateProjectDto,
  ProjectQueryDto,
  ProjectResponseDto,
} from "./project.dto";
import {
  NotFoundException,
  ConflictException,
  createPaginationMeta,
  type PaginationMeta,
} from "@/shared";

export class ProjectService {
  constructor(
    private readonly repo: ProjectRepository = projectRepository,
  ) {}

  async getAllProjects(query: ProjectQueryDto): Promise<{
    items: ProjectResponseDto[];
    meta: PaginationMeta;
  }> {
    const [items, totalItems] = await Promise.all([
      this.repo.findMany(query),
      this.repo.count(query),
    ]);

    const meta = createPaginationMeta(totalItems, query.page, query.limit);

    return { items, meta };
  }

  async getProjectByName(name: string): Promise<ProjectResponseDto> {
    const project = await this.repo.findByName(name);
    if (!project) {
      throw new NotFoundException(`Không tìm thấy dự án có tên "${name}"`);
    }
    return project;
  }

  async createProject(dto: CreateProjectDto): Promise<ProjectResponseDto> {
    const existing = await this.repo.findByName(dto.name);
    if (existing) {
      throw new ConflictException(
        `Dự án có tên "${dto.name}" đã tồn tại trên hệ thống`,
      );
    }

    return this.repo.create(dto);
  }

  async updateProject(dto: UpdateProjectDto): Promise<ProjectResponseDto> {
    const existing = await this.getProjectByName(dto.name);

    if (dto.newName && dto.newName !== dto.name) {
      const duplicate = await this.repo.findByName(dto.newName);
      if (duplicate && duplicate.id !== existing.id) {
        throw new ConflictException(
          `Dự án có tên "${dto.newName}" đã tồn tại trên hệ thống`,
        );
      }
    }

    return this.repo.updateByName(dto.name, dto);
  }

  async deleteProject(name: string): Promise<ProjectResponseDto> {
    await this.getProjectByName(name);
    return this.repo.deleteByName(name);
  }
}

export const projectService = new ProjectService();
