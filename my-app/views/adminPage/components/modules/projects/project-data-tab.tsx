"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Edit, Loader2, Search, Trash2 } from "lucide-react";
import {
  deleteProject,
  getProjectById,
  getProjects,
} from "../../../services/projects/page-project.service";
import type {
  ProjectCategory,
  ProjectDetail,
  ProjectItem,
} from "../../../types/projects/project-data.type";
import { ProjectFormModal } from "./project-form-modal";
import { CategoryFilterSelect } from "../category-filter-select";
import { PagePagination } from "@/shared/components/page-pagination";
import { useDebouncedValue } from "@/shared/hooks/use-debounced-value";
import { deleteManagedImageByUrl } from "../../../services/image-upload.service";

interface ProjectDataTabProps {
  categories: ProjectCategory[];
  filterHost: HTMLDivElement | null;
  createOpen: boolean;
  onCloseCreate: () => void;
}

export function ProjectDataTab({ categories, filterHost, createOpen, onCloseCreate }: ProjectDataTabProps) {
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const normalizedSearch = search.trim();
  const debouncedSearch = useDebouncedValue(normalizedSearch, 500);
  const searchPending = normalizedSearch !== debouncedSearch;
  const [categoryId, setCategoryId] = useState("");
  const [refresh, setRefresh] = useState(0);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [editingProject, setEditingProject] = useState<ProjectDetail | null>(
    null,
  );
  const [modalOpen, setModalOpen] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [cleanupWarning, setCleanupWarning] = useState("");

  useEffect(() => {
    if (searchPending) return;
    let mounted = true;
    getProjects(page, debouncedSearch, categoryId)
      .then((result) => {
        if (!mounted) return;
        setProjects(result.data);
        setTotalPages(result.meta.totalPages);
        setError("");
      })
      .catch((err: Error) => {
        if (mounted) setError(err.message);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, [page, debouncedSearch, searchPending, categoryId, refresh]);

  async function openEdit(id: number) {
    setEditingId(id);
    setError("");
    try {
      const project = await getProjectById(id);
      setEditingProject(project);
      setModalOpen(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Không thể tải dự án.");
    } finally {
      setEditingId(null);
    }
  }

  function handleSaved(cleanupWarning?: string | null) {
    setModalOpen(false);
    onCloseCreate();
    setEditingProject(null);
    setMessage("Đã lưu dự án thành công.");
    setCleanupWarning(cleanupWarning ? `Đã lưu dự án nhưng chưa xóa được ảnh cũ: ${cleanupWarning}` : "");
    setLoading(true);
    setRefresh((value) => value + 1);
  }

  async function handleDelete(project: ProjectItem) {
    if (!window.confirm(`Bạn có chắc chắn muốn xóa dự án "${project.name}"?`)) return;
    setDeletingId(project.id);
    setError("");
    setMessage("");
    setCleanupWarning("");
    try {
      await deleteProject(project.id);
      try {
        await deleteManagedImageByUrl(project.image);
      } catch (cleanupError) {
        setCleanupWarning(`Đã xóa dự án nhưng chưa xóa được ảnh: ${cleanupError instanceof Error ? cleanupError.message : "Lỗi không xác định"}`);
      }
      setMessage(`Đã xóa dự án "${project.name}" thành công.`);
      setLoading(true);
      if (projects.length === 1 && page > 1) {
        setPage(page - 1);
      } else {
        setRefresh((value) => value + 1);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Không thể xóa dự án.");
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-2 overflow-hidden">
      {error && (
        <p
          role="alert"
          className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700"
        >
          {error}
        </p>
      )}
      {message && (
        <p
          role="status"
          className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-700"
        >
          {message}
        </p>
      )}
      {cleanupWarning && (
        <p role="alert" className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
          {cleanupWarning}
        </p>
      )}

      {filterHost && createPortal(<div className="grid grid-cols-1 gap-2 sm:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] sm:gap-3">
        <div className="relative min-w-0">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
          <input
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
              setPage(1);
              if (event.target.value.trim() !== debouncedSearch) setLoading(true);
            }}
            placeholder="Tìm dự án theo tên"
            className="w-full rounded-xl border border-[#f3e9db] bg-white py-2 pl-10 pr-4 text-sm focus:border-[#a21f1f] focus:outline-none sm:py-2.5"
          />
        </div>
        <CategoryFilterSelect
          label="Lọc danh mục dự án"
          value={categoryId}
          options={categories}
          fullWidth
          onChange={(value) => {
            setCategoryId(value);
            setPage(1);
            setLoading(true);
          }}
        />
      </div>, filterHost)}

      <div className="min-h-0 flex-1 overflow-auto rounded-2xl border border-[#f3e9db] bg-white shadow-xs">
        {loading || searchPending ? (
          <div className="flex items-center justify-center gap-2 py-16 text-sm text-stone-500">
            <Loader2 className="h-5 w-5 animate-spin" /> Đang tải dự án...
          </div>
        ) : projects.length === 0 ? (
          <p className="py-16 text-center text-sm text-stone-500">
            Chưa có dự án phù hợp.
          </p>
        ) : (
          <table className="w-full min-w-[960px] table-fixed text-left text-sm">
            <thead className="border-b border-[#f3e9db] bg-[#f7f5f1] text-stone-700">
              <tr>
                <th className="w-80 whitespace-nowrap px-5 py-2.5 sm:py-3">Dự án</th>
                <th className="w-64 whitespace-nowrap px-4 py-2.5 sm:py-3">Danh mục</th>
                <th className="whitespace-nowrap px-4 py-2.5 sm:py-3">Mô tả</th>
                <th className="w-48 min-w-48 px-4 py-2.5 sm:py-3">
                  <div className="grid grid-cols-2 gap-1">
                    <span className="text-center">Thao tác</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f3e9db]">
              {projects.map((project) => (
                <tr key={project.id}>
                  <td className="px-5 py-2 sm:py-3">
                    <div className="flex min-w-0 items-center gap-3">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={project.image}
                        alt=""
                        className="h-9 w-11 rounded-lg object-cover sm:h-12 sm:w-14"
                      />
                      <div className="min-w-0 flex-1">
                        <span className="block truncate font-bold text-[#1E1917]" title={project.name}>
                          {project.name}
                        </span>
                        <span className="block truncate text-xs text-stone-500">
                          #{project.id}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-2 text-stone-600 sm:py-3">
                    <span className="block truncate" title={project.category.name}>{project.category.name}</span>
                  </td>
                  <td className="px-4 py-2 text-stone-600 sm:py-3">
                    <span className="block truncate" title={project.description}>{project.description}</span>
                  </td>
                  <td className="w-48 min-w-48 whitespace-nowrap px-4 py-2 sm:py-3">
                    <div className="grid grid-cols-2 gap-1">
                      <button
                        type="button"
                        disabled={editingId === project.id || deletingId === project.id}
                        onClick={() => openEdit(project.id)}
                        className="inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-lg px-2 py-2 font-semibold text-[#9A1C1F] transition-colors enabled:hover:bg-[#FAF1EC] disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {editingId === project.id ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Edit className="h-4 w-4" />
                        )}{" "}
                        Sửa
                      </button>
                      <button
                        type="button"
                        disabled={deletingId === project.id || editingId === project.id}
                        onClick={() => handleDelete(project)}
                        className="inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-lg px-2 py-2 font-semibold text-red-700 transition-colors enabled:hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                        aria-label={`Xóa dự án ${project.name}`}
                      >
                        {deletingId === project.id ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Trash2 className="h-4 w-4" />
                        )}{" "}
                        Xóa
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <PagePagination
        page={page}
        totalPages={totalPages}
        disabled={loading || searchPending}
        onPageChange={(nextPage) => {
          setPage(nextPage);
          setLoading(true);
        }}
      />

      {(modalOpen || createOpen) && (
        <ProjectFormModal
          key={createOpen ? "new" : (editingProject?.id ?? "new")}
          categories={categories}
          project={createOpen ? null : editingProject}
          onClose={() => {
            setModalOpen(false);
            onCloseCreate();
          }}
          onSaved={handleSaved}
        />
      )}
    </div>
  );
}
