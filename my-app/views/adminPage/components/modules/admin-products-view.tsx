"use client";

import { useEffect, useState, useTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Package,
  Save,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  Search,
  Filter,
  Layers,
  Sparkles,
  Plus,
  Trash2,
  SlidersHorizontal,
  RefreshCw,
  Info,
} from "lucide-react";
import type { ProductsPagePropsType } from "@/shared/schema/pages/page-product.schema";

interface ProductItem {
  id: number;
  name: string;
  title?: string;
  description?: string;
  image: string;
  slug: string;
  category?: { name: string };
  props?: {
    dimension?: string;
    material?: string;
    badge?: string;
    badgeColor?: string;
    yearOrSpec?: string;
  };
}

export function AdminProductsView() {
  const [loading, setLoading] = useState(true);
  const [isPending, startTransition] = useTransition();
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<"hero" | "products">("hero");

  // Form State
  const [pageName, setPageName] = useState("Trang Sản Phẩm");
  const [pageProps, setPageProps] = useState<ProductsPagePropsType>({
    title: "Bộ Sưu Tập Tác Phẩm Sơn Mài | Là Việt",
    description:
      "Tuyển tập những kiệt tác sơn mài hàn lâm, bình phong và vách nghệ thuật độc bản chế tác thủ công từ cây sơn Phú Thọ.",
    herosection: {
      badge: "GIÁM TUYỂN ĐỘC QUYỀN",
      heading: "DANH MỤC TÁC PHẨM & ỨNG DỤNG SƠN MÀI",
      subHeading: "BẢO TỒN VÀ KHAI MỞ DI SẢN HỘI HOẠ PHƯƠNG ĐÔNG",
      description:
        "Tại xưởng hội hoạ Là Việt, chất liệu sơn ta nguyên bản từ cây sơn Phú Thọ giao thoa cùng tư duy không gian đương đại. Từng nét dát vàng quỳ, cẩn ốc xà cừ hay mài quang kỳ công được chuyển hoá thành các đại hoạ phẩm vách ốp, bàn trà điêu khắc và tác phẩm độc bản – bảo lưu trọn vẹn khí chất phương Đông.",
      metrics: [
        { value: "100%", label: "SƠN TA TỰ NHIÊN" },
        { value: "06+", label: "THÁNG CHẾ TÁC" },
        { value: "ĐỘC BẢN", label: "KHÔNG BẢN SAO" },
      ],
      image: "",
    },
    displayedProductIds: [],
  });

  // Products Data
  const [allProducts, setAllProducts] = useState<ProductItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");

  // Toast / Alert Notification
  const [alert, setAlert] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  // Fetch initial data from API
  const fetchPageData = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/pages/products");
      const json = await res.json();

      if (json.success && json.data) {
        const { page, products } = json.data;
        if (page?.name) setPageName(page.name);
        if (page?.props) {
          // Merge with defaults to guarantee all nested keys exist
          setPageProps((prev) => ({
            ...prev,
            ...page.props,
            herosection: {
              ...prev.herosection,
              ...(page.props.herosection || {}),
              metrics:
                page.props.herosection?.metrics &&
                page.props.herosection.metrics.length > 0
                  ? page.props.herosection.metrics
                  : prev.herosection.metrics,
            },
            displayedProductIds: Array.isArray(page.props.displayedProductIds)
              ? page.props.displayedProductIds
              : prev.displayedProductIds,
          }));
        }

        if (Array.isArray(products)) {
          setAllProducts(products);
          // If no displayed IDs were saved yet, default to all products active
          if (
            !page?.props?.displayedProductIds ||
            page.props.displayedProductIds.length === 0
          ) {
            setPageProps((prev) => ({
              ...prev,
              displayedProductIds: products.map((p) => p.id),
            }));
          }
        }
      }
    } catch (err) {
      console.error("Failed to load products page configuration:", err);
      setAlert({
        type: "error",
        message: "Không thể tải cấu hình trang từ máy chủ. Vui lòng thử lại.",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPageData();
  }, []);

  // Save changes to API
  const handleSave = async () => {
    setSaving(true);
    setAlert(null);
    try {
      const payload = {
        name: pageName,
        slug: "products",
        props: pageProps,
      };

      const res = await fetch("/api/pages/products", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const json = await res.json();

      if (res.ok && json.success) {
        setAlert({
          type: "success",
          message:
            "Đã lưu thành công toàn bộ cấu hình Trang Sản phẩm và danh sách hiển thị tác phẩm!",
        });
      } else {
        const errMsg =
          json.message ||
          (json.errors && Array.isArray(json.errors)
            ? json.errors.map((e: any) => e.message).join(", ")
            : "Lưu thất bại.");
        setAlert({
          type: "error",
          message: `Lỗi: ${errMsg}`,
        });
      }
    } catch (err: any) {
      console.error("Error saving products page config:", err);
      setAlert({
        type: "error",
        message: "Không thể kết nối đến máy chủ. Vui lòng kiểm tra lại mạng.",
      });
    } finally {
      setSaving(false);
    }
  };

  // Product Display Toggle logic
  const handleToggleProduct = (id: number) => {
    const current = pageProps.displayedProductIds || [];
    const isShown = current.includes(id);
    const updated = isShown
      ? current.filter((item) => item !== id)
      : [...current, id];

    setPageProps((prev) => ({
      ...prev,
      displayedProductIds: updated,
    }));
  };

  const handleShowAll = () => {
    setPageProps((prev) => ({
      ...prev,
      displayedProductIds: allProducts.map((p) => p.id),
    }));
  };

  const handleHideAll = () => {
    setPageProps((prev) => ({
      ...prev,
      displayedProductIds: [],
    }));
  };

  // Metrics editing
  const handleMetricChange = (
    index: number,
    field: "value" | "label",
    value: string,
  ) => {
    const updated = [...pageProps.herosection.metrics];
    updated[index] = { ...updated[index], [field]: value };
    setPageProps((prev) => ({
      ...prev,
      herosection: {
        ...prev.herosection,
        metrics: updated,
      },
    }));
  };

  const handleAddMetric = () => {
    setPageProps((prev) => ({
      ...prev,
      herosection: {
        ...prev.herosection,
        metrics: [
          ...prev.herosection.metrics,
          { value: "MỚI", label: "TIÊU CHÍ MỚI" },
        ],
      },
    }));
  };

  const handleRemoveMetric = (index: number) => {
    setPageProps((prev) => ({
      ...prev,
      herosection: {
        ...prev.herosection,
        metrics: prev.herosection.metrics.filter((_, i) => i !== index),
      },
    }));
  };

  // Filter products for the toggle list
  const categoriesList = Array.from(
    new Set(
      allProducts
        .map((p) => p.category?.name || "Khác")
        .filter(Boolean),
    ),
  );

  const filteredProducts = allProducts.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (product.category?.name &&
        product.category.name.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory =
      selectedCategory === "ALL" ||
      (product.category?.name || "Khác") === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const displayedCount = pageProps.displayedProductIds?.length || 0;
  const totalCount = allProducts.length;

  return (
    <div
      style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
      className="space-y-6"
    >
      {/* Toast Alert Banner */}
      {alert && (
        <div
          className={`flex items-center justify-between p-4 rounded-xl border text-xs font-semibold animate-in fade-in transition-all ${
            alert.type === "success"
              ? "bg-[#FAF6F0] border-[#d1a25b] text-[#5A0B0E]"
              : "bg-red-50 border-red-300 text-red-800"
          }`}
        >
          <div className="flex items-center gap-2.5">
            {alert.type === "success" ? (
              <CheckCircle2 className="w-5 h-5 text-[#a21f1f] shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
            )}
            <span>{alert.message}</span>
          </div>
          <button
            type="button"
            onClick={() => setAlert(null)}
            className="text-stone-500 hover:text-stone-800 font-bold px-2 py-0.5 rounded cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}

      {/* Main Header Card */}
      <div className="bg-white p-6 rounded-2xl border border-[#f3e9db] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-5">
        <div className="flex items-start sm:items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-[#f7f5f1] text-[#a21f1f] flex items-center justify-center border border-[#f3e9db] shrink-0 shadow-xs">
            <Package className="w-6 h-6" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-black to-[#a21f1f] bg-clip-text text-transparent">
                Cấu hình Trang Sản phẩm (Product Page)
              </h1>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#f7f5f1] text-[#a21f1f] border border-[#f3e9db]">
                Route: /products
              </span>
            </div>
            <p className="text-xs text-stone-600 mt-1 max-w-2xl">
              Tùy chỉnh nội dung khối giới thiệu (Hero Section), các chỉ số nghệ
              thuật và thiết lập bật/tắt hiển thị từng tác phẩm trên trang
              công khai.
            </p>
          </div>
        </div>

        {/* Action CTAs */}
        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <Link
            href="/products"
            target="_blank"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#f7f5f1] hover:bg-[#f3e9db] text-[#1E1917] text-xs font-bold transition-all border border-[#f3e9db] cursor-pointer"
          >
            <ExternalLink className="w-4 h-4 text-stone-500" />
            <span>Xem trang thực tế</span>
          </Link>

          <button
            type="button"
            onClick={handleSave}
            disabled={saving || loading}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#a21f1f] hover:bg-[#851619] disabled:opacity-50 text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md cursor-pointer"
          >
            {saving ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            <span>{saving ? "Đang lưu..." : "Lưu cấu hình"}</span>
          </button>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex border-b border-[#f3e9db] bg-white rounded-2xl px-4 pt-2 shadow-xs">
        <button
          type="button"
          onClick={() => setActiveTab("hero")}
          className={`flex items-center gap-2 px-5 py-3.5 text-xs font-bold border-b-2 transition-all cursor-pointer ${
            activeTab === "hero"
              ? "border-[#a21f1f] text-[#a21f1f] bg-[#f7f5f1]/60"
              : "border-transparent text-stone-600 hover:text-stone-900"
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>1. Nội dung &amp; Hero Section</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("products")}
          className={`flex items-center gap-2 px-5 py-3.5 text-xs font-bold border-b-2 transition-all cursor-pointer ${
            activeTab === "products"
              ? "border-[#a21f1f] text-[#a21f1f] bg-[#f7f5f1]/60"
              : "border-transparent text-stone-600 hover:text-stone-900"
          }`}
        >
          <SlidersHorizontal className="w-4 h-4" />
          <span>
            2. Chọn Sản phẩm hiển thị ({displayedCount}/{totalCount})
          </span>
        </button>
      </div>

      {/* Tab 1: Hero Section & Intro Content */}
      {activeTab === "hero" && (
        <div className="bg-white p-6 rounded-b-2xl rounded-tr-none border border-[#f3e9db] shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-[#f3e9db]">
            <div>
              <h2 className="text-base font-bold text-[#1E1917]">
                Khối Giới Thiệu Đầu Trang (Hero Banner)
              </h2>
              <p className="text-xs text-stone-500 mt-0.5">
                Chỉnh sửa tiêu đề nghệ thuật, huy hiệu giám tuyển và các thông
                điệp tôn vinh chất liệu sơn ta
              </p>
            </div>
            <span className="px-2.5 py-1 rounded bg-[#f7f5f1] text-[#a21f1f] border border-[#f3e9db] text-[10px] font-bold uppercase tracking-wider">
              Khối trên cùng
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#1E1917] uppercase tracking-wider">
                Huy hiệu giám tuyển (Badge)
              </label>
              <input
                type="text"
                value={pageProps.herosection.badge}
                onChange={(e) =>
                  setPageProps({
                    ...pageProps,
                    herosection: {
                      ...pageProps.herosection,
                      badge: e.target.value,
                    },
                  })
                }
                placeholder="VD: GIÁM TUYỂN ĐỘC QUYỀN"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#f7f5f1]/40 border border-[#f3e9db] text-xs font-medium text-[#1E1917] focus:outline-none focus:border-[#a21f1f]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#1E1917] uppercase tracking-wider">
                Tiêu đề phụ / Dòng giới thiệu (SubHeading)
              </label>
              <input
                type="text"
                value={pageProps.herosection.subHeading || ""}
                onChange={(e) =>
                  setPageProps({
                    ...pageProps,
                    herosection: {
                      ...pageProps.herosection,
                      subHeading: e.target.value,
                    },
                  })
                }
                placeholder="VD: BẢO TỒN VÀ KHAI MỞ DI SẢN HỘI HOẠ PHƯƠNG ĐÔNG"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#f7f5f1]/40 border border-[#f3e9db] text-xs font-medium text-[#1E1917] focus:outline-none focus:border-[#a21f1f]"
              />
            </div>

            <div className="md:col-span-2 space-y-1.5">
              <label className="text-xs font-bold text-[#1E1917] uppercase tracking-wider">
                Tiêu đề chính lớn (Heading) *
              </label>
              <input
                type="text"
                value={pageProps.herosection.heading}
                onChange={(e) =>
                  setPageProps({
                    ...pageProps,
                    herosection: {
                      ...pageProps.herosection,
                      heading: e.target.value,
                    },
                  })
                }
                placeholder="VD: DANH MỤC TÁC PHẨM & ỨNG DỤNG SƠN MÀI"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#f7f5f1]/40 border border-[#f3e9db] text-xs font-bold text-[#1E1917] focus:outline-none focus:border-[#a21f1f]"
              />
            </div>

            <div className="md:col-span-2 space-y-1.5">
              <label className="text-xs font-bold text-[#1E1917] uppercase tracking-wider">
                Nội dung đoạn văn giới thiệu (Hero Description) *
              </label>
              <textarea
                rows={4}
                value={pageProps.herosection.description}
                onChange={(e) =>
                  setPageProps({
                    ...pageProps,
                    herosection: {
                      ...pageProps.herosection,
                      description: e.target.value,
                    },
                  })
                }
                placeholder="Nhập đoạn văn giới thiệu tinh thần chế tác, xưởng sơn mài Là Việt..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#f7f5f1]/40 border border-[#f3e9db] text-xs leading-relaxed font-medium text-[#1E1917] focus:outline-none focus:border-[#a21f1f]"
              />
            </div>

          </div>

          {/* 3 Metrics Configuration */}
          <div className="pt-4 border-t border-[#f3e9db] space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-[#1E1917]">
                  Chỉ số cam kết nghệ thuật (Metrics)
                </h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  Các khối số liệu nổi bật hiển thị bên cạnh đoạn văn bản giới
                  thiệu (Ví dụ: 100% Sơn Ta, 06+ Tháng, Độc bản)
                </p>
              </div>

              <button
                type="button"
                onClick={handleAddMetric}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#f7f5f1] hover:bg-[#f3e9db] text-[#a21f1f] text-xs font-bold border border-[#f3e9db] cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Thêm chỉ số</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {pageProps.herosection.metrics.map((metric, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-[#f7f5f1]/50 border border-[#f3e9db] relative space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-stone-500 uppercase tracking-widest">
                      Chỉ số #{idx + 1}
                    </span>
                    {pageProps.herosection.metrics.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveMetric(idx)}
                        className="text-stone-400 hover:text-red-700 p-1 cursor-pointer"
                        title="Xóa chỉ số này"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-stone-600 uppercase">
                      Giá trị số / Chữ nổi bật
                    </label>
                    <input
                      type="text"
                      value={metric.value}
                      onChange={(e) =>
                        handleMetricChange(idx, "value", e.target.value)
                      }
                      placeholder="100% hoặc ĐỘC BẢN"
                      className="w-full px-3 py-1.5 rounded-lg bg-white border border-[#f3e9db] text-xs font-bold text-[#a21f1f] focus:outline-none focus:border-[#a21f1f]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-stone-600 uppercase">
                      Nhãn giải thích (Label)
                    </label>
                    <input
                      type="text"
                      value={metric.label}
                      onChange={(e) =>
                        handleMetricChange(idx, "label", e.target.value)
                      }
                      placeholder="SƠN TA TỰ NHIÊN"
                      className="w-full px-3 py-1.5 rounded-lg bg-white border border-[#f3e9db] text-xs font-semibold text-stone-800 focus:outline-none focus:border-[#a21f1f]"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Product Display Selection */}
      {activeTab === "products" && (
        <div className="bg-white p-6 rounded-b-2xl rounded-tr-none border border-[#f3e9db] shadow-xs space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#f3e9db]">
            <div>
              <h2 className="text-base font-bold text-[#1E1917]">
                Lựa chọn Sản phẩm hiển thị trên website
              </h2>
              <p className="text-xs text-stone-500 mt-0.5">
                Bật hoặc tắt công tắc để quyết định tác phẩm nào sẽ xuất hiện
                trên trang danh mục sản phẩm công khai (/products).
              </p>
            </div>

            {/* Quick bulk action buttons */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleShowAll}
                className="px-3.5 py-1.5 rounded-lg bg-[#f7f5f1] hover:bg-[#f3e9db] text-[#a21f1f] text-xs font-bold border border-[#f3e9db] cursor-pointer"
              >
                Hiện tất cả ({totalCount})
              </button>
              <button
                type="button"
                onClick={handleHideAll}
                className="px-3.5 py-1.5 rounded-lg bg-white hover:bg-stone-50 text-stone-600 text-xs font-bold border border-[#f3e9db] cursor-pointer"
              >
                Ẩn tất cả
              </button>
            </div>
          </div>

          {/* Scope Boundary Notification as per User Guidance */}
          <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#FAF6F0] border border-[#d1a25b]/60 text-stone-800 text-xs">
            <Info className="w-4 h-4 text-[#a21f1f] shrink-0 mt-0.5" />
            <div className="leading-relaxed">
              <span className="font-bold text-[#a21f1f]">
                Phạm vi chức năng trang này:
              </span>{" "}
              Admin chỉ bật/tắt quyền hiển thị của tác phẩm trên trang này. Việc{" "}
              <strong className="text-stone-900">thêm mới, chỉnh sửa chi tiết và xóa tác phẩm/danh mục</strong>{" "}
              sẽ được thực hiện tập trung tại phân hệ{" "}
              <Link
                href="/admin/system/categories"
                className="font-bold underline text-[#a21f1f] hover:text-[#851619]"
              >
                Hệ thống &gt; Danh mục dữ liệu
              </Link>
              .
            </div>
          </div>

          {/* Search & Category Filter Toolbar */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm kiếm tác phẩm theo tên, danh mục, quy cách..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-[#f3e9db] text-xs font-medium text-[#1E1917] focus:outline-none focus:border-[#a21f1f]"
              />
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
              <button
                type="button"
                onClick={() => setSelectedCategory("ALL")}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  selectedCategory === "ALL"
                    ? "bg-[#a21f1f] text-white"
                    : "bg-[#f7f5f1] text-stone-600 hover:bg-[#f3e9db] border border-[#f3e9db]"
                }`}
              >
                Tất cả ({allProducts.length})
              </button>
              {categoriesList.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                    selectedCategory === cat
                      ? "bg-[#a21f1f] text-white"
                      : "bg-[#f7f5f1] text-stone-600 hover:bg-[#f3e9db] border border-[#f3e9db]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Products List Table */}
          <div className="bg-white rounded-2xl border border-[#f3e9db] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-[#f7f5f1] border-b border-[#f3e9db] text-stone-700 font-bold uppercase tracking-wider">
                    <th className="py-3.5 px-5">Tác phẩm</th>
                    <th className="py-3.5 px-4">Danh mục</th>
                    <th className="py-3.5 px-4">Quy cách / Chất liệu</th>
                    <th className="py-3.5 px-4 text-center">Trạng thái</th>
                    <th className="py-3.5 px-5 text-right">
                      Hiển thị trên /products
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#f3e9db] font-medium text-[#1E1917]">
                  {filteredProducts.map((product) => {
                    const isVisible = (
                      pageProps.displayedProductIds || []
                    ).includes(product.id);

                    return (
                      <tr
                        key={product.id}
                        className={`transition-colors ${
                          isVisible
                            ? "hover:bg-[#f7f5f1]/50"
                            : "bg-stone-50/60 opacity-60 hover:opacity-100"
                        }`}
                      >
                        <td className="py-3.5 px-5">
                          <div className="flex items-center gap-3">
                            <div className="relative w-12 h-12 rounded-lg bg-stone-100 overflow-hidden border border-[#f3e9db] shrink-0">
                              <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                sizes="48px"
                                className="object-cover"
                              />
                            </div>
                            <div>
                              <div className="font-bold text-[#1E1917]">
                                {product.name}
                              </div>
                              <div className="text-[10px] text-stone-500 font-mono mt-0.5">
                                #{product.slug}
                              </div>
                            </div>
                          </div>
                        </td>

                        <td className="py-3.5 px-4">
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#f7f5f1] text-[#a21f1f] border border-[#f3e9db]">
                            {product.category?.name || "Sơn mài"}
                          </span>
                        </td>

                        <td className="py-3.5 px-4 text-stone-600">
                          <div className="truncate max-w-[220px]">
                            {product.props?.dimension || "Tiêu chuẩn Là Việt"}
                          </div>
                          <div className="text-[10px] text-stone-400 truncate max-w-[220px]">
                            {product.props?.material || "Sơn ta truyền thống"}
                          </div>
                        </td>

                        <td className="py-3.5 px-4 text-center">
                          {isVisible ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                              <Eye className="w-3 h-3 text-emerald-600" />
                              <span>Hiển thị</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-stone-100 text-stone-600 border border-stone-200">
                              <EyeOff className="w-3 h-3 text-stone-400" />
                              <span>Đã ẩn</span>
                            </span>
                          )}
                        </td>

                        <td className="py-3.5 px-5 text-right">
                          <button
                            type="button"
                            onClick={() => handleToggleProduct(product.id)}
                            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                              isVisible ? "bg-[#a21f1f]" : "bg-stone-300"
                            }`}
                            aria-label={`Bật tắt hiển thị cho ${product.name}`}
                          >
                            <span
                              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                                isVisible ? "translate-x-5" : "translate-x-0"
                              }`}
                            />
                          </button>
                        </td>
                      </tr>
                    );
                  })}

                  {filteredProducts.length === 0 && (
                    <tr>
                      <td
                        colSpan={5}
                        className="py-10 text-center text-stone-500 font-medium"
                      >
                        Không tìm thấy tác phẩm nào phù hợp với từ khóa &ldquo;{searchQuery}&rdquo;.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}



      {/* Bottom Floating/Sticky Save Toolbar */}
      <div className="flex items-center justify-between p-4 rounded-2xl bg-white border border-[#f3e9db] shadow-sm">
        <div className="flex items-center gap-2 text-xs text-stone-600">
          <Sparkles className="w-4 h-4 text-[#d1a25b]" />
          <span>
            Thay đổi sẽ được áp dụng ngay trên trang{" "}
            <Link
              href="/products"
              target="_blank"
              className="font-bold underline text-[#a21f1f]"
            >
              /products
            </Link>{" "}
            sau khi nhấn &ldquo;Lưu cấu hình&rdquo;.
          </span>
        </div>

        <button
          type="button"
          onClick={handleSave}
          disabled={saving || loading}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#a21f1f] hover:bg-[#851619] disabled:opacity-50 text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md cursor-pointer"
        >
          {saving ? (
            <RefreshCw className="w-4 h-4 animate-spin" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          <span>{saving ? "Đang lưu..." : "Lưu cấu hình"}</span>
        </button>
      </div>
    </div>
  );
}
