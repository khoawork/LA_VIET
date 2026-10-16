"use client";

import { useEffect, useState } from "react";
import { Edit, Loader2, Plus, Search } from "lucide-react";
import {
  getProjectById,
  getProjectCategories,
  getProjects,
} from "../../../services/projects/page-project.service";
import type {
  ProjectCategory,
  ProjectDetail,
  ProjectItem,
} from "../../../types/projects/project-data.type";
import { ProjectFormModal } from "./project-form-modal";

export function ProjectDataTab() {
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [categories, setCategories] = useState<ProjectCategory[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [refresh, setRefresh] = useState(0);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingProject, setEditingProject] = useState<ProjectDetail | null>(
    null,
  );
  const [modalOpen, setModalOpen] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    let mounted = true;
    getProjectCategories()
      .then((data) => {
        if (mounted) setCategories(data);
      })
      .catch((err: Error) => {
        if (mounted) setError(err.message);
      });
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    let mounted = true;
    getProjects(page, search, categoryId)
      .then((result) => {
        if (!mounted) return;
        setProjects(result.data);
        setTotalPages(result.meta.totalPages);
        setTotalItems(result.meta.totalItems);
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
  }, [page, search, categoryId, refresh]);

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

  function handleSaved() {
    setModalOpen(false);
    setEditingProject(null);
    setMessage("Đã lưu dự án thành công.");
    setLoading(true);
    setRefresh((value) => value + 1);
  }

  return (
    <div className="space-y-4">
      {error && (
        <p
          role="alert"
          className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-xs text-rose-700"
        >
          {error}
        </p>
      )}
      {message && (
        <p
          role="status"
          className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-xs text-emerald-700"
        >
          {message}
        </p>
      )}

      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[#f3e9db] bg-white p-4 shadow-xs">
        <p className="text-xs font-semibold text-stone-600">
          Có <span className="font-bold text-[#9A1C1F]">{totalItems}</span> dự
          án trong dữ liệu
        </p>
        <button
          type="button"
          disabled={categories.length === 0}
          onClick={() => {
            setEditingProject(null);
            setModalOpen(true);
            setMessage("");
          }}
          className="inline-flex items-center gap-2 rounded-xl bg-[#a21f1f] px-4 py-2.5 text-xs font-bold text-white disabled:opacity-50"
        >
          <Plus className="h-4 w-4" /> Tạo dự án mới
        </button>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <form
          onSubmit={(event) => {
            event.preventDefault();
            setPage(1);
            setLoading(true);
            setSearch(searchInput.trim());
          }}
          className="relative flex-1"
        >
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
          <input
            value={searchInput}
            onChange={(event) => setSearchInput(event.target.value)}
            placeholder="Tìm dự án theo tên"
            className="w-full rounded-xl border border-[#f3e9db] bg-white py-2.5 pl-10 pr-20 text-xs focus:border-[#a21f1f] focus:outline-none"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg bg-[#f7f5f1] px-3 py-1.5 text-xs font-semibold"
          >
            Tìm
          </button>
        </form>
        <select
          value={categoryId}
          onChange={(event) => {
            setCategoryId(event.target.value);
            setPage(1);
            setLoading(true);
          }}
          className="rounded-xl border border-[#f3e9db] bg-white px-4 py-2.5 text-xs font-semibold"
        >
          <option value="">Tất cả danh mục dự án</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-[#f3e9db] bg-white shadow-xs">
        {loading ? (
          <div className="flex items-center justify-center gap-2 py-16 text-xs text-stone-500">
            <Loader2 className="h-5 w-5 animate-spin" /> Đang tải dự án...
          </div>
        ) : projects.length === 0 ? (
          <p className="py-16 text-center text-xs text-stone-500">
            Chưa có dự án phù hợp.
          </p>
        ) : (
          <table className="w-full text-left text-xs">
            <thead className="border-b border-[#f3e9db] bg-[#f7f5f1] text-stone-700">
              <tr>
                <th className="px-5 py-3">Dự án</th>
                <th className="px-4 py-3">Danh mục</th>
                <th className="px-4 py-3">Mô tả</th>
                <th className="px-5 py-3 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f3e9db]">
              {projects.map((project) => (
                <tr key={project.id}>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={project.image}
                        alt=""
                        className="h-12 w-14 rounded-lg object-cover"
                      />
                      <div>
                        <span className="block font-bold text-[#1E1917]">
                          {project.name}
                        </span>
                        <span className="text-[11px] text-stone-500">
                          #{project.id}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-stone-600">
                    {project.category.name}
                  </td>
                  <td className="max-w-xs truncate px-4 py-3 text-stone-600">
                    {project.description}
                  </td>
                  <td className="px-5 py-3 text-right">
                    <button
                      type="button"
                      disabled={editingId === project.id}
                      onClick={() => openEdit(project.id)}
                      className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 font-semibold text-[#9A1C1F] hover:bg-[#FAF1EC] disabled:opacity-50"
                    >
                      {editingId === project.id ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Edit className="h-4 w-4" />
                      )}{" "}
                      Sửa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="flex items-center justify-between text-xs text-stone-600">
        <span>
          Trang {page}/{totalPages}
        </span>
        <div className="flex gap-2">
          <button
            type="button"
            disabled={page <= 1}
            onClick={() => {
              setPage(page - 1);
              setLoading(true);
            }}
            className="rounded-lg border border-[#f3e9db] bg-white px-3 py-2 disabled:opacity-50"
          >
            Trước
          </button>
          <button
            type="button"
            disabled={page >= totalPages}
            onClick={() => {
              setPage(page + 1);
              setLoading(true);
            }}
            className="rounded-lg border border-[#f3e9db] bg-white px-3 py-2 disabled:opacity-50"
          >
            Sau
          </button>
        </div>
      </div>

      {modalOpen && (
        <ProjectFormModal
          key={editingProject?.id ?? "new"}
          categories={categories}
          project={editingProject}
          onClose={() => setModalOpen(false)}
          onSaved={handleSaved}
        />
      )}
    </div>
  );
}
