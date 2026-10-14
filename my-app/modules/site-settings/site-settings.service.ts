import { siteSettingsRepository, SiteSettingsRepository } from "./site-settings.repository";
import { SiteSettingsPatchSchemaType, SiteSettingsRequestSchemaType, SiteSettingsResponseSchemaType } from "./site-settings.type";

export class SiteSettingsService {
    constructor(private readonly siteSettingsRepository: SiteSettingsRepository) {}

    async createSiteSettings(data: SiteSettingsRequestSchemaType) {
        return this.siteSettingsRepository.createSiteSettings(data);
    }

    async updateSiteSettings(id: number, data: SiteSettingsPatchSchemaType) {
        return this.siteSettingsRepository.updateSiteSettings(id, data);
    }

    async getSiteSettingsById(id: number) {
        return this.siteSettingsRepository.getSiteSettingsById(id);
    }

    async getAllSiteSettings() {
        return this.siteSettingsRepository.getAllSiteSettings();
    }

    async deleteSiteSettings(id: number) {
        return this.siteSettingsRepository.deleteSiteSettings(id);
    }
}

export const siteSettingsService = new SiteSettingsService(siteSettingsRepository);