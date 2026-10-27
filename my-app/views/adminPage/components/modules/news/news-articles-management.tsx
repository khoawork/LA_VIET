"use client";

import { useState, useEffect } from "react";
import {
  Newspaper,
  Plus,
  Search,
  Trash2,
  X,
  Loader2,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
} from "lucide-react";

import type { NewsCategoryData } from "./news-categories-management";
import { ImageUrlUploadField } from "../image-url-upload-field";

export interface NewsItemData {
  id: number;
  name: string;
  image: string;
  preside: string;
  presideIcon: string;
  date: string;
  description: string;
  button: string;
  slug: string;
  reading: string;
  categoryId: number;
  category?: {
    id: number;
    name: string;
  };
}

interface NewsArticlesManagementProps {
  onArticlesCountChange?: (count: number) => void;
  onCategoriesCountChange?: (count: number) => void;
}

export function NewsArticlesManagement({
  onArticlesCountChange,
  onCategoriesCountChange,
}: NewsArticlesManagementProps) {
  const [newsCategories, setNewsCategories] = useState<NewsCategoryData[]>([]);
  const [newsList, setNewsList] = useState<NewsItemData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [selectedFilterCategory, setSelectedFilterCategory] = useState<string>("");

  // Modal tạo bài viết mới
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const [createSubmitting, setCreateSubmitting] = useState<boolean>(false);
  const [createError, setCreateError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=800",
    categoryId: 1,
    preside: "Ban Nghiên cứu Là Việt",
    presideIcon: "FlaskConical",
    date: "2026-10-14",
    description: "",
    button: "Xem chi tiết",
    reading: "5 phút đọc",
  });

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
      const res = await fetch("/api/news/cates");
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        setNewsCategories(json.data);
        if (onCategoriesCountChange) {
          onCategoriesCountChange(json.data.length);
        }
        if (json.data.length > 0 && !formData.categoryId) {
          setFormData((prev) => ({ ...prev, categoryId: json.data[0].id }));
        }
      }
    } catch (err) {
      console.error("Lỗi tải danh mục:", err);
    }
  };

  // Load danh sách bài viết
  const fetchNewsList = async (search = searchKeyword, catId = selectedFilterCategory) => {
    try {
      setLoading(true);
      let url = "/api/news?limit=50";
      if (search) url += `&search=${encodeURIComponent(search)}`;
      if (catId) url += `&categoryId=${encodeURIComponent(catId)}`;

      const res = await fetch(url);
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        setNewsList(json.data);
        if (onArticlesCountChange) {
          onArticlesCountChange(json.data.length);
        }
      }
    } catch (err) {
      console.error("Lỗi tải bài viết tin tức:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchNewsList();
  }, []);

  // Xử lý tạo bài viết tin tức mới
  const handleCreateNews = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreateError(null);

    if (!formData.name.trim()) {
      setCreateError("Vui lòng nhập tiêu đề bài viết.");
      return;
    }
    if (!formData.description.trim()) {
      setCreateError("Vui lòng nhập mô tả tóm tắt bài viết.");
      return;
    }

    try {
      setCreateSubmitting(true);
      const res = await fetch("/api/news", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          image: formData.image,
          categoryId: Number(formData.categoryId),
          preside: formData.preside,
          presideIcon: formData.presideIcon,
          date: new Date(formData.date).toISOString(),
          description: formData.description,
          button: formData.button,
          reading: formData.reading,
        }),
      });

      const json = await res.json();
      if (json.success) {
        setToast({
          type: "success",
          message: "Đã tạo bài viết tin tức mới thành công!",
        });
        setIsCreateModalOpen(false);
        setFormData({
          name: "",
          image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=800",
          categoryId: newsCategories[0]?.id || 1,
          preside: "Ban Nghiên cứu Là Việt",
          presideIcon: "FlaskConical",
          date: new Date().toISOString().split("T")[0],
          description: "",
          button: "Xem chi tiết",
          reading: "5 phút đọc",
        });
        fetchNewsList();
      } else {
        setCreateError(json.message || "Tạo bài viết thất bại.");
      }
    } catch {
      setCreateError("Lỗi kết nối máy chủ khi tạo bài viết.");
    } finally {
      setCreateSubmitting(false);
    }
  };

  // Xóa bài viết
  const handleDeleteNews = async (id: number, title: string) => {
    if (!confirm(`Bạn có chắc chắn muốn xóa bài viết "${title}"?`)) return;

    try {
      const res = await fetch(`/api/news/${id}`, { method: "DELETE" });
      const json = await res.json();
      if (json.success) {
        setToast({
          type: "success",
          message: `Đã xóa bài viết "${title}" thành công!`,
        });
        fetchNewsList();
      } else {
        setToast({
          type: "error",
          message: json.message || "Xóa bài viết thất bại.",
        });
      }
    } catch {
      setToast({ type: "error", message: "Lỗi kết nối khi xóa bài viết." });
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
            <Newspaper className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-[#1E1917]">
              Quản lý Bài viết Tin tức ({newsList.length})
            </h2>
            <p className="text-xs text-stone-500">
              Quản lý nội dung các bài nghiên cứu di sản, kỹ thuật sơn mài và sự kiện
            </p>
          </div>
        </div>

        <button
          id="btn-open-create-news-modal"
          type="button"
          onClick={() => {
            setCreateError(null);
            setIsCreateModalOpen(true);
          }}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#a21f1f] hover:bg-[#851619] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-sm cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Tạo bài viết mới</span>
        </button>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchKeyword}
            onChange={(e) => {
              setSearchKeyword(e.target.value);
              fetchNewsList(e.target.value, selectedFilterCategory);
            }}
            placeholder="Tìm kiếm bài viết theo tiêu đề, mô tả..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-[#f3e9db] text-xs font-normal text-[#1E1917] focus:outline-none focus:border-[#a21f1f]"
          />
        </div>

        <select
          value={selectedFilterCategory}
          onChange={(e) => {
            setSelectedFilterCategory(e.target.value);
            fetchNewsList(searchKeyword, e.target.value);
          }}
          className="px-4 py-2.5 rounded-xl bg-white border border-[#f3e9db] text-xs font-normal text-[#1E1917] focus:outline-none focus:border-[#a21f1f]"
        >
          <option value="">Tất cả chuyên mục</option>
          {newsCategories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      {/* Table list */}
      <div className="bg-white rounded-2xl border border-[#f3e9db] shadow-xs overflow-hidden">
        {loading ? (
          <div className="py-16 text-center text-xs font-semibold text-stone-500 flex flex-col items-center justify-center gap-2">
            <Loader2 className="w-6 h-6 animate-spin text-[#a21f1f]" />
            <span>Đang tải danh sách bài viết...</span>
          </div>
        ) : newsList.length === 0 ? (
          <div className="py-16 text-center text-xs text-stone-500">
            Chưa có bài viết nào phù hợp. Bấm nút &quot;Tạo bài viết mới&quot; để thêm bài viết đầu tiên.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-[#f7f5f1] border-b border-[#f3e9db] text-stone-700 font-bold uppercase tracking-wider">
                  <th className="py-3.5 px-5">Bài viết</th>
                  <th className="py-3.5 px-4">Chuyên mục</th>
                  <th className="py-3.5 px-4">Tác giả / Chủ trì</th>
                  <th className="py-3.5 px-4">Ngày đăng</th>
                  <th className="py-3.5 px-5 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f3e9db] font-medium text-[#1E1917]">
                {newsList.map((item) => (
                  <tr key={item.id} className="hover:bg-[#f7f5f1]/50 transition-colors">
                    <td className="py-3.5 px-5">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-12 h-10 object-cover rounded-lg border border-[#f3e9db] shrink-0"
                        />
                        <div className="min-w-0 max-w-md">
                          <span className="font-bold text-[#1E1917] block truncate">
                            {item.name}
                          </span>
                          <span className="text-[11px] text-stone-500 font-mono">
                            /{item.slug}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#FAF1EC] text-[#9A1C1F] border border-[#F0DCD6]">
                        {item.category?.name || `Danh mục #${item.categoryId}`}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-stone-600 font-semibold">
                      {item.preside || "Là Việt"}
                    </td>
                    <td className="py-3.5 px-4 text-stone-500 text-[11px]">
                      {new Date(item.date).toLocaleDateString("vi-VN")}
                    </td>
                    <td className="py-3.5 px-5 text-right">
                      <div className="inline-flex items-center gap-1.5">
                        <a
                          href={`/news/${item.slug}`}
                          target="_blank"
                          rel="noreferrer"
                          className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
                          title="Xem trên website"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                        <button
                          type="button"
                          onClick={() => handleDeleteNews(item.id, item.name)}
                          className="p-1.5 rounded-lg text-stone-400 hover:text-red-700 hover:bg-red-50 transition-colors cursor-pointer"
                          title="Xóa bài viết"
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

      {/* MODAL TẠO BÀI VIẾT MỚI */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-[#EAE2D5] overflow-hidden flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between p-5 border-b border-[#EAE2D5] bg-[#FAF8F5]">
              <div className="flex items-center gap-2.5">
                <Newspaper className="w-5 h-5 text-[#9A1C1F]" />
                <h3 className="font-bold text-sm text-[#1E1917] uppercase tracking-wide">
                  Tạo bài viết tin tức mới
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

            <form onSubmit={handleCreateNews} className="p-6 space-y-4 overflow-y-auto">
              {createError && (
                <div className="p-3 rounded-lg bg-rose-50 text-rose-800 text-xs font-semibold flex items-center gap-2 border border-rose-200">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{createError}</span>
                </div>
              )}

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#1E1917]">
                  Tiêu đề bài viết <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Kỹ thuật dát vàng quỳ trên tranh sơn mài..."
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#EAE2D5] text-xs font-normal text-[#1E1917] focus:outline-none focus:border-[#9A1C1F]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#1E1917]">
                    Danh mục chuyên mục <span className="text-red-600">*</span>
                  </label>
                  <select
                    value={formData.categoryId}
                    onChange={(e) =>
                      setFormData({ ...formData, categoryId: Number(e.target.value) })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#EAE2D5] text-xs font-normal text-[#1E1917] bg-white focus:outline-none focus:border-[#9A1C1F]"
                  >
                    {newsCategories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#1E1917]">
                    Tác giả / Ban chủ trì
                  </label>
                  <input
                    type="text"
                    value={formData.preside}
                    onChange={(e) => setFormData({ ...formData, preside: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#EAE2D5] text-xs text-[#1E1917] focus:outline-none focus:border-[#9A1C1F]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#1E1917]">Ngày xuất bản</label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-[#EAE2D5] text-xs text-[#1E1917] focus:outline-none focus:border-[#9A1C1F]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#1E1917]">Thời gian đọc</label>
                  <input
                    type="text"
                    value={formData.reading}
                    onChange={(e) => setFormData({ ...formData, reading: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-[#EAE2D5] text-xs text-[#1E1917] focus:outline-none focus:border-[#9A1C1F]"
                  />
                </div>
              </div>

              <ImageUrlUploadField
                label="Hình ảnh bài viết"
                value={formData.image}
                onChange={(image) => setFormData((current) => ({ ...current, image }))}
              />

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#1E1917]">
                  Mô tả tóm tắt nội dung <span className="text-red-600">*</span>
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Nhập đoạn trích tóm tắt bài viết..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#EAE2D5] text-xs text-[#5C544E] leading-relaxed focus:outline-none focus:border-[#9A1C1F]"
                />
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
                  disabled={createSubmitting}
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-[#a21f1f] hover:bg-[#851619] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-sm disabled:opacity-50 cursor-pointer"
                >
                  {createSubmitting ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Plus className="w-4 h-4" />
                  )}
                  <span>{createSubmitting ? "Đang lưu..." : "Xác nhận tạo bài viết"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

