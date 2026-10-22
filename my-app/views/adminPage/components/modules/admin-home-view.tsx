"use client";

import { useState, useEffect } from "react";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import type { PageHomePropsType } from "@/views/homePage/types/pagehome.type";
import { DEFAULT_PAGE_HOME_PROPS } from "@/views/homePage/types/pagehome.type";
import {
  HomeHeaderActions,
  HomeTabNav,
  HomeSectionTab,
  HomeHeroTab,
  HomeStatisticsTab,
  HomeSpotlightTab,
  HomeNewsTab,
  HomeNewsArticlesCard,
  HomePartnersTab,
  HomeCtaTab,
  HomeSeoTab,
  HomeSectionPreview,
} from "./home";

export function AdminHomeView() {
  const [activeTab, setActiveTab] = useState<HomeSectionTab>("hero");
  const [formData, setFormData] = useState<PageHomePropsType>(DEFAULT_PAGE_HOME_PROPS);
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const [alertInfo, setAlertInfo] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  // 1. Tải cấu trúc trang chủ từ API
  useEffect(() => {
    async function fetchHomeContent() {
      try {
        setLoading(true);
        const res = await fetch("/api/admin/home/page");
        const json = await res.json();
        if (json.success && json.data?.props) {
          setFormData(json.data.props);
        }
      } catch (err) {
        console.error("Lỗi khi tải cấu trúc Trang chủ:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchHomeContent();
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
      const res = await fetch("/api/admin/home/page", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ props: formData }),
      });
      const json = await res.json();

      if (json.success) {
        setAlertInfo({
          type: "success",
          message: "Đã lưu toàn bộ thay đổi cấu trúc Trang chủ thành công!",
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
        message: "Lỗi kết nối máy chủ khi lưu cấu trúc Trang chủ.",
      });
    } finally {
      setSaving(false);
    }
  };

  // 3. Khôi phục về mặc định qua API POST reset
  const handleReset = async () => {
    if (
      !confirm(
        "Bạn có chắc chắn muốn khôi phục toàn bộ nội dung Trang chủ về mặc định ban đầu?",
      )
    ) {
      return;
    }

    try {
      setSaving(true);
      const res = await fetch("/api/admin/home/page", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "reset" }),
      });
      const json = await res.json();

      if (json.success && json.data?.props) {
        setFormData(json.data.props);
        setAlertInfo({
          type: "success",
          message: "Đã khôi phục cấu trúc Trang chủ về mặc định thành công!",
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
      <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-[#f3e9db]">
        <Loader2 className="w-8 h-8 text-[#9A1C1F] animate-spin mb-3" />
        <p className="text-xs font-semibold text-[#695D56]">
          Đang tải cấu trúc nội dung Trang chủ...
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
      <HomeHeaderActions
        saving={saving}
        onSave={handleSave}
        onReset={handleReset}
      />

      {/* Navigation Tabs giữa 7 Section Trang chủ */}
      <HomeTabNav activeTab={activeTab} onSelectTab={setActiveTab} />

      {/* 2-Column Layout: Form Editor (Left 7 Cols) & Live Preview (Right 5 Cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Cột trái: Form chỉnh sửa Section đang chọn */}
        <div className="lg:col-span-7 space-y-6">
          {activeTab === "hero" && (
            <HomeHeroTab
              data={formData.hero}
              onChange={(hero) => setFormData({ ...formData, hero })}
            />
          )}

          {activeTab === "statistics" && (
            <HomeStatisticsTab
              data={formData.statistics}
              onChange={(statistics) =>
                setFormData({ ...formData, statistics })
              }
            />
          )}

          {activeTab === "spotlight" && (
            <HomeSpotlightTab
              data={formData.spotlight}
              onChange={(spotlight) =>
                setFormData({ ...formData, spotlight })
              }
            />
          )}

          {activeTab === "news" && (
            <HomeNewsTab
              data={formData.newsSection}
              onChange={(newsSection) =>
                setFormData((current) => ({ ...current, newsSection }))
              }
            />
          )}

          {activeTab === "partners" && (
            <HomePartnersTab
              data={formData.partners}
              onChange={(partners) =>
                setFormData({ ...formData, partners })
              }
            />
          )}

          {activeTab === "cta" && (
            <HomeCtaTab
              data={formData.cta}
              onChange={(cta) => setFormData({ ...formData, cta })}
            />
          )}

          {activeTab === "seo" && (
            <HomeSeoTab
              data={formData.seo}
              onChange={(seo) => setFormData({ ...formData, seo })}
            />
          )}
        </div>

        {/* Cột phải: Live Preview trực quan kế bên editor */}
        <div className="lg:col-span-5">
          <HomeSectionPreview activeTab={activeTab} data={formData} />
        </div>
      </div>

      {activeTab === "news" && (
        <HomeNewsArticlesCard
          data={formData.newsSection}
          onChange={(newsSection) =>
            setFormData((current) => ({ ...current, newsSection }))
          }
        />
      )}
    </div>
  );
}
