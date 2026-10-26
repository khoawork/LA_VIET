import type { ProjectPageData, ProjectRecord } from "../types/project.type";

export async function getProjectPage(): Promise<ProjectPageData> {
  const response = await fetch("/api/pages/projects", { cache: "no-store" });
  if (!response.ok) throw new Error("Không thể tải nội dung trang Dự án.");
  return response.json();
}

export async function getProjectRecords(
  page: number,
  categoryIds = "",
  signal?: AbortSignal,
): Promise<{ projects: ProjectRecord[]; totalPages: number }> {
  const params = new URLSearchParams({ page: String(page) });
  if (categoryIds) params.set("categoryIds", categoryIds);
  const response = await fetch(`/api/projects?${params}`, {
    cache: "no-store",
    signal,
  });
  if (!response.ok) throw new Error("Không thể tải danh sách dự án.");

  const result = await response.json();
  return {
    projects: result.data,
    totalPages: result.meta.totalPages,
  };
}
