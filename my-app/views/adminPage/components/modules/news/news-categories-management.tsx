"use client";

import { useState, useEffect } from "react";
import {
  Database,
  Plus,
  Edit,
  Trash2,
  X,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

export interface NewsCategoryData {
  id: number;
  name: string;
  _count?: {
    news: number;
  };
}

interface NewsCategoriesManagementProps {
  onCategoriesCountChange?: (count: number) => void;
}

export function NewsCategoriesManagement({
  onCategoriesCountChange,
}: NewsCategoriesManagementProps) {
  const [categories, setCategories] = useState<NewsCategoryData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Modal tạo & sửa chuyên mục
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [editingCategory, setEditingCategory] = useState<NewsCategoryData | null>(null);
  const [newCategoryName, setNewCategoryName] = useState<string>("");
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [modalError, setModalError] = useState<string | null>(null);

  const [toast, setToast] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  // Load danh mục
  const fetchCategories = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/news/cates");
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        setCategories(json.data);
        if (onCategoriesCountChange) {
          onCategoriesCountChange(json.data.length);
        }
      }
    } catch (err) {
      console.error("Lỗi tải chuyên mục:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Tạo chuyên mục mới
  const handleCreateCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    setModalError(null);

    if (!newCategoryName.trim()) {
      setModalError("Vui lòng nhập tên chuyên mục.");
      return;
    }

    try {
      setSubmitting(true);
      const res = await fetch("/api/news/cates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newCategoryName.trim() }),
      });
      const json = await res.json();

      if (json.success) {
        setToast({
          type: "success",
          message: `Đã tạo chuyên mục "${newCategoryName.trim()}" thành công!`,
        });
        setIsCreateModalOpen(false);
        setNewCategoryName("");
        await fetchCategories();
      } else {
        setModalError(json.message || "Tạo chuyên mục thất bại.");
      }
    } catch {
      setModalError("Lỗi kết nối máy chủ khi tạo chuyên mục.");
    } finally {
      setSubmitting(false);
    }
  };

  // Cập nhật chuyên mục
  const handleUpdateCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCategory || !editingCategory.name.trim()) {
      setModalError("Vui lòng nhập tên chuyên mục.");
      return;
    }

    try {
      setSubmitting(true);
      const res = await fetch(`/api/news/cates/${editingCategory.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: editingCategory.name.trim() }),
      });
      const json = await res.json();

      if (json.success) {
        setToast({
          type: "success",
          message: `Đã cập nhật chuyên mục #${editingCategory.id} thành công!`,
        });
        setIsEditModalOpen(false);
        setEditingCategory(null);
        await fetchCategories();
      } else {
        setModalError(json.message || "Cập nhật chuyên mục thất bại.");
      }
    } catch {
      setModalError("Lỗi kết nối máy chủ khi cập nhật chuyên mục.");
    } finally {
      setSubmitting(false);
    }
  };

  // Xóa chuyên mục
  const handleDeleteCategory = async (id: number, name: string) => {
    if (!confirm(`Bạn có chắc chắn muốn xóa chuyên mục "${name}"?`)) return;

    try {
      const res = await fetch(`/api/news/cates/${id}`, { method: "DELETE" });
      const json = await res.json();

      if (json.success) {
        setToast({
          type: "success",
          message: `Đã xóa chuyên mục "${name}" thành công!`,
        });
        await fetchCategories();
      } else {
        setToast({
          type: "error",
          message: json.message || "Không thể xóa chuyên mục này.",
        });
      }
    } catch {
      setToast({ type: "error", message: "Lỗi kết nối khi xóa chuyên mục." });
    }
  };

  return (
    <div className="space-y-5">
      {/* Toast Feedback */}
      {toast && (
        <div
          className={`flex items-center gap-2.5 p-4 rounded-xl text-xs font-semibold ${
            toast.type === "success"
              ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
              : "bg-rose-50 text-rose-800 border border-rose-200"
          }`}
        >
          {toast.type === "success" ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
          )}
          <span>{toast.message}</span>
        </div>
      )}

      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-[#f3e9db] shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#FAF1EC] text-[#9A1C1F] flex items-center justify-center border border-[#F0DCD6]">
            <Database className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-[#1E1917]">
              Chuyên mục Tin tức &amp; Phân loại ({categories.length})
            </h2>
            <p className="text-xs text-stone-500">
              Quản lý danh sách các chuyên mục dùng để phân loại bài viết và lọc tin tức
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => {
            setModalError(null);
            setNewCategoryName("");
            setIsCreateModalOpen(true);
          }}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#a21f1f] hover:bg-[#851619] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-sm cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Tạo chuyên mục mới</span>
        </button>
      </div>

      {/* Table list */}
      <div className="bg-white rounded-2xl border border-[#f3e9db] shadow-xs overflow-hidden">
        {loading ? (
          <div className="py-16 text-center text-xs font-semibold text-stone-500 flex flex-col items-center justify-center gap-2">
            <Loader2 className="w-6 h-6 animate-spin text-[#a21f1f]" />
            <span>Đang tải danh mục...</span>
          </div>
        ) : categories.length === 0 ? (
          <div className="py-16 text-center text-xs text-stone-500">
            Chưa có chuyên mục nào. Bấm nút &quot;Tạo chuyên mục mới&quot; ở trên để thêm chuyên mục đầu tiên.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-[#f7f5f1] border-b border-[#f3e9db] text-stone-700 font-bold uppercase tracking-wider">
                  <th className="py-3.5 px-5">Mã ID</th>
                  <th className="py-3.5 px-5">Tên chuyên mục tin tức</th>
                  <th className="py-3.5 px-4 text-center">Số bài viết</th>
                  <th className="py-3.5 px-4">Phân hệ quản trị</th>
                  <th className="py-3.5 px-5 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f3e9db] font-medium text-[#1E1917]">
                {categories.map((cat) => (
                  <tr key={cat.id} className="hover:bg-[#f7f5f1]/50 transition-colors">
                    <td className="py-3.5 px-5 text-stone-500 font-mono">#{cat.id}</td>
                    <td className="py-3.5 px-5 font-bold text-[#1E1917]">{cat.name}</td>
                    <td className="py-3.5 px-4 text-center">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#FAF1EC] text-[#9A1C1F] border border-[#F0DCD6]">
                        {cat._count?.news ?? 0} bài viết
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-stone-100 text-stone-600">
                        Tin tức &amp; Nghiên cứu Là Việt
                      </span>
                    </td>
                    <td className="py-3.5 px-5 text-right">
                      <div className="inline-flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => {
                            setModalError(null);
                            setEditingCategory({ ...cat });
                            setIsEditModalOpen(true);
                          }}
                          className="p-1.5 rounded-lg text-stone-500 hover:text-[#9A1C1F] hover:bg-stone-100 transition-colors cursor-pointer"
                          title="Chỉnh sửa tên chuyên mục"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteCategory(cat.id, cat.name)}
                          className="p-1.5 rounded-lg text-stone-400 hover:text-red-700 hover:bg-red-50 transition-colors cursor-pointer"
                          title="Xóa chuyên mục"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* MODAL TẠO CHUYÊN MỤC MỚI */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-[#EAE2D5] overflow-hidden flex flex-col">
            <div className="flex items-center justify-between p-5 border-b border-[#EAE2D5] bg-[#FAF8F5]">
              <div className="flex items-center gap-2.5">
                <Database className="w-5 h-5 text-[#9A1C1F]" />
                <h3 className="font-bold text-sm text-[#1E1917] uppercase tracking-wide">
                  Tạo chuyên mục tin tức mới
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsCreateModalOpen(false)}
                className="p-1 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateCategory} className="p-6 space-y-4">
              {modalError && (
                <div className="p-3 rounded-lg bg-rose-50 text-rose-800 text-xs font-semibold flex items-center gap-2 border border-rose-200">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{modalError}</span>
                </div>
              )}

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#1E1917]">
                  Tên chuyên mục bài viết <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Nghiên cứu Vật liệu, Triển lãm Nghệ thuật..."
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#EAE2D5] text-xs font-semibold text-[#1E1917] focus:outline-none focus:border-[#9A1C1F]"
                  autoFocus
                />
                <p className="text-[11px] text-stone-500">
                  Chuyên mục dùng để phân loại dòng bài viết và hiển thị bộ lọc ngoài trang tin tức.
                </p>
              </div>

              <div className="pt-4 border-t border-[#EAE2D5] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-[#EAE2D5] text-xs font-bold text-stone-600 hover:bg-stone-50 cursor-pointer"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-[#a21f1f] hover:bg-[#851619] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-sm disabled:opacity-50 cursor-pointer"
                >
                  {submitting ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Plus className="w-4 h-4" />
                  )}
                  <span>{submitting ? "Đang tạo..." : "Tạo chuyên mục"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL CHỈNH SỬA CHUYÊN MỤC */}
      {isEditModalOpen && editingCategory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-[#EAE2D5] overflow-hidden flex flex-col">
            <div className="flex items-center justify-between p-5 border-b border-[#EAE2D5] bg-[#FAF8F5]">
              <div className="flex items-center gap-2.5">
                <Edit className="w-5 h-5 text-[#9A1C1F]" />
                <h3 className="font-bold text-sm text-[#1E1917] uppercase tracking-wide">
                  Chỉnh sửa chuyên mục #{editingCategory.id}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => {
                  setIsEditModalOpen(false);
                  setEditingCategory(null);
                }}
                className="p-1 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUpdateCategory} className="p-6 space-y-4">
              {modalError && (
                <div className="p-3 rounded-lg bg-rose-50 text-rose-800 text-xs font-semibold flex items-center gap-2 border border-rose-200">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{modalError}</span>
                </div>
              )}

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#1E1917]">
                  Tên chuyên mục <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={editingCategory.name}
                  onChange={(e) =>
                    setEditingCategory({ ...editingCategory, name: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#EAE2D5] text-xs font-semibold text-[#1E1917] focus:outline-none focus:border-[#9A1C1F]"
                  autoFocus
                />
              </div>

              <div className="pt-4 border-t border-[#EAE2D5] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsEditModalOpen(false);
                    setEditingCategory(null);
                  }}
                  className="px-4 py-2 rounded-xl border border-[#EAE2D5] text-xs font-bold text-stone-600 hover:bg-stone-50 cursor-pointer"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-[#a21f1f] hover:bg-[#851619] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-sm disabled:opacity-50 cursor-pointer"
                >
                  {submitting ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <CheckCircle2 className="w-4 h-4" />
                  )}
                  <span>{submitting ? "Đang lưu..." : "Lưu thay đổi"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

