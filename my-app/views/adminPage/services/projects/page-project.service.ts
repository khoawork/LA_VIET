import type {
  PageProjectData,
  PageProjectSection,
} from "../../types/projects/page-project.type";
import type {
  ProjectCategory,
  ProjectDetail,
  ProjectFormData,
  ProjectListResult,
} from "../../types/projects/project-data.type";

async function readError(response: Response) {
  const body = await response.json().catch(() => null);
  const issue = Array.isArray(body?.errors) ? body.errors[0] : null;
  if (issue && typeof issue.message === "string") {
    return issue.field ? `${issue.field}: ${issue.message}` : issue.message;
  }
  return body?.message || "Không thể xử lý dự án. Vui lòng thử lại.";
}

export async function getPageProject(): Promise<PageProjectData> {
  const response = await fetch("/api/pages/projects", { cache: "no-store" });

  if (!response.ok) {
    throw new Error("Không thể tải nội dung trang Dự án.");
  }

  return response.json();
}

export async function savePageProjectSection(
  section: PageProjectSection,
  data: unknown,
) {
  const response = await fetch(`/api/pages/projects/${section}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(await readError(response));
  }
}

export async function getProjectCategories(): Promise<ProjectCategory[]> {
  const response = await fetch("/api/project-categories");
  if (!response.ok) throw new Error(await readError(response));
  return response.json();
}

export async function getProjects(
  page: number,
  search: string,
  categoryId: string,
): Promise<ProjectListResult> {
  const params = new URLSearchParams({ page: String(page), limit: "10" });
  if (search) params.set("search", search);
  if (categoryId) params.set("categoryId", categoryId);

  const response = await fetch(`/api/projects?${params}`, { cache: "no-store" });
  if (!response.ok) throw new Error(await readError(response));
  return response.json();
}

export async function getProjectById(id: number): Promise<ProjectDetail> {
  const response = await fetch(`/api/projects/${id}`, { cache: "no-store" });
  if (!response.ok) throw new Error(await readError(response));
  return response.json();
}

export async function createProject(data: ProjectFormData) {
  const response = await fetch("/api/projects", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error(await readError(response));
}

export async function updateProject(id: number, data: ProjectFormData) {
  const response = await fetch(`/api/projects/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error(await readError(response));
}

export async function deleteProject(id: number) {
  const response = await fetch(`/api/projects/${id}`, { method: "DELETE" });
  if (!response.ok) throw new Error(await readError(response));
}
