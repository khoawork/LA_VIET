"use client";

import { useState, useEffect } from "react";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import type { PageNewPropsType } from "@/views/newPages/types/pagenew.type";
import { DEFAULT_PAGE_NEW_PROPS } from "@/views/newPages/types/pagenew.type";
import {
  NewsMainNav,
  NewsMainTab,
  NewsHeaderActions,
  NewsTabNav,
  SectionTab,
  NewsHeaderTab,
  NewsFeaturedTab,
  NewsArticlesTab,
  NewsStatsTab,
  NewsCtaTab,
  NewsSeoTab,
  NewsSectionPreview,
  NewsArticlesManagement,
  NewsCategoriesManagement,
} from "./news";

interface AdminNewsViewProps {
  initialMainTab?: NewsMainTab;
}

export function AdminNewsView({ initialMainTab = "content" }: AdminNewsViewProps) {
  const [activeMainTab, setActiveMainTab] = useState<NewsMainTab>(initialMainTab);
  const [articlesCount, setArticlesCount] = useState<number | undefined>(undefined);
  const [categoriesCount, setCategoriesCount] = useState<number | undefined>(undefined);

  // States dành cho Tab "Nội dung Website (CMS)"
  const [activeSectionTab, setActiveSectionTab] = useState<SectionTab>("header");
  const [formData, setFormData] = useState<PageNewPropsType>(DEFAULT_PAGE_NEW_PROPS);
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const [alertInfo, setAlertInfo] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  // Đọc query param ?tab= khi mount và khi popstate
  useEffect(() => {
    const parseUrlTab = () => {
      if (typeof window !== "undefined") {
        const params = new URLSearchParams(window.location.search);
        const tab = params.get("tab");
        if (tab === "content" || tab === "articles" || tab === "categories") {
          setActiveMainTab(tab);
        }
      }
    };

    parseUrlTab();
    window.addEventListener("popstate", parseUrlTab);
    return () => window.removeEventListener("popstate", parseUrlTab);
  }, []);

  // Chuyển tab chính và cập nhật query URL
  const handleSelectMainTab = (tab: NewsMainTab) => {
    setActiveMainTab(tab);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.set("tab", tab);
      window.history.pushState(null, "", url.toString());
    }
  };

  // 1. Tải cấu trúc trang từ API
  useEffect(() => {
    async function fetchPageContent() {
      try {
        setLoading(true);
        const res = await fetch("/api/admin/news/page");
        const json = await res.json();
        if (json.success && json.data?.props) {
          setFormData(json.data.props);
        }
      } catch (err) {
        console.error("Lỗi khi tải cấu trúc trang tin tức:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchPageContent();
  }, []);

  // Tự ẩn thông báo sau 4 giây
  useEffect(() => {
    if (alertInfo) {
      const timer = setTimeout(() => setAlertInfo(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [alertInfo]);

  // 2. Lưu thay đổi cấu trúc trang qua API PUT
  const handleSave = async () => {
    try {
      setSaving(true);
      const res = await fetch("/api/admin/news/page", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ props: formData }),
      });
      const json = await res.json();

      if (json.success) {
        setAlertInfo({
          type: "success",
          message: "Đã lưu toàn bộ thay đổi cấu trúc trang Tin tức thành công!",
        });
        if (json.data?.props) {
          setFormData(json.data.props);
        }
      } else {
        setAlertInfo({
          type: "error",
          message: json.message || "Không thể lưu thay đổi, vui lòng thử lại.",
        });
      }
    } catch {
      setAlertInfo({
        type: "error",
        message: "Lỗi kết nối máy chủ khi lưu cấu trúc trang.",
      });
    } finally {
      setSaving(false);
    }
  };

  // 3. Khôi phục về mặc định qua API POST reset
  const handleReset = async () => {
    if (
      !confirm(
        "Bạn có chắc chắn muốn khôi phục toàn bộ nội dung trang Tin tức về mặc định ban đầu?",
      )
    ) {
      return;
    }

    try {
      setSaving(true);
      const res = await fetch("/api/admin/news/page", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "reset" }),
      });
      const json = await res.json();

      if (json.success && json.data?.props) {
        setFormData(json.data.props);
        setAlertInfo({
          type: "success",
          message: "Đã khôi phục cấu trúc trang Tin tức về mặc định thành công!",
        });
      }
    } catch {
      setAlertInfo({
        type: "error",
        message: "Lỗi khi khôi phục dữ liệu mặc định.",
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* 1. THANH ĐIỀU HƯỚNG CHÍNH (PRIMARY NAV) DÀNH CHO TOÀN BỘ PHÂN HỆ TIN TỨC */}
      <NewsMainNav
        activeTab={activeMainTab}
        onSelectTab={handleSelectMainTab}
        articlesCount={articlesCount}
        categoriesCount={categoriesCount}
      />

      {/* 2. TAB: NỘI DUNG WEBSITE (PAGE CMS 6 SECTIONS) */}
      {activeMainTab === "content" && (
        <div className="space-y-6">
          {/* Alert Banner */}
          {alertInfo && (
            <div
              className={`flex items-center gap-3 p-4 rounded-xl text-xs font-semibold transition-all ${
                alertInfo.type === "success"
                  ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                  : "bg-rose-50 text-rose-800 border border-rose-200"
              }`}
            >
              {alertInfo.type === "success" ? (
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
              ) : (
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              )}
              <span>{alertInfo.message}</span>
            </div>
          )}

          {/* Header & Top Bar Actions */}
          <NewsHeaderActions
            saving={saving}
            onSave={handleSave}
            onReset={handleReset}
          />

          {/* Navigation Tabs giữa 6 Section CMS */}
          <NewsTabNav
            activeTab={activeSectionTab}
            onSelectTab={setActiveSectionTab}
          />

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-[#EAE2D5]">
              <Loader2 className="w-8 h-8 text-[#9A1C1F] animate-spin mb-3" />
              <p className="text-xs font-semibold text-[#695D56]">
                Đang tải cấu trúc nội dung trang Tin tức...
              </p>
            </div>
          ) : (
            /* 2-Column Layout: Editor (Left) & Live Preview (Right) */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Cột trái: Form chỉnh sửa Section đang chọn */}
              <div className="lg:col-span-7 space-y-6">
                {activeSectionTab === "header" && (
                  <NewsHeaderTab
                    data={formData.header}
                    onChange={(header) => setFormData({ ...formData, header })}
                  />
                )}

                {activeSectionTab === "featured" && (
                  <NewsFeaturedTab
                    data={formData.featured}
                    onChange={(featured) =>
                      setFormData({ ...formData, featured })
                    }
                  />
                )}

                {activeSectionTab === "articles" && (
                  <NewsArticlesTab
                    data={formData.articlesSection}
                    onChange={(articlesSection) =>
                      setFormData({ ...formData, articlesSection })
                    }
                  />
                )}

                {activeSectionTab === "stats" && (
                  <NewsStatsTab
                    data={formData.stats}
                    onChange={(stats) => setFormData({ ...formData, stats })}
                  />
                )}

                {activeSectionTab === "cta" && (
                  <NewsCtaTab
                    data={formData.cta}
                    onChange={(cta) => setFormData({ ...formData, cta })}
                  />
                )}

                {activeSectionTab === "seo" && (
                  <NewsSeoTab
                    data={formData.seo}
                    onChange={(seo) => setFormData({ ...formData, seo })}
                  />
                )}
              </div>

              {/* Cột phải: Live Preview trực quan kế bên editor */}
              <div className="lg:col-span-5">
                <NewsSectionPreview
                  activeTab={activeSectionTab}
                  data={formData}
                />
              </div>
            </div>
          )}
        </div>
      )}

      {/* 3. TAB: BÀI VIẾT TIN TỨC (NEWS ARTICLES MANAGEMENT) */}
      {activeMainTab === "articles" && (
        <NewsArticlesManagement
          onArticlesCountChange={setArticlesCount}
          onCategoriesCountChange={setCategoriesCount}
        />
      )}

      {/* 4. TAB: CHUYÊN MỤC TIN TỨC (CATEGORY-NEWS MANAGEMENT) */}
      {activeMainTab === "categories" && (
        <NewsCategoriesManagement
          onCategoriesCountChange={setCategoriesCount}
        />
      )}
    </div>
  );
}
