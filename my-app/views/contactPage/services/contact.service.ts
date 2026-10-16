import type { PageContactData } from "../types/contact.type";

export async function getContactPage(): Promise<PageContactData> {
  const response = await fetch("/api/pages/contact", { cache: "no-store" });
  if (!response.ok) throw new Error("Không thể tải nội dung trang Liên hệ.");
  return response.json();
}
