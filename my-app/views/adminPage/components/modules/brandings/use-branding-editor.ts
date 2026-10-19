import { useEffect, useState } from "react";
import {
  SiteSettingsBrandPatchSchema,
  SiteSettingsDetailsPatchSchema,
  SiteSettingsFooterContentPatchSchema,
  SiteSettingsPoliciesPatchSchema,
  SiteSettingsRequestSchema,
} from "@/shared/schema/site-settings.schema";
import {
  createEmptySiteSettings,
  toSiteSettingsDraft,
} from "../../../services/brandings/site-settings.defaults";
import {
  createSiteSetting,
  getSiteSettings,
  saveSiteSettingTab,
} from "../../../services/brandings/site-settings.service";
import type {
  BrandingTab,
  SiteSetting,
  SiteSettingsDraft,
} from "../../../types/brandings/site-settings.type";

const tabSchemas = {
  brand: SiteSettingsBrandPatchSchema,
  footer: SiteSettingsFooterContentPatchSchema,
  details: SiteSettingsDetailsPatchSchema,
  policies: SiteSettingsPoliciesPatchSchema,
};

function tabPayload(tab: BrandingTab, draft: SiteSettingsDraft) {
  switch (tab) {
    case "brand":
      return { logo: draft.logo, company: draft.company, tagline: draft.tagline };
    case "footer":
      return { description: draft.footer.description, copyright: draft.footer.copyright, logo: draft.logo };
    case "details":
      return {
        office: draft.footer.office,
        contact: draft.footer.contact,
        social: draft.footer.social,
      };
    case "policies":
      return { policies: draft.footer.policies };
  }
}

function mergeSavedTab(
  current: SiteSettingsDraft,
  saved: SiteSetting,
  tab: BrandingTab,
): SiteSettingsDraft {
  switch (tab) {
    case "brand":
      return { ...current, logo: saved.logo, company: saved.company, tagline: saved.tagline };
    case "footer":
      return {
        ...current,
        footer: {
          ...current.footer,
          description: saved.footer.description,
          copyright: saved.footer.copyright,
        },
      };
    case "details":
      return {
        ...current,
        footer: {
          ...current.footer,
          office: saved.footer.office,
          contact: saved.footer.contact,
          social: saved.footer.social,
        },
      };
    case "policies":
      return {
        ...current,
        footer: { ...current.footer, policies: saved.footer.policies },
      };
  }
}

export function useBrandingEditor() {
  const [hasSettings, setHasSettings] = useState(false);
  const [draft, setDraft] = useState<SiteSettingsDraft>(createEmptySiteSettings);
  const [loading, setLoading] = useState(true);
  const [loadFailed, setLoadFailed] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    let mounted = true;
    getSiteSettings()
      .then((setting) => {
        if (!mounted) return;
        if (setting) {
          setHasSettings(true);
          setDraft(toSiteSettingsDraft(setting));
        }
      })
      .catch((cause: Error) => {
        if (mounted) {
          setError(cause.message);
          setLoadFailed(true);
        }
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, []);

  async function save(activeTab: BrandingTab) {
    const result = hasSettings
      ? tabSchemas[activeTab].safeParse(tabPayload(activeTab, draft))
      : SiteSettingsRequestSchema.safeParse(draft);
    if (!result.success) {
      const issue = result.error.issues[0];
      setError(`${issue.path.join(".")}: ${issue.message}`);
      setSuccess("");
      return;
    }

    setSaving(true);
    setError("");
    setSuccess("");
    try {
      const saved = hasSettings
        ? await saveSiteSettingTab(activeTab, result.data)
        : await createSiteSetting(draft);
      setHasSettings(true);
      setDraft((current) => hasSettings
        ? mergeSavedTab(current, saved, activeTab)
        : toSiteSettingsDraft(saved));
      setSuccess(hasSettings
        ? "Đã lưu tab đang chọn vào cơ sở dữ liệu."
        : "Đã tạo cấu hình thương hiệu.");
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Không thể lưu cấu hình.");
    } finally {
      setSaving(false);
    }
  }

  return {
    hasSettings,
    draft,
    setDraft,
    loading,
    loadFailed,
    saving,
    error,
    success,
    save,
  };
}
