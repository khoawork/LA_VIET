"use client";

import { useState, useEffect } from "react";
import {
  Database,
  Plus,
  Search,
  Edit,
  Trash2,
  Newspaper,
  FolderKanban,
  Package,
  X,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { ProjectDataTab } from "./projects";
import { AdminProductDataTab } from "./admin-product-data-tab";

type CategoryTab = "projectCategories" | "productCategories";
type MainTab = "news" | "projects" | "products";
type CategoryManagerTab = "categories" | CategoryTab;

interface DataCategory {
  id: number;
  name: string;
}

const categoryTabs = {
  projectCategories: { label: "dự án", endpoint: "/api/project-categories" },
  productCategories: { label: "sản phẩm", endpoint: "/api/product-categories" },
} as const;

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

const emptyNewsForm = (categoryId = 0, date = "") => ({
  name: "",
  image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=800",
  categoryId,
  preside: "Ban Nghiên cứu Là Việt",
  presideIcon: "FlaskConical",
  date,
  description: "",
  button: "Xem chi tiết",
  reading: "5 phút đọc",
  slug: "",
});

export function AdminCategoriesView() {
  const [activeMainTab, setActiveMainTab] = useState<MainTab>("news");
  const [projectCreateOpen, setProjectCreateOpen] = useState(false);
  const [productCreateOpen, setProductCreateOpen] = useState(false);
  const [categoryManagerTab, setCategoryManagerTab] = useState<CategoryManagerTab | null>(null);
  
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

  const [dataCategories, setDataCategories] = useState<Record<CategoryTab, DataCategory[]>>({
    projectCategories: [],
    productCategories: [],
  });
  const [dataCategoriesLoading, setDataCategoriesLoading] = useState<Record<CategoryTab, boolean>>({
    projectCategories: true,
    productCategories: true,
  });
  const [dataCategoryModal, setDataCategoryModal] = useState<{ tab: CategoryTab; item: DataCategory | null } | null>(null);
  const [dataCategoryName, setDataCategoryName] = useState("");
  const [dataCategorySubmitting, setDataCategorySubmitting] = useState(false);
  const [dataCategoryError, setDataCategoryError] = useState("");

  // State bài viết tin tức
  const [newsList, setNewsList] = useState<NewsItemData[]>([]);
  const [newsLoading, setNewsLoading] = useState<boolean>(false);
  const [newsPage, setNewsPage] = useState(1);
  const [newsTotalPages, setNewsTotalPages] = useState(1);
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [selectedFilterCategory, setSelectedFilterCategory] = useState<string>("");

  // Modal tạo và sửa bài viết
  const [isNewsModalOpen, setIsNewsModalOpen] = useState(false);
  const [editingNewsId, setEditingNewsId] = useState<number | null>(null);
  const [newsSubmitting, setNewsSubmitting] = useState(false);
  const [newsError, setNewsError] = useState<string | null>(null);
  const [formData, setFormData] = useState(() => emptyNewsForm());

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
        setFormData((prev) => ({
          ...prev,
          categoryId: json.data.some((category: NewsCategoryData) => category.id === prev.categoryId)
            ? prev.categoryId
            : (json.data[0]?.id ?? 0),
        }));
      }
    } catch (err) {
      console.error("Lỗi tải danh mục:", err);
    } finally {
      setCategoriesLoading(false);
    }
  };

  // Tạo chuyên mục mới
  const handleCreateCategory = async (e: React.SubmitEvent<HTMLFormElement>) => {
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
  const handleUpdateCategory = async (e: React.SubmitEvent<HTMLFormElement>) => {
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
  const fetchNewsList = async (search = searchKeyword, catId = selectedFilterCategory, page = newsPage) => {
    try {
      setNewsLoading(true);
      let url = `/api/news?limit=20&page=${page}`;
      if (search) url += `&search=${encodeURIComponent(search)}`;
      if (catId) url += `&categoryId=${encodeURIComponent(catId)}`;

      const res = await fetch(url);
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        setNewsList(json.data);
        setNewsTotalPages(json.meta?.totalPages ?? 1);
      }
    } catch (err) {
      console.error("Lỗi tải bài viết tin tức:", err);
    } finally {
      setNewsLoading(false);
    }
  };

  const fetchDataCategories = async (tab: CategoryTab) => {
    setDataCategoriesLoading((prev) => ({ ...prev, [tab]: true }));
    try {
      const response = await fetch(categoryTabs[tab].endpoint, { cache: "no-store" });
      const data = await response.json();
      if (!response.ok || !Array.isArray(data)) {
        throw new Error(data?.message || `Không thể tải danh mục ${categoryTabs[tab].label}.`);
      }
      setDataCategories((prev) => ({ ...prev, [tab]: data }));
    } catch (error) {
      setToast({ type: "error", message: error instanceof Error ? error.message : "Không thể tải danh mục." });
    } finally {
      setDataCategoriesLoading((prev) => ({ ...prev, [tab]: false }));
    }
  };

  const openDataCategoryModal = (tab: CategoryTab, item: DataCategory | null = null) => {
    setDataCategoryModal({ tab, item });
    setDataCategoryName(item?.name ?? "");
    setDataCategoryError("");
  };

  const openCategoryManager = () => {
    const tab: CategoryManagerTab = activeMainTab === "news"
      ? "categories"
      : activeMainTab === "projects" ? "projectCategories" : "productCategories";
    setCategoryManagerTab(tab);
    if (tab === "categories") {
      setCategoryError(null);
      setNewCategoryName("");
      setIsCreateCategoryModalOpen(true);
    } else {
      openDataCategoryModal(tab);
    }
  };

  const handleSaveDataCategory = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!dataCategoryModal) return;
    const name = dataCategoryName.trim();
    if (!name) {
      setDataCategoryError("Vui lòng nhập tên danh mục.");
      return;
    }

    const { tab, item } = dataCategoryModal;
    setDataCategorySubmitting(true);
    setDataCategoryError("");
    try {
      const response = await fetch(
        item ? `${categoryTabs[tab].endpoint}/${item.id}` : categoryTabs[tab].endpoint,
        {
          method: item ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name }),
        },
      );
      if (!response.ok) {
        const body = await response.json().catch(() => null);
        throw new Error(body?.message || `Không thể lưu danh mục ${categoryTabs[tab].label}.`);
      }
      setDataCategoryModal(null);
      setToast({ type: "success", message: `Đã ${item ? "cập nhật" : "tạo"} danh mục ${categoryTabs[tab].label} thành công.` });
      await fetchDataCategories(tab);
    } catch (error) {
      setDataCategoryError(error instanceof Error ? error.message : "Không thể lưu danh mục.");
    } finally {
      setDataCategorySubmitting(false);
    }
  };

  const handleDeleteDataCategory = async (tab: CategoryTab, item: DataCategory) => {
    if (!window.confirm(`Bạn có chắc chắn muốn xóa danh mục "${item.name}"?`)) return;
    try {
      const response = await fetch(`${categoryTabs[tab].endpoint}/${item.id}`, { method: "DELETE" });
      if (!response.ok) {
        const body = await response.json().catch(() => null);
        throw new Error(body?.message || `Không thể xóa danh mục ${categoryTabs[tab].label}.`);
      }
      setToast({ type: "success", message: `Đã xóa danh mục "${item.name}" thành công.` });
      await fetchDataCategories(tab);
    } catch (error) {
      setToast({ type: "error", message: error instanceof Error ? error.message : "Không thể xóa danh mục." });
    }
  };

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void fetchCategories();
      void fetchNewsList();
      void fetchDataCategories("projectCategories");
      void fetchDataCategories("productCategories");
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  const openCreateNews = () => {
    setEditingNewsId(null);
    setFormData(emptyNewsForm(newsCategories[0]?.id, new Date().toLocaleDateString("sv-SE")));
    setNewsError(null);
    setIsNewsModalOpen(true);
  };

  const openEditNews = (item: NewsItemData) => {
    setEditingNewsId(item.id);
    setFormData({
      name: item.name,
      image: item.image,
      categoryId: item.categoryId,
      preside: item.preside,
      presideIcon: item.presideIcon,
      date: item.date.slice(0, 10),
      description: item.description,
      button: item.button,
      reading: item.reading,
      slug: item.slug,
    });
    setNewsError(null);
    setIsNewsModalOpen(true);
  };

  // Lưu bài viết tin tức
  const handleSaveNews = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setNewsError(null);

    if (!formData.name.trim()) {
      setNewsError("Vui lòng nhập tiêu đề bài viết.");
      return;
    }
    if (!formData.description.trim()) {
      setNewsError("Vui lòng nhập mô tả tóm tắt bài viết.");
      return;
    }
    if (!formData.categoryId || !formData.date) {
      setNewsError("Vui lòng chọn chuyên mục và ngày xuất bản.");
      return;
    }

    try {
      setNewsSubmitting(true);
      const res = await fetch(editingNewsId === null ? "/api/news" : `/api/news/${editingNewsId}`, {
        method: editingNewsId === null ? "POST" : "PUT",
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
          slug: formData.slug.trim() || undefined,
        }),
      });

      const json = await res.json();
      if (json.success) {
        setToast({ type: "success", message: editingNewsId === null ? "Đã tạo bài viết tin tức mới thành công!" : "Đã cập nhật bài viết tin tức thành công!" });
        setIsNewsModalOpen(false);
        setEditingNewsId(null);
        await Promise.all([fetchNewsList(), fetchCategories()]);
      } else {
        setNewsError(json.message || "Không thể lưu bài viết.");
      }
    } catch {
      setNewsError("Lỗi kết nối máy chủ khi lưu bài viết.");
    } finally {
      setNewsSubmitting(false);
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
        if (newsList.length === 1 && newsPage > 1) {
          setNewsPage(newsPage - 1);
          await Promise.all([
            fetchNewsList(searchKeyword, selectedFilterCategory, newsPage - 1),
            fetchCategories(),
          ]);
        } else {
          await Promise.all([fetchNewsList(), fetchCategories()]);
        }
      } else {
        setToast({ type: "error", message: json.message || "Xóa bài viết thất bại." });
      }
    } catch {
      setToast({ type: "error", message: "Lỗi kết nối khi xóa bài viết." });
    }
  };

  const navTabs: { id: MainTab; label: string; icon: typeof Database }[] = [
    { id: "news", label: "Quản lý Tin tức", icon: Newspaper },
    { id: "projects", label: "Quản lý dự án", icon: FolderKanban },
    { id: "products", label: "Quản lý Sản phẩm", icon: Package },
  ];

  return (
    <div className="flex h-full min-h-0 flex-col gap-6 overflow-hidden [&_button]:cursor-pointer [&_button:disabled]:cursor-not-allowed">
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
      <div className="flex shrink-0 flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-[#f3e9db] shadow-xs">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-[#f7f5f1] text-[#a21f1f] flex items-center justify-center border border-[#f3e9db]">
            <Database className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-[#1E1917] sm:text-2xl">Hệ thống: Danh mục &amp; Dữ liệu</h1>
            <p className="mt-0.5 text-sm text-stone-600">
              Quản lý tin tức, dự án, sản phẩm và các danh mục dữ liệu
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
          <button
            type="button"
            onClick={openCategoryManager}
            className="inline-flex items-center gap-2 rounded-xl border border-[#f3e9db] bg-[#FAF1EC] px-5 py-2.5 text-sm font-bold uppercase tracking-wider text-[#a21f1f] shadow-sm transition-all hover:bg-[#F3E2D9]"
          >
            <Plus className="h-4 w-4" /> Thêm danh mục
          </button>
          <button
            type="button"
            title={activeMainTab !== "news" && dataCategories[activeMainTab === "projects" ? "projectCategories" : "productCategories"].length === 0 ? "Hãy tạo danh mục trước" : undefined}
            onClick={() => {
              if (activeMainTab === "news") openCreateNews();
              else if (activeMainTab === "projects") {
                if (dataCategories.projectCategories.length === 0) openCategoryManager();
                else setProjectCreateOpen(true);
              } else {
                if (dataCategories.productCategories.length === 0) openCategoryManager();
                else setProductCreateOpen(true);
              }
            }}
            className="inline-flex items-center gap-2 rounded-xl bg-[#a21f1f] px-5 py-2.5 text-sm font-bold uppercase tracking-wider text-white shadow-sm transition-all hover:bg-[#851619]"
          >
            <Plus className="h-4 w-4" />
            {activeMainTab === "news" ? "Tạo bài viết mới" : activeMainTab === "projects" ? "Tạo dự án mới" : "Tạo sản phẩm mới"}
          </button>
        </div>
      </div>

      {/* Ba tab quản lý dữ liệu */}
      <div className="flex w-full min-w-0 shrink-0 flex-nowrap items-center gap-3 overflow-x-auto overscroll-x-contain border-b border-[#f3e9db] pb-2 touch-pan-x">
        {navTabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  setProjectCreateOpen(false);
                  setProductCreateOpen(false);
                  setActiveMainTab(tab.id);
                }}
                aria-current={activeMainTab === tab.id ? "page" : undefined}
                className={`inline-flex shrink-0 items-center gap-2 whitespace-nowrap px-4 py-2.5 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                  activeMainTab === tab.id
                    ? "bg-[#a21f1f] text-white shadow-sm"
                    : "bg-[#f7f5f1] text-stone-700 hover:bg-[#ede5d8]"
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
        ))}
      </div>

      {activeMainTab === "projects" && (
        <ProjectDataTab
          categories={dataCategories.projectCategories}
          createOpen={projectCreateOpen}
          onCloseCreate={() => setProjectCreateOpen(false)}
        />
      )}
      {activeMainTab === "products" && (
        <AdminProductDataTab
          categories={dataCategories.productCategories}
          createOpen={productCreateOpen}
          onCloseCreate={() => setProductCreateOpen(false)}
        />
      )}

      {/* TAB BÀI VIẾT TIN TỨC */}
      {activeMainTab === "news" && (
         <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-hidden">
          {/* Thanh tìm kiếm & Lọc */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchKeyword}
                onChange={(e) => {
                  setSearchKeyword(e.target.value);
                  setNewsPage(1);
                  void fetchNewsList(e.target.value, selectedFilterCategory, 1);
                }}
                placeholder="Tìm kiếm bài viết theo tiêu đề, mô tả..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-[#f3e9db] text-sm font-medium text-[#1E1917] focus:outline-none focus:border-[#a21f1f]"
              />
            </div>

            <select
              value={selectedFilterCategory}
              onChange={(e) => {
                setSelectedFilterCategory(e.target.value);
                setNewsPage(1);
                void fetchNewsList(searchKeyword, e.target.value, 1);
              }}
              className="px-4 py-2.5 rounded-xl bg-white border border-[#f3e9db] text-sm font-semibold text-[#1E1917]"
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
          <div className="min-h-0 flex-1 overflow-auto rounded-2xl border border-[#f3e9db] bg-white shadow-xs">
            {newsLoading ? (
              <div className="py-16 text-center text-sm font-semibold text-stone-500 flex flex-col items-center justify-center gap-2">
                <Loader2 className="w-6 h-6 animate-spin text-[#a21f1f]" />
                <span>Đang tải danh sách bài viết...</span>
              </div>
            ) : newsList.length === 0 ? (
              <div className="py-16 text-center text-sm text-stone-500">
                Chưa có bài viết nào. Hãy bấm nút &quot;Tạo bài viết mới&quot; ở trên để thêm bài viết đầu tiên.
              </div>
            ) : (
              <table className="w-full min-w-[1120px] table-fixed border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#f3e9db] bg-[#f7f5f1] font-bold text-stone-700">
                    <th className="w-96 whitespace-nowrap px-5 py-3.5">Bài viết</th>
                    <th className="w-52 whitespace-nowrap px-4 py-3.5">Chuyên mục</th>
                    <th className="w-52 whitespace-nowrap px-4 py-3.5">Tác giả / chủ trì</th>
                    <th className="w-32 whitespace-nowrap px-4 py-3.5">Ngày đăng</th>
                    <th className="w-48 min-w-48 px-4 py-3.5">
                      <div className="grid grid-cols-2 gap-1">
                        <span className="text-center">Thao tác</span>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#f3e9db] font-medium text-[#1E1917]">
                  {newsList.map((item) => (
                    <tr key={item.id} className="hover:bg-[#f7f5f1]/50 transition-colors">
                      <td className="py-3.5 px-5">
                         <div className="flex min-w-0 items-center gap-3">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-12 h-10 object-cover rounded-lg border border-[#f3e9db] shrink-0"
                          />
                           <div className="min-w-0 flex-1">
                            <span className="font-bold text-[#1E1917] block truncate">
                              {item.name}
                            </span>
                             <span className="block truncate font-mono text-xs text-stone-500">
                              /{item.slug}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                         <span className="block truncate rounded-full border border-[#F0DCD6] bg-[#FAF1EC] px-2.5 py-0.5 text-xs font-bold text-[#9A1C1F]" title={item.category?.name}>
                          {item.category?.name || `Danh mục #${item.categoryId}`}
                        </span>
                      </td>
                       <td className="py-3.5 px-4 text-stone-600 font-semibold">
                         <span className="block truncate" title={item.preside}>{item.preside || "Là Việt"}</span>
                      </td>
                       <td className="whitespace-nowrap py-3.5 px-4 text-stone-500">
                        {new Date(item.date).toLocaleDateString("vi-VN")}
                      </td>
                      <td className="w-48 min-w-48 whitespace-nowrap px-4 py-3.5">
                        <div className="grid grid-cols-2 gap-1">
                          <button
                            type="button"
                            onClick={() => openEditNews(item)}
                            className="inline-flex items-center justify-center gap-1.5 rounded-lg px-2 py-2 font-semibold text-[#9A1C1F] hover:bg-[#FAF1EC] transition-colors cursor-pointer"
                            title="Sửa bài viết"
                            aria-label={`Sửa bài viết ${item.name}`}
                          >
                            <Edit className="w-4 h-4" /> Sửa
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteNews(item.id, item.name)}
                            className="inline-flex items-center justify-center gap-1.5 rounded-lg px-2 py-2 font-semibold text-red-700 hover:bg-red-50 transition-colors cursor-pointer"
                            title="Xóa bài viết"
                            aria-label={`Xóa bài viết ${item.name}`}
                          >
                            <Trash2 className="w-4 h-4" /> Xóa
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
          <div className="flex shrink-0 items-center justify-between text-sm text-stone-600">
            <span>Trang {newsPage}/{newsTotalPages}</span>
            <div className="flex gap-2">
              <button
                type="button"
                disabled={newsLoading || newsPage <= 1}
                onClick={() => {
                  setNewsPage(newsPage - 1);
                  void fetchNewsList(searchKeyword, selectedFilterCategory, newsPage - 1);
                }}
                className="rounded-lg border border-[#f3e9db] bg-white px-3 py-2 disabled:opacity-50"
              >
                Trước
              </button>
              <button
                type="button"
                disabled={newsLoading || newsPage >= newsTotalPages}
                onClick={() => {
                  setNewsPage(newsPage + 1);
                  void fetchNewsList(searchKeyword, selectedFilterCategory, newsPage + 1);
                }}
                className="rounded-lg border border-[#f3e9db] bg-white px-3 py-2 disabled:opacity-50"
              >
                Sau
              </button>
            </div>
          </div>
        </div>
      )}

      {categoryManagerTab && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50 p-4">
          <div className="flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-[#f7f5f1] shadow-2xl">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#EAE2D5] bg-white p-5">
              <h2 className="text-lg font-bold text-[#1E1917]">
                Danh mục {categoryManagerTab === "categories" ? "Tin tức" : categoryTabs[categoryManagerTab].label}
              </h2>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    if (categoryManagerTab === "categories") {
                      setCategoryError(null);
                      setNewCategoryName("");
                      setIsCreateCategoryModalOpen(true);
                    } else {
                      openDataCategoryModal(categoryManagerTab);
                    }
                  }}
                   className="inline-flex items-center gap-2 rounded-xl bg-[#a21f1f] px-4 py-2.5 text-sm font-bold text-white"
                >
                  <Plus className="h-4 w-4" /> Thêm danh mục
                </button>
                <button type="button" onClick={() => setCategoryManagerTab(null)} aria-label="Đóng danh mục" className="rounded-lg p-2 text-stone-500 hover:bg-stone-100"><X className="h-5 w-5" /></button>
              </div>
            </div>
            <div className="space-y-4 overflow-y-auto p-5">
      {/* DANH MỤC TIN TỨC */}
      {categoryManagerTab === "categories" && (
        <div className="space-y-4">
          {/* Header Bar của Tab Danh mục */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-[#f3e9db] shadow-xs">
             <div className="text-sm font-semibold text-stone-600">
              Tổng cộng có <span className="font-bold text-[#9A1C1F]">{newsCategories.length}</span> chuyên mục bài viết
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-[#f3e9db] shadow-xs overflow-hidden">
            {categoriesLoading ? (
               <div className="py-16 text-center text-sm font-semibold text-stone-500 flex flex-col items-center justify-center gap-2">
                <Loader2 className="w-6 h-6 animate-spin text-[#a21f1f]" />
                <span>Đang tải danh mục...</span>
              </div>
            ) : newsCategories.length === 0 ? (
               <div className="py-16 text-center text-sm text-stone-500">
                Chưa có chuyên mục nào. Bấm nút &quot;Tạo chuyên mục mới&quot; ở trên để thêm chuyên mục đầu tiên.
              </div>
            ) : (
               <table className="w-full min-w-[760px] table-fixed border-collapse text-left text-sm">
                <thead>
                   <tr className="border-b border-[#f3e9db] bg-[#f7f5f1] font-bold text-stone-700">
                     <th className="w-20 px-5 py-3.5">ID</th>
                     <th className="w-64 px-5 py-3.5">Tên danh mục tin tức</th>
                     <th className="w-28 px-4 py-3.5 text-center">Số bài viết</th>
                     <th className="w-44 px-4 py-3.5">Phân hệ</th>
                     <th className="w-28 px-5 py-3.5 text-right">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#f3e9db] font-medium text-[#1E1917]">
                  {newsCategories.map((cat) => (
                    <tr key={cat.id} className="hover:bg-[#f7f5f1]/50 transition-colors">
                      <td className="py-3.5 px-5 text-stone-500 font-mono">#{cat.id}</td>
                       <td className="py-3.5 px-5 font-bold text-[#1E1917]"><span className="block truncate" title={cat.name}>{cat.name}</span></td>
                      <td className="py-3.5 px-4 text-center">
                         <span className="inline-block whitespace-nowrap rounded-full border border-[#F0DCD6] bg-[#FAF1EC] px-2.5 py-0.5 text-xs font-bold text-[#9A1C1F]">
                          {cat._count?.news ?? 0} bài viết
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                         <span className="block truncate rounded-md bg-stone-100 px-2 py-0.5 text-xs font-semibold text-stone-600">
                           Tin tức &amp; nghiên cứu
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

      {(categoryManagerTab === "projectCategories" || categoryManagerTab === "productCategories") && (
        <div className="space-y-4">
           <div className="rounded-2xl border border-[#f3e9db] bg-white p-4 text-sm font-semibold text-stone-600 shadow-xs">
            Tổng cộng có <span className="font-bold text-[#9A1C1F]">{dataCategories[categoryManagerTab].length}</span> danh mục {categoryTabs[categoryManagerTab].label}
          </div>
          <div className="overflow-x-auto rounded-2xl border border-[#f3e9db] bg-white shadow-xs">
            {dataCategoriesLoading[categoryManagerTab] ? (
               <div className="flex items-center justify-center gap-2 py-16 text-sm text-stone-500">
                <Loader2 className="h-5 w-5 animate-spin" /> Đang tải danh mục...
              </div>
            ) : dataCategories[categoryManagerTab].length === 0 ? (
               <p className="py-16 text-center text-sm text-stone-500">
                Chưa có danh mục {categoryTabs[categoryManagerTab].label}. Bấm nút tạo danh mục ở trên để thêm danh mục đầu tiên.
              </p>
            ) : (
               <table className="w-full min-w-[620px] table-fixed text-left text-sm">
                <thead className="border-b border-[#f3e9db] bg-[#f7f5f1] text-stone-700">
                  <tr>
                     <th className="w-20 px-5 py-3">ID</th>
                     <th className="px-5 py-3">Tên danh mục {categoryTabs[categoryManagerTab].label}</th>
                     <th className="w-44 px-5 py-3 text-right">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#f3e9db]">
                  {dataCategories[categoryManagerTab].map((item) => (
                    <tr key={item.id}>
                      <td className="px-5 py-3 font-mono text-stone-500">#{item.id}</td>
                       <td className="px-5 py-3 font-bold text-[#1E1917]"><span className="block truncate" title={item.name}>{item.name}</span></td>
                      <td className="px-5 py-3 text-right whitespace-nowrap">
                        <button
                          type="button"
                          onClick={() => openDataCategoryModal(categoryManagerTab, item)}
                          className="inline-flex items-center gap-1 rounded-lg px-3 py-2 font-semibold text-[#9A1C1F] hover:bg-[#FAF1EC]"
                          aria-label={`Sửa danh mục ${item.name}`}
                        >
                          <Edit className="h-4 w-4" /> Sửa
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteDataCategory(categoryManagerTab, item)}
                          className="inline-flex items-center gap-1 rounded-lg px-3 py-2 font-semibold text-red-700 hover:bg-red-50"
                          aria-label={`Xóa danh mục ${item.name}`}
                        >
                          <Trash2 className="h-4 w-4" /> Xóa
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}

            </div>
          </div>
        </div>
      )}

      {dataCategoryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md overflow-hidden rounded-2xl border border-[#EAE2D5] bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#EAE2D5] bg-[#FAF8F5] p-5">
              <h3 className="text-sm font-bold text-[#1E1917]">
                {dataCategoryModal.item ? "Sửa" : "Tạo"} danh mục {categoryTabs[dataCategoryModal.tab].label}
              </h3>
              <button type="button" onClick={() => setDataCategoryModal(null)} aria-label="Đóng" className="text-stone-500 hover:text-[#9A1C1F]">
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleSaveDataCategory} className="space-y-4 p-6">
              {dataCategoryError && <p role="alert" className="rounded-lg bg-rose-50 p-3 text-xs text-rose-700">{dataCategoryError}</p>}
              <label className="block space-y-1.5 text-xs font-semibold text-[#1E1917]">
                Tên danh mục *
                <input
                  required
                  maxLength={100}
                  autoFocus
                  value={dataCategoryName}
                  onChange={(event) => setDataCategoryName(event.target.value)}
                  className="w-full rounded-xl border border-[#EAE2D5] px-3.5 py-2.5 text-xs focus:border-[#9A1C1F] focus:outline-none"
                />
              </label>
              <div className="flex justify-end gap-3 border-t border-[#EAE2D5] pt-4">
                <button type="button" onClick={() => setDataCategoryModal(null)} className="rounded-xl border border-[#EAE2D5] px-4 py-2 text-xs font-semibold">Hủy</button>
                <button type="submit" disabled={dataCategorySubmitting} className="inline-flex items-center gap-2 rounded-xl bg-[#a21f1f] px-5 py-2 text-xs font-bold text-white disabled:opacity-50">
                  {dataCategorySubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
                  {dataCategoryModal.item ? "Lưu thay đổi" : "Tạo danh mục"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL TẠO VÀ SỬA BÀI VIẾT */}
      {isNewsModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-[#EAE2D5] overflow-hidden flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-5 border-b border-[#EAE2D5] bg-[#FAF8F5]">
              <div className="flex items-center gap-2.5">
                <Newspaper className="w-5 h-5 text-[#9A1C1F]" />
                <h3 className="font-bold text-sm text-[#1E1917] uppercase tracking-wide">
                  {editingNewsId === null ? "Tạo bài viết tin tức mới" : "Chỉnh sửa bài viết tin tức"}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsNewsModalOpen(false)}
                aria-label="Đóng"
                className="p-1 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form Body */}
            <form onSubmit={handleSaveNews} className="p-6 space-y-4 overflow-y-auto">
              {newsCategories.length === 0 && (
                <p role="alert" className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-xs text-amber-800">
                  Hãy tạo ít nhất một chuyên mục tin tức trước khi lưu bài viết.
                </p>
              )}
              {newsError && (
                <div className="p-3 rounded-lg bg-rose-50 text-rose-800 text-xs font-semibold flex items-center gap-2 border border-rose-200">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{newsError}</span>
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#1E1917]">Đường dẫn bài viết (slug)</label>
                  <input
                    type="text"
                    maxLength={255}
                    placeholder={editingNewsId === null ? "Tự tạo theo tiêu đề nếu để trống" : "Để trống để giữ đường dẫn hiện tại"}
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-[#EAE2D5] text-xs text-[#1E1917]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#1E1917]">Chữ trên nút</label>
                  <input
                    type="text"
                    maxLength={100}
                    value={formData.button}
                    onChange={(e) => setFormData({ ...formData, button: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-[#EAE2D5] text-xs text-[#1E1917]"
                  />
                </div>
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
                  onClick={() => setIsNewsModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-[#EAE2D5] text-xs font-bold text-stone-600 hover:bg-stone-50"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  disabled={newsSubmitting || newsCategories.length === 0}
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-[#a21f1f] hover:bg-[#851619] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-sm disabled:opacity-50"
                >
                  {newsSubmitting ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : editingNewsId === null ? (
                    <Plus className="w-4 h-4" />
                  ) : (
                    <Edit className="w-4 h-4" />
                  )}
                  <span>{newsSubmitting ? "Đang lưu..." : editingNewsId === null ? "Xác nhận tạo bài viết" : "Lưu thay đổi"}</span>
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
