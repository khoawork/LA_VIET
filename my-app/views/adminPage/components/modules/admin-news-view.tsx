"use client";

import { useState, useEffect } from "react";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import type { PageNewPropsType } from "@/views/newPages/types/pagenew.type";
import { DEFAULT_PAGE_NEW_PROPS } from "@/views/newPages/types/pagenew.type";
import {
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
} from "./news";

export function AdminNewsView() {
  const [activeTab, setActiveTab] = useState<SectionTab>("header");
  const [formData, setFormData] = useState<PageNewPropsType>(DEFAULT_PAGE_NEW_PROPS);
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const [alertInfo, setAlertInfo] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

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

  // 2. Lưu thay đổi qua API PUT
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

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-[#EAE2D5]">
        <Loader2 className="w-8 h-8 text-[#9A1C1F] animate-spin mb-3" />
        <p className="text-xs font-semibold text-[#695D56]">
          Đang tải cấu trúc nội dung trang Tin tức...
        </p>
      </div>
    );
  }

  return (
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

      {/* Navigation Tabs giữa các Section */}
      <NewsTabNav activeTab={activeTab} onSelectTab={setActiveTab} />

      {/* 2-Column Layout: Editor (Left) & Live Preview (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Cột trái: Form chỉnh sửa Section đang chọn */}
        <div className="lg:col-span-7 space-y-6">
          {activeTab === "header" && (
            <NewsHeaderTab
              data={formData.header}
              onChange={(header) => setFormData({ ...formData, header })}
            />
          )}

          {activeTab === "featured" && (
            <NewsFeaturedTab
              data={formData.featured}
              onChange={(featured) => setFormData({ ...formData, featured })}
            />
          )}

          {activeTab === "articles" && (
            <NewsArticlesTab
              data={formData.articlesSection}
              onChange={(articlesSection) =>
                setFormData({ ...formData, articlesSection })
              }
            />
          )}

          {activeTab === "stats" && (
            <NewsStatsTab
              data={formData.stats}
              onChange={(stats) => setFormData({ ...formData, stats })}
            />
          )}

          {activeTab === "cta" && (
            <NewsCtaTab
              data={formData.cta}
              onChange={(cta) => setFormData({ ...formData, cta })}
            />
          )}

          {activeTab === "seo" && (
            <NewsSeoTab
              data={formData.seo}
              onChange={(seo) => setFormData({ ...formData, seo })}
            />
          )}
        </div>

        {/* Cột phải: Live Preview trực quan kế bên editor */}
        <div className="lg:col-span-5">
          <NewsSectionPreview activeTab={activeTab} data={formData} />
        </div>
      </div>
    </div>
  );
}
