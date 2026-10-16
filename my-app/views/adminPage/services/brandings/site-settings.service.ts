import type {
  BrandingTab,
  SiteSetting,
  SiteSettingsDraft,
} from "../../types/brandings/site-settings.type";

async function errorMessage(response: Response) {
  const body = await response.json().catch(() => null);
  const issue = body?.errors?.[0];
  return issue
    ? `${issue.field}: ${issue.message}`
    : body?.message || "Không thể xử lý cấu hình website.";
}

export async function getSiteSettings(): Promise<SiteSetting | null> {
  const response = await fetch("/api/site-settings", { cache: "no-store" });
  if (response.status === 404) return null;
  if (!response.ok) throw new Error(await errorMessage(response));
  return response.json();
}

export async function createSiteSetting(
  draft: SiteSettingsDraft,
): Promise<SiteSetting> {
  const response = await fetch("/api/site-settings", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(draft),
  });
  if (!response.ok) throw new Error(await errorMessage(response));
  return response.json();
}

export async function saveSiteSettingTab(
  tab: BrandingTab,
  data: unknown,
): Promise<SiteSetting> {
  const response = await fetch(`/api/site-settings/${tab}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error(await errorMessage(response));
  const saved = await getSiteSettings();
  if (!saved) throw new Error("Không tìm thấy cấu hình vừa lưu.");
  return saved;
}
