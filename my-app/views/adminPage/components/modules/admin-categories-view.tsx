"use client";

import { useState, useEffect } from "react";
import {
  Database,
  Plus,
  Search,
  Edit,
  Trash2,
  Newspaper,
  Calendar,
  User,
  Clock,
  X,
  Loader2,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
} from "lucide-react";

interface NewsItemData {
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

interface NewsCategoryData {
  id: number;
  name: string;
  _count?: {
    news: number;
  };
}

export function AdminCategoriesView() {
  const [activeMainTab, setActiveMainTab] = useState<"categories" | "news">("news");
  
  // State danh mục
  const [newsCategories, setNewsCategories] = useState<NewsCategoryData[]>([]);
  const [categoriesLoading, setCategoriesLoading] = useState<boolean>(false);

  // Modal tạo & sửa chuyên mục
  const [isCreateCategoryModalOpen, setIsCreateCategoryModalOpen] = useState<boolean>(false);
  const [isEditCategoryModalOpen, setIsEditCategoryModalOpen] = useState<boolean>(false);
  const [editingCategory, setEditingCategory] = useState<NewsCategoryData | null>(null);
  const [newCategoryName, setNewCategoryName] = useState<string>("");
  const [categorySubmitting, setCategorySubmitting] = useState<boolean>(false);
  const [categoryError, setCategoryError] = useState<string | null>(null);

  // State bài viết tin tức
  const [newsList, setNewsList] = useState<NewsItemData[]>([]);
  const [newsLoading, setNewsLoading] = useState<boolean>(false);
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

  const [toast, setToast] = useState<{ type: "success" | "error"; message: string } | null>(null);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  // Load danh mục
  const fetchCategories = async () => {
    try {
      setCategoriesLoading(true);
      const res = await fetch("/api/news/cates");
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        setNewsCategories(json.data);
        if (json.data.length > 0) {
          setFormData((prev) => ({ ...prev, categoryId: json.data[0].id }));
        }
      }
    } catch (err) {
      console.error("Lỗi tải danh mục:", err);
    } finally {
      setCategoriesLoading(false);
    }
  };

  // Tạo chuyên mục mới
  const handleCreateCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    setCategoryError(null);

    if (!newCategoryName.trim()) {
      setCategoryError("Vui lòng nhập tên chuyên mục.");
      return;
    }

    try {
      setCategorySubmitting(true);
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
        setIsCreateCategoryModalOpen(false);
        setNewCategoryName("");
        await fetchCategories();
      } else {
        setCategoryError(json.message || "Tạo chuyên mục thất bại.");
      }
    } catch {
      setCategoryError("Lỗi kết nối máy chủ khi tạo chuyên mục.");
    } finally {
      setCategorySubmitting(false);
    }
  };

  // Cập nhật chuyên mục
  const handleUpdateCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCategory || !editingCategory.name.trim()) {
      setCategoryError("Vui lòng nhập tên chuyên mục.");
      return;
    }

    try {
      setCategorySubmitting(true);
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
        setIsEditCategoryModalOpen(false);
        setEditingCategory(null);
        await fetchCategories();
      } else {
        setCategoryError(json.message || "Cập nhật chuyên mục thất bại.");
      }
    } catch {
      setCategoryError("Lỗi kết nối máy chủ khi cập nhật chuyên mục.");
    } finally {
      setCategorySubmitting(false);
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
        await fetchNewsList();
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

  // Load danh sách bài viết tin tức
  const fetchNewsList = async (search = searchKeyword, catId = selectedFilterCategory) => {
    try {
      setNewsLoading(true);
      let url = "/api/news?limit=20";
      if (search) url += `&search=${encodeURIComponent(search)}`;
      if (catId) url += `&categoryId=${encodeURIComponent(catId)}`;

      const res = await fetch(url);
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        setNewsList(json.data);
      }
    } catch (err) {
      console.error("Lỗi tải bài viết tin tức:", err);
    } finally {
      setNewsLoading(false);
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
        setToast({ type: "success", message: "Đã tạo bài viết tin tức mới thành công!" });
        setIsCreateModalOpen(false);
        // Reset form
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
    } catch (err) {
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
        setToast({ type: "success", message: `Đã xóa bài viết "${title}" thành công!` });
        fetchNewsList();
      } else {
        setToast({ type: "error", message: json.message || "Xóa bài viết thất bại." });
      }
    } catch {
      setToast({ type: "error", message: "Lỗi kết nối khi xóa bài viết." });
    }
  };

  return (
    <div className="space-y-6">
      {/* Toast thông báo */}
      {toast && (
        <div
          className={`flex items-center gap-2.5 p-4 rounded-xl text-xs font-semibold ${
            toast.type === "success"
              ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
              : "bg-rose-50 text-rose-800 border border-rose-200"
          }`}
        >
          {toast.type === "success" ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          ) : (
            <AlertCircle className="w-4 h-4 text-rose-600" />
          )}
          <span>{toast.message}</span>
        </div>
      )}

      {/* View Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-[#f3e9db] shadow-xs">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-[#f7f5f1] text-[#a21f1f] flex items-center justify-center border border-[#f3e9db]">
            <Database className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-[#1E1917]">Hệ thống: Danh mục &amp; Dữ liệu</h1>
            <p className="text-xs text-stone-600 mt-0.5">
              Quản lý danh mục phân loại và tạo mới các bài viết tin tức, báo cáo chuyên môn
            </p>
          </div>
        </div>

        {activeMainTab === "news" ? (
          <button
            type="button"
            onClick={() => setIsCreateModalOpen(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#a21f1f] hover:bg-[#851619] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-sm cursor-pointer self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Tạo bài viết mới</span>
          </button>
        ) : (
          <button
            type="button"
            onClick={() => {
              setCategoryError(null);
              setNewCategoryName("");
              setIsCreateCategoryModalOpen(true);
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#a21f1f] hover:bg-[#851619] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-sm cursor-pointer self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Tạo chuyên mục mới</span>
          </button>
        )}
      </div>

      {/* Tabs chuyển đổi giữa Bài viết Tin Tức và Danh mục Dữ liệu */}
      <div className="flex items-center gap-3 border-b border-[#f3e9db] pb-2">
        <button
          type="button"
          onClick={() => setActiveMainTab("news")}
          className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeMainTab === "news"
              ? "bg-[#a21f1f] text-white shadow-sm"
              : "bg-[#f7f5f1] text-stone-700 hover:bg-[#ede5d8]"
          }`}
        >
          <Newspaper className="w-4 h-4" />
          <span>Quản lý &amp; Tạo mới Bài viết Tin tức ({newsList.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveMainTab("categories")}
          className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeMainTab === "categories"
              ? "bg-[#a21f1f] text-white shadow-sm"
              : "bg-[#f7f5f1] text-stone-700 hover:bg-[#ede5d8]"
          }`}
        >
          <Database className="w-4 h-4" />
          <span>Danh mục Tin tức ({newsCategories.length})</span>
        </button>
      </div>

      {/* TAB BÀI VIẾT TIN TỨC */}
      {activeMainTab === "news" && (
        <div className="space-y-4">
          {/* Thanh tìm kiếm & Lọc */}
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
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-[#f3e9db] text-xs font-medium text-[#1E1917] focus:outline-none focus:border-[#a21f1f]"
              />
            </div>

            <select
              value={selectedFilterCategory}
              onChange={(e) => {
                setSelectedFilterCategory(e.target.value);
                fetchNewsList(searchKeyword, e.target.value);
              }}
              className="px-4 py-2.5 rounded-xl bg-white border border-[#f3e9db] text-xs font-semibold text-[#1E1917]"
            >
              <option value="">Tất cả danh mục tin tức</option>
              {newsCategories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Bảng danh sách bài viết */}
          <div className="bg-white rounded-2xl border border-[#f3e9db] shadow-xs overflow-hidden">
            {newsLoading ? (
              <div className="py-16 text-center text-xs font-semibold text-stone-500 flex flex-col items-center justify-center gap-2">
                <Loader2 className="w-6 h-6 animate-spin text-[#a21f1f]" />
                <span>Đang tải danh sách bài viết...</span>
              </div>
            ) : newsList.length === 0 ? (
              <div className="py-16 text-center text-xs text-stone-500">
                Chưa có bài viết nào. Hãy bấm nút &quot;Tạo bài viết mới&quot; ở trên để thêm bài viết đầu tiên.
              </div>
            ) : (
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
            )}
          </div>
        </div>
      )}

      {/* TAB DANH MỤC TIN TỨC */}
      {activeMainTab === "categories" && (
        <div className="space-y-4">
          {/* Header Bar của Tab Danh mục */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-[#f3e9db] shadow-xs">
            <div className="text-xs font-semibold text-stone-600">
              Tổng cộng có <span className="font-bold text-[#9A1C1F]">{newsCategories.length}</span> chuyên mục bài viết
            </div>
            <button
              type="button"
              onClick={() => {
                setCategoryError(null);
                setNewCategoryName("");
                setIsCreateCategoryModalOpen(true);
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#a21f1f] hover:bg-[#851619] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-sm cursor-pointer self-start sm:self-auto"
            >
              <Plus className="w-4 h-4" />
              <span>Thêm chuyên mục</span>
            </button>
          </div>

          <div className="bg-white rounded-2xl border border-[#f3e9db] shadow-xs overflow-hidden">
            {categoriesLoading ? (
              <div className="py-16 text-center text-xs font-semibold text-stone-500 flex flex-col items-center justify-center gap-2">
                <Loader2 className="w-6 h-6 animate-spin text-[#a21f1f]" />
                <span>Đang tải danh mục...</span>
              </div>
            ) : newsCategories.length === 0 ? (
              <div className="py-16 text-center text-xs text-stone-500">
                Chưa có chuyên mục nào. Bấm nút &quot;Tạo chuyên mục mới&quot; ở trên để thêm chuyên mục đầu tiên.
              </div>
            ) : (
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-[#f7f5f1] border-b border-[#f3e9db] text-stone-700 font-bold uppercase tracking-wider">
                    <th className="py-3.5 px-5">ID</th>
                    <th className="py-3.5 px-5">Tên danh mục tin tức</th>
                    <th className="py-3.5 px-4 text-center">Số bài viết</th>
                    <th className="py-3.5 px-4">Phân hệ</th>
                    <th className="py-3.5 px-5 text-right">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#f3e9db] font-medium text-[#1E1917]">
                  {newsCategories.map((cat) => (
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
                          Tin tức &amp; Nghiên cứu
                        </span>
                      </td>
                      <td className="py-3.5 px-5 text-right">
                        <div className="inline-flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => {
                              setCategoryError(null);
                              setEditingCategory({ ...cat });
                              setIsEditCategoryModalOpen(true);
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
            )}
          </div>
        </div>
      )}

      {/* MODAL TẠO BÀI VIẾT MỚI */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-[#EAE2D5] overflow-hidden flex flex-col max-h-[90vh]">
            {/* Modal Header */}
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
                className="p-1 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form Body */}
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
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#EAE2D5] text-xs font-semibold text-[#1E1917] focus:outline-none focus:border-[#9A1C1F]"
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
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#EAE2D5] text-xs font-semibold text-[#1E1917] bg-white"
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
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#EAE2D5] text-xs text-[#1E1917]"
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
                    className="w-full px-3.5 py-2 rounded-xl border border-[#EAE2D5] text-xs text-[#1E1917]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#1E1917]">Thời gian đọc</label>
                  <input
                    type="text"
                    value={formData.reading}
                    onChange={(e) => setFormData({ ...formData, reading: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-[#EAE2D5] text-xs text-[#1E1917]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#1E1917]">URL Hình ảnh bài viết</label>
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#EAE2D5] text-xs text-[#1E1917]"
                />
              </div>

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
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#EAE2D5] text-xs text-[#5C544E] leading-relaxed"
                />
              </div>

              {/* Modal Footer Actions */}
              <div className="pt-4 border-t border-[#EAE2D5] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-[#EAE2D5] text-xs font-bold text-stone-600 hover:bg-stone-50"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  disabled={createSubmitting}
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-[#a21f1f] hover:bg-[#851619] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-sm disabled:opacity-50"
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

      {/* MODAL TẠO CHUYÊN MỤC MỚI */}
      {isCreateCategoryModalOpen && (
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
                onClick={() => setIsCreateCategoryModalOpen(false)}
                className="p-1 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateCategory} className="p-6 space-y-4">
              {categoryError && (
                <div className="p-3 rounded-lg bg-rose-50 text-rose-800 text-xs font-semibold flex items-center gap-2 border border-rose-200">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{categoryError}</span>
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
                  onClick={() => setIsCreateCategoryModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-[#EAE2D5] text-xs font-bold text-stone-600 hover:bg-stone-50 cursor-pointer"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  disabled={categorySubmitting}
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-[#a21f1f] hover:bg-[#851619] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-sm disabled:opacity-50 cursor-pointer"
                >
                  {categorySubmitting ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Plus className="w-4 h-4" />
                  )}
                  <span>{categorySubmitting ? "Đang tạo..." : "Tạo chuyên mục"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL CHỈNH SỬA CHUYÊN MỤC */}
      {isEditCategoryModalOpen && editingCategory && (
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
                  setIsEditCategoryModalOpen(false);
                  setEditingCategory(null);
                }}
                className="p-1 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUpdateCategory} className="p-6 space-y-4">
              {categoryError && (
                <div className="p-3 rounded-lg bg-rose-50 text-rose-800 text-xs font-semibold flex items-center gap-2 border border-rose-200">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{categoryError}</span>
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
                    setIsEditCategoryModalOpen(false);
                    setEditingCategory(null);
                  }}
                  className="px-4 py-2 rounded-xl border border-[#EAE2D5] text-xs font-bold text-stone-600 hover:bg-stone-50 cursor-pointer"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  disabled={categorySubmitting}
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-[#a21f1f] hover:bg-[#851619] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-sm disabled:opacity-50 cursor-pointer"
                >
                  {categorySubmitting ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <CheckCircle2 className="w-4 h-4" />
                  )}
                  <span>{categorySubmitting ? "Đang lưu..." : "Lưu thay đổi"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
