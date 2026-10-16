import { ConflictException, NotFoundException } from "@/shared/common/app-error";
import { PageContactPropsSchema } from "@/shared/schema/pages/page-contact.schema";
import { PageContactRepository, pageContactRepository } from "./page-contact.repository";
import type { PageContactPropsType, PageContactRequestType } from "./page-contact.type";

export class PageContactService {
  constructor(private readonly repository: PageContactRepository) {}

  async getPageContact() {
    const page = await this.repository.getPageContact();
    if (!page) throw new NotFoundException("Page contact not found");
    return {
      id: page.id,
      name: page.name,
      slug: "contact" as const,
      props: PageContactPropsSchema.parse(page.props),
    };
  }

  async createPageContact(data: PageContactRequestType) {
    if (await this.repository.getPageContact()) {
      throw new ConflictException("Page contact already exists");
    }
    return this.repository.createPageContact(data);
  }

  async getSection<K extends keyof PageContactPropsType>(section: K) {
    return (await this.getPageContact()).props[section];
  }

  async updateSection<K extends keyof PageContactPropsType>(
    section: K,
    value: PageContactPropsType[K],
  ) {
    const page = await this.getPageContact();
    const props = PageContactPropsSchema.parse({ ...page.props, [section]: value });
    await this.repository.updateProps(page.id, props);
  }
}

export const pageContactService = new PageContactService(pageContactRepository);
