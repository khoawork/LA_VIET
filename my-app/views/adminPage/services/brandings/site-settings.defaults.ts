import type { SiteSettingsDraft } from "../../types/brandings/site-settings.type";

export function createEmptySiteSettings(): SiteSettingsDraft {
  return {
    logo: "",
    company: "",
    tagline: "",
    footer: {
      description: "",
      office: { title: "Văn phòng", locations: [] },
      contact: { title: "Liên hệ", methods: [] },
      social: { title: "Mạng xã hội", links: [] },
      copyright: "",
      policies: [],
    },
  };
}

export function toSiteSettingsDraft(setting: SiteSettingsDraft): SiteSettingsDraft {
  return structuredClone({
    logo: setting.logo,
    company: setting.company,
    tagline: setting.tagline,
    footer: setting.footer,
  });
}
