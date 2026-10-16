import type { PageContactData, PageContactSection } from "../../types/contact/page-contact.type";

async function errorMessage(response: Response) {
  const body = await response.json().catch(() => null);
  const issue = body?.errors?.[0];
  return issue ? `${issue.field}: ${issue.message}` : body?.message || "Không thể lưu trang Liên hệ.";
}

export async function getPageContact(): Promise<PageContactData> {
  const response = await fetch("/api/pages/contact", { cache: "no-store" });
  if (!response.ok) throw new Error(await errorMessage(response));
  return response.json();
}

export async function savePageContactSection(section: PageContactSection, data: unknown) {
  const response = await fetch(`/api/pages/contact/${section}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error(await errorMessage(response));
}
