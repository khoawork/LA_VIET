"use client";

import { useState, useEffect } from "react";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import type { PageNewPropsType } from "@/views/newPages/types/pagenew.type";
import {
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
  NewsArticlesManagement,
  NewsCategoriesManagement,
} from "./news";

interface AdminNewsViewProps {
  initialMainTab?: NewsMainTab;
}

export function AdminNewsView({ initialMainTab = "content" }: AdminNewsViewProps) {
  const [activeMainTab, setActiveMainTab] = useState<NewsMainTab>(initialMainTab);

  // States dành cho Tab "Nội dung Website (CMS)"
  const [activeSectionTab, setActiveSectionTab] = useState<SectionTab>("header");
  const [formData, setFormData] = useState<PageNewPropsType | null>(null);
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

  // 1. Tải cấu trúc trang từ API
  useEffect(() => {
    async function fetchPageContent() {
      try {
        setLoading(true);
        const res = await fetch("/api/admin/news/page");
        const json = await res.json();
        if (res.ok && json.success && json.data?.props) {
          setFormData(json.data.props);
        } else {
          setFormData(null);
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
    if (!formData) return;
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

  return (
    <div className="admin-content-editor space-y-6">
      {/* NỘI DUNG WEBSITE (PAGE CMS 6 SECTIONS) */}
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
          {formData && <NewsHeaderActions saving={saving} onSave={handleSave} />}

          {/* Navigation Tabs giữa 6 Section CMS */}
          {formData && <NewsTabNav
            activeTab={activeSectionTab}
            onSelectTab={setActiveSectionTab}
          />}

          {loading ? (
            <div className="flex items-center justify-center gap-2 rounded-2xl border border-[#EAE2D5] bg-white p-12 text-sm text-[#695D56]">
              <Loader2 className="h-5 w-5 shrink-0 animate-spin" />
              <span>Đang tải trang Tin tức...</span>
            </div>
          ) : !formData ? (
            <p role="alert" className="rounded-2xl border border-[#EAE2D5] bg-white p-12 text-center text-sm text-[#695D56]">
              Chưa có dữ liệu trang Tin tức hoặc không thể tải dữ liệu.
            </p>
          ) : (
            <div className="mx-auto w-full max-w-6xl space-y-6">
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
          )}
        </div>
      )}

      {/* BÀI VIẾT TIN TỨC (NEWS ARTICLES MANAGEMENT) */}
      {activeMainTab === "articles" && (
        <NewsArticlesManagement />
      )}

      {/* CHUYÊN MỤC TIN TỨC (CATEGORY-NEWS MANAGEMENT) */}
      {activeMainTab === "categories" && (
        <NewsCategoriesManagement />
      )}
    </div>
  );
}
