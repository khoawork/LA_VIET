import { PageRepository, pageRepository } from "./pages.repository";

export class PageService {
    constructor(private readonly pageRepository: PageRepository) {}
    
    async getPageBySlug(slug: string) {
        return this.pageRepository.getPageBySlug(slug);
    }
}

export const pageService = new PageService(pageRepository);