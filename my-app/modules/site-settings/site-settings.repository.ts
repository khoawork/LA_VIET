import { prisma } from "@/prisma/prisma.service";
import { SiteSettingsPatchSchemaType, SiteSettingsRequestSchemaType } from "./site-settings.type";

export class SiteSettingsRepository {
    async createSiteSettings(data: SiteSettingsRequestSchemaType) {
        return await prisma.siteSetting.create({
            data,
        });
    }

    async updateSiteSettings(id: number, data: SiteSettingsPatchSchemaType) {
        return await prisma.siteSetting.update({
            where: { id },
            data,
        });
    }

    async getSiteSettingsById(id: number) {
        return await prisma.siteSetting.findFirst({
            where: { id },
        });
    }

    async getAllSiteSettings() {
        return await prisma.siteSetting.findMany();
    }

    async deleteSiteSettings(id: number) {
        return await prisma.siteSetting.delete({
            where: { id },
        });
    }

}

export const siteSettingsRepository = new SiteSettingsRepository();