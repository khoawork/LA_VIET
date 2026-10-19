"use client";

import { useState, useEffect } from "react";
import { CheckCircle2, AlertCircle } from "lucide-react";
import {
  NewsCategoryHeader,
  NewsCategoryPills,
  NewsArticlesTable,
  NewsCategoryManagerModal,
  NewsCreateArticleModal,
  NewsCreateCategoryModal,
  NewsEditCategoryModal,
  type NewsItemData,
  type NewsCategoryData,
} from "./news";

export function AdminNewsCategoryView() {
  // Dữ liệu bài viết & chuyên mục
  const [newsList, setNewsList] = useState<NewsItemData[]>([]);
  const [categories, setCategories] = useState<NewsCategoryData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");

  // Modal tạo bài viết mới
  const [isCreateNewsModalOpen, setIsCreateNewsModalOpen] = useState<boolean>(false);
  const [newsSubmitting, setNewsSubmitting] = useState<boolean>(false);
  const [newsError, setNewsError] = useState<string | null>(null);
  const [newsFormData, setNewsFormData] = useState({
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

  // Modal quản lý danh sách chuyên mục
  const [isCategoryManagerOpen, setIsCategoryManagerOpen] = useState<boolean>(false);

  // Modal tạo chuyên mục mới
  const [isCreateCatModalOpen, setIsCreateCatModalOpen] = useState<boolean>(false);
  const [newCatName, setNewCatName] = useState<string>("");
  const [catSubmitting, setCatSubmitting] = useState<boolean>(false);
  const [createCatError, setCreateCatError] = useState<string | null>(null);

  // Modal sửa tên chuyên mục
  const [isEditCatModalOpen, setIsEditCatModalOpen] = useState<boolean>(false);
  const [editingCategory, setEditingCategory] = useState<NewsCategoryData | null>(null);
  const [editCatSubmitting, setEditCatSubmitting] = useState<boolean>(false);
  const [editCatError, setEditCatError] = useState<string | null>(null);

  // Toast thông báo
  const [toast, setToast] = useState<{ type: "success" | "error"; message: string } | null>(null);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  // 1. Tải danh mục từ API
  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/news/cates");
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        setCategories(json.data);
        if (json.data.length > 0 && !newsFormData.categoryId) {
          setNewsFormData((prev) => ({ ...prev, categoryId: json.data[0].id }));
        }
      }
    } catch (err) {
      console.error("Lỗi tải danh mục:", err);
    }
  };

  // 2. Tải danh sách bài viết từ API
  const fetchNewsList = async (search = searchKeyword, catId = selectedCategoryId) => {
    try {
      setLoading(true);
      let url = "/api/news?limit=50";
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
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchNewsList();
  }, []);

  // 3. Xử lý tạo bài viết mới
  const handleCreateNews = async (e: React.FormEvent) => {
    e.preventDefault();
    setNewsError(null);

    if (!newsFormData.name.trim()) {
      setNewsError("Vui lòng nhập tiêu đề bài viết.");
      return;
    }
    if (!newsFormData.description.trim()) {
      setNewsError("Vui lòng nhập mô tả tóm tắt bài viết.");
      return;
    }

    try {
      setNewsSubmitting(true);
      const res = await fetch("/api/news", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newsFormData.name,
          image: newsFormData.image,
          categoryId: Number(newsFormData.categoryId),
          preside: newsFormData.preside,
          presideIcon: newsFormData.presideIcon,
          date: new Date(newsFormData.date).toISOString(),
          description: newsFormData.description,
          button: newsFormData.button,
          reading: newsFormData.reading,
        }),
      });

      const json = await res.json();
      if (json.success) {
        setToast({
          type: "success",
          message: "Đã tạo bài viết tin tức mới thành công!",
        });
        setIsCreateNewsModalOpen(false);
        setNewsFormData({
          name: "",
          image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=800",
          categoryId: categories[0]?.id || 1,
          preside: "Ban Nghiên cứu Là Việt",
          presideIcon: "FlaskConical",
          date: new Date().toISOString().split("T")[0],
          description: "",
          button: "Xem chi tiết",
          reading: "5 phút đọc",
        });
        fetchNewsList();
        fetchCategories();
      } else {
        setNewsError(json.message || "Tạo bài viết thất bại.");
      }
    } catch {
      setNewsError("Lỗi kết nối máy chủ khi tạo bài viết.");
    } finally {
      setNewsSubmitting(false);
    }
  };

  // 4. Xóa bài viết
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
        fetchCategories();
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

  // 5. Tạo chuyên mục mới
  const handleCreateCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreateCatError(null);
    if (!newCatName.trim()) {
      setCreateCatError("Vui lòng nhập tên chuyên mục.");
      return;
    }

    try {
      setCatSubmitting(true);
      const res = await fetch("/api/news/cates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newCatName.trim() }),
      });
      const json = await res.json();

      if (json.success) {
        setToast({
          type: "success",
          message: `Đã tạo chuyên mục "${newCatName.trim()}" thành công!`,
        });
        setIsCreateCatModalOpen(false);
        setNewCatName("");
        await fetchCategories();
      } else {
        setCreateCatError(json.message || "Tạo chuyên mục thất bại.");
      }
    } catch {
      setCreateCatError("Lỗi kết nối máy chủ khi tạo chuyên mục.");
    } finally {
      setCatSubmitting(false);
    }
  };

  // 6. Cập nhật tên chuyên mục
  const handleUpdateCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCategory || !editingCategory.name.trim()) {
      setEditCatError("Vui lòng nhập tên chuyên mục.");
      return;
    }

    try {
      setEditCatSubmitting(true);
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
        setIsEditCatModalOpen(false);
        setEditingCategory(null);
        await fetchCategories();
        await fetchNewsList();
      } else {
        setEditCatError(json.message || "Cập nhật chuyên mục thất bại.");
      }
    } catch {
      setEditCatError("Lỗi kết nối máy chủ khi cập nhật chuyên mục.");
    } finally {
      setEditCatSubmitting(false);
    }
  };

  // 7. Xóa chuyên mục
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

  return (
    <div style={{ fontFamily: "Arial, Helvetica, sans-serif" }} className="space-y-6">
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

      {/* 1. Header component */}
      <NewsCategoryHeader
        articlesCount={newsList.length}
        categoriesCount={categories.length}
        onOpenCategoryManager={() => setIsCategoryManagerOpen(true)}
        onOpenCreateCategory={() => {
          setCreateCatError(null);
          setNewCatName("");
          setIsCreateCatModalOpen(true);
        }}
        onOpenCreateNews={() => {
          setNewsError(null);
          setIsCreateNewsModalOpen(true);
        }}
      />

      {/* 2. Thanh lọc chuyên mục Pills component */}
      <NewsCategoryPills
        categories={categories}
        selectedCategoryId={selectedCategoryId}
        totalArticlesCount={newsList.length}
        onSelectCategory={(catId) => {
          setSelectedCategoryId(catId);
          fetchNewsList(searchKeyword, catId);
        }}
        onOpenCreateCategory={() => {
          setCreateCatError(null);
          setNewCatName("");
          setIsCreateCatModalOpen(true);
        }}
      />

      {/* 3. Bảng danh sách bài viết tin tức component */}
      <NewsArticlesTable
        newsList={newsList}
        categories={categories}
        loading={loading}
        searchKeyword={searchKeyword}
        selectedCategoryId={selectedCategoryId}
        onSearchChange={(kw) => {
          setSearchKeyword(kw);
          fetchNewsList(kw, selectedCategoryId);
        }}
        onCategoryFilterChange={(catId) => {
          setSelectedCategoryId(catId);
          fetchNewsList(searchKeyword, catId);
        }}
        onDeleteNews={handleDeleteNews}
        onOpenCreateNews={() => {
          setNewsError(null);
          setIsCreateNewsModalOpen(true);
        }}
      />

      {/* 4. Modal Quản lý chuyên mục component */}
      <NewsCategoryManagerModal
        isOpen={isCategoryManagerOpen}
        categories={categories}
        onClose={() => setIsCategoryManagerOpen(false)}
        onOpenCreateCategory={() => {
          setCreateCatError(null);
          setNewCatName("");
          setIsCreateCatModalOpen(true);
        }}
        onOpenEditCategory={(cat) => {
          setEditCatError(null);
          setEditingCategory({ ...cat });
          setIsEditCatModalOpen(true);
        }}
        onDeleteCategory={handleDeleteCategory}
      />

      {/* 5. Modal Tạo bài viết mới component */}
      <NewsCreateArticleModal
        isOpen={isCreateNewsModalOpen}
        categories={categories}
        formData={newsFormData}
        submitting={newsSubmitting}
        error={newsError}
        onClose={() => setIsCreateNewsModalOpen(false)}
        onChange={setNewsFormData}
        onSubmit={handleCreateNews}
      />

      {/* 6. Modal Tạo chuyên mục mới component */}
      <NewsCreateCategoryModal
        isOpen={isCreateCatModalOpen}
        categoryName={newCatName}
        submitting={catSubmitting}
        error={createCatError}
        onClose={() => setIsCreateCatModalOpen(false)}
        onChangeName={setNewCatName}
        onSubmit={handleCreateCategory}
      />

      {/* 7. Modal Sửa chuyên mục component */}
      <NewsEditCategoryModal
        isOpen={isEditCatModalOpen}
        category={editingCategory}
        submitting={editCatSubmitting}
        error={editCatError}
        onClose={() => {
          setIsEditCatModalOpen(false);
          setEditingCategory(null);
        }}
        onChangeName={(name) => {
          if (editingCategory) {
            setEditingCategory({ ...editingCategory, name });
          }
        }}
        onSubmit={handleUpdateCategory}
      />
    </div>
  );
}

// Re-export alias
export { AdminNewsCategoryView as AdminCategoriesView };

