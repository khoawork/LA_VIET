import type { ProjectPageData, ProjectRecord } from "../types/project.type";

export async function getProjectPage(): Promise<ProjectPageData> {
  const response = await fetch("/api/pages/projects", { cache: "no-store" });
  if (!response.ok) throw new Error("Không thể tải nội dung trang Dự án.");
  return response.json();
}

export async function getProjectRecords(): Promise<ProjectRecord[]> {
  const projects: ProjectRecord[] = [];
  let page = 1;
  let hasNextPage = true;

  while (hasNextPage) {
    const response = await fetch(`/api/projects?page=${page}&limit=100`, {
      cache: "no-store",
    });
    if (!response.ok) throw new Error("Không thể tải danh sách dự án.");

    const result = await response.json();
    projects.push(...result.data);
    hasNextPage = result.meta.hasNextPage;
    page += 1;
  }

  return projects;
}
