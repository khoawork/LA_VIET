import { prisma } from "@/prisma/prisma.service";
import type { SiteSettingsRequestType } from "./site-settings.type";

export class SiteSettingsRepository {
  // The database ID stays internal. New installations always create row 1.
  async createSiteSettings(data: SiteSettingsRequestType) {
    return prisma.siteSetting.create({ data: { id: 1, ...data } });
  }

  async getSiteSettings() {
    return prisma.siteSetting.findFirst({ orderBy: { id: "asc" } });
  }

  async updateSiteSettings(id: number, data: Partial<SiteSettingsRequestType>) {
    return prisma.siteSetting.update({ where: { id }, data });
  }
}

export const siteSettingsRepository = new SiteSettingsRepository();
