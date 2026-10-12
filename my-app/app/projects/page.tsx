"use client";

import { useEffect, useState, useTransition } from "react";
import Link from "next/link";

interface Project {
  id: number;
  name: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
}

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  meta?: {
    page: number;
    limit: number;
    totalItems: number;
    totalPages: number;
  };
  errors?: Array<{ field: string; message: string }>;
  errorCode?: string;
}

export default function ProjectsCrudPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [isPending, startTransition] = useTransition();

  // Search input
  const [searchName, setSearchName] = useState("");

  // Create form
  const [createName, setCreateName] = useState("");
  const [createDesc, setCreateDesc] = useState("");

  // Edit modal / state
  const [editingTarget, setEditingTarget] = useState<Project | null>(null);
  const [editNewName, setEditNewName] = useState("");
  const [editDesc, setEditDesc] = useState("");

  // Toast / Feedback message
  const [notification, setNotification] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const showToast = (type: "success" | "error", text: string) => {
    setNotification({ type, text });
    setTimeout(() => {
      setNotification((curr) => (curr?.text === text ? null : curr));
    }, 4500);
  };

  // 1. GET: Fetch projects list
  const loadProjects = async (filterName?: string) => {
    setLoading(true);
    try {
      const url = filterName?.trim()
        ? `/api/projects?name=${encodeURIComponent(filterName.trim())}`
        : `/api/projects?limit=50`;

      const res = await fetch(url);
      const json: ApiResponse<Project[] | Project> = await res.json();

      if (!res.ok || !json.success) {
        showToast("error", json.message || "Không thể tải danh sách dự án");
        setProjects([]);
        return;
      }

      if (Array.isArray(json.data)) {
        setProjects(json.data);
      } else if (json.data) {
        // Trả về single project khi tìm theo name
        setProjects([json.data]);
      } else {
        setProjects([]);
      }
    } catch {
      showToast("error", "Lỗi kết nối tới máy chủ khi tải dự án");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  // 2. POST: Create project
  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!createName.trim()) {
      showToast("error", "Tên dự án không được để trống");
      return;
    }

    startTransition(async () => {
      try {
        const res = await fetch("/api/projects", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: createName.trim(),
            description: createDesc.trim() || null,
          }),
        });

        const json: ApiResponse<Project> = await res.json();

        if (!res.ok || !json.success) {
          const detailErr = json.errors?.map((e) => e.message).join(", ");
          showToast(
            "error",
            detailErr ? `${json.message}: ${detailErr}` : json.message,
          );
          return;
        }

        showToast("success", `Đã tạo dự án "${json.data?.name}" thành công!`);
        setCreateName("");
        setCreateDesc("");
        loadProjects();
      } catch {
        showToast("error", "Lỗi khi gửi yêu cầu tạo dự án");
      }
    });
  };

  // 3. PUT: Update project by name
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTarget) return;

    startTransition(async () => {
      try {
        const res = await fetch("/api/projects", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: editingTarget.name,
            newName: editNewName.trim() || undefined,
            description: editDesc.trim() || null,
          }),
        });

        const json: ApiResponse<Project> = await res.json();

        if (!res.ok || !json.success) {
          const detailErr = json.errors?.map((e) => e.message).join(", ");
          showToast(
            "error",
            detailErr ? `${json.message}: ${detailErr}` : json.message,
          );
          return;
        }

        showToast("success", `Cập nhật dự án "${json.data?.name}" thành công!`);
        setEditingTarget(null);
        loadProjects();
      } catch {
        showToast("error", "Lỗi khi cập nhật dự án");
      }
    });
  };

  // 4. DELETE: Delete project by name
  const handleDelete = async (name: string) => {
    if (!confirm(`Bạn có chắc chắn muốn xóa dự án "${name}" không?`)) {
      return;
    }

    startTransition(async () => {
      try {
        const res = await fetch(
          `/api/projects?name=${encodeURIComponent(name)}`,
          {
            method: "DELETE",
          },
        );

        const json: ApiResponse<Project> = await res.json();

        if (!res.ok || !json.success) {
          showToast("error", json.message || "Xóa dự án thất bại");
          return;
        }

        showToast("success", `Đã xóa dự án "${name}" thành công!`);
        loadProjects();
      } catch {
        showToast("error", "Lỗi kết nối khi xóa dự án");
      }
    });
  };

  return (
    <div className="min-h-screen bg-neutral-900 text-neutral-100 font-sans">
      {/* Toast notification */}
      {notification && (
        <div
          role="alert"
          className={`fixed top-5 right-5 z-50 px-5 py-3 rounded-xl border text-sm shadow-2xl flex items-center gap-3 transition-all animate-bounce ${
            notification.type === "success"
              ? "bg-emerald-950/90 border-emerald-500 text-emerald-200"
              : "bg-rose-950/90 border-rose-500 text-rose-200"
          }`}
        >
          <span>{notification.type === "success" ? "✓" : "⚠"}</span>
          <p className="font-medium">{notification.text}</p>
          <button
            onClick={() => setNotification(null)}
            className="ml-2 text-xs opacity-70 hover:opacity-100"
          >
            ✕
          </button>
        </div>
      )}

      {/* Header */}
      <header className="border-b border-neutral-800 bg-neutral-950/60 backdrop-blur sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="text-neutral-400 hover:text-white transition-colors text-sm"
            >
              ← Trang chủ
            </Link>
            <span className="text-neutral-600">/</span>
            <h1 className="font-bold text-white text-base">Quản lý Dự án (CRUD Demo)</h1>
          </div>
          <div className="text-xs text-neutral-400 bg-neutral-800/80 px-3 py-1.5 rounded-lg border border-neutral-700">
            CRUD thao tác trực tiếp theo <span className="text-emerald-400 font-mono font-semibold">name</span>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10 space-y-10">
        {/* Banner Info */}
        <section className="p-6 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-neutral-900 to-neutral-900 border border-emerald-500/20">
          <h2 className="text-lg font-bold text-emerald-400">Trang UI Test chức năng Fullstack</h2>
          <p className="text-sm text-neutral-400 mt-1 leading-relaxed">
            Trang này tương tác trực tiếp với API <code className="text-emerald-300 font-mono text-xs">/api/projects</code>. Mọi thao tác thêm, lấy chi tiết, cập nhật và xóa đều được validate bằng Zod Schema từ <code className="text-emerald-300 font-mono text-xs">shared/schema/project.schema.ts</code> và định danh theo <strong>Tên (Name)</strong> thay vì ID.
          </p>
        </section>

        {/* Action Grid: Create Form & Search Form */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Create Form */}
          <div className="lg:col-span-1 p-6 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-5">
            <div className="flex items-center justify-between border-b border-neutral-800/80 pb-3">
              <h3 className="font-semibold text-white text-base">Tạo Dự Án Mới</h3>
              <span className="text-xs bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20">
                POST
              </span>
            </div>

            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                  Tên dự án <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Ví dụ: la-viet-coffee"
                  value={createName}
                  onChange={(e) => setCreateName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-neutral-700 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500 transition-colors"
                  disabled={isPending}
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                  Mô tả dự án
                </label>
                <textarea
                  rows={3}
                  placeholder="Mô tả tóm tắt nội dung dự án..."
                  value={createDesc}
                  onChange={(e) => setCreateDesc(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-neutral-700 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500 transition-colors resize-none"
                  disabled={isPending}
                />
              </div>

              <button
                type="submit"
                disabled={isPending || !createName.trim()}
                className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-neutral-950 font-semibold text-sm transition-colors shadow-[0_0_15px_rgba(16,185,129,0.2)]"
              >
                {isPending ? "Đang xử lý..." : "+ Thêm Dự Án"}
              </button>
            </form>
          </div>

          {/* Project List & Filter */}
          <div className="lg:col-span-2 space-y-6">
            {/* Filter Bar */}
            <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 flex flex-col sm:flex-row gap-3 items-center justify-between">
              <div className="relative w-full sm:w-80">
                <input
                  type="text"
                  placeholder="Tìm kiếm chính xác theo tên..."
                  value={searchName}
                  onChange={(e) => setSearchName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") loadProjects(searchName);
                  }}
                  className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-neutral-900 border border-neutral-700 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500 transition-colors"
                />
                <span className="absolute left-3 top-2.5 text-neutral-500 text-sm">
                  🔍
                </span>
              </div>

              <div className="flex gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => loadProjects(searchName)}
                  className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold border border-neutral-700 transition-colors"
                >
                  Tìm theo tên
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSearchName("");
                    loadProjects();
                  }}
                  className="px-3 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-400 text-xs border border-neutral-800 transition-colors"
                  title="Tải lại tất cả"
                >
                  ↺ Làm mới
                </button>
              </div>
            </div>

            {/* List Table / Cards */}
            <div className="p-6 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-4">
              <div className="flex items-center justify-between border-b border-neutral-800/80 pb-3">
                <h3 className="font-semibold text-white text-base">Danh Sách Dự Án</h3>
                <span className="text-xs text-neutral-500">
                  {projects.length} bản ghi
                </span>
              </div>

              {loading ? (
                <div className="py-12 text-center text-sm text-neutral-500">
                  <div className="inline-block w-6 h-6 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin mb-2" />
                  <p>Đang tải dữ liệu từ API...</p>
                </div>
              ) : projects.length === 0 ? (
                <div className="py-12 text-center text-sm text-neutral-500 space-y-2">
                  <p className="text-3xl">📭</p>
                  <p>Chưa có dự án nào hoặc không tìm thấy kết quả phù hợp.</p>
                  <button
                    onClick={() => {
                      setSearchName("");
                      loadProjects();
                    }}
                    className="text-emerald-400 hover:underline text-xs"
                  >
                    Tải lại danh sách
                  </button>
                </div>
              ) : (
                <div className="divide-y divide-neutral-800/60">
                  {projects.map((proj) => (
                    <article
                      key={proj.id}
                      className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-white text-base group-hover:text-emerald-400 transition-colors">
                            {proj.name}
                          </h4>
                          <span className="text-[10px] bg-neutral-800 text-neutral-400 px-1.5 py-0.5 rounded font-mono">
                            ID: {proj.id}
                          </span>
                        </div>
                        <p className="text-sm text-neutral-400 leading-snug">
                          {proj.description || (
                            <span className="italic text-neutral-600">
                              Chưa có mô tả
                            </span>
                          )}
                        </p>
                        <p className="text-[11px] text-neutral-500">
                          Tạo ngày:{" "}
                          {new Date(proj.createdAt).toLocaleDateString("vi-VN", {
                            hour: "2-digit",
                            minute: "2-digit",
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                          })}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          type="button"
                          onClick={() => {
                            setEditingTarget(proj);
                            setEditNewName(proj.name);
                            setEditDesc(proj.description || "");
                          }}
                          className="px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-medium border border-neutral-700 transition-colors"
                        >
                          ✎ Sửa (PUT)
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(proj.name)}
                          className="px-3 py-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 text-xs font-medium border border-rose-500/30 transition-colors"
                        >
                          ✕ Xóa (DELETE)
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Edit Modal */}
      {editingTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-neutral-950 border border-neutral-800 w-full max-w-md rounded-2xl p-6 shadow-2xl space-y-5 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <h3 className="font-bold text-white text-base">
                Cập Nhật Dự Án theo Tên
              </h3>
              <span className="text-xs bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded border border-amber-500/20">
                PUT
              </span>
            </div>

            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-neutral-400 mb-1">
                  Tên định danh hiện tại
                </label>
                <input
                  type="text"
                  value={editingTarget.name}
                  disabled
                  className="w-full px-3 py-2 rounded-xl bg-neutral-900/60 border border-neutral-800 text-sm text-neutral-400 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">
                  Đổi sang tên mới (newName)
                </label>
                <input
                  type="text"
                  value={editNewName}
                  onChange={(e) => setEditNewName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-700 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors"
                  placeholder="Để trống nếu không đổi tên"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">
                  Mô tả mới
                </label>
                <textarea
                  rows={3}
                  value={editDesc}
                  onChange={(e) => setEditDesc(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-700 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors resize-none"
                  placeholder="Cập nhật mô tả..."
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingTarget(null)}
                  className="px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs font-medium transition-colors"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-semibold text-xs transition-colors"
                >
                  {isPending ? "Đang lưu..." : "Lưu thay đổi"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

