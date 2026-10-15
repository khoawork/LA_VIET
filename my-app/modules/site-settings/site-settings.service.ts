import { FooterSchema } from "@/shared/schema/site-settings.schema";
import {
  siteSettingsRepository,
  SiteSettingsRepository,
} from "./site-settings.repository";
import {
  FooterPatchSchemaType,
  FooterSchemaType,
  SiteSettingsPatchSchemaType,
  SiteSettingsRequestSchemaType,
  SiteSettingsResponseSchemaType,
} from "./site-settings.type";
import { NotFoundException } from "@/shared";

export class SiteSettingsService {
  constructor(
    private readonly siteSettingsRepository: SiteSettingsRepository,
  ) {}

  private mergeFooter(
    current: FooterSchemaType,
    patch: FooterPatchSchemaType,
  ): FooterSchemaType {
    return FooterSchema.parse({
      ...current,
      ...patch,

      office: patch.office
        ? {
            ...current.office,
            ...patch.office,
          }
        : current.office,

      contact: patch.contact
        ? {
            ...current.contact,
            ...patch.contact,
          }
        : current.contact,

      social: patch.social
        ? {
            ...current.social,
            ...patch.social,
          }
        : current.social,
    });
  }

  async createSiteSettings(data: SiteSettingsRequestSchemaType) {
    return this.siteSettingsRepository.createSiteSettings(data);
  }

  async updateSiteSettings(id: number, data: SiteSettingsPatchSchemaType) {
    const currentSetting =
      await this.siteSettingsRepository.getSiteSettingsById(id);
    const { footer: footerPatch, ...otherFields } = data;

    if (!currentSetting) {
      throw new NotFoundException(`Site settings with id ${id} not found`);
    }

    if (footerPatch) {
      const currentFooter = FooterSchema.parse(currentSetting.footer);

      const mergedFooter = this.mergeFooter(currentFooter, footerPatch);
      await this.siteSettingsRepository.updateSiteSettings(id, {
        ...otherFields,
        footer: mergedFooter,
      });
    } else {
      await this.siteSettingsRepository.updateSiteSettings(id, otherFields);
    }
  }

  async getSiteSettingsById(id: number) {
    return this.siteSettingsRepository.getSiteSettingsById(id);
  }

  async getAllSiteSettings() {
    return this.siteSettingsRepository.getAllSiteSettings();
  }

  async deleteSiteSettings(id: number) {
    await this.siteSettingsRepository.deleteSiteSettings(id);
  }
}

export const siteSettingsService = new SiteSettingsService(
  siteSettingsRepository,
);
