import { ConflictException, NotFoundException } from "@/shared/common/app-error";
import { PageProjectPropsSchema } from "@/shared/schema/pages/page-project.schema";
import { PageProjectRepository, pageProjectRepository } from "./page-project.repository";
import {
  PageProjectCTAType,
  PageProjectFilterType,
  PageProjectHeaderType,
  PageProjectProcedureType,
  PageProjectRequestType,
} from "./page-project.type";

export class PageProjectService {
  constructor(private readonly pageProjectRepository: PageProjectRepository) {}

  private async getPageProject() {
    const page = await this.pageProjectRepository.getPageProject();
    if (!page) {
      throw new NotFoundException("Page project not found");
    }

    return {
      id: page.id,
      props: PageProjectPropsSchema.parse(page.props),
    };
  }

  async createPageProject(data: PageProjectRequestType) {
    const page = await this.pageProjectRepository.getPageProject();
    if (page) {
      throw new ConflictException("Page project already exists");
    }

    return this.pageProjectRepository.createPageProject(data);
  }

  async getHeader() {
    const page = await this.getPageProject();
    return page.props.header;
  }

  async updateHeader(header: PageProjectHeaderType) {
    const page = await this.getPageProject();
    const props = PageProjectPropsSchema.parse({
      ...page.props,
      header,
    });
    await this.pageProjectRepository.updateProps(page.id, props);
  }

  async getFilter() {
    const page = await this.getPageProject();
    if (!page.props.filter) {
      throw new NotFoundException("Page project filter not found");
    }
    return page.props.filter;
  }

  async updateFilter(filter: PageProjectFilterType) {
    const page = await this.getPageProject();
    const props = PageProjectPropsSchema.parse({
      ...page.props,
      filter,
    });
    await this.pageProjectRepository.updateProps(page.id, props);
  }

  async getProcedure() {
    const page = await this.getPageProject();
    if (!page.props.procedure) {
      throw new NotFoundException("Page project procedure not found");
    }
    return page.props.procedure;
  }

  async updateProcedure(procedure: PageProjectProcedureType) {
    const page = await this.getPageProject();
    const props = PageProjectPropsSchema.parse({
      ...page.props,
      procedure,
    });
    await this.pageProjectRepository.updateProps(page.id, props);
  }

  async getCTA() {
    const page = await this.getPageProject();
    if (!page.props.cta) {
      throw new NotFoundException("Page project CTA not found");
    }
    return page.props.cta;
  }

  async updateCTA(cta: PageProjectCTAType) {
    const page = await this.getPageProject();
    const props = PageProjectPropsSchema.parse({
      ...page.props,
      cta,
    });
    await this.pageProjectRepository.updateProps(page.id, props);
  }
}

export const pageProjectService = new PageProjectService(pageProjectRepository);
