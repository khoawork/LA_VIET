import { ConflictException, NotFoundException } from "@/shared/common/app-error";
import {
  FooterSchema,
  SiteSettingsBrandPatchSchema,
  SiteSettingsDetailsPatchSchema,
  SiteSettingsFooterContentPatchSchema,
  SiteSettingsPoliciesPatchSchema,
} from "@/shared/schema/site-settings.schema";
import { siteSettingsRepository, SiteSettingsRepository } from "./site-settings.repository";
import type {
  FooterType,
  SiteSettingsBrandType,
  SiteSettingsDetailsType,
  SiteSettingsFooterContentType,
  SiteSettingsPoliciesType,
  SiteSettingsRequestType,
} from "./site-settings.type";

export class SiteSettingsService {
  constructor(private readonly repository: SiteSettingsRepository) {}

  async findSiteSettings() {
    return this.repository.getSiteSettings();
  }

  async getSiteSettings() {
    const setting = await this.findSiteSettings();
    if (!setting) throw new NotFoundException("Site settings not found");
    return setting;
  }

  async createSiteSettings(data: SiteSettingsRequestType) {
    if (await this.findSiteSettings()) {
      throw new ConflictException("Site settings already exists");
    }
    return this.repository.createSiteSettings(data);
  }

  async getBrand() {
    const { logo, company, tagline } = await this.getSiteSettings();
    return SiteSettingsBrandPatchSchema.parse({ logo, company, tagline });
  }

  async updateBrand(data: SiteSettingsBrandType) {
    const setting = await this.getSiteSettings();
    await this.repository.updateSiteSettings(setting.id, data);
  }

  private async getFooter() {
    const setting = await this.getSiteSettings();
    return { id: setting.id, footer: FooterSchema.parse(setting.footer) };
  }

  private async updateFooter(patch: Partial<FooterType>) {
    const { id, footer } = await this.getFooter();
    await this.repository.updateSiteSettings(id, {
      footer: FooterSchema.parse({ ...footer, ...patch }),
    });
  }

  async getFooterContent() {
    const { footer } = await this.getFooter();
    return SiteSettingsFooterContentPatchSchema.parse({
      description: footer.description,
      copyright: footer.copyright,
    });
  }

  async updateFooterContent(data: SiteSettingsFooterContentType) {
    const { logo, ...footerData } = data;
    if (logo !== undefined) {
      const setting = await this.getSiteSettings();
      await this.repository.updateSiteSettings(setting.id, { logo });
    }
    await this.updateFooter(footerData);
  }

  async getDetails() {
    const { footer } = await this.getFooter();
    return SiteSettingsDetailsPatchSchema.parse({
      office: footer.office,
      contact: footer.contact,
      social: footer.social,
    });
  }

  async updateDetails(data: SiteSettingsDetailsType) {
    await this.updateFooter(data);
  }

  async getPolicies() {
    const { footer } = await this.getFooter();
    return SiteSettingsPoliciesPatchSchema.parse({ policies: footer.policies });
  }

  async updatePolicies(data: SiteSettingsPoliciesType) {
    await this.updateFooter(data);
  }
}

export const siteSettingsService = new SiteSettingsService(siteSettingsRepository);
