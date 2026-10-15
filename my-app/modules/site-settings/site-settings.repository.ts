import { prisma } from "@/prisma/prisma.service";
import { SiteSettingsPatchSchemaType, SiteSettingsRequestSchemaType } from "./site-settings.type";

export class SiteSettingsRepository {
    async createSiteSettings(data: SiteSettingsRequestSchemaType) {
        return prisma.siteSetting.create({
            data,
        });
    }

    async updateSiteSettings(id: number, data: SiteSettingsPatchSchemaType) {
        await prisma.siteSetting.update({
            where: { id },
            data,
        });
    }

    async getSiteSettingsById(id: number) {
        return prisma.siteSetting.findUnique({
            where: { id },
        });
    }

    async getAllSiteSettings() {
        return prisma.siteSetting.findMany();
    }

    async deleteSiteSettings(id: number) {
        await prisma.siteSetting.delete({
            where: { id },
        });
    }

}

export const siteSettingsRepository = new SiteSettingsRepository();